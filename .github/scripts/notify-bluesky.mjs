#!/usr/bin/env node
/**
 * notify-bluesky.mjs
 *
 * Posts to Bluesky when new content files are added to the site.
 * Runs as part of the GitHub Actions deploy pipeline.
 *
 * Required GitHub secrets:
 *   BLUESKY_HANDLE       - Your Bluesky handle (e.g. you.bsky.social)
 *   BLUESKY_APP_PASSWORD - An App Password from bsky.social → Settings → App Passwords
 *   SITE_URL             - Your site's base URL (e.g. https://longlost.example.com)
 */

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const BLUESKY_HANDLE = process.env.BLUESKY_HANDLE;
const BLUESKY_APP_PASSWORD = process.env.BLUESKY_APP_PASSWORD;
const SITE_URL = (process.env.SITE_URL ?? "").replace(/\/$/, "");

if (!BLUESKY_HANDLE || !BLUESKY_APP_PASSWORD) {
  console.error(
    "❌  Missing BLUESKY_HANDLE or BLUESKY_APP_PASSWORD environment variables."
  );
  process.exit(1);
}

if (!SITE_URL) {
  console.error("❌  Missing SITE_URL environment variable.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Detect newly added content files via git diff
// ---------------------------------------------------------------------------

let newContentFiles = [];

try {
  const raw = execSync("git diff --name-only --diff-filter=A HEAD~1 HEAD", {
    encoding: "utf8",
  }).trim();

  newContentFiles = raw
    .split("\n")
    .map((f) => f.trim())
    .filter((f) => f.startsWith("src/content/") && f.endsWith(".md"));
} catch {
  // This can happen on the very first commit (no HEAD~1), or other edge cases.
  console.log(
    "⚠️  Could not compute git diff — skipping Bluesky notification."
  );
  process.exit(0);
}

if (newContentFiles.length === 0) {
  console.log(
    "ℹ️  No new content files detected in this push. Skipping Bluesky notification."
  );
  process.exit(0);
}

console.log(
  `📂  Found ${
    newContentFiles.length
  } new content file(s):\n  ${newContentFiles.join("\n  ")}\n`
);

// ---------------------------------------------------------------------------
// Frontmatter helpers
// ---------------------------------------------------------------------------

/** Extract the raw YAML block from a markdown file. */
function extractYaml(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : "";
}

/**
 * Pull a scalar value from a YAML string for a given key.
 * Handles bare values, single-quoted, and double-quoted strings.
 * Does NOT handle multiline / block scalars — good enough for our frontmatter.
 */
function getField(yaml, key) {
  const re = new RegExp(`^${key}:\\s*(.+)$`, "m");
  const match = yaml.match(re);
  if (!match) return undefined;
  return match[1].trim().replace(/^(['"])(.*)\1$/, "$2");
}

/** Turn a numeric rating (1–5) into filled/empty star characters. */
function starsFor(yaml) {
  const raw = getField(yaml, "rating");
  if (!raw) return "";
  const n = Math.round(parseFloat(raw));
  if (isNaN(n) || n < 1 || n > 5) return "";
  return " " + "★".repeat(n) + "☆".repeat(5 - n);
}

// ---------------------------------------------------------------------------
// Build post text per collection
// ---------------------------------------------------------------------------

/**
 * Returns { text, url } for a given content file path, or null if the
 * collection is unrecognised.
 *
 * Collection → URL mapping:
 *   writing  →  /writing/[slug]
 *   books    →  /reading/[slug]
 *   film     →  /watching/[slug]
 *   music    →  /music/[slug]
 */
function buildPost(filePath) {
  const fileContent = readFileSync(filePath, "utf8");
  const yaml = extractYaml(fileContent);

  // filePath is like: src/content/writing/My-Post.md
  const segments = filePath.split("/");
  const collection = segments[2];
  const slug = segments[segments.length - 1].replace(/\.md$/, "");

  let body = "";
  let url = "";

  switch (collection) {
    case "writing": {
      const title = getField(yaml, "title") ?? slug;
      const excerpt = getField(yaml, "excerpt");
      url = `${SITE_URL}/writing/${slug}`;
      body = `New post: "${title}"`;
      if (excerpt) body += `\n\n${excerpt}`;
      break;
    }

    case "books": {
      const bookTitle = getField(yaml, "bookTitle") ?? slug;
      const author = getField(yaml, "author");
      const status = getField(yaml, "status");
      url = `${SITE_URL}/reading/${slug}`;

      const verb =
        status === "finished"
          ? "📚 Finished reading"
          : status === "abandoned"
          ? "📚 Did not finish"
          : "📚 Currently reading";

      body = `${verb}: "${bookTitle}"`;
      if (author) body += ` by ${author}`;
      body += starsFor(yaml);
      break;
    }

    case "film": {
      const mediaTitle = getField(yaml, "mediaTitle") ?? slug;
      const director = getField(yaml, "director");
      const year = getField(yaml, "year");
      const mediaType = getField(yaml, "mediaType") ?? "film";
      url = `${SITE_URL}/watching/${slug}`;

      const icon =
        mediaType === "series"
          ? "📺"
          : mediaType === "documentary"
          ? "🎞️"
          : mediaType === "short"
          ? "🎬"
          : "🎬";

      body = `${icon} Watched: "${mediaTitle}"`;
      if (year) body += ` (${year})`;
      if (director) body += ` — dir. ${director}`;
      body += starsFor(yaml);
      break;
    }

    case "music": {
      const title = getField(yaml, "title") ?? slug;
      url = `${SITE_URL}/music/${slug}`;
      body = `🎵 New music entry: "${title}"`;
      body += starsFor(yaml);
      break;
    }

    default:
      return null;
  }

  // Always append the URL on its own line so we can create a link facet.
  const urlSuffix = `\n\n${url}`;
  let text = body + urlSuffix;

  // Bluesky enforces a 300-grapheme limit. Trim the body text if needed,
  // keeping the URL intact.
  const LIMIT = 300;
  if ([...text].length > LIMIT) {
    const urlGraphemes = [...urlSuffix].length;
    const maxBody = LIMIT - urlGraphemes - 3; // 3 for the ellipsis
    body = [...body].slice(0, maxBody).join("") + "...";
    text = body + urlSuffix;
  }

  return { text, url };
}

// ---------------------------------------------------------------------------
// Bluesky AT Protocol helpers
// ---------------------------------------------------------------------------

/**
 * Build an `app.bsky.feed.post` record with a proper richtext facet so the
 * URL is rendered as a clickable hyperlink in the Bluesky UI.
 */
function buildRecord(text, url) {
  const encoder = new TextEncoder();

  // Byte offsets are required by the AT Protocol richtext spec.
  const urlByteStart = encoder.encode(
    text.slice(0, text.lastIndexOf(url))
  ).length;
  const urlByteEnd = urlByteStart + encoder.encode(url).length;

  return {
    $type: "app.bsky.feed.post",
    text,
    createdAt: new Date().toISOString(),
    facets: [
      {
        index: { byteStart: urlByteStart, byteEnd: urlByteEnd },
        features: [{ $type: "app.bsky.richtext.facet#link", uri: url }],
      },
    ],
  };
}

/** Authenticate and return { accessJwt, did }. */
async function createSession() {
  const res = await fetch(
    "https://bsky.social/xrpc/com.atproto.server.createSession",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: BLUESKY_HANDLE,
        password: BLUESKY_APP_PASSWORD,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Bluesky auth failed (${res.status}): ${body}`);
  }

  return res.json();
}

/** Create a post record on Bluesky and return the resulting URI + CID. */
async function createPost(accessJwt, did, text, url) {
  const res = await fetch(
    "https://bsky.social/xrpc/com.atproto.repo.createRecord",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessJwt}`,
      },
      body: JSON.stringify({
        repo: did,
        collection: "app.bsky.feed.post",
        record: buildRecord(text, url),
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Bluesky post failed (${res.status}): ${body}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

// Authenticate once, then post for each new content file.
let session;
try {
  session = await createSession();
  console.log(`🔑  Authenticated as ${BLUESKY_HANDLE}\n`);
} catch (err) {
  console.error(`❌  ${err.message}`);
  process.exit(1);
}

let posted = 0;

for (const filePath of newContentFiles) {
  const post = buildPost(filePath);

  if (!post) {
    console.log(`⏭️  Skipping ${filePath} — unrecognised collection.\n`);
    continue;
  }

  console.log(`📤  Posting for: ${filePath}`);
  console.log(`─────────────────────────────────────`);
  console.log(post.text);
  console.log(`─────────────────────────────────────`);

  try {
    const result = await createPost(
      session.accessJwt,
      session.did,
      post.text,
      post.url
    );
    console.log(`✅  Posted! at-uri: ${result.uri}\n`);
    posted++;
  } catch (err) {
    console.error(`❌  ${err.message}`);
    process.exit(1);
  }
}

console.log(`✨  Done — posted ${posted} update(s) to Bluesky.`);

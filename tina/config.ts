import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  branch: process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || "main",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ─── Writing ─────────────────────────────────────────────
      {
        name: "writing",
        label: "Writing",
        path: "src/content/writing",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      // ─── Music ───────────────────────────────────────────────
      {
        name: "music",
        label: "Music",
        path: "src/content/music",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "embedUrl",
            label: "Embed URL",
            required: true,
            description: "SoundCloud or Bandcamp embed URL",
          },
          {
            type: "string",
            name: "platform",
            label: "Platform",
            options: ["soundcloud", "bandcamp"],
          },
          {
            type: "string",
            name: "bandcampAlbumId",
            label: "Bandcamp Album ID",
            description:
              "Numeric album ID from the Bandcamp embed code (e.g. 3018019498). Required for Bandcamp embeds.",
          },
          {
            type: "string",
            name: "alternatePlatformUrl",
            label: "Alternate Platform URL",
            description:
              "Optional link to the same track on the other platform",
          },
          {
            type: "number",
            name: "rating",
            label: "Rating (1–5)",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Notes",
            isBody: true,
          },
        ],
      },

      // ─── Books ───────────────────────────────────────────────
      {
        name: "books",
        label: "Books",
        path: "src/content/books",
        format: "md",
        fields: [
          {
            type: "string",
            name: "bookTitle",
            label: "Book Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date logged",
            required: true,
          },
          {
            type: "image",
            name: "cover",
            label: "Cover image",
          },
          {
            type: "string",
            name: "coverAlt",
            label: "Cover image alt text",
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: ["reading", "finished", "abandoned"],
          },
          {
            type: "number",
            name: "rating",
            label: "Rating (1–5)",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Notes",
            isBody: true,
          },
        ],
      },

      // ─── Film / TV ───────────────────────────────────────────
      {
        name: "film",
        label: "Film & TV",
        path: "src/content/film",
        format: "md",
        fields: [
          {
            type: "string",
            name: "mediaTitle",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "director",
            label: "Director / Creator",
          },
          {
            type: "number",
            name: "year",
            label: "Year",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date watched",
            required: true,
          },
          {
            type: "string",
            name: "mediaType",
            label: "Type",
            options: ["film", "series", "short", "documentary"],
          },
          {
            type: "number",
            name: "rating",
            label: "Rating (1–5)",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Notes",
            isBody: true,
          },
        ],
      },
    ],
  },
});

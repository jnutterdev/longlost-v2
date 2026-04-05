# longlostforgotten

A personal blog at [longlostforgotten.com](https://longlostforgotten.com) — a place to share daily writings, music, photography, books, and films. Built as a single owned space that syndicates outward to social media, rather than the other way around.

---

## Stack

| Layer | Choice |
|---|---|
| **Framework** | [Astro](https://astro.build) v6 — static site generator, zero JS by default |
| **CMS** | [Tina CMS](https://tina.io) — Git-backed, visual editor, schema defined in code |
| **Hosting** | Apache server at `ashtephra.com` — Astro `dist/` output served as flat files |
| **Fonts** | Google Fonts — Almendra, Source Serif 4, Inter |
| **CI/CD** | GitHub Actions — builds and deploys to server on push to `main` |

### Local development

```bash
# Astro only (no CMS editor)
npm run dev

# Astro + Tina CMS editor
npm run dev:cms
```

- Site: `http://localhost:4321/`
- Tina CMS editor: `http://localhost:4321/admin/index.html`
- Tina GraphQL API: `http://localhost:4001/graphql`

### Deployment

Pushes to `main` trigger a GitHub Actions workflow that:
1. Builds with `tinacms build && astro build`
2. Deploys `dist/` to the server via rsync over SSH

Required GitHub secrets: `TINA_CLIENT_ID`, `TINA_TOKEN`, `SSH_PRIVATE_KEY`, `HOST`, `USERNAME`, `DEPLOY_PATH`.

---

## Design System

### Color Palette — Japanese Poster (Dark)

The site uses a dark, characterful palette: near-black charcoal base, warm gold/tan text, and a punchy orange-red accent. A light mode toggle is planned but will be designed after the dark layout is fully locked.

| Token | Name | Hex |
|---|---|---|
| `--bg` | Dark Charcoal | `#1A1916` |
| `--surface` | Deep Warm | `#242118` |
| `--text` | Warm Gold | `#C4A97A` |
| `--text-muted` | Muted Gold | `#7A6E4E` |
| `--accent` | Orange-Red | `#CC4422` |
| `--link` | Light Gold | `#D4BC8A` |
| `--rule` | Dark Rule | `#2E2B20` |

#### Background Texture

The background is a flat `#1A1916` field with a tiled grunge texture (`grunge-1.png`) blended via `background-blend-mode: multiply` — giving the pages a tactile, printed quality.

### Typography

| Role | Font | Notes |
|---|---|---|
| **Headings** | [Almendra](https://fonts.google.com/specimen/Almendra) — italic 700 | Ornate serif with gothic flourish. Italic bold throughout. |
| **Body** | [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) | Optical sizing, warm and highly readable at length. |
| **UI / Meta** | [Inter](https://fonts.google.com/specimen/Inter) | Clean, neutral. Nav, dates, tags, labels. |

### Layout

- Single-column, centered reading layout
- Max content width: ~680px (wider for photo grids: ~960px)
- Generous line height (1.8) and paragraph spacing
- No sidebar
- Minimal navigation: *Writing · Music · Reading · Watching · About*
- Simple footer with social links

---

## Content Types

All content is stored as Markdown files in `src/content/`, managed through Tina CMS. Tags are kept **separate per content type** — no shared global taxonomy.

| Type | Path | Key Fields |
|---|---|---|
| **Writing** | `src/content/writing/` | `title`, `date`, `excerpt`, `tags`, `body` |
| **Music** | `src/content/music/` | `title`, `date`, `embedUrl`, `platform` (soundcloud · bandcamp), `alternatePlatformUrl`, `tags`, `body` |
| **Photography** | `src/content/photography/` | `title`, `date`, `images[]` (src, caption, alt), `tags`, `body` |
| **Books** | `src/content/books/` | `bookTitle`, `author`, `date`, `cover`, `status`, `rating`, `tags`, `body` |
| **Film / TV** | `src/content/film/` | `mediaTitle`, `director`, `year`, `date`, `mediaType`, `rating`, `tags`, `body` |
| **Miscellaneous** | `src/content/misc/` | `title`, `date`, `linkUrl`, `body` |

Static pages (`/about`, `/now`) are hand-edited Astro files — not content collections.

### Music embeds
Audio is always embedded from **SoundCloud** or **Bandcamp**, used interchangeably. The `platform` field allows the embed component to render the correct iframe. `alternatePlatformUrl` links to the same track on the other platform if available.

---

## Pages

| Route | Source | Description |
|---|---|---|
| `/` | `pages/index.astro` | Reverse-chronological feed across all content types |
| `/writing` | `pages/writing/index.astro` | Archive of writing entries |
| `/writing/[slug]` | `pages/writing/[slug].astro` | Individual writing post |
| `/music` | `pages/music/index.astro` | Archive of music posts |
| `/music/[slug]` | `pages/music/[slug].astro` | Individual music post with embed |
| `/photography/[slug]` | `pages/photography/[slug].astro` | Photo post with hero + grid |
| `/reading` | `pages/reading/index.astro` | Currently reading + recently finished |
| `/watching` | `pages/watching/index.astro` | Recently watched films and shows |
| `/about` | `pages/about.astro` | Personal introduction + social links |
| `/now` | `pages/now.astro` | What's happening right now |

---

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── writing/          # .md files
│   │   ├── music/
│   │   ├── photography/
│   │   ├── books/
│   │   ├── film/
│   │   └── misc/
│   ├── content.config.ts     # Astro content collection schemas
│   ├── layouts/
│   │   ├── Base.astro        # HTML shell + fonts
│   │   └── Page.astro        # Base + Header + Footer
│   ├── pages/                # Route files
│   └── styles/
│       └── global.css        # Design tokens, reset, shared styles
├── tina/
│   └── config.ts             # Tina CMS schema (mirrors content.config.ts)
├── public/
│   ├── grunge-1.png          # Background texture
│   └── .htaccess             # Apache clean URLs, caching, compression
├── .github/
│   └── workflows/
│       └── deploy.yml        # Build + deploy on push to main
├── astro.config.mjs
└── package.json
```

---

## Mockups

Design mockups are plain HTML files in the project root. They use the full design system (live Google Fonts, real color tokens, grunge background texture) and can be opened directly in a browser without a build step.

| File | Page |
|---|---|
| `mockup-homepage.html` | Homepage feed |
| `mockup-post.html` | Writing post / entry page |
| `mockup-music.html` | Music post with embed |
| `mockup-photo.html` | Photography post with image grid |
| `mockup-about.html` | About page |
| `mockup-now.html` | Now page |

---

## Social Presence

| Platform | Handle |
|---|---|
| **Bluesky** | [longlostforgotten.com](https://bsky.app/profile/longlostforgotten.com) |
| **Instagram** | [@lnglostfrgttn](https://www.instagram.com/lnglostfrgttn/) |
| **Threads** | [@lnglostfrgttn](https://www.threads.com/@lnglostfrgttn) |

> **Mastodon** — account exists but is deprioritized for now. May be revisited later.

The blog follows a **POSSE** model (Publish on Own Site, Syndicate Elsewhere) — the site is the canonical source, social platforms are distribution channels.

---

## Open Questions

- [ ] Photo hosting — self-hosted on Apache vs. third-party service (TBD)
- [ ] URL structure — e.g. `/writing/2025/post-title` vs. `/writing/post-title`
- [ ] Light mode palette — to be designed once dark layout is locked
- [ ] Email newsletter — Buttondown or Substack if needed down the road

---

*This is a living document and will be updated as the project develops.*

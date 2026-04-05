# longlostforgotten

A personal blog at [longlostforgotten.com](https://longlostforgotten.com) — a place to share daily writings, music, photography, books, and films. Built as a single owned space that syndicates outward to social media, rather than the other way around.

---

## Stack

| Layer | Choice |
|---|---|
| **Framework** | [Astro](https://astro.build) — static site generator, zero JS by default |
| **CMS** | [Tina CMS](https://tina.io) — Git-backed, visual editor, schema defined in code |
| **Hosting** | Personal Apache server — Astro `dist/` output served as flat files |
| **Fonts** | Google Fonts (self-hosted in production) |

### Deployment notes
- Build locally or via CI/CD (e.g. GitHub Actions), push to server via SSH/rsync
- Add `.htaccess` for clean URLs, caching headers, and 404 handling
- Tina Cloud handles editorial auth separately from the static output — no conflict with self-hosting

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
- Max content width: ~680px
- Generous line height (1.8) and paragraph spacing
- No sidebar
- Minimal navigation: *Writing · Music · Reading · Watching · About*
- Simple footer with social links

---

## Content Types

All content is stored as Markdown files in the repo, managed through Tina CMS. Tags are kept **separate per content type** — no shared global taxonomy.

| Type | Description | Key Fields |
|---|---|---|
| **Writing** | Essays, journal entries, notes | `title`, `date`, `body`, `excerpt`, `tags` |
| **Music** | Original music with embeds | `title`, `date`, `embedUrl`, `platform` (soundcloud · bandcamp), `body` |
| **Photography** | Photos with optional notes | `title`, `date`, `images[]`, `caption`, `body` |
| **Books** | Reading log | `bookTitle`, `author`, `cover`, `status`, `rating`, `body` |
| **Film / TV** | Watched log | `mediaTitle`, `director`, `year`, `mediaType`, `rating`, `body` |
| **Miscellaneous** | Links, short notes | `title`, `date`, `linkUrl`, `body` |

Static pages (`/about`, `/now`) are single-instance global documents in Tina — not collections.

### Music embeds
Audio is always embedded — either from **SoundCloud** or **Bandcamp**, used interchangeably. No self-hosted audio files. The `platform` field (`soundcloud` · `bandcamp`) allows the embed component to render the correct iframe.

---

## Pages

| Route | Description |
|---|---|
| `/` | Reverse-chronological feed across all content types |
| `/writing` | Archive of writing entries |
| `/music` | Archive of music posts |
| `/reading` | Currently reading + recently finished |
| `/watching` | Recently watched films and shows |
| `/about` | Personal introduction + social links |
| `/now` | What's happening right now — updated occasionally |

Tag archive pages are scoped per content type: `/writing/tags/[tag]`, `/books/tags/[tag]`, etc.

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

## Mockups

Design mockups are plain HTML files in the project root. They use the full design system (live Google Fonts, real color tokens, grunge background texture) and can be opened directly in a browser.

| File | Page |
|---|---|
| `mockup-homepage.html` | Homepage feed |
| `mockup-post.html` | Writing post / entry page |
| `mockup-about.html` | About page |
| `mockup-now.html` | Now page |

---

## Project Structure (planned)

```
/
├── src/
│   ├── components/       # Astro components (Header, Footer, EntryCard, MusicEmbed…)
│   ├── content/          # Markdown content collections (writing, music, books…)
│   ├── layouts/          # Base layout, post layout
│   └── pages/            # Route files
├── public/               # Static assets
├── tina/                 # Tina CMS config and schema
├── .htaccess             # Apache clean URLs, caching, 404
└── astro.config.mjs
```

---

## Open Questions

- [ ] Photo hosting — self-hosted on Apache vs. third-party service (TBD)
- [ ] URL structure — e.g. `/writing/2025/post-title` vs. `/writing/post-title`
- [ ] Light mode palette — to be designed once dark layout is locked
- [ ] Email newsletter — Buttondown or Substack if needed down the road
- [ ] Audience — broadly public, soft launch, no announcement planned initially

---

*This is a living document and will be updated as the project develops.*

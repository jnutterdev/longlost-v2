# Site Brief: longlostforgotten.com

**Document Version:** 1.0  
**Status:** Draft — In Progress  
**Last Updated:** 2025

---

## 1. Project Overview

**Site Name:** longlostforgotten

**Domain:** longlostforgotten.com  
**Site Type:** Personal Blog  
**Tagline:** _Written down. More or less accurately._

This is a personal creative space for documenting daily life — writings, creative work, consumed media, and whatever else feels worth sharing. The tone is personal, unhurried, and genuine. This is not a brand or a business; it's a home base.

---

## 2. Goals & Purpose

### Primary Goals

- Create a single, owned space to publish content instead of relying solely on third-party social platforms
- Share daily or regular writings, creative work, and life observations
- Build a personal archive of things made, read, watched, and listened to

### Secondary Goals

- Eventually syndicate content outward to social media platforms (Bluesky, Instagram, Threads) from one place — the blog as the source of truth
- Reduce friction of cross-posting across multiple platforms

### Non-Goals (for now)

- Monetization
- Growing a specific audience or niche following
- Comment systems or heavy community features (revisit later)

---

## 3. Content Types

| Content Type      | Description                                               | Frequency     |
| ----------------- | --------------------------------------------------------- | ------------- |
| **Writing**       | Daily or regular personal essays, journal entries, notes  | Daily / Often |
| **Photography**   | Personal photos — life, travels, moments                  | Occasional    |
| **Music**         | Original music created by the author                      | Occasional    |
| **Books**         | Currently reading, recently finished, notes & reactions   | Ongoing       |
| **Film / TV**     | Movies and shows watched, brief reactions or longer takes | Ongoing       |
| **Miscellaneous** | Anything else worth noting — links, finds, thoughts       | As needed     |

---

## 4. Target Audience

**Primary Audience:** The author themselves — this site functions first and foremost as a personal archive. A place to collect, document, and look back on.

**Secondary Audience:** People who already follow on social media and want a deeper or longer-form version of the content they already engage with.

**Audience notes:**

- Broadly public — not invite-only or exclusive. Low-key at first; no plans to announce the launch on social media right away.
- RSS feed will be included once the site is built
- Email newsletter has not been decided yet, but remains an option for the future

---

## 5. Social Media Presence

The blog should eventually serve as the **canonical publishing hub** that syndicates outward to these four platforms:

| Platform      | Handle / URL                                                            |
| ------------- | ----------------------------------------------------------------------- |
| **Bluesky**   | [longlostforgotten.com](https://bsky.app/profile/longlostforgotten.com) |
| **Instagram** | [@lnglostfrgttn](https://www.instagram.com/lnglostfrgttn/)              |
| **Threads**   | [@lnglostfrgttn](https://www.threads.com/@lnglostfrgttn)                |

> **Mastodon** — account exists ([@longlostforgotten@mastodon.social](https://mastodon.social/@longlostforgotten)) but is deprioritized for now. Not shown on the site. May be revisited later.

### Syndication Notes

- Short-form posts (daily notes, quick observations) → Bluesky, Threads
- Photos → Instagram, Threads
- Long-form writing → Link posts to all platforms
- Music → TBD (SoundCloud embed? Bandcamp? Direct upload?)
- **POSSE** (Publish on Own Site, Syndicate Elsewhere) is the guiding philosophy

---

## 6. Design Direction

### Overall Feel

Minimal. Quiet. Personal. Like a well-worn notebook or a shelf of favorite paperbacks. The site should feel like a place you _linger_, not skim. Generous whitespace, readable type, nothing fighting for attention.

**Reference words:** bookish · earthy · unhurried · handmade · analog · warm · literary

---

### 6a. Color Palette ✓

**Confirmed: Japanese Poster — Dark Charcoal / Warm Gold / Orange-Red**

The site uses a dark, characterful palette drawn from Japanese graphic design: near-black charcoal base, warm gold/tan text, and a punchy orange-red accent. The background is a flat dark field with a tiled grunge texture image (`grunge-1.png`) blended via `multiply` for a subtle worn, printed quality.

| Role             | Color Name    | Hex       |
| ---------------- | ------------- | --------- |
| Background       | Dark Charcoal | `#1A1916` |
| Surface / Cards  | Deep Warm     | `#242118` |
| Primary Text     | Warm Gold     | `#C4A97A` |
| Secondary Text   | Muted Gold    | `#7A6E4E` |
| Accent           | Orange-Red    | `#CC4422` |
| Link / Highlight | Light Gold    | `#D4BC8A` |
| Rule / Border    | Dark Rule     | `#2E2B20` |

#### Background Texture

The body background uses `background-color: #1A1916` with `background-image: url("grunge-1.png")`, tiled at natural size and blended with `background-blend-mode: multiply`. This gives the pages a tactile, printed quality without heavy decoration.

> **Light mode:** A light/dark toggle is planned — to be designed after the dark layout is fully locked.

---

### 6b. Typography ✓

**Confirmed font stack:**

| Role          | Font                                                               | Notes                                                           |
| ------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| **Headings**  | [Almendra](https://fonts.google.com/specimen/Almendra) — italic 700 | Ornate serif with gothic flourish. Used in italic bold throughout. |
| **Body**      | [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4)  | Optical sizing, warm and highly readable at length.               |
| **UI / Meta** | [Inter](https://fonts.google.com/specimen/Inter)                    | Clean, neutral. Used for nav, dates, tags, labels.                |

**Other fonts explored and considered:**
Caprasimo _(previous pick)_, Playfair Display, Cormorant Garamond, DM Serif Display, Fraunces _(runner-up)_, Abril Fatface, Josefin Slab, Bodoni Moda

---

### 6c. Layout

- Single-column, centered reading layout
- Comfortable max content width (~680–740px)
- Generous line height and paragraph spacing
- Minimal navigation — logo/name, maybe a simple nav: _Writing · Music · Reading · Watching · About_
- No sidebar
- Simple footer with social links

---

### 6d. Page Inventory

> _Key pages and what they should contain:_

#### Home (`/`)

- Reverse-chronological feed of recent posts across all content types
- Clean and minimal — lead with the writing
- Small content-type label on each entry (Writing, Music, Books, Film, etc.)
- No heavy hero section or intro — let the content speak

#### Post / Entry Page

- Title, date, content-type tag
- Full content — writing, embedded photo, embedded audio, or mixed
- Minimal footer: previous / next post navigation
- No comments (for now)

#### About (`/about`)

- A personal introduction — who you are, what this site is, why it exists
- Informal, warm tone — not a résumé or a pitch
- Could include: current interests, where you're from, what you make
- Links out to all four social profiles
- A photo is optional — your call
- Keep it honest and short — one to three paragraphs is plenty

#### Writing (`/writing`)

- Archive of all written entries
- Filterable by year or tag if the list grows long
- Titles and dates — no excerpts needed

#### Music (`/music`)

- Archive of original music posts
- Each entry embeds or links to the audio
- Room for liner notes, context, or the story behind a piece

#### Reading (`/reading`)

- Currently reading, with any in-progress notes
- Recently finished with brief reactions
- Optional running bookshelf list over time

#### Watching (`/watching`)

- Recently watched films and shows
- Brief reactions — a sentence or a paragraph, no pressure to write a full review

#### Now (`/now`)

- A simple page answering: what are you up to right now?
- Updated occasionally, not a live feed
- A personal web tradition — see [nownownow.com](https://nownownow.com)
- **Confirmed** — this is part of the site

---

## 7. Technical Considerations

**Confirmed Stack: Astro + Tina CMS**

### Framework: [Astro](https://astro.build)

- Static site generator purpose-built for content-heavy sites
- Ships zero JavaScript by default — fast page loads out of the box
- Supports Markdown/MDX for content authoring
- Great ecosystem of integrations (RSS, sitemaps, image optimization, etc.)
- Full control over HTML and CSS — no theme lock-in

### CMS: [Tina CMS](https://tina.io)

- Git-backed — all content lives as Markdown files in the repo, no proprietary database
- Visual editing interface for writing posts without touching code
- Works seamlessly with Astro
- Self-hostable or use Tina Cloud (free tier available)
- Content schema is defined in code — structured and version-controlled

### Hosting: Personal Apache Server ✓

- Static output from Astro (`dist/` folder) is deployed directly to the server — Apache just serves flat files, no special config needed
- Build locally or via a CI/CD pipeline (e.g. GitHub Actions) and push to server via SSH/rsync
- Add a basic `.htaccess` for clean URLs, caching headers, and 404 handling
- Tina CMS can still use **Tina Cloud** for the editorial backend (auth + content API) even with self-hosted static output — no conflict

### Must-Haves

- [ ] RSS feed
- [ ] Clean, readable URLs (e.g. `/2025/07/post-title`)
- [ ] Mobile-friendly / responsive
- [ ] Fast load times
- [ ] No invasive tracking or ads
- [ ] About page (`/about`)
- [ ] Now page (`/now`)

### Nice-to-Haves

- [ ] Social syndication (POSSE) — manual or automated
- [ ] Dark/light mode toggle

- [ ] `/bookshelf` or `/reading` page
- [ ] `/listening` or `/music` page
- [ ] Email newsletter _(Ghost is off the table — evaluate Buttondown or Substack as standalone options if needed)_

---

## 7b. Content Schema (Tina CMS)

> _These are the fields defined per content type in the Tina config. All content is stored as Markdown/MDX files in the repo._

### Tagging Strategy

**Tags are kept separate per content type** — each collection manages its own tag vocabulary independently.

- A `tags` field on Writing has no relationship to `tags` on Books or Film/TV
- Tag archive pages are scoped per type: `/writing/tags/[tag]`, `/books/tags/[tag]`, etc.
- This keeps taxonomy naturally clean — no cross-type collisions, no shared list to manage
- **Trade-off:** No cross-type browsing (e.g. you can't pull everything tagged "2025" across all content types in one view)
- **Future consideration:** If cross-type linking ever becomes useful, a shared taxonomy layer can be added later without breaking the existing per-type tags

### Writing

| Field     | Type      | Required | Notes                                      |
| --------- | --------- | -------- | ------------------------------------------ |
| `title`   | string    | Yes      |                                            |
| `date`    | datetime  | Yes      | Used for sorting and URL generation        |
| `slug`    | string    | Yes      | Auto-generated from title, editable        |
| `body`    | rich-text | Yes      | Main content                               |
| `excerpt` | string    | No       | Short summary for feeds and social sharing |
| `tags`    | string[ ] | No       |                                            |
| `draft`   | boolean   | No       | Defaults to false                          |

### Photography

| Field     | Type      | Required | Notes                                   |
| --------- | --------- | -------- | --------------------------------------- |
| `title`   | string    | Yes      |                                         |
| `date`    | datetime  | Yes      |                                         |
| `slug`    | string    | Yes      |                                         |
| `images`  | image[ ]  | Yes      | One or more photos                      |
| `caption` | string    | No       | Alt text / caption shown under photo(s) |
| `body`    | rich-text | No       | Optional notes or context               |
| `tags`    | string[ ] | No       |                                         |
| `draft`   | boolean   | No       |                                         |

### Music

> _Audio is always embedded — either from SoundCloud or Bandcamp, used interchangeably. No self-hosted audio files._

| Field      | Type      | Required | Notes                                                        |
| ---------- | --------- | -------- | ------------------------------------------------------------ |
| `title`    | string    | Yes      |                                                              |
| `date`     | datetime  | Yes      |                                                              |
| `slug`     | string    | Yes      |                                                              |
| `embedUrl` | string    | Yes      | SoundCloud or Bandcamp embed URL — one or the other per post |
| `platform` | enum      | No       | `soundcloud` · `bandcamp` — for styling the embed correctly  |
| `body`     | rich-text | No       | Liner notes, story behind the piece                          |
| `tags`     | string[ ] | No       |                                                              |
| `draft`    | boolean   | No       |                                                              |

### Books

| Field       | Type      | Required | Notes                                   |
| ----------- | --------- | -------- | --------------------------------------- |
| `title`     | string    | Yes      | Post title (can differ from book title) |
| `date`      | datetime  | Yes      | Date of entry                           |
| `slug`      | string    | Yes      |                                         |
| `bookTitle` | string    | Yes      | Title of the book                       |
| `author`    | string    | Yes      |                                         |
| `cover`     | image     | No       | Book cover image                        |
| `status`    | enum      | Yes      | `reading` · `finished` · `want-to-read` |
| `rating`    | number    | No       | Optional 1–5 scale                      |
| `body`      | rich-text | No       | Notes, reactions, quotes                |
| `tags`      | string[ ] | No       |                                         |
| `draft`     | boolean   | No       |                                         |

### Film / TV

| Field        | Type      | Required | Notes                         |
| ------------ | --------- | -------- | ----------------------------- |
| `title`      | string    | Yes      | Post title                    |
| `date`       | datetime  | Yes      | Date watched                  |
| `slug`       | string    | Yes      |                               |
| `mediaTitle` | string    | Yes      | Title of the film or show     |
| `director`   | string    | No       |                               |
| `year`       | number    | No       | Release year                  |
| `poster`     | image     | No       | Poster or still image         |
| `mediaType`  | enum      | No       | `film` · `tv` · `short`       |
| `rating`     | number    | No       | Optional 1–5 scale            |
| `body`       | rich-text | No       | Reaction, notes, brief review |
| `tags`       | string[ ] | No       |                               |
| `draft`      | boolean   | No       |                               |

### Miscellaneous

| Field     | Type      | Required | Notes                                |
| --------- | --------- | -------- | ------------------------------------ |
| `title`   | string    | Yes      |                                      |
| `date`    | datetime  | Yes      |                                      |
| `slug`    | string    | Yes      |                                      |
| `linkUrl` | string    | No       | If the post is primarily linking out |
| `body`    | rich-text | Yes      |                                      |
| `tags`    | string[ ] | No       |                                      |
| `draft`   | boolean   | No       |                                      |

### Static Pages (About, Now)

> _These are single-instance pages, not collections — edited directly in Tina as global documents._

| Field         | Type      | Notes                        |
| ------------- | --------- | ---------------------------- |
| `body`        | rich-text | Main page content            |
| `lastUpdated` | datetime  | Especially useful for `/now` |

---

## 8. Open Questions

- [x] ~~What platform / stack will this be built on?~~ → **Astro + Tina CMS, static site, hosted on personal Apache server**
- [ ] Who is the audience — truly public, or soft public?
- [ ] Will there be an email list?
- [x] ~~How will music be hosted/embedded?~~ → **Embedded from SoundCloud or Bandcamp interchangeably, no self-hosted audio**
- [ ] Will photos be hosted on the blog or linked from Instagram? → **TBD — self-hosting on Apache server is an option, but other avenues may be explored**
- [ ] What does the post URL structure look like?
- [ ] Does the site need a dark mode? → **Yes, a light/dark toggle is desired — revisit once colors and layout are locked**
- [x] ~~Which color palette and type pairing feels right?~~ → **Japanese Poster palette (dark charcoal / warm gold / orange-red) + Almendra italic 700 / Source Serif 4 / Inter**
- [ ] Is there a tagline or short description for the site?

---

## 9. Inspiration & References

> _To be filled in — add sites, blogs, or designs that feel like the right direction._

-
-
-
- ***

## 10. Next Steps

1. **Workshop colors & fonts** — pick a direction from Section 6
2. **Choose a platform** — evaluate options in Section 7
3. **Define the tagline** — a one-liner that captures the spirit of the site
4. **Sketch a rough page structure** — homepage, post page, about page
5. **Set up the domain** — confirm DNS and hosting
6. **Write an "About" page draft**

---

_This document is a living brief and will be updated as decisions are made._

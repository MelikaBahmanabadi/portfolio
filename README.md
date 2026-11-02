# Melika Bahman-Abadi — AI Engineer portfolio

A premium, single-page portfolio with dedicated case studies, a generated PDF
resume and live GitHub integration. Built with Next.js (App Router), React and
hand-written CSS.

## What's inside

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, about, expertise, projects, GitHub activity, experience, resume, contact |
| `/projects/[slug]` | Case study: overview, problem, features, architecture, stack, source |
| `/resume` | Full resume, print-friendly |
| `/api/resume` | Generated PDF resume download |
| `/api/contact` | Contact-form endpoint (validation + storage + optional email) |
| `/sitemap.xml`, `/robots.txt` | SEO plumbing |

## Content lives in data, not components

- `data/profile.ts` — bio, expertise, experience, education, publications,
  social links, resume skills. Everything the site says about Melika comes from
  here.
- `data/projects.ts` — curated project catalogue with categories, stack,
  problem/features/architecture copy, repository and live-demo URLs.

Both files only contain verified information (GitHub profile, repository
READMEs, arXiv papers). LinkedIn blocks automated access, so employment dates
and degree details are intentionally absent — add them in `data/profile.ts` when
you have them, and the timeline, resume page and PDF update automatically.

## Adding a project

Append an entry to `projects` in `data/projects.ts`. The card grid, filters,
case-study page, sitemap and PDF resume all pick it up. Set `embedUrl` to the
deployed URL when the site can be shown in an iframe; the featured card will
then offer an in-page live preview.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

The Base44 sandbox uses `docker-compose.base44.yml` instead — see `AGENTS.md`.

## GitHub integration

`lib/github.ts` reads the public API with a one-hour cache and degrades to the
curated data if it is unavailable. Set `GITHUB_TOKEN` (read-only, `public_repo`
is enough) to raise the rate limit.

## Contact form

`POST /api/contact` validates the submission, appends it to
`.data/messages.jsonl` (git-ignored, created at runtime) and — when
`RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set — emails it through Resend. No
credentials are required to run the site; the form reports success either way
because the message is persisted.

## Design notes

Navy `#17243D`, dusty rose `#B78D9E`, warm rose `#D6A9B5`, cream `#FAF5F1`,
warm white `#FFFCFA` and muted grey `#777580`, taken from the portrait. Fraunces
for display type, Inter for body text. Organic blobs and rounded cards carry the
editorial warmth of the reference layout; navy bands and rose accents keep the
identity professional.

Motion is limited to scroll reveals, hover lifts and one soft pulse, and is
disabled under `prefers-reduced-motion`.

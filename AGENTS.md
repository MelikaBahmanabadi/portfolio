# Agent notes — Melika portfolio

## Running it here

```bash
docker compose -f docker-compose.base44.yml up -d
```

One service (`web`, `node:22`) runs `npm install && npm run dev` on host port
3000 from the bind-mounted source. Dependencies live in the `node_modules`
volume, installed at container start from `package.json`; there is no
`package-lock.json` committed yet, and adding one is safe (the start command
uses `npm install`, so it will simply be respected).

Health: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`

## Verification worth repeating

- `docker compose -f docker-compose.base44.yml exec -T web npm run typecheck`
- Home renders the hero, 11 project cards, the featured live demo and the
  GitHub activity block (the last one needs outbound access to api.github.com;
  it degrades to a link if rate-limited).
- `/projects/persian-asr-pipeline` renders a full case study.
- `/resume.pdf` returns a 2-page PDF (`%PDF-1.4`, valid `startxref`).
- `POST /api/contact` with an invalid email returns 400; a valid payload returns
  `{"ok":true}` and appends to `.data/messages.jsonl`.

## Things that are intentional

- **No LinkedIn-sourced content.** LinkedIn blocks automated access. Experience
  dates, degree title and any older roles are missing rather than invented.
  `data/profile.ts` is the single place to add them.
- **No fabricated demos.** The only embedded live site is the real GitHub Pages
  deployment (`melikabahmanabadi.github.io/real-estate-website`), which sends no
  frame-blocking headers. Other projects link to source only.
- **Designed project plates, not fake screenshots.** Cards use the typographic
  `ProjectCover` component; there is no simulated UI pretending to be a product.
- **Contact form storage.** Submissions go to `.data/messages.jsonl`
  (git-ignored). Email delivery is optional via `RESEND_API_KEY` +
  `CONTACT_TO_EMAIL`; without them the form still succeeds because the message
  is persisted.

## Sandbox-only configuration

`next.config.ts` appends the preview origin to `allowedDevOrigins` **only** when
`BASE44_PREVIEW_MODE === "1"` and `BASE44_PUBLIC_HOST_SUFFIX` is set. With the
flag unset (local dev, CI, production build) Next keeps its defaults. The origin
must be the public preview host (`3000-<suffix>`), never the sandbox host.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` builds a static export and publishes it to
<https://melikabahmanabadi.github.io/portfolio/>. It runs on pushes to `main`
(and on manual dispatch). The first run creates the Pages site itself:
`configure-pages` runs with `enablement: true` under `pages: write`. If the token
may not create it, `GET /repos/:owner/:repo/pages` returns 404 and the step
fails — enable Pages once under Settings → Pages → Source "GitHub Actions", then
re-run the workflow.

- `NEXT_PUBLIC_STATIC_EXPORT=1` is the only switch, set by the workflow. It makes
  `next.config.ts` export to `out/` with `basePath: /portfolio` and static images.
  Keep that base path in sync with `lib/site.ts`.
- Plain `<a href>` and metadata files bypass Next's basePath rewrite, so they go
  through `asset()` from `lib/site.ts`. `next/image` with a static import and
  metadata image/canonical URLs already get the base path applied by Next — don't
  prefix those twice.
- Static export requires route handlers to be static: `/resume.pdf` and the
  `robots`/`sitemap` routes carry `export const dynamic = "force-static"`. A
  dotted route segment (`app/resume.pdf/route.ts`) keeps the `.pdf` filename in
  the export.
- `POST /api/contact` cannot exist on Pages, so `components/contact.tsx` renders a
  LinkedIn fallback when the flag is set. The server endpoint is untouched for
  dev/production.

Reproduce the published build and check it under its real subpath:

```bash
NEXT_PUBLIC_STATIC_EXPORT=1 NEXT_PUBLIC_SITE_URL=https://melikabahmanabadi.github.io/portfolio npx next build
# out/ serves at /portfolio — index.html must reference /portfolio/_next/...,
# out/resume.pdf must start with %PDF, and sitemap/og:image URLs must carry the
# subpath exactly once.
```

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
- `/api/resume` returns a 2-page PDF (`%PDF-1.4`, valid `startxref`).
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

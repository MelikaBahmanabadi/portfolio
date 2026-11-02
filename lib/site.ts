/**
 * GitHub Pages export switch. It must be `NEXT_PUBLIC_*` because client
 * components read it too (the contact form falls back to LinkedIn on the
 * static build). Only the deploy workflow sets it to "1"; `next dev`,
 * `next build` and `next start` keep the normal server behaviour.
 */
export const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/** Project subpath the static export is served from (see next.config.ts). */
export const basePath = staticExport ? "/portfolio" : "";

/**
 * Prefix a file in `public/`, or a file exported by a route handler, for the
 * current build. Plain `<a href>` and metadata URLs are not rewritten by
 * Next's basePath, so they go through here.
 */
export function asset(path: string): string {
  return `${basePath}${path}`;
}

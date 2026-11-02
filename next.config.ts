import type { NextConfig } from "next";

/**
 * The Base44 sandbox serves the preview through a proxy on a public hostname,
 * so Next has to be told that origin is allowed to request dev assets/HMR.
 * Only applied when BASE44_PREVIEW_MODE === "1"; ordinary local dev, CI and
 * production builds keep Next's default behaviour.
 */
const previewOrigin =
  process.env.BASE44_PREVIEW_MODE === "1" && process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? [`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`]
    : [];

/**
 * GitHub Pages only serves static files. The deploy workflow sets
 * NEXT_PUBLIC_STATIC_EXPORT=1 so the build exports to `out/` under the
 * repository subpath (https://melikabahmanabadi.github.io/portfolio) — keep
 * the base path in sync with `lib/site.ts`. Unset, nothing changes: `next dev`
 * and `next build` keep the normal server build with the API routes.
 */
const githubPages = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(previewOrigin.length > 0 ? { allowedDevOrigins: previewOrigin } : {}),
  ...(githubPages
    ? {
        output: "export" as const,
        basePath: "/portfolio",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;

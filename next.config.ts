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

const nextConfig: NextConfig = {
  ...(previewOrigin.length > 0 ? { allowedDevOrigins: previewOrigin } : {}),
};

export default nextConfig;

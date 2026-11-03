import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no Node server).
  output: "export",
  // Emit /work/slug/index.html so GitHub Pages serves clean URLs.
  trailingSlash: true,
  // The default image optimizer needs a server; screenshots are pre-sized instead
  // (see scripts/build-shots.mjs and scripts/make-thumbs.py).
  images: { unoptimized: true },
};

export default nextConfig;

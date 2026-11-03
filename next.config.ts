import type { NextConfig } from "next";

// GitHub Pages project site: https://abdullah0335.github.io/Myportfolio-/
// Change this (and SITE_URL in lib/site.ts) if the repository is renamed.
const basePath = "/Myportfolio-";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no Node server).
  output: "export",
  basePath,
  // Emit /work/slug/index.html so GitHub Pages serves clean URLs.
  trailingSlash: true,
  // The default image optimizer needs a server; screenshots are pre-sized instead
  // (see scripts/build-shots.mjs and scripts/make-thumbs.py).
  images: { unoptimized: true },
  // Exposed so plain <a>/<img> paths to files in /public can be prefixed too.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

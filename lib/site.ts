/** Base path the site is served under (set in next.config.ts). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Public URL of the deployed site, with a trailing slash. */
export const SITE_URL = "https://abdullah0335.github.io/Myportfolio-/";

/**
 * Prefix a path to a file in /public with the base path. Next.js does this for
 * <Link> automatically, but not for plain hrefs or unoptimized image sources.
 */
export const asset = (path: string) => `${BASE_PATH}${path}`;

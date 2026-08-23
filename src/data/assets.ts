// Asset URLs, R2-backed.
// In production, PUBLIC_ASSETS_BASE points at the R2 custom domain
// (e.g. https://assets.gtmwizards.com) set as a Cloudflare Pages env var.
// In local dev it is unset, so paths resolve to /public, meaning every
// asset should exist in /public with the same path during development.
// Placeholders live in /public/assets until real brand files land in R2.
const base = import.meta.env.PUBLIC_ASSETS_BASE ?? '';

export function asset(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/**
 * Open Graph image facts. Scrapers that are told the dimensions up front can
 * lay out the card before the image finishes downloading, which is the
 * difference between a link that previews instantly and one that pops in.
 * LinkedIn wants at least 1200 x 627 at roughly 1.91:1, so 1200 x 630 is the
 * standard safe size. If you replace the file, keep these in step.
 */
export const OG_IMAGE = {
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'gtmWizards: outbound for hard-to-reach industries, on tech you can take over.',
} as const;

export const ASSETS = {
  logoLight: asset('/assets/logo-light.svg'), // for light backgrounds
  logoDark: asset('/assets/logo-dark.svg'), // for dark backgrounds
  ogImage: asset('/assets/og-image.png'),
  appleTouchIcon: asset('/assets/apple-touch-icon.png'),
} as const;

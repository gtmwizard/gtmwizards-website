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

export const ASSETS = {
  logoLight: asset('/assets/logo-light.svg'), // for light backgrounds
  logoDark: asset('/assets/logo-dark.svg'), // for dark backgrounds
  ogImage: asset('/assets/og-image.png'),
  appleTouchIcon: asset('/assets/apple-touch-icon.png'),
} as const;

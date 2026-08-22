import { SITE } from './site';

export type Seo = { title: string; description: string };

export function pageTitle(title?: string): string {
  return title ? `${title} | ${SITE.name}` : `${SITE.name}: ${SITE.tagline}`;
}

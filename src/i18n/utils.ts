import { defaultLocale, locales, routeMap, type Locale } from './ui';

export function getLangFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  if ((locales as readonly string[]).includes(first)) return first as Locale;
  return defaultLocale;
}

/** Strip a locale prefix. delocalizePath('/de/ueber-uns') -> '/ueber-uns' */
export function delocalizePath(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if ((locales as readonly string[]).includes(first)) {
    const p = `/${rest.join('/')}`;
    return p === '/' ? '/' : p.replace(/\/$/, '');
  }
  return pathname === '/' ? '/' : pathname.replace(/\/$/, '');
}

/**
 * Localize an ENGLISH path for a locale, using translated slugs from
 * routeMap. localizeRoute('/about', 'de') -> '/de/ueber-uns'.
 * Unmapped paths keep the English slug under the locale prefix.
 */
export function localizeRoute(englishPath: string, locale: Locale): string {
  const clean = englishPath.startsWith('/') ? englishPath : `/${englishPath}`;
  if (locale === defaultLocale) return clean;
  const mapped = routeMap[clean]?.[locale] ?? clean;
  return `/${locale}${mapped === '/' ? '' : mapped}` || `/${locale}`;
}

/** Reverse lookup: localized path (no prefix) -> English path, if known. */
export function englishPathFor(localizedPath: string, locale: Locale): string {
  if (locale === defaultLocale) return localizedPath;
  for (const [en, m] of Object.entries(routeMap)) {
    if (m[locale] === localizedPath) return en;
  }
  return localizedPath;
}

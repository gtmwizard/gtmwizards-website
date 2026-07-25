// Static marketing site for gtmWizards, deployed to Cloudflare Pages.
// Same architecture as hubsell-website: output 'static', no SSR adapter.
// Forms are handled by a Pages Function (functions/api/contact.ts).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { translatedRoutes } from './src/i18n/ui';

// Sitemap policy (ported from hubsell-website): English URLs are always
// included. A locale URL is included only when it is a REAL translated
// page, i.e. its path is listed in translatedRoutes (src/i18n/ui.ts).
// Untranslated locale URLs are Astro fallback stubs (redirects to English)
// and stay out of the sitemap.
const LOCALE_URL = /^https:\/\/www\.gtmwizards\.com\/(de|nl)(\/.*)?$/;
function inSitemap(page) {
  const m = page.match(LOCALE_URL);
  if (!m) return true; // English URL
  const routes = translatedRoutes[m[1]];
  if (!routes) return false; // locale not live yet
  let path = m[2] || '/';
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return routes.includes(path);
}

export default defineConfig({
  site: 'https://www.gtmwizards.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: inSitemap })],
  build: { format: 'directory' },
  // i18n, hubsell pattern: English at /, other locales prefixed. Until a
  // locale has real pages under src/pages/de or src/pages/nl, Astro
  // generates redirect stubs to English. To go live with German:
  //   1. add translated data files (e.g. src/data/home.de.ts)
  //   2. add pages under src/pages/de/ that render them
  //   3. list the translated paths in translatedRoutes (src/i18n/ui.ts)
  i18n: {
    locales: ['en', 'de', 'nl'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'redirect',
    },
    fallback: { de: 'en', nl: 'en' },
  },
});

// Static marketing site for gtmWizards, deployed to Cloudflare Pages.
// Output 'static', no SSR adapter. Forms are handled by a Pages Function
// (functions/api/contact.ts).
//
// The site is English only. The i18n layer was removed on 25 August 2026;
// the translated slugs are parked in docs/TRANSLATION-ROUTES.md along with
// the steps to bring a locale back.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.gtmwizards.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
});

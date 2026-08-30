# gtmwizards.com, the Astro site

Static marketing site for gtmWizards, mirroring the architecture of
`hubsell-website`: Astro (`output: 'static'`) on Cloudflare Pages, all copy
in typed data files, long-form content in markdown collections, and forms
handled by a Pages Function.

Repo: https://github.com/gtmwizard/gtmwizards-website, pushes to `main`
deploy to production via Cloudflare Pages; other branches get preview URLs.

## Stack

- **Astro 7** (`^7.1.3`), static output, deployed to **Cloudflare Pages**
- **Theme** → shadcn preset `b2qMGARRY` (base color olive, theme emerald,
  style rhea, Instrument Sans, radius 0.625rem). Tokens live as CSS
  variables in `src/styles/global.css`: the `:root` block is 1:1 with the
  shadcn scaffold (plus a `.dark` scaffold), and site aliases map onto it , 
  change a token there and the whole site follows. A future shadcn/Tailwind
  adoption can reuse the same variables unchanged.
- **Light/dark mode** → toggle in the nav top bar; no-flash inline script
  in `BaseLayout` (localStorage + `prefers-color-scheme`). Homepage
  alternates light/dark bands in light mode, dark/less-dark in dark mode.
- **Section-aware header** → the sticky nav re-tints to the section
  beneath it (base / raised / dark); the utility top bar (language +
  theme controls) hides on scroll, the main nav row stays.
- **i18n** → prepped for en/de/nl with TRANSLATED URLs. English at `/`,
  locales prefixed (`/de/loesungen/kaltakquise`). `routeMap` in
  `src/i18n/ui.ts` is the single source of truth for localized slugs;
  the language switchers and hreflang read from it. Untranslated locale
  URLs are redirect stubs and stay out of the sitemap. Launch procedure:
  `docs/HANDOFF.md` → i18n.
- **Forms** → `functions/api/contact.ts` (Pages Function → Plunk). Works
  only on Pages deployments, not `npm run dev`.
- **Assets on R2** → `src/data/assets.ts` builds URLs from
  `PUBLIC_ASSETS_BASE` (R2 custom domain, Pages env var). Locally unset,
  so `/public/assets` serves the same paths (placeholder logos for now).
  Upload with `npm run assets:sync` (credentials via `.env`, see
  `.env.example`).
- **Fonts** → self-hosted via `@fontsource` (GDPR-safe for the DACH market)
- **Sitemap** → `@astrojs/sitemap` with locale filtering (hubsell pattern)

## Layout

```
src/
  layouts/          BaseLayout (head/meta/theme/nav/footer), PageLayout, LegalLayout
  components/       Section components, dumb renderers of src/data content
  data/             ALL copy lives here (site.ts, home-content.ts, solutions-content.ts,
                    faqs.ts, testimonials.ts, navigation.ts, seo.ts, assets.ts)
  content/          Markdown collections: insights/ (blog)
  i18n/             ui.ts (locales, routeMap), utils.ts (path helpers)
  pages/            index, about, book-a-call, contact, solutions/, insights/,
                    legal .md pages, 404
functions/api/contact.ts   Contact-form handler (Pages Function)
scripts/upload-assets.mjs  Local → R2 asset sync
public/            robots.txt, _headers, _redirects, favicon.svg, assets/
docs/              HANDOFF.md (takeover doc), SITEMAP.md (route inventory)
CLAUDE.md          Working agreement for AI-assisted development
```

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Deploy (Cloudflare Pages)

- Build command: `npm run build` · Output directory: `dist` · Branch: `main`
- Env vars: `PLUNK_API_KEY` (secret), `CONTACT_TO`, `PUBLIC_ASSETS_BASE`
  (build-time, redeploy after changing)

## Editing content

- Homepage copy → `src/data/home-content.ts`
- Solution pages → add/edit entries in `src/data/solutions-content.ts`
  (pages are generated automatically)
- Blog posts → drop a `.md` file in `src/content/insights/`
- Glossary terms → drop a `.md` file in `src/content/glossary/`
- Testimonials → `src/data/testimonials.ts` (homepage section renders
  once the array is non-empty; empty on purpose until real references)

## Before launch: TODO

See the full checklist in `docs/HANDOFF.md`. Highlights:

1. Real booking URL in `src/data/site.ts` + Cal.com embed in
   `src/pages/book-a-call.astro`
2. Legal pages (`privacy.md`, `terms.md`, `legal-notice.md`) → replace
   placeholders with counsel-reviewed text. The Impressum is mandatory
   for the German market.
3. Real logos → `public/assets/` → `npm run assets:sync` → set
   `PUBLIC_ASSETS_BASE`
4. Set Pages env vars and test the contact form on a preview deployment
5. Review and freeze the DE/NL slugs in `src/i18n/ui.ts` before any
   locale goes live

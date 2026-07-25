# gtmwizards.com — Astro site

Static marketing site for gtmWizards, mirroring the architecture of
`hubsell-website`: Astro (`output: 'static'`) on Cloudflare Pages, all copy
in typed data files, long-form content in markdown collections, and forms
handled by a Pages Function.

## Stack

- **Astro 5**, static output, deployed to **Cloudflare Pages**
- **Theme** → shadcn preset `b2qMGARRY` (base color olive, theme emerald,
  style rhea, Instrument Sans, radius 0.625rem). Tokens live as CSS
  variables in `src/styles/global.css`: the `:root` block is 1:1 with the
  shadcn scaffold (plus a `.dark` scaffold), and site aliases map onto it —
  change a token there and the whole site follows. A future shadcn/Tailwind
  adoption can reuse the same variables unchanged.
- **Forms** → `functions/api/contact.ts` (Pages Function → Plunk)
- **Fonts** → self-hosted via `@fontsource` (GDPR-safe for the DACH market)
- **Sitemap** → `@astrojs/sitemap` with locale filtering (hubsell pattern)
- **i18n** → prepped for en/de/nl. English at `/`, locales prefixed.
  Untranslated locale URLs are redirect stubs and stay out of the sitemap.
  To launch German: add `src/data/*.de.ts` data files, pages under
  `src/pages/de/`, list the paths in `translatedRoutes` and flip
  `liveLocales.de` in `src/i18n/ui.ts` (turns the footer switcher live and
  emits hreflang alternates automatically).
- **Dark mode** → full olive/emerald dark scaffold in `global.css`, toggle
  in the nav, no-flash inline script in `BaseLayout` (localStorage +
  `prefers-color-scheme`).
- **Section-aware header** → the sticky nav re-tints to match the section
  beneath it (base / raised / dark). Sections are auto-classified
  (`.section--raised` → raised, footer → dark); override any element with
  `data-header-theme="base|raised|dark"`.
- **Assets on R2** → `src/data/assets.ts` builds URLs from
  `PUBLIC_ASSETS_BASE` (the R2 custom domain, set as a Pages env var).
  Locally it's unset so `/public/assets` serves the same paths — currently
  placeholder logos. Upload to R2 with `npm run assets:sync` (see
  `.env.example` for the R2 credentials).

## Layout

```
src/
  layouts/          BaseLayout (head/meta/nav/footer), PageLayout, LegalLayout
  components/       Section components — dumb renderers of src/data content
  data/             ALL copy lives here (site.ts, home-content.ts, solutions-content.ts,
                    faqs.ts, testimonials.ts, navigation.ts, seo.ts)
  content/          Markdown collections: insights/ (blog), glossary/
  pages/            index, about, book-a-call, contact, solutions/, insights/,
                    glossary/, legal .md pages, 404
functions/api/contact.ts   Contact-form handler (Pages Function)
public/            robots.txt, _headers, _redirects, favicon.svg
```

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Deploy (Cloudflare Pages)

- Build command: `npm run build` · Output directory: `dist`
- Env vars for the contact form: `PLUNK_API_KEY`, `CONTACT_TO`

## Before launch — TODO

1. `src/data/site.ts` → replace `bookingUrl` with the real Cal.com link,
   confirm `contactEmail`, `linkedin`, and the Kadanco URL.
2. `src/pages/book-a-call.astro` → drop in the Cal.com embed snippet.
3. Legal pages (`privacy.md`, `terms.md`, `legal-notice.md`) → replace
   placeholders with counsel-reviewed text. The Impressum is mandatory
   for the German market.
4. `src/data/testimonials.ts` → add references as they arrive; the
   homepage section renders automatically once the array is non-empty.
5. Set Cloudflare Pages env vars and test the form end to end.
6. Replace the placeholder logos in `public/assets/` with real brand
   files, upload them to R2 (`npm run assets:sync`), and set
   `PUBLIC_ASSETS_BASE` in Cloudflare Pages.

## Editing content

- Homepage copy → `src/data/home-content.ts`
- Solution pages → add/edit entries in `src/data/solutions-content.ts`
  (pages are generated automatically)
- Blog posts → drop a `.md` file in `src/content/insights/`
- Glossary terms → drop a `.md` file in `src/content/glossary/`

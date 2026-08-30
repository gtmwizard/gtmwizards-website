# gtmwizards.com, the Astro site

Static marketing site for gtmWizards, mirroring the architecture of
`hubsell-website`: Astro (`output: 'static'`) on Cloudflare Pages, all copy
in typed data files, long-form content in markdown collections, and forms
handled by a Pages Function.

Repo: https://github.com/gtmwizard/gtmwizards-website, pushes to `main`
deploy to production via Cloudflare Pages; other branches get preview URLs.

## Stack

- **Astro 7** (`^7.1.3`), static output, deployed to **Cloudflare Pages**
- **Theme**: green and plum. Green `#17E769` as a fill, plum `#2B0A33` for
  dark bands, ink `#0C0D0E` for type, on white. Tokens are CSS variables in
  `src/styles/global.css`, keeping shadcn variable names in layer one and
  site aliases in layer two, so components never touch a literal colour.
  Two contrast rules are easy to break: never white on green (1.66:1), and
  never green as type on white. On light surfaces the accent colour is
  plum. See `docs/STYLEGUIDE.md`.
- **Light mode only.** There is no dark-mode toggle. The light and dark
  rhythm comes from `.section--dark`, which repaints its own tokens so the
  cards, rules and status dots inside it restyle automatically.
- **Type**: Instrument Sans for display and body, IBM Plex Mono for spec
  labels and eyebrows. Self-hosted through `@fontsource` for GDPR.
- **Motion**: all of it in `src/scripts/motion.ts`, driven by Anime.js.
  Components carry a hook attribute and never a duration or a delay.
  Content hidden for a reveal is hidden only under `[data-motion='on']`,
  which an inline script in `BaseLayout` sets and a fallback timer strips
  if the module fails to load. `REVEAL` in `motion.ts` and the matching
  selector list in `global.css` must stay in sync.
- **The thread and the margin labels**: one continuous line down the left
  margin, drawn per section as contiguous pseudo-element segments with a
  spark at each section top, plus a vertical one or two word label naming
  the current section. Both sit on the shared `--rail-x` axis. The thread
  hides below 48rem, the labels below 80rem, where the margin runs out.
- **English only**, `lang="en-GB"`, British spelling. There is no i18n
  layer. German is offered inside `LanguageEdge.astro` and is deliberately
  not threaded through the rest of the site. Before reintroducing locales,
  read `docs/TRANSLATION-ROUTES.md`.
- **Forms**: `functions/api/contact.ts`, a Pages Function posting to Plunk.
  It only works on a Pages deployment, not in `npm run dev`.
- **Assets on R2**: `src/data/assets.ts` builds URLs from
  `PUBLIC_ASSETS_BASE`, the R2 custom domain, set as a Pages variable.
  Locally it is unset, so `/public/assets` serves the same paths. Upload
  with `npm run assets:sync`, credentials in `.env`, see `.env.example`.
- **Sitemap**: `@astrojs/sitemap`.

## Layout

```
src/
  layouts/          BaseLayout (head, meta, motion bootstrap, nav, footer),
                    PageLayout, LegalLayout
  components/       Section components, dumb renderers of src/data content.
                    Sparks, SignalFunnel, ToolStrip, LanguageEdge and
                    SectionRail carry the visual language.
  data/             ALL copy lives here (site.ts, home-content.ts,
                    solutions-content.ts, faqs.ts, testimonials.ts,
                    navigation.ts, seo.ts, assets.ts)
  content/          Markdown collections: insights/ (blog), glossary/
  scripts/motion.ts All animation, in one file
  styles/global.css Token layer, shared styles, the thread, the labels
  pages/            index, about, book-a-call, contact, solutions/,
                    insights/, glossary/, legal .md pages, 404
functions/api/contact.ts   Contact form handler (Pages Function)
scripts/            upload-assets.mjs (local to R2 sync),
                    check-dashes.mjs (dash linter)
public/             robots.txt, _headers, _redirects, favicon, assets/
docs/               HANDOFF.md, SITEMAP.md, STYLEGUIDE.md,
                    TRANSLATION-ROUTES.md
CLAUDE.md           Working agreement for AI assisted development
```

## Develop

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # outputs to dist/
npm run check:dashes   # fails on any em dash or en dash
```

`npm run check:dashes` must pass before every drop. It is not wired into
the build, so it is a habit rather than a gate.

## Deploy (Cloudflare Pages)

- Build command `npm run build`, output directory `dist`, branch `main`
- Variables: `PLUNK_API_KEY` (secret), `CONTACT_TO`, `PUBLIC_ASSETS_BASE`.
  `PUBLIC_ASSETS_BASE` is read at build time, so redeploy after changing it.

## Editing content

- Homepage copy: `src/data/home-content.ts`. Each section export also
  carries its `label`, the one or two words shown in the margin.
- Solution pages: entries in `src/data/solutions-content.ts`, pages
  generate themselves from the list.
- Blog posts: a `.md` file in `src/content/insights/`
- Glossary terms: a `.md` file in `src/content/glossary/`
- Testimonials: `src/data/testimonials.ts`. Empty on purpose. The homepage
  section renders as soon as the array is not empty.

## Before launch

The full checklist lives in `docs/HANDOFF.md`. The short version:

1. Real booking URL in `src/data/site.ts` and the embed in
   `src/pages/book-a-call.astro`
2. Legal pages, `privacy.md`, `terms.md`, `legal-notice.md`, replaced with
   text a lawyer has read. The Impressum is mandatory for Germany.
3. Real logos into `public/assets/`, then `npm run assets:sync`, then set
   `PUBLIC_ASSETS_BASE`
4. Pages variables set, contact form tested on a preview deployment

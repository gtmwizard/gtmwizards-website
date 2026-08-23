# Handoff: gtmwizards.com

Everything a developer (or future Claude session) needs to take over this
project. Last updated: 2026-08-22.

## What this is

Static marketing site for gtmWizards, a done-for-you outbound agency for
traditional industries (DACH / Benelux / international), owned by the
founders of hubsell.com (outbound platform) and kadanco.com (B2B data).
Core positioning: provable tech and data, native-language outbound
(DE/NL/EN), senior operators, no lock-in, "the agency you can graduate
from" (clients can in-source onto hubsell).

Architecture intentionally mirrors the `hubsell-website` repo so both
sites stay maintainable by the same people.

## Stack

| Concern    | Choice                                                     |
| ---------- | ---------------------------------------------------------- |
| Framework  | Astro 7, `output: 'static'`, `build.format: 'directory'`   |
| Hosting    | Cloudflare Pages (build: `npm run build`, output: `dist`)  |
| Forms      | Pages Function `functions/api/contact.ts` → Plunk          |
| Assets     | Cloudflare R2 behind `PUBLIC_ASSETS_BASE` custom domain    |
| Theme      | Plum and green. Accent `#17E769`, dark sections `#2B0A33`, ink `#0C0D0E`, Instrument Sans, radius 0.625rem, as CSS variables. Light mode only |
| Fonts      | Self-hosted via `@fontsource` (GDPR / DACH requirement)    |
| i18n       | Astro built-in; en live, de/nl prepped as redirect stubs   |

## Repo map

```
src/data/            ALL site copy (typed TS). Components never hold copy.
  site.ts            Site constants: URLs, booking link, emails, languages
  home-content.ts    Homepage sections
  solutions-content.ts  One entry per /solutions/* page (pages auto-generate)
  faqs.ts, testimonials.ts, navigation.ts, seo.ts, assets.ts
src/components/      Section components (Hero, GraduationPath, Nav, …)
src/layouts/         BaseLayout (head/meta/theme/nav/footer), PageLayout, LegalLayout
src/content/         Markdown collections: insights/ (blog)
src/i18n/            ui.ts (locale registry), utils.ts (path helpers)
src/styles/global.css  Token layer + all shared styles
src/pages/           Routes, see docs/SITEMAP.md
functions/api/       contact.ts (Pages Function)
scripts/             upload-assets.mjs (local → R2 sync)
public/assets/       Placeholder logos (mirrors R2 paths for local dev)
```

## Behaviors to know

- **No dark mode.** Removed on 2026-08-22. The page rhythm is a plum
  `.section--dark` band on a white page; the band repaints its own tokens
  so child components restyle with no extra CSS.
- **Sparks.** `Sparks.astro` scatters the wordmark's four-point spark
  across a dark band, slowly twinkling, reduced-motion safe. It is on the
  hero and the dark CTA band. Drop it in as the first child of any
  `position: relative` `.section--dark` and give the real content
  `z-index: 1`. Positions, sizes and opacities are all in that one file.
  Light sections keep `.gridpaper` instead.
- **Colour rules.** White on green fails at 1.66:1, and green fails as
  type on white. On light surfaces the accent is plum `#7A2A8C`. Green
  appears on light surfaces only as a fill.
- **Section-aware header**: script in `Nav.astro` re-tints the sticky
  header per section under it (`base` / `raised` / `dark`). Auto-detects
  `.section--raised` and the footer; override with
  `data-header-theme="…"` on any element.
- **Testimonials**: `src/data/testimonials.ts` is an empty array on
  purpose (new brand, no fake proof). Homepage section renders as soon as
  the array is non-empty.
- **Sitemap**: locale URLs excluded until listed in `translatedRoutes`
  (`src/i18n/ui.ts`), same policy as hubsell-website.

## i18n: launching German (or Dutch)

URLs are translated per locale (e.g. `/de/loesungen/kaltakquise`), with
`routeMap` in `src/i18n/ui.ts` as the single source of truth mapping
English paths to localized slugs. The nav/footer switchers and hreflang
all read from it. Current slugs are drafts. Review, then freeze before
launch (changing slugs later means permanent redirects).

1. Review/freeze the locale's slugs in `routeMap`.
2. Create translated data files, e.g. `src/data/home.de.ts`.
3. Create pages under `src/pages/de/` at the TRANSLATED paths
   (e.g. `src/pages/de/loesungen/kaltakquise.astro`).
4. In `src/i18n/ui.ts`: add the localized paths to `translatedRoutes.de`,
   set `liveLocales.de = true` (switcher goes live, "soon" badge drops,
   hreflang alternates emit).
5. Add `_redirects` entries from Astro's auto fallback stubs at English
   slugs (`/de/solutions/*`) to the translated URLs.

## Repository & deployment

- GitHub: https://github.com/gtmwizard/gtmwizards-website (branch `main`).
- Hosting: Cloudflare Pages connected to the repo. Every push to `main`
  builds and deploys production; pushes to other branches create preview
  deployments with unique URLs.
- Pages build settings: framework preset **Astro**, build command
  `npm run build`, output directory `dist`. Node version can be pinned
  with an `NODE_VERSION` env var if builds ever drift from local.
- The contact form only works on Pages (it is a Pages Function), not in
  `npm run dev`. Test it on a preview deployment.

## Environment variables (Cloudflare Pages dashboard)

| Var                  | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `PLUNK_API_KEY`      | Contact-form email provider (secret)      |
| `CONTACT_TO`         | Inbox receiving form submissions          |
| `PUBLIC_ASSETS_BASE` | R2 custom domain, e.g. https://assets.gtmwizards.com |

Local R2 upload creds go in `.env` (see `.env.example`), used only by
`npm run assets:sync`. Never committed, never deployed.

## Launch checklist (open TODOs)

- [ ] Real booking URL in `src/data/site.ts` (`bookingUrl`) + Cal.com
      embed in `src/pages/book-a-call.astro`
- [ ] Confirm `contactEmail`, `linkedin`, `kadancoUrl` in `site.ts`
- [ ] Legal pages: replace placeholders in `privacy.md`, `terms.md`,
      `legal-notice.md` (Impressum is mandatory for Germany, § 5 DDG)
- [ ] Real logos → `public/assets/` → `npm run assets:sync` → set
      `PUBLIC_ASSETS_BASE`
- [ ] OG image: a working 1200 x 630 version is in `public/assets/og-image.png`
      with its source SVG beside it. Replace with a final design if you want.
- [ ] Set Pages env vars; test contact form end to end
- [ ] Verify the "handover" claim wording against actual contracts
      (campaigns/data live in client's hubsell workspace from day one)
- [ ] First testimonials into `src/data/testimonials.ts` when available

## Motion

All motion is choreographed in **`src/scripts/motion.ts`**, one file, loaded
once from `BaseLayout`. Components carry a hook attribute at most
(`data-motion-hero`, `data-motion-item`, `data-motion-rail`) and never a timing
value. Two constants at the top of that file, `EASE` and `DUR`, set the feel of
the whole site.

- **Library:** `animejs` v4, bundled from npm, never from a CDN. A German site
  that self-hosts its fonts for GDPR reasons must not then hand visitor IPs to
  a US CDN. Cost is about 16 KB gzipped, the only JS bundle on the site.
- **What animates:** the hero entrance on load (eyebrow, headline, lede,
  buttons, then the datasheet filling in row by row), scroll reveals for every
  other section via one shared IntersectionObserver, the sparks fading in
  before handing off to their CSS twinkle loop, and the graduation rail, where
  the connector draws itself and each marker springs in as the line reaches it.
- **What it degrades to:** an inline script in `BaseLayout` sets
  `data-motion="on"` on `<html>` only when JS is running and the visitor has
  not asked for reduced motion. `global.css` hides reveal targets only under
  that attribute. The same script arms a 2.5 second fallback timer that strips
  the attribute if `motion.ts` never runs, so a blocked bundle, a JS error or
  a slow network all end with a readable page rather than a blank one.
  `motion.ts` clears that timer as its first action.
- **If you add a new section component**, its `.eyebrow`, `h2`, `.lede` and
  `.card` elements are picked up automatically. Opt out with `data-no-motion`
  on the section. If you introduce a new structural class that should reveal,
  add it to `REVEAL` in `motion.ts` **and** to the matching selector list in
  `global.css`. They must stay in sync or you get a flash of hidden content.

## Open Graph and share cards

Every page emits a full Open Graph set from `BaseLayout`. Nothing needs to be
done per page unless you want to override the share image.

- **Always emitted:** `og:type`, `og:site_name`, `og:title`, `og:description`,
  `og:url`, `og:locale` plus `og:locale:alternate` for the other two languages,
  `og:image` with `:type`, `:width`, `:height` and `:alt`, and the matching
  `twitter:card`, `twitter:title`, `twitter:description` and `twitter:image`.
- **Insight posts** switch to `og:type="article"` and add
  `article:published_time`, `article:modified_time` (from an optional `updated`
  date in frontmatter) and `article:author`.
- **Per-page override:** pass `ogImage` and `ogImageAlt` to `BaseLayout` or
  `PageLayout`, or set `image` and `imageAlt` in an insight post's frontmatter.
  Root-relative paths are fine, they get resolved to absolute automatically.

**The absolute URL trap.** Open Graph requires a fully qualified image URL.
`ASSETS.ogImage` is only absolute when `PUBLIC_ASSETS_BASE` is set, so it is
relative in local dev and in any build missing that env var. `BaseLayout`
runs it through `new URL(..., Astro.site)`, which passes an already absolute
R2 URL straight through and resolves a relative one against the site origin.
Do not bypass that.

**The image.** `public/assets/og-image.png`, 1200 x 630 (1.91:1), which is
LinkedIn's preferred ratio and above its 1200 x 627 minimum. The source is
`public/assets/og-image.source.svg`, so it can be re-rendered or edited. It is
a working version built from the brand assets, not a final design.

**Testing.** Scrapers cannot see localhost, so this can only be verified after
deploy. LinkedIn caches aggressively and there is no manual purge, so check
with the LinkedIn Post Inspector before sharing any URL widely. Facebook's
Sharing Debugger and Slack both re-scrape on demand.

## Decisions log

- Open Graph (2026-08-23): full OG and Twitter card set, article metadata on
  insight posts, per-page image overrides. Fixed two bugs found on the way:
  the share image URL could be emitted relative (invalid for OG), and
  `<html lang>` was hardcoded to `en` on every page including the German and
  Dutch routes.
- Motion (2026-08-22): Anime.js adopted after a side-by-side against a
  CSS-only build. The entrances look near identical either way; the library
  was chosen for the timeline choreography and for the SVG rail draw, which
  CSS cannot do. It is the first and only JS bundle on the site.
- Brand (2026-08-22): plum and green palette, real gtmWizards wordmark
  and favicon in place, dark mode removed, glossary removed, every em
  dash and en dash swept out with `npm run check:dashes` to keep it that
  way. Instrument Sans kept: it is already self-hosted and GDPR-clean,
  and it suits this brand better than Kadanco's Fira Sans.
- Positioning (2026-08-22): gtmWizards moves to the Kadanco Group story,
  merged with the outbound offer already on this site. Copy rewrite is a
  separate, later drop.

- Astro 5 → 7 (2026-07-25): resolved all `npm audit` findings; matches
  hubsell-website's major version.
- shadcn preset applied as raw CSS variables, not a Tailwind/React
  conversion. A static marketing site gains nothing from the runtime,
  and the token layer maps 1:1 if shadcn components are added later.
- Display font Bricolage Grotesque was dropped in favor of preset-faithful
  Instrument Sans everywhere; revert = one line (`--font-display`).
- No i18n content yet by choice; architecture-first so translation is
  additive, not a refactor.
- Translated URLs (not just translated content) chosen for locale SEO
  and positioning consistency; centralized in `routeMap` (2026-07-25).
- Homepage rhythm: light mode alternates white / muted / olive-dark
  bands (`.section--dark`); in dark mode the dark bands become "less
  dark" elevated surfaces. Header follows via the section-aware script.

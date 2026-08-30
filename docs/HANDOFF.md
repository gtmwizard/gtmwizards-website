# Handoff — gtmwizards.com

Everything a developer (or future Claude session) needs to take over this
project. Last updated: 2026-07-25.

## What this is

Static marketing site for gtmWizards, a done-for-you outbound agency for
traditional industries (DACH / Benelux / international), owned by the
founders of hubsell.com (outbound platform) and kadanco.com (B2B data).
Core positioning: provable tech and data, native-language outbound
(DE/NL/EN), senior operators, no lock-in — "the agency you can graduate
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
| Theme      | shadcn preset `b2qMGARRY` (olive base, emerald theme, rhea style, Instrument Sans, radius 0.625rem) as CSS variables |
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
src/content/         Markdown collections: insights/ (blog), glossary/
src/i18n/            ui.ts (locale registry), utils.ts (path helpers)
src/styles/global.css  Token layer + all shared styles
src/pages/           Routes — see docs/SITEMAP.md
functions/api/       contact.ts (Pages Function)
scripts/             upload-assets.mjs (local → R2 sync)
public/assets/       Placeholder logos (mirrors R2 paths for local dev)
```

## Behaviors to know

- **Dark mode**: `.dark` class on `<html>`. Toggle in nav; no-flash inline
  script in `BaseLayout` head reads localStorage + system preference.
- **Section-aware header**: script in `Nav.astro` re-tints the sticky
  header per section under it (`base` / `raised` / `dark`). Auto-detects
  `.section--raised` and the footer; override with
  `data-header-theme="…"` on any element.
- **Testimonials**: `src/data/testimonials.ts` is an empty array on
  purpose (new brand, no fake proof). Homepage section renders as soon as
  the array is non-empty.
- **Sitemap**: locale URLs excluded until listed in `translatedRoutes`
  (`src/i18n/ui.ts`) — same policy as hubsell-website.

## i18n: launching German (or Dutch)

URLs are translated per locale (e.g. `/de/loesungen/kaltakquise`), with
`routeMap` in `src/i18n/ui.ts` as the single source of truth mapping
English paths to localized slugs. The nav/footer switchers and hreflang
all read from it. Current slugs are drafts — review, then freeze before
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
- Hosting: Cloudflare Pages connected to the repo — every push to `main`
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
- [ ] OG image (`/assets/og-image.png`) — referenced in assets.ts, not
      yet wired into BaseLayout meta
- [ ] Set Pages env vars; test contact form end to end
- [ ] Verify the "handover" claim wording against actual contracts
      (campaigns/data live in client's hubsell workspace from day one)
- [ ] First testimonials into `src/data/testimonials.ts` when available

## Decisions log

- Astro 5 → 7 (2026-07-25): resolved all `npm audit` findings; matches
  hubsell-website's major version.
- shadcn preset applied as raw CSS variables, not a Tailwind/React
  conversion — a static marketing site gains nothing from the runtime,
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

# Translated route slugs, parked

The site went **English only** on 25 August 2026 and the whole i18n layer was
removed: no locales in `astro.config.mjs`, no language switcher, no hreflang,
no `og:locale:alternate`, no redirect stubs.

This is not a decision against translating later. It is a decision not to ship
a scaffold that generates thin redirect stubs and invites someone to half
enable a locale by accident.

The German and Dutch slugs below were already worked out, so they are kept here
rather than thrown away. If a locale goes live, this is the starting point.

## How to bring a locale back

1. Restore `i18n` in `astro.config.mjs` with the locale and `fallbackType: 'redirect'`.
2. Recreate `src/i18n/ui.ts` and `src/i18n/utils.ts` from git history
   (they were deleted in the English-only commit).
3. Add translated data files, for example `src/data/home.de.ts`.
4. Add pages under `src/pages/de/` that render them.
5. Put the translated paths back in `translatedRoutes` so the sitemap filter
   includes them. Untranslated locale URLs must stay out of the sitemap.
6. Restore the hreflang block and `og:locale:alternate` in `BaseLayout.astro`.
7. Set `knowsLanguage` in `JsonLd.astro` and `languages` in `src/data/site.ts`.

Two things that bit us before and will again:

- `de-du` is **not** a valid BCP-47 tag. Never emit it as hreflang. Canonical
  those pages back to `/de/` and keep them out of the sitemap.
- `<html lang>` must follow the locale. It was hardcoded to `en` on the German
  and Dutch routes until 23 August 2026.

## The slugs

```ts
'/': { de: '/', nl: '/' },
  '/solutions': { de: '/loesungen', nl: '/oplossingen' },
  '/solutions/lead-finding-and-qualification': {
    de: '/loesungen/lead-recherche-und-qualifizierung',
    nl: '/oplossingen/leadwerving-en-kwalificatie',
  },
  '/solutions/multichannel-outreach': {
    de: '/loesungen/mehrkanal-outreach',
    nl: '/oplossingen/meerkanaals-outreach',
  },
  '/solutions/cold-calling': {
    de: '/loesungen/kaltakquise',
    nl: '/oplossingen/koude-acquisitie',
  },
  '/solutions/deliverability': {
    de: '/loesungen/zustellbarkeit',
    nl: '/oplossingen/afleverbaarheid',
  },
  '/solutions/done-for-you': {
    de: '/loesungen/komplett-service',
    nl: '/oplossingen/volledig-uitbesteed',
  },
  '/solutions/platform-handover': {
    de: '/loesungen/plattform-uebernahme',
    nl: '/oplossingen/platform-overdracht',
  },
  '/about': { de: '/ueber-uns', nl: '/over-ons' },
  '/book-a-call': { de: '/termin-buchen', nl: '/afspraak-boeken' },
  '/contact': { de: '/kontakt', nl: '/contact' },
  '/insights': { de: '/insights', nl: '/insights' },
  '/privacy': { de: '/datenschutz', nl: '/privacy' },
  '/terms': { de: '/agb', nl: '/voorwaarden' },
  '/legal-notice': { de: '/impressum', nl: '/colofon' },
```

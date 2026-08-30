// Locale registry — hubsell pattern, extended with translated URLs.
// A locale becomes live when `liveLocales[loc]` is true; its URLs enter
// the sitemap only for paths listed in translatedRoutes.

export const locales = ['en', 'de', 'nl'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  nl: 'Nederlands',
};

// Flip to true when the locale has real translated pages.
export const liveLocales: Record<Locale, boolean> = {
  en: true,
  de: false,
  nl: false,
};

// Paths (without locale prefix, in the TARGET language) that have real
// translations per locale. Example once German home + solutions exist:
//   { de: ['/', '/loesungen'], nl: [] }
export const translatedRoutes: Record<string, string[]> = {
  de: [],
  nl: [],
};

// Translated URL slugs. Key = English path, value = localized path
// WITHOUT the locale prefix. Single source of truth for the language
// switcher, hreflang alternates, and (later) the actual page files under
// src/pages/de|nl. Paths not listed fall back to the English path.
// DRAFT slugs — review before any locale goes live, then FREEZE:
// changing slugs after launch means permanent redirects.
export const routeMap: Record<string, Partial<Record<Locale, string>>> = {
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
  '/glossary': { de: '/glossar', nl: '/begrippenlijst' },
  '/privacy': { de: '/datenschutz', nl: '/privacy' },
  '/terms': { de: '/agb', nl: '/voorwaarden' },
  '/legal-notice': { de: '/impressum', nl: '/colofon' },
};

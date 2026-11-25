// Single source of truth for site-wide constants.
// Same pattern as hubsell-website/src/data/site.ts.

export const SITE = {
  name: 'gtmWizards',
  domain: 'gtmwizards.com',
  url: 'https://www.gtmwizards.com',
  tagline: 'Outbound for hard-to-reach industries, done for you.',
  description:
    'gtmWizards is the done-for-you outbound team of hubsell. We run signal-led outbound for traditional industries: every campaign starts from something that actually happened and sends from your own domain. Our team does the work, you get booked meetings.',
  // TODO: replace with the real booking link before launch.
  bookingUrl: 'https://cal.com/gtmwizards/strategy-call',
  contactEmail: 'hello@gtmwizards.com',
  linkedin: 'https://www.linkedin.com/company/gtmwizards',
  // gtmWizards is hubsell's done-for-you service (same company, hubsell UG).
  // Kadanco is named alongside it as the data side.
  hubsellUrl: 'https://www.hubsell.com',
  kadancoUrl: 'https://www.kadanco.com',
  // Languages the SERVICE delivers in, not languages the site is published in.
  // The site is English only. See docs/TRANSLATION-ROUTES.md.
  languages: ['English', 'German'],
} as const;

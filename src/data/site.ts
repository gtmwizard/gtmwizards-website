// Single source of truth for site-wide constants.
// Same pattern as hubsell-website/src/data/site.ts.

export const SITE = {
  name: 'gtmWizards',
  domain: 'gtmwizards.com',
  url: 'https://www.gtmwizards.com',
  tagline: 'Outbound for hard-to-reach industries. On tech you can take over.',
  description:
    'gtmWizards runs your outbound in German, Dutch, and English for traditional industries, powered by hubsell, the outbound platform we own. Done for you today, in-sourced by you whenever you are ready.',
  // TODO: replace with the real booking link before launch.
  bookingUrl: 'https://cal.com/gtmwizards/strategy-call',
  contactEmail: 'hello@gtmwizards.com',
  linkedin: 'https://www.linkedin.com/company/gtmwizards',
  // Sibling companies owned by the same founders, the provable-tech story.
  hubsellUrl: 'https://www.hubsell.com',
  kadancoUrl: 'https://www.kadanco.com',
  languages: ['German', 'Dutch', 'English'],
} as const;

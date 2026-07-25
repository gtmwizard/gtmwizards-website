import { SITE } from './site';

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; links: NavLink[] };

export const solutionsNav: NavLink[] = [
  { label: 'Lead finding & qualification', href: '/solutions/lead-finding-and-qualification' },
  { label: 'Multichannel outreach', href: '/solutions/multichannel-outreach' },
  { label: 'Cold calling', href: '/solutions/cold-calling' },
  { label: 'Deliverability', href: '/solutions/deliverability' },
  { label: 'Done for you', href: '/solutions/done-for-you' },
  { label: 'Platform handover', href: '/solutions/platform-handover' },
];

export const mainNav: (NavLink | NavGroup)[] = [
  { label: 'Solutions', links: solutionsNav },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Glossary', href: '/glossary' },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Book a call', href: '/book-a-call' },
    ],
  },
  { heading: 'Solutions', links: solutionsNav },
  {
    heading: 'Resources',
    links: [
      { label: 'Insights', href: '/insights' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'hubsell — our platform', href: SITE.hubsellUrl },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Legal notice', href: '/legal-notice' },
    ],
  },
];

export const faqSection = {
  label: 'Questions',
  eyebrow: 'FAQs',
  heading: 'Questions founders ask us',
} as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'Do I need to set anything up?',
    a: 'No. We build lists, write sequences, warm sending infrastructure, and run all channels on hubsell. Your part is the strategy sessions in week one and approving the meetings we book.',
  },
  {
    q: 'Who actually does the work, AI or humans?',
    a: 'Senior humans, using our own technology. Strategy, copy, calling, and reply handling are done by operators with 15+ years in European B2B sales. hubsell automates the mechanics; it does not replace the judgement.',
  },
  {
    q: 'Which languages do you work in?',
    a: 'English by default, and German natively when your buyers work in German. Most markets are reachable in English and we will not sell you a language edge you do not need. Where German matters it matters a lot, because a translated template reads worse than no email at all.',
  },
  {
    q: 'What does the contract look like?',
    a: 'A pilot first, then quarterly if the results earn it. Fair pricing, no long-term lock-in. We are building a reputation, not a hostage list.',
  },
  {
    q: 'How is this different from other outbound agencies?',
    a: 'Two structural differences. Campaigns run on hubsell, a platform our co-founder built and runs, so the tech has a name and you can inspect it. And every contact enters a campaign because of a signal we can point to, not because a list was bought. The engagement is then designed so you can in-source it: your campaigns live in hubsell and can be handed to your team.',
  },
  {
    q: 'How fast will I see meetings?',
    a: 'Campaigns go live within the first week. Qualified meetings typically start landing within the first month, depending on market and sales cycle.',
  },
  {
    q: 'Do you cold call?',
    a: 'Yes, with callers working in the buyer\u2019s own language who qualify and handle objections in the call. We measure the approach and the outcomes, not vanity SDR headcounts.',
  },
  {
    q: 'Can I use my own CRM?',
    a: 'Yes. hubsell syncs with the common CRMs, and qualified meetings arrive with full context either way.',
  },
  {
    q: 'What happens to my data if we stop working together?',
    a: 'It is yours. Lists, sequences, and results accumulate in your hubsell workspace from day one and go with you, whether you in-source, pause, or leave.',
  },
];

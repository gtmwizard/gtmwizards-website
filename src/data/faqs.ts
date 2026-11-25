export const faqSection = {
  label: 'Questions',
  eyebrow: 'FAQs',
  heading: 'Questions founders ask us',
} as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'Do I need to set anything up?',
    a: 'Almost nothing. We find the signals, build the lists, write and send the messages, make the calls and book the meetings, all on hubsell. Your part is the strategy session in week one, connecting a mailbox on your own domain (we walk you through it), and turning up to the meetings.',
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
    a: 'Two structural differences. We are part of hubsell, so campaigns run on our own platform rather than a rented seat, and the tech has a name you can look up. And every contact enters a campaign because of a signal we can point to, not because a list was bought.',
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
    q: 'What exactly do I get?',
    a: 'Qualified meetings in your calendar. Each one comes with the signal that started it, the conversation so far and our qualification notes, plus a weekly report on what was sent, what came back and what we changed.',
  },
];

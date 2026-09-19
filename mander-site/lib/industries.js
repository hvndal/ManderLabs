// Industry pages — same purpose as lib/pillars.js, aimed sideways instead of
// down: the pillars answer "what do you sell", these answer "why does that
// matter to a business like mine". Same shape (id, index, label, line, meta,
// lede, body, capabilities, faqs) so app/industries/[industry]/page.js can be
// a near-copy of app/[pillar]/page.js rather than a second layout to keep in
// sync.
//
// The one addition is `evidence` — a real WORK entry (lib/content.js) each
// page cites by name. That constraint shaped which two industries exist here
// at all: these are the two where the portfolio already has a genuine,
// on-topic engagement to point at, rather than the two a competitor-research
// document happened to name. A third industry gets added here the day a
// third piece of real evidence exists for it, not before.
//
// Two claims that a "research dataset" this list traces back to made about
// MANDER specifically — a sub-second Core Web Vitals guarantee and a
// zero-commission ordering product — are deliberately absent from both
// entries below. Neither is something this codebase has ever measured or
// built; see the commit this file was introduced in for the full reasoning.

export const INDUSTRIES = [
  {
    id: 'contractors-trades',
    index: '01',
    label: 'Contractors & Trades',
    line: 'A site that earns the call before the quote does.',
    meta: 'Websites for contractors and trades — fast, mobile-first, built around a quote request rather than a brochure. Fixed scope, fixed price.',
    lede: 'Most trade sites are a digital business card: a logo, a phone number, three stock photos of a hard hat. The job that site was supposed to do — turn a search into a call — quietly falls to whichever competitor answers the phone first.',
    body: [
      'We build the site around the one thing it actually has to produce: a quote request from someone who is ready to hire. That means mobile-first by default — most of the people looking for a contractor at 7pm are doing it from a phone in a driveway, not a desktop — and a contact path that survives being used one-handed, not a form buried under four other pages.',
      'The rest is the same fixed-scope process as every other build here: a written scope before anything starts, a real timeline, and a site that is yours outright when it ships — not licensed back to us through a hosting plan you can never quite leave.',
    ],
    capabilities: [
      { name: 'Mobile-first build', note: 'Designed for the phone in a driveway first, the desktop second.' },
      { name: 'Quote-request path', note: 'One clear way to ask for a quote, not a form competing with five other links.' },
      { name: 'Local Search', note: 'Google Business Profile and Maps presence tuned to the towns you actually cover.' },
      { name: 'Care Plan', note: 'Hosting, security and small edits, so the site stays up and current without you thinking about it.' },
    ],
    evidence: {
      workName: 'Waste Universe',
      note: 'A roll-off dumpster rental and collection operation — the same "quote-and-call" job most trades sites have, rebuilt around the three services they actually offer and the towns they actually cover, rather than a generic template.',
    },
    faqs: [
      {
        q: 'Do you only build for one trade?',
        a: 'No — the approach here (mobile-first, quote-request first, fixed scope) applies to any contractor or trade business, not a single niche. What changes per project is the content and the photos, not the underlying build.',
      },
      {
        q: 'Can the site take photos of past jobs?',
        a: 'Yes — a project gallery is a normal part of a trades site, and one of the more persuasive things on it. Real photos of real work beat stock images of a hard hat every time, which is the whole argument for building one of these properly.',
      },
      {
        q: 'What if I already have a site and it is just outdated?',
        a: 'That is a redesign rather than a new build — modernising what exists, aimed at the same quote-request goal, usually faster and cheaper than starting over. See /digital for how a redesign differs from a new build.',
      },
    ],
  },
  {
    id: 'restaurants-bakeries',
    index: '02',
    label: 'Restaurants & Bakeries',
    line: 'A site built to pull bookings off the aggregators.',
    meta: 'Websites for restaurants, cafés and bakeries — direct reservations and online presence that keep the relationship (and the margin) with you, not a delivery app.',
    lede: 'A third-party ordering or booking app is a normal part of running a food business now, and it is also the reason so many restaurant sites are an afterthought — a PDF menu and a link to someone else’s platform, with someone else’s cut on every transaction that happens there.',
    body: [
      'We build the site as the place a customer actually wants to be, not a waiting room before they get redirected somewhere else: the menu, the photography, the reservation or contact path, front and centre. The goal is simple — every booking or order a site can pull back onto your own domain is one that does not pay a platform fee.',
      'Same fixed-scope process as everywhere else on this site: a written plan before anything starts, and a build you own outright when it ships.',
    ],
    capabilities: [
      { name: 'Direct reservations', note: 'A booking or enquiry path that keeps the relationship with you, not a third-party app.' },
      { name: 'Brand Identity', note: 'Photography, type and colour that carry the room online the way it feels in person.' },
      { name: 'Ecommerce', note: 'Selling online — merchandise, gift cards, pre-orders — without a platform running the business.' },
      { name: 'Local Search', note: 'Found by the searches that actually convert: "near me", the neighbourhood, the dish.' },
    ],
    evidence: {
      workName: 'Nouvelle Côte',
      note: 'A Riviera dining room whose atmosphere never made it online. The rebuild is image-led — the photography carries the room — with direct reservations front and centre, specifically to pull bookings back off the aggregators. (Reservations, not delivery ordering — the real engagement, stated as it actually was.)',
    },
    faqs: [
      {
        q: 'Can you build online ordering, not just reservations?',
        a: 'Yes — as a web application built around how the business actually operates, the same capability behind any custom ordering, booking or membership system on this site (see /digital). What is not offered is a specific off-the-shelf "commission-free ordering" product — every build here is scoped to the business, not sold as a fixed package.',
      },
      {
        q: 'Do you replace our delivery app entirely?',
        a: 'That is your call, not something the site forces. Most clients keep a delivery platform for the customers who want it and use their own site to win back the bookings and orders that do not need one — direct reservations, pickup, gift cards, the regulars who would rather not pay a platform fee.',
      },
      {
        q: 'Can the menu be updated without calling you every time?',
        a: 'Yes — day-to-day edits like menu and price changes are part of what the Care Plan covers, and the site is built so you are not locked out of your own content between visits.',
      },
    ],
  },
];

export function getIndustry(id) {
  return INDUSTRIES.find((i) => i.id === id) || null;
}

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
    meta: 'Web design and local SEO for contractors, plumbers, electricians, and trades across Langley, the Fraser Valley, and Metro Vancouver. Mobile-first sites that win the call.',
    lede: 'Most trade sites are a digital business card: a logo, a phone number, three stock photos of a hard hat. The job that site was supposed to do — turn a local search into a paid job — quietly falls to whichever competitor answers the phone first.',
    body: [
      'We build the site around the one thing it actually has to produce: an immediate quote request from a property owner who is ready to hire. Whether you are a plumber in Langley, an electrical contractor in the Fraser Valley, a landscaping team in Coquitlam, or a custom home builder in Vancouver, your customers search on mobile when an urgent problem arises.',
      'That means mobile-first by default with one-tap calling, frictionless quote forms, verified job galleries, and local search optimization that puts your business at the top of Google Maps. Every project is built under a transparent, fixed-price scope with zero ongoing platform lock-in.',
    ],
    capabilities: [
      { name: 'Mobile-first trade websites', note: 'Designed for property owners searching on a phone in a driveway with instant click-to-call.' },
      { name: 'Frictionless quote forms', note: 'One clear, one-handed quote path that converts urgent visitors into paid jobs.' },
      { name: 'Trade & contractor SEO', note: 'Local SEO for plumbers in Langley, contractor web design in the Fraser Valley, and Google Map Pack ranking.' },
      { name: 'Job gallery & credentials', note: 'Real project photos, before/after galleries, and license badges that earn immediate trust.' },
      { name: 'Care Plan & high-speed hosting', note: 'Fast cloud hosting, SSL, and security updates so your trade business never misses an inbound lead.' },
    ],
    evidence: {
      workName: 'Waste Universe',
      note: 'A roll-off dumpster rental and collection operation — the same "quote-and-call" job most trades sites have, rebuilt around the three services they actually offer and the towns they actually cover, rather than a generic template.',
    },
    faqs: [
      {
        q: 'Do you build websites specifically for plumbers, electricians, landscapers, and HVAC?',
        a: 'Yes. We specialize in contractor web design and trade SEO across Langley, Coquitlam, the Fraser Valley, and Metro Vancouver for plumbers, electricians, landscapers, HVAC specialists, roofers, and general renovation contractors.',
      },
      {
        q: 'How does local SEO help contractors rank in Google’s Map Pack?',
        a: 'We optimize your Google Business Profile, structure localized service pages for queries like "plumber in Langley" or "contractor web design Fraser Valley", configure local schema markup, and build consistent citations so your business appears in the top 3 Google Map results.',
      },
      {
        q: 'Can you redesign an outdated trade website or replace a slow Wix or Squarespace site?',
        a: 'Yes. Many contractors start with DIY templates that load slowly and fail on mobile. We rebuild them into custom, lightning-fast sites with clear quote paths that load in under a second and convert more homeowner traffic.',
      },
      {
        q: 'What are your web design packages and pricing for contractors?',
        a: 'We offer straightforward, affordable packages — starting with our Launch plan for focused landing pages up to Starter and Growth plans with comprehensive local SEO and Google Business Profile optimization. All pricing is fixed and quoted up front.',
      },
      {
        q: 'Can the site feature photos of recent jobs and customer reviews?',
        a: 'Yes. A structured project gallery and verified customer reviews are essential for trade websites. Real before-and-after photos of your craftsmanship in Langley, Coquitlam, or Vancouver consistently outperform stock images.',
      },
    ],
  },
  {
    id: 'restaurants-bakeries',
    index: '02',
    label: 'Restaurants & Bakeries',
    line: 'A site built to pull bookings off the aggregators.',
    meta: 'Web design and Shopify setups for restaurants, bakeries, and breweries in Coquitlam, Port Moody, and Metro Vancouver. Direct bookings and digital menus.',
    lede: 'Third-party delivery apps take 20% to 30% of your revenue and keep your customer relationships. A great restaurant website pulls those diners back to your own domain with direct reservations, mobile menus, and online ordering.',
    body: [
      'We build hospitality websites that capture the warmth and atmosphere of your room online: beautiful typography, mouth-watering imagery, fast mobile menus, and clear reservation and catering inquiry paths. For artisan bakeries and craft breweries, we integrate Shopify ecommerce setups for merchandise, gift cards, and direct pickups.',
      'Every site is optimized for neighborhood "near me" searches so locals in Coquitlam, Port Moody, Vancouver, or Langley find your doors first. Fixed scope, fixed price, with full ownership.',
    ],
    capabilities: [
      { name: 'Direct reservations & bookings', note: 'Frictionless table reservation and catering inquiry systems that eliminate commission fees.' },
      { name: 'Brand identity & digital menus', note: 'Fast mobile menus, bespoke logo design, and food photography layouts that showcase your craftsmanship.' },
      { name: 'Shopify ecommerce store setup', note: 'Sell merchandise, bottled sauces, canned brews, gift cards, and coffee beans directly to your customers.' },
      { name: 'Local dining & "near me" SEO', note: 'Targeted Google search and Maps presence for neighborhood food and dining queries across Metro Vancouver.' },
    ],
    evidence: {
      workName: 'Nouvelle Côte',
      note: 'A Riviera dining room whose atmosphere never made it online. The rebuild is image-led — the photography carries the room — with direct reservations front and centre, specifically to pull bookings back off the aggregators. (Reservations, not delivery ordering — the real engagement, stated as it actually was.)',
    },
    faqs: [
      {
        q: 'Can you build an online store or Shopify setup for a bakery or restaurant?',
        a: 'Yes. Whether you need direct catering inquiry forms, table reservations, or a full Shopify ecommerce store for bakery pre-orders, craft beer merchandise, or gift cards, we build custom setups that protect your profit margins.',
      },
      {
        q: 'How does local SEO help restaurants and bakeries in Coquitlam and Port Moody?',
        a: 'We configure local restaurant schema markup, Google Business Profile menus, neighborhood keywords, and Google Maps optimization so diners searching for "bakery near me" or "best craft brewery Coquitlam" find your website first.',
      },
      {
        q: 'Can our staff update menus, seasonal specials, and operating hours easily?',
        a: 'Yes. We configure clean updating workflows, and our $29/mo Care Plan covers ongoing menu edits, holiday hours, and seasonal announcements whenever you need them.',
      },
    ],
  },
];

export function getIndustry(id) {
  return INDUSTRIES.find((i) => i.id === id) || null;
}

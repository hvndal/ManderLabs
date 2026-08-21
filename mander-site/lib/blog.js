import { BRAND } from './content';

// --- Journal ---------------------------------------------------------------
// The 17 location pages are the thing this site most needs to rank, and they
// have no inbound links pointing at them — which is the single reason local
// pages usually fail. These posts exist to fix that from the inside: each one
// is genuinely useful on its own terms, and each one links into the location
// pages with the anchor text those pages are trying to win.
//
// Rules for anything added here, because a blog is the easiest place on a site
// to start quietly lying:
//
//   * Every number is one already published elsewhere on this site — the tier
//     prices, the app prices, the $40 Care Plan, the 20% Community Rate.
//     No invented statistics, no "studies show", no made-up survey.
//   * No claim about a client that is not on their live site.
//   * Ranges are described as ranges. "Most" and "usually" are honest words;
//     "guaranteed" is not, and does not appear.
//
// `sections` uses the same { h, p, ul } shape as lib/legal.js so the renderer
// is the one already written and proven there.

export const BLOG_UPDATED = 'August 2026';

const AUTHOR = { name: 'Herman', role: 'Founder & Design Lead' };

export const POSTS = [
  {
    slug: 'small-business-website-cost-massachusetts',
    title: 'What a small-business website should cost in Massachusetts',
    nav: 'Website costs in Massachusetts',
    date: '2026-08-18',
    readingTime: '6 min',
    tag: 'Pricing',
    description:
      'Real numbers for a Massachusetts small-business website in 2026 — what each price band actually buys, and where the money goes.',
    lede: 'Almost nobody publishes web design prices, which is why every business owner asking this question gets a different answer. Here are ours, and what sits behind each number.',
    sections: [
      {
        h: 'Why nobody will give you a price',
        p: [
          'Ask five studios what a website costs and you will get five requests for a discovery call. There is a reason for it that is not entirely cynical: scope genuinely varies, and a five-page site for a dental practice is a different job from a booking platform for a restaurant group. But the practical effect is that a business owner cannot compare anything, and ends up choosing on whoever answered the phone most convincingly.',
          'We publish fixed prices instead. Below is what each band buys, and — more usefully — what it does not.',
        ],
      },
      {
        h: 'Under $500: a credible presence',
        p: [
          'At this level you are buying existence, not acquisition. A one-page site with a contact form, a Google Maps link and a mobile-first build establishes that you are a real business when somebody searches your name after a referral. Our Launch tier is $299 and takes about two weeks.',
          'What it does not do is find you customers. There is no meaningful SEO at this level and no integration with anything. If your problem is "people hear about us and then cannot find us online", this solves it completely. If your problem is "not enough people hear about us", it will not move at all.',
        ],
      },
      {
        h: '$500 to $900: the range most businesses actually need',
        p: [
          'This is where the majority of Massachusetts small businesses land, and it covers two quite different products.',
          'Around $499 buys a proper multi-page site — five pages, copywriting support, enquiry forms, basic technical SEO. It is a brochure that does its job well. Around $899 buys the same thing plus the machinery that makes it findable: local SEO, Google Business Profile optimisation, Search Console and Analytics setup, local keyword research, schema, and a booking or CRM integration.',
          'The gap between those two numbers is almost entirely the difference between a site people can find when they already know your name, and a site that brings you people who did not. For a business in a competitive market like Boston or Cambridge, that gap is the whole point.',
        ],
        ul: [
          'Choose the lower end if you are a referral-driven business and mostly need to look legitimate',
          'Choose the higher end if customers search a category before they choose a supplier',
          'The deciding question is not budget — it is whether search is how your customers find people like you',
        ],
      },
      {
        h: '$1,500 and up: custom functionality',
        p: [
          'Past this point you are paying for things a standard site cannot do — e-commerce, API integrations into software you already run, custom workflows, multi-location structure. Our Business Pro tier starts at $1,499 and runs six to ten weeks depending on what is actually being built.',
          'Be suspicious of anyone who recommends this band before asking what software your business already uses. The honest version of this conversation starts with your operations, not with a package.',
        ],
      },
      {
        h: 'The costs that are not the build',
        p: [
          'A build price is not a total cost of ownership, and this is where quoted numbers usually get misleading.',
          'Hosting, security, backups and small content edits are ongoing. We charge $40 a month for that as an optional Care Plan, month to month, and plenty of clients do not take it. Domain registration is yours and typically runs $15 to $25 a year. If you need paid advertising, that is a separate budget entirely and it is not a website cost.',
          'The number that matters is the one that includes all of it, and any studio should be able to give you that in a sentence.',
        ],
      },
      {
        h: 'What actually drives the price',
        ul: [
          'Page count, but far less than people expect — page ten costs much less than page one',
          'Whether copy exists. Writing it is often the single biggest hidden cost of a build',
          'Integrations. A booking system or CRM connection adds real engineering time',
          'Whether the site needs to rank, which is a different discipline from design',
          'Revision rounds, which is why we cap and state them rather than leaving it open',
        ],
      },
      {
        h: 'A note on the cheapest option',
        p: [
          'Massachusetts is not one market. What is a reasonable spend in Newton is not a reasonable spend in Brockton, and pretending otherwise is how studios end up quoting one number and building for a different city.',
          'We run a Community Rate — 20% off any build, granted on trust rather than proof — for exactly that reason. It is not a promotion and it does not expire. If the price is the only thing standing between you and a working website, ask for it.',
        ],
      },
    ],
    related: [
      { label: 'Website design in Boston', href: '/locations/massachusetts/boston' },
      { label: 'Website design in Worcester', href: '/locations/massachusetts/worcester' },
      { label: 'Website design in Springfield', href: '/locations/massachusetts/springfield' },
      { label: 'Website design in Brockton', href: '/locations/massachusetts/brockton' },
      { label: 'See all pricing', href: '/pricing' },
    ],
  },

  {
    slug: 'local-seo-checklist-small-business',
    title: 'The local SEO checklist we run on every build',
    nav: 'Local SEO checklist',
    date: '2026-08-20',
    readingTime: '7 min',
    tag: 'Local search',
    description:
      'The actual checklist we work through to get a small business found in local search — in the order that matters, with the low-value steps named as such.',
    lede: 'Most local SEO advice is a list of forty things with no ranking of importance. This is the same list, ordered by what actually moves the needle, with the parts that barely matter marked honestly.',
    sections: [
      {
        h: 'First: the Google Business Profile',
        p: [
          'If you do one thing from this page, do this one. For any business serving a local area, the Business Profile outranks the website itself for most commercial searches — the map pack sits above the organic results, and the profile is what fills it.',
          'Claim it, verify it, and fill in every field: categories, service area, hours, services with prices, and photos. The primary category matters more than most owners realise and is worth researching against competitors who already rank.',
        ],
        ul: [
          'Set the website URL to your exact canonical address, including the www if you use one',
          'List services individually rather than as one paragraph',
          'Add photos and keep adding them — profiles with recent images get materially more engagement',
          'Fill the hours in, and keep them consistent with the hours on your site',
        ],
      },
      {
        h: 'Second: reviews',
        p: [
          'Reviews are the heaviest single factor in local pack rankings and the one most businesses neglect entirely. Going from zero reviews to five will usually move you further than any technical work on your website.',
          'Ask every satisfied customer, directly, with a link that opens the review form. Do not offer anything in exchange — incentivised reviews violate Google policy and can cost you the profile. Do respond to every review you get, including the bad ones, because that response is read by everyone who comes after.',
        ],
      },
      {
        h: 'Third: NAP consistency',
        p: [
          'Name, Address and Phone need to match exactly everywhere they appear — your website, your Business Profile, and any directory that lists you. Not approximately. "Street" and "St." are different strings, and inconsistency across listings actively suppresses local rankings rather than merely failing to help.',
          'This is tedious and it is worth doing properly once. Write the canonical version down and use it verbatim from then on.',
        ],
      },
      {
        h: 'Fourth: the pages themselves',
        p: [
          'Now the website matters. A page per location or service area, each with genuinely different content — not the same paragraph with the city name swapped, which search engines identify as doorway pages and which can be penalised rather than ignored.',
          'The test is simple: if you could swap the city name in your page and it would still read correctly, the page is not specific enough to rank and probably should not exist.',
        ],
        ul: [
          'One page per place you genuinely serve, not per place you would like to serve',
          'Write about that market — its industries, its competition, what businesses there actually ask',
          'Link the pages to each other, so a crawler that finds one finds the rest',
          'Add LocalBusiness and FAQ structured data',
        ],
      },
      {
        h: 'Fifth: technical foundations',
        p: [
          'These are necessary rather than sufficient. Getting them right will not make you rank; getting them wrong will stop you.',
        ],
        ul: [
          'One canonical domain, with every other variant redirecting to it',
          'A sitemap that lists only canonical URLs, and a robots.txt that points at it',
          'Meta descriptions under about 155 characters, because the rest is never shown',
          'Mobile pages that do not scroll sideways and do not set body text below 12px',
          'Core Web Vitals in decent shape — in practice this usually means not shipping an enormous hero video',
        ],
      },
      {
        h: 'Last, and least: directories',
        p: [
          'Directory submissions are the most oversold item in local SEO. The genuinely useful ones are few — Bing Places, Apple Business Connect, and the two or three industry directories your customers actually read.',
          'Anything selling bulk directory submissions or "DA 50+ backlinks" is selling you a risk, not a service. For a business whose own product is marketing, being caught buying links is considerably worse than having none.',
        ],
      },
      {
        h: 'What this looks like in practice',
        p: [
          `Local search is a slow instrument. Profile and review work shows up in weeks; page and link work takes months. Anyone promising otherwise is either misinformed or counting on you not checking.`,
          `If you want the specifics for your market rather than the general version, the location pages below go through what we see in each one — or just email ${BRAND.email} and ask.`,
        ],
      },
    ],
    related: [
      { label: 'Website design in Providence', href: '/locations/rhode-island/providence' },
      { label: 'Website design in Vancouver', href: '/locations/british-columbia/vancouver' },
      { label: 'Website design in Cambridge', href: '/locations/massachusetts/cambridge' },
      { label: 'Every market we cover', href: '/locations' },
    ],
  },

  {
    slug: 'website-or-android-app',
    title: 'Do you need a website or an Android app?',
    nav: 'Website or app?',
    date: '2026-08-21',
    readingTime: '5 min',
    tag: 'Apps',
    description:
      'A straight answer to whether your business needs an app — including the cases where the honest answer is no, and a website does the job for a tenth of the cost.',
    lede: 'We build both, which means we have no particular incentive to talk you into either. Most businesses that ask for an app are better served by a website, and it is worth knowing which one you are.',
    sections: [
      {
        h: 'The short version',
        p: [
          'An app earns its keep when customers come back repeatedly and you need something on their phone between visits. A website earns its keep when customers need to find you, judge you, and get in touch.',
          'Those are different problems. Most small businesses have the second one and describe it as the first.',
        ],
      },
      {
        h: 'Signs you want a website',
        ul: [
          'Customers find you by searching a category rather than your name',
          'Most people contact you once, or a few times a year',
          'Your competitors show up in Google and you do not',
          'What you need is credibility, a clear list of services, and a way to get in touch',
        ],
        p: [
          'This covers the large majority of trades, practices, restaurants, retailers and professional services. Our website tiers run $299 to $1,499 and up, and a $899 build with local SEO is the most common right answer.',
        ],
      },
      {
        h: 'Signs you want an app',
        ul: [
          'Customers interact weekly or more — loyalty, memberships, bookings, deliveries',
          'You need push notifications to bring people back, and email is not working',
          'Staff or drivers need a tool in the field, not a website',
          'You are handling accounts and payments repeatedly for the same people',
        ],
        p: [
          'Our Android builds start at $2,999 for up to eight screens with authentication and a basic backend, and $5,999 for the version with payments, bookings and an admin dashboard. Both ship to Google Play under your own developer account, which matters: the listing belongs to you, not to us.',
        ],
      },
      {
        h: 'The trap: an app nobody installs',
        p: [
          'The failure case for a small-business app is not that it is built badly. It is that it is built well and nobody installs it. Getting somebody to download an app is a much harder ask than getting them to open a web page, and that friction has to be paid for by something they genuinely want.',
          'If you cannot say clearly why a customer would install it and what brings them back, the app will sit at a handful of downloads regardless of how good it is. That is not a reason never to build one — it is a reason to be certain about the answer first.',
        ],
      },
      {
        h: 'The order we usually recommend',
        p: [
          'Website first, almost always. It is cheaper, it is what search engines index, and it is where an app would send people to be discovered anyway. Once the site is bringing in customers and you can see which ones come back, you will know whether an app has a job to do — and you will know what that job is, which is the part that makes app projects succeed.',
        ],
      },
    ],
    related: [
      { label: 'Pricing for websites and apps', href: '/pricing' },
      { label: 'Take the 60-second fit quiz', href: '/quote' },
      { label: 'Website design in Surrey', href: '/locations/british-columbia/surrey' },
    ],
  },
];

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug);
}

// Newest first, which is the order the index renders and the order a reader
// expects. Dates are ISO so this stays a string comparison.
export const POSTS_BY_DATE = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

export { AUTHOR };

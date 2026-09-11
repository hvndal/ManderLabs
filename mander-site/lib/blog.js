import { BRAND } from './content';

// --- Journal ---------------------------------------------------------------
// The Metro Vancouver location pages are the thing this site most needs to
// rank, and they have no inbound links pointing at them — which is the
// single reason local pages usually fail. These posts exist to fix that from
// the inside: each one is genuinely useful on its own terms, and each one
// links into the location pages with the anchor text those pages are trying
// to win. (A Massachusetts-focused post used to live here, built for the
// same reason — retired along with the Massachusetts location pages it
// existed to support; see lib/locations.js.)
//
// Rules for anything added here, because a blog is the easiest place on a site
// to start quietly lying:
//
//   * Every number is one already published elsewhere on this site — the tier
//     the market bands below, the Community Rate. The studio's own figures
//     are no longer published anywhere on the site — every project is quoted
//     — so this article describes what websites cost generally and does not
//     name our numbers.
//     No invented statistics, no "studies show", no made-up survey.
//   * No claim about a client that is not on their live site.
//   * Ranges are described as ranges. "Most" and "usually" are honest words;
//     "guaranteed" is not, and does not appear.
//
// `sections` uses the same { h, p, ul } shape as lib/legal.js so the renderer
// is the one already written and proven there.

export const BLOG_UPDATED = 'August 2026';

const AUTHOR = { name: 'Herman', role: 'Front-End Web Designer' };

export const POSTS = [
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
      { label: 'Website design in Vancouver', href: '/locations/metro-vancouver/vancouver' },
      { label: 'Website design in Burnaby', href: '/locations/metro-vancouver/burnaby' },
      { label: 'Website design in Richmond', href: '/locations/metro-vancouver/richmond' },
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
          'This covers the large majority of trades, practices, restaurants, retailers and professional services. Our website plans sit across this band, quoted per project, and a mid-range build with local SEO is the most common right answer.',
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
          'Our Android builds are quoted per project — one covering up to eight screens with authentication and a basic backend, another adding payments, bookings and an admin dashboard. Both ship to Google Play under your own developer account, which matters: the listing belongs to you, not to us.',
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
      { label: 'Website design in Surrey', href: '/locations/metro-vancouver/surrey' },
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

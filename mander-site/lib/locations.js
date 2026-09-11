// Location SEO data — Metro Vancouver.
//
// Metro Vancouver is the studio's one dedicated local-SEO region: real,
// specific, and where part of the team actually is. Massachusetts and Rhode
// Island used to have pages here too — they were retired so the site is not
// claiming a marketed local presence outside the one market that's actually
// the focus. The business still takes on remote work anywhere in the US and
// Canada (see the general framing on /locations and /pricing); it just
// doesn't have dedicated city-by-city pages for it. The Waste Universe case
// study (lib/content.js WORK) is real, historical client work in
// Massachusetts and Rhode Island and stays as a case study regardless —
// removing the marketed region pages doesn't make the past work untrue.
//
// Two routes read this file: app/locations/[region]/page.js and
// app/locations/[region]/[city]/page.js. Both are data-driven templates, not
// one-off page components, so adding a new state, province or city is a data
// change, not a code change.
//
// TO ADD A NEW STATE/PROVINCE: add an object to REGIONS below with the same
// shape as the ones here (slug, name, abbr, country, countryName, kicker,
// h1, intro, industries, faqs, cities: []). The two dynamic routes pick it up
// automatically via generateStaticParams — nothing else to touch.
//
// TO ADD A NEW CITY: add an object to that region's `cities` array (slug,
// name, h1, metaDescription, intro, industries, faqs). It appears on the
// region page's city grid and gets its own route automatically.
//
// Deliberately NOT every city in the region — only ones with a genuinely
// distinct paragraph below. Google treats near-identical, city-name-swapped
// pages as doorway pages; a short list of real ones beats a long list of
// thin ones. Add a city here only once you've written it a real paragraph,
// not a template with the name substituted in.
//
// `workRef` (optional, region-level only) points at a name in WORK
// (lib/content.js) that is honestly tied to that region. Never invent one
// for a region that doesn't have a genuine match; omit the field instead.
//
// `market` says which price ladder and contact options a region's pages
// render — 'us'/'ca' logic lives in ./markets, 'in' is for the Indian
// regions elsewhere in the market system. A location page ignores the
// visitor's own geolocation and uses this instead, because a page about
// Vancouver has to show the same content to every visitor and to Googlebot
// or it can never reliably rank. The market pages (home, pricing, quote) are
// still resolved by IP; these are resolved by their own URL.
import { LOCATION_MARKETS } from './markets/location-markets';

const NA_REGIONS = [
  {
    slug: 'metro-vancouver',
    name: 'Metro Vancouver',
    abbr: 'BC',
    country: 'CA',
    countryName: 'Canada',
    kicker: 'British Columbia',
    h1: 'Brand, digital and growth for Metro Vancouver.',
    metaDescription:
      'Brand, web design and local growth systems for Metro Vancouver — Vancouver, Burnaby, Richmond, Surrey, North Vancouver, Langley, Coquitlam and New Westminster.',
    intro: [
      "Metro Vancouver is where MANDER started — part of the team works out of Langley — and it is where the local growth work is aimed. That is a deliberate narrowing rather than a limitation: local search is won by being genuinely relevant to one place before being thinly present in twenty, and a studio that claims every city on the map is telling you it has traction in none of them.",
      'The work here spans all three pillars. Brand for businesses whose offer is sharper in the founder’s head than anywhere else. Digital for the ones whose site is quietly costing them enquiries. Growth for the ones nobody is finding — which in this market is usually a Business Profile problem before it is a website problem.',
    ],
    proximityNote: 'Part of the MANDER team is based in Langley, British Columbia.',
    industries: [
      'Technology & startups',
      'Professional services',
      'Trades & construction',
      'Health & wellness practices',
      'Hospitality & food',
      'Retail & studios',
    ],
    faqs: [
      {
        q: 'Is MANDER a BC company?',
        a: "The company's roots are in Langley, where part of the team is based, with the rest in Massachusetts and Maine. Delivery is remote either way, and Metro Vancouver is the market the local search work is built around.",
      },
      {
        q: 'Do you bill in Canadian dollars?',
        a: 'Yes — quoted in USD by default and invoiced in CAD on request, at the same figures.',
      },
      {
        q: 'Why these eight municipalities, when Metro Vancouver has twenty-one?',
        a: 'Because a page is only worth building where we can say something true and specific about the market. These eight are the ones with a genuinely distinct paragraph written for them; the rest of Metro Vancouver — Delta, Maple Ridge, White Rock and the others — is served exactly the same way, it just does not have a page yet. We add one when there is evidence the demand is there, not because the municipality exists.',
      },
      {
        q: "Can you compete with Vancouver's larger agencies?",
        a: "On attention and on price, yes — that is the model. Senior people, fixed scope, fixed price, and you own everything at the end. On a fifty-person pitch process, no, and we will say so.",
      },
    ],
    cities: [
      {
        slug: 'vancouver',
        name: 'Vancouver',
        h1: 'Website design in Vancouver, British Columbia.',
        metaDescription:
          'Website design for Vancouver, BC small businesses — fixed-price alternative to downtown agency rates. Tech, retail, hospitality and professional services.',
        intro:
          "Vancouver's small-business market competes for attention against a genuinely large, well-funded tech and design scene, and against some of the highest agency rates in Canada. That combination pushes a lot of good small businesses toward DIY builders that undersell them. MANDER exists partly because of that gap — senior design and development, fixed-price, without the overhead a Vancouver studio agency has to charge for.",
        industries: ['Technology & startups', 'Professional services', 'Retail & hospitality', 'Creative industries'],
        faqs: [
          {
            q: 'How do you compete with Vancouver agency pricing?',
            a: 'By keeping the studio small and remote rather than carrying downtown-Vancouver overhead — the design quality holds, the invoice comes down.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, and every price is fixed and agreed before work starts.',
          },
                  {
            q: "What does an Android app cost compared with a Vancouver agency?",
            a: "App Launch and App Growth are both fixed-scope and quoted up front. That is a fraction of a Vancouver studio day rate for equivalent scope, for the same reason the websites are.",
          },
          {
            q: "Do you work with early-stage Vancouver startups?",
            a: "Often. A Starter site is usually right before funding, and App Launch covers a first Play Store release with authentication and a basic backend.",
          },
        ],
      },
      {
        slug: 'surrey',
        name: 'Surrey',
        h1: 'Website design in Surrey, British Columbia.',
        metaDescription:
          'Website design for Surrey, BC — logistics, trades, retail and multicultural small businesses across the Fraser Valley corridor.',
        intro:
          "Surrey is one of the fastest-growing cities in Canada, with a small-business base that's more diverse — culturally and industrially — than almost anywhere else on this list, spanning logistics and trades tied to the Fraser Valley corridor alongside a fast-growing retail and service sector. Growth this fast usually outpaces marketing, so a lot of genuinely good Surrey businesses are still being found by word of mouth alone. A properly built site with real local SEO behind it tends to close that gap quickly.",
        industries: ['Logistics & trades', 'Retail & food service', 'Professional services', 'Multicultural & community businesses'],
        faqs: [
          {
            q: 'Can you write copy for a business that serves a multilingual customer base?',
            a: 'We write in English by default; if your customers search or read in another language too, bilingual builds — like the one we did for a hospitality client — are something we handle as part of Website Design.',
          },
          {
            q: "We've grown mainly through word of mouth — is a website still worth it?",
            a: "Very much so, especially in a fast-growing market like Surrey — word of mouth gets undermined the moment a prospective customer searches you and finds nothing credible. Local Search is built for exactly that gap.",
          },
                  {
            q: "Do you build Android apps for Surrey businesses?",
            a: "Yes, quoted per build and shipped to Google Play under your own developer account. For logistics and trades in Surrey that usually means dispatch, job tracking or a driver-facing tool.",
          },
          {
            q: "Do you invoice Surrey clients in Canadian dollars?",
            a: "Yes on request. Prices are shown in USD by default and Canadian clients are invoiced in CAD at your preference.",
          },
        ],
      },
      {
        slug: 'burnaby',
        name: 'Burnaby',
        h1: 'Website design in Burnaby, British Columbia.',
        metaDescription:
          'Website design for Burnaby, BC small businesses — Metrotown retail, SFU-adjacent tech and services, and Lower Mainland trades. Fixed-price, no agency overhead.',
        intro:
          "Burnaby sits between two of Metro Vancouver's busiest commercial centres, Metrotown and Brentwood, with SFU up on the mountain feeding a steady run of small tech and professional-services businesses down into the city. That mix — retail density on one side, a university on the other — means a lot of Burnaby businesses are competing for attention in a market that never stops moving. A site that loads fast and actually shows up in a Burnaby search does more work here than a bigger budget spent on the wrong things.",
        industries: ['Retail & commercial services', 'Technology & professional services', 'Trades & light industrial', 'Food & hospitality'],
        faqs: [
          {
            q: 'Do you work with businesses near Metrotown or Brentwood specifically?',
            a: 'Yes — both are covered under Burnaby, and the local SEO work is built around wherever your customers actually search from, not a single neighbourhood.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
          },
          {
            q: 'Do you build Android apps for Burnaby businesses?',
            a: 'Yes, quoted per build. App Launch is the usual starting point for a first Play Store release.',
          },
          {
            q: 'Can you help a Burnaby business compete with bigger Metrotown-area retailers online?',
            a: 'That is mostly a local-search problem, not a budget problem — a properly optimised Business Profile and a fast site close most of the gap that a bigger competitor’s ad spend opens up.',
          },
        ],
      },
      {
        slug: 'richmond',
        name: 'Richmond',
        h1: 'Website design in Richmond, British Columbia.',
        metaDescription:
          'Website design for Richmond, BC — international trade, food and hospitality, and professional services near YVR. Fixed-price, quoted in writing.',
        intro:
          "Richmond runs on trade — YVR sits inside it, and the city has one of the most internationally connected small-business communities in the Lower Mainland, from import/export operations to a food and hospitality scene that draws visitors well beyond the neighbourhood. A lot of that business still gets found by word of mouth or a listing on a directory nobody maintains, which is a real gap when the customer base is this used to searching before they choose.",
        industries: ['International trade & logistics', 'Food & hospitality', 'Professional & financial services', 'Retail'],
        faqs: [
          {
            q: 'Can you build a bilingual site for a Richmond business?',
            a: 'Yes — English by default, and a second language handled the same way we did for a hospitality client, as part of Website Design rather than a separate line item.',
          },
          {
            q: 'Do you invoice Richmond clients in Canadian dollars?',
            a: 'Yes on request. Prices are shown in USD by default and Canadian clients are invoiced in CAD at your preference.',
          },
          {
            q: 'Do you build Android apps for Richmond businesses?',
            a: 'Yes, quoted per build and shipped to Google Play under your own developer account.',
          },
          {
            q: 'Do you do local SEO for a business that mostly serves visitors and travellers?',
            a: 'Yes — Local Search covers Google Business Profile and map-pack visibility, which matters more, not less, for a customer base that’s new to the area and searching cold.',
          },
        ],
      },
      {
        slug: 'north-vancouver',
        name: 'North Vancouver',
        h1: 'Website design in North Vancouver, British Columbia.',
        metaDescription:
          'Website design for North Vancouver, BC — outdoor and recreation brands, the Shipyards district, and North Shore trades. Fixed-price website design.',
        intro:
          "The North Shore's small-business base leans outdoor and recreation — gear, guiding, food and craft businesses built around the mountains at the edge of the city — alongside the marine and trades work that's been part of the Shipyards district for decades. Both sides of that mix are competing for a customer who researches before they buy, on a phone, usually outdoors themselves. A site that's slow or hard to find on a map costs more here than it would somewhere less search-driven.",
        industries: ['Outdoor & recreation brands', 'Marine & waterfront trades', 'Food & hospitality', 'Professional services'],
        faqs: [
          {
            q: 'Do you build sites for outdoor or recreation brands specifically?',
            a: 'We build for whatever the business actually is — the site is built around real photography and a clear structure either way, not a template that happens to look outdoorsy.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
          },
          {
            q: 'Do you build Android apps for North Vancouver businesses?',
            a: 'Yes, quoted per build — App Launch covers a first Play Store release with authentication and a basic backend.',
          },
          {
            q: 'How fast can a North Vancouver business get local search set up?',
            a: 'Local Search typically runs alongside a Growth-tier build; Google Business Profile changes themselves can show up within days once they’re live.',
          },
        ],
      },
      {
        slug: 'langley',
        name: 'Langley',
        h1: 'Website design in Langley, British Columbia.',
        metaDescription:
          'Website design in Langley, BC, where part of the MANDER team is based — trades, agriculture and professional services in the Fraser Valley. Fixed-price builds.',
        intro:
          "Langley is where part of the MANDER team is actually based, so this is the one market on the list the studio has direct, everyday familiarity with rather than research alone. It's a Fraser Valley mix of trades and construction, agriculture, and a growing professional-services base — businesses that mostly built their reputation locally and are only now working out that reputation doesn't show up in a Google search unless something is actually built to be found.",
        industries: ['Trades & construction', 'Agriculture & agritourism', 'Professional services', 'Retail'],
        faqs: [
          {
            q: 'Is MANDER actually based in Langley?',
            a: "Yes — part of the team is based in Langley, and the rest works remotely, out of Massachusetts and Maine. It's the one market on this list the studio knows first-hand rather than through research.",
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
          },
          {
            q: 'Do you build Android apps for Langley businesses?',
            a: 'Yes, quoted per build. For trades and agricultural operations that’s usually a dispatch, scheduling or a customer-facing ordering tool.',
          },
          {
            q: 'Do you work with agricultural or estate businesses?',
            a: 'Yes — wineries, farms and agritourism operations are part of the local mix here, and the same fixed-scope approach applies.',
          },
        ],
      },
      {
        slug: 'coquitlam',
        name: 'Coquitlam',
        h1: 'Website design in Coquitlam, British Columbia.',
        metaDescription:
          'Website design for Coquitlam and the Tri-Cities, BC — healthcare, construction and hospitality across Coquitlam, Port Moody and Port Coquitlam.',
        intro:
          "Coquitlam anchors the Tri-Cities — Port Moody and Port Coquitlam alongside it — in one of the faster-growing residential and commercial corridors in the Lower Mainland. Healthcare and wellness practices, construction tied to that growth, and a genuine craft-brewing scene around Port Moody's Brewers Row all compete for a local customer base that's expanding faster than most of these businesses' own marketing has kept up with.",
        industries: ['Healthcare & wellness', 'Construction & development', 'Craft brewing & hospitality', 'Professional services'],
        faqs: [
          {
            q: 'Do you cover the whole Tri-Cities area, not just Coquitlam itself?',
            a: 'Yes — Port Moody and Port Coquitlam are covered under the same page, and the local SEO work follows wherever your actual customers search from.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
          },
          {
            q: 'Do you build booking systems for healthcare or wellness practices?',
            a: 'Yes — appointment booking and intake forms are part of Growth-tier and above, built to the practice’s own scheduling needs rather than a generic plugin.',
          },
          {
            q: 'Do you build Android apps for Coquitlam businesses?',
            a: 'Yes, quoted per build and shipped to Google Play under your own developer account.',
          },
        ],
      },
      {
        slug: 'new-westminster',
        name: 'New Westminster',
        h1: 'Website design in New Westminster, British Columbia.',
        metaDescription:
          'Website design for New Westminster, BC — heritage retail, healthcare near Royal Columbian, and waterfront businesses in the Royal City.',
        intro:
          "New Westminster carries more history than most of the cities on this list — it was British Columbia's first capital — and that shows up in a downtown built around independent, long-standing businesses rather than chain retail, alongside a healthcare economy anchored by Royal Columbian Hospital. A lot of that independence is a strength that doesn't automatically translate online: a business that's been trusted on Columbia Street for twenty years still needs to show up in a search from someone who's never heard of it.",
        industries: ['Heritage & independent retail', 'Healthcare & medical services', 'Professional & legal services', 'Hospitality'],
        faqs: [
          {
            q: 'Do you work with long-established, not just new, New Westminster businesses?',
            a: 'Most of the work here is exactly that — a business with a real local reputation that has never had a site doing anything for it. That’s a straightforward Starter or Growth build, not a special case.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
          },
          {
            q: 'Do you build intake or booking tools for healthcare practices near Royal Columbian?',
            a: 'Yes — appointment booking and patient intake are part of Growth-tier and above, built around the practice’s own workflow.',
          },
          {
            q: 'Do you build Android apps for New Westminster businesses?',
            a: 'Yes, quoted per build. App Launch is the usual starting point for a first Play Store release.',
          },
        ],
      },
    ],
  },
];

// One list, in the order the locations hub shows them: North America first
// because that is where the studio started, then India.
//
// The market is stamped on from lib/markets/location-markets.js rather than
// written into each region, because the edge middleware reads that same map
// to decide the market before this file is ever loaded. Two copies of the
// answer would eventually disagree, and the failure would be a page showing
// rupees with dollars in its structured data — invisible in review and
// expensive in search.
export const REGIONS = NA_REGIONS.map((region) => {
  const market = LOCATION_MARKETS[region.slug];
  if (!market) {
    // Loud on purpose. A region with no market would silently inherit the
    // visitor's geolocation, which is the one behaviour these pages must
    // never have.
    throw new Error(
      `Region "${region.slug}" has no entry in LOCATION_MARKETS (lib/markets/location-markets.js). Add one before adding the region.`
    );
  }
  return { ...region, market };
});

export function getRegion(slug) {
  return REGIONS.find((r) => r.slug === slug) || null;
}

export function getCity(regionSlug, citySlug) {
  const region = getRegion(regionSlug);
  if (!region) return null;
  const city = region.cities.find((c) => c.slug === citySlug) || null;
  return city ? { region, city } : null;
}

// Flat list of every city page, with its parent attached — used by
// generateStaticParams and the sitemap.
export function allCities() {
  return REGIONS.flatMap((region) =>
    region.cities.map((city) => ({ region, city }))
  );
}

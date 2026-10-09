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
import { LOCATION_MARKETS } from './markets/location-markets.js';

const NA_REGIONS = [
  {
    slug: 'metro-vancouver',
    name: 'Metro Vancouver',
    abbr: 'BC',
    country: 'CA',
    countryName: 'Canada',
    kicker: 'British Columbia',
    h1: 'Custom website design, branding & local SEO for Metro Vancouver.',
    metaDescription:
      'Custom website design, Shopify development, and local SEO across Metro Vancouver — Langley, Surrey, Coquitlam, Vancouver, and Burnaby. Fixed price.',
    intro: [
      "Metro Vancouver is where MANDER started — with team members based in Langley and Coquitlam — delivering the high-touch accessibility and fair pricing of an independent freelance web designer combined with the craft of a dedicated brand identity and digital studio. We build custom websites, Shopify ecommerce stores, and local SEO growth engines for small businesses, contractors, plumbers, restaurants, and professional practices across the Lower Mainland.",
      'The work here spans all three pillars. Brand identity for businesses whose offer needs sharp authority. Custom digital builds for companies whose slow DIY templates are quietly costing them enquiries. Growth for the ones nobody is finding — pairing on-page local SEO with Google Business Profile optimization so searchers in your neighbourhood find and hire you first.',
    ],
    proximityNote: 'MANDER team members are based in Langley and Coquitlam, British Columbia.',
    industries: [
      'Trades, contractors & home services',
      'Plumbing, HVAC & electrical',
      'Real estate & boutique development',
      'Technology & local startups',
      'Healthcare, dental & wellness practices',
      'Restaurants, bakeries & craft brewing',
      'Retail & Shopify ecommerce',
      'Professional & legal services',
    ],
    faqs: [
      {
        q: 'Is MANDER a BC company?',
        a: "The company's roots are in Langley and Coquitlam, where team members live and work. Metro Vancouver is the primary market our local search and custom web design work is built around.",
      },
      {
        q: 'Can I hire an independent or freelance web designer through MANDER?',
        a: 'Yes. MANDER functions as an agile, senior independent studio. You get the direct communication, personal attention, and accessible rates of a freelance web designer, backed by the reliability and technical engineering of a full-stack digital agency.',
      },
      {
        q: 'Do you offer affordable web design packages for small businesses?',
        a: 'Yes. We offer transparent fixed-price website packages — from our Launch tier for fast 3-page sites to Starter and Growth plans with local SEO and booking. Every package has a written scope with zero hidden fees, and you own your website and code outright.',
      },
      {
        q: 'Do you bill in Canadian dollars?',
        a: 'Yes — quoted in USD by default and invoiced in CAD on request, at transparent fixed figures.',
      },
      {
        q: 'Why these eight municipalities, when Metro Vancouver has twenty-one?',
        a: 'Because a page is only worth building where we can say something true and specific about the market. These eight are the ones with genuinely distinct local context; the rest of Metro Vancouver — Delta, Maple Ridge, White Rock, Abbotsford corridor — is served with the exact same dedication.',
      },
      {
        q: "How does MANDER compare to high-overhead downtown Vancouver web agencies?",
        a: "We cut out downtown office leases, junior handoffs, and layers of account managers. You work directly with senior designers and developers at a fraction of typical agency rates, while getting superior code quality, sub-second load times, and complete ownership.",
      },
    ],
    cities: [
      {
        slug: 'vancouver',
        name: 'Vancouver',
        h1: 'Custom website design & local SEO in Vancouver, BC.',
        metaDescription:
          'Freelance web designer alternative & SEO agency in Vancouver, BC. Custom website design, Shopify developer, logo designer & brand identity agency. Fixed price.',
        intro:
          "Vancouver's small-business market competes against high agency rates and large tech budgets. That often leaves local businesses stuck choosing between an expensive $15,000+ downtown agency retainer or an underwhelming DIY website maker. MANDER offers an independent, senior freelance alternative: high-end Scandinavian and Swiss aesthetics, custom website design, Shopify development, and local SEO services that make world-class digital presence accessible to Vancouver retail, trades, tech, and professional brands without downtown overhead.",
        industries: [
          'Technology startups & SaaS',
          'Professional, financial & legal services',
          'Boutique retail & Shopify ecommerce',
          'Creative agencies & design studios',
          'Architecture, interiors & construction',
        ],
        faqs: [
          {
            q: 'Why hire an independent studio instead of a downtown Vancouver web agency?',
            a: 'Large Vancouver agencies charge for downtown office rent, layers of account managers, and junior production staff. MANDER is an independent studio of senior designers and developers — you get faster turnarounds, direct collaboration, higher code quality, and invoices that are a fraction of downtown agency rates.',
          },
          {
            q: 'Do you provide custom website design rather than generic templates?',
            a: 'Yes. Every site we build is custom-designed and engineered with clean code (Next.js, Tailwind CSS) — no pre-bought WordPress templates or drag-and-drop page builders. That delivers sub-second load times, flawless mobile responsiveness, and superior organic search rankings.',
          },
          {
            q: 'Can you migrate our site from Wix or Squarespace to a custom high-performance build?',
            a: 'Yes. Generic builders like Wix, Squarespace, and GoDaddy often suffer from sluggish loading speeds, code bloat, and limited SEO control. We rebuild your site on modern, clean code that achieves 95+ Google PageSpeed scores and gives you total technical freedom.',
          },
          {
            q: 'Do you build Shopify stores and ecommerce sites for Vancouver brands?',
            a: 'Yes. As a Shopify developer, we build custom Shopify storefronts and ecommerce platforms with optimized checkout flows, integrated analytics, and responsive product catalogs tailored to Canadian and international shoppers.',
          },
          {
            q: 'Do you offer logo design and brand identity agency services in Vancouver?',
            a: 'Yes. We deliver complete brand identity systems — logos, typography guidelines, color palettes, and digital asset kits — designed to give your company immediate market authority.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, and every price is fixed and agreed before work starts.',
          },
        ],
      },
      {
        slug: 'surrey',
        name: 'Surrey',
        h1: 'Custom website design & local SEO in Surrey, BC.',
        metaDescription:
          'Custom website design & local SEO expert in Surrey, BC. Freelance graphic designer, contractor websites, WordPress developer, and logo design. Fixed price.',
        intro:
          "Surrey is one of the fastest-growing commercial and industrial centres in Canada. From contractors, transport, and logistics along the Fraser Valley corridor to vibrant retail and multicultural service businesses, Surrey companies need websites that work as hard as they do. MANDER delivers the speed and value of an independent freelance web designer combined with the capability of a full-service digital and brand identity agency — building custom, high-speed websites that capture local contractor leads, rank organically, and elevate your brand.",
        industries: [
          'Contractors, roofing & electrical trades',
          'Landscaping & site maintenance',
          'Logistics, warehousing & trucking',
          'Retail, grocery & food service',
          'Professional, legal & multicultural businesses',
        ],
        faqs: [
          {
            q: 'Do you build custom websites for contractors and trades in Surrey?',
            a: 'Yes. Contractor web design is one of our primary services in Surrey. We build mobile-first sites tailored to how homeowners and commercial clients search: fast quote requests, click-to-call buttons, verified project photo galleries, and local SEO tuned for Surrey, Cloverdale, Newton, and Fleetwood.',
          },
          {
            q: 'Can you act as a freelance graphic designer and logo designer in Surrey?',
            a: 'Yes. We design complete brand identities and logos for Surrey businesses — logos, typography, color palettes, vehicle wrap branding, and marketing collateral — at accessible studio pricing without agency account manager bloat.',
          },
          {
            q: 'Do you design custom WordPress and ecommerce websites in Surrey, BC?',
            a: 'Yes. Whether you need a custom WordPress developer, a modern headless build, or a custom Shopify store, we engineer fast, secure platforms with complete client ownership and zero ongoing plugin lock-in.',
          },
          {
            q: 'Are you a local SEO expert for Surrey companies?',
            a: 'Yes. We handle comprehensive local SEO services for Surrey landscapers, roofers, trades, and professional firms — ranking your Google Business Profile in the local Map Pack and targeting geo-modified service keywords across Surrey and the Fraser Valley.',
          },
          {
            q: 'Can you write copy for a business that serves a multilingual customer base?',
            a: 'We write in English by default; if your customers search or read in another language too, bilingual builds are something we handle as part of Website Design.',
          },
          {
            q: 'Do you invoice Surrey clients in Canadian dollars?',
            a: 'Yes on request. Prices are shown in USD by default and Canadian clients are invoiced in CAD at your preference.',
          },
        ],
      },
      {
        slug: 'burnaby',
        name: 'Burnaby',
        h1: 'Custom website design & local SEO in Burnaby, BC.',
        metaDescription:
          'Custom website design & local SEO expert in Burnaby, BC. Affordable web design packages, Shopify developer, logo designer & contractor websites. Fixed price.',
        intro:
          "Burnaby sits between two of Metro Vancouver's busiest commercial centres, Metrotown and Brentwood, with SFU on the mountain feeding tech and professional services down into the city. From Metrotown retailers and commercial services to light industrial trades and contractors, Burnaby businesses need fast, tailored websites that stand out. MANDER delivers custom website design, Shopify development, and local SEO services with the agility of a freelance web designer and the quality of a dedicated agency.",
        industries: [
          'Retail & commercial services near Metrotown & Brentwood',
          'Technology startups & SFU-adjacent services',
          'Contractors, mechanical & light industrial trades',
          'Food, hospitality & catering',
          'Professional & accounting practices',
        ],
        faqs: [
          {
            q: 'Do you offer affordable web design packages in Burnaby?',
            a: 'Yes. We provide transparent fixed-price website packages for Burnaby small businesses — from fast 3-page Launch sites to full 10-page custom builds with local SEO and booking. Every project has a written scope with zero hourly overages.',
          },
          {
            q: 'Can you work as a local SEO expert for Burnaby businesses?',
            a: 'Yes. We optimize your Google Business Profile and local search architecture so nearby customers searching for services in Burnaby, Metrotown, or Brentwood find you first.',
          },
          {
            q: 'Do you build Shopify stores and custom ecommerce websites in Burnaby?',
            a: 'Yes. As a Shopify developer, we design and build custom Shopify and ecommerce websites for Burnaby retailers and makers, complete with secure payment processing, product collections, and local pickup.',
          },
          {
            q: 'Can you redesign our slow Wix, Squarespace, or WordPress site?',
            a: 'Yes. We specialize in modern website redesigns — migrating dated, slow website builder pages into sleek, custom-coded web experiences that load instantly.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
          },
        ],
      },
      {
        slug: 'richmond',
        name: 'Richmond',
        h1: 'Custom website design & local SEO in Richmond, BC.',
        metaDescription:
          'Custom website design & Shopify developer in Richmond, BC. Affordable web design, bilingual websites, logo design & local SEO services. Fixed price.',
        intro:
          "Richmond runs on international trade, logistics, and one of the most vibrant culinary and hospitality scenes in North America. With YVR at its centre, Richmond businesses cater to both local residents and international clientele. MANDER provides custom website design, Shopify store development, bilingual website builds, and local SEO services that help Richmond companies capture search demand across the Lower Mainland.",
        industries: [
          'International trade, import/export & logistics',
          'Restaurants, bakeries & Asian hospitality',
          'Professional, accounting & financial services',
          'Specialty retail & ecommerce',
          'Contractors & commercial services',
        ],
        faqs: [
          {
            q: 'Do you design custom Shopify and ecommerce websites in Richmond?',
            a: 'Yes. We build high-converting Shopify storefronts for Richmond retailers, distributors, and food brands with multi-currency checkout, mobile optimization, and product catalogs.',
          },
          {
            q: 'Can you build bilingual websites for Richmond businesses?',
            a: 'Yes. We build clean, modern bilingual sites (English with Chinese or French) with proper language alternates and SEO tags, ensuring seamless experiences for diverse audiences.',
          },
          {
            q: 'Are your website packages affordable for Richmond small businesses?',
            a: 'Yes. Every project is scoped at a fixed price agreed in advance — giving you the quality of an agency with the cost-efficiency and direct contact of an independent web designer.',
          },
          {
            q: 'Do you provide local SEO and Google Business Profile optimization in Richmond?',
            a: 'Yes. We optimize your Google Business Profile and local keywords so customers searching in Richmond or near YVR find your business in Maps and organic search.',
          },
          {
            q: 'Do you invoice Richmond clients in Canadian dollars?',
            a: 'Yes on request. Prices are shown in USD by default and Canadian clients are invoiced in CAD at your preference.',
          },
        ],
      },
      {
        slug: 'north-vancouver',
        name: 'North Vancouver',
        h1: 'Custom website design & branding in North Vancouver, BC.',
        metaDescription:
          'Custom website design & brand identity agency in North Vancouver, BC. Logo designer, outdoor brand websites, Shopify developer & local SEO. Fixed price.',
        intro:
          "North Vancouver blends outdoor and recreation brands with the historic marine and industrial trades of the Shipyards district. From Lonsdale retail and recreation outfitters to North Shore contractors and waterfront services, customers research extensively on mobile devices. MANDER delivers custom website design, logo and brand identity design, Shopify development, and local SEO services engineered for North Vancouver businesses.",
        industries: [
          'Outdoor, recreation & sports brands',
          'Marine, waterfront & construction trades',
          'Lonsdale retail, hospitality & dining',
          'Health, wellness & physiotherapy clinics',
          'Architects, builders & designers',
        ],
        faqs: [
          {
            q: 'Do you build custom websites for outdoor and lifestyle brands in North Vancouver?',
            a: 'Yes. We build image-rich, mobile-first websites and Shopify stores for outdoor brands, guides, and lifestyle retailers that capture the active spirit of the North Shore.',
          },
          {
            q: 'Do you offer logo design and brand identity services in North Vancouver?',
            a: 'Yes. As a brand identity agency, we create cohesive visual systems — logos, typography, color palettes, and digital style guides — designed to stand out in the Shipyards district and across the Lower Mainland.',
          },
          {
            q: 'Can you help North Vancouver contractors and marine trades rank locally?',
            a: 'Yes. Our local SEO services optimize your Google Business Profile and service pages to capture high-intent inquiries across North and West Vancouver.',
          },
          {
            q: 'Do you build fast custom sites to replace slow Wix or Squarespace templates?',
            a: 'Yes. We replace bloated DIY templates with custom, clean code that loads in under a second on phones, ensuring you never lose customers to slow load times.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
          },
        ],
      },
      {
        slug: 'langley',
        name: 'Langley',
        h1: 'Custom website design & local SEO in Langley, BC.',
        metaDescription:
          'Freelance web designer & local SEO expert in Langley, BC. Custom website design, Shopify developer, logo design & SEO for plumbers and trades. Fixed price.',
        intro:
          "Langley is where part of the MANDER team is based. As an independent design studio, we give Fraser Valley small businesses the direct agility and affordable pricing of a freelance web designer with the technical execution of a senior digital agency. Whether you need a custom website design built from scratch, a Shopify developer to launch an ecommerce store, a complete brand identity and logo designer, an independent local SEO expert to rank your Google Business Profile, or high-converting websites for plumbers, landscapers, and construction contractors, we engineer digital systems that turn local searchers into paying clients.",
        industries: [
          'Plumbing, HVAC & mechanical trades',
          'General contractors & construction',
          'Landscaping & tree services',
          'Agriculture, wineries & equestrian',
          'Retail & Shopify ecommerce',
          'Professional, legal & healthcare practices',
        ],
        faqs: [
          {
            q: 'Can I hire a freelance web designer or independent developer in Langley, BC?',
            a: 'Yes. MANDER operates as an independent studio with team members based in Langley. You get the direct communication, personal dedication, and accessible pricing of a freelance web designer, backed by the reliability and code quality of senior full-stack developers.',
          },
          {
            q: 'What affordable web design packages do you offer in Langley?',
            a: 'We offer transparent, fixed-price website packages designed specifically for small businesses — from our Launch tier for emerging ventures to custom Starter and Growth plans with local SEO and booking. Every quote is fixed in writing with zero hidden fees, and you own the code, domain, and design outright.',
          },
          {
            q: 'Do you work as a local SEO expert and consultant for Langley businesses?',
            a: 'Yes. Our local SEO services cover full Google Business Profile optimization, local keyword strategy, schema markup, citation building, and Google Maps ranking. We help Langley companies rank in the local 3-pack for high-intent searches in their service areas.',
          },
          {
            q: 'Do you provide web design and SEO for plumbers, landscapers, and contractors in Langley?',
            a: 'Yes — trades and home services are one of our core specialties in the Fraser Valley. We build mobile-first contractor sites with quick quote forms, click-to-call buttons, verified project galleries, and local SEO targeted at high-intent queries like "plumber Langley", "electrician Fraser Valley", and "landscaping contractor".',
          },
          {
            q: 'Are you a Shopify developer or ecommerce website maker for Langley businesses?',
            a: 'Yes. We design and launch custom Shopify stores for Langley retailers, agricultural producers, makers, and boutique brands. We handle store setup, custom theme styling, payment processing, product catalogs, and local pickup workflows at a fixed agreed price.',
          },
          {
            q: 'Can you redesign a slow Wix, Squarespace, or WordPress website, or replace a DIY website builder?',
            a: 'Yes. Many local businesses outgrow DIY website builders and website makers like Wix, Squarespace, GoDaddy, or bloated WordPress themes that suffer from slow load times and poor SEO. We rebuild your site in modern, ultra-fast custom code that achieves 95+ Google PageSpeed scores.',
          },
          {
            q: 'Do you offer logo design and brand identity services in Langley?',
            a: 'Yes. We provide complete brand identity and custom logo design — avoiding generic automated logo creators. We deliver vector logos, typography scales, color palettes, vehicle branding assets, and signage guidelines — so your business looks established and authoritative from day one.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
          },
        ],
      },
      {
        slug: 'coquitlam',
        name: 'Coquitlam',
        h1: 'Custom website design & digital growth in Coquitlam, BC.',
        metaDescription:
          'Affordable web design for small business in Coquitlam & Tri-Cities. Shopify developer, real estate branding, logo designer & local SEO expert. Fixed price.',
        intro:
          "Coquitlam anchors the Tri-Cities — Port Moody and Port Coquitlam alongside it — across an expanding residential, commercial, and culinary corridor. Healthcare practices, boutique real estate agents, construction firms, and Port Moody's renowned craft brewing scene all compete for local attention. MANDER delivers affordable web design for small businesses across Coquitlam: custom website design, Shopify developer store setup, polished real estate branding, and local SEO services that turn Tri-Cities searchers into customers.",
        industries: [
          'Real estate & boutique property development',
          'Restaurants, craft brewing & bakeries',
          'Healthcare, dental & wellness practices',
          'Construction & home renovation',
          'Ecommerce & specialty retail',
        ],
        faqs: [
          {
            q: 'Do you offer affordable web design for small business in Coquitlam?',
            a: 'Yes. We specialize in affordable, high-return web design packages for small and independent businesses across Coquitlam, Port Coquitlam, and Port Moody. Every project is quoted at a transparent fixed price with zero surprises and no ongoing agency retainers.',
          },
          {
            q: 'Can you set up a Shopify store as an ecommerce website maker in Coquitlam?',
            a: 'Yes. We help Tri-Cities retailers, makers, and local brands launch on Shopify — configuring payment gateways, custom product variants, inventory syncing, and local pickup options with a clean, branded shopping experience.',
          },
          {
            q: 'Do you design branding, logos, and websites for real estate in Coquitlam?',
            a: 'Yes. We act as a dedicated brand identity agency and web design partner for real estate agents, mortgage brokers, and boutique developers — focusing on neighbourhood authority, active listings presentation, and direct lead generation.',
          },
          {
            q: 'Who makes websites for restaurants and craft breweries in Coquitlam?',
            a: 'MANDER designs high-converting websites for restaurants, cafés, bakeries, and craft breweries across the Tri-Cities — featuring mobile-friendly menus, direct reservation tools, online gift cards, and local SEO to attract diners searching near Brewers Row or Coquitlam Centre.',
          },
          {
            q: 'Can you redesign a slow Wix, Squarespace, or WordPress website?',
            a: 'Yes. We routinely rebuild slow, rigid builder sites into lightweight, custom websites that load in under a second and rank significantly better on Google.',
          },
          {
            q: 'Do you cover the whole Tri-Cities area, not just Coquitlam itself?',
            a: 'Yes — Port Moody and Port Coquitlam are covered under the same page, and the local SEO work follows wherever your actual customers search from.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
          },
        ],
      },
      {
        slug: 'new-westminster',
        name: 'New Westminster',
        h1: 'Custom website design & local SEO in New Westminster, BC.',
        metaDescription:
          'Affordable custom website design & local SEO expert in New Westminster, BC. Logo designer, healthcare clinic websites & Shopify developer. Fixed price.',
        intro:
          "New Westminster carries deep history as British Columbia's original capital, anchored by independent businesses along Columbia Street and Uptown, and a major healthcare corridor around Royal Columbian Hospital. MANDER builds custom websites, brand identities, and local SEO systems for New Westminster businesses — providing the high-touch collaboration of an independent freelance web designer with the technical precision of a modern studio.",
        industries: [
          'Independent downtown retail & heritage services',
          'Healthcare, dental & specialist medical clinics',
          'Construction, renovation & local trades',
          'Professional, legal & financial practices',
          'Hospitality, cafés & waterfront dining',
        ],
        faqs: [
          {
            q: 'Do you build websites for healthcare practices near Royal Columbian Hospital?',
            a: 'Yes. We build clean, accessible websites with patient intake forms, practitioner profiles, and appointment scheduling tailored for medical and wellness clinics.',
          },
          {
            q: 'Do you offer affordable website design packages in New Westminster?',
            a: 'Yes. We offer transparent fixed-price packages suited for established independent businesses and emerging startups alike, with zero hourly overages.',
          },
          {
            q: 'Do you provide local SEO and Google Maps optimization in New Westminster?',
            a: 'Yes. We help Royal City businesses rank prominently on Google Search and Maps for local service queries, driving direct calls and enquiries.',
          },
          {
            q: 'Can you create logos and brand identity for New West businesses?',
            a: 'Yes. As a brand identity and logo designer, we build cohesive visual systems that honor your company’s heritage while modernizing your digital presence.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, CAD on request at no extra cost, with the price fixed and agreed before anything starts.',
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

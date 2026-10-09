// The service catalogue, named exactly as it appears in Google Business
// Profile → Services. Ask Maps answers from the profile and the site
// together, so one service name meaning two things in two places is a
// contradiction it has to resolve — usually by answering about neither.
//
// `gbp` is the text pasted into the GBP service description (750-char cap;
// docs/gbp-ask-maps-pack.md shows each count). The page renders the same
// fields, so the site and the listing say the same thing in the same words.
//
// Every timeline is the one the matching tier in lib/content.js already
// states. Where no tier states one, the timeline says it is quoted — not a
// number invented to fill the field.
//
// `priceRange` is null on purpose: the site does not publish figures (see
// the note in lib/markets/us.js). Set a string here, e.g. 'CA$400–$700',
// and it renders on /services and in the schema; left null, it reads
// "Fixed price, quoted in writing before work starts".

export const TOWNS = ['Langley', 'Coquitlam', 'Port Coquitlam', 'Port Moody', 'Surrey', 'the Fraser Valley'];
export const TOWNS_LINE =
  'Langley, Coquitlam and the Tri-Cities, Surrey, the Fraser Valley and the rest of Metro Vancouver — plus clients anywhere.';

export const PRICE_FALLBACK = 'Fixed price, quoted in writing before work starts.';

export const SERVICE_CATALOGUE = [
  {
    id: 'website-design',
    name: 'Website Design',
    what: 'Custom website design for small businesses — clean-coded, mobile-first websites built to load in under a second. Transparent packages from single-page Launch sites to 10-page custom builds with booking.',
    whoFor: 'Small businesses, contractors, retailers and clinics that need a professional website that turns local searchers into paying clients.',
    timeline: 'About 2 weeks for a one-page site; 3–4 weeks for up to 5 pages; 4–6 weeks for up to 10 pages.',
    priceRange: null,
    href: '/digital',
    gbp: 'Custom website design for small businesses in Langley, Surrey, Coquitlam, Vancouver and across Metro Vancouver. We build high-speed, mobile-first websites — from affordable 3-page starter packages to custom corporate and contractor lead-generation sites. Transparent fixed pricing agreed in writing before work starts — no hourly billing. You own the site, code, and domain outright. Contact sales@mander.tech or reach out via WhatsApp; we reply within one business day.',
  },
  {
    id: 'website-redesign',
    name: 'Website Redesign',
    what: 'Rebuilding slow, dated websites: migrating businesses trapped on slow DIY builders (Wix, Squarespace, GoDaddy, or dated WordPress themes) into modern, lightning-fast custom websites that rank higher and convert.',
    whoFor: 'Businesses whose current website is slow, failing Core Web Vitals, or quietly costing them enquiries.',
    timeline: '3–6 weeks depending on the number of pages, the same as a new build of that size.',
    priceRange: null,
    href: '/digital',
    gbp: 'Website redesign services for small businesses in Langley, Surrey, Coquitlam and Metro Vancouver. We migrate dated, sluggish sites from Wix, Squarespace, GoDaddy and legacy WordPress to fast custom code — cleaner layout, sub-second load times and technical SEO built in. Typical timeline is 3–6 weeks. Fixed price agreed in writing before work starts, with complete ownership. Contact us on WhatsApp or email for a quote.',
  },
  {
    id: 'ecommerce-website-design',
    name: 'Ecommerce Website Design',
    what: 'Shopify developer and custom ecommerce website maker — online stores for retailers, makers, bakeries, and trade brands with secure checkout, product collections, and direct customer relationships.',
    whoFor: 'Retailers, makers, farms, bakeries and direct-to-consumer brands that want to sell online without marketplace commissions.',
    timeline: '6–10 weeks (the Business Pro scope, which is where e-commerce is included).',
    priceRange: null,
    href: '/pricing',
    gbp: 'Shopify developer and ecommerce website design for businesses in Langley, Surrey, Coquitlam and Metro Vancouver — custom online stores for retailers, makers, and local brands. Includes payment setup, product catalogs, shipping rules, local pickup, and on-page SEO. Typical timeline is 6–10 weeks. Fixed price, agreed in writing before work starts. Contact sales@mander.tech or WhatsApp for a quote.',
  },
  {
    id: 'local-seo',
    name: 'Local SEO',
    what: 'Local SEO expert services: Google Business Profile optimization, local keyword strategy, schema markup, and Google Maps pack ranking for contractors, plumbers, landscapers, clinics, and professional services.',
    whoFor: 'Businesses whose customers search Google or Maps before they buy — trades, clinics, restaurants, professional services.',
    timeline: 'Set up alongside a Growth-tier build (4–6 weeks); ranking gains then build over the following months — no one can honestly promise a date.',
    priceRange: null,
    href: '/growth',
    gbp: 'Local SEO services for small businesses in Langley, Surrey, Coquitlam, Vancouver and the Fraser Valley. We handle Google Business Profile optimization, local keyword research, citations, Google Search Console, and Schema markup so people searching for contractors, plumbers, clinics, and local services in your town find you. Fixed price, quoted in writing. Contact us via WhatsApp or email for a consultation.',
  },
  {
    id: 'google-business-profile-optimization',
    name: 'Google Business Profile Optimization',
    what: 'Setting up and tuning your Google Business Profile — categories, services, service area, hours, photos, posts and a review routine — so Maps and Ask Maps can answer about you with confidence.',
    whoFor: 'Any local business that wants to show up in the Maps pack for its own town.',
    timeline: 'Profile changes can show within days of going live; included in Growth-tier builds and above.',
    priceRange: null,
    href: '/growth',
    gbp: 'Google Business Profile optimization for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. We set up and tune your categories, services, service area, hours, photos and posts, match them to your website, and set up a simple routine for asking for and replying to reviews — so Google Maps can answer questions about your business accurately. Changes can show within days. Fixed price, quoted up front. WhatsApp, call or email us; we reply within one business day.',
  },
  {
    id: 'brand-identity-design',
    name: 'Brand Identity Design',
    what: 'Logo designer and brand identity agency services: custom logos, typography scales, colour palettes, vehicle wrap branding, and design guidelines that give small businesses immediate authority.',
    whoFor: 'New businesses, and established ones whose offer is sharper in the owner’s head than anywhere a customer can see it.',
    timeline: 'Quoted with the written scope — it depends on how much of the identity is being made.',
    priceRange: null,
    href: '/brand',
    gbp: 'Brand identity and logo design for businesses in Langley, Surrey, Coquitlam and Metro Vancouver: custom logo design, typography rules, color palettes, and digital style guides, so your brand looks established on your website, vehicle wraps, signage, and social media. Fixed price with complete file ownership. Contact us on WhatsApp or email sales@mander.tech for a quote.',
  },
  {
    id: 'android-app-development',
    name: 'Android App Development',
    what: 'Native Android apps published to Google Play under your own developer account — from a first app of up to 8 screens to apps with payments, bookings and an admin dashboard.',
    whoFor: 'Businesses that need a booking, ordering, dispatch or customer app their customers keep on their phone.',
    timeline: 'Quoted with the written scope; 30 to 60 days of post-launch support depending on the plan.',
    priceRange: null,
    href: '/pricing',
    gbp: 'Native Android app development for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. Apps for bookings, ordering, dispatch and customer accounts — from a first app of up to 8 screens with sign-in and a basic backend, to apps with payments and an admin dashboard. Published to Google Play under your own developer account, with 30–60 days of support after launch. Fixed price in writing. WhatsApp, call or email us; we reply within one business day.',
  },
  {
    id: 'website-care-plan',
    name: 'Website Care Plan',
    what: 'Managed hosting, SSL and security scanning, daily backups and unlimited small edits, month to month.',
    whoFor: 'Anyone who wants the site kept fast and current without thinking about it.',
    timeline: 'Starts the day the site launches; month to month, cancel any time.',
    priceRange: null,
    href: '/pricing',
    gbp: 'Website hosting and maintenance for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. The Care Plan covers managed hosting, SSL and security scanning, daily backups and unlimited small content edits — done for you, with no hourly billing. Month to month with no lock-in: cancel any time and the site stays yours. Available on any site we build. Contact us by WhatsApp, phone or email; we reply within one business day.',
  },
];

// The questions people put to Google Maps' Gemini-backed "Ask Maps", each
// answered in its first sentence. Rendered on /services with FAQPage schema.
export const ASK_MAPS_FAQS = [
  {
    q: 'Can I hire a freelance web designer or independent studio in Langley or Surrey?',
    a: 'Yes. MANDER operates as an agile, senior independent studio with team members based in Langley and Coquitlam. You get the direct communication, personal care, and affordable rates of a freelance web designer, backed by the reliability and code quality of senior full-stack developers.',
  },
  {
    q: 'Which web designer in Langley is a Shopify developer for ecommerce?',
    a: 'MANDER designs and develops custom Shopify stores for businesses in Langley and the Fraser Valley — part of the team is based in Langley. Online stores with payment integration, product collections, local pickup, and local SEO typically take 6–10 weeks at a fixed price agreed in writing.',
  },
  {
    q: 'Do you build websites and handle SEO for contractors, plumbers, and trades?',
    a: 'Yes — contractor web design and trade SEO is a core specialty across Surrey, Langley, and Metro Vancouver. We build fast, mobile-friendly websites with quick quote forms, click-to-call buttons, verified job photos, and Google Map Pack optimization so local homeowners call you first.',
  },
  {
    q: 'Can you redesign or migrate a slow Wix, Squarespace, or WordPress website?',
    a: 'Yes. We routinely rebuild slow, template-heavy sites from Wix, Squarespace, GoDaddy, and legacy WordPress into clean, custom-coded websites that load in under a second and rank significantly better on Google.',
  },
  {
    q: 'What affordable website design packages do you offer for small businesses?',
    a: 'We offer transparent, fixed-price website packages — from our Launch tier for fast 3-page essentials to Starter and Growth plans with local SEO and booking. Every package includes full client ownership with zero hidden fees or ongoing retainers.',
  },
  {
    q: 'Do you offer logo design and brand identity services?',
    a: 'Yes. As a brand identity and logo designer, MANDER creates complete visual systems — logos, typography scales, color palettes, vehicle wrap files, and style guides — that give local businesses immediate market authority.',
  },
  {
    q: 'Who makes websites for restaurants in Coquitlam and Port Moody?',
    a: 'MANDER designs websites for restaurants, cafés, bakeries and craft breweries in Coquitlam, Port Coquitlam and Port Moody — menus, direct reservations, gift cards or pre-orders, and local search so diners find you without aggregator fees. Fixed price, quoted up front.',
  },
  {
    q: 'Is there a local SEO expert near me in Metro Vancouver?',
    a: 'Yes — MANDER handles local SEO and Google Business Profile optimization together for businesses in Langley, Surrey, Coquitlam, Vancouver, and the Fraser Valley. Local SEO is included from the Growth plan up.',
  },
  {
    q: 'How fast can I get a custom website built?',
    a: 'A one-page website typically goes live in about 2 weeks. A site of up to 5 pages takes 3–4 weeks and up to 10 pages 4–6 weeks, depending on content review and feedback.',
  },
  {
    q: 'Does MANDER reply on WhatsApp?',
    a: 'Yes. You can reach MANDER on WhatsApp, by phone (+1 857-758-7182) or by email (sales@mander.tech), and every message gets a reply within one business day. Hours are Monday to Friday, 9am–5pm Pacific.',
  },
  {
    q: 'What areas does MANDER serve in British Columbia?',
    a: 'Langley, Surrey, Coquitlam, Port Coquitlam, Port Moody, Vancouver, Burnaby, Richmond, North Vancouver, New Westminster, and the Fraser Valley — plus remote clients across Canada and worldwide.',
  },
  {
    q: 'How do I get a quote from MANDER?',
    a: 'Send a WhatsApp message, call, or email sales@mander.tech with a few lines about your project. You receive one fixed price in writing before any work starts — no hourly billing.',
  },
  {
    q: 'What languages does MANDER work in?',
    a: 'English and French. Herman works with clients in French; everyone else on the team works in English.',
  },
  {
    q: 'What is included in a MANDER website?',
    a: 'Every site includes custom mobile-first design, contact forms, and clean Next.js code; from 5 pages up, copywriting support and basic SEO; from the Growth plan up, local SEO, Google Business Profile optimization, Analytics, Search Console, and booking or CRM integration. You own the site, code, and domain outright.',
  },
];

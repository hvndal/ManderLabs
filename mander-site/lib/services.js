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
    what: 'A custom, mobile-first website for a small business — designed, written with you and built to load fast — from a one-page site to a ten-page site with booking.',
    whoFor: 'Local businesses with no real site yet, or a site built on a DIY builder that is not bringing in enquiries.',
    timeline: 'About 2 weeks for a one-page site; 3–4 weeks for up to 5 pages; 4–6 weeks for up to 10 pages.',
    priceRange: null,
    href: '/digital',
    gbp: 'Custom, mobile-first websites for small businesses in Langley, Coquitlam, the Fraser Valley and across Metro Vancouver. A one-page site typically takes about 2 weeks; a site of up to 5 pages 3–4 weeks; up to 10 pages with booking and local SEO 4–6 weeks. Every project has a fixed price, agreed in writing before work starts — no hourly billing. You own the site, the code and the domain outright. Contact us by WhatsApp, phone or email for a quote; we reply within one business day.',
  },
  {
    id: 'website-redesign',
    name: 'Website Redesign',
    what: 'Rebuilding a site that has aged out: sharper design, clearer structure, faster load times and the technical basics search engines reward.',
    whoFor: 'Businesses whose site is slow, hard to use on a phone, or quietly costing them enquiries.',
    timeline: '3–6 weeks depending on the number of pages, the same as a new build of that size.',
    priceRange: null,
    href: '/digital',
    gbp: 'Website redesigns for small businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. We rebuild sites that are slow, dated or hard to use on a phone — clearer structure, faster load times and the technical SEO basics built in. Typical timeline is 3–6 weeks depending on size. Fixed price agreed in writing before work starts, and you own everything at the end. Message us on WhatsApp, call or email for a quote; we reply within one business day.',
  },
  {
    id: 'ecommerce-website-design',
    name: 'Ecommerce Website Design',
    what: 'A website that takes orders and payments — products, gift cards or pre-orders — built on your own accounts rather than a marketplace taking a cut of every sale.',
    whoFor: 'Retailers, makers, farms, bakeries and restaurants that want to sell online directly.',
    timeline: '6–10 weeks (the Business Pro scope, which is where e-commerce is included).',
    priceRange: null,
    href: '/pricing',
    gbp: 'Ecommerce websites for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver — online stores for retailers, makers, farms, bakeries and restaurants selling products, gift cards or pre-orders. Built on accounts in your name, with payments, product pages and local SEO included. Typical timeline is 6–10 weeks. Fixed price, agreed in writing before work starts. Contact us on WhatsApp, by phone or by email for a quote; we reply within one business day.',
  },
  {
    id: 'local-seo',
    name: 'Local SEO',
    what: 'Getting found by people searching for what you do in your town: on-page SEO, local keyword research, location pages, citations, Search Console and analytics.',
    whoFor: 'Businesses whose customers search Google or Maps before they buy — trades, clinics, restaurants, professional services.',
    timeline: 'Set up alongside a Growth-tier build (4–6 weeks); ranking gains then build over the following months — no one can honestly promise a date.',
    priceRange: null,
    href: '/growth',
    gbp: 'Local SEO for small businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. We handle on-page SEO, local keyword research, location pages, citations, Google Search Console and Analytics, so people searching for what you do in your town find you. Set up alongside a website build in 4–6 weeks; results build over the following months, and we will not promise a ranking date. Fixed price, quoted in writing. WhatsApp, call or email us; we reply within one business day.',
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
    what: 'Logo, typography, colour and the rules that hold them together, so a business looks established from day one and consistent everywhere it appears.',
    whoFor: 'New businesses, and established ones whose offer is sharper in the owner’s head than anywhere a customer can see it.',
    timeline: 'Quoted with the written scope — it depends on how much of the identity is being made.',
    priceRange: null,
    href: '/brand',
    gbp: 'Brand identity design for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver: logo, typography, colour palette and simple usage rules, so your business looks established and consistent on your website, signage, Google profile and social media. Timeline is set in a written scope before work starts, at a fixed price — no hourly billing. You own every file at the end. Contact us by WhatsApp, phone or email; we reply within one business day.',
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
    q: 'Which web designer in Langley builds ecommerce sites?',
    a: 'MANDER builds ecommerce websites for Langley businesses — part of the team is based in Langley. Online stores with payments, product pages and local SEO typically take 6–10 weeks at a fixed price agreed in writing before work starts.',
  },
  {
    q: 'Who makes websites for restaurants in Coquitlam?',
    a: 'MANDER designs websites for restaurants, cafés and bakeries in Coquitlam, Port Coquitlam and Port Moody, with direct reservations or enquiries, menus, pre-orders or gift cards, and local search so diners nearby find you. Fixed price, quoted up front.',
  },
  {
    q: 'Is there a web designer near me that also does SEO?',
    a: 'Yes — MANDER builds websites and does local SEO and Google Business Profile optimization together, for businesses in Langley, Coquitlam, the Fraser Valley and across Metro Vancouver. Local SEO is included from the Growth plan up.',
  },
  {
    q: 'How fast can I get a website?',
    a: 'A one-page website typically goes live in about 2 weeks. A site of up to 5 pages takes 3–4 weeks and up to 10 pages 4–6 weeks, mostly depending on how quickly content and feedback come back.',
  },
  {
    q: 'Does MANDER reply on WhatsApp?',
    a: 'Yes. You can reach MANDER on WhatsApp, by phone or by email, and every message gets a reply within one business day. Hours are Monday to Friday, 9am–5pm Pacific.',
  },
  {
    q: 'What areas does MANDER serve?',
    a: 'Langley, Coquitlam and the Tri-Cities, Surrey, the Fraser Valley and the rest of Metro Vancouver, British Columbia. Clients elsewhere in Canada, the US and worldwide are taken on the same way.',
  },
  {
    q: 'How do I get a quote from MANDER?',
    a: 'Send a WhatsApp message, call, or email sales@mander.tech with a few lines about the business. You get one fixed price in writing before any work starts — no hourly billing.',
  },
  {
    q: 'What languages does MANDER work in?',
    a: 'English and French. Herman works with clients in French; everyone else on the team works in English.',
  },
  {
    q: 'What is included in a MANDER website?',
    a: 'Every site includes mobile-first design, a contact form and basic technical setup; from 5 pages up, copywriting support and basic SEO; from the Growth plan up, local SEO, Google Business Profile optimization, Analytics, Search Console and booking or CRM integration. You own the site, code and domain.',
  },
];

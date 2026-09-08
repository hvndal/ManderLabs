// Location SEO data — Metro Vancouver & Greater Vancouver, British Columbia.
//
// Two routes read this file: app/locations/[region]/page.js and
// app/locations/[region]/[city]/page.js. Both are data-driven templates,
// statically generated at build time via generateStaticParams.
//
// Strategic geographic focus: METRO VANCOUVER / GREATER VANCOUVER, BC.
// Deliberately focused only on municipalities with genuine economic and
// service distinctions — no thin doorway pages or city-name substitutions.

export const REGIONS = [
  {
    slug: 'british-columbia',
    name: 'British Columbia',
    abbr: 'BC',
    country: 'CA',
    countryName: 'Canada',
    kicker: 'Metro Vancouver & Fraser Valley',
    h1: 'Website design for Metro Vancouver & British Columbia businesses.',
    metaDescription:
      'Architectural website design and digital systems for Metro Vancouver businesses — Vancouver, Burnaby, Richmond, Surrey, North Vancouver, Langley, Coquitlam, and New Westminster.',
    intro: [
      "Our studio practice and foundation are rooted in Metro Vancouver — British Columbia is where MANDER was founded, not an afterthought market. From Vancouver's competitive tech and design culture to Burnaby's research parks, Richmond's international commercial hubs, and the rapidly growing business centres of Surrey, Langley, and the North Shore, local businesses deserve digital presence that commands real authority.",
      "British Columbia clients are invoiced in CAD on request and collaborated with during Pacific business hours by default. Every engagement is engineered with architectural rigor, custom Next.js code, and transparent, tailored scoping without hourly surprises or template bloat.",
    ],
    proximityNote: 'MANDER is based in Metro Vancouver, British Columbia (Water Street, Gastown & Langley).',
    industries: [
      'Technology & Venture-Backed Startups',
      'Architecture & Creative Studios',
      'Hospitality & Culinary Flagships',
      'Commercial Contracting & Trades',
      'Healthcare & Professional Practices',
    ],
    faqs: [
      {
        q: 'Is MANDER a Metro Vancouver studio?',
        a: 'Yes. Our practice and foundation are based in Metro Vancouver (Langley / Vancouver). We work directly with founders, directors, and business owners across the entire Lower Mainland.',
      },
      {
        q: 'Do you invoice in Canadian dollars?',
        a: 'Yes — Canadian clients are invoiced in CAD on request at no extra cost, with clear, written quotes for every engagement.',
      },
      {
        q: 'How do you compare to traditional downtown Vancouver design agencies?',
        a: 'We deliver the same senior-tier art direction, custom engineering, and sub-second performance of a high-end downtown studio, but operate with an agile, focused model that eliminates unnecessary agency bloat and hidden lease markups.',
      },
      {
        q: 'What is your turnaround time for Metro Vancouver projects?',
        a: 'Typical production turnaround runs between 2 to 4 weeks depending on scope, moving in a straight line from strategic discovery and wireframing directly to launch.',
      },
      {
        q: 'Do you work with clients outside Metro Vancouver?',
        a: 'Yes. While our studio roots and local SEO focus are concentrated in Metro Vancouver, we work remotely with ambitious businesses across British Columbia, Canada, and the Pacific Northwest.',
      },
    ],
    cities: [
      {
        slug: 'vancouver',
        name: 'Vancouver',
        h1: 'Website design in Vancouver, British Columbia.',
        metaDescription:
          'Architectural website design for Vancouver businesses — Gastown, Mount Pleasant, Downtown and Kitsilano. Sub-second performance, bespoke React engineering.',
        intro:
          "Vancouver’s commercial landscape is defined by exceptional design literacy. Competing for attention among high-growth tech ventures, world-class architecture practices, independent hospitality groups, and boutique consumer brands requires digital flagships with genuine aesthetic authority. MANDER crafts websites that blend editorial typography with custom React engineering — delivering digital flagships that command respect and convert high-value clientele without bloated downtown agency retainers.",
        industries: [
          'Technology & Venture-Backed Startups',
          'Architecture & Design Studios',
          'Hospitality & Culinary Flagships',
          'Specialized Professional Services',
        ],
        faqs: [
          {
            q: 'How does MANDER compare to traditional downtown Vancouver agency pricing?',
            a: 'We provide senior creative direction and bespoke code without charging for downtown office lease overhead. You get immaculate craft and transparent, scope-based quotes.',
          },
          {
            q: 'Can you meet in person for Vancouver discovery sessions?',
            a: 'Yes. We regularly coordinate in-person discovery meetings in Gastown, Downtown, and Mount Pleasant for comprehensive project kickoffs.',
          },
          {
            q: 'Do you invoice in Canadian dollars for Vancouver clients?',
            a: 'Yes, CAD invoicing is available on request at no extra cost with transparent, scope-based quotes.',
          },
          {
            q: 'Do you build custom web applications and mobile apps?',
            a: 'Yes. Beyond editorial marketing flagships, we design and build full-stack digital products, client portals, and Android applications tailored to your specific workflows.',
          },
        ],
      },
      {
        slug: 'burnaby',
        name: 'Burnaby',
        h1: 'Website design in Burnaby, British Columbia.',
        metaDescription:
          'High-performance website design for Burnaby, BC — clean-tech, film & media production, industrial innovators, and Brentwood & Metrotown retail.',
        intro:
          "Situated at the geographic core of Metro Vancouver, Burnaby connects high-tech research campuses at Discovery Parks and SFU with major film production studios, clean-energy pioneers, and dense urban retail hubs like Brentwood and Metrotown. We engineer high-performance digital systems that translate complex technical and industrial capabilities into lucid, persuasive digital experiences.",
        industries: [
          'Clean Technology & Renewable Energy',
          'Film & Visual Effects Production',
          'Industrial Engineering & Automation',
          'Urban Retail & Commercial Corridors',
        ],
        faqs: [
          {
            q: 'How do you present complex technical or industrial capabilities clearly?',
            a: 'We translate intricate technical workflows into clear visual hierarchies, interactive architectural diagrams, and structured editorial content that speaks directly to enterprise procurement directors and investors.',
          },
          {
            q: 'How fast will our Burnaby website load?',
            a: 'We engineer all sites on clean Next.js and React stacks, systematically targeting 95+ Google Lighthouse scores with sub-second time-to-first-byte.',
          },
          {
            q: 'Can you assist with local SEO and Google Business ranking in Burnaby?',
            a: 'Yes. Every project includes structured metadata, schema markup, and technical on-page optimization designed to capture high-intent regional search queries across Brentwood, Metrotown, and industrial corridors.',
          },
        ],
      },
      {
        slug: 'richmond',
        name: 'Richmond',
        h1: 'Website design in Richmond, British Columbia.',
        metaDescription:
          'Sophisticated website design for Richmond, BC — international trade, Pacific logistics, aviation services, and multilingual culinary & retail brands.',
        intro:
          "Richmond is Metro Vancouver’s gateway to international trade, Pacific logistics, and aviation infrastructure at YVR, alongside one of North America’s most celebrated culinary and multicultural commercial communities. MANDER designs sophisticated, multilingual-ready digital flagships that appeal equally to local Pacific Northwest clients and international commercial partners.",
        industries: [
          'International Trade & Pacific Logistics',
          'Aviation & Marine Support',
          'Culinary Flagships & Hospitality Groups',
          'Multilingual Commercial Services',
        ],
        faqs: [
          {
            q: 'Can you build bilingual or multilingual websites for Richmond businesses?',
            a: 'Yes. We engineer seamless multilingual architectures (e.g., English, Traditional/Simplified Chinese) designed for localized readability and international search engines.',
          },
          {
            q: 'Do you build e-commerce and reservation systems?',
            a: 'Yes. We integrate custom checkout flows, booking engines, and CRM pipelines directly into your site.',
          },
          {
            q: 'Are Richmond clients billed in CAD?',
            a: 'Yes, Canadian billing in CAD is standard for all BC clients.',
          },
        ],
      },
      {
        slug: 'surrey',
        name: 'Surrey',
        h1: 'Website design in Surrey, British Columbia.',
        metaDescription:
          'High-performance website design for Surrey, BC — corporate logistics, commercial construction, healthcare practices, and high-growth enterprises.',
        intro:
          "Surrey is one of the fastest-growing economic engines in Canada. From corporate logistics and construction leaders in Campbell Heights to healthcare practices surrounding Surrey Memorial Hospital and corporate hubs in City Centre, Surrey companies are rapidly outgrowing generic word-of-mouth. MANDER builds authoritative, search-optimized websites that turn regional growth into verified inbound revenue.",
        industries: [
          'Commercial Construction & Trades',
          'Logistics & Supply Chain',
          'Healthcare Practices & Medical Clinics',
          'Corporate & Financial Services',
        ],
        faqs: [
          {
            q: 'Why should an established Surrey business invest in a custom website?',
            a: 'As Surrey expands into BC’s largest metropolitan center, commercial buyers and high-value clients evaluate your digital credibility first. A high-performance site establishes immediate market authority.',
          },
          {
            q: 'Can you assist with local SEO and Google Business ranking in Surrey?',
            a: 'Yes. Every project includes structured metadata, schema markup, and technical on-page optimization designed to capture high-intent regional search queries.',
          },
          {
            q: 'Do you invoice in Canadian dollars?',
            a: 'Yes, all Metro Vancouver clients can be invoiced in CAD with no foreign exchange markups.',
          },
        ],
      },
      {
        slug: 'north-vancouver',
        name: 'North Vancouver',
        h1: 'Website design in North Vancouver, British Columbia.',
        metaDescription:
          'Editorial website design for North Vancouver, BC — Shipyards creative studios, outdoor apparel & gear brands, marine engineering, and Lonsdale commerce.',
        intro:
          "North Vancouver blends deep maritime industrial heritage with a booming outdoor lifestyle and recreation technology ecosystem. From creative studios and craft breweries around the Shipyards to technical apparel designers, marine engineers, and independent retail along Lonsdale, businesses on the North Shore require a digital presence that reflects both functional durability and natural Pacific Northwest elegance.",
        industries: [
          'Outdoor Apparel & Recreation Brands',
          'Marine Engineering & Waterfront Trades',
          'Architecture & Environmental Planning',
          'Shipyards & Lonsdale Boutique Commerce',
        ],
        faqs: [
          {
            q: 'Can you capture the distinctive Pacific Northwest aesthetic of the North Shore?',
            a: 'Yes. Our visual identity is rooted in restrained typography, architectural grids, and atmospheric Pacific photography — natural, refined, and authentic to North Vancouver.',
          },
          {
            q: 'Do you support e-commerce for North Vancouver outdoor or apparel brands?',
            a: 'Yes. We build custom headless e-commerce architectures with high-speed catalog browsing and frictionless mobile checkout.',
          },
          {
            q: 'How do we collaborate with your team?',
            a: 'We work closely via video reviews, shared staging environments, and in-person meetings around the Shipyards or Lonsdale Quay.',
          },
        ],
      },
      {
        slug: 'langley',
        name: 'Langley',
        h1: 'Website design in Langley, British Columbia.',
        metaDescription:
          'Website design in Langley, BC — home base of MANDER. Premium digital flagships for Fraser Valley trades, commercial firms, estate wineries, and boutique brands.',
        intro:
          "Langley is where MANDER’s practice was founded. Combining a vibrant commercial center, rapidly expanding tech and light-industrial parks, and boutique retail and equestrian estates, Langley is one of the most dynamic markets in the Lower Mainland. We take immense pride in building flagship websites for our home community.",
        industries: [
          'Trades & Commercial Contracting',
          'Wineries & Agritourism',
          'Manufacturing & Light Industry',
          'Professional Practices',
        ],
        faqs: [
          {
            q: 'Is MANDER locally based in Langley?',
            a: 'Yes. Our founder operates right here in Langley, giving local clients direct access to senior creative leadership and ongoing technical support.',
          },
          {
            q: 'What types of Langley businesses do you work with?',
            a: 'We work with established commercial contractors, professional practices, agricultural and estate brands, and growing retailers who want to elevate their brand authority.',
          },
          {
            q: 'Can we meet in person to discuss our project?',
            a: 'Yes, we are always pleased to coordinate in-person discovery meetings across Langley and the Fraser Highway corridor.',
          },
        ],
      },
      {
        slug: 'coquitlam',
        name: 'Coquitlam',
        h1: 'Website design in Coquitlam & the Tri-Cities, British Columbia.',
        metaDescription:
          'High-performance website design for Coquitlam, Port Moody, and Port Coquitlam — healthcare, construction, craft breweries, and local commerce.',
        intro:
          "Anchoring the Tri-Cities, Coquitlam is a thriving, diverse community experiencing rapid residential and commercial development. Together with Port Moody’s creative and brewing district and Port Coquitlam’s industrial fabric, the Tri-Cities market is highly dynamic. Whether your business is situated around Coquitlam Centre, Austin Heights, or Brewers Row, a polished, mobile-first digital presence is essential for capturing regional market share.",
        industries: [
          'Healthcare & Wellness Clinics',
          'Commercial & Residential Construction',
          'Craft Brewing & Hospitality',
          'Professional Services & Local Commerce',
        ],
        faqs: [
          {
            q: 'Do you serve businesses across the entire Tri-Cities area?',
            a: 'Yes, our Coquitlam coverage extends across Port Coquitlam and Port Moody, serving businesses throughout the entire Tri-Cities region.',
          },
          {
            q: 'Will our website work seamlessly on mobile devices?',
            a: 'Every site we produce is engineered mobile-first, ensuring responsive typography, tactile touch interactions, and lightning-fast loading speeds on all phones.',
          },
          {
            q: 'How does your quoting process work?',
            a: 'Every project receives a clear, written scope with guaranteed pricing based on your goals. No arbitrary hourly fees or hidden maintenance traps.',
          },
        ],
      },
      {
        slug: 'new-westminster',
        name: 'New Westminster',
        h1: 'Website design in New Westminster, British Columbia.',
        metaDescription:
          'Architectural website design for New Westminster, BC — Royal City waterfront, healthcare district around RCH, independent retail, and professional practices.',
        intro:
          "As British Columbia’s historic first capital, New Westminster combines deep heritage character with contemporary waterfront revitalization and a major regional healthcare economy anchored by Royal Columbian Hospital. From independent boutiques and dining along Columbia Street and Uptown to specialized healthcare practices and technical services, businesses in the Royal City deserve a distinctive, beautifully crafted digital presence.",
        industries: [
          'Healthcare Practices & Medical Services',
          'Heritage & Independent Retail',
          'Professional & Legal Practices',
          'Waterfront Commercial Corridors',
        ],
        faqs: [
          {
            q: 'How do you balance modern web performance with heritage brand identities?',
            a: 'We use sophisticated typography and architectural grids that convey historical gravitas and timeless credibility, backed by bleeding-edge React code that loads in milliseconds.',
          },
          {
            q: 'Can you build booking and patient intake flows for healthcare practices?',
            a: 'Yes. We integrate secure, user-friendly appointment booking and intake forms that respect patient privacy and streamline staff operations.',
          },
          {
            q: 'Are your builds fixed-price?',
            a: 'Yes. Every engagement is quoted up front against a written scope with zero hourly billing surprises.',
          },
        ],
      },
    ],
  },
];

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

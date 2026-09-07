// Location SEO data — Massachusetts, Rhode Island, British Columbia.
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
// Deliberately NOT every city in each state/province — only ones with a
// genuinely distinct paragraph below. Google treats near-identical,
// city-name-swapped pages as doorway pages; a short list of real ones beats
// a long list of thin ones. Add a city here only once you've written it a
// real paragraph, not a template with the name substituted in.
//
// `workRef` (optional, region-level only) points at a name in WORK
// (lib/content.js) that is honestly tied to that region — e.g. Waste
// Universe is a real Massachusetts client. Never invent one for a region
// that doesn't have a genuine match; omit the field instead.

export const REGIONS = [
  {
    slug: 'massachusetts',
    name: 'Massachusetts',
    abbr: 'MA',
    country: 'US',
    countryName: 'United States',
    kicker: 'Massachusetts',
    h1: 'Website design for Massachusetts businesses.',
    metaDescription:
      'Fixed-price website design for small and mid-sized businesses across Massachusetts — Boston, Worcester, Springfield, Cambridge and beyond.',
    intro: [
      "Massachusetts runs on more small and mid-sized businesses than its skyline suggests — clinics and contractors in Worcester, retailers and restaurants along the North Shore, service businesses across Springfield and the Pioneer Valley, and a dense cluster of professional firms in and around Boston and Cambridge. Part of our team is based in Maynard, so the state isn't a market we studied from a distance.",
      "The process looks the same everywhere — fixed-price builds, real ownership of the site when it ships, design that doesn't read like a template — but what a Worcester manufacturer needs from a website and what a Newton law practice needs rarely overlap. We scope each build around the customer actually walking through the door, not a generic checklist.",
    ],
    proximityNote: 'Part of the MANDER team works out of Maynard, Massachusetts.',
    workRef: 'Waste Universe',
    industries: [
      'Healthcare & professional services',
      'Trades & home services',
      'Retail & hospitality',
      'Manufacturing & logistics',
      'Education-adjacent services',
    ],
    faqs: [
      {
        q: 'Is MANDER actually based in Massachusetts?',
        a: 'Part of the team works out of Maynard, in Middlesex County, with the rest of the studio in British Columbia. Every project is delivered remotely regardless of where in the state you are, so a business in Springfield gets the same process as one in Boston.',
      },
      {
        q: 'Do you understand local SEO for Massachusetts towns?',
        a: "Yes — Local Search is one of our six core services, and it's how we handled statewide coverage for clients like Waste Universe. That means Google Business Profile, town-specific pages and citations tuned to the towns you actually serve, not just \"Massachusetts\" as a whole.",
      },
      {
        q: 'Which Massachusetts cities do you have dedicated pages for?',
        a: "Boston, Cambridge, Worcester, Springfield, Newton, Lowell, Quincy, Framingham, Brockton and Lynn so far — see the city list below. If your town isn't listed yet, this page and a direct conversation cover the same ground.",
      },
    ],
    cities: [
      {
        slug: 'boston',
        name: 'Boston',
        h1: 'Website design in Boston, Massachusetts.',
        metaDescription:
          'Fixed-price website design and local SEO for Boston small businesses — professional services, healthcare and hospitality. Remote, no agency overhead.',
        intro:
          "Boston's small-business market sits next to some of the most competitive professional-services and healthcare institutions in the country, which raises the bar for what a credible small-business website has to look like — a generic template reads as amateur fast in a city like this. We build sites that hold their own visually while staying fixed-price, because the usual alternative in Boston is an agency quote with a lot more overhead attached to it.",
        industries: ['Professional services & law', 'Healthcare & wellness practices', 'Higher-ed-adjacent businesses', 'Hospitality'],
        faqs: [
          {
            q: 'Do you work with Boston clients in person?',
            a: 'No — the whole studio works remotely, including for Boston clients. Calls, reviews and handover all happen over video and email, which keeps the price down without changing the quality of the build.',
          },
          {
            q: 'Can you help a Boston business rank for local search?',
            a: 'Yes, through Local Search — Google Business Profile, neighborhood-specific pages and citations, which matter more in a dense city like Boston than almost anywhere else in the state.',
          },
                  {
            q: "Do you build mobile apps as well as websites?",
            a: "Yes — native Android apps start at $2,999 and ship to Google Play under your own developer account. For Boston professional-services and healthcare clients that usually means client portals, intake or appointment flows rather than a storefront.",
          },
          {
            q: "What does it cost to keep a Boston site running after launch?",
            a: "The Care Plan is $40/month and covers hosting, security, backups and unlimited small edits. It is month to month, so a practice can drop it whenever it wants and keep the site either way.",
          },
        ],
      },
      {
        slug: 'cambridge',
        name: 'Cambridge',
        h1: 'Website design in Cambridge, Massachusetts.',
        metaDescription:
          'Website design for Cambridge, MA businesses — clinics, consultancies and independent retail near MIT and Harvard. Fixed-price, fast, no template feel.',
        intro:
          "Cambridge's small-business base sits in the shadow of MIT and Harvard, which means a lot of the businesses we talk to here — clinics, consultancies, research-adjacent services, independent retail — are selling to an unusually literate, skeptical audience. That calls for real design judgment and copy that doesn't oversell, rather than a stock small-business template with a Cambridge address bolted on.",
        industries: ['Consulting & research-adjacent services', 'Healthcare & wellness', 'Independent retail', 'Education & tutoring'],
        faqs: [
          {
            q: 'Do you build sites for early-stage or academic-adjacent businesses?',
            a: 'Yes — that describes a good share of Cambridge inquiries. Launch and Starter are built for exactly this: something credible and fast without the cost of a full agency engagement.',
          },
          {
            q: 'How fast can a Cambridge business get live?',
            a: 'A single-page Launch site typically ships in about two weeks; a fuller Starter or Growth build runs four to six weeks, mostly paced by how quickly we get your content and feedback back.',
          },
                  {
            q: "Can you build an Android app for a Cambridge startup?",
            a: "Yes. App Launch is $2,999 for up to eight screens with authentication and a basic backend, which is usually the right shape for a first product test rather than a full platform build.",
          },
          {
            q: "Can we start small and add pages as we grow?",
            a: "That is the normal path here. Most Cambridge clients start at Starter ($499) for five pages and move to Growth ($899) once there is enough traction to justify the local SEO and integrations.",
          },
        ],
      },
      {
        slug: 'worcester',
        name: 'Worcester',
        h1: 'Website design in Worcester, Massachusetts.',
        metaDescription:
          "Website redesign and web design for Worcester, MA — healthcare, manufacturing, education and independent retail. Modern, fast, fixed-price.",
        intro:
          "As the second-largest city in New England, Worcester has a much broader small-business base than its profile suggests — healthcare, education, manufacturing and a genuinely revitalized downtown of independent restaurants and retail. A lot of that base is still running on sites built a decade ago. The opportunity here is less about competing with flashy design and more about simply being current: fast, mobile-first, and easy to find on Google.",
        industries: ['Healthcare', 'Manufacturing & trades', 'Education', 'Restaurants & independent retail'],
        faqs: [
          {
            q: 'We have an old website — can you redesign it rather than start over?',
            a: "Yes — that's what Website Redesign covers: modernizing a site that's aged out, with the technical performance search engines reward, rather than throwing away content that still works.",
          },
          {
            q: 'Is a Worcester business too small for a custom build?',
            a: 'No — Launch starts at $299 specifically for businesses that need a real, professional presence without agency-level spend.',
          },
                  {
            q: "Do you build apps for trades or manufacturing businesses?",
            a: "Yes — App Launch starts at $2,999 and App Growth at $5,999 adds bookings, payments and an admin dashboard. For Worcester manufacturers and trades that is usually job scheduling or a customer request flow.",
          },
          {
            q: "Can you make our site work properly on a phone?",
            a: "Every build is mobile-first, which matters more than usual for trades and restaurants in Worcester — most of that traffic arrives on a phone, often from a Google search made standing outside.",
          },
        ],
      },
      {
        slug: 'springfield',
        name: 'Springfield',
        h1: 'Website design in Springfield, Massachusetts.',
        metaDescription:
          'Website design for Springfield, MA and the Pioneer Valley — manufacturing, logistics, healthcare and trades. Fixed-price builds from $299.',
        intro:
          "Springfield and the wider Pioneer Valley run on manufacturing, logistics and healthcare more than the Boston-centric image of Massachusetts suggests, and a lot of those businesses have never needed a marketing-forward website to get work — referrals and reputation have carried them. That's changing as procurement and hiring move online. We build sites that do the job of a credible first impression without pretending to be something the business isn't.",
        industries: ['Manufacturing & industrial', 'Logistics & distribution', 'Healthcare', 'Trades & contractors'],
        faqs: [
          {
            q: "We've never had a real website — where do we start?",
            a: 'Launch or Starter, most likely — take the 60-second fit quiz or just get in touch and we\'ll recommend a starting point based on what the business actually needs.',
          },
          {
            q: 'Do you handle Google Business Profile and local listings?',
            a: "Yes, as part of Local Search — useful in Western Massachusetts, where a lot of business still comes from someone searching a town name plus a service.",
          },
                  {
            q: "Is an app worth it for a logistics or contracting business?",
            a: "Sometimes. App Growth at $5,999 covers bookings, accounts and an admin dashboard, which suits dispatch or job tracking. If the need is really just being found and contacted, a $899 Growth site does more for less.",
          },
          {
            q: "Do you offer any discount for smaller Springfield businesses?",
            a: "The Community Rate takes 20% off any build, granted on trust rather than proof. It exists precisely for markets where a Boston-scale budget is not the reality.",
          },
        ],
      },
      {
        slug: 'newton',
        name: 'Newton',
        h1: 'Website design in Newton, Massachusetts.',
        metaDescription:
          'Website design for Newton, MA professional practices — law, medical, dental and real estate. Polished, fixed-price, brand-led.',
        intro:
          "Newton's small-business economy skews toward professional and personal services — law, medical and dental practices, real estate, boutique retail across the village centers — serving a market that expects a level of polish. A dated or DIY-built site undersells a practice that's otherwise excellent at what it does. We treat these builds closer to brand work than a typical small-business site: fewer pages, more attention to how each one reads.",
        industries: ['Law & professional practices', 'Medical & dental practices', 'Real estate', 'Boutique retail'],
        faqs: [
          {
            q: 'Is a $299 site too basic for a professional practice?',
            a: "Launch suits a new venture; most Newton practices land in Starter or Growth, where copywriting support and fuller SEO are included. We'll recommend the right tier rather than the cheapest one.",
          },
          {
            q: 'Can you match an existing brand identity?',
            a: "Yes, or build one from scratch through Brand Identity if the practice doesn't have a cohesive visual system yet.",
          },
                  {
            q: "Would a patient-facing app make sense for a Newton practice?",
            a: "For most practices, no — a $899 Growth site with booking integration covers it. If you genuinely need patient accounts and payments in an app, that is App Growth at $5,999.",
          },
          {
            q: "Who owns the site and the domain once it is built?",
            a: "You do, from day one. The site, the code, the domain and every account it touches are registered in your name — which matters for a practice that may change hands or add partners.",
          },
        ],
      },
      {
        slug: 'lowell',
        name: 'Lowell',
        h1: 'Website design in Lowell, Massachusetts.',
        metaDescription:
          'Website design for Lowell, MA — UMass Lowell-adjacent tech, healthcare and a diverse small-business downtown. Fixed-price, remote delivery.',
        intro:
          "Lowell's economy runs on a mix rarely seen in one city this size: a National Historical Park built around its mill heritage, a growing UMass Lowell research and engineering presence, and one of the more diverse small-business communities in New England, including a large Cambodian-American business district downtown. A website here has to work as hard for a family-run restaurant as it does for a tech spinout, so we scope each build around which of those it actually is, not one template stretched over both.",
        industries: ['Restaurants & independent retail', 'Healthcare', 'Technology & engineering', 'Manufacturing heritage & trades'],
        faqs: [
          {
            q: 'Do you work with immigrant-owned or first-generation businesses?',
            a: 'Yes, regularly — Lowell has one of the more diverse small-business communities in the state, and we scope structure and copy around who the business actually serves.',
          },
          {
            q: 'Can you build something for a UMass Lowell-adjacent startup?',
            a: 'Yes — Launch and Starter both suit an early-stage build well, and Growth is there once you need real SEO and integrations.',
          },
                  {
            q: "Can you build an app as well as a site?",
            a: "Yes, from $2,999 on Google Play. For Lowell restaurants and retail that is usually ordering or loyalty; for the engineering side it is more often a customer or field-data tool.",
          },
          {
            q: "How long does a Lowell project take start to finish?",
            a: "A one-page Launch site is about two weeks, Starter three to four, Growth four to six. The pace is set mostly by how quickly content and feedback come back, not by us.",
          },
        ],
      },
      {
        slug: 'quincy',
        name: 'Quincy',
        h1: 'Website design in Quincy, Massachusetts.',
        metaDescription:
          'Website design for Quincy, MA — Asian-owned retail and restaurants, professional services and the Quincy Center revival.',
        intro:
          "Quincy's small-business base has two defining features: one of the largest Asian-American business communities in Massachusetts, concentrated along Hancock Street and in Quincy Center, and a wave of redevelopment bringing new retail and residential density to a downtown that spent decades in Boston's shadow. Businesses here are often competing with a customer who has Boston twenty minutes away as the easy default, which makes a credible, fast-loading site more of a competitive necessity than in a smaller, more isolated market.",
        industries: ['Asian-owned retail & restaurants', 'Professional & financial services', 'Healthcare', 'Real estate & property services'],
        faqs: [
          {
            q: 'Do you handle multilingual signage or menu content?',
            a: "We write in English by default; where a Quincy business needs Chinese, Vietnamese or another language alongside it, that's handled as part of Website Design rather than a separate add-on.",
          },
          {
            q: 'How do we stand out against Boston competitors nearby?',
            a: 'Mostly through local search — Local Search is built to make sure someone searching from Quincy or the South Shore finds you before they default to a Boston result.',
          },
                  {
            q: "Can an app be built for a multilingual customer base?",
            a: "Yes — Android builds start at $2,999 and the interface language is a design decision, not an add-on. The same applies to the website copy for Quincy businesses serving two languages.",
          },
          {
            q: "Do you handle online ordering for a Quincy restaurant or shop?",
            a: "Ordering and payments sit in Business Pro ($1,499+) on the web side, or App Growth ($5,999) if it needs to be an app. Growth at $899 covers bookings and enquiries but not a full store.",
          },
        ],
      },
      {
        slug: 'framingham',
        name: 'Framingham',
        h1: 'Website design in Framingham, Massachusetts.',
        metaDescription:
          'Website design for Framingham, MA — MetroWest retail, biotech and a diverse small-business community. Fixed-price, remote delivery.',
        intro:
          "Framingham sits at the centre of MetroWest — a retail and office corridor that's hosted biotech and pharmaceutical operations for decades, layered over a downtown with a large Brazilian-American business community and a wide mix of independent retail and services. It only became a city in 2018, and a lot of its businesses are still competing more on being found online than on brand polish — a properly built, locally optimised site tends to move the needle faster here than in markets where every competitor already has one.",
        industries: ['Retail & shopping corridors', 'Biotech & life-sciences-adjacent', 'Brazilian & multicultural businesses', 'Professional services'],
        faqs: [
          {
            q: 'Competition along the retail corridor is heavy — can SEO actually help?',
            a: "Yes — Local Search and on-page SEO are built for this: showing up when someone searches a service plus \"Framingham\" or a nearby MetroWest town, not just competing on brand name.",
          },
          {
            q: 'Do you build sites for Brazilian-owned or Portuguese-speaking businesses?',
            a: "Yes — bilingual builds are something we handle as part of Website Design when a business's customers read in more than one language.",
          },
                  {
            q: "Is an app a way to stand out on a crowded retail corridor?",
            a: "Occasionally, but rarely first. Local SEO on a $899 Growth site usually wins more Framingham customers per dollar than a $2,999 app, and the app makes sense once you have repeat customers to keep.",
          },
          {
            q: "Can you build a site in Portuguese as well as English?",
            a: "Copywriting support is included from Starter ($499) upward and the language is your call. A second full language version is scoped as extra pages rather than a separate product.",
          },
        ],
      },
      {
        slug: 'brockton',
        name: 'Brockton',
        h1: 'Website design in Brockton, Massachusetts.',
        metaDescription:
          'Website design for Brockton, MA — healthcare, trades and a diverse small-business community. Real, professional sites, honestly priced.',
        intro:
          "Brockton's small-business economy is more working-class and healthcare-driven than its wealthier neighbors, with a large Cape Verdean-American and Haitian-American business community and a manufacturing history — it was once the world's largest shoe-manufacturing city — that's given way to healthcare, trades and logistics. Budget matters more here than in markets like Newton nearby, which is the actual reason Launch and Starter exist: a real, professional site at a price that doesn't assume a different city's margins.",
        industries: ['Healthcare', 'Trades & contractors', 'Cape Verdean & Haitian-owned businesses', 'Logistics & distribution'],
        faqs: [
          {
            q: 'Is there a genuinely affordable option, not just a cheap-looking one?',
            a: "That's specifically what Launch is — $299 for a single-page site that looks considered, not like a template. Most Brockton inquiries land in Launch or Starter.",
          },
          {
            q: 'Do you work with Cape Verdean or Haitian Creole-speaking business owners?',
            a: 'Yes — calls run in English, but the site itself can carry Creole or Portuguese content where your customers need it.',
          },
                  {
            q: "Is a $2,999 app realistic for a Brockton business?",
            a: "Honestly, for most it is not the right first spend. A $299 Launch or $499 Starter site with the 20% Community Rate applied does more for a trades or healthcare business here than an app would.",
          },
          {
            q: "What is the cheapest way to get a real site online?",
            a: "Launch at $299, less the 20% Community Rate if you ask for it. One page, mobile-first, a contact form and a Google Maps link — about two weeks.",
          },
        ],
      },
      {
        slug: 'lynn',
        name: 'Lynn',
        h1: 'Website design in Lynn, Massachusetts.',
        metaDescription:
          'Website design for Lynn, MA — aerospace, manufacturing and a diverse North Shore small-business community. Fixed-price, remote delivery.',
        intro:
          "Lynn's economy has an unusual anchor for a city its size — a major GE Aviation jet-engine plant — alongside a manufacturing history (it was once the country's leading shoe-manufacturing city, same as Brockton) and a working waterfront that's slowly redeveloping. The small-business base around that — trades, healthcare, a large immigrant business community along Union Street — rarely gets the design attention Boston or the North Shore's wealthier towns do, which is usually the real reason a Lynn business is still running on a site built a decade ago.",
        industries: ['Trades & manufacturing-adjacent', 'Healthcare', 'Immigrant & multicultural businesses', 'Retail'],
        faqs: [
          {
            q: 'Our current site is old — is it worth fixing or replacing?',
            a: 'Usually replacing, through Website Redesign — a decade-old site is normally slower and harder to find on Google than the cost of a proper rebuild justifies keeping it.',
          },
          {
            q: 'Do you serve businesses along the North Shore generally, not just Lynn?',
            a: "Yes — Lynn is one of several North Shore markets we work in; the process and pricing are identical whichever town you're in.",
          },
                  {
            q: "Do you build Android apps for North Shore businesses?",
            a: "Yes, from $2,999, deployed to Google Play under your own developer account. For trades and healthcare on the North Shore that is usually scheduling or a customer request flow.",
          },
          {
            q: "Can you take over a site someone else built badly?",
            a: "Usually we rebuild rather than patch — a Growth rebuild at $899 costs less than untangling someone else’s work, and you end up owning something maintainable.",
          },
        ],
      },
    ],
  },

  {
    slug: 'rhode-island',
    name: 'Rhode Island',
    abbr: 'RI',
    country: 'US',
    countryName: 'United States',
    kicker: 'Rhode Island',
    h1: 'Website design for Rhode Island businesses.',
    metaDescription:
      'Website design for Rhode Island small businesses — Providence, Warwick, Newport and beyond. Fixed-price, remote delivery, close New England team.',
    intro: [
      "Rhode Island is small enough that Providence, Warwick, Cranston, Pawtucket and Newport are functionally one market — a business in one town is competing with, and often referring to, businesses twenty minutes away in another. That density rewards a site built for the searches people actually run — a name, a neighborhood, a service — over one built for the state name alone.",
      "We're not based in Rhode Island, and we'd rather say that plainly than pretend otherwise — the closest team members are about an hour up I-95 in Massachusetts. In practice, every call, review and handover happens the same way it would with a studio next door, and that proximity keeps us genuinely familiar with the wider New England market rather than working from a spreadsheet.",
    ],
    proximityNote: 'The nearest MANDER team members work out of Massachusetts, about an hour from Providence.',
    industries: ['Hospitality & tourism', 'Marine & seasonal trades', 'Creative & design services', 'Retail', 'Professional & trade services'],
    faqs: [
      {
        q: 'Do you need to be based in Rhode Island to work with us?',
        a: "No — we already work remotely with businesses across the state, and our Massachusetts team is close enough to know the wider New England market well. Distance hasn't been the deciding factor for any client we've built for.",
      },
      {
        q: 'Can you handle a seasonal business, like tourism or hospitality?',
        a: 'Yes. Seasonal businesses need the site ready before the season starts and low-maintenance once it does — which is exactly what the fixed-price build and optional Care Plan are built around.',
      },
      {
        q: 'Do you offer local SEO for Rhode Island towns specifically?',
        a: 'Yes, through Local Search — Google Business Profile, town-level pages and citations tuned to Providence, Warwick, Newport or wherever your customers actually are.',
      },
    ],
    cities: [
      {
        slug: 'providence',
        name: 'Providence',
        h1: 'Website design in Providence, Rhode Island.',
        metaDescription:
          'Website design for Providence, RI restaurants, creative businesses and independent retail. Restrained, fast, fixed-price.',
        intro:
          "Providence's small-business scene runs unusually creative for a city its size — RISD and Brown feed a steady stream of independent designers, restaurateurs and makers, and the downtown has been rebuilding around that for two decades. A generic template reads especially badly in a market this design-aware. We build accordingly: restrained, considered, and built to actually load fast on a phone outside a restaurant on a Friday night.",
        industries: ['Restaurants & hospitality', 'Creative & design services', 'Independent retail', 'Professional services'],
        faqs: [
          {
            q: 'Do you work with restaurants and hospitality businesses?',
            a: 'Yes — menus, reservations and location pages that actually convert are common requests, and Local Search is what gets a Providence restaurant found by someone searching nearby, not just by name.',
          },
          {
            q: 'Providence has a lot of design-savvy competitors — can you match that bar?',
            a: "That's the expectation we build to. Every MANDER build gets the same level of design attention regardless of the market it's in.",
          },
                  {
            q: "Can you build an ordering or loyalty app for a Providence restaurant?",
            a: "Yes — App Growth at $5,999 covers accounts, payments, bookings and an admin dashboard. If it is just table reservations, a $899 Growth site with booking integration is the cheaper answer.",
          },
          {
            q: "Will the site hold up next to Providence design studios?",
            a: "That is the bar we build to. Every site is custom rather than templated, which is the whole reason the fixed price is quoted against a written scope instead of an hourly meter.",
          },
        ],
      },
      {
        slug: 'warwick',
        name: 'Warwick',
        h1: 'Website design in Warwick, Rhode Island.',
        metaDescription:
          'Website design for Warwick, RI retail, trades and service businesses. Clean, fast, fixed-price sites built to rank locally.',
        intro:
          "Warwick's business base is more suburban and service-oriented than Providence's — retail along the main commercial corridors, trades, and a steady flow of businesses tied to T.F. Green Airport. Most of what these businesses need from a website is straightforward: show up on Google when someone nearby searches, load fast, and make it easy to call or request a quote. We keep the build focused on exactly that rather than over-designing it.",
        industries: ['Retail & shopping centers', 'Trades & contractors', 'Transportation & logistics', 'Professional services'],
        faqs: [
          {
            q: 'We just need something simple that ranks locally — is that in scope?',
            a: "Yes — that's most of what Starter and Local Search are built for: a clean multi-page site plus the Google Business Profile and citation work that gets you found in Warwick searches specifically.",
          },
          {
            q: "We're near T.F. Green Airport — does that change what the site needs?",
            a: 'Sometimes — travel-adjacent and logistics businesses near the airport often need clear service-area and hours information front and centre, which we build the homepage around rather than burying it on a contact page.',
          },
                  {
            q: "Do we need an app, or is a website enough?",
            a: "For most Warwick retail and trades, a website is enough — Growth at $899 with local SEO covers being found and contacted. Apps start at $2,999 and earn their keep when customers come back repeatedly.",
          },
          {
            q: "Do you cover the rest of Rhode Island, not just Warwick?",
            a: "Yes — the studio is remote and serves the whole state, with Providence and Newport pages covering the other two markets we see most often.",
          },
        ],
      },
      {
        slug: 'newport',
        name: 'Newport',
        h1: 'Website design in Newport, Rhode Island.',
        metaDescription:
          'Website design for Newport, RI tourism, hospitality and events businesses. Booking-focused builds for a seasonal, visitor-driven market.',
        intro:
          "Newport runs on tourism, hospitality and a luxury retail season concentrated into a few months a year, which makes the website's job different from almost anywhere else on this list: it has to convert a visitor who's booking from out of state, often on a phone, often for an event or a stay months out. We design around that — direct bookings and reservations front and center, the way we did on a hospitality client's bilingual site — rather than an information page that assumes a local, repeat visitor.",
        industries: ['Tourism & hospitality', 'Events & venues', 'Luxury & specialty retail', 'Marine trades'],
        faqs: [
          {
            q: 'Can you build direct booking or reservation flows?',
            a: "Yes — pulling bookings back from third-party aggregators onto your own site is a common ask for hospitality clients, and it's built into the Growth and Business Pro tiers.",
          },
          {
            q: 'Our business is seasonal — does that affect the build or the Care Plan?',
            a: 'No — the build is a fixed one-time cost regardless of season, and the Care Plan is month-to-month, so support is easy to scale up before your season and down after it.',
          },
                  {
            q: "Could a booking app work for a Newport tourism business?",
            a: "It can. App Growth at $5,999 includes a reservation system and payments, which suits venues and marine trades with repeat seasonal customers. A $899 Growth site with booking integration is the lighter option.",
          },
          {
            q: "Can the site handle a seasonal traffic spike?",
            a: "Yes. Every build gets a performance budget and a Core Web Vitals pass, and the $40/month Care Plan covers the hosting — which is the part that usually buckles in a Newport summer.",
          },
        ],
      },
    ],
  },

  {
    slug: 'british-columbia',
    name: 'British Columbia',
    abbr: 'BC',
    country: 'CA',
    countryName: 'Canada',
    kicker: 'Metro Vancouver & Fraser Valley',
    h1: 'Website design for Metro Vancouver businesses.',
    metaDescription:
      'Website design and digital flagships for Metro Vancouver small & mid-sized businesses — Vancouver, Surrey, Burnaby, Richmond, Langley, and Coquitlam.',
    intro: [
      "Our roots and studio practice are grounded in Metro Vancouver — British Columbia is where MANDER originated, not an afterthought market. From Vancouver's competitive digital and hospitality culture to Burnaby's tech corridors, Richmond's international commercial hubs, and the rapidly growing business centres of Surrey, Langley, and Coquitlam, local businesses deserve design that commands real authority.",
      "British Columbia clients are invoiced in CAD on request and collaborated with during Pacific business hours by default. Every engagement is built with architectural rigor, custom engineering, and transparent, tailored scoping without hourly surprises or template bloat.",
    ],
    proximityNote: "MANDER is based in Metro Vancouver, British Columbia.",
    industries: ['Technology & Software', 'Hospitality & Culinary', 'Professional & Financial Services', 'Construction & Trades', 'Boutique Retail & Apparel'],
    faqs: [
      {
        q: 'Is MANDER a Metro Vancouver studio?',
        a: "Yes. Our practice and foundation are based in Metro Vancouver (Langley / Vancouver). We work directly with founders, directors, and business owners across the entire Lower Mainland.",
      },
      {
        q: 'Do you invoice in Canadian dollars?',
        a: 'Yes — Canadian clients are invoiced in CAD on request at no extra cost, with clear, written quotes for every engagement.',
      },
      {
        q: "How do you compare to traditional downtown Vancouver design agencies?",
        a: 'We deliver the same top-tier art direction, custom engineering, and sub-second performance of a high-end downtown studio, but operate with an agile, focused model that eliminates unnecessary agency bloat and hidden markups.',
      },
      {
        q: 'What is your turnaround time for Metro Vancouver projects?',
        a: 'Typical production turnaround runs between 2 to 4 weeks depending on scope, moving in a straight line from strategic discovery and wireframing directly to launch.',
      },
    ],
    cities: [
      {
        slug: 'vancouver',
        name: 'Vancouver',
        h1: 'Website design in Vancouver, British Columbia.',
        metaDescription:
          'High-end website design for Vancouver, BC businesses — modern art direction, sub-second performance, and tailored custom engineering.',
        intro:
          "Vancouver's commercial market demands exceptional visual taste. Competing for attention against established tech companies, world-class restaurants, and lifestyle brands requires digital presence with genuine architectural rigor. MANDER engineers websites that combine contemporary editorial typography with custom React engineering — giving Vancouver businesses an authoritative flagship that converts.",
        industries: ['Technology & Venture', 'Hospitality & Dining', 'Creative Studios & Architecture', 'Professional Services'],
        faqs: [
          {
            q: 'How does MANDER compare to traditional downtown Vancouver agency pricing?',
            a: 'We provide senior creative direction and bespoke code without charging for downtown office lease overhead. You get immaculate craft and transparent, scope-based quotes.',
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
        slug: 'surrey',
        name: 'Surrey',
        h1: 'Website design in Surrey, British Columbia.',
        metaDescription:
          'High-performance website design for Surrey, BC — logistics, healthcare, professional services, and high-growth commercial enterprises.',
        intro:
          "Surrey is one of the fastest-growing economic engines in Canada. From corporate logistics and construction leaders to medical practices and retail hubs across City Centre and Guildford, Surrey companies are rapidly outgrowing generic word-of-mouth. MANDER builds authoritative, search-optimized websites that turn regional growth into verified inbound revenue.",
        industries: ['Logistics & Supply Chain', 'Construction & Trades', 'Healthcare & Clinics', 'Commercial Services'],
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
        slug: 'burnaby',
        name: 'Burnaby',
        h1: 'Website design in Burnaby, British Columbia.',
        metaDescription:
          'Modern website design for Burnaby, BC — tech companies, film production, industrial innovators, and Brentwood/Metrotown retail.',
        intro:
          "Positioned at the geographic center of Metro Vancouver, Burnaby blends high-tech research parks, major film and visual effects facilities, industrial corridors, and dense urban retail hubs like Brentwood and Metrotown. We architect clean, high-performance websites engineered to match the precision of Burnaby's innovative business landscape.",
        industries: ['Technology & R&D', 'Film & Media Production', 'Industrial & Manufacturing', 'Corporate Services'],
        faqs: [
          {
            q: 'Do you design websites for Burnaby tech and industrial firms?',
            a: 'Yes. We specialize in translating complex technical capabilities into clean, compelling digital narratives that resonate with enterprise clients and investors.',
          },
          {
            q: 'How fast will our Burnaby website load?',
            a: 'We engineer all sites on clean Next.js and React stacks, systematically targeting 95+ Google Lighthouse scores with sub-second time-to-first-byte.',
          },
          {
            q: 'How do we get started?',
            a: 'Submit a quote enquiry through our contact form. We reply within one business day with clear recommendations and a tailored project proposal.',
          },
        ],
      },
      {
        slug: 'richmond',
        name: 'Richmond',
        h1: 'Website design in Richmond, British Columbia.',
        metaDescription:
          'Website design for Richmond, BC — international trade, aviation, hospitality, logistics, and bilingual commercial brands.',
        intro:
          "Richmond connects Metro Vancouver directly to international commerce, Pacific aviation, and advanced logistics, while hosting a premier culinary and retail market. We build sophisticated, multilingual-ready websites that appeal to both local Pacific Northwest clientele and international trade partners.",
        industries: ['International Trade & Logistics', 'Aviation & Marine', 'Culinary & Hospitality', 'Professional Practices'],
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
        slug: 'langley',
        name: 'Langley',
        h1: 'Website design in Langley, British Columbia.',
        metaDescription:
          'Website design in Langley, BC — home base of MANDER. Premium digital design for Fraser Valley trades, commercial firms, and boutique brands.',
        intro:
          "Langley is where MANDER’s practice was founded. Combining a vibrant commercial center, rapidly expanding tech and light-industrial parks, and boutique retail and equestrian estates, Langley is one of the most dynamic markets in the Lower Mainland. We take immense pride in building flagship websites for our home community.",
        industries: ['Trades & Commercial Contracting', 'Wineries & Agritourism', 'Manufacturing & Light Industry', 'Professional Practices'],
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
        h1: 'Website design in Coquitlam, British Columbia.',
        metaDescription:
          'High-performance website design for Coquitlam & the Tri-Cities — healthcare, construction, retail, and growing small businesses.',
        intro:
          "Anchoring the Tri-Cities, Coquitlam is a thriving, diverse community experiencing rapid residential and commercial development. Whether your business is situated around Coquitlam Centre, Austin Heights, or industrial Maillardville, having a polished, mobile-optimized digital presence is vital for capturing local market share.",
        industries: ['Healthcare & Wellness', 'Residential & Commercial Construction', 'Local Retail & Dining', 'Professional Services'],
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

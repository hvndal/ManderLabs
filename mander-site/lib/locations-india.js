// Location SEO data for India.
//
// Same shape as the North American regions in lib/locations.js, which imports
// this file and appends it — the two dynamic routes under app/locations read
// one combined list and do not know the difference.
//
// These regions are mapped to the India market in
// lib/markets/location-markets.js, which is what makes their pages render
// rupee pricing and the WhatsApp CTA for *every* visitor, including
// Googlebot, rather than following the visitor's own IP the way the
// homepage does. That
// is not a hole in the geolocation — it is the point. A page about Mohali
// that shows dollar prices to the US-based crawler cannot rank for a Mohali
// search, and geolocated pricing on a city page is exactly the pattern Google
// warns about. The market pages (home, pricing, quote) stay IP-resolved; the
// city pages are resolved by their own URL, which is Google's own recommended
// way to serve more than one market.
//
// The same rule as the North American file applies here and matters more,
// because India has more cities worth targeting than anyone can write well:
// a city gets a page only when it has a genuinely distinct paragraph. Sixteen
// real pages beat sixty name-swapped ones, which Google treats as doorway
// pages and which would sink the whole domain rather than just those URLs.
//
// Nothing here claims an office, an address or a local team. Every line is
// about the market being served, not about where we sit. If that ever changes
// — a real registered address in Mohali, say — add `proximityNote` to that
// region the way Massachusetts and British Columbia use it, and pair it with a
// Google Business Profile at the same address. An unverifiable local claim is
// worse than none: it is the one thing that gets a local listing suspended.

export const IN_REGIONS = [
  {
    slug: 'punjab',
    name: 'Punjab & Chandigarh',
    abbr: 'PB',
    country: 'IN',
    countryName: 'India',
    kicker: 'Punjab & Chandigarh',
    h1: 'Website design for businesses in Punjab & Chandigarh.',
    metaDescription:
      'Fixed-price website design and local SEO for businesses across Punjab and Chandigarh — Mohali, Ludhiana, Amritsar, Jalandhar. Fixed price, quoted up front.',
    intro: [
      'Punjab runs on businesses that already have the customers and the reputation — the manufacturer in Ludhiana with three decades of export orders, the clinic in Amritsar everyone in the neighbourhood knows, the IT services firm in the Mohali sector belt. What is usually missing is not demand. It is that when someone searches for them, or checks them before calling, there is a Justdial listing and a Facebook page and nothing that looks like the business itself.',
      'That is the gap these builds close: a custom five-page site, or the same site with Google Business Profile, Maps and local search work included. One fixed price, agreed before anything starts, and the domain and every account registered in your name. The tricity — Mohali, Chandigarh, Panchkula — and the Sector 67 IT and industrial belt are dense with businesses competing for the same searches, which is exactly where the local work earns its money.',
    ],
    industries: [
      'Manufacturing & exports',
      'Clinics & diagnostics',
      'IT & business services',
      'Education & coaching',
      'Real estate & construction',
      'Retail, food & hospitality',
    ],
    faqs: [
      {
        q: 'How much does a website cost in Punjab?',
        a: 'Two plans: a custom five-page website, and Website + Local, which adds Google Business Profile setup, Maps optimisation, schema and indexing. Both are quoted as one fixed number in writing before work starts, with GST extra where applicable. Nothing is billed hourly — ask on WhatsApp and you will have a figure the same day.',
      },
      {
        q: 'Do you meet clients in Mohali or Chandigarh in person?',
        a: 'We work remotely across India — calls on WhatsApp or video, reviews shared as links, handover over email. It is what keeps a five-page custom build well under agency rates, and it does not change what gets built.',
      },
      {
        q: 'Will this help me show up on Google Maps in my sector or market?',
        a: 'That is what Website + Local is for. Google Business Profile setup and optimisation, consistent name–address–phone details everywhere Google reads them, local schema, and sitemap submission. In the tricity, where a dozen businesses compete for the same search, the Maps result is usually worth more than the website ranking.',
      },
      {
        q: 'Can you build in Punjabi or Hindi as well as English?',
        a: 'Yes — bilingual pages are a normal request and do not change the price band. Most businesses here sell in more than one language and the site should not pretend otherwise.',
      },
    ],
    cities: [
      {
        slug: 'mohali',
        name: 'Mohali',
        h1: 'Website design in Mohali (SAS Nagar).',
        metaDescription:
          'Website design and local SEO for Mohali businesses — IT firms, clinics, real estate and retail across the sectors and the Sector 67 belt. Quoted up front.',
        intro:
          'Mohali is a working city rather than a shopfront one: IT and services firms through the Sector 66–67 belt and the industrial pockets, healthcare along the sector roads, and a real estate and construction market that moves faster than most of its websites do. The result is a lot of credible businesses represented online by a template site from years ago, or by nothing at all. Because Mohali, Chandigarh and Panchkula are read as one market by anyone searching, a Mohali business is usually competing for the same query as a Chandigarh one — which makes Google Business Profile and Maps placement the difference between being found and being scrolled past, more than the homepage copy ever is.',
        industries: ['IT & software services', 'Healthcare & diagnostics', 'Real estate & construction', 'Retail & food'],
        faqs: [
          {
            q: 'What does a website for a Mohali business cost?',
            a: 'Starter Website is a custom five-page build; Website + Local adds Google Business Profile, Maps and local SEO. Both are one fixed price, quoted up front in writing, GST extra where applicable.',
          },
          {
            q: 'Do you cover Chandigarh and Panchkula too?',
            a: 'Yes — the tricity is one market in practice, and the local search work is set up that way, with the service area and the profile categories covering all three rather than one sector.',
          },
          {
            q: 'How fast can a Mohali site go live?',
            a: 'Two to three weeks for Starter, three to four for Website + Local. The timeline usually depends on how quickly photos, service details and feedback come back rather than on the build itself.',
          },
          {
            q: 'What happens after launch?',
            a: 'Mander Care covers hosting, backups, security and small edits; Mander Growth adds ongoing local SEO, profile upkeep and a monthly report. Both are month to month, quoted with the build, and the site stays yours either way.',
          },
        ],
      },
      {
        slug: 'chandigarh',
        name: 'Chandigarh',
        h1: 'Website design in Chandigarh.',
        metaDescription:
          'Website design and local SEO for Chandigarh businesses — professional practices, clinics, boutiques and consultancies across the sectors. Quoted up front.',
        intro:
          'Chandigarh has an unusually high concentration of professional practices for its size — advocates, chartered accountants, doctors, architects, consultants — and that shapes what a website has to do here. Nobody is buying from the page; they are checking whether the practice looks like one worth calling, usually after a referral. A clean, fast, honest site with the credentials visible does that job, and a stock-template page with a stretched logo quietly undoes it. Sector-level search matters too: someone searching in Sector 17 behaves differently from someone searching city-wide, and a Business Profile with the right service area and categories is what puts you in that first result set.',
        industries: ['Legal & financial practices', 'Healthcare & wellness', 'Education & coaching', 'Boutique retail & hospitality'],
        faqs: [
          {
            q: 'Do you work with individual professionals, not just companies?',
            a: 'Most of the Chandigarh work is exactly that — a practice, a clinic, a consultancy. The five-page Starter build is usually the right size for it: who you are, what you do, credentials, contact, and one page that answers what people ring up to ask.',
          },
          {
            q: 'Can you handle a booking or appointment flow?',
            a: 'Yes. For most practices this is an enquiry form and a WhatsApp button rather than a full booking system, which is cheaper to run and gets used more. A real booking or CRM integration is scoped separately.',
          },
          {
            q: 'Is the price different for Chandigarh than the rest of India?',
            a: 'No. The plans and the way they are quoted are the same everywhere in India — one fixed number agreed before work starts, GST extra where applicable.',
          },
        ],
      },
      {
        slug: 'ludhiana',
        name: 'Ludhiana',
        h1: 'Website design in Ludhiana.',
        metaDescription:
          'Website design for Ludhiana manufacturers, exporters and traders — product catalogues, enquiry flows and local SEO. Fixed-price builds, quoted up front.',
        intro:
          'Ludhiana sells to buyers who are not in Ludhiana. Hosiery, bicycle parts, machine tools, auto components — the customer is a wholesaler in another state or an importer in another country, and they will judge a supplier on a website before a single call happens. That changes what the site is for: it has to carry the product range legibly, make the enquiry obvious, load fast on a phone on a patchy connection, and look like a business with a factory behind it rather than a listing. A catalogue that a buyer can actually navigate does more for a Ludhiana exporter than any amount of homepage copy.',
        industries: ['Hosiery & textiles', 'Auto & bicycle components', 'Machine tools & engineering', 'Wholesale & export trading'],
        faqs: [
          {
            q: 'Can you build a product catalogue site?',
            a: 'Yes — a structured range with categories, specifications and an enquiry button on every item fits inside the five-page Starter build for most manufacturers. A large catalogue with hundreds of SKUs is scoped separately.',
          },
          {
            q: 'Will buyers outside India find us?',
            a: 'On-page SEO is included in both plans, and Website + Local adds schema, sitemap and indexing setup. For export enquiries the practical wins are usually product-level pages and a site that loads quickly abroad, both of which are part of the build.',
          },
          {
            q: 'We already have a site from years ago. Can you redo it?',
            a: 'A rebuild is priced the same as a new build. We keep the content and the domain, rebuild the site properly, and hand over accounts in your name — including any registrar or hosting logins currently held by someone else.',
          },
        ],
      },
      {
        slug: 'amritsar',
        name: 'Amritsar',
        h1: 'Website design in Amritsar.',
        metaDescription:
          'Website design and Google Maps optimisation for Amritsar businesses — hospitality, clinics, retail and travel. Fixed-price builds, quoted up front.',
        intro:
          'Amritsar gets an enormous volume of visitors, and a large share of local businesses live or die on being found by someone who arrived yesterday and is searching on a phone. Hotels and guest houses, restaurants, travel operators, clinics and shops around the walled city are all competing in the same few inches of a Maps result. For those businesses the ranking work is not an add-on to the website, it is the point of it: a Business Profile with correct hours, real photographs, the right categories and consistent details everywhere, backed by a site fast enough to open on mobile data in a queue.',
        industries: ['Hotels & hospitality', 'Restaurants & food', 'Travel & tour operators', 'Healthcare & retail'],
        faqs: [
          {
            q: 'We get most customers from tourists searching on phones. Does that change the build?',
            a: 'It decides it. Mobile speed, a phone number and WhatsApp button reachable in one tap, hours that are actually correct, and a Business Profile that shows up in the Maps result — those come before anything decorative.',
          },
          {
            q: 'Is Website + Local worth the step up for a small hotel or restaurant?',
            a: 'For a business people search for while nearby, usually yes — the Maps placement is where the customer is. If you already have a well-maintained profile that ranks, the Starter build plus your existing listing may be enough, and we will say so.',
          },
          {
            q: 'Can you write the content?',
            a: 'We help shape it — most owners know what to say and not how to lay it out. Photography stays with you; real photographs of the actual place outperform stock images on both Maps and the site.',
          },
        ],
      },
      {
        slug: 'jalandhar',
        name: 'Jalandhar',
        h1: 'Website design in Jalandhar.',
        metaDescription:
          'Website design for Jalandhar businesses — sports goods manufacturers, education consultants, clinics and retail. Fixed-price builds, quoted up front.',
        intro:
          'Jalandhar carries two quite different economies on the same streets: long-established manufacturing, especially sports goods and leather, selling into export markets; and a dense services layer of education and visa consultants, coaching centres, clinics and showrooms selling entirely locally. The two need opposite websites. A manufacturer needs a catalogue and credibility for a buyer abroad; a consultant needs to be the first result someone in the city sees, with a WhatsApp button and enough visible proof to be worth a message. Both are built to the same fixed prices, and the local search work is where the second kind spends its money.',
        industries: ['Sports goods & manufacturing', 'Education & visa consultancy', 'Healthcare & diagnostics', 'Retail & showrooms'],
        faqs: [
          {
            q: 'We are an education consultancy. What do we actually need?',
            a: 'Website + Local, in most cases. The enquiry usually starts with a local search, so Business Profile, reviews and Maps placement carry more weight than page count — the site\u2019s job is to convert the visit into a WhatsApp message.',
          },
          {
            q: 'Do you build in Punjabi?',
            a: 'Yes, bilingual pages are a normal request and do not move the price band.',
          },
          {
            q: 'What if we need an app later?',
            a: 'Android builds are quoted per project and ship to the Play Store under your own developer account. Most businesses here do not need one — a fast website and a WhatsApp number cover it — and we will say so rather than sell you an app.',
          },
        ],
      },
    ],
  },
  {
    slug: 'delhi-ncr',
    name: 'Delhi NCR',
    abbr: 'NCR',
    country: 'IN',
    countryName: 'India',
    kicker: 'Delhi NCR',
    h1: 'Website design for Delhi NCR businesses.',
    metaDescription:
      'Website design and local SEO across Delhi NCR — New Delhi, Gurugram and Noida. Fixed-price custom builds, quoted up front, with Google Business Profile setup.',
    intro: [
      'Delhi NCR is the most competitive search market in the country, and the least forgiving of a website that is only half a website. Whatever you sell, several other businesses within a few kilometres sell it too, they are all running ads, and the customer comparing you is doing it on a phone in under a minute. What wins that minute is rarely the fancier site — it is the one that loads immediately, says plainly what it does, shows a real address and a real number, and lets someone message without filling in a form.',
      'The builds are fixed-price: a custom five-page site, or the same site with Google Business Profile, Maps and local search work included, each quoted as one number before anything starts. In NCR the second is usually the one that pays for itself, because the map pack sits above every organic result and most people never scroll past it. Each of the three markets below behaves differently enough to need its own page — a Gurugram B2B services firm and a Noida clinic are not competing for the same thing.',
    ],
    industries: [
      'Professional & B2B services',
      'Healthcare & clinics',
      'Real estate & interiors',
      'Education & coaching',
      'D2C, retail & hospitality',
      'Logistics & trading',
    ],
    faqs: [
      {
        q: 'How much does a website cost in Delhi NCR?',
        a: 'A custom five-page build, or the same build with Google Business Profile, Maps optimisation, schema and indexing included. Fixed price agreed before work starts, GST extra where applicable — no hourly billing and no revised invoice at the end.',
      },
      {
        q: 'Everyone here runs Google Ads. Do I need SEO as well?',
        a: 'Ads stop the moment you stop paying; the Business Profile and the local pages keep working. Most NCR businesses do best with a properly set-up profile and a fast site underneath the ads, so the traffic you are already buying converts better.',
      },
      {
        q: 'Do you work with agencies or only direct clients?',
        a: 'Both. Fixed scope and fixed price make white-label builds straightforward — the deliverable is the same site, handed over with accounts in the client\u2019s name.',
      },
    ],
    cities: [
      {
        slug: 'delhi',
        name: 'Delhi',
        h1: 'Website design in Delhi.',
        metaDescription:
          'Website design and local SEO for Delhi businesses — traders, clinics, professional practices and retail. Fixed-price custom builds, quoted up front.',
        intro:
          'Delhi\u2019s business base is older and denser than the rest of NCR, and a great deal of it is trading, wholesale and family-run retail with decades of relationships behind it and no digital presence to match. For those businesses the website is not a marketing channel so much as a credential: the thing a new buyer, a bank, a supplier or a younger customer checks before deciding you are current. Alongside them sit the professional practices and clinics across South and Central Delhi competing on local search, where a Business Profile with correct details and real photographs outranks a decade-old website almost every time.',
        industries: ['Wholesale & trading', 'Clinics & practices', 'Retail & showrooms', 'Professional services'],
        faqs: [
          {
            q: 'We have run on word of mouth for thirty years. Why a website now?',
            a: 'Because the referral now gets searched before it gets called. The site does not replace the relationship — it stops the check from ending badly, which is what an empty search result or a dead Justdial page does.',
          },
          {
            q: 'Can you put our catalogue and price list online?',
            a: 'A structured range with categories and enquiry buttons fits inside the five-page build. Live prices are a choice, not a requirement — for most trading businesses an enquiry flow works better than publishing rates competitors can read.',
          },
          {
            q: 'How do we get started?',
            a: 'Message the WhatsApp number on this page or send an enquiry. We scope it, quote a fixed price before anything is built, and the domain and hosting are registered in your name from day one.',
          },
        ],
      },
      {
        slug: 'gurugram',
        name: 'Gurugram',
        h1: 'Website design in Gurugram.',
        metaDescription:
          'Website design for Gurugram businesses — B2B services, startups, clinics and hospitality. Fixed-price builds quoted up front, with local SEO included in the higher plan.',
        intro:
          'Gurugram is where the audience is most likely to judge you on the craft of the thing. A large share of the market sells to other businesses — consultancies, agencies, staffing, SaaS, logistics — to buyers who spend all day looking at good software and register a stretched logo or a slow page instantly. That does not mean spending more; it means spending it on the right things: type that holds up, a page that loads in a second, and one obvious next step. The other half of the market — clinics, salons, restaurants, studios across the sectors and DLF phases — competes on the map pack instead, where the Business Profile does the ranking and the site closes it.',
        industries: ['B2B & professional services', 'Startups & technology', 'Clinics & wellness', 'Restaurants & hospitality'],
        faqs: [
          {
            q: 'Our clients are corporates. Will a fixed-price site look cheap?',
            a: 'The price is low because the studio is remote and the scope is fixed, not because the work is thinner. Design, type and performance are the same as on the builds we ship in the US and Canada.',
          },
          {
            q: 'Can you integrate with our CRM or booking tool?',
            a: 'Enquiry forms feed straight to email as standard. A CRM, calendar or payment integration is scoped separately on top of the build, with the price agreed before it starts.',
          },
          {
            q: 'How long does it take?',
            a: 'Two to three weeks for Starter, three to four for Website + Local, mostly gated by how quickly content and feedback come back rather than by the build.',
          },
        ],
      },
      {
        slug: 'noida',
        name: 'Noida',
        h1: 'Website design in Noida.',
        metaDescription:
          'Website design and Google Maps optimisation for Noida and Greater Noida businesses — clinics, institutes, IT services and retail. Quoted up front.',
        intro:
          'Noida is sector-shaped, and so is the way people search in it: someone looking for a dentist, a coaching institute or a diagnostic lab searches with a sector number attached far more often than a city name. That is a local SEO problem before it is a website problem. A Business Profile with an accurate address, correct categories and a service area that matches the sectors you actually serve is what lands you in the map pack; the website is then what converts the tap into an enquiry, which is why speed and a visible WhatsApp button matter more here than an elaborate homepage. Greater Noida and the institutional belt behave the same way, with education and healthcare dominating the searches.',
        industries: ['Healthcare & diagnostics', 'Education & coaching', 'IT & business services', 'Retail & services'],
        faqs: [
          {
            q: 'Can we rank for our sector specifically?',
            a: 'That is the aim with Website + Local — profile categories, service areas and on-page signals set up around the sectors you serve, rather than one generic "Noida" page trying to cover everything.',
          },
          {
            q: 'We have several branches. Does that cost more?',
            a: 'Multiple locations are handled with a page and profile per branch and consistent details across all of them. It is scoped on top of the Website + Local plan depending on how many branches there are.',
          },
          {
            q: 'What does the monthly plan actually do?',
            a: 'Mander Growth keeps the profile current, adds and updates pages as you need them, monitors search performance and sends a monthly report. Mander Care is hosting, backups, security and small edits only. Both are quoted with the build.',
          },
        ],
      },
    ],
  },
  {
    slug: 'maharashtra',
    name: 'Maharashtra',
    abbr: 'MH',
    country: 'IN',
    countryName: 'India',
    kicker: 'Maharashtra',
    h1: 'Website design for Maharashtra businesses.',
    metaDescription:
      'Website design and local SEO across Maharashtra — Mumbai and Pune. Fixed-price custom builds quoted up front, with Google Business Profile setup in the higher plan.',
    intro: [
      'Maharashtra holds the two Indian markets where a small business is most likely to be compared against something genuinely well made. Mumbai runs on speed and reputation; Pune runs on a technically literate audience with a lot of engineers in it. In both, the failure mode is the same and it is not ugliness — it is a site that takes four seconds to appear, buries the phone number, and reads like it was written for nobody in particular.',
      'Both builds are fixed-price, quoted before anything starts, with the domain and every account in your name. What differs city to city is where the money goes: in Mumbai, usually into being findable at the moment of intent; in Pune, into a site that stands up to an audience which notices how it is built.',
    ],
    industries: [
      'Professional & financial services',
      'Healthcare & clinics',
      'Restaurants & hospitality',
      'IT & engineering services',
      'Retail, D2C & studios',
      'Real estate & interiors',
    ],
    faqs: [
      {
        q: 'What does a website cost in Mumbai or Pune?',
        a: 'A custom five-page site, or the same site with Google Business Profile and local search work included — the same two plans as everywhere else in India, each a fixed number agreed before work starts, GST extra where applicable.',
      },
      {
        q: 'Do you work in Marathi?',
        a: 'Yes. Bilingual pages are a normal request and do not change the price band.',
      },
      {
        q: 'Is a monthly plan required?',
        a: 'No. The build is one-time and the site is yours regardless. Mander Care and Mander Growth are both month to month, quoted with the build, and taken by clients who would rather not think about hosting or keep doing the search work themselves.',
      },
    ],
    cities: [
      {
        slug: 'mumbai',
        name: 'Mumbai',
        h1: 'Website design in Mumbai.',
        metaDescription:
          'Website design and local SEO for Mumbai businesses — clinics, professional practices, restaurants, D2C and services. Fixed-price builds, quoted up front.',
        intro:
          'Mumbai searches are short, impatient and overwhelmingly mobile: a locality plus a service, tapped while moving, with the decision made from the first screen of results. That makes two things decisive and everything else secondary — whether you appear in the map pack for your locality, and whether the page opens fast enough that nobody goes back. A business in Andheri is not competing with all of Mumbai, it is competing with the businesses on the same few streets, and a Business Profile with the right categories, real photographs, accurate hours and consistent details is what wins that fight. The website\u2019s job is to convert the tap: what you do, proof, and a way to call or message without a form standing in the way.',
        industries: ['Clinics & healthcare', 'Professional & financial services', 'Restaurants & hospitality', 'D2C, retail & studios'],
        faqs: [
          {
            q: 'Can you help us rank for our locality rather than all of Mumbai?',
            a: 'Yes, and it is the right target. Website + Local sets the profile categories, service area and on-page signals around the localities you actually serve, which is where the searches happen — "all of Mumbai" is a query almost nobody types.',
          },
          {
            q: 'Everything here is done over WhatsApp. Can the site work that way?',
            a: 'It is built to. A WhatsApp button sits on every page in the India builds, and it consistently gets used more than a contact form — which is the point, since the enquiry is worth more than the form fill.',
          },
          {
            q: 'Is the quoted number really the full price?',
            a: 'Yes — the figure we quote for the build is the figure you pay, agreed before work starts, GST extra where applicable. Domain and hosting are paid by you directly at cost, in your own name, which is how you keep ownership of them.',
          },
        ],
      },
      {
        slug: 'pune',
        name: 'Pune',
        h1: 'Website design in Pune.',
        metaDescription:
          'Website design for Pune businesses — IT services, education, clinics, manufacturing and hospitality. Fixed-price custom builds, quoted up front.',
        intro:
          'Pune has an unusual audience: a lot of engineers, a lot of students, and a manufacturing belt out towards Chakan and Hinjawadi selling to industrial buyers. That combination raises the technical bar on a website more than the decorative one. People here notice a slow page, a layout that breaks on their phone, a form that fails silently — and they are the same people who will check your site before an interview, an order or an admission. The builds are fixed-price and shipped fast, mobile-first and clean, because in this city that is what reads as competence.',
        industries: ['IT & engineering services', 'Education & training', 'Manufacturing & industrial suppliers', 'Clinics, retail & hospitality'],
        faqs: [
          {
            q: 'We are an IT services company. Will the site look generic?',
            a: 'It should not, and that is mostly a content problem rather than a design one — the sites that read as generic are the ones that describe capabilities instead of showing work. We build around what you can actually show.',
          },
          {
            q: 'Can you handle an admissions or enquiry flow for an institute?',
            a: 'Yes. Enquiry forms with the fields you need, straight to email, plus a WhatsApp route, are included in the build. Anything that needs a login or a payment gateway is scoped separately.',
          },
          {
            q: 'Do you do redesigns of existing sites?',
            a: 'Yes, at the same fixed prices. We keep the content and domain, rebuild properly, and hand over every account in your name — including logins currently sitting with a previous developer.',
          },
        ],
      },
    ],
  },
  {
    slug: 'karnataka',
    name: 'Karnataka',
    abbr: 'KA',
    country: 'IN',
    countryName: 'India',
    kicker: 'Karnataka',
    h1: 'Website design for Karnataka businesses.',
    metaDescription:
      'Website design and local SEO for businesses in Karnataka, led by Bengaluru — startups, clinics, services and retail. Fixed-price builds, quoted up front.',
    intro: [
      'Karnataka\u2019s search market is dominated by Bengaluru, and Bengaluru is unusual: an audience that works in software and judges a website the way a chef judges a menu. What that rewards is not budget, it is restraint — a fast page, real type, no carousel, one clear action. What it punishes is a template with a stock photograph of a handshake on it.',
      'Outside the city the pattern is ordinary and the local search work matters more than the design does: clinics, dealerships, institutes and shops competing inside their own town, where a correct Google Business Profile beats a better homepage almost every time. Both are built to the same two fixed-price plans — a five-page site, or the same site with the local work included.',
    ],
    industries: [
      'Startups & technology',
      'Clinics & healthcare',
      'Professional services',
      'Education & training',
      'Retail, food & studios',
    ],
    faqs: [
      {
        q: 'What does a website cost in Bengaluru?',
        a: 'A custom five-page build, or the same build with Google Business Profile and local SEO included — each one fixed number, quoted before work starts, GST extra where applicable.',
      },
      {
        q: 'Can you build in Kannada as well as English?',
        a: 'Yes, bilingual pages are a normal request and do not change the price band.',
      },
      {
        q: 'Do you build Android apps too?',
        a: 'Yes — shipped to the Play Store under your own developer account, quoted per build. Most small businesses do not need one, and we will say so before quoting for it.',
      },
    ],
    cities: [
      {
        slug: 'bengaluru',
        name: 'Bengaluru',
        h1: 'Website design in Bengaluru.',
        metaDescription:
          'Website design for Bengaluru businesses — startups, clinics, studios, services and D2C brands. Fast, fixed-price custom builds, quoted up front.',
        intro:
          'Bengaluru is the hardest Indian city in which to get away with a mediocre website and the easiest one in which a good one pays off, because the audience reads the craft immediately. Startups and studios are compared against well-designed software all day; clinics, salons and restaurants across Indiranagar, Koramangala, Whitefield and HSR are compared against each other in a map pack, locality by locality. The build is the same either way and the emphasis shifts: performance and clarity for the first, Business Profile and locality signals for the second. Traffic here means a page that opens on a bad connection in a lift, which is a build decision, not a hosting one.',
        industries: ['Startups & SaaS', 'Clinics & wellness', 'Restaurants & retail', 'Studios & agencies'],
        faqs: [
          {
            q: 'Our competitors all have big agency sites. Can a fixed-price build compete?',
            a: 'On the things that decide it, yes — speed, clarity, and being findable. The studio is remote and the scope is fixed, which is where the price comes from; the same builds ship in the US and Canada.',
          },
          {
            q: 'We need to rank in one or two neighbourhoods, not the whole city.',
            a: 'That is how Website + Local is set up — profile categories and service areas built around the localities you serve. City-wide ranking in Bengaluru is an expensive target and usually the wrong one for a single-location business.',
          },
          {
            q: 'How quickly can it ship?',
            a: 'Two to three weeks for the five-page build; three to four with the local search work. The gate is normally content and feedback, not development.',
          },
        ],
      },
    ],
  },
  {
    slug: 'telangana',
    name: 'Telangana',
    abbr: 'TS',
    country: 'IN',
    countryName: 'India',
    kicker: 'Telangana',
    h1: 'Website design for Telangana businesses.',
    metaDescription:
      'Website design and local SEO for Telangana businesses, led by Hyderabad — clinics, services, education and retail. Fixed-price builds, quoted up front.',
    intro: [
      'Hyderabad carries most of Telangana\u2019s search volume, and it splits cleanly: a services and technology belt around HITEC City and Gachibowli selling to business buyers, and an enormous local economy of clinics, institutes, showrooms and restaurants across the older city competing on Maps.',
      'The first needs a site that survives scrutiny; the second needs to be found at the moment someone is looking. Both are fixed-price, quoted before work starts, with the domain and every account in your name from day one.',
    ],
    industries: [
      'IT & business services',
      'Healthcare & diagnostics',
      'Education & coaching',
      'Retail, food & hospitality',
      'Real estate & interiors',
    ],
    faqs: [
      {
        q: 'How much does a website cost in Hyderabad?',
        a: 'A custom five-page site, or the same site with Google Business Profile, Maps optimisation and indexing setup. Both fixed prices, agreed before work starts, GST extra where applicable.',
      },
      {
        q: 'Can you work in Telugu?',
        a: 'Yes — bilingual pages are a normal request and do not move the price.',
      },
      {
        q: 'Who owns the site and the domain?',
        a: 'You do, from day one. The domain, the hosting and every account the site touches are registered in your name, not ours — including if you later stop working with us.',
      },
    ],
    cities: [
      {
        slug: 'hyderabad',
        name: 'Hyderabad',
        h1: 'Website design in Hyderabad.',
        metaDescription:
          'Website design and Google Maps optimisation for Hyderabad businesses — clinics, institutes, IT services, retail and restaurants. Quoted up front.',
        intro:
          'Hyderabad rewards businesses that get the boring things right. The clinics, diagnostic centres, coaching institutes and showrooms that dominate local search here are usually competing with several near-identical listings, and the one that wins the tap is the one with correct hours, real photographs, consistent details across every listing, and a site that opens instantly on a phone. The technology belt out west is a different conversation — there the site is a credential shown to business buyers, and it has to look like the work you claim to do. Both are the same fixed-price builds; what changes is where the effort lands.',
        industries: ['Healthcare & diagnostics', 'Education & coaching', 'IT & business services', 'Retail & restaurants'],
        faqs: [
          {
            q: 'We have listings on several directories with different details. Is that a problem?',
            a: 'It is one of the most common local ranking problems there is. Website + Local includes making the business name, address and phone consistent everywhere Google reads them, which is unglamorous and frequently the single thing holding a listing back.',
          },
          {
            q: 'Do you handle Google Business Profile from scratch?',
            a: 'Yes — setup or clean-up, categories, service areas, hours and photographs, plus the schema on the site that backs it up. Verification requires you, since Google sends the code to the business.',
          },
          {
            q: 'What if we need changes after launch?',
            a: 'Small content and image changes are included in Mander Care. Without a plan, changes are quoted as small fixed-price jobs — there is no hourly meter either way.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tamil-nadu',
    name: 'Tamil Nadu',
    abbr: 'TN',
    country: 'IN',
    countryName: 'India',
    kicker: 'Tamil Nadu',
    h1: 'Website design for Tamil Nadu businesses.',
    metaDescription:
      'Website design and local SEO for Tamil Nadu businesses, led by Chennai — clinics, manufacturers, services and retail. Fixed-price builds, quoted up front.',
    intro: [
      'Tamil Nadu has one of the deepest small-manufacturing bases in the country alongside a large urban services economy in Chennai, and the two want very different websites — a catalogue that a buyer can navigate, or a page that wins a local search.',
      'Both are built to the same two fixed-price plans, and both are built mobile-first, because in practice almost every visitor arrives on a phone regardless of which one you are.',
    ],
    industries: [
      'Manufacturing & industrial suppliers',
      'Healthcare & clinics',
      'Professional services',
      'Education & training',
      'Retail, food & hospitality',
    ],
    faqs: [
      {
        q: 'Do you build in Tamil?',
        a: 'Yes. Bilingual pages are a normal request here and do not change the price band.',
      },
      {
        q: 'What is included in the Starter Website?',
        a: 'A custom five-page responsive site, mobile optimisation, contact and WhatsApp integration, basic on-page SEO, domain and hosting deployment, Google Search Console setup and basic analytics. Fixed, quoted before work starts.',
      },
      {
        q: 'How do we reach you?',
        a: 'WhatsApp is fastest and the number is on every page of this site; email works too. Everything from the first conversation to handover happens remotely.',
      },
    ],
    cities: [
      {
        slug: 'chennai',
        name: 'Chennai',
        h1: 'Website design in Chennai.',
        metaDescription:
          'Website design for Chennai businesses — clinics, professional practices, manufacturers, institutes and retail. Fixed-price custom builds, quoted up front.',
        intro:
          'Chennai is a city of established businesses rather than new ones, and it shows in what people search for: a specific clinic, a specific dealer, a specific institute, usually with a neighbourhood attached. The competitive question is rarely "who does this" but "which of these is real and open" — which puts the weight on a Business Profile with accurate hours, real photographs and consistent details, and on a website that answers the practical questions quickly rather than selling. The industrial and export side of the market wants the opposite build: product structure, specifications and a clear enquiry path for a buyer who may never call.',
        industries: ['Clinics & healthcare', 'Manufacturing & exports', 'Professional services', 'Education & retail'],
        faqs: [
          {
            q: 'We are an established name locally. What does a new site change?',
            a: 'Mostly what happens between the referral and the call. People check now, and an outdated page or an unclaimed listing quietly costs enquiries you never hear about.',
          },
          {
            q: 'Can you handle a product catalogue for an industrial supplier?',
            a: 'Yes — categories, specifications and an enquiry route on each item fit inside the five-page build for most suppliers. Very large catalogues are scoped separately.',
          },
          {
            q: 'Is the price the same as elsewhere in India?',
            a: 'Yes — the same two plans, each a fixed number quoted before work starts, GST extra where applicable.',
          },
        ],
      },
    ],
  },
  {
    slug: 'gujarat',
    name: 'Gujarat',
    abbr: 'GJ',
    country: 'IN',
    countryName: 'India',
    kicker: 'Gujarat',
    h1: 'Website design for Gujarat businesses.',
    metaDescription:
      'Website design for Gujarat businesses — Ahmedabad and Surat. Trading, textiles, manufacturing and services. Fixed-price custom builds, quoted up front.',
    intro: [
      'Gujarat is a trading and manufacturing economy first, which changes what a website is for. The visitor is often a buyer, a distributor or an agent checking whether a supplier is real and worth an enquiry — not a consumer being persuaded.',
      'That means product clarity, credibility and a fast enquiry path beat anything decorative, and it is why the same two fixed-price plans usually buy a catalogue-shaped site here rather than a brochure-shaped one.',
    ],
    industries: [
      'Textiles & apparel',
      'Chemicals & manufacturing',
      'Wholesale & trading',
      'Diamonds & jewellery',
      'Professional services & retail',
    ],
    faqs: [
      {
        q: 'Our buyers are outside Gujarat. Does local SEO still help?',
        a: 'Less than it does for a clinic, and we will say so. For a supplier selling nationally the money is better spent on product-level pages, speed and indexing — all of which are in the build — than on Maps placement.',
      },
      {
        q: 'Can you build in Gujarati?',
        a: 'Yes, bilingual pages are a normal request and do not change the price band.',
      },
      {
        q: 'Do you take payment in stages?',
        a: 'Standard terms are agreed with the fixed quote before work starts. There is no hourly billing and no revised invoice at the end — the number you approve is the number you pay.',
      },
    ],
    cities: [
      {
        slug: 'ahmedabad',
        name: 'Ahmedabad',
        h1: 'Website design in Ahmedabad.',
        metaDescription:
          'Website design for Ahmedabad businesses — traders, manufacturers, clinics, institutes and retail. Fixed-price custom builds, quoted up front.',
        intro:
          'Ahmedabad has an unusually high number of businesses that are substantial offline and invisible online — traders and manufacturers with long books of repeat customers, plus a fast-growing services layer of clinics, institutes and studios competing locally. For the first group the site is a credibility document that shortens the distance between an enquiry and an order; for the second it is a local search play where the Business Profile does most of the ranking. Both benefit from the same discipline: load fast, say plainly what you sell, make the enquiry one tap, and put the address and phone number where they can be seen and trusted.',
        industries: ['Trading & wholesale', 'Textiles & manufacturing', 'Clinics & practices', 'Education & retail'],
        faqs: [
          {
            q: 'Will you write the content for us?',
            a: 'We shape it with you. Most owners know exactly what they sell and are not sure how to lay it out — that part is the build. Specifications, certificates and photographs have to come from you.',
          },
          {
            q: 'Can the site take orders?',
            a: 'A full store is outside the Website + Local plan and is scoped separately. For most trading businesses an enquiry flow with WhatsApp converts better anyway, and does not publish rates competitors can read.',
          },
          {
            q: 'How long does it take?',
            a: 'Two to three weeks for Starter, three to four for Website + Local, mostly depending on how fast content comes back.',
          },
        ],
      },
      {
        slug: 'surat',
        name: 'Surat',
        h1: 'Website design in Surat.',
        metaDescription:
          'Website design for Surat businesses — textiles, diamonds, manufacturing and services. Fixed-price custom builds quoted up front, with local SEO in the higher plan.',
        intro:
          'Surat trades at volume, and its two defining industries — textiles and diamonds — both run on relationships plus fast verification. A buyer in another state hears about a supplier, checks them in the next minute, and either finds a business that looks real or moves on. That is the entire job of a Surat website for most firms here: range, capability, credentials and an immediate enquiry route, working properly on a phone. The local services market — clinics, institutes, showrooms — plays the ordinary local search game, where the Business Profile and consistent details carry the ranking.',
        industries: ['Textiles & apparel', 'Diamonds & jewellery', 'Manufacturing & trading', 'Local services & retail'],
        faqs: [
          {
            q: 'We sell to wholesalers, not consumers. Is a website worth it?',
            a: 'For verification, yes — it is what a new buyer checks before the first order. It does not have to sell; it has to prove you exist, at scale, and make the enquiry easy.',
          },
          {
            q: 'Can you show our range without publishing prices?',
            a: 'Yes, and most clients here do exactly that: categories and specifications visible, pricing on enquiry.',
          },
          {
            q: 'What does upkeep cost?',
            a: 'Mander Care covers hosting, backups, security and small edits. Mander Growth adds ongoing local SEO and a monthly report. Both month to month, quoted with the build.',
          },
        ],
      },
    ],
  },
  {
    slug: 'west-bengal',
    name: 'West Bengal',
    abbr: 'WB',
    country: 'IN',
    countryName: 'India',
    kicker: 'West Bengal',
    h1: 'Website design for West Bengal businesses.',
    metaDescription:
      'Website design and local SEO for West Bengal businesses, led by Kolkata — practices, clinics, trading and retail. Fixed-price builds, quoted up front.',
    intro: [
      'Kolkata carries most of the state\u2019s search volume, and much of its business base is long-established: family firms, professional practices, clinics and traders with reputations built over decades and, very often, no website at all or one built once and never touched.',
      'The opportunity there is unusually good, because the bar in most categories is low. A fast, clean, honest site plus a properly set-up Business Profile is frequently enough to be the best result on the page — at a fixed price, quoted before it starts.',
    ],
    industries: [
      'Professional practices',
      'Healthcare & clinics',
      'Trading & wholesale',
      'Education & coaching',
      'Retail, food & hospitality',
    ],
    faqs: [
      {
        q: 'Do you build in Bengali?',
        a: 'Yes. Bilingual pages are a normal request and do not change the price band.',
      },
      {
        q: 'How much does it cost?',
        a: 'A custom five-page site, or the same site with Google Business Profile and local search work. Fixed before work starts, GST extra where applicable.',
      },
      {
        q: 'We have no digital presence at all. Where do we start?',
        a: 'Usually with Website + Local, because the profile and the site together are what make you findable. Message us on WhatsApp and we will tell you honestly if the cheaper plan is enough.',
      },
    ],
    cities: [
      {
        slug: 'kolkata',
        name: 'Kolkata',
        h1: 'Website design in Kolkata.',
        metaDescription:
          'Website design and Google Maps optimisation for Kolkata businesses — practices, clinics, traders, institutes and restaurants. Quoted up front.',
        intro:
          'Kolkata is a city where a great many excellent businesses are hard to find online, and that cuts both ways: the competition for a local search is often weaker than in Mumbai or Bengaluru, so a properly built site and a claimed, well-maintained Business Profile can take the top of the map pack faster and cheaper than they would elsewhere. The categories where this is most obvious are the ones that run on trust — clinics, chambers, practices, coaching centres, established restaurants — where the searcher is checking that you are real, open and reachable rather than shopping around. That is a low bar to clear well, and most competitors have not cleared it.',
        industries: ['Clinics & chambers', 'Professional practices', 'Trading & wholesale', 'Education & restaurants'],
        faqs: [
          {
            q: 'Is it really easier to rank here?',
            a: 'In many categories, yes — fewer competitors have a maintained profile and a fast site. It is not a guarantee, and anyone promising a position is guessing; what we can promise is that the technical side will not be what holds you back.',
          },
          {
            q: 'We only need people to find our chamber timings and address.',
            a: 'Then Website + Local is the right plan and the site can be small. Correct hours, address, a map, a phone number and a WhatsApp button, backed by a profile that actually shows up.',
          },
          {
            q: 'Do you charge for changes later?',
            a: 'Small edits are included in Mander Care. Without a plan they are quoted as small fixed-price jobs. Nothing is billed hourly.',
          },
        ],
      },
    ],
  },
];

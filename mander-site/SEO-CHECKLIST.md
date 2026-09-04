# Getting found — what the code does, and what only you can do

Written after a round of "we're getting zero results". The short, unwelcome
version: **nothing in this repository can make Google index the site.** Code
decides whether you *deserve* to rank. Search Console, a Business Profile and
time decide whether you *do*. The list below separates the two so no more
effort goes into the half that is already finished.

## Already done in the code

- 57 URLs in `sitemap.xml`, generated from the content, including 16 Indian
  city pages and 15 North American ones.
- `robots.txt` allows everything except `/api/`, and points at the sitemap.
- Unique title and meta description on every page, market-aware.
- One canonical per URL. No duplicate-content split between markets.
- JSON-LD: Organization (with a real logo image, phone, service area, offers),
  Service per discipline, per-city Service with a price in the right currency,
  FAQPage where FAQs are visible, BreadcrumbList, ContactPage, AboutPage.
- Favicon as SVG plus 48², 192² and 512² PNGs — Google's guidance wants a
  square raster at a multiple of 48.
- Location pages resolved by URL, not IP, so the US-based crawler sees Indian
  prices on Indian pages. This is the single most important SEO decision in
  the codebase; see the note in `lib/locations.js`.
- Every page server-rendered, no client-side-only content, no blocked JS/CSS.

## Only you can do these — in priority order

1. **Verify the domain in Google Search Console.** Nothing below matters until
   this exists. Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel with the
   token Google gives you, redeploy, verify, then **submit
   `https://www.mander.tech/sitemap.xml`**. Then use *URL Inspection → Request
   indexing* on the homepage, `/pricing`, and three or four city pages.
   Expect days to weeks, not hours.

2. **Google Business Profile — one per country you operate from.** For local
   searches this outranks the website itself, and a service-area business can
   have a profile without a public address. Categories, service areas, hours,
   real photographs, and the same name/phone everywhere. This is the highest
   return item on the list by a wide margin.

3. **Get five real reviews.** Local ranking is reviews plus proximity plus
   relevance, and reviews are the only one you control. Ask every client you
   have already delivered for.

4. **Three or four real links.** A local directory, a chamber or trade body, a
   supplier or client site, a founder profile. Not link schemes — a handful of
   genuine citations moves a new domain more than another ten pages will.

5. **Consistent NAP.** Business name, address, phone identical on the site, the
   profile, and every directory. Inconsistency here quietly caps local ranking
   and is the most common problem we fix for clients.

## What not to do

- Don't add more city pages hoping volume helps. Sixteen written pages beat
  sixty templated ones; Google treats name-swapped city pages as doorway pages
  and penalises the domain, not the URL.
- Don't buy links.
- Don't rewrite titles weekly. Ranking a new domain takes months of stability.

## Honest expectations

A domain with no history, no profile and no links does not rank in its first
weeks regardless of how good the pages are. The pages are now good. The rest
is items 1–5 and patience.

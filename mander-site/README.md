# MANDER — studio website

Next.js 14 (App Router) marketing site for MANDER, a small remote studio
working across three disciplines — brand, digital and growth — for small and
growing businesses across Canada, the United States and India.

The design language is Swiss/editorial: a magazine cover rather than a hero
band, a running head that travels down the margin of every section, drop
caps and captions and pull-quotes instead of card grids, hairline rules
instead of shadows, and a display serif set against a mono running head with
nothing in the middle. See **Design system** below.

## Run it locally

You need Node.js 18.17 or newer. Check with `node -v`.

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

Other commands:

```bash
npm run build   # production build
npm start       # serve the production build on :3000
```

## Pages

| Route | File | What it is |
|---|---|---|
| `/` | `app/page.js` | Cover (masthead, headline, one graded still, contents list) · client marks · pillars sequence · three recent projects · terms · plans (spec table, not prices) · how it works · Community Rate · FAQ (first four) · contact form · colophon |
| `/brand`, `/digital`, `/growth` | `app/[pillar]/page.js` | One page per pillar — capabilities, the demand engine (Growth only), the other two pillars, contact |
| `/work` | `app/work/page.js` | Every project as an editorial feature — client work first, in-house builds labelled below a rule, then the engagement testimonials |
| `/about` | `app/about/page.js` | Plans, disciplines, the three commitments, process, the whole team |
| `/pricing` | `app/pricing/page.js` | Plans, Android builds, the Care Plan / monthly tiers, the full spec comparison table, FAQ, contact form |
| `/contact` | `app/contact/page.js` | Every channel (WhatsApp/phone/email) as a directory, plus the contact form |
| `/quote` | `app/quote/page.js` | 60-second MCQ fit quiz → recommended tier → emails the full answer set as a lead |
| `/careers` | `app/careers/page.js` | Roles, culture, hiring process, apply-by-email |
| `/blog`, `/blog/[slug]` | `app/blog/**` | The journal — local-SEO and pricing explainers, each ending in related location-page links |
| `/legal/[doc]` | `app/legal/[doc]/page.js` | Privacy, terms, refunds, shipping — one route, four documents |
| `/locations`, `/locations/[region]`, `/locations/[region]/[city]` | `app/locations/**` | The local-SEO tree — see **Local pages** below |

## Design system

- **Type** — Instrument Serif for display (headlines, the drop cap), Hanken
  Grotesk for body copy, JetBrains Mono for the running-head/label voice
  (`.rail` in `globals.css` — one class, not hand-typed per component). The
  scale is in `tailwind.config.js`, tuned for the serif: near-neutral
  tracking, leading loosened for ascenders/descenders. `display-cover` exists
  for exactly one element, the homepage headline.
- **The editorial kit** (`components/Editorial.js`) — `Spread`/`Folio` is the
  one section-header system every page uses: a numbered running head pinned
  in the left margin (sticky on desktop), content in the remaining ten
  columns. `Standfirst` (with an optional drop cap), `Caption` (every image
  gets one, numbered per page), `PullQuote` (breaks the measure rather than
  sitting in a coloured band). `components/Section.js` no longer exists —
  everything migrated onto this kit.
- **Rows and grids, not cards** (`components/Swiss.js`) — `IndexRow`/
  `IndexList` for anything that's a list (plans, cities, roles, posts);
  `CellGrid`/`Cell` for anything that's genuinely a grid (engine steps,
  culture, industries) — ruled with hairlines top/left on the grid and
  bottom/right on each cell, never a filled, padded, bordered box.
- **Buttons** — `.btn-primary` (solid ink, the one filled rectangle the
  system allows), `.btn-outline`/`.btn-outline-dark` (ruled bottom-border,
  light/dark ground), `.btn-on-dark`/`.btn-sm`. All in `globals.css`.
- **Colour** — ink `#1b242c`, paper `#f6f7f7`, denim blue `accent` and yellow
  `accent-soft`, carried across from the Her Homes build. **Blue carries
  anything read or clicked** (6.1:1 on white); **yellow is decorative only**
  — a rule, a thread, or a fill behind dark text, never text on white or a
  button fill with light type. Values are measured, not eyeballed, in
  `tailwind.config.js`. The MANDER lockup is rose line art from a retired
  palette; `components/Logo.js` never shows it raw — `tone="ink"` and
  `tone="paper"` recolour it with a CSS filter for light/dark grounds.
- **Depth** — no shadows on any section or document content; structure comes
  from 1px `line` borders. The two exceptions are floating overlays that sit
  above the page rather than in it — the country picker's dropdown and the
  sticky contact bar (`shadow-xl`) — because a border alone can't signal
  that something is elevated above the content behind it.
- **Shape** — every `rounded-*` token is forced to `0`.
- **Motion** — one easing curve, `cubic-bezier(0.16, 1, 0.3, 1)`
  (`ease-premium`), used everywhere. `Reveal.js` fades content up on scroll
  (IntersectionObserver, respects `prefers-reduced-motion`); nothing bounces
  or overshoots.

## Structure

```
app/
  layout.js              Fonts, nav + footer shell, grain overlay, sitewide JSON-LD, per-market metadata
  globals.css             Tailwind layers, .rail/.h-display/.stack-y and the rest of the shared vocabulary
  page.js                 Home
  [pillar]/page.js        /brand, /digital, /growth
  work/page.js             Selected work
  about/, pricing/, contact/, careers/, quote/    One page.js each
  blog/, blog/[slug]/      Journal index + article template
  legal/[doc]/             Privacy/terms/refunds/shipping, one template
  locations/, locations/[region]/, locations/[region]/[city]/    Local-SEO tree
  robots.js, sitemap.js, opengraph-image.js, apple-icon.js, icon.svg, manifest.js   Metadata routes
components/
  Cover.js                 The homepage masthead/headline/image/contents composition
  Editorial.js              Spread, Folio, Standfirst, Caption, PullQuote — the section-header system
  Swiss.js                  IndexRow/IndexList, SpecRow, FieldNote, CellGrid/Cell
  PageHeader.js              The shared interior-page hero (title, lede, actions, breadcrumbs)
  PillarSequence.js          The three-pillar composition on the homepage
  WorkFeatures.js             The editorial project features (used on home and /work)
  Nav.js / Footer.js / QuickContact.js / CountryPicker.js    Shell chrome
  ContactForm.js / Quiz.js / CommunityRateDialog.js           The three forms, all via lib/forms.js
  MarketProvider.js / WhatsAppCta.js                          Client-side market awareness
  Logo.js / Icon.js / GridField.js / Grain.js / Reveal.js / JsonLd.js / Breadcrumbs.js / Faq.js / ProcessTimeline.js / TeamCard.js / Testimonials.js / Statement.js / Analytics.js / CookieHub.js
lib/
  content.js               Copy, BRAND, NAV_LINKS, TIERS/APP_TIERS, TERMS, PROCESS, WORK, CLIENTS, TEAM, CAREERS, FAQS
  pillars.js                 BRAND/DIGITAL/GROWTH content, including Growth's demand-engine steps
  locations.js                Metro Vancouver region/city data
  markets/                    us.js, in.js, geo.js, index.js, location-markets.js — see Markets below
  market-server.js            getServerMarket()/getServerRegion() for server components
  forms.js                     submitForm() — Web3Forms
  seo.js                       SITE_URL, schema builders, alternates()
  blog.js, legal.js             Journal posts and legal documents
public/
  videos/hero.mp4, hero-poster.jpg    The cover's graded footage
  work/, logos/, team/                 Project screenshots, client marks, team portraits
  logo-figure.png, logo-mander.png      The identity artwork Logo.js recolours per ground
```

## Markets — the site serves India automatically, everyone else the same site

Visitors in India get rupee pricing and a WhatsApp contact route; everyone
else gets the site as it is, in USD/CAD. There is no `/in` URL — both
versions are served from the same paths, resolved server-side from the
edge's country code.

| File | Job |
|---|---|
| `middleware.js` | Reads the edge's country code and sets `x-mander-market` / `x-mander-region`. Also resolves the market from the URL, not the header, for `/locations/**` — see below. |
| `lib/markets/geo.js` | The country → market/region rules. |
| `lib/markets/us.js`, `lib/markets/in.js` | The two markets: tiers, comparison table, FAQs, quiz copy, metadata, JSON-LD inputs, WhatsApp/phone. `us.js` mostly points at `lib/content.js`, so US copy has one home. |
| `lib/market-server.js` / `components/MarketProvider.js` | Server components call `getServerMarket()`; client components call `useMarket()`. |

**No prices are published anywhere in the markup.** A `price` field crosses
to the browser in the RSC payload whether or not a component prints it, so
the figures live only in code comments next to `TIERS`/`APP_TIERS` — every
page leads with "get a quote" instead.

**US and Canada are one market on purpose** — one price ladder, invoiced in
CAD on request. The footer's country picker still lists both, because "which
country am I being shown" is the question a visitor is actually asking.
India is offered in the picker only to visitors already resolved to India.

### Testing it

```bash
curl -s -H "x-vercel-ip-country: IN" localhost:3000/pricing   # India
curl -s localhost:3000/pricing                                 # everyone else
```

Or use the footer's country picker in a browser.

## Local pages — Metro Vancouver

`/locations/<region>/<city>` covers one region in `lib/locations.js`: Metro
Vancouver, the studio's own home market. Massachusetts and Rhode Island used
to have pages here too, tied to a real client (Waste Universe, serviced
across both states) — retired so the site markets local-SEO presence only
where it's actually the focus. The business still takes remote work anywhere
in the US and Canada; it just isn't a set of dedicated city pages outside
Vancouver. Adding a city is a data change in `lib/locations.js` — no route or
component edits.

**Location pages are resolved by URL, not by IP.** The homepage, pricing and
quote pages follow the visitor's country; a page *about a place* follows the
place, for everyone, crawler included — `/locations/metro-vancouver/vancouver`
quotes the same figures to a visitor in Toronto as to one in Seattle.
Googlebot crawls from the United States, so an IP-resolved page would be
indexed showing the wrong market's figures and could never rank for its own
city.

**The doorway-page rule binds.** A city gets a page only when it has a
genuinely distinct intro paragraph and industry list, not a template with
the name swapped — see the comment above `REGIONS` in `lib/locations.js`.

**No page claims an office.** The organization schema
(`organizationSchema()` in `lib/seo.js`) deliberately carries no street
address — there is no public office, and inventing one is what gets a local
listing suspended. `locationServiceSchema()` models every city as a
`Service` with `areaServed` set to that city, never as a `LocalBusiness`
implying a branch there.

## Contact

`market.phone` is the North American line (shown in the nav, footer, sticky
bar and JSON-LD); `market.whatsapp` is India's. Each market defines one and
nulls the other, so the Indian number is absent from the US HTML and
JavaScript bundle entirely, not hidden with CSS.

`components/QuickContact.js` is the sticky bar: talk to someone, or get a
quote. Two actions, never more; dismissible, remembered for the session;
hidden on `/quote`, where the page already is the call to action.

## Forms

Three surfaces submit to **Web3Forms**, all through `submitForm()` in
`lib/forms.js`: the contact form (`/`, `/pricing`, `/contact`), the `/quote`
quiz lead capture, and the Community Rate drawer. The access key
(`NEXT_PUBLIC_WEB3FORMS_KEY`) is publishable by design — Web3Forms is a
client-side service, the key is posted from the browser regardless of where
it's stored, and it's bound to the inbox it was registered against with no
account access. To rotate it, set the env var in the Vercel dashboard; the
env var takes precedence over the committed default.

Every form keeps a `mailto:` link beside it, and falls back to one if a
submission fails.

## SEO

- `lib/seo.js` exports `SITE_URL` (`https://www.mander.tech`),
  `metadataBase`, `alternates()` (self-referencing canonical per page), and
  schema builders — `organizationSchema`, `websiteSchema`, `serviceSchemas`,
  `locationServiceSchema`, `breadcrumbSchema`, `faqSchema`, `articleSchema`.
- `app/layout.js` renders `organizationSchema` + `websiteSchema` +
  `serviceSchemas` sitewide, and resolves per-market metadata.
- `app/sitemap.js` / `app/robots.js` are metadata routes generated from the
  same data the pages themselves render from (`REGIONS`, `allCities()`,
  `PILLARS`, `POSTS`, `LEGAL_NAV`) — a page can't exist without a sitemap
  entry, or vice versa.
- `app/opengraph-image.js` generates the share-card at request time so it
  can't drift out of sync with the headline copy.

## Content honesty

No fabricated traffic, revenue, growth numbers, user counts, awards, client
size, results, testimonials, or performance guarantees ("95% faster",
specific Lighthouse scores as promises) appear anywhere in this codebase.
Client work in `WORK`/`CLIENTS` (`lib/content.js`) is real engagements only;
a project with no usable screenshot renders as a typographic specimen plate
(`WorkFeatures.js`) rather than a stock photo standing in for it. If you add
content, hold it to the same standard — a false operational claim (e.g. "we
regularly meet clients in person" for a fully remote team) is a compliance
risk, not just a copy problem.

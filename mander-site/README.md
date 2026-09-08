# MANDER — agency website

Next.js 14 (App Router) marketing site for MANDER — premium websites at an
affordable rate for **small & mid-sized businesses across Canada and the U.S.**

The design language is editorial minimalism, closer to Uniqlo, MUJI, MUBI, and
Linear than to a SaaS template: warm paper and espresso ink (not stark
black/white), a terracotta accent pulled directly from the logo's dusty-rose
line art, square corners throughout, thin 1px borders instead of shadows,
large photography and video, and deliberately uneven pacing — dense sections
(Work, Pricing) are interrupted by spacious single-line "statement" breaks so
the page has rhythm instead of reading as uniformly important end to end.

## Run it locally

You need Node.js 18.17 or newer. Check with `node -v`.

Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

On Windows you can just double-click `start-dev.bat` — it copies the service
photos, copies the hero video, installs dependencies (including if a new one
was added since you last ran it), and starts the server.

Other commands:

```bash
npm run build   # production build
npm start       # serve the production build on :3000
```

**Dependency:** `framer-motion`, used for the interactive pricing panel and a
few reveal transitions. `start-dev.bat` detects a missing package and
re-runs `npm install` automatically; running `npm install` by hand also works.

## Pages

| Route      | File                  | Sections |
|------------|-----------------------|----------|
| `/`        | `app/page.js`         | Hero (headline + framed showcase video) · Trusted-by · Statement (warm) · Stats · Selected Work (compact 3-up grid) · Services (photo bands) · Statement · Why MANDER · Process timeline · Team · Testimonials (warm) · Quiz CTA · Interactive Pricing (warm) · FAQ · Final CTA |
| `/pricing` | `app/pricing/page.js` | Hero · Interactive Pricing · Statement · Comparison table · Care Plan · FAQ · Final CTA |
| `/quote`   | `app/quote/page.js`   | 60-second MCQ fit quiz → recommended tier + starting price → emails the full answer set as a lead |

## The hero video

`components/HeroVideo.js` renders the showcase clip inside a thin bordered
"print frame" (matches the editorial aesthetic — nothing plays edge-to-edge).
It autoplays muted/looped/inline, falls back to a static poster image if the
video 404s or fails to load, and freezes on the poster entirely under
`prefers-reduced-motion`. The file itself is **not** committed to git (video
files don't belong in source control) — see "Where the assets go" below for
how it gets into `public/videos/hero.mp4`.

## The interactive pricing panel

`components/PricingInteractive.js` shows all four tiers equally, side by side.
Click one and it expands in place — width grows on desktop (height on
mobile), the other three dim, the full feature list reveals one item at a
time, and the CTA slides in last. Only one tier can be open; picking another
closes the first automatically. Everything runs on `framer-motion`'s `layout`
animation so the resize is a smooth FLIP transition, not a jump cut.

It's used on both `/` and `/pricing`, fed by the same `TIERS` array in
`lib/content.js` — edit the data, not the component.

## The quote quiz

`/quote` asks six questions, tallies weighted answers, and recommends a tier
with the reasoning and a "from $X" price shown. It then captures name + email
and sends the whole thing to your inbox via Web3Forms. Any answer flagged
`sales: true` (e.g. "custom systems / an API") forces a human-handoff note.

All questions, options, weights, and reasoning live in the `QUIZ` object in
`lib/content.js` — edit there, no component changes needed.

## Motion system

One easing curve, `cubic-bezier(0.16, 1, 0.3, 1)`, is used everywhere (Tailwind's
`ease-premium` and the `EASE` constant in `PricingInteractive.js`) — fast
start, long soft settle, the curve behind most Linear/Vercel-style motion. A
few conventions kept consistent across the site:

- **Text fades upward on scroll** via `components/Reveal.js` (IntersectionObserver, respects `prefers-reduced-motion`).
- **Photos zoom slowly on hover** via the `.img-zoom` class in `globals.css` (1.4s, ~4.5% scale) — used on Work cards and the value-prop photo.
- **The hero is a looping video**, framed like a print, with poster-image and reduced-motion fallbacks (see above).
- **A faint grain texture** (`components/Grain.js`) sits over the whole viewport at ~3.5% opacity so large flat colour fields don't read as flat digital vector.
- Nothing bounces, nothing overshoots, nothing scales past ~1.05.

## Where the assets go

Everything below is a drop-in replacement — keep the filename, change the file,
and nothing in the code needs to be touched.

| Asset | Location | Notes |
|-------|----------|-------|
| Hero video | `public/videos/hero.mp4` | Copied automatically by `setup-video.bat` (run by `start-dev.bat`) from the uploaded source file. If you swap in a different clip, keep it reasonably compressed (a few MB, not tens) — it autoplays on page load. `IMAGES.heroWorkspace` in `lib/content.js` is the poster/fallback frame shown while the video loads or if it fails. |
| Service photos | `public/services/` | `website-design.jpg`, `brand-identity.jpg`, `website-redesign.jpg`, `seo.jpg`, `gbp-optimization.jpg`, `care-plan.jpg`. Copied automatically from `Pictures\our services` by `setup-assets.bat`. Used full-bleed in the alternating service bands; landscape crops best. |
| Client logos | `public/logos/` | `fitway.svg`, `waste-universe.svg`, `nouvelle-cote.svg`. **Placeholder wordmarks** — swap in the real marks. They render at low opacity in the "Trusted by" strip and inverted to white over each Work card image; if a real logo is already light, remove `invert` in `components/WorkCompact.js`. |
| Work case photos | `lib/content.js` → `WORK[].image` | Currently topically-matched **stock** photos (a gym interior, a waste truck, a bistro) picked to at least match each client's industry — not real photography. Replace with actual client photos before launch; this is flagged again in the comment directly above the `WORK` array. |
| Team headshots | `public/team/` | Add a file, then set `photo: '/team/name.jpg'` on that member in `lib/content.js`. Until then a tonal initials block renders in the same square frame. Square/portrait crops best; photos show grayscale, colour on hover. |
| Site logo | `public/logo-mander.png` (+ `public/logo-mander-nav.png`) | `components/Logo.js` reads these and falls back to a text wordmark if either file is missing, so the site never breaks without them. Use the **transparent PNG** exported from `make-logo-transparent.html` (see below) — not the original black-background version. |
| Other stock shots | `public/` | Change the `src` values in `IMAGES` (`lib/content.js`) from the Pexels URL to `/your-file.jpg`. |

### Getting the transparent logo into the site

The uploaded logo has a solid black background baked in. `make-logo-transparent.html`
(a standalone, dependency-free browser tool — open it directly in Chrome/Edge,
no server needed) chroma-keys the black out and un-premultiplies the edge
pixels so there's no dark halo, then lets you export:

1. Open `make-logo-transparent.html`, drop in the original logo file.
2. Export the full version → save as `public/logo-mander.png`.
3. Use the crop tool to export a tighter, nav-height version → save as
   `public/logo-mander-nav.png`.
4. Refresh the site — `Logo.js` picks both up automatically, no code changes.

## Structure

```
app/
  layout.js            Fonts, nav + footer shell, grain overlay, metadata, sitewide JSON-LD
  globals.css          Tailwind layers, motion tokens, grain/hero keyframes
  page.js              Home
  pricing/page.js      Pricing
  quote/page.js        Fit quiz
  robots.js            robots.txt (metadata route)
  sitemap.js           sitemap.xml (metadata route)
  opengraph-image.js   Generated OG/share image (edge runtime)
  icon.svg             Favicon
components/
  Nav.js               Transparent-until-scroll nav, animated underline links, logo
  Footer.js            Includes portfolio/reference link
  Section.js           Section wrapper + SectionHeading (tones incl. "warm")
  Statement.js         Single-line breathing-room section (rhythm/pacing)
  ServiceBand.js        Full-bleed alternating photo + text row
  HeroVideo.js           Framed, autoplay/loop hero video with fallbacks
  WorkCompact.js          Compact 3-up Selected Work grid (used on home)
  WorkCase.js             Larger stacked case-study layout (unused on home, kept for later)
  ProcessTimeline.js    Connecting-line process steps
  Testimonials.js        Stacked quote list, no cards
  TeamCard.js            Square masked headshot/initials + optional external link
  PricingInteractive.js  The expand-in-place pricing panel (framer-motion)
  Quiz.js                The /quote question flow + lead capture
  Faq.js                 Accessible accordion
  ContactForm.js         Client-side form → Web3Forms
  JsonLd.js               Renders a schema.org <script> block
  Grain.js               Fixed SVG noise overlay
  Reveal.js              IntersectionObserver fade-up
  Icon.js                 Inline stroke icon set
  Logo.js                 Transparent-PNG logo with text-wordmark fallback
lib/
  content.js             All copy, pricing, quiz, team, clients, image paths, BRAND (emails, portfolio link)
  seo.js                  SITE_URL + JSON-LD schema builders (organization, website, FAQ)
public/
  videos/                 hero.mp4 (not committed — see setup-video.bat)
  services/               Service band photos
  logos/                  Client logos
  team/                   Headshots (add your own)
  logo-mander.png          Transparent site logo (add your own — see above)
setup-assets.bat         Copies Pictures\our services -> public\services
setup-video.bat          Copies the uploaded hero clip -> public\videos\hero.mp4
start-dev.bat            Assets + video + install (incl. new deps) + dev server
```

`components/ServiceTile.js`, `WorkCard.js`, and `PricingCard.js` are earlier
versions kept only as re-exports so a stray import doesn't break the build —
the real implementations are `ServiceBand.js`, `WorkCompact.js`/`WorkCase.js`, and
`PricingInteractive.js`.

## Design tokens

Everything lives in `tailwind.config.js`:

- **Type** — Hanken Grotesk (display/body) and JetBrains Mono (labels), loaded
  as variable fonts via `next/font`. The scale is intentionally extreme, not
  even: `text-display-xl` (hero) down to `text-label-caps` (11px, tracked out
  0.18em) for eyebrows — nothing sits in a "medium" size, which is what gives
  the page its editorial rather than SaaS feel. Sized down a step sitewide
  from the original pass, which read as oversized on real screens.
- **Colour** — `ink` (#1c1512, a warm espresso, not flat black) on `paper`
  (#f4f2ec), with `paper-2`/`paper-3` for alternating section tone and `white`
  as a warm cream (#fbf8f3) rather than stark white. `accent` (#a6483a, a
  terracotta pulled directly from the logo's dusty-rose line art) is the
  site's one colour beat — solid blocks (quiz CTA, "Most chosen" tag, button
  states), the eyebrow labels sitewide, and a soft `accent-soft` wash
  (`tone="warm"` on `Section`/`Statement`) used sparingly on Pricing, the
  first Statement break, and Testimonials so the page reads as warm and
  considered rather than monochrome.
- **Shape** — every `rounded-*` token is forced to `0` in the config, so even
  a stray `rounded-lg` renders square — including team portraits, which are
  masked squares rather than circles, in keeping with the zero-radius system.
- **Depth** — no shadows anywhere. Structure comes from 1px `line` borders and
  flat tonal fills (`paper` / `paper-2` / `white` / `ink`).
- **Rhythm** — generous space between major sections, deliberately larger
  than a typical SaaS site so there's room for the pacing described above.

## Editing content

Almost all copy lives in `lib/content.js` — `BRAND` (name, tagline, public
email, portfolio link, region), services, process steps, pricing tiers (short
+ detailed feature lists), care-plan items, stats, FAQs, the three client case
studies (`WORK`, which also feeds the testimonials and the trusted-by strip),
the team roster (`TEAM`), the quiz (`QUIZ`), and image paths. Change it there
and every page that uses it updates.

The pricing comparison table on `/pricing` lives in `app/pricing/page.js`
(`COMPARISON`), since its column order is tied to `TIERS`.

**A note on invented content:** the client case-study descriptions, the
testimonial quotes attributed to Fitway Gym / Waste Universe / Nouvelle Côte,
the work-case photos (currently stock, industry-matched but not real client
photography), and the team bios are all written copy, not verified fact. Read
and edit them before this goes live — in particular the testimonial quotes
and case-study photos are the kind of thing that should either be real or
replaced.

## Email — two addresses, two jobs

`BRAND.email` in `lib/content.js` is **`sales@mander.tech`** — the
public-facing address shown on the site and used in every `mailto:` link.
This is display-only: for mail sent *to* that address to actually arrive
anywhere, you need to set up email forwarding at wherever `mander.tech` is
registered/hosted (Cloudflare Email Routing, Zoho, Google Workspace, etc.)
pointed at `hundalg968@gmail.com`. That's a DNS/registrar step, outside the
codebase — nothing here does it for you.

The **contact form and the `/quote` quiz** don't depend on that forwarding at
all — they submit straight to Web3Forms, which is registered directly to
`hundalg968@gmail.com` (see below). So submissions reach your inbox the
moment the Web3Forms key is set up, even before `sales@mander.tech`
forwarding exists.

## Contact form

Three surfaces submit to **Web3Forms**, all through `submitForm()` in
`lib/forms.js`: the contact form (home and `/pricing`), the `/quote` quiz lead
capture, and the Community Rate drawer. No setup step is needed — the access
key ships with the code.

That's deliberate, and it's a fix rather than a shortcut. The key used to live
only in `.env.local`, which `.gitignore` excludes, so no deploy ever received
it and every form on the live site failed while working fine locally. Web3Forms
is a client-side service: the key is posted from the browser, so it appears in
the page JavaScript and any visitor's network tab regardless of where it's
stored. It is bound to the inbox it was registered against, can only deliver
mail there, and grants no account access.

To rotate it, set `NEXT_PUBLIC_WEB3FORMS_KEY` in the Vercel dashboard (or
`.env.local` locally) — the environment variable takes precedence over the
committed default, so no code change is needed.

Every form also keeps a `mailto:` link beside it for anyone who'd rather use
their own mail client, and falls back to one if a submission fails.

## SEO

- **`lib/seo.js`** exports `SITE_URL` (currently a placeholder,
  `https://mander.agency` — **update this the day you have a real domain**,
  it feeds `metadataBase`, canonical URLs, and the JSON-LD `url` fields) and
  builders for `organizationSchema` (ProfessionalService), `websiteSchema`,
  and `faqSchema(items)`.
- **`app/layout.js`** renders `organizationSchema` + `websiteSchema` as
  JSON-LD sitewide, and sets sitewide metadata: title/description tuned for
  "affordable/fast/budget website design for small business," Open Graph,
  Twitter card, and a default canonical.
- **`app/page.js`** and **`app/pricing/page.js`** each additionally render
  `faqSchema(FAQS)` — only on those two, since FAQPage structured data should
  only sit on a page where that Q&A text is actually visible.
- **`app/robots.js`** / **`app/sitemap.js`** are Next.js metadata routes —
  they generate `/robots.txt` and `/sitemap.xml` automatically from
  `SITE_URL`, no static files to maintain.
- **`app/opengraph-image.js`** generates the share-card image at request time
  (edge runtime) so it can't drift out of sync with the headline copy.
- **Still to do once you have a real domain:** verify it in Google Search
  Console, submit the sitemap URL, and double check `SITE_URL` /
  `metadataBase` match the live domain exactly (including `https://` and no
  trailing slash).

## Images

Stock photography from [Pexels](https://www.pexels.com/license/) (free to use,
no attribution required), hotlinked through `next/image`. The allowed host is
declared in `next.config.mjs`. To use your own photos, drop them in `public/`
and change the `src` values in `lib/content.js` to `/your-file.jpg`.

# Google Business Profile copy pack — Ask Maps

Paste-ready text for the MANDER Google Business Profile. Every service name and
description below is generated from `lib/services.js`, the same data the site's
`/services` page and JSON-LD render — so the profile and the site say the same
thing in the same words. If you change a service, change it in `lib/services.js`
and regenerate this section rather than editing the profile alone.

## 1. Facts to keep identical on GBP and the site

| Field | Value on the site | Where on the site |
|---|---|---|
| Business name | MANDER | everywhere |
| Service area | Langley, Coquitlam, Port Coquitlam, Port Moody, Surrey, Fraser Valley, + rest of Metro Vancouver | `/services`, town pages, schema `areaServed` |
| Hours | Mon–Fri, 9:00–17:00 Pacific | footer, `/contact`, schema |
| Response time | Within one business day | `/contact`, `/services`, forms |
| Contact modes | WhatsApp, phone, email quote (sales@mander.tech) | nav, footer, `/services` |
| Phone | +1 (857) 758-7182 | nav, footer, schema |
| WhatsApp | +1 (857) 758-7182 (same as phone) | nav, footer, `/services` |
| Languages | English, French (Herman) | `/services`, schema |
| Pricing | Fixed price, quoted in writing before work starts (no public figures) | `/pricing`, `/services` |
| Website | https://mander.tech | — |
| Street address | **Hidden** (service-area business — do not add one) | none on site |

### Contradictions / risks found — please check

1. **WhatsApp — resolved.** WhatsApp now uses the same +1 (857) 758-7182
   number as the phone line. Make sure WhatsApp Business is actually
   registered on that number, and use it for both fields on GBP.
2. **Phone is a Massachusetts area code (857).** Fine if that's the line you
   answer, but make sure GBP lists the *same* number. A 604/778/236 number
   would be a stronger local signal for Langley/Coquitlam.
3. **Hours:** the site says Mon–Fri 9–5 Pacific. If GBP shows anything else
   (weekends, 24h, blank), make it match — this is the most common contradiction.
4. **Languages — resolved.** Site and schema now say English and French
   (French with Herman). On GBP, add French under languages if offered, and
   mention "Service en français avec Herman" in the description.
5. **Team location:** the site says part of the team is in Langley and the rest
   in Massachusetts and Maine. Keep the GBP description consistent with that —
   don't call it an office.
6. **Old service names.** The homepage still shows the older short labels
   (“SEO”, “Local Search”, “Care Plan”) as design copy; everything machine-read
   (schema, `/services`, town pages) now uses the GBP names below. Use exactly
   these names on GBP.
7. **Reviews:** no real client reviews or testimonials exist in the repo (the
   old invented ones were removed on purpose). Nothing has been added. Once
   you have real Google reviews, send them and they can go on the site with
   permission.

## 2. Services (GBP → Edit services) — name + description

### 1. Website Design  (483/750 chars)

Custom, mobile-first websites for small businesses in Langley, Coquitlam, the Fraser Valley and across Metro Vancouver. A one-page site typically takes about 2 weeks; a site of up to 5 pages 3–4 weeks; up to 10 pages with booking and local SEO 4–6 weeks. Every project has a fixed price, agreed in writing before work starts — no hourly billing. You own the site, the code and the domain outright. Contact us by WhatsApp, phone or email for a quote; we reply within one business day.

### 2. Website Redesign  (461/750 chars)

Website redesigns for small businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. We rebuild sites that are slow, dated or hard to use on a phone — clearer structure, faster load times and the technical SEO basics built in. Typical timeline is 3–6 weeks depending on size. Fixed price agreed in writing before work starts, and you own everything at the end. Message us on WhatsApp, call or email for a quote; we reply within one business day.

### 3. Ecommerce Website Design  (469/750 chars)

Ecommerce websites for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver — online stores for retailers, makers, farms, bakeries and restaurants selling products, gift cards or pre-orders. Built on accounts in your name, with payments, product pages and local SEO included. Typical timeline is 6–10 weeks. Fixed price, agreed in writing before work starts. Contact us on WhatsApp, by phone or by email for a quote; we reply within one business day.

### 4. Local SEO  (484/750 chars)

Local SEO for small businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. We handle on-page SEO, local keyword research, location pages, citations, Google Search Console and Analytics, so people searching for what you do in your town find you. Set up alongside a website build in 4–6 weeks; results build over the following months, and we will not promise a ranking date. Fixed price, quoted in writing. WhatsApp, call or email us; we reply within one business day.

### 5. Google Business Profile Optimization  (485/750 chars)

Google Business Profile optimization for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. We set up and tune your categories, services, service area, hours, photos and posts, match them to your website, and set up a simple routine for asking for and replying to reviews — so Google Maps can answer questions about your business accurately. Changes can show within days. Fixed price, quoted up front. WhatsApp, call or email us; we reply within one business day.

### 6. Brand Identity Design  (462/750 chars)

Brand identity design for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver: logo, typography, colour palette and simple usage rules, so your business looks established and consistent on your website, signage, Google profile and social media. Timeline is set in a written scope before work starts, at a fixed price — no hourly billing. You own every file at the end. Contact us by WhatsApp, phone or email; we reply within one business day.

### 7. Android App Development  (471/750 chars)

Native Android app development for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. Apps for bookings, ordering, dispatch and customer accounts — from a first app of up to 8 screens with sign-in and a basic backend, to apps with payments and an admin dashboard. Published to Google Play under your own developer account, with 30–60 days of support after launch. Fixed price in writing. WhatsApp, call or email us; we reply within one business day.

### 8. Website Care Plan  (441/750 chars)

Website hosting and maintenance for businesses in Langley, Coquitlam, the Fraser Valley and Metro Vancouver. The Care Plan covers managed hosting, SSL and security scanning, daily backups and unlimited small content edits — done for you, with no hourly billing. Month to month with no lock-in: cancel any time and the site stays yours. Available on any site we build. Contact us by WhatsApp, phone or email; we reply within one business day.


## 3. Products / services catalogue list

Add each as a **Product** in GBP (Category = the service name), price left as
"No price" (the site quotes every project), button **Learn more** →
`https://mander.tech/services#<anchor>`:

| Product | Category | Link anchor |
|---|---|---|
| Launch — one-page website (~2 weeks) | Website Design | `#website-design` |
| Starter — up to 5 pages (3–4 weeks) | Website Design | `#website-design` |
| Growth — up to 10 pages + local SEO (4–6 weeks) | Website Design | `#website-design` |
| Business Pro — ecommerce & custom (6–10 weeks) | Ecommerce Website Design | `#ecommerce-website-design` |
| Website redesign | Website Redesign | `#website-redesign` |
| Local SEO setup | Local SEO | `#local-seo` |
| Google Business Profile optimization | Google Business Profile Optimization | `#google-business-profile-optimization` |
| Brand identity (logo, type, colour) | Brand Identity Design | `#brand-identity-design` |
| App Launch — Android app, up to 8 screens | Android App Development | `#android-app-development` |
| App Growth — Android app with payments & bookings | Android App Development | `#android-app-development` |
| App Pro — custom Android app | Android App Development | `#android-app-development` |
| Website Care Plan — hosting & edits, monthly | Website Care Plan | `#website-care-plan` |

## 4. Eight weekly GBP posts (one Ask Maps question each)

Post one per week as an **Update**. Each answers the question in the first
sentence, names a town, and matches the site's facts.

### Week 1 — “Which web designer in Langley builds ecommerce sites?”  (248 chars)

Looking for a Langley web designer who builds online stores? MANDER builds ecommerce websites for Langley retailers, farms and makers — payments, product pages and local SEO, in about 6–10 weeks at a fixed price. Message us on WhatsApp for a quote.

Button: **Learn more** → `https://mander.tech/services`

### Week 2 — “Who makes websites for restaurants in Coquitlam?”  (230 chars)

Restaurants, cafés and bakeries in Coquitlam, Port Moody and Port Coquitlam: MANDER builds sites with menus, direct reservations, gift cards or pre-orders, plus local search so nearby diners find you. Fixed price, quoted up front.

Button: **Learn more** → `https://mander.tech/services`

### Week 3 — “Is there a web designer near me that also does SEO?”  (203 chars)

Yes — MANDER builds your website and handles local SEO and your Google Business Profile together, for businesses in Langley, Coquitlam and the Fraser Valley. One team, one fixed price, no hourly billing.

Button: **Learn more** → `https://mander.tech/services`

### Week 4 — “How fast can I get a website?”  (208 chars)

How fast can you get a website? A one-page site typically goes live in about 2 weeks. Up to 5 pages takes 3–4 weeks; up to 10 pages with local SEO, 4–6 weeks. Serving Langley, Coquitlam and the Fraser Valley.

Button: **Learn more** → `https://mander.tech/services`

### Week 5 — “Do they reply on WhatsApp?”  (175 chars)

Yes, we reply on WhatsApp. Message MANDER on WhatsApp, call or email sales@mander.tech — every message gets a reply within one business day, Monday to Friday, 9am–5pm Pacific.

Button: **Learn more** → `https://mander.tech/services`

### Week 6 — “Can you redesign my old website?”  (230 chars)

Is your website slow or hard to use on a phone? MANDER redesigns sites for Langley, Coquitlam and Fraser Valley businesses in about 3–6 weeks — faster pages, clearer structure, SEO basics built in. Fixed price, and you own it all.

Button: **Learn more** → `https://mander.tech/services`

### Week 7 — “Can you set up my Google Business Profile?”  (236 chars)

Want to show up on Google Maps in your town? MANDER sets up and tunes Google Business Profiles for Langley, Coquitlam and Fraser Valley businesses — categories, services, hours, photos and a review routine. Changes can show within days.

Button: **Learn more** → `https://mander.tech/services`

### Week 8 — “Do I own my website?”  (242 chars)

Do you own the website? With MANDER, yes — the site, the code and the domain are in your name from day one. Every project is a fixed price agreed in writing first, and the Care Plan is month to month. Langley, Coquitlam and the Fraser Valley.

Button: **Learn more** → `https://mander.tech/services`

## 5. Review-reply templates

Swap the bracketed parts. Only mention the service and town the customer
actually used — don't add ones they didn't.

**A — Website build**
> Thanks so much, [Name]! It was a pleasure building the new website for
> [Business] here in [Langley]. Glad the [booking page / new layout] is already
> bringing in enquiries — we're a WhatsApp message away whenever you need a
> change.

**B — SEO / Google Business Profile**
> Thank you, [Name]! Really happy the local SEO and Google Business Profile work
> is helping [Business] show up for customers in [Coquitlam]. Keep the reviews
> coming in and the profile will keep getting stronger.

**C — Redesign / ecommerce, or a less-than-5-star review**
> Thanks for the feedback, [Name]. We appreciate you trusting us with the
> [website redesign / online store] for [Business] in [the Fraser Valley].
> [If critical: We'd like to put this right — please message us on WhatsApp or
> email sales@mander.tech and we'll reply within one business day.]

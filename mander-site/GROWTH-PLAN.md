# Growth plan — 0 to 1,000 relevant visitors

Written against a site with essentially no organic traffic. The objective is
not pages published; it is qualified people who found MANDER because we built
something worth finding.

**A caveat that matters.** Everything below marked *hypothesis* is reasoned
from market knowledge and desk research, not from keyword-tool volumes or
Search Console data — MANDER has no Search Console history yet, which is the
first problem to fix. Treat the hypotheses as a research list to validate in
week one, not as findings. Anything marked *fact* was verified.

---

## Phase 0 — the week-one blockers

Nothing below works until these exist. They are not content problems.

1. **Search Console, verified, sitemap submitted.** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is wired — set it in Vercel, verify, submit `/sitemap.xml`, request indexing on the homepage and the three pillar pages. Until this exists there is no data to learn from and the rest of this document is guesswork.
2. **Google Business Profile, Metro Vancouver.** A service-area business can hold a profile without a public address. For local queries this outranks the website itself. Categories, service area, hours, real photographs, consistent name/phone.
3. **Five reviews.** Local ranking is proximity, relevance and reviews. Reviews are the only one you control.

---

## Where a Vancouver business owner actually looks

Mapped honestly, including the channels MANDER should ignore.

| Channel | How people discover providers | What MANDER has | What is missing |
|---|---|---|---|
| **Google search** | "web design vancouver", "branding agency vancouver", problem-led queries | Pillar pages, two city pages, technical foundations | Verified GSC, demand research, assets aimed at commercial intent |
| **Google Maps** | Local pack for "web designer near me" | Nothing | A Business Profile — the single highest-return item on this list |
| **Referral / word of mouth** | The dominant channel for studios this size | Portfolio, a site that stands up to a check | Case studies with outcomes, not just screenshots |
| **LinkedIn** | Founders posting; company pages checked after a referral | Nothing | Founder posting the work and the reasoning behind it |
| **Directories (Clutch, The Best Vancouver, etc.)** | Ranked listicles dominate branded search *(fact — these rank for "web design Vancouver")* | Nothing | Profiles on the two or three that actually rank locally |
| **Reddit (r/vancouver, r/smallbusiness)** | Recommendation threads | Nothing | Occasional genuinely useful answers, never promotion |
| **AI assistants** | "Who should I hire in Vancouver for X" | Structured data, clear service pages | Assets an assistant can cite: original data, definitions, comparisons |
| **Local orgs / BIAs / chambers** | Member directories, events | Nothing | One or two memberships where the members are the target market |
| **YouTube, podcasts, newsletters, events** | Slow, high-effort | Nothing | **Skip for now.** Wrong stage. |

### The four channels worth effort now

1. **Google Business Profile + local pack.** Highest return, lowest cost, and it is the channel where "Metro Vancouver only" is an advantage rather than a limitation.
2. **Organic search on commercial-intent queries.** Not volume terms — the ones with a buyer attached.
3. **Directory presence on the listings that already rank.** *(fact: aggregator listicles occupy the first page for "web design Vancouver" — being absent from them means being absent from the result someone actually reads.)*
4. **Founder-led LinkedIn + referral.** For a studio this size the first ten clients almost always come through people, and the site's job is to make the check go well.

Explicitly not now: YouTube, podcasts, paid ads, mass directory submission, Reddit promotion.

---

## Ten demand assets worth building

Scored 1–5. *Fit* = how directly it connects to something MANDER sells.

| # | Asset | Audience | Demand | Link/share | Fit | Build |
|---|---|---|---|---|---|---|
| 01 | **Vancouver web design cost guide, with real ranges** — what a five-page site, an ecommerce build and a rebrand actually cost here, and what changes the number | Owners pre-quote | 4 | 4 | 5 | 2 |
| 02 | **Website assessment tool** — paste a URL, get speed, mobile, metadata, schema and Business Profile checks with a plain-English verdict | Owners who suspect their site is bad | 4 | 5 | 5 | 4 |
| 03 | **AI automation opportunity assessment** — ten questions, output is which workflows are worth automating and which are not | SMB operators | 4 | 4 | 5 | 3 |
| 04 | **Metro Vancouver small-business web benchmark** — original: crawl a sample of local business sites, publish the distribution of load times, mobile failures, missing schema | Press, owners, other studios | 3 | 5 | 4 | 4 |
| 05 | **"Is your Google Business Profile costing you customers?" audit** — scored checklist against what actually moves the local pack | Local service businesses | 4 | 4 | 5 | 2 |
| 06 | **Rebrand-or-refresh decision framework** — the questions that decide it, with the honest "don't" cases | Owners considering a rebrand | 3 | 3 | 5 | 1 |
| 07 | **Website teardown series** — short, specific, public critiques of volunteer sites | Owners, LinkedIn | 3 | 5 | 4 | 2 |
| 08 | **Vancouver industry pages, evidence-led** — trades, clinics, studios; built only where research shows demand | High-intent searchers | 4 | 2 | 5 | 2 |
| 09 | **What Vancouver agencies charge, and why** — a comparison piece that names the models rather than competitors | Owners comparing quotes | 4 | 3 | 4 | 2 |
| 10 | **Open-source utility** — a small tool that solves one real developer/marketer problem, MIT-licensed | Developers, links | 2 | 5 | 2 | 3 |

**Build order:** 05 → 01 → 02 → 03 → 04. The first two are cheap and aimed squarely at buying intent; 02 and 03 are the interactive assets that make Growth demonstrable rather than described; 04 is the one that earns links and press.

---

## Vancouver demand — hypotheses to validate first

Every line here is a *hypothesis*. Validate in Search Console and a keyword tool before building anything against it.

| Query shape | Why it might matter | Validate |
|---|---|---|
| `web design vancouver` + variants | Highest intent, hardest ranking; aggregators hold the page *(fact)* | Volume, whether a studio site ranks at all |
| `website redesign vancouver` | Lower competition, buyer already committed | Volume, SERP composition |
| `branding agency vancouver` / `brand identity vancouver` | Maps to BRAND; higher project value | Volume, intent mix |
| `ai automation for small business` + local | Emerging, poorly served, matches GROWTH | Volume, whether local intent exists at all |
| `[industry] website design vancouver` | Where a small studio can actually rank | Which industries have volume |
| `how much does a website cost vancouver` | Directly feeds asset 01 | Volume, existing answers' quality |
| `google business profile help vancouver` | Feeds asset 05, high commercial intent | Volume, competition |

**Expansion rule.** No new municipality page until: Vancouver content is ranking for something, the service–market fit is evidenced by enquiries, and the new market has demand a page could actually serve. Burnaby, Richmond, the North Shore, the Tri-Cities, Delta, Langley, Maple Ridge, Port Moody, White Rock and Pitt Meadows are served — they do not have pages, and should not until the evidence exists.

---

## Measurement

What to watch weekly, in priority order:

1. **Enquiries and assessment completions**, by landing page. The only number that matters.
2. **Queries with impressions but poor CTR** — a title problem, not a content problem.
3. **Pages with clicks but no engagement** — a relevance problem.
4. **Pages with engagement but no conversion** — an offer problem.
5. Sessions by source. Last, deliberately.

Analytics already stamps every page view, lead and click with its market, and the forms fire `generate_lead` with the plan and form attached — so the "which page produced an enquiry" question is answerable as soon as there is traffic to answer it about.

---

## What this plan refuses to do

- Publish city pages for municipalities without evidence.
- Chase volume keywords a two-person studio cannot rank for.
- Post the same content across six platforms.
- Add services to make the list look impressive.
- Measure success in pages published.

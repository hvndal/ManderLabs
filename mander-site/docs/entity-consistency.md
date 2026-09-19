# External entity consistency — attempted, blocked

## What this was supposed to be

A one-time pass fetching MANDER's real external profiles — the ones already in `BRAND` in
`lib/content.js` — and comparing what they say (name, services, location) against what the site
itself claims, to catch the "website says X, directory says Y" contradiction the brief describes.

## What actually happened

Every attempt failed, honestly reported rather than papered over:

| Source | `BRAND` field | Result |
|---|---|---|
| Portfolio | `portfolio` → `https://hermanify.online` | Direct fetch blocked by this environment's egress proxy. Web search found no content under that exact domain — only unrelated "Herman portfolio" sites with no relation to this one. |
| Instagram | `instagram` → `https://www.instagram.com/mander.tech/` | Direct fetch blocked. Web search confirmed the account exists (one dated post from August 2026) but returned no bio text, follower count, or listed website/contact — Instagram doesn't expose that to an unauthenticated crawl. |
| Google Business Profile | `googleBusinessShare` → `https://share.google/DXHNvMYsz0VNBpVOs` | Direct fetch blocked. Web search returned zero results for the actual listing — only unrelated Vancouver web-design competitors. |

So: **no contradiction was found, and no consistency was confirmed either.** Neither claim would
be honest. This is a genuine tooling limitation in this environment, not a finding about MANDER's
actual external presence — which may well be perfectly consistent, or may not be; there is no way
to know from here.

## What would actually answer this

Two minutes of a human looking at each link directly:

1. Open [hermanify.online](https://hermanify.online) — does it name MANDER, and does the
   description match `BRAND.tagline` in `lib/content.js`?
2. Open the [Instagram bio](https://www.instagram.com/mander.tech/) — same check, plus whether
   the listed website link actually points at `mander.tech`.
3. Open the [Google Business Profile](https://share.google/DXHNvMYsz0VNBpVOs) — category, address
   or service area, phone, hours, and whether the website field points at `mander.tech`. This one
   matters most: it's the profile `hasMap` and `sameAs` in `lib/seo.js` `organizationSchema`
   already point at, so a stale category or wrong service area there directly undercuts what the
   schema is asserting.

If a real contradiction turns up, it's a one-line fix in `lib/content.js` or `lib/seo.js` — the
same pattern every other correction this project has made. Nothing here needs new code; it needs
someone with a working browser to spend two minutes looking.

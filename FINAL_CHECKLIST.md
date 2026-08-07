# MANDER — what's left to do

Run these in order. Steps 1 and 2 are the ones that make the site actually
look finished; everything after is launch prep.

---

## 1. Push to GitHub  ← start here

**Double-click `push-to-github.bat`** (in this folder, not in `mander-site`).

The project had never been initialised as a git repository, which is why
nothing appeared at github.com/hvndal/ManderLabs. This script does the whole
thing: copies your assets into `public/`, runs `git init`, sets the remote,
stages, shows you the file list to check, commits, and pushes.

It pauses once to show what's being committed. `node_modules`, `.next` and
`.env.local` should **not** be in that list — a `.gitignore` at this folder
level excludes them.

If GitHub asks for a password and rejects it, that's expected — GitHub
dropped password auth. The script prints two ways to fix it (GitHub CLI, or a
personal access token).

---

## 2. Export the transparent logo  ← the site shows a text wordmark until you do

This is the one thing that can't be automated — the logo you sent has a solid
black background baked into the pixels, and removing it needs a canvas, which
means a browser.

1. Open **`make-logo-transparent.html`** in Chrome or Edge (just double-click
   it — no server needed)
2. Drop in your logo PNG
3. Export → save as `mander-site/public/logo-mander.png`
4. Optionally use the crop tool for a tighter navbar version → save as
   `mander-site/public/logo-mander-nav.png`
5. Refresh — `Logo.js` picks it up with no code change

Until then the header and footer show "MANDER" as text rather than a broken
image.

---

## 3. Connect the contact form

The form and quiz are fully built but won't deliver until they have a key.

1. Go to <https://web3forms.com>
2. Create an access key for **hundalg968@gmail.com**
3. Copy `mander-site/.env.local.example` → `mander-site/.env.local`
4. Paste the key: `NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here`
5. Restart the dev server

Until then the form shows an inline error with a mailto fallback rather than
silently swallowing enquiries.

---

## 4. Forward herman@mander.tech

`herman@mander.tech` is shown all over the site, but mail sent there will
bounce until you set up forwarding at whoever hosts `mander.tech` — Cloudflare
Email Routing is free and takes about five minutes. Point it at
hundalg968@gmail.com.

This is separate from step 3. Form submissions reach your Gmail through
Web3Forms regardless.

---

## 5. Before you go live

- **Replace the client photos.** `WORK[].image` in `lib/content.js` currently
  points at stock photos chosen to match each industry — a gym interior, a
  waste truck, a bistro. They sit next to real client names and real results,
  which is the one thing on this site that will read as fake if someone looks
  closely.
- **Replace or remove the testimonial quotes.** Same file, `WORK[].quote`.
  These are invented. Real or gone.
- **Update the domain.** `SITE_URL` in `lib/seo.js` is a placeholder
  (`https://mander.agency`). It feeds canonical URLs, the sitemap, and the
  structured data, so it needs to match your real domain exactly.
- Then: verify the domain in Google Search Console and submit
  `yourdomain.com/sitemap.xml`.

---

## Where things actually stand

| | Status |
|---|---|
| Site code, routing, design system | Done |
| Warm palette (the "psych ward" fix) | Done |
| SEO: metadata, JSON-LD, sitemap, robots, OG image | Done — needs real domain |
| Team section (smaller cards, top-anchored crops) | Done |
| Team photos wired to Herman / Danielle / Sophie / Evan | Done — copied by the push script |
| Marcus + Tyler | Initials placeholder (no photo supplied) |
| Hero video | Wired — copied by the push script |
| Logo | **Needs you — step 2** |
| Contact form + quiz | Built — **needs key, step 3** |
| Sales email link | **Needs DNS forwarding, step 4** |
| Client photos + testimonials | **Stock / invented — step 5** |

---

## Running it locally

Double-click `mander-site/start-dev.bat`. It copies the service photos, hero
video and team photos, installs anything missing, and opens
<http://localhost:3000>.

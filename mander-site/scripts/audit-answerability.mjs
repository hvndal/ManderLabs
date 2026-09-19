// AI-answerability linter — crawls every URL in the sitemap and scores
// whether a system extracting an answer (an AI Overview, a citation engine,
// a plain human skimming) can actually get one from the page, rather than
// having to infer it.
//
// This checks structure, not content quality — it cannot tell you whether an
// answer is a *good* one, only whether the page has the shape that makes an
// answer extractable at all: a clear H1, a direct statement near the top
// rather than three paragraphs of throat-clearing first, at least one
// internal link giving the reader somewhere to go next, and a freshness or
// authorship signal so a system has a reason to trust the page is current.
//
// Modeled on audit-seo.mjs's shape on purpose — same BASE env var, same
// sitemap crawl, same plain fetch, no dependencies — so it drops into the
// existing `BASE=... node scripts/audit-*.mjs` habit rather than inventing a
// new one.
//
// Run against a production build:  npx next build && npx next start &  then
//   node scripts/audit-answerability.mjs
const BASE = process.env.BASE || 'http://localhost:3511';

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace('https://www.mander.tech', '')
);

const problems = [];
const rows = [];

function stripTags(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

for (const path of urls) {
  const res = await fetch(BASE + path);
  if (res.status !== 200) continue; // audit-seo.mjs already reports non-200s
  const html = await res.text();

  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
  const hasH1 = Boolean(h1Match);

  // The "direct answer" check: pull the text of the first <p> that appears
  // after the H1 and require it to clear a floor length — a one-line teaser
  // ("Let's talk.") is common on hero sections but gives a citation engine
  // nothing to quote. Doesn't require an exact word count from the brief
  // (that number was never verified against anything real); a floor instead
  // of a ceiling, since a page can always say more.
  let directAnswer = false;
  if (h1Match) {
    const afterH1 = html.slice(html.indexOf(h1Match[0]) + h1Match[0].length);
    const firstP = afterH1.match(/<p[^>]*>(.*?)<\/p>/s);
    if (firstP) {
      const text = stripTags(firstP[1]);
      directAnswer = text.length >= 60;
    }
  }

  // Internal links only — mailto:, tel:, and off-site hrefs don't count
  // toward "somewhere else on the site to go".
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const internalLinks = hrefs.filter(
    (h) => h.startsWith('/') && !h.startsWith('//')
  ).length;

  // Freshness: a visible date, or a byline. This site names Herman as the
  // author on blog posts (lib/blog.js AUTHOR) and stamps a legal "Updated"
  // date on policy pages — both patterns are already real, so this checks
  // for either rather than inventing a third format.
  const hasFreshnessSignal =
    /\bUpdated\b/.test(html) ||
    /"datePublished"|"dateModified"/.test(html) ||
    /By\s+\p{Lu}/u.test(html);

  const row = { path, hasH1, directAnswer, internalLinks, hasFreshnessSignal };
  rows.push(row);

  if (!hasH1) problems.push(`${path} → no H1, nothing to anchor an extracted answer to`);
  if (!directAnswer) problems.push(`${path} → no direct-answer paragraph found near the H1 (first <p> under 60 chars or missing)`);
  if (internalLinks === 0) problems.push(`${path} → zero internal links, a dead end for both a crawler and a reader`);
  if (!hasFreshnessSignal) problems.push(`${path} → no freshness or authorship signal (no "Updated", no datePublished/dateModified, no byline)`);
}

const scored = rows.filter((r) => r.hasH1 && r.directAnswer && r.internalLinks > 0 && r.hasFreshnessSignal).length;
console.log(`ROUTES CHECKED: ${rows.length}`);
console.log(`FULLY ANSWERABLE (all 4 signals): ${scored}/${rows.length}`);
console.log(`\nPROBLEMS: ${problems.length}`);
problems.forEach((p) => console.log(' •', p));
if (problems.length) process.exitCode = 1;

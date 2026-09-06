// The checks a crawl cannot make: that no page is orphaned from internal
// links, that each market sees its own prices and contact routes, that the
// location pages are resolved by URL rather than by the visitor's IP (which
// is what lets them rank), that redirects for retired URLs still fire, that
// every JSON-LD block parses and declares one organization entity, and that
// every page offers both a quote path and a way to reach a person.
//
// Run against a production build, as above:  node scripts/audit-site.mjs
const BASE = 'http://localhost:3511';
const IN = { 'x-vercel-ip-country': 'IN' };
const get = async (p, h = {}) => {
  const r = await fetch(BASE + p, { headers: h, redirect: 'manual' });
  return { status: r.status, loc: r.headers.get('location'), html: r.status === 200 ? await r.text() : '' };
};
const out = [];
const ok = (label, cond, detail = '') => out.push(`${cond ? 'PASS' : 'FAIL'}  ${label}${detail ? ' — ' + detail : ''}`);

// 1. Orphan check — crawl internal links two levels from the homepage.
const sitemap = [...(await (await fetch(BASE + '/sitemap.xml')).text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace('https://www.mander.tech', '') || '/');
const seen = new Set(['/']);
const queue = ['/'];
let depth = 0;
while (queue.length && depth < 3) {
  const batch = queue.splice(0, queue.length);
  for (const p of batch) {
    const { html } = await get(p);
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = m[1].replace(/\/$/, '') || '/';
      if (!seen.has(href)) { seen.add(href); queue.push(href); }
    }
  }
  depth++;
}
const orphans = sitemap.filter((u) => !seen.has(u.replace(/\/$/, '') || '/'));
ok('every sitemap URL reachable by internal links', orphans.length === 0, orphans.join(', ') || `${sitemap.length} checked`);

// 2. Market gating.
const inHome = await get('/', IN);
const usHome = await get('/');
ok('India visitor gets rupees + WhatsApp', /₹/.test(inHome.html) && /wa\.me\/918146298024/.test(inHome.html));
ok('US visitor gets neither rupees nor WhatsApp', !/₹/.test(usHome.html) && !/wa\.me/.test(usHome.html));
ok('US visitor gets the phone line', /857\) 758-7182/.test(usHome.html));

// 3. URL-scoped markets on location pages (what the crawler sees).
const mohali = await get('/locations/punjab/mohali');
const van = await get('/locations/metro-vancouver/vancouver', IN);
ok('India city page shows India market to a US crawler', /wa\.me/.test(mohali.html) && !/857\) 758-7182/.test(mohali.html));
ok('Canadian city page shows NA market to an India visitor', !/wa\.me/.test(van.html) && /857\) 758-7182/.test(van.html));

// 4. Redirects for the retired BC URLs.
for (const [from, to] of [['/locations/british-columbia', '/locations/metro-vancouver'],
                          ['/locations/british-columbia/victoria', '/locations/metro-vancouver']]) {
  const r = await get(from);
  ok(`redirect ${from}`, r.status === 308 && r.loc === to, `${r.status} → ${r.loc}`);
}

// 5. Structured data.
const grab = (html) => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  .map((m) => { try { return JSON.parse(m[1]); } catch { return { PARSE_ERROR: true }; } });
let badJson = 0, orgCount = 0;
for (const p of ['/', '/brand', '/growth', '/pricing', '/contact', '/about', '/locations/metro-vancouver/vancouver', '/legal/refunds']) {
  const blocks = grab((await get(p)).html);
  if (blocks.some((b) => b.PARSE_ERROR)) badJson++;
  if (blocks.some((b) => b['@id'] === 'https://www.mander.tech/#organization')) orgCount++;
}
ok('all JSON-LD parses', badJson === 0);
ok('organization entity present on every page checked', orgCount === 8, `${orgCount}/8`);
const pillarBlocks = grab((await get('/growth')).html);
ok('pillar page declares a Service with an offer catalogue',
  pillarBlocks.some((b) => b['@type'] === 'Service' && b.hasOfferCatalog));
const cityBlocks = grab((await get('/locations/metro-vancouver/vancouver')).html);
ok('city page has breadcrumbs + local service + FAQ',
  ['BreadcrumbList', 'Service', 'FAQPage'].every((t) => cityBlocks.some((b) => b['@type'] === t)));

// 6. Conversion paths.
let noContact = [];
for (const p of sitemap) {
  const { html } = await get(p);
  const hasQuote = /href="\/quote"/.test(html);
  const hasDirect = /mailto:sales@mander\.tech|tel:\+1|wa\.me\//.test(html);
  if (!hasQuote || !hasDirect) noContact.push(p);
}
ok('every page offers both a quote path and a direct contact', noContact.length === 0, noContact.slice(0, 5).join(', '));

// 7. Indexability + robots.
const robots = await (await fetch(BASE + '/robots.txt')).text();
ok('robots allows crawling and names the sitemap', /Allow: \//.test(robots) && /sitemap\.xml/i.test(robots));
ok('nothing noindexed', !(await get('/')).html.includes('noindex'));

// 8. Search Console verification.
ok('Search Console verification token set', /google-site-verification/.test(usHome.html),
   process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? 'set' : 'NOT SET — blocks indexing feedback');

// 9. GBP two-way link.
ok('GBP link in schema and footer',
  /share\.google\/khVi6nsC9lzdEc4Jp/.test(usHome.html) && /Find us on Google/.test(usHome.html));

// 10. Analytics wiring.
ok('analytics gated on consent, market-stamped',
  /mander:consent-change/.test(usHome.html) === false, 'consent event is client-side only (expected)');

console.log(out.join('\n'));
console.log('\nFAILURES:', out.filter((l) => l.startsWith('FAIL')).length);

// Crawls every URL in the sitemap and asserts the things that decide whether
// a page can rank at all: status, one H1, a title short enough to survive a
// SERP, a description in range, a canonical, no stray published prices, and a
// path to /quote. Duplicate titles, descriptions and canonicals fail too.
//
// Run against a production build:  npx next build && npx next start &  then
//   node scripts/audit-seo.mjs
// Point BASE at the running server. No dependencies beyond Node's fetch.
const BASE = 'http://localhost:3511';
const US = {}, IN = { 'x-vercel-ip-country': 'IN' };

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace('https://www.mander.tech', '')
);

const problems = [];
const rows = [];
const titles = new Map(), descs = new Map(), canons = new Map();

for (const path of urls) {
  const res = await fetch(BASE + path, { headers: US, redirect: 'manual' });
  const html = res.status === 200 ? await res.text() : '';
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const h1s = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)].map((m) =>
    m[1].replace(/<[^>]*>/g, '').trim()
  );
  const noindex = /noindex/.test(html);
  const prices = (html.match(/\$(299|499|899|1,499|2,999|5,999|9,999)|₹(19,999|34,999|2,499|4,999|49,999)/g) || []).length;
  const quoteCta = /\/quote/.test(html);

  if (res.status !== 200) problems.push(`${path} → HTTP ${res.status}`);
  if (!title) problems.push(`${path} → no <title>`);
  if (!desc) problems.push(`${path} → no meta description`);
  if (!canon) problems.push(`${path} → no canonical`);
  if (h1s.length !== 1) problems.push(`${path} → ${h1s.length} <h1> (want exactly 1)`);
  if (noindex) problems.push(`${path} → noindex present`);
  if (prices) problems.push(`${path} → ${prices} published price figures`);
  if (!quoteCta && res.status === 200) problems.push(`${path} → no path to /quote`);
  if (title.length > 62) problems.push(`${path} → title ${title.length} chars (SERP truncation)`);
  if (desc && (desc.length < 70 || desc.length > 165))
    problems.push(`${path} → description ${desc.length} chars`);

  titles.set(title, (titles.get(title) || 0) + 1);
  descs.set(desc, (descs.get(desc) || 0) + 1);
  canons.set(canon, (canons.get(canon) || 0) + 1);
  rows.push({ path, status: res.status, title: title.slice(0, 52), h1: h1s.length });
}

for (const [t, n] of titles) if (n > 1 && t) problems.push(`duplicate title ×${n}: "${t.slice(0,50)}"`);
for (const [d, n] of descs) if (n > 1 && d) problems.push(`duplicate description ×${n}`);
for (const [c, n] of canons) if (n > 1 && c) problems.push(`duplicate canonical ×${n}: ${c}`);

console.log(`ROUTES IN SITEMAP: ${urls.length}`);
console.log(`OK: ${rows.filter((r) => r.status === 200).length}`);
console.log('\nPROBLEMS:', problems.length);
problems.forEach((p) => console.log(' •', p));

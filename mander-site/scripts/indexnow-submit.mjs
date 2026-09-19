// IndexNow: tells Bing, Yandex, Seznam, Naver and Yep about every URL in the
// sitemap the moment a production deploy finishes, instead of waiting for
// each engine's own crawl schedule.
//
// Google does not participate in IndexNow (as of 2026) — this buys nothing
// there. It is worth having anyway because it is the one channel Bing's own
// AI Performance guidance names as keeping content fresh for citation, and
// the marginal cost is one POST request.
//
// Ownership proof is the key file at public/<KEY>.txt, containing only the
// key itself — that file has to exist at https://www.mander.tech/<KEY>.txt
// before this script is useful; it was committed alongside this script.
//
// Run as "postbuild" in package.json, gated on VERCEL_ENV=production so a
// local `next build` or a preview deploy never fires it. Fails soft: any
// error is logged and swallowed, because a network hiccup submitting to a
// third party must never fail the actual site build.
const KEY = 'c128e508de1fa07d82fd86bac7721480';
const HOST = 'www.mander.tech';
const SITE_URL = `https://${HOST}`;

async function main() {
  if (process.env.VERCEL_ENV !== 'production') {
    console.log('indexnow-submit: skipped (VERCEL_ENV is not "production")');
    return;
  }

  const sitemapXml = await (await fetch(`${SITE_URL}/sitemap.xml`)).text();
  const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (!urlList.length) {
    console.log('indexnow-submit: sitemap returned no URLs, nothing to submit');
    return;
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList,
    }),
  });

  console.log(`indexnow-submit: ${urlList.length} URLs, HTTP ${res.status}`);
}

main().catch((err) => {
  console.log('indexnow-submit: failed, continuing build —', err.message);
});

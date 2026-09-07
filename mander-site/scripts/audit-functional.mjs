// The functional regression: console errors, failed first-party requests,
// the contact form and the quiz posting real payloads, market gating in both
// directions, the mobile menu, no video on a phone, and images that declare
// their size.
//
// Needs a production build running, and a Chromium:
//   BASE=http://localhost:3000 node scripts/audit-functional.mjs
import { chromium } from 'playwright';
const BASE = process.env.BASE || 'http://localhost:3000';
const out=[]; const ok=(l,c,d='')=>out.push(`${c?'PASS':'FAIL'}  ${l}${d?' — '+d:''}`);
process.on('unhandledRejection',e=>console.log('UR',e));
const b=await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});

// --- console errors + network failures across the main routes
const routes=['/','/brand','/digital','/growth','/pricing','/quote','/contact','/about','/locations/metro-vancouver/vancouver','/legal/refunds'];
const errs=[], bad=[];
for(const r of routes){
  const p=await b.newPage();
  p.on('console',m=>{if(m.type()==='error')errs.push(`${r}: ${m.text().slice(0,140)}`);});
  p.on('pageerror',e=>errs.push(`${r}: ${e.message.slice(0,140)}`));
  p.on('requestfailed',q=>bad.push(`${r}: ${q.url().slice(0,90)}`));
  const res=await p.goto(BASE+r,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(900);
  if(res.status()>=400) bad.push(`${r} -> ${res.status()}`);
  await p.close();
}
// The sandbox has no egress, so third-party hosts and any request the page
// cancels on navigation are noise here, not defects.
const ext=t=>/TUNNEL_CONNECTION_FAILED|cookiehub|googletagmanager|_rsc=|\.mp4/.test(t);
const realErrs=errs.filter(e=>!ext(e)), realBad=bad.filter(e=>!ext(e));
ok('no console errors on any main route',realErrs.length===0,realErrs.slice(0,4).join(' | '));
ok('no failed first-party requests',realBad.length===0,realBad.slice(0,4).join(' | '));

// --- contact form actually posts
{
  const p=await b.newPage();
  let posted=null;
  await p.route('**/api.web3forms.com/**',async route=>{posted=route.request().postData();
    await route.fulfill({status:200,contentType:'application/json',body:'{"success":true}'});});
  console.log('...contact block');await p.goto(BASE+'/contact',{waitUntil:'domcontentloaded'});
  await p.waitForSelector('#cf-name',{timeout:15000});
  await p.locator('#cf-name').scrollIntoViewIfNeeded(); await p.waitForTimeout(700);
  await p.fill('#cf-name','QA Tester'); await p.fill('#cf-email','qa@example.com');
  await p.fill('#cf-message','Regression check');
  await p.click('button[type=submit]');
  await p.waitForTimeout(1200);
  ok('contact form POSTs to Web3Forms',!!posted&&/qa@example\.com/.test(posted));
  ok('contact form shows confirmation',(await p.content()).includes("we&#x27;ll be in touch")||(await p.content()).includes("we'll be in touch"));
  await p.close();
}

// --- quiz end to end
{
  const p=await b.newPage();
  let posted=null;
  await p.route('**/api.web3forms.com/**',async route=>{posted=route.request().postData();
    await route.fulfill({status:200,contentType:'application/json',body:'{"success":true}'});});
  await p.goto(BASE+'/quote',{waitUntil:'domcontentloaded'});
  for(let i=0;i<10;i++){
    const opts=await p.$$('button:has(span.text-body-lg)');
    if(!opts.length) break;
    await opts[0].click(); await p.waitForTimeout(300);
  }
  const html=await p.content();
  ok('quiz reaches a result',/Recommended for you/.test(html));
  if(/Recommended for you/.test(html)){
    await p.fill('input[placeholder="Your name"]','QA Tester');
    await p.fill('input[placeholder="Email"]','qa@example.com');
    await p.click('button[type=submit]'); await p.waitForTimeout(1200);
    ok('quiz lead POSTs',!!posted&&/recommended_plan/.test(posted));
  }
  await p.close();
}

// --- market resolution + picker
{
  const p=await b.newPage({extraHTTPHeaders:{'x-vercel-ip-country':'IN'}});
  await p.goto(BASE+'/',{waitUntil:'domcontentloaded'});
  const h=await p.content();
  ok('India visitor: rupees + WhatsApp + India in picker',/₹/.test(h)&&/wa\.me\/918146298024/.test(h)&&/India/.test(h));
  await p.close();
  const p2=await b.newPage();
  await p2.goto(BASE+'/',{waitUntil:'domcontentloaded'});
  const h2=await p2.content();
  ok('US visitor: no rupees, no WhatsApp, no India option',!/₹/.test(h2)&&!/wa\.me/.test(h2)&&!/>India</.test(h2));
  await p2.close();
}

// --- mobile: no video fetched, menu opens
{
  const p=await b.newPage({viewport:{width:390,height:844}});
  const media=[]; p.on('request',q=>{if(/\.mp4/.test(q.url()))media.push(q.url());});
  await p.goto(BASE+'/',{waitUntil:'domcontentloaded'});
  ok('no video fetched at 390px',media.length===0,media.join(', '));
  ok('no horizontal overflow at 390px',await p.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),
     String(await p.evaluate(()=>document.documentElement.scrollWidth)));
  await p.click('button[aria-controls=mobile-menu]');
  await p.waitForTimeout(400);
  ok('mobile menu opens full-screen',await p.isVisible('#mobile-menu a[href="/pricing"]'));
  await p.close();
}

// --- images carry intrinsic dimensions (CLS / Lighthouse)
{
  const p=await b.newPage();
  await p.goto(BASE+'/',{waitUntil:'domcontentloaded'});
  const missing=await p.evaluate(()=>[...document.querySelectorAll('img')]
    .filter(i=>!(i.getAttribute('width')&&i.getAttribute('height'))&&getComputedStyle(i).position!=='absolute')
    .map(i=>i.currentSrc||i.src));
  ok('every non-fill image declares width/height',missing.length===0,missing.slice(0,3).join(', '));
  await p.close();
}

await b.close();
console.log(out.join('\n'));
console.log('\nFAILURES:',out.filter(l=>l.startsWith('FAIL')).length);

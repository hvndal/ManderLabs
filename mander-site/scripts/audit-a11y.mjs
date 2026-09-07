// Accessibility sweep: computed contrast against the nearest painted
// background, link text that says where it goes, alt attributes, and one h1
// per page. Elements inside aria-hidden subtrees are skipped, because that is
// what axe and Lighthouse do.
//
// Needs a production build running, and a Chromium:
//   BASE=http://localhost:3000 node scripts/audit-a11y.mjs
import { chromium } from 'playwright';
const BASE = process.env.BASE || 'http://localhost:3000';
const b=await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const routes=['/','/brand','/digital','/growth','/pricing','/quote','/contact','/about','/locations/metro-vancouver/vancouver','/legal/refunds','/blog','/careers','/locations'];
const bad=[], vague=[], noalt=[], heads=[];
const VAGUE=new Set(['view','open','more','learn more','read more','click here','here','link','site','visit site','quote','details']);
for(const r of routes){
  const p=await b.newPage();
  await p.goto(BASE+r,{waitUntil:'domcontentloaded'});
  // Reveal-on-scroll means nothing below the fold is painted until it has
  // been scrolled to, and elementsFromPoint only sees the current viewport,
  // so the page is walked down once before anything is measured and the
  // contrast pass then runs a viewport at a time.
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);});
  await p.waitForTimeout(600);
  const res=await p.evaluate(async()=>{
    const lum=c=>{const [r,g,bl]=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*r+0.7152*g+0.0722*bl;};
    const parse=s=>{const m=s.match(/[\d.]+/g);return m?m.slice(0,3).map(Number):null;};
    // The background a reader actually sees, not the one the DOM tree
    // implies. Walking ancestors gets this wrong wherever a panel paints its
    // own ground in an absolutely-positioned sibling — the hero panels do
    // exactly that, and an ancestor walk reported pale type on a dark film
    // panel as pale type on paper. elementsFromPoint reads the real stack.
    const opaque=n=>{
      // A hairline rule or a 3px flag stripe is not a background. Sampling
      // one as the ground behind a label reported the section's own divider
      // as the colour behind the type, which is how a passing label got
      // flagged at 4.26:1.
      const r=n.getBoundingClientRect();
      if(r.height<6||r.width<6) return null;
      const c=getComputedStyle(n).backgroundColor;const p=parse(c);
      const a=c.match(/rgba?\([^)]*?,\s*([\d.]+)\)/); return p&&(!a||Number(a[1])>0.85)?p:null;};
    const bgOf=el=>{
      const r=el.getBoundingClientRect();
      const stack=document.elementsFromPoint(r.left+Math.min(r.width/2,40),r.top+r.height/2);
      const i=stack.indexOf(el);
      const own=opaque(el); if(own) return own;
      for(const n of (i>=0?stack.slice(i+1):stack)){const p=opaque(n);if(p)return p;}
      let n=el.parentElement;while(n){const p=opaque(n);if(p)return p;n=n.parentElement;}
      return [255,255,255];};
    const out={low:[],vague:[],noalt:[],h1:document.querySelectorAll('h1').length};
    // `seen` is declared below, next to the scroll loop that fills it.
    const measure=()=>{
    for(const el of document.querySelectorAll('a,p,span,li,h1,h2,h3,h4,dt,dd,label,button')){
      if(seen.has(el)) continue;
      const box=el.getBoundingClientRect();
      // Zero-height means collapsed (inside a closed <details>, say): it is
      // not on screen, and sampling a point inside it reads whatever section
      // happens to be painted there.
      if(box.bottom<0||box.top>window.innerHeight||box.width===0||box.height===0) continue;
      seen.add(el);
      const t=el.textContent.trim();
      if(!t||el.children.length) continue;
      if(el.closest('[aria-hidden="true"]')) continue; // audits skip these, so do we
      const st=getComputedStyle(el);
      if(st.visibility==='hidden'||st.display==='none'||parseFloat(st.opacity)<0.6) continue;
      const fg=parse(st.color), bg=bgOf(el);
      if(!fg) continue;
      const l1=lum(fg),l2=lum(bg);
      const ratio=(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
      const size=parseFloat(st.fontSize), bold=parseInt(st.fontWeight,10)>=700;
      const need=(size>=24||(size>=18.66&&bold))?3:4.5;
      if(ratio<need) out.low.push(`${el.tagName}.${st.fontSize} "${t.slice(0,28)}" ${ratio.toFixed(2)}<${need} fg=${st.color} bg=rgb(${bg.join(",")}) [${String(el.className).slice(0,40)}]`);
    }};
    const seen=new WeakSet();
    for(let y=0;y<document.body.scrollHeight;y+=Math.round(window.innerHeight*0.8)){
      window.scrollTo(0,y); await new Promise(r=>setTimeout(r,120)); measure();
    }
    window.scrollTo(0,0);
    for(const a of document.querySelectorAll('a')){
      const t=(a.getAttribute('aria-label')||a.textContent).trim().toLowerCase().replace(/[↗→\s]+/g,' ').trim();
      if(t.length<3||['view','open','more','learn more','read more','click here','here','link','site','quote','details','view ↗'].includes(t)) out.vague.push(`${a.getAttribute('href')} :: "${t}"`);
    }
    for(const i of document.querySelectorAll('img')) if(i.getAttribute('alt')===null) out.noalt.push(i.currentSrc||i.src);
    return out;
  });
  if(res.low.length) bad.push(`${r}\n    ${[...new Set(res.low)].slice(0,6).join('\n    ')}`);
  if(res.vague.length) vague.push(`${r}: ${[...new Set(res.vague)].slice(0,5).join(' | ')}`);
  if(res.noalt.length) noalt.push(`${r}: ${res.noalt.slice(0,3).join(', ')}`);
  if(res.h1!==1) heads.push(`${r}: ${res.h1} h1`);
  await p.close();
}
await b.close();
console.log('CONTRAST BELOW AA:\n'+(bad.join('\n')||'  none'));
console.log('\nNON-DESCRIPTIVE LINKS:\n'+(vague.join('\n')||'  none'));
console.log('\nIMAGES MISSING ALT:\n'+(noalt.join('\n')||'  none'));
console.log('\nH1 COUNT ISSUES:\n'+(heads.join('\n')||'  none'));

import { chromium } from 'playwright';
const BASE='http://localhost:3441';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const routes=['/','/brand','/digital','/growth','/pricing','/quote','/contact','/about','/locations/metro-vancouver/vancouver','/legal/refunds','/blog','/careers','/locations'];
const bad=[], vague=[], noalt=[], heads=[];
const VAGUE=new Set(['view','open','more','learn more','read more','click here','here','link','site','visit site','quote','details']);
for(const r of routes){
  const p=await b.newPage();
  p.on('pageerror',e=>console.log('PAGEERROR',r,e.message.slice(0,300)));
  await p.goto(BASE+r,{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await p.waitForTimeout(900);
  const res=await p.evaluate(()=>{
    const lum=c=>{const [r,g,bl]=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*r+0.7152*g+0.0722*bl;};
    const parse=s=>{const m=s.match(/[\d.]+/g);return m?m.slice(0,3).map(Number):null;};
    const bgOf=el=>{let n=el;while(n&&n!==document.documentElement){const c=getComputedStyle(n).backgroundColor;const p=parse(c);
      if(p&&!/rgba\(.*,\s*0\)/.test(c))return p;n=n.parentElement;}return [255,255,255];};
    const out={low:[],vague:[],noalt:[],h1:document.querySelectorAll('h1').length,txt:document.body.innerText.slice(0,200),url:location.pathname};
    for(const el of document.querySelectorAll('a,p,span,li,h1,h2,h3,h4,dt,dd,label,button')){
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
      if(ratio<need) out.low.push(`${el.tagName}.${st.fontSize} "${t.slice(0,28)}" ${ratio.toFixed(2)}<${need}`);
    }
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
  if(r==='/')console.log('DBG',JSON.stringify({h1:res.h1,txt:res.txt,url:res.url}));
  if(res.h1!==1) heads.push(`${r}: ${res.h1} h1`);
  await p.close();
}
await b.close();
console.log('CONTRAST BELOW AA:\n'+(bad.join('\n')||'  none'));
console.log('\nNON-DESCRIPTIVE LINKS:\n'+(vague.join('\n')||'  none'));
console.log('\nIMAGES MISSING ALT:\n'+(noalt.join('\n')||'  none'));
console.log('\nH1 COUNT ISSUES:\n'+(heads.join('\n')||'  none'));

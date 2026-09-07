import { chromium } from 'playwright';
const BASE='http://localhost:3414';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const routes=['/'];
const bad=[], vague=[], noalt=[], heads=[];
const VAGUE=new Set(['view','open','more','learn more','read more','click here','here','link','site','visit site','quote','details']);
for(const r of routes){
  const p=await b.newPage();
  p.on('pageerror',e=>console.log('PAGEERROR',r,e.message.slice(0,300)));
  await p.goto(BASE+r,{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await p.waitForTimeout(900);
  const res={low:[],vague:[],noalt:[],h1:1,txt:'',url:r};
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

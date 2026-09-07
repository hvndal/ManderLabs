import { chromium } from 'playwright';
const BASE='http://localhost:3441';
const OUT='/tmp/claude-0/-home-user-ManderLabs/8108784a-0a9e-5156-9dcc-3b48f0bb0954/scratchpad/shots';
import fs from 'fs'; fs.mkdirSync(OUT,{recursive:true});
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [w,h,tag] of [[1440,900,'desk'],[390,844,'mob']]){
  for(const r of ['/','/growth','/pricing']){
    const p=await b.newPage({viewport:{width:w,height:h}});
    await p.goto(BASE+r,{waitUntil:'domcontentloaded'});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);});
    await p.waitForTimeout(1200);
    await p.screenshot({path:`${OUT}/${tag}${r.replace(/\//g,'_')}.png`,fullPage:r!=='/'});
    if(r==='/') await p.screenshot({path:`${OUT}/${tag}_hero.png`});
    await p.close();
  }
}
await b.close(); console.log('done');

import { chromium } from 'playwright';
const OUT='/tmp/claude-0/-home-user-ManderLabs/8108784a-0a9e-5156-9dcc-3b48f0bb0954/scratchpad/shots';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:3441/pricing',{waitUntil:'domcontentloaded'});
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}});
const H=await p.evaluate(()=>document.body.scrollHeight);
for(const frac of [0.45,0.6,0.75]){
  await p.evaluate(y=>window.scrollTo(0,y),Math.round(H*frac));
  await p.waitForTimeout(700);
  await p.screenshot({path:`${OUT}/mob_pricing_${frac}.png`});
}
await b.close();console.log('H',H);

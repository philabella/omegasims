const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();const path=require('path');
(async()=>{const dir=__dirname;const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});
const errs=[];
// desktop, narrow window (no side panel): hover shows the card; one click buys
let p=await b.newPage({viewport:{width:820,height:900}});p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+path.resolve(dir+'/ui/t.html'));await p.waitForTimeout(400);
await p.click('[data-a="new"]');await p.waitForTimeout(200);await p.evaluate(()=>{S.gold=30;render();});
await p.hover('[data-a="pick"][data-v="0"]');await p.waitForTimeout(150);console.log('desktop hover card shown:',await p.evaluate(()=>!!document.querySelector('#hovcard')));
await p.screenshot({path:dir+'/ui/hover.png'});
await p.click('[data-a="pick"][data-v="0"]');await p.waitForTimeout(150);console.log('desktop one click buys:',JSON.stringify(await p.evaluate(()=>({gold:S.gold,units:S.units.length}))));
await p.close();
// phone: tap buys, hold shows details
p=await b.newPage({viewport:{width:390,height:1400},hasTouch:true,isMobile:true});p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+path.resolve(dir+'/ui/t.html'));await p.waitForTimeout(400);
await p.tap('[data-a="new"]');await p.waitForTimeout(200);await p.evaluate(()=>{S.gold=30;render();});
await p.tap('[data-a="pick"][data-v="0"]');await p.waitForTimeout(200);console.log('phone tap buys:',JSON.stringify(await p.evaluate(()=>({gold:S.gold,units:S.units.length,sheet:!document.querySelector('#sheet').hidden}))));
const r=await (await p.$('[data-a="pick"][data-v="1"]')).boundingBox();await p.mouse.move(r.x+r.width/2,r.y+r.height/2);await p.mouse.down();await p.waitForTimeout(550);await p.mouse.up();await p.waitForTimeout(200);
console.log('phone hold shows:',JSON.stringify(await p.evaluate(()=>({gold:S.gold,sheet:!document.querySelector('#sheet').hidden}))));
console.log(errs.length?'ERR '+errs.join(';'):'no errors');await b.close();})();

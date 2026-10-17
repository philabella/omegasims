const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});const out=[];let SAVED=null;
 for(const [spd,wait] of [[1,0],[2,0],[1,3000],[3,0],[4,0],[1,0]]){const p=await (await b.newContext({viewport:{width:1400,height:900}})).newPage();
  await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);await p.click('[data-a="new"]');await p.waitForTimeout(300);
  await p.evaluate(()=>{S.units=[{id:'riot',level:2,slot:'f1',uid:1},{id:'zombies',level:1,slot:'f0',uid:2},{id:'rifle',level:1,slot:'b1',uid:3}];S.inFight={seed:12345};});
  if(!SAVED)SAVED=await p.evaluate(()=>JSON.stringify(S));else await p.evaluate(j=>{S=JSON.parse(j);},SAVED);await p.evaluate(()=>render());
  await p.evaluate(s=>{UI.speed=s;},spd);await p.click('[data-a="fight"]');if(wait)await p.waitForTimeout(wait);
  await p.waitForFunction(()=>B&&B.done,null,{timeout:120000});
  out.push(await p.evaluate(()=>({win:B.win,t:+B.t.toFixed(2),hp:B.units.map(u=>Math.round(Math.max(0,u.hp))).join(',')})));await p.close();}
 console.log(JSON.stringify(out));console.log(out.every(o=>JSON.stringify(o)===JSON.stringify(out[0]))?'PASS same seed -> same fight at 1x, 4x and after watching 3s':'FAIL fights differ');await b.close();})();

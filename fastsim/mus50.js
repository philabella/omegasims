const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--autoplay-policy=no-user-gesture-required']});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 const ctx=await b.newContext({viewport:{width:1400,height:900}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{if(!localStorage.getItem('tropebrawl-settings'))localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,arena:false,music:true,sound:true}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);await p.mouse.click(700,450);await p.waitForTimeout(2500);
 const st=()=>p.evaluate(()=>({cur:MUS.cur,bufs:Object.keys(MUS.buf).sort().join(),len:MUS.src&&+(MUS.src.loopEnd-MUS.src.loopStart).toFixed(2)}));
 ok('title: Showtime + Rumble decoded only',(await st()).bufs==='battle_rumble,shop_show',await st());
 await p.click('[data-a="new"]');await p.waitForTimeout(300);await p.evaluate(()=>{S.units=[{id:'riot',level:1,slot:'f1',uid:1}];render();});
 await p.click('[data-a="fight"]');await p.waitForTimeout(2500);let s=await st();ok('fight plays Rumble by default',s.cur==='battle_rumble',s);
 await p.evaluate(()=>{UI.screen='plan';render();});await p.waitForTimeout(1500);
 await p.click('[data-a="settings"]');await p.waitForTimeout(300);
 for(const [k,key] of [['noon','battle_noon'],['kaiju','battle_kaiju'],['showdown','battle']]){await p.click(`[data-a="bmus"][data-v="${k}"]`);await p.waitForTimeout(2000);
  const r=await p.evaluate(key=>{UI.screen='battle';musTick();return 1;},key);await p.waitForTimeout(1500);s=await st();ok(k+' plays in fights',s.cur===key,s);await p.evaluate(()=>{UI.screen='plan';musTick();});await p.waitForTimeout(900);}
 await p.screenshot({path:'mus50.png'});ok('no page errors',!errs.length,errs);await b.close();})();

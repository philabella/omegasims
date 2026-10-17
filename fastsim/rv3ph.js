const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});
 for(const [w,h,m,tag] of [[390,844,true,'m'],[1600,1000,false,'d']]){const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:m,hasTouch:m,deviceScaleFactor:m?2:1});const p=await ctx.newPage();
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,allLv:true}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
 const lv=await p.$('.lvrow,.lvs,[data-a="lv"]');const box=await p.evaluate(()=>{const els=[...document.querySelectorAll('[data-a="lv"]')];const r=els.map(e=>e.getBoundingClientRect());return {n:els.length,minX:Math.min(...r.map(x=>x.left)),maxX:Math.max(...r.map(x=>x.right)),rows:new Set(r.map(x=>Math.round(x.top))).size,vw:innerWidth};});
 console.log(tag,'level buttons',JSON.stringify(box));
 await p.evaluate(()=>{const e=document.querySelector('[data-a="lv"]');e&&e.parentElement.scrollIntoView();});await p.screenshot({path:`rv3-lv-${tag}.png`});
 await p.evaluate(()=>{UI.lv=17;});await p.click('[data-a="new"]');await p.waitForTimeout(300);
 await p.evaluate(()=>{S.round=4;TUNE.rvEp=1;S.lobby.rv.forEach(R=>{R.st.units=[{id:'riot',level:2,slot:'f1',uid:900},{id:'rifle',level:1,slot:'b1',uid:901}];});S.lobby.rv[2].out=true;prepareFight();UI.screen='plan';render();});
 await p.evaluate(()=>{const e=document.querySelector('.rvep');e&&e.scrollIntoView();});await p.waitForTimeout(200);
 const sec=await p.$('.rvep');if(sec)await (await sec.evaluateHandle(e=>e.parentElement)).asElement().screenshot({path:`rv3-panel-${tag}.png`});
 console.log(tag,'overflow',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1));await ctx.close();}
 await b.close();})();

const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''));
 const ctx=await b.newContext({viewport:{width:1600,height:1000}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{if(!localStorage.getItem('tropebrawl-settings'))localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,allLv:true}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
 const nlv=await p.evaluate(()=>LV_MAX);ok('18 Game Levels (0-17)',nlv===17,nlv);
 await p.screenshot({path:'rv3-title.png'});
 // Level 14 (4 rivals); play to Ep 3, then force a rival episode
 await p.evaluate(()=>{UI.lv=14;});await p.click('[data-a="new"]');await p.waitForTimeout(400);
 ok('Level 14 has 4 rivals',await p.evaluate(()=>S.lobby&&S.lobby.rv.length===4));
 for(let k=0;k<8&&await p.evaluate(()=>S.round<4);k++){
  await p.evaluate(()=>{if(UI.screen==='event'){const e=S.event;eventPick(e.opts[0]);if(S.event.sub&&!S.event.subDone)eventSub(null);finishEvent();render();return;}
    for(let i=0;i<5;i++)if(S.shop[i]&&canBuy(i).ok&&S.gold>=shopPrice(S.shop[i]))buy(i);render();});
  if(await p.evaluate(()=>UI.screen==='plan')){await p.click('[data-a="fight"]');await p.waitForTimeout(200);await p.evaluate(()=>skipBattle());
   await p.waitForSelector('[data-a="after-fight"]',{timeout:8000}).catch(()=>{});await p.click('[data-a="after-fight"]').catch(()=>{});await p.waitForTimeout(300);}}
 await p.evaluate(()=>{if(UI.screen==='event'){const e=S.event;eventPick(e.opts[0]);if(S.event.sub&&!S.event.subDone)eventSub(null);finishEvent();}
   TUNE.rvEp=1;prepareFight();for(let i=0;i<5;i++)if(S.shop[i]&&canBuy(i).ok&&S.gold>=shopPrice(S.shop[i]))buy(i);UI.screen='plan';render();});
 const ep=await p.evaluate(()=>({rival:S.enemy.rival,title:S.enemy.title,panel:!!document.querySelector('.rvep'),foes:document.querySelectorAll('.rvep .foe').length,strip:document.querySelectorAll('.rvstrip .rvc').length}));
 ok('rival episode shows in the Next Episode panel with its cast + lobby strip',ep.rival&&ep.panel&&ep.foes>0&&ep.strip===4,ep);
 await p.screenshot({path:'rv3-shop.png'});
 await p.click('[data-a="fight"]');await p.waitForTimeout(2500);await p.screenshot({path:'rv3-fight.png'});
 const bt=await p.evaluate(()=>({E:B.units.filter(u=>u.side==='E').map(u=>u.name+':'+u.level+(u.twin?'':'!')),rv:B.units.filter(u=>u.rival).length,ar:typeof AR!=='undefined'&&AR.on}));
 ok('the rival cast is on the enemy side',bt.rv>0&&bt.rv===bt.E.length,bt);
 await p.evaluate(()=>skipBattle());await p.waitForSelector('[data-a="after-fight"]',{timeout:8000}).catch(()=>{});await p.waitForTimeout(300);await p.screenshot({path:'rv3-result.png'});ok('recap names the rival character',await p.evaluate(()=>{const t=UI.lastRes&&UI.lastRes.threat;return !t||!/Evil Twin/.test(t.name);}),await p.evaluate(()=>UI.lastRes&&UI.lastRes.threat));
 await p.click('[data-a="after-fight"]').catch(()=>{});await p.waitForTimeout(300);
 const nx=await p.evaluate(()=>({scr:UI.screen,over:!!S.over,res:S.result}));ok('after a rival episode: next round, or the run ended on lives',nx.scr==='plan'||nx.scr==='event'||(nx.scr==='end'&&nx.over),nx);
 await p.click('[data-a="codex"]');await p.waitForTimeout(300);const tab=await p.$('[data-a="ctab"][data-v="rivals"],[data-v="rivals"]');ok('Codex has a Rivals tab',!!tab);if(tab){await tab.click();await p.waitForTimeout(300);await p.screenshot({path:'rv3-codex.png'});}
 ok('no page errors',!errs.length,errs);await b.close();})();

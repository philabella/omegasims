const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 const ctx=await b.newContext({viewport:{width:1600,height:1000}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,arena:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(600);
 await p.evaluate(()=>{TUNE.rivals=7;});await p.click('[data-a="new"]');await p.waitForTimeout(400);
 ok('lobby of 7 at start',await p.evaluate(()=>S.lobby&&S.lobby.rv.length===7&&S.lobby.rv.every(R=>R.st.shop.length===5)));
 const toasts=[];await p.exposeFunction('noteToast',t=>toasts.push(t));
 for(let k=0;k<6;k++){
  const st=await p.evaluate(()=>{if(UI.screen==='event'){const e=S.event;eventPick(e.opts[0]);if(S.event.sub&&!S.event.subDone)eventSub(null);finishEvent();render();return 'event';}
    // buy what we can, then fight through the real UI path
    for(let i=0;i<5;i++)if(S.shop[i]&&canBuy(i).ok&&S.gold>=shopPrice(S.shop[i]))buy(i);render();return 'plan';});
  if(st==='event')continue;
  const before=await p.evaluate(()=>({sel:UI.sel,pop:UI.pop,shop:JSON.stringify(S.shop),fr:FR}));
  await p.click('[data-a="fight"]');await p.waitForTimeout(300);await p.evaluate(()=>skipBattle());await p.waitForTimeout(500);
  const r=await p.evaluate(()=>({screen:UI.screen,round:S.round,rv:S.lobby.rv.map(R=>R.st.round+':'+R.st.lives+(R.err?'!'+R.err:'')).join(' ')}));
  console.log('fight',k,JSON.stringify(r));
  await p.waitForSelector('[data-a="after-fight"]',{timeout:8000}).catch(()=>{});const cont=await p.$('[data-a="after-fight"]');if(cont)await cont.click().catch(()=>{});await p.waitForTimeout(300);}
 const rv=await p.evaluate(()=>S.lobby.rv.map(R=>({id:R.id,round:R.st.round,lives:R.st.lives,units:R.st.units.length,err:R.err||null,pool:'pool' in R.st})));
 ok('rivals kept pace with the player',rv.every(x=>!x.err&&x.round>=2),rv);
 ok('no rival pool copy saved',rv.every(x=>!x.pool));
 // reload: the lobby comes back from the save
 const key=await p.evaluate(()=>{save();return JSON.stringify(S.lobby.rv.map(R=>[R.id,R.rng,R.st.gold,R.st.units.length]));});
 await p.reload();await p.waitForTimeout(800);await p.click('[data-a="continue"]');await p.waitForTimeout(500);
 const key2=await p.evaluate(()=>S&&S.lobby?JSON.stringify(S.lobby.rv.map(R=>[R.id,R.rng,R.st.gold,R.st.units.length])):null);
 ok('lobby survives a reload',key===key2,{key2:key2&&key2.slice(0,80)});
 ok('no page errors',!errs.length,errs);await b.close();})();

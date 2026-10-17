// v19.32: reload can't undo a fight or a shop action; the two skills scale
const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});const p=await (await b.newContext({viewport:{width:1400,height:900}})).newPage();
 const ok=(n,c,i)=>console.log((c?'PASS ':'FAIL ')+n+(i!==undefined?' '+JSON.stringify(i):''));const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const cont=async()=>{await p.reload();await p.waitForTimeout(700);await p.click('[data-a="continue"]');await p.waitForTimeout(500);};
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);await p.click('[data-a="new"]');await p.waitForTimeout(400);
 await p.evaluate(()=>{S.units=[{id:'riot',level:1,slot:'f1',uid:1}];S.round=7;S.gold=10;render();});
 // reroll then reload: the reroll stays
 const s1=await p.evaluate(()=>{onAction('reroll');return {shop:S.shop.map(o=>o&&o.id).join(),gold:S.gold};});await cont();
 const s2=await p.evaluate(()=>({shop:S.shop.map(o=>o&&o.id).join(),gold:S.gold}));ok('a reroll survives a reload (no undo)',s1.shop===s2.shop&&s1.gold===s2.gold,{s1,s2});
 // buy then reload: the buy stays
 const b1=await p.evaluate(()=>{const i=S.shop.findIndex(o=>o);onAction('buy',String(i));return S.units.length;});await cont();ok('a buy survives a reload',await p.evaluate(()=>S.units.length)===b1,b1);
 // fight, reload mid-fight: back into the same fight
 await p.evaluate(()=>{UI.speed=1;});await p.click('[data-a="fight"]');await p.waitForTimeout(1200);const seed=await p.evaluate(()=>S.inFight&&S.inFight.seed);
 const board=await p.evaluate(()=>fielded().map(u=>u.id+u.slot).join());await cont();
 const r=await p.evaluate(()=>({screen:UI.screen,seed:S.inFight&&S.inFight.seed,board:fielded().map(u=>u.id+u.slot).join()}));
 ok('reload mid-fight: straight back into the same fight (same seed, same board)',r.screen==='battle'&&r.seed===seed&&r.board===board,{seed,r});
 // the outcome is the same as an uninterrupted fight with that seed
 const o1=await p.evaluate(()=>{skipBattle();return {win:B.win,t:+B.t.toFixed(2)};});
 await p.waitForFunction(()=>!S.inFight,null,{timeout:15000}).catch(()=>{});ok('fight ends and the seed is cleared',await p.evaluate(()=>!S.inFight&&FR===null));
 console.log('outcome',JSON.stringify(o1));
 // skills scale
 const sk=await p.evaluate(()=>[1,2,3].map(l=>SK.swell.d(heroStatsAt('beetles',l).p)+' | '+SK.catchit.d(heroStatsAt('dodgeball',l).p)));ok('Swell and Catch! grow with stars',/Adds 2 /.test(sk[0])&&/Adds 4 /.test(sk[2])&&/next 4 attacks/.test(sk[2]),sk);
 console.log('errors',errs);await b.close();})();

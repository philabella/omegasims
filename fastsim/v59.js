const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''));
 const p=await b.newPage({viewport:{width:1400,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);await p.click('[data-a="new"]');await p.waitForTimeout(400);
 const r=await p.evaluate(()=>{const out={};if(typeof TUNE.ghOn!=='undefined')TUNE.ghOn=0; // v19.67: Reruns are ghost casts, not monster lineups (v67.js covers them)
const r0=S.round;
   for(let a=1;a<=4;a++){const seen=new Set(),str=[],seq=[];const rr=SCHEDULE.findIndex(x=>x.act===a&&x.type==='fight'&&!(a===1&&SCHEDULE.indexOf(x)<2))+1;
     for(let i=0;i<40;i++){S.round=rr;S.part=1;prepareFight();const e=S.enemy;seen.add(e.tpl+'|'+e.enc.map(x=>x.row[0]+x.col).join(''));seq.push(e.tpl);
       const st=tplStrength(e.enc.filter(x=>!x.extra))*e.norm*e.norm;str.push(st/ACT_REF[a]);}
     const firstTen=new Set(seq.slice(0,10)).size;
     const br=SCHEDULE.findIndex(x=>x.act===a&&x.type==='boss')+1,bs=new Set();for(let i=0;i<6;i++){S.round=br;S.part=1;prepareFight();bs.add(S.enemy.tpl);}
     out[a]={variants:seen.size,firstTenDistinct:firstTen,strMin:Math.min(...str).toFixed(3),strMax:Math.max(...str).toFixed(3),bosses:bs.size};}
   S.round=r0;return out;});
 ok('10 lineups per act, no repeats within the first 10, mirrored variants, 3 boss lineups',Object.values(r).every(x=>x.firstTenDistinct===10&&x.variants>12&&x.bosses===3),r);
 ok('every lineup scaled to the act strength (same difficulty)',Object.values(r).every(x=>+x.strMin>.999&&+x.strMax<1.001),r);
 await p.evaluate(()=>{UI.screen='codex';UI.codexTab='enemies';render();});await p.waitForTimeout(200);
 const cx=await p.evaluate(()=>document.querySelectorAll('#app .ccard').length);ok('Codex enemies tab renders',cx>=20,cx);
 await p.evaluate(()=>{UI.screen='plan';S.units=[{id:'riot',level:1,slot:'f1',uid:1}];render();});await p.click('[data-a="fight"]');await p.waitForTimeout(1500);await p.evaluate(()=>skipBattle());await p.waitForTimeout(500);
 ok('no page errors',!errs.length,errs);await b.close();})();

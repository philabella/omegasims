// spike: can a rival fight the same episode enemy off-screen with the real engine, without touching the player's run?
const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});
 const p=await (await b.newContext({viewport:{width:1600,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(600);await p.click('[data-a="new"]');await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{
  const before=JSON.stringify(S),fr0=FR,ids=Object.keys(HERO).filter(k=>HERO[k].tier<=2);
  const mkRival=(i)=>{const R=JSON.parse(before);R.units=[0,1,2,3,4,5].map(j=>({id:ids[(i*7+j*3)%ids.length],level:1+(j%2),slot:['f0','f1','f2','b0','b1','b2'][j],uid:1000+i*10+j}));R.trinkets=[];R.legends=[];R.legend=null;R.gold=10;R.inFight=null;return R;};
  const out=[];const t0=performance.now();
  for(let k=0;k<7;k++){const keepS=S,keepB=B,keepFR=FR;let res=null,steps=0;
   try{S=mkRival(k);FR=(12345+k)|0;startBattle(true);while(!B.done&&steps++<20000)step(DT);res={win:B.win,t:+B.t.toFixed(1),steps,alive:B.units.filter(u=>u.alive).length};}
   catch(e){res={err:String(e).slice(0,140)};}
   finally{S=keepS;B=keepB;FR=keepFR;}out.push(res);}
  const ms=performance.now()-t0;return {ms:+ms.toFixed(1),out,intact:JSON.stringify(S)===before&&FR===fr0,enemy:S.enemy&&S.enemy.title};});
 console.log(JSON.stringify(r,null,1));console.log('errors',errs);
 await p.click('[data-a="fight"]');await p.waitForTimeout(800);console.log('player fight still starts',await p.evaluate(()=>!!B&&B.units.length>0&&!B.silent));await b.close();})();

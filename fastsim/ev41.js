const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});
 const p=await (await b.newContext({viewport:{width:1400,height:900}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,anim:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);await p.click('[data-a="new"]');await p.waitForTimeout(300);
 await p.evaluate(()=>{S.units=[{id:'riot',level:2,slot:'f1',uid:1},{id:'gunslinger',level:2,slot:'f0',uid:2},{id:'rifle',level:1,slot:'b1',uid:3},{id:'deputy',level:1,slot:'b0',uid:4}];S.gold=30;S.trinkets=['kevlar','coin'];S.tlv={kevlar:2,coin:1};});
 const texts={};
 for(const [k,round] of [['review',3],['review',24],['strike',3],['strike',24],['props',10],['insurance',10],['craft',5],['cameo',5],['reboot',5]]){
   const t=await p.evaluate(([k,r])=>{S.round=r;startSpecial(k);UI.screen='event';render();return document.querySelector('.screen,section,main,body').innerText.replace(/\s+/g,' ').match(/(−🪙\d+|🪙\d+|\+🪙\d+|−\d lives|written out|Write out|5 shop rerolls|merch|sell value)[^.]*\./g)||[];},[k,round]);
   texts[k+'@'+round]=t.slice(0,4);}
 console.log(JSON.stringify(texts,null,1));
 ok('Act 1 review costs 🪙6, Act 4 🪙12 / 3 lives',JSON.stringify(texts['review@3']).includes('🪙6')&&JSON.stringify(texts['review@24']).includes('🪙12')&&JSON.stringify(texts['review@24']).includes('−3 lives'));
 ok('strike: write out your star with sell value',JSON.stringify(texts['strike@3']).includes('sell value'));
 // the strike choice really removes the best character and pays its sell value
 const r=await p.evaluate(()=>{S.round=3;startSpecial('strike');const best=bestOnBoard(),v=sellValue(best),g=S.gold;eventSub('cut1');return {gone:!S.units.includes(best),paid:S.gold-g===v,name:HERO[best.id].name,v};});
 ok('strike write-out removes the best character and pays its sell value',r.gone&&r.paid,r);
 const c=await p.evaluate(()=>{S.round=24;startSpecial('review');const g=S.gold;eventSub('pr');return g-S.gold;});ok('Act 4 PR firm charges 12',c===12,c);
 ok('Lucky Coin ★★ = +2, item renamed',await p.evaluate(()=>TR.coin.d.includes('+1 / +2 / +3')&&TR.extras.name==='Background Extras'));
 console.log('errors',JSON.stringify(errs));await b.close();})();

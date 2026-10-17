const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''));
 const p=await b.newPage({viewport:{width:1600,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);await p.click('[data-a="new"]');await p.waitForTimeout(400);
 const r=await p.evaluate(()=>{S.rank=5;const out={};
   S.units=[{id:'riot',level:1,slot:'f1',uid:1},{id:'rifle',level:1,slot:'b1',uid:2},{id:'commando',level:1,slot:'b2',uid:3}];let n=0,tcN=0;
   for(let k=0;k<200;k++){rollShop();S.shop.slice(0,2).forEach(o=>{if(o&&HERO[o.id].genre==='army')n++;if(o&&o.tc)tcN++;});}
   out.mono={armyInFirst2:n,tagged:tcN,tc:typecast()};
   S.units.push({id:'tanks',level:1,slot:'f2',uid:4});let m=0;for(let k=0;k<200;k++){rollShop();if(S.shop.some(o=>o&&o.tc))m++;}out.mixed={tagged:m,tc:typecast()};
   S.units=[{id:'riot',level:1,slot:'f1',uid:1},{id:'rifle',level:1,slot:'b1',uid:2},{id:'commando',level:1,slot:'b2',uid:3}];rollShop();render();
   out.tag=document.querySelectorAll('.scard .tctag').length;return out;});
 ok('all-Army board: the round-start shop has 1 Army card tagged Typecast',r.mono.armyInFirst2>=200&&r.mono.tagged===200&&r.mono.tc==='army'&&r.tag===1,r);
 ok('mixed board: no Typecast cards',r.mixed.tagged===0&&r.mixed.tc===null,r.mixed);
 await p.screenshot({path:'v61-typecast.png',clip:{x:0,y:820,width:1600,height:180}});
 ok('no page errors',!errs.length,errs);await b.close();})();

const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const [W,H,tag]=[+(process.argv[3]||1600),+(process.argv[4]||1000),process.argv[5]||'d'];
 const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);await p.click('[data-a="new"]');await p.waitForTimeout(300);
 await p.evaluate(()=>{S.units=[{id:'riot',level:1,slot:'f1',uid:1},{id:'rifle',level:1,slot:'b1',uid:2},{id:'gunslinger',level:2,slot:'n0',uid:3},{id:'sheriff',level:1,slot:'n1',uid:4},{id:'zombies',level:1,slot:'n2',uid:5}];S.trinkets=['understudy'];S.tlv={understudy:2};render();});
 await p.evaluate(()=>{AR.keep=true;UI.speed=1;});await p.click('[data-a="fight"]');await p.waitForTimeout(1500);await p.evaluate(()=>{B.paused=true;});await p.waitForTimeout(400);
 const r=await p.evaluate(()=>{const el=document.getElementById('bbq');return {shown:el&&!el.hidden,cards:el?el.querySelectorAll('.slot.bq').length:0,tags:el?[...el.querySelectorAll('.bqtag')].map(t=>t.textContent):[],lbl:el?(el.querySelector('.bqlbl')||{}).textContent:'',imgs:el?el.querySelectorAll('img,canvas').length:0,oldText:document.getElementById('bbench').hidden};});
 ok('battle bench cards shown',r.shown&&r.cards===3&&r.imgs>=3&&r.oldText,r);
 await p.screenshot({path:`bench42-${tag}.png`});
 // a bench character steps in: its card leaves the row
 const r2=await p.evaluate(()=>{B.paused=false;const u=B.units.find(x=>x.side==='A'&&x.alive&&!x.under);kill(u);for(let i=0;i<30;i++)step(DT);drawBattle();const el=document.getElementById('bbq');return {cards:el.querySelectorAll('.slot.bq').length,lbl:el.querySelector('.bqlbl').textContent};});
 ok('after a step-in the bench updates',r2.cards===2,r2);
 console.log('errors',JSON.stringify(errs));await b.close();})();

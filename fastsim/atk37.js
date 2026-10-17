const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const p=await (await b.newContext({viewport:{width:1400,height:900}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({arena:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);await p.click('[data-a="new"]');await p.waitForTimeout(300);
 await p.evaluate(()=>{S.units=[{id:'rifle',level:1,slot:'b1',uid:1},{id:'riot',level:1,slot:'f1',uid:2}];render();});
 await p.click('[data-a="fight"]');await p.evaluate(()=>{B.paused=true;});
 // let the flipbooks for the fight get drawn, then check the picker on a simulated clock
 await p.waitForFunction(()=>!TBA.busy&&!TBA.want.size,null,{timeout:900000,polling:2000});
 const r=await p.evaluate(()=>{const u=B.units.find(x=>x.side==='A'&&x.el&&x.el.querySelector('img'));const img=u.el.querySelector('img');const key=img._tbk;
   const pn=performance.now.bind(performance);let fake=pn()+1000;performance.now=()=>fake;TBA.busy=true;
   u.atkT=fake;u.atkK=tbaAtkKind(u);const res={key,kind:u.atkK,atk:0,death:0};const atk=TBA.cache.get(key+'|'+u.atkK)||[],dth=TBA.cache.get(key+'|death')||[];
   for(let i=0;i<20;i++){fake+=16;tbaTick();if(atk.includes(img._cur))res.atk++;}
   u.alive=false;u._dt=0;for(let i=0;i<40;i++){fake+=16;tbaTick();if(dth.includes(img._cur))res.death++;}u.alive=true;
   performance.now=pn;TBA.busy=false;res.nAtk=atk.length;res.nDeath=dth.length;return res;});
 ok('attack move plays on the flat board',r.atk>0,r);ok('knocked-out fall plays on the flat board',r.death>0,r);
 console.log('errors',JSON.stringify(errs));await b.close();})();

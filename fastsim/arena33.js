const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const W=+(process.argv[3]||1600),Hh=+(process.argv[4]||1000),tag=process.argv[5]||'d';
 const p=await (await b.newContext({viewport:{width:W,height:Hh}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);await p.click('[data-a="new"]');await p.waitForTimeout(400);
 await p.evaluate(()=>{S.units=[{id:'riot',level:2,slot:'f1',uid:1},{id:'zombies',level:1,slot:'f0',uid:2},{id:'rifle',level:1,slot:'b1',uid:3},{id:'gunslinger',level:1,slot:'b0',uid:4},{id:'bonedragon',level:1,slot:'f2',uid:5}];render();});
 await p.evaluate(()=>{UI.speed=1;AR.keep=true;});await p.click('[data-a="fight"]');
 for(const t of [700,2200,4200]){await p.waitForTimeout(t===700?700:1500);await p.screenshot({path:`arena-${tag}-${t}.png`});}
 console.log(JSON.stringify(await p.evaluate(()=>({ar:!!AR.f,dead:AR.dead,why:AR.why,toys:AR.toys.length,t3d:document.querySelectorAll('.unit.t3d').length,units:B.units.length,cv:!!document.querySelector('#field .arena3d'),proj:AR.proj.length,st:arStatus()}))));
 console.log('errors',JSON.stringify(errs.slice(0,5)));await b.close();})();

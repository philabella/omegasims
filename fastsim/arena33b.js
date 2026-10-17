const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const p=await (await b.newContext({viewport:{width:900,height:700}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);await p.click('[data-a="new"]');await p.waitForTimeout(400);
 const team=()=>p.evaluate(()=>{S.units=[{id:'riot',level:2,slot:'f1',uid:1},{id:'rifle',level:1,slot:'b1',uid:3},{id:'gunslinger',level:1,slot:'b0',uid:4},{id:'spitters',level:1,slot:'b2',uid:6}];render();});
 await team();await p.evaluate(()=>{AR.keep=true;UI.speed=4;});await p.click('[data-a="fight"]');
 let shots=0,maxToys=0;for(let i=0;i<120;i++){await p.waitForTimeout(250);const r=await p.evaluate(()=>({s:AR.proj.length,t:AR.toys.length,done:!B||B.done}));shots=Math.max(shots,r.s);maxToys=Math.max(maxToys,r.t);if(r.done)break;}
 ok('3D toys on the board',maxToys>=4,maxToys);ok('3D shots fly',shots>0,shots);
 ok('flat sprites hidden under toys',await p.evaluate(()=>[...document.querySelectorAll('#field .unit.t3d .spr')].every(e=>getComputedStyle(e).visibility==='hidden')));
 await p.waitForFunction(()=>UI.screen!=='battle'||document.querySelector('.sheet,.result,[data-a="next"]'),null,{timeout:20000}).catch(()=>{});
 await p.waitForTimeout(2500);
 await p.click('[data-a="after-fight"]').catch(()=>{});await p.waitForTimeout(800);
 for(let i=0;i<6&&await p.evaluate(()=>UI.screen!=='plan');i++){await p.evaluate(()=>{const c=document.querySelector('.sheet [data-a],[data-a="after-fight"],[data-a="pend"]');if(c)c.click();});await p.waitForTimeout(500);}
 const sc=await p.evaluate(()=>({screen:UI.screen,ar:!!AR.f,raf:!!AR.raf,toys:AR.toys.length}));ok('leaving the fight releases the arena',sc.screen!=='battle'&&!sc.ar&&!sc.raf&&!sc.toys,sc);
 if(sc.screen==='plan'){await p.click('[data-a="fight"]');await p.waitForTimeout(1500);
   const r=await p.evaluate(()=>({toys:AR.toys.length,withArt:B.units.filter(u=>u.el&&u.art).length,stale:AR.toys.filter(T=>!B.units.includes(T.u)).length}));ok('next fight: fresh toys, none left over',r.toys===r.withArt&&!r.stale,r);await p.evaluate(()=>skipBattle());}
 // a fresh run with Settings -> flat board
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);await p.click('[data-a="new"]');await p.waitForTimeout(400);
 await p.evaluate(()=>{SET.arena=false;AR.keep=true;UI.speed=1;});await team();await p.waitForTimeout(300);await p.click('[data-a="fight"]').catch(e=>console.log('nofight',e.message.slice(0,80)));await p.waitForTimeout(1200);
 ok('arena off: flat board, sprites visible',await p.evaluate(()=>!AR.f&&!document.querySelector('#field .arena3d')&&!document.querySelector('#field.arena')&&[...document.querySelectorAll('#field .unit .spr')].some(e=>getComputedStyle(e).visibility!=='hidden')),await p.evaluate(()=>arStatus()));
 await p.evaluate(()=>{SET.arena=true;});await p.waitForTimeout(800);
 ok('switched back on mid-fight: arena returns',await p.evaluate(()=>!!AR.f&&AR.toys.length>0));
 await p.evaluate(()=>{SET.anim=false;applyMotion();});await p.waitForTimeout(600);
 ok('animations off: flat board',await p.evaluate(()=>!AR.f&&!document.querySelector('#field.arena')),await p.evaluate(()=>arStatus()));
 await p.evaluate(()=>{SET.anim=true;applyMotion();});await p.waitForTimeout(600);
 await p.evaluate(()=>skipBattle());await p.waitForTimeout(500);ok('skip still finishes the fight',await p.evaluate(()=>B.done));
 console.log('errors',JSON.stringify(errs));await b.close();})();

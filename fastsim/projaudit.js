const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const p=await (await b.newContext({viewport:{width:900,height:700}})).newPage();
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);await p.click('[data-a="new"]');await p.waitForTimeout(400);
 const r=await p.evaluate(()=>{const T=TRAITS,out={};for(const [id,h] of Object.entries(HERO)){const tr=T[h.trait]||{};out[id]=h.trait+'/'+(tr.range||'?')+' -> '+JSON.stringify(tbaProjFor({side:'A',id,genre:h.genre},null))+(BALLS[id]?' ball '+BALLS[id]:'');}return out;});
 for(const [k,v] of Object.entries(r))console.log(k.padEnd(12),v);
 // log every real projectile call in fights
 await p.evaluate(()=>{window.PL={};const o=projectile;globalThis.projectile=function(u,t,cls,glyph){const k=(u.side==='A'?u.id:'foe:'+(u.key||u.tid))+' glyph='+(glyph||'-')+' -> '+JSON.stringify(tbaProjFor(u,glyph));PL[k]=(PL[k]||0)+1;return o.apply(this,arguments);};});
 const teams=[['rifle','skelarch','spitters','gunslinger','pitcher','doc'],['lookouts','hacker','sheriff','waterboy','headcoach','qb'],['outlaws','bounty','noname','nurse','necro','observer'],['radio','fieldmed','queen','mascot','pointguard','dodgeball']];
 for(const tm of teams){await p.evaluate(tm=>{S.units=tm.map((id,i)=>({id,level:1,slot:(i<3?'f':'b')+(i%3),uid:i+1}));UI.screen='plan';delete S.inFight;render();},tm);await p.waitForTimeout(200);
   await p.evaluate(()=>{AR.keep=true;UI.speed=4;});await p.click('[data-a="fight"]');await p.waitForFunction(()=>B&&B.done,null,{timeout:120000}).catch(()=>{});
   await p.evaluate(()=>{const c=document.querySelector('[data-a="after-fight"]');});}
 console.log('---- shots seen in fights');console.log(JSON.stringify(await p.evaluate(()=>PL),null,1));await b.close();})();

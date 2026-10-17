const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''));
 for(const [w,h,m,tag] of [[1600,1000,false,'d'],[390,844,true,'m']]){
 const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:m,hasTouch:m,deviceScaleFactor:m?2:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{if(!localStorage.getItem('tropebrawl-settings'))localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,allLv:true}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
 if(tag==='d'){const lv=await p.evaluate(()=>({max:LV_MAX,ids:LEVELS.map(x=>x.id).join(','),tabs:CODEX_TABS.map(t=>t[0]).join(',')}));
   ok('rivals off: 10 Game Levels (18 since the v19.70 ladder), no Rivals tab',(lv.max===10&&!/rv/.test(lv.ids)||lv.max===18)&&!/rivals/.test(lv.tabs),lv);}
 await p.click('[data-a="new"]');await p.waitForTimeout(400);
 const a=await p.evaluate(()=>{UI.lv=10;S.rules=rulesFor(99);const lw=lobbyWanted();S.rank=5;S.gold=40;S.units=[];
   S.shop=[{id:'riot',level:1},{id:'rifle',level:1},{id:'commando',level:1},{id:'mecha',level:1},{id:'tanks',level:1}];UI.sel=null;render();
   const cards=[...document.querySelectorAll('.scard')].map(c=>({row:(c.querySelector('.rowg')||{}).className,rt:(c.querySelector('.rowg')||{}).title,trait:(c.querySelector('.tags svg.gi title')||{}).textContent,crowd:(c.querySelector('.crwg')||{}).title,gch:(c.querySelector('.gch')||{}).title,aim:(c.querySelector('.aimg')||{}).title}));
   return {lw,cards};});
 ok(tag+' lobbyWanted()=0 at every level',a.lw===0,a.lw);
 ok(tag+' shop cards: row marker front/front/dive/front/back with tooltips',a.cards.map(c=>(c.row||'').replace('rowg rp-','')).join()==='front,back,dive,front,back'&&a.cards.every(c=>c.rt&&c.trait&&c.gch&&c.aim),a.cards.map(c=>c.row));
 ok(tag+' crowd tooltip on Rifle Squad',!!a.cards[1].crowd,a.cards[1]);
 if(tag==='d')console.log('   sample tips:',JSON.stringify(a.cards[0]));
 await p.screenshot({path:`v56-shop-${tag}.png`});
 // the details sheet chip
 const ch=await p.evaluate(()=>{showInfo&&0;return heroDetail('commando',1).match(/chip rowp[^>]*>[^]*?<\/span>/)[0].replace(/<svg[^]*<\/svg>/,'[svg]');});
 ok(tag+' detail chip for a Stalker says Either row',/Either row/.test(ch),ch);
 await p.evaluate(()=>{S.units=[{id:'kingmonster',level:2,slot:'f0',uid:11},{id:'riot',level:2,slot:'f2',uid:12},{id:'commando',level:2,slot:'f3',uid:16},{id:'giantmoth',level:1,slot:'b0',uid:13},{id:'scientist',level:2,slot:'b2',uid:14},{id:'rifle',level:2,slot:'b3',uid:15}];S.rank=9;render();});
 await p.click('[data-a="fight"]');await p.waitForTimeout(2600);await p.evaluate(()=>{B.paused=true;});await p.waitForTimeout(250);
 const f=await p.evaluate(()=>{const c=document.querySelector('canvas.arena3d');const r=c&&c.getBoundingClientRect();const fb=getComputedStyle(document.getElementById('field'));
   return {cv:!!c,parent:c&&c.parentElement.tagName,x:r&&r.left,y:r&&r.top,w:r&&r.width,h:r&&r.height,vw:innerWidth,vh:innerHeight,ar3d:document.documentElement.classList.contains('ar3d'),fieldBg:fb.backgroundImage+'|'+fb.backgroundColor,why:typeof arStatus==='function'?arStatus():''};});
 ok(tag+' battle: 3D canvas covers the whole window, field box transparent',f.cv&&f.x===0&&f.y===0&&Math.abs(f.w-f.vw)<2&&Math.abs(f.h-f.vh)<2&&f.ar3d&&/none/.test(f.fieldBg),f);
 await p.screenshot({path:`v56-fight-${tag}.png`});
 const wb=await p.evaluate(()=>{const u=B.units.find(x=>x.id==='kingmonster');const e=u.el.getBoundingClientRect(),s0=document.querySelector(`#field .bslot[data-k="A${u.row[0]}${u.col}"]`).getBoundingClientRect(),s1=document.querySelector(`#field .bslot[data-k="A${u.row[0]}${u.col+1}"]`).getBoundingClientRect(),hb=u.el.querySelector('.hpb').getBoundingClientRect();
   return {el:[Math.round(e.left),Math.round(e.right)],s0:[Math.round(s0.left),Math.round(s0.right)],s1:[Math.round(s1.left),Math.round(s1.right)],hp:[Math.round(hb.left),Math.round(hb.right)]};});
 ok(tag+' 3D: giant card + health bar span both squares',Math.abs(wb.el[0]-wb.s0[0])<3&&Math.abs(wb.el[1]-wb.s1[1])<3&&wb.hp[1]>wb.s1[0]+(wb.s1[1]-wb.s1[0])*.6,wb);
 await p.screenshot({path:`v56-bars-${tag}.png`,clip:{x:Math.max(0,wb.s0[0]-40),y:0,width:Math.min(600,(tag==='d'?1600:980)-Math.max(0,wb.s0[0]-40)),height:tag==='d'?1000:900}});
 await p.evaluate(()=>{B.paused=false;skipBattle();});await p.waitForTimeout(900);
 await p.screenshot({path:`v56-result-${tag}.png`});
 const ov=await p.evaluate(()=>{const o=document.querySelector('.overlay [data-a="after-fight"]');if(!o)return {none:true};const r=o.getBoundingClientRect();const top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {hit:o===top||o.contains(top),cls:top&&top.className};});
 ok(tag+' result overlay button is on top and clickable',ov.hit,ov);
 if(ov.hit){await p.click('.overlay [data-a="after-fight"]');await p.waitForTimeout(500);}
 const after=await p.evaluate(()=>({scr:UI.screen,cv:!!document.querySelector('canvas.arena3d'),ar3d:document.documentElement.classList.contains('ar3d')}));
 ok(tag+' back in the shop: stage canvas and class removed',after.scr!=='battle'&&!after.cv&&!after.ar3d,after);
 if(tag==='d'){await p.evaluate(()=>{SET.arena=false;S.units=[{id:'kingmonster',level:2,slot:'f0',uid:11},{id:'riot',level:2,slot:'f2',uid:12}];render();});await p.click('[data-a="fight"]');await p.waitForTimeout(1200);await p.evaluate(()=>{B.paused=true;});await p.waitForTimeout(200);
  const fb=await p.evaluate(()=>{const u=B.units.find(x=>x.id==='kingmonster');const e=u.el.getBoundingClientRect(),s1=document.querySelector(`#field .bslot[data-k="A${u.row[0]}${u.col+1}"]`).getBoundingClientRect();return {e:Math.round(e.right),s1:Math.round(s1.right),ar:!!document.querySelector('canvas.arena3d')};});
  ok('flat board: giant card spans both squares',!fb.ar&&Math.abs(fb.e-fb.s1)<3,fb);await p.screenshot({path:'v56-flat-d.png'});await p.evaluate(()=>{B.paused=false;skipBattle();SET.arena=true;});await p.waitForTimeout(500);}
 ok(tag+' no page errors',!errs.length,errs);await ctx.close();}
 await b.close();})();

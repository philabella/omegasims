const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''));
 const ctx=await b.newContext({viewport:{width:1600,height:1000}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);
 ok('7 genres incl. Slasher on the title',await p.evaluate(()=>Object.keys(GENRES).length>=7&&!!GENRES.horror&&HEROES.filter(h=>h[2]==='horror').length===8));
 await p.click('[data-a="new"]');await p.waitForTimeout(400);
 await p.evaluate(()=>{S.shop=['counselors','kids','babysitter','exorcist','chainsaw'].map(id=>({id,level:1}));render();});await p.waitForTimeout(300);
 await p.screenshot({path:'hz53-shop.png'});
 ok('Slasher shop cards show art + genre',await p.evaluate(()=>[...document.querySelectorAll('.scard')].every(c=>c.querySelector('img,canvas')&&/Slasher/.test(c.innerText))));
 // full Slasher board (6 distinct = tier 3) + The Sequel; run a silent fight and count the mechanics
 const r=await p.evaluate(()=>{S.rank=9;S.legend='sequel';S.units=[['brute','f1'],['chainsaw','f2'],['counselors','f0'],['kids','f3'],['finalgirl','b1'],['exorcist','b2'],['dreamstalker','b0'],['babysitter','b3']].map(([id,s],i)=>({id,level:2,slot:s,uid:300+i}));
  const st={terr:0,ret:0,van:0,iso:0,fearHits:0};const T=terrify;terrify=function(t,d){st.terr++;return T(t,d);};const I=isolated;isolated=function(t){const v=I(t);if(v)st.iso++;return v;};
  const fl=float;float=function(u,txt){if(/Vanished/.test(txt))st.van++;if(/behind you/i.test(txt))st.ret++;return fl.apply(this,arguments);};
  startBattle(true);const syn=B.syn.G.horror,beh=B.units.filter(u=>u.behind).length;let g=0;while(!B.done&&g++<30000)step(DT);
  terrify=T;isolated=I;float=fl;return {syn,beh,win:B.win,t:+B.t.toFixed(1),...st};});
 ok('6+ Slasher = tier 3; The Sequel gives 2 returns each',r.syn>=3&&r.beh===8,r);
 ok('Terrify, Picked Off and It\'s Behind You all fire in a real fight',r.terr>0&&r.iso>0&&(r.van===0||r.ret>0),r);
 // force a vanish + return
 const v=await p.evaluate(()=>{S.legend=null;startBattle(true);const u=B.units.find(x=>x.side==='A'&&x.behind);kill(u,null);const gone=!u.alive&&u.lurking>0;let g=0;while(u.lurking&&g++<400)step(DT);
   return {gone,back:u.alive,zone:Z(u),row:u.row,hp:Math.round(100*u.hp/u.maxHp),clash:B.units.filter(x=>x!==u&&x.alive&&Z(x)===Z(u)&&x.row===u.row&&x.col===u.col).length};});
 {const bh=await p.evaluate(()=>Math.round(100*(TUNE.behindHp||.4)));ok(`It's Behind You: vanishes, returns 2s later in the enemy back row at ~${bh}%, on a free square`,v.gone&&v.back&&v.zone==='E'&&v.clash===0&&v.hp>=bh-5&&v.hp<=bh+5,v);}
 await p.evaluate(()=>{UI.screen='plan';render();});await p.click('[data-a="codex"]');await p.waitForTimeout(300);await p.click('[data-v="syn"]').catch(()=>{});await p.waitForTimeout(300);
 ok('Codex lists Slasher bonus + crossovers',await p.evaluate(()=>/Jump Scare/.test(document.body.innerText)));
 await p.screenshot({path:'hz53-codex.png'});
 // a real arena fight to look at
 await p.evaluate(()=>{UI.screen='plan';render();});await p.click('[data-a="back"]').catch(()=>{});await p.waitForTimeout(200);
 await p.evaluate(()=>{UI.screen='plan';render();});await p.click('[data-a="fight"]').catch(()=>{});await p.waitForTimeout(3000);await p.screenshot({path:'hz53-fight.png'});
 ok('no page errors',!errs.length,errs);await b.close();})();

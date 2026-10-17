const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''));
 for(const [w,h,m,tag] of [[1600,1000,false,'d'],[390,844,true,'m']]){
 const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:m,hasTouch:m,deviceScaleFactor:m?2:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(700);await p.click('[data-a="new"]');await p.waitForTimeout(400);
 if(tag==='d'){
 ok('9 genres, 3 two-square giants',await p.evaluate(()=>Object.keys(GENRES).length===9&&HEROES.filter(x=>x[2]==='kaiju').length===8&&['giantmoth','mecha','kingmonster'].every(twoSlot)));
 // buying a giant at rank 1 (3 squares): it takes 2 of them
 const a=await p.evaluate(()=>{S.rank=1;S.gold=50;S.units=[];S.shop=[{id:'mecha',level:1},{id:'tanks',level:1},{id:'reporter',level:1},{id:'kingmonster',level:1},null];buy(0);const m1=S.units.find(u=>u.id==='mecha');
   buy(1);const t=S.units.find(u=>u.id==='tanks');buy(2);const r=S.units.find(u=>u.id==='reporter');render();
   return {mecha:m1.slot,count:fieldCount(),tanks:t.slot,reporter:r.slot,span:!!document.querySelector('.board .slot.wide2'),squares:document.querySelectorAll('.board .frow:not(.bench) .slot').length};});
 ok('a giant takes 2 board squares: 3-square board fits the giant + 1, the next goes to the bench; card spans 2 squares',a.count===3&&a.reporter[0]==='n'&&a.span&&a.squares===7,a);
 // move the giant into the last column: it lands on columns 2-3; whoever was there moves to where it came from
 const mv=await p.evaluate(()=>{S.rank=9;const t=S.units.find(u=>u.id==='tanks');const g=S.units.find(u=>u.id==='mecha');t.slot='f3';g.slot='f0';const okm=move('f0','f3');
   const clash=S.units.filter(u=>u.slot[0]!=='n').some((u,i,A)=>A.some(v=>v!==u&&(unitAt(v.slot)===u)));return {okm,g:g.slot,t:t.slot,clash};});
 ok('dragging a giant onto the last column puts it on columns 2-3 and swaps the tanks to its old square',mv.okm&&mv.g==='f2'&&mv.t==='f0'&&!mv.clash,mv);
 // board full: a giant can't join a board with only 1 free square
 const full=await p.evaluate(()=>{S.rank=4;S.units=[{id:'tanks',level:1,slot:'f0',uid:1},{id:'reporter',level:1,slot:'b1',uid:2},{id:'scientist',level:1,slot:'b2',uid:3},{id:'kingmonster',level:1,slot:'n0',uid:4}];const r=move('n0','f2');return {r,count:fieldCount(),bs:boardSize()};});
 ok('a giant cannot join when only 1 square is left',!full.r&&full.count===3,full);
 }
 // battle: two giants + small fry; arena shows them across 2 squares
 const bt=await p.evaluate(()=>{S.rank=9;S.units=[{id:'kingmonster',level:2,slot:'f0',uid:11},{id:'mecha',level:2,slot:'f2',uid:12},{id:'giantmoth',level:1,slot:'b0',uid:13},{id:'scientist',level:2,slot:'b2',uid:14},{id:'hunter',level:2,slot:'b3',uid:15}];render();
   return {count:fieldCount(),spans:document.querySelectorAll('.board .slot.wide2').length};});
 ok(tag+' two giants side by side in the front row + moth behind: 8 squares, 3 spanning cards',bt.count===8&&bt.spans===3,bt);
 await p.screenshot({path:`kj55-shop-${tag}.png`});
 await p.click('[data-a="fight"]');await p.waitForTimeout(2600);await p.evaluate(()=>{B.paused=true;});await p.waitForTimeout(200);await p.screenshot({path:`kj55-fight-${tag}.png`});
 const f=await p.evaluate(()=>({A:B.units.filter(u=>u.side==='A').map(u=>u.id+':'+u.row[0]+u.col+(u.wide?'W':'')+(u.sat?'SAT':'')).join(' '),roar:B.units.some(u=>u.side==='E'&&u.stun>0)||true}));
 ok(tag+' in battle: giants keep their columns, nobody sits out',!/SAT/.test(f.A)&&/kingmonster:f0W/.test(f.A)&&/mecha:f2W/.test(f.A),f);
 await p.evaluate(()=>{B.paused=false;skipBattle();});await p.waitForTimeout(400);
 ok(tag+' no page errors',!errs.length,errs);await ctx.close();}
 await b.close();})();

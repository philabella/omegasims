const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const [W,H,tag]=[+(process.argv[3]||1600),+(process.argv[4]||1000),process.argv[5]||'d'];
 const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);await p.click('[data-a="new"]');await p.waitForTimeout(300);
 await p.evaluate(()=>{S.units=[{id:'riot',level:1,slot:'f1',uid:1},{id:'lurker',level:1,slot:'b1',uid:2},{id:'rifle',level:1,slot:'b0',uid:3},{id:'gunslinger',level:2,slot:'n0',uid:4},{id:'sheriff',level:1,slot:'n2',uid:5}];S.trinkets=[];render();});
 await p.evaluate(()=>{AR.keep=true;UI.speed=1;});await p.click('[data-a="fight"]');await p.waitForTimeout(1200);await p.evaluate(()=>{B.paused=true;});await p.waitForTimeout(400);
 const r=await p.evaluate(()=>{const el=document.getElementById('bbq');return {shown:el&&!el.hidden,cards:el.querySelectorAll('.slot.bq:not(.empty)').length,empty:el.querySelectorAll('.slot.empty').length,lbl:el.querySelector('.bqlbl').textContent};});
 ok('bench shown with no Understudy (2 bench characters + 3 empty squares)',r.shown&&r.cards===2&&r.empty===3,r);
 await p.screenshot({path:`v44-${tag}.png`});
 // the Lurker tunnels into the enemy back row, then an enemy Snatch and Grab drags it forward
 const t=await p.evaluate(()=>{const lu=B.units.find(u=>u.id==='lurker');SK.tunnel.cast(lu);const tunneled=Z(lu)!==lu.side;
   const es=B.units.filter(u=>u.side==='E'&&u.alive&&u!==lu);es.forEach(u=>{u.row='back';u.col=9;});if(es[0]){es[0].row='front';es[0].col=0;}if(es[1]){es[1].row='front';es[1].col=2;}pullFront(lu);
   const clash=B.units.filter(u=>u.alive&&u!==lu&&Z(u)===Z(lu)&&u.row===lu.row&&u.col===lu.col).map(u=>u.name);
   return {tunneled,zone:Z(lu),row:lu.row,col:lu.col,clash};});
 ok('a tunnelled Lurker dragged by Snatch and Grab never lands on someone',t.tunneled&&!t.clash.length,t);
 console.log('errors',JSON.stringify(errs));await b.close();})();

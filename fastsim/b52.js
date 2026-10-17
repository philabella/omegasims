const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x).slice(0,260):''));
 const U=[['riot',2,'f0'],['commando',2,'f1'],['muscle',2,'f2'],['zombies',2,'f3'],['rifle',2,'b0'],['doc',2,'b1'],['skelarch',2,'b2'],['pitcher',2,'b3'],['deputy',1,'n0']];
 for(const [w,h,m,tag,arena] of [[1600,1000,false,'d',true],[390,844,true,'m',true],[1600,1000,false,'flat',false]]){
  const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:m,hasTouch:m,deviceScaleFactor:m?2:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(a=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,arena:a}));},arena);
  await p.goto('file://'+process.argv[2]);await p.waitForTimeout(600);await p.click('[data-a="new"]');await p.waitForTimeout(400);
  await p.evaluate(U=>{S.rank=9;S.units=U.map(([id,l,s],i)=>({id,level:l,slot:s,uid:100+i}));render();},U);await p.waitForTimeout(300);
  const st=await p.evaluate(()=>({bs:boardSize(),rmax:RMAX,f:fielded().length,slots:document.querySelectorAll('.board .frow:not(.bench) .slot').length}));
  ok(tag+' Rank 9 = 8 slots, board shows 8 squares',st.bs===8&&st.rmax===9&&st.f===8&&st.slots===8,st);
  await p.screenshot({path:`b52-shop-${tag}.png`});
  await p.click('[data-a="fight"]');await p.waitForTimeout(arena?2500:1200);await p.evaluate(()=>{B.paused=true;});await p.waitForTimeout(300);
  await p.screenshot({path:`b52-fight-${tag}.png`});
  const bt=await p.evaluate(()=>({A:B.units.filter(u=>u.side==='A').length,cols:[...new Set(B.units.filter(u=>u.side==='A').map(u=>u.col))].sort().join(''),ar:typeof AR!=='undefined'&&!!AR.on}));
  ok(tag+' all 8 fight, columns 0-3',bt.A>=8&&bt.cols==='0123',bt);
  if(tag==='d'){ // tunnel + pull into column 3 never lands on someone
    const t=await p.evaluate(()=>{const lu=B.units.find(u=>u.side==='A'&&u.alive);const res=[];for(let k=0;k<20;k++){const es=B.units.filter(u=>u.side==='E'&&u.alive);es.forEach((u,i)=>{u.row=i<3?'front':'back';u.col=i%4;});
      lu.zone='E';lu.row='back';lu.col=3;pullFront(lu);const clash=B.units.filter(u=>u.alive&&u!==lu&&Z(u)===Z(lu)&&u.row===lu.row&&u.col===lu.col).length;res.push(clash);lu.zone=null;}return res.reduce((a,b)=>a+b,0);});
    ok('pull into the 4-wide enemy side never lands on someone',t===0,t);}
  await p.evaluate(()=>{B.paused=false;skipBattle();});await p.waitForSelector('[data-a="after-fight"]',{timeout:8000}).catch(()=>{});await p.waitForTimeout(400);
  const see=await p.$('[data-a="foeteam"],[data-a="seeteam"],[data-a="theirteam"]');if(see&&tag==='d'){await see.click().catch(()=>{});await p.waitForTimeout(300);await p.screenshot({path:'b52-recap.png'});}
  ok(tag+' overflow-free',!(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)));ok(tag+' no page errors',!errs.length,errs);await ctx.close();}
 await b.close();})();

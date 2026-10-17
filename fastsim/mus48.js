const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--autoplay-policy=no-user-gesture-required']});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 const ctx=await b.newContext({viewport:{width:1400,height:900}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{if(!localStorage.getItem('tropebrawl-settings'))localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,music:true,sound:true}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);await p.mouse.click(700,450);await p.waitForTimeout(2500);
 const st=()=>p.evaluate(()=>({cur:MUS.cur,bufs:Object.keys(MUS.buf).sort(),ctx:SFX.ctx&&SFX.ctx.state,mus:SET.mus,len:MUS.src&&MUS.src.loopEnd-MUS.src.loopStart}));
 let s=await st();ok('default Showtime plays on the title, only 2 tracks decoded',s.cur==='shop_show'&&s.bufs.join()==='battle,shop_show',s);
 await p.click('[data-a="settings"]');await p.waitForTimeout(300);
 const row=await p.$('.musrow');ok('Shop music row in Settings',!!row);if(row)await row.screenshot({path:'mus48-row.png'});
 for(const [k,key] of [['heist','shop_heist'],['arcade','shop_arcade'],['backstage','shop']]){
  await p.click(`[data-a="mus"][data-v="${k}"]`);await p.waitForTimeout(2500);s=await st();
  ok(`${k} plays after switching (loop ${s.len&&s.len.toFixed(2)}s)`,s.cur===key&&s.mus===k&&s.bufs.includes(key),s);}
 await p.reload();await p.waitForTimeout(500);await p.mouse.click(700,450);await p.waitForTimeout(2500);s=await st();ok('choice survives reload',s.cur==='shop'&&s.mus==='backstage',s);
 ok('no page errors',!errs.length,errs);await b.close();})();

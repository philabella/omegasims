const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 for(const [w,h,tag,m] of [[1600,1000,'d',false],[390,844,'m',true]]){
 for(const bd of ['sun','swirl','curt','violet']){
  const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:m,isMobile:m});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await ctx.route('https://**',r=>r.fulfill({status:200,body:'{}'}));
  await p.addInitScript(bd=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,bd}));},bd);
  await p.goto('file://'+process.argv[2]);await p.waitForTimeout(1200);await p.screenshot({path:`bd46-${bd}-title-${tag}.png`});
  await p.click('[data-a="new"]');await p.waitForTimeout(1000);await p.screenshot({path:`bd46-${bd}-shop-${tag}.png`});
  const st=await p.evaluate(()=>({cls:document.documentElement.className,canvas:!!document.querySelector('#tbg canvas.bdsw'),raf:!!BDS.raf}));
  ok(`${tag} ${bd} class + swirl canvas only when chosen`,st.cls.includes('bd-'+bd)&&(bd==='swirl'?st.canvas&&st.raf:!st.raf),st);
  if(errs.length)ok(tag+' '+bd+' errors',false,errs);await ctx.close();}}
 // switching in Settings, then Glass stops the swirl
 const ctx=await b.newContext({viewport:{width:1600,height:1000}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
 ok('default is Sunburst',await p.evaluate(()=>SET.bd==='sun'&&document.documentElement.classList.contains('bd-sun')));
 await p.click('[data-a="settings"]').catch(()=>{});await p.waitForTimeout(300);
 const row=await p.$('.bdrow');ok('Backdrop row in Settings',!!row);if(row)await row.screenshot({path:'bd46-row.png'});
 await p.click('[data-a="bd"][data-v="swirl"]');await p.waitForTimeout(400);
 let s=await p.evaluate(()=>({bd:SET.bd,saved:JSON.parse(localStorage.getItem(SET_KEY)).bd,raf:!!BDS.raf,on:document.querySelector('[data-a="bd"][data-v="swirl"]').classList.contains('on')}));ok('switch to Swirl saves and starts',s.bd==='swirl'&&s.saved==='swirl'&&s.raf&&s.on,s);
 await p.click('[data-a="look"][data-v="glass"]');await p.waitForTimeout(300);ok('Glass stops the swirl',await p.evaluate(()=>!BDS.raf));
 await p.click('[data-a="look"][data-v="comic"]');await p.click('[data-a="bd"][data-v="curt"]');await p.waitForTimeout(300);ok('back to Comic + Curtains',await p.evaluate(()=>!BDS.raf&&document.documentElement.classList.contains('bd-curt')));
 console.log('errors',errs);await b.close();})();

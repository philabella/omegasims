const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 for(const [name,st,want] of [['fresh',null,'swirl'],['v19.46 auto-saved sun',{live:false,bd:'sun'},'swirl'],['picked curtains',{live:false,bd:'curt',bdPick:true},'curt']]){
  const ctx=await b.newContext({viewport:{width:1400,height:900}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(st=>{if(st)localStorage.setItem('tropebrawl-settings',JSON.stringify(st));},st);
  await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
  const r=await p.evaluate(()=>({bd:SET.bd,cls:document.documentElement.className,raf:!!BDS.raf}));ok(name+' -> '+want,r.bd===want&&r.cls.includes('bd-'+want)&&(want!=='swirl'||r.raf),r);
  if(name==='fresh'){await p.click('[data-a="settings"]');await p.waitForTimeout(200);await p.click('[data-a="bd"][data-v="sun"]');await p.reload();await p.waitForTimeout(600);ok('picking Sunburst sticks after reload',await p.evaluate(()=>SET.bd==='sun'));}
  if(errs.length)ok('errors',false,errs);await ctx.close();}
 await b.close();})();

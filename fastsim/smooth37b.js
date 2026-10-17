const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const p=await (await b.newContext({viewport:{width:1600,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);await p.click('[data-a="new"]');
 await p.waitForFunction(()=>[...document.querySelectorAll('.scard img')].some(i=>i._tbk&&(TBA.cache.get(i._tbk+'|idle')||[]).length),null,{timeout:400000,polling:1000});
 // the software GPU here is too slow to measure real frame rate, so drive the picker with a simulated clock (16 ms steps)
 const r=await p.evaluate(()=>{const img=[...document.querySelectorAll('.scard img')].find(i=>i._tbk&&(TBA.cache.get(i._tbk+'|idle')||[]).length);const n=TBA.cache.get(img._tbk+'|idle').length;
   const pn=performance.now.bind(performance);let fake=pn();performance.now=()=>fake;TBA.busy=true;let ch=0,last=img.src;const seen=new Set();
   for(let i=0;i<Math.round(1800/16);i++){fake+=16;tbaTick();if(img.src!==last){ch++;last=img.src;}seen.add(img.src);}performance.now=pn;TBA.busy=false;return {frames:n,changesIn1_8s:ch,distinct:seen.size,blob:img.src.startsWith('blob:')};});
 ok('idle loop: 32 frames, all shown over one loop (~18 a second, was 10 = 5.5 a second)',r.frames===32&&r.distinct>=30,r);
 // cap: stuff the cache past 600 frames and check old animations are dropped and freed
 const c=await p.evaluate(()=>{const fake=[];for(let i=0;i<30;i++)TBA.cache.set('zz'+i+'|dance',Array.from({length:24},()=>'blob:x'+i));(TBA.used||(TBA.used=new Map()));tbaTrim();let n=0;for(const f of TBA.cache.values())n+=f?f.length:0;return {frames:n,keys:TBA.cache.size};});
 ok('memory cap keeps frames at or under 600',c.frames<=600,c);
 console.log('errors',JSON.stringify(errs));await b.close();})();

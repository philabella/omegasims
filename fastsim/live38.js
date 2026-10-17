const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const W=+(process.argv[3]||1600),H=+(process.argv[4]||1000),tag=process.argv[5]||'d';
 const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const ok=(n,c,x)=>console.log((c?'PASS ':'FAIL ')+n+(x!==undefined?' '+JSON.stringify(x):''));
 await p.addInitScript(()=>{window.__keep=1;});
 await p.goto('file://'+process.argv[2]);await p.evaluate(()=>{LV3.keep=true;});await p.waitForTimeout(400);await p.click('[data-a="new"]');
 await p.waitForFunction(()=>document.querySelectorAll('.scard canvas.toylive').length>=5,null,{timeout:120000}).catch(()=>{});await p.waitForTimeout(1500);
 const s1=await p.evaluate(()=>{const cs=[...document.querySelectorAll('canvas.toylive')];const sig=c=>{const d=c.getContext('2d').getImageData(0,0,256,256).data;let a=0,h=0;for(let i=3;i<d.length;i+=4){a+=d[i]>0;h=(h*31+d[i-1]+d[i-2]*7)>>>0;}return [a,h];};
   return {n:cs.length,shop:document.querySelectorAll('.scard canvas.toylive').length,leftImgs:[...document.querySelectorAll('.scard img')].filter(i=>TBA.rev.get(i.getAttribute('src'))||i._tbk).length,sig:cs.map(sig),sameBox:(()=>{const c=cs[0];const r=c.getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)];})(),st:tlStatus()};});
 ok('shop toys are live canvases',s1.shop>=5&&s1.leftImgs===0,{n:s1.n,shop:s1.shop,left:s1.leftImgs,box:s1.sameBox,st:s1.st});
 ok('every live toy is drawn (not blank)',s1.sig.every(x=>x[0]>500),s1.sig.map(x=>x[0]));
 await p.waitForTimeout(900);
 const s2=await p.evaluate(()=>[...document.querySelectorAll('canvas.toylive')].map(c=>{const d=c.getContext('2d').getImageData(0,0,256,256).data;let h=0;for(let i=3;i<d.length;i+=4)h=(h*31+d[i-1]+d[i-2]*7)>>>0;return h;}));
 ok('toys move over time',s2.some((h,i)=>s1.sig[i]&&h!==s1.sig[i][1]));
 await p.screenshot({path:`live38-${tag}.png`});
 // after buying, the toy on the bench/board is live too
 await p.click('.scard').catch(()=>{});await p.waitForTimeout(1200);
 ok('bought toy on the board/bench is live',await p.evaluate(()=>document.querySelectorAll('canvas.toylive').length>0&&![...document.querySelectorAll('.slot img,.bench img')].some(i=>i._tbk&&i.isConnected)),await p.evaluate(()=>document.querySelectorAll('canvas.toylive').length));
 // switch off -> pictures come back; on again -> live again
 await p.evaluate(()=>{SET.live=false;});await p.waitForTimeout(500);
 ok('Settings off: pictures back, no live canvases',await p.evaluate(()=>!document.querySelector('canvas.toylive')&&[...document.querySelectorAll('.scard img')].length>0),await p.evaluate(()=>tlStatus()));
 await p.evaluate(()=>{SET.live=true;});await p.waitForTimeout(1500);
 ok('Settings on again: live again',await p.evaluate(()=>document.querySelectorAll('.scard canvas.toylive').length>0));
 await p.evaluate(()=>{SET.anim=false;applyMotion();});await p.waitForTimeout(600);
 ok('animations off: pictures back',await p.evaluate(()=>!document.querySelector('canvas.toylive')),await p.evaluate(()=>tlStatus()));
 await p.evaluate(()=>{SET.anim=true;applyMotion();});await p.waitForTimeout(1200);
 // a fight: the field is left to the arena, nothing live there; back in the shop it's live again
 await p.evaluate(()=>{AR.keep=true;UI.speed=4;});await p.click('[data-a="fight"]').catch(()=>{});await p.waitForTimeout(1500);
 ok('fight: no live canvases on the battle field',await p.evaluate(()=>!document.querySelector('#field canvas.toylive')));
 await p.evaluate(()=>skipBattle());await p.waitForTimeout(800);
 console.log('errors',JSON.stringify(errs));await b.close();})();

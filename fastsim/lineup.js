const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{}),args:['--use-gl=angle','--use-angle=swiftshader']});
 const [W,H,tag]=[+process.argv[3],+process.argv[4],process.argv[5]];const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);await p.click('[data-a="new"]');await p.waitForTimeout(400);
 await p.evaluate(()=>{S.units=[{id:'cheersquad',level:1,slot:'f0',uid:1},{id:'bonedragon',level:1,slot:'f1',uid:2},{id:'mascot',level:1,slot:'f2',uid:3},{id:'gunslinger',level:1,slot:'b0',uid:4},{id:'rifle',level:1,slot:'b1',uid:5},{id:'gravegolem',level:1,slot:'b2',uid:6}];render();});
 await p.evaluate(()=>{UI.speed=1;AR.keep=true;});await p.click('[data-a="fight"]');await p.waitForTimeout(1500);await p.evaluate(()=>{B.paused=true;});await p.waitForTimeout(600);
 await p.screenshot({path:`lineup-${tag}.png`});console.log(tag,JSON.stringify(errs));await b.close();})();

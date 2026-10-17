const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
(async()=>{const b=await chromium.launch({...(require('fs').existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome')?{executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}:{})});const p=await (await b.newContext({viewport:{width:1400,height:900}})).newPage();
 await p.addInitScript(()=>{localStorage.setItem('tropebrawl-settings',JSON.stringify({live:false,arena:false}));});
 await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);await p.click('[data-a="new"]');await p.waitForTimeout(300);
 await p.evaluate(()=>{S.units=[{id:'riot',level:2,slot:'f1',uid:1},{id:'rifle',level:2,slot:'b1',uid:2}];render();});
 await p.click('[data-a="fight"]');await p.waitForTimeout(500);const t0=await p.evaluate(()=>B.t);await p.waitForTimeout(4000);const t1=await p.evaluate(()=>B.t);
 console.log('battle seconds per real second at 1x:',((t1-t0)/4).toFixed(2),'rounds:',await p.evaluate(()=>SCHEDULE.length),'title says:',await p.evaluate(()=>lvDials(0)));await b.close();})();

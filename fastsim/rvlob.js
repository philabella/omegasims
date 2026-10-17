// player (sim bot curve7) in a Lv10 lobby with n rivals: win %, rival episodes per run, player win % in them
'use strict';const path=require('path');const { Engine, DEFAULT_BOTS } = require(process.argv[4]||'./engine');
const [build,N]=process.argv.slice(2);
for(const n of [3,7]){const eng=new Engine({build:path.resolve(build),scripts:[DEFAULT_BOTS],tune:{rivals:n}});
 const o=JSON.parse(eng.ev(String.raw`(function(N){let w=0,rvF=0,rvW=0;const s0=settle;settle=function(){const rv=!LOBBY.busy&&S.enemy&&S.enemy.rival;const r=s0.apply(this,arguments);if(rv){rvF++;if(r.win)rvW++;}return r;};
  for(let s=1;s<=N;s++){UI.lv=10;seeded=true;rngState=(s*7919+3)|0;__seedMath(__hseed('math',s,3));try{BOT.run('greedy',false,null,null,'curve7');}catch(e){}if(S.result==='win')w++;}
  return JSON.stringify({win:w/N,eps:rvF/N,winVs:rvF?rvW/rvF:null});})(${+N})`));
 console.log(`${path.basename(build)} rivals ${n}: player win ${(100*o.win).toFixed(1)}%  rival episodes/run ${o.eps.toFixed(2)}  player wins vs rival casts ${(100*o.winVs).toFixed(1)}%`);}

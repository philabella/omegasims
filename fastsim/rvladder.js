// win rate of the sim bot (as the player) at Game Levels 10-17 (0..7 rivals), for a pool-growth setting
//   node rvladder.js <build> <runs> '<poolPer json or null>' [policy=curve7]
'use strict';const path=require('path');const { Engine, DEFAULT_BOTS } = require('./engine');
const [build,N=60,PP='null',POL='curve7']=process.argv.slice(2);const pp=JSON.parse(PP);
const eng=new Engine({build:path.resolve(build),scripts:[DEFAULT_BOTS],tune:pp?{poolPer:pp}:{}});
const out=JSON.parse(eng.ev(String.raw`(function(N,POL){const res=[];for(let lv=10;lv<=17;lv++){let w=0,rnd=0,rvF=0,rvW=0;
  const s0=settle;settle=function(){const rv=!LOBBY.busy&&S.enemy&&S.enemy.rival;const r=s0.apply(this,arguments);if(rv){rvF++;if(r.win)rvW++;}return r;};
  for(let s=1;s<=N;s++){UI.lv=lv;seeded=true;rngState=(s*7919+lv)|0;__seedMath(__hseed('math',s,lv));try{BOT.run('greedy',false,null,null,POL);}catch(e){}if(S.result==='win')w++;rnd+=S.round;}
  settle=s0;res.push({lv,rivals:lv-10,win:w/N,round:rnd/N,rvFights:rvF/N,rvWin:rvF?rvW/rvF:null});}return JSON.stringify(res);})(${+N},${JSON.stringify(POL)})`));
console.log('poolPer',PP,'| lv rivals  win%  avgRound  rivalEps/run  winVsRival%');
out.forEach(o=>console.log('  ',o.lv,String(o.rivals).padStart(6),(100*o.win).toFixed(0).padStart(5),o.round.toFixed(1).padStart(9),o.rvFights.toFixed(1).padStart(13),o.rvWin==null?'     -':(100*o.rvWin).toFixed(0).padStart(11)));

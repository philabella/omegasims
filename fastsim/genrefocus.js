// per-genre focus check: curve7 bot with --focus <genre>; win% and how many of that genre it fields at the end
'use strict';const path=require('path');const { Engine, DEFAULT_BOTS } = require('./engine');
const [build,N=200,LV=5]=process.argv.slice(2);
const eng=new Engine({build:path.resolve(build),scripts:[DEFAULT_BOTS]});
console.log(eng.ev(String.raw`(function(N,LV){const out=[];for(const g of Object.keys(GENRES)){let w=0,share=0,cnt=0;
  for(let s=1;s<=N;s++){UI.lv=LV;seeded=true;rngState=(s*104729)|0;__seedMath(__hseed('math',s,g));try{BOT.run('greedy',false,g,null,'curve7');}catch(e){}
    if(S.result==='win')w++;const f=fielded();share+=f.length?f.filter(u=>HERO[u.id].genre===g).length/f.length:0;cnt+=f.filter(u=>HERO[u.id].genre===g).length;}
  out.push(g.padEnd(7)+' win '+(100*w/N).toFixed(0).padStart(3)+'%  fielded '+(cnt/N).toFixed(1)+' of board ('+(100*share/N).toFixed(0)+'%)');}return out.join('\n');})(${+N},${+LV})`));

// rival style check: does each rival play like its Codex description?   node rvstyle.js <build> [runs=40]
'use strict';const path=require('path');const { Engine, DEFAULT_BOTS } = require('./engine');
const [build,N=40]=process.argv.slice(2);
const eng=new Engine({build:path.resolve(build),scripts:[DEFAULT_BOTS],tune:{rivals:8,rvLog:1}});
const rows=JSON.parse(eng.ev(String.raw`(function(N){const out=[];for(let s=1;s<=N;s++){seeded=true;rngState=s*7919|0;__seedMath(__hseed('math',s));
  try{BOT.run('greedy',false,null,null,'curve7');}catch(e){}
  (S.lobby?S.lobby.rv:[]).forEach(R=>out.push({id:R.id,log:R.log||[],out:R.out,done:!!R.done}));}return JSON.stringify(out);})(${+N})`));
const by={};rows.forEach(r=>(by[r.id]=by[r.id]||[]).push(r));
const avg=(a,f)=>a.length?a.reduce((t,x)=>t+f(x),0)/a.length:0;
console.log('rival  survive lastRnd  gold<=r14 gold>=r16  rr<=r10 rr>r10  genres  rare+%  com/unc%  bench  winA1  winA3+  stars');
for(const [id,rs] of Object.entries(by)){const L=rs.flatMap(r=>r.log),seg=(a,b)=>L.filter(x=>x.r>=a&&x.r<=b);
  const pct=(xs,f)=>{const n=xs.reduce((t,x)=>t+x.n,0);return n?100*xs.reduce((t,x)=>t+f(x),0)/n:0;};
  console.log(id.padEnd(7),(100*avg(rs,r=>r.done||!r.out)).toFixed(0).padStart(6)+'%',avg(rs,r=>r.log.length?r.log[r.log.length-1].r:0).toFixed(1).padStart(7),
    avg(seg(3,14),x=>x.g).toFixed(1).padStart(9),avg(seg(16,28),x=>x.g).toFixed(1).padStart(9),avg(seg(1,10),x=>x.rr).toFixed(2).padStart(8),avg(seg(11,28),x=>x.rr).toFixed(2).padStart(7),
    avg(seg(8,28),x=>x.gen).toFixed(2).padStart(7),pct(seg(8,28),x=>x.hi).toFixed(0).padStart(7),pct(seg(8,28),x=>x.lo).toFixed(0).padStart(9),avg(seg(6,28),x=>x.bench).toFixed(1).padStart(6),
    (100*avg(seg(1,7),x=>x.w)).toFixed(0).padStart(5)+'%',(100*avg(seg(15,28),x=>x.w)).toFixed(0).padStart(6)+'%',avg(seg(12,28),x=>x.lv).toFixed(1).padStart(6));}

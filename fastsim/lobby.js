// lobby check: a sim bot plays as the player while TUNE.rivals rivals share the run.
//   node lobby.js <build.html> [runs=20] [rivals=7] [policy=curve7]
'use strict';
const path=require('path');const { Engine, DEFAULT_BOTS } = require('./engine');
const [build,N=20,NR=7,POL='curve7']=process.argv.slice(2);
const eng=new Engine({build:path.resolve(build),scripts:[DEFAULT_BOTS],tune:{rivals:+NR}});
const out=eng.ev(String.raw`(function(N,POL){const rows=[];
  for(let s=1;s<=N;s++){seeded=true;rngState=s*7919|0;__seedMath(__hseed('math',s));let err=null;
    try{BOT.run('greedy',false,null,null,POL);}catch(e){err=String(e.message)+' '+String(e.stack||'').split('\n')[1];}
    const L=S.lobby;const held={};let poolGone=0;
    (L?L.rv:[]).forEach(R=>R.st.units.forEach(u=>{held[u.id]=(held[u.id]||0)+COPIES[u.level-1];}));
    S.units.forEach(u=>{held[u.id]=(held[u.id]||0)+COPIES[u.level-1];});
    // bounds: the pool never goes below 0 or above its size (events like Field Promotion add stars without copies, so held+left can exceed it)
    const bad=Object.keys(S.pool||{}).filter(id=>poolLeft(id)<0||poolLeft(id)>poolMax(id)).map(id=>id+':'+poolLeft(id)+'+'+(held[id]||0)+'/'+poolMax(id));
    rows.push({s,err,res:S.result||'?',round:S.round,lives:S.lives,rank:S.rank,
      rv:(L?L.rv:[]).map(R=>({id:R.id,out:R.out,done:!!R.done,place:R.place,lives:R.st.lives,rank:R.st.rank,round:R.last&&R.last.round,n:R.st.units.length,lv:R.st.units.reduce((t,u)=>t+u.level,0),gold:R.st.gold,leg:R.st.legend,items:R.st.trinkets.length,err:R.err||null})),
      bad:bad.slice(0,4),drained:Object.keys(S.pool||{}).reduce((t,id)=>t+poolMax(id)-poolLeft(id),0)});}
  return JSON.stringify(rows);})(${+N},${JSON.stringify(POL)})`);
const rows=JSON.parse(out);const agg={};
rows.forEach(r=>r.rv.forEach(v=>{const a=agg[v.id]=agg[v.id]||{n:0,out:0,done:0,lives:0,rank:0,lv:0,err:0,round:0};a.n++;a.out+=v.out;a.done+=v.done;a.lives+=v.lives;a.rank+=v.rank;a.lv+=v.lv;a.err+=!!v.err;a.round+=v.round||0;}));
console.log('player: wins',rows.filter(r=>r.res==='win').length+'/'+rows.length,'avg round',(rows.reduce((t,r)=>t+r.round,0)/rows.length).toFixed(1),'errors',rows.filter(r=>r.err).length,rows.find(r=>r.err)?.err||'');
console.log('pool out of bounds',rows.filter(r=>r.bad.length).length,rows.find(r=>r.bad.length)?.bad||'','| avg copies held out of pool at end',(rows.reduce((t,r)=>t+r.drained,0)/rows.length).toFixed(0));
console.log('rival   runs  out  finished  avgLives  avgRank  avgStars  lastRound  errs');
Object.entries(agg).forEach(([k,a])=>console.log(k.padEnd(7),String(a.n).padStart(4),String(a.out).padStart(4),String(a.done).padStart(9),(a.lives/a.n).toFixed(1).padStart(9),(a.rank/a.n).toFixed(1).padStart(8),(a.lv/a.n).toFixed(1).padStart(9),(a.round/a.n).toFixed(1).padStart(10),String(a.err).padStart(5)));
const e=rows.flatMap(r=>r.rv.filter(v=>v.err));if(e.length)console.log('first rival error:',e[0].id,e[0].err);

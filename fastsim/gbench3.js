const path=require('path');const { Engine, DEFAULT_BOTS } = require(process.cwd()+'/engine');
const eng=new Engine({build:path.resolve(process.argv[2]),scripts:[DEFAULT_BOTS]});const R0=+(process.argv[3]||20);
console.log(eng.ev(String.raw`(function(R0){const out=[];UI.lv=0;seeded=true;rngState=1;newRun(false);S.rank=9;
 for(const g of Object.keys(GENRES)){const all=HEROES.filter(h=>h[2]===g).sort((a,b)=>b[4]-a[4]).map(h=>h[0]);
  // fill 8 squares, cheapest first, 2-square giants count 2
  let cap=8;const hs=[];for(const id of all){const c=twoSlot(id)?2:1;if(c<=cap){hs.push(id);cap-=c;}}
  let w=0,hp=0,tt=0;
  for(let k=0;k<60;k++){seeded=true;rngState=k*7919+1;S.round=R0;prepareFight();
   S.units=[];hs.forEach((id,i)=>{const s=freeSlotFor(id);S.units.push({id,level:2,slot:s||'n0',uid:900+i});});
   startBattle(true);let gg=0;while(!B.done&&gg++<30000)step(DT);if(B.win)w++;tt+=B.t;hp+=B.units.filter(u=>u.side==='E'&&u.alive).reduce((a,u)=>a+u.hp/u.maxHp,0);}
  const fc=fieldCount();out.push(g.padEnd(7)+' sq'+fc+' '+String(hs.length).padStart(2)+' chars  win '+String(Math.round(100*w/60)).padStart(3)+'%  enemy HP left '+(hp/60).toFixed(2)+'  t '+(tt/60).toFixed(1)+'s  ['+hs.join(',')+']');}
 return out.join('\n');})(${R0})`));

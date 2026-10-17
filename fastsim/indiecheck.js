#!/usr/bin/env node
// Indie Darling: is a small elite board a real option? Same saved battles, rank 5+ boards (5-6 slots), fought as:
// full board (no Legendary) / strongest 4 with Indie Darling / strongest 3 with Indie Darling / strongest 4 without.
'use strict';
const path = require('path');
const { makeEngine, runSeeds } = require('./recorder');
const A = {}; process.argv.slice(2).forEach((a, i, arr) => { if (a.startsWith('--')) A[a.slice(2)] = arr[i + 1]; });
const NS = +(A.snaps || 200);
const eng = makeEngine({ build: path.resolve(A.build) });
eng.ev(`globalThis.__snaps=[];globalThis.__snapOn=true;const __sb=startBattle;startBattle=function(){if(__snapOn&&S&&S.enemy&&S.rank>=5&&fielded().length>=5&&Math.random()<0.25)__snaps.push(JSON.stringify(S));return __sb.apply(this,arguments);};`);
let seed = 91000; while (eng.ev('__snaps.length') < NS) runSeeds(eng, [seed++], { kind: 'greedy', pol: 'curve7' });
eng.ev('__snapOn=false');
if(A.per)eng.ev(`TUNE.indiePer=${+A.per};TUNE.indieMax=${+(A.max||0.6)};`);
const res = eng.ev(`(()=>{const snaps=__snaps.slice(0,${NS});
  const pow=u=>HERO[u.id].tier*10+u.level*12;
  function fight(js,keep,leg){S=JSON.parse(js);S.legend=leg;if(keep){const f=fielded().sort((a,b)=>pow(b)-pow(a));f.slice(keep).forEach(u=>{u.slot='n4';});S.units=S.units.filter(u=>u.slot!=='n4'||f.slice(0,keep).includes(u));}
    seeded=true;rngState=12345;startBattle(true);let g=0;while(!B.done&&g++<6000)step(DT);return B.win?1:0;}
  const t=(keep,leg)=>snaps.reduce((a,js)=>a+fight(js,keep,leg),0);
  return {n:snaps.length,full:t(0,null),top4indie:t(4,'indie'),top3indie:t(3,'indie'),top4:t(4,null),fullBlock:t(0,'blockbuster'),top4block:t(4,'blockbuster')};})()`);
console.log(JSON.stringify(res));

#!/usr/bin/env node
// Genre Legendaries where they are actually offered: boards built around the genre (autopilot with that genre focus,
// 2+ of the genre on the board). Same saved battles fought with no Legendary and with each of the genre's Legendaries.
//   node fastsim/genrelegcheck.js --build b.html [--snaps 120]
'use strict';
const path = require('path');
const { makeEngine, runSeeds } = require('./recorder');
const A = {}; process.argv.slice(2).forEach((a, i, arr) => { if (a.startsWith('--')) A[a.slice(2)] = arr[i + 1]; });
const NS = +(A.snaps || 120);
const eng = makeEngine({ build: path.resolve(A.build) });
const genres = A.genre ? A.genre.split(',') : eng.ev('Object.keys(GENRES)');
const out = {};
for (const g of genres) {
  eng.ev(`globalThis.__snaps=[];globalThis.__snapOn=true;globalThis.__g=${JSON.stringify(g)};if(!globalThis.__sbw){globalThis.__sbw=startBattle;startBattle=function(){if(__snapOn&&S&&S.enemy&&(genreCounts(fielded())[__g]||0)>=2&&Math.random()<0.3)__snaps.push(JSON.stringify(S));return __sbw.apply(this,arguments);};}`);
  let seed = 93000; while (eng.ev('__snaps.length') < NS && seed < 93600) runSeeds(eng, [seed++], { kind: 'greedy', pol: 'curve7', focus: g });
  eng.ev('__snapOn=false');
  out[g] = eng.ev(`(()=>{const snaps=__snaps.slice(0,${NS});
    function fight(js,leg){S=JSON.parse(js);S.legend=leg;seeded=true;rngState=12345;startBattle(true);let k=0;while(!B.done&&k++<6000)step(DT);return B.win?1:0;}
    const t=leg=>snaps.reduce((a,js)=>a+fight(js,leg),0);const r={n:snaps.length,none:t(null)};
    Object.keys(LEGENDS).filter(l=>LEGENDS[l].genre===${JSON.stringify(g)}).forEach(l=>{r[LEGENDS[l].name]=t(l);});
    ['ensemble','blockbuster','plotarmor'].forEach(l=>{r[LEGENDS[l].name]=t(l);});return r;})()`);
  console.log(g, JSON.stringify(out[g]));
}

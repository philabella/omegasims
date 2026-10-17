#!/usr/bin/env node
// Does every item / Legendary actually change battles? Replays saved real battles (from autopilot runs) with and
// without each one, same random seed, and counts how many battle results change (win or final HP).
//   node fastsim/effectcheck.js --build b.html [--snaps 150]
// "0 changed" for an item that should matter in battle = it is not working. Economy-only items (gold, rerolls,
// interest) are expected to show 0.
'use strict';
const path = require('path');
const { makeEngine, runSeeds } = require('./recorder');
const A = {}; process.argv.slice(2).forEach((a, i, arr) => { if (a.startsWith('--')) A[a.slice(2)] = arr[i + 1]; });
const eng = makeEngine({ build: path.resolve(A.build) });
const NS = +(A.snaps || 150);
// 1) collect battle snapshots (S right before a real battle) from autopilot runs
eng.ev(`globalThis.__snaps=[];globalThis.__snapOn=true;const __sb=startBattle;startBattle=function(){if(__snapOn&&S&&S.enemy&&Math.random()<0.25)__snaps.push(JSON.stringify(S));return __sb.apply(this,arguments);};`);
let seed = 90000; while (eng.ev('__snaps.length') < NS) runSeeds(eng, [seed++], { kind: 'greedy', pol: 'curve7' });
eng.ev('__snapOn=false');
// 2) replay each snapshot with a fixed battle seed: items are ADDED at level 1 (a 6th slot if full; skipped if already held)
//    against the snapshot as is; Legendaries are compared with the same battle with NO Legendary
const items = eng.ev('TRINKETS.map(t=>t[0])'), legends = eng.ev('Object.keys(LEGENDS)');
const res = eng.ev(`(()=>{const out={};const snaps=__snaps.slice(0,${NS});
  function fight(js,mod){S=JSON.parse(js);mod&&mod();seeded=true;rngState=12345;startBattle(true);let g=0;while(!B.done&&g++<6000)step(DT);
    let ha=0,he=0;B.units.forEach(u=>{if(u.summon)return;if(u.side==='A')ha+=u.alive?Math.max(0,u.hp):0;else he+=u.alive?Math.max(0,u.hp):0;});return (B.win?'W':'L')+Math.round(ha)+'/'+Math.round(he);}
  const base=snaps.map(js=>fight(js,null)),baseNL=snaps.map(js=>fight(js,()=>{S.legend=null;}));
  const test=(k,mod,bl)=>{let ch=0,wins=0,bw=0;snaps.forEach((js,i)=>{const r=fight(js,mod);if(r!==bl[i])ch++;if(r[0]==='W')wins++;if(bl[i][0]==='W')bw++;});out[k]={changed:ch,dWin:wins-bw};};
  ${JSON.stringify(items)}.forEach(t=>test('item '+t,()=>{if(S.trinkets.includes(t))return;S.trinkets.push(t);S.tlv=S.tlv||{};S.tlv[t]=1;},base));
  ${JSON.stringify(legends)}.forEach(l=>test('legend '+l,()=>{S.legend=l;},baseNL));
  return out;})()`);
const names = eng.ev('Object.fromEntries([...TRINKETS.map(t=>["item "+t[0],TR[t[0]].name]),...Object.keys(LEGENDS).map(l=>["legend "+l,LEGENDS[l].name])])');
console.log(`# Effect check: ${path.basename(A.build)}\n\n${NS} saved real battles replayed with the same seed. "changed" = battles whose result (win or final HP) differs from the baseline; "wins" = change in battles won.\n`);
console.log('| what | changed | wins |\n|---|---|---|');
Object.entries(res).sort((a, b) => a[1].changed - b[1].changed).forEach(([k, v]) => console.log(`| ${names[k] || k} (${k.split(' ')[0]}) | ${v.changed} | ${v.dWin >= 0 ? '+' : ''}${v.dWin} |`));

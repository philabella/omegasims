#!/usr/bin/env node
// Understudy (item): "When characters on your board fall, your best bench characters step into their squares, up to
// 1/2/3 per fight." v19.31: whoever steps in can't be rarer than the character who fell. Checks on the real game code:
//   node fastsim/understudycheck.js [--build file.html]
'use strict';
const path = require('path');
const { makeEngine } = require('./recorder');
const A = {}; process.argv.slice(2).forEach((a, i, arr) => { if (a.startsWith('--')) A[a.slice(2)] = arr[i + 1]; });
const eng = makeEngine({ build: path.resolve(A.build || path.join(__dirname, '../tropebrawl.html')) });
const r = eng.ev(`(()=>{const out=[];const ok=(name,pass,info)=>out.push([pass?'PASS':'FAIL',name,info===undefined?'':JSON.stringify(info)]);
  newRun(false);seeded=true;
  // one non-crowd, non-summoner character per rarity (tier 1..5)
  const pick=t=>HEROES.find(h=>h[4]===t&&!HERO[h[0]].crowd&&!['necro','dragon'].includes(h[0]))[0];
  const T=[1,2,3,4,5].map(pick);
  const entered=[];const ffb=fillFromBench;
  fillFromBench=function(row,col){const n=B.units.length;ffb(row,col);const u=B.units[n];if(u)entered.push({name:u.name,row,col,under:!!B.units.find(x=>x===u&&x.ref!=null&&S.units.some(s=>s.uid===x.ref&&s.slot[0]==='n'))});};
  const deaths=[];
  function setup(lv,bench,board){S.legend=null;S.rank=7;S.trinkets=lv?['understudy']:[];S.tlv=lv?{understudy:lv}:{};
    let uid=900;S.units=[];(board||[[T[0],'f1']]).forEach(([id,sl])=>S.units.push({id,level:1,slot:sl,uid:uid++}));
    bench.forEach((t,i)=>S.units.push({id:T[t-1],level:t===2&&i===9?2:1,slot:'n'+i,uid:uid++}));}
  function fight(weak){entered.length=0;rngState=4242;startBattle(true);
    if(weak){B.units.forEach(u=>{if(u.side==='A'){u.maxHp=u.hp=1;}});B.reserve.forEach(o=>{if(o.maxHp){o.maxHp=o.hp=1;}});}
    const start=B.units.filter(u=>u.side==='A').length;let g=0;
    const seen=new Set();while(!B.done&&g++<20000){step(DT);B.units.forEach(u=>{if(u.side==='A'&&!u.alive&&!seen.has(u)){seen.add(u);deaths.push([u.row0||u.row,u.col]);}});}
    return {start,under:B.units.filter(u=>u.side==='A'&&u.under).map(u=>u.name)};}
  // 1. no item: nobody waits on the battle bench
  setup(0,[1,2,3]);startBattle(true);ok('no Understudy: battle bench empty',B.reserve.length===0,B.reserve.length);
  // 2. the whole bench waits, rarest first; the item level caps how many step in
  for(const lv of [1,2,3]){setup(lv,[1,3,5,2,4]);startBattle(true);const want=[5,4,3,2,1].map(t=>HERO[T[t-1]].name);
    ok('★'+lv+': the bench waits, rarest first (cap '+lv+')',JSON.stringify(B.reserve.map(o=>o.name))===JSON.stringify(want)&&B.underLeft===lv,B.reserve.map(o=>o.name));}
  // 3. at the start nobody steps in, even with empty squares on the board
  setup(3,[1,2,3]);const f0=fight(false);ok('nobody steps in at the start (board has 5 empty squares)',f0.start===1,f0.start);
  // 4. they step in only when someone falls, one per fall, into the square that emptied, up to the item level
  //    (board: a Mythic, so any bench character may replace it)
  for(const lv of [1,2,3]){setup(lv,[1,2,3,4,5],[[T[4],'f1']]);const sq=[];const ffb2=fillFromBench;fillFromBench=function(row,col){sq.push(row+col);return ffb2(row,col);};
    const f=fight(true);fillFromBench=ffb2;ok('★'+lv+': '+lv+' step in when everyone falls',f.under.length===lv,f.under);
    ok('★'+lv+': each steps into the fallen square (front 1)',sq.slice(0,lv).every(s=>s==='front1'),sq);}
  // 4b. rarity limit: a fallen Common is replaced by a Common, never the Mythic on the bench
  setup(3,[5,1]);const fr=fight(true);ok('a fallen Common is replaced by the bench Common, not the Mythic',fr.under[0]===HERO[T[0]].name&&!fr.under.includes(HERO[T[4]].name),fr.under);
  setup(3,[5,4]);const fn=fight(true);ok('nobody rarer than the fallen Common steps in',fn.under.length===0,fn.under);
  // 5. fewer bench characters than the level: only those
  setup(3,[2],[[T[4],'f1']]);const f5=fight(true);ok('★3 with 1 bench character: 1 steps in',f5.under.length===1,f5.under);
  // 6. the bench and board are unchanged after the fight (nobody is used up or moved)
  setup(3,[1,2,3,4]);const before=JSON.stringify(S.units.map(u=>[u.uid,u.id,u.level,u.slot]));fight(true);
  ok('your team is unchanged after the fight',JSON.stringify(S.units.map(u=>[u.uid,u.id,u.level,u.slot]))===before);
  // 7. characters always go before summons (the battle bench order)
  setup(2,[3,4]);startBattle(true);ok('understudies are first in line on the battle bench',B.reserve.slice(0,2).every(o=>o.under),B.reserve.map(o=>o.name+(o.under?'(u)':'')));
  return out;})()`);
let fail = 0; r.forEach(([s, n, i]) => { if (s === 'FAIL') fail++; console.log(s, n, i); });
console.log(fail ? fail + ' FAILED' : 'all ' + r.length + ' passed'); process.exit(fail ? 1 : 0);

// Level framework equivalence (v19.70, TRO-17): plays the same seeds on an old build at old Game Level N and on a
// LADDER build at Level N+4 with the old rule order put back in (rules, lives, mini-boss schedule), and checks
// every run ends the same (result, round, gold, lives, rank, board). Then prints the win rate per level of the new
// ladder as shipped (spec order) next to the old ladder. Autopilot bot (curve7), small job (~2 min).
//   node fastsim/lvequiv.js --old <old.html> --new <new.html> [--runs 40] [--levels 0-10]
'use strict';
const path = require('path'); const { Engine, DEFAULT_BOTS } = require('./engine');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const OLD = path.resolve(arg('--old')), NEW = path.resolve(arg('--new')), N = +arg('--runs', 40);
const [L0, L1] = arg('--levels', '0-10').split('-').map(Number);
const A = new Engine({ build: OLD, scripts: [DEFAULT_BOTS] }), B = new Engine({ build: NEW, scripts: [DEFAULT_BOTS] });
const PLAY = String.raw`function __play(lv,N,salt){const out=[];for(let s=1;s<=N;s++){UI.lv=lv;seeded=true;rngState=(s*7919+salt)|0;__seedMath(__hseed('math',s,salt));let err=0;
  try{BOT.run('greedy',false,null,null,'curve7');}catch(e){err=String(e&&e.message||e).slice(0,80);}
  out.push({r:S.result||'',round:S.round,gold:S.gold,lives:S.lives,rank:S.rank,lv:S.lv,board:S.units.filter(u=>u.slot!=null||u.row!=null).map(u=>u.id+':'+u.level).sort().join(','),n:S.units.length,err});}return JSON.stringify(out);}`;
A.ev(PLAY); B.ev(PLAY);
B.ev(String.raw`var __SPEC=JSON.stringify(LADDER.slice(1).map(x=>({rules:x.rules,lives:x.lives,sched:x.sched})));
function __oldOrder(){const O=['limited','plot','xp1','elite','life1','twin','extras','xp2','life2','finale2'];
  for(let k=5;k<=LV_MAX;k++){LADDER[k].rules=[];delete LADDER[k].lives;delete LADDER[k].sched;}
  O.forEach((id,i)=>{const x=LADDER[i+5];x.rules=[id];if(id==='life1')x.lives=9;if(id==='life2')x.lives=8;if(id==='elite')x.sched='FFEFFFFMB';});}
function __specOrder(){JSON.parse(__SPEC).forEach((x,i)=>{const y=LADDER[i+1];y.rules=x.rules;if(x.lives!=null)y.lives=x.lives;else delete y.lives;if(x.sched!=null)y.sched=x.sched;else delete y.sched;});}`);
const run = (E, lv, salt) => JSON.parse(E.ev(`__play(${lv},${N},${salt})`));
const win = a => (100 * a.filter(x => x.r === 'win').length / a.length).toFixed(0).padStart(4);
let bad = 0; const oldWin = {};
console.log(`equivalence: old Level N vs new Level N+4 with the old rule order, ${N} seeded autopilot runs each`);
B.ev('__oldOrder()');
for (let k = L0; k <= L1; k++) {
  const a = run(A, k, 101 + k), b = run(B, k + 4, 101 + k); oldWin[k] = win(a);
  const diff = a.map((x, i) => { const y = { ...b[i] }; delete y.lv; const z = { ...x }; delete z.lv; return JSON.stringify(z) === JSON.stringify(y) ? null : i + 1; }).filter(Boolean);
  const errs = a.filter(x => x.err).length + b.filter(x => x.err).length;
  bad += diff.length + errs;
  console.log(`  old ${String(k).padStart(2)} = new ${String(k + 4).padStart(2)}: ${diff.length ? 'DIFF on seeds ' + diff.slice(0, 8).join(',') : 'identical'}  win ${oldWin[k]}%${errs ? '  ERRORS ' + errs : ''}  (new S.lv ${b[0].lv})`);
  if (diff.length) { const i = diff[0] - 1; console.log('    old', JSON.stringify(a[i]).slice(0, 220)); console.log('    new', JSON.stringify(b[i]).slice(0, 220)); }
}
B.ev('__specOrder()');
console.log('\nnew ladder as shipped (spec order), same seeds: level -> autopilot win %');
for (let n = 4; n <= 18; n++) { const b = run(B, n, 101 + n - 4); const e = b.filter(x => x.err).length;
  console.log(`  Level ${String(n).padStart(2)}: ${win(b)}%   (old Level ${n - 4 <= 10 ? String(n - 4).padStart(2) + ': ' + oldWin[n - 4] + '%' : '-'})${e ? '  ERRORS ' + e : ''}`); }
console.log(bad ? `\nFAIL: ${bad} differing or crashed runs` : '\nPASS: every run identical');
process.exit(bad ? 1 : 0);

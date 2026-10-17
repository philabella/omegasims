// Phase 0 checks for env.js: random legal play never crashes, a seed + the same choices replays identically,
// and snapshot/restore branches back to exactly the same game.   node env-test.js <build> [runs=30] [level=10]
'use strict';
const { TropebrawlEnv } = require('./env');
const [build, N = 30] = process.argv.slice(2);
const env = new TropebrawlEnv({ build, lv: +(process.argv[4] || 10) });
function rng(s) { return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
// a simple random player that still plays sensibly: buys (random card), fields bench units while there is room,
// sometimes rerolls / trains / sells, then fights; event and pick choices are random
function chooser(R) {
  let k = 0;
  return A => {
    if (['event', 'sub', 'pend'].includes(A[0].t)) return A[Math.floor(R() * A.length)];
    const by = t => A.filter(x => x.t === t), pick = xs => xs[Math.floor(R() * xs.length)];
    if (k++ > 12) { k = 0; return by('fight')[0]; }
    const toField = A.filter(x => x.t === 'place' && x.slot[0] !== 'n' && env.obs().units.find(u => u.uid === x.uid).slot[0] === 'n');
    if (toField.length) return pick(toField);
    const r = R();
    if (by('buy').length && r < 0.6) return pick(by('buy'));
    if (by('train').length && r < 0.7) return by('train')[0];
    if (by('reroll').length && r < 0.8) return by('reroll')[0];
    if (by('sell').length && r < 0.83) return pick(by('sell'));
    k = 0; return by('fight')[0];
  };
}
function play(seed, pickSeed, stopAt) {
  const R = rng(pickSeed), ch = chooser(R); env.reset(seed); let n = 0;
  while (!env.done && n++ < 5000) {
    if (stopAt && n === stopAt) return { snap: env.snapshot() };
    const A = env.legal(); if (!A.length) throw new Error('no legal moves in phase ' + env.obs().phase);
    env.step(ch(A));
  }
  const o = env.obs(); return { result: o.result, round: o.round, lives: o.lives, steps: n, log: env.log.length, sig: JSON.stringify(o) };
}
const ok = (n, c, x) => console.log((c ? 'PASS ' : 'FAIL ') + n + (x !== undefined ? ' ' + JSON.stringify(x).slice(0, 200) : ''));
const t0 = Date.now(); let wins = 0, steps = 0, errs = 0; const SEEN = {}; const _st = env.step.bind(env); env.step = a => { SEEN[a.t] = (SEEN[a.t] || 0) + 1; return _st(a); };
for (let i = 1; i <= +N; i++) { try { const r = play(i, 1000 + i); wins += r.result === 'win' ? 1 : 0; steps += r.steps; } catch (e) { errs++; console.log('ERR seed', i, e.message); } }
ok(`random legal play: ${N} runs without errors`, errs === 0, { errs, wins, avgSteps: Math.round(steps / N), msPerRun: Math.round((Date.now() - t0) / N) });
console.log('phases seen:', JSON.stringify(SEEN));
const a = play(7, 77), b = play(7, 77); ok('same seed + same choices replays identically', a.sig === b.sig, { a: a.result + ' r' + a.round, b: b.result + ' r' + b.round });
const mid = play(9, 99, 12);
function cont(snap, s) { env.restore(snap); const ch = chooser(rng(s)); let n = 0; while (!env.done && n++ < 5000) env.step(ch(env.legal())); return JSON.stringify(env.obs()); }
const c1 = cont(mid.snap, 5), c2 = cont(mid.snap, 5), c3 = cont(mid.snap, 6); ok('snapshot/restore branches back to the same game (and other choices give another game)', c1 === c2 && c1 !== c3);
env.reset(3); const v = env.encode(); ok('encode() gives a fixed-length vector', v.length === env.F && v.every(Number.isFinite), { F: env.F });
env.reset(3); env.step(env.legal().find(x => x.t === 'fight')); ok('decision log uses run-log codes', env.log.some(e => /^f:(win|loss)$/.test(e.a)), env.log.slice(-2));

#!/usr/bin/env node
// Bug hunt: plays many seeded autopilot runs (every genre focus, every Legendary forced) and checks every battle step for
// broken states. No AI. Reports counts + one example (seed, round, time) per problem kind.
//   node fastsim/bughunt.js --build b.html [--runs 40] [--workers 4]
// Checks: NaN/undefined stats, alive at 0 HP, HP above max, dead units still holding the ball, Game Ball holder invalid,
// ball stalls (no throw for 6s while a healthy holder has targets), Sportsball team idle with no holder, battles that end
// on the 120 s timeout, skills that never fire although their character fought, page errors.
'use strict';
const path = require('path');
const os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const { makeEngine, runSeeds } = require('./recorder');

const PROBE = `(function(){
  const P = globalThis.__bh = { issues: {}, casts: {}, fought: {}, battles: 0, timeouts: 0, throws: 0, ballBattles: 0, seed: 0 };
  const note = (k, ex) => { const o = P.issues[k] = P.issues[k] || { n: 0, ex: null }; o.n++; if (!o.ex) o.ex = 'seed ' + P.seed + ' r' + (S && S.round) + ' t' + (B ? B.t.toFixed(1) : '?') + ' ' + ex; };
  Object.keys(SK).forEach(k => { const c = SK[k].cast; SK[k].cast = function (u) { P.casts[k] = (P.casts[k] || 0) + 1; return c.apply(this, arguments); }; });
  const tb = throwBall; throwBall = function (u) { P.throws++; if (B) B.__lt = B.t; return tb.apply(this, arguments); };
  const sb = startBattle; startBattle = function () { const r = sb.apply(this, arguments); P.battles++; if (B) { B.__lt = 0; B.__chk = true; if (B.ball) P.ballBattles++;
      B.units.forEach(u => { if (u.side === 'A' && !u.summon && u.skill) P.fought[u.skill] = (P.fought[u.skill] || 0) + 1; }); } return r; };
  const st = step; step = function (dt) {
    const r = st.apply(this, arguments);
    if (!B || !B.__chk) return r;
    for (const u of B.units) {
      for (const f of ['hp', 'maxHp', 'atk', 'mana', 'timer']) { const v = u[f]; if (v !== undefined && (typeof v !== 'number' || !isFinite(v))) note('bad number: ' + f, u.id + ' = ' + v); }
      if (u.alive && !u.crowd && u.hp <= 0) note('alive at 0 HP', u.id + ' (' + u.side + ')');
      if (u.alive && u.hp > u.maxHp * 1.001 + 0.5) note('HP above max', u.id + ' ' + u.hp.toFixed(0) + '/' + u.maxHp.toFixed(0));
    }
    if (B.ball) {
      const h = B.ball.holder;
      if (h && (!h.alive || h.side !== 'A' || h.genre !== 'ball')) note('ball holder invalid after step', h.id + ' alive=' + h.alive);
      const team = B.units.filter(u => u.side === 'A' && u.alive && u.genre === 'ball');
      if (!h && team.length && !B.done) note('ball has no holder while Sportsball fights', team.map(u => u.id).join(','));
      const foes = B.units.some(u => u.side === 'E' && targetable(u));
      if (h && h.alive && h.stun <= 0 && foes && !B.done && B.t - (B.__lt || 0) > 6) { note('ball stall: no throw for 6 s', h.id + ' timer=' + (h.timer || 0).toFixed(2) + ' interval=' + (h.interval || 0).toFixed(2)); B.__lt = B.t; }
    }
    if (B.done && B.__chk) { B.__chk = false; if (B.t > 120) { P.timeouts++; note('battle hit the 120 s timeout', 'A:' + B.units.filter(u => u.side === 'A' && u.alive).map(u => u.id).join(',') + ' E:' + B.units.filter(u => u.side === 'E' && u.alive).map(u => u.id).join(',')); } }
    return r;
  };
})();`;

if (!isMainThread) {
  const cfg = workerData; const eng = makeEngine(cfg); eng.ev(PROBE);
  const errs = [];
  parentPort.on('message', m => {
    for (const s of m.seeds) { eng.ev(`__bh.seed=${s}`); const out = runSeeds(eng, [s], m.cfg)[0]; if (out && out.err) errs.push('seed ' + s + ': ' + out.err); }
    parentPort.postMessage({ done: true, P: eng.ev('JSON.stringify(__bh)'), errs });
  });
  return;
}
const A = {}; process.argv.slice(2).forEach((a, i, arr) => { if (a.startsWith('--')) A[a.slice(2)] = arr[i + 1]; });
const build = path.resolve(A.build), N = +(A.runs || 40), W = +(A.workers || Math.min(4, os.cpus().length));
(async () => {
  const T0 = Date.now();
  const eng = makeEngine({ build }); const legends = eng.ev('Object.keys(LEGENDS)'); const genres = eng.ev('Object.keys(GENRES).filter(g=>!PARKED.has(g))');
  const cfgs = [{ name: 'plain' }, ...genres.map(g => ({ name: 'focus ' + g, focus: g })), ...legends.map(l => ({ name: 'legend ' + l, legend: l, focus: eng.ev(`LEGENDS.${l}.genre||null`) }))];
  const jobs = []; let seed = 70000; cfgs.forEach(c => { for (let i = 0; i < N; i += 10) { jobs.push({ c, seeds: Array.from({ length: Math.min(10, N - i) }, (_, k) => seed + i + k) }); } seed += 1000; });
  const tot = { issues: {}, casts: {}, fought: {}, battles: 0, timeouts: 0, throws: 0, ballBattles: 0 }; const errs = [];
  const merge = p => { tot.battles += p.battles; tot.timeouts += p.timeouts; tot.throws += p.throws; tot.ballBattles += p.ballBattles;
    for (const [k, v] of Object.entries(p.casts)) tot.casts[k] = (tot.casts[k] || 0) + v; for (const [k, v] of Object.entries(p.fought)) tot.fought[k] = (tot.fought[k] || 0) + v;
    for (const [k, v] of Object.entries(p.issues)) { const o = tot.issues[k] = tot.issues[k] || { n: 0, ex: v.ex }; o.n += v.n; } };
  let next = 0;
  await Promise.all(Array.from({ length: W }, () => new Promise(res => {
    const go = () => { if (next >= jobs.length) { res(); return; } const j = jobs[next++];
      const w = new Worker(__filename, { workerData: { build, kind: 'greedy', pol: 'curve7', focus: j.c.focus || null, legend: j.c.legend || null } });
      w.on('message', m => { if (m.done) { merge(JSON.parse(m.P)); m.errs.forEach(e => errs.push(j.c.name + ' ' + e)); w.terminate(); go(); } });
      w.on('online', () => w.postMessage({ seeds: j.seeds, cfg: { kind: 'greedy', pol: 'curve7', focus: j.c.focus || null, legend: j.c.legend || null } }));
      w.on('error', e => { errs.push(j.c.name + ' worker error ' + e.message); go(); }); };
    go(); })));
  const runs = cfgs.length * N;
  console.log(`# Bug hunt: ${path.basename(build)}\n\n${runs} autopilot runs (${cfgs.length} setups: plain, each genre, each Legendary forced), ${tot.battles} battles, ${tot.ballBattles} with the Game Ball (${tot.throws} throws). ${((Date.now() - T0) / 1000).toFixed(0)} s.\n`);
  const iss = Object.entries(tot.issues).sort((a, b) => b[1].n - a[1].n);
  console.log(iss.length ? '## Problems\n\n' + iss.map(([k, v]) => `- **${k}**: ${v.n}× · e.g. ${v.ex}`).join('\n') : '## Problems\n\nNone.');
  const never = Object.keys(tot.fought).filter(k => !tot.casts[k]).map(k => `${k} (fought ${tot.fought[k]}×)`);
  console.log('\n## Skills that never fired although their character fought\n\n' + (never.length ? never.join(', ') : 'None.'));
  const rare = Object.keys(tot.fought).filter(k => tot.casts[k] && tot.casts[k] / tot.fought[k] < 0.2).map(k => `${k} ${tot.casts[k]}/${tot.fought[k]}`);
  console.log('\n## Skills that fire in under 20% of the battles their character is in\n\n' + (rare.length ? rare.join(', ') : 'None.'));
  console.log(`\nTimeouts: ${tot.timeouts} of ${tot.battles} battles. Run errors: ${errs.length}${errs.length ? '\n' + errs.slice(0, 5).join('\n') : ''}`);
})();

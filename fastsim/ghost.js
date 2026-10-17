// Ghost teams (v19.67): enemy boards built by bots, drawn per round.
//   harvest: the expert plays runs (free play, every solo genre, every pair) and records its real board at every normal
//            fight: [round, rank, legend, lives, maxLives, streak, "item:lv,..", "hero:level:slot,..", config, win]
//     node ghost.js harvest --build <lv10.html> [--runs 4] [--workers 4] [--tag gh] --out ghosts-raw.json
//   calibrate: per round, how hard each ghost is for players of that round. The other ghosts of the round stand in for
//            players: their win rate vs the round's generated fights is the target, and each ghost gets the strength
//            multiplier m (hp and damage) that gives the same win rate against it (bisection).
//     node ghost.js calibrate --build <lv10.html> --in ghosts.json [--fights 24] [--steps 7] --out ghosts-cal.json
'use strict';
const path = require('path'), fs = require('fs'), os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const HERE = __dirname, CORE = path.join(HERE, 'smartbot-vm/core.js');

// page-side helpers: snapshot a board, rebuild one as enemy units (same path the game uses: ghFoes in v19.67)
const PAGE = String.raw`globalThis.GH=(function(){
  function snap(){const t=S.trinkets.map(k=>k+':'+((S.tlv&&S.tlv[k])||1)).join(',');
    const u=S.units.filter(x=>x.slot[0]!=='n').map(x=>x.id+':'+x.level+':'+x.slot).join(',');
    return [S.round,S.rank,S.legend||'',S.lives,S.maxLives||S.lives,S.streak||0,t,u];}
  let REC=null;
  function hook(){if(settle.__gh)return;const o=settle;const w=function(){if(REC&&S&&curRound().type==='fight'&&fielded().length)REC.push(snap());return o.apply(this,arguments);};w.__gh=true;settle=w;}
  function start(){REC=[];}function take(){const r=REC;REC=null;return r;}
  return {snap,hook,start,take};})();`;

const A = {}; const argv = process.argv.slice(2); const MODE = argv[0];
argv.slice(1).forEach((a, i, v) => { if (a.startsWith('--')) A[a.slice(2)] = v[i + 1] && !v[i + 1].startsWith('--') ? v[i + 1] : true; });
const hseed = (...xs) => { let h = 0x811c9dc5; for (const x of xs) { const s = String(x); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } h ^= 0x7f; h = Math.imul(h, 0x01000193); } return (h >>> 1) || 1; };

if (!isMainThread) {
  const { Engine } = require('./engine');
  const eng = new Engine({ build: workerData.build, scripts: workerData.cal ? [] : [CORE] });
  if (workerData.cal) eng.ev(fs.readFileSync(path.join(HERE, 'ghost-cal-page.js'), 'utf8'));
  else { eng.ev('SB.init()'); eng.ev(PAGE); eng.ev('GH.hook()'); }
  const g = eng.ctx;
  parentPort.on('message', m => {
    if (m.mode === 'harvest') {
      g.GH.start(); const r = g.SB.playRun(m.seed, m.params, m.opts); const rec = g.GH.take();
      parentPort.postMessage({ i: m.i, rows: rec.map(x => x.concat([m.cfg, r && r.win ? 1 : 0])), err: r && r.err });
    } else if (m.mode === 'cal') {
      parentPort.postMessage(Object.assign({ i: m.i }, g.GHCAL.run(m.job)));
    }
  });
  return;
}

const BUILD = path.resolve(A.build), NW = Math.min(os.cpus().length, +(A.workers || 4));
function pool(jobs, mk, onMsg, cal) {
  return new Promise(res => {
    let next = 0, done = 0; const W = Array.from({ length: Math.min(NW, jobs.length) }, () => new Worker(__filename, { workerData: { build: BUILD, cal: !!cal } }));
    const feed = w => { if (next >= jobs.length) { w.terminate(); return; } w.postMessage(mk(jobs[next], next++)); };
    W.forEach(w => { w.on('message', m => { onMsg(m); if (++done === jobs.length) { W.forEach(x => x.terminate()); res(); } else feed(w); }); w.on('error', e => console.error(e)); feed(w); });
  });
}

if (MODE === 'harvest') {
  const pol = JSON.parse(fs.readFileSync(path.resolve(A.policy || path.join(HERE, 'smartbot-vm/champion.json')), 'utf8'));
  const RUNS = +(A.runs || 4), TAG = A.tag || 'gh';
  const G = ['army', 'bug', 'undead', 'ball', 'heist', 'west', 'horror', 'space', 'kaiju'];
  const cfgs = [{ k: 'free', o: {} }].concat(G.map(a => ({ k: a, o: { genres: [a] } })));
  for (let i = 0; i < G.length; i++) for (let j = i + 1; j < G.length; j++) cfgs.push({ k: G[i] + '+' + G[j], o: { genres: [G[i], G[j]] } });
  const jobs = []; cfgs.forEach(c => { for (let r = 0; r < (c.k === 'free' ? RUNS * 4 : RUNS); r++) jobs.push({ c, seed: hseed('tropebrawl-ghost', TAG, c.k, r) }); });
  const out = []; let errs = 0, wins = 0, t0 = Date.now(), n = 0;
  pool(jobs, (j, i) => ({ mode: 'harvest', i, seed: j.seed, params: pol.params, opts: Object.assign({ lookK: 2 }, j.c.o), cfg: j.c.k }), m => {
    out.push(...m.rows); if (m.err) errs++; if (m.rows.length && m.rows[m.rows.length - 1][9]) wins++;
    if (++n % 40 === 0) console.log(`${n}/${jobs.length} runs, ${out.length} boards, ${((Date.now() - t0) / 60000).toFixed(1)} min`);
  }).then(() => {
    fs.writeFileSync(path.resolve(A.out), JSON.stringify(out));
    const per = {}; out.forEach(r => { per[r[0]] = (per[r[0]] || 0) + 1; });
    console.log('done', out.length, 'boards from', jobs.length, 'runs, errors', errs, ((Date.now() - t0) / 60000).toFixed(1), 'min'); console.log('per round', JSON.stringify(per));
  });
}

if (MODE === 'calibrate') {
  const GH = JSON.parse(fs.readFileSync(path.resolve(A.in), 'utf8'));
  const FIGHTS = +(A.fights || 24), STEPS = +(A.steps || 7), REFN = +(A.refn || 8);
  const byR = {}; GH.forEach((g, i) => { (byR[g[0]] = byR[g[0]] || []).push(i); });
  const jobs = []; Object.keys(byR).forEach(r => byR[r].forEach(i => {
    const others = byR[r].filter(j => j !== i); const refs = []; for (let k = 0; k < REFN && others.length; k++) refs.push(GH[others[hseed('ref', i, k) % others.length]]);
    jobs.push({ i, ghost: GH[i], refs, fights: FIGHTS, steps: STEPS, seed: hseed('cal', i) });
  }));
  const t0 = Date.now(); let n = 0; const res = new Array(GH.length);
  pool(jobs, (j, k) => ({ mode: 'cal', i: j.i, job: j }), m => { res[m.i] = m; if (++n % 50 === 0) console.log(`${n}/${jobs.length} ghosts, ${((Date.now() - t0) / 60000).toFixed(1)} min`); }, true).then(() => {
    const out = GH.map((g, i) => g.concat([res[i] ? +res[i].m.toFixed(3) : 1, res[i] ? +res[i].pref.toFixed(3) : null]));
    fs.writeFileSync(path.resolve(A.out), JSON.stringify(out));
    const ms = out.map(g => g[g.length - 2]).sort((a, b) => a - b), q = p => ms[Math.floor(p * (ms.length - 1))];
    console.log('done', out.length, 'ghosts', ((Date.now() - t0) / 60000).toFixed(1), 'min; m quartiles', q(0), q(.25), q(.5), q(.75), q(1));
  });
}

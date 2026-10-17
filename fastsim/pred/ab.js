// End-to-end check of the battle predictor: the expert bot plays the same seeded runs with its normal lookahead
// (practice fights simulated) and with the predictor (OPT.pred), and we compare wins and time per run.
//   node ab.js --build <game.html> --net net.json [--runs 300] [--seedtag abcheck] [--modes sim,pred] [--workers 4]
'use strict';
const path = require('path'), fs = require('fs'), os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const HERE = __dirname, CORE = path.join(HERE, '../smartbot-vm/core.js'), FEAT = path.join(HERE, 'feat.js');
if (!isMainThread) {
  const { Engine } = require('../engine');
  const eng = new Engine({ build: workerData.build, scripts: [CORE, FEAT] });
  eng.ev('SB.init()'); if (workerData.net) eng.ctx.PRED.load(workerData.net);
  parentPort.on('message', ({ seed, params, opts }) => {
    const t = process.hrtime.bigint(); const r = eng.ctx.SB.playRun(seed, params, opts);
    parentPort.postMessage({ seed, win: r && r.win ? 1 : 0, lives: r ? r.lives : 0, err: r && r.err ? String(r.err).slice(0, 80) : null, ms: Number(process.hrtime.bigint() - t) / 1e6 });
  });
  return;
}
const A = {}; process.argv.slice(2).forEach((a, i, v) => { if (a.startsWith('--')) A[a.slice(2)] = v[i + 1] && !v[i + 1].startsWith('--') ? v[i + 1] : true; });
const L = require('../smartbot-vm/lib');
const BUILD = path.resolve(A.build), N = +(A.runs || 300), NW = Math.min(os.cpus().length, +(A.workers || 4));
const net = A.net ? JSON.parse(fs.readFileSync(path.resolve(A.net), 'utf8')) : null;
const pol = JSON.parse(fs.readFileSync(path.resolve(A.policy || path.join(HERE, '../smartbot-vm/champion.json')), 'utf8'));
const seeds = L.seedSet(A.seedtag || 'abcheck', N), modes = String(A.modes || 'sim,pred').split(',');
const OPTS = { sim: { lookK: 2 }, pred: { lookK: 2, pred: true }, hybrid2: { lookK: 2, pred: 'hybrid', predTop: 2 }, hybrid3: { lookK: 2, pred: 'hybrid', predTop: 3 }, hybrid5: { lookK: 2, pred: 'hybrid', predTop: 5 } };
(async () => {
  const W = Array.from({ length: NW }, () => new Worker(__filename, { workerData: { build: BUILD, net } }));
  const out = {};
  for (const m of modes) {
    const t0 = Date.now(); const res = []; let next = 0;
    await new Promise(done => W.forEach(w => { const go = () => { if (next >= N) { if (res.length === N) done(); return; } w.postMessage({ seed: seeds[next++], params: pol.params, opts: OPTS[m] }); };
      w.removeAllListeners('message'); w.on('message', r => { res.push(r); if (res.length === N) done(); else go(); }); go(); }));
    const win = res.reduce((t, r) => t + r.win, 0) / N, ms = res.reduce((t, r) => t + r.ms, 0) / N;
    out[m] = { win: +(100 * win).toFixed(1), msPerRun: Math.round(ms), wall_s: Math.round((Date.now() - t0) / 1000), errs: res.filter(r => r.err).length, wins: res.map(r => r.seed + ':' + r.win) };
    console.log(`${m}: win ${out[m].win}%  ${out[m].msPerRun} ms per run (one worker)  wall ${out[m].wall_s}s  errors ${out[m].errs}`);
  }
  if (out.sim && out.pred) { const a = Object.fromEntries(out.sim.wins.map(x => x.split(':'))), b = Object.fromEntries(out.pred.wins.map(x => x.split(':')));
    let both = 0, onlyS = 0, onlyP = 0; Object.keys(a).forEach(k => { if (a[k] === '1' && b[k] === '1') both++; else if (a[k] === '1') onlyS++; else if (b[k] === '1') onlyP++; });
    console.log(`same seeds: both won ${both}, only sim ${onlyS}, only pred ${onlyP}; speed-up x${(out.sim.msPerRun / out.pred.msPerRun).toFixed(1)}`); }
  if (A.out) fs.writeFileSync(path.resolve(A.out), JSON.stringify(out, null, 1));
  W.forEach(w => w.terminate());
})();

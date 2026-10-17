// Battle predictor dataset: the expert bot plays runs and records every n-th practice fight of its lookahead
// (features at the start of the fight, the fight score 0..1 and win 0/1). Rows are float32 [F features, s, win].
//   node gen.js --build <game.html> [--runs 600] [--every 4] [--workers 4] [--tag gen] [--out data.f32] [--policy champion.json]
// Writes <out> (rows) and <out>.json (F, rows, per-run row ranges, so a hold-out can be split by run).
'use strict';
const path = require('path'), fs = require('fs'), os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const HERE = __dirname, CORE = path.join(HERE, '../smartbot-vm/core.js'), FEAT = path.join(HERE, 'feat.js');

if (!isMainThread) {
  const { Engine } = require('../engine');
  const eng = new Engine({ build: workerData.build, scripts: [CORE, FEAT] });
  eng.ev('SB.init()');
  const F = eng.ev('PRED.F');
  parentPort.on('message', ({ seed, params, opts }) => {
    eng.ev('PRED.log=[]');
    const g = eng.ctx; const r = g.SB.playRun(seed, params, opts), L = g.PRED.log, n = L.length / 3;
    const buf = new Float32Array(n * (F + 2));
    for (let i = 0; i < n; i++) { buf.set(L[3 * i], i * (F + 2)); buf[i * (F + 2) + F] = L[3 * i + 1]; buf[i * (F + 2) + F + 1] = L[3 * i + 2]; }
    parentPort.postMessage({ seed, F, win: r && r.win ? 1 : 0, err: r && r.err, buf: Buffer.from(buf.buffer) }, []);
  });
  return;
}
const A = {}; process.argv.slice(2).forEach((a, i, v) => { if (a.startsWith('--')) A[a.slice(2)] = v[i + 1] && !v[i + 1].startsWith('--') ? v[i + 1] : true; });
const BUILD = path.resolve(A.build), RUNS = +(A.runs || 600), EVERY = +(A.every || 4), NW = Math.min(os.cpus().length, +(A.workers || 4));
const OUT = path.resolve(A.out || path.join(HERE, 'data.f32')), TAG = A.tag || 'gen';
const pol = JSON.parse(fs.readFileSync(path.resolve(A.policy || path.join(HERE, '../smartbot-vm/champion.json')), 'utf8'));
const hseed = (...xs) => { let h = 0x811c9dc5; for (const x of xs) { const s = String(x); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } h ^= 0x7f; h = Math.imul(h, 0x01000193); } return (h >>> 1) || 1; };
const seeds = Array.from({ length: RUNS }, (_, i) => hseed('tropebrawl-pred', TAG, i));
const fd = fs.openSync(OUT, 'w'); const meta = { build: path.basename(BUILD), policy: pol.id, every: EVERY, F: 0, rows: 0, runs: [], wins: 0, errs: 0 };
let next = 0, done = 0; const t0 = Date.now();
const W = Array.from({ length: NW }, () => new Worker(__filename, { workerData: { build: BUILD } }));
function feed(w) { if (next >= RUNS) return false; w.postMessage({ seed: seeds[next++], params: pol.params, opts: { lookK: 2, logLook: EVERY } }); return true; }
W.forEach(w => {
  w.on('message', m => {
    meta.F = m.F; const n = m.buf.length / 4 / (m.F + 2);
    fs.writeSync(fd, m.buf); meta.runs.push([m.seed, meta.rows, n]); meta.rows += n; meta.wins += m.win; if (m.err) meta.errs++;
    if (++done % 50 === 0) console.log(`${done}/${RUNS} runs, ${meta.rows} rows, ${((Date.now() - t0) / 60000).toFixed(1)} min`);
    if (!feed(w)) { w.terminate(); if (done === RUNS) { fs.closeSync(fd); fs.writeFileSync(OUT + '.json', JSON.stringify(meta)); console.log('done', meta.rows, 'rows', ((Date.now() - t0) / 60000).toFixed(1), 'min, expert won', meta.wins, '/', RUNS); } }
  });
  feed(w);
});

// Champion pool for rivals: sep-CMA-ES (smartbot-vm/cma.js) tunes each rival style's policy numbers (rvpol.js) to win
// more runs at a Game Level, inside ranges that keep the style true. The best validated policies per style become
// that style's champion pool (rivals-pool.json); the game draws one per rival per run. No AI, CPU only.
//
// node rival-train.js --build <game.html> [--styles penny,rex,...] [--lv 10] [--gens 30] [--seeds 24] [--lambda 10]
//                     [--val 64] [--check 200] [--pool 3] [--workers 4] [--out rivals-pool.json]
// Fitness per run: a win scores 1 + lives/20, a loss round/40. Validation and the final check use their own seeds;
// the check (fresh seeds, never used to choose) is the number to trust.
'use strict';
const path = require('path'), fs = require('fs'), os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const RV = require('./rvpol');

const DRIVER = String.raw`function __rvRun(x,lv){const P=rvMkPol(x);UI.lv=lv;newRun(false);let g=0;
  while(!S.over&&g++<120){
    if(UI.screen==='event'||S.event){
      if(S.event&&S.event.cut){const k=S.event.sub.ids[0];if(k&&typeof cutCost==='function'&&S.gold>=cutCost(k))eventSub(k+'+');
        if(!S.event.subDone&&S.lives>TUNE.cutFight+2)eventSub('fight');if(!S.event.subDone)eventSub(null);finishEvent();continue;}
      rvEvent(P);if(S.event)finishEvent();continue;}
    rvShop(P);if(!fielded().length&&S.units[0])S.units[0].slot='f1';
    startBattle(true);let k=0;while(!B.done&&k++<30000)step(DT);advanceAfterFight(settle());}
  return {win:S.result==='win'?1:0,round:S.round,lives:Math.max(0,S.lives|0),stuck:S.over?0:1};}`;

if (!isMainThread) {
  const { Engine } = require('./engine');
  const eng = new Engine({ build: workerData.build });
  if (!eng.get('rvMkPol')) eng.ev(RV.MKPOL.replace('function rvMkPol', 'globalThis.rvMkPol=function'));
  eng.ev(DRIVER.replace('function __rvRun', 'globalThis.__rvRun=function'));
  parentPort.on('message', ({ id, x, seeds, lv }) => {
    const out = seeds.map(s => { try { eng.seed(s); return JSON.parse(eng.ev(`JSON.stringify(__rvRun(${JSON.stringify(x)},${lv | 0}))`)); } catch (e) { return { win: 0, round: 0, lives: 0, err: String(e.message || e).slice(0, 80) }; } });
    parentPort.postMessage({ id, out });
  });
  return;
}

const A = {}; process.argv.slice(2).forEach((a, i, v) => { if (a.startsWith('--')) A[a.slice(2)] = v[i + 1] && !v[i + 1].startsWith('--') ? v[i + 1] : true; });
const { SepCMA } = require('./smartbot-vm/cma');
const BUILD = path.resolve(A.build || path.join(__dirname, '../tropebrawl.html'));
const CFG = { lv: +(A.lv || 10), gens: +(A.gens || 30), seeds: +(A.seeds || 24), lambda: +(A.lambda || 10), val: +(A.val || 64), check: +(A.check || 200), pool: +(A.pool || 3), every: +(A.every || 5), workers: Math.min(os.cpus().length, +(A.workers || 4)) };
const STY = A.styles ? String(A.styles).split(',') : Object.keys(RV.STYLES);
const OUT = path.resolve(A.out || path.join(__dirname, 'rivals-pool.json'));
const hseed = (...xs) => { let h = 0x811c9dc5; for (const x of xs) { const s = String(x); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } h ^= 0x7f; h = Math.imul(h, 0x01000193); } return (h >>> 1) || 1; };
const seedSet = (kind, n, salt = 0) => Array.from({ length: n }, (_, i) => hseed('tropebrawl-rivals', kind, salt, i));
const fit = r => r.win ? 1 + r.lives / 20 : r.round / 40;
const prof = rs => { const n = rs.length || 1; return { fit: +(rs.reduce((t, r) => t + fit(r), 0) / n).toFixed(4), win: +(rs.reduce((t, r) => t + r.win, 0) / n).toFixed(3), round: +(rs.reduce((t, r) => t + r.round, 0) / n).toFixed(1), stuck: rs.filter(r => r.stuck || r.err).length }; };

// a pool of workers; run(x, seeds) splits the seeds across them
const W = Array.from({ length: CFG.workers }, () => new Worker(__filename, { workerData: { build: BUILD } }));
let jid = 0; const pend = {}; W.forEach(w => w.on('message', m => { pend[m.id](m.out); delete pend[m.id]; }));
const queue = []; const idle = W.slice();
function pump() { while (idle.length && queue.length) { const w = idle.shift(), job = queue.shift(); pend[job.id] = out => { idle.push(w); job.done(out); pump(); }; w.postMessage({ id: job.id, x: job.x, seeds: job.seeds, lv: CFG.lv }); } }
const runChunk = (x, seeds) => new Promise(done => { queue.push({ id: ++jid, x, seeds, done }); pump(); });
async function run(x, seeds) { const k = Math.max(1, Math.ceil(seeds.length / 6)), parts = []; for (let i = 0; i < seeds.length; i += k) parts.push(runChunk(x, seeds.slice(i, i + k))); return (await Promise.all(parts)).flat(); }
const runMany = (xs, seeds) => Promise.all(xs.map(x => run(x, seeds)));

(async () => {
  const t0 = Date.now(), res = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { styles: {} };
  Object.assign(res, { build: path.basename(BUILD), lv: CFG.lv, cfg: CFG, at: new Date().toISOString() });
  const valSeeds = seedSet('val', CFG.val), checkSeeds = seedSet('check', CFG.check);
  for (const style of STY) {
    const spec = RV.specOf(style), hand = Object.assign({}, RV.HAND[style], RV.STYLES[style].fixed);
    const cma = new SepCMA({ mean: RV.toZ(spec, hand), sigma: 0.15, lambda: CFG.lambda });
    const validated = [];
    const validate = async (z, tag) => { const x = RV.toX(style, spec, z); const p = prof(await run(x, valSeeds)); validated.push({ z, x, val: p, tag }); return p; };
    const handVal = prof(await run(hand, valSeeds));
    for (let g = 1; g <= CFG.gens; g++) {
      const seeds = seedSet(style + ':train', CFG.seeds, g), zs = cma.ask(), xs = zs.map(z => RV.toX(style, spec, z));
      const rs = await runMany(xs, seeds), fs_ = rs.map(r => prof(r).fit);
      cma.tell(zs, fs_);
      if (g % CFG.every === 0 || g === CFG.gens) {
        const bi = fs_.indexOf(Math.max(...fs_)); const pm = await validate(cma.m.slice(), 'mean' + g), pb = await validate(zs[bi], 'best' + g);
        console.log(`[${style}] gen ${g} train best ${fs_[bi].toFixed(3)} | val mean ${pm.win} best ${pb.win} (hand ${handVal.win}) sigma ${cma.sigma.toFixed(3)} ${((Date.now() - t0) / 60000).toFixed(1)}min`);
      }
    }
    // pool: best validated, mutually distinct (z distance), then re-checked on fresh seeds with the hand-made policy
    validated.sort((a, b) => b.val.fit - a.val.fit);
    const pool = []; for (const v of validated) { if (pool.length >= CFG.pool) break; if (pool.every(p => Math.hypot(...p.z.map((q, i) => q - v.z[i])) > 0.08)) pool.push(v); }
    const handChk = prof(await run(hand, checkSeeds));
    for (const p of pool) p.check = prof(await run(p.x, checkSeeds));
    res.styles[style] = { hand: { x: hand, val: handVal, check: handChk }, pool: pool.map(p => ({ x: p.x, val: p.val, check: p.check, tag: p.tag })) };
    console.log(`[${style}] pool check win ${pool.map(p => p.check.win).join(' / ')} vs hand ${handChk.win} (${CFG.check} fresh runs)`);
    fs.writeFileSync(OUT, JSON.stringify(res, null, 1));
  }
  console.log('done', ((Date.now() - t0) / 60000).toFixed(1), 'min ->', OUT);
  W.forEach(w => w.terminate());
})().catch(e => { console.error(e); process.exit(1); });

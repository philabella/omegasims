#!/usr/bin/env node
// Parity + speed check: does fastsim play the same game as Chromium?
//
//   node parity.js exact [--policies balanced,rarity,commons,random] [--seeds 1000-1049] [--build f] [--smart N]
//       Plays the same seeded runs in headless Chromium (the build page + bots.js via addScriptTag, as
//       lean/sim/sim.js does) and in fastsim, and compares every run's full bots.js log (every fight's round,
//       result, duration to 0.1s, board, the end state). Both sides seed the game's rand() and Math.random
//       identically (engine.js MATH_RANDOM_SRC). --smart N also replays N smartbot runs (core.js, champion policy).
//   node parity.js harness [--seeds 1-10]
//       Whole runs through the aiplayer harness layer (pageside.js text view, pick/fight helpers, onAction, render) by a
//       scripted player, in Chromium and in fastsim: every printed view, pick result and fight report must match.
//   node parity.js stats [--policies balanced,rarity,commons] [--n 500] [--workers 2] [--build f]
//       Chromium unseeded exactly like lean/sim/sim.js (native Math.random), fastsim seeded; compares win rates
//       (two-proportion z) and profile averages, and reports runs/s for both.
// Chromium writes its wrapped page copy to /tmp/claude-0/fastsim-scratch-cache (never to the build folder).
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { Engine, DEFAULT_BUILD, DEFAULT_BOTS, MATH_RANDOM_SRC, hseed } = require('./engine');
const { makeEngine } = require('./recorder');

const PW = '/opt/node-tools/node_modules/playwright';
const CHROME = process.env.TB_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const CACHE = require('path').join(require('os').tmpdir(), 'fastsim-scratch-cache');
const SMART_DIR = path.resolve(__dirname, '../playtester/smartbot');

function args(argv) { const o = { _: [] }; for (let i = 0; i < argv.length; i++) { const a = argv[i]; if (a.startsWith('--')) { const k = a.slice(2), nx = argv[i + 1]; if (nx === undefined || nx.startsWith('--')) o[k] = true; else { o[k] = nx; i++; } } else o._.push(a); } return o; }
const A = args(process.argv.slice(2));
const MODE = A._[0] || 'exact';
const BUILD = path.resolve(A.build || DEFAULT_BUILD);
const BOTS = path.resolve(A.bots || DEFAULT_BOTS);
const POLS = String(A.policies || (MODE === 'exact' ? 'balanced,rarity,commons,random' : 'balanced,rarity,commons')).split(',');
const range = s => /^-?\d+-\d+$/.test(s) ? (() => { const [a, b] = s.split('-').map(Number); return Array.from({ length: b - a + 1 }, (_, i) => a + i); })() : s.split(',').map(Number);

function wrapPage(buildPath) {
  const src = fs.readFileSync(buildPath, 'utf8');
  const h = crypto.createHash('sha1').update(src).digest('hex').slice(0, 10);
  fs.mkdirSync(CACHE, { recursive: true });
  const out = path.join(CACHE, `page-${h}.html`);
  if (!fs.existsSync(out)) {
    // the same wrapping lean/sim/sim.js does: a document around the fragment, web fonts dropped (no network)
    const body = /<html[\s>]/i.test(src) ? src : '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' + src + '</body></html>';
    fs.writeFileSync(out, body.replace(/<link[^>]*fonts[^>]*>/g, ''));
  }
  return out;
}
async function chromiumPage(extraScripts = [], seededMath = true) {
  const { chromium } = require(PW);
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto('file://' + wrapPage(BUILD));
  for (const s of extraScripts) await page.addScriptTag({ path: s });
  if (seededMath) await page.addScriptTag({ content: MATH_RANDOM_SRC });
  return { browser, page, errs };
}
const kindPol = p => p === 'random' ? ['random', 'balanced'] : ['greedy', p];
const fmt = (x, d = 1) => (x == null || isNaN(x)) ? '-' : x.toFixed(d);

async function exact() {
  const seeds = range(String(A.seeds || '1000-1049'));
  const res = {};
  // ---- Chromium ----
  let t0 = Date.now();
  const { browser, page, errs } = await chromiumPage([BOTS]);
  const tLaunch = (Date.now() - t0) / 1000;
  const chrome = {}; let tChrome = 0;
  for (const p of POLS) {
    const [kind, pol] = kindPol(p);
    const ms = seeds.map(s => hseed('math', s));
    const t1 = Date.now();
    chrome[p] = await page.evaluate(([seeds, ms, kind, pol]) => seeds.map((s, i) => {
      (0, eval)(`seeded=true;rngState=${s | 0}`); __seedMath(ms[i]);
      let log; try { log = BOT.run(kind, false, null, null, pol); } catch (e) { log = { err: e.message }; }
      return { log, S: JSON.stringify((0, eval)('S')) };
    }), [seeds, ms, kind, pol]);
    tChrome += (Date.now() - t1) / 1000;
  }
  let smartChrome = null, smartSeeds = [], champ = null;
  const nSmart = +(A.smart || 0);
  if (nSmart) {
    champ = findChampion();
    smartSeeds = Array.from({ length: nSmart }, (_, i) => hseed('fastsim-parity-smart', i) >>> 1 || 1);
    await page.addScriptTag({ path: path.join(SMART_DIR, 'core.js') });
    await page.evaluate(() => SB.init());
    const t1 = Date.now();
    smartChrome = await page.evaluate(([s, p]) => SB.playMany(s, p, { lookK: 2 }), [smartSeeds, champ.params]);
    res.smartChromeSecs = (Date.now() - t1) / 1000;
  }
  // Array.sort comparator order (random comparators), n = 2..100: the one engine difference fastsim corrects for
  const sortProbe = () => { const out = []; for (const n of [2, 3, 4, 5, 6, 7, 8, 9, 11, 16, 23, 33, 64, 100]) for (let s = 0; s < 25; s++) { __seedMath(s * 77 + n); let c = 0; const a = Array.from({ length: n }, (_, i) => i).sort(() => { c++; return Math.random() - .5; }); out.push(n + ':' + c + ':' + a.join(',')); } return out; };
  const sortChrome = await page.evaluate(sortProbe);
  const powProbe = () => { const o = []; let s = 12345; const r = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
    for (let k = 0; k <= 20; k++) for (const b of [1.09, 0.9, 1.1, 10]) o.push(Math.pow(b, k));
    for (let i = 0; i < 10000; i++) o.push(Math.pow(r() * 4, Math.floor(r() * 30))); for (let i = 0; i < 10000; i++) o.push(Math.pow(r() * 100, (r() - 0.5) * 20)); return o; };
  const powChrome = await page.evaluate(powProbe);
  await browser.close();
  // ---- fastsim ----
  const eng = makeEngine({ build: BUILD, bots: BOTS });   // the batch runner's engine: bots.js + recorder hooks
  const fast = {}; let tFast = 0;
  for (const p of POLS) {
    const [kind, pol] = kindPol(p);
    const t1 = Date.now();
    fast[p] = seeds.map(s => ({ log: eng.ctx.__fastsim.run(s, kind, false, null, null, pol).log, S: JSON.stringify(eng.ev('S')) }));
    tFast += (Date.now() - t1) / 1000;
  }
  // ---- compare ----
  console.log(`exact replay: ${seeds.length} seeds (${seeds[0]}..${seeds[seeds.length - 1]}) x ${POLS.length} policies, ${path.basename(BUILD)}`);
  let allSame = 0, allSameS = 0, all = 0;
  for (const p of POLS) {
    let same = 0, sameS = 0; const diffs = [];
    seeds.forEach((s, i) => { const a = JSON.stringify(chrome[p][i].log), b = JSON.stringify(fast[p][i].log); all++; if (a === b) { same++; allSame++; } else diffs.push(s); if (chrome[p][i].S === fast[p][i].S) { sameS++; allSameS++; } });
    const cl = chrome[p].map(r => r.log), fl = fast[p].map(r => r.log);
    const wc = cl.filter(r => r.end && r.end.result === 'win').length, wf = fl.filter(r => r.end && r.end.result === 'win').length;
    const nf = cl.reduce((a, r) => a + ((r.fights || []).length), 0);
    console.log(`  ${p.padEnd(9)} bots.js log identical ${same}/${seeds.length} runs (${nf} fights) | final game state S byte-identical ${sameS}/${seeds.length} | wins chromium ${wc} fastsim ${wf}${diffs.length ? ' | differ: ' + diffs.slice(0, 8).join(',') : ''}`);
    if (diffs.length && A.verbose) { const i = seeds.indexOf(diffs[0]); console.log('    chromium:', JSON.stringify(cl[i]).slice(0, 600)); console.log('    fastsim :', JSON.stringify(fl[i]).slice(0, 600)); }
  }
  const runs = seeds.length * POLS.length;
  console.log(`  total: logs identical ${allSame}/${all}, final state identical ${allSameS}/${all}`);
  { const e2 = new Engine({ build: BUILD }), e3 = new Engine({ build: BUILD, nativePow: true });
    const a = e2.evaluate(powProbe), b = e3.evaluate(powProbe); const eq = (x, y) => Object.is(x, y) || (x !== x && y !== y);
    console.log(`  Math.pow (${powChrome.length} cases incl. the game's 1.09**k, 0.9**k): fastsim [${e2.pow}] ${a.filter((x, i) => eq(x, powChrome[i])).length}/${a.length} identical to Chromium (Node's own pow: ${b.filter((x, i) => eq(x, powChrome[i])).length}/${b.length})`); }
  { const e2 = new Engine({ build: BUILD }), e3 = new Engine({ build: BUILD, nativeSort: true });
    const a = e2.evaluate(sortProbe), b = e3.evaluate(sortProbe);
    console.log(`  Array.sort with a random comparator (n=2..100, ${sortChrome.length} cases): fastsim ${a.filter((x, i) => x === sortChrome[i]).length}/${a.length} identical to Chromium (Node's native sort: ${b.filter((x, i) => x === sortChrome[i]).length}/${b.length})`); }
  console.log(`  speed: chromium ${fmt(runs / tChrome)} runs/s (+${fmt(tLaunch)}s launch) | fastsim ${fmt(runs / tFast)} runs/s (1 thread, in-process)`);
  if (nSmart) {
    const se = new Engine({ build: BUILD, scripts: [path.join(SMART_DIR, 'core.js')] });
    se.ev('SB.init()');
    const t1 = Date.now();
    const smartFast = se.evaluate(([s, p]) => SB.playMany(s, p, { lookK: 2 }), [smartSeeds, champ.params]);
    const tsf = (Date.now() - t1) / 1000;
    let same = 0; smartSeeds.forEach((s, i) => { if (JSON.stringify(smartChrome[i]) === JSON.stringify(smartFast[i])) same++; });
    console.log(`  smartbot (${path.relative(__dirname, champ.file)}, lookahead on): identical ${same}/${nSmart} runs (whole result incl. ${smartChrome.reduce((a, r) => a + ((r.stat && r.stat.sims) || 0), 0)} lookahead sims) | wins chromium ${smartChrome.filter(r => r.win).length} fastsim ${smartFast.filter(r => r.win).length}`);
    console.log(`  smartbot speed: chromium ${fmt(nSmart / res.smartChromeSecs, 2)} runs/s | fastsim ${fmt(nSmart / tsf, 2)} runs/s (1 thread)`);
  }
  if (errs.length) console.log('  PAGE ERRORS', errs.slice(0, 3));
}

function findChampion() {
  const f = A.champion ? path.resolve(A.champion) : null;
  const cands = f ? [f] : fs.readdirSync(path.join(SMART_DIR, 'runs')).map(d => path.join(SMART_DIR, 'runs', d, 'champion.json')).filter(fs.existsSync).sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  if (!cands.length) throw new Error('no smartbot champion.json found');
  const j = JSON.parse(fs.readFileSync(cands[0], 'utf8'));
  return { file: cands[0], params: j.params || j };
}

async function stats() {
  const n = +(A.n || 500);
  const rows = [];
  for (const p of POLS) {
    const [kind, pol] = kindPol(p);
    // Chromium: unseeded, the same loop as lean/sim/sim.js
    const t0 = Date.now();
    const { browser, page } = await chromiumPage([BOTS], false);
    const t1 = Date.now();
    const cr = await page.evaluate(([N, kind, pol]) => { const out = []; for (let i = 0; i < N; i++) { try { out.push(BOT.run(kind, false, null, null, pol)); } catch (e) { out.push({ err: e.message }); } } return out; }, [n, kind, pol]);
    const t2 = Date.now();
    await browser.close();
    // fastsim: seeded batch through sim.js (workers)
    const t3 = Date.now();
    const jf = path.join(CACHE, `parity-${process.pid}.json`);
    execFileSync(process.execPath, [path.join(__dirname, 'sim.js'), String(n), p, '--seed', String(+(A.seed || 777000)), '--workers', String(+(A.workers || 2)), '--json', jf, '--build', BUILD, '--bots', BOTS], { stdio: ['ignore', 'pipe', 'inherit'] });
    const t4 = Date.now();
    const fr = JSON.parse(fs.readFileSync(jf, 'utf8')).map(r => r.log); fs.unlinkSync(jf);
    rows.push({ p, c: profile(cr), f: profile(fr), chromeRate: n / ((t2 - t1) / 1000), chromeWall: (t2 - t0) / 1000, fastWall: (t4 - t3) / 1000 });
  }
  console.log(`win rates, Chromium (unseeded, like lean/sim/sim.js) vs fastsim (seeded), N=${n} each, ${path.basename(BUILD)}`);
  console.log('policy     chromium  fastsim   diff   z     | rank c/f   merges c/f  lives(win) c/f | wall s c/f (runs/s c/f)');
  rows.forEach(r => {
    const p1 = r.c.win, p2 = r.f.win, pp = (p1 * r.c.n + p2 * r.f.n) / (r.c.n + r.f.n);
    const z = (p2 - p1) / Math.sqrt(pp * (1 - pp) * (1 / r.c.n + 1 / r.f.n));
    console.log(`${r.p.padEnd(10)} ${fmt(100 * p1).padStart(6)}%  ${fmt(100 * p2).padStart(6)}%  ${fmt(100 * (p2 - p1)).padStart(5)}  ${fmt(z, 2).padStart(5)} | ${fmt(r.c.rank, 2)}/${fmt(r.f.rank, 2)}  ${fmt(r.c.merges)}/${fmt(r.f.merges)}  ${fmt(r.c.lives)}/${fmt(r.f.lives)} | ${fmt(r.chromeWall)}/${fmt(r.fastWall)} (${fmt(r.c.n / r.chromeWall)}/${fmt(r.f.n / r.fastWall)})`);
  });
}
function profile(runs) {
  const ok = runs.filter(r => r && !r.err && r.end); const n = ok.length; const avg = f => ok.reduce((s, r) => s + f(r), 0) / Math.max(1, n);
  const w = ok.filter(r => r.end.result === 'win');
  return { n, win: w.length / Math.max(1, n), rank: avg(r => r.end.rank), merges: avg(r => r.end.merges), lives: w.reduce((s, r) => s + r.end.lives, 0) / Math.max(1, w.length) };
}

// whole runs through the aiplayer harness layer (pageside.js: text view, pick/fight helpers, onAction, render):
// a fixed scripted player, the same function in Chromium and in fastsim; compares every view, fight report and the end state
const PAGESIDE = path.resolve(__dirname, '../playtester/aiplayer/pageside.js');
const playScript = ([seed, maxSteps]) => {
  const out = []; const G = TBH.G; TBH.seed(seed); TBH.onA('new'); TBH.takeToasts();
  for (let step = 0; step < maxSteps; step++) {
    const S = G('S'), UI = G('UI');
    if (!S || S.over) break;
    if ((S.pending && S.pending.length && UI.sheetOpen === 'modal') || UI.screen === 'event') { out.push(TBH.view(null, TBH.takeToasts())); out.push(TBH.pick(String(step % 2))); continue; }
    let acted = false;
    for (let i = 0; i < 5 && !acted; i++) { const o = S.shop[i]; if (o && G('canBuy')(i).ok && S.gold >= G('shopPrice')(o) + 1) { TBH.onA('buy', i); out.push('buy ' + i); acted = true; } }
    if (acted) continue;
    const rc = G('rankCost')(); if (rc != null && S.gold >= rc + 2 && S.round >= 2) { TBH.onA('rank'); out.push('rank'); continue; }
    if (S.gold >= 4 && step % 3 === 0) { TBH.onA('reroll'); out.push('reroll'); continue; }
    out.push(TBH.view(null, TBH.takeToasts()));
    const fs = TBH.fightStart(); if (fs !== 'ok') { out.push(fs); break; }
    const f = TBH.fightCapture(); delete f.overlay; out.push(JSON.stringify(f));
    TBH.afterFight();
  }
  out.push(TBH.view(null, TBH.takeToasts()));
  out.push(JSON.stringify(G('S')));
  return out;
};
async function harness() {
  const seeds = range(String(A.seeds || '1-10'));
  const { browser, page, errs } = await chromiumPage([PAGESIDE], false);
  const c = []; for (const s of seeds) c.push(await page.evaluate(playScript, [s, 400]));
  await browser.close();
  const eng = new Engine({ build: BUILD, scripts: [PAGESIDE] });
  let same = 0, lines = 0, sameLines = 0, fights = 0;
  seeds.forEach((s, k) => {
    const f = eng.evaluate(playScript, [s, 400]);
    const a = c[k]; lines += a.length; fights += a.filter(x => x.startsWith('{"round"')).length;
    a.forEach((x, i) => { if (x === f[i]) sameLines++; });
    if (JSON.stringify(a) === JSON.stringify(f)) same++;
    else if (A.verbose) { const i = a.findIndex((x, i) => x !== f[i]); console.log(`seed ${s} first difference at step ${i}:\n  chromium: ${String(a[i]).slice(0, 400)}\n  fastsim : ${String(f[i]).slice(0, 400)}`); }
  });
  console.log(`harness replay (aiplayer/pageside.js view + onAction + render, scripted player): ${same}/${seeds.length} runs identical | ${sameLines}/${lines} views, picks and fight reports identical (${fights} fights, end states included)`);
  if (errs.length) console.log('  PAGE ERRORS', errs.slice(0, 3));
}

(MODE === 'stats' ? stats() : MODE === 'harness' ? harness() : exact()).catch(e => { console.error(e); process.exit(1); });

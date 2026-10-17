#!/usr/bin/env node
// Speed: fastsim vs the Chromium path of lean/sim/sim.js on the same policy.
//   node bench.js [--n 300] [--policy balanced] [--workers 1,2] [--build f] [--smart 4] [--nice]
// Reports wall-clock runs/s (what you wait for) and runs per CPU-second (independent of machine load).
// CPU time: fastsim = process.cpuUsage() of the sim.js process (all worker threads); Chromium = utime+stime of the
// whole browser process tree (browser, renderer, GPU, utility) read from /proc. Headless Chromium renderers here run
// at nice -8, so under load wall-clock favours Chromium; --nice starts the fastsim processes at nice -8 too.
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { DEFAULT_BUILD, DEFAULT_BOTS, Engine } = require('./engine');

function args(argv) { const o = { _: [] }; for (let i = 0; i < argv.length; i++) { const a = argv[i]; if (a.startsWith('--')) { const k = a.slice(2), nx = argv[i + 1]; if (nx === undefined || nx.startsWith('--')) o[k] = true; else { o[k] = nx; i++; } } else o._.push(a); } return o; }
const A = args(process.argv.slice(2));
const N = +(A.n || 300), POL = A.policy || 'balanced', BUILD = path.resolve(A.build || DEFAULT_BUILD);
const WORKERS = String(A.workers || '1,2').split(',').map(Number);
const CACHE = require('path').join(require('os').tmpdir(), 'fastsim-scratch-cache');
const TCK = 100; // clock ticks per second (Linux USER_HZ)

function treeCpu(rootPid) { // seconds of CPU used so far by all descendants of rootPid (Playwright's Chromium processes)
  const kids = {}; const stat = {};
  for (const d of fs.readdirSync('/proc')) { if (!/^\d+$/.test(d)) continue; try { const s = fs.readFileSync(`/proc/${d}/stat`, 'utf8'); const r = s.slice(s.lastIndexOf(')') + 2).split(' '); const ppid = +r[1]; stat[d] = (+r[11] + +r[12]) / TCK; (kids[ppid] = kids[ppid] || []).push(+d); } catch (e) {} }
  let tot = 0; const st = (kids[rootPid] || []).slice(); while (st.length) { const p = st.pop(); tot += stat[p] || 0; (kids[p] || []).forEach(k => st.push(k)); }
  return tot;
}
function wrapPage() {
  const src = fs.readFileSync(BUILD, 'utf8'); const h = require('crypto').createHash('sha1').update(src).digest('hex').slice(0, 10);
  fs.mkdirSync(CACHE, { recursive: true }); const out = path.join(CACHE, `page-${h}.html`);
  if (!fs.existsSync(out)) fs.writeFileSync(out, ('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' + src + '</body></html>').replace(/<link[^>]*fonts[^>]*>/g, ''));
  return out;
}
const kindPol = p => p === 'random' ? ['random', 'balanced'] : ['greedy', p];

(async () => {
  const rows = [];
  // ---- Chromium: exactly the lean/sim/sim.js loop (one page, unseeded) ----
  {
    const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
    const t0 = Date.now();
    const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
    const pid = process.pid;
    const page = await browser.newPage();
    await page.goto('file://' + wrapPage());
    await page.addScriptTag({ path: DEFAULT_BOTS });
    const t1 = Date.now(), c1 = treeCpu(pid);
    const [kind, pol] = kindPol(POL);
    await page.evaluate(([N, kind, pol]) => { const out = []; for (let i = 0; i < N; i++) { try { out.push(BOT.run(kind, false, null, null, pol)); } catch (e) { out.push({ err: e.message }); } } return out.length; }, [N, kind, pol]);
    const t2 = Date.now(), c2 = treeCpu(pid);
    await browser.close();
    rows.push({ what: 'Chromium (lean/sim/sim.js loop, 1 page)', wall: (t2 - t1) / 1000, total: (Date.now() - t0) / 1000, cpu: c2 - c1 });
  }
  // ---- fastsim: sim.js as a separate process, 1..k worker threads ----
  for (const k of WORKERS) {
    const t0 = Date.now();
    const cmd = [path.join(__dirname, 'sim.js'), String(N), POL, '--seed', '424242', '--workers', String(k), '--build', BUILD];
    const r = A.nice ? spawnSync('nice', ['-n', '-8', process.execPath, ...cmd], { encoding: 'utf8' }) : spawnSync(process.execPath, cmd, { encoding: 'utf8' });
    const total = (Date.now() - t0) / 1000;
    const m = /runs in ([\d.]+)s .*cpu ([\d.]+)s/.exec(r.stdout || '');
    if (!m) { console.log('sim.js failed:', r.stdout, r.stderr); continue; }
    rows.push({ what: `fastsim sim.js, ${k} worker${k > 1 ? 's' : ''}${A.nice ? ' (nice -8)' : ''}`, wall: +m[1], total, cpu: +m[2] });
  }
  console.log(`speed, ${N} runs of policy ${POL} on ${path.basename(BUILD)} | load average ${fs.readFileSync('/proc/loadavg', 'utf8').split(' ').slice(0, 3).join(' ')} on ${require('os').cpus().length} CPUs`);
  console.log('                                              runs/s (wall)   incl. startup   runs per CPU-second');
  rows.forEach(r => console.log(`  ${r.what.padEnd(44)} ${(N / r.wall).toFixed(1).padStart(8)}        ${(N / r.total).toFixed(1).padStart(8)}        ${(N / r.cpu).toFixed(1).padStart(8)}`));
  // ---- the smartbot (lookahead-heavy), one thread each ----
  if (A.smart) {
    const n = +A.smart; const SM = path.resolve(__dirname, '../playtester/smartbot');
    const champFile = fs.readdirSync(path.join(SM, 'runs')).map(d => path.join(SM, 'runs', d, 'champion.json')).filter(fs.existsSync).sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
    const champ = JSON.parse(fs.readFileSync(champFile, 'utf8')); const seeds = Array.from({ length: n }, (_, i) => 9000 + i);
    const { chromium } = (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})();
    const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }); const pid = process.pid;
    const page = await browser.newPage(); await page.goto('file://' + wrapPage()); await page.addScriptTag({ path: path.join(SM, 'core.js') }); await page.evaluate(() => SB.init());
    let t = Date.now(), c = treeCpu(pid); await page.evaluate(([s, p]) => SB.playMany(s, p, { lookK: 2 }).length, [seeds, champ.params]); const cw = (Date.now() - t) / 1000, cc = treeCpu(pid) - c; await browser.close();
    const e = new Engine({ build: BUILD, scripts: [path.join(SM, 'core.js')] }); e.ev('SB.init()');
    t = Date.now(); const u0 = process.cpuUsage(); e.evaluate(([s, p]) => SB.playMany(s, p, { lookK: 2 }).length, [seeds, champ.params]); const fw = (Date.now() - t) / 1000; const uu = process.cpuUsage(u0); const fc = (uu.user + uu.system) / 1e6;
    console.log(`  smartbot champion, ${n} runs, 1 thread: Chromium ${(n / cw).toFixed(2)} runs/s (${(n / cc).toFixed(2)} per CPU-s) | fastsim ${(n / fw).toFixed(2)} runs/s (${(n / fc).toFixed(2)} per CPU-s)`);
  }
})().catch(e => { console.error(e); process.exit(1); });

// node ladder-ablate.js --build <lv.html> --policy <champion.json> --runs 100: champion vs weaker variants on one build
const path = require('path');
const L = require('./lib');
const A = L.args(process.argv.slice(2));
const BUILD = path.resolve(A.build), pol = L.readJSON(path.resolve(A.policy), null), params = pol.params || pol;
const N = +(A.runs || 100), seeds = L.seedSet('report', N);
(async () => {
  const browser = await L.launch();
  const pool = await new L.Pool(browser, BUILD, 2, { greedy: true }).start();
  if (A.stress) await pool.stress(+A.stress);
  if (A.tune) { const t = JSON.parse(A.tune); for (const p of pool.pages) await p.evaluate(t => Object.assign((0, eval)('TUNE'), t), t); }
  const V = A.only ? { 'expert': {}, 'no fight simulator': { noLook: true } } : { 'expert': {}, 'no fight simulator': { noLook: true }, 'no simulator, no rerolls': { noLook: true, noReroll: true }, 'no simulator, rank<=4': { noLook: true, maxRank: 4 } };
  const jobs = Object.entries(V).map(([k, o]) => ({ key: k, kind: 'smart', params, opts: Object.assign({ lookK: 2 }, o), seeds }));
  const res = await pool.run(jobs, 5);
  const parts = jobs.map(j => { const ok = res[j.key].filter(r => r && !r.err), w = ok.filter(r => r.win); return `${j.key} ${(100 * w.length / (ok.length || 1)).toFixed(0)}% (lives ${(w.reduce((s, r) => s + r.lives, 0) / (w.length || 1)).toFixed(1)})`; });
  console.log(path.basename(BUILD).padEnd(10) + (A.stress ? ' x' + A.stress : '') + (A.tune ? ' ' + A.tune : ''), parts.join(' | '));
  await browser.close();
})();

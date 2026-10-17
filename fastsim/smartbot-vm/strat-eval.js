// Strategy specialists vs the free expert: every trained bot plays the SAME seeds on one build, under the
// constraint it was trained with (champion.json opts/fix), so every difference is paired.
//
// node strat-eval.js --engine vm --build <game.html> --bots '[{"key":"expert","label":"Free expert","dir":"runs/v19lv10"},..]'
//                    [--runs 200] [--workers 4] [--seedtag strat] [--tune '{...}'] [--out file.md]
// A bot is {key, label, dir} (its champion.json) or {key, label, policy, opts}. opts in the entry override the champion's.
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const A = L.args(process.argv.slice(2));
const BUILD = path.resolve(A.build || L.DEFAULT_BUILD);
const N = +(A.runs || 200), W = +(A.workers || 4);
const BOTS = JSON.parse(A.bots);
const seeds = L.seedSet(A.seedtag || 'strat', N);
const pct = x => (100 * x).toFixed(1);
(async () => {
  const T0 = Date.now();
  const browser = await L.launch();
  const pool = await new L.Pool(browser, BUILD, W).start();
  if (A.tune) { const t = JSON.parse(A.tune); for (const p of pool.pages) await p.evaluate(t => Object.assign((0, eval)('TUNE'), t), t); }
  const jobs = BOTS.map(b => {
    const pol = L.readJSON(path.resolve(b.policy || path.join(b.dir, 'champion.json')), null);
    if (!pol) throw new Error('no policy for ' + b.key);
    const opts = Object.assign({ lookK: 2 }, pol.opts || {}, b.opts || {});
    return { key: b.key, kind: 'smart', params: pol.params || pol, opts, seeds, b, trained: pol.valProfile ? pol.valProfile.win : null };
  });
  const res = await pool.run(jobs, 4);
  await browser.close();
  const rows = jobs.map(j => {
    const runs = res[j.key].filter(r => r && !r.err), n = runs.length || 1, avg = f => runs.reduce((s, r) => s + f(r), 0) / n;
    const wins = runs.filter(r => r.win);
    const gold = avg(r => { const f = r.fights || []; return f.length ? f.reduce((s, x) => s + x.gold, 0) / f.length : 0; });
    return { key: j.key, label: j.b.label || j.key, opts: j.opts, n: runs.length, errs: res[j.key].length - runs.length,
      win: avg(r => r.win ? 1 : 0), lives: wins.length ? wins.reduce((s, r) => s + r.lives, 0) / wins.length : 0, rank: avg(r => r.rank),
      r5share: avg(r => r.r5 != null ? 1 : 0), r5: (x => x.length ? x.reduce((a, b) => a + b, 0) / x.length : null)(runs.filter(r => r.r5 != null).map(r => r.r5)), gold, rerolls: avg(r => r.rerolls), merges: avg(r => r.merges), tier: avg(r => r.avgTier),
      sandbag: avg(r => (r.stat && r.stat.sandbag) || 0), trained: j.trained, seedWins: res[j.key].map(r => r && r.win ? 1 : 0) };
  });
  const base = rows.find(r => r.key === 'expert');
  // paired difference vs the expert: standard error from per-seed win differences
  rows.forEach(r => { if (!base || r === base) return; const d = r.seedWins.map((w, i) => w - base.seedWins[i]); const m = d.reduce((a, b) => a + b, 0) / d.length;
    const sd = Math.sqrt(d.reduce((a, b) => a + (b - m) ** 2, 0) / Math.max(1, d.length - 1)); r.diff = m; r.se = sd / Math.sqrt(d.length); });
  const md = [`# Strategy specialists: ${path.basename(BUILD)}`, '', `${N} runs per bot, same seeds for every bot (seed tag "${A.seedtag || 'strat'}"). Full-run win %. ` +
    'Every bot is the expert engine trained for about 30 minutes under its strategy constraint.', '',
    '| Bot | Win % | vs expert (points ± 1 s.e.) | Lives left on a win | Final rank | Reaches Rank 7 (share, avg round) | Avg 🪙 held | Rerolls | Merges | Avg rarity |', '|---|---|---|---|---|---|---|---|---|---|'];
  rows.forEach(r => md.push(`| ${r.label} | ${pct(r.win)}% | ${r.diff != null ? (r.diff >= 0 ? '+' : '') + (100 * r.diff).toFixed(1) + ' ± ' + (100 * r.se).toFixed(1) : '-'} | ${r.lives.toFixed(1)} | ${r.rank.toFixed(1)} | ${pct(r.r5share)}%${r.r5 != null ? ', r' + r.r5.toFixed(0) : ''} | ${r.gold.toFixed(0)} | ${r.rerolls.toFixed(0)} | ${r.merges.toFixed(1)} | ${r.tier.toFixed(2)} |`));
  md.push('', `Errors: ${rows.reduce((s, r) => s + r.errs, 0)}. Time ${((Date.now() - T0) / 60000).toFixed(1)} min.`);
  const txt = md.join('\n');
  console.log(txt);
  if (A.out) { fs.writeFileSync(path.resolve(A.out), txt + '\n'); fs.writeFileSync(path.resolve(A.out).replace(/\.md$/, '.json'), JSON.stringify(rows.map(r => Object.assign({}, r, { seedWins: undefined })), null, 1)); }
})().catch(e => { console.error(e); process.exit(1); });

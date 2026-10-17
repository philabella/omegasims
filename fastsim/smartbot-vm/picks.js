// What does the expert actually choose? Plays N free-play runs and counts every intermission pick, special-event
// choice, item and Legendary, so options nobody takes show up (pick rate ~0 = a useless option).
//   node picks.js --engine vm --build <game.html> --policy <champion.json> [--runs 200] [--workers 3]
const path = require('path'), L = require('./lib');
const A = L.args(process.argv.slice(2));
const BUILD = path.resolve(A.build || L.DEFAULT_BUILD), pol = L.readJSON(path.resolve(A.policy), null), params = pol.params || pol;
const N = +(A.runs || 200), W = +(A.workers || 3), seeds = L.seedSet(A.seedtag || 'picks', N);
(async () => {
  const browser = await L.launch(); const pool = await new L.Pool(browser, BUILD, W, { greedy: true }).start();
  const res = await pool.run([{ key: 'free', kind: 'smart', params, opts: { lookK: 2 }, seeds }], 4); await browser.close();
  const runs = res.free.filter(r => r && !r.err), cnt = (arr) => { const c = {}; arr.forEach(x => c[x] = (c[x] || 0) + 1); return Object.entries(c).sort((a, b) => b[1] - a[1]); };
  const ev = [], it = [], lg = [];
  runs.forEach(r => { const st = r.stat || {}; (st.events || []).forEach(e => ev.push(e)); (st.items || []).forEach(t => it.push(t)); (st.legends || []).forEach(l => lg.push(l)); });
  console.log(`${runs.length} runs, win ${(100 * runs.filter(r => r.win).length / runs.length).toFixed(1)}%`);
  console.log('events/choices:', cnt(ev).map(([k, v]) => k + ' ' + v).join(', '));
  console.log('items picked:', cnt(it).map(([k, v]) => k + ' ' + v).join(', '));
  console.log('legendaries picked:', cnt(lg).map(([k, v]) => k + ' ' + v).join(', '));
})();

// Watch the champion play one seeded run, decision by decision.
// node trace.js [--seed 7] [--policy runs/<tag>/champion.json] [--build file.html]
const path = require('path');
const L = require('./lib');
const A = L.args(process.argv.slice(2));
const BUILD = path.resolve(A.build || L.DEFAULT_BUILD);
const { hash } = L.wrapBuild(BUILD);
const POLICY = A.policy ? path.resolve(A.policy) : path.join(L.HERE, 'runs', 'build-' + hash, 'champion.json');
(async () => {
  const pol = L.readJSON(POLICY, null); if (!pol) { console.error('no policy at ' + POLICY); process.exit(1); }
  const browser = await L.launch(); const page = await L.openPage(browser, BUILD);
  const seed = L.seedSet('report', 1, +(A.seed || 0))[0];
  const r = await page.evaluate(([s, p]) => SB.playRun(s, p, { lookK: 2, trace: true }), [seed, pol.params || pol]);
  console.log(r.stat.trace.join('\n'));
  console.log(`\nresult: ${r.win ? 'WIN' : 'LOSS'} at round ${r.round}, lives ${r.lives}, rank ${r.rank}, gold left ${r.gold}, items ${r.items.join(',')}, legendary ${r.legend}, final board ${r.ids.join(' ')}`);
  await browser.close();
})();

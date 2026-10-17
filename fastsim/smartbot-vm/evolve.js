// smartbot optimizer: (mu+lambda) evolution strategy with self-adaptive step size over the policy vector,
// or (--algo cma) sep-CMA-ES (cma.js): one search distribution whose mean, step size and per-weight spread adapt;
// each generation also scores the distribution's mean (often the best point when results are noisy).
//  - common random numbers: every candidate of an epoch plays the same seeded runs (fully deterministic,
//    so parents' scores are reused inside an epoch; a new epoch = fresh seeds, parents re-scored)
//  - champion + hall of fame: a challenger must beat the best Hall-of-Fame score on a fixed validation
//    seed set (disjoint from training seeds) to become champion.json
//  - diversity: MAP-Elites style archive of the best policy per behaviour niche (main genre x reaches
//    rank 5 x low/high rarity board), and parent selection that keeps near-best policies from other niches
//  - progress saved after every generation; rerun the same command to resume
//
// node evolve.js [--minutes 30] [--workers 2] [--seeds 24] [--lambda 12] [--mu 4] [--epoch 3] [--val 64]
//                [--hof 6] [--build file.html] [--tag name] [--lookK 2] [--div 0.03] [--from runs/<dir>]
//                [--algo es|cma] [--sigma0 0.08]  cma: starts at the first --from policy (else the default archetype)
//                [--opts '{"maxRank":4}']  constraint on every run (any smartbot OPT) -> trains a strategy specialist
//                [--fix '{"keepGold":50,"rollRound":[14,29]}']  pin a param (number) or clamp it to [lo,hi]
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const { SepCMA } = require('./cma');
const A = L.args(process.argv.slice(2));

const BUILD = path.resolve(A.build || L.DEFAULT_BUILD);
const { hash } = L.wrapBuild(BUILD);
const TAG = A.tag || ('build-' + hash);
const DIR = path.join(L.HERE, 'runs', TAG);
fs.mkdirSync(DIR, { recursive: true });
// workers: default 2, up to the CPU count (4 on a GitHub runner)
const CFG = {
  minutes: +(A.minutes || 30), workers: Math.min(require('os').cpus().length, +(A.workers || 2)), seeds: +(A.seeds || 24), lambda: +(A.lambda || 12), mu: +(A.mu || 4),
  epoch: +(A.epoch || 3), val: +(A.val || 64), hof: +(A.hof || 6), lookK: +(A.lookK || 2), div: A.div != null ? +A.div : 0.03, maxGen: +(A['max-gen'] || 1e9),
};
const ALGO = String(A.algo || 'es');
const XOPT = A.opts ? JSON.parse(A.opts) : {}, FIX = A.fix ? JSON.parse(A.fix) : {};
const OPTS = Object.assign({ lookK: CFG.lookK }, XOPT);
// strategy constraints on the policy itself: a number pins the param, [lo,hi] clamps it
const fixP = params => { Object.entries(FIX).forEach(([k, v]) => { params[k] = Array.isArray(v) ? Math.min(v[1], Math.max(v[0], params[k])) : v; }); return params; };
const F = n => path.join(DIR, n);
const log = s => { const line = `[${new Date().toISOString().slice(11, 19)}] ${s}`; console.log(line); fs.appendFileSync(F('log.txt'), line + '\n'); };

// hand-made starting archetypes (named params; everything else = spec defaults)
const ARCHETYPES = {
  default: {},
  merger: { wRar: -0.2, rk4: 10, rk5: 17, wMergeItem: 1.0 },
  copies: { wRar: -0.5, wPair: 1.8, wMergeItem: 1.3, rk3: 3, rk4: 17, rk5: 17, rankSurplus: 30 },
  rusher: { wRar: 0.6, rk2: 1, rk3: 2, rk4: 4, rk5: 6, keepGold: 0, rankSurplus: 4 },
  econ: { keepGold: 10, econStart: 2, rollRound: 9, rr1: 0, rr2: 1, rr3: 8, rollExcess: 4, wMergeItem: 1.0, wRar: 0 },
  // human-playtester styles (v19): hold the shop at Rank 5 and spend on copies; bank everything (gold-scaling builds)
  holder: { rk6: 40, rk7: 40, rankSurplus: 30, keepGold: 20, econStart: 3, rollRound: 12, wMergeItem: 1.2, wPair: 1.6 },
  hoarder: { keepGold: 120, econStart: 3, rollRound: 40, bossAll: 0, rankSurplus: 30, rankReserve: 1 },
};
// --archetype name: start the population from that style only (an "island": a separate line of play to explore)
const ONLY = A.archetype ? String(A.archetype).split(',') : null;

function randn() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
const reflect = x => { x = ((x % 2) + 2) % 2; return x > 1 ? 2 - x : x; };
let nextId = 1;
const newId = () => 'p' + (nextId++);

function behaviour(runs) {
  const g = {}; let r5 = 0, tier = 0;
  let gold = 0, hold = 0;
  runs.forEach(r => { if (!r || r.err) return; const fs = r.fights || []; gold += fs.length ? fs.reduce((t, f) => t + f.gold, 0) / fs.length : 0; if (r.rank <= POOL.info.rankMax - 2) hold++; const c = {}; (r.ids || []).forEach(x => { const id = x.split(':')[0]; const gg = (POOL.heroGenre[id]) || '?'; c[gg] = (c[gg] || 0) + 1; }); const top = Object.entries(c).sort((a, b) => b[1] - a[1])[0]; if (top) g[top[0]] = (g[top[0]] || 0) + 1; if (r.rank >= POOL.info.rankMax) r5++; tier += r.avgTier || 0; });
  const main = (Object.entries(g).sort((a, b) => b[1] - a[1])[0] || ['mixed'])[0];
  const n = runs.length || 1;
  return { key: `${main}|${r5 / n > 0.5 ? 'rank5' : 'rank<5'}|${tier / n < 2.6 ? 'lowRarity' : 'highRarity'}|${gold / n > 30 ? 'banker' : 'spender'}${hold / n > 0.5 ? '|holder' : ''}`, main, r5: r5 / n, tier: tier / n, gold: gold / n };
}
function profile(runs) {
  const ok = runs.filter(r => r && !r.err); const n = ok.length || 1; const avg = f => ok.reduce((s, r) => s + f(r), 0) / n;
  return { win: +avg(r => r.win ? 1 : 0).toFixed(3), lives: +avg(r => r.lives).toFixed(2), rank: +avg(r => r.rank).toFixed(2), r5: +avg(r => r.rank >= POOL.info.rankMax ? 1 : 0).toFixed(2), mythic: +avg(r => r.mythic ? 1 : 0).toFixed(2), board: +avg(r => r.board).toFixed(2), genres: +avg(r => r.genres).toFixed(2), low: +avg(r => r.low).toFixed(2), items: +avg(r => r.items.length).toFixed(2), gold: +avg(r => r.gold).toFixed(1), errs: runs.filter(r => !r || r.err).length };
}

let POOL;
(async () => {
  const browser = await L.launch();
  POOL = await new L.Pool(browser, BUILD, CFG.workers).start();
  POOL.heroGenre = await POOL.pages[0].evaluate(() => Object.fromEntries(Object.values(SB.K.HERO).map(h => [h.id, h.genre])));
  const SPEC = POOL.spec; const D = SPEC.length;
  Object.keys(FIX).forEach(k => { if (!SPEC.some(s => s.name === k)) throw new Error('--fix: unknown param ' + k); });
  const tau = 1 / Math.sqrt(D), pm = Math.min(1, Math.max(0.08, 10 / D));
  const valSeeds = L.seedSet('validation', CFG.val);
  const t0 = Date.now(); const elapsedMin = () => (Date.now() - t0) / 60000;

  // ------------------------------------------------ state (resume if present)
  let st = L.readJSON(F('state.json'), null);
  let hof = L.readJSON(F('hof.json'), []);
  let archive = L.readJSON(F('archive.json'), {});
  let champ = L.readJSON(F('champion.json'), null);
  const hist = L.readJSON(F('history.json'), []);
  const evalCache = {}; // id|seedKey -> {fit, runs-profile, beh}
  if (st) { nextId = st.nextId || nextId; st.pop.forEach(p => { p.z = L.toZ(SPEC, p.params); }); log(`resume ${TAG}: gen ${st.gen}, ${st.pop.length} parents, champion ${champ ? champ.id + ' val ' + champ.valFit : 'none'}`); }
  else {
    const pop = [];
    const seedFrom = A.from ? path.resolve(A.from) : null;
    if (seedFrom) { const c = L.readJSON(path.join(seedFrom, 'champion.json'), null); const h = L.readJSON(path.join(seedFrom, 'hof.json'), []); [c, ...h].filter(Boolean).slice(0, CFG.mu).forEach(x => pop.push({ id: newId(), params: x.params, sigma: 0.08, origin: 'from:' + (x.id || '?') })); }
    Object.entries(ARCHETYPES).filter(([k]) => !ONLY || ONLY.includes(k)).forEach(([k, v]) => { if (pop.length < CFG.mu + 2) pop.push({ id: newId(), params: Object.assign(L.toParams(SPEC, L.toZ(SPEC, {})), v), sigma: 0.12, origin: 'archetype:' + k }); });
    pop.forEach(p => { p.z = L.toZ(SPEC, fixP(Object.assign({}, p.params))); p.params = fixP(L.toParams(SPEC, p.z)); p.z = L.toZ(SPEC, p.params); });
    st = { gen: 0, pop, cfg: CFG, build: BUILD, hash, specNames: SPEC.map(s => s.name), started: new Date().toISOString(), evals: 0 };
    st.opts = XOPT; st.fix = FIX; st.algo = ALGO;
    log(`new run ${TAG}: D=${D} params, opts ${JSON.stringify(XOPT)} fix ${JSON.stringify(FIX)}, build ${path.basename(BUILD)} (${hash}), workers ${CFG.workers}, seeds/eval ${CFG.seeds}, lambda ${CFG.lambda}, mu ${CFG.mu}`);
  }
  const epochSeeds = e => L.seedSet('train', CFG.seeds, e);
  if ((st.algo || 'es') !== ALGO) throw new Error(`this run used --algo ${st.algo || 'es'}; pass the same --algo or a new --tag`);
  const fixZ = z => L.toZ(SPEC, fixP(L.toParams(SPEC, z)));
  if (ALGO === 'cma' && !st.cma) st.cma = new SepCMA({ mean: fixZ(st.pop[0].z), sigma: +(A.sigma0 || 0.08), lambda: CFG.lambda }).toJSON();

  async function evaluate(inds, seeds, seedKey) {
    const todo = inds.filter(p => !evalCache[p.id + '|' + seedKey]);
    if (todo.length) {
      const res = await POOL.run(todo.map(p => ({ key: p.id, kind: 'smart', params: p.params, opts: OPTS, seeds })), 4);
      todo.forEach(p => { const runs = res[p.id]; evalCache[p.id + '|' + seedKey] = { fit: L.fitness(runs), prof: profile(runs), beh: behaviour(runs) }; st.evals += runs.length; });
    }
    inds.forEach(p => { const e = evalCache[p.id + '|' + seedKey]; p.fit = e.fit; p.prof = e.prof; p.beh = e.beh; });
  }
  function archiveAdd(p, gen) {
    const k = p.beh.key; const cur = archive[k];
    if (!cur || p.fit > cur.fit) archive[k] = { id: p.id, fit: +p.fit.toFixed(4), gen, beh: p.beh, prof: p.prof, params: p.params };
  }
  function makeChild(parents) {
    const a = parents[Math.floor(Math.random() * parents.length)];
    let z = a.z.slice(), sigma = a.sigma;
    if (parents.length > 1 && Math.random() < 0.3) {
      let b = a; while (b === a) b = parents[Math.floor(Math.random() * parents.length)];
      z = z.map((v, i) => Math.random() < 0.5 ? v : b.z[i]); sigma = Math.sqrt(a.sigma * b.sigma);
    }
    sigma = Math.min(0.4, Math.max(0.01, sigma * Math.exp(tau * randn())));
    let changed = 0;
    z = z.map(v => { if (Math.random() < pm) { changed++; return reflect(v + sigma * randn()); } return v; });
    if (!changed) { const i = Math.floor(Math.random() * D); z[i] = reflect(z[i] + sigma * randn()); }
    const params = fixP(L.toParams(SPEC, z));
    return { id: newId(), z: L.toZ(SPEC, params), params, sigma, origin: a.id };
  }
  function select(all) {
    all.sort((x, y) => y.fit - x.fit);
    const out = [all[0]];
    for (const p of all.slice(1)) {
      if (out.length >= CFG.mu) break;
      if (CFG.div > 0 && p.fit >= all[0].fit - CFG.div && !out.some(q => q.beh.key === p.beh.key)) out.push(p);
    }
    for (const p of all) { if (out.length >= CFG.mu) break; if (!out.includes(p)) out.push(p); }
    return out;
  }
  async function valFit(p) {
    const k = p.id + '|val';
    if (!evalCache[k]) await evaluate([{ id: p.id, params: p.params }], valSeeds, 'val');
    return evalCache[k];
  }
  function save() {
    st.nextId = nextId;
    L.writeJSON(F('state.json'), Object.assign({}, st, { pop: st.pop.map(p => ({ id: p.id, params: p.params, sigma: p.sigma, fit: p.fit, origin: p.origin, beh: p.beh })) }));
    L.writeJSON(F('hof.json'), hof); L.writeJSON(F('archive.json'), archive); L.writeJSON(F('history.json'), hist);
    if (champ) L.writeJSON(F('champion.json'), champ);
  }

  // champion of an earlier session: cache its validation score (deterministic) so it can be defended
  if (champ) { evalCache[champ.id + '|val'] = { fit: champ.valFit, prof: champ.valProfile, beh: champ.beh }; }
  hof.forEach(h => { evalCache[h.id + '|val'] = { fit: h.valFit, prof: h.valProfile, beh: h.beh }; });

  while (elapsedMin() < CFG.minutes && st.gen < CFG.maxGen) {
    const gen = st.gen + 1; const ep = Math.floor((gen - 1) / CFG.epoch); const seeds = epochSeeds(ep); const sk = 'ep' + ep;
    const tg = Date.now();
    let all, step = null;
    if (ALGO === 'cma') {                                   // sample, score (with the mean), update the distribution
      const cma = SepCMA.from(st.cma);
      const kids = cma.ask(fixZ).map(z => ({ id: newId(), z, params: L.toParams(SPEC, z), sigma: cma.sigma, origin: 'cma' + gen }));
      const mz = fixZ(cma.m), mean = { id: newId(), z: mz, params: L.toParams(SPEC, mz), sigma: cma.sigma, origin: 'mean' + gen };
      await evaluate(kids.concat([mean]), seeds, sk);
      cma.tell(kids.map(k => k.z), kids.map(k => k.fit)); st.cma = cma.toJSON(); step = cma.step();
      all = kids.concat([mean]);
    } else {
      await evaluate(st.pop, seeds, sk);                    // parents: cached inside an epoch
      const kids = Array.from({ length: CFG.lambda }, () => makeChild(st.pop));
      await evaluate(kids, seeds, sk);
      all = st.pop.concat(kids);
    }
    all.forEach(p => archiveAdd(p, gen));
    st.pop = select(all);
    const best = st.pop[0];
    // champion challenge: beat the best Hall-of-Fame validation score
    let note = '';
    if (!champ || best.id !== champ.id) {
      let champEp = null;
      if (champ) { const cp = { id: champ.id, params: champ.params }; await evaluate([cp], seeds, sk); champEp = cp.fit; }
      if (!champ || best.fit > champEp) {
        const v = await valFit(best);
        const bar = hof.length ? Math.max(...hof.map(h => h.valFit)) : -1;
        if (v.fit > bar + 0.002) {
          champ = { id: best.id, gen, algo: ALGO, params: best.params, valFit: +v.fit.toFixed(4), valProfile: v.prof, beh: v.beh, trainFit: +best.fit.toFixed(4), build: path.basename(BUILD), hash, valSeeds: CFG.val, opts: XOPT, fix: FIX, at: new Date().toISOString() };
          hof.push(Object.assign({}, champ)); hof.sort((a, b) => b.valFit - a.valFit); hof = hof.slice(0, CFG.hof);
          note = `NEW CHAMPION ${best.id} val ${v.fit.toFixed(3)} (bar ${bar.toFixed(3)}) win ${v.prof.win}`;
        } else note = `challenger ${best.id} val ${v.fit.toFixed(3)} <= bar ${bar.toFixed(3)}`;
      }
    }
    const mean = all.reduce((s, p) => s + p.fit, 0) / all.length;
    const h = { gen, epoch: ep, best: +best.fit.toFixed(4), mean: +mean.toFixed(4), bestWin: best.prof.win, sigma: +(step != null ? step : st.pop.reduce((s, p) => s + p.sigma, 0) / st.pop.length).toFixed(3), champ: champ && champ.id, champVal: champ && champ.valFit, champWin: champ && champ.valProfile.win, niches: Object.keys(archive).length, evals: st.evals, sec: Math.round((Date.now() - tg) / 1000), min: +elapsedMin().toFixed(1) };
    hist.push(h); st.gen = gen;
    log(`gen ${gen} ep ${ep} best ${best.id} ${best.fit.toFixed(3)} (win ${best.prof.win}, ${best.beh.key}) mean ${mean.toFixed(3)} sigma ${h.sigma} | champ ${h.champ} val ${h.champVal} win ${h.champWin} | ${h.sec}s ${h.min}min ${note}`);
    save();
  }
  log(`stopped after gen ${st.gen}, ${st.evals} runs this session-state; champion ${champ && champ.id} val ${champ && champ.valFit}`);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

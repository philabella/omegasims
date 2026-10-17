// smartbot report: plays the champion (or any policy JSON) on N seeded runs and explains what it does.
//
// node report.js [--runs 200] [--policy runs/<tag>/champion.json] [--build file.html] [--workers 2]
//                [--baselines]        also the old greedy bots (balanced, commons, rarity) on the SAME seeds/streams
//                [--ablate]           champion with one thing taken away each (answers "does X matter?")
//                [--hof] [--archive]  re-score Hall-of-Fame / niche elites on the same seeds (distinct strategies)
//                [--stress 1.2,1.5]   enemy strength multiplier (TUNE.actMul) to measure headroom
//                [--quick]            fewer runs for ablation/hof/archive (runs/2)
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const A = L.args(process.argv.slice(2));
const BUILD = path.resolve(A.build || L.DEFAULT_BUILD);
const { hash } = L.wrapBuild(BUILD);
const DIR = A.dir ? path.resolve(A.dir) : path.join(L.HERE, 'runs', A.tag || ('build-' + hash));
const POLICY = A.policy ? path.resolve(A.policy) : path.join(DIR, 'champion.json');
const N = +(A.runs || 200);
const NS = A.quick ? Math.max(20, N >> 1) : N;
const seeds = L.seedSet('report', N);
const out = { build: path.basename(BUILD), hash, policy: POLICY, runs: N, at: new Date().toISOString(), rows: {} };

const pct = x => (100 * x).toFixed(0) + '%';
const avg = (a, f) => a.length ? a.reduce((s, r) => s + f(r), 0) / a.length : 0;
const count = (arr) => arr.reduce((m, k) => (m[k] = (m[k] || 0) + 1, m), {});
const top = (m, n = 5) => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n);

let HG = {};
// a run's main genre: the genre of at least half the final board, else 'mixed'
function mainGenre(r) { const c = count((r.ids || []).map(x => HG[x.split(':')[0]] || '?')); const t = top(c, 1)[0]; return t && t[1] * 2 >= (r.ids || []).length ? t[0] : 'mixed'; }
function stats(runs, rankMax, maxTier) {
  const ok = runs.filter(r => r && !r.err);
  const wins = ok.filter(r => r.win);
  const endLoss = count(ok.filter(r => !r.win).map(r => r.round));
  const lostFights = count(ok.flatMap(r => r.lost || []));
  const r5 = ok.filter(r => r.rank >= rankMax);
  return {
    n: ok.length, errors: runs.length - ok.length, win: wins.length / (ok.length || 1), fit: L.fitness(ok), livesOnWin: avg(wins, r => r.lives),
    runEndedAt: endLoss, lostFightsByRound: lostFights,
    rank5: r5.length / (ok.length || 1), rank5Round: r5.filter(r => r.r5).length ? avg(r5.filter(r => r.r5), r => r.r5) : null, rank: avg(ok, r => r.rank),
    mythicFinal: avg(ok, r => r.mythic ? 1 : 0), mythicEver: ok[0] && ok[0].mythicEver != null ? avg(ok, r => r.mythicEver ? 1 : 0) : null,
    board: avg(ok, r => r.board), cap: avg(ok, r => r.cap), fullBoardFights: ok[0] && ok[0].fullFrac != null ? avg(ok, r => r.fullFrac) : null,
    genres: avg(ok, r => r.genres), lowShare: avg(ok, r => r.low), avgTier: avg(ok, r => r.avgTier),
    items: avg(ok, r => r.items.length), gold: avg(ok, r => r.gold), merges: avg(ok, r => r.merges), rerolls: avg(ok, r => r.rerolls),
    legends: count(ok.map(r => r.legend || 'none')), itemFreq: count(ok.flatMap(r => r.items)),
    mainGenre: count(ok.map(mainGenre)),
    wonAfterFinalLoss: ok.filter(r => r.win && (r.lost || []).includes(r.round)).length / (ok.length || 1),
    dealsAtLowLives: ok.flatMap(r => (r.stat && r.stat.evLives) || []).filter(([k, l]) => k === 'deal' && l <= 2).length,
    deals: ok.flatMap(r => (r.stat && r.stat.evLives) || []).filter(([k]) => k === 'deal').length,
  };
}
function line(name, s) {
  return `${name.padEnd(22)} win ${pct(s.win).padStart(4)}  fit ${s.fit.toFixed(3)}  lives(win) ${s.livesOnWin.toFixed(1).padStart(4)}  rank5 ${pct(s.rank5).padStart(4)}${s.rank5Round ? ' @r' + s.rank5Round.toFixed(1) : '     '}  mythic ${pct(s.mythicFinal).padStart(4)}  board ${s.board.toFixed(2)}/${s.cap.toFixed(1)}  genres ${s.genres.toFixed(2)}  C/U ${pct(s.lowShare).padStart(4)}  items ${s.items.toFixed(1)}  gold ${s.gold.toFixed(1)}  rerolls ${s.rerolls.toFixed(0)}${s.errors ? '  ERR ' + s.errors : ''}`;
}

function describe(p, s, runs, info) {
  const ok = runs.filter(r => r && !r.err);
  const rankRounds = {}; ok.forEach(r => { let rk = 1; (r.stat.ranks || []).forEach(rd => { rk++; (rankRounds[rk] = rankRounds[rk] || []).push(rd); }); });
  const rk = Object.entries(rankRounds).map(([k, v]) => `rank ${k} ~round ${(v.reduce((a, b) => a + b, 0) / v.length).toFixed(1)} (${pct(v.length / ok.length)} of runs)`).join(', ');
  const ev = count(ok.flatMap(r => r.stat.events || []));
  const evN = Object.values(ev).reduce((a, b) => a + b, 0) || 1;
  const prefs = (pre) => Object.entries(p).filter(([k]) => k.startsWith(pre)).map(([k, v]) => [k.slice(pre.length), v]).sort((a, b) => b[1] - a[1]);
  const it = prefs('it.'), lg = prefs('lg.'), gp = prefs('gp.');
  const lines = [];
  lines.push(`Shop rank: ${rk || 'never ranks up'}. Ends at rank ${s.rank.toFixed(1)} on average; rank ${info.rankMax} in ${pct(s.rank5)} of runs.`);
  lines.push(`Rarity: final boards average ${s.avgTier.toFixed(2)} rarity (1=Common .. ${info.maxTier}=Mythic); Common/Uncommon share ${pct(s.lowShare)}; a Mythic is on the final board in ${pct(s.mythicFinal)} of runs${s.mythicEver != null ? ' (fielded at some point in ' + pct(s.mythicEver) + ')' : ''}.`);
  lines.push(`Merges: ${s.merges.toFixed(1)} per run (merge-item value weight ${p.wMergeItem}, pair weight ${p.wPair}, rarity weight ${p.wRar}); rerolls ${s.rerolls.toFixed(0)} per run; gold left at the end ${s.gold.toFixed(1)}.`);
  lines.push(`Economy: keeps ${p.keepGold.toFixed(0)} gold from round ${p.econStart.toFixed(0)} and goes all-in from round ${p.rollRound.toFixed(0)}; paid rerolls per round by act ${[p.rr1, p.rr2, p.rr3].map(x => Math.round(x)).join('/')}, unlimited when ${p.rollExcess.toFixed(0)}+ gold above the reserve.`);
  lines.push(`Board: ${s.board.toFixed(2)} characters fielded of ${s.cap.toFixed(1)} slots at the end${s.fullBoardFights != null ? ', full board in ' + pct(s.fullBoardFights) + ' of fights' : ''}; partial boards chosen ${avg(ok, r => r.stat.partial).toFixed(1)} times per run by the fight simulator. ${s.genres.toFixed(1)} genres on the final board.`);
  lines.push(`Genres preferred (gp.*): ${gp.map(([k, v]) => k + ' ' + v.toFixed(2)).join(', ')}. Final boards: ${top(s.mainGenre, 6).map(([k, v]) => k + ' ' + pct(v / ok.length)).join(', ')}.`);
  lines.push(`Items: ${s.items.toFixed(1)} per run. Most taken: ${top(s.itemFreq, 6).map(([k, v]) => k + ' ' + pct(v / ok.length)).join(', ')}. Highest preference weights: ${it.slice(0, 4).map(([k, v]) => k + ' ' + v.toFixed(2)).join(', ')}; lowest: ${it.slice(-3).map(([k, v]) => k + ' ' + v.toFixed(2)).join(', ')}.`);
  lines.push(`Legendary at the end: ${top(s.legends, 6).map(([k, v]) => k + ' ' + pct(v / ok.length)).join(', ')} (weights: ${lg.slice(0, 3).map(([k, v]) => k + ' ' + v.toFixed(2)).join(', ')}).`);
  lines.push(`Events picked: ${top(ev, 6).map(([k, v]) => k + ' ' + pct(v / evN)).join(', ')}.`);
  lines.push(`Lookahead: ${avg(ok, r => r.stat.sims).toFixed(0)} simulated fights per run; danger mode (simulated win chance < ${p.dangerP.toFixed(2)}) ${avg(ok, r => r.stat.panics).toFixed(1)} times per run, ${avg(ok, r => r.stat.panicActs).toFixed(1)} emergency buys/rerolls.`);
  return lines;
}

(async () => {
  const pol = L.readJSON(POLICY, null);
  if (!pol) { console.error('no policy at ' + POLICY + ' (run evolve.js first, or pass --policy)'); process.exit(1); }
  const params = pol.params || pol;
  const browser = await L.launch();
  const pool = await new L.Pool(browser, BUILD, Math.min(2, +(A.workers || 2)), { greedy: true }).start();
  const info = pool.info;
  HG = await pool.pages[0].evaluate(() => Object.fromEntries(Object.values(SB.K.HERO).map(h => [h.id, h.genre])));
  const OPT = { lookK: +(A.lookK || 2) };
  const T = Date.now();
  console.log(`Tropebrawl smartbot report - build ${path.basename(BUILD)} (${hash}), policy ${path.relative(process.cwd(), POLICY)}${pol.id ? ' [' + pol.id + ', gen ' + pol.gen + ', validation fit ' + pol.valFit + ']' : ''}, ${N} seeded runs`);

  const jobs = [{ key: 'champion', kind: 'smart', params, opts: OPT, seeds }];
  if (A.baselines) ['balanced', 'commons', 'rarity'].forEach(p => jobs.push({ key: 'greedy:' + p, kind: 'greedy', pol: p, seeds }));
  const res = await pool.run(jobs, 5);
  const S = {};
  for (const j of jobs) { S[j.key] = stats(res[j.key], info.rankMax, info.maxTier); out.rows[j.key] = S[j.key]; }
  console.log('\n== Head to head (same seeds, same random streams) ==');
  jobs.forEach(j => console.log(line(j.key, S[j.key])));
  const c = S.champion;
  console.log(`champion: won only after losing the final boss at least once in ${pct(c.wonAfterFinalLoss)} of runs; Risky Deal taken ${c.deals} times (${c.dealsAtLowLives} at 1-2 lives, where it costs at most 1 life)`);
  console.log('\nchampion runs ended (lost) at round:', JSON.stringify(c.runEndedAt), ' fights lost by round:', JSON.stringify(c.lostFightsByRound));
  if (A.baselines) jobs.slice(1).forEach(j => console.log(`${j.key} runs ended at:`, JSON.stringify(S[j.key].runEndedAt), ' fights lost:', JSON.stringify(S[j.key].lostFightsByRound)));
  // per-round win% of the champion
  const pr = {}; res.champion.filter(r => r && !r.err).forEach(r => r.fights.forEach(f => { const k = f.r; pr[k] = pr[k] || { n: 0, w: 0, p: 0 }; pr[k].n++; pr[k].w += f.win; pr[k].p += f.p == null ? 0 : f.p; }));
  console.log('champion per-round win% (simulated win chance before the fight):', Object.keys(pr).map(k => `${k}:${(100 * pr[k].w / pr[k].n).toFixed(0)}%(${(100 * pr[k].p / pr[k].n).toFixed(0)})`).join(' '));
  out.perRound = pr;
  console.log('\n== What the champion does ==');
  out.summary = describe(params, c, res.champion, info);
  out.summary.forEach(l => console.log('- ' + l));

  if (A.ablate) {
    const sub = seeds.slice(0, NS);
    const V = {
      'champion': {}, 'no lookahead': { noLook: true }, 'always fill board': { forceFill: true }, 'no Mythic (max Epic)': { maxTier: info.maxTier - 1 },
      'Common/Uncommon only': { maxTier: 2 }, 'shop rank <= 3': { maxRank: 3 }, 'rush rank 5': { minRank: info.rankMax }, 'no items (take gold)': { noItems: true },
      'no Legendary': { noLegend: true }, 'no rerolls': { noReroll: true }, 'shop rank <= 2': { maxRank: 2 },
      'throw act-1 fights': { sandbag: { until: 4, minLives: 6 } }, 'throw fights to r9': { sandbag: { until: 9, minLives: 6 } },
    };
    info.genres.forEach(g => { V['mono ' + g] = { genre: g }; });
    const jobsA = Object.entries(V).map(([k, o]) => ({ key: k, kind: 'smart', params, opts: Object.assign({}, OPT, o), seeds: sub }));
    const ra = await pool.run(jobsA, 5);
    console.log(`\n== Ablations: champion with one thing taken away (${sub.length} runs each, same seeds) ==`);
    out.ablations = {};
    jobsA.forEach(j => { const s = stats(ra[j.key], info.rankMax, info.maxTier); out.ablations[j.key] = s; console.log(line(j.key, s)); });
  }
  if (A.hof || A.archive) {
    const sub = seeds.slice(0, NS);
    const cands = [];
    if (A.hof) L.readJSON(path.join(DIR, 'hof.json'), []).forEach(h => cands.push({ key: 'hof ' + h.id + ' g' + h.gen, params: h.params }));
    if (A.archive) Object.entries(L.readJSON(path.join(DIR, 'archive.json'), {})).sort((a, b) => b[1].fit - a[1].fit).slice(0, +(A.archiveTop || 8)).forEach(([k, e]) => cands.push({ key: 'niche ' + k, params: e.params }));
    const rh = await pool.run(cands.map(cn => ({ key: cn.key, kind: 'smart', params: cn.params, opts: OPT, seeds: sub })), 5);
    console.log(`\n== Hall of Fame / niche elites re-scored on the same ${sub.length} seeds ==`);
    out.strategies = {};
    cands.forEach(cn => { const s = stats(rh[cn.key], info.rankMax, info.maxTier); out.strategies[cn.key] = s; console.log(line(cn.key.slice(0, 40), s) + '  main ' + top(s.mainGenre, 2).map(([k, v]) => k + ' ' + pct(v / s.n)).join(' ')); });
  }
  if (A.stress) {
    const sub = seeds.slice(0, NS);
    out.stress = {};
    console.log(`\n== Headroom: enemy strength x m (TUNE.actMul), ${sub.length} runs ==`);
    for (const m of String(A.stress).split(',').map(Number)) {
      if (!(await pool.stress(m))) { console.log('build has no TUNE.actMul - skipped'); break; }
      const js = [{ key: 'champion', kind: 'smart', params, opts: OPT, seeds: sub }];
      if (A.baselines) js.push({ key: 'greedy:commons', kind: 'greedy', pol: 'commons', seeds: sub }, { key: 'greedy:balanced', kind: 'greedy', pol: 'balanced', seeds: sub });
      const rs = await pool.run(js, 5);
      js.forEach(j => { const s = stats(rs[j.key], info.rankMax, info.maxTier); out.stress[m + ' ' + j.key] = s; console.log(line(`x${m} ${j.key}`, s)); });
    }
    await pool.stress(1);
  }
  out.sec = Math.round((Date.now() - T) / 1000);
  const rp = path.join(path.dirname(POLICY), 'report.json');
  L.writeJSON(rp, out);
  console.log(`\n(${out.sec}s, ${pool.runs} runs; full numbers in ${path.relative(process.cwd(), rp)})`);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

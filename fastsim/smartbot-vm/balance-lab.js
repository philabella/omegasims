// Balance lab: the expert bot (smartbot champion) on the SAME seeds under one constraint per config, so every
// difference is paired. Answers "what is strongest / weakest" for genres, genre pairs (+ their crossover),
// traits, characters, Legendaries and items.
//
// node balance-lab.js --engine vm --build <game.html> --policy <champion.json> [--runs 100] [--stress 1.3]
//                     [--workers 3] [--groups base,mono,pairs,traits,chars,legends,items] [--tune '{...}'] [--out dir]
//                     [--configs '[{"key":"k","label":"..","opts":{...}}]']  custom configs (added to --groups; use --groups base for just these)
//                     [--seedtag lab]   a different tag = a fresh, independent seed set (for re-checking a finding)
// opts: genres:[g..] (only these genres), ban:[heroId..], banTrait:t, giveLeg:id, noLegend:true, giveItem:id, giveItemLv:n, giveItemAt:round,
//       noItems:true, maxTier:n, maxRank:n, noReroll:true, noLook:true (any smartbot OPT)
//
// stress multiplies enemy strength (TUNE.actMul) so the expert stops winning ~everything and differences show.
// Output: <out>/lab.json (every run summary), <out>/lab.csv (one row per config), <out>/lab.md (ranked tables).
const fs = require('fs');
const path = require('path');
const L = require('./lib');
const A = L.args(process.argv.slice(2));
const BUILD = path.resolve(A.build || L.DEFAULT_BUILD);
const pol = L.readJSON(path.resolve(A.policy), null), params = pol.params || pol;
const N = +(A.runs || 100), STRESS = +(A.stress || 1), W = +(A.workers || 3);
const GROUPS = String(A.groups || 'base,mono,pairs,traits,chars,legends,items').split(',');
const OUT = path.resolve(A.out || 'lab-out'); fs.mkdirSync(OUT, { recursive: true });
const seeds = L.seedSet(A.seedtag || 'lab', N);
const pct = x => (100 * x).toFixed(1);
(async () => {
  const T0 = Date.now();
  const browser = await L.launch();
  const pool = await new L.Pool(browser, BUILD, W, { greedy: true }).start();
  if (STRESS !== 1 && !(await pool.stress(STRESS))) throw new Error('build has no TUNE.actMul');
  if (A.tune) { const t = JSON.parse(A.tune); for (const p of pool.pages) await p.evaluate(t => Object.assign((0, eval)('TUNE'), t), t); }
  const G = await pool.pages[0].evaluate(() => { const ev = (0, eval);
    const live = Object.keys(ev('GENRES')).filter(k => !ev('PARKED').has(k));
    return { live, genres: Object.fromEntries(live.map(k => [k, ev('GENRES')[k].name])), traits: Object.fromEntries(Object.keys(ev('TRAITS')).map(k => [k, ev('TRAITS')[k].name])),
      cross: ev('CROSSOVERS').filter(x => live.includes(x.a) && live.includes(x.b)).map(x => ({ name: x.name, a: x.a, b: x.b })),
      legends: Object.fromEntries(Object.keys(ev('LEGENDS')).map(k => [k, ev('LEGENDS')[k].name])), items: Object.fromEntries(ev('TRINKETS').map(a => [a[0], ev('TR')[a[0]].name + (ev('TR')[a[0]].rar === 'R' ? ' (Rare)' : '')])),
      heroes: ev('HEROES').map(h => ({ id: h[0], name: ev('HERO')[h[0]].name, genre: h[2], trait: h[3], tier: h[4] })), rarity: ev('RARITY') }; });
  const C = [];
  const add = (group, key, label, opts) => C.push({ group, key, label, opts });
  if (GROUPS.includes('base')) add('base', 'baseline', 'Baseline (free play)', {});
  if (GROUPS.includes('mono')) G.live.forEach(g => add('mono', 'mono:' + g, 'Only ' + G.genres[g], { genres: [g] }));
  if (GROUPS.includes('pairs')) G.cross.forEach(x => add('pairs', 'pair:' + x.a + '+' + x.b, G.genres[x.a] + ' + ' + G.genres[x.b] + ' (' + x.name + ')', { genres: [x.a, x.b] }));
  if (GROUPS.includes('traits')) Object.keys(G.traits).forEach(t => add('traits', 'banTrait:' + t, 'No ' + G.traits[t] + 's', { banTrait: t }));
  if (GROUPS.includes('chars')) G.heroes.forEach(h => add('chars', 'ban:' + h.id, 'No ' + h.name + ' (' + G.rarity[h.tier - 1] + ' ' + G.genres[h.genre] + ' ' + G.traits[h.trait] + ')', { ban: [h.id] }));
  if (GROUPS.includes('legends')) { Object.keys(G.legends).forEach(l => add('legends', 'leg:' + l, 'Always ' + G.legends[l], { giveLeg: l })); add('legends', 'leg:none', 'No Legendary', { noLegend: true }); }
  if (GROUPS.includes('items')) { Object.keys(G.items).forEach(t => add('items', 'item:' + t, 'Start with ' + G.items[t], { giveItem: t })); add('items', 'item:noitems', 'Never take items', { noItems: true }); }
  if (A.configs) JSON.parse(A.configs).forEach(c => add('custom', c.key, c.label || c.key, c.opts || {}));
  if (!C.some(c => c.key === 'baseline')) add('base', 'baseline', 'Baseline (free play)', {});
  console.log(`balance lab: ${C.length} configs x ${N} runs = ${C.length * N} expert runs, stress x${STRESS}, ${W} workers, build ${path.basename(BUILD)}`);
  const jobs = C.map(c => ({ key: c.key, kind: 'smart', params, opts: Object.assign({ lookK: 2 }, c.opts), seeds }));
  const res = await pool.run(jobs, 4);
  await browser.close();
  const base = res.baseline;
  const rows = C.map(c => {
    const rs = res[c.key], ok = rs.filter(r => r && !r.err), w = ok.filter(r => r.win);
    // paired comparison with the baseline on the same seeds: b = baseline won & config lost, c = the reverse
    let b = 0, cc = 0; rs.forEach((r, i) => { const x = base[i]; if (!r || r.err || !x || x.err) return; if (x.win && !r.win) b++; if (!x.win && r.win) cc++; });
    return { group: c.group, key: c.key, label: c.label, n: ok.length, err: rs.length - ok.length, win: w.length / (ok.length || 1),
      lives: w.length ? w.reduce((s, r) => s + r.lives, 0) / w.length : 0, rank: ok.reduce((s, r) => s + r.rank, 0) / (ok.length || 1),
      mythic: ok.filter(r => r.mythic).length / (ok.length || 1), avgTier: ok.reduce((s, r) => s + r.avgTier, 0) / (ok.length || 1),
      delta: (cc - b) / (ok.length || 1), z: b + cc ? (cc - b) / Math.sqrt(b + cc) : 0, lostRounds: ok.flatMap(r => r.lost || []).length / (ok.length || 1) };
  });
  // character usage in free play: on the final board, and win rate when there
  const okb = base.filter(r => r && !r.err);
  const use = G.heroes.map(h => { const on = okb.filter(r => (r.ids || []).some(x => x.split(':')[0] === h.id)); return { id: h.id, name: h.name, genre: h.genre, trait: h.trait, tier: h.tier, pick: on.length / (okb.length || 1), winWhenOn: on.length ? on.filter(r => r.win).length / on.length : null }; });
  const legUse = {}; okb.forEach(r => { const k = r.legend || 'none'; legUse[k] = legUse[k] || { n: 0, w: 0 }; legUse[k].n++; if (r.win) legUse[k].w++; });
  const itemUse = {}; okb.forEach(r => (r.items || []).forEach(t => { itemUse[t] = itemUse[t] || { n: 0, w: 0 }; itemUse[t].n++; if (r.win) itemUse[t].w++; }));
  const out = { build: path.basename(BUILD), policy: path.basename(A.policy), runs: N, stress: STRESS, tune: A.tune || null, seeds: [seeds[0], seeds[seeds.length - 1]], game: G, rows, use, legUse, itemUse, sec: Math.round((Date.now() - T0) / 1000) };
  fs.writeFileSync(path.join(OUT, 'lab.json'), JSON.stringify(out));
  fs.writeFileSync(path.join(OUT, 'lab.csv'), 'group,key,label,n,errors,win_pct,delta_vs_baseline_pts,paired_z,lives_on_win,avg_rank,mythic_pct,avg_tier\n' +
    rows.map(r => [r.group, r.key, '"' + r.label + '"', r.n, r.err, pct(r.win), pct(r.delta), r.z.toFixed(2), r.lives.toFixed(2), r.rank.toFixed(2), pct(r.mythic), r.avgTier.toFixed(2)].join(',')).join('\n') + '\n');
  let md = `# Balance lab: ${out.build}, expert bot, ${N} paired runs per config, enemies x${STRESS}${A.tune ? ', tune ' + A.tune : ''}\n\nBaseline win ${pct(rows.find(r => r.key === 'baseline').win)}%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.\n`;
  for (const g of ['mono', 'pairs', 'traits', 'chars', 'legends', 'items', 'custom']) {
    const rr = rows.filter(r => r.group === g).sort((a, b) => b.win - a.win); if (!rr.length) continue;
    md += `\n## ${g}\n\n| config | win % | delta | z | lives (win) | rank | Mythic % |\n|---|---|---|---|---|---|---|\n` + rr.map(r => `| ${r.label} | ${pct(r.win)} | ${r.delta >= 0 ? '+' : ''}${pct(r.delta)} | ${r.z.toFixed(1)} | ${r.lives.toFixed(1)} | ${r.rank.toFixed(1)} | ${pct(r.mythic)} |`).join('\n') + '\n';
  }
  md += `\n## character use in free play (final board)\n\n| character | genre | trait | rarity | on final board | win when on board |\n|---|---|---|---|---|---|\n` + use.sort((a, b) => b.pick - a.pick).map(u => `| ${u.name} | ${u.genre} | ${u.trait} | ${G.rarity[u.tier - 1]} | ${pct(u.pick)}% | ${u.winWhenOn == null ? '-' : pct(u.winWhenOn) + '%'} |`).join('\n') + '\n';
  fs.writeFileSync(path.join(OUT, 'lab.md'), md);
  console.log(md);
  console.log(`(${out.sec}s; ${path.join(OUT, 'lab.json')})`);
})().catch(e => { console.error(e); process.exit(1); });

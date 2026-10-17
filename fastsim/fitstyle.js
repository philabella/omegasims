#!/usr/bin/env node
// Fit a bot to a person's play STYLE (not to winning): search the bot's style settings so that its per-act profile
// (gold held, rerolls / Trains / buys / sells per round, shop rank, genres on board, top-genre share, stars) matches the
// person's recorded runs. Same idea as Ubisoft's CARMI (match a player's summary statistics, little data needed) and
// "evolving personas" (Holmgård et al.): the bot's decision weights are the persona, evolution tunes them for conformity.
//   node fastsim/fitstyle.js --build tropebrawl.html --human <dir with run records> --from smartbot-vm/runs/<bot>
//        [--tag fit-<name>] [--runs 48] [--gens 25] [--pop 8] [--workers 4] [--params a,b,c] [--player p_xxx]
// Writes smartbot-vm/runs/<tag>/champion.json (the fitted bot) and report.md (person vs start vs fitted, fresh games).
// Every candidate plays the SAME games (fixed seeds), so differences are the settings, not luck; the winner is then
// re-measured on fresh games. Results (win %) are reported but never optimised: the style is fitted, the results follow.
'use strict';
const fs = require('fs'), path = require('path');
const L = require('./smartbot-vm/lib.js');
const HP = require('./humanprofile.js');
const A = L.args(process.argv.slice(2));
const BUILD = path.resolve(A.build), N = +(A.runs || 48), GENS = +(A.gens || 25), POP = +(A.pop || 8), W = +(A.workers || 4);
const TAG = A.tag || 'fit-style';
const OUT = path.join(__dirname, 'smartbot-vm', 'runs', TAG);
// the settings a player's style lives in (economy, shop rank, rerolls, what a board is worth); the rest stays as the start bot's
const STYLE_PARAMS = (A.params ? String(A.params).split(',') : ['keepGold', 'econStart', 'rollRound', 'splurge', 'bossAll', 'rankSurplus', 'rankFirst', 'rankReserve',
  'rk2', 'rk3', 'rk4', 'rk5', 'rr1', 'rr2', 'rr3', 'rollExcess', 'rerollThr', 'buyThr', 'wPow', 'wRar', 'wGenre', 'wTrait', 'wCross', 'wNear', 'wPair', 'sellJunk', 'sellMargin', 'wFocus']);
const log = s => { const line = `[${new Date().toISOString().slice(11, 19)}] ${s}`; console.log(line); fs.appendFileSync(path.join(OUT, 'log.txt'), line + '\n'); };
function randn() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let human = HP.readHuman(A.human); if (A.player) human = human.filter(r => r.pid === A.player);
  human = human.filter(r => Array.isArray(r.r) && r.r.some(x => x.f)); // runs with at least one fight
  if (!human.length) throw new Error('no recorded runs with fights in ' + A.human);
  const src = fs.readFileSync(BUILD, 'utf8'), H = HP.heroMap(src), target = HP.profile(human, H);
  const lvCount = {}; human.forEach(r => { const l = r.lv | 0; lvCount[l] = (lvCount[l] || 0) + 1; });
  const start = L.readJSON(fs.existsSync(path.resolve(A.from)) && fs.statSync(path.resolve(A.from)).isDirectory() ? path.resolve(A.from, 'champion.json') : path.resolve(A.from), null);
  if (!start) throw new Error('no start policy at ' + A.from);
  const opts = Object.assign({ lookK: 2, noLook: true }, start.opts || {}, A.opts ? JSON.parse(A.opts) : {});
  const browser = await L.launch(), tmp = path.join(__dirname, 'out', 'fitstyle-' + process.pid);
  const pools = {}; for (const lv of Object.keys(lvCount)) pools[lv] = await new L.Pool(browser, HP.levelFile(src, lv, tmp), W).start();
  const SPEC = Object.values(pools)[0].spec, T = STYLE_PARAMS.filter(k => SPEC.some(p => p.name === k)), idx = T.map(k => SPEC.findIndex(p => p.name === k));
  const total = human.length;
  const play = async (params, kind, n) => { const recs = [];
    for (const [lv, c] of Object.entries(lvCount)) recs.push(...await HP.playRecords(pools[lv], params, opts, L.seedSet(kind, Math.max(8, Math.round(n * c / total)), +lv)));
    const P = HP.profile(recs, H); return { d: HP.styleDistance(target, P), win: P.win, P }; };
  const p0 = Object.assign({}, start.params || start);
  const T0 = Date.now();
  let best = { z: L.toZ(SPEC, p0), params: p0 }; Object.assign(best, await play(p0, 'fitstyle', N));
  log(`person: ${human.length} run(s), levels ${JSON.stringify(lvCount)}; tuning ${T.length} settings; start distance ${best.d.toFixed(3)} (win ${(100 * best.win).toFixed(0)}%) in ${((Date.now() - T0) / 1000).toFixed(0)}s per candidate`);
  let sigma = +(A.sigma || 0.12), stall = 0;
  for (let g = 1; g <= GENS; g++) {
    let wins = 0; const kids = [];
    for (let k = 0; k < POP; k++) { const z = best.z.slice(); idx.forEach(i => { z[i] = Math.min(1, Math.max(0, z[i] + sigma * randn())); }); const params = Object.assign({}, p0, L.toParams(SPEC, z)); kids.push({ z, params: Object.fromEntries(Object.entries(params).map(([k, v]) => [k, T.includes(k) ? v : p0[k]])) }); }
    for (const kid of kids) { Object.assign(kid, await play(kid.params, 'fitstyle', N)); if (kid.d < best.d) { best = kid; wins++; } }
    sigma = Math.min(0.3, Math.max(0.02, sigma * (wins / POP > 0.2 ? 1.25 : 0.85)));
    stall = wins ? 0 : stall + 1; if (stall >= 5) { sigma = +(A.sigma || 0.12); stall = 0; } // stuck: look wider again
    log(`gen ${g}: best distance ${best.d.toFixed(3)} (win ${(100 * best.win).toFixed(0)}%), ${wins} improved, sigma ${sigma.toFixed(3)}`);
  }
  // re-measure start and fitted bots on fresh games
  const fresh = Math.max(120, 3 * N);
  const s0 = await play(p0, 'fitstyle-check', fresh), s1 = await play(best.params, 'fitstyle-check', fresh);
  await browser.close(); fs.rmSync(tmp, { recursive: true, force: true });
  const champ = Object.assign({}, start, { params: best.params, opts, fit: { kind: 'style', person: [...new Set(human.map(r => r.pid))], runs: human.length, levels: lvCount,
    distance: +s1.d.toFixed(3), startDistance: +s0.d.toFixed(3), win: s1.win, settings: T, from: A.from, build: path.basename(BUILD) } });
  L.writeJSON(path.join(OUT, 'champion.json'), champ);
  const changed = T.map(k => [k, p0[k], best.params[k]]).filter(([, a, b]) => Math.abs(a - b) > 1e-6).map(([k, a, b]) => `${k} ${(+a).toFixed(2)} → ${(+b).toFixed(2)}`);
  const md = [`# Style fit: ${TAG}`, '', `Person: ${human.length} recorded run(s) (${[...new Set(human.map(r => r.pid))].join(', ')}), Game Levels ${JSON.stringify(lvCount)}. Start bot: ${A.from}. ${GENS} generations × ${POP} candidates × ${N} games; checked on ${fresh} fresh games.`, '',
    '| | Person | Start bot | Fitted bot |', '|---|---|---|---|',
    `| **style distance** (0 = same) | - | ${s0.d.toFixed(2)} | ${s1.d.toFixed(2)} |`, `| run win | ${(100 * target.win).toFixed(0)}% | ${(100 * s0.win).toFixed(0)}% | ${(100 * s1.win).toFixed(0)}% |`];
  for (const act of [1, 2, 3, 4]) for (const [k, name, fmt] of HP.METRICS) if (HP.STYLE[k] && target.acts[act] && target.acts[act].fights)
    md.push(`| Act ${act} · ${name} | ${fmt(target.acts[act][k])} | ${s0.P.acts[act] ? fmt(s0.P.acts[act][k]) : '-'} | ${s1.P.acts[act] ? fmt(s1.P.acts[act][k]) : '-'} |`);
  md.push('', '## Remaining gaps', ...HP.styleGaps(target, s1.P, 6).map(t => '- ' + t), '', '## Settings changed', changed.length ? changed.join(' · ') : 'none');
  fs.writeFileSync(path.join(OUT, 'report.md'), md.join('\n') + '\n'); console.log(md.join('\n'));
})().catch(e => { console.error(e); process.exit(1); });

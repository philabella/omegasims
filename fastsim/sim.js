#!/usr/bin/env node
// fastsim batch runner: the lean/sim/sim.js bots (bots.js, loaded unchanged) on the vm engine, no browser.
//
//   node sim.js N [policy] [--tune '<json>'] [--focus genre] [--legend id] [--seed s] [--workers k] [--csv prefix]
//                [--kind greedy|random] [--story] [--build file.html] [--bots file.js] [--heroes] [--seeds a,b,c|a-b]
//
// policy: balanced | fast | stay3 | stay2 | commons | rarity | reader (the POLICIES in bots.js), or random
// (= bots.js "random" kind). Run i plays seed (s + i): the game's own rand() runs in its seeded mode from that
// seed and Math.random gets a stream derived from it, so every run replays exactly with `--seed <its seed>`
// N=1, whatever the worker count. Without --seed a random base seed is drawn and printed.
// Prints the same summary as lean/sim/sim.js, then speed; --csv writes <prefix>runs.csv and <prefix>fights.csv.
'use strict';
const path = require('path');
const fs = require('fs');
const os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const { DEFAULT_BUILD, DEFAULT_BOTS } = require('./engine');
const { makeEngine, runSeeds } = require('./recorder');

// ------------------------------------------------------------------ worker
if (!isMainThread) {
  const cfg = workerData;
  let eng;
  try { eng = makeEngine(cfg); } catch (e) { parentPort.postMessage({ fatal: e.message + '\n' + e.stack }); }
  parentPort.on('message', m => {
    if (m.stop) { process.exit(0); }
    const out = runSeeds(eng, m.seeds, cfg);
    parentPort.postMessage({ id: m.id, out });
  });
  return;
}

// ------------------------------------------------------------------ main
function parseArgs(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { const k = a.slice(2); const nx = argv[i + 1]; if (nx === undefined || nx.startsWith('--')) o[k] = true; else { o[k] = nx; i++; } }
    else o._.push(a);
  }
  return o;
}
const A = parseArgs(process.argv.slice(2));
if (A.help || A.h || !A._.length) {
  console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 12).map(l => l.replace(/^\/\/ ?/, '')).join('\n'));
  process.exit(0);
}
const N = +A._[0] || 100;
let POLN = A._[1] || A.policy || 'balanced';
let KIND = A.kind || 'greedy';
if (POLN === 'random') { KIND = 'random'; POLN = 'balanced'; }
if (POLN === 'greedy') POLN = 'balanced';
const cfg = {
  build: path.resolve(A.build || DEFAULT_BUILD), bots: path.resolve(A.bots || DEFAULT_BOTS),
  tune: A.tune && A.tune !== true ? JSON.parse(A.tune) : null, kind: KIND, pol: POLN, story: !!A.story,
  focus: A.focus && A.focus !== true ? A.focus : '', legend: A.legend && A.legend !== true ? A.legend : '',
};
// the policy names bots.js defines (its POLICIES object lives in a closure, so read them from the source)
const POLICY_NAMES = (() => { try { const m = /POLICIES\s*=\s*\{([\s\S]*?)\n\s*\};/.exec(fs.readFileSync(cfg.bots, 'utf8')); return m ? [...m[1].matchAll(/^\s*(\w+)\s*:\s*\{/gm)].map(x => x[1]) : []; } catch (e) { return []; } })();
if (KIND !== 'random' && POLICY_NAMES.length && !POLICY_NAMES.includes(POLN)) { console.error(`unknown policy "${POLN}": ${path.basename(cfg.bots)} has ${POLICY_NAMES.join(', ')} (or random)`); process.exit(2); }
let seeds;
if (A.seeds) {
  const s = String(A.seeds);
  seeds = /^-?\d+-\d+$/.test(s) ? (() => { const [a, b] = s.split('-').map(Number); return Array.from({ length: b - a + 1 }, (_, i) => a + i); })() : s.split(',').map(Number);
} else {
  const base = A.seed != null && A.seed !== true ? (+A.seed | 0) : (Math.floor(Math.random() * 2 ** 30));
  seeds = Array.from({ length: N }, (_, i) => (base + i) | 0);
}
const WORKERS = Math.max(1, Math.min(+(A.workers || 2) || 1, os.cpus().length, seeds.length));

async function runAll() {
  const results = new Array(seeds.length);
  if (WORKERS === 1) {
    const eng = makeEngine(cfg);
    runSeeds(eng, seeds, cfg).forEach((r, i) => { results[i] = r; });
    return results;
  }
  const chunk = +(A.chunk || Math.max(2, Math.min(25, Math.ceil(seeds.length / (WORKERS * 6)))));
  const tasks = []; for (let i = 0; i < seeds.length; i += chunk) tasks.push({ id: i, seeds: seeds.slice(i, i + chunk) });
  let next = 0;
  await Promise.all(Array.from({ length: WORKERS }, () => new Promise((resolve, reject) => {
    const w = new Worker(__filename, { workerData: cfg });
    const feed = () => { if (next < tasks.length) { const t = tasks[next++]; w.postMessage(t); } else { w.postMessage({ stop: true }); } };
    w.on('message', m => {
      if (m.fatal) { reject(new Error(m.fatal)); return; }
      m.out.forEach((r, k) => { results[m.id + k] = r; });
      feed();
    });
    w.on('error', reject);
    w.on('exit', () => resolve());
    feed();
  })));
  return results;
}

function csvCell(v) { if (v == null) return ''; const s = String(v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
function writeCsv(file, cols, rows) {
  const lines = [cols.join(',')];
  rows.forEach(r => lines.push(cols.map(c => csvCell(r[c])).join(',')));
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  fs.writeFileSync(file, lines.join('\n') + '\n');
}

const RUN_COLS = ['seed', 'policy', 'kind', 'focus', 'forced_legend', 'result', 'round', 'lives', 'fights', 'fights_won', 'merges', 'rerolls', 'rank',
  'rank2_round', 'rank3_round', 'rank4_round', 'rank5_round', 'gold_start', 'gold_earned', 'gold_sold', 'gold_spent_buy', 'gold_spent_reroll', 'gold_spent_rank',
  'gold_interest', 'gold_streak', 'gold_other', 'gold_left', 'board_n', 'board', 'genres', 'traits', 'crossovers', 'items_n', 'items', 'legendary', 'mythic_fielded', 'epic_plus', 'common_share', 'err'];
const FIGHT_COLS = ['seed', 'policy', 'round', 'act', 'boss', 'boss_retry', 'win', 'duration_s', 'board_n', 'board_cap', 'rank', 'board', 'enemy_tpl', 'enemy_title',
  'lives_before', 'lives_lost', 'lives_after', 'gold_before', 'gold_gain', 'gold_after'];

function runRow(r) {
  const L = r.log || {}, e = L.end || {}, x = r.x || {};
  const st = x.stats || { spend: {} }; const sp = st.spend || {};
  const rk = {}; (x.ranks || []).forEach(([round, rank]) => { if (rk[rank] == null) rk[rank] = round; });
  const spent = (sp.buy || 0) + (sp.reroll || 0) + (sp.rank || 0);
  const start = x.startGold != null ? x.startGold : '';
  return {
    seed: r.seed, policy: cfg.kind === 'random' ? 'random' : cfg.pol, kind: cfg.kind, focus: cfg.focus, forced_legend: cfg.legend,
    result: e.result || (L.err ? 'error' : ''), round: e.round, lives: e.lives, fights: st.fights, fights_won: st.won, merges: e.merges, rerolls: st.rerolls, rank: e.rank,
    rank2_round: rk[2], rank3_round: rk[3], rank4_round: rk[4], rank5_round: rk[5],
    gold_start: start, gold_earned: st.gold, gold_sold: st.sold, gold_spent_buy: sp.buy, gold_spent_reroll: sp.reroll, gold_spent_rank: sp.rank, gold_interest: st.interest, gold_streak: st.streak,
    gold_other: start === '' || x.goldLeft == null ? '' : x.goldLeft - (start + (st.gold || 0) + (st.sold || 0) - spent), gold_left: x.goldLeft,
    board_n: e.boardN, board: (e.ids || []).join(' '), genres: e.gen, traits: e.tr, crossovers: (x.cross || []).join(' '),
    items_n: (x.items || []).length, items: (x.items || []).join(' '), legendary: x.legend || '', mythic_fielded: e.mythic ? 1 : 0, epic_plus: e.epicPlus,
    common_share: e.commonShare != null ? +e.commonShare.toFixed(3) : '', err: L.err || x.err || '',
  };
}
function fightRows(r) {
  return ((r.x && r.x.fights) || []).map(f => ({
    seed: r.seed, policy: cfg.kind === 'random' ? 'random' : cfg.pol, round: f.round, act: f.act, boss: f.boss ? 1 : 0, boss_retry: f.tries, win: f.win ? 1 : 0,
    duration_s: f.t, board_n: f.n, board_cap: f.cap, rank: f.rank, board: f.board, enemy_tpl: f.tpl, enemy_title: f.title,
    lives_before: f.livesBefore, lives_lost: f.livesLost, lives_after: f.livesAfter, gold_before: f.goldBefore, gold_gain: f.goldGain, gold_after: f.goldAfter,
  }));
}

(async () => {
  const t0 = process.hrtime.bigint(), c0 = process.cpuUsage();
  const res = await runAll();
  const secs = Number(process.hrtime.bigint() - t0) / 1e9;
  const cu = process.cpuUsage(c0), cpu = (cu.user + cu.system) / 1e6;   // all threads of this process
  const out = res.map(r => r.log && !r.log.err ? r.log : { err: (r.log && r.log.err) || 'no log' });

  // ---- summary: same lines and numbers as lean/sim/sim.js ----
  const KINDs = KIND, STORY = cfg.story, FOCUS = cfg.focus, LEG = cfg.legend;
  const errsR = out.filter(r => r.err);
  const ok = out.filter(r => !r.err);
  const wins = ok.filter(r => r.end.result === 'win').length;
  const endRound = {}; ok.filter(r => r.end.result !== 'win').forEach(r => { endRound[r.end.round] = (endRound[r.end.round] || 0) + 1; });
  const perRound = {}; ok.forEach(r => r.fights.forEach(f => { const k = f.round; perRound[k] = perRound[k] || { n: 0, w: 0, t: 0 }; perRound[k].n++; perRound[k].w += f.win; perRound[k].t += f.t; }));
  const avg = (a) => a.reduce((s, x) => s + x, 0) / a.length;
  console.log(`${FOCUS || ''}${LEG ? '+' + LEG : ''} ${KINDs}${POLN !== 'balanced' ? ' [' + POLN + ']' : ''}${STORY ? ' story' : ''} N=${ok.length} win=${(100 * wins / ok.length).toFixed(1)}% lives(win)=${avg(ok.filter(r => r.end.result === 'win').map(r => r.end.lives) || [0]).toFixed(1)} merges=${avg(ok.map(r => r.end.merges)).toFixed(1)} trinkets=${avg(ok.map(r => r.end.trinkets)).toFixed(1)} rank=${avg(ok.map(r => r.end.rank)).toFixed(1)}`);
  console.log('lost at round:', JSON.stringify(endRound));
  { const r5 = ok.filter(r => r.end.r5); const pct = f => (100 * ok.filter(f).length / ok.length).toFixed(0) + '%';
    console.log(`profile: reachedRank5=${pct(r => r.end.r5)} (avg round ${r5.length ? avg(r5.map(r => r.end.r5)).toFixed(1) : '-'}) mythicFielded=${pct(r => r.end.mythic)} epic+onBoard=${avg(ok.map(r => r.end.epicPlus)).toFixed(2)} board=${avg(ok.map(r => r.end.boardN)).toFixed(2)} genres=${avg(ok.map(r => r.end.genres)).toFixed(2)} common/uncommonShare=${(100 * avg(ok.map(r => r.end.commonShare))).toFixed(0)}% goldLeft=${avg(ok.map(r => r.end.goldLeft)).toFixed(1)}`); }
  console.log('per round win% / avg t:', Object.keys(perRound).map(k => `${k}:${(100 * perRound[k].w / perRound[k].n).toFixed(0)}%/${(perRound[k].t / perRound[k].n).toFixed(0)}s`).join(' '));
  if (process.env.HEROES || A.heroes) {
    const cnt = {}, win = {}; ok.forEach(r => (r.end.ids || []).forEach(x => { const id = x.split(':')[0]; cnt[id] = (cnt[id] || 0) + 1; if (r.end.result === 'win') win[id] = (win[id] || 0) + 1; }));
    console.log('final-board heroes (runs / win%):', Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]).map(k => `${k} ${cnt[k]}/${(100 * (win[k] || 0) / cnt[k]).toFixed(0)}%`).join('  '));
    const lg = {}; ok.forEach(r => { const k = r.end.leg || 'none'; lg[k] = lg[k] || { n: 0, w: 0 }; lg[k].n++; if (r.end.result === 'win') lg[k].w++; }); console.log('legend:', Object.entries(lg).map(([k, v]) => `${k} ${v.n}/${(100 * v.w / v.n).toFixed(0)}%`).join('  '));
  }
  if (errsR.length) console.log('RUN ERRORS', errsR.length, errsR.slice(0, 3));
  // ---- fastsim extras ----
  const se = ok.length ? 100 * Math.sqrt((wins / ok.length) * (1 - wins / ok.length) / ok.length) : 0;
  console.log(`fastsim: ${seeds.length} runs in ${secs.toFixed(2)}s = ${(seeds.length / secs).toFixed(1)} runs/s on ${WORKERS} worker${WORKERS > 1 ? 's' : ''} (cpu ${cpu.toFixed(1)}s = ${(seeds.length / cpu).toFixed(1)} runs per CPU-second) | win ±${se.toFixed(1)} (1 s.e.) | seeds ${seeds.length > 1 ? seeds[0] + '..' + seeds[seeds.length - 1] : seeds[0]} | ${path.basename(cfg.build)}`);
  if (A.csv) {
    const pre = A.csv === true ? 'fastsim-' : A.csv;
    writeCsv(pre + 'runs.csv', RUN_COLS, res.map(runRow));
    writeCsv(pre + 'fights.csv', FIGHT_COLS, res.flatMap(fightRows));
    console.log(`csv: ${pre}runs.csv (${res.length} rows), ${pre}fights.csv (${res.reduce((s, r) => s + ((r.x && r.x.fights) || []).length, 0)} rows)`);
  }
  if (A.json) { fs.writeFileSync(A.json, JSON.stringify(res)); console.log('json: ' + A.json); }
})().catch(e => { console.error('fastsim error:', e.message); process.exit(1); });

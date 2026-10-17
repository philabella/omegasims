#!/usr/bin/env node
// One-command game check, no AI involved (CPU only): difficulty ladder + balance lab, then ONE short report with
// automatic flags. Run it after every change and read check/REPORT.md (about one page).
//
//   node fastsim/check.js [--build lean/tropebrawl.html] [--quick] [--only ladder|balance] [--vs <old check.json>] [--no-exploit]
//
//   Also runs fastsim/exploit.js --only fuzz (free-gold / gold-loop / crash hunting). For the slower
//   "what does the expert lean on" check, run: node fastsim/exploit.js --only lean
//
//   --quick   fewer runs (~5 min instead of ~35): good for "did my change break something"
//   --vs      add a "was" column from an earlier check.json, to see what a change moved
//
// What runs:
//   ladder   steady + rarity bots (fastsim) and the expert bot (smartbot champion) at every Game Level, normal difficulty
//   balance  expert bot, enemies x1.3, same seeds per config: one genre, genre pairs, each trait/character banned,
//            each Legendary forced, each item given; steady bot: genre/trait focus, forced Legendary, one-item-only
// Then flagged configs are re-run on fresh seeds; a flag that does not hold on the re-run is dropped.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const HERE = __dirname, ROOT = path.resolve(HERE, '..');
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i < 0 ? d : argv[i + 1]; };
const has = k => argv.includes(k);
const DEF_BUILD = ['lean/tropebrawl.html', 'tropebrawl.html'].map(f => path.join(ROOT, f)).find(f => fs.existsSync(f));
const BUILD = path.resolve(opt('--build', DEF_BUILD));
const SMOKE = has('--smoke'), QUICK = has('--quick') || SMOKE, ONLY = opt('--only', 'all');
const OUT = path.resolve(opt('--out', path.join(ROOT, 'check')));
const POLICY = path.resolve(opt('--policy', path.join(HERE, 'smartbot-vm/champion.json')));
const W = String(opt('--workers', 3));
const N_STEADY = SMOKE ? 20 : QUICK ? 300 : 1000, N_EXPERT_LV = SMOKE ? 4 : QUICK ? 30 : 100, N_LAB = SMOKE ? 4 : QUICK ? 40 : 120, N_GLAB = SMOKE ? 20 : QUICK ? 200 : 500, STRESS = String(opt('--stress', '1.3'));
fs.mkdirSync(path.join(OUT, 'builds'), { recursive: true });
const T0 = Date.now();
const say = m => process.stderr.write(`[check ${Math.round((Date.now() - T0) / 1000)}s] ${m}\n`);
const node = (args, cwd) => execFileSync(process.execPath, args, { cwd: cwd || ROOT, encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'pipe'] });
const steady = (pol, n, build, extra = []) => {
  const o = node([path.join(HERE, 'sim.js'), String(n), pol, '--workers', W, '--seed', '40000', '--build', build, ...extra]);
  const m = /win=([\d.]+)%/.exec(o), l = /lives\(win\)=([\d.]+)/.exec(o);
  return { win: m ? +m[1] : null, lives: l ? +l[1] : null };
};
const lab = (build, runs, args, name) => {
  const out = path.join(OUT, 'lab', name);
  node(['balance-lab.js', '--engine', 'vm', '--build', build, '--policy', POLICY, '--runs', String(runs), '--workers', W, '--out', out, ...args], path.join(HERE, 'smartbot-vm'));
  return JSON.parse(fs.readFileSync(path.join(out, 'lab.json'), 'utf8'));
};
const src = fs.readFileSync(BUILD, 'utf8');
const LV_LINE = '  const lv=Math.max(0,Math.min(LV_MAX,UI.lv|0));';
// v19.70+: the ladder is LADDER (Levels lvMin..18; old Level N = new N+4); older builds: LEVELS (Levels 0..N)
const LADDER2 = /const LADDER=\[null,/.test(src);
const LV_LO = LADDER2 ? +(/lvMin:(\d+)/.exec(src) || [, 4])[1] : 0;
const levels = !src.includes(LV_LINE) ? 0 : LADDER2 ? (/const LADDER=\[null,([\s\S]*?)\n\];/.exec(src) || [, ''])[1].split('\n').filter(l => /\{n:\d+/.test(l)).length
  : +(/const LEVELS=\[([\s\S]*?)\n\];/.exec(src) || [, ''])[1].split('\n').filter(l => /\{id:'/.test(l)).length;
const levelBuild = n => { const f = path.join(OUT, 'builds', `lv${n}.html`); fs.writeFileSync(f, src.replace(LV_LINE, `  const lv=${n};`)); return f; };
const B0 = levels ? levelBuild(LV_LO) : BUILD;
const R = { ladder2: LADDER2, build: path.relative(ROOT, BUILD), at: new Date().toISOString().slice(0, 16).replace('T', ' '), quick: QUICK, ladder: null, lab: null, glab: null, flags: [] };

// ---------------- ladder ----------------
if (ONLY !== 'balance') {
  R.ladder = [];
  for (let n = LV_LO; n <= levels; n++) {
    const b = levels ? levelBuild(n) : BUILD;
    const row = { level: n, steady: steady('balanced', N_STEADY, b).win, rarity: steady('rarity', N_STEADY >> 1, b).win };
    const e = lab(b, N_EXPERT_LV, ['--groups', 'base'], `ladder-lv${n}`).rows[0];
    row.expert = +(100 * e.win).toFixed(1); row.expertLives = +e.lives.toFixed(1); row.expertErr = e.err | 0;
    R.ladder.push(row); say(`level ${n}: steady ${row.steady}% rarity ${row.rarity}% expert ${row.expert}%`);
    if (!levels) break;
  }
}

// ---------------- balance ----------------
if (ONLY !== 'ladder') {
  say('balance lab (expert, enemies x' + STRESS + ')...');
  R.lab = lab(B0, N_LAB, ['--stress', STRESS], 'balance');
  say('steady-bot focus / Legendary / item checks...');
  const G = R.lab.game, gl = {};
  gl.baseline = steady('balanced', N_GLAB, B0);
  [...G.live, ...Object.keys(G.traits)].forEach(k => { gl['focus:' + k] = steady('balanced', N_GLAB, B0, ['--focus', k]); });
  Object.keys(G.legends).forEach(k => { gl['leg:' + k] = steady('balanced', N_GLAB, B0, ['--legend', k]); });
  gl['items:none'] = steady('balanced', N_GLAB, B0, ['--tune', '{"only":"none"}']);
  Object.keys(G.items).forEach(k => { gl['item:' + k] = steady('balanced', N_GLAB, B0, ['--tune', JSON.stringify({ only: k, onlyLv: 2 })]); });
  R.glab = gl;

  // ---- flags: rules for "this needs balancing" (expert numbers are paired deltas vs the baseline, x1.3) ----
  const rows = R.lab.rows, base = rows.find(r => r.key === 'baseline'), p = x => (100 * x).toFixed(0);
  const flag = (kind, key, text) => R.flags.push({ kind, key, text });
  rows.filter(r => (r.group === 'traits' || r.group === 'chars') && r.delta <= -0.15 && r.z <= -2).forEach(r => flag('MANDATORY', r.key, `${r.label}: ${p(r.win)}% (${p(r.delta)} pts) - too important to play without`));
  rows.filter(r => (r.group === 'traits' || r.group === 'chars') && r.delta >= 0.08 && r.z >= 2).forEach(r => flag('HARMFUL', r.key, `${r.label}: ${p(r.win)}% (+${p(r.delta)} pts) - the expert does better when it cannot buy it`));
  const pairs = rows.filter(r => r.group === 'pairs').sort((a, b) => b.win - a.win);
  if (pairs.length && pairs[0].win - pairs[pairs.length - 1].win > 0.25) flag('LOPSIDED', 'pairs', `genre pairs range ${p(pairs[pairs.length - 1].win)}% (${pairs[pairs.length - 1].label}) to ${p(pairs[0].win)}% (${pairs[0].label})`);
  rows.filter(r => r.group === 'mono' && r.win < base.win - 0.3).forEach(r => flag('TRAP', r.key, `${r.label}: ${p(r.win)}% vs ${p(base.win)}% free play - one-genre builds do not work`));
  const none = rows.find(r => r.key === 'leg:none');
  if (none) rows.filter(r => r.group === 'legends' && r.key !== 'leg:none' && r.win <= none.win).forEach(r => flag('DUD', r.key, `${r.label}: ${p(r.win)}% - no better than no Legendary (${p(none.win)}%)`));
  const items = rows.filter(r => r.group === 'items' && r.key !== 'item:noitems'), rar = r => /\(Rare\)/.test(r.label);
  const avg = a => a.reduce((s, r) => s + r.delta, 0) / (a.length || 1);
  if (items.length && avg(items.filter(rar)) < avg(items.filter(r => !rar(r)))) flag('INVERTED', 'items', `Rare items add ${p(avg(items.filter(rar)))} pts on average, Commons ${p(avg(items.filter(r => !rar(r))))} - Rares should be stronger`);
  R.lab.use.filter(u => u.pick === 0 && u.tier >= 2).forEach(u => flag('UNUSED', 'use:' + u.id, `${u.name} (${G.rarity[u.tier - 1]}) never reaches a final board`));
  const gb = gl.baseline.win;
  Object.entries(gl).filter(([k]) => k.startsWith('focus:')).forEach(([k, v]) => { if (v.win >= gb + 12) flag('DOMINANT', k, `steady bot ${k}: ${v.win}% vs ${gb}% - focusing this is far above normal play`); if (v.win <= gb - 25) flag('WEAK', k, `steady bot ${k}: ${v.win}% vs ${gb}%`); });
  // a crashing bot reads as "the game is too hard": never trust a number with errors behind it
  rows.filter(r => r.err > 0).forEach(r => flag('BOT CRASH', 'err:' + r.key, `${r.label}: ${r.err} expert run(s) crashed - fix the bot before reading any number`));
  (R.ladder || []).filter(l => l.expertErr > 0).forEach(l => flag('BOT CRASH', 'err:lv' + l.level, `Game Level ${l.level}: ${l.expertErr} expert run(s) crashed`));
  if (R.ladder) { const top = R.ladder[R.ladder.length - 1]; if (top.expert >= 85) flag('TOO EASY', 'ladder', `expert bot still wins ${top.expert}% at the top level`); }

  // ---- re-check expert flags on fresh seeds; keep only those that hold ----
  const chk = R.flags.filter(f => /^(ban|banTrait|mono|leg):/.test(f.key));
  if (chk.length) {
    say(`re-checking ${chk.length} flags on fresh seeds...`);
    const cfg = chk.map(f => { const r = rows.find(x => x.key === f.key); return { key: f.key, label: r.label, opts: r.opts || optsOf(f.key) }; });
    const re = lab(B0, N_LAB, ['--stress', STRESS, '--groups', 'base', '--seedtag', 'recheck', '--configs', JSON.stringify(cfg)], 'recheck');
    const rb = re.rows.find(r => r.key === 'baseline');
    chk.forEach(f => { const r = re.rows.find(x => x.key === f.key), o = rows.find(x => x.key === f.key); if (!r) return;
      const same = Math.sign(r.delta) === Math.sign(o.delta) && Math.abs(r.z) >= 1.5;
      f.recheck = `${p(r.win)}% (${r.delta >= 0 ? '+' : ''}${p(r.delta)}) on fresh seeds, baseline ${p(rb.win)}%`; f.holds = same; });
    R.flags = R.flags.filter(f => f.holds !== false);
  }
}
function optsOf(key) { const [k, v] = key.split(':'); return k === 'ban' ? { ban: [v] } : k === 'banTrait' ? { banTrait: v } : k === 'mono' ? { genres: [v] } : k === 'leg' ? (v === 'none' ? { noLegend: true } : { giveLeg: v }) : {}; }

// ---------------- report ----------------
const prev = opt('--vs') ? JSON.parse(fs.readFileSync(path.resolve(opt('--vs')), 'utf8')) : null;
const was = (sel) => { if (!prev) return ''; try { const v = sel(prev); return v == null ? ' | -' : ` | ${v}`; } catch (e) { return ' | -'; } };
const W_ = prev ? ' | was' : '', D_ = prev ? '|---' : '';
let md = `# Tropebrawl check: ${R.build} (${R.at}${QUICK ? ', quick' : ''})\n\n`;
if (R.ladder) {
  md += `## Difficulty by Game Level (win %)\n\n| Level | Steady bot | Rarity bot | Expert bot (lives)${W_} |\n|---|---|---|---${D_}|\n`;
  R.ladder.forEach(r => { md += `| ${r.level} | ${r.steady} | ${r.rarity} | ${r.expert} (${r.expertLives})${was(P => { const q = P.ladder.find(x => x.level + (R.ladder2 && !P.ladder2 ? 4 : 0) === r.level); return q ? `${q.steady} / ${q.rarity} / ${q.expert}` : null; })} |\n`; });
}
if (R.lab) {
  const rows = R.lab.rows, base = rows.find(r => r.key === 'baseline'), p = x => (100 * x).toFixed(0);
  md += `\n## Flags (${R.flags.length})\n\n` + (R.flags.length ? R.flags.map(f => `- **${f.kind}** ${f.text}${f.recheck ? ` (re-check: ${f.recheck})` : ''}`).join('\n') : 'None.') + '\n';
  const best = (g, k = 3) => { const a = rows.filter(r => r.group === g).sort((x, y) => y.win - x.win); return { top: a.slice(0, k), bot: a.slice(-k).reverse() }; };
  const li = a => a.map(r => `${r.key === 'leg:none' ? 'none' : r.label.replace(/^(Only |Always |Start with |No )/, '')} ${p(r.win)}%`).join(', ');
  md += `\n## Strongest and weakest (expert bot, enemies x${STRESS}, free play ${p(base.win)}%)\n\n| Area | Strongest | Weakest |\n|---|---|---|\n`;
  md += `| Genre pairs | ${li(best('pairs', 2).top)} | ${li(best('pairs', 2).bot)} |\n`;
  md += `| One genre only | ${li(best('mono', 2).top)} | ${li(best('mono', 2).bot)} |\n`;
  md += `| Traits (win without it; lower = more important) | ${li(best('traits', 2).bot)} | ${li(best('traits', 2).top)} |\n`;
  md += `| Characters (win without it) | ${li(best('chars', 3).bot)} | ${li(best('chars', 3).top)} |\n`;
  md += `| Legendaries (always taken) | ${li(best('legends', 2).top)} | ${li(best('legends', 2).bot)} |\n`;
  md += `| Items (given at round 1) | ${li(best('items', 3).top)} | ${li(best('items', 3).bot)} |\n`;
  const g = R.glab, gs = (pre) => Object.entries(g).filter(([k]) => k.startsWith(pre)).sort((a, b) => b[1].win - a[1].win), gli = a => a.map(([k, v]) => `${k.split(':')[1]} ${v.win}%`).join(', ');
  md += `\n## Steady bot, normal difficulty (free play ${g.baseline.win}%)\n\n| Area | Strongest | Weakest |\n|---|---|---|\n`;
  const foc = gs('focus:');
  md += `| Focus (genre or trait) | ${gli(foc.slice(0, 3))} | ${gli(foc.slice(-3).reverse())} |\n| Legendary | ${gli(gs('leg:').slice(0, 2))} | ${gli(gs('leg:').slice(-2).reverse())} |\n| Only this item (none: ${g['items:none'].win}%) | ${gli(gs('item:').slice(0, 3))} | ${gli(gs('item:').slice(-3).reverse())} |\n`;
  md += `\nFull tables: check/lab/balance/lab.md (expert), check.json (everything).\n`;
}
// exploit fuzzer (about a minute): random player actions hunting for free gold, gold loops and crashes
if (!has('--no-exploit')) {
  say('exploit fuzzer...');
  try { const ex = node([path.join(HERE, 'exploit.js'), '--build', BUILD, '--only', 'fuzz', '--out', path.join(OUT, 'exploit')].concat(QUICK ? ['--quick'] : []));
    md += '\n' + ex.split('\n').filter(l => !l.startsWith('# ') && !/^\d{4}-/.test(l)).join('\n').replace('## 1. Arbitrage fuzzer', '## Exploit fuzzer'); }
  catch (e) { md += `\n## Exploit fuzzer\n\n**The fuzzer itself failed:** ${String(e.message).slice(0, 300)}\n`; }
}
fs.writeFileSync(path.join(OUT, 'REPORT.md'), md);
fs.writeFileSync(path.join(OUT, 'check.json'), JSON.stringify({ ladder2: R.ladder2, build: R.build, at: R.at, quick: QUICK, ladder: R.ladder, flags: R.flags, glab: R.glab, lab: R.lab && { rows: R.lab.rows, use: R.lab.use } }));
say(`done: ${path.relative(ROOT, path.join(OUT, 'REPORT.md'))}`);
process.stdout.write(md);

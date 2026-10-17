#!/usr/bin/env node
// Strategy tournament: a roster of scripted playstyles (lean/sim/bots.js) plays every Game Level on the same seeds,
// so balance problems show up as numbers: a plan that beats everything (dominant), a plan that never works (trap),
// a genre that is far ahead or behind, and how each plan makes its gold (interest vs. streaks).
//   node fastsim/tournament.js --build b.html [--levels 0,5,10] [--n 200] [--workers 2] [--only a,b] [--out file.md]
// No AI: scripted bots on the vm engine. Same seeds for every strategy (common random numbers).
'use strict';
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const argv = process.argv.slice(2), opt = (k, d) => { const i = argv.indexOf(k); return i < 0 ? d : argv[i + 1]; };
const HERE = __dirname, BUILD = path.resolve(opt('--build')), LV = opt('--levels', '0,5,10').split(',').map(Number);
const N = +opt('--n', 200), W = opt('--workers', '2'), ONLY = opt('--only', ''), OUT = opt('--out', '');
const ROSTER = [
  ['balanced', '', 'Autopilot: curve to Rank 5, banks 🪙20'],
  ['curve7', '', 'Curve to Rank 7, banks 🪙20'],
  ['tempo', '', 'Tempo: spends everything, ranks early (streak gold)'],
  ['econ50', '', 'Econ: banks to 🪙50, rolls down on boss rounds'],
  ['losestreak', '', 'Lose-streak: 2 on board + bank through round 4'],
  ['hyper', '', 'Reroll comp: Rank 4 rolling for ★★★ Rares to round 11'],
  ['rush7', '', 'Rush Rank 7: chases Epics and Mythics'],
  ['grabber', '', 'Item grabber: takes every item'],
  ['reader', '', 'Reader: ranks when its pairs are done'],
  ['curve7', 'army', 'Curve7 + all-in Army'],
  ['curve7', 'bug', 'Curve7 + all-in Bugs'],
  ['curve7', 'undead', 'Curve7 + all-in Undead'],
  ['curve7', 'ball', 'Curve7 + all-in Sportsball'],
  ['curve7', 'heist', 'Curve7 + all-in Heist Crew'],
  ['curve7', 'west', 'Curve7 + all-in Wild West'],
  ['econ50', 'heist', 'Econ to 🪙50 + all-in Heist Crew'],
].filter(r => !ONLY || ONLY.split(',').includes(r[0] + (r[1] ? ':' + r[1] : '')));
const tmp = path.join(HERE, 'out', 'tournament-' + process.pid); fs.mkdirSync(tmp, { recursive: true });
function csv(file) { // small CSV reader (quoted cells)
  const rows = []; const t = fs.readFileSync(file, 'utf8').trim().split(/\r?\n/);
  const cells = l => { const o = []; let c = '', q = false; for (let i = 0; i < l.length; i++) { const ch = l[i];
    if (q) { if (ch === '"' && l[i + 1] === '"') { c += '"'; i++; } else if (ch === '"') q = false; else c += ch; }
    else if (ch === '"') q = true; else if (ch === ',') { o.push(c); c = ''; } else c += ch; } o.push(c); return o; };
  const head = cells(t[0]); t.slice(1).forEach(l => { const v = cells(l), r = {}; head.forEach((h, i) => r[h] = v[i]); rows.push(r); }); return rows;
}
const html = fs.readFileSync(BUILD, 'utf8'), anchor = '  const lv=Math.max(0,Math.min(LV_MAX,UI.lv|0));';
if (!html.includes(anchor)) throw new Error('level anchor not found in build');
const res = {}; const t0 = Date.now();
for (const L of LV) {
  const b = path.join(tmp, `lv${L}.html`); fs.writeFileSync(b, html.replace(anchor, `  const lv=${L};`));
  for (const [pol, focus, label] of ROSTER) {
    const key = pol + (focus ? ':' + focus : ''), pre = path.join(tmp, `${key.replace(':', '-')}-lv${L}-`);
    const args = [path.join(HERE, 'sim.js'), String(N), pol, '--build', b, '--seed', '40000', '--workers', W, '--csv', pre];
    if (focus) args.push('--focus', focus);
    execFileSync(process.execPath, args, { encoding: 'utf8', maxBuffer: 1 << 28 });
    const runs = csv(pre + 'runs.csv'), fights = csv(pre + 'fights.csv'), n = runs.length || 1, num = k => runs.reduce((s, r) => s + (+r[k] || 0), 0) / n;
    const gb = fights.filter(f => f.gold_before !== '' && f.gold_before != null);
    const lost = [1, 2, 3].map(a => fights.filter(f => +f.act === a).reduce((s, f) => s + (+f.lives_lost || 0), 0) / n);
    (res[key] = res[key] || { label })[L] = { win: 100 * runs.filter(r => r.result === 'win').length / n, rank: num('rank'), bank: gb.reduce((s, f) => s + (+f.gold_before || 0), 0) / (gb.length || 1),
      int: num('gold_interest'), streak: num('gold_streak'), reroll: num('gold_spent_reroll'), mythic: 100 * num('mythic_fielded'), lost, err: runs.filter(r => r.err).length };
    process.stderr.write(`[${Math.round((Date.now() - t0) / 1000)}s] Lv${L} ${key}: ${res[key][L].win.toFixed(1)}%\n`);
  }
}
// ---- report ----
const f1 = x => x.toFixed(1), f0 = x => Math.round(x);
let md = `# Strategy tournament: ${path.basename(BUILD)}\n\n${N} runs per strategy per level, same seeds for every strategy. Full-run win %.\n\n`;
md += `| Strategy | ${LV.map(L => 'Lv' + L).join(' | ')} | Bank (avg 🪙 held) | Interest / run | Streak / run | Rerolls 🪙 | Final rank | Lives lost A1/A2/A3 (Lv${LV[0]}) |\n|---|${LV.map(() => '---|').join('')}---|---|---|---|---|---|\n`;
for (const [k, v] of Object.entries(res)) { const a = v[LV[0]];
  md += `| ${v.label} | ${LV.map(L => f1(v[L].win) + '%').join(' | ')} | ${f0(a.bank)} | ${f0(a.int)} | ${f0(a.streak)} | ${f0(a.reroll)} | ${a.rank.toFixed(1)} | ${a.lost.map(f1).join(' / ')} |\n`; }
// flags
const flags = [];
for (const L of LV) {
  const rows = Object.entries(res).map(([k, v]) => [k, v[L].win]).sort((a, b) => b[1] - a[1]);
  const med = rows[Math.floor(rows.length / 2)][1];
  if (rows.length > 2 && rows[0][1] - rows[1][1] >= 10) flags.push(`Lv${L}: **${res[rows[0][0]].label}** is ${f1(rows[0][1] - rows[1][1])} points ahead of every other plan (possible dominant strategy).`);
  rows.filter(([, w]) => med >= 10 && w < med / 3).forEach(([k, w]) => flags.push(`Lv${L}: **${res[k].label}** wins ${f1(w)}% vs a median of ${f1(med)}% (trap).`));
  const g = Object.entries(res).filter(([k]) => k.startsWith('curve7:')).map(([k, v]) => [k.split(':')[1], v[L].win]);
  if (g.length > 1) { const hi = Math.max(...g.map(x => x[1])), lo = Math.min(...g.map(x => x[1])); if (hi - lo >= 15) flags.push(`Lv${L}: genre gap ${f1(hi - lo)} points (${g.map(([n, w]) => n + ' ' + f1(w) + '%').join(', ')}).`); }
  Object.entries(res).forEach(([k, v]) => { if (v[L].err) flags.push(`Lv${L}: ${v.label} had ${v[L].err} run errors.`); });
}
md += `\n${flags.length ? flags.map(f => '- ' + f).join('\n') : '- No dominant plan, no trap, no genre gap over 15 points.'}\n`;
console.log(md); if (OUT) fs.writeFileSync(OUT, md);

#!/usr/bin/env node
// Bots vs people: compares how a bot plays with how people play, from the game's own run log.
//   1. Save the people's runs: the runlog branch of tropebrawl-play (runs/<player id>/*.json) or ArtifactData "runs/<player id>/r"
//   2. node fastsim/humanlike.js --build tropebrawl.html --human <dir> --bots '[{"key":"a","dir":"smartbot-vm/runs/x","opts":{"noLook":true}}]'
//      [--runs 200] [--workers 4] [--out file.md]
// The bot plays through the same recorder (globalThis.__tlForce), at the same Game Levels as the people's runs, so both
// sides are measured identically: per act, gold held at the fight, rerolls / Trains / buys / sells per round, shop rank,
// board size, genres mixed, top-genre share, stars, items; plus run results and event / Legendary picks.
// Each bot also gets one "style distance" to the people (humanprofile.js: 0 = same style, ~1 = a typical choice
// metric off by one noticeable step), the number fitstyle.js minimises.
// Without --human it profiles the bots alone (useful before any human runs exist).
'use strict';
const fs = require('fs'), path = require('path');
const L = require('./smartbot-vm/lib.js');
const HP = require('./humanprofile.js');
const A = L.args(process.argv.slice(2));
const BUILD = path.resolve(A.build), N = +(A.runs || 200), W = +(A.workers || 4);
const BOTS = A.bots ? JSON.parse(A.bots) : [];

(async () => {
  const human = HP.readHuman(A.human);
  const levels = human.length ? human.map(r => r.lv | 0) : [+(A.level || 10)];
  const src = fs.readFileSync(BUILD, 'utf8');
  const tmp = path.join(__dirname, 'out', 'humanlike-' + process.pid);
  const H = HP.heroMap(src);
  const profiles = [];
  if (human.length) profiles.push({ key: 'people', label: `People (${human.length} runs)`, P: HP.profile(human, H) });
  const lvCount = {}; levels.forEach(l => { lvCount[l] = (lvCount[l] || 0) + 1; });
  const browser = await L.launch();
  for (const b of BOTS) {
    const pol = L.readJSON(b.policy ? path.resolve(b.policy) : path.resolve(b.dir, 'champion.json'), null); const opts = Object.assign({ lookK: 2 }, pol.opts || {}, b.opts || {});
    const recs = [];
    for (const [lv, c] of Object.entries(lvCount)) {
      const pool = await new L.Pool(browser, HP.levelFile(src, lv, tmp), W).start();
      const n = Math.max(20, Math.round(N * c / levels.length));
      recs.push(...await HP.playRecords(pool, pol.params || pol, opts, L.seedSet('humanlike', n, +lv)));
    }
    profiles.push({ key: b.key, label: (b.label || b.key) + ` (${recs.length} runs)`, P: HP.profile(recs, H) });
  }
  await browser.close();
  // report: per act, people vs each bot
  const md = [`# Bots vs people: ${path.basename(BUILD)}`, '', human.length ? `People: ${human.length} recorded runs at Game Levels ${Object.entries(lvCount).map(([l, c]) => l + '×' + c).join(', ')}. Bots replay the same level mix.` : 'No people runs yet: bot profiles only.', ''];
  md.push('| | ' + profiles.map(p => p.label).join(' | ') + ' |', '|---|' + profiles.map(() => '---|').join(''));
  if (human.length) md.push('| **style distance** (0 = plays like the people) | - | ' + profiles.slice(1).map(p => HP.styleDistance(profiles[0].P, p.P).toFixed(2)).join(' | ') + ' |');
  md.push('| run win | ' + profiles.map(p => (100 * p.P.win).toFixed(0) + '%').join(' | ') + ' |');
  md.push('| rounds reached | ' + profiles.map(p => p.P.round.toFixed(1)).join(' | ') + ' |');
  for (const act of [1, 2, 3, 4]) for (const [k, name, fmt] of HP.METRICS) md.push(`| Act ${act} · ${name} | ` + profiles.map(p => p.P.acts[act] ? fmt(p.P.acts[act][k]) : '-').join(' | ') + ' |');
  const top = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => `${k} ${v}`).join(', ') || '-';
  md.push('', ...profiles.map(p => `- ${p.label}: events ${top(p.P.ev, 4)} · Legendaries ${top(p.P.leg, 3)}`));
  if (human.length && profiles.length > 1) {
    md.push('', '## Biggest gaps (bot vs people, in noticeable steps)');
    for (const p of profiles.slice(1)) md.push(`- **${p.label}**: ` + HP.styleGaps(profiles[0].P, p.P, 5).join('; '));
  }
  const txt = md.join('\n'); console.log(txt); if (A.out) fs.writeFileSync(path.resolve(A.out), txt + '\n');
  fs.rmSync(tmp, { recursive: true, force: true });
})().catch(e => { console.error(e); process.exit(1); });

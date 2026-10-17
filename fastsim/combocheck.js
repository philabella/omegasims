#!/usr/bin/env node
// Interaction check: do items and Legendaries behave when they are combined? Replays saved real battles (autopilot
// boards from every genre focus) with every Legendary x every item (at ★★★) and every pair of items, same seed.
//   node fastsim/combocheck.js --build b.html [--snaps 48] [--workers 4]
// Reports
//  1. broken states seen in any combo battle: bad numbers (NaN / Infinity), alive at 0 HP, HP above max, runaway
//     multipliers (damage x50, attack speed x20), more than 60 units on a side, a reserve character that is also on the
//     field, negative shields, battles that hit the 120 s timeout, thrown errors. Each with the combo that caused it.
//  2. synergy outliers: wins(A+B) - wins(A) - wins(B) + wins(none), as a share of the battles. Big positive = a combo
//     much stronger than its parts (check it is meant to be); big negative = two things that cancel or fight each other.
'use strict';
const path = require('path');
const os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const { makeEngine, runSeeds } = require('./recorder');

const PROBE = `(function(){
  const P = globalThis.__ci = { issues: {}, label: '', battles: 0 };
  const note = (k, ex) => { const o = P.issues[k] = P.issues[k] || { n: 0, ex: null, combos: {} }; o.n++; o.combos[P.label] = (o.combos[P.label] || 0) + 1; if (!o.ex) o.ex = P.label + ' t' + (B ? B.t.toFixed(1) : '?') + ' ' + ex; };
  P.note = note;
  const st = step; step = function (dt) {
    const r = st.apply(this, arguments);
    if (!B || !B.__ci) return r;
    const n = { A: 0, E: 0 };
    for (const u of B.units) {
      n[u.side]++;
      for (const f of ['hp', 'maxHp', 'atk', 'mana', 'timer', 'dmgMult', 'aspd', 'shield']) { const v = u[f]; if (v !== undefined && (typeof v !== 'number' || !isFinite(v))) note('bad number: ' + f, u.id + ' = ' + v); }
      if (u.alive && !u.crowd && u.hp <= 0) note('alive at 0 HP', u.id + ' (' + u.side + ')');
      if (u.alive && u.hp > u.maxHp * 1.001 + 0.5) note('HP above max', u.id + ' ' + u.hp.toFixed(0) + '/' + u.maxHp.toFixed(0));
      if (u.maxHp !== undefined && u.maxHp <= 0 && u.alive) note('max HP 0 or less', u.id);
      if (u.dmgMult > 50) note('runaway damage multiplier', u.id + ' x' + u.dmgMult.toFixed(1));
      if (u.aspd > 20) note('runaway attack speed', u.id + ' ' + u.aspd.toFixed(1));
      if (u.shield < -0.5) note('negative shield', u.id + ' ' + u.shield);
    }
    if (n.A > 60 || n.E > 60) note('more than 60 units on a side', 'A ' + n.A + ' E ' + n.E);
    if (B.reserve && B.reserve.length) for (const c of B.reserve) if (B.units.includes(c)) note('reserve character also on the field', c.id);
    if (B.done) { B.__ci = false; if (B.t > 120) note('battle hit the 120 s timeout', 'A:' + B.units.filter(u => u.side === 'A' && u.alive).map(u => u.id).join(',') + ' E:' + B.units.filter(u => u.side === 'E' && u.alive).map(u => u.id).join(',')); }
    return r;
  };
  P.fight = function (js, legend, items, label) {
    S = JSON.parse(js); S.legend = legend; S.trinkets = items.slice(); S.tlv = {}; items.forEach(t => S.tlv[t] = 3);
    P.label = label; seeded = true; rngState = 12345;
    try { startBattle(true); B.__ci = true; P.battles++; let k = 0; while (!B.done && k++ < 8000) step(DT); if (!B.done) note('battle never ended (8000 steps)', label); }
    catch (e) { note('error: ' + String(e.message).slice(0, 80), label + ' ' + String(e.stack || '').split('\\n')[1]); return -1; }
    // margin: share of my team's HP left minus share of theirs left (summons left out), from -1 (crushed) to +1
    let ha = 0, hA = 0, he = 0, hE = 0; B.units.forEach(u => { if (u.summon) return; const h = u.alive ? Math.max(0, u.hp) : 0; if (u.side === 'A') { ha += h; hA += u.maxHp; } else { he += h; hE += u.maxHp; } });
    return (B.win ? 1000 : 0) + (ha / Math.max(1, hA) - he / Math.max(1, hE));
  };
})();`;

if (!isMainThread) {
  const { build, snaps, combos } = workerData;
  const eng = makeEngine({ build }); eng.ev(PROBE);
  eng.ev(`globalThis.__snapsW=${JSON.stringify(snaps)}`);
  const out = {};
  for (const c of combos) out[c.k] = eng.ev(`__snapsW.reduce((a,js)=>{const r=__ci.fight(js,${JSON.stringify(c.legend)},${JSON.stringify(c.items)},${JSON.stringify(c.k)});const w=r>=500?1:0;a[0]+=w;a[1]+=r-1000*w;return a;},[0,0])`);
  parentPort.postMessage({ out, P: eng.ev('JSON.stringify({issues:__ci.issues,battles:__ci.battles})') });
  return;
}

const A = {}; process.argv.slice(2).forEach((a, i, arr) => { if (a.startsWith('--')) A[a.slice(2)] = arr[i + 1]; });
const build = path.resolve(A.build), NS = +(A.snaps || 48), W = +(A.workers || Math.min(4, os.cpus().length));
(async () => {
  const T0 = Date.now();
  const eng = makeEngine({ build });
  const genres = eng.ev('Object.keys(GENRES).filter(g=>!PARKED.has(g))');
  // snapshots: boards from every genre focus (genre Legendaries need their genre on the board), Act 2+ fights
  eng.ev(`globalThis.__snaps=[];globalThis.__snapOn=true;const __sb=startBattle;startBattle=function(){if(__snapOn&&S&&S.enemy&&S.round>=6&&Math.random()<0.2)__snaps.push(JSON.stringify(S));return __sb.apply(this,arguments);};`);
  const per = Math.ceil(NS / genres.length); let seed = 97000; const snaps = [];
  for (const g of genres) { eng.ev('__snaps=[]'); let k = 0; while (eng.ev('__snaps.length') < per && k++ < 60) runSeeds(eng, [seed++], { kind: 'greedy', pol: 'curve7', focus: g }); snaps.push(...eng.ev(`__snaps.slice(0,${per})`)); }
  eng.ev('__snapOn=false');
  const items = eng.ev('TRINKETS.map(t=>t[0])'), legends = eng.ev('Object.keys(LEGENDS)');
  const names = eng.ev('Object.fromEntries([...TRINKETS.map(t=>[t[0],TR[t[0]].name]),...Object.keys(LEGENDS).map(l=>[l,LEGENDS[l].name])])');
  const combos = [{ k: 'none', legend: null, items: [] }];
  legends.forEach(l => combos.push({ k: 'L:' + l, legend: l, items: [] }));
  items.forEach(t => combos.push({ k: 'T:' + t, legend: null, items: [t] }));
  legends.forEach(l => items.forEach(t => combos.push({ k: 'L:' + l + '+T:' + t, legend: l, items: [t] })));
  items.forEach((t, i) => items.slice(i + 1).forEach(u => combos.push({ k: 'T:' + t + '+T:' + u, legend: null, items: [t, u] })));
  const chunks = Array.from({ length: W }, () => []); combos.forEach((c, i) => chunks[i % W].push(c));
  const wins = {}, issues = {}; let battles = 0;
  await Promise.all(chunks.map(ch => new Promise((res, rej) => {
    const w = new Worker(__filename, { workerData: { build, snaps, combos: ch } });
    w.on('message', m => { Object.assign(wins, m.out); const p = JSON.parse(m.P); battles += p.battles;
      for (const [k, v] of Object.entries(p.issues)) { const o = issues[k] = issues[k] || { n: 0, ex: v.ex, combos: {} }; o.n += v.n; for (const [c, n] of Object.entries(v.combos)) o.combos[c] = (o.combos[c] || 0) + n; }
      w.terminate(); res(); });
    w.on('error', rej); })));
  const N = snaps.length, nm = k => k.split('+').map(x => names[x.slice(2)] || x).join(' + ');
  console.log(`# Interaction check: ${path.basename(build)}\n\n${N} saved battles (Act 2+, every genre focus) x ${combos.length} combos (each Legendary, each item at ★★★, each Legendary + item, each item pair) = ${battles} battles. ${((Date.now() - T0) / 1000).toFixed(0)} s.\n`);
  const iss = Object.entries(issues).sort((a, b) => b[1].n - a[1].n);
  console.log('## Broken states\n\n' + (iss.length ? iss.map(([k, v]) => { const top = Object.entries(v.combos).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([c, n]) => nm(c) + ' ' + n + '×').join('; ');
    return `- **${k}**: ${v.n}× in ${Object.keys(v.combos).length} combos · e.g. ${v.ex}\n  - most: ${top}`; }).join('\n') : 'None.'));
  // synergy on the HP margin (average over battles, in points of -100..100): margin(A+B) - margin(A) - margin(B) + margin(none)
  const M = k => 100 * wins[k][1] / N, Wn = k => wins[k][0];
  const syn = [];
  for (const c of combos) { if (!c.k.includes('+')) continue; const [a, b] = c.k.split('+');
    syn.push({ k: c.k, s: M(c.k) - M(a) - M(b) + M('none'), both: M(c.k), a: M(a), b: M(b), w: Wn(c.k), wa: Wn(a), wb: Wn(b) }); }
  syn.sort((x, y) => y.s - x.s);
  const f = v => (v >= 0 ? '+' : '') + v.toFixed(1);
  const row = x => `| ${nm(x.k)} | ${f(x.both)} (${x.w}) | ${f(x.a)} (${x.wa}) / ${f(x.b)} (${x.wb}) | ${f(x.s)} |`;
  console.log(`\n## Strongest synergies\n\nHP margin averaged over the ${N} battles (my HP left % minus theirs; wins in brackets). none = ${f(M('none'))} (${Wn('none')} wins).\n\n| combo | together | apart | synergy |\n|---|---|---|---|\n` + syn.slice(0, 20).map(row).join('\n'));
  console.log(`\n## Most negative (combined is worse than the parts)\n\n| combo | together | apart | synergy |\n|---|---|---|---|\n` + syn.slice(-20).reverse().map(row).join('\n'));
  // dead pairs: B changes battles on its own but does exactly nothing next to A (one overrides the other)
  const dead = [];
  for (const c of combos) { if (!c.k.includes('+')) continue; const [a, b] = c.k.split('+');
    for (const [x, y] of [[a, b], [b, a]]) if (Math.abs(M(c.k) - M(x)) < 0.05 && Math.abs(M(y) - M('none')) > 1) dead.push(`${names[y.slice(2)]} does nothing next to ${names[x.slice(2)]} (${f(M(y))} alone, ${f(M(x))} vs ${f(M(c.k))} together)`); }
  console.log('\n## Dead pairs (one does nothing when the other is held)\n\n' + (dead.length ? dead.map(d => '- ' + d).join('\n') : 'None.'));
  console.log(`\n## Singles (HP margin, wins of ${N}; none ${f(M('none'))}, ${Wn('none')})\n\n` + combos.filter(c => !c.k.includes('+') && c.k !== 'none').sort((x, y) => M(y.k) - M(x.k)).map(c => `${nm(c.k)} ${f(M(c.k))} (${Wn(c.k)})`).join(' · '));
})();

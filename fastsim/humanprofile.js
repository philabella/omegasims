// Shared by humanlike.js and fitstyle.js: read recorded runs, build a per-act play profile (the same function for
// people and bots), measure how far a bot's profile is from a person's, and play a bot through the game's recorder.
'use strict';
const fs = require('fs'), path = require('path');
const L = require('./smartbot-vm/lib.js');
const LINE = '  const lv=Math.max(0,Math.min(LV_MAX,UI.lv|0));';

function readHuman(dir) {
  const out = [];
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.json')) { try { const j = JSON.parse(fs.readFileSync(p, 'utf8')); const rec = j.data || j; if (rec && Array.isArray(rec.r)) out.push(rec); } catch (err) {} } });
  if (dir && fs.existsSync(dir)) walk(dir);
  return out;
}
// hero id -> genre / rarity, read from the game file
function heroMap(src) { const m = {}; const re = /\['([a-z0-9]+)','[^']*','([a-z]+)','[a-z]+',(\d)/g; let x; while ((x = re.exec(src))) m[x[1]] = { g: x[2], t: +x[3] }; return m; }
// one profile over a set of run records
function profile(recs, H) {
  const act = r => Math.min(4, Math.floor((r.n - 1) / 7) + 1);
  const P = { runs: recs.length, win: 0, quit: 0, round: 0, acts: {}, ev: {}, leg: {} };
  recs.forEach(rec => {
    if (rec.res === 'win') P.win++; if (rec.res === 'quit') P.quit++; P.round += rec.round || 0;
    rec.r.forEach(r => {
      const a = P.acts[act(r)] = P.acts[act(r)] || { rounds: 0, fights: 0, won: 0, gold: 0, rr: 0, tr: 0, buy: 0, sell: 0, rank: 0, board: 0, genres: 0, top: 0, stars: 0, items: 0 };
      a.rounds++; (r.a || []).forEach(x => { const k = x.split(':')[0]; if (k === 'r') a.rr++; if (k === 't') a.tr++; if (k === 'b') a.buy++; if (k === 's') a.sell++;
        if (k === 'e') P.ev[x.slice(2)] = (P.ev[x.slice(2)] || 0) + 1; if (k === 'l') P.leg[x.slice(2)] = (P.leg[x.slice(2)] || 0) + 1; });
      if (r.f) { const f = r.f, ids = f.b.map(s => s.split(':')); a.fights++; a.won += f.w ? 1 : 0; a.gold += f.g; a.rank += f.rk; a.board += ids.length; a.items += (f.it || []).length;
        const g = {}; ids.forEach(([id]) => { const gg = (H[id] || {}).g || '?'; g[gg] = (g[gg] || 0) + 1; }); const gs = Object.values(g); a.genres += gs.length; a.top += ids.length ? Math.max(...gs) / ids.length : 0;
        a.stars += ids.length ? ids.reduce((t, x) => t + (+x[1] || 1), 0) / ids.length : 0; }
    });
  });
  for (const a of Object.values(P.acts)) { const fr = a.fights || 1, rd = a.rounds || 1;
    Object.assign(a, { fightWin: a.won / fr, gold: a.gold / fr, rank: a.rank / fr, board: a.board / fr, genres: a.genres / fr, top: a.top / fr, stars: a.stars / fr, items: a.items / fr, rr: a.rr / rd, tr: a.tr / rd, buy: a.buy / rd, sell: a.sell / rd }); }
  P.win /= recs.length || 1; P.quit /= recs.length || 1; P.round /= recs.length || 1;
  return P;
}
const METRICS = [['fightWin', 'fights won', v => (100 * v).toFixed(0) + '%'], ['gold', 'gold held at the fight', v => v.toFixed(1)], ['rr', 'rerolls / round', v => v.toFixed(2)],
  ['tr', 'Trains / round', v => v.toFixed(2)], ['buy', 'buys / round', v => v.toFixed(2)], ['sell', 'sells / round', v => v.toFixed(2)], ['rank', 'shop rank', v => v.toFixed(1)],
  ['board', 'characters on board', v => v.toFixed(1)], ['genres', 'genres on board', v => v.toFixed(1)], ['top', 'top-genre share', v => (100 * v).toFixed(0) + '%'],
  ['stars', 'avg stars', v => v.toFixed(2)], ['items', 'items', v => v.toFixed(1)]];
// Style distance: how far a bot plays from a person, per act: the decisions a player controls plus how often they win
// their fights (skill matters too: a bot that copies the habits but loses far more is not that person), each metric
// divided by a "noticeable difference" scale, weighted by how many of the person's fights fall in that act.
// 0 = same style; about 1 = a typical metric is off by one noticeable step.
const STYLE = { gold: 6, rr: 0.5, tr: 0.25, buy: 0.5, sell: 0.25, rank: 0.5, genres: 0.5, top: 0.1, stars: 0.2, fightWin: 0.12 };
function styleDistance(hp, bp) {
  let s = 0, w = 0;
  for (const act of [1, 2, 3, 4]) { const h = hp.acts[act], b = bp.acts[act]; if (!h || !h.fights) continue;
    const wt = h.fights; let d = 0, n = 0;
    for (const [k, sc] of Object.entries(STYLE)) { if (b && b.fights) { d += Math.min(4, Math.abs(b[k] - h[k]) / sc); } else d += 4; n++; }
    s += wt * d / n; w += wt; }
  return w ? s / w : null;
}
// the act-by-act gaps, largest first (for reports)
function styleGaps(hp, bp, n = 6) {
  const out = []; const fmt = Object.fromEntries(METRICS.map(([k, name, f]) => [k, [name, f]]));
  for (const act of [1, 2, 3, 4]) { const h = hp.acts[act], b = bp.acts[act]; if (!h || !h.fights || !b) continue;
    for (const [k, sc] of Object.entries(STYLE)) out.push({ d: Math.abs(b[k] - h[k]) / sc, t: `Act ${act} ${fmt[k][0]}: person ${fmt[k][1](h[k])}, bot ${fmt[k][1](b[k])}` }); }
  return out.sort((a, b) => b.d - a.d).slice(0, n).map(g => g.t);
}
// level builds for a game file (the level line replaced), cached in dir
function levelFile(src, lv, dir) { if (!src.includes(LINE)) throw new Error('level line not found (pass the unlocked build)'); fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, `lv${lv}.html`); if (!fs.existsSync(f)) fs.writeFileSync(f, src.replace(LINE, `  const lv=${lv};`)); return f; }
// play a bot through the recorder on a pool (one level), returning run records like people's
async function playRecords(pool, params, opts, seeds) {
  const W = pool.pages.length, per = Math.ceil(seeds.length / W);
  const parts = await Promise.all(pool.pages.map((pg, i) => pg.evaluate(([s, p, o]) => { globalThis.__tlForce = true; globalThis.__tlOut = []; SB.playMany(s, p, o); const out = globalThis.__tlOut; globalThis.__tlForce = false; return out; }, [seeds.slice(i * per, (i + 1) * per), params, opts])));
  return parts.flat();
}
module.exports = { readHuman, heroMap, profile, METRICS, STYLE, styleDistance, styleGaps, levelFile, playRecords, LINE };

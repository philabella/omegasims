// smartbot core: injected into a Tropebrawl page. Plays whole runs headless through the game's own
// functions (newRun, buy, reroll, rankUp, sell, eventPick/eventSub/finishEvent, startBattle + step,
// settle, advanceAfterFight, resolvePending). Everything it knows about the game is read from the
// page (HERO, TIERM, LV, RANK, PRICE, GENRES, TRAITS, CROSSOVERS, TRINKETS, LEGENDS, EVENTS...),
// so it keeps working when numbers change.
//
// Policy = a flat dict of named numbers (see spec()). Node-side code evolves it.
// Lookahead = before each fight the enemy line-up is known (S.enemy); candidate boards are scored by
// simulating that fight a few times on a deep copy of S (never settle()), then S/B/rng are restored.
// Seeding = every source of randomness gets its own stream seeded from (runSeed, round, attempt,
// call#), so two policies playing the same seed see the same shops/enemies/fights as long as they
// make comparable choices (common random numbers). Lookahead fights use different seeds from the
// real fight, so the bot can't peek at the actual outcome.
window.SB = (function () {
  'use strict';
  const gv = n => { try { return (0, eval)(n); } catch (e) { return undefined; } };
  const K = {};
  let P = {}, OPT = {};

  // ------------------------------------------------------------------ RNG streams
  let ACTIVE = false, RUNSEED = 1, CTR = {}, LOOKMODE = false, LOOKK = 0;
  const LCACHE = new Map();
  const TAG = { shop: 1, enemy: 2, battle: 3, item: 4, leg: 5, round: 6, evpick: 7, rank: 8, look: 9 };
  function fmix(h) { h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return h | 0; }
  function h32() { let h = 0x2545F491; for (let i = 0; i < arguments.length; i++) h = fmix((h + Math.imul((arguments[i] | 0) ^ (0x632BE5AB * (i + 1)), 0x9E3779B1)) | 0); return h; }
  function streamSeed(tag) {
    const r = S ? S.round | 0 : 0, bt = S ? S.bossTries | 0 : 0;
    const key = tag * 100000 + r * 100 + bt;
    const c = CTR[key] = (CTR[key] || 0) + 1;
    return h32(RUNSEED, tag, r, bt, c);
  }
  const ORIG = {};
  function wrap(name, tag) {
    const f = window[name]; if (typeof f !== 'function' || f.__sb) return false;
    ORIG[name] = f;
    const w = function () {
      if (ACTIVE) {
        if (tag === TAG.battle && LOOKMODE) rngState = h32(RUNSEED, TAG.look, S.round | 0, S.bossTries | 0, LOOKK);
        else rngState = streamSeed(tag);
      }
      return f.apply(this, arguments);
    };
    w.__sb = true; window[name] = w; return true;
  }
  // UI work the headless bot never needs (render rebuilds the whole DOM, save writes localStorage)
  const STUB = ['render', 'save', 'closeSheet', 'toast', 'showPending', 'drawBattle', 'shake'];
  let stubbed = null;
  function stubUI() { if (stubbed) return; stubbed = {}; STUB.forEach(n => { if (typeof window[n] === 'function') { stubbed[n] = window[n]; window[n] = function () {}; } }); }
  function unstubUI() { if (!stubbed) return; Object.entries(stubbed).forEach(([n, f]) => { window[n] = f; }); stubbed = null; }

  // ------------------------------------------------------------------ constants from the page
  function init() {
    K.HERO = gv('HERO'); K.TBASE = gv('TBASE') || {};
    K.TIERM = gv('TIERM') || [1, 1.35, 1.8, 2.4, 3]; K.LV = gv('LV') || [1, 1.8, 3.2]; K.BODIES = gv('BODIES') || [3, 5, 7]; K.FRAC = gv('FRAC') || 0.42;
    K.PRICE = gv('PRICE') || [1, 2, 3, 4, 5]; K.RANK = gv('RANK'); K.REROLL = gv('REROLL'); if (K.REROLL == null) K.REROLL = 1;
    K.GENRES = gv('GENRES') || {}; K.TRAITS = gv('TRAITS') || {}; K.CROSS = gv('CROSSOVERS') || [];
    K.TRINKETS = (gv('TRINKETS') || []).map(a => a[0]); K.TR = gv('TR') || {}; K.TRINKET_CAP = gv('TRINKET_CAP') || 99;
    K.LEGENDS = gv('LEGENDS') || {}; K.gw = gv('genreWeight'); K.EVENTS = gv('EVENTS') || {}; K.SCHEDULE = gv('SCHEDULE') || [];
    K.DT = gv('DT') || 0.05; K.TUNE = gv('TUNE');
    K.benchSlots = gv('benchSlots') || ['n0', 'n1', 'n2', 'n3', 'n4'];
    K.maxTier = Math.max.apply(null, Object.values(K.HERO).map(h => h.tier));
    K.rankMax = K.RANK && K.RANK.odds ? K.RANK.odds.length : 5;
    K.rounds = K.SCHEDULE.length;
    [['rollShop', TAG.shop], ['prepareFight', TAG.enemy], ['startBattle', TAG.battle], ['trinketChoices', TAG.item], ['legendChoices', TAG.leg],
     ['startRound', TAG.round], ['eventPick', TAG.evpick], ['rankUp', TAG.rank]].forEach(([n, t]) => wrap(n, t));
    if (typeof window.newRun === 'function' && !window.newRun.__sb) { const nr = window.newRun; ORIG.newRun = nr; const w = function () { CTR = {}; return nr.apply(this, arguments); }; w.__sb = true; window.newRun = w; }
    return { spec: spec(), info: { heroes: Object.keys(K.HERO).length, genres: Object.keys(K.GENRES), traits: Object.keys(K.TRAITS), trinkets: K.TRINKETS, legends: Object.keys(K.LEGENDS), events: Object.keys(K.EVENTS), rounds: K.rounds, rankMax: K.rankMax, maxTier: K.maxTier, rarity: gv('RARITY') || null, wrapped: Object.keys(ORIG) } };
  }

  // ------------------------------------------------------------------ the policy vector
  // [name, lo, hi, init]. Dict-style entries (it.*, lg.*, ev.*, gp.*) are generated from the build.
  function spec() {
    const s = []; const add = (name, lo, hi, init, doc) => s.push({ name, lo, hi, init, doc: doc || '' });
    add('wPow', 0, 3, 1, 'team value: raw power (rarity x level) of fielded characters');
    add('wRar', -0.5, 1.5, 0.15, 'extra value per rarity step of a fielded character');
    add('wGenre', 0, 3, 0.8, 'value per active genre tier');
    add('wTrait', 0, 3, 0.6, 'value per active trait tier');
    add('wCross', 0, 3, 0.4, 'value per active crossover');
    add('wNear', 0, 1.5, 0.3, 'value of being one character short of the next synergy tier');
    add('wPair', 0, 3, 1.0, 'value of holding 2 one-star copies (one buy from a merge)');
    add('wCopy', 0, 1.5, 0.1, 'value of holding a single one-star copy');
    add('wBench', 0, 1, 0.1, 'value of power sitting on the bench');
    add('wCrowd', -1, 1, 0, 'preference for crowd characters');
    add('wFit', 0, 2, 0.5, 'penalty for a board that cannot be placed well (no front line / overflowing rows)');
    add('wMergeItem', 0, 3, 0.5, 'value of a first-time merge (it pays an item)');
    add('wPrice', 0, 1.5, 0.25, 'cost of one gold in team-value units (round 1)');
    add('goldDecay', 0, 1, 0.7, 'how much less a gold is worth by the last round (gold left at the end is worthless)');
    add('buyThr', -0.5, 2, 0.15, 'buy when the value gain exceeds this');
    add('splurge', 0, 5, 2, 'ignore the gold reserve for buys this much above the threshold');
    add('keepGold', 0, 150, 4, 'gold kept back from econStart (interest; above 50 = hoarding for gold-scaling builds)');
    add('econStart', 1, Math.max(16, K.rounds - 8), 4, 'round from which the reserve applies');
    add('rollRound', 1, K.rounds + 1, 11, 'round from which the reserve is dropped (all in)');
    add('bossAll', 0, 1, 0.6, '>0.5: no reserve on boss rounds (roll down for the boss)');
    add('rr1', 0, 8, 2, 'max paid rerolls per round, act 1');
    add('rr2', 0, 8, 4, 'max paid rerolls per round, act 2');
    add('rr3', 0, 8, 6, 'max paid rerolls per round, act 3');
    add('rollExcess', 0, 30, 8, 'no reroll cap while gold stays this far above the reserve');
    add('rerollThr', -0.5, 2, 0.5, 'reroll only if the best buy is worth less than this');
    for (let r = 2; r <= K.rankMax; r++) add('rk' + r, 1, K.rounds + 2, [0, 0, 2, 4, 7, 10][r] || r * 2, 'round by which to reach shop rank ' + r + ' (past the last round = never)');
    add('rankSurplus', 0, 30, 12, 'rank up any time gold exceeds cost + this');
    add('rankFirst', 0, 1, 0.6, '>0.5: rank up before buying');
    add('rankReserve', 0, 1, 0.3, '>0.5: rank-ups respect the gold reserve');
    add('sellMargin', 0, 2, 0.1, 'extra gain needed to sell a bench character to buy');
    add('sellJunk', -1, 2, 0.3, 'sell bench characters whose value is below their sale price by this');
    add('dangerP', 0, 1, 0.5, 'if simulated win chance is below this, spend everything to improve it');
    add('panicRolls', 0, 6, 2, 'rerolls allowed while in danger');
    add('tieEps', 0, 1, 0.15, 'simulate the next fight to break near-ties between buys');
    add('lookW', 0, 3, 1, 'weight of simulated fight score in tie-breaks');
    add('partialEps', 0, 0.3, 0.05, 'how much better a partial board must simulate to leave a slot empty');
    add('itemGold', -1, 2, 0, 'value of taking gold instead of an item');
    add('itemLook', 0, 3, 0.8, 'weight of simulated next-fight gain when picking items');
    add('itemRare', -1, 2, 0.3, 'bonus for Rare items');
    K.TRINKETS.forEach(t => add('it.' + t, -1.5, 1.5, 0, 'item preference: ' + (K.TR[t] ? K.TR[t].name : t)));
    add('legLook', 0, 3, 0.8, 'weight of simulated next-fight gain when picking Legendaries');
    add('legKeep', -1, 2, -0.2, 'value of keeping the current Legendary (+gold)');
    add('legRare', -1, 2, 0, 'value of the Rare item instead of a Legendary');
    Object.keys(K.LEGENDS).forEach(l => add('lg.' + l, -1.5, 1.5, 0, 'Legendary preference: ' + K.LEGENDS[l].name));
    const evInit = { recruit: 0.8, promotion: 0.6, supply: 0.6, payday: 0.2, reinforce: 0, deal: 0 };
    Object.keys(K.EVENTS).forEach(e => add('ev.' + e, -1.5, 1.5, evInit[e] != null ? evInit[e] : 0, 'event preference: ' + K.EVENTS[e].name));
    add('evGold', 0, 1, 0.3, 'event value per 5 gold');
    add('evLife', 0, 1, 0.15, 'event value per life');
    add('evLifeCurve', 0, 3, 1, 'how much more lives matter when low');
    add('evTV', 0, 1, 0.3, 'event value per team-value gain (promotions)');
    Object.keys(K.GENRES).forEach(g => add('gp.' + g, -1, 1.5, 0, 'genre preference: ' + K.GENRES[g].name));
    add('wFocus', 0, 2, 0, 'penalty per genre beyond two on the board (people commit to one or two genres; 0 = off)');
    return s;
  }
  function setParams(params, opts) {
    P = {}; spec().forEach(p => { P[p.name] = p.init; });
    Object.assign(P, params || {});
    // lookCache: reuse repeated practice fights (exact: same results on every seed, ~23% fewer practice fights)
    OPT = Object.assign({ lookK: 2, noLook: false, lookCache: true }, opts || {});
  }

  // ------------------------------------------------------------------ hero / team evaluation
  const H = id => K.HERO[id];
  const rangeOf = id => { const b = K.TBASE[H(id).trait]; return b && b.range === 'ranged' ? 'ranged' : 'melee'; };
  // v19.55: a 2-square giant (Kaiju) costs 2 board squares and is worth about two characters
  const sq = id => (typeof twoSlot === 'function' && twoSlot(id)) ? 2 : 1;
  const giantK = () => typeof TUNE !== 'undefined' && TUNE.wideHp ? (TUNE.wideHp + TUNE.wideAtk) / 2 : 1;
  function power(id, lv) { const h = H(id), t = K.TIERM[h.tier - 1] || 1; return (h.crowd ? t * K.FRAC * (K.BODIES[lv - 1] || K.BODIES[K.BODIES.length - 1]) : t * (K.LV[lv - 1] || K.LV[K.LV.length - 1])) * (sq(id) === 2 ? giantK() : 1); }
  function estHp(id, lv) { const b = K.TBASE[H(id).trait] || { hp: 100 }; return b.hp * power(id, lv); }
  const okCache = {};
  // can this melee character still act from the back row? asks the game's own blocked()/isDiver()
  function backOk(id) {
    if (rangeOf(id) !== 'melee') return true;
    if (okCache[id] != null) return okCache[id];
    let r = false; const ob = B;
    try { B = { units: [{ side: 'A', alive: true, row: 'front' }] }; r = !blocked({ range: 'melee', row: 'back', trait: H(id).trait, genre: H(id).genre, side: 'A', dive: false }); }
    catch (e) { r = false; } finally { B = ob; }
    return (okCache[id] = r);
  }
  const frontliner = id => rangeOf(id) === 'melee' && !backOk(id);
  const gp = id => P['gp.' + H(id).genre] || 0;
  function unitScore(u) { const h = H(u.id); return P.wPow * power(u.id, u.level) + P.wRar * (h.tier - 1) + gp(u.id) + (h.crowd ? P.wCrowd : 0); }
  function tierCount(tiers, n) { let t = 0; for (const x of tiers) if (n >= x) t++; return t; }
  function synScore(field) {
    const g = {}, t = {}, real = {}, seen = new Set(), mc = new Set();
    for (const u of field) {
      const h = H(u.id);
      if (!seen.has(u.id)) { seen.add(u.id); g[h.genre] = (g[h.genre] || 0) + 1; real[h.genre] = (real[h.genre] || 0) + 1; t[h.trait] = (t[h.trait] || 0) + 1; }
      if (!K.gw && u.level >= 3 && !mc.has(h.genre)) { mc.add(h.genre); g[h.genre]++; }
    }
    // the page's own rule when it has one (v19.3: Rare+ count 2 from two stars), so the bot scores what the game counts
    if (K.gw) for (const id of seen) { const w = K.gw(id, field); if (w > 1) { g[H(id).genre] += w - 1; real[H(id).genre] += w - 1; } }
    if (S && S.trinkets.includes('crest')) for (const k in g) g[k]++;
    let s = 0;
    for (const k in g) { const d = K.GENRES[k]; if (!d) continue; const tier = tierCount(d.tiers, g[k]); s += P.wGenre * tier; if (tier < d.tiers.length && g[k] === d.tiers[tier] - 1) s += P.wNear; }
    for (const k in t) { const d = K.TRAITS[k]; if (!d) continue; const tier = tierCount(d.tiers, t[k]); s += P.wTrait * tier; if (tier < d.tiers.length && t[k] === d.tiers[tier] - 1) s += P.wNear * 0.5; }
    const xep = S && S.legend === 'crossep';
    for (const x of K.CROSS) { const a = real[x.a] || 0, b = real[x.b] || 0; if (xep ? (a >= 1 && b >= 1) : (a >= 2 && b >= 2)) s += P.wCross; }
    // wFocus (v19.17, fitted from people's runs): each genre beyond two on the board costs this much
    if (P.wFocus) { const ng = Object.keys(real).length; if (ng > 2) s -= P.wFocus * (ng - 2); }
    // OPT.deep (human style, v19.2): people pick a genre and stack it. Value per character of the board's biggest genre,
    // plus its tiers counted again, so a deep board beats a wide one of the same raw value
    if (OPT.deep) { let top = null; for (const k in real) if (!top || real[k] > real[top]) top = k;
      if (top) { const d = K.GENRES[top]; s += OPT.deep * real[top] + (d ? OPT.deep * 2 * tierCount(d.tiers, g[top]) : 0); } }
    return s;
  }
  function fitPen(field) {
    let fr = 0, rg = 0; for (const u of field) { if (frontliner(u.id)) fr++; else if (rangeOf(u.id) === 'ranged') rg++; }
    return P.wFit * (Math.max(0, fr - 3) + Math.max(0, rg - 3) + (fr === 0 && field.length >= 3 ? 1 : 0));
  }
  function fieldScore(f) { let s = 0; for (const u of f) s += unitScore(u); return s + synScore(f) - fitPen(f); }
  function chooseField(units, n) {
    const arr = units.slice().sort((a, b) => unitScore(b) - unitScore(a));
    // n is a number of board squares: a giant takes 2
    const field = [], bench = []; let cap = n;
    for (const u of arr) { if (sq(u.id) <= cap) { field.push(u); cap -= sq(u.id); } else bench.push(u); }
    let best = fieldScore(field);
    for (const b of bench.slice(0, 3)) {
      let bi = -1, bs = best;
      for (let i = 0; i < field.length; i++) { if (sq(b.id) > cap + sq(field[i].id)) continue; const f2 = field.slice(); f2[i] = b; const sc = fieldScore(f2); if (sc > bs + 1e-9) { bs = sc; bi = i; } }
      if (bi >= 0) { const out = field[bi]; cap += sq(out.id) - sq(b.id); field[bi] = b; bench[bench.indexOf(b)] = out; best = bs; }
    }
    return { field, bench, score: best };
  }
  function TV(units, n) {
    const c = chooseField(units, n); let s = c.score;
    for (const u of c.bench) s += P.wBench * power(u.id, u.level);
    const c1 = {}; for (const u of units) if (u.level === 1) c1[u.id] = (c1[u.id] || 0) + 1;
    for (const id in c1) s += c1[id] >= 2 ? P.wPair : P.wCopy;
    return s;
  }
  function mergeSim(units) {
    let us = units.slice(); const ev = []; let changed = true, guard = 0;
    while (changed && guard++ < 10) {
      changed = false;
      for (const lvl of [1, 2]) {
        const need = lvl === 1 ? 3 : 2, cnt = {};
        for (const u of us) if (u.level === lvl) cnt[u.id] = (cnt[u.id] || 0) + 1;
        for (const id in cnt) if (cnt[id] >= need) { let rm = need; us = us.filter(u => !(u.id === id && u.level === lvl && rm-- > 0)); us.push({ id, level: lvl + 1 }); ev.push([id, lvl + 1]); changed = true; }
      }
    }
    return { units: us, ev };
  }
  function afterBuy(units, o) {
    if (o.level === 2) {
      const hi = units.filter(u => u.id === o.id).sort((a, b) => b.level - a.level)[0];
      if (hi) { const us = units.map(u => u === hi ? { id: u.id, level: u.level + 1 } : u); const m = mergeSim(us); m.ev.unshift([o.id, hi.level + 1]); return m; }
    }
    return mergeSim(units.concat([{ id: o.id, level: o.level }]));
  }
  function mergeItems(ev) {
    let v = 0, room = K.TRINKET_CAP - S.trinkets.length - S.pending.filter(p => p.kind !== 'legend').length;
    for (const [id, l] of ev) { if (!(S.paid[id] && S.paid[id][l]) && room > 0) { v += P.wMergeItem; room--; } }
    return v;
  }
  const myUnits = () => S.units.map(u => ({ id: u.id, level: u.level, uid: u.uid, bench: u.slot[0] === 'n' }));
  const allowed = id => !(OPT.maxTier && H(id).tier > OPT.maxTier) && !(OPT.genre && H(id).genre !== OPT.genre)
    && !(OPT.genres && !OPT.genres.includes(H(id).genre)) && !(OPT.ban && OPT.ban.includes(id)) && !(OPT.banTrait && H(id).trait === OPT.banTrait);

  // ------------------------------------------------------------------ lookahead
  let STAT = null, LOGN = 0, SIMNOW = false;
  function outcome() {
    let ha = 0, ma = 0, he = 0, me = 0;
    for (const u of B.units) { if (u.summon) continue; if (u.side === 'A') { ma += u.maxHp; if (u.alive) ha += Math.max(0, u.hp); } else { me += u.maxHp; if (u.alive) he += Math.max(0, u.hp); } }
    const win = !!B.win;
    return { win, s: win ? 0.6 + 0.4 * Math.min(1, ha / (ma || 1)) : 0.4 * (1 - Math.min(1, he / (me || 1))) };
  }
  // simulate the next fight k times with the current board; S is not modified, B is restored
  function evalArr(k) {
    if (!S.enemy || !fielded().length) return { score: 0, p: 0 };
    const ob = B; let sum = 0, wins = 0; LOOKMODE = true;
    // speed options: OPT.lookCache (on by default) reuses a practice fight whose run seed, attempt number and whole state
    // (shop aside) repeat - exact, because practice fights are seeded from those, and the RNG position is restored too.
    // OPT.lookDT = coarser practice timestep (off: 0.1 cost the expert ~12 points)
    const dt = OPT.lookDT || K.DT, lim = OPT.lookDT ? Math.ceil(6000 * K.DT / dt) : 6000;
    try {
      for (let j = 0; j < k; j++) {
        LOOKK = j; let key = null;
        // battle predictor (fastsim/pred): OPT.pred asks the trained network instead of simulating (one call covers all k)
        if (OPT.pred && !SIMNOW && globalThis.PRED && PRED.ready) { startBattle(true); const r = PRED.predict(PRED.feat()); sum += r.s * k; wins += r.p * k; STAT.preds = (STAT.preds || 0) + 1; break; }
        if (OPT.lookCache) { const sh = S.shop; S.shop = null; key = RUNSEED + '|' + j + '|' + JSON.stringify(S); S.shop = sh; const c = LCACHE.get(key); if (c) { sum += c.s; wins += c.win; rngState = c.rng; STAT.cached = (STAT.cached || 0) + 1; continue; } }
        startBattle(true);
        // OPT.logLook = n: record every n-th practice fight (features at the start, result) for training the predictor
        const lf = OPT.logLook && globalThis.PRED && (LOGN++ % OPT.logLook === 0) ? PRED.feat() : null;
        let g = 0; while (!B.done && g++ < lim) step(dt); const o = outcome(); sum += o.s; wins += o.win; STAT.sims++;
        if (lf) PRED.log.push(lf, o.s, o.win ? 1 : 0);
        if (key) { if (LCACHE.size > 20000) LCACHE.clear(); LCACHE.set(key, { s: o.s, win: o.win, rng: rngState }); }
      }
    } finally { LOOKMODE = false; B = ob; }
    return { score: sum / k, p: wins / k };
  }
  // run fn on a deep copy of S, return what it returns, then restore S, B, the stream counters and rng
  function onCopy(fn) {
    const oS = S, oB = B, oC = Object.assign({}, CTR), oR = rngState;
    S = structuredClone(oS);
    try { return fn(); } finally { S = oS; B = oB; CTR = oC; rngState = oR; }
  }
  const FRONT = { std: [1, 2, 0, 3], mirror: [2, 1, 3, 0] };
  function rows(field, mode) {
    let front, back;
    if (mode === 'tank' || mode === 'tankMirror') {
      const s = field.slice().sort((a, b) => estHp(b.id, b.level) - estHp(a.id, a.level));
      const nf = Math.min(4, Math.max(1, Math.ceil(field.length / 2))); front = s.slice(0, nf); back = s.slice(nf);
    } else {
      front = field.filter(u => rangeOf(u.id) === 'melee'); back = field.filter(u => rangeOf(u.id) !== 'melee');
      if (mode === 'flex' || mode === 'flexMirror') { const mv = front.filter(u => backOk(u.id)); if (front.length - mv.length >= 1) { front = front.filter(u => !backOk(u.id)); back = back.concat(mv); } }
      front.sort((a, b) => estHp(b.id, b.level) - estHp(a.id, a.level));
      back.sort((a, b) => power(b.id, b.level) - power(a.id, a.level));
    }
    const w = l => l.reduce((t, u) => t + sq(u.id), 0);
    while (w(front) > 4) back.push(front.pop());
    while (w(back) > 4) front.push(back.pop());
    while (w(front) > 4) back.push(front.pop());
    return { front, back };
  }
  // put the units with these uids on the board in the given arrangement, everything else on the bench
  function apply(uids, mode) {
    const set = new Set(uids);
    const field = S.units.filter(u => set.has(u.uid)), rest = S.units.filter(u => !set.has(u.uid));
    const { front, back } = rows(field, mode);
    const cols = /Mirror|mirror/.test(mode) ? FRONT.mirror : FRONT.std;
    S.units.forEach(u => { u.slot = 'x'; });
    const over = [];
    const placeRow = (list, r) => { const used = new Set(); const gs = list.filter(u => sq(u.id) === 2), sm = list.filter(u => sq(u.id) === 1);
      gs.forEach((u, i) => { if (i > 1) { over.push(u); return; } const c = i === 0 ? (gs.length === 1 && /Mirror|mirror/.test(mode) ? 2 : 0) : 2; u.slot = r + c; used.add(c); used.add(c + 1); });
      sm.forEach(u => { const c = cols.find(c => !used.has(c)); if (c === undefined) { over.push(u); return; } u.slot = r + c; used.add(c); }); };
    placeRow(front, 'f'); placeRow(back, 'b');
    rest.push(...over);
    rest.forEach((u, i) => { u.slot = K.benchSlots[i] || 'gone'; });
    const gone = S.units.filter(u => u.slot === 'gone');
    gone.forEach(u => sell(u.uid));
  }
  function quickArrange() {
    const n = Math.min(boardSize(), S.units.length);
    const c = chooseField(myUnits(), n); apply(c.field.map(u => u.uid), 'std');
  }
  function arrangeBest() {
    const n = Math.min(boardSize(), S.units.length);
    if (!n) return { score: 0, p: 0 };
    const units = myUnits();
    const c = chooseField(units, n);
    const subs = []; const key = a => a.slice().sort((x, y) => x - y).join(',');
    const seen = new Set(); const push = (uids, partial) => { const k = key(uids); if (!seen.has(k)) { seen.add(k); subs.push({ uids, partial }); } };
    push(c.field.map(u => u.uid), false);
    if (OPT.noLook || !S.enemy) { apply(subs[0].uids, 'std'); return { score: 0, p: 1 }; }
    push(units.slice().sort((a, b) => power(b.id, b.level) - power(a.id, a.level)).slice(0, n).map(u => u.uid), false);
    if (c.bench.length) { const wf = c.field.slice().sort((a, b) => unitScore(a) - unitScore(b))[0]; push(c.field.map(u => u === wf ? c.bench[0].uid : u.uid), false); }
    if (!OPT.forceFill && n >= 2 && S.units.length - (n - 1) <= K.benchSlots.length) { const wf = c.field.slice().sort((a, b) => unitScore(a) - unitScore(b))[0]; push(c.field.filter(u => u !== wf).map(u => u.uid), true); }
    const k = OPT.lookK;
    let best = null;
    // hybrid predictor (OPT.pred 'hybrid'): score every board x arrangement with the network, then settle the
    // top OPT.predTop (default 3) with real practice fights
    if (OPT.pred === 'hybrid' && globalThis.PRED && PRED.ready) {
      const cs = [];
      for (const sb of subs) for (const mode of ['std', 'mirror', 'tank', 'flex', 'tankMirror', 'flexMirror']) { apply(sb.uids, mode); const e = evalArr(k); cs.push({ uids: sb.uids, mode, partial: sb.partial, pa: e.score - (sb.partial ? P.partialEps : 0) }); }
      cs.sort((a, b) => b.pa - a.pa); SIMNOW = true;
      try { for (const c of cs.slice(0, OPT.predTop || 3)) { apply(c.uids, c.mode); const e = evalArr(k); const sc = e.score - (c.partial ? P.partialEps : 0); if (!best || sc > best.adj + 1e-9) best = { uids: c.uids, mode: c.mode, adj: sc, score: e.score, p: e.p, partial: c.partial }; } }
      finally { SIMNOW = false; }
      apply(best.uids, best.mode); if (best.partial) STAT.partial++; return best;
    }
    for (const sb of subs) { apply(sb.uids, 'std'); const e = evalArr(k); const sc = e.score - (sb.partial ? P.partialEps : 0); if (!best || sc > best.adj) best = { uids: sb.uids, mode: 'std', adj: sc, score: e.score, p: e.p, partial: sb.partial }; }
    if (best.score < 0.92) {
      for (const mode of ['mirror', 'tank', 'flex', 'tankMirror', 'flexMirror']) {
        apply(best.uids, mode); const e = evalArr(k); const sc = e.score - (best.partial ? P.partialEps : 0);
        if (sc > best.adj + 1e-9) best = { uids: best.uids, mode, adj: sc, score: e.score, p: e.p, partial: best.partial };
      }
    }
    apply(best.uids, best.mode);
    if (best.partial) STAT.partial++;
    return best;
  }

  // ------------------------------------------------------------------ items, Legendaries, pending
  const itemVal = t => (P['it.' + t] || 0) + (K.TR[t] && K.TR[t].rar === 'R' ? P.itemRare : 0);
  const lgVal = l => (l ? P['lg.' + l] || 0 : 0);
  const useLook = w => !OPT.noLook && w > 0.02 && S.enemy && fielded().length;
  function pickItem(p) {
    if (!p.choices || p.choices.some(t => S.trinkets.includes(t))) p.choices = trinketChoices(p.level, false);
    const full = S.trinkets.length >= K.TRINKET_CAP;
    let best = '', bv = P.itemGold;
    if (!full && !OPT.noItems && p.choices.length) {
      const look = useLook(P.itemLook); const base = look ? evalArr(OPT.lookK).score : 0;
      bv = -Infinity;
      for (const t of p.choices) {
        let v = itemVal(t);
        if (look) v += P.itemLook * (onCopy(() => { S.trinkets.push(t); return evalArr(OPT.lookK).score; }) - base);
        if (v > bv) { bv = v; best = t; }
      }
      if (P.itemGold > bv) best = '';
    }
    if (best) STAT.items.push(best);
    resolvePending(best || null);
  }
  function pickLegend(p) {
    if (OPT.giveLeg) { STAT.legends.push(OPT.giveLeg); resolvePending(OPT.giveLeg); return; } // balance lab: this Legendary at every offer
    if (!p.choices) { p.choices = legendChoices(); p.rare = p.win ? (trinketChoices(3, true)[0] || null) : null; }
    if (p.rare && S.trinkets.includes(p.rare)) p.rare = trinketChoices(3, true)[0] || null;
    const look = useLook(P.legLook); const base = look ? evalArr(OPT.lookK).score : 0;
    const gain = fn => look ? P.legLook * (onCopy(() => { fn(); return evalArr(OPT.lookK).score; }) - base) : 0;
    const opts = p.choices.map(id => ({ v: id, val: lgVal(id) + gain(() => { S.legend = id; }) }));
    if (p.rare && !OPT.noItems && S.trinkets.length < K.TRINKET_CAP) opts.push({ v: 't:' + p.rare, val: lgVal(S.legend) + itemVal(p.rare) + P.legRare + gain(() => { S.trinkets.push(p.rare); }) });
    if (S.legend) opts.push({ v: '', val: lgVal(S.legend) + P.legKeep });
    opts.sort((a, b) => b.val - a.val);
    const v = opts.length ? opts[0].v : '';
    resolvePending(v || null);
    if (OPT.noLegend) S.legend = null;
    STAT.legends.push(v ? v : 'keep');
  }
  function resolveAll() {
    let g = 0;
    while (S.pending.length && g++ < 30) { const p = S.pending[0]; if (p.kind === 'legend') pickLegend(p); else pickItem(p); }
  }

  // ------------------------------------------------------------------ shop
  const actOf = () => (curRound() || {}).act || 1;
  function reserve() { const r = S.round; if (OPT.hoard && r >= (OPT.hoardFrom || 3)) return OPT.hoard; // balance lab: always keep this much (hoarding)
    if (P.bossAll > 0.5 && ((curRound() || {}).type === 'boss')) return 0; return r >= P.rollRound ? 0 : r >= P.econStart ? Math.round(P.keepGold) : 0; }
  function targetRank() {
    let t = 1; for (let r = 2; r <= K.rankMax; r++) if (S.round >= P['rk' + r]) t = r; else break;
    return t;
  }
  function wantRank() {
    const c = rankCost(); if (c == null || S.gold < c) return false;
    if (OPT.maxRank && S.rank >= OPT.maxRank && !(OPT.maxRankUntil && S.round >= OPT.maxRankUntil)) return false; // maxRankUntil: the cap lifts at that round
    if (OPT.minRank && S.rank < OPT.minRank) return true;
    const keep = P.rankReserve > 0.5 ? reserve() : 0;
    if (S.rank < targetRank() && S.gold - c >= keep) return true;
    return S.gold >= c + P.rankSurplus;
  }
  function gw() { return P.wPrice * (1 - P.goldDecay * Math.min(1, (S.round - 1) / Math.max(1, K.rounds - 1))); }
  function buyOptions() {
    const units = myUnits(), n = boardSize(), base = TV(units, n), out = [], wp = gw();
    S.shop.forEach((o, i) => {
      if (!o || !allowed(o.id)) return;
      const price = shopPrice(o), cb = canBuy(i);
      if (cb.ok) { const a = afterBuy(units, o); out.push({ i, d: TV(a.units, n) - base + mergeItems(a.ev) - wp * price, cost: price, sell: null }); return; }
      if (OPT.noSell || (cb.why !== 'Bench full' && cb.why !== 'Not enough gold')) return;
      const cands = units.filter(u => u.bench && u.id !== o.id).sort((a, b) => unitScore(a) - unitScore(b)).slice(0, 2);
      for (const s of cands) {
        const su = S.units.find(x => x.uid === s.uid); const sv = sellValue(su);
        if (S.gold + sv < price) continue;
        const a = afterBuy(units.filter(u => u !== s), o);
        out.push({ i, d: TV(a.units, n) - base + mergeItems(a.ev) - wp * (price - sv) - P.sellMargin, cost: price - sv, sell: s.uid });
      }
    });
    return out.sort((a, b) => b.d - a.d);
  }
  function doBuy(o) { if (o.sell != null) { sell(o.sell); STAT.sells++; } return buy(o.i); }
  function lookBuy(o) { return onCopy(() => { doBuy(o); resolveQuiet(); quickArrange(); return evalArr(OPT.lookK).score; }); }
  function resolveQuiet() { let g = 0; while (S.pending.length && g++ < 30) resolvePending(null); }
  function rrc() { return typeof rerollCost === 'function' ? rerollCost() : K.REROLL; }
  function rerollBudget() { const a = actOf(); return Math.round(P['rr' + Math.min(3, a)]); }
  function shopPhase() {
    resolveAll();
    let rolls = 0, ties = 0, guard = 0; const bad = new Set();
    while (guard++ < 80) {
      resolveAll();
      if (P.rankFirst > 0.5 && wantRank()) { rankUp(); STAT.ranks.push(S.round); continue; }
      const opts = buyOptions().filter(o => !bad.has(o.i)); const res = reserve();
      if (OPT.trace) STAT.trace.push(`r${S.round} g${S.gold} rk${S.rank} res${res} | ${S.shop.map(o => o ? o.id + (o.level > 1 ? '*' : '') + H(o.id).tier : '-').join(' ')} | ${opts.map(o => o.i + ':' + o.d.toFixed(2) + (o.sell ? 's' : '')).join(' ')} | own ${S.units.map(u => u.id + u.level).join(' ')}`);
      const ok = o => o.d > P.buyThr && (S.gold - o.cost >= res || o.d > P.buyThr + P.splurge);
      let pick = opts.find(ok);
      if (pick && !OPT.noLook && ties < 3 && P.tieEps > 0.01 && S.enemy) {
        const alt = opts.find(o => o !== pick && o.i !== pick.i && ok(o));
        if (alt && pick.d - alt.d < P.tieEps) {
          ties++; STAT.ties++;
          const a = pick.d + P.lookW * lookBuy(pick), b = alt.d + P.lookW * lookBuy(alt);
          if (b > a) pick = alt;
        }
      }
      if (pick) { if (doBuy(pick)) { STAT.buys++; continue; } bad.add(pick.i); continue; }
      if (P.rankFirst <= 0.5 && wantRank()) { rankUp(); STAT.ranks.push(S.round); continue; }
      const best = opts.length ? opts[0].d : -Infinity;
      if (!OPT.noReroll && best < P.rerollThr) {
        if (S.freeRerolls > 0) { reroll(); continue; }
        if ((rolls < rerollBudget() || S.gold - rrc() >= res + P.rollExcess) && S.gold - rrc() >= res) { reroll(); rolls++; continue; }
      }
      break;
    }
    resolveAll();
    sellJunk();
    let best = arrangeBest();
    if (!OPT.noLook && S.enemy && best.p < P.dangerP) best = panic(best);
    return best;
  }
  function sellJunk() {
    if (P.sellJunk >= 1.99 || OPT.noSell) return;
    const n = boardSize();
    for (let k = 0; k < 3; k++) {
      const units = myUnits(); const base = TV(units, n); let pick = null, pv = P.sellJunk;
      units.filter(u => u.bench).forEach(u => { const su = S.units.find(x => x.uid === u.uid); const v = TV(units.filter(x => x !== u), n) - base + gw() * sellValue(su); if (v > pv) { pv = v; pick = u; } });
      if (!pick) break; sell(pick.uid); STAT.sells++;
    }
  }
  // the simulated fight looks bad: spend reserve gold, rank up or reroll, keeping whatever simulates best
  function panic(best) {
    STAT.panics++;
    let rolls = 0;
    for (let it = 0; it < 8; it++) {
      if (best.p >= P.dangerP) break;
      const cands = [];
      S.shop.forEach((o, i) => { if (o && allowed(o.id) && canBuy(i).ok) cands.push({ kind: 'buy', o: { i, sell: null } }); });
      if (rankCost() != null && S.gold >= rankCost() && !(OPT.maxRank && S.rank >= OPT.maxRank && !(OPT.maxRankUntil && S.round >= OPT.maxRankUntil))) cands.push({ kind: 'rank' });
      let top = null;
      const tryC = c => onCopy(() => { if (c.kind === 'rank') rankUp(); else doBuy(c.o); resolveQuiet(); quickArrange(); return evalArr(OPT.lookK).score; });
      if (OPT.pred === 'hybrid' && globalThis.PRED && PRED.ready) {
        // hybrid: the network shortlists the 2 best emergency moves, real practice fights decide (same scale as best.score)
        const ranked = cands.map(c => ({ c, ps: tryC(c) })).sort((x, y) => y.ps - x.ps).slice(0, 2);
        SIMNOW = true; try { for (const r of ranked) { const sc = tryC(r.c); if (!top || sc > top.sc) top = { c: r.c, sc }; } } finally { SIMNOW = false; }
      } else for (const c of cands) {
        const sc = tryC(c);
        if (!top || sc > top.sc) top = { c, sc };
      }
      if (top && top.sc > best.score + 0.03) {
        if (top.c.kind === 'rank') { rankUp(); STAT.ranks.push(S.round); } else { doBuy(top.c.o); STAT.buys++; }
        STAT.panicActs++;
        resolveAll(); best = arrangeBest(); continue;
      }
      if (rolls < Math.round(P.panicRolls) && !OPT.noReroll && (S.freeRerolls > 0 || S.gold >= rrc())) { reroll(); rolls++; STAT.panicActs++; continue; }
      break;
    }
    return best;
  }

  // ------------------------------------------------------------------ events
  function lifeW() { return P.evLife * (1 + P.evLifeCurve * Math.max(0, 6 - S.lives) / 6); }
  function doEvent() {
    const e = S.event; const n = boardSize();
    const base = TV(myUnits(), n);
    if (e.cut) { // The Cut: try every free / premium choice on a copy, keep the best board-for-gold trade
      let pick = null, pv = -Infinity;
      [...e.sub.ids.flatMap(g => [g, g + '+']), 'fight'].forEach(id => {
        const d = onCopy(() => { const g0 = S.gold, l0 = S.lives; eventSub(id); if (!S.event.subDone) return null; return { g: S.gold - g0, l: S.lives - l0, tv: TV(myUnits(), n) - base }; });
        if (!d) return; const v = P.evGold * d.g / 5 + lifeW() * d.l + P.evTV * d.tv; if (v > pv) { pv = v; pick = id; } });
      eventSub(pick); STAT.events.push(pick && pick.endsWith('+') ? 'cut+' : 'cut'); finishEvent(); return; }
    let best = null, bv = -Infinity;
    // option lab: OPT.banEv never picks that event (unless nothing else is offered); OPT.forceEv always picks it when offered
    for (const k of e.opts) {
      if (OPT.banEv && k === OPT.banEv && e.opts.length > 1) continue;
      // a free reroll is worth what a reroll costs (it was ignored, so 'free rerolls' choices were never taken)
      const d = onCopy(() => { const g0 = S.gold, l0 = S.lives, r0 = S.freeRerolls || 0; eventPick(k); // an item pick it opens (Supply Drop, Merchant) is worth its best item, minus the price
        const sb = S.event && S.event.sub, itm = sb && sb.kind === 'trinket' && !OPT.noItems && S.trinkets.length < K.TRINKET_CAP && (!sb.price || S.gold >= sb.price) ? Math.max(0, ...(sb.ids || []).map(t => itemVal(t))) - (sb.price ? P.evGold * sb.price / 5 : 0) : 0;
        return { g: S.gold - g0 + ((S.freeRerolls || 0) - r0) * rrc(), l: S.lives - l0, tv: TV(myUnits(), n) - base, sub: !!sb, item: itm }; });
      let v = (P['ev.' + k] || 0) + P.evGold * d.g / 5 + lifeW() * d.l + P.evTV * d.tv + (d.item || 0);
      if (k === 'supply' && S.trinkets.length >= K.TRINKET_CAP) v -= 1;
      if (OPT.noItems && k === 'supply') v -= 5;
      if (v > bv) { bv = v; best = k; }
    }
    if (OPT.forceEv && e.opts.includes(OPT.forceEv)) best = OPT.forceEv;
    STAT.evLives.push([best, S.lives]);
    if (OPT.trace) STAT.trace.push(`  EVENT r${S.round}: ${e.opts.join('/')} -> ${best} (lives ${S.lives}, gold ${S.gold})`);
    eventPick(best); STAT.events.push(best);
    if (S.event.sub && S.event.sub.kind === 'choice' && !S.event.subDone) { // special events: try each choice on a copy
      let pick = null, pv = -Infinity;
      S.event.sub.ids.forEach(id => {
        const d = onCopy(() => { const g0 = S.gold, l0 = S.lives, c0 = S.curse || 0, r0 = S.freeRerolls || 0, t0 = S.trinkets.slice(); eventSub(id); if (!S.event.subDone || S.event.choice !== id) return null;
          const got = S.trinkets.filter(t => !t0.includes(t)); return { g: S.gold - g0 + ((S.freeRerolls || 0) - r0) * rrc(), l: S.lives - l0, tv: TV(myUnits(), n) - base, curse: (S.curse || 0) - c0, item: got.reduce((a, t) => a + itemVal(t), 0), ins: S.insured ? 1 : 0 }; });
        if (!d) return; const v = P.evGold * d.g / 5 + lifeW() * d.l + P.evTV * d.tv + d.item - 12 * d.curse + 1.5 * d.ins;
        if (v > pv) { pv = v; pick = id; } });
      // OPT.forceChoice 'event:choice' (e.g. 'fanmail:cash') takes that choice whenever it is allowed
      if (OPT.forceChoice) { const [fe, fc] = OPT.forceChoice.split(':'); const c = fe === S.event.picked && (CHOICES[fe] || []).find(x => x.id === fc); if (c && c.ok(S.event)) pick = fc; }
      eventSub(pick); STAT.events.push(S.event.picked + ':' + pick); finishEvent(); return;
    }
    if (S.event.sub && !S.event.subDone) {
      const ids = S.event.sub.ids || [];
      if (ids.length && K.HERO[ids[0]]) {
        const units = myUnits(); let pick = null, pv = -0.3;
        ids.forEach(id => { if (!allowed(id)) return; const a = afterBuy(units, { id, level: 1 }); const v = TV(a.units, n) - base + mergeItems(a.ev); if (v > pv) { pv = v; pick = id; } });
        eventSub(pick);
      } else {
        let pick = null, pv = P.itemGold;
        if (!OPT.noItems && S.trinkets.length < K.TRINKET_CAP) ids.forEach(t => { const v = itemVal(t); if (v > pv) { pv = v; pick = t; } });
        if (pick) STAT.items.push(pick);
        eventSub(pick);
      }
    }
    finishEvent();
  }

  // ------------------------------------------------------------------ whole runs
  function boardInfo() {
    const f = fielded();
    return { n: f.length, cap: boardSize(), tiers: f.map(u => H(u.id).tier), genres: [...new Set(f.map(u => H(u.id).genre))], ids: f.map(u => u.id + ':' + u.level) };
  }
  function playRun(seed, params, opts) {
    LCACHE.clear();
    setParams(params, opts);
    STAT = { sims: 0, partial: 0, panics: 0, panicActs: 0, ties: 0, buys: 0, sells: 0, items: [], legends: [], events: [], evLives: [], ranks: [], trace: [], sandbag: 0 };
    stubUI(); ACTIVE = true; seeded = true; RUNSEED = seed | 0; CTR = {};
    const fights = []; let r5 = null, mythicEver = false, err = null;
    try {
      // seed the stream newRun draws from (rollSpecials: the random-event schedule) from this run's seed; without this
      // it continued from the previous run in the same worker, so a seed did not replay the same game
      rngState = h32(RUNSEED, 97, 0, 0, 0);
      newRun(false);
      let guard = 0, gave = false, gaveRes = false;
      while (!S.over && guard++ < 80) {
        // balance lab: exchange rates. Give gold / lives / free rerolls once at round giveAt (default 4)
        if ((OPT.giveGold || OPT.giveLives || OPT.giveRerolls) && !gaveRes && S.round >= (OPT.giveAt || 4)) { gaveRes = true; S.gold += OPT.giveGold || 0; S.lives += OPT.giveLives || 0; S.freeRerolls = (S.freeRerolls || 0) + (OPT.giveRerolls || 0); }
        // balance lab: give this item at round giveItemAt (default 1), on top of the normal picks
        if (OPT.giveItem && !gave && S.round >= (OPT.giveItemAt || 1)) { gave = true; if (!S.trinkets.includes(OPT.giveItem)) { if (S.trinkets.length >= K.TRINKET_CAP) S.trinkets.shift(); S.trinkets.push(OPT.giveItem); S.tlv = S.tlv || {}; S.tlv[OPT.giveItem] = OPT.giveItemLv || 1; } }
        if (S.event) { doEvent(); continue; }
        const look = shopPhase();
        if (!fielded().length && S.units.length) S.units[0].slot = 'f1';
        // exploit probe (off by default): throw early non-boss fights with a 1-character board to farm the loss payout
        //   sandbag.keep: field this many (default 1), sandbag.best: keep the strongest instead of the weakest (lose-streak strategy)
        const sbN = OPT.sandbag ? (OPT.sandbag.keep || 1) : 0;
        if (OPT.sandbag && curRound().type !== 'boss' && S.round <= OPT.sandbag.until && S.lives > OPT.sandbag.minLives && fielded().length > sbN && S.units.length - sbN <= K.benchSlots.length) {
          const srt = S.units.slice().sort((a, b) => unitScore(a) - unitScore(b)); if (OPT.sandbag.best) srt.reverse();
          const keep = srt.slice(0, sbN), fs = ['f1', 'f0', 'f2'];
          let bi = 0, fi = 0; S.units.forEach(u => { u.slot = keep.includes(u) ? fs[fi++] : K.benchSlots[bi++]; }); STAT.sandbag++;
        }
        if (S.rank >= K.rankMax && r5 == null) r5 = S.round;
        // balance lab: random placement (how much does positioning matter?)
        if (OPT.randomPos) { const sl = ['f0', 'f1', 'f2', 'b0', 'b1', 'b2']; for (let i = sl.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [sl[i], sl[j]] = [sl[j], sl[i]]; } fielded().forEach((u, i) => { u.slot = sl[i]; }); }
        const bi = boardInfo(); if (bi.tiers.includes(K.maxTier)) mythicEver = true;
        // comparison mode (globalThis.__tlForce): log the real fight in the game's run-log format, like a person's run
        if (globalThis.__tlForce && typeof tlFight === 'function') tlFight();
        startBattle(true); let g = 0; while (!B.done && g++ < 6000) step(K.DT);
        const t = B.t; const res = settle();
        if (globalThis.__tlForce && typeof tlRes === 'function') tlRes(res.win);
        if (OPT.trace) STAT.trace.push(`  FIGHT r${S.round} vs ${S.enemy ? S.enemy.title : '?'}: ${res.win ? 'WIN' : 'LOSS'} (sim said ${look && look.p != null ? look.p : '-'}) board ${bi.ids.join(' ')} [${bi.n}/${bi.cap}] lives ${S.lives} gold ${S.gold} items ${S.trinkets.join(',')} leg ${S.legend || '-'}`);
        fights.push({ r: S.round, win: !!res.win, boss: !!res.boss, n: bi.n, cap: bi.cap, p: look && look.p != null ? +look.p.toFixed(2) : null, t: +t.toFixed(1), gold: S.gold });
        advanceAfterFight(res);
      }
      if (globalThis.__tlForce && typeof tlEnd === 'function') tlEnd(false);
    } catch (e) { err = e.message + ' ' + (e.stack || '').split('\n')[1]; }
    finally { ACTIVE = false; seeded = false; unstubUI(); }
    return summarize(fights, r5, mythicEver, err);
  }
  function summarize(fights, r5, mythicEver, err) {
    const bi = boardInfo(); const st = S.stats || {};
    return {
      err, win: S.result === 'win', lives: S.lives, round: S.round, wins: S.wins, rank: S.rank, r5,
      mythic: bi.tiers.includes(K.maxTier), mythicEver, board: bi.n, cap: bi.cap, fullFrac: fights.length ? fights.filter(f => f.n >= f.cap).length / fights.length : 0,
      genres: bi.genres.length, genreList: bi.genres, low: bi.n ? bi.tiers.filter(t => t <= 2).length / bi.n : 0, avgTier: bi.n ? bi.tiers.reduce((a, b) => a + b, 0) / bi.n : 0,
      ids: bi.ids, items: S.trinkets.slice(), legend: S.legend, gold: S.gold, merges: st.merges || 0, rerolls: st.rerolls || 0,
      spend: st.spend || null, lost: fights.filter(f => !f.win).map(f => f.r), fights, stat: STAT,
    };
  }
  function playMany(seeds, params, opts) { return seeds.map(s => playRun(s, params, opts)); }

  // the existing greedy bots (lean/sim/bots.js), on the same seeded streams
  function greedyRun(seed, pol) {
    if (!window.BOT) return { err: 'bots.js not loaded' };
    STAT = { sims: 0, items: [], legends: [], events: [], ranks: [] };
    stubUI(); ACTIVE = true; seeded = true; RUNSEED = seed | 0; CTR = {};
    let log = null, err = null;
    try { log = BOT.run('greedy', false, null, null, pol || 'balanced'); } catch (e) { err = e.message; }
    finally { ACTIVE = false; seeded = false; unstubUI(); }
    if (!log) return { err };
    const fights = log.fights.map(f => ({ r: f.round, win: !!f.win, boss: !!f.boss, n: f.board, cap: null }));
    const s = summarize(fights, log.end.r5, false, err);
    s.mythicEver = null; s.fullFrac = null;
    return s;
  }
  function greedyMany(seeds, pol) { return seeds.map(s => greedyRun(s, pol)); }

  // stress: scale enemy strength (multiplies TUNE.actMul, if the build has it) - for headroom checks only
  let tuneBak = null;
  function stress(mult) {
    if (!K.TUNE || !Array.isArray(K.TUNE.actMul)) return false;
    if (!tuneBak) tuneBak = K.TUNE.actMul.slice();
    for (let i = 0; i < tuneBak.length; i++) K.TUNE.actMul[i] = tuneBak[i] * mult;
    return true;
  }

  return { init, spec, playRun, playMany, greedyRun, greedyMany, stress, K, _h32: h32 };
})();

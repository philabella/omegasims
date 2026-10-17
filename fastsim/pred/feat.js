// Battle predictor, in-page part (loaded after the game, like smartbot core.js). PRED.feat() turns the battle that
// startBattle(true) has just set up (B at t=0, before any step) into a fixed-length number vector; PRED.predict(x)
// runs the small trained network (PRED.load(net)) and returns { p: win chance, s: the bot's fight score 0..1 }.
// Read-only: it never changes S, B or any random stream.
(function () {
  const HIDS = HEROES.map(h => h[0]), HIX = Object.fromEntries(HIDS.map((id, i) => [id, i]));
  const FKEYS = Object.values(ENEMIES).map(r => r[0]), FIX = Object.fromEntries(FKEYS.map((k, i) => [k, i]));
  const GK = Object.keys(GENRES), TK = Object.keys(TRAITS), XK = CROSSOVERS_ALL.map(x => x.id), LK = Object.keys(LEGENDS), IK = Object.keys(TRINKETS);
  const NS = 22, NR = 4, NC = 6;
  const OFF = {}; let o = 0;
  [['sideA', NS], ['sideE', NS], ['ratio', NR], ['colA', 24], ['colE', 24], ['heroA', HIDS.length], ['heroE', HIDS.length], ['foeE', FKEYS.length + 1], ['genre', GK.length], ['trait', TK.length],
   ['xover', XK.length], ['legend', LK.length], ['item', IK.length], ['ctx', NC]].forEach(([k, n]) => { OFF[k] = o; o += n; });
  const F = o;
  const lg = Math.log1p;
  function stats(us) {
    let n = 0, crowd = 0, bodies = 0, hp = 0, dps = 0, armW = 0, fHp = 0, bHp = 0, fD = 0, bD = 0, rD = 0, crit = 0, dodge = 0, regen = 0, ls = 0, mana = 0, spell = 0, wide = 0, boss = 0, mxH = 0, mxD = 0, tier = 0;
    for (const u of us) {
      const b = u.crowd ? (u.maxBodies || 1) : 1, h = (u.maxHp || 0) + (u.shield || 0);
      const d = (u.atk || 0) * b * (u.dmgMult || 1) * (u.aspd || 1) / (u.interval || 1) * (1 + (u.crit || 0));
      n++; if (u.crowd) crowd++; bodies += b; hp += h; dps += d; armW += (u.arm || 0) * h;
      if (u.row === 'front') { fHp += h; fD += d; } else { bHp += h; bD += d; }
      if (u.range && u.range !== 'melee') rD += d;
      crit += u.crit || 0; dodge += u.dodge || 0; regen += (u.regen || 0) * h; ls += u.ls || 0;
      mana += u.manaMax ? (u.mana || 0) / u.manaMax : 0; spell += u.spellMult || 1; if (u.wide) wide++; if (u.boss) boss++;
      mxH = Math.max(mxH, h); mxD = Math.max(mxD, d); tier += u.tier || 1;
    }
    const k = Math.max(1, n);
    return { hp, dps, fHp, fD, v: [n / 8, crowd / 4, bodies / 16, lg(hp), lg(dps), armW / Math.max(1, hp) / 20, lg(fHp), lg(bHp), lg(fD), lg(bD), dps ? rD / dps : 0,
      crit / k, dodge / k, regen / Math.max(1, hp) * 100, ls / k, mana / k, spell / k, wide / 4, boss / 2, lg(mxH), lg(mxD), tier / k / 5] };
  }
  function feat() {
    const x = new Float32Array(F);
    const A = B.units.filter(u => u.side === 'A' && !u.summon), E = B.units.filter(u => u.side === 'E' && !u.summon);
    const a = stats(A), e = stats(E);
    a.v.forEach((v, i) => { x[OFF.sideA + i] = v; }); e.v.forEach((v, i) => { x[OFF.sideE + i] = v; });
    const ttkE = e.hp / Math.max(1e-3, a.dps), ttkA = a.hp / Math.max(1e-3, e.dps);
    x[OFF.ratio] = Math.log((a.hp + 1) / (e.hp + 1)); x[OFF.ratio + 1] = Math.log((a.dps + 1) / (e.dps + 1));
    x[OFF.ratio + 2] = Math.log((ttkA + 1e-3) / (ttkE + 1e-3)); x[OFF.ratio + 3] = Math.log((a.fHp + 1) / (e.fD + 1)) - Math.log((e.fHp + 1) / (a.fD + 1));
    // v2: who stands where. Per column (0-3) and row: HP, damage per second, ranged; arrangements (mirror, tank front)
    // differ only here, and melee characters go for their own column first
    const cols = (us, off) => { for (const u of us) { const c = Math.max(0, Math.min(3, u.col | 0)), rw = u.row === 'front' ? 0 : 1, i = off + (rw * 4 + c) * 3;
      const b = u.crowd ? (u.maxBodies || 1) : 1; x[i] += lg((u.maxHp || 0) + (u.shield || 0)); x[i + 1] += lg((u.atk || 0) * b * (u.dmgMult || 1) * (u.aspd || 1) / (u.interval || 1));
      x[i + 2] = u.range && u.range !== 'melee' ? 1 : 0; } };
    cols(A, OFF.colA); cols(E, OFF.colE);
    for (const u of A) if (HIX[u.id] != null) x[OFF.heroA + HIX[u.id]] += u.level || 1;
    for (const u of E) { if (u.id && HIX[u.id] != null) x[OFF.heroE + HIX[u.id]] += u.level || 1; else x[OFF.foeE + (FIX[u.key] != null ? FIX[u.key] : FKEYS.length)] += 1; }
    const syn = B.syn || {};
    GK.forEach((g, i) => { x[OFF.genre + i] = ((syn.G && syn.G[g]) || 0) / 3; });
    TK.forEach((t, i) => { x[OFF.trait + i] = ((syn.T && syn.T[t]) || 0) / 2; });
    XK.forEach((id, i) => { x[OFF.xover + i] = syn.X && syn.X[id] ? 1 : 0; });
    if (S.legend && LK.indexOf(S.legend) >= 0) x[OFF.legend + LK.indexOf(S.legend)] = 1;
    IK.forEach((t, i) => { x[OFF.item + i] = typeof ilv === 'function' ? ilv(t) / 3 : ((S.trinkets || []).includes(t) ? 1 : 0); });
    const r = S.round || 1, cr = (typeof curRound === 'function' && curRound()) || {};
    x[OFF.ctx] = r / 36; x[OFF.ctx + 1] = (cr.act || 1) / 4; x[OFF.ctx + 2] = (S.lv | 0) / 20;
    x[OFF.ctx + 3] = B.artEvery ? 1 / B.artEvery : 0; x[OFF.ctx + 4] = (B.artMult || 1) / 3; x[OFF.ctx + 5] = B.broodEvery ? 1 / B.broodEvery : 0;
    return x;
  }
  // a small fully-connected network: x -> standardize -> relu layers -> 2 sigmoid outputs [win chance, fight score]
  let NET = null;
  function load(net) { NET = { mu: Float32Array.from(net.mu), sd: Float32Array.from(net.sd), L: net.layers.map(l => ({ W: Float32Array.from(l.W), b: Float32Array.from(l.b), n: l.b.length, m: l.W.length / l.b.length })) }; return true; }
  function predict(x) {
    let h = new Float32Array(F); for (let i = 0; i < F; i++) h[i] = (x[i] - NET.mu[i]) / NET.sd[i];
    NET.L.forEach((l, li) => { const y = new Float32Array(l.n); for (let j = 0; j < l.n; j++) { let s = l.b[j]; const r = j * l.m; for (let i = 0; i < l.m; i++) s += l.W[r + i] * h[i]; y[j] = li < NET.L.length - 1 ? (s > 0 ? s : 0) : 1 / (1 + Math.exp(-s)); } h = y; });
    return { p: h[0], s: h[1] };
  }
  globalThis.PRED = { F, OFF, feat, load, predict, get ready() { return !!NET; }, log: [] };
})();

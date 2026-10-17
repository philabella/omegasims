// fastsim recorder: an Engine with bots.js loaded plus hooks that record what bots.js's own log leaves out.
'use strict';
const { Engine, DEFAULT_BOTS } = require('./engine');

// ------------------------------------------------------------------ in-page recorder (hooks, no game changes)
// Wraps newRun/rankUp/settle through window[...] (as a page script would) to record what bots.js's own log
// leaves out: rank-up rounds, the enemy template of every fight, the gold split. It draws no random numbers.
const HOOKS = String.raw`(function(){
  const rec = { on: false, ranks: [], fights: [], startGold: null };
  const wrap = (name, before, after) => { const f = window[name]; if (typeof f !== 'function') return;
    window[name] = function(){ const pre = rec.on && before ? before.apply(this, arguments) : null; const r = f.apply(this, arguments); if (rec.on && after) after(r, pre, arguments); return r; }; };
  wrap('newRun', null, () => { rec.startGold = S.gold; });
  wrap('rankUp', null, r => { if (r) rec.ranks.push([S.round, S.rank]); });
  wrap('settle', () => { const ev = curRound(), f = fielded();
      return { round: S.round, act: ev.act, boss: ev.type === 'boss', t: B ? +B.t.toFixed(2) : null, n: f.length, cap: boardSize(), rank: S.rank,
               board: f.map(u => u.id + ':' + u.level).join(' '), tpl: S.enemy ? S.enemy.tpl : '', title: S.enemy ? S.enemy.title : '', tries: S.bossTries | 0,
               livesBefore: S.lives, goldBefore: S.gold }; },
    (res, f) => { f.win = !!res.win; f.goldGain = res.gold; f.livesLost = res.lives; f.livesAfter = S.lives; f.goldAfter = S.gold; rec.fights.push(f); });
  globalThis.__fastsim = { rec, run(seed, kind, story, focus, leg, pol) {
    rec.on = true; rec.ranks = []; rec.fights = []; rec.startGold = null;
    seeded = true; rngState = seed | 0; __seedMath(__hseed('math', seed | 0));
    let log;
    try { log = BOT.run(kind, story, focus, leg, pol); }
    catch (e) { log = { err: e.message + ' ' + String(e.stack || '').split('\n')[1] }; }
    rec.on = false;
    let x = null;
    try { const st = runStats(); const syn = activeSyn(fielded());
      x = { startGold: rec.startGold, ranks: rec.ranks.slice(), fights: rec.fights.slice(),
            stats: { gold: st.gold, sold: st.sold || 0, spend: Object.assign({ buy: 0, reroll: 0, rank: 0 }, st.spend), rerolls: st.rerolls || 0, interest: st.int || 0, streak: st.streak || 0, merges: st.merges, fights: st.fights, won: st.won, lost: st.lost },
            items: S.trinkets.slice(), legend: S.legend, goldLeft: S.gold, lives: S.lives, round: S.round, result: S.result || null, rank: S.rank,
            cross: Object.keys(syn.X).filter(k => syn.X[k]) };
    } catch (e) { x = { err: e.message }; }
    return { seed: seed | 0, log, x };
  } };
})();`;

function makeEngine(cfg) {
  const eng = new Engine({ build: cfg.build, scripts: [cfg.bots || DEFAULT_BOTS], tune: cfg.tune });
  eng.ev(HOOKS);
  return eng;
}
function runSeeds(eng, seeds, cfg) {
  const run = eng.ctx.__fastsim.run;
  return seeds.map(s => run(s, cfg.kind, cfg.story, cfg.focus || null, cfg.legend || null, cfg.pol));
}

module.exports = { HOOKS, makeEngine, runSeeds };

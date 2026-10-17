// Rival policies as numbers, so they can be trained (rival-train.js) and stored in the champion pool.
// MKPOL is game code: the same source runs in the trainer (injected into the build) and in the game (the v19.63
// patch bakes it in), so a pool entry plays identically in both. A policy x has rank gaps g2..g7 (the round
// a rank becomes the target = 1 + running sum of gaps), keep, tierW, ownW, econ and the style's own fields.
'use strict';
const MKPOL = String.raw`function rvMkPol(x){let t=1;const th=[2,3,4,5,6,7].map(k=>t+=x['g'+k]);
  const P={target:r=>{for(let k=5;k>=0;k--)if(r>=th[k])return k+2;return 1;},keep:x.keep,tierW:x.tierW,ownW:x.ownW,
    econ:x.econUntil?(r=>r>=x.econUntil?0:x.econ):x.econ};
  ['lateTierW','rollUntil','rollTier','div','minTier','maxTier','bench','ev'].forEach(k=>{if(x[k]!=null)P[k]=x[k];});return P;}`;

// trainable ranges per style (name: [lo, hi]); FIXED fields are part of the style and never change.
// Ranges keep each rival's Codex description true (Penny banks, Duke spends everything, Goldie skips Commons...).
const BASE = { g2: [0, 8], g3: [0, 8], g4: [0, 8], g5: [0, 8], g6: [0, 8], g7: [0, 8], keep: [0, 20], tierW: [0, 8], ownW: [0, 20], econ: [0, 60] };
const STYLES = {
  penny: { spec: { econ: [35, 60], econUntil: [10, 26] }, fixed: { ev: ['payday', 'supply', 'recruit', 'promotion', 'reinforce', 'deal'] } },
  rex: { spec: { ownW: [10, 20], keep: [0, 6], econ: [0, 10], lateTierW: [1, 8], rollUntil: [10, 16] }, fixed: { rollTier: 2 } }, // rolls hard to round 10+
  ivy: { spec: { div: [3, 10] }, fixed: {} },
  duke: { spec: { keep: null, econ: null }, fixed: { keep: 0, econ: 0 } },
  goldie: { spec: { tierW: [4, 10], econ: [0, 30] }, fixed: { minTier: 3 } },
  sal: { spec: { ownW: [10, 20] }, fixed: { maxTier: 2 } },
  hugo: { spec: {}, fixed: { bench: true } },
  ace: { spec: {}, fixed: {} },
};
// the hand-made v19.55 policies written in these terms (rank gaps from the RIVALS table), the starting points
const HAND = {
  penny: { g2: 1, g3: 2, g4: 3, g5: 3, g6: 4, g7: 3, keep: 6, tierW: 2, ownW: 8, econ: 50, econUntil: 15 },
  rex: { g2: 1, g3: 1, g4: 7, g5: 2, g6: 2, g7: 2, keep: 0, tierW: 1, lateTierW: 5, ownW: 14, econ: 0, rollUntil: 10 },
  ivy: { g2: 1, g3: 2, g4: 3, g5: 3, g6: 4, g7: 3, keep: 6, tierW: 2, ownW: 6, econ: 20, div: 6 },
  duke: { g2: 1, g3: 1, g4: 3, g5: 3, g6: 3, g7: 3, tierW: 2, ownW: 8 },
  goldie: { g2: 1, g3: 1, g4: 2, g5: 3, g6: 3, g7: 3, keep: 0, tierW: 6, ownW: 6, econ: 0 },
  sal: { g2: 1, g3: 2, g4: 3, g5: 3, g6: 4, g7: 3, keep: 6, tierW: 1, ownW: 14, econ: 20 },
  hugo: { g2: 1, g3: 2, g4: 3, g5: 3, g6: 4, g7: 3, keep: 2, tierW: 2, ownW: 10, econ: 10 },
  ace: { g2: 1, g3: 2, g4: 3, g5: 3, g6: 4, g7: 3, keep: 6, tierW: 2, ownW: 8, econ: 20 },
};
function specOf(style) {
  const s = Object.assign({}, BASE, STYLES[style].spec);
  return Object.entries(s).filter(([, r]) => r).map(([name, [lo, hi]]) => ({ name, lo, hi }));
}
const toZ = (spec, x) => spec.map(p => Math.min(1, Math.max(0, ((x[p.name] != null ? x[p.name] : (p.lo + p.hi) / 2) - p.lo) / (p.hi - p.lo))));
const toX = (style, spec, z) => Object.assign(Object.fromEntries(spec.map((p, i) => [p.name, +(p.lo + Math.min(1, Math.max(0, z[i])) * (p.hi - p.lo)).toFixed(3)])), STYLES[style].fixed);
module.exports = { MKPOL, STYLES, HAND, specOf, toZ, toX };

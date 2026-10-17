# AI roadmap Phases 0 and 1: the game API and the battle predictor (2026-10-16, v19.64, Game Level 10)

## Phase 0: `fastsim/env.js` (the game as a step-by-step environment)

`reset(seed)`, `legal()`, `step(action)`, `snapshot()` / `restore()`, `encode()` (328 numbers) and a decision log in the
game's own run-log codes (b s r t e c l i, plus q lock, p:id:slot place, f:win|loss fight), so bot and human runs
share one format. Event, item and Legendary picks offer exactly what the game's screens offer.
Checks (`node env-test.js <build> 30 <level>`, Levels 10 and 0): random legal play never errors (buys, sells,
rerolls, trains, placements, events, picks, fights), a seed + the same choices replays identically, and a snapshot
branches back to exactly the same game.

## Phase 1: the battle predictor (`feat.js`, `gen.js`, `train.py`, `ab.js`, `net.json`)

- **What it is:** a small network (395 inputs -> 128 -> 64 -> 2) that reads a fight at its first moment (both
  sides' units with their real stats after every bonus, who stands in which column and row, genre / trait tiers,
  crossovers, Legendary, items, the act) and predicts the win chance and the expert's fight score. Plain JS
  inference (`PRED.predict`), no libraries; training is numpy only (~40 s).
- **Data:** the expert bot records every practice fight of its lookahead (`gen.js`, `OPT.logLook`): 1,800 runs ->
  758,030 fights in ~10 min; hold-out = 150 other runs (62,876 fights).
- **Accuracy on the hold-out (v2):** win/loss right 93.3% (always guessing "win" scores 78.4%), ranking (AUC) 0.979,
  fight-score correlation 0.914. v1 without column features: 92.8%, 0.972, 0.890 (it could not tell a board from
  its mirror image, and choosing arrangements is half of what the lookahead does).
- **Plugged into the expert** (`core.js`: `opts.pred = true` = network only; `opts.pred = 'hybrid'` = the network
  shortlists the top `predTop` boards x arrangements and the 2 best emergency buys, real practice fights decide).
  Same 600 runs (two seed sets of 300, `ab.js`):

| Mode | Wins (abcheck / abcheck2) | All 600 | Time per run (one CPU) | Speed |
|---|---|---|---|---|
| Real practice fights (today) | 70.0 / 77.7 | 73.9% | ~1,300 ms | 1x |
| Hybrid, shortlist 5 | 72.3 / 72.0 | 72.2% | ~935 ms | 1.4x |
| Hybrid, shortlist 3 | 68.0 / 71.0 | 69.5% | ~790 ms | 1.6x |
| Network only | 63.7 / 65.0 | 64.4% | ~300 ms | 4.3x |

- A first hybrid lost ~7 points on the second seed set: its emergency buys compared a predicted score against a
  simulated one (two different scales). Fixed: the network shortlists, real fights decide, on one scale.
- **Reading it:** for the expert playtester the predictor buys speed at a price: hybrid-5 is within noise
  (-1.7 points on 600 runs) at 1.4x; the network alone is 4.3x faster but ~10 points weaker. Most of the network-only
  time left is the real fights and setting each fight up, not the network. Where it pays off fully is where real
  practice fights are unaffordable: rivals on phones (Phase 2, no simulation possible at all today) and searching
  many moves ahead (Phase 3).
- Next accuracy levers: more data from varied bots (not only the expert's own candidates), a per-slot unit
  encoding instead of column sums, and training on the score of more than 2 fights per board (the labels are noisy).

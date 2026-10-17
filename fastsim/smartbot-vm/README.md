# smartbot-vm: the smartbot on the fastsim engine

This is a copy of `playtester/smartbot`. Pass `--engine vm` (or set `SB_ENGINE=vm`) to any command, and every "page"
becomes a worker thread running the fastsim vm engine (`../engine.js`) instead of a Chromium renderer:

```bash
node evolve.js --engine vm --minutes 30 --build ../../lean/tropebrawl-v8-published.html
node report.js --engine vm --runs 200 --baselines --build ../../lean/tropebrawl-v8-published.html
node trace.js  --engine vm --seed 3 --build ../../lean/tropebrawl-v8-candidate.html --policy ../../playtester/smartbot/runs/build-61a2fa7800/champion.json
```

- Changed: `lib.js` (`launch`/`openPage` pick the engine; Playwright is loaded only for Chromium). Added: `vmpage.js`.
  `core.js`, `evolve.js`, `report.js` and `trace.js` are byte-identical to the original.
- Same results: the decision trace of `trace.js --seed 3` is identical on both engines (164 lines), and
  `../parity.js exact --smart 4` replays the champion's runs identically, including every lookahead simulation.
- Speed per worker is about 0.7x Chromium's on this lookahead-heavy bot (Chromium's newer V8 is faster on it). The
  vm engine needs no browser, starts instantly, and uses about 40 MB per worker instead of about 200 MB per renderer.
  `evolve.js` still caps `--workers` at 2 (the CPU budget on this machine); raise that cap in evolve.js/report.js if
  more CPUs are free.
- Runs are stored in `smartbot-vm/runs/<tag>/`. To continue from the Chromium champions, pass
  `--from ../../playtester/smartbot/runs/build-<hash>`.

- `--algo cma` (v19.62): sep-CMA-ES (`cma.js`) instead of the (mu+lambda) ES, same champion / Hall-of-Fame rules;
  `--sigma0` sets the start step (default 0.08). A/B on v19.62: the ES won (balance/v19/ab-cma/README.md), so it stays
  the default.

Everything below is the original README.

---

# smartbot: a self-improving Tropebrawl playtester

smartbot plays whole Tropebrawl runs headless in Chromium. It drives the game's own functions
(`newRun`, `buy`, `reroll`, `rankUp`, `sell`, `eventPick`/`eventSub`/`finishEvent`, `startBattle`+`step`,
`settle`, `advanceAfterFight`, `resolvePending`) and reads all numbers from the page (`HERO`, `TIERM`, `LV`,
`RANK`, `PRICE`, `GENRES`, `TRAITS`, `CROSSOVERS`, `TRINKETS`, `LEGENDS`, `EVENTS`, `TUNE`...). Point it at a
new build and it keeps working. An evolution strategy keeps tuning its policy to win more.

The build folder is never written to. The wrapped page copy lives in `.cache/`, and results go in `runs/<tag>/`.

## Commands

```bash
cd smartbot

# evolve (resumes automatically if runs/build-<hash>/state.json exists). Uses at most 2 renderer processes.
node evolve.js --minutes 30                       # defaults: --seeds 20 --lambda 10 --mu 4 --epoch 3 --val 64
node evolve.js --minutes 30 --build ../../lean/tropebrawl-v8.html --from runs/build-<oldhash>   # new build, start from the old champions

# report: champion on 200 seeded runs, the old greedy bots on the SAME seeds, ablations, other strategies, headroom
node report.js --runs 200 --baselines
node report.js --runs 200 --baselines --ablate --hof --archive --stress 1.25,1.5 --quick

# watch one champion run decision by decision
node trace.js --seed 3
```

Files written under `runs/<tag>/` (`tag` defaults to `build-<sha1 of the build>`):
`champion.json` (the policy and its validation score), `hof.json` (top past champions), `archive.json` (best policy
per behaviour niche), `state.json` (population, used to resume), `history.json` + `log.txt` (one line per generation),
`report.json` (from report.js).

## How it decides

The policy is a JSON dict of 84 named numbers on the v7 build; `spec()` in `core.js` lists each one with a description. The per-item, per-Legendary, per-event and per-genre entries are generated from whatever the build defines.
- **Shop buys and sells.** A heuristic team value scores the best board you could field: power (rarity x level),
  rarity, active genre and trait tiers, being one character short of a tier, crossovers, board fit (front line
  versus overflowing rows), pairs toward a merge, bench power, and a per-genre preference. Every shop card is scored
  as value(after buy, with merges simulated) minus value(now), plus a bonus when a merge would pay an item, minus a
  gold cost that shrinks as the run goes on. The bot buys above a threshold while respecting a gold reserve (or
  ignores the reserve for big gains). When the bench is full or gold is short, it considers selling a weak bench
  character first.
- **Rerolls.** A per-act budget, used only when nothing worth buying is on offer. Rerolls are unlimited while gold
  stays well above the reserve, and free rerolls are always used.
- **Shop rank.** It ranks up on a schedule (round by which to reach rank 2..5, where "never" is allowed), or whenever
  gold exceeds cost plus a surplus. A separate number decides whether rank-ups respect the reserve.
- **Items, Legendaries, events.** Per-id preference weights are added to a simulated next-fight gain. Events also
  get gold, life and team-value deltas, measured by applying the event to a copy of the state.
- **Lookahead.** Before every fight the enemy line-up is known (`S.enemy`). The bot builds candidate boards: its
  heuristic pick, the top-power pick, a swap with the best bench character, and one slot left empty. Each is
  arranged six ways: standard, mirrored, tank-front, "flex" (back-row-capable melee moved back), and mirrors of the
  last two. It simulates the actual next fight 2 times per candidate on a deep copy of `S`, then restores `S`, `B`
  and the RNG. `settle()` is never called during lookahead. If the best simulated win chance is below `dangerP`,
  it goes all in: it tries every affordable buy and the rank-up on a copy, keeps whichever simulates best, and
  rerolls a few times if nothing helps. Close shop decisions are also settled by simulation.
- **Seeding (common random numbers).** Every random source gets its own stream, seeded from (run seed, round,
  attempt, call number): shop rolls, the enemy pick, the fight, item offers, Legendary offers, event offers,
  recruit offers and rank previews. Two policies playing seed 123 therefore see the same first shop, the same
  enemies and comparable fights. Lookahead fights use different seeds from the real fight, so the bot can't peek
  at the real outcome. The old greedy bots run on exactly the same streams (`--baselines`).

## How it improves

`evolve.js` runs a (mu+lambda) evolution strategy with a self-adaptive step size over the policy vector,
normalised to [0,1]:
- Each child changes a sparse subset of numbers, and some children cross over two parents.
- Training seeds change every `--epoch` generations. Within an epoch every candidate plays the same seeds, and
  since play is deterministic, parents' scores are reused. Parents are re-scored when the seeds change.
- **Score per run:** 1 for a win, plus 0.03 x lives left on a win, plus 0.01 x fights won.
- **Champion and Hall of Fame.** The generation's best challenges only if it beat the champion on this epoch's
  seeds. It must then beat the best Hall-of-Fame score on 64 fixed validation seeds, which are never used for
  training. `champion.json` only ever gets better on validation.
- **Diversity.** A MAP-Elites archive keeps the best policy per niche: main genre, whether it reaches rank 5, and
  low versus high rarity board. Parent selection also keeps near-best parents from other niches. `report.js
  --archive` re-scores the niche elites on common seeds.
- To keep it improving, re-run `node evolve.js --minutes N` whenever there is spare CPU (it resumes). On a new build,
  pass `--from` to seed it with the old champions.

## Exploit probes in report.js --ablate

The `--ablate` option runs the champion on the same seeds with one thing taken away each time: lookahead, the
option to leave slots empty, Mythics, everything above Uncommon, shop rank above 2 or 3, items, the Legendary,
rerolls, or all genres but one. There are also two exploit probes: rush to rank 5, and "throw fights", which
fields a single character in early non-boss fights to farm the loss payout. Losing a fight pays +2 gold and a free
reroll, while winning pays +1. Each row answers "does X matter?" with a number. `--stress m` multiplies enemy
strength through `TUNE.actMul` to measure how much harder the game could be before the bots break.

## Balance lab (`balance-lab.js`)

The champion on the SAME seeds under one constraint per config, so every difference is paired with the baseline:
only one genre, each genre pair (+ its crossover), each trait banned, each character banned, each Legendary forced,
each item given. `--stress 1.3` makes enemies stronger so the expert stops winning everything and differences show.

```bash
node balance-lab.js --engine vm --build ../../lean/tropebrawl.html --policy runs/<build>/champion.json --runs 120 --stress 1.3 --out lab-out
node balance-lab.js ... --groups base --configs '[{"key":"x","opts":{"genres":["army","ball"],"giveLeg":"danger"}}]' --seedtag recheck-1
```

Options for configs (also usable as smartbot OPT): `genres`, `ban`, `banTrait`, `giveLeg`, `noLegend`, `giveItem`,
`giveItemLv`, `giveItemAt`, `noItems`, `maxTier`, `maxRank`, `noReroll`, `noLook`. Output: `lab.md` (ranked tables with
delta vs baseline and a paired z), `lab.csv`, `lab.json` (every run). `ladder-ablate.js` compares the expert with weaker
variants (no fight simulator, no rerolls) on one build. First results on v9: `balance/v9/`.

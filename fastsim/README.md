# fastsim: Tropebrawl without a browser

fastsim runs the real game file (`lean/tropebrawl-v8-published.html`, unchanged) in Node's `vm` module. There is no
browser, no animation and no DOM layout. The game's own `<script>` runs as a page script, and bots and harnesses call
the game's own functions (`newRun`, `buy`, `rankUp`, `onAction`, `startBattle`/`step`, `settle` ...). It provides:

- **`sim.js`**: batch bot runs with the `lean/sim/bots.js` policies (the file is loaded unchanged). It prints the same
  summary as `lean/sim/sim.js`, runs reproducibly from seeds, uses worker threads, and writes `runs.csv` and `fights.csv`.
- **`play.js`**: the aiplayer text harness for an AI playtester, run instantly. It uses the same commands, the same view
  (`aiplayer/pageside.js`, loaded unchanged) and the same state files. Fights are fast-forwarded, and a `shell` mode
  runs a whole script of commands.
- **`smartbot-vm/`**: a copy of the smartbot with `--engine vm`, so `evolve.js`, `report.js` and `trace.js` run without
  Chromium.
- **`parity.js` and `bench.js`**: evidence that it plays the same game as Chromium, and how fast it runs.
- **`out/`**: example spreadsheets, 500 seeded runs each of `balanced`, `rarity` and `commons` on v8
  (`v8-<policy>-runs.csv` and `v8-<policy>-fights.csv`, seeds 100000..100499).

Requirements: Node 22.8 or later (uses `vm.constants.DONT_CONTEXTIFY`). Playwright and Chromium are needed only for
`parity.js` and `bench.js`. If the optional native addon `native/libmpow.node` is missing, run `sh native/build.sh`
(it needs gcc and Node's bundled headers).

## Batch runs (`sim.js`)

```bash
node fastsim/sim.js 1000 balanced --workers 2 --csv out/bal-         # out/bal-runs.csv + out/bal-fights.csv
node fastsim/sim.js 500 rarity --seed 1000                           # seeds 1000..1499, exactly reproducible
node fastsim/sim.js 500 commons --tune '{"actMul":[1.8,2.2,1.9]}'     # TUNE overrides, as in sim.js
node fastsim/sim.js 300 balanced --focus undead --legend armydead --heroes
node fastsim/sim.js 200 random                                       # bots.js "random" kind
node fastsim/sim.js 1 balanced --seed 1037 --json one.json           # replay one run from runs.csv
node fastsim/sim.js 500 balanced --build lean/tropebrawl-v9.html     # any build with the same function names
```

The policy is any key of `POLICIES` in bots.js (`balanced fast stay3 stay2 commons rarity reader`) or `random`.
Run `i` plays seed `s+i`. The game's `rand()` runs in its own seeded mode from that seed, and `Math.random` (the bots'
randomness) gets a stream derived from it. So results do not depend on `--workers`, and any run in the CSV can be
replayed alone with `--seed <its seed>`. Without `--seed`, a random base seed is drawn and printed. Other options:
`--seeds a-b|a,b,c`, `--kind greedy|random`, `--bots file`, `--chunk n`, `--story`, `--json file` (raw logs).

The output matches `sim.js`: win %, lives on a win, merges, items, rank, the round where runs were lost, a profile line
and per-round win %/time. `--heroes` (or `HEROES=1`) adds the hero and Legendary tables. One more line gives the
time taken, runs/s, CPU-seconds and the win-rate standard error.

### CSV columns

`runs.csv` has one row per run:

| column | meaning |
|---|---|
| seed, policy, kind, focus, forced_legend | what was played |
| result, round, lives, fights, fights_won | `win`/`lose`, the round reached, lives left, fights played and won |
| merges, rerolls, rank | merges, rerolls (free ones included), final shop rank |
| rank2_round .. rank5_round | the round in which the shop first reached that rank (empty if never) |
| gold_start, gold_earned | starting gold (6); income + fight rewards + event gold (`S.stats.gold`) |
| gold_sold | gold from selling (the game's `sell`) |
| gold_spent_buy, gold_spent_reroll, gold_spent_rank | gold spent on characters, rerolls and rank-ups |
| gold_other | gold the game pays outside its own stats, plus gold bots.js takes itself: a Free Agent with no room pays the card's price (this is the usual +4: the balanced bot often picks Free Agent with a full bench), +3 instead of an item or for keeping a Legendary, +5 from Field Promotion with nobody eligible, and bench overflow that bots.js sells |
| gold_left | gold at the end |
| board_n, board | final board as `id:stars` |
| genres, traits | active synergy tiers, e.g. `undead2,bug1`, `brawler1,mystic1` |
| crossovers | crossovers switched on at the end |
| items_n, items, legendary | items held and the Legendary held |
| mythic_fielded, epic_plus, common_share | a Mythic on the final board; Epic+ count; Common/Uncommon share |
| err | the error message if the run crashed (empty otherwise) |

`fights.csv` has one row per fight: `seed, policy, round, act, boss, boss_retry` (weakened rematches of the final boss),
`win, duration_s, board_n, board_cap, rank, board` (`id:stars` list), `enemy_tpl` (the encounter template, e.g.
`f1:mech b0:sniper b2:auditor`), `enemy_title, lives_before, lives_lost, lives_after, gold_before, gold_gain, gold_after`.
`gold_after` is the gold right after the fight's payout, before the next round's income.

## Instant text play (`play.js`)

This is the same harness as `playtester/aiplayer`. Read its README and JOURNAL.md for the commands and the view. A
command, fight included, takes 0.15-0.2 s on this busy machine (about 0.05 s of CPU; the rest is Node startup). The
Chromium harness needs about 1 s per command and 2 s per fight.

```bash
S="--state fastsim/state/run1.json"
node fastsim/play.js $S new 4242
node fastsim/play.js $S do "buy 0" "buy 3" "move n0 f2" fight
node fastsim/play.js $S pick 1
node fastsim/play.js $S info hero qb
node fastsim/play.js $S odds 30        # ANALYSIS ONLY: replays the next fight 30 times with other seeds on a copy
printf 'buy 0\nreroll\nfight\npick 0\n' | node fastsim/play.js $S shell   # one engine, many commands
node fastsim/play.js verify playtester/aiplayer/runs/<run>.json            # replay an archived run, check identical
node fastsim/play.js $S branch fastsim/runs/<run>.json 9                    # "what if" from round 9
```

State files and archived runs use the aiplayer format, so a run can move between the two harnesses. Finished runs
are archived in `fastsim/runs/`. Two commands are new. `shell` reads commands from stdin and prints the view after each
one. `odds [n]` shows a win chance that a human player cannot see, so treat it as analysis, not as part of a
playtest. `dom`, `buttons` and `click <n>` work from the rendered HTML the fake DOM keeps.

## The smartbot on the fast engine (`smartbot-vm/`)

This is a copy of `playtester/smartbot`. Only `lib.js` changed (about 15 lines), and `vmpage.js` was added: a
page-like object whose `evaluate(fn, arg)` runs in a worker thread that hosts the engine. `core.js`, `evolve.js`,
`report.js` and `trace.js` are byte-identical.

```bash
cd fastsim/smartbot-vm
node evolve.js --engine vm --minutes 30 --build ../../lean/tropebrawl-v8-published.html
node evolve.js --engine vm --minutes 30 --build <new build> --from ../../playtester/smartbot/runs/build-<hash>
node report.js --engine vm --runs 200 --baselines --build ../../lean/tropebrawl-v8-published.html
node trace.js  --engine vm --seed 3                                   # (or SB_ENGINE=vm)
```

Without `--engine vm`, it drives Chromium exactly as the original does. Results go to `smartbot-vm/runs/<tag>/`.

## Ghost teams / Reruns (`ghost.js`, v19.67)

Enemy boards for the game's Rerun fights. `harvest` has the expert play free play, every solo genre and every pair
and records its real board at every normal fight; `calibrate` gives each board a strength multiplier m (the round's
other boards stand in for players: m = the scale where they win half their fights against it, divided by the same
scale for the round's monster fights). `patch_v19_67.py` bakes the boards and their m into the game (GHOSTS).

```
node ghost.js harvest   --build ../balance/v1967-lv10.html --runs 6 --out ghosts-raw.json
node ghost.js calibrate --build ../balance/v1967-lv10.html --in ghosts.json --fights 32 --steps 8 --refn 10 --out ghosts-cal.json
```

## How the engine works (`engine.js`)

- The engine extracts the inline `<script>` from the build and runs it with `vm.runInContext` in a context created with
  `vm.constants.DONT_CONTEXTIFY`. That gives an ordinary global object (`window === globalThis`) with no interceptors, so
  global lookups are as fast as in a page; a classic contextified sandbox is about 4 times slower. Top-level functions
  are `window` properties and top-level `const`/`let` share one global scope. Scripts loaded later (`bots.js`,
  `core.js`, `pageside.js`) therefore see the game exactly as `page.addScriptTag` would, `(0,eval)('S')` works, and
  `window.rankUp = wrapper` overrides the game's function.
- The fake DOM is inert. `#app`, `#sheet`, `#scrim` and `#toast` (parsed from the build's markup) keep the HTML the game
  renders. `#id` lookups of rendered parts (`#insp`) return read-only snapshots, `[data-a]` lists the rendered buttons,
  and their `click()` goes to `onAction`. Timers and `requestAnimationFrame` never fire. `localStorage` is in memory.
  `matchMedia` evaluates width queries against a 1280-pixel window, which matches the aiplayer viewport.
- Two places where Node's V8 (12.4) and Chromium 141's V8 (14.1) compute different answers. Both were measured with
  `parity.js`, and the engine corrects both:
  - **`Array.prototype.sort` call order.** Chromium sorts arrays of 7 or fewer elements with plain binary insertion,
    while Node runs TimSort's run detection first. Results are identical for a consistent comparator, but a random
    comparator (bots.js `random`: `sort(()=>Math.random()-.5)`) consumes a different number of random numbers. The
    engine installs the Chromium order for arrays of 7 or fewer elements and keeps native sort for larger ones (they
    already match).
  - **`Math.pow`.** Chromium's is the system libm `pow`: glibc's `pow` (through Python's `math.pow`) matched it on
    40,027 of 40,027 test cases, and `parity.js` re-checks 20,084 cases on every run. Node's is fdlibm, which is 1 ulp off in about 9% of cases (`0.9**4`). The game scales enemies with
    `Math.pow`. Without the fix, fights and results still matched, but float statistics drifted in the 16th digit.
    `native/libmpow.node`, a 20-line N-API addon, provides libm `pow`. Without it, the engine falls back to Node's
    `pow` and `engine.pow` says so.
- `structuredClone`, which the smartbot's lookahead uses, is implemented in the context for plain game data. It keeps
  shared references.

## Parity: does it play the same game?

`node fastsim/parity.js exact --seeds 1000-1049 --smart 4` plays the same seeded runs in headless Chromium (the build
page plus bots.js, loaded the way `sim.js` does) and in fastsim (the `sim.js` batch path, recorder hooks included):

```
balanced  bots.js log identical 50/50 runs (596 fights) | final game state S byte-identical 50/50
rarity    bots.js log identical 50/50 runs (586 fights) | final game state S byte-identical 50/50
commons   bots.js log identical 50/50 runs (519 fights) | final game state S byte-identical 50/50
random    bots.js log identical 50/50 runs (403 fights) | final game state S byte-identical 50/50
Math.pow (20084 cases): fastsim 20084/20084 identical to Chromium (Node's own pow: 18152/20084)
Array.sort with a random comparator (350 cases): fastsim 350/350 identical (Node's native sort: 231/350)
smartbot champion, lookahead on: identical 4/4 runs (whole result incl. 1394 lookahead sims)
```

On a larger set, `node fastsim/parity.js exact --seeds 2000-2199 --policies
balanced,rarity,commons,random,fast,stay3,reader` gave 1400/1400 runs (15,235 fights) with identical logs and a
byte-identical final state, and the same win counts per policy (126, 120, 1, 0, 105, 19, 108 of 200).

Further checks:

- `node fastsim/parity.js harness --seeds 1-12` plays whole runs through the aiplayer layer: the `pageside.js` view,
  `onAction` and `render` with its RNG-consuming pick sheets. Result: 12/12 runs and 695/695 printed views, picks and
  fight reports identical.
- `node fastsim/play.js verify <run>` on all 3 archived Chromium aiplayer runs (v7) gives identical final state, RNG
  state and fights.
- smartbot `trace.js --seed 3` on the vm engine and on Chromium produces the same 164-line decision trace.
- `node fastsim/parity.js stats --n 600 --workers 1` compares unseeded Chromium (exactly `sim.js`'s loop, native
  `Math.random`) with seeded fastsim, 600 runs each. All differences are within noise:

  | policy | Chromium | fastsim | diff | z | rank c/f | merges c/f | lives on a win c/f |
  |---|---|---|---|---|---|---|---|
  | balanced | 65.3% | 63.2% | -2.2 | -0.78 | 4.95/4.96 | 8.7/8.7 | 5.6/5.7 |
  | rarity | 62.8% | 59.8% | -3.0 | -1.07 | 4.98/4.99 | 7.5/7.5 | 5.5/5.4 |
  | commons | 0.3% | 0.3% | 0.0 | 0.00 | 4.76/4.79 | 7.0/7.0 | 3.5/1.5 (2 wins each) |

## Speed

`node fastsim/bench.js --n 400 --workers 1,2 --smart 3` runs the same policy in Chromium (exactly the `sim.js` loop,
one page) and in fastsim. It reports runs/s and runs per CPU-second; the CPU figure does not depend on machine load.
For Chromium it counts the whole browser process tree. Two samples on this machine, taken while other jobs held the
4 CPUs (load average 9-13 and 7-9):

| 400 balanced runs | runs/s | incl. startup | runs per CPU-second |
|---|---|---|---|
| Chromium, `sim.js` loop, 1 page | 62.8 / 56.7 | 58.0 / 49.4 | 50.7 / 59.2 |
| fastsim `sim.js`, 1 worker | 56.3 / 47.4 | 55.7 / 46.4 | 47.1 / 50.6 |
| fastsim `sim.js`, 2 workers | 63.7 / 43.6 | 62.8 / 43.1 | 40.4 / 42.6 |
| smartbot champion, 3 runs, 1 thread | Chromium 0.76 / 1.09, fastsim 0.47 / 0.73 | | Chromium 1.01 / 1.06, fastsim 0.76 / 0.77 |

With 2 workers, CPU-seconds were about equal to wall-seconds (9.4 s against 9.2 s): the busy machine gave the
process about one CPU in total, so the second worker had nothing to scale onto.

- **Per thread, fastsim runs at about the same speed as Chromium**: 0.85-0.93x per CPU-second on the bots.js
  policies and about 0.73x on the lookahead-heavy smartbot. Both run the same game code on V8, and the battle loop (`step`) takes most of the time.
  Chromium's newer V8 (14.1, against Node's 12.4) is a little faster. Warmed up in-process, a balanced run costs
  17.8 ms of CPU. The batch is the game itself, so no shortcut can make it faster without changing the game.
- **Where the time is saved:**
  - No browser: an engine is ready in about 15 ms, against 1-2 s to launch Chromium.
  - Throughput scales with free CPUs. With 1 or 2 workers the cost stays at about 40-51 runs per CPU-second, so k
    free CPUs should give roughly k times one thread, where Chromium `sim.js` uses one page. This was not measured on
    an idle machine: the 4 CPUs here were busy.
  - A `play.js` command, fight included, takes 0.15-0.2 s here (mostly Node startup), against about 1 s per command
    and 2 s per fight in the Chromium harness. `shell` removes the startup entirely.
  - Replaying a whole archived run (`verify`, `branch`) takes 0.2-0.3 s.
  - Memory: about 40 MB per worker, against about 200 MB per Chromium renderer.
- Headless Chromium renderers here run at nice -8. Under load, wall-clock numbers therefore favour Chromium;
  `bench.js --nice` starts fastsim at the same priority.

## Limits

- fastsim depends on the build's function and variable names, as `bots.js`, `pageside.js` and `core.js` already do. A
  build that renames `onAction`, `startBattle`, `step`, `settle`, `S`, `B`, `UI` or `TUNE` needs those scripts updated,
  not fastsim. The fake DOM covers what the v7/v8 builds touch. A build that measures layout (`getBoundingClientRect`
  sizes) or relies on timers for game logic would need more stubs.
- Exact replay is against Chromium 141 / V8 14.1 on this machine (glibc 2.39 `pow`). Another browser or libm can
  differ in the last float digit.
- The game itself is not made faster. Speed comes from parallelism, startup and the absence of a harness round trip,
  not from a faster battle loop.
- `odds` (play.js) and the smartbot lookahead use information a player does not have.

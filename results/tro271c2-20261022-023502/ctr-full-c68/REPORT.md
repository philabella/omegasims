# Counter matrix: c2full.html 20.83, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 16 of 36: Army > Swarm 75% (edge +30); Undead > Wild West 89% (edge +29); Swarm > Undead 75% (edge +29); Heist Crew > Space Opera 77% (edge +27); Space Opera > Sportsball 82% (edge +26); Kaiju > Army 76% (edge +25); Undead > Heist Crew 77% (edge +22); Kaiju > Slasher 68% (edge +21); Army > Undead 63% (edge +21); Sportsball > Swarm 64% (edge +20); Wild West > Space Opera 63% (edge +19); Slasher > Sportsball 73% (edge +17); Wild West > Army 63% (edge +15); Space Opera > Kaiju 67% (edge +14); Slasher > Wild West 70% (edge +13); Swarm > Heist Crew 61% (edge +11).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 15.2 points; strength spread 45.4-55.5% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian, Brawler.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 4 of 15: Guardian > Stalker 62% (edge +21); Brawler > Mystic 88% (edge +18); Stalker > Gunner 79% (edge +12); Gunner > Medic 98% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.8 points; strength spread 12.7-70% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 288/300 fights; mirror (board vs itself) side A 50.0% / 48.5% / 48.0%. Run time 12.7 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **75±5** | **63±3** | 44±6 | _37±5_ | 45±8 | 44±5 | _24±7_ | 45±5 | 47.3% |
| **Swarm** | _25±5_ | · | **75±4** | **61±4** | 59±3 | 52±5 | 48±6 | 59±6 | _36±4_ | 51.8% |
| **Undead** | _37±3_ | _25±4_ | · | **77±5** | **89±3** | 45±5 | 54±5 | 59±7 | **63±6** | 55.5% |
| **Heist Crew** | 56±6 | _39±4_ | _23±5_ | · | 55±4 | 59±8 | **77±6** | 60±7 | 45±5 | 51.4% |
| **Wild West** | **63±5** | 41±3 | _11±3_ | 45±4 | · | _30±5_ | **63±5** | 54±6 | 52±5 | 45.4% |
| **Slasher** | 55±8 | 48±5 | 55±5 | 41±8 | **70±5** | · | 48±7 | _32±7_ | **73±5** | 52.5% |
| **Space Opera** | 56±5 | 52±6 | 46±5 | _23±6_ | _37±5_ | 52±7 | · | **67±7** | **82±5** | 51.6% |
| **Kaiju** | **76±7** | 41±6 | 41±7 | 40±7 | 46±6 | **68±7** | _33±7_ | · | 43±6 | 48.8% |
| **Sportsball** | 56±5 | **64±4** | _37±6_ | 55±5 | 48±5 | _27±5_ | _18±5_ | 57±6 | · | 45.7% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Undead | 55.5% | Heist Crew, Wild West, Sportsball | Army, Swarm | 18.4 |
| Slasher | 52.5% | Wild West, Sportsball | Kaiju | 11.6 |
| Swarm | 51.8% | Undead, Heist Crew | Army, Sportsball | 16.9 |
| Space Opera | 51.6% | Kaiju, Sportsball | Heist Crew, Wild West | 15.6 |
| Heist Crew | 51.4% | Space Opera | Swarm, Undead | 14.2 |
| Kaiju | 48.8% | Army, Slasher | Space Opera | 13.7 |
| Army | 47.3% | Swarm, Undead | Wild West, Kaiju | 16.7 |
| Sportsball | 45.7% | Swarm | Undead, Slasher, Space Opera | 14.2 |
| Wild West | 45.4% | Army, Space Opera | Undead, Slasher | 14.5 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 53±4 | **62±2** | **65±1** | 58±3 | **66±0** | 62.1% |
| **Brawler** | 47±4 | · | 40±1 | 51±3 | **88±3** | **100±0** | 65.5% |
| **Stalker** | _38±2_ | 60±1 | · | **79±3** | **74±3** | **99±0** | 70% |
| **Gunner** | _35±1_ | 49±3 | _21±3_ | · | 54±4 | **98±1** | 53.1% |
| **Mystic** | 42±3 | _12±3_ | _26±3_ | 46±4 | · | **93±2** | 45.8% |
| **Medic** | _34±0_ | _0±0_ | _1±0_ | _2±1_ | _7±2_ | · | 12.7% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _14±8_ | _30±14_ | _36±13_ | 60±13 | _34±12_ | _33±14_ | _30±14_ | 31.8% |
| **Swarm** | **70±15** | · | **66±10** | **100±0** | **97±3** | **81±10** | **82±12** | **100±0** | **87±6** | 84.7% |
| **Undead** | **86±8** | _34±10_ | · | **89±6** | **93±4** | **85±9** | **88±8** | **91±6** | **79±9** | 80.8% |
| **Heist Crew** | **70±14** | _0±0_ | _11±6_ | · | 46±10 | **70±14** | **70±13** | **89±6** | _33±12_ | 47.8% |
| **Wild West** | **64±13** | _4±3_ | _7±4_ | 54±10 | · | **69±14** | **66±13** | **83±7** | 43±10 | 47.6% |
| **Slasher** | 40±13 | _19±10_ | _15±9_ | _30±14_ | _31±14_ | · | _28±13_ | _31±14_ | _30±14_ | 27% |
| **Space Opera** | **66±12** | _18±12_ | _12±8_ | _30±13_ | _34±13_ | **72±13** | · | **99±1** | 54±13 | 47% |
| **Kaiju** | **68±14** | _0±0_ | _9±6_ | _11±6_ | _17±7_ | **69±14** | _1±1_ | · | _4±2_ | 21.8% |
| **Sportsball** | **70±14** | _13±6_ | _22±9_ | **67±12** | 58±10 | **70±14** | 46±13 | **96±2** | · | 54.6% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm.
- **Genres that counter nothing** (no 60%+ matchup): Army, Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 12 of 36: Kaiju > Army 68% (edge +30); Kaiju > Slasher 69% (edge +26); Space Opera > Kaiju 99% (edge +23); Heist Crew > Space Opera 70% (edge +19); Sportsball > Kaiju 96% (edge +15); Wild West > Space Opera 66% (edge +15); Swarm > Heist Crew 100% (edge +13); Heist Crew > Kaiju 89% (edge +12); Undead > Wild West 93% (edge +11); Swarm > Wild West 97% (edge +11); Sportsball > Heist Crew 67% (edge +11); Swarm > Undead 66% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.6 points; strength spread 21.8-84.7% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **97±3** | **99±1** | **85±7** | **72±7** | _40±15_ | **86±5** | _3±2_ | **98±2** | 72.2% |
| **Swarm** | _3±3_ | · | **90±4** | **73±12** | **77±8** | **76±9** | **63±12** | _27±12_ | _21±9_ | 53.7% |
| **Undead** | _1±1_ | _10±4_ | · | **71±10** | **98±1** | 46±14 | _25±9_ | _20±12_ | 58±12 | 40.9% |
| **Heist Crew** | _15±7_ | _28±12_ | _29±10_ | · | **83±4** | 43±14 | **92±4** | _20±12_ | **86±7** | 49.4% |
| **Wild West** | _28±7_ | _23±8_ | _2±1_ | _17±4_ | · | _6±3_ | _33±9_ | _11±7_ | 46±7 | 21.1% |
| **Slasher** | **61±15** | _24±9_ | 54±14 | 57±14 | **94±3** | · | 55±13 | _21±10_ | **100±0** | 58.1% |
| **Space Opera** | _14±5_ | _37±12_ | **75±9** | _8±4_ | **67±9** | 45±13 | · | _31±13_ | **100±0** | 46.8% |
| **Kaiju** | **97±2** | **73±12** | **80±12** | **80±12** | **89±7** | **79±10** | **69±13** | · | **84±10** | 80.8% |
| **Sportsball** | _2±2_ | **79±9** | 42±12 | _15±7_ | 54±7 | _0±0_ | _0±0_ | _16±10_ | · | 26.4% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 19 of 36: Sportsball > Swarm 79% (edge +55); Heist Crew > Space Opera 92% (edge +39); Kaiju > Army 97% (edge +35); Swarm > Slasher 76% (edge +30); Undead > Heist Crew 71% (edge +29); Space Opera > Sportsball 100% (edge +28); Army > Swarm 97% (edge +28); Swarm > Undead 90% (edge +28); Slasher > Army 61% (edge +26); Undead > Wild West 98% (edge +26); Army > Undead 99% (edge +20); Slasher > Sportsball 100% (edge +20); Space Opera > Undead 75% (edge +19); Swarm > Heist Crew 73% (edge +18); Heist Crew > Sportsball 86% (edge +12); Army > Heist Crew 85% (edge +12); Army > Space Opera 86% (edge +11); Slasher > Wild West 94% (edge +10); Army > Sportsball 98% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 20.1 points; strength spread 21.1-80.8% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **99±1** | **75±7** | _18±7_ | _2±1_ | _37±11_ | _12±5_ | _35±13_ | _5±3_ | 36.1% |
| **Swarm** | _1±1_ | · | **69±8** | _12±7_ | _5±3_ | _0±0_ | _0±0_ | 49±14 | _0±0_ | 19.5% |
| **Undead** | _25±7_ | _31±8_ | · | **70±8** | **77±7** | _5±2_ | 49±11 | **65±14** | 53±10 | 47.4% |
| **Heist Crew** | **82±7** | **88±7** | _30±8_ | · | _37±8_ | **64±11** | **68±11** | **70±15** | _15±8_ | 56.9% |
| **Wild West** | **98±1** | **95±3** | _23±7_ | **63±8** | · | _16±4_ | **90±6** | **68±15** | **68±7** | 65% |
| **Slasher** | **63±11** | **100±0** | **95±2** | _36±11_ | **85±4** | · | **62±11** | 45±14 | **89±4** | 71% |
| **Space Opera** | **88±5** | **100±0** | 51±11 | _32±11_ | _10±6_ | _38±11_ | · | **69±15** | **91±5** | 59.8% |
| **Kaiju** | **65±13** | 51±14 | _35±14_ | _30±15_ | _32±15_ | 55±14 | _31±15_ | · | 42±15 | 43.1% |
| **Sportsball** | **95±3** | **100±0** | 48±10 | **85±8** | _32±7_ | _11±4_ | _9±5_ | 58±15 | · | 54.7% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 21 of 36: Swarm > Undead 69% (edge +48); Undead > Wild West 77% (edge +44); Sportsball > Heist Crew 85% (edge +37); Army > Undead 75% (edge +36); Space Opera > Sportsball 91% (edge +36); Wild West > Space Opera 90% (edge +34); Undead > Heist Crew 70% (edge +30); Heist Crew > Slasher 64% (edge +29); Army > Swarm 99% (edge +29); Slasher > Wild West 85% (edge +28); Sportsball > Army 95% (edge +27); Slasher > Sportsball 89% (edge +22); Slasher > Undead 95% (edge +22); Wild West > Army 98% (edge +21); Heist Crew > Space Opera 68% (edge +21); Sportsball > Swarm 100% (edge +16); Space Opera > Army 88% (edge +15); Space Opera > Swarm 100% (edge +13); Heist Crew > Army 82% (edge +12); Undead > Kaiju 65% (edge +11); Slasher > Swarm 100% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 22.7 points; strength spread 19.5-71% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | mule:1:f1 commando:1:f0 fieldmed:2:b1 radio:1:b0 rifle:1:b2 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:1:f1 riot:2:f0 mule:2:f2 gunny:2:b1 fieldmed:3:b0 radio:2:b2 rifle:1:b3 |
| Swarm | beetles:1:f1 lurker:1:f0 queen:2:b1 nurse:1:b0 spitters:1:b2 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | scorpion:3:f1 ravager:1:f0 lurker:1:f2 hivemind:2:b1 queen:2:b0 nurse:1:b2 spitters:1:b3 |
| Undead | gravegolem:1:f1 zombies:1:f0 vampbat:1:f2 necro:2:b1 skelarch:1:b0 | gravegolem:3:f1 zombies:1:f0 wraith:2:f2 vampbat:2:f3 bonesetter:1:b1 necro:1:b0 | gravegolem:3:f1 bonedragon:2:f0 zombies:2:f2 wraith:1:f3 bonesetter:1:b1 necro:2:b0 vampbat:2:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 driver:1:f3 fixer:2:b1 hacker:2:b0 | insideman:3:f1 muscle:2:f0 safecracker:2:f2 mastermind:2:b1 fixer:1:b0 hacker:1:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:2:f1 deputy:1:f0 outlaws:1:b1 gunslinger:3:b0 prospector:1:b2 bounty:1:b3 | sheriff:1:f1 deputy:2:f0 bounty:1:f2 gunslinger:3:b1 prospector:2:b0 doc:2:b2 noname:2:b3 |
| Slasher | chainsaw:1:f1 kids:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:2:f0 chainsaw:2:f2 finalgirl:3:b1 exorcist:1:b0 babysitter:2:b2 | brute:2:f1 counselors:1:f0 kids:2:f2 dreamstalker:2:b1 finalgirl:3:b0 exorcist:1:b2 babysitter:2:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:1:f1 redshirts:2:f0 captain:3:f2 telepath:1:b1 pilot:2:b0 smuggler:2:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 droids:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 reporter:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | pitcher:1:f1 headcoach:2:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:2:f0 pitcher:2:b1 headcoach:2:b0 waterboy:2:b2 cheersquad:2:b3 | mascot:3:f1 dodgeball:2:f0 qb:2:f2 headcoach:1:b1 pointguard:2:b0 waterboy:1:b2 cheersquad:1:b3 |
| Guardian | gravegolem:2:f1 riot:2:f0 beetles:1:f2 muscle:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 deputy:2:f3 riot:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 deputy:1:b1 riot:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 chainsaw:1:f0 safecracker:1:f2 babykaiju:1:f3 outlaws:1:b1 | scorpion:2:f1 captain:3:f0 ravager:2:f2 babykaiju:1:f3 outlaws:1:b1 zombies:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:2:f3 safecracker:2:b1 mule:2:b0 chainsaw:2:b2 |
| Stalker | lurker:1:f1 wraith:1:f0 vampbat:2:f2 smuggler:2:b1 bounty:1:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | tanks:1:f1 finalgirl:2:b1 gunslinger:1:b0 lookouts:1:b2 rifle:1:b3 | spitters:1:f1 pilot:2:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:1:b2 lookouts:2:b3 | spitters:2:f1 rifle:2:f0 pilot:2:f2 gunny:1:b1 finalgirl:3:b0 gunslinger:3:b2 pointguard:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 headcoach:1:b3 | scientist:1:f1 necro:1:f0 giantmoth:2:b1 queen:3:b0 headcoach:1:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fixer:2:b1 nurse:1:b0 waterboy:1:b2 cheersquad:1:b3 | doc:1:f1 babysitter:1:f0 bonesetter:1:b1 fieldmed:3:b0 fixer:2:b2 reporter:2:b3 | cheersquad:1:f1 reporter:2:f0 doc:2:f2 bonesetter:3:b1 fieldmed:3:b0 fixer:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

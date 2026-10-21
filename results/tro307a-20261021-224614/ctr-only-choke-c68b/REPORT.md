# Counter matrix: only-choke.html 20.80, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 17 of 36: Heist Crew > Space Opera 81% (edge +33); Army > Swarm 76% (edge +28); Kaiju > Army 77% (edge +27); Space Opera > Sportsball 83% (edge +25); Undead > Heist Crew 70% (edge +24); Swarm > Undead 72% (edge +21); Kaiju > Slasher 68% (edge +20); Undead > Wild West 70% (edge +19); Slasher > Sportsball 72% (edge +19); Army > Undead 67% (edge +18); Wild West > Army 64% (edge +15); Swarm > Heist Crew 61% (edge +14); Sportsball > Swarm 61% (edge +14); Sportsball > Kaiju 61% (edge +12); Heist Crew > Slasher 65% (edge +12); Space Opera > Kaiju 68% (edge +12); Slasher > Wild West 66% (edge +12).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 14.3 points; strength spread 47.2-55.2% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 6 of 15: Brawler > Mystic 84% (edge +19); Guardian > Stalker 65% (edge +13); Guardian > Gunner 66% (edge +12); Stalker > Brawler 61% (edge +11); Gunner > Medic 96% (edge +9); Mystic > Medic 87% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 10.2 points; strength spread 18.2-62.5% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 289/300 fights; mirror (board vs itself) side A 50.5% / 50.4% / 49.4%. Run time 11.8 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **76±5** | **67±3** | 46±6 | _36±5_ | 51±8 | 40±5 | _23±6_ | 44±5 | 48.1% |
| **Swarm** | _24±5_ | · | **72±6** | **61±4** | 57±2 | 48±5 | 44±5 | 56±6 | _39±4_ | 50.1% |
| **Undead** | _33±3_ | _28±6_ | · | **70±5** | **70±4** | 42±6 | _40±4_ | 59±7 | 48±6 | 48.9% |
| **Heist Crew** | 54±6 | _39±4_ | _30±5_ | · | 54±4 | **65±7** | **81±5** | 58±7 | 48±5 | 53.2% |
| **Wild West** | **64±5** | 43±2 | _30±4_ | 46±4 | · | _34±6_ | 55±5 | 54±6 | 49±5 | 47.2% |
| **Slasher** | 49±8 | 52±5 | 58±6 | _35±7_ | **66±6** | · | 45±7 | _32±8_ | **72±5** | 51% |
| **Space Opera** | 60±5 | 56±5 | **60±4** | _19±5_ | 45±5 | 55±7 | · | **68±7** | **83±4** | 55.2% |
| **Kaiju** | **77±6** | 44±6 | 41±7 | 42±7 | 46±6 | **68±8** | _32±7_ | · | _39±6_ | 48.8% |
| **Sportsball** | 56±5 | **61±4** | 52±6 | 52±5 | 51±5 | _28±5_ | _17±4_ | **61±6** | · | 47.4% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Space Opera | 55.2% | Undead, Kaiju, Sportsball | Heist Crew | 16 |
| Heist Crew | 53.2% | Slasher, Space Opera | Swarm, Undead | 16.1 |
| Slasher | 51% | Wild West, Sportsball | Heist Crew, Kaiju | 11.7 |
| Swarm | 50.1% | Undead, Heist Crew | Army, Sportsball | 14.2 |
| Undead | 48.9% | Heist Crew, Wild West | Army, Swarm, Space Opera | 15 |
| Kaiju | 48.8% | Army, Slasher | Space Opera, Sportsball | 13.9 |
| Army | 48.1% | Swarm, Undead | Wild West, Kaiju | 16.1 |
| Sportsball | 47.4% | Swarm, Kaiju | Slasher, Space Opera | 13.4 |
| Wild West | 47.2% | Army | Undead, Slasher | 10.7 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 53±4 | **65±1** | **66±1** | **63±1** | **66±0** | 62.5% |
| **Brawler** | 47±4 | · | _39±3_ | 44±2 | **84±3** | **88±4** | 60.1% |
| **Stalker** | _35±1_ | **61±3** | · | 53±2 | **62±4** | **91±3** | 60.4% |
| **Gunner** | _34±1_ | 56±2 | 47±2 | · | **62±5** | **96±2** | 59.1% |
| **Mystic** | _37±1_ | _16±3_ | _38±4_ | _38±5_ | · | **87±3** | 44.7% |
| **Medic** | _34±0_ | _12±4_ | _9±3_ | _4±2_ | _13±3_ | · | 18.2% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _15±9_ | _28±14_ | _34±14_ | **64±14** | _34±13_ | _30±15_ | _30±15_ | 32.1% |
| **Swarm** | **70±15** | · | 52±12 | **99±1** | **94±3** | **81±11** | **83±10** | **100±0** | **87±6** | 82.6% |
| **Undead** | **85±9** | 48±12 | · | **87±7** | **86±6** | **82±11** | **87±8** | **88±7** | **76±11** | 79.9% |
| **Heist Crew** | **72±14** | _1±1_ | _13±7_ | · | 52±9 | **70±16** | **68±12** | **84±10** | 40±12 | 49.5% |
| **Wild West** | **66±14** | _6±3_ | _14±6_ | 48±9 | · | **69±15** | **69±11** | **82±8** | 42±10 | 48.7% |
| **Slasher** | _37±14_ | _19±11_ | _18±11_ | _30±16_ | _31±15_ | · | _29±15_ | _30±16_ | _30±16_ | 27.1% |
| **Space Opera** | **66±13** | _17±10_ | _13±8_ | _32±12_ | _31±11_ | **71±15** | · | **100±1** | 55±12 | 47% |
| **Kaiju** | **70±15** | _0±0_ | _13±7_ | _16±10_ | _18±8_ | **70±16** | _0±1_ | · | _4±2_ | 23.6% |
| **Sportsball** | **70±15** | _13±6_ | _24±11_ | 60±12 | 58±10 | **70±16** | 45±12 | **97±2** | · | 54.2% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm, Undead.
- **Genres that counter nothing** (no 60%+ matchup): Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 9 of 36: Kaiju > Army 70% (edge +30); Space Opera > Kaiju 100% (edge +25); Kaiju > Slasher 70% (edge +25); Wild West > Space Opera 69% (edge +17); Sportsball > Kaiju 97% (edge +17); Swarm > Heist Crew 99% (edge +16); Heist Crew > Space Opera 68% (edge +15); Swarm > Wild West 94% (edge +11); Heist Crew > Kaiju 84% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.4 points; strength spread 23.6-82.6% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **98±2** | **100±1** | **87±7** | **74±7** | _40±14_ | **85±5** | _3±2_ | **98±2** | 72.9% |
| **Swarm** | _2±2_ | · | **77±9** | **77±10** | **75±6** | **64±11** | 50±12 | _27±13_ | _30±11_ | 50.1% |
| **Undead** | _0±1_ | _23±9_ | · | 51±10 | **86±5** | _40±13_ | _4±2_ | _19±13_ | 43±13 | 33.1% |
| **Heist Crew** | _13±7_ | _23±10_ | 49±10 | · | **82±5** | 43±14 | **91±5** | _20±13_ | **88±6** | 50.9% |
| **Wild West** | _26±7_ | _25±6_ | _14±5_ | _18±5_ | · | _9±4_ | _27±7_ | _11±7_ | 43±6 | 21.9% |
| **Slasher** | **60±14** | _36±11_ | **61±13** | 57±14 | **91±4** | · | 53±12 | _22±12_ | **96±4** | 59.5% |
| **Space Opera** | _15±5_ | 50±12 | **96±2** | _10±5_ | **73±7** | 47±12 | · | _36±14_ | **100±0** | 53.1% |
| **Kaiju** | **97±2** | **73±13** | **81±13** | **80±13** | **89±7** | **78±12** | **64±14** | · | **83±11** | 80.2% |
| **Sportsball** | _2±2_ | **70±11** | 58±13 | _13±6_ | 57±6 | _4±4_ | _0±0_ | _17±11_ | · | 27.6% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 17 of 36: Heist Crew > Space Opera 91% (edge +43); Sportsball > Swarm 70% (edge +42); Kaiju > Army 97% (edge +37); Swarm > Heist Crew 77% (edge +28); Space Opera > Undead 96% (edge +27); Army > Swarm 98% (edge +25); Slasher > Army 60% (edge +25); Space Opera > Sportsball 100% (edge +24); Swarm > Slasher 64% (edge +23); Undead > Wild West 86% (edge +22); Slasher > Sportsball 96% (edge +16); Army > Heist Crew 87% (edge +15); Army > Space Opera 85% (edge +15); Army > Undead 100% (edge +15); Heist Crew > Sportsball 88% (edge +14); Army > Sportsball 98% (edge +10); Swarm > Undead 77% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 18.5 points; strength spread 21.9-80.2% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **100±1** | **85±6** | _23±9_ | _1±0_ | 50±10 | _1±1_ | _35±12_ | _5±2_ | 38% |
| **Swarm** | _0±1_ | · | **87±7** | _6±4_ | _2±1_ | _0±0_ | _0±0_ | 41±14 | _0±1_ | 19.2% |
| **Undead** | _15±6_ | _13±7_ | · | **71±9** | _39±8_ | _5±3_ | _29±9_ | **70±15** | _26±8_ | 33.8% |
| **Heist Crew** | **77±9** | **94±4** | _30±9_ | · | _28±8_ | **80±8** | **85±8** | **69±15** | _16±6_ | 60.2% |
| **Wild West** | **99±0** | **98±1** | **61±8** | **72±8** | · | _25±6_ | **68±5** | **70±15** | **63±7** | 69.3% |
| **Slasher** | 50±10 | **100±0** | **95±3** | _20±8_ | **75±6** | · | 53±10 | 44±13 | **91±4** | 65.9% |
| **Space Opera** | **99±1** | **100±0** | **71±9** | _15±8_ | _32±5_ | 47±10 | · | **69±15** | **94±3** | 65.8% |
| **Kaiju** | **65±12** | 60±14 | _30±15_ | _31±15_ | _30±15_ | 56±13 | _31±15_ | · | _30±15_ | 41.9% |
| **Sportsball** | **95±2** | **100±1** | **74±8** | **84±6** | _37±7_ | _9±4_ | _6±3_ | **70±15** | · | 59.4% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 21 of 36: Swarm > Undead 87% (edge +55); Undead > Heist Crew 71% (edge +45); Heist Crew > Space Opera 85% (edge +41); Space Opera > Sportsball 94% (edge +38); Heist Crew > Slasher 80% (edge +36); Sportsball > Heist Crew 84% (edge +35); Slasher > Sportsball 91% (edge +34); Army > Undead 85% (edge +31); Slasher > Wild West 75% (edge +29); Undead > Kaiju 70% (edge +29); Army > Swarm 100% (edge +27); Sportsball > Army 95% (edge +24); Space Opera > Army 99% (edge +23); Wild West > Army 99% (edge +20); Slasher > Undead 95% (edge +16); Wild West > Space Opera 68% (edge +14); Sportsball > Swarm 100% (edge +13); Wild West > Heist Crew 72% (edge +12); Kaiju > Army 65% (edge +11); Space Opera > Swarm 100% (edge +10); Slasher > Swarm 100% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 23.7 points; strength spread 19.2-69.3% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | riot:1:f1 mule:1:f0 commando:1:f2 fieldmed:2:b1 radio:1:b0 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:1:f0 mule:2:f2 commando:1:f3 gunny:2:b1 radio:2:b0 rifle:1:b2 |
| Swarm | beetles:1:f1 ravager:1:f0 lurker:1:f2 queen:2:b1 nurse:1:b0 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | beetles:2:f1 scorpion:3:f0 ravager:1:f2 lurker:2:f3 hivemind:2:b1 queen:1:b0 nurse:1:b2 |
| Undead | gravegolem:2:f1 zombies:1:f0 vampbat:1:f2 necro:1:b1 skelarch:1:b0 | gravegolem:3:f1 zombies:2:f0 wraith:2:f2 vampbat:1:f3 bonesetter:1:b1 necro:1:b0 | gravegolem:2:f1 bonedragon:2:f0 zombies:2:f2 wraith:2:f3 bonesetter:1:b1 necro:2:b0 vampbat:2:b2 |
| Heist Crew | muscle:1:f1 safecracker:1:f0 driver:1:f2 fixer:2:b1 hacker:1:b0 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 fixer:2:b1 hacker:2:b0 lookouts:1:b2 | insideman:3:f1 muscle:2:f0 safecracker:1:f2 mastermind:2:b1 fixer:1:b0 hacker:2:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:1:f1 deputy:2:f0 gunslinger:3:b1 prospector:1:b0 doc:2:b2 bounty:2:b3 | sheriff:3:f1 deputy:2:f0 bounty:2:f2 gunslinger:1:b1 prospector:1:b0 doc:1:b2 noname:2:b3 |
| Slasher | counselors:1:f1 chainsaw:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:2:f1 counselors:1:f0 chainsaw:1:f2 finalgirl:3:b1 exorcist:1:b0 babysitter:1:b2 | brute:3:f1 counselors:1:f0 chainsaw:1:f2 dreamstalker:2:b1 finalgirl:2:b0 exorcist:1:b2 babysitter:1:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 pilot:1:b0 smuggler:1:b2 | starknight:2:f1 redshirts:1:f0 captain:3:f2 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 pilot:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 tanks:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | dodgeball:1:f1 headcoach:2:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:1:f0 headcoach:3:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:3:f1 dodgeball:2:f0 pitcher:2:f2 headcoach:1:b1 waterboy:1:b0 cheersquad:2:b2 qb:2:b3 |
| Guardian | gravegolem:2:f1 deputy:2:f0 beetles:1:f2 riot:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 muscle:2:f3 counselors:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 riot:1:b1 deputy:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 mule:1:f0 safecracker:1:f2 babykaiju:1:f3 pitcher:1:b1 | scorpion:2:f1 captain:3:f0 mule:1:f2 safecracker:1:f3 pitcher:1:b1 ravager:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:3:f3 ravager:1:b1 chainsaw:1:b0 safecracker:2:b2 |
| Stalker | wraith:2:f1 lurker:1:f0 commando:2:f2 vampbat:2:f3 driver:1:b1 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | spitters:1:f1 finalgirl:2:b1 gunslinger:1:b0 pilot:1:b2 skelarch:1:b3 | lookouts:1:f1 tanks:2:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:1:b2 pilot:2:b3 | rifle:1:f1 pilot:1:f0 spitters:2:f2 gunny:2:b1 finalgirl:3:b0 gunslinger:2:b2 pointguard:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 necro:1:b3 | scientist:1:f1 necro:1:f0 giantmoth:2:b1 queen:3:b0 headcoach:1:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fieldmed:2:b1 fixer:1:b0 babysitter:1:b2 droids:1:b3 | babysitter:1:f1 cheersquad:2:f0 bonesetter:2:b1 fieldmed:2:b0 fixer:2:b2 waterboy:1:b3 | cheersquad:1:f1 doc:2:f0 babysitter:2:f2 bonesetter:3:b1 fixer:3:b0 fieldmed:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

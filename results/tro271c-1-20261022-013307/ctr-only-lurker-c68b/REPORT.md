# Counter matrix: only-lurker.html 20.82, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 17 of 36: Heist Crew > Space Opera 83% (edge +33); Swarm > Undead 82% (edge +28); Army > Swarm 75% (edge +28); Kaiju > Army 78% (edge +28); Space Opera > Sportsball 80% (edge +24); Undead > Heist Crew 65% (edge +22); Undead > Wild West 71% (edge +21); Kaiju > Slasher 71% (edge +21); Slasher > Sportsball 72% (edge +21); Wild West > Space Opera 63% (edge +19); Army > Undead 67% (edge +17); Wild West > Army 64% (edge +14); Space Opera > Kaiju 68% (edge +13); Slasher > Wild West 64% (edge +13); Sportsball > Kaiju 61% (edge +12); Heist Crew > Slasher 67% (edge +12); Space Opera > Slasher 64% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 15 points; strength spread 47.7-54.1% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian, Brawler.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 4 of 15: Brawler > Mystic 87% (edge +18); Guardian > Stalker 65% (edge +16); Stalker > Gunner 70% (edge +11); Gunner > Medic 96% (edge +11).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 10.5 points; strength spread 18.1-64.4% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 290/300 fights; mirror (board vs itself) side A 49.0% / 53.2% / 50.1%. Run time 8.3 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **75±5** | **67±4** | 45±6 | _36±5_ | 54±7 | 44±5 | _22±6_ | 45±5 | 48.8% |
| **Swarm** | _25±5_ | · | **82±4** | 59±3 | 59±2 | 45±5 | 45±5 | 58±6 | 42±4 | 51.6% |
| **Undead** | _33±4_ | _18±4_ | · | **65±5** | **71±4** | 43±6 | 45±4 | 59±7 | 48±6 | 48% |
| **Heist Crew** | 55±6 | 41±3 | _35±5_ | · | 53±5 | **67±7** | **83±5** | 58±7 | 46±5 | 54.1% |
| **Wild West** | **64±5** | 41±2 | _29±4_ | 47±5 | · | _36±6_ | **63±4** | 54±6 | 48±5 | 48.1% |
| **Slasher** | 46±7 | 55±5 | 57±6 | _33±7_ | **64±6** | · | _36±7_ | _29±7_ | **72±5** | 49.2% |
| **Space Opera** | 56±5 | 55±5 | 55±4 | _17±5_ | _37±4_ | **64±7** | · | **68±7** | **80±5** | 53.4% |
| **Kaiju** | **78±6** | 42±6 | 41±7 | 42±7 | 46±6 | **71±7** | _32±7_ | · | _39±6_ | 48.9% |
| **Sportsball** | 55±5 | 58±4 | 52±6 | 54±5 | 52±5 | _28±5_ | _20±5_ | **61±6** | · | 47.7% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Heist Crew | 54.1% | Slasher, Space Opera | Undead | 15.5 |
| Space Opera | 53.4% | Slasher, Kaiju, Sportsball | Heist Crew, Wild West | 16.9 |
| Swarm | 51.6% | Undead | Army | 15.8 |
| Slasher | 49.2% | Wild West, Sportsball | Heist Crew, Space Opera, Kaiju | 13 |
| Kaiju | 48.9% | Army, Slasher | Space Opera, Sportsball | 14.5 |
| Army | 48.8% | Swarm, Undead | Wild West, Kaiju | 16.2 |
| Wild West | 48.1% | Army, Space Opera | Undead, Slasher | 12.3 |
| Undead | 48% | Heist Crew, Wild West | Army, Swarm | 16.2 |
| Sportsball | 47.7% | Kaiju | Slasher, Space Opera | 13.6 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 53±4 | **65±1** | **66±1** | **67±3** | **66±0** | 63.2% |
| **Brawler** | 47±4 | · | 41±2 | 45±2 | **87±3** | **89±5** | 62% |
| **Stalker** | _35±1_ | 59±2 | · | **70±4** | **69±3** | **92±4** | 64.4% |
| **Gunner** | _34±1_ | 55±2 | _30±4_ | · | **61±5** | **96±2** | 55.6% |
| **Mystic** | _33±3_ | _13±3_ | _31±3_ | _39±5_ | · | **84±4** | 41.6% |
| **Medic** | _34±0_ | _11±5_ | _8±4_ | _4±2_ | _16±4_ | · | 18.1% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _15±9_ | _28±14_ | _34±14_ | 57±14 | _34±14_ | _30±15_ | _30±15_ | 31.2% |
| **Swarm** | **70±15** | · | **77±9** | **100±0** | **97±2** | **77±12** | **81±11** | **100±0** | **90±5** | 85.4% |
| **Undead** | **85±9** | _23±9_ | · | **88±7** | **86±6** | **82±11** | **87±8** | **88±7** | **76±11** | 77% |
| **Heist Crew** | **72±14** | _0±0_ | _12±7_ | · | 49±10 | **70±16** | **75±12** | **85±9** | _36±13_ | 49.2% |
| **Wild West** | **66±14** | _3±2_ | _14±6_ | 51±10 | · | **69±15** | **69±11** | **82±8** | 42±11 | 48.6% |
| **Slasher** | 43±14 | _23±12_ | _18±11_ | _30±16_ | _31±15_ | · | _28±15_ | _30±16_ | _30±16_ | 28.2% |
| **Space Opera** | **66±14** | _19±11_ | _13±8_ | _25±12_ | _31±11_ | **72±15** | · | **100±1** | 55±13 | 46.3% |
| **Kaiju** | **70±15** | _0±0_ | _13±7_ | _15±9_ | _18±8_ | **70±16** | _0±1_ | · | _3±2_ | 23.4% |
| **Sportsball** | **70±15** | _11±5_ | _24±11_ | **64±13** | 58±11 | **70±16** | 45±13 | **97±2** | · | 54.2% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm.
- **Genres that counter nothing** (no 60%+ matchup): Army, Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 13 of 36: Kaiju > Army 70% (edge +29); Kaiju > Slasher 70% (edge +26); Space Opera > Kaiju 100% (edge +25); Heist Crew > Space Opera 75% (edge +22); Sportsball > Kaiju 97% (edge +17); Wild West > Space Opera 69% (edge +17); Swarm > Heist Crew 100% (edge +13); Swarm > Undead 77% (edge +13); Swarm > Wild West 97% (edge +11); Undead > Heist Crew 88% (edge +10); Sportsball > Heist Crew 64% (edge +9); Heist Crew > Kaiju 85% (edge +9); Undead > Wild West 86% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 12.2 points; strength spread 23.4-85.4% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **98±2** | **100±1** | **87±7** | **75±7** | _40±14_ | **85±5** | _3±2_ | **98±2** | 73% |
| **Swarm** | _2±2_ | · | **89±5** | **74±10** | **79±7** | 58±11 | 55±10 | _29±13_ | _36±12_ | 52.9% |
| **Undead** | _1±1_ | _11±5_ | · | 51±11 | **88±5** | 41±13 | _4±2_ | _20±13_ | 43±13 | 32% |
| **Heist Crew** | _13±7_ | _26±10_ | 49±11 | · | **81±5** | 44±14 | **90±4** | _20±13_ | **87±7** | 51.2% |
| **Wild West** | _25±7_ | _21±7_ | _13±5_ | _19±5_ | · | _14±9_ | _27±7_ | _11±7_ | 43±7 | 21.8% |
| **Slasher** | **60±14** | 42±11 | 59±13 | 56±14 | **86±9** | · | 49±12 | _19±10_ | **100±1** | 58.9% |
| **Space Opera** | _15±5_ | 45±10 | **97±2** | _10±4_ | **73±7** | 51±12 | · | _37±14_ | **100±0** | 53.1% |
| **Kaiju** | **97±2** | **71±13** | **80±13** | **80±13** | **89±7** | **81±10** | **64±14** | · | **83±11** | 80.3% |
| **Sportsball** | _2±2_ | **64±12** | 57±13 | _13±7_ | 57±7 | _1±1_ | _0±0_ | _17±11_ | · | 26.6% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 16 of 36: Heist Crew > Space Opera 90% (edge +42); Sportsball > Swarm 64% (edge +40); Kaiju > Army 97% (edge +37); Army > Swarm 98% (edge +27); Space Opera > Undead 97% (edge +26); Slasher > Army 60% (edge +25); Undead > Wild West 88% (edge +25); Space Opera > Sportsball 100% (edge +23); Swarm > Heist Crew 74% (edge +23); Slasher > Sportsball 100% (edge +19); Swarm > Undead 89% (edge +19); Army > Heist Crew 87% (edge +15); Army > Space Opera 85% (edge +14); Army > Undead 100% (edge +14); Heist Crew > Sportsball 87% (edge +13); Army > Sportsball 98% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 18.3 points; strength spread 21.8-80.3% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **99±1** | **88±6** | _21±8_ | _1±0_ | **64±10** | _13±6_ | _34±12_ | _6±2_ | 41.2% |
| **Swarm** | _1±1_ | · | **80±9** | _3±2_ | _2±1_ | _0±0_ | _0±0_ | 44±13 | _0±0_ | 18.6% |
| **Undead** | _13±6_ | _20±9_ | · | 57±8 | _39±9_ | _7±2_ | 44±9 | **70±15** | _26±8_ | 34.9% |
| **Heist Crew** | **79±8** | **97±2** | 43±8 | · | _28±8_ | **86±7** | **85±9** | **69±15** | _16±6_ | 63.1% |
| **Wild West** | **100±0** | **98±1** | **62±9** | **72±8** | · | _26±5_ | **94±1** | **70±15** | **61±6** | 72% |
| **Slasher** | _36±10_ | **100±0** | **93±2** | _14±7_ | **74±5** | · | _32±10_ | _39±12_ | **87±4** | 59.4% |
| **Space Opera** | **87±6** | **100±0** | 57±9 | _16±9_ | _7±1_ | **68±10** | · | **68±15** | **86±8** | 60.8% |
| **Kaiju** | **66±12** | 56±13 | _30±15_ | _31±15_ | _30±15_ | **61±12** | _33±15_ | · | _30±15_ | 42.6% |
| **Sportsball** | **94±2** | **100±0** | **74±8** | **84±6** | _39±6_ | _13±4_ | _15±8_ | **70±15** | · | 61% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 25 of 36: Swarm > Undead 80% (edge +50); Slasher > Sportsball 87% (edge +39); Slasher > Wild West 74% (edge +38); Sportsball > Heist Crew 84% (edge +36); Space Opera > Sportsball 86% (edge +36); Heist Crew > Slasher 86% (edge +32); Heist Crew > Space Opera 85% (edge +32); Army > Slasher 64% (edge +32); Wild West > Space Opera 94% (edge +31); Army > Undead 88% (edge +31); Undead > Kaiju 70% (edge +28); Kaiju > Slasher 61% (edge +27); Sportsball > Army 94% (edge +25); Army > Swarm 99% (edge +23); Wild West > Army 99% (edge +20); Slasher > Undead 93% (edge +20); Space Opera > Army 87% (edge +18); Space Opera > Slasher 68% (edge +17); Kaiju > Army 66% (edge +15); Slasher > Swarm 100% (edge +13); Space Opera > Swarm 100% (edge +12); Sportsball > Swarm 100% (edge +12); Wild West > Heist Crew 72% (edge +12); Heist Crew > Swarm 97% (edge +9); Heist Crew > Army 79% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 23.8 points; strength spread 18.6-72% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | riot:1:f1 mule:1:f0 commando:1:f2 fieldmed:2:b1 radio:1:b0 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:1:f0 mule:2:f2 commando:1:f3 gunny:2:b1 radio:2:b0 rifle:1:b2 |
| Swarm | beetles:1:f1 ravager:1:f0 lurker:1:f2 queen:2:b1 nurse:1:b0 | beetles:2:f1 scorpion:1:f0 ravager:2:f2 lurker:2:f3 queen:3:b1 nurse:1:b0 | beetles:2:f1 scorpion:3:f0 ravager:1:f2 lurker:2:f3 hivemind:2:b1 queen:1:b0 nurse:1:b2 |
| Undead | gravegolem:2:f1 zombies:1:f0 vampbat:1:f2 necro:1:b1 skelarch:1:b0 | gravegolem:2:f1 zombies:1:f0 vampbat:1:f2 bonesetter:1:b1 necro:3:b0 skelarch:2:b2 | gravegolem:2:f1 bonedragon:2:f0 zombies:2:f2 wraith:2:f3 bonesetter:1:b1 necro:2:b0 vampbat:2:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 fixer:2:b1 hacker:2:b0 lookouts:1:b2 | insideman:3:f1 muscle:2:f0 safecracker:1:f2 mastermind:2:b1 fixer:1:b0 hacker:2:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:2:f1 deputy:1:f0 gunslinger:3:b1 prospector:1:b0 doc:1:b2 bounty:1:b3 | sheriff:3:f1 deputy:2:f0 bounty:2:f2 gunslinger:1:b1 prospector:1:b0 doc:1:b2 noname:2:b3 |
| Slasher | counselors:1:f1 chainsaw:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:1:f0 chainsaw:2:f2 kids:1:f3 finalgirl:3:b1 exorcist:2:b0 | brute:3:f1 counselors:1:f0 chainsaw:1:f2 dreamstalker:2:b1 finalgirl:2:b0 exorcist:1:b2 babysitter:1:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:2:f1 redshirts:1:f0 captain:3:f2 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 pilot:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 tanks:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | dodgeball:1:f1 headcoach:2:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:1:f0 headcoach:3:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:3:f1 dodgeball:2:f0 pitcher:2:f2 headcoach:1:b1 waterboy:1:b0 cheersquad:2:b2 qb:2:b3 |
| Guardian | gravegolem:2:f1 deputy:2:f0 muscle:1:f2 redshirts:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 muscle:2:f3 counselors:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 riot:1:b1 deputy:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 mule:1:f0 safecracker:1:f2 babykaiju:1:f3 pitcher:1:b1 | scorpion:2:f1 captain:3:f0 mule:1:f2 safecracker:1:f3 pitcher:1:b1 ravager:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:3:f3 ravager:1:b1 chainsaw:1:b0 safecracker:2:b2 |
| Stalker | wraith:2:f1 lurker:1:f0 commando:2:f2 vampbat:2:f3 driver:1:b1 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | spitters:1:f1 finalgirl:2:b1 gunslinger:1:b0 pilot:1:b2 skelarch:1:b3 | lookouts:1:f1 tanks:2:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:1:b2 pilot:2:b3 | rifle:1:f1 pilot:1:f0 spitters:2:f2 gunny:2:b1 finalgirl:3:b0 gunslinger:2:b2 pointguard:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 necro:1:b3 | scientist:1:f1 headcoach:1:f0 giantmoth:1:b1 queen:3:b0 necro:2:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fieldmed:2:b1 fixer:1:b0 babysitter:1:b2 droids:1:b3 | babysitter:1:f1 cheersquad:2:f0 bonesetter:2:b1 fieldmed:2:b0 fixer:2:b2 waterboy:1:b3 | cheersquad:1:f1 doc:2:f0 babysitter:2:f2 bonesetter:3:b1 fixer:3:b0 fieldmed:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

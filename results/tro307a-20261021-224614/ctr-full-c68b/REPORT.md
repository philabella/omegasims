# Counter matrix: full.html 20.80, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 17 of 36: Heist Crew > Space Opera 83% (edge +35); Army > Swarm 76% (edge +28); Kaiju > Army 77% (edge +26); Space Opera > Sportsball 83% (edge +25); Undead > Heist Crew 68% (edge +22); Kaiju > Slasher 70% (edge +21); Swarm > Undead 72% (edge +21); Slasher > Sportsball 73% (edge +20); Undead > Wild West 72% (edge +20); Army > Undead 67% (edge +18); Wild West > Army 64% (edge +15); Swarm > Heist Crew 61% (edge +14); Sportsball > Swarm 61% (edge +14); Sportsball > Kaiju 61% (edge +13); Heist Crew > Slasher 66% (edge +12); Slasher > Wild West 65% (edge +12); Space Opera > Kaiju 68% (edge +12).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 14.5 points; strength spread 47.3-55.4% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 6 of 15: Brawler > Mystic 86% (edge +20); Guardian > Stalker 66% (edge +14); Stalker > Brawler 65% (edge +14); Guardian > Gunner 65% (edge +10); Mystic > Medic 87% (edge +9); Gunner > Medic 96% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 10.5 points; strength spread 17.9-63.6% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 291/300 fights; mirror (board vs itself) side A 49.1% / 51.8% / 49.8%. Run time 8.4 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **76±5** | **67±3** | 45±6 | _36±5_ | 50±7 | _40±5_ | _23±6_ | 44±5 | 47.9% |
| **Swarm** | _24±5_ | · | **72±5** | **61±4** | 58±2 | 49±5 | 45±5 | 56±6 | _39±4_ | 50.3% |
| **Undead** | _33±3_ | _28±5_ | · | **68±5** | **72±4** | 43±6 | 40±4 | 59±7 | 49±6 | 49.2% |
| **Heist Crew** | 55±6 | _39±4_ | _32±5_ | · | 53±5 | **66±7** | **83±5** | 58±7 | 47±5 | 53.5% |
| **Wild West** | **64±5** | 42±2 | _28±4_ | 47±5 | · | _35±6_ | 54±5 | 54±6 | 50±4 | 47.3% |
| **Slasher** | 50±7 | 51±5 | 57±6 | _34±7_ | **65±6** | · | 41±7 | _30±7_ | **73±5** | 50.1% |
| **Space Opera** | **60±5** | 56±5 | 60±4 | _17±5_ | 46±5 | 59±7 | · | **68±7** | **83±4** | 55.4% |
| **Kaiju** | **77±6** | 44±6 | 41±7 | 42±7 | 46±6 | **70±7** | _32±7_ | · | _39±6_ | 49% |
| **Sportsball** | 56±5 | **61±4** | 51±6 | 53±5 | 50±4 | _27±5_ | _17±4_ | **61±6** | · | 47.4% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Space Opera | 55.4% | Army, Kaiju, Sportsball | Heist Crew | 16.4 |
| Heist Crew | 53.5% | Slasher, Space Opera | Swarm, Undead | 16.4 |
| Swarm | 50.3% | Undead, Heist Crew | Army, Sportsball | 14.4 |
| Slasher | 50.1% | Wild West, Sportsball | Heist Crew, Kaiju | 12.4 |
| Undead | 49.2% | Heist Crew, Wild West | Army, Swarm | 14.8 |
| Kaiju | 49% | Army, Slasher | Space Opera, Sportsball | 14.1 |
| Army | 47.9% | Swarm, Undead | Wild West, Space Opera, Kaiju | 16 |
| Sportsball | 47.4% | Swarm, Kaiju | Slasher, Space Opera | 13.8 |
| Wild West | 47.3% | Army | Undead, Slasher | 11.1 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 54±4 | **66±0** | **65±1** | **67±3** | **66±0** | 63.6% |
| **Brawler** | 46±4 | · | _35±1_ | 45±2 | **86±3** | **89±4** | 60.3% |
| **Stalker** | _34±0_ | **65±1** | · | 54±2 | **63±4** | **91±3** | 61.3% |
| **Gunner** | _35±1_ | 55±2 | 46±2 | · | **61±4** | **96±2** | 58.9% |
| **Mystic** | _33±3_ | _14±3_ | _37±4_ | _39±4_ | · | **87±3** | 43.3% |
| **Medic** | _34±0_ | _11±4_ | _9±3_ | _4±2_ | _13±3_ | · | 17.9% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _15±9_ | _28±14_ | _33±14_ | 57±14 | _34±13_ | _30±15_ | _30±15_ | 31.2% |
| **Swarm** | **70±15** | · | 52±12 | **100±1** | **95±3** | **81±11** | **83±10** | **100±0** | **87±6** | 82.7% |
| **Undead** | **85±9** | 49±12 | · | **88±7** | **88±6** | **81±11** | **87±8** | **88±7** | **76±11** | 80.2% |
| **Heist Crew** | **72±14** | _1±1_ | _12±7_ | · | 48±11 | **70±16** | **75±12** | **85±9** | _36±13_ | 49.2% |
| **Wild West** | **67±14** | _5±3_ | _12±6_ | 52±11 | · | **69±15** | **69±12** | **82±8** | 43±10 | 49% |
| **Slasher** | 43±14 | _19±11_ | _19±11_ | _30±16_ | _31±15_ | · | _29±15_ | _30±16_ | _30±15_ | 27.8% |
| **Space Opera** | **66±13** | _17±10_ | _13±8_ | _25±12_ | _31±12_ | **72±15** | · | **100±1** | 55±12 | 46.2% |
| **Kaiju** | **70±15** | _0±0_ | _13±7_ | _15±9_ | _18±8_ | **70±16** | _0±1_ | · | _4±2_ | 23.6% |
| **Sportsball** | **70±15** | _13±6_ | _24±11_ | **64±13** | 58±10 | **70±15** | 45±12 | **97±2** | · | 54.6% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm, Undead.
- **Genres that counter nothing** (no 60%+ matchup): Army, Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 10 of 36: Kaiju > Army 70% (edge +29); Kaiju > Slasher 70% (edge +26); Space Opera > Kaiju 100% (edge +25); Heist Crew > Space Opera 75% (edge +22); Sportsball > Kaiju 97% (edge +17); Wild West > Space Opera 69% (edge +16); Swarm > Heist Crew 100% (edge +16); Swarm > Wild West 95% (edge +11); Sportsball > Heist Crew 64% (edge +9); Heist Crew > Kaiju 85% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.7 points; strength spread 23.6-82.7% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **98±2** | **100±1** | **87±7** | **74±7** | _40±14_ | **85±5** | _3±2_ | **98±2** | 72.8% |
| **Swarm** | _2±2_ | · | **77±8** | **76±10** | **76±6** | **65±10** | 51±11 | _27±13_ | _29±11_ | 50.2% |
| **Undead** | _1±1_ | _24±8_ | · | 51±10 | **87±5** | 41±14 | _4±2_ | _19±13_ | 43±13 | 33.3% |
| **Heist Crew** | _13±7_ | _24±10_ | 49±10 | · | **82±4** | 44±14 | **90±5** | _20±13_ | **88±7** | 51.1% |
| **Wild West** | _26±7_ | _24±6_ | _13±5_ | _18±4_ | · | _13±8_ | _27±7_ | _11±7_ | 43±6 | 22.2% |
| **Slasher** | **60±14** | _35±10_ | 59±14 | 56±14 | **87±8** | · | 49±12 | _19±10_ | **100±1** | 58.1% |
| **Space Opera** | _15±5_ | 50±11 | **97±2** | _10±5_ | **73±7** | 51±12 | · | _36±14_ | **100±0** | 53.7% |
| **Kaiju** | **97±2** | **73±13** | **81±13** | **80±13** | **89±7** | **81±10** | **64±14** | · | **83±11** | 80.5% |
| **Sportsball** | _2±2_ | **71±11** | 58±13 | _12±7_ | 57±6 | _1±1_ | _0±0_ | _17±11_ | · | 27.3% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 17 of 36: Sportsball > Swarm 71% (edge +43); Heist Crew > Space Opera 90% (edge +42); Kaiju > Army 97% (edge +37); Swarm > Heist Crew 76% (edge +27); Space Opera > Undead 97% (edge +27); Slasher > Army 60% (edge +26); Army > Swarm 98% (edge +25); Space Opera > Sportsball 100% (edge +24); Undead > Wild West 87% (edge +23); Swarm > Slasher 65% (edge +23); Slasher > Sportsball 100% (edge +20); Army > Space Opera 85% (edge +15); Army > Heist Crew 87% (edge +15); Army > Undead 100% (edge +15); Heist Crew > Sportsball 88% (edge +14); Army > Sportsball 98% (edge +10); Swarm > Undead 77% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 18.6 points; strength spread 22.2-80.5% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **100±1** | **85±6** | _21±8_ | _0±0_ | 53±10 | _1±1_ | _35±12_ | _5±2_ | 38.2% |
| **Swarm** | _1±1_ | · | **87±6** | _6±4_ | _3±2_ | _0±0_ | _0±0_ | 41±14 | _1±1_ | 19.4% |
| **Undead** | _15±6_ | _13±6_ | · | **65±8** | 41±8 | _7±3_ | _30±9_ | **70±15** | _28±9_ | 34.2% |
| **Heist Crew** | **79±8** | **94±4** | _35±8_ | · | _28±7_ | **83±8** | **83±9** | **69±15** | _16±6_ | 61.2% |
| **Wild West** | **100±0** | **97±2** | 59±8 | **72±7** | · | _23±5_ | **68±5** | **70±15** | **64±6** | 68.8% |
| **Slasher** | 47±10 | **100±0** | **93±3** | _17±8_ | **78±5** | · | 45±10 | 41±12 | **89±3** | 63.5% |
| **Space Opera** | **99±1** | **100±0** | **70±9** | _17±9_ | _32±5_ | 55±10 | · | **69±15** | **94±3** | 66.6% |
| **Kaiju** | **65±12** | 60±14 | _30±15_ | _31±15_ | _30±15_ | 60±12 | _31±15_ | · | _30±15_ | 42.5% |
| **Sportsball** | **95±2** | **99±1** | **72±9** | **84±6** | _36±6_ | _11±3_ | _6±3_ | **70±15** | · | 59.2% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 21 of 36: Swarm > Undead 87% (edge +55); Undead > Heist Crew 65% (edge +40); Heist Crew > Space Opera 83% (edge +39); Space Opera > Sportsball 94% (edge +36); Heist Crew > Slasher 83% (edge +36); Sportsball > Heist Crew 84% (edge +36); Slasher > Sportsball 89% (edge +35); Slasher > Wild West 78% (edge +33); Army > Undead 85% (edge +31); Undead > Kaiju 70% (edge +29); Army > Swarm 100% (edge +27); Sportsball > Army 95% (edge +25); Space Opera > Army 99% (edge +23); Wild West > Army 100% (edge +21); Slasher > Undead 93% (edge +16); Wild West > Space Opera 68% (edge +15); Wild West > Heist Crew 72% (edge +14); Sportsball > Swarm 99% (edge +13); Slasher > Swarm 100% (edge +11); Kaiju > Army 65% (edge +11); Space Opera > Swarm 100% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 23.7 points; strength spread 19.4-68.8% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | riot:1:f1 mule:1:f0 commando:1:f2 fieldmed:2:b1 radio:1:b0 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:1:f0 mule:2:f2 commando:1:f3 gunny:2:b1 radio:2:b0 rifle:1:b2 |
| Swarm | beetles:1:f1 ravager:2:f0 lurker:2:f2 queen:1:b1 nurse:1:b0 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | beetles:2:f1 scorpion:3:f0 ravager:1:f2 lurker:2:f3 hivemind:2:b1 queen:1:b0 nurse:1:b2 |
| Undead | gravegolem:2:f1 zombies:1:f0 vampbat:1:f2 necro:1:b1 skelarch:1:b0 | gravegolem:3:f1 zombies:2:f0 wraith:2:f2 vampbat:1:f3 bonesetter:1:b1 necro:1:b0 | gravegolem:2:f1 bonedragon:2:f0 zombies:2:f2 wraith:2:f3 bonesetter:1:b1 necro:2:b0 vampbat:2:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 fixer:2:b1 hacker:2:b0 lookouts:1:b2 | insideman:3:f1 muscle:2:f0 safecracker:1:f2 mastermind:2:b1 fixer:1:b0 hacker:2:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:1:f1 deputy:2:f0 gunslinger:3:b1 prospector:1:b0 doc:2:b2 bounty:2:b3 | sheriff:3:f1 deputy:2:f0 bounty:2:f2 gunslinger:1:b1 prospector:1:b0 doc:1:b2 noname:2:b3 |
| Slasher | counselors:1:f1 chainsaw:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:1:f0 chainsaw:2:f2 kids:1:f3 finalgirl:3:b1 exorcist:2:b0 | brute:2:f1 counselors:2:f0 kids:2:f2 dreamstalker:2:b1 finalgirl:3:b0 exorcist:1:b2 babysitter:1:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 pilot:1:b0 smuggler:1:b2 | starknight:2:f1 redshirts:1:f0 captain:3:f2 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 pilot:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 tanks:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | dodgeball:1:f1 headcoach:2:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:1:f0 headcoach:3:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:3:f1 dodgeball:2:f0 pitcher:2:f2 headcoach:1:b1 waterboy:1:b0 cheersquad:2:b2 qb:2:b3 |
| Guardian | gravegolem:2:f1 deputy:2:f0 muscle:1:f2 redshirts:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 muscle:2:f3 counselors:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 riot:1:b1 deputy:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 mule:1:f0 safecracker:1:f2 babykaiju:1:f3 pitcher:1:b1 | scorpion:2:f1 captain:3:f0 mule:1:f2 safecracker:1:f3 pitcher:1:b1 ravager:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:3:f3 ravager:1:b1 chainsaw:1:b0 safecracker:2:b2 |
| Stalker | wraith:2:f1 lurker:1:f0 commando:2:f2 vampbat:2:f3 driver:1:b1 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | spitters:1:f1 finalgirl:2:b1 gunslinger:1:b0 pilot:1:b2 skelarch:1:b3 | lookouts:1:f1 tanks:2:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:1:b2 pilot:2:b3 | rifle:1:f1 pilot:1:f0 spitters:2:f2 gunny:2:b1 finalgirl:3:b0 gunslinger:2:b2 pointguard:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 necro:1:b3 | scientist:1:f1 necro:1:f0 giantmoth:2:b1 queen:3:b0 headcoach:1:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fieldmed:2:b1 fixer:1:b0 babysitter:1:b2 droids:1:b3 | babysitter:1:f1 cheersquad:2:f0 bonesetter:2:b1 fieldmed:2:b0 fixer:2:b2 waterboy:1:b3 | cheersquad:1:f1 doc:2:f0 babysitter:2:f2 bonesetter:3:b1 fixer:3:b0 fieldmed:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

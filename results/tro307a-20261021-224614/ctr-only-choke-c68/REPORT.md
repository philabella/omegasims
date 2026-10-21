# Counter matrix: only-choke.html 20.80, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 16 of 36: Heist Crew > Space Opera 77% (edge +30); Army > Swarm 76% (edge +28); Kaiju > Army 77% (edge +25); Space Opera > Sportsball 83% (edge +25); Undead > Heist Crew 73% (edge +24); Undead > Wild West 79% (edge +24); Army > Undead 66% (edge +20); Kaiju > Slasher 66% (edge +19); Swarm > Undead 66% (edge +18); Sportsball > Swarm 64% (edge +17); Slasher > Sportsball 71% (edge +16); Wild West > Army 63% (edge +15); Swarm > Heist Crew 62% (edge +15); Slasher > Wild West 68% (edge +11); Space Opera > Kaiju 68% (edge +11); Heist Crew > Slasher 61% (edge +11).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 14.1 points; strength spread 45.8-55.4% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 5 of 15: Brawler > Mystic 89% (edge +23); Stalker > Brawler 66% (edge +18); Guardian > Stalker 65% (edge +16); Guardian > Gunner 65% (edge +10); Gunner > Medic 99% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 12.1 points; strength spread 13-64.5% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 286/300 fights; mirror (board vs itself) side A 49.5% / 49.8% / 50.6%. Run time 11.7 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **76±5** | **66±4** | 44±5 | _37±5_ | 46±7 | 40±4 | _23±7_ | 45±5 | 47.5% |
| **Swarm** | _24±5_ | · | **66±6** | **62±4** | 56±2 | 52±5 | 44±5 | 57±6 | _36±4_ | 49.5% |
| **Undead** | _34±4_ | _34±6_ | · | **73±5** | **79±4** | 42±6 | 40±4 | 58±7 | 53±6 | 51.5% |
| **Heist Crew** | 55±5 | _38±4_ | _27±5_ | · | 57±4 | **61±8** | **77±6** | 60±7 | 46±6 | 52.3% |
| **Wild West** | **63±5** | 44±2 | _21±4_ | 43±4 | · | _32±5_ | 53±6 | 54±6 | 51±5 | 45.8% |
| **Slasher** | 54±7 | 48±5 | 58±6 | _39±8_ | **68±5** | · | 49±7 | _34±8_ | **71±5** | 52.4% |
| **Space Opera** | 60±4 | 56±5 | 60±4 | _23±6_ | 47±6 | 51±7 | · | **68±7** | **83±5** | 55.4% |
| **Kaiju** | **77±7** | 44±6 | 42±7 | 40±7 | 46±6 | **66±8** | _32±7_ | · | 43±6 | 48.9% |
| **Sportsball** | 55±5 | **64±4** | 47±6 | 54±6 | 49±5 | _29±5_ | _17±5_ | 57±6 | · | 46.9% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Space Opera | 55.4% | Kaiju, Sportsball | Heist Crew | 15.1 |
| Slasher | 52.4% | Wild West, Sportsball | Heist Crew, Kaiju | 10.9 |
| Heist Crew | 52.3% | Slasher, Space Opera | Swarm, Undead | 15.5 |
| Undead | 51.5% | Heist Crew, Wild West | Army, Swarm | 15.7 |
| Swarm | 49.5% | Undead, Heist Crew | Army, Sportsball | 14.3 |
| Kaiju | 48.9% | Army, Slasher | Space Opera | 13.1 |
| Army | 47.5% | Swarm, Undead | Wild West, Kaiju | 16.2 |
| Sportsball | 46.9% | Swarm | Slasher, Space Opera | 13.1 |
| Wild West | 45.8% | Army | Undead, Slasher | 11.8 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 53±4 | **65±1** | **65±1** | 59±3 | **67±0** | 62.6% |
| **Brawler** | 47±4 | · | _34±0_ | 51±3 | **89±3** | **100±0** | 64.5% |
| **Stalker** | _35±1_ | **66±0** | · | 53±2 | 59±4 | **98±1** | 62.9% |
| **Gunner** | _35±1_ | 49±3 | 47±2 | · | 53±4 | **99±1** | 57.9% |
| **Mystic** | 41±3 | _11±3_ | 41±4 | 47±4 | · | **93±2** | 48.6% |
| **Medic** | _34±0_ | _0±0_ | _2±1_ | _1±1_ | _7±2_ | · | 13% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _16±9_ | _30±13_ | _36±13_ | **61±13** | _33±12_ | _32±14_ | _30±14_ | 32.5% |
| **Swarm** | **70±15** | · | 46±13 | **99±1** | **93±3** | **80±11** | **82±12** | **100±0** | **84±8** | 81.3% |
| **Undead** | **84±9** | 54±13 | · | **87±7** | **87±6** | **81±10** | **87±9** | **90±7** | **76±10** | 80.7% |
| **Heist Crew** | **70±13** | _1±1_ | _13±7_ | · | 47±10 | **70±14** | **66±12** | **89±6** | _38±12_ | 48.6% |
| **Wild West** | **64±13** | _7±3_ | _13±6_ | 54±10 | · | **69±14** | **67±12** | **83±7** | 42±11 | 49.2% |
| **Slasher** | _39±13_ | _20±11_ | _19±10_ | _30±14_ | _31±14_ | · | _29±13_ | _31±14_ | _31±14_ | 27.8% |
| **Space Opera** | **67±12** | _18±12_ | _13±9_ | _34±12_ | _34±12_ | **71±13** | · | **99±1** | 54±14 | 47.9% |
| **Kaiju** | **68±14** | _0±0_ | _10±7_ | _11±6_ | _17±7_ | **69±14** | _1±1_ | · | _4±2_ | 22.4% |
| **Sportsball** | **70±14** | _16±8_ | _24±10_ | **63±12** | 58±11 | **69±14** | 46±14 | **96±2** | · | 54.8% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm, Undead.
- **Genres that counter nothing** (no 60%+ matchup): Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 9 of 36: Kaiju > Army 68% (edge +30); Kaiju > Slasher 69% (edge +26); Space Opera > Kaiju 99% (edge +23); Swarm > Heist Crew 99% (edge +17); Sportsball > Kaiju 96% (edge +16); Heist Crew > Space Opera 66% (edge +15); Wild West > Space Opera 67% (edge +15); Heist Crew > Kaiju 89% (edge +13); Swarm > Wild West 93% (edge +11).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.3 points; strength spread 22.4-81.3% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **98±2** | **100±0** | **87±7** | **72±8** | _39±15_ | **87±5** | _3±2_ | **99±2** | 72.5% |
| **Swarm** | _2±2_ | · | **76±9** | **73±11** | **71±6** | **75±9** | 51±12 | _24±11_ | _22±8_ | 49% |
| **Undead** | _0±0_ | _24±9_ | · | 59±11 | **93±3** | 40±14 | _8±4_ | _19±12_ | 40±12 | 35.4% |
| **Heist Crew** | _13±7_ | _27±11_ | 41±11 | · | **83±5** | 43±14 | **96±2** | _20±12_ | **80±8** | 50.1% |
| **Wild West** | _28±8_ | _29±6_ | _7±3_ | _17±5_ | · | _8±4_ | _29±8_ | _11±7_ | 46±7 | 22.1% |
| **Slasher** | **61±15** | _26±9_ | 60±14 | 58±14 | **92±4** | · | 57±12 | _21±11_ | **97±4** | 58.8% |
| **Space Opera** | _13±5_ | 49±12 | **92±4** | _5±2_ | **71±8** | 43±12 | · | _34±13_ | **100±0** | 50.6% |
| **Kaiju** | **97±2** | **76±11** | **81±12** | **80±12** | **89±7** | **79±11** | **66±13** | · | **84±10** | 80.7% |
| **Sportsball** | _2±2_ | **78±8** | 60±12 | _20±8_ | 54±7 | _4±4_ | _0±0_ | _16±10_ | · | 29.2% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 18 of 36: Sportsball > Swarm 78% (edge +48); Heist Crew > Space Opera 96% (edge +46); Kaiju > Army 97% (edge +36); Swarm > Slasher 75% (edge +34); Space Opera > Sportsball 100% (edge +28); Undead > Wild West 93% (edge +27); Space Opera > Undead 92% (edge +27); Slasher > Army 61% (edge +26); Army > Swarm 98% (edge +25); Swarm > Heist Crew 73% (edge +24); Slasher > Sportsball 97% (edge +19); Army > Undead 100% (edge +16); Army > Space Opera 87% (edge +14); Army > Heist Crew 87% (edge +14); Swarm > Undead 76% (edge +12); Army > Sportsball 99% (edge +12); Heist Crew > Sportsball 80% (edge +9); Slasher > Wild West 92% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 19.9 points; strength spread 22.1-80.7% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **99±1** | **84±6** | _17±7_ | _1±1_ | _39±10_ | _2±1_ | _35±13_ | _5±3_ | 35.8% |
| **Swarm** | _1±1_ | · | **75±9** | _14±6_ | _3±2_ | _0±0_ | _0±0_ | 46±14 | _0±1_ | 19.5% |
| **Undead** | _16±6_ | _25±9_ | · | **73±7** | 58±9 | _4±2_ | _26±8_ | **65±15** | 44±10 | 39.1% |
| **Heist Crew** | **83±7** | **86±6** | _27±7_ | · | 41±7 | **71±11** | **69±12** | **70±15** | _20±8_ | 58.5% |
| **Wild West** | **99±1** | **97±2** | 42±9 | 59±7 | · | _19±6_ | **63±8** | **68±15** | **65±8** | 64.1% |
| **Slasher** | **61±10** | **100±0** | **97±2** | _29±11_ | **81±6** | · | 60±9 | 51±14 | **86±6** | 70% |
| **Space Opera** | **98±1** | **100±0** | **75±8** | _31±12_ | _37±8_ | 40±9 | · | **70±15** | **96±3** | 67.9% |
| **Kaiju** | **65±13** | 55±14 | _36±15_ | _30±15_ | _32±15_ | 50±14 | _30±15_ | · | 42±14 | 42.8% |
| **Sportsball** | **95±3** | **100±1** | 56±10 | **80±8** | _35±8_ | _14±6_ | _4±3_ | 58±14 | · | 55.4% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 21 of 36: Swarm > Undead 75% (edge +48); Undead > Heist Crew 73% (edge +42); Army > Undead 84% (edge +37); Sportsball > Heist Crew 80% (edge +34); Heist Crew > Slasher 71% (edge +33); Space Opera > Sportsball 96% (edge +33); Army > Swarm 99% (edge +29); Heist Crew > Space Opera 69% (edge +29); Sportsball > Army 95% (edge +26); Slasher > Wild West 81% (edge +24); Wild West > Army 99% (edge +22); Slasher > Sportsball 86% (edge +21); Space Opera > Army 98% (edge +19); Undead > Kaiju 65% (edge +18); Slasher > Undead 97% (edge +18); Wild West > Space Opera 63% (edge +17); Sportsball > Swarm 100% (edge +15); Heist Crew > Army 83% (edge +11); Space Opera > Swarm 100% (edge +9); Wild West > Swarm 97% (edge +9); Slasher > Swarm 100% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 21.9 points; strength spread 19.5-70% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | mule:1:f1 commando:1:f0 fieldmed:2:b1 radio:1:b0 rifle:1:b2 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:2:f0 mule:2:f2 gunny:1:b1 fieldmed:2:b0 radio:2:b2 rifle:2:b3 |
| Swarm | beetles:1:f1 lurker:1:f0 queen:2:b1 nurse:1:b0 spitters:1:b2 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | scorpion:3:f1 ravager:1:f0 lurker:1:f2 hivemind:2:b1 queen:2:b0 nurse:1:b2 spitters:1:b3 |
| Undead | gravegolem:1:f1 zombies:1:f0 vampbat:1:f2 necro:2:b1 skelarch:1:b0 | gravegolem:3:f1 zombies:1:f0 wraith:2:f2 vampbat:2:f3 bonesetter:1:b1 necro:1:b0 | bonedragon:2:f1 zombies:1:f0 wraith:2:f2 vampbat:1:f3 bonesetter:2:b1 necro:3:b0 skelarch:1:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:1:f2 driver:1:f3 fixer:3:b1 hacker:1:b0 | insideman:3:f1 muscle:2:f0 safecracker:2:f2 mastermind:2:b1 fixer:1:b0 hacker:1:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:2:f1 deputy:1:f0 outlaws:1:b1 gunslinger:3:b0 prospector:1:b2 bounty:1:b3 | sheriff:1:f1 deputy:2:f0 bounty:1:f2 gunslinger:3:b1 prospector:2:b0 doc:2:b2 noname:2:b3 |
| Slasher | chainsaw:1:f1 kids:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:2:f0 chainsaw:2:f2 finalgirl:3:b1 exorcist:1:b0 babysitter:2:b2 | brute:2:f1 counselors:1:f0 kids:1:f2 dreamstalker:2:b1 finalgirl:3:b0 exorcist:2:b2 babysitter:1:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 pilot:1:b0 smuggler:1:b2 | starknight:1:f1 redshirts:2:f0 captain:3:f2 telepath:1:b1 pilot:2:b0 smuggler:2:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 droids:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 reporter:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | dodgeball:1:f1 headcoach:2:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:2:f0 pitcher:2:b1 headcoach:2:b0 waterboy:2:b2 cheersquad:2:b3 | mascot:3:f1 dodgeball:2:f0 qb:2:f2 headcoach:1:b1 pointguard:2:b0 waterboy:1:b2 cheersquad:1:b3 |
| Guardian | gravegolem:2:f1 muscle:2:f0 counselors:1:f2 redshirts:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 deputy:2:f3 riot:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 deputy:1:b1 riot:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 zombies:2:f0 ravager:1:f2 outlaws:1:b1 pitcher:1:b0 | scorpion:2:f1 captain:3:f0 ravager:2:f2 babykaiju:1:f3 outlaws:1:b1 zombies:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:2:f3 safecracker:2:b1 mule:2:b0 chainsaw:2:b2 |
| Stalker | lurker:1:f1 wraith:1:f0 vampbat:2:f2 smuggler:2:b1 bounty:1:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | skelarch:1:f1 finalgirl:2:b1 gunslinger:1:b0 lookouts:1:b2 pilot:1:b3 | spitters:1:f1 tanks:2:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:1:b2 pilot:2:b3 | spitters:2:f1 rifle:2:f0 pilot:2:f2 gunny:1:b1 finalgirl:3:b0 gunslinger:3:b2 pointguard:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 headcoach:1:b3 | scientist:2:f1 giantmoth:2:b1 queen:3:b0 necro:1:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fixer:2:b1 nurse:1:b0 waterboy:1:b2 cheersquad:1:b3 | doc:1:f1 babysitter:1:f0 bonesetter:1:b1 fieldmed:3:b0 fixer:2:b2 reporter:2:b3 | cheersquad:1:f1 reporter:2:f0 doc:2:f2 bonesetter:3:b1 fieldmed:3:b0 fixer:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

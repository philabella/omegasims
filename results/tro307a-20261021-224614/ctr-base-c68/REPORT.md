# Counter matrix: base.html 20.80, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 16 of 36: Army > Swarm 76% (edge +27); Heist Crew > Space Opera 73% (edge +27); Kaiju > Army 77% (edge +26); Space Opera > Sportsball 82% (edge +26); Undead > Heist Crew 74% (edge +23); Undead > Wild West 78% (edge +23); Kaiju > Slasher 67% (edge +20); Army > Undead 65% (edge +19); Wild West > Space Opera 62% (edge +19); Swarm > Undead 65% (edge +18); Slasher > Sportsball 71% (edge +17); Sportsball > Swarm 64% (edge +16); Swarm > Heist Crew 64% (edge +15); Wild West > Army 63% (edge +14); Slasher > Wild West 68% (edge +13); Space Opera > Kaiju 68% (edge +12).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 14.1 points; strength spread 46.8-54.5% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 5 of 15: Brawler > Mystic 89% (edge +23); Stalker > Brawler 66% (edge +17); Guardian > Stalker 65% (edge +16); Guardian > Gunner 65% (edge +10); Gunner > Medic 99% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 12.1 points; strength spread 12.9-64.5% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 286/300 fights; mirror (board vs itself) side A 49.5% / 49.8% / 49.2%. Run time 6.3 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **76±5** | **65±3** | 45±6 | _37±5_ | 49±8 | 43±5 | _23±6_ | 44±5 | 47.9% |
| **Swarm** | _24±5_ | · | **65±6** | **64±5** | 56±2 | 52±5 | 44±5 | 57±6 | _36±4_ | 49.7% |
| **Undead** | _35±3_ | _35±6_ | · | **74±5** | **78±4** | 42±6 | 42±4 | 58±7 | 53±6 | 51.7% |
| **Heist Crew** | 55±6 | _36±5_ | _26±5_ | · | 56±4 | 59±8 | **73±6** | 60±7 | 43±5 | 51.1% |
| **Wild West** | **63±5** | 44±2 | _22±4_ | 44±4 | · | _32±5_ | **62±5** | 54±6 | 50±5 | 46.8% |
| **Slasher** | 51±8 | 48±5 | 58±6 | 41±8 | **68±5** | · | 46±7 | _33±7_ | **71±5** | 51.8% |
| **Space Opera** | 57±5 | 56±5 | 58±4 | _27±6_ | _38±5_ | 54±7 | · | **68±7** | **82±5** | 54.5% |
| **Kaiju** | **77±6** | 43±6 | 42±7 | 40±7 | 46±6 | **67±7** | _32±7_ | · | 42±6 | 48.9% |
| **Sportsball** | 56±5 | **64±4** | 47±6 | 57±5 | 50±5 | _29±5_ | _18±5_ | 58±6 | · | 47.7% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Space Opera | 54.5% | Kaiju, Sportsball | Heist Crew, Wild West | 15.4 |
| Slasher | 51.8% | Wild West, Sportsball | Kaiju | 11.4 |
| Undead | 51.7% | Heist Crew, Wild West | Army, Swarm | 15.1 |
| Heist Crew | 51.1% | Space Opera | Swarm, Undead | 14.7 |
| Swarm | 49.7% | Undead, Heist Crew | Army, Sportsball | 14.2 |
| Kaiju | 48.9% | Army, Slasher | Space Opera | 13.5 |
| Army | 47.9% | Swarm, Undead | Wild West, Kaiju | 16 |
| Sportsball | 47.7% | Swarm | Slasher, Space Opera | 13.4 |
| Wild West | 46.8% | Army, Space Opera | Undead, Slasher | 12.8 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 53±4 | **65±1** | **65±1** | 59±3 | **66±0** | 62.6% |
| **Brawler** | 47±4 | · | _34±0_ | 51±3 | **89±3** | **100±0** | 64.5% |
| **Stalker** | _35±1_ | **66±0** | · | 53±2 | **60±4** | **98±1** | 63.2% |
| **Gunner** | _35±1_ | 49±3 | 47±2 | · | 53±4 | **99±1** | 57.9% |
| **Mystic** | 41±3 | _11±3_ | _40±4_ | 47±4 | · | **93±2** | 48.4% |
| **Medic** | _34±0_ | _0±0_ | _2±1_ | _1±1_ | _7±2_ | · | 12.9% |


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
| **Army** | · | **99±1** | **81±6** | _20±8_ | _2±1_ | 46±11 | _8±5_ | _34±13_ | _4±2_ | 37.1% |
| **Swarm** | _1±1_ | · | **74±8** | _19±8_ | _3±2_ | _0±0_ | _0±0_ | 46±14 | _0±0_ | 20.3% |
| **Undead** | _19±6_ | _26±8_ | · | **75±7** | 53±9 | _4±2_ | _32±8_ | **64±15** | 43±10 | 40.1% |
| **Heist Crew** | **80±8** | **81±8** | _25±7_ | · | _40±7_ | **66±12** | 59±12 | **70±15** | _12±6_ | 54.3% |
| **Wild West** | **98±1** | **97±2** | 47±9 | **61±7** | · | _20±5_ | **90±5** | **68±15** | **61±8** | 67.3% |
| **Slasher** | 55±11 | **100±0** | **96±2** | _34±12_ | **80±5** | · | 51±11 | 47±14 | **87±6** | 68.1% |
| **Space Opera** | **92±5** | **100±0** | **68±8** | 41±12 | _11±5_ | 49±11 | · | **69±15** | **93±4** | 64.9% |
| **Kaiju** | **66±13** | 54±14 | _36±15_ | _30±15_ | _32±15_ | 53±14 | _31±15_ | · | _37±15_ | 42.8% |
| **Sportsball** | **96±2** | **100±0** | 57±10 | **88±6** | _39±8_ | _14±6_ | _7±4_ | **63±15** | · | 57.9% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 21 of 36: Swarm > Undead 74% (edge +47); Undead > Heist Crew 75% (edge +39); Wild West > Space Opera 90% (edge +37); Space Opera > Sportsball 93% (edge +35); Sportsball > Heist Crew 88% (edge +34); Army > Undead 81% (edge +34); Heist Crew > Slasher 66% (edge +30); Slasher > Wild West 80% (edge +29); Army > Swarm 99% (edge +29); Sportsball > Army 96% (edge +26); Slasher > Sportsball 87% (edge +26); Wild West > Army 98% (edge +20); Slasher > Undead 96% (edge +20); Undead > Kaiju 64% (edge +17); Space Opera > Army 92% (edge +16); Sportsball > Swarm 100% (edge +15); Heist Crew > Army 80% (edge +13); Space Opera > Swarm 100% (edge +11); Kaiju > Army 66% (edge +10); Slasher > Swarm 100% (edge +10); Heist Crew > Kaiju 70% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 22.3 points; strength spread 20.3-68.1% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | mule:1:f1 commando:1:f0 fieldmed:2:b1 radio:1:b0 rifle:1:b2 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:2:f1 riot:1:f0 mule:2:f2 commando:1:f3 gunny:2:b1 fieldmed:3:b0 rifle:1:b2 |
| Swarm | beetles:1:f1 lurker:1:f0 queen:2:b1 nurse:1:b0 spitters:1:b2 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | scorpion:3:f1 ravager:1:f0 lurker:1:f2 hivemind:2:b1 queen:2:b0 nurse:1:b2 spitters:1:b3 |
| Undead | gravegolem:1:f1 zombies:1:f0 vampbat:1:f2 necro:2:b1 skelarch:1:b0 | gravegolem:3:f1 zombies:1:f0 wraith:2:f2 vampbat:2:f3 bonesetter:1:b1 necro:1:b0 | bonedragon:2:f1 zombies:1:f0 wraith:2:f2 vampbat:1:f3 bonesetter:2:b1 necro:3:b0 skelarch:1:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:1:f2 driver:1:f3 fixer:3:b1 hacker:1:b0 | insideman:3:f1 muscle:2:f0 safecracker:2:f2 mastermind:2:b1 fixer:1:b0 hacker:1:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:2:f1 deputy:1:f0 outlaws:1:b1 gunslinger:3:b0 prospector:1:b2 bounty:1:b3 | sheriff:3:f1 deputy:2:f0 bounty:2:f2 gunslinger:2:b1 prospector:2:b0 doc:2:b2 noname:1:b3 |
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

# Counter matrix: only-spit.html 20.82, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 17 of 36: Army > Swarm 76% (edge +27); Heist Crew > Space Opera 77% (edge +27); Space Opera > Sportsball 82% (edge +26); Kaiju > Army 77% (edge +25); Undead > Wild West 79% (edge +24); Kaiju > Slasher 70% (edge +21); Undead > Heist Crew 70% (edge +21); Swarm > Undead 68% (edge +20); Wild West > Space Opera 64% (edge +20); Army > Undead 66% (edge +20); Slasher > Sportsball 72% (edge +18); Sportsball > Swarm 64% (edge +17); Swarm > Heist Crew 62% (edge +15); Wild West > Army 64% (edge +15); Slasher > Wild West 68% (edge +14); Space Opera > Kaiju 67% (edge +13); Heist Crew > Slasher 62% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 14.4 points; strength spread 46.8-53.1% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 5 of 15: Brawler > Mystic 88% (edge +23); Stalker > Brawler 66% (edge +17); Guardian > Stalker 65% (edge +15); Guardian > Gunner 65% (edge +10); Gunner > Medic 99% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 12 points; strength spread 13-63.9% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 286/300 fights; mirror (board vs itself) side A 49.4% / 50.1% / 49.9%. Run time 12.1 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **76±5** | **66±4** | 42±5 | _36±5_ | 49±8 | 45±5 | _23±6_ | 45±5 | 48% |
| **Swarm** | _24±5_ | · | **68±6** | **62±5** | 56±3 | 51±5 | 45±5 | 56±6 | _36±4_ | 49.7% |
| **Undead** | _35±4_ | _32±6_ | · | **70±5** | **79±4** | 44±6 | 48±5 | 58±7 | 55±7 | 52.2% |
| **Heist Crew** | 58±5 | _38±5_ | _30±5_ | · | 57±4 | **62±8** | **77±6** | 60±7 | 46±6 | 53% |
| **Wild West** | **64±5** | 44±3 | _21±4_ | 43±4 | · | _32±5_ | **64±5** | 54±6 | 51±5 | 47% |
| **Slasher** | 51±8 | 49±5 | 57±6 | _38±8_ | **68±5** | · | 43±7 | _30±7_ | **72±5** | 50.7% |
| **Space Opera** | 55±5 | 55±5 | 53±5 | _23±6_ | _36±5_ | 57±7 | · | **67±7** | **82±5** | 53.1% |
| **Kaiju** | **77±6** | 44±6 | 42±7 | 40±7 | 46±6 | **70±7** | _33±7_ | · | 43±6 | 49.5% |
| **Sportsball** | 56±5 | **64±4** | 45±7 | 54±6 | 49±5 | _29±5_ | _18±5_ | 57±6 | · | 46.8% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Space Opera | 53.1% | Kaiju, Sportsball | Heist Crew, Wild West | 15.7 |
| Heist Crew | 53% | Slasher, Space Opera | Swarm, Undead | 14.3 |
| Undead | 52.2% | Heist Crew, Wild West | Army, Swarm | 15.3 |
| Slasher | 50.7% | Wild West, Sportsball | Heist Crew, Kaiju | 12 |
| Swarm | 49.7% | Undead, Heist Crew | Army, Sportsball | 14.8 |
| Kaiju | 49.5% | Army, Slasher | Space Opera | 13.7 |
| Army | 48% | Swarm, Undead | Wild West, Kaiju | 16 |
| Wild West | 47% | Army, Space Opera | Undead, Slasher | 13.3 |
| Sportsball | 46.8% | Swarm | Slasher, Space Opera | 13.8 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 55±4 | **65±1** | **65±1** | 59±3 | **66±0** | 63% |
| **Brawler** | 45±4 | · | _34±0_ | 51±3 | **88±3** | **100±0** | 63.9% |
| **Stalker** | _35±1_ | **66±0** | · | 52±2 | 60±4 | **98±1** | 63% |
| **Gunner** | _35±1_ | 49±3 | 48±2 | · | 53±4 | **99±1** | 58% |
| **Mystic** | 41±3 | _12±3_ | 40±4 | 47±4 | · | **92±2** | 48.5% |
| **Medic** | _34±0_ | _0±0_ | _2±1_ | _1±1_ | _8±2_ | · | 13% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _16±9_ | _30±14_ | _36±13_ | 60±13 | _34±12_ | _33±14_ | _30±14_ | 32.4% |
| **Swarm** | **70±15** | · | 47±13 | **100±0** | **94±3** | **80±11** | **82±12** | **100±0** | **84±8** | 81.5% |
| **Undead** | **84±9** | 53±13 | · | **88±6** | **87±6** | **82±10** | **87±9** | **90±7** | **76±10** | 80.8% |
| **Heist Crew** | **70±14** | _0±0_ | _12±6_ | · | 46±10 | **70±14** | **70±13** | **89±6** | _33±11_ | 48.2% |
| **Wild West** | **64±13** | _7±3_ | _13±6_ | 54±10 | · | **69±14** | **66±13** | **83±7** | 42±11 | 49.1% |
| **Slasher** | 40±13 | _20±11_ | _18±10_ | _30±14_ | _31±14_ | · | _28±13_ | _31±14_ | _30±14_ | 27.9% |
| **Space Opera** | **66±12** | _19±12_ | _13±9_ | _30±13_ | _34±13_ | **72±13** | · | **99±1** | 54±14 | 47.6% |
| **Kaiju** | **67±14** | _0±0_ | _10±7_ | _11±6_ | _17±7_ | **69±14** | _1±1_ | · | _4±2_ | 22.3% |
| **Sportsball** | **70±14** | _16±8_ | _24±10_ | **67±11** | 58±11 | **70±14** | 46±14 | **96±2** | · | 55.4% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm, Undead.
- **Genres that counter nothing** (no 60%+ matchup): Army, Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 10 of 36: Kaiju > Army 67% (edge +30); Kaiju > Slasher 69% (edge +26); Space Opera > Kaiju 99% (edge +23); Heist Crew > Space Opera 70% (edge +19); Swarm > Heist Crew 100% (edge +16); Sportsball > Kaiju 96% (edge +15); Wild West > Space Opera 66% (edge +14); Heist Crew > Kaiju 89% (edge +13); Swarm > Wild West 94% (edge +12); Sportsball > Heist Crew 67% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.4 points; strength spread 22.3-81.5% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **98±2** | **100±0** | **86±7** | **72±7** | _39±15_ | **90±5** | _2±2_ | **99±2** | 72.8% |
| **Swarm** | _2±2_ | · | **80±7** | **71±12** | **71±7** | **73±9** | 53±12 | _24±11_ | _22±9_ | 49.2% |
| **Undead** | _0±0_ | _20±7_ | · | 58±10 | **94±2** | 41±14 | _14±7_ | _20±12_ | 46±13 | 36.4% |
| **Heist Crew** | _15±7_ | _29±12_ | 42±10 | · | **84±4** | 43±14 | **92±4** | _20±12_ | **85±8** | 51% |
| **Wild West** | _28±7_ | _29±7_ | _6±2_ | _16±4_ | · | _6±3_ | _35±9_ | _11±7_ | 46±7 | 22.2% |
| **Slasher** | **61±15** | _27±9_ | 59±14 | 57±14 | **94±3** | · | 56±13 | _21±10_ | **100±0** | 59.2% |
| **Space Opera** | _11±5_ | 47±12 | **86±7** | _8±4_ | **66±9** | 44±13 | · | _32±13_ | **100±0** | 48.6% |
| **Kaiju** | **98±2** | **76±11** | **80±12** | **80±12** | **89±7** | **79±10** | **68±13** | · | **84±10** | 81.2% |
| **Sportsball** | _2±2_ | **78±9** | 55±13 | _15±8_ | 54±7 | _0±0_ | _0±0_ | _16±10_ | · | 27.7% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 18 of 36: Sportsball > Swarm 78% (edge +50); Heist Crew > Space Opera 92% (edge +40); Kaiju > Army 98% (edge +36); Swarm > Slasher 73% (edge +33); Space Opera > Sportsball 100% (edge +28); Undead > Wild West 94% (edge +28); Slasher > Army 61% (edge +26); Army > Swarm 98% (edge +24); Space Opera > Undead 86% (edge +24); Swarm > Heist Crew 71% (edge +23); Slasher > Sportsball 100% (edge +20); Swarm > Undead 80% (edge +17); Army > Undead 100% (edge +17); Army > Space Opera 90% (edge +16); Army > Heist Crew 86% (edge +14); Heist Crew > Sportsball 85% (edge +12); Army > Sportsball 99% (edge +11); Slasher > Wild West 94% (edge +11).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 19.7 points; strength spread 22.2-81.2% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **99±1** | **81±6** | _12±6_ | _1±1_ | 48±11 | _12±5_ | _35±13_ | _5±3_ | 37.3% |
| **Swarm** | _1±1_ | · | **76±9** | _15±8_ | _3±2_ | _0±0_ | _0±0_ | 45±14 | _1±1_ | 20.1% |
| **Undead** | _19±6_ | _24±9_ | · | **63±8** | 56±9 | _8±4_ | 42±10 | **64±15** | 44±11 | 40.5% |
| **Heist Crew** | **88±6** | **85±8** | _37±8_ | · | 41±6 | **74±11** | **68±12** | **70±15** | _19±10_ | 60.3% |
| **Wild West** | **99±1** | **97±2** | 45±9 | 59±6 | · | _22±6_ | **91±5** | **68±15** | **64±8** | 67.6% |
| **Slasher** | 52±11 | **100±0** | **93±4** | _26±11_ | **78±6** | · | 45±11 | _37±14_ | **84±7** | 63.9% |
| **Space Opera** | **88±5** | **100±0** | 58±10 | _32±12_ | _9±5_ | 55±11 | · | **70±15** | **92±5** | 62.6% |
| **Kaiju** | **65±13** | 55±14 | _36±15_ | _30±15_ | _32±15_ | **63±14** | _31±15_ | · | 42±15 | 44.7% |
| **Sportsball** | **95±3** | **100±1** | 56±11 | **81±10** | _37±8_ | _16±7_ | _8±5_ | 58±15 | · | 56.3% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 21 of 36: Swarm > Undead 76% (edge +49); Space Opera > Sportsball 92% (edge +36); Wild West > Space Opera 91% (edge +36); Sportsball > Heist Crew 81% (edge +35); Army > Undead 81% (edge +34); Slasher > Wild West 78% (edge +32); Kaiju > Slasher 63% (edge +32); Undead > Heist Crew 63% (edge +32); Army > Swarm 99% (edge +29); Heist Crew > Slasher 74% (edge +28); Sportsball > Army 95% (edge +27); Slasher > Sportsball 84% (edge +26); Wild West > Army 99% (edge +21); Heist Crew > Space Opera 68% (edge +21); Slasher > Undead 93% (edge +20); Undead > Kaiju 64% (edge +18); Heist Crew > Army 88% (edge +16); Sportsball > Swarm 99% (edge +15); Space Opera > Army 88% (edge +14); Space Opera > Swarm 100% (edge +12); Slasher > Swarm 100% (edge +11).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 22.7 points; strength spread 20.1-67.6% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | mule:1:f1 commando:1:f0 fieldmed:2:b1 radio:1:b0 rifle:1:b2 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:2:f0 mule:2:f2 gunny:1:b1 fieldmed:2:b0 radio:2:b2 rifle:2:b3 |
| Swarm | beetles:1:f1 lurker:1:f0 queen:2:b1 nurse:1:b0 spitters:1:b2 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | scorpion:3:f1 ravager:1:f0 lurker:1:f2 hivemind:2:b1 queen:2:b0 nurse:1:b2 spitters:1:b3 |
| Undead | gravegolem:1:f1 zombies:1:f0 vampbat:1:f2 necro:2:b1 skelarch:1:b0 | gravegolem:3:f1 zombies:1:f0 wraith:2:f2 vampbat:2:f3 bonesetter:1:b1 necro:1:b0 | bonedragon:2:f1 zombies:1:f0 wraith:2:f2 vampbat:1:f3 bonesetter:2:b1 necro:3:b0 skelarch:1:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 driver:1:f3 fixer:2:b1 hacker:2:b0 | insideman:3:f1 muscle:2:f0 safecracker:2:f2 mastermind:2:b1 fixer:1:b0 hacker:1:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:2:f1 deputy:1:f0 outlaws:1:b1 gunslinger:3:b0 prospector:1:b2 bounty:1:b3 | sheriff:1:f1 deputy:2:f0 bounty:1:f2 gunslinger:3:b1 prospector:2:b0 doc:2:b2 noname:2:b3 |
| Slasher | chainsaw:1:f1 kids:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:2:f0 chainsaw:2:f2 finalgirl:3:b1 exorcist:1:b0 babysitter:2:b2 | brute:2:f1 counselors:1:f0 kids:2:f2 dreamstalker:2:b1 finalgirl:3:b0 exorcist:1:b2 babysitter:2:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 pilot:1:b0 smuggler:1:b2 | starknight:1:f1 redshirts:2:f0 captain:3:f2 telepath:1:b1 pilot:2:b0 smuggler:2:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 droids:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 reporter:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | dodgeball:1:f1 headcoach:2:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:2:f0 pitcher:2:b1 headcoach:2:b0 waterboy:2:b2 cheersquad:2:b3 | mascot:3:f1 dodgeball:2:f0 qb:2:f2 headcoach:1:b1 pointguard:2:b0 waterboy:1:b2 cheersquad:1:b3 |
| Guardian | gravegolem:2:f1 muscle:2:f0 counselors:1:f2 redshirts:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 deputy:2:f3 riot:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 deputy:1:b1 riot:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 chainsaw:1:f0 safecracker:1:f2 babykaiju:1:f3 outlaws:1:b1 | scorpion:2:f1 captain:3:f0 ravager:2:f2 babykaiju:1:f3 outlaws:1:b1 zombies:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:2:f3 safecracker:2:b1 mule:2:b0 chainsaw:2:b2 |
| Stalker | lurker:1:f1 wraith:1:f0 vampbat:2:f2 smuggler:2:b1 bounty:1:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | skelarch:1:f1 finalgirl:2:b1 gunslinger:1:b0 lookouts:1:b2 pilot:1:b3 | tanks:1:f1 skelarch:1:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:2:b2 lookouts:1:b3 | spitters:2:f1 rifle:2:f0 pilot:2:f2 gunny:1:b1 finalgirl:3:b0 gunslinger:3:b2 pointguard:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 headcoach:1:b3 | scientist:1:f1 necro:1:f0 giantmoth:2:b1 queen:3:b0 headcoach:1:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fixer:2:b1 nurse:1:b0 waterboy:1:b2 cheersquad:1:b3 | doc:1:f1 babysitter:1:f0 bonesetter:1:b1 fieldmed:3:b0 fixer:2:b2 reporter:2:b3 | cheersquad:1:f1 reporter:2:f0 doc:2:f2 bonesetter:3:b1 fieldmed:3:b0 fixer:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

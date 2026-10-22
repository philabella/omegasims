# Counter matrix: only-bat.html 20.82, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 17 of 36: Heist Crew > Space Opera 77% (edge +28); Undead > Wild West 88% (edge +27); Army > Swarm 75% (edge +27); Kaiju > Army 77% (edge +25); Space Opera > Sportsball 82% (edge +25); Undead > Heist Crew 78% (edge +22); Kaiju > Slasher 70% (edge +22); Army > Undead 62% (edge +21); Wild West > Space Opera 63% (edge +20); Swarm > Undead 61% (edge +19); Slasher > Sportsball 71% (edge +16); Sportsball > Swarm 63% (edge +16); Wild West > Army 63% (edge +15); Swarm > Heist Crew 62% (edge +15); Slasher > Wild West 69% (edge +14); Space Opera > Kaiju 67% (edge +13); Heist Crew > Slasher 62% (edge +11).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 14.7 points; strength spread 45.8-57.3% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 4 of 15: Brawler > Mystic 87% (edge +22); Guardian > Stalker 64% (edge +18); Stalker > Brawler 66% (edge +12); Gunner > Medic 99% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.8 points; strength spread 12.8-67.1% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 288/300 fights; mirror (board vs itself) side A 49.6% / 51.0% / 50.3%. Run time 6.7 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **75±5** | **62±3** | 44±5 | _37±5_ | 49±7 | 44±5 | _23±6_ | 44±5 | 47.7% |
| **Swarm** | _25±5_ | · | **61±6** | **62±4** | 56±2 | 50±5 | 44±5 | 57±6 | _37±4_ | 49.2% |
| **Undead** | _38±3_ | _39±6_ | · | **78±4** | **88±3** | 46±6 | 53±6 | 59±7 | **64±6** | 57.3% |
| **Heist Crew** | 56±5 | _38±4_ | _22±4_ | · | 55±4 | **62±7** | **77±6** | 60±7 | 44±5 | 51.4% |
| **Wild West** | **63±5** | 44±2 | _12±3_ | 45±4 | · | _31±5_ | **63±5** | 54±6 | 52±5 | 45.8% |
| **Slasher** | 51±7 | 50±5 | 54±6 | _39±7_ | **69±5** | · | 43±7 | _30±7_ | **71±5** | 50.8% |
| **Space Opera** | 56±5 | 56±5 | 47±6 | _23±6_ | _37±5_ | 57±7 | · | **67±7** | **82±5** | 52.7% |
| **Kaiju** | **77±6** | 43±6 | 41±7 | 40±7 | 46±6 | **70±7** | _33±7_ | · | 43±6 | 49.3% |
| **Sportsball** | 56±5 | **63±4** | _36±6_ | 56±5 | 48±5 | _29±5_ | _18±5_ | 57±6 | · | 45.8% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Undead | 57.3% | Heist Crew, Wild West, Sportsball | Army, Swarm | 16.4 |
| Space Opera | 52.7% | Kaiju, Sportsball | Heist Crew, Wild West | 15.8 |
| Heist Crew | 51.4% | Slasher, Space Opera | Swarm, Undead | 14.9 |
| Slasher | 50.8% | Wild West, Sportsball | Heist Crew, Kaiju | 12.2 |
| Kaiju | 49.3% | Army, Slasher | Space Opera | 13.9 |
| Swarm | 49.2% | Undead, Heist Crew | Army, Sportsball | 14.3 |
| Army | 47.7% | Swarm, Undead | Wild West, Kaiju | 16.2 |
| Wild West | 45.8% | Army, Space Opera | Undead, Slasher | 14.1 |
| Sportsball | 45.8% | Swarm | Undead, Slasher, Space Opera | 13.4 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 56±4 | **64±1** | **65±1** | 58±3 | **66±0** | 62.9% |
| **Brawler** | 44±4 | · | _34±0_ | 51±3 | **87±3** | **100±0** | 63.6% |
| **Stalker** | _36±1_ | **66±0** | · | **68±2** | **65±4** | **99±0** | 67.1% |
| **Gunner** | _35±1_ | 49±3 | _32±2_ | · | 53±4 | **99±1** | 55% |
| **Mystic** | 42±3 | _13±3_ | _36±4_ | 47±4 | · | **93±2** | 47.9% |
| **Medic** | _34±0_ | _0±0_ | _1±0_ | _1±1_ | _8±2_ | · | 12.8% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _11±7_ | _30±14_ | _36±13_ | 60±13 | _34±12_ | _33±14_ | _30±14_ | 31.2% |
| **Swarm** | **70±15** | · | _36±13_ | **100±0** | **93±3** | **80±11** | **82±12** | **100±0** | **84±8** | 80.6% |
| **Undead** | **89±7** | **64±13** | · | **91±5** | **94±3** | **86±8** | **88±8** | **92±5** | **85±7** | 86.1% |
| **Heist Crew** | **70±14** | _0±0_ | _9±5_ | · | 46±10 | **70±14** | **70±13** | **89±6** | _33±11_ | 47.3% |
| **Wild West** | **64±13** | _7±3_ | _6±3_ | 54±10 | · | **69±14** | **66±13** | **83±7** | 42±11 | 47.7% |
| **Slasher** | 40±13 | _20±11_ | _14±8_ | _30±14_ | _31±14_ | · | _28±13_ | _31±14_ | _30±14_ | 26.8% |
| **Space Opera** | **66±12** | _19±12_ | _12±8_ | _30±13_ | _34±13_ | **72±13** | · | **99±1** | 54±14 | 46.9% |
| **Kaiju** | **67±14** | _0±0_ | _8±5_ | _11±6_ | _17±7_ | **69±14** | _1±1_ | · | _4±2_ | 21.5% |
| **Sportsball** | **70±14** | _16±8_ | _15±7_ | **67±11** | 58±11 | **70±14** | 46±14 | **96±2** | · | 54% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Undead.
- **Genres that counter nothing** (no 60%+ matchup): Army, Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 10 of 36: Kaiju > Army 67% (edge +30); Kaiju > Slasher 69% (edge +26); Space Opera > Kaiju 99% (edge +23); Heist Crew > Space Opera 70% (edge +19); Swarm > Heist Crew 100% (edge +17); Sportsball > Kaiju 96% (edge +15); Wild West > Space Opera 66% (edge +15); Heist Crew > Kaiju 89% (edge +12); Swarm > Wild West 93% (edge +11); Sportsball > Heist Crew 67% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.4 points; strength spread 21.5-86.1% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **98±2** | **100±0** | **85±7** | **74±8** | _39±15_ | **86±5** | _3±2_ | **98±2** | 72.6% |
| **Swarm** | _3±2_ | · | **73±9** | **72±11** | **72±6** | **70±10** | 51±11 | _25±11_ | _27±9_ | 48.9% |
| **Undead** | _1±0_ | _27±9_ | · | **72±9** | **98±1** | 43±14 | _25±10_ | _20±12_ | 59±12 | 42.8% |
| **Heist Crew** | _15±7_ | _28±11_ | _28±9_ | · | **83±5** | 43±14 | **92±4** | _20±12_ | **86±7** | 49.1% |
| **Wild West** | _26±8_ | _28±6_ | _2±1_ | _17±5_ | · | _6±3_ | _33±8_ | _11±7_ | 47±7 | 21.5% |
| **Slasher** | **61±15** | _31±10_ | 57±14 | 57±14 | **94±3** | · | 54±13 | _21±11_ | **100±0** | 59.2% |
| **Space Opera** | _14±5_ | 49±11 | **76±10** | _8±4_ | **67±8** | 46±13 | · | _31±13_ | **100±0** | 48.3% |
| **Kaiju** | **97±2** | **75±11** | **80±12** | **80±12** | **89±7** | **79±11** | **69±13** | · | **84±10** | 81% |
| **Sportsball** | _2±2_ | **73±9** | 42±12 | _15±7_ | 54±7 | _0±0_ | _0±0_ | _16±10_ | · | 25.6% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 19 of 36: Sportsball > Swarm 73% (edge +47); Heist Crew > Space Opera 92% (edge +41); Kaiju > Army 97% (edge +36); Swarm > Slasher 70% (edge +30); Undead > Heist Crew 72% (edge +29); Space Opera > Sportsball 100% (edge +26); Slasher > Army 61% (edge +25); Undead > Wild West 98% (edge +25); Army > Swarm 98% (edge +24); Swarm > Heist Crew 72% (edge +22); Army > Undead 100% (edge +21); Space Opera > Undead 76% (edge +20); Slasher > Sportsball 100% (edge +18); Swarm > Undead 73% (edge +17); Army > Space Opera 86% (edge +12); Army > Heist Crew 85% (edge +12); Heist Crew > Sportsball 86% (edge +12); Slasher > Wild West 94% (edge +10); Army > Sportsball 98% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 19 points; strength spread 21.5-81% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **99±1** | **75±7** | _17±6_ | _2±1_ | 47±11 | _13±6_ | _35±13_ | _5±2_ | 37.3% |
| **Swarm** | _1±1_ | · | **75±8** | _15±7_ | _4±2_ | _0±0_ | _0±0_ | 47±14 | _1±1_ | 20.4% |
| **Undead** | _25±7_ | _25±8_ | · | **70±8** | **73±9** | _10±3_ | 46±11 | **65±15** | 49±11 | 45.9% |
| **Heist Crew** | **83±6** | **85±7** | _30±8_ | · | _37±8_ | **72±10** | **69±11** | **70±15** | _15±8_ | 57.5% |
| **Wild West** | **98±1** | **96±2** | _27±9_ | **63±8** | · | _18±6_ | **91±5** | **68±15** | **66±8** | 65.7% |
| **Slasher** | 53±11 | **100±0** | **90±3** | _28±10_ | **82±6** | · | 46±11 | _37±13_ | **84±6** | 64.5% |
| **Space Opera** | **87±6** | **100±0** | 54±11 | _31±11_ | _9±5_ | 54±11 | · | **69±15** | **91±5** | 61.6% |
| **Kaiju** | **65±13** | 53±14 | _35±15_ | _30±15_ | _32±15_ | **63±13** | _31±15_ | · | 42±15 | 44.5% |
| **Sportsball** | **95±2** | **100±1** | 51±11 | **85±8** | _34±8_ | _16±6_ | _9±5_ | 58±15 | · | 56% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 23 of 36: Swarm > Undead 75% (edge +51); Undead > Wild West 73% (edge +42); Sportsball > Heist Crew 85% (edge +37); Wild West > Space Opera 91% (edge +36); Space Opera > Sportsball 91% (edge +35); Army > Undead 75% (edge +33); Slasher > Wild West 82% (edge +33); Kaiju > Slasher 63% (edge +32); Undead > Heist Crew 70% (edge +31); Army > Swarm 99% (edge +29); Heist Crew > Slasher 72% (edge +29); Sportsball > Army 95% (edge +27); Slasher > Sportsball 84% (edge +25); Heist Crew > Space Opera 69% (edge +23); Slasher > Undead 90% (edge +22); Wild West > Army 98% (edge +22); Sportsball > Swarm 99% (edge +16); Space Opera > Army 87% (edge +14); Undead > Kaiju 65% (edge +13); Heist Crew > Army 83% (edge +13); Space Opera > Swarm 100% (edge +13); Slasher > Swarm 100% (edge +11); Wild West > Swarm 96% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 23.4 points; strength spread 20.4-65.7% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | mule:1:f1 commando:1:f0 fieldmed:2:b1 radio:1:b0 rifle:1:b2 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:2:f0 mule:2:f2 gunny:1:b1 fieldmed:2:b0 radio:2:b2 rifle:2:b3 |
| Swarm | beetles:1:f1 lurker:1:f0 queen:2:b1 nurse:1:b0 spitters:1:b2 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | scorpion:3:f1 ravager:1:f0 lurker:1:f2 hivemind:2:b1 queen:2:b0 nurse:1:b2 spitters:1:b3 |
| Undead | gravegolem:1:f1 zombies:1:f0 vampbat:1:f2 necro:2:b1 skelarch:1:b0 | gravegolem:3:f1 zombies:1:f0 wraith:2:f2 vampbat:2:f3 bonesetter:1:b1 necro:1:b0 | gravegolem:3:f1 bonedragon:2:f0 zombies:1:f2 wraith:2:f3 bonesetter:2:b1 skelarch:1:b0 vampbat:1:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 driver:1:f3 fixer:2:b1 hacker:2:b0 | insideman:3:f1 muscle:2:f0 safecracker:2:f2 mastermind:2:b1 fixer:1:b0 hacker:1:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:2:f1 deputy:1:f0 outlaws:1:b1 gunslinger:3:b0 prospector:1:b2 bounty:1:b3 | sheriff:1:f1 deputy:2:f0 bounty:1:f2 gunslinger:3:b1 prospector:2:b0 doc:2:b2 noname:2:b3 |
| Slasher | chainsaw:1:f1 kids:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:2:f0 chainsaw:2:f2 finalgirl:3:b1 exorcist:1:b0 babysitter:2:b2 | brute:2:f1 counselors:1:f0 kids:2:f2 dreamstalker:2:b1 finalgirl:3:b0 exorcist:1:b2 babysitter:2:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:1:f1 redshirts:2:f0 captain:3:f2 telepath:1:b1 pilot:2:b0 smuggler:2:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 droids:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 reporter:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | dodgeball:1:f1 headcoach:2:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:2:f0 pitcher:2:b1 headcoach:2:b0 waterboy:2:b2 cheersquad:2:b3 | mascot:3:f1 dodgeball:2:f0 qb:2:f2 headcoach:1:b1 pointguard:2:b0 waterboy:1:b2 cheersquad:1:b3 |
| Guardian | gravegolem:2:f1 muscle:2:f0 counselors:1:f2 redshirts:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 deputy:2:f3 riot:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 deputy:1:b1 riot:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 chainsaw:1:f0 safecracker:1:f2 babykaiju:1:f3 outlaws:1:b1 | scorpion:2:f1 captain:3:f0 ravager:2:f2 babykaiju:1:f3 outlaws:1:b1 zombies:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:2:f3 safecracker:2:b1 mule:2:b0 chainsaw:2:b2 |
| Stalker | lurker:1:f1 wraith:1:f0 vampbat:2:f2 smuggler:2:b1 bounty:1:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | skelarch:1:f1 finalgirl:2:b1 gunslinger:1:b0 lookouts:1:b2 pilot:1:b3 | spitters:1:f1 pilot:2:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:1:b2 lookouts:2:b3 | spitters:2:f1 rifle:2:f0 pilot:2:f2 gunny:1:b1 finalgirl:3:b0 gunslinger:3:b2 pointguard:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 headcoach:1:b3 | scientist:1:f1 necro:1:f0 giantmoth:2:b1 queen:3:b0 headcoach:1:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fixer:2:b1 nurse:1:b0 waterboy:1:b2 cheersquad:1:b3 | doc:1:f1 babysitter:1:f0 bonesetter:1:b1 fieldmed:3:b0 fixer:2:b2 reporter:2:b3 | cheersquad:1:f1 reporter:2:f0 doc:2:f2 bonesetter:3:b1 fieldmed:3:b0 fixer:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

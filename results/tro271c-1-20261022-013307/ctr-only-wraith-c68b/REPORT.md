# Counter matrix: only-wraith.html 20.82, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 19 of 36: Heist Crew > Space Opera 82% (edge +32); Army > Swarm 76% (edge +27); Kaiju > Army 78% (edge +27); Space Opera > Sportsball 80% (edge +25); Undead > Heist Crew 67% (edge +22); Swarm > Undead 74% (edge +22); Slasher > Sportsball 72% (edge +22); Kaiju > Slasher 71% (edge +20); Undead > Wild West 70% (edge +19); Army > Undead 68% (edge +18); Wild West > Space Opera 63% (edge +18); Wild West > Army 64% (edge +14); Swarm > Heist Crew 61% (edge +14); Space Opera > Kaiju 68% (edge +14); Slasher > Wild West 64% (edge +14); Sportsball > Swarm 61% (edge +13); Sportsball > Kaiju 61% (edge +12); Heist Crew > Slasher 67% (edge +12); Space Opera > Slasher 64% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 14.6 points; strength spread 48.4-53.5% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 6 of 15: Brawler > Mystic 86% (edge +19); Stalker > Brawler 63% (edge +13); Guardian > Stalker 66% (edge +13); Guardian > Gunner 66% (edge +11); Gunner > Medic 96% (edge +9); Mystic > Medic 86% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 10.2 points; strength spread 18.3-63.4% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 291/300 fights; mirror (board vs itself) side A 47.2% / 51.0% / 51.1%. Run time 6.2 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **76±5** | **68±4** | 46±6 | _36±5_ | 54±8 | 44±5 | _22±6_ | 44±5 | 48.9% |
| **Swarm** | _24±5_ | · | **74±5** | **61±4** | 57±2 | 49±5 | 44±5 | 55±6 | _39±4_ | 50.3% |
| **Undead** | _32±4_ | _26±5_ | · | **67±5** | **70±4** | 43±6 | 46±4 | 57±7 | 46±7 | 48.5% |
| **Heist Crew** | 54±6 | _39±4_ | _33±5_ | · | 52±5 | **67±7** | **82±5** | 57±7 | 46±5 | 53.3% |
| **Wild West** | **64±5** | 43±2 | _30±4_ | 48±5 | · | _36±6_ | **63±4** | 54±6 | 48±5 | 48.4% |
| **Slasher** | 46±8 | 52±5 | 57±6 | _34±7_ | **64±6** | · | _36±7_ | _29±7_ | **72±5** | 48.9% |
| **Space Opera** | 56±5 | 56±5 | 54±4 | _18±5_ | _37±4_ | **64±7** | · | **68±7** | **80±5** | 53.5% |
| **Kaiju** | **78±6** | 45±6 | 43±7 | 43±7 | 46±6 | **71±7** | _32±7_ | · | _39±6_ | 49.6% |
| **Sportsball** | 56±5 | **61±4** | 55±7 | 54±5 | 52±5 | _28±5_ | _20±5_ | **61±6** | · | 48.5% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Space Opera | 53.5% | Slasher, Kaiju, Sportsball | Heist Crew, Wild West | 16.9 |
| Heist Crew | 53.3% | Slasher, Space Opera | Swarm, Undead | 15.7 |
| Swarm | 50.3% | Undead, Heist Crew | Army, Sportsball | 14.3 |
| Kaiju | 49.6% | Army, Slasher | Space Opera, Sportsball | 14 |
| Army | 48.9% | Swarm, Undead | Wild West, Kaiju | 16 |
| Slasher | 48.9% | Wild West, Sportsball | Heist Crew, Space Opera, Kaiju | 13 |
| Undead | 48.5% | Heist Crew, Wild West | Army, Swarm | 15 |
| Sportsball | 48.5% | Swarm, Kaiju | Slasher, Space Opera | 14 |
| Wild West | 48.4% | Army, Space Opera | Undead, Slasher | 12.1 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 54±4 | **66±0** | **66±1** | **67±3** | **66±1** | 63.4% |
| **Brawler** | 46±4 | · | _37±2_ | 47±3 | **86±3** | **89±4** | 60.9% |
| **Stalker** | _34±0_ | **63±2** | · | 51±2 | **64±4** | **90±3** | 60.3% |
| **Gunner** | _35±1_ | 53±3 | 49±2 | · | **61±5** | **96±3** | 58.9% |
| **Mystic** | _33±3_ | _14±3_ | _36±4_ | _39±5_ | · | **86±3** | 43.1% |
| **Medic** | _34±1_ | _11±4_ | _11±3_ | _4±3_ | _14±3_ | · | 18.3% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _18±10_ | _30±14_ | _33±14_ | 57±14 | _34±13_ | _30±15_ | _30±15_ | 31.9% |
| **Swarm** | **70±15** | · | 58±12 | **100±1** | **94±3** | **82±10** | **83±10** | **100±0** | **87±6** | 83.2% |
| **Undead** | **82±10** | 42±12 | · | **84±8** | **83±7** | **81±11** | **87±9** | **86±8** | **68±13** | 76.6% |
| **Heist Crew** | **70±14** | _1±1_ | _16±8_ | · | 46±11 | **70±16** | **71±12** | **80±10** | _34±13_ | 48.1% |
| **Wild West** | **67±14** | _6±3_ | _17±7_ | 54±11 | · | **69±15** | **69±11** | **82±8** | 41±11 | 50% |
| **Slasher** | 43±14 | _19±10_ | _19±11_ | _30±16_ | _31±15_ | · | _29±15_ | _30±16_ | _30±15_ | 28.1% |
| **Space Opera** | **66±13** | _17±10_ | _13±9_ | _29±12_ | _31±11_ | **72±15** | · | **100±1** | 55±13 | 46.9% |
| **Kaiju** | **70±15** | _0±0_ | _14±8_ | _20±10_ | _18±8_ | **70±16** | _0±1_ | · | _3±2_ | 24.4% |
| **Sportsball** | **70±15** | _13±6_ | _32±13_ | **66±13** | 59±11 | **70±15** | 45±13 | **97±2** | · | 56.1% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm, Undead.
- **Genres that counter nothing** (no 60%+ matchup): Army, Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 9 of 36: Kaiju > Army 70% (edge +29); Space Opera > Kaiju 100% (edge +26); Kaiju > Slasher 70% (edge +25); Heist Crew > Space Opera 71% (edge +20); Sportsball > Kaiju 97% (edge +17); Wild West > Space Opera 69% (edge +16); Swarm > Heist Crew 100% (edge +15); Swarm > Wild West 94% (edge +11); Undead > Space Opera 87% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.5 points; strength spread 24.4-83.2% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **98±2** | **100±1** | **87±7** | **74±7** | _40±14_ | **85±5** | _3±2_ | **97±3** | 72.7% |
| **Swarm** | _2±2_ | · | **79±8** | **77±10** | **75±6** | **64±11** | 50±11 | _27±13_ | _30±12_ | 50.4% |
| **Undead** | _1±1_ | _21±8_ | · | 53±9 | **84±5** | 42±14 | _5±3_ | _19±13_ | 40±12 | 33% |
| **Heist Crew** | _13±7_ | _23±10_ | 47±9 | · | **82±4** | 44±14 | **91±4** | _20±13_ | **87±7** | 50.7% |
| **Wild West** | _26±7_ | _25±6_ | _16±5_ | _19±4_ | · | _13±8_ | _27±7_ | _11±7_ | 43±6 | 22.6% |
| **Slasher** | **60±14** | _36±11_ | 58±14 | 56±14 | **87±8** | · | 49±12 | _19±10_ | **100±1** | 57.9% |
| **Space Opera** | _15±5_ | 50±11 | **95±3** | _9±4_ | **73±7** | 51±12 | · | _36±14_ | **100±0** | 53.5% |
| **Kaiju** | **97±2** | **73±13** | **81±13** | **80±13** | **89±7** | **81±10** | **64±14** | · | **83±11** | 80.4% |
| **Sportsball** | _3±3_ | **70±12** | 60±12 | _13±7_ | 57±6 | _1±1_ | _0±0_ | _17±11_ | · | 27.8% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 17 of 36: Heist Crew > Space Opera 91% (edge +43); Sportsball > Swarm 70% (edge +43); Kaiju > Army 97% (edge +37); Swarm > Heist Crew 77% (edge +27); Slasher > Army 60% (edge +26); Space Opera > Undead 95% (edge +25); Army > Swarm 98% (edge +25); Space Opera > Sportsball 100% (edge +24); Swarm > Slasher 64% (edge +22); Undead > Wild West 84% (edge +21); Slasher > Sportsball 100% (edge +21); Army > Space Opera 85% (edge +15); Army > Heist Crew 87% (edge +15); Army > Undead 100% (edge +15); Heist Crew > Sportsball 87% (edge +14); Swarm > Undead 79% (edge +11); Army > Sportsball 97% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 18.6 points; strength spread 22.6-80.4% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **100±1** | **88±5** | _21±8_ | _1±0_ | **64±11** | _14±7_ | _34±12_ | _6±2_ | 41.3% |
| **Swarm** | _1±1_ | · | **85±8** | _7±4_ | _2±1_ | _0±0_ | _0±0_ | _38±14_ | _0±1_ | 19% |
| **Undead** | _12±5_ | _15±8_ | · | **65±8** | 42±8 | _6±2_ | 47±9 | **65±15** | _29±9_ | 35.8% |
| **Heist Crew** | **80±8** | **93±4** | _35±8_ | · | _29±8_ | **86±6** | **85±7** | **69±15** | _16±6_ | 61.7% |
| **Wild West** | **99±0** | **98±1** | 58±8 | **71±8** | · | _25±5_ | **93±2** | **70±15** | 59±6 | 71.1% |
| **Slasher** | _36±11_ | **100±0** | **94±2** | _14±6_ | **75±5** | · | _32±10_ | _39±12_ | **87±4** | 59.7% |
| **Space Opera** | **86±7** | **100±0** | 53±9 | _15±7_ | _7±2_ | **68±10** | · | **68±15** | **86±8** | 60.2% |
| **Kaiju** | **66±12** | **62±14** | _35±15_ | _31±15_ | _30±15_ | **61±12** | _33±15_ | · | _30±15_ | 43.9% |
| **Sportsball** | **94±2** | **100±1** | **72±9** | **84±6** | 41±6 | _13±4_ | _15±8_ | **70±15** | · | 60.9% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 25 of 36: Swarm > Undead 85% (edge +55); Undead > Heist Crew 65% (edge +39); Slasher > Sportsball 87% (edge +38); Slasher > Wild West 75% (edge +38); Space Opera > Sportsball 86% (edge +36); Sportsball > Heist Crew 84% (edge +35); Heist Crew > Slasher 86% (edge +34); Heist Crew > Space Opera 85% (edge +33); Army > Undead 88% (edge +32); Army > Slasher 64% (edge +32); Wild West > Space Opera 93% (edge +31); Kaiju > Slasher 61% (edge +26); Sportsball > Army 94% (edge +25); Army > Swarm 100% (edge +24); Undead > Kaiju 65% (edge +23); Wild West > Army 99% (edge +21); Slasher > Undead 94% (edge +21); Space Opera > Army 86% (edge +18); Space Opera > Slasher 68% (edge +18); Kaiju > Army 66% (edge +13); Slasher > Swarm 100% (edge +13); Space Opera > Swarm 100% (edge +12); Sportsball > Swarm 100% (edge +12); Wild West > Heist Crew 71% (edge +11); Heist Crew > Army 80% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 24.4 points; strength spread 19-71.1% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | riot:1:f1 mule:1:f0 fieldmed:2:b1 radio:1:b0 rifle:1:b2 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:1:f0 mule:2:f2 commando:1:f3 gunny:2:b1 radio:2:b0 rifle:1:b2 |
| Swarm | beetles:1:f1 ravager:1:f0 lurker:1:f2 queen:2:b1 nurse:1:b0 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | beetles:2:f1 scorpion:3:f0 ravager:1:f2 lurker:2:f3 hivemind:2:b1 queen:1:b0 nurse:1:b2 |
| Undead | gravegolem:2:f1 zombies:1:f0 vampbat:1:f2 necro:1:b1 skelarch:1:b0 | gravegolem:2:f1 zombies:2:f0 wraith:2:f2 vampbat:2:f3 bonesetter:2:b1 necro:1:b0 | gravegolem:2:f1 bonedragon:2:f0 zombies:2:f2 wraith:2:f3 bonesetter:1:b1 necro:2:b0 vampbat:2:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 fixer:2:b1 hacker:2:b0 lookouts:1:b2 | insideman:3:f1 muscle:2:f0 safecracker:1:f2 mastermind:2:b1 fixer:1:b0 hacker:2:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:1:f1 deputy:2:f0 gunslinger:3:b1 prospector:1:b0 doc:2:b2 bounty:2:b3 | sheriff:3:f1 deputy:2:f0 bounty:2:f2 gunslinger:1:b1 prospector:1:b0 doc:1:b2 noname:2:b3 |
| Slasher | counselors:1:f1 chainsaw:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:1:f0 chainsaw:2:f2 kids:1:f3 finalgirl:3:b1 exorcist:2:b0 | brute:3:f1 counselors:1:f0 chainsaw:1:f2 dreamstalker:2:b1 finalgirl:2:b0 exorcist:1:b2 babysitter:1:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 pilot:1:b0 smuggler:1:b2 | starknight:2:f1 redshirts:1:f0 captain:3:f2 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 pilot:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 tanks:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | dodgeball:1:f1 headcoach:2:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:1:f0 headcoach:3:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:3:f1 dodgeball:2:f0 pitcher:2:f2 headcoach:1:b1 waterboy:1:b0 cheersquad:2:b2 qb:2:b3 |
| Guardian | gravegolem:2:f1 deputy:2:f0 muscle:1:f2 redshirts:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 muscle:2:f3 counselors:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 riot:1:b1 deputy:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 mule:1:f0 safecracker:1:f2 babykaiju:1:f3 pitcher:1:b1 | scorpion:2:f1 captain:3:f0 mule:1:f2 safecracker:1:f3 pitcher:1:b1 ravager:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:3:f3 ravager:1:b1 chainsaw:1:b0 safecracker:2:b2 |
| Stalker | wraith:2:f1 lurker:1:f0 commando:2:f2 vampbat:2:f3 driver:1:b1 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | spitters:1:f1 finalgirl:2:b1 gunslinger:1:b0 pilot:1:b2 skelarch:1:b3 | lookouts:1:f1 tanks:2:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:1:b2 pilot:2:b3 | spitters:2:f1 skelarch:2:f0 rifle:2:f2 gunny:2:b1 finalgirl:3:b0 gunslinger:2:b2 pilot:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 necro:1:b3 | scientist:1:f1 necro:1:f0 giantmoth:2:b1 queen:3:b0 headcoach:1:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fieldmed:2:b1 fixer:1:b0 babysitter:1:b2 droids:1:b3 | babysitter:1:f1 cheersquad:2:f0 bonesetter:2:b1 fieldmed:2:b0 fixer:2:b2 waterboy:1:b3 | cheersquad:1:f1 doc:2:f0 babysitter:2:f2 bonesetter:3:b1 fixer:3:b0 fieldmed:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

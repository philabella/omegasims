# Counter matrix: only-bat.html 20.82, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 18 of 36: Heist Crew > Space Opera 82% (edge +32); Army > Swarm 76% (edge +27); Kaiju > Army 78% (edge +26); Undead > Heist Crew 80% (edge +26); Space Opera > Sportsball 81% (edge +24); Undead > Wild West 82% (edge +23); Kaiju > Slasher 70% (edge +21); Army > Undead 62% (edge +21); Swarm > Undead 63% (edge +20); Slasher > Sportsball 73% (edge +19); Wild West > Space Opera 63% (edge +18); Wild West > Army 64% (edge +15); Space Opera > Kaiju 68% (edge +14); Sportsball > Kaiju 61% (edge +14); Swarm > Heist Crew 61% (edge +14); Sportsball > Swarm 60% (edge +14); Heist Crew > Slasher 66% (edge +13); Slasher > Wild West 66% (edge +13).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 14.9 points; strength spread 46.3-56.2% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 5 of 15: Brawler > Mystic 86% (edge +19); Guardian > Stalker 65% (edge +17); Mystic > Medic 88% (edge +10); Stalker > Brawler 66% (edge +10); Gunner > Medic 94% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 10.7 points; strength spread 17.4-65.8% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 291/300 fights; mirror (board vs itself) side A 48.5% / 51.7% / 50.8%. Run time 6.4 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **76±5** | **62±3** | 46±6 | _36±5_ | 50±8 | 44±5 | _22±6_ | 44±5 | 47.9% |
| **Swarm** | _24±5_ | · | **63±6** | **61±4** | 58±2 | 49±5 | 45±5 | 55±6 | _40±4_ | 49.3% |
| **Undead** | _38±3_ | _37±6_ | · | **80±4** | **82±3** | 47±5 | 53±4 | 58±7 | **62±6** | 56.2% |
| **Heist Crew** | 55±6 | _39±4_ | _20±4_ | · | 52±5 | **66±7** | **82±5** | 59±7 | 47±6 | 52.1% |
| **Wild West** | **64±5** | 43±2 | _18±3_ | 48±5 | · | _34±6_ | **63±4** | 54±6 | 49±4 | 46.8% |
| **Slasher** | 50±8 | 51±5 | 53±5 | _34±7_ | **66±6** | · | 40±7 | _30±7_ | **73±5** | 49.8% |
| **Space Opera** | 56±5 | 56±5 | 47±4 | _18±5_ | _38±4_ | 60±7 | · | **68±7** | **81±5** | 52.5% |
| **Kaiju** | **78±6** | 45±6 | 42±7 | 41±7 | 46±6 | **70±7** | _32±7_ | · | _39±6_ | 49.1% |
| **Sportsball** | 56±5 | **60±4** | _38±6_ | 53±6 | 51±4 | _27±5_ | _19±5_ | **61±6** | · | 46.3% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Undead | 56.2% | Heist Crew, Wild West, Sportsball | Army, Swarm | 16.3 |
| Space Opera | 52.5% | Kaiju, Sportsball | Heist Crew, Wild West | 16.7 |
| Heist Crew | 52.1% | Slasher, Space Opera | Swarm, Undead | 16.6 |
| Slasher | 49.8% | Wild West, Sportsball | Heist Crew, Kaiju | 12.7 |
| Swarm | 49.3% | Undead, Heist Crew | Army, Sportsball | 14 |
| Kaiju | 49.1% | Army, Slasher | Space Opera, Sportsball | 14.3 |
| Army | 47.9% | Swarm, Undead | Wild West, Kaiju | 16.3 |
| Wild West | 46.8% | Army, Space Opera | Undead, Slasher | 12.9 |
| Sportsball | 46.3% | Swarm, Kaiju | Undead, Slasher, Space Opera | 13.6 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 55±4 | **65±1** | **66±1** | **67±3** | **66±0** | 63.7% |
| **Brawler** | 45±4 | · | _34±1_ | 46±2 | **86±4** | **90±4** | 60.4% |
| **Stalker** | _35±1_ | **66±1** | · | **69±3** | **68±4** | **93±2** | 65.8% |
| **Gunner** | _34±1_ | 54±2 | _31±3_ | · | 60±5 | **94±3** | 55.3% |
| **Mystic** | _33±3_ | _14±4_ | _32±4_ | 40±5 | · | **88±3** | 42.8% |
| **Medic** | _34±0_ | _11±4_ | _7±2_ | _6±3_ | _12±3_ | · | 17.4% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _12±7_ | _30±14_ | _34±14_ | 57±14 | _34±13_ | _30±15_ | _30±15_ | 30.4% |
| **Swarm** | **70±15** | · | 42±12 | **100±1** | **96±2** | **81±11** | **83±10** | **100±0** | **89±5** | 82.5% |
| **Undead** | **88±7** | 58±12 | · | **92±5** | **94±4** | **85±9** | **89±8** | **89±6** | **86±7** | 85.3% |
| **Heist Crew** | **71±14** | _1±1_ | _8±5_ | · | 46±12 | **70±16** | **71±12** | **88±7** | _36±14_ | 47.7% |
| **Wild West** | **67±14** | _5±2_ | _6±4_ | 54±12 | · | **69±15** | **69±11** | **82±8** | 46±9 | 48.4% |
| **Slasher** | 43±14 | _19±11_ | _15±9_ | _30±16_ | _31±15_ | · | _29±15_ | _30±16_ | _30±15_ | 26.7% |
| **Space Opera** | **66±13** | _17±10_ | _12±8_ | _29±12_ | _31±11_ | **72±15** | · | **100±1** | 56±12 | 46.2% |
| **Kaiju** | **70±15** | _0±0_ | _11±6_ | _12±7_ | _18±8_ | **70±16** | _0±1_ | · | _3±2_ | 22.4% |
| **Sportsball** | **70±15** | _11±5_ | _14±7_ | **64±14** | 54±9 | **70±15** | 44±12 | **97±2** | · | 52.1% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm, Undead.
- **Genres that counter nothing** (no 60%+ matchup): Army, Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 10 of 36: Kaiju > Army 70% (edge +30); Kaiju > Slasher 70% (edge +26); Space Opera > Kaiju 100% (edge +24); Heist Crew > Space Opera 71% (edge +19); Sportsball > Kaiju 97% (edge +18); Wild West > Space Opera 69% (edge +17); Swarm > Heist Crew 100% (edge +15); Swarm > Wild West 96% (edge +12); Heist Crew > Kaiju 88% (edge +12); Sportsball > Heist Crew 64% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.6 points; strength spread 22.4-85.3% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **98±2** | **99±1** | **87±7** | **74±7** | _40±14_ | **85±5** | _3±2_ | **98±2** | 72.7% |
| **Swarm** | _2±2_ | · | **70±11** | **76±11** | **75±6** | **65±10** | 51±11 | _27±13_ | _29±11_ | 49.3% |
| **Undead** | _2±1_ | _31±11_ | · | **66±11** | **93±3** | 44±14 | _10±4_ | _20±13_ | 49±13 | 39.2% |
| **Heist Crew** | _13±7_ | _24±11_ | _34±11_ | · | **82±4** | 44±14 | **91±5** | _20±13_ | **87±7** | 49.2% |
| **Wild West** | _26±7_ | _25±6_ | _7±3_ | _18±4_ | · | _13±8_ | _27±7_ | _12±7_ | 42±6 | 21.5% |
| **Slasher** | **60±14** | _35±10_ | 56±14 | 56±14 | **87±8** | · | 49±12 | _19±10_ | **100±1** | 57.6% |
| **Space Opera** | _15±5_ | 50±11 | **90±4** | _9±5_ | **73±7** | 51±12 | · | _36±14_ | **100±0** | 52.7% |
| **Kaiju** | **97±2** | **73±13** | **80±13** | **80±13** | **89±7** | **81±10** | **64±14** | · | **83±11** | 80.2% |
| **Sportsball** | _2±2_ | **71±11** | 51±13 | _13±7_ | 58±6 | _1±1_ | _0±0_ | _17±11_ | · | 26.9% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 18 of 36: Heist Crew > Space Opera 91% (edge +44); Sportsball > Swarm 71% (edge +43); Kaiju > Army 97% (edge +37); Undead > Heist Crew 66% (edge +26); Space Opera > Undead 90% (edge +26); Slasher > Army 60% (edge +26); Swarm > Heist Crew 76% (edge +26); Army > Swarm 98% (edge +25); Space Opera > Sportsball 100% (edge +24); Swarm > Slasher 65% (edge +23); Undead > Wild West 93% (edge +23); Slasher > Sportsball 100% (edge +20); Army > Undead 99% (edge +18); Heist Crew > Sportsball 87% (edge +15); Army > Space Opera 85% (edge +15); Army > Heist Crew 87% (edge +13); Army > Sportsball 98% (edge +10); Swarm > Undead 70% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 19 points; strength spread 21.5-80.2% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **100±1** | **77±7** | _20±9_ | _1±1_ | 53±11 | _14±7_ | _34±12_ | _6±2_ | 38.9% |
| **Swarm** | _1±1_ | · | **79±10** | _7±4_ | _2±1_ | _0±0_ | _0±0_ | _39±13_ | _0±1_ | 18.8% |
| **Undead** | _23±7_ | _21±10_ | · | **82±6** | **60±9** | _10±4_ | 59±9 | **65±15** | 50±9 | 46.8% |
| **Heist Crew** | **80±9** | **93±4** | _18±6_ | · | _28±7_ | **83±8** | **84±9** | **69±15** | _17±7_ | 59.3% |
| **Wild West** | **99±1** | **98±1** | _40±9_ | **72±7** | · | _20±4_ | **92±2** | **70±15** | 58±7 | 68% |
| **Slasher** | 47±11 | **100±0** | **90±4** | _17±8_ | **80±4** | · | 44±11 | 41±12 | **88±3** | 63.1% |
| **Space Opera** | **86±7** | **100±0** | 41±9 | _16±9_ | _8±2_ | 56±11 | · | **68±15** | **86±8** | 57.5% |
| **Kaiju** | **66±12** | **61±13** | _35±15_ | _31±15_ | _30±15_ | 59±12 | _33±15_ | · | _30±15_ | 43.8% |
| **Sportsball** | **94±2** | **100±1** | 50±9 | **83±7** | 42±7 | _12±3_ | _14±8_ | **70±15** | · | 58.1% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 23 of 36: Swarm > Undead 79% (edge +59); Undead > Heist Crew 82% (edge +44); Heist Crew > Slasher 83% (edge +37); Space Opera > Sportsball 86% (edge +36); Slasher > Wild West 80% (edge +36); Army > Undead 77% (edge +35); Sportsball > Heist Crew 83% (edge +34); Slasher > Sportsball 88% (edge +33); Heist Crew > Space Opera 84% (edge +32); Wild West > Space Opera 92% (edge +31); Undead > Wild West 60% (edge +31); Army > Swarm 100% (edge +26); Sportsball > Army 94% (edge +26); Slasher > Undead 90% (edge +24); Wild West > Army 99% (edge +22); Space Opera > Army 86% (edge +18); Space Opera > Swarm 100% (edge +14); Sportsball > Swarm 100% (edge +13); Wild West > Heist Crew 72% (edge +13); Undead > Kaiju 65% (edge +12); Slasher > Swarm 100% (edge +11); Kaiju > Army 66% (edge +11); Heist Crew > Army 80% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 24.7 points; strength spread 18.8-68% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | riot:1:f1 mule:1:f0 commando:1:f2 fieldmed:2:b1 radio:1:b0 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:1:f0 mule:2:f2 commando:1:f3 gunny:2:b1 radio:2:b0 rifle:1:b2 |
| Swarm | beetles:1:f1 ravager:2:f0 lurker:2:f2 queen:1:b1 nurse:1:b0 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | beetles:2:f1 scorpion:3:f0 ravager:1:f2 lurker:2:f3 hivemind:2:b1 queen:1:b0 nurse:1:b2 |
| Undead | gravegolem:2:f1 zombies:1:f0 vampbat:1:f2 necro:1:b1 skelarch:1:b0 | gravegolem:1:f1 wraith:2:f0 vampbat:2:f2 bonesetter:1:b1 necro:3:b0 skelarch:1:b2 | gravegolem:2:f1 bonedragon:2:f0 zombies:2:f2 wraith:2:f3 bonesetter:1:b1 necro:2:b0 vampbat:2:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 fixer:2:b1 hacker:2:b0 lookouts:1:b2 | insideman:3:f1 muscle:2:f0 driver:1:f2 mastermind:1:b1 fixer:3:b0 hacker:2:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:1:f1 deputy:2:f0 gunslinger:3:b1 prospector:1:b0 doc:2:b2 bounty:2:b3 | sheriff:3:f1 deputy:2:f0 bounty:2:f2 gunslinger:1:b1 prospector:1:b0 doc:1:b2 noname:2:b3 |
| Slasher | counselors:1:f1 chainsaw:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:1:f0 chainsaw:2:f2 kids:1:f3 finalgirl:3:b1 exorcist:2:b0 | brute:3:f1 counselors:1:f0 chainsaw:1:f2 dreamstalker:2:b1 finalgirl:2:b0 exorcist:1:b2 babysitter:1:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 pilot:1:b0 smuggler:1:b2 | starknight:2:f1 redshirts:1:f0 captain:3:f2 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 pilot:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 tanks:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | pitcher:2:f1 headcoach:1:b1 pointguard:2:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:1:f0 headcoach:3:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:3:f1 dodgeball:2:f0 pitcher:2:f2 headcoach:1:b1 waterboy:1:b0 cheersquad:2:b2 qb:2:b3 |
| Guardian | gravegolem:2:f1 deputy:2:f0 muscle:1:f2 redshirts:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 muscle:2:f3 counselors:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 riot:1:b1 deputy:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 mule:1:f0 safecracker:1:f2 babykaiju:1:f3 pitcher:1:b1 | scorpion:2:f1 captain:3:f0 mule:1:f2 safecracker:1:f3 pitcher:1:b1 ravager:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:3:f3 ravager:1:b1 chainsaw:1:b0 safecracker:2:b2 |
| Stalker | wraith:2:f1 lurker:1:f0 commando:2:f2 vampbat:2:f3 driver:1:b1 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | tanks:1:f1 finalgirl:2:b1 gunslinger:1:b0 pilot:1:b2 rifle:1:b3 | lookouts:1:f1 tanks:2:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:1:b2 pilot:2:b3 | rifle:1:f1 pilot:1:f0 spitters:2:f2 gunny:2:b1 finalgirl:3:b0 gunslinger:2:b2 pointguard:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 necro:1:b3 | scientist:1:f1 headcoach:1:f0 giantmoth:1:b1 queen:3:b0 necro:2:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fieldmed:2:b1 fixer:1:b0 babysitter:1:b2 droids:1:b3 | cheersquad:1:f1 babysitter:1:f0 bonesetter:1:b1 fieldmed:3:b0 fixer:2:b2 reporter:2:b3 | cheersquad:1:f1 doc:2:f0 babysitter:2:f2 bonesetter:3:b1 fixer:3:b0 fieldmed:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

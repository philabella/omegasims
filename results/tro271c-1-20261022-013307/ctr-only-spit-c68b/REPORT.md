# Counter matrix: only-spit.html 20.82, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 18 of 36: Heist Crew > Space Opera 83% (edge +33); Army > Swarm 76% (edge +27); Kaiju > Army 78% (edge +27); Space Opera > Sportsball 80% (edge +24); Swarm > Undead 73% (edge +23); Undead > Heist Crew 68% (edge +22); Undead > Wild West 73% (edge +21); Slasher > Sportsball 72% (edge +21); Kaiju > Slasher 71% (edge +20); Wild West > Space Opera 63% (edge +18); Army > Undead 67% (edge +18); Swarm > Heist Crew 61% (edge +15); Wild West > Army 64% (edge +15); Space Opera > Kaiju 68% (edge +14); Slasher > Wild West 64% (edge +13); Sportsball > Kaiju 61% (edge +13); Heist Crew > Slasher 67% (edge +12); Space Opera > Slasher 64% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 14.7 points; strength spread 47.6-53.7% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 6 of 15: Brawler > Mystic 86% (edge +19); Stalker > Brawler 65% (edge +14); Guardian > Stalker 66% (edge +14); Guardian > Gunner 65% (edge +11); Mystic > Medic 87% (edge +9); Gunner > Medic 96% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 10.4 points; strength spread 17.9-63.6% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 290/300 fights; mirror (board vs itself) side A 48.3% / 51.5% / 50.5%. Run time 11.9 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **76±5** | **67±4** | 45±6 | _36±5_ | 54±8 | 44±5 | _22±6_ | 45±5 | 48.8% |
| **Swarm** | _24±5_ | · | **73±5** | **61±3** | 57±2 | 46±5 | 44±5 | 54±6 | 41±4 | 50% |
| **Undead** | _33±4_ | _27±5_ | · | **68±5** | **73±4** | 43±6 | 46±4 | 59±7 | 50±6 | 49.8% |
| **Heist Crew** | 55±6 | _39±3_ | _32±5_ | · | 53±4 | **67±7** | **83±5** | 58±7 | 47±5 | 53.7% |
| **Wild West** | **64±5** | 43±2 | _27±4_ | 47±4 | · | _36±6_ | **63±4** | 54±6 | 49±5 | 48.1% |
| **Slasher** | 46±8 | 54±5 | 57±6 | _33±7_ | **64±6** | · | _36±7_ | _29±7_ | **72±5** | 49.1% |
| **Space Opera** | 56±5 | 56±5 | 54±4 | _17±5_ | _37±4_ | **64±7** | · | **68±7** | **80±5** | 53.5% |
| **Kaiju** | **78±6** | 46±6 | 41±7 | 42±7 | 46±6 | **71±7** | _32±7_ | · | _39±6_ | 49.3% |
| **Sportsball** | 56±5 | 59±4 | 50±6 | 53±5 | 51±5 | _28±5_ | _20±5_ | **61±6** | · | 47.6% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Heist Crew | 53.7% | Slasher, Space Opera | Swarm, Undead | 15.9 |
| Space Opera | 53.5% | Slasher, Kaiju, Sportsball | Heist Crew, Wild West | 16.9 |
| Swarm | 50% | Undead, Heist Crew | Army | 14.6 |
| Undead | 49.8% | Heist Crew, Wild West | Army, Swarm | 15.3 |
| Kaiju | 49.3% | Army, Slasher | Space Opera, Sportsball | 14.2 |
| Slasher | 49.1% | Wild West, Sportsball | Heist Crew, Space Opera, Kaiju | 12.9 |
| Army | 48.8% | Swarm, Undead | Wild West, Kaiju | 16.1 |
| Wild West | 48.1% | Army, Space Opera | Undead, Slasher | 12.4 |
| Sportsball | 47.6% | Kaiju | Slasher, Space Opera | 13.5 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 54±4 | **66±0** | **65±1** | **67±3** | **66±0** | 63.6% |
| **Brawler** | 46±4 | · | _35±1_ | 45±2 | **86±3** | **89±4** | 60.4% |
| **Stalker** | _34±0_ | **65±1** | · | 53±3 | **63±4** | **91±3** | 61.2% |
| **Gunner** | _35±1_ | 55±2 | 47±3 | · | **62±5** | **96±2** | 59.1% |
| **Mystic** | _33±3_ | _14±3_ | _37±4_ | _38±5_ | · | **87±3** | 43.1% |
| **Medic** | _34±0_ | _11±4_ | _9±3_ | _4±2_ | _13±3_ | · | 17.9% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _15±9_ | _28±14_ | _34±14_ | 57±14 | _34±13_ | _30±15_ | _30±15_ | 31.3% |
| **Swarm** | **70±15** | · | 54±11 | **99±1** | **95±2** | **82±10** | **83±10** | **100±0** | **88±5** | 83.1% |
| **Undead** | **85±9** | 47±11 | · | **88±7** | **86±6** | **81±11** | **87±8** | **88±7** | **76±11** | 79.8% |
| **Heist Crew** | **72±14** | _1±1_ | _12±7_ | · | 49±10 | **70±16** | **75±12** | **85±9** | _36±13_ | 49.3% |
| **Wild West** | **66±14** | _5±2_ | _14±6_ | 51±10 | · | **69±15** | **69±11** | **82±8** | 42±10 | 48.9% |
| **Slasher** | 43±14 | _19±10_ | _19±11_ | _30±16_ | _31±15_ | · | _29±15_ | _30±16_ | _30±15_ | 27.8% |
| **Space Opera** | **66±13** | _17±10_ | _13±8_ | _25±12_ | _31±11_ | **72±15** | · | **100±1** | 55±12 | 46.2% |
| **Kaiju** | **70±15** | _0±0_ | _13±7_ | _15±9_ | _18±8_ | **70±16** | _0±1_ | · | _4±2_ | 23.5% |
| **Sportsball** | **70±15** | _12±5_ | _24±11_ | **64±13** | 58±10 | **70±15** | 45±12 | **97±2** | · | 54.5% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm, Undead.
- **Genres that counter nothing** (no 60%+ matchup): Army, Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 10 of 36: Kaiju > Army 70% (edge +29); Kaiju > Slasher 70% (edge +26); Space Opera > Kaiju 100% (edge +25); Heist Crew > Space Opera 75% (edge +22); Sportsball > Kaiju 97% (edge +17); Wild West > Space Opera 69% (edge +16); Swarm > Heist Crew 99% (edge +15); Swarm > Wild West 95% (edge +11); Sportsball > Heist Crew 64% (edge +9); Heist Crew > Kaiju 85% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.7 points; strength spread 23.5-83.1% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **100±1** | **100±1** | **87±7** | **74±7** | _40±14_ | **85±5** | _3±2_ | **98±2** | 72.9% |
| **Swarm** | _1±1_ | · | **76±9** | **78±9** | **75±6** | 57±11 | 48±13 | _26±12_ | _33±12_ | 49.2% |
| **Undead** | _1±1_ | _24±9_ | · | 51±10 | **87±5** | 41±14 | _4±2_ | _19±13_ | 43±13 | 33.3% |
| **Heist Crew** | _13±7_ | _22±9_ | 49±10 | · | **82±4** | 44±14 | **90±5** | _20±13_ | **88±7** | 50.9% |
| **Wild West** | _26±7_ | _25±6_ | _13±5_ | _18±4_ | · | _13±8_ | _27±7_ | _11±7_ | 43±6 | 22.2% |
| **Slasher** | **60±14** | 43±11 | 59±14 | 56±14 | **87±8** | · | 49±12 | _19±10_ | **100±1** | 59% |
| **Space Opera** | _15±5_ | 52±13 | **97±2** | _10±5_ | **73±7** | 51±12 | · | _36±14_ | **100±0** | 54% |
| **Kaiju** | **97±2** | **75±12** | **81±13** | **80±13** | **89±7** | **81±10** | **64±14** | · | **83±11** | 80.7% |
| **Sportsball** | _2±2_ | **67±12** | 58±13 | _12±7_ | 57±6 | _1±1_ | _0±0_ | _17±11_ | · | 26.8% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 16 of 36: Heist Crew > Space Opera 90% (edge +43); Sportsball > Swarm 67% (edge +39); Kaiju > Army 97% (edge +36); Swarm > Heist Crew 78% (edge +30); Space Opera > Undead 97% (edge +26); Army > Swarm 100% (edge +25); Slasher > Army 60% (edge +25); Undead > Wild West 87% (edge +23); Space Opera > Sportsball 100% (edge +23); Slasher > Sportsball 100% (edge +19); Army > Space Opera 85% (edge +15); Army > Undead 100% (edge +15); Army > Heist Crew 87% (edge +15); Heist Crew > Sportsball 88% (edge +14); Swarm > Undead 76% (edge +10); Army > Sportsball 98% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 18.2 points; strength spread 22.2-80.7% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **100±1** | **86±6** | _21±9_ | _1±0_ | **64±11** | _14±7_ | _34±12_ | _6±2_ | 41.1% |
| **Swarm** | _1±1_ | · | **91±6** | _6±4_ | _2±1_ | _0±0_ | _0±0_ | _37±14_ | _0±1_ | 19.6% |
| **Undead** | _14±6_ | _10±6_ | · | **65±8** | 45±8 | _8±3_ | 47±10 | **70±15** | _30±8_ | 36.7% |
| **Heist Crew** | **79±9** | **94±4** | _35±8_ | · | _28±8_ | **86±7** | **85±9** | **69±15** | _16±6_ | 61.7% |
| **Wild West** | **100±0** | **98±1** | 55±8 | **72±8** | · | _26±5_ | **94±1** | **70±15** | **61±6** | 71.1% |
| **Slasher** | _36±11_ | **100±0** | **92±3** | _14±7_ | **74±5** | · | _32±10_ | _39±12_ | **87±4** | 59.2% |
| **Space Opera** | **86±7** | **100±0** | 53±10 | _16±9_ | _7±1_ | **68±10** | · | **68±15** | **86±8** | 60.1% |
| **Kaiju** | **66±12** | **63±14** | _30±15_ | _31±15_ | _30±15_ | **61±12** | _33±15_ | · | _30±15_ | 43.4% |
| **Sportsball** | **94±2** | **100±1** | **70±8** | **84±6** | _39±6_ | _13±4_ | _15±8_ | **70±15** | · | 60.4% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 25 of 36: Swarm > Undead 91% (edge +61); Slasher > Sportsball 87% (edge +38); Undead > Heist Crew 65% (edge +38); Slasher > Wild West 74% (edge +37); Space Opera > Sportsball 86% (edge +36); Sportsball > Heist Crew 84% (edge +35); Heist Crew > Slasher 86% (edge +34); Heist Crew > Space Opera 85% (edge +33); Wild West > Space Opera 94% (edge +32); Army > Slasher 64% (edge +31); Army > Undead 86% (edge +31); Undead > Kaiju 70% (edge +27); Kaiju > Slasher 61% (edge +26); Sportsball > Army 94% (edge +26); Army > Swarm 100% (edge +25); Wild West > Army 100% (edge +21); Slasher > Undead 92% (edge +21); Space Opera > Army 86% (edge +18); Space Opera > Slasher 68% (edge +17); Kaiju > Army 66% (edge +13); Slasher > Swarm 100% (edge +13); Space Opera > Swarm 100% (edge +13); Sportsball > Swarm 100% (edge +13); Wild West > Heist Crew 72% (edge +11); Heist Crew > Army 79% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 24.8 points; strength spread 19.6-71.1% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | riot:1:f1 mule:1:f0 commando:1:f2 fieldmed:2:b1 radio:1:b0 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:1:f0 mule:2:f2 commando:1:f3 gunny:2:b1 radio:2:b0 rifle:1:b2 |
| Swarm | beetles:1:f1 ravager:2:f0 lurker:2:f2 queen:1:b1 nurse:1:b0 | beetles:2:f1 scorpion:2:f0 ravager:2:f2 lurker:2:f3 queen:2:b1 spitters:2:b0 | beetles:2:f1 scorpion:3:f0 ravager:1:f2 lurker:2:f3 hivemind:2:b1 queen:1:b0 nurse:1:b2 |
| Undead | gravegolem:2:f1 zombies:1:f0 vampbat:1:f2 necro:1:b1 skelarch:1:b0 | gravegolem:3:f1 zombies:2:f0 wraith:2:f2 vampbat:1:f3 bonesetter:1:b1 necro:1:b0 | gravegolem:2:f1 bonedragon:2:f0 zombies:2:f2 wraith:2:f3 bonesetter:1:b1 necro:2:b0 vampbat:2:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 fixer:2:b1 hacker:2:b0 lookouts:1:b2 | insideman:3:f1 muscle:2:f0 safecracker:1:f2 mastermind:2:b1 fixer:1:b0 hacker:2:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:1:f1 deputy:2:f0 gunslinger:3:b1 prospector:1:b0 doc:2:b2 bounty:2:b3 | sheriff:3:f1 deputy:2:f0 bounty:2:f2 gunslinger:1:b1 prospector:1:b0 doc:1:b2 noname:2:b3 |
| Slasher | counselors:1:f1 chainsaw:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:1:f0 chainsaw:2:f2 kids:1:f3 finalgirl:3:b1 exorcist:2:b0 | brute:3:f1 counselors:1:f0 chainsaw:1:f2 dreamstalker:2:b1 finalgirl:2:b0 exorcist:1:b2 babysitter:1:b3 |
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

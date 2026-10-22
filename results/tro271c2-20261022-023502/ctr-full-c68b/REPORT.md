# Counter matrix: c2full.html 20.83, Game Level 10

## Verdict

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 17 of 36: Heist Crew > Space Opera 82% (edge +33); Swarm > Undead 80% (edge +32); Undead > Heist Crew 81% (edge +29); Army > Swarm 76% (edge +29); Kaiju > Army 78% (edge +27); Space Opera > Sportsball 80% (edge +25); Undead > Wild West 81% (edge +24); Slasher > Sportsball 72% (edge +21); Kaiju > Slasher 71% (edge +20); Army > Undead 64% (edge +19); Wild West > Space Opera 63% (edge +19); Wild West > Army 64% (edge +15); Space Opera > Kaiju 68% (edge +14); Heist Crew > Slasher 67% (edge +13); Sportsball > Kaiju 61% (edge +13); Slasher > Wild West 64% (edge +12); Space Opera > Slasher 64% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 15.8 points; strength spread 46.9-53.6% vs an average genre. A TFT-style web needs edges of ~10-15 points.
- **Traits with NO clear counter** (no opponent wins 60%+ against them): Guardian.
- **Traits that counter nothing** (no 60%+ matchup): Medic.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 5 of 15: Guardian > Stalker 65% (edge +21); Brawler > Mystic 86% (edge +17); Stalker > Gunner 83% (edge +16); Gunner > Medic 95% (edge +11); Mystic > Medic 87% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.5 points; strength spread 16.8-69% vs an average trait. A TFT-style web needs edges of ~10-15 points.

## How it was run

Each genre alone and each trait alone (any genre) brought its 10 strongest legal boards (best of 30 by 40 qualifier fights) at the same gold, board size, stars and rank per act (early: round 7, 5 squares, 15 gold; mid: round 14, 6 squares, 36 gold; late: round 24, 7 squares, 60 gold). Every board fought every board of every other team from both sides on the same seed, 10 seeds each; both sides get full genre / trait / fight-level effects. Items and Legendaries off. Cells pool the 3 acts (mean), ± is one standard error (bootstrap over each team's boards). Bold = 60%+, italic = 40% or less. Validation: side-aware fights = the game's own path in 290/300 fights; mirror (board vs itself) side A 48.1% / 51.5% / 48.9%. Run time 11.1 min.

## Genres (all acts)

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **76±5** | **64±4** | 45±6 | _36±5_ | 54±7 | 44±5 | _22±6_ | 45±5 | 48.4% |
| **Swarm** | _24±5_ | · | **80±4** | 59±4 | 60±2 | 46±5 | 45±5 | 58±6 | 41±4 | 51.5% |
| **Undead** | _36±4_ | _20±4_ | · | **81±4** | **81±3** | 48±6 | 53±5 | 60±7 | 54±6 | 53.6% |
| **Heist Crew** | 55±6 | 41±4 | _19±4_ | · | 52±5 | **67±7** | **82±5** | 57±7 | 46±5 | 52% |
| **Wild West** | **64±5** | 40±2 | _19±3_ | 48±5 | · | _36±6_ | **63±4** | 54±6 | 48±5 | 46.9% |
| **Slasher** | 46±7 | 54±5 | 52±6 | _33±7_ | **64±6** | · | _36±7_ | _29±7_ | **72±5** | 48.7% |
| **Space Opera** | 56±5 | 55±5 | 47±5 | _18±5_ | _37±4_ | **64±7** | · | **68±7** | **80±5** | 52.8% |
| **Kaiju** | **78±6** | 42±6 | 40±7 | 43±7 | 46±6 | **71±7** | _32±7_ | · | _39±6_ | 48.9% |
| **Sportsball** | 55±5 | 59±4 | 46±6 | 54±5 | 52±5 | _28±5_ | _20±5_ | **61±6** | · | 47.2% |

Strength vs counter edge per genre:

| Genre | vs avg genre | beats (60%+) | loses to (40%-) | edge SD |
|---|---|---|---|---|
| Undead | 53.6% | Heist Crew, Wild West | Army, Swarm | 19 |
| Space Opera | 52.8% | Slasher, Kaiju, Sportsball | Heist Crew, Wild West | 17.1 |
| Heist Crew | 52% | Slasher, Space Opera | Undead | 16.9 |
| Swarm | 51.5% | Undead | Army | 16.7 |
| Kaiju | 48.9% | Army, Slasher | Space Opera, Sportsball | 14.3 |
| Slasher | 48.7% | Wild West, Sportsball | Heist Crew, Space Opera, Kaiju | 13.2 |
| Army | 48.4% | Swarm, Undead | Wild West, Kaiju | 16.7 |
| Sportsball | 47.2% | Kaiju | Slasher, Space Opera | 13.7 |
| Wild West | 46.9% | Army, Space Opera | Undead, Slasher | 13.2 |

## Traits (all acts; each team = only that trait, any genre)

| row beats column | Guardian | Brawler | Stalker | Gunner | Mystic | Medic | strength |
|---|---|---|---|---|---|---|---|
| **Guardian** | · | 55±4 | **65±1** | **66±1** | **67±3** | **66±1** | 63.8% |
| **Brawler** | 45±4 | · | _40±3_ | 47±3 | **86±3** | **89±4** | 61.7% |
| **Stalker** | _35±1_ | **60±3** | · | **83±3** | **76±4** | **95±2** | 69% |
| **Gunner** | _34±1_ | 53±3 | _17±3_ | · | 60±5 | **95±2** | 52.9% |
| **Mystic** | _33±3_ | _14±3_ | _25±4_ | 41±5 | · | **87±3** | 41.1% |
| **Medic** | _34±1_ | _11±4_ | _5±2_ | _5±2_ | _13±3_ | · | 16.8% |


## Per act (genres)

### early

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | _30±15_ | _15±8_ | _30±14_ | _34±14_ | 57±14 | _34±14_ | _30±15_ | _30±15_ | 31.1% |
| **Swarm** | **70±15** | · | **68±10** | **100±0** | **98±2** | **81±11** | **81±11** | **100±0** | **87±6** | 84.9% |
| **Undead** | **85±8** | _32±10_ | · | **89±6** | **92±4** | **84±9** | **88±8** | **89±7** | **77±10** | 79.9% |
| **Heist Crew** | **70±14** | _0±0_ | _11±6_ | · | 46±12 | **70±16** | **71±12** | **81±9** | _34±13_ | 47.1% |
| **Wild West** | **67±14** | _2±2_ | _8±4_ | 54±12 | · | **69±15** | **69±11** | **82±8** | 42±11 | 48.2% |
| **Slasher** | 43±14 | _19±11_ | _16±9_ | _30±16_ | _31±15_ | · | _28±15_ | _30±16_ | _30±16_ | 27.2% |
| **Space Opera** | **66±14** | _19±11_ | _12±8_ | _29±12_ | _31±11_ | **72±15** | · | **100±1** | 55±13 | 46.5% |
| **Kaiju** | **70±15** | _0±0_ | _11±7_ | _19±9_ | _18±8_ | **70±16** | _0±1_ | · | _3±2_ | 23.5% |
| **Sportsball** | **70±15** | _13±6_ | _23±10_ | **66±13** | 58±11 | **70±16** | 45±13 | **97±2** | · | 54.5% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Swarm.
- **Genres that counter nothing** (no 60%+ matchup): Army, Slasher.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 11 of 36: Kaiju > Army 70% (edge +29); Space Opera > Kaiju 100% (edge +25); Kaiju > Slasher 70% (edge +25); Heist Crew > Space Opera 71% (edge +20); Wild West > Space Opera 69% (edge +17); Sportsball > Kaiju 97% (edge +17); Swarm > Heist Crew 100% (edge +13); Swarm > Wild West 98% (edge +12); Undead > Wild West 92% (edge +11); Swarm > Undead 68% (edge +9); Sportsball > Heist Crew 66% (edge +8).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 11.8 points; strength spread 23.5-84.9% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### mid

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **99±2** | **96±3** | **87±7** | **75±7** | _40±14_ | **85±5** | _3±2_ | **98±2** | 72.5% |
| **Swarm** | _1±2_ | · | **90±4** | **74±11** | **81±7** | 57±12 | 55±11 | _29±13_ | _36±12_ | 53.1% |
| **Undead** | _4±3_ | _10±4_ | · | **70±9** | **92±3** | 46±13 | _14±5_ | _20±13_ | _40±13_ | 36.7% |
| **Heist Crew** | _13±7_ | _26±11_ | _30±9_ | · | **81±4** | 44±14 | **90±4** | _20±13_ | **87±7** | 48.8% |
| **Wild West** | _25±7_ | _19±7_ | _8±3_ | _19±4_ | · | _14±9_ | _27±7_ | _11±7_ | 43±7 | 21.2% |
| **Slasher** | **60±14** | 43±12 | 54±13 | 56±14 | **86±9** | · | 49±12 | _19±10_ | **100±1** | 58.3% |
| **Space Opera** | _15±5_ | 46±11 | **86±5** | _10±4_ | **73±7** | 51±12 | · | _37±14_ | **100±0** | 51.9% |
| **Kaiju** | **97±2** | **71±13** | **80±13** | **80±13** | **89±7** | **81±10** | **64±14** | · | **83±11** | 80% |
| **Sportsball** | _2±2_ | **64±12** | **61±13** | _13±7_ | 57±7 | _1±1_ | _0±0_ | _17±11_ | · | 27.1% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): Kaiju.
- **Genres that counter nothing** (no 60%+ matchup): Wild West.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 18 of 36: Heist Crew > Space Opera 90% (edge +43); Sportsball > Swarm 64% (edge +39); Kaiju > Army 97% (edge +37); Undead > Heist Crew 70% (edge +32); Army > Swarm 99% (edge +29); Slasher > Army 60% (edge +26); Space Opera > Sportsball 100% (edge +25); Swarm > Undead 90% (edge +24); Undead > Wild West 92% (edge +24); Sportsball > Undead 61% (edge +21); Space Opera > Undead 86% (edge +21); Slasher > Sportsball 100% (edge +20); Swarm > Heist Crew 74% (edge +20); Heist Crew > Sportsball 87% (edge +15); Army > Space Opera 85% (edge +14); Army > Undead 96% (edge +14); Army > Heist Crew 87% (edge +13); Army > Sportsball 98% (edge +10).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 18.9 points; strength spread 21.2-80% vs an average genre. A TFT-style web needs edges of ~10-15 points.

### late

| row beats column | Army | Swarm | Undead | Heist Crew | Wild West | Slasher | Space Opera | Kaiju | Sportsball | strength |
|---|---|---|---|---|---|---|---|---|---|---|
| **Army** | · | **99±1** | **81±7** | _20±8_ | _1±1_ | **64±10** | _13±6_ | _34±12_ | _6±2_ | 40.5% |
| **Swarm** | _1±1_ | · | **81±9** | _3±2_ | _1±1_ | _0±0_ | _0±0_ | 46±13 | _0±0_ | 19.4% |
| **Undead** | _20±7_ | _19±9_ | · | **84±5** | 59±8 | _13±4_ | 57±10 | **70±15** | 44±8 | 46.1% |
| **Heist Crew** | **80±8** | **97±2** | _16±5_ | · | _29±8_ | **86±7** | **85±8** | **69±15** | _17±7_ | 59.9% |
| **Wild West** | **99±1** | **99±1** | 41±8 | **72±8** | · | _24±5_ | **92±2** | **70±15** | 59±6 | 68.6% |
| **Slasher** | _36±10_ | **100±0** | **87±4** | _14±7_ | **76±5** | · | _32±10_ | _39±12_ | **87±4** | 58.7% |
| **Space Opera** | **87±6** | **100±0** | 44±10 | _15±8_ | _8±2_ | **68±10** | · | **68±15** | **86±8** | 59.2% |
| **Kaiju** | **66±12** | 54±13 | _30±15_ | _31±15_ | _30±15_ | **61±12** | _33±15_ | · | _30±15_ | 42.5% |
| **Sportsball** | **94±2** | **100±0** | 56±8 | **83±7** | 42±6 | _13±4_ | _15±8_ | **70±15** | · | 58.8% |

- **Genres with NO clear counter** (no opponent wins 60%+ against them): none.
- **Genres that counter nothing** (no 60%+ matchup): none.
- **Flat** (every matchup 40-60%: no counter-pick decision for or against them): none.
- **Real counter matchups** (60/40+ and 8+ points of it is matchup, not strength): 27 of 36: Swarm > Undead 81% (edge +59); Undead > Heist Crew 84% (edge +47); Slasher > Sportsball 87% (edge +37); Slasher > Wild West 76% (edge +36); Army > Undead 81% (edge +36); Space Opera > Sportsball 86% (edge +35); Heist Crew > Slasher 86% (edge +34); Heist Crew > Space Opera 85% (edge +34); Sportsball > Heist Crew 83% (edge +34); Army > Slasher 64% (edge +32); Wild West > Space Opera 92% (edge +32); Kaiju > Slasher 61% (edge +26); Sportsball > Army 94% (edge +26); Army > Swarm 99% (edge +25); Slasher > Undead 87% (edge +24); Wild West > Army 99% (edge +23); Space Opera > Army 87% (edge +19); Space Opera > Slasher 68% (edge +18); Undead > Kaiju 70% (edge +16); Kaiju > Army 66% (edge +14); Slasher > Swarm 100% (edge +13); Sportsball > Swarm 100% (edge +13); Space Opera > Swarm 100% (edge +13); Wild West > Heist Crew 72% (edge +12); Heist Crew > Army 80% (edge +11); Heist Crew > Swarm 97% (edge +11); Wild West > Swarm 99% (edge +9).
- **How much is rock-paper-scissors**: matchup spread beyond strength (SD of counter edges) 25.6 points; strength spread 19.4-68.6% vs an average genre. A TFT-style web needs edges of ~10-15 points.

## Boards used (best board per team, per act)

| Team | early | mid | late |
|---|---|---|---|
| Army | riot:1:f1 mule:1:f0 fieldmed:2:b1 radio:1:b0 rifle:1:b2 | observer:2:f1 riot:2:f0 mule:2:f2 commando:2:f3 fieldmed:2:b1 rifle:2:b0 | observer:3:f1 riot:1:f0 mule:2:f2 commando:1:f3 gunny:2:b1 radio:2:b0 rifle:1:b2 |
| Swarm | ravager:1:f1 lurker:1:f0 queen:2:b1 nurse:1:b0 spitters:1:b2 | beetles:2:f1 scorpion:1:f0 ravager:2:f2 lurker:2:f3 queen:3:b1 nurse:1:b0 | beetles:2:f1 scorpion:3:f0 ravager:1:f2 lurker:2:f3 hivemind:2:b1 queen:1:b0 nurse:1:b2 |
| Undead | gravegolem:2:f1 zombies:1:f0 vampbat:1:f2 necro:1:b1 skelarch:1:b0 | gravegolem:2:f1 zombies:1:f0 vampbat:1:f2 bonesetter:1:b1 necro:3:b0 skelarch:2:b2 | gravegolem:2:f1 bonedragon:2:f0 zombies:2:f2 wraith:2:f3 bonesetter:1:b1 necro:2:b0 vampbat:2:b2 |
| Heist Crew | safecracker:1:f1 driver:1:f0 fixer:2:b1 hacker:1:b0 lookouts:1:b2 | insideman:2:f1 muscle:1:f0 safecracker:2:f2 fixer:2:b1 hacker:2:b0 lookouts:1:b2 | insideman:3:f1 muscle:2:f0 driver:1:f2 mastermind:1:b1 fixer:3:b0 hacker:2:b2 lookouts:1:b3 |
| Wild West | deputy:1:f1 outlaws:1:b1 gunslinger:2:b0 prospector:1:b2 bounty:1:b3 | sheriff:2:f1 deputy:1:f0 gunslinger:3:b1 prospector:1:b0 doc:1:b2 bounty:1:b3 | sheriff:3:f1 deputy:2:f0 outlaws:1:f2 gunslinger:1:b1 prospector:1:b0 noname:2:b2 bounty:2:b3 |
| Slasher | counselors:1:f1 chainsaw:1:f0 finalgirl:2:b1 exorcist:1:b0 babysitter:1:b2 | brute:1:f1 counselors:1:f0 chainsaw:2:f2 kids:1:f3 finalgirl:3:b1 exorcist:2:b0 | brute:3:f1 counselors:1:f0 chainsaw:1:f2 dreamstalker:2:b1 finalgirl:2:b0 exorcist:1:b2 babysitter:1:b3 |
| Space Opera | redshirts:1:f1 captain:2:f0 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:2:f1 redshirts:1:f0 captain:3:f2 telepath:1:b1 droids:1:b0 smuggler:1:b2 | starknight:3:f1 redshirts:1:f0 captain:2:f2 darklord:2:b1 telepath:1:b0 pilot:1:b2 smuggler:1:b3 |
| Kaiju | babykaiju:2:f1 hunter:1:f0 giantmoth:2:b1 tanks:1:b0 | mecha:2:f1 babykaiju:2:f0 giantmoth:3:b1 scientist:1:b0 | mecha:3:f1 kingmonster:2:b1 scientist:2:b0 hunter:2:b3 babykaiju:2:f0 |
| Sportsball | dodgeball:1:f1 headcoach:2:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:2:f1 dodgeball:1:f0 headcoach:3:b1 pointguard:1:b0 waterboy:1:b2 cheersquad:1:b3 | mascot:3:f1 dodgeball:2:f0 pitcher:2:f2 headcoach:1:b1 waterboy:1:b0 cheersquad:2:b2 qb:2:b3 |
| Guardian | gravegolem:2:f1 deputy:2:f0 muscle:1:f2 redshirts:1:f3 dodgeball:1:b1 | mecha:2:f1 gravegolem:3:f0 muscle:2:f3 counselors:1:b1 beetles:1:b0 | mecha:3:f1 sheriff:3:f0 observer:1:f3 riot:1:b1 deputy:2:b0 gravegolem:1:b2 |
| Brawler | captain:2:f1 mule:1:f0 safecracker:1:f2 babykaiju:1:f3 pitcher:1:b1 | scorpion:2:f1 captain:3:f0 mule:1:f2 safecracker:1:f3 pitcher:1:b1 ravager:1:b0 | kingmonster:2:f1 scorpion:2:f0 captain:3:f3 ravager:1:b1 chainsaw:1:b0 safecracker:2:b2 |
| Stalker | wraith:2:f1 lurker:1:f0 commando:2:f2 vampbat:2:f3 driver:1:b1 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 bounty:2:b1 smuggler:2:b0 | hunter:2:f1 lurker:2:f0 wraith:2:f2 vampbat:2:f3 noname:2:b1 bounty:2:b0 smuggler:2:b2 |
| Gunner | spitters:1:f1 finalgirl:2:b1 gunslinger:1:b0 pilot:1:b2 skelarch:1:b3 | lookouts:1:f1 tanks:2:f0 finalgirl:3:b1 gunslinger:2:b0 pointguard:1:b2 pilot:2:b3 | rifle:1:f1 pilot:1:f0 spitters:2:f2 gunny:2:b1 finalgirl:3:b0 gunslinger:2:b2 pointguard:2:b3 |
| Mystic | giantmoth:1:b1 queen:2:b0 necro:1:b3 | scientist:1:f1 headcoach:1:f0 giantmoth:1:b1 queen:3:b0 necro:2:b3 | exorcist:2:f1 queen:1:f0 headcoach:1:f2 giantmoth:3:b1 dreamstalker:2:b0 necro:2:b3 |
| Medic | reporter:1:f1 fieldmed:2:b1 fixer:1:b0 babysitter:1:b2 droids:1:b3 | cheersquad:1:f1 babysitter:1:f0 bonesetter:1:b1 fieldmed:3:b0 fixer:2:b2 reporter:2:b3 | cheersquad:1:f1 doc:2:f0 babysitter:2:f2 bonesetter:3:b1 fixer:3:b0 fieldmed:2:b2 waterboy:1:b3 |

Caveats: builder boards, not shopped boards; one placement rule (melee front, Guardians first); items and Legendaries off; a trait team mixes genres so it rarely has a genre bonus.

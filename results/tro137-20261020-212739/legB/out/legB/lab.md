# Balance lab: lv15-137.html, expert bot, 150 paired runs per config, enemies x1

Baseline win 57.3%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## legends

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Always Crossover Episode | 78.0 | +20.7 | 3.9 | 4.8 | 8.8 | 92.0 |
| Always Talent Scout | 65.3 | +8.0 | 1.5 | 4.4 | 8.6 | 60.7 |
| Always Ensemble Cast | 64.0 | +6.7 | 1.3 | 4.1 | 8.7 | 82.0 |
| Always Product Placement | 63.3 | +6.0 | 1.2 | 4.2 | 8.7 | 88.0 |
| Always Shock and Awe | 60.0 | +2.7 | 0.6 | 4.2 | 8.7 | 86.0 |
| Always Hype Train | 60.0 | +2.7 | 0.5 | 4.1 | 8.6 | 80.0 |
| Always Blockbuster | 54.7 | -2.7 | -0.5 | 3.7 | 8.6 | 80.7 |
| Always Director's Cut | 53.3 | -4.0 | -0.8 | 4.1 | 8.5 | 82.0 |
| Always Main Character Energy | 52.7 | -4.7 | -0.9 | 4.0 | 8.6 | 78.0 |
| Always Grave Recruits | 52.0 | -5.3 | -1.1 | 4.1 | 8.6 | 81.3 |
| Always Haunted Wallet | 52.0 | -5.3 | -1.1 | 4.1 | 8.6 | 78.0 |
| Always Danger Close | 51.3 | -6.0 | -1.2 | 4.1 | 8.6 | 82.7 |
| Always Underdog Story | 51.3 | -6.0 | -1.2 | 3.4 | 8.5 | 76.0 |
| Always Halftime Show | 45.3 | -12.0 | -2.4 | 3.8 | 8.4 | 75.3 |
| Always Field Hospital | 44.7 | -12.7 | -2.7 | 3.6 | 8.4 | 72.7 |
| Always Full-Court Press | 41.3 | -16.0 | -3.2 | 3.6 | 8.3 | 69.3 |
| Always Inside Job | 40.7 | -16.7 | -3.3 | 3.8 | 8.4 | 69.3 |
| Always Extended Universe | 40.7 | -16.7 | -3.4 | 4.1 | 8.5 | 71.3 |
| Always The Sequel | 38.0 | -19.3 | -3.8 | 3.5 | 8.4 | 69.3 |
| Always Game Ball | 36.7 | -20.7 | -4.0 | 3.9 | 8.4 | 70.7 |
| Always Spin-off Deal | 35.3 | -22.0 | -4.4 | 3.7 | 8.2 | 63.3 |
| Always Wanted Posters | 34.7 | -22.7 | -4.5 | 3.8 | 8.2 | 64.7 |
| Always TV Tower | 34.7 | -22.7 | -4.3 | 3.8 | 8.3 | 64.0 |
| Always Clean Getaway | 34.0 | -23.3 | -4.6 | 3.9 | 8.3 | 66.7 |
| Always Scream Queen | 33.3 | -24.0 | -4.6 | 3.9 | 8.3 | 68.0 |
| Always Cult Classic | 32.7 | -24.7 | -4.9 | 3.8 | 8.4 | 72.0 |
| Always Bloodline | 31.3 | -26.0 | -4.9 | 3.6 | 8.3 | 64.0 |
| Always Payback | 31.3 | -26.0 | -4.9 | 3.9 | 8.2 | 62.7 |
| Always Lights Out | 31.3 | -26.0 | -5.0 | 3.7 | 8.2 | 62.0 |
| No Legendary | 31.3 | -26.0 | -5.1 | 3.8 | 8.2 | 60.0 |
| Always Shield Generator | 30.7 | -26.7 | -5.2 | 3.8 | 8.2 | 63.3 |
| Always The Mothership | 30.7 | -26.7 | -5.3 | 3.9 | 8.3 | 62.7 |
| Always Indie Darling | 30.7 | -26.7 | -5.3 | 3.2 | 8.2 | 60.0 |
| Always Pheromone Trail | 30.0 | -27.3 | -5.0 | 3.6 | 8.2 | 62.7 |
| Always Graveyard Shift | 30.0 | -27.3 | -5.2 | 3.9 | 8.3 | 66.7 |
| Always Atomic Age | 30.0 | -27.3 | -5.2 | 3.7 | 8.2 | 61.3 |
| Always The Vault | 30.0 | -27.3 | -5.1 | 4.0 | 8.2 | 62.0 |
| Always Quick Draw | 29.3 | -28.0 | -5.3 | 3.8 | 8.2 | 63.3 |
| Always Six-Shooter | 28.7 | -28.7 | -5.4 | 3.7 | 8.2 | 62.7 |
| Always Feeding Frenzy | 28.7 | -28.7 | -5.4 | 3.8 | 8.2 | 64.7 |
| Always Warp Speed | 28.0 | -29.3 | -5.4 | 4.0 | 8.2 | 61.3 |
| Always Endless Brood | 26.7 | -30.7 | -5.8 | 3.9 | 8.2 | 63.3 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 58.0% | 54.0% |
| Forward Observer | army | guardian | Epic | 55.3% | 51.8% |
| Inside Man | heist | guardian | Epic | 45.3% | 57.4% |
| Giant Mecha | kaiju | guardian | Epic | 41.3% | 58.1% |
| The Brute | horror | guardian | Epic | 31.3% | 72.3% |
| Star Quarterback | ball | stalker | Mythic | 29.3% | 84.1% |
| Field Medic | army | medic | Rare | 26.7% | 47.5% |
| The Drifter | west | stalker | Mythic | 26.7% | 87.5% |
| Star Knight | space | guardian | Epic | 26.7% | 42.5% |
| Bonesetter | undead | medic | Epic | 26.0% | 53.8% |
| Gunnery Sergeant | army | gunner | Mythic | 25.3% | 89.5% |
| The Sheriff | west | guardian | Epic | 24.7% | 70.3% |
| The Mastermind | heist | gunner | Mythic | 23.3% | 88.6% |
| The Fixer | heist | medic | Rare | 22.0% | 39.4% |
| Bone Dragon | undead | brawler | Mythic | 20.7% | 67.7% |
| Emperor Scorpion | bug | brawler | Epic | 20.0% | 50.0% |
| Head Coach | ball | mystic | Rare | 18.0% | 33.3% |
| The Leviathan | kaiju | brawler | Mythic | 18.0% | 70.4% |
| The Dream Stalker | horror | mystic | Mythic | 17.3% | 80.8% |
| The Dark Lord | space | mystic | Mythic | 16.7% | 76.0% |
| The Hive Mind | bug | mystic | Mythic | 14.7% | 72.7% |
| Brood Queen | bug | mystic | Rare | 9.3% | 42.9% |
| Grave Golem | undead | guardian | Rare | 8.0% | 33.3% |
| The Final Girl | horror | gunner | Rare | 8.0% | 83.3% |
| Necromancer | undead | mystic | Rare | 4.7% | 57.1% |
| Starship Captain | space | brawler | Rare | 4.7% | 28.6% |
| Giant Moth | kaiju | mystic | Rare | 4.7% | 71.4% |
| The Gunslinger | west | gunner | Rare | 4.0% | 33.3% |
| Water Boy | ball | medic | Uncommon | 2.7% | 25.0% |
| Rifle Squad | army | gunner | Common | 2.0% | 33.3% |
| Defense Force Tanks | kaiju | gunner | Common | 2.0% | 0.0% |
| Commando | army | stalker | Common | 1.3% | 0.0% |
| Ammo Mule | army | brawler | Uncommon | 1.3% | 0.0% |
| Dodgeball Team | ball | guardian | Common | 1.3% | 0.0% |
| Cheer Squad | ball | medic | Common | 1.3% | 0.0% |
| Safecracker | heist | brawler | Uncommon | 1.3% | 0.0% |
| Radio Operator | army | mystic | Uncommon | 0.7% | 0.0% |
| Shellback Beetles | bug | guardian | Common | 0.7% | 0.0% |
| Burrow Lurker | bug | stalker | Uncommon | 0.7% | 0.0% |
| Camp Counselors | horror | guardian | Common | 0.7% | 0.0% |
| Redshirts | space | guardian | Common | 0.7% | 0.0% |
| Baby Kaiju | kaiju | brawler | Common | 0.7% | 0.0% |
| The Scientist | kaiju | mystic | Uncommon | 0.7% | 0.0% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 0.7% | 0.0% |
| Riot Shield | army | guardian | Common | 0.0% | - |
| Ravager Brood | bug | brawler | Common | 0.0% | - |
| Acid Spitters | bug | gunner | Common | 0.0% | - |
| Nurse Bee | bug | medic | Uncommon | 0.0% | - |
| Skeleton Archers | undead | gunner | Common | 0.0% | - |
| Zombie Mob | undead | brawler | Common | 0.0% | - |
| Vampire Bat | undead | stalker | Common | 0.0% | - |
| Wraith | undead | stalker | Uncommon | 0.0% | - |
| Hothead Pitcher | ball | brawler | Common | 0.0% | - |
| Point Guard | ball | gunner | Uncommon | 0.0% | - |
| The Muscle | heist | guardian | Common | 0.0% | - |
| Lookouts | heist | gunner | Common | 0.0% | - |
| Getaway Driver | heist | stalker | Common | 0.0% | - |
| The Hacker | heist | mystic | Uncommon | 0.0% | - |
| Outlaw Gang | west | brawler | Common | 0.0% | - |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Bounty Hunter | west | stalker | Uncommon | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| Creepy Kids | horror | stalker | Common | 0.0% | - |
| The Babysitter | horror | medic | Common | 0.0% | - |
| The Priest | horror | mystic | Uncommon | 0.0% | - |
| Chainsaw Maniac | horror | brawler | Uncommon | 0.0% | - |
| Repair Bots | space | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |
| Space Smuggler | space | stalker | Uncommon | 0.0% | - |
| The Telepath | space | mystic | Uncommon | 0.0% | - |
| TV Reporter | kaiju | medic | Common | 0.0% | - |

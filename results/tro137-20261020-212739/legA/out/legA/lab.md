# Balance lab: lv15-137.html, expert bot, 150 paired runs per config, enemies x1

Baseline win 53.3%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## legends

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Always Crossover Episode | 83.3 | +30.0 | 5.8 | 4.8 | 8.9 | 93.3 |
| Always Product Placement | 76.0 | +22.7 | 4.4 | 4.0 | 8.8 | 88.0 |
| Always Ensemble Cast | 70.7 | +17.3 | 3.6 | 4.6 | 8.7 | 83.3 |
| Always Talent Scout | 66.7 | +13.3 | 2.7 | 4.1 | 8.5 | 65.3 |
| Always Shock and Awe | 64.7 | +11.3 | 2.3 | 4.3 | 8.7 | 90.0 |
| Always Hype Train | 60.0 | +6.7 | 1.3 | 4.8 | 8.6 | 84.0 |
| Always Blockbuster | 60.0 | +6.7 | 1.4 | 4.5 | 8.7 | 82.7 |
| Always Main Character Energy | 58.7 | +5.3 | 1.1 | 4.5 | 8.6 | 83.3 |
| Always Danger Close | 56.0 | +2.7 | 0.5 | 4.1 | 8.7 | 84.0 |
| Always Haunted Wallet | 56.0 | +2.7 | 0.6 | 4.2 | 8.6 | 79.3 |
| Always Director's Cut | 55.3 | +2.0 | 0.4 | 4.4 | 8.5 | 77.3 |
| Always Grave Recruits | 53.3 | +0.0 | 0.0 | 4.1 | 8.6 | 80.7 |
| Always Halftime Show | 52.7 | -0.7 | -0.1 | 3.6 | 8.6 | 76.0 |
| Always Extended Universe | 52.0 | -1.3 | -0.3 | 4.2 | 8.5 | 73.3 |
| Always Inside Job | 48.7 | -4.7 | -1.0 | 4.3 | 8.4 | 73.3 |
| Always Underdog Story | 48.0 | -5.3 | -1.1 | 3.8 | 8.5 | 73.3 |
| Always Field Hospital | 44.7 | -8.7 | -1.8 | 4.1 | 8.4 | 74.0 |
| Always Game Ball | 42.0 | -11.3 | -2.5 | 4.2 | 8.4 | 71.3 |
| Always Wanted Posters | 42.0 | -11.3 | -2.3 | 3.8 | 8.4 | 70.0 |
| No Legendary | 42.0 | -11.3 | -2.4 | 3.6 | 8.3 | 68.7 |
| Always The Mothership | 40.7 | -12.7 | -2.7 | 3.9 | 8.3 | 66.0 |
| Always Cult Classic | 40.7 | -12.7 | -2.8 | 4.0 | 8.4 | 71.3 |
| Always Clean Getaway | 40.0 | -13.3 | -2.7 | 4.0 | 8.3 | 66.7 |
| Always TV Tower | 40.0 | -13.3 | -2.8 | 3.8 | 8.4 | 71.3 |
| Always Endless Brood | 39.3 | -14.0 | -2.8 | 4.2 | 8.3 | 64.0 |
| Always Pheromone Trail | 39.3 | -14.0 | -2.9 | 4.2 | 8.4 | 66.0 |
| Always Six-Shooter | 39.3 | -14.0 | -2.9 | 3.9 | 8.3 | 69.3 |
| Always Full-Court Press | 39.3 | -14.0 | -3.2 | 4.3 | 8.4 | 68.7 |
| Always Shield Generator | 39.3 | -14.0 | -2.9 | 3.9 | 8.3 | 66.0 |
| Always Graveyard Shift | 38.0 | -15.3 | -3.2 | 4.0 | 8.3 | 66.0 |
| Always Feeding Frenzy | 38.0 | -15.3 | -3.2 | 4.1 | 8.3 | 65.3 |
| Always Lights Out | 38.0 | -15.3 | -3.3 | 3.9 | 8.3 | 63.3 |
| Always The Sequel | 37.3 | -16.0 | -3.5 | 4.4 | 8.3 | 69.3 |
| Always The Vault | 37.3 | -16.0 | -3.4 | 3.9 | 8.3 | 68.7 |
| Always Bloodline | 36.7 | -16.7 | -3.4 | 3.8 | 8.3 | 66.0 |
| Always Warp Speed | 36.7 | -16.7 | -3.4 | 3.7 | 8.3 | 63.3 |
| Always Quick Draw | 36.7 | -16.7 | -3.4 | 3.9 | 8.3 | 67.3 |
| Always Indie Darling | 36.7 | -16.7 | -3.3 | 3.8 | 8.3 | 66.7 |
| Always Payback | 36.0 | -17.3 | -3.6 | 3.9 | 8.3 | 68.0 |
| Always Atomic Age | 35.3 | -18.0 | -3.9 | 4.1 | 8.3 | 67.3 |
| Always Scream Queen | 35.3 | -18.0 | -4.1 | 4.1 | 8.3 | 66.7 |
| Always Spin-off Deal | 30.0 | -23.3 | -4.6 | 3.8 | 8.3 | 66.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Forward Observer | army | guardian | Epic | 58.7% | 47.7% |
| Team Mascot | ball | guardian | Epic | 58.7% | 50.0% |
| Inside Man | heist | guardian | Epic | 48.7% | 57.5% |
| The Brute | horror | guardian | Epic | 43.3% | 47.7% |
| The Mastermind | heist | gunner | Mythic | 30.7% | 76.1% |
| Giant Mecha | kaiju | guardian | Epic | 30.0% | 46.7% |
| The Drifter | west | stalker | Mythic | 28.7% | 83.7% |
| Gunnery Sergeant | army | gunner | Mythic | 27.3% | 90.2% |
| Star Quarterback | ball | stalker | Mythic | 27.3% | 80.5% |
| Bonesetter | undead | medic | Epic | 26.7% | 57.5% |
| The Sheriff | west | guardian | Epic | 26.0% | 41.0% |
| Star Knight | space | guardian | Epic | 24.7% | 56.8% |
| Bone Dragon | undead | brawler | Mythic | 23.3% | 68.6% |
| Field Medic | army | medic | Rare | 21.3% | 28.1% |
| Head Coach | ball | mystic | Rare | 20.7% | 38.7% |
| The Dream Stalker | horror | mystic | Mythic | 19.3% | 75.9% |
| The Fixer | heist | medic | Rare | 17.3% | 46.2% |
| Emperor Scorpion | bug | brawler | Epic | 16.0% | 50.0% |
| The Hive Mind | bug | mystic | Mythic | 16.0% | 70.8% |
| The Leviathan | kaiju | brawler | Mythic | 16.0% | 83.3% |
| The Dark Lord | space | mystic | Mythic | 14.0% | 66.7% |
| The Final Girl | horror | gunner | Rare | 9.3% | 64.3% |
| Necromancer | undead | mystic | Rare | 6.0% | 33.3% |
| Rifle Squad | army | gunner | Common | 5.3% | 12.5% |
| The Gunslinger | west | gunner | Rare | 5.3% | 25.0% |
| Starship Captain | space | brawler | Rare | 5.3% | 75.0% |
| Grave Golem | undead | guardian | Rare | 4.0% | 83.3% |
| Brood Queen | bug | mystic | Rare | 3.3% | 40.0% |
| Dodgeball Team | ball | guardian | Common | 2.7% | 25.0% |
| Lookouts | heist | gunner | Common | 2.7% | 0.0% |
| Giant Moth | kaiju | mystic | Rare | 2.7% | 50.0% |
| Cheer Squad | ball | medic | Common | 2.0% | 0.0% |
| Water Boy | ball | medic | Uncommon | 2.0% | 0.0% |
| Point Guard | ball | gunner | Uncommon | 2.0% | 0.0% |
| Radio Operator | army | mystic | Uncommon | 1.3% | 0.0% |
| Ammo Mule | army | brawler | Uncommon | 1.3% | 0.0% |
| Safecracker | heist | brawler | Uncommon | 1.3% | 0.0% |
| Outlaw Gang | west | brawler | Common | 1.3% | 0.0% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 1.3% | 0.0% |
| Commando | army | stalker | Common | 0.7% | 0.0% |
| Skeleton Archers | undead | gunner | Common | 0.7% | 0.0% |
| Camp Counselors | horror | guardian | Common | 0.7% | 0.0% |
| Chainsaw Maniac | horror | brawler | Uncommon | 0.7% | 0.0% |
| Space Smuggler | space | stalker | Uncommon | 0.7% | 100.0% |
| The Telepath | space | mystic | Uncommon | 0.7% | 0.0% |
| Baby Kaiju | kaiju | brawler | Common | 0.7% | 0.0% |
| The Scientist | kaiju | mystic | Uncommon | 0.7% | 0.0% |
| Riot Shield | army | guardian | Common | 0.0% | - |
| Ravager Brood | bug | brawler | Common | 0.0% | - |
| Acid Spitters | bug | gunner | Common | 0.0% | - |
| Shellback Beetles | bug | guardian | Common | 0.0% | - |
| Burrow Lurker | bug | stalker | Uncommon | 0.0% | - |
| Nurse Bee | bug | medic | Uncommon | 0.0% | - |
| Zombie Mob | undead | brawler | Common | 0.0% | - |
| Vampire Bat | undead | stalker | Common | 0.0% | - |
| Wraith | undead | stalker | Uncommon | 0.0% | - |
| Hothead Pitcher | ball | brawler | Common | 0.0% | - |
| The Muscle | heist | guardian | Common | 0.0% | - |
| Getaway Driver | heist | stalker | Common | 0.0% | - |
| The Hacker | heist | mystic | Uncommon | 0.0% | - |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Bounty Hunter | west | stalker | Uncommon | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| Creepy Kids | horror | stalker | Common | 0.0% | - |
| The Babysitter | horror | medic | Common | 0.0% | - |
| The Priest | horror | mystic | Uncommon | 0.0% | - |
| Redshirts | space | guardian | Common | 0.0% | - |
| Repair Bots | space | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |
| Defense Force Tanks | kaiju | gunner | Common | 0.0% | - |
| TV Reporter | kaiju | medic | Common | 0.0% | - |

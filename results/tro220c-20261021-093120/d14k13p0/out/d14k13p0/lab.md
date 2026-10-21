# Balance lab: df14.html, expert bot, 300 paired runs per config, enemies x1, tune {"dfK":1.3}

Baseline win 40.3%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:ball+heist | 62.0 | +21.7 | 5.5 | 4.0 | 8.9 | 91.7 |
| pair:army+ball | 60.0 | +19.7 | 4.8 | 4.0 | 8.8 | 84.0 |
| pair:bug+ball | 59.3 | +19.0 | 4.9 | 4.3 | 8.9 | 92.3 |
| pair:heist+west | 58.7 | +18.3 | 4.6 | 3.9 | 8.8 | 86.7 |
| pair:ball+west | 58.0 | +17.7 | 4.4 | 4.0 | 8.7 | 79.3 |
| pair:ball+horror | 57.7 | +17.3 | 4.4 | 3.8 | 8.6 | 77.7 |
| pair:army+heist | 54.7 | +14.3 | 3.7 | 3.9 | 8.8 | 86.7 |
| pair:undead+heist | 54.0 | +13.7 | 3.4 | 3.9 | 8.9 | 91.3 |
| pair:army+horror | 51.0 | +10.7 | 2.8 | 3.8 | 8.5 | 70.0 |
| pair:army+bug | 49.3 | +9.0 | 2.4 | 3.7 | 8.8 | 86.3 |
| pair:bug+heist | 48.3 | +8.0 | 2.0 | 3.9 | 8.8 | 87.7 |
| pair:army+undead | 48.0 | +7.7 | 2.0 | 3.5 | 8.7 | 84.0 |
| pair:army+west | 48.0 | +7.7 | 2.0 | 3.8 | 8.6 | 69.3 |
| pair:undead+horror | 46.7 | +6.3 | 1.7 | 3.7 | 8.7 | 81.3 |
| pair:bug+horror | 43.3 | +3.0 | 0.8 | 3.6 | 8.7 | 83.0 |
| pair:undead+west | 41.0 | +0.7 | 0.2 | 3.5 | 8.5 | 70.3 |
| pair:bug+undead | 38.3 | -2.0 | -0.6 | 4.0 | 8.9 | 90.7 |
| pair:bug+west | 36.3 | -4.0 | -1.0 | 3.7 | 8.7 | 76.0 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 44.3% | 45.1% |
| Inside Man | heist | guardian | Epic | 41.7% | 40.0% |
| Forward Observer | army | guardian | Epic | 40.3% | 32.2% |
| Head Coach | ball | mystic | Rare | 28.3% | 41.2% |
| The Brute | horror | guardian | Epic | 27.0% | 29.6% |
| Giant Mecha | kaiju | guardian | Epic | 26.3% | 31.6% |
| Bonesetter | undead | medic | Epic | 22.7% | 32.4% |
| Star Quarterback | ball | stalker | Mythic | 22.3% | 73.1% |
| Emperor Scorpion | bug | brawler | Epic | 21.0% | 33.3% |
| The Fixer | heist | medic | Rare | 20.3% | 41.0% |
| The Sheriff | west | guardian | Epic | 20.3% | 29.5% |
| Field Medic | army | medic | Rare | 19.7% | 20.3% |
| The Mastermind | heist | gunner | Mythic | 19.0% | 61.4% |
| Star Knight | space | guardian | Epic | 16.7% | 32.0% |
| Gunnery Sergeant | army | gunner | Mythic | 15.7% | 57.4% |
| Dodgeball Team | ball | guardian | Common | 15.3% | 58.7% |
| Water Boy | ball | medic | Uncommon | 13.3% | 67.5% |
| Cheer Squad | ball | medic | Common | 12.3% | 54.1% |
| Point Guard | ball | gunner | Uncommon | 11.3% | 64.7% |
| Bone Dragon | undead | brawler | Mythic | 10.7% | 62.5% |
| The Leviathan | kaiju | brawler | Mythic | 10.3% | 51.6% |
| The Hive Mind | bug | mystic | Mythic | 10.0% | 53.3% |
| The Dark Lord | space | mystic | Mythic | 9.7% | 41.4% |
| The Drifter | west | stalker | Mythic | 8.3% | 60.0% |
| The Hacker | heist | mystic | Uncommon | 8.0% | 62.5% |
| Safecracker | heist | brawler | Uncommon | 7.7% | 52.2% |
| The Final Girl | horror | gunner | Rare | 7.3% | 40.9% |
| Giant Moth | kaiju | mystic | Rare | 7.3% | 40.9% |
| Lookouts | heist | gunner | Common | 7.0% | 52.4% |
| The Dream Stalker | horror | mystic | Mythic | 7.0% | 71.4% |
| Grave Golem | undead | guardian | Rare | 6.3% | 31.6% |
| The Gunslinger | west | gunner | Rare | 6.3% | 52.6% |
| Brood Queen | bug | mystic | Rare | 5.7% | 35.3% |
| Rifle Squad | army | gunner | Common | 5.3% | 25.0% |
| Necromancer | undead | mystic | Rare | 5.3% | 50.0% |
| The Muscle | heist | guardian | Common | 5.0% | 66.7% |
| Starship Captain | space | brawler | Rare | 4.7% | 42.9% |
| Radio Operator | army | mystic | Uncommon | 4.3% | 46.2% |
| Getaway Driver | heist | stalker | Common | 4.0% | 66.7% |
| Ammo Mule | army | brawler | Uncommon | 3.7% | 54.5% |
| Hothead Pitcher | ball | brawler | Common | 3.7% | 81.8% |
| Ravager Brood | bug | brawler | Common | 2.7% | 37.5% |
| Camp Counselors | horror | guardian | Common | 2.7% | 25.0% |
| Riot Shield | army | guardian | Common | 2.3% | 85.7% |
| Burrow Lurker | bug | stalker | Uncommon | 2.3% | 42.9% |
| Creepy Kids | horror | stalker | Common | 2.3% | 28.6% |
| Defense Force Tanks | kaiju | gunner | Common | 2.3% | 14.3% |
| Baby Kaiju | kaiju | brawler | Common | 2.3% | 28.6% |
| The Scientist | kaiju | mystic | Uncommon | 2.3% | 14.3% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 2.3% | 42.9% |
| Skeleton Archers | undead | gunner | Common | 2.0% | 33.3% |
| Commando | army | stalker | Common | 1.7% | 80.0% |
| Shellback Beetles | bug | guardian | Common | 1.7% | 20.0% |
| Nurse Bee | bug | medic | Uncommon | 1.7% | 40.0% |
| Zombie Mob | undead | brawler | Common | 1.7% | 40.0% |
| Acid Spitters | bug | gunner | Common | 1.3% | 25.0% |
| Wraith | undead | stalker | Uncommon | 1.0% | 66.7% |
| The Priest | horror | mystic | Uncommon | 1.0% | 33.3% |
| Redshirts | space | guardian | Common | 1.0% | 0.0% |
| Vampire Bat | undead | stalker | Common | 0.7% | 100.0% |
| Space Smuggler | space | stalker | Uncommon | 0.7% | 0.0% |
| TV Reporter | kaiju | medic | Common | 0.7% | 0.0% |
| Outlaw Gang | west | brawler | Common | 0.3% | 0.0% |
| Deputy | west | guardian | Common | 0.3% | 100.0% |
| Chainsaw Maniac | horror | brawler | Uncommon | 0.3% | 100.0% |
| Repair Bots | space | medic | Common | 0.3% | 0.0% |
| The Telepath | space | mystic | Uncommon | 0.3% | 0.0% |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Bounty Hunter | west | stalker | Uncommon | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| The Babysitter | horror | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |

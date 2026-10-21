# Balance lab: df14.html, expert bot, 300 paired runs per config, enemies x1, tune {"dfK":1.6}

Baseline win 42.7%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:ball+heist | 63.3 | +20.7 | 5.2 | 4.0 | 8.9 | 94.3 |
| pair:army+ball | 61.7 | +19.0 | 4.7 | 4.0 | 8.8 | 85.0 |
| pair:heist+west | 61.0 | +18.3 | 4.6 | 3.9 | 8.8 | 86.0 |
| pair:ball+west | 60.7 | +18.0 | 4.4 | 3.9 | 8.7 | 80.7 |
| pair:ball+horror | 60.3 | +17.7 | 4.6 | 3.9 | 8.6 | 78.3 |
| pair:bug+ball | 58.3 | +15.7 | 4.1 | 4.3 | 8.9 | 91.3 |
| pair:army+west | 55.7 | +13.0 | 3.4 | 3.9 | 8.6 | 71.7 |
| pair:army+heist | 54.3 | +11.7 | 3.0 | 3.9 | 8.8 | 87.0 |
| pair:undead+heist | 53.0 | +10.3 | 2.6 | 4.0 | 8.9 | 91.3 |
| pair:army+horror | 52.3 | +9.7 | 2.5 | 3.7 | 8.5 | 70.3 |
| pair:undead+horror | 51.7 | +9.0 | 2.3 | 3.8 | 8.7 | 82.7 |
| pair:army+bug | 51.0 | +8.3 | 2.1 | 3.6 | 8.8 | 87.7 |
| pair:army+undead | 50.7 | +8.0 | 2.1 | 3.6 | 8.8 | 84.7 |
| pair:undead+west | 48.7 | +6.0 | 1.6 | 3.8 | 8.6 | 73.3 |
| pair:bug+heist | 47.7 | +5.0 | 1.3 | 3.8 | 8.8 | 89.0 |
| pair:bug+horror | 47.0 | +4.3 | 1.1 | 3.5 | 8.7 | 84.0 |
| pair:bug+west | 45.0 | +2.3 | 0.6 | 3.7 | 8.7 | 77.7 |
| pair:bug+undead | 40.0 | -2.7 | -0.8 | 3.9 | 8.9 | 91.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 44.0% | 49.2% |
| Inside Man | heist | guardian | Epic | 41.7% | 40.8% |
| Forward Observer | army | guardian | Epic | 41.0% | 35.0% |
| Head Coach | ball | mystic | Rare | 29.0% | 49.4% |
| The Brute | horror | guardian | Epic | 27.3% | 29.3% |
| Giant Mecha | kaiju | guardian | Epic | 25.7% | 32.5% |
| Bonesetter | undead | medic | Epic | 23.3% | 35.7% |
| Star Quarterback | ball | stalker | Mythic | 23.0% | 78.3% |
| Emperor Scorpion | bug | brawler | Epic | 21.3% | 32.8% |
| The Fixer | heist | medic | Rare | 20.7% | 43.5% |
| Field Medic | army | medic | Rare | 20.3% | 26.2% |
| The Sheriff | west | guardian | Epic | 19.7% | 28.8% |
| The Mastermind | heist | gunner | Mythic | 18.7% | 66.1% |
| Star Knight | space | guardian | Epic | 17.0% | 33.3% |
| Dodgeball Team | ball | guardian | Common | 15.3% | 67.4% |
| Gunnery Sergeant | army | gunner | Mythic | 14.7% | 61.4% |
| Water Boy | ball | medic | Uncommon | 13.3% | 70.0% |
| Point Guard | ball | gunner | Uncommon | 12.3% | 73.0% |
| Cheer Squad | ball | medic | Common | 12.0% | 58.3% |
| Bone Dragon | undead | brawler | Mythic | 11.0% | 63.6% |
| The Hive Mind | bug | mystic | Mythic | 10.0% | 46.7% |
| The Dark Lord | space | mystic | Mythic | 10.0% | 43.3% |
| The Leviathan | kaiju | brawler | Mythic | 9.7% | 58.6% |
| The Drifter | west | stalker | Mythic | 8.7% | 53.8% |
| Safecracker | heist | brawler | Uncommon | 8.0% | 66.7% |
| Lookouts | heist | gunner | Common | 7.7% | 56.5% |
| The Hacker | heist | mystic | Uncommon | 7.7% | 69.6% |
| The Dream Stalker | horror | mystic | Mythic | 7.3% | 68.2% |
| Giant Moth | kaiju | mystic | Rare | 7.3% | 40.9% |
| The Final Girl | horror | gunner | Rare | 7.0% | 38.1% |
| The Gunslinger | west | gunner | Rare | 6.3% | 52.6% |
| Grave Golem | undead | guardian | Rare | 6.0% | 33.3% |
| Rifle Squad | army | gunner | Common | 5.7% | 29.4% |
| Brood Queen | bug | mystic | Rare | 5.7% | 23.5% |
| The Muscle | heist | guardian | Common | 5.3% | 81.3% |
| Necromancer | undead | mystic | Rare | 5.0% | 53.3% |
| Radio Operator | army | mystic | Uncommon | 4.7% | 57.1% |
| Getaway Driver | heist | stalker | Common | 4.3% | 61.5% |
| Starship Captain | space | brawler | Rare | 4.3% | 38.5% |
| Ammo Mule | army | brawler | Uncommon | 4.0% | 58.3% |
| Hothead Pitcher | ball | brawler | Common | 3.7% | 81.8% |
| Ravager Brood | bug | brawler | Common | 2.7% | 25.0% |
| Camp Counselors | horror | guardian | Common | 2.7% | 25.0% |
| Riot Shield | army | guardian | Common | 2.3% | 85.7% |
| Burrow Lurker | bug | stalker | Uncommon | 2.3% | 28.6% |
| Creepy Kids | horror | stalker | Common | 2.3% | 28.6% |
| Defense Force Tanks | kaiju | gunner | Common | 2.3% | 14.3% |
| Baby Kaiju | kaiju | brawler | Common | 2.3% | 28.6% |
| The Scientist | kaiju | mystic | Uncommon | 2.3% | 14.3% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 2.3% | 42.9% |
| Skeleton Archers | undead | gunner | Common | 2.0% | 33.3% |
| Zombie Mob | undead | brawler | Common | 2.0% | 33.3% |
| Commando | army | stalker | Common | 1.7% | 80.0% |
| Shellback Beetles | bug | guardian | Common | 1.7% | 20.0% |
| Nurse Bee | bug | medic | Uncommon | 1.7% | 20.0% |
| Acid Spitters | bug | gunner | Common | 1.3% | 0.0% |
| Wraith | undead | stalker | Uncommon | 1.3% | 75.0% |
| The Priest | horror | mystic | Uncommon | 1.0% | 33.3% |
| Redshirts | space | guardian | Common | 1.0% | 0.0% |
| Vampire Bat | undead | stalker | Common | 0.7% | 100.0% |
| Chainsaw Maniac | horror | brawler | Uncommon | 0.7% | 50.0% |
| Space Smuggler | space | stalker | Uncommon | 0.7% | 0.0% |
| TV Reporter | kaiju | medic | Common | 0.7% | 0.0% |
| Outlaw Gang | west | brawler | Common | 0.3% | 0.0% |
| Deputy | west | guardian | Common | 0.3% | 100.0% |
| Repair Bots | space | medic | Common | 0.3% | 0.0% |
| The Telepath | space | mystic | Uncommon | 0.3% | 0.0% |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Bounty Hunter | west | stalker | Uncommon | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| The Babysitter | horror | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |

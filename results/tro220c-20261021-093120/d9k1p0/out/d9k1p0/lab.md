# Balance lab: df9.html, expert bot, 300 paired runs per config, enemies x1, tune {"dfK":1}

Baseline win 56.7%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:ball+heist | 85.7 | +29.0 | 7.8 | 6.3 | 8.9 | 95.0 |
| pair:ball+horror | 78.7 | +22.0 | 5.7 | 5.8 | 8.8 | 88.0 |
| pair:undead+heist | 76.7 | +20.0 | 5.3 | 6.0 | 8.9 | 95.7 |
| pair:army+ball | 76.3 | +19.7 | 5.5 | 6.0 | 8.9 | 90.3 |
| pair:heist+west | 74.7 | +18.0 | 4.9 | 5.6 | 8.9 | 88.0 |
| pair:army+undead | 74.0 | +17.3 | 4.6 | 5.5 | 8.9 | 90.0 |
| pair:bug+ball | 73.7 | +17.0 | 4.3 | 6.1 | 8.9 | 94.7 |
| pair:ball+west | 72.7 | +16.0 | 4.2 | 5.9 | 8.8 | 82.0 |
| pair:army+heist | 71.7 | +15.0 | 4.1 | 5.8 | 8.9 | 90.3 |
| pair:undead+horror | 70.7 | +14.0 | 3.7 | 5.6 | 8.8 | 84.3 |
| pair:bug+heist | 69.7 | +13.0 | 3.6 | 5.8 | 8.9 | 95.0 |
| pair:bug+undead | 68.3 | +11.7 | 3.0 | 5.2 | 8.9 | 94.7 |
| pair:army+horror | 64.0 | +7.3 | 1.9 | 5.5 | 8.7 | 78.7 |
| pair:army+bug | 63.7 | +7.0 | 1.8 | 5.7 | 8.9 | 92.0 |
| pair:bug+horror | 62.7 | +6.0 | 1.6 | 5.5 | 8.7 | 85.0 |
| pair:army+west | 60.3 | +3.7 | 1.0 | 5.2 | 8.8 | 76.3 |
| pair:undead+west | 59.0 | +2.3 | 0.6 | 5.6 | 8.7 | 74.0 |
| pair:bug+west | 49.3 | -7.3 | -1.8 | 5.3 | 8.8 | 76.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 54.0% | 59.9% |
| Forward Observer | army | guardian | Epic | 45.3% | 49.3% |
| Inside Man | heist | guardian | Epic | 44.3% | 53.4% |
| Star Quarterback | ball | stalker | Mythic | 29.3% | 77.3% |
| The Brute | horror | guardian | Epic | 28.3% | 51.8% |
| Head Coach | ball | mystic | Rare | 27.7% | 62.7% |
| The Mastermind | heist | gunner | Mythic | 26.3% | 70.9% |
| Bonesetter | undead | medic | Epic | 24.7% | 54.1% |
| The Sheriff | west | guardian | Epic | 23.7% | 42.3% |
| Field Medic | army | medic | Rare | 23.0% | 42.0% |
| Emperor Scorpion | bug | brawler | Epic | 21.0% | 42.9% |
| Gunnery Sergeant | army | gunner | Mythic | 20.7% | 64.5% |
| Star Knight | space | guardian | Epic | 17.7% | 43.4% |
| Giant Mecha | kaiju | guardian | Epic | 17.3% | 44.2% |
| The Fixer | heist | medic | Rare | 16.7% | 58.0% |
| The Hive Mind | bug | mystic | Mythic | 16.3% | 53.1% |
| The Leviathan | kaiju | brawler | Mythic | 16.3% | 65.3% |
| Dodgeball Team | ball | guardian | Common | 14.0% | 83.3% |
| Bone Dragon | undead | brawler | Mythic | 12.3% | 75.7% |
| Cheer Squad | ball | medic | Common | 12.3% | 81.1% |
| Point Guard | ball | gunner | Uncommon | 11.7% | 88.6% |
| The Dream Stalker | horror | mystic | Mythic | 11.3% | 70.6% |
| The Drifter | west | stalker | Mythic | 11.0% | 66.7% |
| Water Boy | ball | medic | Uncommon | 10.7% | 84.4% |
| The Dark Lord | space | mystic | Mythic | 9.7% | 65.5% |
| Lookouts | heist | gunner | Common | 7.7% | 56.5% |
| Rifle Squad | army | gunner | Common | 7.3% | 45.5% |
| Grave Golem | undead | guardian | Rare | 6.7% | 30.0% |
| Safecracker | heist | brawler | Uncommon | 6.7% | 65.0% |
| The Hacker | heist | mystic | Uncommon | 6.7% | 60.0% |
| Hothead Pitcher | ball | brawler | Common | 6.3% | 94.7% |
| The Final Girl | horror | gunner | Rare | 6.0% | 44.4% |
| Giant Moth | kaiju | mystic | Rare | 6.0% | 44.4% |
| Brood Queen | bug | mystic | Rare | 5.7% | 52.9% |
| Starship Captain | space | brawler | Rare | 5.0% | 46.7% |
| The Gunslinger | west | gunner | Rare | 4.7% | 35.7% |
| Ammo Mule | army | brawler | Uncommon | 4.0% | 66.7% |
| Necromancer | undead | mystic | Rare | 4.0% | 58.3% |
| The Muscle | heist | guardian | Common | 4.0% | 58.3% |
| Radio Operator | army | mystic | Uncommon | 3.3% | 70.0% |
| Baby Kaiju | kaiju | brawler | Common | 3.3% | 40.0% |
| Getaway Driver | heist | stalker | Common | 3.0% | 100.0% |
| Riot Shield | army | guardian | Common | 2.7% | 62.5% |
| Ravager Brood | bug | brawler | Common | 2.0% | 83.3% |
| Burrow Lurker | bug | stalker | Uncommon | 2.0% | 83.3% |
| Zombie Mob | undead | brawler | Common | 1.7% | 80.0% |
| The Scientist | kaiju | mystic | Uncommon | 1.7% | 40.0% |
| Commando | army | stalker | Common | 1.3% | 75.0% |
| Shellback Beetles | bug | guardian | Common | 1.3% | 50.0% |
| Skeleton Archers | undead | gunner | Common | 1.3% | 100.0% |
| Wraith | undead | stalker | Uncommon | 1.3% | 75.0% |
| Defense Force Tanks | kaiju | gunner | Common | 1.3% | 25.0% |
| Nurse Bee | bug | medic | Uncommon | 1.0% | 100.0% |
| Camp Counselors | horror | guardian | Common | 1.0% | 66.7% |
| Creepy Kids | horror | stalker | Common | 1.0% | 66.7% |
| Chainsaw Maniac | horror | brawler | Uncommon | 1.0% | 33.3% |
| Acid Spitters | bug | gunner | Common | 0.7% | 100.0% |
| The Babysitter | horror | medic | Common | 0.7% | 100.0% |
| The Priest | horror | mystic | Uncommon | 0.7% | 100.0% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 0.7% | 100.0% |
| Vampire Bat | undead | stalker | Common | 0.3% | 100.0% |
| Redshirts | space | guardian | Common | 0.3% | 0.0% |
| Space Smuggler | space | stalker | Uncommon | 0.3% | 0.0% |
| The Telepath | space | mystic | Uncommon | 0.3% | 100.0% |
| Outlaw Gang | west | brawler | Common | 0.0% | - |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Bounty Hunter | west | stalker | Uncommon | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| Repair Bots | space | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |
| TV Reporter | kaiju | medic | Common | 0.0% | - |

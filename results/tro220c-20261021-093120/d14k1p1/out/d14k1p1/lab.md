# Balance lab: df14.html, expert bot, 300 paired runs per config, enemies x1, tune {"dfK":1}

Baseline win 42.0%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:undead+ball | 65.7 | +23.7 | 6.0 | 4.2 | 8.9 | 94.3 |
| pair:army+kaiju | 63.0 | +21.0 | 5.2 | 3.5 | 8.6 | 75.0 |
| pair:ball+kaiju | 62.7 | +20.7 | 5.4 | 3.9 | 8.7 | 79.0 |
| pair:heist+kaiju | 57.0 | +15.0 | 3.9 | 3.9 | 8.6 | 77.7 |
| pair:ball+space | 55.3 | +13.3 | 3.5 | 3.8 | 8.6 | 77.0 |
| pair:heist+horror | 54.3 | +12.3 | 3.2 | 3.7 | 8.6 | 78.7 |
| pair:horror+kaiju | 51.3 | +9.3 | 2.3 | 3.3 | 8.2 | 61.0 |
| pair:army+space | 50.3 | +8.3 | 2.1 | 3.7 | 8.5 | 67.7 |
| pair:space+kaiju | 48.3 | +6.3 | 1.6 | 3.2 | 8.2 | 51.7 |
| pair:undead+kaiju | 47.0 | +5.0 | 1.3 | 3.5 | 8.6 | 74.0 |
| pair:west+kaiju | 46.7 | +4.7 | 1.2 | 3.5 | 8.2 | 52.7 |
| pair:bug+kaiju | 45.3 | +3.3 | 0.9 | 3.6 | 8.5 | 72.3 |
| pair:heist+space | 44.3 | +2.3 | 0.6 | 3.8 | 8.5 | 73.0 |
| pair:horror+space | 41.7 | -0.3 | -0.1 | 3.4 | 8.2 | 54.7 |
| pair:west+horror | 38.0 | -4.0 | -1.0 | 3.4 | 8.0 | 53.7 |
| pair:undead+space | 35.7 | -6.3 | -1.7 | 3.7 | 8.4 | 66.0 |
| pair:west+space | 33.7 | -8.3 | -2.2 | 3.4 | 8.1 | 45.3 |
| pair:bug+space | 29.0 | -13.0 | -3.4 | 3.8 | 8.4 | 64.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 46.7% | 47.9% |
| Inside Man | heist | guardian | Epic | 41.3% | 39.5% |
| Forward Observer | army | guardian | Epic | 41.0% | 36.6% |
| The Brute | horror | guardian | Epic | 28.3% | 29.4% |
| Head Coach | ball | mystic | Rare | 27.3% | 45.1% |
| Giant Mecha | kaiju | guardian | Epic | 25.7% | 32.5% |
| Bonesetter | undead | medic | Epic | 24.0% | 33.3% |
| Star Quarterback | ball | stalker | Mythic | 23.3% | 72.9% |
| Emperor Scorpion | bug | brawler | Epic | 21.3% | 35.9% |
| The Sheriff | west | guardian | Epic | 21.3% | 29.7% |
| The Fixer | heist | medic | Rare | 20.7% | 43.5% |
| Field Medic | army | medic | Rare | 19.7% | 25.4% |
| The Mastermind | heist | gunner | Mythic | 18.3% | 63.6% |
| Star Knight | space | guardian | Epic | 17.0% | 35.3% |
| Gunnery Sergeant | army | gunner | Mythic | 15.0% | 62.2% |
| Dodgeball Team | ball | guardian | Common | 14.7% | 61.4% |
| Water Boy | ball | medic | Uncommon | 13.0% | 71.8% |
| Cheer Squad | ball | medic | Common | 12.3% | 56.8% |
| Point Guard | ball | gunner | Uncommon | 11.3% | 67.6% |
| The Dark Lord | space | mystic | Mythic | 11.3% | 47.1% |
| Bone Dragon | undead | brawler | Mythic | 11.0% | 66.7% |
| The Leviathan | kaiju | brawler | Mythic | 10.7% | 53.1% |
| The Hive Mind | bug | mystic | Mythic | 10.3% | 51.6% |
| The Drifter | west | stalker | Mythic | 9.3% | 53.6% |
| Safecracker | heist | brawler | Uncommon | 7.3% | 54.5% |
| The Hacker | heist | mystic | Uncommon | 7.3% | 63.6% |
| The Final Girl | horror | gunner | Rare | 7.3% | 45.5% |
| Giant Moth | kaiju | mystic | Rare | 7.3% | 40.9% |
| Lookouts | heist | gunner | Common | 7.0% | 57.1% |
| The Dream Stalker | horror | mystic | Mythic | 7.0% | 76.2% |
| The Gunslinger | west | gunner | Rare | 6.7% | 45.0% |
| Grave Golem | undead | guardian | Rare | 5.7% | 29.4% |
| Rifle Squad | army | gunner | Common | 5.0% | 33.3% |
| The Muscle | heist | guardian | Common | 5.0% | 73.3% |
| Starship Captain | space | brawler | Rare | 5.0% | 46.7% |
| Brood Queen | bug | mystic | Rare | 4.7% | 28.6% |
| Necromancer | undead | mystic | Rare | 4.0% | 50.0% |
| Radio Operator | army | mystic | Uncommon | 3.7% | 54.5% |
| Ammo Mule | army | brawler | Uncommon | 3.7% | 63.6% |
| Getaway Driver | heist | stalker | Common | 3.7% | 72.7% |
| Hothead Pitcher | ball | brawler | Common | 3.3% | 80.0% |
| Riot Shield | army | guardian | Common | 2.7% | 75.0% |
| Ravager Brood | bug | brawler | Common | 2.7% | 37.5% |
| Camp Counselors | horror | guardian | Common | 2.7% | 25.0% |
| Creepy Kids | horror | stalker | Common | 2.3% | 28.6% |
| Defense Force Tanks | kaiju | gunner | Common | 2.3% | 14.3% |
| Baby Kaiju | kaiju | brawler | Common | 2.3% | 28.6% |
| The Scientist | kaiju | mystic | Uncommon | 2.3% | 14.3% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 2.3% | 42.9% |
| Burrow Lurker | bug | stalker | Uncommon | 2.0% | 33.3% |
| Skeleton Archers | undead | gunner | Common | 2.0% | 33.3% |
| Commando | army | stalker | Common | 1.7% | 80.0% |
| Shellback Beetles | bug | guardian | Common | 1.7% | 20.0% |
| Nurse Bee | bug | medic | Uncommon | 1.7% | 40.0% |
| Zombie Mob | undead | brawler | Common | 1.7% | 40.0% |
| Acid Spitters | bug | gunner | Common | 1.3% | 25.0% |
| Wraith | undead | stalker | Uncommon | 1.0% | 66.7% |
| The Priest | horror | mystic | Uncommon | 1.0% | 33.3% |
| Vampire Bat | undead | stalker | Common | 0.7% | 100.0% |
| Redshirts | space | guardian | Common | 0.7% | 0.0% |
| TV Reporter | kaiju | medic | Common | 0.7% | 0.0% |
| Outlaw Gang | west | brawler | Common | 0.3% | 0.0% |
| Chainsaw Maniac | horror | brawler | Uncommon | 0.3% | 100.0% |
| Repair Bots | space | medic | Common | 0.3% | 0.0% |
| Space Smuggler | space | stalker | Uncommon | 0.3% | 0.0% |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Bounty Hunter | west | stalker | Uncommon | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| The Babysitter | horror | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |
| The Telepath | space | mystic | Uncommon | 0.0% | - |

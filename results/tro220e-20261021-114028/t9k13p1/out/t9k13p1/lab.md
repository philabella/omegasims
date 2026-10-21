# Balance lab: dt9.html, expert bot, 300 paired runs per config, enemies x1, tune {"dfK":1.3,"dfT":1}

Baseline win 59.7%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:west+space | 54.7 | -5.0 | -1.3 | 4.9 | 8.8 | 22.3 |
| pair:west+horror | 48.0 | -11.7 | -3.0 | 4.8 | 8.6 | 20.3 |
| pair:horror+space | 40.3 | -19.3 | -4.6 | 4.5 | 8.5 | 18.0 |
| pair:army+kaiju | 39.3 | -20.3 | -5.0 | 5.0 | 8.5 | 27.7 |
| pair:west+kaiju | 38.3 | -21.3 | -5.2 | 4.8 | 8.4 | 25.3 |
| pair:heist+horror | 30.0 | -29.7 | -7.4 | 4.4 | 8.5 | 22.0 |
| pair:undead+ball | 30.0 | -29.7 | -7.2 | 5.1 | 8.5 | 9.7 |
| pair:army+space | 29.7 | -30.0 | -7.0 | 4.2 | 8.6 | 21.7 |
| pair:horror+kaiju | 28.7 | -31.0 | -7.7 | 4.5 | 8.2 | 20.3 |
| pair:heist+space | 26.3 | -33.3 | -7.8 | 4.2 | 8.5 | 17.7 |
| pair:space+kaiju | 26.0 | -33.7 | -8.1 | 4.1 | 8.3 | 20.7 |
| pair:undead+space | 25.7 | -34.0 | -8.3 | 4.7 | 8.5 | 15.0 |
| pair:ball+space | 25.7 | -34.0 | -8.2 | 4.4 | 8.4 | 15.0 |
| pair:bug+kaiju | 25.0 | -34.7 | -8.6 | 4.8 | 8.3 | 23.0 |
| pair:heist+kaiju | 23.3 | -36.3 | -8.8 | 4.3 | 8.3 | 21.3 |
| pair:undead+kaiju | 22.3 | -37.3 | -8.9 | 4.8 | 8.3 | 18.7 |
| pair:ball+kaiju | 22.0 | -37.7 | -8.8 | 4.4 | 8.3 | 16.7 |
| pair:bug+space | 21.0 | -38.7 | -9.2 | 4.7 | 8.6 | 17.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 41.3% | 59.7% |
| Head Coach | ball | mystic | Rare | 35.7% | 62.6% |
| Forward Observer | army | guardian | Epic | 34.0% | 56.9% |
| Field Medic | army | medic | Rare | 33.7% | 60.4% |
| Inside Man | heist | guardian | Epic | 26.7% | 62.5% |
| Star Quarterback | ball | stalker | Mythic | 23.3% | 82.9% |
| The Fixer | heist | medic | Rare | 22.7% | 63.2% |
| Dodgeball Team | ball | guardian | Common | 22.3% | 73.1% |
| Gunnery Sergeant | army | gunner | Mythic | 19.3% | 69.0% |
| Water Boy | ball | medic | Uncommon | 19.0% | 70.2% |
| Giant Mecha | kaiju | guardian | Epic | 18.0% | 46.3% |
| The Brute | horror | guardian | Epic | 17.0% | 49.0% |
| Cheer Squad | ball | medic | Common | 16.0% | 72.9% |
| Rifle Squad | army | gunner | Common | 14.7% | 63.6% |
| Point Guard | ball | gunner | Uncommon | 14.3% | 74.4% |
| Ammo Mule | army | brawler | Uncommon | 14.0% | 64.3% |
| The Mastermind | heist | gunner | Mythic | 14.0% | 81.0% |
| The Final Girl | horror | gunner | Rare | 14.0% | 59.5% |
| Radio Operator | army | mystic | Uncommon | 12.7% | 81.6% |
| Bonesetter | undead | medic | Epic | 12.0% | 41.7% |
| Lookouts | heist | gunner | Common | 12.0% | 63.9% |
| Giant Moth | kaiju | mystic | Rare | 11.0% | 36.4% |
| Safecracker | heist | brawler | Uncommon | 10.0% | 86.7% |
| Emperor Scorpion | bug | brawler | Epic | 9.3% | 57.1% |
| Grave Golem | undead | guardian | Rare | 9.3% | 50.0% |
| Necromancer | undead | mystic | Rare | 9.0% | 44.4% |
| The Hacker | heist | mystic | Uncommon | 9.0% | 77.8% |
| Star Knight | space | guardian | Epic | 8.3% | 44.0% |
| The Dream Stalker | horror | mystic | Mythic | 8.0% | 75.0% |
| The Leviathan | kaiju | brawler | Mythic | 7.3% | 81.8% |
| The Sheriff | west | guardian | Epic | 7.0% | 52.4% |
| Hothead Pitcher | ball | brawler | Common | 6.7% | 85.0% |
| Riot Shield | army | guardian | Common | 6.3% | 68.4% |
| Brood Queen | bug | mystic | Rare | 6.0% | 72.2% |
| The Hive Mind | bug | mystic | Mythic | 5.0% | 53.3% |
| Camp Counselors | horror | guardian | Common | 5.0% | 46.7% |
| Chainsaw Maniac | horror | brawler | Uncommon | 5.0% | 66.7% |
| Bone Dragon | undead | brawler | Mythic | 4.7% | 64.3% |
| The Gunslinger | west | gunner | Rare | 4.7% | 64.3% |
| Creepy Kids | horror | stalker | Common | 4.7% | 50.0% |
| Starship Captain | space | brawler | Rare | 4.7% | 42.9% |
| Commando | army | stalker | Common | 4.3% | 38.5% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 4.3% | 69.2% |
| The Muscle | heist | guardian | Common | 3.7% | 72.7% |
| The Priest | horror | mystic | Uncommon | 3.7% | 90.9% |
| Defense Force Tanks | kaiju | gunner | Common | 3.7% | 54.5% |
| Baby Kaiju | kaiju | brawler | Common | 3.3% | 50.0% |
| The Scientist | kaiju | mystic | Uncommon | 3.3% | 40.0% |
| Zombie Mob | undead | brawler | Common | 3.0% | 66.7% |
| Getaway Driver | heist | stalker | Common | 3.0% | 66.7% |
| The Drifter | west | stalker | Mythic | 2.7% | 62.5% |
| Skeleton Archers | undead | gunner | Common | 2.3% | 57.1% |
| Space Smuggler | space | stalker | Uncommon | 2.0% | 50.0% |
| Ravager Brood | bug | brawler | Common | 1.7% | 60.0% |
| Nurse Bee | bug | medic | Uncommon | 1.7% | 40.0% |
| The Dark Lord | space | mystic | Mythic | 1.7% | 60.0% |
| Acid Spitters | bug | gunner | Common | 1.3% | 100.0% |
| Burrow Lurker | bug | stalker | Uncommon | 1.3% | 75.0% |
| Wraith | undead | stalker | Uncommon | 1.3% | 25.0% |
| The Telepath | space | mystic | Uncommon | 1.3% | 25.0% |
| Bounty Hunter | west | stalker | Uncommon | 1.0% | 66.7% |
| The Babysitter | horror | medic | Common | 1.0% | 33.3% |
| Shellback Beetles | bug | guardian | Common | 0.7% | 50.0% |
| Outlaw Gang | west | brawler | Common | 0.7% | 50.0% |
| Saloon Doc | west | medic | Common | 0.7% | 100.0% |
| Repair Bots | space | medic | Common | 0.7% | 0.0% |
| Vampire Bat | undead | stalker | Common | 0.3% | 100.0% |
| Deputy | west | guardian | Common | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| Redshirts | space | guardian | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |
| TV Reporter | kaiju | medic | Common | 0.0% | - |

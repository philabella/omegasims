# Balance lab: dt14.html, expert bot, 300 paired runs per config, enemies x1, tune {"dfK":1.5,"dfT":1}

Baseline win 44.0%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:army+kaiju | 39.0 | -5.0 | -1.2 | 3.8 | 8.2 | 22.0 |
| pair:west+horror | 34.0 | -10.0 | -2.7 | 3.6 | 8.3 | 21.7 |
| pair:west+space | 34.0 | -10.0 | -2.6 | 3.5 | 8.5 | 21.3 |
| pair:army+space | 33.7 | -10.3 | -2.6 | 3.4 | 8.3 | 20.0 |
| pair:space+kaiju | 33.3 | -10.7 | -2.8 | 3.5 | 8.0 | 16.7 |
| pair:horror+space | 31.0 | -13.0 | -3.5 | 3.5 | 8.3 | 19.7 |
| pair:west+kaiju | 27.3 | -16.7 | -4.3 | 3.6 | 8.1 | 20.7 |
| pair:horror+kaiju | 26.3 | -17.7 | -4.7 | 3.5 | 7.9 | 23.7 |
| pair:heist+space | 22.7 | -21.3 | -5.6 | 3.5 | 8.3 | 18.3 |
| pair:bug+kaiju | 22.7 | -21.3 | -5.4 | 3.4 | 8.2 | 18.7 |
| pair:heist+horror | 21.3 | -22.7 | -6.1 | 3.2 | 8.3 | 19.0 |
| pair:ball+kaiju | 19.3 | -24.7 | -6.2 | 3.1 | 8.0 | 16.0 |
| pair:undead+kaiju | 19.0 | -25.0 | -6.5 | 3.4 | 8.1 | 16.3 |
| pair:undead+ball | 18.7 | -25.3 | -6.8 | 3.3 | 8.3 | 12.0 |
| pair:heist+kaiju | 18.0 | -26.0 | -6.9 | 2.9 | 8.0 | 15.0 |
| pair:bug+space | 17.7 | -26.3 | -6.7 | 3.6 | 8.4 | 15.7 |
| pair:undead+space | 16.0 | -28.0 | -7.2 | 3.5 | 8.3 | 10.3 |
| pair:ball+space | 15.0 | -29.0 | -7.3 | 3.1 | 8.3 | 13.0 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Head Coach | ball | mystic | Rare | 36.7% | 41.8% |
| Team Mascot | ball | guardian | Epic | 34.7% | 42.3% |
| Field Medic | army | medic | Rare | 30.7% | 58.7% |
| Forward Observer | army | guardian | Epic | 30.7% | 53.3% |
| Inside Man | heist | guardian | Epic | 23.7% | 49.3% |
| Giant Mecha | kaiju | guardian | Epic | 23.3% | 42.9% |
| The Fixer | heist | medic | Rare | 21.7% | 49.2% |
| Dodgeball Team | ball | guardian | Common | 18.7% | 33.9% |
| The Brute | horror | guardian | Epic | 18.7% | 37.5% |
| Gunnery Sergeant | army | gunner | Mythic | 18.0% | 77.8% |
| Rifle Squad | army | gunner | Common | 17.7% | 52.8% |
| Star Quarterback | ball | stalker | Mythic | 16.7% | 62.0% |
| Water Boy | ball | medic | Uncommon | 15.3% | 37.0% |
| Cheer Squad | ball | medic | Common | 14.7% | 29.5% |
| The Final Girl | horror | gunner | Rare | 14.7% | 43.2% |
| The Mastermind | heist | gunner | Mythic | 14.0% | 61.9% |
| Point Guard | ball | gunner | Uncommon | 13.3% | 45.0% |
| Giant Moth | kaiju | mystic | Rare | 13.0% | 25.6% |
| Radio Operator | army | mystic | Uncommon | 12.3% | 62.2% |
| Ammo Mule | army | brawler | Uncommon | 12.0% | 75.0% |
| Bonesetter | undead | medic | Epic | 11.0% | 51.5% |
| Emperor Scorpion | bug | brawler | Epic | 10.0% | 30.0% |
| Safecracker | heist | brawler | Uncommon | 9.7% | 51.7% |
| The Hacker | heist | mystic | Uncommon | 9.3% | 46.4% |
| Brood Queen | bug | mystic | Rare | 9.0% | 44.4% |
| Grave Golem | undead | guardian | Rare | 9.0% | 55.6% |
| The Leviathan | kaiju | brawler | Mythic | 8.3% | 64.0% |
| Lookouts | heist | gunner | Common | 8.0% | 41.7% |
| Starship Captain | space | brawler | Rare | 8.0% | 50.0% |
| The Sheriff | west | guardian | Epic | 7.7% | 43.5% |
| Star Knight | space | guardian | Epic | 7.7% | 43.5% |
| Creepy Kids | horror | stalker | Common | 7.3% | 27.3% |
| The Dream Stalker | horror | mystic | Mythic | 7.0% | 61.9% |
| Baby Kaiju | kaiju | brawler | Common | 6.3% | 47.4% |
| The Hive Mind | bug | mystic | Mythic | 6.0% | 55.6% |
| Necromancer | undead | mystic | Rare | 6.0% | 55.6% |
| Camp Counselors | horror | guardian | Common | 6.0% | 16.7% |
| Bone Dragon | undead | brawler | Mythic | 5.3% | 62.5% |
| The Gunslinger | west | gunner | Rare | 5.3% | 50.0% |
| Defense Force Tanks | kaiju | gunner | Common | 5.3% | 25.0% |
| Chainsaw Maniac | horror | brawler | Uncommon | 5.0% | 60.0% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 4.7% | 42.9% |
| The Priest | horror | mystic | Uncommon | 4.3% | 38.5% |
| The Dark Lord | space | mystic | Mythic | 4.0% | 66.7% |
| Riot Shield | army | guardian | Common | 3.7% | 63.6% |
| Hothead Pitcher | ball | brawler | Common | 3.7% | 18.2% |
| Commando | army | stalker | Common | 3.3% | 70.0% |
| Burrow Lurker | bug | stalker | Uncommon | 3.0% | 22.2% |
| The Drifter | west | stalker | Mythic | 2.7% | 87.5% |
| The Scientist | kaiju | mystic | Uncommon | 2.7% | 12.5% |
| Getaway Driver | heist | stalker | Common | 2.3% | 28.6% |
| The Muscle | heist | guardian | Common | 2.0% | 66.7% |
| Outlaw Gang | west | brawler | Common | 2.0% | 33.3% |
| Redshirts | space | guardian | Common | 2.0% | 33.3% |
| Repair Bots | space | medic | Common | 2.0% | 33.3% |
| Nurse Bee | bug | medic | Uncommon | 1.7% | 40.0% |
| Zombie Mob | undead | brawler | Common | 1.7% | 60.0% |
| Ravager Brood | bug | brawler | Common | 1.3% | 50.0% |
| Wraith | undead | stalker | Uncommon | 1.3% | 25.0% |
| Bounty Hunter | west | stalker | Uncommon | 1.3% | 75.0% |
| The Telepath | space | mystic | Uncommon | 1.3% | 50.0% |
| Acid Spitters | bug | gunner | Common | 1.0% | 33.3% |
| Shellback Beetles | bug | guardian | Common | 1.0% | 0.0% |
| The Babysitter | horror | medic | Common | 1.0% | 33.3% |
| Space Smuggler | space | stalker | Uncommon | 1.0% | 33.3% |
| Skeleton Archers | undead | gunner | Common | 0.7% | 0.0% |
| Prospector | west | mystic | Uncommon | 0.7% | 50.0% |
| Vampire Bat | undead | stalker | Common | 0.3% | 0.0% |
| Hotshot Pilot | space | gunner | Common | 0.3% | 0.0% |
| TV Reporter | kaiju | medic | Common | 0.3% | 100.0% |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |

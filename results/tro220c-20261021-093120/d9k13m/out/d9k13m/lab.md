# Balance lab: df9.html, expert bot, 300 paired runs per config, enemies x1, tune {"dfK":1.3}

Baseline win 56.3%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## mono

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Only Sportsball | 92.3 | +36.0 | 9.3 | 6.1 | 9.0 | 97.7 |
| Only Slasher | 85.0 | +28.7 | 7.5 | 4.9 | 8.8 | 89.7 |
| Only Heist Crew | 81.0 | +24.7 | 6.5 | 5.7 | 8.9 | 95.3 |
| Only Wild West | 81.0 | +24.7 | 6.3 | 5.6 | 8.8 | 86.3 |
| Only Space Opera | 79.3 | +23.0 | 5.9 | 5.1 | 8.8 | 88.0 |
| Only Undead | 79.0 | +22.7 | 5.8 | 5.4 | 8.9 | 94.7 |
| Only Army | 72.0 | +15.7 | 4.0 | 5.3 | 8.8 | 93.3 |
| Only Kaiju | 60.0 | +3.7 | 0.9 | 4.5 | 8.6 | 69.3 |
| Only Swarm | 58.0 | +1.7 | 0.4 | 5.5 | 8.9 | 97.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 53.0% | 58.5% |
| Forward Observer | army | guardian | Epic | 44.7% | 47.0% |
| Inside Man | heist | guardian | Epic | 43.0% | 53.5% |
| Head Coach | ball | mystic | Rare | 29.0% | 60.9% |
| Star Quarterback | ball | stalker | Mythic | 29.0% | 77.0% |
| The Brute | horror | guardian | Epic | 26.3% | 49.4% |
| Field Medic | army | medic | Rare | 25.3% | 42.1% |
| The Mastermind | heist | gunner | Mythic | 24.7% | 74.3% |
| Bonesetter | undead | medic | Epic | 24.0% | 59.7% |
| The Sheriff | west | guardian | Epic | 23.0% | 44.9% |
| Gunnery Sergeant | army | gunner | Mythic | 20.7% | 66.1% |
| Emperor Scorpion | bug | brawler | Epic | 19.3% | 41.4% |
| The Fixer | heist | medic | Rare | 17.3% | 59.6% |
| Star Knight | space | guardian | Epic | 17.3% | 42.3% |
| Giant Mecha | kaiju | guardian | Epic | 16.7% | 44.0% |
| The Leviathan | kaiju | brawler | Mythic | 15.7% | 66.0% |
| Dodgeball Team | ball | guardian | Common | 15.3% | 73.9% |
| The Hive Mind | bug | mystic | Mythic | 15.0% | 48.9% |
| Cheer Squad | ball | medic | Common | 13.0% | 76.9% |
| Bone Dragon | undead | brawler | Mythic | 12.3% | 78.4% |
| Point Guard | ball | gunner | Uncommon | 12.3% | 86.5% |
| Water Boy | ball | medic | Uncommon | 11.3% | 79.4% |
| The Dream Stalker | horror | mystic | Mythic | 10.7% | 71.9% |
| The Drifter | west | stalker | Mythic | 10.3% | 67.7% |
| Rifle Squad | army | gunner | Common | 9.0% | 51.9% |
| The Dark Lord | space | mystic | Mythic | 9.0% | 66.7% |
| Lookouts | heist | gunner | Common | 8.7% | 57.7% |
| Safecracker | heist | brawler | Uncommon | 7.7% | 65.2% |
| Grave Golem | undead | guardian | Rare | 7.0% | 38.1% |
| The Hacker | heist | mystic | Uncommon | 7.0% | 61.9% |
| Giant Moth | kaiju | mystic | Rare | 6.7% | 45.0% |
| Hothead Pitcher | ball | brawler | Common | 6.3% | 94.7% |
| The Final Girl | horror | gunner | Rare | 6.0% | 50.0% |
| Ammo Mule | army | brawler | Uncommon | 5.3% | 62.5% |
| Brood Queen | bug | mystic | Rare | 5.3% | 37.5% |
| Starship Captain | space | brawler | Rare | 4.7% | 50.0% |
| Radio Operator | army | mystic | Uncommon | 4.3% | 61.5% |
| Necromancer | undead | mystic | Rare | 4.3% | 69.2% |
| The Muscle | heist | guardian | Common | 3.7% | 54.5% |
| The Gunslinger | west | gunner | Rare | 3.7% | 45.5% |
| Baby Kaiju | kaiju | brawler | Common | 3.3% | 40.0% |
| Riot Shield | army | guardian | Common | 3.0% | 55.6% |
| Getaway Driver | heist | stalker | Common | 2.7% | 100.0% |
| Burrow Lurker | bug | stalker | Uncommon | 2.3% | 57.1% |
| Commando | army | stalker | Common | 2.0% | 50.0% |
| Ravager Brood | bug | brawler | Common | 2.0% | 66.7% |
| The Scientist | kaiju | mystic | Uncommon | 2.0% | 33.3% |
| Shellback Beetles | bug | guardian | Common | 1.7% | 40.0% |
| Zombie Mob | undead | brawler | Common | 1.7% | 80.0% |
| Skeleton Archers | undead | gunner | Common | 1.3% | 100.0% |
| Wraith | undead | stalker | Uncommon | 1.3% | 75.0% |
| Defense Force Tanks | kaiju | gunner | Common | 1.3% | 25.0% |
| Nurse Bee | bug | medic | Uncommon | 1.0% | 66.7% |
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

# Balance lab: df9.html, expert bot, 300 paired runs per config, enemies x1, tune {"dfK":1.5}

Baseline win 56.3%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## mono

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Only Sportsball | 92.3 | +36.0 | 9.3 | 6.0 | 9.0 | 97.7 |
| Only Slasher | 85.0 | +28.7 | 7.5 | 4.9 | 8.8 | 89.7 |
| Only Wild West | 81.7 | +25.3 | 6.5 | 5.6 | 8.8 | 86.3 |
| Only Heist Crew | 80.0 | +23.7 | 6.4 | 5.7 | 8.9 | 95.3 |
| Only Space Opera | 78.3 | +22.0 | 5.6 | 5.1 | 8.8 | 88.0 |
| Only Undead | 78.0 | +21.7 | 5.6 | 5.4 | 8.9 | 94.7 |
| Only Army | 72.7 | +16.3 | 4.0 | 5.2 | 8.8 | 93.3 |
| Only Kaiju | 60.0 | +3.7 | 0.9 | 4.5 | 8.6 | 69.3 |
| Only Swarm | 58.0 | +1.7 | 0.4 | 5.5 | 8.9 | 97.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 53.7% | 59.0% |
| Forward Observer | army | guardian | Epic | 44.7% | 46.3% |
| Inside Man | heist | guardian | Epic | 43.0% | 55.0% |
| Star Quarterback | ball | stalker | Mythic | 29.7% | 75.3% |
| Head Coach | ball | mystic | Rare | 28.7% | 64.0% |
| The Brute | horror | guardian | Epic | 27.0% | 48.1% |
| Field Medic | army | medic | Rare | 25.0% | 44.0% |
| The Mastermind | heist | gunner | Mythic | 24.3% | 74.0% |
| Bonesetter | undead | medic | Epic | 24.0% | 58.3% |
| The Sheriff | west | guardian | Epic | 22.7% | 44.1% |
| Gunnery Sergeant | army | gunner | Mythic | 21.0% | 68.3% |
| Emperor Scorpion | bug | brawler | Epic | 19.7% | 39.0% |
| Star Knight | space | guardian | Epic | 18.0% | 42.6% |
| The Fixer | heist | medic | Rare | 17.7% | 60.4% |
| Giant Mecha | kaiju | guardian | Epic | 16.3% | 44.9% |
| The Leviathan | kaiju | brawler | Mythic | 16.0% | 64.6% |
| The Hive Mind | bug | mystic | Mythic | 15.0% | 48.9% |
| Dodgeball Team | ball | guardian | Common | 15.0% | 77.8% |
| Point Guard | ball | gunner | Uncommon | 13.0% | 87.2% |
| Bone Dragon | undead | brawler | Mythic | 12.7% | 76.3% |
| Cheer Squad | ball | medic | Common | 12.7% | 78.9% |
| Water Boy | ball | medic | Uncommon | 11.3% | 79.4% |
| The Dream Stalker | horror | mystic | Mythic | 11.0% | 72.7% |
| The Drifter | west | stalker | Mythic | 10.0% | 66.7% |
| Rifle Squad | army | gunner | Common | 9.0% | 44.4% |
| The Dark Lord | space | mystic | Mythic | 8.3% | 72.0% |
| Lookouts | heist | gunner | Common | 7.7% | 56.5% |
| Grave Golem | undead | guardian | Rare | 7.0% | 33.3% |
| Safecracker | heist | brawler | Uncommon | 6.7% | 70.0% |
| The Hacker | heist | mystic | Uncommon | 6.7% | 60.0% |
| Giant Moth | kaiju | mystic | Rare | 6.7% | 45.0% |
| Hothead Pitcher | ball | brawler | Common | 6.3% | 94.7% |
| The Final Girl | horror | gunner | Rare | 6.3% | 47.4% |
| Ammo Mule | army | brawler | Uncommon | 6.0% | 61.1% |
| Brood Queen | bug | mystic | Rare | 5.3% | 37.5% |
| Starship Captain | space | brawler | Rare | 4.7% | 50.0% |
| Radio Operator | army | mystic | Uncommon | 4.3% | 53.8% |
| Necromancer | undead | mystic | Rare | 4.0% | 58.3% |
| The Muscle | heist | guardian | Common | 4.0% | 58.3% |
| Riot Shield | army | guardian | Common | 3.7% | 54.5% |
| The Gunslinger | west | gunner | Rare | 3.7% | 36.4% |
| Baby Kaiju | kaiju | brawler | Common | 3.3% | 30.0% |
| Getaway Driver | heist | stalker | Common | 3.0% | 100.0% |
| Burrow Lurker | bug | stalker | Uncommon | 2.3% | 57.1% |
| Commando | army | stalker | Common | 2.0% | 50.0% |
| Ravager Brood | bug | brawler | Common | 2.0% | 66.7% |
| Zombie Mob | undead | brawler | Common | 1.7% | 80.0% |
| The Scientist | kaiju | mystic | Uncommon | 1.7% | 40.0% |
| Shellback Beetles | bug | guardian | Common | 1.3% | 50.0% |
| Skeleton Archers | undead | gunner | Common | 1.3% | 100.0% |
| Wraith | undead | stalker | Uncommon | 1.3% | 75.0% |
| Defense Force Tanks | kaiju | gunner | Common | 1.3% | 0.0% |
| Acid Spitters | bug | gunner | Common | 1.0% | 66.7% |
| Nurse Bee | bug | medic | Uncommon | 1.0% | 66.7% |
| Camp Counselors | horror | guardian | Common | 1.0% | 66.7% |
| Creepy Kids | horror | stalker | Common | 1.0% | 66.7% |
| Chainsaw Maniac | horror | brawler | Uncommon | 1.0% | 33.3% |
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

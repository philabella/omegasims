# Balance lab: old10.html, expert bot, 300 paired runs per config, enemies x1

Baseline win 58.7%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## mono

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Only Sportsball | 91.0 | +32.3 | 9.0 | 5.6 | 8.9 | 96.0 |
| Only Slasher | 85.7 | +27.0 | 7.2 | 4.7 | 8.8 | 91.3 |
| Only Space Opera | 80.0 | +21.3 | 5.5 | 4.9 | 8.8 | 88.7 |
| Only Wild West | 79.0 | +20.3 | 5.5 | 5.3 | 8.8 | 85.0 |
| Only Heist Crew | 76.0 | +17.3 | 4.4 | 5.4 | 8.9 | 94.0 |
| Only Army | 75.7 | +17.0 | 4.4 | 5.2 | 8.8 | 93.3 |
| Only Undead | 75.7 | +17.0 | 4.5 | 5.3 | 8.8 | 92.3 |
| Only Kaiju | 57.3 | -1.3 | -0.3 | 4.4 | 8.6 | 67.7 |
| Only Swarm | 50.7 | -8.0 | -2.1 | 4.9 | 8.9 | 96.3 |

## pairs

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Sportsball + Heist Crew (Fixed Match) | 87.0 | +28.3 | 7.5 | 5.8 | 9.0 | 97.3 |
| Undead + Sportsball (Sudden Death) | 86.7 | +28.0 | 7.6 | 5.7 | 8.9 | 95.7 |
| Army + Sportsball (Draft Day) | 84.0 | +25.3 | 7.0 | 5.6 | 8.9 | 93.0 |
| Sportsball + Slasher (The Jock Dies First) | 81.7 | +23.0 | 6.1 | 5.3 | 8.8 | 88.3 |
| Sportsball + Wild West (Rodeo) | 77.0 | +18.3 | 5.1 | 5.5 | 8.9 | 86.0 |
| Heist Crew + Wild West (The Great Train Robbery) | 76.3 | +17.7 | 4.7 | 5.0 | 8.9 | 91.3 |
| Sportsball + Kaiju (Monster Bowl) | 75.7 | +17.0 | 4.7 | 5.3 | 8.8 | 86.0 |
| Undead + Heist Crew (Grave Robbers) | 75.0 | +16.3 | 4.5 | 5.6 | 9.0 | 95.3 |
| Heist Crew + Slasher (Ransom Note) | 75.0 | +16.3 | 4.3 | 5.1 | 8.9 | 90.0 |
| Sportsball + Space Opera (Zero-G League) | 75.0 | +16.3 | 4.4 | 5.6 | 8.8 | 84.0 |
| Army + Undead (Fallen Comrades) | 74.0 | +15.3 | 4.2 | 5.3 | 8.9 | 92.3 |
| Undead + Slasher (Nobody Stays Dead) | 73.7 | +15.0 | 3.8 | 4.9 | 8.9 | 87.7 |
| Heist Crew + Kaiju (Disaster Insurance) | 73.7 | +15.0 | 3.9 | 4.9 | 8.8 | 89.0 |
| Swarm + Sportsball (Killer Bees) | 73.3 | +14.7 | 4.3 | 5.4 | 8.9 | 94.3 |
| Army + Kaiju (Defense Force) | 71.7 | +13.0 | 3.3 | 5.0 | 8.8 | 83.0 |
| Army + Heist Crew (Arms Deal) | 71.3 | +12.7 | 3.5 | 5.7 | 8.9 | 92.3 |
| Army + Slasher (Night Patrol) | 70.0 | +11.3 | 3.0 | 5.1 | 8.8 | 83.7 |
| Swarm + Heist Crew (Plague of Locusts) | 68.0 | +9.3 | 2.4 | 5.4 | 8.9 | 94.3 |
| Undead + Kaiju (Atomic Zombies) | 66.0 | +7.3 | 1.9 | 5.4 | 8.7 | 78.7 |
| Slasher + Kaiju (Creature Feature) | 66.0 | +7.3 | 1.8 | 4.7 | 8.7 | 72.0 |
| Heist Crew + Space Opera (Contraband Run) | 64.7 | +6.0 | 1.6 | 5.2 | 8.9 | 85.0 |
| Army + Wild West (The Cavalry) | 64.3 | +5.7 | 1.5 | 4.8 | 8.8 | 83.3 |
| Space Opera + Kaiju (Alien Invasion) | 64.0 | +5.3 | 1.4 | 4.3 | 8.7 | 72.0 |
| Swarm + Undead (Zombie Ants) | 63.7 | +5.0 | 1.3 | 5.4 | 8.9 | 93.0 |
| Army + Swarm (Bug Hunt) | 63.3 | +4.7 | 1.2 | 5.1 | 8.9 | 94.3 |
| Swarm + Slasher (It Came From the Vents) | 62.0 | +3.3 | 0.9 | 4.9 | 8.8 | 86.7 |
| Wild West + Kaiju (Monster Roundup) | 62.0 | +3.3 | 0.9 | 4.5 | 8.7 | 67.0 |
| Undead + Wild West (Ghost Town) | 61.7 | +3.0 | 0.8 | 5.3 | 8.8 | 74.0 |
| Wild West + Slasher (Ghost Riders) | 61.3 | +2.7 | 0.7 | 4.7 | 8.7 | 70.7 |
| Wild West + Space Opera (Space Cowboys) | 59.7 | +1.0 | 0.3 | 4.6 | 8.7 | 63.0 |
| Army + Space Opera (Orbital Strike) | 59.3 | +0.7 | 0.2 | 5.1 | 8.8 | 80.7 |
| Slasher + Space Opera (Scream Into the Void) | 59.3 | +0.7 | 0.2 | 4.8 | 8.7 | 69.7 |
| Swarm + Kaiju (Monster Reserve) | 58.3 | -0.3 | -0.1 | 4.7 | 8.8 | 80.7 |
| Undead + Space Opera (Ghost Ship) | 56.3 | -2.3 | -0.6 | 5.1 | 8.8 | 77.3 |
| Swarm + Wild West (Stampede) | 48.0 | -10.7 | -2.7 | 4.6 | 8.8 | 80.0 |
| Swarm + Space Opera (The Hive Ship) | 43.0 | -15.7 | -4.1 | 4.9 | 8.7 | 73.3 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 51.7% | 62.6% |
| Forward Observer | army | guardian | Epic | 43.0% | 49.6% |
| Inside Man | heist | guardian | Epic | 39.7% | 54.6% |
| Star Quarterback | ball | stalker | Mythic | 34.3% | 78.6% |
| Head Coach | ball | mystic | Rare | 31.0% | 66.7% |
| Bonesetter | undead | medic | Epic | 24.7% | 50.0% |
| Giant Mecha | kaiju | guardian | Epic | 24.3% | 31.5% |
| The Brute | horror | guardian | Epic | 23.3% | 47.1% |
| Gunnery Sergeant | army | gunner | Mythic | 23.0% | 66.7% |
| The Mastermind | heist | gunner | Mythic | 22.3% | 65.7% |
| The Sheriff | west | guardian | Epic | 20.3% | 49.2% |
| Star Knight | space | guardian | Epic | 20.3% | 44.3% |
| Field Medic | army | medic | Rare | 19.3% | 53.4% |
| Bone Dragon | undead | brawler | Mythic | 18.7% | 60.7% |
| The Leviathan | kaiju | brawler | Mythic | 18.7% | 58.9% |
| Emperor Scorpion | bug | brawler | Epic | 17.3% | 48.1% |
| Dodgeball Team | ball | guardian | Common | 16.3% | 85.7% |
| The Hive Mind | bug | mystic | Mythic | 15.7% | 53.2% |
| The Fixer | heist | medic | Rare | 15.0% | 62.2% |
| The Dream Stalker | horror | mystic | Mythic | 13.3% | 50.0% |
| Water Boy | ball | medic | Uncommon | 12.3% | 89.2% |
| Cheer Squad | ball | medic | Common | 12.0% | 88.9% |
| Point Guard | ball | gunner | Uncommon | 12.0% | 86.1% |
| The Drifter | west | stalker | Mythic | 11.0% | 54.5% |
| The Dark Lord | space | mystic | Mythic | 10.3% | 61.3% |
| The Final Girl | horror | gunner | Rare | 7.0% | 47.6% |
| Hothead Pitcher | ball | brawler | Common | 6.7% | 95.0% |
| Lookouts | heist | gunner | Common | 6.7% | 85.0% |
| Radio Operator | army | mystic | Uncommon | 6.0% | 61.1% |
| Giant Moth | kaiju | mystic | Rare | 6.0% | 55.6% |
| Rifle Squad | army | gunner | Common | 5.7% | 58.8% |
| Ammo Mule | army | brawler | Uncommon | 5.3% | 68.8% |
| Necromancer | undead | mystic | Rare | 5.3% | 68.8% |
| Safecracker | heist | brawler | Uncommon | 5.3% | 81.3% |
| The Hacker | heist | mystic | Uncommon | 5.3% | 81.3% |
| Grave Golem | undead | guardian | Rare | 5.0% | 53.3% |
| Brood Queen | bug | mystic | Rare | 4.3% | 53.8% |
| The Muscle | heist | guardian | Common | 4.3% | 92.3% |
| Riot Shield | army | guardian | Common | 3.7% | 90.9% |
| Getaway Driver | heist | stalker | Common | 3.0% | 77.8% |
| Starship Captain | space | brawler | Rare | 3.0% | 22.2% |
| Baby Kaiju | kaiju | brawler | Common | 2.7% | 87.5% |
| Commando | army | stalker | Common | 2.3% | 85.7% |
| Zombie Mob | undead | brawler | Common | 2.3% | 71.4% |
| The Gunslinger | west | gunner | Rare | 2.3% | 71.4% |
| The Scientist | kaiju | mystic | Uncommon | 2.0% | 50.0% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 2.0% | 66.7% |
| Ravager Brood | bug | brawler | Common | 1.7% | 80.0% |
| Burrow Lurker | bug | stalker | Uncommon | 1.7% | 80.0% |
| Skeleton Archers | undead | gunner | Common | 1.7% | 80.0% |
| Defense Force Tanks | kaiju | gunner | Common | 1.7% | 40.0% |
| Acid Spitters | bug | gunner | Common | 1.3% | 75.0% |
| Shellback Beetles | bug | guardian | Common | 1.0% | 66.7% |
| Wraith | undead | stalker | Uncommon | 1.0% | 100.0% |
| Camp Counselors | horror | guardian | Common | 1.0% | 66.7% |
| Creepy Kids | horror | stalker | Common | 1.0% | 100.0% |
| Chainsaw Maniac | horror | brawler | Uncommon | 1.0% | 100.0% |
| Nurse Bee | bug | medic | Uncommon | 0.7% | 50.0% |
| Vampire Bat | undead | stalker | Common | 0.7% | 50.0% |
| The Babysitter | horror | medic | Common | 0.7% | 100.0% |
| The Priest | horror | mystic | Uncommon | 0.7% | 100.0% |
| Bounty Hunter | west | stalker | Uncommon | 0.3% | 0.0% |
| Space Smuggler | space | stalker | Uncommon | 0.3% | 0.0% |
| Outlaw Gang | west | brawler | Common | 0.0% | - |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| Redshirts | space | guardian | Common | 0.0% | - |
| Repair Bots | space | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |
| The Telepath | space | mystic | Uncommon | 0.0% | - |
| TV Reporter | kaiju | medic | Common | 0.0% | - |

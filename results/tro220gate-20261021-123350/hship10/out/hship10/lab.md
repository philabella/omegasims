# Balance lab: ship10.html, expert bot, 300 paired runs per config, enemies x1

Baseline win 74.0%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## mono

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Only Wild West | 83.7 | +9.7 | 3.0 | 5.1 | 8.9 | 85.3 |
| Only Sportsball | 81.7 | +7.7 | 2.3 | 5.5 | 8.9 | 87.3 |
| Only Slasher | 80.3 | +6.3 | 1.9 | 4.5 | 8.8 | 83.7 |
| Only Space Opera | 76.0 | +2.0 | 0.6 | 4.8 | 8.8 | 84.3 |
| Only Heist Crew | 75.3 | +1.3 | 0.4 | 5.1 | 8.9 | 93.0 |
| Only Army | 73.0 | -1.0 | -0.3 | 4.8 | 8.8 | 87.3 |
| Only Undead | 66.7 | -7.3 | -2.0 | 5.1 | 8.8 | 84.7 |
| Only Swarm | 52.7 | -21.3 | -5.6 | 4.8 | 8.9 | 87.0 |
| Only Kaiju | 51.3 | -22.7 | -5.7 | 4.1 | 8.5 | 60.3 |

## pairs

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Heist Crew + Wild West (The Great Train Robbery) | 88.7 | +14.7 | 4.4 | 5.5 | 9.0 | 94.0 |
| Sportsball + Heist Crew (Fixed Match) | 85.7 | +11.7 | 3.7 | 5.6 | 9.0 | 90.7 |
| Wild West + Space Opera (Space Cowboys) | 82.7 | +8.7 | 2.7 | 5.2 | 8.9 | 71.0 |
| Undead + Sportsball (Sudden Death) | 82.7 | +8.7 | 2.7 | 5.6 | 8.9 | 85.3 |
| Undead + Heist Crew (Grave Robbers) | 82.0 | +8.0 | 2.4 | 5.7 | 9.0 | 93.3 |
| Heist Crew + Slasher (Ransom Note) | 81.7 | +7.7 | 2.3 | 5.2 | 8.9 | 87.7 |
| Army + Wild West (The Cavalry) | 81.3 | +7.3 | 2.3 | 5.2 | 8.9 | 77.7 |
| Wild West + Slasher (Ghost Riders) | 81.3 | +7.3 | 2.2 | 5.0 | 8.9 | 80.0 |
| Slasher + Space Opera (Scream Into the Void) | 81.0 | +7.0 | 2.1 | 4.9 | 8.9 | 74.3 |
| Sportsball + Wild West (Rodeo) | 80.7 | +6.7 | 2.0 | 5.5 | 8.9 | 79.7 |
| Army + Heist Crew (Arms Deal) | 80.0 | +6.0 | 1.9 | 5.5 | 9.0 | 93.3 |
| Heist Crew + Space Opera (Contraband Run) | 80.0 | +6.0 | 1.8 | 5.2 | 8.9 | 88.3 |
| Army + Sportsball (Draft Day) | 79.0 | +5.0 | 1.6 | 5.3 | 9.0 | 85.3 |
| Sportsball + Slasher (The Jock Dies First) | 78.7 | +4.7 | 1.5 | 5.2 | 8.9 | 84.3 |
| Undead + Wild West (Ghost Town) | 76.3 | +2.3 | 0.7 | 5.4 | 8.9 | 79.7 |
| Army + Slasher (Night Patrol) | 76.0 | +2.0 | 0.6 | 5.1 | 8.9 | 81.0 |
| Sportsball + Space Opera (Zero-G League) | 75.7 | +1.7 | 0.5 | 5.0 | 8.9 | 77.0 |
| Undead + Slasher (Nobody Stays Dead) | 75.3 | +1.3 | 0.4 | 5.0 | 8.9 | 81.3 |
| Army + Space Opera (Orbital Strike) | 74.3 | +0.3 | 0.1 | 5.1 | 8.9 | 79.0 |
| Sportsball + Kaiju (Monster Bowl) | 74.3 | +0.3 | 0.1 | 5.0 | 8.8 | 74.0 |
| Army + Undead (Fallen Comrades) | 72.7 | -1.3 | -0.4 | 5.2 | 8.9 | 84.0 |
| Army + Kaiju (Defense Force) | 72.7 | -1.3 | -0.4 | 5.0 | 8.8 | 71.7 |
| Wild West + Kaiju (Monster Roundup) | 72.7 | -1.3 | -0.4 | 5.0 | 8.8 | 66.7 |
| Swarm + Slasher (It Came From the Vents) | 72.3 | -1.7 | -0.5 | 5.1 | 8.9 | 82.7 |
| Swarm + Undead (Zombie Ants) | 71.0 | -3.0 | -0.8 | 5.1 | 8.9 | 82.0 |
| Swarm + Wild West (Stampede) | 70.3 | -3.7 | -1.1 | 5.3 | 8.9 | 78.7 |
| Undead + Space Opera (Ghost Ship) | 70.3 | -3.7 | -1.0 | 5.3 | 8.9 | 76.3 |
| Swarm + Sportsball (Killer Bees) | 69.7 | -4.3 | -1.2 | 5.6 | 8.9 | 86.3 |
| Swarm + Heist Crew (Plague of Locusts) | 69.7 | -4.3 | -1.2 | 5.3 | 8.9 | 88.0 |
| Undead + Kaiju (Atomic Zombies) | 69.3 | -4.7 | -1.3 | 5.0 | 8.8 | 69.7 |
| Army + Swarm (Bug Hunt) | 68.7 | -5.3 | -1.5 | 5.1 | 8.9 | 83.3 |
| Space Opera + Kaiju (Alien Invasion) | 68.7 | -5.3 | -1.5 | 4.4 | 8.8 | 65.7 |
| Heist Crew + Kaiju (Disaster Insurance) | 65.7 | -8.3 | -2.3 | 4.8 | 8.8 | 78.3 |
| Slasher + Kaiju (Creature Feature) | 61.0 | -13.0 | -3.6 | 4.6 | 8.8 | 61.0 |
| Swarm + Space Opera (The Hive Ship) | 60.7 | -13.3 | -3.6 | 5.1 | 8.9 | 72.0 |
| Swarm + Kaiju (Monster Reserve) | 57.0 | -17.0 | -4.4 | 4.9 | 8.8 | 70.3 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 39.7% | 75.6% |
| Head Coach | ball | mystic | Rare | 36.7% | 77.3% |
| Forward Observer | army | guardian | Epic | 35.3% | 77.4% |
| Field Medic | army | medic | Rare | 34.0% | 79.4% |
| Gunnery Sergeant | army | gunner | Mythic | 26.0% | 87.2% |
| The Fixer | heist | medic | Rare | 25.0% | 76.0% |
| Inside Man | heist | guardian | Epic | 24.7% | 75.7% |
| Giant Mecha | kaiju | guardian | Epic | 24.3% | 61.6% |
| Star Quarterback | ball | stalker | Mythic | 22.0% | 92.4% |
| The Brute | horror | guardian | Epic | 17.7% | 75.5% |
| Rifle Squad | army | gunner | Common | 16.7% | 70.0% |
| The Mastermind | heist | gunner | Mythic | 16.3% | 85.7% |
| Water Boy | ball | medic | Uncommon | 15.0% | 71.1% |
| Ammo Mule | army | brawler | Uncommon | 14.7% | 77.3% |
| Giant Moth | kaiju | mystic | Rare | 14.3% | 53.5% |
| Bonesetter | undead | medic | Epic | 14.0% | 69.0% |
| Dodgeball Team | ball | guardian | Common | 14.0% | 76.2% |
| Point Guard | ball | gunner | Uncommon | 14.0% | 81.0% |
| The Final Girl | horror | gunner | Rare | 13.3% | 80.0% |
| Radio Operator | army | mystic | Uncommon | 12.0% | 91.7% |
| Cheer Squad | ball | medic | Common | 10.0% | 66.7% |
| The Dream Stalker | horror | mystic | Mythic | 9.7% | 82.8% |
| Grave Golem | undead | guardian | Rare | 9.3% | 78.6% |
| Star Knight | space | guardian | Epic | 9.3% | 82.1% |
| Lookouts | heist | gunner | Common | 9.0% | 63.0% |
| Emperor Scorpion | bug | brawler | Epic | 8.7% | 76.9% |
| The Hacker | heist | mystic | Uncommon | 8.3% | 92.0% |
| Necromancer | undead | mystic | Rare | 7.7% | 78.3% |
| Bone Dragon | undead | brawler | Mythic | 7.7% | 91.3% |
| Starship Captain | space | brawler | Rare | 7.7% | 82.6% |
| Safecracker | heist | brawler | Uncommon | 7.3% | 90.9% |
| The Hive Mind | bug | mystic | Mythic | 7.0% | 76.2% |
| Camp Counselors | horror | guardian | Common | 7.0% | 71.4% |
| The Leviathan | kaiju | brawler | Mythic | 7.0% | 90.5% |
| Brood Queen | bug | mystic | Rare | 6.3% | 78.9% |
| The Sheriff | west | guardian | Epic | 6.3% | 52.6% |
| Riot Shield | army | guardian | Common | 6.0% | 77.8% |
| Baby Kaiju | kaiju | brawler | Common | 5.3% | 68.8% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 5.3% | 87.5% |
| Creepy Kids | horror | stalker | Common | 4.7% | 92.9% |
| The Scientist | kaiju | mystic | Uncommon | 4.7% | 64.3% |
| Commando | army | stalker | Common | 4.3% | 69.2% |
| Chainsaw Maniac | horror | brawler | Uncommon | 4.3% | 61.5% |
| The Dark Lord | space | mystic | Mythic | 4.3% | 92.3% |
| The Gunslinger | west | gunner | Rare | 4.0% | 75.0% |
| The Priest | horror | mystic | Uncommon | 4.0% | 91.7% |
| Defense Force Tanks | kaiju | gunner | Common | 3.7% | 54.5% |
| Hothead Pitcher | ball | brawler | Common | 3.3% | 90.0% |
| Burrow Lurker | bug | stalker | Uncommon | 2.7% | 75.0% |
| Nurse Bee | bug | medic | Uncommon | 2.3% | 71.4% |
| Zombie Mob | undead | brawler | Common | 2.3% | 85.7% |
| Repair Bots | space | medic | Common | 2.3% | 85.7% |
| Getaway Driver | heist | stalker | Common | 2.0% | 50.0% |
| The Babysitter | horror | medic | Common | 2.0% | 83.3% |
| Space Smuggler | space | stalker | Uncommon | 2.0% | 100.0% |
| Shellback Beetles | bug | guardian | Common | 1.7% | 80.0% |
| The Muscle | heist | guardian | Common | 1.7% | 80.0% |
| The Drifter | west | stalker | Mythic | 1.7% | 80.0% |
| Skeleton Archers | undead | gunner | Common | 1.3% | 75.0% |
| Redshirts | space | guardian | Common | 1.3% | 100.0% |
| The Telepath | space | mystic | Uncommon | 1.3% | 75.0% |
| Ravager Brood | bug | brawler | Common | 1.0% | 33.3% |
| Wraith | undead | stalker | Uncommon | 1.0% | 66.7% |
| Acid Spitters | bug | gunner | Common | 0.7% | 50.0% |
| Prospector | west | mystic | Uncommon | 0.7% | 100.0% |
| TV Reporter | kaiju | medic | Common | 0.7% | 100.0% |
| Vampire Bat | undead | stalker | Common | 0.3% | 100.0% |
| Outlaw Gang | west | brawler | Common | 0.3% | 100.0% |
| Deputy | west | guardian | Common | 0.3% | 100.0% |
| Bounty Hunter | west | stalker | Uncommon | 0.3% | 100.0% |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |

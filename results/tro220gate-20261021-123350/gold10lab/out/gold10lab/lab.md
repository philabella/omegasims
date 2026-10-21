# Balance lab: old10.html, expert bot, 60 paired runs per config, enemies x1

Baseline win 73.3%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## mono

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Only Sportsball | 96.7 | +23.3 | 3.3 | 6.1 | 9.0 | 100.0 |
| Only Wild West | 95.0 | +21.7 | 3.0 | 5.3 | 8.9 | 93.3 |
| Only Army | 88.3 | +15.0 | 2.0 | 5.7 | 9.0 | 98.3 |
| Only Kaiju | 86.7 | +13.3 | 1.9 | 4.8 | 8.8 | 90.0 |
| Only Slasher | 83.3 | +10.0 | 1.4 | 5.0 | 8.6 | 88.3 |
| Only Space Opera | 83.3 | +10.0 | 1.3 | 5.3 | 8.9 | 91.7 |
| Only Swarm | 81.7 | +8.3 | 1.1 | 5.4 | 9.0 | 100.0 |
| Only Heist Crew | 81.7 | +8.3 | 1.1 | 5.8 | 8.9 | 98.3 |
| Only Undead | 78.3 | +5.0 | 0.7 | 5.3 | 8.9 | 96.7 |

## pairs

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Undead + Sportsball (Sudden Death) | 95.0 | +21.7 | 3.4 | 5.8 | 9.0 | 98.3 |
| Undead + Heist Crew (Grave Robbers) | 90.0 | +16.7 | 2.4 | 5.7 | 9.0 | 98.3 |
| Sportsball + Slasher (The Jock Dies First) | 86.7 | +13.3 | 1.9 | 6.3 | 8.9 | 93.3 |
| Sportsball + Kaiju (Monster Bowl) | 86.7 | +13.3 | 1.8 | 5.7 | 8.9 | 90.0 |
| Sportsball + Heist Crew (Fixed Match) | 83.3 | +10.0 | 1.3 | 6.1 | 8.9 | 95.0 |
| Heist Crew + Wild West (The Great Train Robbery) | 81.7 | +8.3 | 1.0 | 5.7 | 8.9 | 96.7 |
| Sportsball + Space Opera (Zero-G League) | 80.0 | +6.7 | 0.9 | 5.7 | 8.9 | 86.7 |
| Heist Crew + Kaiju (Disaster Insurance) | 80.0 | +6.7 | 0.9 | 5.2 | 8.9 | 88.3 |
| Army + Sportsball (Draft Day) | 78.3 | +5.0 | 0.7 | 5.9 | 8.8 | 88.3 |
| Swarm + Sportsball (Killer Bees) | 78.3 | +5.0 | 0.6 | 5.8 | 8.9 | 96.7 |
| Army + Heist Crew (Arms Deal) | 78.3 | +5.0 | 0.6 | 5.6 | 8.9 | 91.7 |
| Slasher + Kaiju (Creature Feature) | 78.3 | +5.0 | 0.7 | 5.4 | 8.8 | 78.3 |
| Army + Undead (Fallen Comrades) | 75.0 | +1.7 | 0.2 | 5.5 | 9.0 | 93.3 |
| Sportsball + Wild West (Rodeo) | 75.0 | +1.7 | 0.2 | 6.5 | 8.9 | 83.3 |
| Army + Slasher (Night Patrol) | 75.0 | +1.7 | 0.2 | 5.8 | 8.9 | 91.7 |
| Swarm + Kaiju (Monster Reserve) | 75.0 | +1.7 | 0.2 | 5.6 | 8.9 | 88.3 |
| Swarm + Heist Crew (Plague of Locusts) | 73.3 | +0.0 | 0.0 | 5.8 | 8.9 | 95.0 |
| Swarm + Wild West (Stampede) | 73.3 | +0.0 | 0.0 | 5.6 | 8.9 | 93.3 |
| Heist Crew + Space Opera (Contraband Run) | 73.3 | +0.0 | 0.0 | 5.5 | 8.9 | 88.3 |
| Undead + Kaiju (Atomic Zombies) | 73.3 | +0.0 | 0.0 | 5.0 | 8.9 | 88.3 |
| Swarm + Undead (Zombie Ants) | 71.7 | -1.7 | -0.2 | 5.8 | 9.0 | 91.7 |
| Heist Crew + Slasher (Ransom Note) | 71.7 | -1.7 | -0.2 | 5.4 | 8.9 | 91.7 |
| Army + Kaiju (Defense Force) | 71.7 | -1.7 | -0.2 | 5.5 | 8.9 | 90.0 |
| Undead + Space Opera (Ghost Ship) | 70.0 | -3.3 | -0.4 | 5.3 | 8.8 | 81.7 |
| Slasher + Space Opera (Scream Into the Void) | 70.0 | -3.3 | -0.4 | 5.5 | 8.8 | 70.0 |
| Swarm + Slasher (It Came From the Vents) | 68.3 | -5.0 | -0.7 | 5.2 | 8.9 | 81.7 |
| Wild West + Kaiju (Monster Roundup) | 68.3 | -5.0 | -0.7 | 5.0 | 8.8 | 73.3 |
| Army + Wild West (The Cavalry) | 66.7 | -6.7 | -0.9 | 5.0 | 8.8 | 81.7 |
| Undead + Wild West (Ghost Town) | 65.0 | -8.3 | -1.0 | 4.7 | 8.9 | 83.3 |
| Undead + Slasher (Nobody Stays Dead) | 65.0 | -8.3 | -1.1 | 5.5 | 8.8 | 78.3 |
| Army + Swarm (Bug Hunt) | 63.3 | -10.0 | -1.1 | 5.3 | 8.9 | 91.7 |
| Space Opera + Kaiju (Alien Invasion) | 63.3 | -10.0 | -1.2 | 5.2 | 8.7 | 66.7 |
| Army + Space Opera (Orbital Strike) | 60.0 | -13.3 | -1.6 | 5.1 | 8.8 | 63.3 |
| Wild West + Space Opera (Space Cowboys) | 60.0 | -13.3 | -1.5 | 4.6 | 8.8 | 63.3 |
| Wild West + Slasher (Ghost Riders) | 58.3 | -15.0 | -1.7 | 5.7 | 8.7 | 76.7 |
| Swarm + Space Opera (The Hive Ship) | 56.7 | -16.7 | -1.8 | 5.3 | 8.9 | 83.3 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Star Quarterback | ball | stalker | Mythic | 46.7% | 75.0% |
| Team Mascot | ball | guardian | Epic | 41.7% | 76.0% |
| Forward Observer | army | guardian | Epic | 33.3% | 75.0% |
| The Brute | horror | guardian | Epic | 31.7% | 78.9% |
| Head Coach | ball | mystic | Rare | 30.0% | 83.3% |
| Inside Man | heist | guardian | Epic | 30.0% | 66.7% |
| Bone Dragon | undead | brawler | Mythic | 26.7% | 75.0% |
| Gunnery Sergeant | army | gunner | Mythic | 25.0% | 60.0% |
| The Mastermind | heist | gunner | Mythic | 25.0% | 66.7% |
| Field Medic | army | medic | Rare | 21.7% | 84.6% |
| The Drifter | west | stalker | Mythic | 21.7% | 69.2% |
| Giant Mecha | kaiju | guardian | Epic | 21.7% | 46.2% |
| Emperor Scorpion | bug | brawler | Epic | 20.0% | 100.0% |
| Star Knight | space | guardian | Epic | 20.0% | 66.7% |
| The Hive Mind | bug | mystic | Mythic | 18.3% | 90.9% |
| The Fixer | heist | medic | Rare | 18.3% | 81.8% |
| The Sheriff | west | guardian | Epic | 18.3% | 90.9% |
| Bonesetter | undead | medic | Epic | 16.7% | 80.0% |
| Cheer Squad | ball | medic | Common | 15.0% | 77.8% |
| Point Guard | ball | gunner | Uncommon | 15.0% | 88.9% |
| The Dream Stalker | horror | mystic | Mythic | 15.0% | 66.7% |
| The Dark Lord | space | mystic | Mythic | 15.0% | 77.8% |
| The Leviathan | kaiju | brawler | Mythic | 15.0% | 55.6% |
| The Final Girl | horror | gunner | Rare | 11.7% | 57.1% |
| Dodgeball Team | ball | guardian | Common | 10.0% | 100.0% |
| Hothead Pitcher | ball | brawler | Common | 8.3% | 100.0% |
| Rifle Squad | army | gunner | Common | 6.7% | 100.0% |
| Grave Golem | undead | guardian | Rare | 6.7% | 75.0% |
| Necromancer | undead | mystic | Rare | 6.7% | 100.0% |
| Water Boy | ball | medic | Uncommon | 6.7% | 100.0% |
| Starship Captain | space | brawler | Rare | 6.7% | 100.0% |
| Brood Queen | bug | mystic | Rare | 5.0% | 66.7% |
| Chainsaw Maniac | horror | brawler | Uncommon | 5.0% | 33.3% |
| Ammo Mule | army | brawler | Uncommon | 3.3% | 100.0% |
| Ravager Brood | bug | brawler | Common | 3.3% | 100.0% |
| Acid Spitters | bug | gunner | Common | 3.3% | 100.0% |
| Shellback Beetles | bug | guardian | Common | 3.3% | 100.0% |
| Burrow Lurker | bug | stalker | Uncommon | 3.3% | 100.0% |
| Nurse Bee | bug | medic | Uncommon | 3.3% | 100.0% |
| Skeleton Archers | undead | gunner | Common | 3.3% | 100.0% |
| Zombie Mob | undead | brawler | Common | 3.3% | 100.0% |
| Wraith | undead | stalker | Uncommon | 3.3% | 100.0% |
| The Muscle | heist | guardian | Common | 3.3% | 100.0% |
| Lookouts | heist | gunner | Common | 3.3% | 100.0% |
| Getaway Driver | heist | stalker | Common | 3.3% | 100.0% |
| Safecracker | heist | brawler | Uncommon | 3.3% | 100.0% |
| Giant Moth | kaiju | mystic | Rare | 3.3% | 50.0% |
| Radio Operator | army | mystic | Uncommon | 1.7% | 100.0% |
| The Hacker | heist | mystic | Uncommon | 1.7% | 100.0% |
| The Gunslinger | west | gunner | Rare | 1.7% | 100.0% |
| Camp Counselors | horror | guardian | Common | 1.7% | 100.0% |
| Creepy Kids | horror | stalker | Common | 1.7% | 0.0% |
| The Priest | horror | mystic | Uncommon | 1.7% | 0.0% |
| Defense Force Tanks | kaiju | gunner | Common | 1.7% | 0.0% |
| Baby Kaiju | kaiju | brawler | Common | 1.7% | 100.0% |
| Riot Shield | army | guardian | Common | 0.0% | - |
| Commando | army | stalker | Common | 0.0% | - |
| Vampire Bat | undead | stalker | Common | 0.0% | - |
| Outlaw Gang | west | brawler | Common | 0.0% | - |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Bounty Hunter | west | stalker | Uncommon | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| The Babysitter | horror | medic | Common | 0.0% | - |
| Redshirts | space | guardian | Common | 0.0% | - |
| Repair Bots | space | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |
| Space Smuggler | space | stalker | Uncommon | 0.0% | - |
| The Telepath | space | mystic | Uncommon | 0.0% | - |
| TV Reporter | kaiju | medic | Common | 0.0% | - |
| The Scientist | kaiju | mystic | Uncommon | 0.0% | - |
| Big-Game Hunter | kaiju | stalker | Uncommon | 0.0% | - |

# Balance lab: lv10.html, expert bot, 100 paired runs per config, enemies x1

Baseline win 92.0%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## mono

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Only Wild West (n 20, above) | 90.0 | +0.0 | 0.0 | 5.9 | 8.5 | 90.0 |
| Only Sportsball (n 40, above) | 82.5 | -5.0 | -0.6 | 5.8 | 8.4 | 85.0 |
| Only Space Opera (n 40, above) | 77.5 | -10.0 | -1.2 | 4.7 | 8.2 | 77.5 |
| Only Army (n 60, above) | 76.7 | -11.7 | -1.7 | 5.0 | 8.3 | 81.7 |
| Only Swarm (n 40, above) | 75.0 | -12.5 | -1.5 | 5.8 | 8.6 | 85.0 |
| Only Heist Crew (n 60, above) | 75.0 | -13.3 | -2.1 | 5.4 | 8.1 | 75.0 |
| Only Kaiju (n 60, above) | 75.0 | -13.3 | -1.9 | 4.9 | 8.0 | 75.0 |
| Only Undead (n 60, above) | 73.3 | -15.0 | -2.2 | 5.4 | 8.4 | 76.7 |
| Only Slasher (n 60, above) | 73.3 | -15.0 | -1.9 | 4.7 | 8.0 | 73.3 |

## pairs

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Army + Sportsball (Draft Day) (n 20, above) | 90.0 | +0.0 | 0.0 | 4.8 | 8.9 | 90.0 |
| Sportsball + Heist Crew (Fixed Match) (n 20, above) | 90.0 | +0.0 | 0.0 | 5.3 | 8.8 | 85.0 |
| Wild West + Space Opera (Space Cowboys) (n 40, above) | 90.0 | +2.5 | 0.4 | 4.9 | 8.7 | 67.5 |
| Swarm + Undead (Zombie Ants) (n 40, above) | 85.0 | -2.5 | -0.3 | 5.3 | 8.8 | 65.0 |
| Undead + Heist Crew (Grave Robbers) (n 40, above) | 85.0 | -2.5 | -0.4 | 4.9 | 8.8 | 85.0 |
| Heist Crew + Wild West (The Great Train Robbery) (n 20, above) | 85.0 | -5.0 | -0.6 | 5.9 | 8.8 | 85.0 |
| Sportsball + Space Opera (Zero-G League) (n 40, above) | 82.5 | -5.0 | -0.6 | 5.4 | 8.6 | 57.5 |
| Wild West + Kaiju (Monster Roundup) (n 40, above) | 82.5 | -5.0 | -0.6 | 4.8 | 8.4 | 60.0 |
| Swarm + Wild West (Stampede) (n 40, above) | 80.0 | -7.5 | -1.3 | 5.4 | 8.8 | 67.5 |
| Army + Kaiju (Defense Force) (n 60, above) | 80.0 | -8.3 | -1.4 | 5.2 | 8.7 | 68.3 |
| Undead + Sportsball (Sudden Death) (n 40, above) | 80.0 | -7.5 | -0.9 | 4.5 | 8.7 | 72.5 |
| Army + Swarm (Bug Hunt) (n 60, above) | 78.3 | -10.0 | -1.3 | 5.3 | 8.7 | 65.0 |
| Swarm + Space Opera (The Hive Ship) (n 60, above) | 78.3 | -10.0 | -1.6 | 5.3 | 8.5 | 63.3 |
| Sportsball + Slasher (The Jock Dies First) (n 40, above) | 77.5 | -10.0 | -1.3 | 5.5 | 8.4 | 62.5 |
| Undead + Kaiju (Atomic Zombies) (n 40, above) | 77.5 | -10.0 | -1.4 | 4.8 | 8.7 | 62.5 |
| Space Opera + Kaiju (Alien Invasion) (n 40, above) | 77.5 | -10.0 | -1.4 | 4.7 | 8.6 | 62.5 |
| Swarm + Sportsball (Killer Bees) (n 60, above) | 76.7 | -11.7 | -1.7 | 5.6 | 8.8 | 65.0 |
| Army + Undead (Fallen Comrades) (n 40, above) | 75.0 | -12.5 | -1.5 | 5.0 | 8.6 | 60.0 |
| Sportsball + Wild West (Rodeo) (n 60, above) | 75.0 | -13.3 | -2.0 | 5.4 | 8.6 | 65.0 |
| Wild West + Slasher (Ghost Riders) (n 80, above) | 73.8 | -16.3 | -2.6 | 5.4 | 8.3 | 62.5 |
| Slasher + Kaiju (Creature Feature) (n 80, above) | 73.8 | -16.3 | -2.8 | 4.9 | 8.3 | 61.3 |
| Undead + Wild West (Ghost Town) (n 60, above) | 73.3 | -15.0 | -2.3 | 6.0 | 8.7 | 55.0 |
| Army + Space Opera (Orbital Strike) (n 60, above) | 73.3 | -15.0 | -2.3 | 5.3 | 8.5 | 55.0 |
| Undead + Space Opera (Ghost Ship) (n 40, above) | 72.5 | -15.0 | -1.6 | 5.2 | 8.7 | 70.0 |
| Slasher + Space Opera (Scream Into the Void) (n 100, above) | 72.0 | -20.0 | -3.7 | 5.2 | 8.2 | 51.0 |
| Heist Crew + Kaiju (Disaster Insurance) (n 100, continue) | 72.0 | -20.0 | -3.9 | 5.0 | 8.5 | 67.0 |
| Army + Wild West (The Cavalry) (n 60, above) | 71.7 | -16.7 | -2.5 | 5.9 | 8.4 | 60.0 |
| Swarm + Kaiju (Monster Reserve) (n 60, above) | 71.7 | -16.7 | -2.5 | 5.4 | 8.6 | 68.3 |
| Undead + Slasher (Nobody Stays Dead) (n 80, above) | 71.3 | -18.8 | -2.9 | 5.2 | 8.5 | 61.3 |
| Heist Crew + Space Opera (Contraband Run) (n 80, above) | 71.3 | -18.8 | -3.0 | 5.1 | 8.4 | 68.8 |
| Army + Heist Crew (Arms Deal) (n 80, above) | 70.0 | -20.0 | -3.3 | 5.1 | 8.4 | 66.3 |
| Army + Slasher (Night Patrol) (n 60, above) | 70.0 | -18.3 | -2.5 | 5.8 | 8.4 | 61.7 |
| Heist Crew + Slasher (Ransom Note) (n 80, above) | 70.0 | -20.0 | -3.0 | 5.3 | 8.4 | 67.5 |
| Sportsball + Kaiju (Monster Bowl) (n 60, above) | 68.3 | -20.0 | -2.8 | 5.3 | 8.4 | 65.0 |
| Swarm + Heist Crew (Plague of Locusts) (n 80, above) | 66.3 | -23.8 | -3.7 | 5.3 | 8.5 | 62.5 |
| Swarm + Slasher (It Came From the Vents) (n 60, above) | 63.3 | -25.0 | -3.3 | 5.3 | 8.4 | 56.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 66.0% | 90.9% |
| Inside Man | heist | guardian | Epic | 62.0% | 96.8% |
| Forward Observer | army | guardian | Epic | 57.0% | 96.5% |
| The Brute | horror | guardian | Epic | 44.0% | 95.5% |
| Star Quarterback | ball | stalker | Mythic | 41.0% | 97.6% |
| Gunnery Sergeant | army | gunner | Mythic | 40.0% | 97.5% |
| The Mastermind | heist | gunner | Mythic | 34.0% | 97.1% |
| Bonesetter | undead | medic | Epic | 33.0% | 90.9% |
| Giant Mecha | kaiju | guardian | Epic | 31.0% | 90.3% |
| The Sheriff | west | guardian | Epic | 29.0% | 96.6% |
| The Leviathan | kaiju | brawler | Mythic | 26.0% | 100.0% |
| The Hive Mind | bug | mystic | Mythic | 24.0% | 95.8% |
| The Dream Stalker | horror | mystic | Mythic | 23.0% | 95.7% |
| Emperor Scorpion | bug | brawler | Epic | 22.0% | 86.4% |
| Star Knight | space | guardian | Epic | 22.0% | 95.5% |
| The Drifter | west | stalker | Mythic | 20.0% | 100.0% |
| Bone Dragon | undead | brawler | Mythic | 19.0% | 100.0% |
| Head Coach | ball | mystic | Rare | 13.0% | 69.2% |
| Field Medic | army | medic | Rare | 12.0% | 75.0% |
| The Fixer | heist | medic | Rare | 12.0% | 100.0% |
| The Dark Lord | space | mystic | Mythic | 10.0% | 100.0% |
| Starship Captain | space | brawler | Rare | 6.0% | 100.0% |
| Rifle Squad | army | gunner | Common | 4.0% | 75.0% |
| Necromancer | undead | mystic | Rare | 4.0% | 50.0% |
| Dodgeball Team | ball | guardian | Common | 4.0% | 75.0% |
| The Gunslinger | west | gunner | Rare | 4.0% | 100.0% |
| The Final Girl | horror | gunner | Rare | 4.0% | 75.0% |
| Brood Queen | bug | mystic | Rare | 3.0% | 100.0% |
| Cheer Squad | ball | medic | Common | 3.0% | 66.7% |
| Grave Golem | undead | guardian | Rare | 2.0% | 100.0% |
| Safecracker | heist | brawler | Uncommon | 2.0% | 100.0% |
| Baby Kaiju | kaiju | brawler | Common | 2.0% | 50.0% |
| Skeleton Archers | undead | gunner | Common | 1.0% | 100.0% |
| Zombie Mob | undead | brawler | Common | 1.0% | 0.0% |
| Lookouts | heist | gunner | Common | 1.0% | 0.0% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 1.0% | 0.0% |
| Giant Moth | kaiju | mystic | Rare | 1.0% | 0.0% |
| Riot Shield | army | guardian | Common | 0.0% | - |
| Commando | army | stalker | Common | 0.0% | - |
| Radio Operator | army | mystic | Uncommon | 0.0% | - |
| Ammo Mule | army | brawler | Uncommon | 0.0% | - |
| Ravager Brood | bug | brawler | Common | 0.0% | - |
| Acid Spitters | bug | gunner | Common | 0.0% | - |
| Shellback Beetles | bug | guardian | Common | 0.0% | - |
| Burrow Lurker | bug | stalker | Uncommon | 0.0% | - |
| Nurse Bee | bug | medic | Uncommon | 0.0% | - |
| Vampire Bat | undead | stalker | Common | 0.0% | - |
| Wraith | undead | stalker | Uncommon | 0.0% | - |
| Hothead Pitcher | ball | brawler | Common | 0.0% | - |
| Water Boy | ball | medic | Uncommon | 0.0% | - |
| Point Guard | ball | gunner | Uncommon | 0.0% | - |
| The Muscle | heist | guardian | Common | 0.0% | - |
| Getaway Driver | heist | stalker | Common | 0.0% | - |
| The Hacker | heist | mystic | Uncommon | 0.0% | - |
| Outlaw Gang | west | brawler | Common | 0.0% | - |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Bounty Hunter | west | stalker | Uncommon | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| Camp Counselors | horror | guardian | Common | 0.0% | - |
| Creepy Kids | horror | stalker | Common | 0.0% | - |
| The Babysitter | horror | medic | Common | 0.0% | - |
| The Priest | horror | mystic | Uncommon | 0.0% | - |
| Chainsaw Maniac | horror | brawler | Uncommon | 0.0% | - |
| Redshirts | space | guardian | Common | 0.0% | - |
| Repair Bots | space | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |
| Space Smuggler | space | stalker | Uncommon | 0.0% | - |
| The Telepath | space | mystic | Uncommon | 0.0% | - |
| Defense Force Tanks | kaiju | gunner | Common | 0.0% | - |
| TV Reporter | kaiju | medic | Common | 0.0% | - |
| The Scientist | kaiju | mystic | Uncommon | 0.0% | - |

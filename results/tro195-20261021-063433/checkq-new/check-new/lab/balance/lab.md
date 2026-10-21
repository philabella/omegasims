# Balance lab: lv4.html, expert bot, 40 paired runs per config, enemies x1.3

Baseline win 87.5%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## mono

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Only Undead | 95.0 | +7.5 | 1.1 | 6.4 | 8.9 | 92.5 |
| Only Heist Crew | 95.0 | +7.5 | 1.1 | 5.7 | 8.9 | 92.5 |
| Only Sportsball | 95.0 | +7.5 | 1.1 | 6.4 | 9.0 | 92.5 |
| Only Army | 87.5 | +0.0 | 0.0 | 4.8 | 8.5 | 85.0 |
| Only Swarm | 87.5 | +0.0 | 0.0 | 6.9 | 8.8 | 92.5 |
| Only Wild West | 85.0 | -2.5 | -0.3 | 5.2 | 8.6 | 82.5 |
| Only Slasher | 72.5 | -15.0 | -1.7 | 4.5 | 7.5 | 70.0 |
| Only Kaiju | 72.5 | -15.0 | -1.7 | 4.8 | 7.9 | 65.0 |
| Only Space Opera | 65.0 | -22.5 | -2.1 | 4.8 | 7.7 | 62.5 |

## pairs

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Undead + Space Opera (Ghost Ship) | 92.5 | +5.0 | 0.8 | 5.2 | 8.9 | 82.5 |
| Undead + Sportsball (Sudden Death) | 90.0 | +2.5 | 0.4 | 6.4 | 8.7 | 77.5 |
| Army + Swarm (Bug Hunt) | 87.5 | +0.0 | 0.0 | 5.3 | 8.8 | 77.5 |
| Swarm + Sportsball (Killer Bees) | 87.5 | +0.0 | 0.0 | 5.8 | 8.7 | 80.0 |
| Undead + Heist Crew (Grave Robbers) | 87.5 | +0.0 | 0.0 | 5.4 | 8.8 | 87.5 |
| Swarm + Wild West (Stampede) | 87.5 | +0.0 | 0.0 | 6.2 | 8.8 | 80.0 |
| Swarm + Undead (Zombie Ants) | 85.0 | -2.5 | -0.3 | 5.8 | 8.8 | 80.0 |
| Undead + Kaiju (Atomic Zombies) | 82.5 | -5.0 | -0.6 | 5.7 | 8.6 | 77.5 |
| Army + Heist Crew (Arms Deal) | 80.0 | -7.5 | -0.9 | 5.8 | 8.7 | 80.0 |
| Swarm + Heist Crew (Plague of Locusts) | 80.0 | -7.5 | -0.9 | 5.3 | 8.7 | 82.5 |
| Sportsball + Heist Crew (Fixed Match) | 80.0 | -7.5 | -0.9 | 5.8 | 8.6 | 77.5 |
| Wild West + Kaiju (Monster Roundup) | 80.0 | -7.5 | -0.9 | 4.7 | 8.5 | 62.5 |
| Army + Sportsball (Draft Day) | 77.5 | -10.0 | -1.2 | 5.6 | 8.4 | 75.0 |
| Undead + Wild West (Ghost Town) | 77.5 | -10.0 | -1.6 | 5.2 | 8.5 | 50.0 |
| Slasher + Space Opera (Scream Into the Void) | 77.5 | -10.0 | -1.1 | 4.7 | 8.3 | 65.0 |
| Sportsball + Wild West (Rodeo) | 75.0 | -12.5 | -1.7 | 4.7 | 8.3 | 70.0 |
| Swarm + Slasher (It Came From the Vents) | 75.0 | -12.5 | -1.5 | 5.9 | 8.6 | 62.5 |
| Army + Undead (Fallen Comrades) | 72.5 | -15.0 | -1.6 | 5.4 | 8.5 | 50.0 |
| Heist Crew + Wild West (The Great Train Robbery) | 72.5 | -15.0 | -1.9 | 5.9 | 8.4 | 72.5 |
| Army + Slasher (Night Patrol) | 72.5 | -15.0 | -1.6 | 4.8 | 8.3 | 60.0 |
| Undead + Slasher (Nobody Stays Dead) | 72.5 | -15.0 | -1.7 | 5.5 | 8.3 | 70.0 |
| Swarm + Space Opera (The Hive Ship) | 72.5 | -15.0 | -2.1 | 6.1 | 8.7 | 70.0 |
| Sportsball + Space Opera (Zero-G League) | 72.5 | -15.0 | -1.9 | 5.9 | 8.1 | 67.5 |
| Heist Crew + Space Opera (Contraband Run) | 72.5 | -15.0 | -1.9 | 5.4 | 8.2 | 72.5 |
| Sportsball + Kaiju (Monster Bowl) | 70.0 | -17.5 | -1.9 | 5.3 | 8.3 | 57.5 |
| Sportsball + Slasher (The Jock Dies First) | 67.5 | -20.0 | -2.3 | 5.4 | 8.1 | 57.5 |
| Swarm + Kaiju (Monster Reserve) | 67.5 | -20.0 | -2.1 | 5.5 | 8.4 | 70.0 |
| Heist Crew + Slasher (Ransom Note) | 65.0 | -22.5 | -2.5 | 5.5 | 8.2 | 67.5 |
| Wild West + Slasher (Ghost Riders) | 65.0 | -22.5 | -2.5 | 4.9 | 7.7 | 62.5 |
| Wild West + Space Opera (Space Cowboys) | 65.0 | -22.5 | -2.3 | 5.1 | 8.1 | 62.5 |
| Heist Crew + Kaiju (Disaster Insurance) | 65.0 | -22.5 | -2.5 | 5.2 | 8.1 | 65.0 |
| Army + Space Opera (Orbital Strike) | 62.5 | -25.0 | -2.4 | 5.0 | 8.2 | 47.5 |
| Army + Wild West (The Cavalry) | 60.0 | -27.5 | -3.1 | 5.1 | 8.2 | 55.0 |
| Slasher + Kaiju (Creature Feature) | 60.0 | -27.5 | -2.8 | 4.6 | 7.7 | 47.5 |
| Army + Kaiju (Defense Force) | 55.0 | -32.5 | -3.0 | 5.0 | 8.2 | 57.5 |
| Space Opera + Kaiju (Alien Invasion) | 55.0 | -32.5 | -2.8 | 4.7 | 8.0 | 52.5 |

## traits

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| No Medics | 90.0 | +2.5 | 0.4 | 5.9 | 8.9 | 95.0 |
| No Stalkers | 80.0 | -7.5 | -1.1 | 6.0 | 8.5 | 82.5 |
| No Gunners | 77.5 | -10.0 | -2.0 | 5.7 | 8.4 | 77.5 |
| No Brawlers | 75.0 | -12.5 | -1.9 | 5.2 | 8.3 | 80.0 |
| No Mystics | 75.0 | -12.5 | -2.2 | 6.0 | 8.3 | 82.5 |
| No Guardians | 62.5 | -25.0 | -2.9 | 5.1 | 8.1 | 72.5 |

## chars

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| No Cheer Squad (Common Sportsball Medic) | 92.5 | +5.0 | 0.8 | 5.9 | 8.9 | 97.5 |
| No Emperor Scorpion (Epic Swarm Brawler) | 90.0 | +2.5 | 1.0 | 5.7 | 8.5 | 90.0 |
| No Grave Golem (Rare Undead Guardian) | 90.0 | +2.5 | 1.0 | 5.8 | 8.7 | 92.5 |
| No Safecracker (Uncommon Heist Crew Brawler) | 90.0 | +2.5 | 1.0 | 5.8 | 8.6 | 92.5 |
| No Deputy (Common Wild West Guardian) | 90.0 | +2.5 | 1.0 | 5.9 | 8.7 | 90.0 |
| No Saloon Doc (Common Wild West Medic) | 90.0 | +2.5 | 1.0 | 5.9 | 8.7 | 90.0 |
| No Creepy Kids (Common Slasher Stalker) | 90.0 | +2.5 | 0.6 | 6.1 | 8.6 | 90.0 |
| No Starship Captain (Rare Space Opera Brawler) | 90.0 | +2.5 | 1.0 | 6.0 | 8.5 | 90.0 |
| No Radio Operator (Uncommon Army Mystic) | 87.5 | +0.0 | 0.0 | 6.1 | 8.5 | 90.0 |
| No Gunnery Sergeant (Mythic Army Gunner) | 87.5 | +0.0 | 0.0 | 5.9 | 8.5 | 90.0 |
| No Ravager Brood (Common Swarm Brawler) | 87.5 | +0.0 | 0.0 | 5.7 | 8.5 | 90.0 |
| No Acid Spitters (Common Swarm Gunner) | 87.5 | +0.0 | 0.0 | 5.5 | 8.5 | 87.5 |
| No Burrow Lurker (Uncommon Swarm Stalker) | 87.5 | +0.0 | 0.0 | 6.1 | 8.5 | 90.0 |
| No Nurse Bee (Uncommon Swarm Medic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No The Hive Mind (Mythic Swarm Mystic) | 87.5 | +0.0 | 0.0 | 5.9 | 8.5 | 90.0 |
| No Vampire Bat (Common Undead Stalker) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No Wraith (Uncommon Undead Stalker) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No Necromancer (Rare Undead Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No Bone Dragon (Mythic Undead Brawler) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No Dodgeball Team (Common Sportsball Guardian) | 87.5 | +0.0 | 0.0 | 5.7 | 8.6 | 90.0 |
| No Hothead Pitcher (Common Sportsball Brawler) | 87.5 | +0.0 | 0.0 | 6.0 | 8.7 | 92.5 |
| No Water Boy (Uncommon Sportsball Medic) | 87.5 | +0.0 | 0.0 | 5.9 | 8.5 | 90.0 |
| No Point Guard (Uncommon Sportsball Gunner) | 87.5 | +0.0 | 0.0 | 6.1 | 8.5 | 90.0 |
| No Star Quarterback (Mythic Sportsball Stalker) | 87.5 | +0.0 | 0.0 | 5.8 | 8.5 | 85.0 |
| No Lookouts (Common Heist Crew Gunner) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 92.5 |
| No Getaway Driver (Common Heist Crew Stalker) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No The Hacker (Uncommon Heist Crew Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No The Fixer (Rare Heist Crew Medic) | 87.5 | +0.0 | 0.0 | 5.7 | 8.7 | 92.5 |
| No The Mastermind (Mythic Heist Crew Gunner) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 87.5 |
| No Outlaw Gang (Common Wild West Brawler) | 87.5 | +0.0 | 0.0 | 5.9 | 8.5 | 90.0 |
| No Bounty Hunter (Uncommon Wild West Stalker) | 87.5 | +0.0 | 0.0 | 5.9 | 8.5 | 90.0 |
| No Prospector (Uncommon Wild West Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No The Gunslinger (Rare Wild West Gunner) | 87.5 | +0.0 | 0.0 | 6.1 | 8.5 | 90.0 |
| No The Sheriff (Epic Wild West Guardian) | 87.5 | +0.0 | 0.0 | 5.9 | 8.5 | 90.0 |
| No The Drifter (Mythic Wild West Stalker) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No Camp Counselors (Common Slasher Guardian) | 87.5 | +0.0 | 0.0 | 5.7 | 8.4 | 87.5 |
| No The Babysitter (Common Slasher Medic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No The Priest (Uncommon Slasher Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No Chainsaw Maniac (Uncommon Slasher Brawler) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No The Dream Stalker (Mythic Slasher Mystic) | 87.5 | +0.0 | 0.0 | 5.8 | 8.5 | 90.0 |
| No Repair Bots (Common Space Opera Medic) | 87.5 | +0.0 | 0.0 | 5.8 | 8.6 | 92.5 |
| No Hotshot Pilot (Common Space Opera Gunner) | 87.5 | +0.0 | 0.0 | 6.1 | 8.5 | 90.0 |
| No Space Smuggler (Uncommon Space Opera Stalker) | 87.5 | +0.0 | 0.0 | 5.9 | 8.5 | 90.0 |
| No The Telepath (Uncommon Space Opera Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No Star Knight (Epic Space Opera Guardian) | 87.5 | +0.0 | 0.0 | 6.2 | 8.6 | 90.0 |
| No The Dark Lord (Mythic Space Opera Mystic) | 87.5 | +0.0 | 0.0 | 5.9 | 8.5 | 90.0 |
| No Defense Force Tanks (Common Kaiju Gunner) | 87.5 | +0.0 | 0.0 | 6.2 | 8.6 | 90.0 |
| No Baby Kaiju (Common Kaiju Brawler) | 87.5 | +0.0 | 0.0 | 6.1 | 8.5 | 90.0 |
| No TV Reporter (Common Kaiju Medic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No The Scientist (Uncommon Kaiju Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No Giant Moth (Rare Kaiju Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.5 | 90.0 |
| No Giant Mecha (Epic Kaiju Guardian) | 87.5 | +0.0 | 0.0 | 5.9 | 8.5 | 87.5 |
| No The Leviathan (Mythic Kaiju Brawler) | 87.5 | +0.0 | 0.0 | 6.1 | 8.5 | 90.0 |
| No Riot Shield (Common Army Guardian) | 85.0 | -2.5 | -1.0 | 5.5 | 8.4 | 87.5 |
| No Commando (Common Army Stalker) | 85.0 | -2.5 | -1.0 | 6.1 | 8.5 | 90.0 |
| No Ammo Mule (Uncommon Army Brawler) | 85.0 | -2.5 | -1.0 | 5.8 | 8.5 | 87.5 |
| No Brood Queen (Rare Swarm Mystic) | 85.0 | -2.5 | -1.0 | 5.6 | 8.4 | 87.5 |
| No Skeleton Archers (Common Undead Gunner) | 85.0 | -2.5 | -0.6 | 5.9 | 8.4 | 87.5 |
| No Bonesetter (Epic Undead Medic) | 85.0 | -2.5 | -1.0 | 6.0 | 8.5 | 90.0 |
| No The Final Girl (Rare Slasher Gunner) | 85.0 | -2.5 | -1.0 | 6.1 | 8.5 | 87.5 |
| No Redshirts (Common Space Opera Guardian) | 85.0 | -2.5 | -1.0 | 6.1 | 8.6 | 90.0 |
| No Big-Game Hunter (Uncommon Kaiju Stalker) | 85.0 | -2.5 | -1.0 | 5.9 | 8.5 | 90.0 |
| No Shellback Beetles (Common Swarm Guardian) | 82.5 | -5.0 | -1.4 | 5.9 | 8.4 | 85.0 |
| No Zombie Mob (Common Undead Brawler) | 82.5 | -5.0 | -1.4 | 5.8 | 8.5 | 90.0 |
| No Head Coach (Rare Sportsball Mystic) | 82.5 | -5.0 | -1.4 | 6.0 | 8.5 | 87.5 |
| No Team Mascot (Epic Sportsball Guardian) | 82.5 | -5.0 | -1.4 | 5.8 | 8.5 | 87.5 |
| No The Muscle (Common Heist Crew Guardian) | 82.5 | -5.0 | -1.4 | 5.7 | 8.4 | 85.0 |
| No Inside Man (Epic Heist Crew Guardian) | 82.5 | -5.0 | -1.0 | 6.2 | 8.4 | 82.5 |
| No The Brute (Epic Slasher Guardian) | 82.5 | -5.0 | -1.4 | 6.1 | 8.5 | 90.0 |
| No Field Medic (Rare Army Medic) | 80.0 | -7.5 | -1.7 | 6.1 | 8.4 | 85.0 |
| No Rifle Squad (Common Army Gunner) | 72.5 | -15.0 | -2.4 | 6.2 | 8.2 | 80.0 |
| No Forward Observer (Epic Army Guardian) | 70.0 | -17.5 | -2.6 | 6.1 | 8.3 | 77.5 |

## legends

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Always Danger Close | 87.5 | +0.0 | 0.0 | 5.4 | 8.5 | 90.0 |
| Always Shock and Awe | 87.5 | +0.0 | 0.0 | 5.8 | 8.5 | 90.0 |
| Always Inside Job | 87.5 | +0.0 | 0.0 | 5.8 | 8.5 | 87.5 |
| Always Main Character Energy | 85.0 | -2.5 | -1.0 | 6.3 | 8.5 | 90.0 |
| Always Hype Train | 85.0 | -2.5 | -1.0 | 6.6 | 8.4 | 82.5 |
| Always Underdog Story | 82.5 | -5.0 | -1.0 | 5.1 | 8.4 | 85.0 |
| Always Ensemble Cast | 82.5 | -5.0 | -1.4 | 6.3 | 8.5 | 85.0 |
| Always Director's Cut | 82.5 | -5.0 | -1.0 | 6.2 | 8.5 | 82.5 |
| Always Haunted Wallet | 82.5 | -5.0 | -1.0 | 5.6 | 8.4 | 85.0 |
| Always Cult Classic | 82.5 | -5.0 | -1.0 | 5.6 | 8.5 | 87.5 |
| Always Blockbuster | 82.5 | -5.0 | -1.4 | 6.7 | 8.4 | 87.5 |
| Always Halftime Show | 80.0 | -7.5 | -1.7 | 6.1 | 8.4 | 82.5 |
| Always Talent Scout | 80.0 | -7.5 | -1.3 | 6.3 | 8.4 | 50.0 |
| Always Crossover Episode | 80.0 | -7.5 | -1.3 | 6.8 | 8.5 | 87.5 |
| Always Grave Recruits | 77.5 | -10.0 | -2.0 | 5.8 | 8.4 | 87.5 |
| Always Product Placement | 77.5 | -10.0 | -1.6 | 5.9 | 8.4 | 77.5 |
| Always Field Hospital | 75.0 | -12.5 | -1.9 | 5.4 | 8.3 | 82.5 |
| Always Full-Court Press | 75.0 | -12.5 | -1.9 | 5.9 | 8.3 | 75.0 |
| Always Game Ball | 72.5 | -15.0 | -2.1 | 6.2 | 8.2 | 75.0 |
| Always Clean Getaway | 72.5 | -15.0 | -2.1 | 5.3 | 8.3 | 77.5 |
| Always The Sequel | 72.5 | -15.0 | -2.1 | 5.4 | 8.2 | 77.5 |
| Always Scream Queen | 72.5 | -15.0 | -2.1 | 5.3 | 8.2 | 72.5 |
| Always Spin-off Deal | 72.5 | -15.0 | -2.4 | 5.5 | 8.3 | 80.0 |
| Always Pheromone Trail | 70.0 | -17.5 | -2.3 | 5.9 | 8.2 | 77.5 |
| Always Bloodline | 70.0 | -17.5 | -2.3 | 5.6 | 8.2 | 72.5 |
| Always Warp Speed | 70.0 | -17.5 | -2.3 | 5.4 | 8.2 | 75.0 |
| Always Extended Universe | 70.0 | -17.5 | -2.3 | 6.1 | 8.3 | 75.0 |
| Always Endless Brood | 67.5 | -20.0 | -2.8 | 5.9 | 8.1 | 72.5 |
| Always Graveyard Shift | 67.5 | -20.0 | -2.5 | 5.5 | 8.1 | 70.0 |
| Always TV Tower | 67.5 | -20.0 | -2.5 | 5.4 | 8.1 | 72.5 |
| Always Six-Shooter | 65.0 | -22.5 | -2.7 | 5.8 | 8.1 | 72.5 |
| Always Feeding Frenzy | 65.0 | -22.5 | -3.0 | 5.7 | 8.2 | 72.5 |
| Always Wanted Posters | 65.0 | -22.5 | -2.7 | 5.7 | 8.1 | 70.0 |
| Always Atomic Age | 65.0 | -22.5 | -2.7 | 5.7 | 8.1 | 72.5 |
| Always Payback | 65.0 | -22.5 | -2.7 | 5.6 | 8.1 | 70.0 |
| Always Shield Generator | 65.0 | -22.5 | -2.7 | 5.4 | 8.1 | 70.0 |
| Always The Mothership | 65.0 | -22.5 | -3.0 | 6.0 | 8.1 | 70.0 |
| Always The Vault | 65.0 | -22.5 | -2.7 | 5.6 | 8.1 | 70.0 |
| Always Quick Draw | 65.0 | -22.5 | -2.7 | 5.5 | 8.1 | 72.5 |
| Always Indie Darling | 65.0 | -22.5 | -2.7 | 5.5 | 8.1 | 70.0 |
| Always Lights Out | 62.5 | -25.0 | -3.2 | 5.7 | 8.1 | 70.0 |
| No Legendary | 60.0 | -27.5 | -3.1 | 5.1 | 8.1 | 72.5 |

## items

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Start with Smoke Grenade | 97.5 | +10.0 | 2.0 | 6.1 | 8.9 | 97.5 |
| Start with Sniper Scope (Rare) | 95.0 | +7.5 | 1.3 | 6.1 | 9.0 | 100.0 |
| Start with Stage Lights | 95.0 | +7.5 | 1.3 | 6.3 | 8.8 | 95.0 |
| Start with Background Extras | 95.0 | +7.5 | 1.1 | 7.0 | 8.9 | 95.0 |
| Start with Energy Drink | 92.5 | +5.0 | 1.0 | 6.0 | 8.8 | 92.5 |
| Start with Hollow Points | 92.5 | +5.0 | 1.0 | 6.4 | 8.8 | 95.0 |
| Start with War Banner (Rare) | 92.5 | +5.0 | 1.0 | 6.1 | 8.8 | 92.5 |
| Start with Residuals | 92.5 | +5.0 | 1.4 | 6.5 | 8.7 | 92.5 |
| Start with Flak Vest | 90.0 | +2.5 | 0.4 | 6.1 | 8.7 | 92.5 |
| Start with Spiked Armor | 90.0 | +2.5 | 0.4 | 6.3 | 8.7 | 92.5 |
| Start with Interest Ledger | 90.0 | +2.5 | 0.4 | 6.1 | 8.8 | 92.5 |
| Start with Overclock Chip (Rare) | 90.0 | +2.5 | 0.6 | 6.1 | 8.8 | 90.0 |
| Start with Extra Life (Rare) | 90.0 | +2.5 | 0.4 | 6.8 | 8.8 | 92.5 |
| Start with Prop Master (Rare) | 87.5 | +0.0 | 0.0 | 6.2 | 8.5 | 87.5 |
| Start with Signal Flare | 87.5 | +0.0 | 0.0 | 6.6 | 8.7 | 90.0 |
| Start with Iron Plating | 87.5 | +0.0 | 0.0 | 6.6 | 8.7 | 90.0 |
| Start with Tesla Coil (Rare) | 87.5 | +0.0 | 0.0 | 6.2 | 8.7 | 90.0 |
| Start with Team-Up Poster | 87.5 | +0.0 | 0.0 | 6.3 | 8.6 | 87.5 |
| Start with Slow Burn | 87.5 | +0.0 | 0.0 | 6.1 | 8.8 | 92.5 |
| Start with Understudy (Rare) | 87.5 | +0.0 | 0.0 | 6.4 | 8.8 | 90.0 |
| Start with Lucky Coin | 85.0 | -2.5 | -0.4 | 6.0 | 8.6 | 90.0 |
| Start with Battery Pack | 85.0 | -2.5 | -0.4 | 6.4 | 8.7 | 87.5 |
| Start with Crossover Crest (Rare) | 82.5 | -5.0 | -0.7 | 6.7 | 8.8 | 87.5 |
| Start with Vampire Fangs | 80.0 | -7.5 | -1.1 | 6.6 | 8.4 | 87.5 |
| Start with Glass Cannon (Rare) | 77.5 | -10.0 | -1.3 | 6.0 | 8.6 | 82.5 |
| Never take items | 75.0 | -12.5 | -2.2 | 5.1 | 8.5 | 87.5 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Forward Observer | army | guardian | Epic | 70.0% | 96.4% |
| Inside Man | heist | guardian | Epic | 60.0% | 91.7% |
| Team Mascot | ball | guardian | Epic | 55.0% | 100.0% |
| Gunnery Sergeant | army | gunner | Mythic | 45.0% | 100.0% |
| The Mastermind | heist | gunner | Mythic | 37.5% | 93.3% |
| Star Quarterback | ball | stalker | Mythic | 35.0% | 100.0% |
| The Drifter | west | stalker | Mythic | 30.0% | 91.7% |
| Star Knight | space | guardian | Epic | 30.0% | 83.3% |
| The Sheriff | west | guardian | Epic | 27.5% | 100.0% |
| The Brute | horror | guardian | Epic | 25.0% | 100.0% |
| The Dream Stalker | horror | mystic | Mythic | 25.0% | 100.0% |
| Bone Dragon | undead | brawler | Mythic | 22.5% | 100.0% |
| The Dark Lord | space | mystic | Mythic | 22.5% | 100.0% |
| Field Medic | army | medic | Rare | 20.0% | 87.5% |
| Bonesetter | undead | medic | Epic | 20.0% | 100.0% |
| The Fixer | heist | medic | Rare | 20.0% | 75.0% |
| The Hive Mind | bug | mystic | Mythic | 17.5% | 100.0% |
| Giant Mecha | kaiju | guardian | Epic | 17.5% | 85.7% |
| The Leviathan | kaiju | brawler | Mythic | 17.5% | 100.0% |
| Head Coach | ball | mystic | Rare | 15.0% | 83.3% |
| Starship Captain | space | brawler | Rare | 12.5% | 80.0% |
| Emperor Scorpion | bug | brawler | Epic | 10.0% | 100.0% |
| The Final Girl | horror | gunner | Rare | 7.5% | 100.0% |
| Necromancer | undead | mystic | Rare | 5.0% | 100.0% |
| Cheer Squad | ball | medic | Common | 5.0% | 0.0% |
| Rifle Squad | army | gunner | Common | 2.5% | 0.0% |
| Burrow Lurker | bug | stalker | Uncommon | 2.5% | 100.0% |
| Brood Queen | bug | mystic | Rare | 2.5% | 100.0% |
| Zombie Mob | undead | brawler | Common | 2.5% | 0.0% |
| Grave Golem | undead | guardian | Rare | 2.5% | 0.0% |
| Lookouts | heist | gunner | Common | 2.5% | 0.0% |
| Safecracker | heist | brawler | Uncommon | 2.5% | 0.0% |
| The Gunslinger | west | gunner | Rare | 2.5% | 100.0% |
| Redshirts | space | guardian | Common | 2.5% | 0.0% |
| Defense Force Tanks | kaiju | gunner | Common | 2.5% | 0.0% |
| Riot Shield | army | guardian | Common | 0.0% | - |
| Commando | army | stalker | Common | 0.0% | - |
| Radio Operator | army | mystic | Uncommon | 0.0% | - |
| Ammo Mule | army | brawler | Uncommon | 0.0% | - |
| Ravager Brood | bug | brawler | Common | 0.0% | - |
| Acid Spitters | bug | gunner | Common | 0.0% | - |
| Shellback Beetles | bug | guardian | Common | 0.0% | - |
| Nurse Bee | bug | medic | Uncommon | 0.0% | - |
| Skeleton Archers | undead | gunner | Common | 0.0% | - |
| Vampire Bat | undead | stalker | Common | 0.0% | - |
| Wraith | undead | stalker | Uncommon | 0.0% | - |
| Dodgeball Team | ball | guardian | Common | 0.0% | - |
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
| Repair Bots | space | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |
| Space Smuggler | space | stalker | Uncommon | 0.0% | - |
| The Telepath | space | mystic | Uncommon | 0.0% | - |
| Baby Kaiju | kaiju | brawler | Common | 0.0% | - |
| TV Reporter | kaiju | medic | Common | 0.0% | - |
| The Scientist | kaiju | mystic | Uncommon | 0.0% | - |
| Big-Game Hunter | kaiju | stalker | Uncommon | 0.0% | - |
| Giant Moth | kaiju | mystic | Rare | 0.0% | - |

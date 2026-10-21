# Balance lab: lv4.html, expert bot, 40 paired runs per config, enemies x1.3

Baseline win 87.5%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## mono

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Only Undead | 95.0 | +7.5 | 1.1 | 6.3 | 8.9 | 92.5 |
| Only Heist Crew | 95.0 | +7.5 | 1.1 | 5.6 | 8.9 | 95.0 |
| Only Sportsball | 90.0 | +2.5 | 0.4 | 6.7 | 8.9 | 90.0 |
| Only Army | 87.5 | +0.0 | 0.0 | 5.1 | 8.6 | 85.0 |
| Only Swarm | 85.0 | -2.5 | -0.4 | 6.9 | 8.8 | 92.5 |
| Only Wild West | 82.5 | -5.0 | -0.7 | 5.4 | 8.5 | 80.0 |
| Only Space Opera | 65.0 | -22.5 | -2.5 | 5.0 | 7.8 | 60.0 |
| Only Kaiju | 65.0 | -22.5 | -2.5 | 5.0 | 7.6 | 62.5 |
| Only Slasher | 62.5 | -25.0 | -2.5 | 4.7 | 7.3 | 62.5 |

## pairs

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Swarm + Sportsball (Killer Bees) | 95.0 | +7.5 | 1.1 | 5.4 | 8.9 | 82.5 |
| Undead + Wild West (Ghost Town) | 87.5 | +0.0 | 0.0 | 5.1 | 8.7 | 65.0 |
| Undead + Sportsball (Sudden Death) | 87.5 | +0.0 | 0.0 | 6.4 | 8.8 | 75.0 |
| Swarm + Undead (Zombie Ants) | 85.0 | -2.5 | -0.3 | 6.0 | 8.8 | 75.0 |
| Undead + Heist Crew (Grave Robbers) | 85.0 | -2.5 | -0.4 | 5.7 | 8.8 | 87.5 |
| Sportsball + Heist Crew (Fixed Match) | 85.0 | -2.5 | -0.4 | 6.1 | 8.7 | 85.0 |
| Swarm + Wild West (Stampede) | 85.0 | -2.5 | -0.4 | 5.9 | 8.7 | 72.5 |
| Army + Heist Crew (Arms Deal) | 82.5 | -5.0 | -0.7 | 5.6 | 8.7 | 82.5 |
| Army + Swarm (Bug Hunt) | 80.0 | -7.5 | -1.0 | 5.4 | 8.8 | 67.5 |
| Swarm + Heist Crew (Plague of Locusts) | 80.0 | -7.5 | -1.0 | 5.1 | 8.8 | 80.0 |
| Swarm + Slasher (It Came From the Vents) | 80.0 | -7.5 | -1.3 | 5.7 | 8.6 | 72.5 |
| Undead + Space Opera (Ghost Ship) | 80.0 | -7.5 | -1.1 | 5.4 | 8.8 | 67.5 |
| Undead + Kaiju (Atomic Zombies) | 80.0 | -7.5 | -0.8 | 6.1 | 8.6 | 67.5 |
| Swarm + Space Opera (The Hive Ship) | 77.5 | -10.0 | -1.4 | 6.2 | 8.6 | 67.5 |
| Wild West + Space Opera (Space Cowboys) | 77.5 | -10.0 | -1.6 | 4.7 | 8.4 | 70.0 |
| Army + Undead (Fallen Comrades) | 75.0 | -12.5 | -1.4 | 5.4 | 8.6 | 52.5 |
| Heist Crew + Wild West (The Great Train Robbery) | 75.0 | -12.5 | -1.9 | 5.4 | 8.5 | 75.0 |
| Sportsball + Space Opera (Zero-G League) | 75.0 | -12.5 | -2.2 | 5.7 | 8.1 | 65.0 |
| Heist Crew + Kaiju (Disaster Insurance) | 75.0 | -12.5 | -1.5 | 5.0 | 8.3 | 75.0 |
| Army + Sportsball (Draft Day) | 72.5 | -15.0 | -2.1 | 5.6 | 8.2 | 70.0 |
| Sportsball + Wild West (Rodeo) | 72.5 | -15.0 | -2.4 | 4.6 | 8.2 | 67.5 |
| Slasher + Space Opera (Scream Into the Void) | 70.0 | -17.5 | -1.9 | 5.1 | 8.1 | 55.0 |
| Swarm + Kaiju (Monster Reserve) | 70.0 | -17.5 | -1.8 | 6.2 | 8.7 | 65.0 |
| Wild West + Kaiju (Monster Roundup) | 70.0 | -17.5 | -2.1 | 5.0 | 8.0 | 60.0 |
| Army + Slasher (Night Patrol) | 67.5 | -20.0 | -2.1 | 4.9 | 8.2 | 60.0 |
| Undead + Slasher (Nobody Stays Dead) | 67.5 | -20.0 | -2.1 | 5.7 | 8.3 | 65.0 |
| Wild West + Slasher (Ghost Riders) | 67.5 | -20.0 | -2.3 | 5.4 | 7.8 | 62.5 |
| Space Opera + Kaiju (Alien Invasion) | 67.5 | -20.0 | -2.3 | 4.5 | 8.3 | 67.5 |
| Army + Wild West (The Cavalry) | 65.0 | -22.5 | -2.7 | 4.9 | 8.3 | 52.5 |
| Army + Space Opera (Orbital Strike) | 65.0 | -22.5 | -2.7 | 5.2 | 8.2 | 47.5 |
| Slasher + Kaiju (Creature Feature) | 65.0 | -22.5 | -2.3 | 4.7 | 8.0 | 47.5 |
| Heist Crew + Space Opera (Contraband Run) | 62.5 | -25.0 | -2.9 | 5.5 | 8.2 | 60.0 |
| Sportsball + Slasher (The Jock Dies First) | 60.0 | -27.5 | -3.3 | 6.3 | 8.0 | 55.0 |
| Heist Crew + Slasher (Ransom Note) | 60.0 | -27.5 | -3.3 | 5.5 | 8.2 | 60.0 |
| Sportsball + Kaiju (Monster Bowl) | 60.0 | -27.5 | -3.1 | 5.9 | 8.0 | 57.5 |
| Army + Kaiju (Defense Force) | 47.5 | -40.0 | -3.6 | 5.6 | 8.1 | 52.5 |

## traits

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| No Medics | 82.5 | -5.0 | -0.7 | 6.1 | 8.7 | 85.0 |
| No Mystics | 80.0 | -7.5 | -1.0 | 5.8 | 8.6 | 87.5 |
| No Stalkers | 77.5 | -10.0 | -2.0 | 6.0 | 8.4 | 77.5 |
| No Gunners | 70.0 | -17.5 | -2.3 | 6.4 | 8.3 | 72.5 |
| No Brawlers | 65.0 | -22.5 | -3.0 | 4.9 | 8.3 | 75.0 |
| No Guardians | 57.5 | -30.0 | -3.0 | 4.8 | 8.0 | 72.5 |

## chars

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| No Cheer Squad (Common Sportsball Medic) | 92.5 | +5.0 | 1.0 | 6.1 | 8.8 | 92.5 |
| No Grave Golem (Rare Undead Guardian) | 90.0 | +2.5 | 1.0 | 5.8 | 8.7 | 87.5 |
| No Bonesetter (Epic Undead Medic) | 90.0 | +2.5 | 1.0 | 5.9 | 8.7 | 90.0 |
| No Head Coach (Rare Sportsball Mystic) | 90.0 | +2.5 | 0.4 | 5.8 | 8.8 | 95.0 |
| No The Fixer (Rare Heist Crew Medic) | 90.0 | +2.5 | 0.6 | 5.4 | 8.7 | 90.0 |
| No Deputy (Common Wild West Guardian) | 90.0 | +2.5 | 1.0 | 5.9 | 8.7 | 90.0 |
| No The Gunslinger (Rare Wild West Gunner) | 90.0 | +2.5 | 1.0 | 6.2 | 8.7 | 90.0 |
| No The Sheriff (Epic Wild West Guardian) | 90.0 | +2.5 | 1.0 | 6.1 | 8.7 | 90.0 |
| No The Babysitter (Common Slasher Medic) | 90.0 | +2.5 | 1.0 | 5.9 | 8.7 | 90.0 |
| No Commando (Common Army Stalker) | 87.5 | +0.0 | 0.0 | 6.1 | 8.6 | 87.5 |
| No Radio Operator (Uncommon Army Mystic) | 87.5 | +0.0 | 0.0 | 6.1 | 8.6 | 87.5 |
| No Ammo Mule (Uncommon Army Brawler) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 87.5 |
| No Gunnery Sergeant (Mythic Army Gunner) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No Burrow Lurker (Uncommon Swarm Stalker) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 87.5 |
| No Brood Queen (Rare Swarm Mystic) | 87.5 | +0.0 | 0.0 | 5.8 | 8.6 | 87.5 |
| No The Hive Mind (Mythic Swarm Mystic) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 87.5 |
| No Vampire Bat (Common Undead Stalker) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No Wraith (Uncommon Undead Stalker) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No Necromancer (Rare Undead Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No Bone Dragon (Mythic Undead Brawler) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 87.5 |
| No Water Boy (Uncommon Sportsball Medic) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 87.5 |
| No Point Guard (Uncommon Sportsball Gunner) | 87.5 | +0.0 | 0.0 | 6.1 | 8.6 | 87.5 |
| No Getaway Driver (Common Heist Crew Stalker) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No Safecracker (Uncommon Heist Crew Brawler) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No The Hacker (Uncommon Heist Crew Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.7 | 87.5 |
| No Saloon Doc (Common Wild West Medic) | 87.5 | +0.0 | 0.0 | 5.9 | 8.7 | 90.0 |
| No Bounty Hunter (Uncommon Wild West Stalker) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 87.5 |
| No Prospector (Uncommon Wild West Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No The Drifter (Mythic Wild West Stalker) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 87.5 |
| No The Priest (Uncommon Slasher Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No Chainsaw Maniac (Uncommon Slasher Brawler) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No The Brute (Epic Slasher Guardian) | 87.5 | +0.0 | 0.0 | 5.8 | 8.7 | 90.0 |
| No The Dream Stalker (Mythic Slasher Mystic) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 87.5 |
| No Redshirts (Common Space Opera Guardian) | 87.5 | +0.0 | 0.0 | 6.0 | 8.7 | 90.0 |
| No Hotshot Pilot (Common Space Opera Gunner) | 87.5 | +0.0 | 0.0 | 6.1 | 8.6 | 87.5 |
| No Space Smuggler (Uncommon Space Opera Stalker) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No The Telepath (Uncommon Space Opera Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No Starship Captain (Rare Space Opera Brawler) | 87.5 | +0.0 | 0.0 | 6.1 | 8.6 | 87.5 |
| No The Dark Lord (Mythic Space Opera Mystic) | 87.5 | +0.0 | 0.0 | 5.9 | 8.6 | 87.5 |
| No Defense Force Tanks (Common Kaiju Gunner) | 87.5 | +0.0 | 0.0 | 6.3 | 8.7 | 87.5 |
| No Baby Kaiju (Common Kaiju Brawler) | 87.5 | +0.0 | 0.0 | 5.9 | 8.7 | 87.5 |
| No TV Reporter (Common Kaiju Medic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No The Scientist (Uncommon Kaiju Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No Giant Moth (Rare Kaiju Mystic) | 87.5 | +0.0 | 0.0 | 6.0 | 8.6 | 87.5 |
| No The Leviathan (Mythic Kaiju Brawler) | 87.5 | +0.0 | 0.0 | 6.1 | 8.6 | 87.5 |
| No Ravager Brood (Common Swarm Brawler) | 85.0 | -2.5 | -0.6 | 5.7 | 8.6 | 85.0 |
| No Acid Spitters (Common Swarm Gunner) | 85.0 | -2.5 | -1.0 | 5.6 | 8.6 | 85.0 |
| No Shellback Beetles (Common Swarm Guardian) | 85.0 | -2.5 | -1.0 | 5.9 | 8.6 | 87.5 |
| No Nurse Bee (Uncommon Swarm Medic) | 85.0 | -2.5 | -1.0 | 5.9 | 8.6 | 85.0 |
| No Emperor Scorpion (Epic Swarm Brawler) | 85.0 | -2.5 | -1.0 | 5.9 | 8.6 | 85.0 |
| No Skeleton Archers (Common Undead Gunner) | 85.0 | -2.5 | -0.6 | 5.9 | 8.6 | 87.5 |
| No Dodgeball Team (Common Sportsball Guardian) | 85.0 | -2.5 | -1.0 | 5.6 | 8.6 | 85.0 |
| No Hothead Pitcher (Common Sportsball Brawler) | 85.0 | -2.5 | -1.0 | 5.9 | 8.6 | 87.5 |
| No Star Quarterback (Mythic Sportsball Stalker) | 85.0 | -2.5 | -1.0 | 5.8 | 8.6 | 80.0 |
| No The Muscle (Common Heist Crew Guardian) | 85.0 | -2.5 | -1.0 | 5.9 | 8.5 | 85.0 |
| No The Mastermind (Mythic Heist Crew Gunner) | 85.0 | -2.5 | -1.0 | 6.1 | 8.6 | 85.0 |
| No Outlaw Gang (Common Wild West Brawler) | 85.0 | -2.5 | -1.0 | 5.9 | 8.6 | 87.5 |
| No Camp Counselors (Common Slasher Guardian) | 85.0 | -2.5 | -1.0 | 5.6 | 8.6 | 85.0 |
| No Creepy Kids (Common Slasher Stalker) | 85.0 | -2.5 | -1.0 | 6.1 | 8.6 | 85.0 |
| No The Final Girl (Rare Slasher Gunner) | 85.0 | -2.5 | -1.0 | 6.1 | 8.6 | 85.0 |
| No Repair Bots (Common Space Opera Medic) | 85.0 | -2.5 | -1.0 | 5.8 | 8.6 | 87.5 |
| No Star Knight (Epic Space Opera Guardian) | 85.0 | -2.5 | -1.0 | 6.0 | 8.6 | 82.5 |
| No Big-Game Hunter (Uncommon Kaiju Stalker) | 85.0 | -2.5 | -1.0 | 5.9 | 8.6 | 87.5 |
| No Riot Shield (Common Army Guardian) | 82.5 | -5.0 | -1.4 | 5.8 | 8.5 | 82.5 |
| No Zombie Mob (Common Undead Brawler) | 82.5 | -5.0 | -1.4 | 5.9 | 8.7 | 90.0 |
| No Inside Man (Epic Heist Crew Guardian) | 82.5 | -5.0 | -1.4 | 6.2 | 8.6 | 85.0 |
| No Giant Mecha (Epic Kaiju Guardian) | 82.5 | -5.0 | -1.4 | 6.1 | 8.5 | 85.0 |
| No Field Medic (Rare Army Medic) | 80.0 | -7.5 | -1.7 | 6.0 | 8.6 | 85.0 |
| No Team Mascot (Epic Sportsball Guardian) | 80.0 | -7.5 | -1.7 | 5.8 | 8.6 | 82.5 |
| No Lookouts (Common Heist Crew Gunner) | 80.0 | -7.5 | -1.7 | 6.3 | 8.6 | 82.5 |
| No Forward Observer (Epic Army Guardian) | 77.5 | -10.0 | -1.4 | 5.7 | 8.5 | 80.0 |
| No Rifle Squad (Common Army Gunner) | 70.0 | -17.5 | -2.6 | 6.0 | 8.1 | 75.0 |

## legends

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Always Talent Scout | 92.5 | +5.0 | 1.4 | 6.0 | 8.7 | 57.5 |
| Always Danger Close | 87.5 | +0.0 | 0.0 | 5.2 | 8.6 | 90.0 |
| Always Shock and Awe | 87.5 | +0.0 | 0.0 | 5.9 | 8.7 | 90.0 |
| Always Director's Cut | 87.5 | +0.0 | 0.0 | 6.0 | 8.7 | 87.5 |
| Always Hype Train | 87.5 | +0.0 | 0.0 | 6.5 | 8.6 | 87.5 |
| Always Halftime Show | 85.0 | -2.5 | -0.6 | 5.8 | 8.6 | 85.0 |
| Always Underdog Story | 85.0 | -2.5 | -1.0 | 5.0 | 8.6 | 85.0 |
| Always Ensemble Cast | 85.0 | -2.5 | -1.0 | 6.4 | 8.7 | 85.0 |
| Always Main Character Energy | 85.0 | -2.5 | -0.6 | 6.3 | 8.7 | 90.0 |
| Always Cult Classic | 85.0 | -2.5 | -0.6 | 5.3 | 8.6 | 85.0 |
| Always Blockbuster | 85.0 | -2.5 | -0.6 | 6.6 | 8.6 | 85.0 |
| Always Inside Job | 82.5 | -5.0 | -1.0 | 6.1 | 8.6 | 85.0 |
| Always Grave Recruits | 82.5 | -5.0 | -1.0 | 5.8 | 8.6 | 85.0 |
| Always Haunted Wallet | 82.5 | -5.0 | -1.0 | 6.0 | 8.6 | 82.5 |
| Always Crossover Episode | 82.5 | -5.0 | -1.0 | 6.6 | 8.7 | 85.0 |
| Always Extended Universe | 80.0 | -7.5 | -1.3 | 5.7 | 8.5 | 82.5 |
| Always Clean Getaway | 77.5 | -10.0 | -2.0 | 5.2 | 8.3 | 77.5 |
| Always The Sequel | 77.5 | -10.0 | -1.6 | 5.4 | 8.4 | 82.5 |
| Always Spin-off Deal | 77.5 | -10.0 | -1.6 | 5.3 | 8.5 | 87.5 |
| Always Product Placement | 77.5 | -10.0 | -1.6 | 5.9 | 8.5 | 80.0 |
| Always Field Hospital | 75.0 | -12.5 | -1.9 | 5.5 | 8.4 | 82.5 |
| Always Full-Court Press | 75.0 | -12.5 | -1.9 | 5.6 | 8.4 | 72.5 |
| Always Scream Queen | 75.0 | -12.5 | -1.9 | 5.4 | 8.3 | 77.5 |
| Always Feeding Frenzy | 72.5 | -15.0 | -2.1 | 5.4 | 8.3 | 80.0 |
| Always Game Ball | 70.0 | -17.5 | -2.3 | 5.9 | 8.3 | 75.0 |
| Always Endless Brood | 70.0 | -17.5 | -2.3 | 5.8 | 8.2 | 72.5 |
| Always Pheromone Trail | 70.0 | -17.5 | -2.3 | 5.8 | 8.2 | 72.5 |
| Always Graveyard Shift | 70.0 | -17.5 | -2.3 | 5.4 | 8.2 | 72.5 |
| Always Bloodline | 70.0 | -17.5 | -2.3 | 5.5 | 8.2 | 72.5 |
| Always TV Tower | 70.0 | -17.5 | -2.6 | 5.6 | 8.3 | 75.0 |
| Always Six-Shooter | 67.5 | -20.0 | -2.5 | 5.6 | 8.2 | 72.5 |
| Always Wanted Posters | 67.5 | -20.0 | -2.8 | 5.5 | 8.2 | 70.0 |
| Always Atomic Age | 67.5 | -20.0 | -2.8 | 5.6 | 8.2 | 75.0 |
| Always Warp Speed | 67.5 | -20.0 | -2.5 | 5.5 | 8.2 | 72.5 |
| Always The Mothership | 67.5 | -20.0 | -2.5 | 6.0 | 8.2 | 72.5 |
| Always The Vault | 67.5 | -20.0 | -2.8 | 5.5 | 8.2 | 70.0 |
| Always Payback | 65.0 | -22.5 | -3.0 | 5.5 | 8.2 | 70.0 |
| Always Lights Out | 65.0 | -22.5 | -3.0 | 5.7 | 8.2 | 72.5 |
| Always Quick Draw | 65.0 | -22.5 | -2.7 | 5.5 | 8.2 | 72.5 |
| No Legendary | 65.0 | -22.5 | -3.0 | 5.3 | 8.2 | 70.0 |
| Always Shield Generator | 62.5 | -25.0 | -3.2 | 5.4 | 8.2 | 70.0 |
| Always Indie Darling | 62.5 | -25.0 | -3.2 | 5.6 | 8.2 | 70.0 |

## items

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| Start with Sniper Scope (Rare) | 95.0 | +7.5 | 1.3 | 6.4 | 8.9 | 95.0 |
| Start with Residuals | 95.0 | +7.5 | 1.3 | 6.1 | 8.9 | 97.5 |
| Start with Smoke Grenade | 92.5 | +5.0 | 1.4 | 6.5 | 8.9 | 90.0 |
| Start with War Banner (Rare) | 92.5 | +5.0 | 1.4 | 6.1 | 8.8 | 92.5 |
| Start with Stage Lights | 92.5 | +5.0 | 1.0 | 6.1 | 8.8 | 92.5 |
| Start with Background Extras | 92.5 | +5.0 | 0.8 | 6.8 | 8.9 | 92.5 |
| Start with Hollow Points | 90.0 | +2.5 | 0.4 | 6.4 | 8.9 | 90.0 |
| Start with Interest Ledger | 90.0 | +2.5 | 0.4 | 5.6 | 8.8 | 90.0 |
| Start with Tesla Coil (Rare) | 90.0 | +2.5 | 0.6 | 6.3 | 8.8 | 90.0 |
| Start with Team-Up Poster | 90.0 | +2.5 | 1.0 | 6.3 | 8.7 | 90.0 |
| Start with Flak Vest | 87.5 | +0.0 | 0.0 | 6.5 | 8.8 | 92.5 |
| Start with Energy Drink | 87.5 | +0.0 | 0.0 | 6.3 | 8.7 | 90.0 |
| Start with Lucky Coin | 87.5 | +0.0 | 0.0 | 6.2 | 8.7 | 87.5 |
| Start with Battery Pack | 87.5 | +0.0 | 0.0 | 6.5 | 8.7 | 87.5 |
| Start with Signal Flare | 87.5 | +0.0 | 0.0 | 6.4 | 8.8 | 87.5 |
| Start with Understudy (Rare) | 87.5 | +0.0 | 0.0 | 6.3 | 8.9 | 87.5 |
| Start with Vampire Fangs | 85.0 | -2.5 | -0.6 | 6.4 | 8.7 | 90.0 |
| Start with Overclock Chip (Rare) | 85.0 | -2.5 | -0.4 | 6.4 | 8.6 | 87.5 |
| Start with Extra Life (Rare) | 85.0 | -2.5 | -0.4 | 6.9 | 8.8 | 90.0 |
| Start with Prop Master (Rare) | 82.5 | -5.0 | -1.4 | 6.3 | 8.6 | 87.5 |
| Start with Spiked Armor | 82.5 | -5.0 | -1.0 | 6.2 | 8.7 | 82.5 |
| Start with Iron Plating | 82.5 | -5.0 | -0.8 | 6.8 | 8.7 | 85.0 |
| Start with Glass Cannon (Rare) | 82.5 | -5.0 | -0.7 | 6.4 | 8.7 | 82.5 |
| Start with Slow Burn | 82.5 | -5.0 | -0.8 | 6.1 | 8.6 | 85.0 |
| Start with Crossover Crest (Rare) | 80.0 | -7.5 | -1.0 | 6.7 | 8.7 | 82.5 |
| Never take items | 80.0 | -7.5 | -1.1 | 4.9 | 8.7 | 90.0 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Forward Observer | army | guardian | Epic | 77.5% | 90.3% |
| Inside Man | heist | guardian | Epic | 55.0% | 95.5% |
| Team Mascot | ball | guardian | Epic | 52.5% | 100.0% |
| Gunnery Sergeant | army | gunner | Mythic | 40.0% | 100.0% |
| Star Quarterback | ball | stalker | Mythic | 37.5% | 100.0% |
| The Brute | horror | guardian | Epic | 37.5% | 93.3% |
| The Mastermind | heist | gunner | Mythic | 35.0% | 100.0% |
| The Sheriff | west | guardian | Epic | 32.5% | 100.0% |
| Star Knight | space | guardian | Epic | 32.5% | 92.3% |
| Head Coach | ball | mystic | Rare | 25.0% | 70.0% |
| The Fixer | heist | medic | Rare | 25.0% | 80.0% |
| Field Medic | army | medic | Rare | 22.5% | 88.9% |
| The Drifter | west | stalker | Mythic | 20.0% | 100.0% |
| The Dream Stalker | horror | mystic | Mythic | 20.0% | 100.0% |
| Giant Mecha | kaiju | guardian | Epic | 20.0% | 75.0% |
| The Leviathan | kaiju | brawler | Mythic | 20.0% | 100.0% |
| The Dark Lord | space | mystic | Mythic | 17.5% | 100.0% |
| Bonesetter | undead | medic | Epic | 15.0% | 83.3% |
| Emperor Scorpion | bug | brawler | Epic | 12.5% | 100.0% |
| Bone Dragon | undead | brawler | Mythic | 12.5% | 100.0% |
| Starship Captain | space | brawler | Rare | 12.5% | 100.0% |
| The Hive Mind | bug | mystic | Mythic | 10.0% | 100.0% |
| The Final Girl | horror | gunner | Rare | 10.0% | 100.0% |
| Brood Queen | bug | mystic | Rare | 5.0% | 100.0% |
| Necromancer | undead | mystic | Rare | 5.0% | 100.0% |
| Cheer Squad | ball | medic | Common | 5.0% | 50.0% |
| The Gunslinger | west | gunner | Rare | 5.0% | 50.0% |
| Rifle Squad | army | gunner | Common | 2.5% | 100.0% |
| Zombie Mob | undead | brawler | Common | 2.5% | 0.0% |
| Grave Golem | undead | guardian | Rare | 2.5% | 0.0% |
| Lookouts | heist | gunner | Common | 2.5% | 0.0% |
| The Hacker | heist | mystic | Uncommon | 2.5% | 0.0% |
| Deputy | west | guardian | Common | 2.5% | 0.0% |
| Defense Force Tanks | kaiju | gunner | Common | 2.5% | 0.0% |
| Baby Kaiju | kaiju | brawler | Common | 2.5% | 0.0% |
| Riot Shield | army | guardian | Common | 0.0% | - |
| Commando | army | stalker | Common | 0.0% | - |
| Radio Operator | army | mystic | Uncommon | 0.0% | - |
| Ammo Mule | army | brawler | Uncommon | 0.0% | - |
| Ravager Brood | bug | brawler | Common | 0.0% | - |
| Acid Spitters | bug | gunner | Common | 0.0% | - |
| Shellback Beetles | bug | guardian | Common | 0.0% | - |
| Burrow Lurker | bug | stalker | Uncommon | 0.0% | - |
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
| Safecracker | heist | brawler | Uncommon | 0.0% | - |
| Outlaw Gang | west | brawler | Common | 0.0% | - |
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
| TV Reporter | kaiju | medic | Common | 0.0% | - |
| The Scientist | kaiju | mystic | Uncommon | 0.0% | - |
| Big-Game Hunter | kaiju | stalker | Uncommon | 0.0% | - |
| Giant Moth | kaiju | mystic | Rare | 0.0% | - |

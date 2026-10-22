# Balance lab: fix14.html, expert bot, 300 paired runs per config, enemies x1, tune {"rvPivotUniq":1}

Baseline win 48.3%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:west+army | 60.3 | +12.0 | 3.0 | 3.7 | 8.6 | 65.3 |
| pair:ball+heist | 56.7 | +8.3 | 2.2 | 3.9 | 8.8 | 76.7 |
| pair:army+undead | 55.7 | +7.3 | 1.8 | 3.6 | 8.6 | 70.3 |
| bait:west+army | 38.3 | -10.0 | -2.5 | 3.9 | 8.3 | 38.0 |
| bait:army+undead | 37.7 | -10.7 | -2.9 | 3.7 | 8.1 | 37.7 |
| bait:ball+heist | 34.0 | -14.3 | -3.8 | 4.0 | 8.2 | 43.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Forward Observer | army | guardian | Epic | 34.3% | 58.3% |
| Head Coach | ball | mystic | Rare | 34.3% | 53.4% |
| Team Mascot | ball | guardian | Epic | 34.3% | 51.5% |
| Field Medic | army | medic | Rare | 29.0% | 62.1% |
| Inside Man | heist | guardian | Epic | 24.7% | 50.0% |
| The Fixer | heist | medic | Rare | 22.7% | 50.0% |
| Giant Mecha | kaiju | guardian | Epic | 21.0% | 50.8% |
| Dodgeball Team | ball | guardian | Common | 18.7% | 46.4% |
| Star Quarterback | ball | stalker | Mythic | 18.0% | 77.8% |
| Gunnery Sergeant | army | gunner | Mythic | 17.3% | 84.6% |
| The Brute | horror | guardian | Epic | 17.0% | 39.2% |
| Rifle Squad | army | gunner | Common | 16.3% | 61.2% |
| Water Boy | ball | medic | Uncommon | 15.7% | 55.3% |
| Point Guard | ball | gunner | Uncommon | 14.3% | 55.8% |
| The Mastermind | heist | gunner | Mythic | 14.3% | 74.4% |
| Ammo Mule | army | brawler | Uncommon | 14.0% | 73.8% |
| Radio Operator | army | mystic | Uncommon | 13.3% | 57.5% |
| The Final Girl | horror | gunner | Rare | 13.0% | 48.7% |
| Giant Moth | kaiju | mystic | Rare | 12.7% | 31.6% |
| Cheer Squad | ball | medic | Common | 12.3% | 43.2% |
| Emperor Scorpion | bug | brawler | Epic | 12.0% | 47.2% |
| Bonesetter | undead | medic | Epic | 11.7% | 42.9% |
| Lookouts | heist | gunner | Common | 10.3% | 45.2% |
| Safecracker | heist | brawler | Uncommon | 9.3% | 67.9% |
| Star Knight | space | guardian | Epic | 8.0% | 45.8% |
| Brood Queen | bug | mystic | Rare | 7.7% | 43.5% |
| Grave Golem | undead | guardian | Rare | 7.7% | 30.4% |
| The Hacker | heist | mystic | Uncommon | 7.7% | 60.9% |
| Starship Captain | space | brawler | Rare | 7.3% | 40.9% |
| The Sheriff | west | guardian | Epic | 7.0% | 38.1% |
| Necromancer | undead | mystic | Rare | 6.7% | 35.0% |
| The Gunslinger | west | gunner | Rare | 6.3% | 31.6% |
| Camp Counselors | horror | guardian | Common | 6.3% | 42.1% |
| Bone Dragon | undead | brawler | Mythic | 6.0% | 61.1% |
| The Dream Stalker | horror | mystic | Mythic | 6.0% | 55.6% |
| Baby Kaiju | kaiju | brawler | Common | 6.0% | 27.8% |
| The Leviathan | kaiju | brawler | Mythic | 6.0% | 83.3% |
| Riot Shield | army | guardian | Common | 5.3% | 62.5% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 5.3% | 37.5% |
| Sky Screamers | kaiju | gunner | Common | 5.0% | 26.7% |
| The Hive Mind | bug | mystic | Mythic | 4.7% | 71.4% |
| Getaway Driver | heist | stalker | Common | 4.7% | 28.6% |
| Chainsaw Maniac | horror | brawler | Uncommon | 4.7% | 50.0% |
| Creepy Kids | horror | stalker | Common | 4.0% | 33.3% |
| The Priest | horror | mystic | Uncommon | 4.0% | 33.3% |
| The Scientist | kaiju | mystic | Uncommon | 4.0% | 25.0% |
| The Drifter | west | stalker | Mythic | 3.7% | 54.5% |
| Spotter | army | stalker | Common | 3.3% | 70.0% |
| The Dark Lord | space | mystic | Mythic | 3.3% | 80.0% |
| Zombie Mob | undead | brawler | Common | 3.0% | 22.2% |
| Redshirts | space | guardian | Common | 3.0% | 11.1% |
| Repair Bots | space | medic | Common | 3.0% | 33.3% |
| Nurse Bee | bug | medic | Uncommon | 2.7% | 25.0% |
| Space Smuggler | space | stalker | Uncommon | 2.7% | 50.0% |
| The Muscle | heist | guardian | Common | 2.3% | 57.1% |
| Acid Spitters | bug | gunner | Common | 2.0% | 16.7% |
| Burrow Lurker | bug | stalker | Uncommon | 2.0% | 50.0% |
| Hothead Pitcher | ball | brawler | Common | 2.0% | 16.7% |
| The Telepath | space | mystic | Uncommon | 2.0% | 50.0% |
| Wraith | undead | stalker | Uncommon | 1.7% | 20.0% |
| Shellback Beetles | bug | guardian | Common | 1.3% | 25.0% |
| Skeleton Archers | undead | gunner | Common | 1.3% | 0.0% |
| Bounty Hunter | west | stalker | Uncommon | 1.3% | 50.0% |
| Ravager Brood | bug | brawler | Common | 1.0% | 33.3% |
| Outlaw Gang | west | brawler | Common | 1.0% | 33.3% |
| The Babysitter | horror | medic | Common | 1.0% | 66.7% |
| Prospector | west | mystic | Uncommon | 0.7% | 50.0% |
| Hotshot Pilot | space | gunner | Common | 0.3% | 0.0% |
| TV Reporter | kaiju | medic | Common | 0.3% | 0.0% |
| Vampire Bat | undead | stalker | Common | 0.0% | - |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |

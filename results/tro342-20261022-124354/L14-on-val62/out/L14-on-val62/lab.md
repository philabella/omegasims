# Balance lab: fix14.html, expert bot, 300 paired runs per config, enemies x1, tune {"rvPivotUniq":1}

Baseline win 50.0%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:ball+heist | 58.3 | +8.3 | 2.2 | 3.4 | 8.8 | 79.3 |
| pair:west+army | 54.7 | +4.7 | 1.3 | 3.4 | 8.6 | 66.3 |
| pair:army+undead | 52.0 | +2.0 | 0.5 | 3.3 | 8.6 | 64.0 |
| bait:west+army | 37.7 | -12.3 | -3.2 | 3.4 | 8.2 | 38.0 |
| bait:ball+heist | 34.3 | -15.7 | -4.1 | 3.5 | 8.2 | 43.0 |
| bait:army+undead | 34.0 | -16.0 | -4.2 | 3.2 | 8.1 | 33.0 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Forward Observer | army | guardian | Epic | 39.7% | 56.3% |
| Team Mascot | ball | guardian | Epic | 36.3% | 51.4% |
| Field Medic | army | medic | Rare | 36.0% | 55.6% |
| Head Coach | ball | mystic | Rare | 35.0% | 50.5% |
| Star Quarterback | ball | stalker | Mythic | 21.0% | 68.3% |
| Inside Man | heist | guardian | Epic | 20.7% | 64.5% |
| The Fixer | heist | medic | Rare | 20.0% | 56.7% |
| Rifle Squad | army | gunner | Common | 18.7% | 50.0% |
| Gunnery Sergeant | army | gunner | Mythic | 18.7% | 69.6% |
| Giant Mecha | kaiju | guardian | Epic | 17.7% | 45.3% |
| Dodgeball Team | ball | guardian | Common | 16.0% | 56.3% |
| Ammo Mule | army | brawler | Uncommon | 15.3% | 58.7% |
| Point Guard | ball | gunner | Uncommon | 14.7% | 43.2% |
| Radio Operator | army | mystic | Uncommon | 14.3% | 67.4% |
| Bonesetter | undead | medic | Epic | 14.0% | 38.1% |
| Giant Moth | kaiju | mystic | Rare | 14.0% | 40.5% |
| Emperor Scorpion | bug | brawler | Epic | 13.0% | 28.2% |
| The Mastermind | heist | gunner | Mythic | 12.3% | 81.1% |
| The Brute | horror | guardian | Epic | 12.3% | 64.9% |
| Cheer Squad | ball | medic | Common | 10.7% | 53.1% |
| The Final Girl | horror | gunner | Rare | 10.7% | 65.6% |
| Water Boy | ball | medic | Uncommon | 10.3% | 45.2% |
| Star Knight | space | guardian | Epic | 10.3% | 45.2% |
| Grave Golem | undead | guardian | Rare | 9.3% | 46.4% |
| Necromancer | undead | mystic | Rare | 9.0% | 40.7% |
| Brood Queen | bug | mystic | Rare | 8.3% | 32.0% |
| The Leviathan | kaiju | brawler | Mythic | 7.7% | 78.3% |
| The Gunslinger | west | gunner | Rare | 7.3% | 40.9% |
| Starship Captain | space | brawler | Rare | 7.3% | 68.2% |
| Bone Dragon | undead | brawler | Mythic | 6.7% | 65.0% |
| Lookouts | heist | gunner | Common | 6.7% | 65.0% |
| Riot Shield | army | guardian | Common | 6.3% | 63.2% |
| The Hacker | heist | mystic | Uncommon | 6.3% | 73.7% |
| Safecracker | heist | brawler | Uncommon | 6.0% | 72.2% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 6.0% | 38.9% |
| Spotter | army | stalker | Common | 5.7% | 47.1% |
| The Hive Mind | bug | mystic | Mythic | 5.7% | 41.2% |
| Sky Screamers | kaiju | gunner | Common | 5.7% | 29.4% |
| The Sheriff | west | guardian | Epic | 5.3% | 56.3% |
| The Dream Stalker | horror | mystic | Mythic | 5.3% | 81.3% |
| The Dark Lord | space | mystic | Mythic | 5.3% | 68.8% |
| Chainsaw Maniac | horror | brawler | Uncommon | 4.3% | 69.2% |
| Baby Kaiju | kaiju | brawler | Common | 4.3% | 30.8% |
| Camp Counselors | horror | guardian | Common | 4.0% | 50.0% |
| Skeleton Archers | undead | gunner | Common | 3.7% | 45.5% |
| The Drifter | west | stalker | Mythic | 3.7% | 54.5% |
| Ravager Brood | bug | brawler | Common | 3.3% | 30.0% |
| Burrow Lurker | bug | stalker | Uncommon | 3.3% | 50.0% |
| Wraith | undead | stalker | Uncommon | 3.3% | 50.0% |
| Hothead Pitcher | ball | brawler | Common | 3.3% | 50.0% |
| The Priest | horror | mystic | Uncommon | 3.3% | 70.0% |
| Redshirts | space | guardian | Common | 3.3% | 30.0% |
| The Scientist | kaiju | mystic | Uncommon | 3.0% | 44.4% |
| Acid Spitters | bug | gunner | Common | 2.7% | 12.5% |
| Nurse Bee | bug | medic | Uncommon | 2.7% | 37.5% |
| Zombie Mob | undead | brawler | Common | 2.7% | 25.0% |
| Shellback Beetles | bug | guardian | Common | 2.3% | 14.3% |
| The Telepath | space | mystic | Uncommon | 2.3% | 85.7% |
| The Muscle | heist | guardian | Common | 2.0% | 50.0% |
| Creepy Kids | horror | stalker | Common | 2.0% | 100.0% |
| Getaway Driver | heist | stalker | Common | 1.7% | 20.0% |
| Space Smuggler | space | stalker | Uncommon | 1.7% | 80.0% |
| Outlaw Gang | west | brawler | Common | 1.3% | 50.0% |
| Repair Bots | space | medic | Common | 1.3% | 75.0% |
| Vampire Bat | undead | stalker | Common | 1.0% | 33.3% |
| Bounty Hunter | west | stalker | Uncommon | 1.0% | 66.7% |
| Prospector | west | mystic | Uncommon | 1.0% | 33.3% |
| Deputy | west | guardian | Common | 0.3% | 100.0% |
| Saloon Doc | west | medic | Common | 0.3% | 100.0% |
| The Babysitter | horror | medic | Common | 0.3% | 0.0% |
| Hotshot Pilot | space | gunner | Common | 0.3% | 0.0% |
| TV Reporter | kaiju | medic | Common | 0.3% | 100.0% |

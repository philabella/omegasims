# Balance lab: fix17.html, expert bot, 300 paired runs per config, enemies x1, tune {"rvPivotUniq":1}

Baseline win 30.0%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:ball+heist | 42.3 | +12.3 | 3.3 | 3.2 | 8.5 | 69.7 |
| pair:west+army | 34.0 | +4.0 | 1.1 | 2.8 | 8.1 | 50.7 |
| pair:army+undead | 29.7 | -0.3 | -0.1 | 3.0 | 8.3 | 56.3 |
| bait:ball+heist | 23.3 | -6.7 | -2.0 | 2.9 | 7.9 | 37.3 |
| bait:west+army | 19.7 | -10.3 | -3.1 | 2.9 | 7.8 | 26.3 |
| bait:army+undead | 19.7 | -10.3 | -3.0 | 3.1 | 7.8 | 32.0 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 35.7% | 39.3% |
| Field Medic | army | medic | Rare | 35.0% | 30.5% |
| Head Coach | ball | mystic | Rare | 35.0% | 37.1% |
| Forward Observer | army | guardian | Epic | 30.7% | 32.6% |
| Inside Man | heist | guardian | Epic | 20.3% | 34.4% |
| Giant Mecha | kaiju | guardian | Epic | 20.3% | 29.5% |
| Dodgeball Team | ball | guardian | Common | 19.3% | 29.3% |
| The Fixer | heist | medic | Rare | 18.7% | 35.7% |
| Rifle Squad | army | gunner | Common | 18.0% | 27.8% |
| Star Quarterback | ball | stalker | Mythic | 16.3% | 69.4% |
| Cheer Squad | ball | medic | Common | 15.0% | 24.4% |
| Water Boy | ball | medic | Uncommon | 14.3% | 44.2% |
| The Brute | horror | guardian | Epic | 14.3% | 34.9% |
| The Final Girl | horror | gunner | Rare | 13.7% | 26.8% |
| Ammo Mule | army | brawler | Uncommon | 13.3% | 32.5% |
| Point Guard | ball | gunner | Uncommon | 12.7% | 42.1% |
| Radio Operator | army | mystic | Uncommon | 12.3% | 32.4% |
| Lookouts | heist | gunner | Common | 12.0% | 30.6% |
| Giant Moth | kaiju | mystic | Rare | 11.7% | 11.4% |
| Emperor Scorpion | bug | brawler | Epic | 11.0% | 24.2% |
| Gunnery Sergeant | army | gunner | Mythic | 10.3% | 67.7% |
| Bonesetter | undead | medic | Epic | 10.3% | 25.8% |
| Brood Queen | bug | mystic | Rare | 10.0% | 33.3% |
| The Mastermind | heist | gunner | Mythic | 10.0% | 60.0% |
| The Sheriff | west | guardian | Epic | 9.0% | 40.7% |
| Grave Golem | undead | guardian | Rare | 8.3% | 24.0% |
| The Hacker | heist | mystic | Uncommon | 8.0% | 45.8% |
| Safecracker | heist | brawler | Uncommon | 7.7% | 43.5% |
| Star Knight | space | guardian | Epic | 7.7% | 21.7% |
| Riot Shield | army | guardian | Common | 7.3% | 31.8% |
| Camp Counselors | horror | guardian | Common | 7.3% | 22.7% |
| The Gunslinger | west | gunner | Rare | 6.3% | 31.6% |
| Creepy Kids | horror | stalker | Common | 6.0% | 22.2% |
| Starship Captain | space | brawler | Rare | 6.0% | 16.7% |
| Sky Screamers | kaiju | gunner | Common | 5.7% | 0.0% |
| Baby Kaiju | kaiju | brawler | Common | 5.7% | 11.8% |
| Necromancer | undead | mystic | Rare | 5.3% | 12.5% |
| The Leviathan | kaiju | brawler | Mythic | 5.3% | 68.8% |
| The Hive Mind | bug | mystic | Mythic | 4.7% | 64.3% |
| The Dream Stalker | horror | mystic | Mythic | 4.3% | 69.2% |
| Spotter | army | stalker | Common | 4.0% | 41.7% |
| Hothead Pitcher | ball | brawler | Common | 4.0% | 33.3% |
| Chainsaw Maniac | horror | brawler | Uncommon | 3.3% | 40.0% |
| Ravager Brood | bug | brawler | Common | 3.0% | 33.3% |
| Zombie Mob | undead | brawler | Common | 3.0% | 22.2% |
| Redshirts | space | guardian | Common | 3.0% | 0.0% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 3.0% | 22.2% |
| Burrow Lurker | bug | stalker | Uncommon | 2.7% | 50.0% |
| Bone Dragon | undead | brawler | Mythic | 2.7% | 62.5% |
| The Drifter | west | stalker | Mythic | 2.7% | 62.5% |
| The Dark Lord | space | mystic | Mythic | 2.7% | 62.5% |
| The Scientist | kaiju | mystic | Uncommon | 2.7% | 12.5% |
| Getaway Driver | heist | stalker | Common | 2.0% | 50.0% |
| Shellback Beetles | bug | guardian | Common | 1.7% | 60.0% |
| Nurse Bee | bug | medic | Uncommon | 1.7% | 20.0% |
| Outlaw Gang | west | brawler | Common | 1.7% | 20.0% |
| Prospector | west | mystic | Uncommon | 1.7% | 40.0% |
| The Priest | horror | mystic | Uncommon | 1.7% | 40.0% |
| Repair Bots | space | medic | Common | 1.7% | 0.0% |
| Acid Spitters | bug | gunner | Common | 1.3% | 50.0% |
| Wraith | undead | stalker | Uncommon | 1.3% | 0.0% |
| The Muscle | heist | guardian | Common | 1.3% | 0.0% |
| Bounty Hunter | west | stalker | Uncommon | 1.3% | 25.0% |
| Space Smuggler | space | stalker | Uncommon | 1.3% | 0.0% |
| Skeleton Archers | undead | gunner | Common | 1.0% | 33.3% |
| The Telepath | space | mystic | Uncommon | 1.0% | 66.7% |
| The Babysitter | horror | medic | Common | 0.7% | 0.0% |
| Hotshot Pilot | space | gunner | Common | 0.3% | 0.0% |
| TV Reporter | kaiju | medic | Common | 0.3% | 0.0% |
| Vampire Bat | undead | stalker | Common | 0.0% | - |
| Deputy | west | guardian | Common | 0.0% | - |
| Saloon Doc | west | medic | Common | 0.0% | - |

# Balance lab: f14.html, expert bot, 300 paired runs per config, enemies x1, tune {"rvPivotN":2,"rvPivotSpread":1,"rvEchoM":1}

Baseline win 43.7%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:ball+heist | 56.3 | +12.7 | 3.5 | 3.7 | 8.7 | 80.7 |
| pair:west+army | 54.3 | +10.7 | 2.9 | 3.4 | 8.6 | 68.0 |
| pair:army+undead | 49.7 | +6.0 | 1.5 | 3.4 | 8.6 | 67.3 |
| bait:ball+heist | 37.0 | -6.7 | -1.9 | 3.6 | 8.2 | 43.3 |
| bait:army+undead | 36.7 | -7.0 | -1.8 | 3.3 | 8.1 | 36.7 |
| bait:west+army | 35.0 | -8.7 | -2.3 | 3.4 | 8.1 | 36.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Forward Observer | army | guardian | Epic | 39.0% | 47.0% |
| Team Mascot | ball | guardian | Epic | 37.0% | 48.6% |
| Field Medic | army | medic | Rare | 35.7% | 48.6% |
| Head Coach | ball | mystic | Rare | 31.3% | 47.9% |
| Giant Mecha | kaiju | guardian | Epic | 21.0% | 42.9% |
| Rifle Squad | army | gunner | Common | 20.7% | 46.8% |
| Star Quarterback | ball | stalker | Mythic | 18.7% | 64.3% |
| Gunnery Sergeant | army | gunner | Mythic | 17.7% | 73.6% |
| Inside Man | heist | guardian | Epic | 17.3% | 36.5% |
| The Fixer | heist | medic | Rare | 16.3% | 46.9% |
| Point Guard | ball | gunner | Uncommon | 15.3% | 45.7% |
| Radio Operator | army | mystic | Uncommon | 14.3% | 60.5% |
| Giant Moth | kaiju | mystic | Rare | 14.3% | 37.2% |
| Ammo Mule | army | brawler | Uncommon | 14.0% | 54.8% |
| Dodgeball Team | ball | guardian | Common | 13.7% | 39.0% |
| Bonesetter | undead | medic | Epic | 13.0% | 41.0% |
| Cheer Squad | ball | medic | Common | 12.3% | 27.0% |
| Water Boy | ball | medic | Uncommon | 12.3% | 59.5% |
| Necromancer | undead | mystic | Rare | 11.7% | 42.9% |
| The Brute | horror | guardian | Epic | 11.7% | 45.7% |
| Emperor Scorpion | bug | brawler | Epic | 11.3% | 26.5% |
| Grave Golem | undead | guardian | Rare | 11.3% | 47.1% |
| Star Knight | space | guardian | Epic | 10.3% | 48.4% |
| The Mastermind | heist | gunner | Mythic | 9.7% | 58.6% |
| Riot Shield | army | guardian | Common | 9.3% | 67.9% |
| The Sheriff | west | guardian | Epic | 9.0% | 48.1% |
| The Gunslinger | west | gunner | Rare | 8.0% | 37.5% |
| The Final Girl | horror | gunner | Rare | 8.0% | 45.8% |
| Lookouts | heist | gunner | Common | 7.7% | 26.1% |
| Brood Queen | bug | mystic | Rare | 7.3% | 40.9% |
| Bone Dragon | undead | brawler | Mythic | 7.0% | 52.4% |
| Starship Captain | space | brawler | Rare | 6.7% | 60.0% |
| Safecracker | heist | brawler | Uncommon | 6.3% | 36.8% |
| The Leviathan | kaiju | brawler | Mythic | 5.7% | 58.8% |
| Baby Kaiju | kaiju | brawler | Common | 5.3% | 31.3% |
| The Hacker | heist | mystic | Uncommon | 5.0% | 46.7% |
| Defense Force Tanks | kaiju | gunner | Common | 5.0% | 26.7% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 5.0% | 33.3% |
| Chainsaw Maniac | horror | brawler | Uncommon | 4.3% | 53.8% |
| Commando | army | stalker | Common | 4.0% | 33.3% |
| The Drifter | west | stalker | Mythic | 4.0% | 66.7% |
| Camp Counselors | horror | guardian | Common | 4.0% | 33.3% |
| Zombie Mob | undead | brawler | Common | 3.7% | 36.4% |
| Wraith | undead | stalker | Uncommon | 3.7% | 36.4% |
| The Dream Stalker | horror | mystic | Mythic | 3.7% | 72.7% |
| The Hive Mind | bug | mystic | Mythic | 3.3% | 20.0% |
| Redshirts | space | guardian | Common | 3.3% | 50.0% |
| Hothead Pitcher | ball | brawler | Common | 3.0% | 44.4% |
| Creepy Kids | horror | stalker | Common | 3.0% | 33.3% |
| The Scientist | kaiju | mystic | Uncommon | 3.0% | 33.3% |
| Skeleton Archers | undead | gunner | Common | 2.7% | 62.5% |
| The Muscle | heist | guardian | Common | 2.7% | 12.5% |
| Outlaw Gang | west | brawler | Common | 2.7% | 37.5% |
| Repair Bots | space | medic | Common | 2.7% | 25.0% |
| Shellback Beetles | bug | guardian | Common | 2.3% | 14.3% |
| Space Smuggler | space | stalker | Uncommon | 2.3% | 57.1% |
| The Dark Lord | space | mystic | Mythic | 2.3% | 100.0% |
| Ravager Brood | bug | brawler | Common | 2.0% | 33.3% |
| Acid Spitters | bug | gunner | Common | 2.0% | 16.7% |
| The Priest | horror | mystic | Uncommon | 2.0% | 83.3% |
| Burrow Lurker | bug | stalker | Uncommon | 1.7% | 40.0% |
| Nurse Bee | bug | medic | Uncommon | 1.7% | 20.0% |
| Prospector | west | mystic | Uncommon | 1.7% | 40.0% |
| The Telepath | space | mystic | Uncommon | 1.7% | 40.0% |
| Getaway Driver | heist | stalker | Common | 1.3% | 0.0% |
| Bounty Hunter | west | stalker | Uncommon | 1.0% | 66.7% |
| Deputy | west | guardian | Common | 0.7% | 100.0% |
| TV Reporter | kaiju | medic | Common | 0.7% | 50.0% |
| Vampire Bat | undead | stalker | Common | 0.3% | 0.0% |
| Saloon Doc | west | medic | Common | 0.3% | 0.0% |
| The Babysitter | horror | medic | Common | 0.3% | 100.0% |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |

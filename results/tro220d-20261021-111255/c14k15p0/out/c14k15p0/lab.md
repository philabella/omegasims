# Balance lab: df14.html, expert bot, 300 paired runs per config, enemies x1, tune {"dfK":1.5}

Baseline win 41.0%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:heist+west | 29.0 | -12.0 | -3.3 | 3.5 | 8.2 | 15.7 |
| pair:army+west | 26.3 | -14.7 | -3.7 | 3.8 | 8.1 | 13.7 |
| pair:bug+west | 23.0 | -18.0 | -4.7 | 3.4 | 8.4 | 14.3 |
| pair:army+horror | 18.3 | -22.7 | -6.1 | 3.8 | 7.9 | 12.7 |
| pair:undead+west | 18.0 | -23.0 | -6.2 | 3.8 | 8.1 | 13.3 |
| pair:army+heist | 17.0 | -24.0 | -6.5 | 3.4 | 8.1 | 11.3 |
| pair:ball+west | 15.3 | -25.7 | -6.8 | 3.5 | 8.1 | 10.0 |
| pair:ball+heist | 14.0 | -27.0 | -7.1 | 3.5 | 8.2 | 11.0 |
| pair:army+bug | 13.7 | -27.3 | -7.2 | 3.9 | 8.2 | 14.0 |
| pair:army+undead | 12.0 | -29.0 | -7.7 | 3.4 | 8.1 | 7.7 |
| pair:bug+undead | 11.3 | -29.7 | -8.2 | 3.4 | 8.3 | 11.0 |
| pair:army+ball | 10.7 | -30.3 | -8.0 | 3.4 | 8.1 | 9.7 |
| pair:undead+heist | 10.0 | -31.0 | -8.4 | 3.5 | 8.2 | 8.0 |
| pair:ball+horror | 9.7 | -31.3 | -8.5 | 3.1 | 7.8 | 6.3 |
| pair:undead+horror | 9.3 | -31.7 | -8.4 | 3.7 | 8.0 | 7.7 |
| pair:bug+horror | 8.7 | -32.3 | -8.9 | 2.8 | 7.9 | 9.7 |
| pair:bug+ball | 8.3 | -32.7 | -8.7 | 3.5 | 8.1 | 9.0 |
| pair:bug+heist | 5.3 | -35.7 | -9.3 | 2.1 | 8.1 | 9.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 44.3% | 44.4% |
| Inside Man | heist | guardian | Epic | 42.0% | 39.7% |
| Forward Observer | army | guardian | Epic | 40.7% | 33.6% |
| Head Coach | ball | mystic | Rare | 29.0% | 42.5% |
| The Brute | horror | guardian | Epic | 27.3% | 30.5% |
| Giant Mecha | kaiju | guardian | Epic | 25.3% | 31.6% |
| Bonesetter | undead | medic | Epic | 23.3% | 32.9% |
| Star Quarterback | ball | stalker | Mythic | 22.3% | 73.1% |
| Emperor Scorpion | bug | brawler | Epic | 21.0% | 33.3% |
| Field Medic | army | medic | Rare | 20.3% | 24.6% |
| The Sheriff | west | guardian | Epic | 20.3% | 26.2% |
| The Fixer | heist | medic | Rare | 20.0% | 43.3% |
| The Mastermind | heist | gunner | Mythic | 19.3% | 65.5% |
| Star Knight | space | guardian | Epic | 16.3% | 30.6% |
| Dodgeball Team | ball | guardian | Common | 15.7% | 59.6% |
| Gunnery Sergeant | army | gunner | Mythic | 14.3% | 60.5% |
| Water Boy | ball | medic | Uncommon | 13.7% | 65.9% |
| Cheer Squad | ball | medic | Common | 12.3% | 48.6% |
| Point Guard | ball | gunner | Uncommon | 12.0% | 66.7% |
| The Hive Mind | bug | mystic | Mythic | 10.3% | 48.4% |
| Bone Dragon | undead | brawler | Mythic | 10.3% | 64.5% |
| The Dark Lord | space | mystic | Mythic | 10.3% | 45.2% |
| The Leviathan | kaiju | brawler | Mythic | 9.7% | 58.6% |
| The Drifter | west | stalker | Mythic | 8.3% | 52.0% |
| Safecracker | heist | brawler | Uncommon | 7.7% | 65.2% |
| The Hacker | heist | mystic | Uncommon | 7.7% | 69.6% |
| The Final Girl | horror | gunner | Rare | 7.7% | 39.1% |
| Lookouts | heist | gunner | Common | 7.3% | 63.6% |
| Giant Moth | kaiju | mystic | Rare | 7.3% | 40.9% |
| The Dream Stalker | horror | mystic | Mythic | 7.0% | 71.4% |
| Grave Golem | undead | guardian | Rare | 6.7% | 30.0% |
| The Gunslinger | west | gunner | Rare | 6.0% | 50.0% |
| Brood Queen | bug | mystic | Rare | 5.7% | 29.4% |
| Rifle Squad | army | gunner | Common | 5.3% | 31.3% |
| Necromancer | undead | mystic | Rare | 5.0% | 46.7% |
| The Muscle | heist | guardian | Common | 5.0% | 80.0% |
| Radio Operator | army | mystic | Uncommon | 4.7% | 50.0% |
| Ammo Mule | army | brawler | Uncommon | 4.3% | 53.8% |
| Starship Captain | space | brawler | Rare | 4.3% | 38.5% |
| Getaway Driver | heist | stalker | Common | 4.0% | 66.7% |
| Hothead Pitcher | ball | brawler | Common | 3.7% | 81.8% |
| Camp Counselors | horror | guardian | Common | 3.0% | 33.3% |
| Ravager Brood | bug | brawler | Common | 2.7% | 37.5% |
| Riot Shield | army | guardian | Common | 2.3% | 85.7% |
| Burrow Lurker | bug | stalker | Uncommon | 2.3% | 42.9% |
| Creepy Kids | horror | stalker | Common | 2.3% | 28.6% |
| Defense Force Tanks | kaiju | gunner | Common | 2.3% | 14.3% |
| Baby Kaiju | kaiju | brawler | Common | 2.3% | 28.6% |
| The Scientist | kaiju | mystic | Uncommon | 2.3% | 14.3% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 2.3% | 42.9% |
| Nurse Bee | bug | medic | Uncommon | 2.0% | 33.3% |
| Skeleton Archers | undead | gunner | Common | 2.0% | 33.3% |
| Zombie Mob | undead | brawler | Common | 2.0% | 33.3% |
| Commando | army | stalker | Common | 1.7% | 80.0% |
| Shellback Beetles | bug | guardian | Common | 1.7% | 20.0% |
| Acid Spitters | bug | gunner | Common | 1.3% | 25.0% |
| The Priest | horror | mystic | Uncommon | 1.3% | 50.0% |
| Wraith | undead | stalker | Uncommon | 1.0% | 66.7% |
| Redshirts | space | guardian | Common | 1.0% | 0.0% |
| Space Smuggler | space | stalker | Uncommon | 1.0% | 0.0% |
| Vampire Bat | undead | stalker | Common | 0.7% | 100.0% |
| Chainsaw Maniac | horror | brawler | Uncommon | 0.7% | 100.0% |
| TV Reporter | kaiju | medic | Common | 0.7% | 0.0% |
| Outlaw Gang | west | brawler | Common | 0.3% | 0.0% |
| Deputy | west | guardian | Common | 0.3% | 100.0% |
| Repair Bots | space | medic | Common | 0.3% | 0.0% |
| The Telepath | space | mystic | Uncommon | 0.3% | 0.0% |
| Saloon Doc | west | medic | Common | 0.0% | - |
| Bounty Hunter | west | stalker | Uncommon | 0.0% | - |
| Prospector | west | mystic | Uncommon | 0.0% | - |
| The Babysitter | horror | medic | Common | 0.0% | - |
| Hotshot Pilot | space | gunner | Common | 0.0% | - |

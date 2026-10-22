# Balance lab: fix17.html, expert bot, 300 paired runs per config, enemies x1, tune {"rvPivotUniq":0}

Baseline win 28.7%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:ball+heist | 43.7 | +15.0 | 4.0 | 3.2 | 8.5 | 69.7 |
| pair:west+army | 33.3 | +4.7 | 1.3 | 2.8 | 8.1 | 50.3 |
| pair:army+undead | 29.7 | +1.0 | 0.3 | 3.1 | 8.3 | 55.0 |
| bait:ball+heist | 22.7 | -6.0 | -1.8 | 3.0 | 7.9 | 37.0 |
| bait:west+army | 20.0 | -8.7 | -2.6 | 3.0 | 7.8 | 27.3 |
| bait:army+undead | 19.3 | -9.3 | -2.8 | 3.0 | 7.7 | 31.7 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 36.3% | 35.8% |
| Head Coach | ball | mystic | Rare | 34.3% | 35.9% |
| Field Medic | army | medic | Rare | 33.7% | 27.7% |
| Forward Observer | army | guardian | Epic | 30.7% | 29.3% |
| Inside Man | heist | guardian | Epic | 21.0% | 30.2% |
| Dodgeball Team | ball | guardian | Common | 20.3% | 27.9% |
| Giant Mecha | kaiju | guardian | Epic | 20.0% | 28.3% |
| Rifle Squad | army | gunner | Common | 19.3% | 27.6% |
| The Fixer | heist | medic | Rare | 19.3% | 29.3% |
| Star Quarterback | ball | stalker | Mythic | 15.7% | 66.0% |
| Cheer Squad | ball | medic | Common | 15.3% | 23.9% |
| Water Boy | ball | medic | Uncommon | 15.3% | 37.0% |
| Ammo Mule | army | brawler | Uncommon | 15.0% | 35.6% |
| Point Guard | ball | gunner | Uncommon | 14.7% | 34.1% |
| The Brute | horror | guardian | Epic | 14.3% | 34.9% |
| The Final Girl | horror | gunner | Rare | 13.0% | 28.2% |
| Radio Operator | army | mystic | Uncommon | 12.7% | 26.3% |
| Emperor Scorpion | bug | brawler | Epic | 11.0% | 18.2% |
| Lookouts | heist | gunner | Common | 10.7% | 25.0% |
| Gunnery Sergeant | army | gunner | Mythic | 10.3% | 58.1% |
| Bonesetter | undead | medic | Epic | 10.3% | 25.8% |
| Giant Moth | kaiju | mystic | Rare | 10.3% | 6.5% |
| Brood Queen | bug | mystic | Rare | 9.7% | 31.0% |
| The Mastermind | heist | gunner | Mythic | 9.0% | 63.0% |
| The Sheriff | west | guardian | Epic | 9.0% | 40.7% |
| Grave Golem | undead | guardian | Rare | 8.7% | 26.9% |
| Safecracker | heist | brawler | Uncommon | 8.3% | 48.0% |
| The Hacker | heist | mystic | Uncommon | 7.3% | 36.4% |
| Camp Counselors | horror | guardian | Common | 7.3% | 22.7% |
| Star Knight | space | guardian | Epic | 7.3% | 22.7% |
| Riot Shield | army | guardian | Common | 6.3% | 31.6% |
| The Gunslinger | west | gunner | Rare | 6.3% | 31.6% |
| Baby Kaiju | kaiju | brawler | Common | 6.3% | 10.5% |
| Starship Captain | space | brawler | Rare | 6.0% | 22.2% |
| Necromancer | undead | mystic | Rare | 5.7% | 17.6% |
| The Hive Mind | bug | mystic | Mythic | 5.3% | 43.8% |
| Creepy Kids | horror | stalker | Common | 5.3% | 25.0% |
| The Leviathan | kaiju | brawler | Mythic | 5.3% | 62.5% |
| Sky Screamers | kaiju | gunner | Common | 5.0% | 0.0% |
| The Dream Stalker | horror | mystic | Mythic | 4.3% | 76.9% |
| Hothead Pitcher | ball | brawler | Common | 4.0% | 41.7% |
| Spotter | army | stalker | Common | 3.3% | 40.0% |
| Ravager Brood | bug | brawler | Common | 3.3% | 30.0% |
| Chainsaw Maniac | horror | brawler | Uncommon | 3.3% | 40.0% |
| Zombie Mob | undead | brawler | Common | 3.0% | 11.1% |
| Bone Dragon | undead | brawler | Mythic | 3.0% | 66.7% |
| Redshirts | space | guardian | Common | 3.0% | 0.0% |
| The Scientist | kaiju | mystic | Uncommon | 3.0% | 11.1% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 3.0% | 11.1% |
| Burrow Lurker | bug | stalker | Uncommon | 2.7% | 37.5% |
| Getaway Driver | heist | stalker | Common | 2.7% | 25.0% |
| The Drifter | west | stalker | Mythic | 2.7% | 62.5% |
| The Dark Lord | space | mystic | Mythic | 2.7% | 75.0% |
| The Muscle | heist | guardian | Common | 2.0% | 33.3% |
| The Priest | horror | mystic | Uncommon | 2.0% | 50.0% |
| Nurse Bee | bug | medic | Uncommon | 1.7% | 0.0% |
| Skeleton Archers | undead | gunner | Common | 1.7% | 20.0% |
| Prospector | west | mystic | Uncommon | 1.7% | 60.0% |
| Repair Bots | space | medic | Common | 1.7% | 0.0% |
| Space Smuggler | space | stalker | Uncommon | 1.7% | 20.0% |
| Shellback Beetles | bug | guardian | Common | 1.3% | 50.0% |
| Acid Spitters | bug | gunner | Common | 1.0% | 33.3% |
| Wraith | undead | stalker | Uncommon | 1.0% | 0.0% |
| Outlaw Gang | west | brawler | Common | 1.0% | 33.3% |
| Bounty Hunter | west | stalker | Uncommon | 1.0% | 33.3% |
| The Telepath | space | mystic | Uncommon | 1.0% | 66.7% |
| The Babysitter | horror | medic | Common | 0.7% | 0.0% |
| Deputy | west | guardian | Common | 0.3% | 0.0% |
| Saloon Doc | west | medic | Common | 0.3% | 0.0% |
| Hotshot Pilot | space | gunner | Common | 0.3% | 0.0% |
| TV Reporter | kaiju | medic | Common | 0.3% | 0.0% |
| Vampire Bat | undead | stalker | Common | 0.0% | - |

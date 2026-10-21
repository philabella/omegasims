# Balance lab: f17.html, expert bot, 300 paired runs per config, enemies x1, tune {"rvPivotN":2,"rvPivotSpread":1,"rvEchoM":1}

Baseline win 15.7%. Delta = config minus baseline on the same seeds (points); |z| >= 2 is a real difference, below that it may be noise.

## custom

| config | win % | delta | z | lives (win) | rank | Mythic % |
|---|---|---|---|---|---|---|
| pair:ball+heist | 28.0 | +12.3 | 3.8 | 3.1 | 8.4 | 66.0 |
| pair:west+army | 19.7 | +4.0 | 1.4 | 2.9 | 8.0 | 47.7 |
| pair:army+undead | 19.3 | +3.7 | 1.3 | 3.0 | 8.1 | 52.0 |
| bait:ball+heist | 16.0 | +0.3 | 0.1 | 3.1 | 7.9 | 37.0 |
| bait:west+army | 12.0 | -3.7 | -1.4 | 3.3 | 7.8 | 29.0 |
| bait:army+undead | 12.0 | -3.7 | -1.4 | 3.4 | 7.6 | 27.0 |

## character use in free play (final board)

| character | genre | trait | rarity | on final board | win when on board |
|---|---|---|---|---|---|
| Team Mascot | ball | guardian | Epic | 37.0% | 18.9% |
| Head Coach | ball | mystic | Rare | 36.3% | 19.3% |
| Forward Observer | army | guardian | Epic | 30.7% | 14.1% |
| Field Medic | army | medic | Rare | 29.7% | 13.5% |
| Dodgeball Team | ball | guardian | Common | 23.0% | 15.9% |
| The Fixer | heist | medic | Rare | 20.7% | 17.7% |
| Inside Man | heist | guardian | Epic | 20.3% | 21.3% |
| Rifle Squad | army | gunner | Common | 17.3% | 17.3% |
| The Brute | horror | guardian | Epic | 17.3% | 9.6% |
| Cheer Squad | ball | medic | Common | 17.0% | 13.7% |
| Giant Mecha | kaiju | guardian | Epic | 16.3% | 22.4% |
| Point Guard | ball | gunner | Uncommon | 15.7% | 17.0% |
| Giant Moth | kaiju | mystic | Rare | 15.3% | 13.0% |
| Ammo Mule | army | brawler | Uncommon | 15.0% | 20.0% |
| Water Boy | ball | medic | Uncommon | 14.7% | 13.6% |
| Emperor Scorpion | bug | brawler | Epic | 12.7% | 7.9% |
| Star Quarterback | ball | stalker | Mythic | 12.3% | 48.6% |
| Lookouts | heist | gunner | Common | 12.3% | 5.4% |
| Bonesetter | undead | medic | Epic | 11.3% | 17.6% |
| The Final Girl | horror | gunner | Rare | 11.3% | 5.9% |
| Gunnery Sergeant | army | gunner | Mythic | 11.0% | 33.3% |
| Brood Queen | bug | mystic | Rare | 11.0% | 9.1% |
| Radio Operator | army | mystic | Uncommon | 10.0% | 20.0% |
| Star Knight | space | guardian | Epic | 10.0% | 20.0% |
| The Sheriff | west | guardian | Epic | 9.0% | 22.2% |
| Grave Golem | undead | guardian | Rare | 8.7% | 15.4% |
| Safecracker | heist | brawler | Uncommon | 8.7% | 11.5% |
| The Hacker | heist | mystic | Uncommon | 8.0% | 20.8% |
| Camp Counselors | horror | guardian | Common | 8.0% | 8.3% |
| Starship Captain | space | brawler | Rare | 8.0% | 29.2% |
| Creepy Kids | horror | stalker | Common | 7.3% | 9.1% |
| The Gunslinger | west | gunner | Rare | 7.0% | 28.6% |
| The Mastermind | heist | gunner | Mythic | 6.7% | 40.0% |
| Necromancer | undead | mystic | Rare | 6.0% | 11.1% |
| Riot Shield | army | guardian | Common | 5.7% | 11.8% |
| Baby Kaiju | kaiju | brawler | Common | 5.3% | 0.0% |
| Hothead Pitcher | ball | brawler | Common | 4.7% | 35.7% |
| Defense Force Tanks | kaiju | gunner | Common | 4.0% | 0.0% |
| Bone Dragon | undead | brawler | Mythic | 3.7% | 27.3% |
| The Priest | horror | mystic | Uncommon | 3.7% | 0.0% |
| The Leviathan | kaiju | brawler | Mythic | 3.7% | 45.5% |
| Commando | army | stalker | Common | 3.3% | 20.0% |
| The Hive Mind | bug | mystic | Mythic | 3.3% | 30.0% |
| Big-Game Hunter | kaiju | stalker | Uncommon | 3.3% | 20.0% |
| Burrow Lurker | bug | stalker | Uncommon | 3.0% | 22.2% |
| The Dream Stalker | horror | mystic | Mythic | 3.0% | 22.2% |
| The Scientist | kaiju | mystic | Uncommon | 3.0% | 11.1% |
| Ravager Brood | bug | brawler | Common | 2.7% | 0.0% |
| Shellback Beetles | bug | guardian | Common | 2.7% | 12.5% |
| Chainsaw Maniac | horror | brawler | Uncommon | 2.7% | 12.5% |
| Space Smuggler | space | stalker | Uncommon | 2.7% | 37.5% |
| Zombie Mob | undead | brawler | Common | 2.3% | 0.0% |
| The Muscle | heist | guardian | Common | 2.3% | 0.0% |
| Redshirts | space | guardian | Common | 2.3% | 14.3% |
| Repair Bots | space | medic | Common | 2.3% | 0.0% |
| The Telepath | space | mystic | Uncommon | 2.3% | 28.6% |
| The Dark Lord | space | mystic | Mythic | 2.3% | 71.4% |
| Getaway Driver | heist | stalker | Common | 2.0% | 0.0% |
| The Drifter | west | stalker | Mythic | 2.0% | 50.0% |
| Nurse Bee | bug | medic | Uncommon | 1.7% | 0.0% |
| Outlaw Gang | west | brawler | Common | 1.7% | 0.0% |
| Acid Spitters | bug | gunner | Common | 1.3% | 0.0% |
| Bounty Hunter | west | stalker | Uncommon | 1.0% | 0.0% |
| Skeleton Archers | undead | gunner | Common | 0.7% | 50.0% |
| Wraith | undead | stalker | Uncommon | 0.7% | 50.0% |
| Saloon Doc | west | medic | Common | 0.7% | 0.0% |
| Deputy | west | guardian | Common | 0.3% | 0.0% |
| Prospector | west | mystic | Uncommon | 0.3% | 0.0% |
| The Babysitter | horror | medic | Common | 0.3% | 0.0% |
| Hotshot Pilot | space | gunner | Common | 0.3% | 0.0% |
| TV Reporter | kaiju | medic | Common | 0.3% | 0.0% |
| Vampire Bat | undead | stalker | Common | 0.0% | - |

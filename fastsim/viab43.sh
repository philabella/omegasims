#!/bin/bash
# re-check after v19.43: smart bot (smart3), Lv0, 200 runs
cd "$(dirname "$0")"; N=200; O=out/viab/viab43.txt; : > $O
G_army="riot rifle commando radio mule fieldmed observer gunny"; G_bug="ravager spitters beetles lurker nurse queen scorpion hivemind"
G_undead="skelarch zombies vampbat wraith gravegolem necro bonesetter bonedragon"; G_ball="dodgeball pitcher cheersquad waterboy pointguard headcoach mascot qb"
G_heist="muscle lookouts driver safecracker hacker fixer insideman mastermind"; G_west="outlaws deputy doc bounty prospector gunslinger sheriff noname"
GEN="army bug undead ball heist west"; ALL=""; for g in $GEN; do v=G_$g; ALL="$ALL ${!v}"; done
q(){ local o=""; for id in $*; do o="$o,\"$id\""; done; echo "${o#,}"; }
for B in out/ev41-lv0.html out/ev43-lv0.html; do
 vrun(){ w=$(node sim.js $N smart --bots bots-smart3.js --build $B --seed 40000 --workers 4 --tune "{\"ban\":[$2]}" 2>&1 | grep -o 'win=[0-9.]*%' | head -1); echo "$(basename $B) $1 $w" >> $O; }
 vrun base ""
 ban=""; for id in $ALL; do [[ " $G_bug " == *" $id "* ]] || ban="$ban $id"; done; vrun mono-bug "$(q $ban)"
 for g in army undead ball heist west; do a=G_$g; ban=""; for id in $ALL; do [[ " $G_bug ${!a} " == *" $id "* ]] || ban="$ban $id"; done; vrun "pair-bug+$g" "$(q $ban)"; done
done
cell(){ w=$(node sim.js $N $3 --bots bots-abuse.js --build out/ev43-lv0.html --seed 40000 --workers 4 --legend $1 --focus $2 2>&1 | grep -o 'win=[0-9.]*%' | head -1); echo "ev43 leg $1 $2 $3 $w" >> $O; }
for l in feeding pheromone brood; do cell $l bug econ50; cell $l bug hoard; done
cell vault heist hoard; cell vault heist curve7; cell sixgun west curve7; cell sixgun west econ50
echo DONE >> $O

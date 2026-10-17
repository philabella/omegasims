#!/bin/bash
# v19.42: Legendary x plan matrix on v19.41 (Lv0, 200 runs a cell) with the fixed hoard plan and the new plans
# (cheap, wide, dc, streak, benchfull, rare7), then the smart bot is rebuilt from it.
cd "$(dirname "$0")"; B=out/ev41-lv0.html; N=200; O=out/legmx2/matrix.txt; : > $O
cell(){ w=$(node sim.js $N $3 --bots bots-abuse.js --build $B --seed 40000 --workers 4 ${1:+--legend $1} ${2:+--focus $2} 2>&1 | grep -o 'win=[0-9.]*%' | head -1); echo "${1:-none} ${2:--} $3 $w" >> $O; }
for p in curve7 econ50 hoard; do cell "" "" $p; done
declare -A SP=([underdog]="losestreak tempo" [ensemble]="wide hoard" [placement]="wide hoard" [crossep]="wide hoard" [plotarmor]="hoard" [dircut]="dc tempo" [spinoff]="cheap hoard" [cult]="cheap hoard" [wallet]="tempo streak" [scout]="rare7 hoard" [indie]="indie3 indie4" [hype]="streak tempo" [extuniv]="euBench benchfull" [blockbuster]="rare7 hoard")
for l in "${!SP[@]}"; do for p in curve7 econ50 ${SP[$l]}; do cell $l "" $p; done; done
declare -A GL=([army]="danger shock fieldhosp" [bug]="brood pheromone feeding" [undead]="graveyard bloodline armydead" [ball]="gameball halftime press" [heist]="insidejob getaway vault" [west]="sixgun wanted quickdraw")
for g in army bug undead ball heist west; do for l in ${GL[$g]}; do for p in curve7 econ50 hoard; do cell $l $g $p; done; done; done
echo DONE >> $O
python3 mksmart.py $O bots-abuse.js bots-smart2.js
# build viability with the smart bot: single-genre (everything else banned), two-genre pairs, and one character banned
G_army="riot rifle commando radio mule fieldmed observer gunny"; G_bug="ravager spitters beetles lurker nurse queen scorpion hivemind"
G_undead="skelarch zombies vampbat wraith gravegolem necro bonesetter bonedragon"; G_ball="dodgeball pitcher cheersquad waterboy pointguard headcoach mascot qb"
G_heist="muscle lookouts driver safecracker hacker fixer insideman mastermind"; G_west="outlaws deputy doc bounty prospector gunslinger sheriff noname"
GEN="army bug undead ball heist west"; ALL=""; for g in $GEN; do v=G_$g; ALL="$ALL ${!v}"; done
V=out/viab/viab.txt; : > $V
vrun(){ w=$(node sim.js $N smart --bots bots-smart2.js --build $B --seed 40000 --workers 4 --tune "{\"ban\":[$2]}" 2>&1 | grep -o 'win=[0-9.]*%' | head -1); echo "$1 $w" >> $V; }
q(){ local o=""; for id in $*; do o="$o,\"$id\""; done; echo "${o#,}"; }
vrun base ""
for g in $GEN; do keep=G_$g; ban=""; for id in $ALL; do [[ " ${!keep} " == *" $id "* ]] || ban="$ban $id"; done; vrun "mono-$g" "$(q $ban)"; done
GA=($GEN); for ((i=0;i<6;i++)); do for ((j=i+1;j<6;j++)); do a=G_${GA[i]}; b=G_${GA[j]}; ban=""; for id in $ALL; do [[ " ${!a} ${!b} " == *" $id "* ]] || ban="$ban $id"; done; vrun "pair-${GA[i]}+${GA[j]}" "$(q $ban)"; done; done
for id in $ALL; do vrun "no-$id" "$(q $id)"; done
echo DONE >> $V

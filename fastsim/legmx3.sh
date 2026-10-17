#!/bin/bash
# pass 2: banking + twist variants for the Legendaries whose own plans lost to econ50
cd "$(dirname "$0")"; B=out/ev41-lv0.html; N=200; O=out/legmx2/matrix.txt
cell(){ w=$(node sim.js $N $3 --bots bots-abuse.js --build $B --seed 40000 --workers 4 ${1:+--legend $1} ${2:+--focus $2} 2>&1 | grep -o 'win=[0-9.]*%' | head -1); echo "${1:-none} ${2:--} $3 $w" >> $O; }
for l in ensemble placement crossep; do cell $l "" wide50; done
for l in spinoff cult; do cell $l "" cheap50; done
cell dircut "" dc40; cell hype "" streak50; cell underdog "" streak50; cell wallet "" streak50
python3 mksmart.py $O bots-abuse.js bots-smart3.js
echo PASS2DONE >> $O

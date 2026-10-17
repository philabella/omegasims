#!/bin/bash
# Train the v19 Lv10 expert + strategy specialists in two lanes of 2 workers each (4 CPUs).
# Restart-safe: evolve.js resumes from runs/<tag>/state.json, and each job only gets its REMAINING minutes
# (summed from history.json), so after a container restart just run both lanes again.
#   setsid nohup ./strat-queue.sh A > runs/queueA.log 2>&1 & disown ; same for B
cd "$(dirname "$0")"
B=../../balance/v19-lv10.html
train(){ # tag minutes extra-args...
  local tag=$1 min=$2; shift 2
  [ -f runs/$tag/.done ] && return
  local left=$(node -e "let u=0;try{u=require('./runs/$tag/history.json').reduce((s,h)=>s+h.sec,0)/60}catch(e){};console.log(Math.max(0,Math.ceil($min-u)))")
  echo "$(date +%T) $tag: $left of $min min left"
  if [ "$left" -gt 0 ]; then node evolve.js --minutes $left --build $B --tag $tag --from runs/v18lv10 "$@" >> runs/$tag.out 2>&1 || { echo "$tag FAILED"; return 1; }; fi
  touch runs/$tag/.done
}
if [ "$1" = A ]; then
  train v19s-econ 30 --fix '{"keepGold":[40,60],"econStart":[1,4],"rollRound":[14,30]}'
  train v19s-rush 30 --opts '{"minRank":7}'
  train v19s-reroll 30 --opts '{"maxRank":4,"maxRankUntil":15}'
  train v19g-heist 20 --opts '{"genres":["heist"]}'
  train v19g-west 20 --opts '{"genres":["west"]}'
  train v19g-ball 20 --opts '{"genres":["ball"]}'
else
  train v19lv10 35
  train v19s-tempo 30 --fix '{"keepGold":0}'
  train v19s-lose 30 --opts '{"sandbag":{"until":5,"minLives":4,"keep":2,"best":true}}' --fix '{"econStart":[1,2]}'
  train v19g-army 20 --opts '{"genres":["army"]}'
  train v19g-bug 20 --opts '{"genres":["bug"]}'
  train v19g-undead 20 --opts '{"genres":["undead"]}'
fi
echo "lane $1 finished $(date +%T)"

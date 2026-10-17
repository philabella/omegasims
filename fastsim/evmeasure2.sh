#!/bin/bash
B=${1:-out/ev41-lv10.html}; N=${2:-400}; cd "$(dirname "$0")"
run(){ node sim.js $N curve7 --build $B --seed 40000 --workers 4 --tune "$1" 2>&1 | head -1 | grep -o 'win=[0-9.]*%'; }
echo "base $(run '{}')"
for eo in craft:snack craft:favor strike:pay strike:wait strike:cut1 cameo:fee cameo:cast reboot:keep reboot:recast review:life review:pr props:pay props:lose insurance:pass insurance:buy; do
  e=${eo%%:*}; o=${eo##*:}; echo "$e $o $(run "{\"evOnly\":\"$e\",\"evForce\":{\"$e\":\"$o\"}}")"; done

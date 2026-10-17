#!/bin/bash
# forced-choice measurement: every special-event slot is EVENT and the bot always takes OPTION (when it can)
B=${1:-out/ev41-lv10.html}; N=${2:-400}; cd "$(dirname "$0")"
run(){ node sim.js $N curve7 --build $B --seed 40000 --workers 4 --tune "$1" 2>&1 | head -1 | grep -o 'win=[0-9.]*%'; }
echo "base $(run '{}')"
for eo in fanmail:cash fanmail:heart craft:snack craft:favor review:life review:pr props:pay props:lose montage:rest montage:train strike:pay strike:wait strike:cut1 cameo:fee cameo:cast cursed:burn cursed:read insurance:pass insurance:buy reboot:keep reboot:recast; do
  e=${eo%%:*}; o=${eo##*:}; echo "$e $o $(run "{\"evOnly\":\"$e\",\"evForce\":{\"$e\":\"$o\"}}")"; done
for k in payday deal reinforce promotion recruit supply; do echo "pick $k $(run "{\"evPickForce\":\"$k\"}")"; done

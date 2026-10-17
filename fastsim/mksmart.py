# bots-smart.js = bots-abuse.js + a "smart" policy that plays like a player who knows the game: it picks the offered
# Legendary that its own past results (the Legendary x play style matrix) say is strongest, then plays that
# Legendary's best plan (e.g. bench-stacking for Extended Universe, few on the board for Indie Darling).
#   python3 mksmart.py matrix.txt bots-abuse.js bots-smart.js
import sys, json, collections
M = collections.defaultdict(dict)
for l in open(sys.argv[1]):
    p = l.split()
    if len(p) == 4 and p[3].startswith('win='): M[p[0]][p[2]] = max(M[p[0]].get(p[2], 0), float(p[3][4:-1]))
val = {l: max(v.values()) for l, v in M.items() if l != 'none'}
plan = {l: max(v, key=v.get) for l, v in M.items() if l != 'none'}
s = open(sys.argv[2]).read()
a = "    tierctl:"
assert s.count(a) == 1
s = s.replace(a, "    smart:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:50,smart:true},\n" + a)
a = "      const v=rand?ch[Math.floor(Math.random()*ch.length)]:(FORCE_LEG||ch[0]);if(v)S.legend=v;continue;}"
assert s.count(a) == 1
s = s.replace(a, "      let v=rand?ch[Math.floor(Math.random()*ch.length)]:(FORCE_LEG||ch[0]);\n"
  "      if(!rand&&POL.smart&&!FORCE_LEG){const opts=ch.concat(S.legend?[S.legend]:[]);v=opts.sort((a,b)=>(LEGV[b]||0)-(LEGV[a]||0))[0];}\n"
  "      if(v){S.legend=v;BOT.legs=(BOT.legs||[]).concat(v);if(POL.smart&&LEGP[v]&&POLICIES[LEGP[v]]){POL=Object.assign({},POLICIES[LEGP[v]],{smart:true});}}continue;}")
a = "  const POLICIES={"
s = s.replace(a, "  const LEGV=" + json.dumps(val) + ",LEGP=" + json.dumps(plan) + ";\n" + a, 1)
a = "    log.subs=BOT.subs;"
s = s.replace(a, "    log.legs=BOT.legs||[];" + a, 1)
s = s.replace("POL=POLICIES[pol||'balanced'];BOT.sold=0;", "POL=POLICIES[pol||'balanced'];BOT.legs=[];BOT.sold=0;", 1)
open(sys.argv[3], 'w').write(s); print('legends', len(val))

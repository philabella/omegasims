#!/usr/bin/env python3
# Instant run win rate from per-round fight win chances (no simulation): a Markov chain over lives.
#   node fastsim/sim.js 400 curve7 --build b.html --seed 40000 > out.txt
#   python3 fastsim/markov.py out.txt [--lives 10] [--loss 2,2,3,3] [--set 28=0.8] [--add 0.05]
# Checked on v19 Lv0 (curve7, 400 runs): predicted 37.1% vs simulated 35.3% (s.e. 2.4).
# Use it for what-ifs on lives, loss costs, boss retries and "this round is X points easier"; confirm with a real sim.
# Assumes fights are independent given the round, ignores the gold/reroll a loss pays and the 10% weaker final-boss
# rematch, and reads the per-round win % of runs that REACHED that round (sim.js prints it).
import re,sys,argparse
ap=argparse.ArgumentParser();ap.add_argument('file');ap.add_argument('--lives',type=int,default=10)
ap.add_argument('--loss',default='2,2,3,3',help='lives lost per act (+1 on a boss)');ap.add_argument('--set',action='append',default=[],help='round=winchance')
ap.add_argument('--add',type=float,default=0,help='add this to every fight win chance');ap.add_argument('--per-act',type=int,default=7)
a=ap.parse_args()
txt=open(a.file).read()
p={int(k):int(v)/100 for k,v in re.findall(r'(\d+):(\d+)%/',txt.split('per round')[1])}
for s in a.set: k,v=s.split('=');p[int(k)]=float(v)
p={k:min(1,max(0,v+a.add)) for k,v in p.items()}
loss=[int(x) for x in a.loss.split(',')];last=max(p);boss={r for r in p if r%a.per_act==0}
dist={a.lives:1.0};dead_at={}
for r in sorted(p):
    c=loss[min(len(loss)-1,(r-1)//a.per_act)]+(1 if r in boss else 0);nd={}
    for L,pr in dist.items():
        if r<last:
            nd[L]=nd.get(L,0)+pr*p[r]
            if L-c>0: nd[L-c]=nd.get(L-c,0)+pr*(1-p[r])
            else: dead_at[r]=dead_at.get(r,0)+pr*(1-p[r])
        else:  # final boss: retried while lives last
            w=0;q=pr;l=L
            while l>0: w+=q*p[r];q*=1-p[r];l-=c
            nd['W']=nd.get('W',0)+w;dead_at[r]=dead_at.get(r,0)+pr-w
    dist=nd
print(f"run win {100*dist.get('W',0):.1f}%  | lost at round: "+' '.join(f"{r}:{100*v:.0f}%" for r,v in sorted(dead_at.items()) if v>=0.005))

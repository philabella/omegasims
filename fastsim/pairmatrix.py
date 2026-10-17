import csv,sys
rows=list(csv.DictReader(open(sys.argv[1])))
G=['army','bug','undead','ball','heist','west','horror','space','kaiju']
A={'army':'Arm','bug':'Swm','undead':'Und','ball':'Spb','heist':'Hst','west':'WW','horror':'Slh','space':'Spc','kaiju':'Kju'}
v={};base=None
for r in rows:
    k=r['key'];w=float(r['win_pct'])
    if k=='baseline':base=w
    elif k.startswith('mono:'):g=k[5:];v[(g,g)]=w
    elif k.startswith('pair:'):a,b=k[5:].split('+');v[(a,b)]=v[(b,a)]=w
    elif k.startswith('without:'):v[('wo',k[8:])]=w
print('baseline (free play):',base)
print('| |'+'|'.join(A[g] for g in G)+'| avg pair |');print('|---'*(len(G)+2)+'|')
for a in G:
    ps=[v[(a,b)] for b in G if b!=a and (a,b) in v]
    print(f'| **{A[a]}** |'+'|'.join((f"**{v[(a,b)]:.0f}**" if a==b else f"{v[(a,b)]:.0f}") if (a,b) in v else '-' for b in G)+f'| {sum(ps)/len(ps):.0f} |')
print();print('without genre (free play minus one genre):',', '.join(f"{A[g]} {v[('wo',g)]:.0f}" for g in G if ('wo',g) in v))
pr=sorted([(v[(a,b)],a,b) for i,a in enumerate(G) for b in G[i+1:] if (a,b) in v])
print('weakest pairs:',', '.join(f"{A[a]}+{A[b]} {w:.0f}" for w,a,b in pr[:6]));print('strongest pairs:',', '.join(f"{A[a]}+{A[b]} {w:.0f}" for w,a,b in pr[-6:][::-1]))

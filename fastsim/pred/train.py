# Battle predictor training (numpy only): a small fully-connected network F -> 64 -> 32 -> 2 (sigmoid) predicting
# [win chance, the bot's fight score 0..1] from the features PRED.feat() records at the start of a practice fight.
#   python3 train.py train.f32 val.f32 out.json [--h1 64 --h2 32 --epochs 14]
# Prints hold-out accuracy against the real simulator; writes the network as JSON for feat.js PRED.load().
import sys, json, time
import numpy as np

args = sys.argv[1:4]
opt = {k.lstrip('-'): v for k, v in zip(sys.argv[4::2], sys.argv[5::2])}
H1, H2, EP = int(opt.get('h1', 64)), int(opt.get('h2', 32)), int(opt.get('epochs', 14))
def load(p):
    m = json.load(open(p + '.json')); F = m['F']
    d = np.fromfile(p, dtype=np.float32).reshape(-1, F + 2)
    return d[:, :F], d[:, F], d[:, F + 1], m
Xt, St, Wt, mt = load(args[0]); Xv, Sv, Wv, mv = load(args[1]); F = Xt.shape[1]
mu = Xt.mean(0); sd = np.maximum(Xt.std(0), 0.05)
Xt = (Xt - mu) / sd; Xv = (Xv - mu) / sd
rng = np.random.default_rng(1)
def init(o, i): return (rng.standard_normal((o, i)) * np.sqrt(2 / i)).astype(np.float32), np.zeros(o, np.float32)
P = [list(init(H1, F)), list(init(H2, H1)), list(init(2, H2))]
M = [[np.zeros_like(w), np.zeros_like(b)] for w, b in P]; V = [[np.zeros_like(w), np.zeros_like(b)] for w, b in P]
sig = lambda z: 1 / (1 + np.exp(-np.clip(z, -30, 30)))
def fwd(X):
    a0 = X; z1 = a0 @ P[0][0].T + P[0][1]; a1 = np.maximum(z1, 0)
    z2 = a1 @ P[1][0].T + P[1][1]; a2 = np.maximum(z2, 0)
    z3 = a2 @ P[2][0].T + P[2][1]; return a0, z1, a1, z2, a2, sig(z3)
def loss(out, s, w):
    e = 1e-6; Y = np.stack([w, s], 1)
    return float(-(Y * np.log(out + e) + (1 - Y) * np.log(1 - out + e)).mean())
def metrics(X, s, w):
    out = fwd(X)[-1]; p, sh = out[:, 0], out[:, 1]
    acc = float(((p > 0.5) == (w > 0.5)).mean())
    # AUC by ranks
    order = np.argsort(p); ranks = np.empty(len(p)); ranks[order] = np.arange(1, len(p) + 1)
    pos = w > 0.5; npos = pos.sum(); nneg = len(p) - npos
    auc = float((ranks[pos].sum() - npos * (npos + 1) / 2) / max(1, npos * nneg))
    return {'loss': round(loss(out, s, w), 4), 'win_acc': round(acc, 4), 'auc': round(auc, 4), 'brier': round(float(((p - w) ** 2).mean()), 4),
            'score_mae': round(float(np.abs(sh - s).mean()), 4), 'score_corr': round(float(np.corrcoef(sh, s)[0, 1]), 4), 'base_win_rate': round(float(w.mean()), 4)}
lr, b1, b2, t = 2e-3, 0.9, 0.999, 0; BS = 1024; N = len(Xt); best = (1e9, None); t0 = time.time()
for ep in range(EP):
    idx = rng.permutation(N)
    for k in range(0, N, BS):
        j = idx[k:k + BS]; X = Xt[j]; Y = np.stack([Wt[j], St[j]], 1)
        a0, z1, a1, z2, a2, out = fwd(X)
        g3 = (out - Y) / len(j)                       # BCE + sigmoid
        gW3 = g3.T @ a2; gb3 = g3.sum(0); g2 = (g3 @ P[2][0]) * (z2 > 0)
        gW2 = g2.T @ a1; gb2 = g2.sum(0); g1 = (g2 @ P[1][0]) * (z1 > 0)
        gW1 = g1.T @ a0; gb1 = g1.sum(0)
        t += 1
        for li, (gw, gb) in enumerate([(gW1, gb1), (gW2, gb2), (gW3, gb3)]):
            for pi, g in enumerate((gw, gb)):
                M[li][pi] = b1 * M[li][pi] + (1 - b1) * g; V[li][pi] = b2 * V[li][pi] + (1 - b2) * g * g
                P[li][pi] -= lr * (M[li][pi] / (1 - b1 ** t)) / (np.sqrt(V[li][pi] / (1 - b2 ** t)) + 1e-8)
    lr *= 0.8
    mv_ = metrics(Xv, Sv, Wv)
    print(f"epoch {ep + 1}: hold-out {mv_}  {time.time() - t0:.0f}s", flush=True)
    if mv_['loss'] < best[0]: best = (mv_['loss'], [[w.copy(), b.copy()] for w, b in P], mv_)
P = best[1]
net = {'F': F, 'h': [H1, H2], 'mu': mu.round(6).tolist(), 'sd': sd.round(6).tolist(),
       'layers': [{'W': w.reshape(-1).round(6).tolist(), 'b': b.round(6).tolist()} for w, b in P],
       'trained_on': {'rows': int(N), 'build': mt['build'], 'policy': mt['policy']}, 'holdout': best[2], 'holdout_rows': int(len(Xv))}
json.dump(net, open(args[2], 'w'))
print('saved', args[2], 'hold-out', best[2])

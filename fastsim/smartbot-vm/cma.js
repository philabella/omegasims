// sep-CMA-ES (Ros & Hansen 2008): CMA-ES with a diagonal covariance, so it scales to the ~150-300 policy weights.
// Works in the policy's z-space [0,1]^D (lib.toZ / toParams). Maximizes. Ask/tell:
//   const cma = new SepCMA({ mean: z0, sigma: 0.08, lambda: 12 }); const xs = cma.ask(); ... cma.tell(xs, fits);
// Out-of-range samples are reflected back into [0,1] and the update uses the reflected point (repair by reflection).
// toJSON() / SepCMA.from(obj) save and resume the whole state.
'use strict';
function randn() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
const reflect = x => { x = ((x % 2) + 2) % 2; return x > 1 ? 2 - x : x; };

class SepCMA {
  constructor({ mean, sigma = 0.08, lambda, C, pc, ps, gen = 0 }) {
    const D = this.D = mean.length;
    this.m = mean.slice(); this.sigma = sigma; this.gen = gen;
    this.lambda = lambda || 4 + Math.floor(3 * Math.log(D));
    this.mu = Math.floor(this.lambda / 2);
    const w = Array.from({ length: this.mu }, (_, i) => Math.log(this.mu + 0.5) - Math.log(i + 1)), ws = w.reduce((a, b) => a + b, 0);
    this.w = w.map(x => x / ws); this.mueff = 1 / this.w.reduce((a, b) => a + b * b, 0);
    const me = this.mueff;
    this.cs = (me + 2) / (D + me + 5);
    this.ds = 1 + 2 * Math.max(0, Math.sqrt((me - 1) / (D + 1)) - 1) + this.cs;
    this.cc = (4 + me / D) / (D + 4 + 2 * me / D);
    const c1 = 2 / ((D + 1.3) ** 2 + me), cmu = Math.min(1 - c1, 2 * (me - 2 + 1 / me) / ((D + 2) ** 2 + me));
    const k = (D + 2) / 3; // sep-CMA: the diagonal learns (D+2)/3 times faster than the full matrix would
    this.c1 = Math.min(0.5, c1 * k); this.cmu = Math.min(1 - this.c1, cmu * k);
    this.chiN = Math.sqrt(D) * (1 - 1 / (4 * D) + 1 / (21 * D * D));
    this.C = C ? C.slice() : new Array(D).fill(1); this.pc = pc ? pc.slice() : new Array(D).fill(0); this.ps = ps ? ps.slice() : new Array(D).fill(0);
  }
  // lambda new points in [0,1]^D; fix(z) may pin/clamp parameters (evolve --fix) and returns the point actually used
  ask(fix = z => z) {
    return Array.from({ length: this.lambda }, () => fix(this.m.map((m, i) => reflect(m + this.sigma * Math.sqrt(this.C[i]) * randn()))));
  }
  tell(xs, fits) {
    const D = this.D, idx = fits.map((f, i) => i).sort((a, b) => fits[b] - fits[a]).slice(0, this.mu);
    const ys = idx.map(i => xs[i].map((x, j) => (x - this.m[j]) / this.sigma));
    const yw = new Array(D).fill(0); ys.forEach((y, r) => y.forEach((v, j) => { yw[j] += this.w[r] * v; }));
    this.m = this.m.map((m, j) => Math.min(1, Math.max(0, m + this.sigma * yw[j])));
    const a = Math.sqrt(this.cs * (2 - this.cs) * this.mueff);
    this.ps = this.ps.map((p, j) => (1 - this.cs) * p + a * yw[j] / Math.sqrt(this.C[j]));
    const psn = Math.sqrt(this.ps.reduce((s, p) => s + p * p, 0));
    const hsig = psn / Math.sqrt(1 - (1 - this.cs) ** (2 * (this.gen + 1))) / this.chiN < 1.4 + 2 / (D + 1) ? 1 : 0;
    const b = Math.sqrt(this.cc * (2 - this.cc) * this.mueff);
    this.pc = this.pc.map((p, j) => (1 - this.cc) * p + hsig * b * yw[j]);
    this.C = this.C.map((c, j) => {
      const rankMu = ys.reduce((s, y, r) => s + this.w[r] * y[j] * y[j], 0);
      return Math.max(1e-8, (1 - this.c1 - this.cmu) * c + this.c1 * (this.pc[j] ** 2 + (1 - hsig) * this.cc * (2 - this.cc) * c) + this.cmu * rankMu);
    });
    this.sigma = Math.min(0.5, Math.max(1e-4, this.sigma * Math.exp((this.cs / this.ds) * (psn / this.chiN - 1))));
    this.gen++;
  }
  // the spread actually used per coordinate (sigma x sqrt(C)), averaged: comparable to the (mu+lambda) ES sigma
  step() { return this.sigma * this.C.reduce((s, c) => s + Math.sqrt(c), 0) / this.D; }
  toJSON() { return { mean: this.m, sigma: this.sigma, lambda: this.lambda, C: this.C, pc: this.pc, ps: this.ps, gen: this.gen }; }
  static from(o) { return new SepCMA(o); }
}
module.exports = { SepCMA };

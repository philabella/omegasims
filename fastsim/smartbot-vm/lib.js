// Shared Node-side helpers: load a Tropebrawl build into headless Chromium and inject the bot.
// fastsim copy: `--engine vm` (or SB_ENGINE=vm) runs every page in the fastsim vm engine (../engine.js) on worker
// threads instead of Chromium renderers; everything else (core.js, evolve/report/trace) is unchanged.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ENGINE = (() => { const i = process.argv.indexOf('--engine'); return String(i >= 0 ? process.argv[i + 1] : (process.env.SB_ENGINE || 'chromium')).toLowerCase(); })();
const chromium = ENGINE === 'vm' ? null : (()=>{try{return require('playwright')}catch(e){return require('/opt/node-tools/node_modules/playwright')}})().chromium;

const HERE = __dirname;
const DEFAULT_BUILD = path.resolve(HERE, '../../lean/tropebrawl-v7-published.html');
const DEFAULT_SIM = path.resolve(HERE, '../../lean/sim');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

// tiny argv parser: --key value / --flag
function args(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const nx = argv[i + 1];
      if (nx === undefined || nx.startsWith('--')) out[k] = true; else { out[k] = nx; i++; }
    } else out._.push(a);
  }
  return out;
}

// The published build is a body fragment (the artifact host wraps it). Wrap it the same way the
// existing sim does, but write the copy into our own .cache so the build folder stays read-only.
function wrapBuild(buildPath) {
  const src = fs.readFileSync(buildPath, 'utf8');
  const hash = crypto.createHash('sha1').update(src).digest('hex').slice(0, 10);
  const dir = path.join(HERE, '.cache');
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `page-${hash}.html`);
  if (!fs.existsSync(out)) {
    const html = /<html[\s>]/i.test(src) ? src.replace(/<link[^>]*fonts[^>]*>/g, '')
      : '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'
        + src.replace(/<link[^>]*fonts[^>]*>/g, '') + '</body></html>';
    fs.writeFileSync(out, html);
  }
  return { file: out, hash };
}

async function launch() {
  if (ENGINE === 'vm') { const { VmBrowser } = require('./vmpage'); console.error('[smartbot] engine: vm (fastsim, no browser)'); return new VmBrowser(); }
  return chromium.launch({ executablePath: CHROME, args: ['--js-flags=--max-old-space-size=2048'] });
}

// Open one page with the build and the bot core (+ optionally the old greedy bots for baselines).
async function openPage(browser, buildPath, opts = {}) {
  if (ENGINE === 'vm') {
    const scripts = [path.join(HERE, 'core.js')];
    if (opts.greedy) { const bots = path.join(opts.simDir || DEFAULT_SIM, 'bots.js'); if (fs.existsSync(bots)) scripts.push(bots); }
    const page = await browser.newVmPage(path.resolve(buildPath), scripts);
    await page.evaluate(() => SB.init());
    return page;
  }
  const { file } = wrapBuild(buildPath);
  const page = await browser.newPage();
  page.on('pageerror', e => { if (opts.verbose) console.error('[pageerror]', e.message); });
  await page.goto('file://' + file);
  await page.addScriptTag({ path: path.join(HERE, 'core.js') });
  if (opts.greedy) {
    const bots = path.join(opts.simDir || DEFAULT_SIM, 'bots.js');
    if (fs.existsSync(bots)) await page.addScriptTag({ path: bots });
  }
  await page.evaluate(() => SB.init());
  return page;
}

function readJSON(p, dflt) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return dflt; } }
function writeJSON(p, obj) { const tmp = p + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(obj, null, 1)); fs.renameSync(tmp, p); }

module.exports = { args, wrapBuild, launch, openPage, readJSON, writeJSON, DEFAULT_BUILD, DEFAULT_SIM, HERE, ENGINE };

// ---------------------------------------------------------------- shared evaluation helpers
// per-run score: a win is worth 1, then margin (lives left on a win) and fights won break ties
function runFit(r) { if (!r || r.err) return 0; return (r.win ? 1 : 0) + 0.03 * (r.win ? Math.max(0, r.lives) : 0) + 0.01 * (r.wins || 0); }
function fitness(runs) { return runs.reduce((s, r) => s + runFit(r), 0) / Math.max(1, runs.length); }
function hseed(...xs) { let h = 0x811c9dc5; for (const x of xs) { const s = String(x); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } h ^= 0x7f; h = Math.imul(h, 0x01000193); } return (h >>> 1) || 1; }
function seedSet(kind, n, salt = 0) { return Array.from({ length: n }, (_, i) => hseed('tropebrawl-smartbot', kind, salt, i)); }

// a pool of pages (one renderer process each = one CPU) that evaluates (params, opts, seeds) jobs
class Pool {
  constructor(browser, build, n, opts = {}) { this.browser = browser; this.build = build; this.n = n; this.opts = opts; this.pages = []; this.runs = 0; }
  async start() {
    for (let i = 0; i < this.n; i++) this.pages.push(await openPage(this.browser, this.build, this.opts));
    this.spec = await this.pages[0].evaluate(() => SB.init().spec);
    this.info = await this.pages[0].evaluate(() => SB.init().info);
    return this;
  }
  // jobs: [{key, kind:'smart'|'greedy', params, opts, seeds, pol}] -> {key: runs[]}; chunks seeds across pages
  async run(jobs, chunk = 4) {
    const tasks = [];
    jobs.forEach(j => { for (let i = 0; i < j.seeds.length; i += chunk) tasks.push({ j, seeds: j.seeds.slice(i, i + chunk), at: i }); });
    const out = {}; jobs.forEach(j => { out[j.key] = new Array(j.seeds.length); });
    let next = 0;
    const worker = async page => {
      while (next < tasks.length) {
        const t = tasks[next++];
        const res = t.j.kind === 'greedy'
          ? await page.evaluate(([s, p]) => SB.greedyMany(s, p), [t.seeds, t.j.pol])
          : await page.evaluate(([s, p, o]) => SB.playMany(s, p, o), [t.seeds, t.j.params, t.j.opts || {}]);
        res.forEach((r, k) => { out[t.j.key][t.at + k] = r; });
        this.runs += res.length;
      }
    };
    await Promise.all(this.pages.map(worker));
    return out;
  }
  async stress(mult) { const r = []; for (const p of this.pages) r.push(await p.evaluate(m => SB.stress(m), mult)); return r.every(Boolean); }
}
const toParams = (spec, z) => Object.fromEntries(spec.map((p, i) => [p.name, +(p.lo + Math.min(1, Math.max(0, z[i])) * (p.hi - p.lo)).toFixed(4)]));
const toZ = (spec, params) => spec.map(p => { const v = params && params[p.name] != null ? params[p.name] : p.init; return Math.min(1, Math.max(0, (v - p.lo) / (p.hi - p.lo))); });

module.exports.runFit = runFit; module.exports.fitness = fitness; module.exports.seedSet = seedSet; module.exports.hseed = hseed;
module.exports.Pool = Pool; module.exports.toParams = toParams; module.exports.toZ = toZ;

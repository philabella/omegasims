// A Playwright-page lookalike backed by a worker thread running the fastsim vm engine (../engine.js).
// lib.js uses it when the engine is 'vm' (--engine vm, or SB_ENGINE=vm): launch() returns a VmBrowser,
// openPage() a VmPage whose evaluate(fn, arg) runs fn's source inside the game's global scope in that worker,
// exactly like page.evaluate does in the browser page (fn is serialised, arg is copied, the result is copied back).
// One VmPage = one worker thread = one CPU, the same role as one Chromium renderer in the Chromium pool.
'use strict';
const path = require('path');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (!isMainThread && workerData && workerData.__vmpage) {
  const { Engine } = require(workerData.engine);
  let eng = null;
  parentPort.on('message', m => {
    try {
      if (m.open) { eng = new Engine({ build: m.open, scripts: m.scripts || [] }); parentPort.postMessage({ id: m.id, r: eng.pow }); return; }
      if (m.load) { eng.load(m.load); parentPort.postMessage({ id: m.id, r: null }); return; }
      const r = eng.evaluate(m.src, m.arg);
      parentPort.postMessage({ id: m.id, r });
    } catch (e) { parentPort.postMessage({ id: m.id, err: (e && e.message) || String(e), stack: e && e.stack }); }
  });
} else {
  const ENGINE = path.resolve(__dirname, '../engine.js');
  class VmPage {
    constructor() {
      this.w = new Worker(__filename, { workerData: { __vmpage: true, engine: ENGINE } });
      this.n = 0; this.wait = new Map(); this.closed = false;
      this.w.on('message', m => { const p = this.wait.get(m.id); if (!p) return; this.wait.delete(m.id); if (m.err) { const e = new Error(m.err); e.stack = m.stack; p.rej(e); } else p.res(m.r); });
      this.w.on('error', e => { for (const p of this.wait.values()) p.rej(e); this.wait.clear(); });
    }
    _call(msg) { return new Promise((res, rej) => { const id = ++this.n; this.wait.set(id, { res, rej }); this.w.postMessage(Object.assign({ id }, msg)); }); }
    open(build, scripts) { return this._call({ open: build, scripts }); }
    goto() { return Promise.resolve(); }                                  // the build is loaded by open()
    addScriptTag({ path: p }) { return this._call({ load: path.resolve(p) }); }
    evaluate(fn, arg) { return this._call({ src: typeof fn === 'function' ? fn.toString() : String(fn), arg }); }
    on() { return this; }
    async close() { if (!this.closed) { this.closed = true; await this.w.terminate(); } }
  }
  class VmBrowser {
    constructor() { this.pages = []; }
    async newVmPage(build, scripts) { const p = new VmPage(); this.pages.push(p); p.pow = await p.open(build, scripts); return p; }
    async close() { await Promise.all(this.pages.map(p => p.close())); }
  }
  module.exports = { VmPage, VmBrowser };
}

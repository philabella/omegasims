#!/usr/bin/env node
// fastsim play: the aiplayer text harness (playtester/aiplayer) on the vm engine. No browser: a command takes
// ~0.1 s including Node startup, a fight is fast-forwarded instantly, and `shell` keeps one engine alive
// for a whole script of commands. Same commands, same text view (aiplayer/pageside.js is loaded unchanged),
// same state-file format: state files and archived runs are interchangeable with the Chromium harness.
//
// Each command: load the build into a vm -> restore the saved run (S, screen, seeded RNG) with the game's own
// restore() -> apply the action through the game's real onAction() (what a button click calls) -> fights:
// Fight + skip (silent battle), read the result, Continue -> save the run JSON -> print the text view.
'use strict';
const fs = require('fs');
const path = require('path');
const { Engine, DEFAULT_BUILD, hseed } = require('./engine');

const HERE = __dirname;
const PAGESIDE = process.env.TB_PAGESIDE || path.resolve(HERE, '../playtester/aiplayer/pageside.js');
const DEFAULT_GAME = process.env.TB_GAME || DEFAULT_BUILD;

let argv = process.argv.slice(2);
const flag = (name, def) => { const i = argv.indexOf(name); if (i < 0) return def; const v = argv[i + 1]; argv.splice(i, 2); return v; };
const bool = name => { const i = argv.indexOf(name); if (i < 0) return false; argv.splice(i, 1); return true; };
const STATE = path.resolve(flag('--state', process.env.TB_STATE || path.join(HERE, 'state/current.json')));
let GAME = flag('--game', null);
const QUIET = bool('--quiet');
const [cmd, ...rest] = argv;

function usage() {
  console.log(`usage: node play.js [--state file] [--game build.html] [--quiet] <command>
  new [seed]                start a run (seeded RNG; seed is random if omitted)
  view | v                  print the current view
  act <action> [value]      one raw game action: act buy 2 | act rank | act reroll | act lock | act fight
                            | act event payday | act event-sub <id> | act event-done | act pend <itemId> | act slot f1
  do "<c1>" "<c2>" ...      several commands, e.g. do "buy 0" "buy 3" "move n0 f2" "fight"
     commands: buy <i> | reroll | lock | rank | move <from> <to> | swap <a> <b> | sell <slot> | pick <n|id|gold>
               | fight | <any raw onAction name> [value]
  shell                     read commands from stdin, one per line (do-commands, or view/log/info/odds/note),
                            printing the view after each; one engine for the whole session
  info <kind> [id]          the in-game details panel: hero <id> | unit <slot> | enemy <i> | syn <key>
                            | item <id> | legend [id] | rank | combo <id>
  odds [n]                  ANALYSIS (not in the game): play the next fight n times (default 20) with other random
                            seeds on a copy of the run, report win % and time; the run itself is untouched
  ids                       ids of every character, item, legendary and crossover
  dom                       the page's rendered text (build-agnostic fallback)
  buttons / click <n>       list the rendered [data-a] buttons / click the nth one (build-agnostic fallback)
  branch <run.json> [round] replay a saved/archived run (same seed, same commands) up to the start of [round]
  verify <run.json>         replay a finished run (from either harness) and check it ends in the identical state
  note "<text>" | log | history
  state file default: ${path.relative(process.cwd(), STATE) || STATE}`);
}
if (!cmd || cmd === 'help' || cmd === '-h' || cmd === '--help') { usage(); process.exit(0); }

function loadState() { try { return JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch (e) { return null; } }
function saveState(st) { fs.mkdirSync(path.dirname(STATE), { recursive: true }); const tmp = STATE + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(st)); fs.renameSync(tmp, STATE); }

// one command at a time per state file
const LOCK = STATE + '.lock';
function takeLock() {
  for (let i = 0; i < 100; i++) {
    try { fs.mkdirSync(path.dirname(STATE), { recursive: true }); fs.writeFileSync(LOCK, String(process.pid), { flag: 'wx' }); return true; }
    catch (e) { try { if (Date.now() - fs.statSync(LOCK).mtimeMs > 60000) { fs.unlinkSync(LOCK); continue; } } catch (_) {} Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100); }
  }
  return false;
}
const NOLOCK = ['log', 'history', 'ids', 'verify'];
if (!NOLOCK.includes(cmd)) {
  if (!takeLock()) { console.log('Another play.js command is using ' + STATE + ' (lock ' + LOCK + '). Run commands one at a time.'); process.exit(1); }
  process.on('exit', () => { try { fs.unlinkSync(LOCK); } catch (e) {} });
}

function openGame(game) {
  const eng = new Engine({ build: game, scripts: [PAGESIDE] });
  const E = (f, a) => eng.evaluate(f, a);
  return { eng, E };
}

function main() {
  let st = loadState();
  if (cmd === 'log') return printLog(st);
  if (cmd === 'history') return printHistory();
  if (cmd === 'note') {
    if (!st) return console.log('no run');
    st.notes = st.notes || []; st.notes.push({ round: st.S && st.S.round, text: rest.join(' ') }); saveState(st);
    if (st.archived) fs.writeFileSync(st.archived, JSON.stringify(st, null, 1)); console.log('noted.'); return;
  }
  if (cmd === 'verify') return verify(rest[0]);
  let replay = null;
  if (cmd === 'branch') {
    const src = JSON.parse(fs.readFileSync(path.resolve(rest[0]), 'utf8'));
    const upto = rest[1] != null ? +rest[1] : Infinity;
    st = { game: src.game, seed: src.seed, started: new Date().toISOString(), log: [], fights: [], notes: [{ round: 1, text: `branched from ${path.basename(rest[0])} (seed ${src.seed}) at round ${upto === Infinity ? 'end' : upto}` }], lastFight: null };
    GAME = path.resolve(GAME || resolveGame(src.game));
    replay = src.log.filter(x => x.r < upto).map(x => x.c);
  }
  if (cmd !== 'new' && cmd !== 'ids' && cmd !== 'branch' && !st) { console.log('No saved run. Start one: node play.js new'); return; }
  GAME = path.resolve(GAME || (cmd !== 'new' && st && resolveGame(st.game)) || DEFAULT_GAME);
  const { eng, E } = openGame(GAME);
  const errs = [];
  try {
    if (cmd === 'ids') { console.log(E(() => TBH.ids())); return; }
    if (cmd === 'new') {
      const seed = rest[0] != null ? (parseInt(rest[0], 10) | 0) : (Math.floor(Math.random() * 2 ** 31));
      eng.ctx.__seedMath(hseed('math', seed));
      E(s => { TBH.seed(s); TBH.onA('new'); }, seed);
      st = { game: GAME, seed, started: new Date().toISOString(), log: [], fights: [], notes: [], lastFight: null, harness: 'fastsim' };
      finish(E, st, [], null);
      return;
    }
    if (cmd === 'branch') {
      replayInto(E, st, replay);
      console.log(`replayed ${replay.length} commands`);
      finish(E, st, [], null);
      return;
    }
    E(s => TBH.restoreState(s), st);
    E(() => TBH.takeToasts());
    if (cmd === 'view' || cmd === 'v') { finish(E, st, [], st.lastFightFresh ? st.lastFight : null, true); return; }
    if (cmd === 'dom') { console.log(E(() => { const a = document.querySelector('#app').innerText; const s = document.querySelector('#sheet:not([hidden])'); return a + (s ? '\n--- SHEET ---\n' + s.innerText : ''); })); return; }
    if (cmd === 'buttons') { console.log(E(() => [...document.querySelectorAll('[data-a]')].map((b, i) => `${i}: [${b.dataset.a}${b.dataset.v != null ? ' ' + b.dataset.v : ''}]${b.disabled ? ' (disabled)' : ''} ${(b.innerText || b.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 70)}`).join('\n'))); return; }
    if (cmd === 'info') { console.log(E(([k, i]) => TBH.info(k, i), [rest[0], rest[1]])); return; }
    if (cmd === 'odds') { console.log(odds(eng, E, +(rest[0] || 20))); return; }
    if (cmd === 'shell') { shell(eng, E, st); return; }
    let cmds;
    if (cmd === 'act') cmds = [rest.join(' ')];
    else if (cmd === 'do') cmds = rest;
    else if (cmd === 'click') cmds = ['click ' + rest[0]];
    else cmds = [[cmd, ...rest].join(' ')];   // shorthand: node play.js buy 2
    const { notes, lf } = runCmds(E, st, cmds);
    finish(E, st, notes, lf);
  } catch (e) {
    console.log('HARNESS ERROR: ' + e.message + (process.env.TB_DEBUG ? '\n' + e.stack : ''));
  } finally {
    if (errs.length) console.log('PAGE ERRORS:\n  ' + errs.slice(0, 5).join('\n  '));
  }
}

// a game path stored by the Chromium harness may be relative to its own folder; keep it if it exists
function resolveGame(g) { if (!g) return null; if (fs.existsSync(g)) return g; const alt = path.resolve(HERE, '../lean', path.basename(g)); return fs.existsSync(alt) ? alt : g; }

function runCmds(E, st, cmds) {
  const notes = []; let lf = null;
  for (const c of cmds) {
    const before = E(() => TBH.brief());
    if (before.over) { notes.push(`[${c}] run is over - start a new one`); break; }
    const r = runOne(E, c, st);
    if (r.fight) lf = r.fight;
    const after = E(() => TBH.brief());
    const toasts = E(() => TBH.takeToasts());
    const msg = `${r.msg}${toasts.length ? ' | game: ' + toasts.join(' / ') : ''}${after.gold !== before.gold ? ` | gold ${before.gold}->${after.gold}` : ''}`;
    notes.push(`[${c}] ${msg}`);
    st.log.push({ r: before.round, c, msg: msg.slice(0, 200) });
    if (r.stop) break;
  }
  return { notes, lf };
}
function replayInto(E, st, cmds) {
  E(s => { TBH.seed(s); TBH.onA('new'); }, st.seed);
  for (const c of cmds) { const r0 = E(() => TBH.brief()).round; E(() => TBH.takeToasts()); const r = runOne(E, c, st); st.log.push({ r: r0, c, msg: r.msg.slice(0, 200) }); }
}

function runOne(E, c, st) {
  const [a, ...vs] = c.trim().split(/\s+/); const v = vs.join(' ');
  if (a === 'pick') return { msg: E(x => TBH.pick(x), v) };
  if (a === 'move' || a === 'swap') return { msg: E(([f, t]) => TBH.move(f, t), vs) };
  if (a === 'sell') return { msg: E(s => TBH.sell(s), v) };
  if (a === 'click') {
    const ok = E(n => { const b = [...document.querySelectorAll('[data-a]')][+n]; if (!b) return 'no such button'; if (b.disabled) return 'button disabled'; b.click(); return 'clicked ' + b.dataset.a + (b.dataset.v != null ? ' ' + b.dataset.v : ''); }, v);
    if (/clicked fight/.test(ok)) { E(() => TBH.onA('skip')); }
    if (/clicked (fight|skip)/.test(ok)) return Object.assign({ msg: ok }, waitFight(E, st));
    return { msg: ok };
  }
  if (a === 'fight') {
    const s = E(() => TBH.fightStart());
    if (s !== 'ok') return { msg: s };
    const f = waitFight(E, st);
    return Object.assign({ msg: f.fight ? `${f.fight.win ? 'WIN' : 'LOSS'} vs ${f.fight.title}` : 'fight?' }, f);
  }
  // raw game action through onAction (buy, reroll, lock, rank, slot, event, event-sub, event-done, pend, pend-leg ...)
  const blocked = E(x => TBH.G('UI').sheetOpen === 'modal' && x !== 'pend' && x !== 'pend-leg', a);
  if (blocked) return { msg: 'IGNORED by the game: a pick is waiting (pick <n> first)' };
  const res = E(([x, y]) => { const S0 = JSON.stringify(TBH.G('S')); TBH.onA(x, y === '' ? undefined : y); return JSON.stringify(TBH.G('S')) === S0 ? 'no change' : 'ok'; }, [a, v]);
  return { msg: res };
}

// the battle was fast-forwarded by the skip button; fightCapture shows the result (settle) and reads it
function waitFight(E, st) {
  const fight = E(() => TBH.fightCapture());
  const rec = Object.assign({}, fight); delete rec.overlay;
  st.fights.push({ r: rec.round, boss: rec.boss, title: rec.title, win: rec.win, t: rec.t, gold: rec.gold, lives: rec.lives,
    board: rec.mine.map(u => u.n + u.s).join(','), mvp: rec.mvp && rec.mvp.name,
    unitDmg: rec.mine.reduce((a, u) => a + u.d, 0), unattr: rec.unattr || 0 });
  E(() => TBH.afterFight());   // the result overlay's Continue button
  return { fight: rec, stop: rec.over };
}

function finish(E, st, notes, lf, isView, opts = {}) {
  if (lf) { st.lastFight = lf; st.lastFightFresh = true; } else if (!isView) st.lastFightFresh = false;
  const snap = E(() => TBH.snap());
  Object.assign(st, JSON.parse(JSON.stringify(snap)), { game: st.game || GAME });
  const toasts = E(() => TBH.takeToasts());
  const view = E(([l, t]) => TBH.view(l, t), [lf || (isView && st.lastFightFresh ? st.lastFight : null), toasts]);
  saveState(st);
  if (st.S && st.S.over && !st.archived && cmd !== 'branch') {
    fs.mkdirSync(path.join(HERE, 'runs'), { recursive: true });
    st.archived = path.join(HERE, 'runs', `${new Date().toISOString().replace(/[:.]/g, '-')}-seed${st.seed}-${st.S.result}.json`);
    fs.writeFileSync(st.archived, JSON.stringify(st, null, 1)); saveState(st);
  }
  if (notes.length && !QUIET) console.log(notes.join('\n'));
  if (!opts.noView) console.log(view);
}

// ANALYSIS ONLY: the next fight replayed n times with other seeds on a deep copy; S, B, UI and the RNG are restored
function odds(eng, E, n) {
  return E(([n, base]) => {
    const G = TBH.G; const S0 = G('S'), UI = G('UI');
    if (!S0 || !S0.enemy || UI.screen !== 'plan') return 'odds: only on the planning screen before a fight';
    if (!G('fielded')().length) return 'odds: nobody on the board';
    Object.assign(globalThis, { __keepS: S0, __keepB: G('B'), __keepR: G('rngState'), __keepSd: G('seeded') });
    const startBattle = G('startBattle'), step = G('step'), DT = G('DT');
    let wins = 0, t = 0, tw = 0; const res = [];
    try {
      for (let k = 0; k < n; k++) {
        (0, eval)('S = structuredClone(__keepS); seeded = true; rngState = ' + ((base + k * 7919) | 0));
        startBattle(true); const B = G('B'); let g = 0; while (!B.done && g++ < 20000) step(DT);
        if (B.win) { wins++; tw += B.t; } t += B.t; res.push(B.win ? 'W' : 'L');
      }
    } finally { (0, eval)('S = __keepS; B = __keepB; rngState = __keepR; seeded = __keepSd; delete globalThis.__keepS; delete globalThis.__keepB'); }
    return `ODDS (analysis, not shown in the game): next fight vs ${S0.enemy.title} with this board, ${n} replays: win ${Math.round(100 * wins / n)}%` +
      ` | avg ${(t / n).toFixed(1)}s${wins ? `, wins avg ${(tw / wins).toFixed(1)}s` : ''} | ${res.join('')}`;
  }, [n, hseed('odds', Date.now())]);
}

// stdin script: one command per line; the view is printed after each line. Lines: any do-command, or
// view | v | log | note <text> | info <kind> [id] | odds [n] | dom | buttons | quit
function shell(eng, E, st) {
  const lines = fs.readFileSync(0, 'utf8').split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  for (const line of lines) {
    const [a, ...vs] = line.split(/\s+/);
    console.log(`\n>>> ${line}`);
    if (a === 'quit' || a === 'exit') break;
    if (a === 'view' || a === 'v') { finish(E, st, [], st.lastFightFresh ? st.lastFight : null, true); continue; }
    if (a === 'log') { printLog(st); continue; }
    if (a === 'note') { st.notes = st.notes || []; st.notes.push({ round: st.S && st.S.round, text: vs.join(' ') }); saveState(st); console.log('noted.'); continue; }
    if (a === 'info') { console.log(E(([k, i]) => TBH.info(k, i), [vs[0], vs[1]])); continue; }
    if (a === 'odds') { console.log(odds(eng, E, +(vs[0] || 20))); continue; }
    if (a === 'dom') { console.log(E(() => document.querySelector('#app').innerText)); continue; }
    if (a === 'buttons') { console.log(E(() => [...document.querySelectorAll('[data-a]')].map((b, i) => `${i}: [${b.dataset.a}${b.dataset.v != null ? ' ' + b.dataset.v : ''}]${b.disabled ? ' (disabled)' : ''}`).join('\n'))); continue; }
    const { notes, lf } = runCmds(E, st, [line]);
    finish(E, st, notes, lf);
    if (st.S && st.S.over) break;
  }
}

// replay a finished run from its seed and command log and compare with the archive (works for runs from either harness)
function verify(file) {
  if (!file) return console.log('usage: verify <run.json>');
  const src = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
  const game = path.resolve(GAME || resolveGame(src.game) || DEFAULT_GAME);
  const { E } = openGame(game);
  const st = { game, seed: src.seed, log: [], fights: [], notes: [] };
  const t0 = Date.now();
  replayInto(E, st, src.log.map(x => x.c));
  const snap = JSON.parse(JSON.stringify(E(() => TBH.snap())));
  const secs = (Date.now() - t0) / 1000;
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const fk = f => ({ r: f.r, boss: f.boss, title: f.title, win: f.win, t: f.t, gold: f.gold, lives: f.lives, board: f.board, mvp: f.mvp });
  const fightsSame = src.fights.length === st.fights.length && src.fights.every((f, i) => same(fk(f), fk(st.fights[i])));
  const unattrSame = src.fights.every((f, i) => !st.fights[i] || ((f.unattr == null || f.unattr === st.fights[i].unattr) && (f.unitDmg == null || f.unitDmg === st.fights[i].unitDmg)));
  const sSame = same(src.S, snap.S), rngSame = same(src.rng, snap.rng);
  console.log(`verify ${path.basename(file)} (seed ${src.seed}, ${src.log.length} commands, ${src.fights.length} fights, ${path.basename(game)}) replayed in ${secs.toFixed(2)}s:`);
  console.log(`  final state S ${sSame ? 'IDENTICAL' : 'DIFFERENT'} | rng ${rngSame ? 'IDENTICAL' : 'DIFFERENT'} (${JSON.stringify(snap.rng)}) | fights ${fightsSame ? 'IDENTICAL' : 'DIFFERENT'} (round, result, time, gold, lives, board, MVP)${unattrSame ? '' : ' | damage totals differ'}`);
  console.log(`  result ${snap.S.result} round ${snap.S.round} lives ${snap.S.lives} gold ${snap.S.gold} | archive: ${src.S.result} round ${src.S.round} lives ${src.S.lives} gold ${src.S.gold}`);
  if (!fightsSame) { const i = src.fights.findIndex((f, i) => !same(fk(f), fk(st.fights[i] || {}))); console.log('  first differing fight:', JSON.stringify(src.fights[i]), 'vs', JSON.stringify(st.fights[i])); }
  if (!(sSame && rngSame && fightsSame)) process.exitCode = 1;
}

function printLog(st) {
  if (!st) return console.log('no run');
  console.log(`seed ${st.seed} | game ${st.game}`);
  let r = null;
  st.log.forEach(x => { if (x.r !== r) { r = x.r; process.stdout.write(`\nR${r}: `); } process.stdout.write(`${x.c}; `); });
  console.log('\nFIGHTS:');
  st.fights.forEach(f => console.log(`  R${f.r}${f.boss ? ' BOSS' : ''} ${f.title}: ${f.win ? 'W' : 'L'} ${f.t}s ${f.win ? '' : '-' + f.lives + 'hp '}| ${f.board} | mvp ${f.mvp}${f.unattr != null ? ` | unit dmg ${f.unitDmg}, unattributed ${f.unattr}` : ''}`));
  if (st.notes && st.notes.length) { console.log('NOTES:'); st.notes.forEach(n => console.log(`  R${n.round}: ${n.text}`)); }
}
function printHistory() {
  const dir = path.join(HERE, 'runs');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort() : [];
  if (!files.length) return console.log('no finished runs yet');
  files.forEach(f => { try { const r = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); const S = r.S || {};
    const won = (r.fights || []).filter(x => x.win).length;
    console.log(`${f.slice(0, 19)} seed ${r.seed} ${String(S.result).toUpperCase()} r${S.round} lives ${S.lives} fights ${won}/${(r.fights || []).length} rank ${S.rank} | ${(r.notes && r.notes[0] && r.notes[0].text || '').slice(0, 90)}`);
  } catch (e) { console.log(f + ' (unreadable)'); } });
}

main();

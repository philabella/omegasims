// Level framework checks (v19.70, TRO-17), no browser, ~20 s: LADDER ids exist and add up to the full game,
// schedules and dials per level, saved-progress migration, and seeded autopilot runs at Levels 1-3 that only
// ever see the level's genres and rarities.   node fastsim/lvdata.js --build <build.html>
'use strict';
const path = require('path'); const { Engine, DEFAULT_BOTS } = require('./engine');
const i = process.argv.indexOf('--build'); const BUILD = path.resolve(i > 0 ? process.argv[i + 1] : path.join(__dirname, '..', 'tropebrawl.html'));
const E = new Engine({ build: BUILD, scripts: [DEFAULT_BOTS] });
const res = JSON.parse(E.ev(String.raw`(function(){const R=[];const ok=(name,c,info)=>R.push({name,ok:!!c,info:info===undefined?'':String(info).slice(0,160)});
  const ids={g:Object.keys(GENRES),items:TRINKETS.map(t=>t[0]),legends:Object.keys(LEGENDS),events:Object.keys(EVENTS)};
  const miss=[];for(let k=1;k<=LV_MAX;k++){const x=LADDER[k];['g','items','legends','events'].forEach(f=>(x[f]||[]).forEach(v=>{if(!ids[f].includes(v))miss.push(k+':'+f+':'+v);}));}
  ok('18 levels',LV_MAX===18,LV_MAX);ok('every LADDER id exists in the game',!miss.length,miss.join(' '));
  const top=lvDef(18);
  ok('Level 18 has all 9 genres',ids.g.every(g=>top.g.includes(g)),top.g.length);
  ok('Level 18 has all 25 items',top.items.length===25&&ids.items.every(t=>top.items.includes(t)),top.items.length+'/'+ids.items.length);
  ok('Level 18 has all 41 Legendaries',top.legends.length===41&&ids.legends.every(t=>top.legends.includes(t)),top.legends.length+'/'+ids.legends.length+' missing '+ids.legends.filter(t=>!top.legends.includes(t)).join(','));
  const evAll=ids.events;ok('Level 18 has all events',evAll.every(t=>top.events.includes(t)),top.events.length+'/'+evAll.length+' missing '+evAll.filter(t=>!top.events.includes(t)).join(','));
  const cnt={2:[8,0,3],4:[16,13],6:[16,25],7:[21,25],9:[21,37],10:[25,37],12:[25,41]};
  Object.entries(cnt).forEach(([n,[it,lg]])=>{const d=lvDef(+n);ok('Level '+n+' pools '+it+' items / '+lg+' Legendaries',d.items.length===it&&d.legends.length===lg,d.items.length+'/'+d.legends.length);});
  ok('Level 4 rules = rv1 marker only (old Level 0)',lvDef(4).rules.filter(x=>!/^(coach\d|xover|rv\d)$/.test(x)).length===0,lvDef(4).rules.join(','));
  ok('Level 14 rules = old Level 8 set',['limited','plot','xp1','elite','life1','twin','extras','xp2'].every(x=>lvDef(14).rules.includes(x))&&!lvDef(14).rules.includes('life2'),lvDef(14).rules.join(','));
  const rounds=[1,2,3,4,10,14,15,17,18].map(n=>{buildSchedule(n);return n+':'+SCHEDULE.length+'/'+SCHEDULE.filter(x=>x.m).length+'m/'+SCHEDULE.filter(x=>x.type==='boss').length+'b';}).join(' ');
  ok('schedules (rounds/minis/bosses)',rounds==='1:9/0m/1b 2:18/0m/2b 3:27/1m/3b 4:36/0m/4b 10:36/4m/4b 14:36/4m/4b 15:36/4m/4b 17:36/12m/4b 18:36/24m/4b',rounds);
  buildSchedule(false);ok('load-time schedule is the plain season',SCHEDULE.length===36&&!SCHEDULE.some(x=>x.m),SCHEDULE.length);
  ok('dials Level 4',lvDials(4)==='36 rounds · 10 lives · shop XP normal · 4 bosses',lvDials(4));
  ok('dials Level 1',/9 rounds · 10 lives .* 1 boss · enemies −20%/.test(lvDials(1)),lvDials(1));
  ok('dials Level 15',/37 rounds · 9 lives .* 5 bosses \+ 4 mini-bosses · enemies \+7\.2%/.test(lvDials(15)),lvDials(15));
  ok('every level has a text',LADDER.slice(1).every((x,k)=>lvText(k+1).length>10),LADDER.slice(1).map((x,k)=>k+1+':'+lvText(k+1).length).join(' '));
  ok('unlock: Kaiju genre at 4, Legendary vault at 9, item prop at 10, event cut at 8',unlockLv('g','kaiju')===4&&unlockLv('l','vault')===9&&unlockLv('i','prop')===10&&unlockLv('e','cut')===8);
  const myth=HEROES.find(h=>h[4]===5&&h[2]==='army'),epic=HEROES.find(h=>h[4]===4&&h[2]==='army');ok('unlock: army Epic at 3, Mythic at 4',unlockLv('h',epic[0])===3&&unlockLv('h',myth[0])===4);
  // migration
  const mg=j=>JSON.stringify(lvMigrate(j));
  ok('migrate new player',mg({})==='{"v":2,"open":4,"won":[],"pick":4}',mg({}));
  ok('migrate old 6/won 0-5/pick 3',mg({open:6,won:[0,1,2,3,4,5],pick:3})==='{"v":2,"open":10,"won":[1,2,3,4,5,6,7,8,9],"pick":7}',mg({open:6,won:[0,1,2,3,4,5],pick:3}));
  ok('migrate old 0',mg({open:0,won:[],pick:0})==='{"v":2,"open":4,"won":[1,2,3],"pick":4}',mg({open:0,won:[],pick:0}));
  ok('migrate old 10 (top)',lvMigrate({open:10,won:[10],pick:10}).open===14,mg({open:10,won:[10],pick:10}));
  ok('migrate keeps v2',mg({v:2,open:7,won:[4,5,6],pick:7})==='{"v":2,"open":7,"won":[4,5,6],"pick":7}');
  ok('tools asking for 0 get Level 4',lvClamp(0)===4&&lvClamp(99)===18&&lvClamp(2)===2);
  // short levels: genres and rarity cap in every shop, the whole run
  [1,2,3].forEach(n=>{const d=lvDef(n);let g=new Set(),top=0,rounds=0,won=0,err='';for(let s=1;s<=12;s++){UI.lv=n;seeded=true;rngState=s*31+n;__seedMath(__hseed('math',s,n));
      const rs=rollShop;rollShop=function(){const r=rs.apply(this,arguments);(S.shop||[]).forEach(o=>{if(o){g.add(HERO[o.id].genre);top=Math.max(top,HERO[o.id].tier);}});return r;};
      try{BOT.run('greedy',false,null,null,'curve7');}catch(e){err=String(e.message||e).slice(0,80);}rollShop=rs;
      S.units.forEach(u=>{g.add(HERO[u.id].genre);top=Math.max(top,HERO[u.id].tier);});rounds+=S.round;if(S.result==='win')won++;}
    ok('Level '+n+' runs: genres '+d.g.join('/')+', top rarity '+d.cap,!err&&[...g].every(x=>d.g.includes(x))&&top<=d.cap,'seen '+[...g].join(',')+' top '+top+' rounds '+(rounds/12).toFixed(1)+' won '+won+'/12 '+err);});
  return JSON.stringify(R);})()`));
let bad = 0; res.forEach(x => { if (!x.ok) bad++; console.log(`${x.ok ? 'ok  ' : 'FAIL'} ${x.name}${x.info ? '  (' + x.info + ')' : ''}`); });
console.log(bad ? `${bad} FAILED` : `all ${res.length} passed`); process.exit(bad ? 1 : 0);

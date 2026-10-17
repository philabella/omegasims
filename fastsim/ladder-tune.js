#!/usr/bin/env node
// Measure one set of tuning values at chosen Game Levels: steady bot + expert bot win %.
//   node fastsim/ladder-tune.js --build b.html --tune '{"lvTwin":1}' --levels 0,5,10 [--policy p.json] [--steady 400] [--steady-policy curve7] [--expert 40]
// steady = curve7 (ranks to 7, banks 🪙20): the reference 'reasonable non-expert' since v17
'use strict';
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const A=process.argv.slice(2),opt=(k,d)=>{const i=A.indexOf(k);return i<0?d:A[i+1];};
const HERE=__dirname,BUILD=path.resolve(opt('--build')),TUNE=opt('--tune','{}'),LV=opt('--levels','0,5,10').split(',').map(Number);
const POL=path.resolve(opt('--policy',path.join(HERE,'smartbot-vm/champion.json'))),NS=opt('--steady','400'),SP=opt('--steady-policy','curve7'),NE=opt('--expert','40'),W=opt('--workers','4');
const src=fs.readFileSync(BUILD,'utf8'),LINE='  const lv=Math.max(0,Math.min(LV_MAX,UI.lv|0));';if(!src.includes(LINE))throw new Error('level line not found');
// per process: parallel runs must not overwrite each other's builds
const tmp=path.join(HERE,'out','ladder-tune-'+process.pid);fs.mkdirSync(tmp,{recursive:true});
const out=[];
for(const n of LV){const b=path.join(tmp,`lv${n}.html`);fs.writeFileSync(b,src.replace(LINE,`  const lv=${n};`));
  const so=execFileSync(process.execPath,[path.join(HERE,'sim.js'),NS,SP,'--workers',W,'--seed','40000','--build',b,'--tune',TUNE],{encoding:'utf8',maxBuffer:1<<28});
  const steady=(/win=([\d.]+)%/.exec(so)||[])[1];
  const lo=path.join(tmp,`lab${n}`);
  execFileSync(process.execPath,['balance-lab.js','--engine','vm','--build',b,'--policy',POL,'--runs',NE,'--stress','1','--workers',W,'--groups','base','--tune',TUNE,'--out',lo],{cwd:path.join(HERE,'smartbot-vm'),stdio:['ignore','ignore','pipe'],maxBuffer:1<<28});
  const r=JSON.parse(fs.readFileSync(path.join(lo,'lab.json'),'utf8')).rows[0];
  out.push(`Lv${n}: steady ${steady}% expert ${Math.round(100*r.win)}%${r.err?' ERR'+r.err:''}`);process.stderr.write(out[out.length-1]+'\n');}
console.log(out.join(' | '));

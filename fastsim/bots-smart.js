// Injected into the page. Plays whole runs headless via the game's own functions.
window.BOT = (function(){
  let FOCUS=null, FORCE_LEG=null, POL=null;
  // gauge builds (train/trainCost): only train when this round's gold finishes the rank ('complete' mode); flat builds rank up directly
  const GAUGE=typeof train==='function';
  const tCost=()=>GAUGE?trainCost():rankCost(), doTrain=()=>GAUGE?train():rankUp();
  function wantTrain(target,bank){const c=tCost(),g=S.gold-(bank||0);if(S.rank>=target||c==null||g<c)return false;if(!GAUGE)return true;
    const left=xpNeed()-(S.xp||0);return Math.floor(g/c)*RANK.trainXp>=left;}
  // rank policies: target rank by round, gold kept back after round 3, and the cap on rank
  // rank policies: target rank by round (or board state), gold kept back after round 3, rarity weight, owned-copy weight
  const LEGV={"ensemble": 44.4, "wallet": 40.0, "scout": 40.4, "crossep": 43.2, "cult": 51.6, "extuniv": 43.6, "blockbuster": 45.6, "shock": 42.8, "brood": 27.2, "pheromone": 20.4, "feeding": 10.0, "bloodline": 52.8, "armydead": 43.6, "gameball": 43.6, "halftime": 43.2, "insidejob": 43.2, "getaway": 41.6, "vault": 23.6, "sixgun": 32.4, "wanted": 35.6, "quickdraw": 36.4, "underdog": 44.0, "spinoff": 47.2, "plotarmor": 46.8, "hype": 47.6, "placement": 37.2, "dircut": 33.6, "indie": 46.4, "fieldhosp": 48.0, "danger": 50.4, "graveyard": 44.8, "press": 53.6},LEGP={"ensemble": "econ50", "wallet": "econ50", "scout": "econ50", "crossep": "econ50", "cult": "econ50", "extuniv": "econ50", "blockbuster": "curve7", "shock": "curve7", "brood": "curve7", "pheromone": "curve7", "feeding": "curve7", "bloodline": "curve7", "armydead": "curve7", "gameball": "curve7", "halftime": "curve7", "insidejob": "curve7", "getaway": "curve7", "vault": "curve7", "sixgun": "curve7", "wanted": "curve7", "quickdraw": "curve7", "underdog": "econ50", "spinoff": "econ50", "plotarmor": "econ50", "hype": "econ50", "placement": "econ50", "dircut": "curve7", "indie": "indie3", "fieldhosp": "curve7", "danger": "curve7", "graveyard": "curve7", "press": "curve7"};
  const POLICIES={
    balanced:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20},   // 'curve' in the design notes; banks toward 🪙20 (interest +2), spends it on boss rounds
    // interest sweep: the balanced player banking toward 🪙0..50
    bal0:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:0},
    bal10:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:10},
    bal20:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20},
    bal30:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:30},
    bal40:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:40},
    bal50:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:50},
    // ---- strategy roster (fastsim/tournament.js): the genre's classic plans on the 7-rank shop ----
    curve7:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20},
    bench:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20,bench:true},
    euBench:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20,benchGenre:true},  // Extended Universe abuse: fill the 3 counting bench spots with genre-tier makers
    indie3:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20,fieldCap:3},indie4:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20,fieldCap:4},
    free3:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20,ufree:3},
    benchfree3:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20,bench:true,ufree:3},
    smart:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:50,smart:true},
    tierctl:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20,benchTier:true,fillAlways:true},
    tierreal:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20,bench:true,benchTier:true},
    benchtier:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:20,bench:true,ufree:3,benchTier:true},              // steady curve to Rank 7, banks toward 🪙20
    tempo:{target:r=>r>=15?7:r>=12?6:r>=9?5:r>=6?4:r>=3?3:r>=2?2:1,keep:0,tierW:2,ownW:8,econ:0}, // spend it all to keep winning (streak gold)
    // hoard: econ50 early, then from round 12 keep everything (gold-scaling builds: Heist Crew + The Vault)
    hoard:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:r=>r>=12?400:50,keepAlways:true},
    econ50:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:50},              // bank to 🪙50 (max interest), roll down on boss rounds
    losestreak:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,econ:50,throwTo:5}, // field 2 and bank through round 4 (lose on purpose), then curve
    hyper:{target:r=>r>=16?7:r>=14?6:r>=12?5:r>=5?4:r>=3?3:r>=2?2:1,keep:0,tierW:1,ownW:14,econ:0,rollUntil:12,rollTier:3},  // TFT reroll comp: sit at Rank 4 rolling for ★★★ Rares until round 11, then rank up (Commons/Uncommons cap at ★★)
    commons7:{target:r=>r>=17?7:r>=14?6:r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:1,ownW:14,maxTier:2,econ:20}, // only Commons/Uncommons, but ranks to 7 for the board slots
    rush7:{target:()=>7,keep:0,tierW:6,ownW:6,econ:0},                // rank as fast as possible, chase Epics and Mythics
    fast:{target:()=>5,keep:0,tierW:3,ownW:6},                                    // 'rush'
    stay3:{target:r=>r>=4?3:r>=2?2:1,keep:1,tierW:1,ownW:12},
    stay2:{target:r=>r>=2?2:1,keep:1,tierW:1,ownW:12},                              // trap check
    commons:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:2,tierW:1,ownW:14,maxTier:2},                // the player's "max Commons/Uncommons + items" strat
    rarity:{target:r=>r>=8?5:r>=5?4:r>=3?3:r>=2?2:1,keep:0,tierW:6,ownW:6},                  // chase rare characters
    hoarder:{target:r=>r>=8?5:r>=5?4:r>=3?3:r>=2?2:1,keep:0,tierW:6,ownW:6,hoard:true,ev:['supply','promotion','recruit','payday','reinforce','deal']}, // chase Rare+ level-ups, take every item (even the boss item over a Legendary), level everything
    grabber:{target:r=>r>=8?5:r>=5?4:r>=3?3:r>=2?2:1,keep:0,tierW:6,ownW:6,grab:true},   // rarity shop; takes every item pick, new items first (replacing the weakest when full), never the gold
    leveler:{target:r=>r>=8?5:r>=5?4:r>=3?3:r>=2?2:1,keep:0,tierW:6,ownW:6,hoard:true,keepLeg:true}, // rarity shop; takes every item pick, level-ups first
    hoardleg:{target:r=>r>=8?5:r>=5?4:r>=3?3:r>=2?2:1,keep:0,tierW:6,ownW:6,hoard:true,keepLeg:true,ev:['supply','promotion','recruit','payday','reinforce','deal']}, // same, but keeps the Legendary
    naive:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,oldItems:true}, // balanced with the v8 item habit: first Rare, never level or replace
    deep:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,depth:3},   // balanced, but strongly prefers leveling items
    wide:{target:r=>r>=10?5:r>=7?4:r>=4?3:r>=2?2:1,keep:6,tierW:2,ownW:8,depth:.01},  // balanced, never levels while a new item fits
    reader:{target:r=>{if(r<2)return 1;if(S.rank<3)return 3;const n=[...new Set(S.units.map(u=>u.id))].filter(id=>HERO[id].tier<=2&&S.units.filter(u=>u.id===id).length>=2&&!S.units.some(u=>u.id===id&&u.level>=3)).length;return n>=2?S.rank:S.rank+1;},keep:2,tierW:2,ownW:10},
  };
  function score(id){
    const h=HERO[id];const f=fielded().concat(POL&&POL.benchGenre&&S.legend==='extuniv'?benched().slice(0,3):[]).map(u=>HERO[u.id]);
    let s=h.tier*(POL?POL.tierW:2)+(FOCUS&&h.genre===FOCUS?12:0)+(FOCUS&&h.trait===FOCUS?12:0);
    s+=f.filter(x=>x.genre===h.genre).length*2.5;
    s+=f.filter(x=>x.trait===h.trait).length*2;
    return s;
  }
  function unitScore(u){const h=HERO[u.id];return u.level*10+h.tier*3+score(u.id)*.5;}
  function arrange(){
    const all=S.units.slice().sort((a,b)=>unitScore(b)-unitScore(a));
    const n=POL&&POL.fieldCap&&S.legend==='indie'?Math.min(boardSize(),POL.fieldCap):boardSize();
    // keep genre/trait pairs together: simple greedy by score
    const chosen=all.slice(0,n);
    const rest=all.slice(n);
    const melee=chosen.filter(u=>TBASE[HERO[u.id].trait].range==='melee'&&HERO[u.id].trait!=='stalker');
    const stalk=chosen.filter(u=>HERO[u.id].trait==='stalker');
    const ranged=chosen.filter(u=>TBASE[HERO[u.id].trait].range==='ranged');
    const front=[...melee.sort((a,b)=>(HERO[b.id].trait==='guardian')-(HERO[a.id].trait==='guardian')),...stalk];
    const back=[...ranged];
    while(front.length>3)back.push(front.pop());
    while(back.length>3)front.push(back.pop());
    const order=['f1','f0','f2'],border=['b1','b0','b2'];
    S.units.forEach(u=>u.slot='x');
    front.forEach((u,i)=>u.slot=order[i]);
    back.forEach((u,i)=>u.slot=border[i]);
    if(POL&&POL.benchGenre&&S.legend==='extuniv'){const onb=new Set(chosen.map(u=>u.id)),gc={};chosen.forEach(u=>{const g=HERO[u.id].genre;gc[g]=(gc[g]||0)+1;});
      rest.sort((a,b)=>((onb.has(a.id)?-9:0)+(gc[HERO[a.id].genre]||0)*2+HERO[a.id].tier*.1)<((onb.has(b.id)?-9:0)+(gc[HERO[b.id].genre]||0)*2+HERO[b.id].tier*.1)?1:-1);}
    rest.forEach((u,i)=>u.slot=benchSlots[i]||'gone');
    S.units.filter(u=>u.slot==='gone').forEach(u=>{S.gold+=sellValue(u);});
    S.units=S.units.filter(u=>u.slot!=='gone');
  }
  // ---- items: rough worth of each item at ★ (bot's own guess), level multiplier as in the item numbers ----
  const IV={glass:10,overclock:9,tesla:7,extralife:7,crest:7,hollow:7,energy:6,battery:6,kevlar:5,fangs:5,flare:5,plating:4,smoke:4,spikes:3,scope:12,banner:12,coin:6,ledger:4,stage:9,teamup:4,residuals:4,slowburn:5,extras:7,understudy:6}; // v19.6 items
  const LM=[0,1,1.5,2];
  function share(r){const f=fielded();return f.length?f.filter(u=>TBASE[HERO[u.id].trait].range===r).length/f.length:.5;}
  function iv(t){
    if(t==='scope')return IV.scope*share('ranged');
    if(t==='banner')return IV.banner*share('melee');
    if(t==='coin')return S.round<=6?6:S.round<=10?3:1;
    if(t==='ledger')return S.rank>=5?0:S.rank>=4?1:4;
    if(t==='stage'){const f=fielded();return IV.stage*(f.length?f.filter(u=>u.slot[0]==='b').length/f.length:.5);}
    if(t==='teamup')return IV.teamup*Object.values(activeSyn(fielded()).X).filter(Boolean).length;
    if(t==='residuals')return Math.min(+TR[t].v[0],new Set(fielded().filter(u=>HERO[u.id].tier>=3).map(u=>u.id)).size)*(S.round<=14?2:1);
    if(t==='extras'){const f=fielded();return IV.extras*(f.length?f.filter(u=>HERO[u.id].crowd).length/f.length:.3);}
    if(t==='understudy')return POL.bench?60:benched().length?IV.understudy:0;
    return IV[t]||0;
  }
  // value of taking offer t (returns [gain, value string for takeTrinket])
  function offerGain(t){
    const L=ilv(t);
    if(L)return [L<ITEM_MAX?iv(t)*(LM[L+1]-LM[L])*(POL.depth||1):-1,t];
    if(S.trinkets.length<TRINKET_CAP)return [iv(t)*(POL.breadth||1),t];
    // full: replace the item that loses least; it is sold (🪙1+level, worth ~0.5 a gold) and the new one starts at ★
    let best=null,bg=-1e9;S.trinkets.forEach(o=>{const g=iv(t)*(POL.breadth||1)-iv(o)*LM[ilv(o)]+0.5*itemSellValue(o);if(g>bg){bg=g;best=o;}});
    return [bg,t+'>'+best];
  }
  function chooseItem(ch){
    if(POL.hoard){ // hoarder: level what you have first, else anything new (replacing the weakest)
      const up=ch.find(t=>ilv(t)&&ilv(t)<ITEM_MAX);if(up)return up;
      const o=ch.map(offerGain).sort((a,b)=>b[0]-a[0])[0];return o?o[1]:null;}
    if(POL.grab){ // grabber: any new item first (best by value, replacing the weakest when full), else a level-up; never the gold
      const o=ch.map(offerGain).map(g=>[g[0]+(ilv(g[1].split('>')[0])?0:100),g[1]]).sort((a,b)=>b[0]-a[0])[0];return o?o[1]:null;}
    const o=ch.map(offerGain).sort((a,b)=>b[0]-a[0])[0];
    return o&&o[0]>1.5?o[1]:null; // else 3 gold
  }
  function sellUseless(){ // between fights: sell items that can't help this board (only when a slot is useful)
    if(TUNE.noItems||S.trinkets.length>=TRINKET_CAP)return;
    S.trinkets.slice().forEach(t=>{if(iv(t)<=0.5){sellItem(t);BOT.sold=(BOT.sold||0)+1;}});
  }
  function resolvePend(rand){while(S.pending.length){const p=S.pending[0];
    if(p.kind==='legend'){const ch=legendChoices().filter(l=>l!=='indie'||FORCE_LEG==='indie');S.pending.shift();
      if(!rand&&POL.hoard&&!POL.keepLeg&&p.win){const r=trinketChoices(3,true)[0];if(r){takeTrinket(chooseItem([r])||r);continue;}}
      let v=rand?ch[Math.floor(Math.random()*ch.length)]:(FORCE_LEG||ch[0]);
      if(!rand&&POL.smart&&!FORCE_LEG){const opts=ch.concat(S.legend?[S.legend]:[]);v=opts.sort((a,b)=>(LEGV[b]||0)-(LEGV[a]||0))[0];}
      if(v){S.legend=v;BOT.legs=(BOT.legs||[]).concat(v);if(POL.smart&&LEGP[v]&&POLICIES[LEGP[v]]){POL=Object.assign({},POLICIES[LEGP[v]],{smart:true});}}continue;}
    const ch=trinketChoices(p.level,false);S.pending.shift();takeTrinket(botItem(ch,rand));}}
  // the value passed to takeTrinket for an offer list (id, 'new>old', or null = 3 gold); counts what kind of pick it was
  function botItem(ch,rand){
    let v;
    if(rand){const t=ch[Math.floor(Math.random()*ch.length)];const full=t&&!ilv(t)&&S.trinkets.length>=TRINKET_CAP;v=t?(full?t+'>'+pick(S.trinkets):t):null;}
    else if(POL.oldItems)v=ch.find(t=>TR[t].rar==='R'&&!ilv(t))||ch.find(t=>!ilv(t))||null; // v8 behaviour: never levels, never replaces
    else v=chooseItem(ch);
    const id=v&&v.split('>')[0];
    const k=!id?'gold':v.includes('>')?'repl':ilv(id)?'up':S.trinkets.length>=TRINKET_CAP?'gold':'new';
    BOT.kinds[k]=(BOT.kinds[k]||0)+1;if(ch.some(t=>ilv(t)))BOT.kinds.upOffered=(BOT.kinds.upOffered||0)+1;
    return v;
  }
  function greedyShop(){
    const r=S.round;
    // rank curves reach full rank in Act 3 (round ~17); Act 4 (rounds 22-28 since v19) is played at full strength
    const rs=r;
    const rankTarget=POL.target(rs);
    let guard=0;
    // the bank: from round 3 keep gold toward the interest target (POL.econ), except on boss rounds or with few lives left
    const cr=(typeof curRound==='function'&&curRound())||{};const bank=(r>=3&&((cr.type!=='boss'&&S.lives>4)||POL.keepAlways))?((typeof POL.econ==='function'?POL.econ(r):POL.econ)||0):0;
    // reroll comp (TFT 'hyper-roll'): until POL.rollUntil, chase ★★★ on characters of rarity POL.rollTier you already hold:
    // buy only copies of those (or anything while the board has room), and spend every gold on rerolls
    if(POL.rollUntil&&rs<POL.rollUntil){let g2=0;
      while(g2++<80){resolvePend(false);
        if(wantTrain(rankTarget,0)){doTrain();continue;}
        const own=id=>S.units.filter(u=>u.id===id).reduce((t,u)=>t+COPIES[u.level-1],0);
        const room=fielded().length<boardSize()||benched().length<BENCH;
        // commit to the two cheap characters with the most copies (TFT reroll comps chase 2-3 three-stars)
        const RT=POL.rollTier||1,tg=[...new Set(S.units.map(u=>u.id))].filter(id=>HERO[id].tier===RT&&own(id)<6).sort((a,b)=>own(b)-own(a)).slice(0,2);
        let bi=-1,bv=-1;S.shop.forEach((o,i)=>{if(!o||!canBuy(i).ok)return;const c=own(o.id),isT=HERO[o.id].tier===RT;
          const v=isT&&c<6&&(tg.includes(o.id)||tg.length<2)?10+c:(fielded().length<boardSize()?1+HERO[o.id].tier:-1);if(v>bv){bv=v;bi=i;}});
        if(bi>=0&&bv>0&&S.gold>=shopPrice(S.shop[bi])&&(room||bv>=10)){buy(bi);continue;}
        if(S.freeRerolls>0||S.gold>=rerollCost()){reroll();continue;}
        break;}
      resolvePend(false);sellUseless();arrange();return;}
    // lose-streak plan: until POL.throwTo keep only 2 on the board and bank everything (boss rounds excepted)
    if(POL.throwTo&&r<POL.throwTo&&cr.type!=='boss'&&fielded().length>=2){resolvePend(false);sellUseless();arrange();return;}
    while(guard++<60){
      resolvePend(false);
      if(wantTrain(rankTarget,bank)){doTrain();continue;}
      // buy best
      let best=-1,bs=-1;const sells={};
      S.shop.forEach((o,i)=>{if(!o)return;const cb=canBuy(i);if(!cb.ok&&cb.why!=='Bench full')return;const owned=S.units.filter(u=>u.id===o.id);let s=score(o.id)+owned.length*POL.ownW+(o.level===2&&owned.length?15:0);if(POL.maxTier&&HERO[o.id].tier>POL.maxTier)s=-1;
        if(!cb.ok){
          const lone=benched().filter(u=>u.level===1&&S.units.filter(x=>x.id===u.id).length===1).sort((a,b)=>score(a.id)-score(b.id))[0];
          if(lone&&s>score(lone.id)+4&&S.gold+sellValue(lone)>=shopPrice(o))sells[i]=lone;else if(POL.benchTier){const w=benched().slice().sort((a,b)=>HERO[a.id].tier-HERO[b.id].tier||a.level-b.level)[0];if(w&&HERO[o.id].tier>HERO[w.id].tier&&w.level===1&&S.gold+sellValue(w)>=shopPrice(o)){sells[i]=w;s+=10;}else s=-1;}else s=-1;
        }
        if(s>bs){bs=s;best=i;}});
      const bo=best>=0?S.shop[best]:null,merge=bo&&S.units.filter(u=>u.id===bo.id&&u.level===1).length>=2,need=fielded().length<(POL.fieldCap&&S.legend==='indie'?Math.min(boardSize(),POL.fieldCap):boardSize())||(((POL.bench&&S.trinkets.includes('understudy'))||POL.fillAlways||(POL.benchGenre&&S.legend==='extuniv'))&&benched().length<(POL.benchGenre?3:BENCH));
      if(best>=0&&(bs>=6||need)&&S.gold+(sells[best]?sellValue(sells[best]):0)>=shopPrice(bo)&&(need||merge||S.gold-shopPrice(bo)>=bank)){if(sells[best])sell(sells[best].uid);buy(best);continue;}
      if((S.freeRerolls>0||S.gold>=rerollCost()+Math.max(bank,r>=3?POL.keep:0))&&!(S.rank<rankTarget&&tCost()!=null)){reroll();continue;}
      break;
    }
    // trim bench: sell lowest if bench full and no pair
    resolvePend(false);sellUseless();
    arrange();
  }
  function randomShop(){
    let guard=0;
    while(guard++<40){
      resolvePend(true);
      const act=Math.random();
      if(act<.1&&tCost()!=null&&S.gold>=tCost()){doTrain();continue;}
      const buyable=S.shop.map((o,i)=>i).filter(i=>S.shop[i]&&canBuy(i).ok);
      if(act<.75&&buyable.length){buy(buyable[Math.floor(Math.random()*buyable.length)]);continue;}
      if(act<.85&&S.gold>=rerollCost()){reroll();continue;}
      break;
    }
    resolvePend(true);
    // random placement: put random units on board
    const all=S.units.slice().sort(()=>Math.random()-.5);
    const slots=['f0','f1','f2','b0','b1','b2'].sort(()=>Math.random()-.5).slice(0,boardSize());
    S.units.forEach(u=>u.slot='x');
    all.forEach((u,i)=>u.slot=i<slots.length?slots[i]:(benchSlots[i-slots.length]||'gone'));
    S.units.filter(u=>u.slot==='gone').forEach(u=>{S.gold+=sellValue(u);});
    S.units=S.units.filter(u=>u.slot!=='gone');
  }
  function fight(){
    startBattle(true);
    let g=0;while(!B.done&&g++<30000)step(DT);
    const t=B.t;const res=settle();
    return {res,t};
  }
  function run(kind,story,focus,leg,pol){
    FOCUS=focus||null;FORCE_LEG=leg||null;POL=POLICIES[pol||'balanced'];BOT.legs=[];BOT.sold=0;BOT.kinds={};BOT.subs=0;BOT.fts=0;BOT.bfull=0;BOT.uhad=0;
    // test hook: TUNE.only = one item active all run at TUNE.onlyLv, every other item inert
    if(TUNE.only&&!BOT.ov){BOT.ov=true;const L=TUNE.onlyLv||1;window.lvl=t=>t===TUNE.only?L:0;}
    newRun(!!story);
    if(POL.ufree){if(!S.trinkets.includes('understudy'))S.trinkets.push('understudy');S.tlv=S.tlv||{};S.tlv.understudy=POL.ufree;}
    if(TUNE.freeItem){S.trinkets.push(TUNE.freeItem);S.tlv=S.tlv||{};S.tlv[TUNE.freeItem]=3;}
    const log={fights:[],end:null,lives:[],merges:0,trinkets:0,golds:[]};
    let guard=0;
    while(!S.over&&guard++<80){
      if(S.rank>=5&&!log.r5)log.r5=S.round;
      if(UI.screen==='event'||S.event){
        // The Cut: keep the cast if it can pay, else fight it if lives allow, else let the genre go
        if(S.event&&S.event.cut){const g=S.event.sub.ids[0];if(g&&typeof cutCost==='function'&&S.gold>=cutCost(g))eventSub(g+'+');
          if(!S.event.subDone&&S.lives>TUNE.cutFight+2)eventSub('fight');if(!S.event.subDone)eventSub(null);finishEvent();continue;}
        const opts=S.event.opts;
        const pref=kind==='greedy'?(POL.ev||['recruit','promotion','supply','payday','reinforce','deal']):opts;
        const k=(kind==='greedy'?pref.find(x=>opts.includes(x)):opts[Math.floor(Math.random()*opts.length)])||opts[0];
        eventPick(k);
        if(S.event.sub&&S.event.sub.kind==='choice'){eventSub(null);resolvePend(kind!=='greedy');finishEvent();continue;}
        if(S.event.sub){const ids=S.event.sub.ids;if(S.event.sub.kind==='trinket')eventSub(botItem(ids,kind!=='greedy'));else eventSub(kind==='greedy'?ids.sort((a,b)=>score(b)-score(a))[0]:ids[Math.floor(Math.random()*ids.length)]);}
        resolvePend(kind!=='greedy');
        finishEvent();continue;
      }
      if(kind==='greedy')greedyShop();else randomShop();
      if(!fielded().length){ // must field something
        const u=S.units[0];if(u)u.slot='f1';
      }
      if(ilv('understudy')){BOT.uhad++;if(benched().length>=BENCH)BOT.bfull++;}
      const f=fight();BOT.subs=(BOT.subs||0)+B.units.filter(u=>u.side==='A'&&u.under).length;BOT.fts=(BOT.fts||0)+1;
      log.fights.push({round:S.round,boss:f.res.boss,win:f.res.win,t:+f.t.toFixed(1),board:fielded().length,lv:fielded().map(u=>u.level).join('')});
      log.golds.push(S.gold);
      advanceAfterFight(f.res);
    }
    log.end={r5:log.r5||null,mythic:fielded().some(u=>HERO[u.id].tier===5),epicPlus:fielded().filter(u=>HERO[u.id].tier>=4).length,boardN:fielded().length,genres:new Set(fielded().map(u=>HERO[u.id].genre)).size,goldLeft:S.gold,commonShare:fielded().filter(u=>HERO[u.id].tier<=2).length/Math.max(1,fielded().length),ids:fielded().map(u=>u.id+':'+u.level),leg:S.legend,gen:Object.entries(activeSyn(fielded()).G).filter(e=>e[1]).map(e=>e[0]+e[1]).join(','),tr:Object.entries(activeSyn(fielded()).T).filter(e=>e[1]).map(e=>e[0]+e[1]).join(','),result:S.result,round:S.round,lives:S.lives,wins:S.wins,merges:S.stats.merges,trinkets:S.trinkets.length,ilv:S.trinkets.reduce((a,t)=>a+ilv(t),0),lv3:S.trinkets.filter(t=>ilv(t)>=3).length,isold:BOT.sold,kinds:BOT.kinds,items:S.trinkets.map(t=>t+ilv(t)),rank:S.rank};
    log.legs=BOT.legs||[];    log.subs=BOT.subs;log.fts=BOT.fts;log.ulv=ilv('understudy');log.uhad=BOT.uhad;log.bfull=BOT.bfull;
    return log;
  }
  const BOT={run,sold:0,kinds:{}};return BOT;
})();

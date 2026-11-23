(function(){
"use strict";
const ROOT=document.body.dataset.prefix||"./";
const PAGE=document.body.dataset.page||"overview";
const ENGINE_ID=document.body.dataset.engine||"clone-hero";
const DEFAULT_BOARD=document.body.dataset.board||"FC";
const STORE_KEY="overstrum-pending-submissions-v2";
const $=function(selector,root){return (root||document).querySelector(selector)};
const $$=function(selector,root){return Array.from((root||document).querySelectorAll(selector))};
const ENGINES=[
{id:"clone-hero",name:"Clone Hero",short:"CH",icon:"clone-hero-placeholder.svg",description:"Community charts and custom five-fret records.",games:[["clone-hero","Clone Hero"]]},
{id:"yarg",name:"YARG",short:"YARG",icon:"yarg-placeholder.svg",description:"Yet Another Rhythm Game.",games:[["yarg","YARG"]]},
{id:"gh3",name:"Guitar Hero III",short:"GH3",icon:"gh3-placeholder.svg",description:"Guitar Hero III and Guitar Hero: Aerosmith.",games:[["gh3","Guitar Hero III"],["gh-aerosmith","Aerosmith"]]},
{id:"gh1-2",name:"Guitar Hero 1 & 2",short:"GH1/2",icon:"gh1-2-placeholder.svg",description:"Guitar Hero, Guitar Hero II and Rocks the 80s.",games:[["gh1","Guitar Hero"],["gh2","Guitar Hero II"],["gh80s","Rocks the 80s"]]},
{id:"ghwt-wor",name:"GHWT – Warriors of Rock",short:"WT–WoR",icon:"ghwt-wor-placeholder.svg",description:"World Tour through Warriors of Rock, including the standalone releases.",games:[["gh-world-tour","World Tour"],["gh-metallica","Metallica"],["gh-smash-hits","Smash Hits"],["gh5","Guitar Hero 5"],["gh-van-halen","Van Halen"],["band-hero","Band Hero"],["gh-warriors-of-rock","Warriors of Rock"]]}
];
const GAMES={
"clone-hero":{name:"Clone Hero",short:"CH"},
"yarg":{name:"YARG",short:"YARG"},
"gh1":{name:"Guitar Hero",short:"GH1"},
"gh2":{name:"Guitar Hero II",short:"GH2"},
"gh80s":{name:"Rocks the 80s",short:"80s"},
"gh3":{name:"Guitar Hero III",short:"GH3"},
"gh-aerosmith":{name:"Guitar Hero: Aerosmith",short:"AERO"},
"gh-world-tour":{name:"Guitar Hero World Tour",short:"WT"},
"gh-metallica":{name:"Guitar Hero: Metallica",short:"MET"},
"gh-smash-hits":{name:"Guitar Hero: Smash Hits",short:"HITS"},
"gh5":{name:"Guitar Hero 5",short:"GH5"},
"gh-van-halen":{name:"Guitar Hero: Van Halen",short:"VH"},
"band-hero":{name:"Band Hero",short:"BH"},
"gh-warriors-of-rock":{name:"Guitar Hero: Warriors of Rock",short:"WoR"}
};
const BUNDLED_CHARTS=[{"id":"ch-soulless-6","engine":"clone-hero","game_id":"clone-hero","rank":1,"title":"Soulless 6","artist":"ExileLord","charter":"ExileLord","speed":100,"tags":["Tech / Tapping","Speed / Shred","Endurance"],"first_victor":{"player":"CarnyJared","date":"2021-04-19","video_url":"https://www.youtube.com/watch?v=CRneGN5LYqo"},"victors":[{"player":"CarnyJared","type":"FC","date":"2021-04-19","video_url":"https://www.youtube.com/watch?v=CRneGN5LYqo"}],"bounty":false,"source_url":"https://www.youtube.com/watch?v=CRneGN5LYqo"},{"id":"ch-soulless-5","engine":"clone-hero","game_id":"clone-hero","rank":2,"title":"Soulless 5","artist":"ExileLord","charter":"ExileLord","speed":100,"tags":["Tech / Tapping","Speed / Shred","Endurance"],"first_victor":{"player":"Frif","date":"2019-10-17","video_url":"https://www.youtube.com/watch?v=Y2QIQtb9nlY"},"victors":[{"player":"Frif","type":"FC","date":"2019-10-17","video_url":"https://www.youtube.com/watch?v=Y2QIQtb9nlY"}],"bounty":false,"source_url":"https://www.youtube.com/watch?v=Y2QIQtb9nlY"},{"id":"ch-apathetic-inversions","engine":"clone-hero","game_id":"clone-hero","rank":151,"title":"Apathetic Inversions","artist":"Sidney600","charter":"Sidney600","speed":100,"tags":["Tech / Tapping","Strict Engine"],"first_victor":{"player":"TobeGH3","date":"2012-10","video_url":"https://www.fullcombo.net/songs/24/"},"victors":[{"player":"TobeGH3","type":"FC","date":"2012-10","video_url":"https://www.fullcombo.net/songs/24/"}],"bounty":false,"source_url":"https://www.fullcombo.net/songs/24/"},{"id":"ch-caverns-of-lolwut","engine":"clone-hero","game_id":"clone-hero","rank":152,"title":"Caverns of Lolwut","artist":"Plumato","charter":"Plumato","speed":100,"tags":["Speed / Shred","Strumming / Stamina"],"first_victor":{"player":"DeadShadowGH","date":"2018-10","video_url":"https://www.fullcombo.net/songs/54/"},"victors":[{"player":"DeadShadowGH","type":"FC","date":"2018-10","video_url":"https://www.fullcombo.net/songs/54/"}],"bounty":false,"source_url":"https://www.fullcombo.net/songs/54/"},{"id":"ch-zoidberg-cowboy","engine":"clone-hero","game_id":"clone-hero","rank":null,"title":"Zoidberg the Cowboy","artist":"Schmutz","charter":"Schmutz","speed":100,"tags":["Strumming / Stamina","Endurance"],"first_victor":null,"victors":[],"bounty":true,"source_url":"https://www.fullcombo.net/songs/460/"},{"id":"ch-spacerace","engine":"clone-hero","game_id":"clone-hero","rank":null,"title":"Spacerace","artist":"archwk","charter":"archwk","speed":100,"tags":["Tech / Tapping","Endurance"],"first_victor":null,"victors":[],"bounty":true,"source_url":"https://www.fullcombo.net/songs/950/"},{"id":"ch-supernovae-uber-solo","engine":"clone-hero","game_id":"clone-hero","rank":null,"title":"Supernovae Uber Solo","artist":"archwk","charter":"archwk","speed":100,"tags":["Tech / Tapping","Endurance"],"first_victor":null,"victors":[],"bounty":true,"source_url":"https://www.fullcombo.net/artists/archwk/"},{"id":"ch-supernovae-solo-buffed","engine":"clone-hero","game_id":"clone-hero","rank":null,"title":"Supernovae Solo Buffed","artist":"archwk","charter":"archwk","speed":100,"tags":["Speed / Shred","Tech / Tapping"],"first_victor":null,"victors":[],"bounty":true,"source_url":"https://www.fullcombo.net/artists/archwk/"},{"id":"ch-glacial-storm-5","engine":"clone-hero","game_id":"clone-hero","rank":null,"title":"Glacial Storm 5","artist":"Spunky","charter":"Spunky","speed":100,"tags":["Speed / Shred","Strumming / Stamina"],"first_victor":null,"victors":[],"bounty":true,"source_url":"https://www.fullcombo.net/artists/spunky/"},{"id":"ch-chasing-comets","engine":"clone-hero","game_id":"clone-hero","rank":null,"title":"Chasing Comets","artist":"archwk","charter":"archwk","speed":100,"tags":["Tech / Tapping","Endurance"],"first_victor":null,"victors":[],"bounty":true,"source_url":"https://www.fullcombo.net/artists/archwk/"},{"id":"ch-archwks-hell","engine":"clone-hero","game_id":"clone-hero","rank":null,"title":"ArchWks Hell","artist":"archwk","charter":"archwk","speed":100,"tags":["Endurance","Strict Engine"],"first_victor":null,"victors":[],"bounty":true,"source_url":"https://www.fullcombo.net/artists/archwk/"},{"id":"ch-supernovae","engine":"clone-hero","game_id":"clone-hero","rank":null,"title":"Supernovae","artist":"archwk","charter":"archwk","speed":100,"tags":["Tech / Tapping","Speed / Shred"],"first_victor":null,"victors":[],"bounty":true,"source_url":"https://www.fullcombo.net/artists/archwk/"},{"id":"yarg-vehemence","engine":"yarg","game_id":"yarg","rank":1,"title":"Vehemence","artist":"Reo","charter":"YARG Charting Team","speed":100,"tags":["Tech / Tapping","Strict Engine"],"first_victor":null,"victors":[{"player":"JarheadHME","type":"FC","date":"2026-05-08","video_url":"https://www.youtube.com/watch?v=wqIyMQH4dG4"}],"bounty":false,"source_url":"https://www.youtube.com/watch?v=wqIyMQH4dG4"},{"id":"yarg-tick-tock","engine":"yarg","game_id":"yarg","rank":2,"title":"Tick Tock","artist":"obkatiekat","charter":"YARG Charting Team","speed":100,"tags":["Speed / Shred","Strict Engine"],"first_victor":null,"victors":[{"player":"JarheadHME","type":"FC","date":"2026-05-08","video_url":"https://www.youtube.com/watch?v=wqIyMQH4dG4"}],"bounty":false,"source_url":"https://www.youtube.com/watch?v=wqIyMQH4dG4"},{"id":"yarg-stress","engine":"yarg","game_id":"yarg","rank":3,"title":"Stress","artist":"Jim's Big Ego","charter":"YARG Charting Team","speed":100,"tags":["Strumming / Stamina","Endurance"],"first_victor":null,"victors":[{"player":"JarheadHME","type":"FC","date":"2026-05-08","video_url":"https://www.youtube.com/watch?v=wqIyMQH4dG4"}],"bounty":false,"source_url":"https://www.youtube.com/watch?v=wqIyMQH4dG4"},{"id":"gh12-jordan","engine":"gh1-2","game_id":"gh2","rank":1,"title":"Jordan","artist":"Buckethead","charter":"Harmonix","speed":100,"tags":["Tech / Tapping","Speed / Shred","Strict Engine"],"first_victor":{"player":"HellAshes","date":"2008-01-09","video_url":"https://guitarhero.fandom.com/wiki/Jordan"},"victors":[{"player":"HellAshes","type":"FC","date":"2008-01-09","video_url":"https://guitarhero.fandom.com/wiki/Jordan"}],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Jordan"},{"id":"gh12-bark-at-the-moon","engine":"gh1-2","game_id":"gh1","rank":2,"title":"Bark at the Moon","artist":"Ozzy Osbourne","charter":"Harmonix","speed":100,"tags":["Strumming / Stamina","Speed / Shred"],"first_victor":{"player":"strikebowler585","date":"2008-04-23","video_url":"https://guitarhero.fandom.com/wiki/Bark_at_the_Moon"},"victors":[{"player":"strikebowler585","type":"FC","date":"2008-04-23","video_url":"https://guitarhero.fandom.com/wiki/Bark_at_the_Moon"}],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Bark_at_the_Moon"},{"id":"gh12-hangar-18","engine":"gh1-2","game_id":"gh2","rank":76,"title":"Hangar 18","artist":"Megadeth","charter":"Harmonix","speed":100,"tags":["Tech / Tapping","Speed / Shred"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Hangar_18"},{"id":"gh12-misirlou","engine":"gh1-2","game_id":"gh2","rank":77,"title":"Misirlou","artist":"Dick Dale","charter":"Harmonix","speed":100,"tags":["Strumming / Stamina","Endurance"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Misirlou"},{"id":"gh12-free-bird","engine":"gh1-2","game_id":"gh2","rank":151,"title":"Free Bird","artist":"Lynyrd Skynyrd","charter":"Harmonix","speed":100,"tags":["Endurance","Tech / Tapping"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Free_Bird"},{"id":"gh3-through-fire-flames","engine":"gh3","game_id":"gh3","rank":1,"title":"Through the Fire and Flames","artist":"DragonForce","charter":"Neversoft","speed":100,"tags":["Speed / Shred","Endurance","Tech / Tapping"],"first_victor":{"player":"Chris Chike","date":"2008-06-03","video_url":"https://www.iamchris4life.com/"},"victors":[{"player":"Chris Chike","type":"FC","date":"2008-06-03","video_url":"https://www.iamchris4life.com/"}],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Through_the_Fire_and_Flames"},{"id":"gh3-devil-went-down","engine":"gh3","game_id":"gh3","rank":2,"title":"The Devil Went Down to Georgia","artist":"The Charlie Daniels Band","charter":"Neversoft","speed":100,"tags":["Strumming / Stamina","Endurance"],"first_victor":{"player":"GuitarHeroPhenom","date":"2008-12-16","video_url":"https://www.youtube.com/watch?v=ixvNiuJk4To"},"victors":[{"player":"GuitarHeroPhenom","type":"FC","date":"2008-12-16","video_url":"https://www.youtube.com/watch?v=ixvNiuJk4To"}],"bounty":false,"source_url":"https://www.xboxachievements.com/forum/topic/95556-the-devil-went-down-to-georgia-fc/"},{"id":"gh3-one","engine":"gh3","game_id":"gh3","rank":76,"title":"One","artist":"Metallica","charter":"Neversoft","speed":100,"tags":["Tech / Tapping","Strumming / Stamina"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/One"},{"id":"gh3-raining-blood","engine":"gh3","game_id":"gh3","rank":77,"title":"Raining Blood","artist":"Slayer","charter":"Neversoft","speed":100,"tags":["Strumming / Stamina","Speed / Shred"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Raining_Blood"},{"id":"gh3-cliffs-of-dover","engine":"gh3","game_id":"gh3","rank":151,"title":"Cliffs of Dover","artist":"Eric Johnson","charter":"Neversoft","speed":100,"tags":["Tech / Tapping","Speed / Shred"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Cliffs_of_Dover"},{"id":"gh3-aerosmith-train-kept","engine":"gh3","game_id":"gh-aerosmith","rank":152,"title":"Train Kept A-Rollin'","artist":"Aerosmith","charter":"Neversoft","speed":100,"tags":["Strumming / Stamina","Endurance"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Train_Kept_A-Rollin%27"},{"id":"ghw-dyers-eve","engine":"ghwt-wor","game_id":"gh-metallica","rank":1,"title":"Dyer's Eve","artist":"Metallica","charter":"Neversoft","speed":100,"tags":["Speed / Shred","Strumming / Stamina","Endurance"],"first_victor":{"player":"JLC","date":"2009-09-14","video_url":"https://www.youtube.com/watch?v=TaybrSJcAso"},"victors":[{"player":"JLC","type":"FC","date":"2009-09-14","video_url":"https://www.youtube.com/watch?v=TaybrSJcAso"}],"bounty":false,"source_url":"https://www.youtube.com/watch?v=TaybrSJcAso"},{"id":"ghw-fury-of-the-storm","engine":"ghwt-wor","game_id":"gh-warriors-of-rock","rank":2,"title":"Fury of the Storm","artist":"DragonForce","charter":"Neversoft","speed":100,"tags":["Tech / Tapping","Speed / Shred","Endurance"],"first_victor":null,"victors":[{"player":"A Wise Moose","type":"FC","date":"2018-08-14","video_url":"https://www.youtube.com/watch?v=7UVjx9OhwMg"}],"bounty":false,"source_url":"https://www.youtube.com/watch?v=7UVjx9OhwMg"},{"id":"ghw-black-widow","engine":"ghwt-wor","game_id":"gh-warriors-of-rock","rank":3,"title":"Black Widow of La Porte","artist":"John 5 ft. Jim Root","charter":"Neversoft","speed":100,"tags":["Tech / Tapping","Speed / Shred"],"first_victor":null,"victors":[{"player":"GuitarHeroPhenom","type":"FC","date":"2012-11-17","video_url":"https://www.youtube.com/watch?v=MXmD7AzCNKU"},{"player":"A Wise Moose","type":"FC","date":"2019-04-19","video_url":"https://www.youtube.com/watch?v=keW_yskjRFU"}],"bounty":false,"source_url":"https://www.youtube.com/watch?v=MXmD7AzCNKU"},{"id":"ghw-satch-boogie","engine":"ghwt-wor","game_id":"gh-world-tour","rank":76,"title":"Satch Boogie","artist":"Joe Satriani","charter":"Neversoft","speed":100,"tags":["Tech / Tapping","Speed / Shred"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Satch_Boogie"},{"id":"ghw-sudden-death","engine":"ghwt-wor","game_id":"gh-warriors-of-rock","rank":77,"title":"Sudden Death","artist":"Megadeth","charter":"Neversoft","speed":100,"tags":["Speed / Shred","Strumming / Stamina"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/Sudden_Death"},{"id":"ghw-21st-century","engine":"ghwt-wor","game_id":"gh5","rank":151,"title":"21st Century Schizoid Man","artist":"King Crimson","charter":"Neversoft","speed":100,"tags":["Strumming / Stamina","Endurance"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/21st_Century_Schizoid_Man"},{"id":"ghw-this-day-we-fight","engine":"ghwt-wor","game_id":"gh-warriors-of-rock","rank":152,"title":"This Day We Fight!","artist":"Megadeth","charter":"Neversoft","speed":100,"tags":["Speed / Shred","Strumming / Stamina"],"first_victor":null,"victors":[],"bounty":false,"source_url":"https://guitarhero.fandom.com/wiki/This_Day_We_Fight!"}];
let charts=BUNDLED_CHARTS.slice();
let pending=readPending();
let activeEngine=ENGINE_ID;
let profileOpen=false;
function esc(value){return String(value==null?"":value).replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]})}
function safeHttp(value){return typeof value==="string"&&/^https?:\/\//i.test(value)}
function engineFor(id){return ENGINES.find(function(engine){return engine.id===id})||ENGINES[0]}
function enginePath(id){return ROOT+id+"/"}
function asset(path){return ROOT+"assets/"+path}
function readPending(){try{const parsed=JSON.parse(localStorage.getItem(STORE_KEY)||"[]");return Array.isArray(parsed)?parsed:[]}catch(error){return []}}
function normalDate(value){if(!value)return "Date not recorded";if(/^\d{4}-\d{2}$/.test(value))return value;return value}
function victorList(chart){
 const list=Array.isArray(chart.victors)?chart.victors.slice():[];
 if(chart.first_victor&&!list.some(function(v){return v.player===chart.first_victor.player&&v.type==="FC"})){
  list.unshift({player:chart.first_victor.player,type:"FC",date:chart.first_victor.date,video_url:chart.first_victor.video_url});
 }
 return list;
}
function basePoints(rank){
 if(!Number.isFinite(Number(rank)))return 0;
 rank=Number(rank);
 if(rank>=1&&rank<=75)return 350-((rank-1)*250/74);
 if(rank>=76&&rank<=150)return 99-((rank-76)*89/74);
 return 0;
}
function pointsFor(chart,player){
 const base=basePoints(chart.rank);
 if(!base)return 0;
 return base+(chart.first_victor&&chart.first_victor.player===player?base*.1:0);
}
function formatPoints(value){return Number(value||0).toFixed(1)}
function rankLabel(rank){return rank==null?"OPEN":"#"+rank}
function tierFor(chart){
 if(chart.rank==null)return "bounty";
 if(chart.rank<=75)return "main";
 if(chart.rank<=150)return "extended";
 return "legacy";
}
function tierLabel(tier){
 return tier==="main"?"Main List":tier==="extended"?"Extended List":tier==="legacy"?"Legacy List":"Open Bounties";
}
function proofLink(url,label){
 if(!safeHttp(url))return "";
 const external=new URL(url);
 const text=label||(external.hostname.indexOf("youtube.com")>=0||external.hostname==="youtu.be"?"▶ Proof":"↗ Record");
 return '<a class="proof-link" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+text+'</a>';
}
function playerButton(name){return '<button class="player-link" type="button" data-player="'+esc(name)+'">'+esc(name)+'</button>'}
function engineTabs(active){
 return '<nav class="engine-switcher" aria-label="Choose an engine">'+ENGINES.map(function(engine){
  return '<a href="'+enginePath(engine.id)+'" class="'+(engine.id===active?"active":"")+'" '+(engine.id===active?'aria-current="page"':'')+'><img src="'+asset("img/engines/"+engine.icon)+'" alt=""><span>'+esc(engine.name)+'</span></a>';
 }).join("")+'</nav>';
}
function gameIcon(gameId){
 const meta=GAMES[gameId]||{name:gameId,short:gameId};
 return '<img src="'+asset("img/games/"+gameId+"/icon.png")+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">';
}
function showPageTitle(kicker,title,description,action){
 return '<div class="page-heading"><div><div class="page-kicker">'+esc(kicker)+'</div><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></div>'+(action||"")+'</div>';
}
function playerCounts(source){
 const map=new Map();
 source.forEach(function(chart){
  if(chart.status==="pending")return;
  victorList(chart).forEach(function(v){
   if(!v.player)return;
   const item=map.get(v.player)||{name:v.player,points:0,fc:0,pass:0,firsts:0,records:[]};
   if(v.type==="FC"){
    item.fc++;
    item.points+=pointsFor(chart,v.player);
    if(chart.first_victor&&chart.first_victor.player===v.player)item.firsts++;
   }else if(v.type==="Pass"){item.pass++}
   item.records.push({chart:chart,victor:v});
   map.set(v.player,item);
  });
 });
 return Array.from(map.values()).sort(function(a,b){return b.points-a.points||b.fc-a.fc||a.name.localeCompare(b.name)});
}
function getChartFirst(chart){
 if(chart.first_victor)return chart.first_victor;
 return null;
}
function rowFirstVictor(chart){
 const first=getChartFirst(chart);
 if(first){
  return '<div class="first-victor-cell"><span class="first-victor-copy"><span class="first-label">First:</span> '+playerButton(first.player)+'</span>'+proofLink(first.video_url)+'</div>';
 }
 const any= victorList(chart).find(function(v){return v.type==="FC"});
 if(any){
  return '<div class="first-victor-cell"><span class="first-victor-copy"><span class="first-label">First FC:</span> not confirmed · '+playerButton(any.player)+'</span>'+proofLink(any.video_url)+'</div>';
 }
 return '<div class="first-victor-cell"><span class="first-victor-copy">First FC not recorded</span></div>';
}
function chartRow(chart,expanded,board){
 const r=chart.rank;
 const rankClass=r===1?"rank-1":r===2?"rank-2":r===3?"rank-3":"";
 const point=basePoints(r);
 const tags=(chart.tags||[]).slice(0,2).map(function(tag){return '<span class="skill-tag">'+esc(tag)+'</span>'}).join("");
 const speed=Number(chart.speed||100)!==100?'<span class="speed-badge">'+Number(chart.speed)+'%</span>':"";
 const game=(GAMES[chart.game_id]||{name:chart.game_id}).name;
 const rowId="chart-"+chart.id;
 return '<div class="chart-entry">'+
  '<div class="chart-row'+(expanded?" expanded":"")+'" role="button" tabindex="0" data-chart-id="'+esc(chart.id)+'" aria-controls="'+rowId+'" aria-expanded="'+String(expanded)+'">'+
   '<div class="rank '+rankClass+'">'+rankLabel(r)+'</div>'+
   '<div class="chart-main"><div class="chart-title-line"><span class="chart-title">'+esc(chart.title)+'</span>'+speed+'</div><div class="chart-subtitle">'+esc(chart.artist)+'<span class="dot">·</span>Charted by '+esc(chart.charter)+'<span class="dot">·</span>'+esc(game)+'</div></div>'+
   rowFirstVictor(chart)+
   '<div class="skill-tags">'+tags+'</div>'+
   '<div class="point-cell"><span class="point-value">'+formatPoints(point)+'</span><span class="point-unit">pts</span></div>'+
  '</div>'+
  '<div class="chart-accordion" id="'+rowId+'" '+(expanded?"":"hidden")+'>'+accordionContent(chart,board)+'</div>'+
 '</div>';
}
function accordionContent(chart,board){
 const victors=victorList(chart);
 const sorted=victors.slice().sort(function(a,b){return String(a.date||"").localeCompare(String(b.date||""))});
 const list=sorted.length?sorted.map(function(v){
  const first=chart.first_victor&&chart.first_victor.player===v.player&&v.type==="FC";
  return '<div class="victor-item"><span class="victor-type '+(v.type==="Pass"?"pass":"")+'">'+esc(v.type||"FC")+'</span>'+playerButton(v.player)+(first?'<span class="victor-date">FIRST VICTOR</span>':"")+'<span class="victor-date">'+esc(normalDate(v.date))+'</span>'+proofLink(v.video_url)+'</div>';
 }).join(""):'<div class="victor-empty">No verified '+(board==="Pass"?"Pass":"FC")+' records have been entered for this chart.</div>';
 const tags=(chart.tags||[]).map(function(tag){return '<span class="skill-tag">'+esc(tag)+'</span>'}).join("");
 const query=new URLSearchParams({engine:chart.engine,game:chart.game_id,song:chart.title,artist:chart.artist,charter:chart.charter,speed:String(chart.speed||100),board:board});
 return '<div class="accordion-grid"><div><h3 class="accordion-heading">Verified victors</h3><div class="victor-list">'+list+'</div></div><div><h3 class="accordion-heading">Chart details</h3><div class="accordion-tags">'+tags+'</div><div class="accordion-actions">'+(safeHttp(chart.source_url)?proofLink(chart.source_url,"↗ Chart source"):"")+'<a class="action-link primary" href="'+ROOT+'submit/?'+query.toString()+'">Submit a record for this chart</a></div></div></div>';
}
function tierCount(engineId,tier,gameId){
 return charts.filter(function(chart){return chart.engine===engineId&&tierFor(chart)===tier&&(gameId==="all"||chart.game_id===gameId)}).length;
}
function renderEnginePage(){
 const engine=engineFor(ENGINE_ID);
 activeEngine=engine.id;
 let selectedTier="main";
 let selectedBoard=DEFAULT_BOARD==="Pass"?"Pass":"FC";
 let selectedGame="all";
 let selectedSkill="all";
 let searchText="";
 let expandedId=null;
 const prefixTitle=engine.id==="gh1-2"?"Guitar Hero 1 & 2":engine.id==="ghwt-wor"?"GHWT – Warriors of Rock":engine.name;
 const gameFilters=engine.games.map(function(pair){return '<button type="button" class="game-filter'+(selectedGame===pair[0]?' active':'')+'" data-game-filter="'+pair[0]+'">'+esc(pair[1])+'</button>'}).join("");
 $("#app").innerHTML=engineTabs(engine.id)+
  '<div class="engine-title-row"><div class="engine-title"><img src="'+asset("img/engines/"+engine.icon)+'" alt=""><div><h1>'+esc(prefixTitle)+'</h1><p class="engine-subtitle">'+esc(engine.description)+'</p></div></div><div class="engine-meta-links"><a href="'+ROOT+'leaderboard/?engine='+engine.id+'">Engine leaderboard ↗</a><a href="'+ROOT+'rules/">Rules ↗</a></div></div>'+
  '<div class="game-filters" id="game-filters"><button type="button" class="game-filter active" data-game-filter="all">All games</button>'+gameFilters+'</div>'+
  '<div class="list-toolbar"><div class="tier-tabs" role="tablist" aria-label="Chart tier"><button type="button" class="tier-tab active" data-tier="main" aria-selected="true">Main <span class="tier-count" data-tier-count="main"></span></button><button type="button" class="tier-tab" data-tier="extended" aria-selected="false">Extended <span class="tier-count" data-tier-count="extended"></span></button><button type="button" class="tier-tab" data-tier="legacy" aria-selected="false">Legacy <span class="tier-count" data-tier-count="legacy"></span></button><button type="button" class="tier-tab" data-tier="bounty" aria-selected="false">Open Bounties <span class="tier-count" data-tier-count="bounty"></span></button></div>'+
  '<div class="board-tabs" role="tablist" aria-label="Record board"><button type="button" class="board-tab active" data-board="FC" aria-selected="true">FC List</button><button type="button" class="board-tab" data-board="Pass" aria-selected="false">Pass List</button></div>'+
  '<input class="search-input" id="chart-search" type="search" placeholder="Search songs, artists, charters or players…" aria-label="Search charts">'+
  '<select class="skill-filter" id="skill-filter" aria-label="Filter by skillset"><option value="all">All skillsets</option><option>Tech / Tapping</option><option>Speed / Shred</option><option>Strumming / Stamina</option><option>Endurance</option><option>Strict Engine</option></select></div>'+
  '<div class="list-context"><span id="list-summary"></span><span id="list-count"></span></div>'+
  '<div class="top-chart" id="top-chart"></div>'+
  '<div class="table-head"><span>Rank</span><span>Chart / Song</span><span>First victor & proof</span><span>Skillsets</span><span class="align-right">Points</span></div>'+
  '<section class="chart-list" id="chart-list" aria-live="polite"></section>'+
  '<p class="list-footer-note">Main and Extended points are calculated from chart rank. First Victors receive a 10% bonus. Legacy records and Open Bounties award no points.</p>';
 const paint=function(){
  const q=searchText.toLowerCase();
  const source=charts.filter(function(chart){
   if(chart.engine!==engine.id)return false;
   if(selectedGame!=="all"&&chart.game_id!==selectedGame)return false;
   if(tierFor(chart)!==selectedTier)return false;
   if(selectedTier!=="bounty"&&selectedBoard==="Pass"&&!victorList(chart).some(function(v){return v.type==="Pass"}))return false;
   if(selectedBoard==="FC"&&selectedTier==="bounty"&&chart.rank!==null)return false;
   if(selectedTier==="bounty"&&!chart.bounty)return false;
   if(selectedSkill!=="all"&&!(chart.tags||[]).includes(selectedSkill))return false;
   const hay=[chart.title,chart.artist,chart.charter,chart.game_id].concat(victorList(chart).map(function(v){return v.player})).join(" ").toLowerCase();
   return hay.includes(q);
  }).sort(function(a,b){if(a.rank==null)return 1;if(b.rank==null)return -1;return a.rank-b.rank});
  if(!source.some(function(chart){return chart.id===expandedId}))expandedId=null;
  $("#list-count").textContent=source.length+" charts";
  $("#list-summary").innerHTML='<strong>'+esc(tierLabel(selectedTier))+'</strong> · '+selectedBoard+" board";
  $("#chart-list").innerHTML=source.length?source.map(function(chart){return chartRow(chart,chart.id===expandedId,selectedBoard)}).join(""):'<div class="empty-list">No charts match these filters yet.</div>';
  $$("[data-tier-count]").forEach(function(node){node.textContent=tierCount(engine.id,node.dataset.tier,selectedGame)||""});
  const top=selectedTier==="main"&&selectedBoard==="FC"?charts.filter(function(chart){return chart.engine===engine.id&&chart.rank===1&&chart.game_id&&(selectedGame==="all"||chart.game_id===selectedGame)}).sort(function(a,b){return a.title.localeCompare(b.title)})[0]:null;
  if(selectedTier!=="main"||selectedBoard!=="FC"){$("#top-chart").hidden=true}
  else if(top){
   const first=top.first_victor?top.first_victor.player:"First FC not confirmed";
   $("#top-chart").innerHTML='<span class="top-chart-rank">#1</span><div class="top-chart-copy"><strong>'+esc(top.title)+'</strong><span>'+esc(top.artist)+' · First victor: '+esc(first)+'</span></div><span class="top-chart-score">'+formatPoints(basePoints(top.rank))+' pts</span><a href="#chart-list" class="top-chart-link" data-jump-chart="'+esc(top.id)+'">View chart ↓</a>';
   $("#top-chart").hidden=false;
  }else{
   $("#top-chart").innerHTML='<span class="top-chart-rank">#1</span><div class="top-chart-copy"><strong>No #1 chart is ranked yet</strong><span>Accepted records will appear here after ranking.</span></div>';
   $("#top-chart").hidden=false;
  }
 };
 $("#game-filters").addEventListener("click",function(event){
  const button=event.target.closest("[data-game-filter]");if(!button)return;
  selectedGame=button.dataset.gameFilter;
  $$("[data-game-filter]").forEach(function(item){item.classList.toggle("active",item===button)});
  expandedId=null;paint();
 });
 $$(".tier-tab").forEach(function(button){button.addEventListener("click",function(){
  selectedTier=button.dataset.tier;
  $$(".tier-tab").forEach(function(item){const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-selected",String(active))});
  expandedId=null;paint();
 })});
 $$(".board-tab").forEach(function(button){button.addEventListener("click",function(){
  selectedBoard=button.dataset.board;
  $$(".board-tab").forEach(function(item){const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-selected",String(active))});
  expandedId=null;paint();
 })});
 $("#chart-search").addEventListener("input",function(event){searchText=event.target.value;paint()});
 $("#skill-filter").addEventListener("change",function(event){selectedSkill=event.target.value;paint()});
 $("#chart-list").addEventListener("click",function(event){
  const row=event.target.closest("[data-chart-id]");
  if(!row||event.target.closest("a,button"))return;
  expandedId=expandedId===row.dataset.chartId?null:row.dataset.chartId;paint();
 });
 $("#chart-list").addEventListener("keydown",function(event){
  if(event.key!=="Enter"&&event.key!==" ")return;
  const row=event.target.closest("[data-chart-id]");if(!row)return;
  event.preventDefault();expandedId=expandedId===row.dataset.chartId?null:row.dataset.chartId;paint();
 });
 $("#top-chart").addEventListener("click",function(event){
  const link=event.target.closest("[data-jump-chart]");if(!link)return;
  event.preventDefault();selectedTier="main";selectedBoard="FC";expandedId=link.dataset.jumpChart;
  $$(".tier-tab").forEach(function(b){const active=b.dataset.tier==="main";b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active))});
  $$(".board-tab").forEach(function(b){const active=b.dataset.board==="FC";b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active))});
  paint();
  const row=$('[data-chart-id="'+CSS.escape(expandedId)+'"]');if(row)row.scrollIntoView({block:"center",behavior:"smooth"});
 });
 if(DEFAULT_BOARD==="Pass"){$$('.board-tab[data-board="Pass"]')[0].click()}
 paint();
}
function getPlayerRecord(name,source){
 const result={name:name,points:0,fc:[],pass:[],firsts:[]};
 source.forEach(function(chart){
  victorList(chart).forEach(function(v){
   if(v.player!==name)return;
   if(v.type==="FC"){
    result.fc.push({chart:chart,victor:v});
    result.points+=pointsFor(chart,name);
    if(chart.first_victor&&chart.first_victor.player===name)result.firsts.push(chart);
   }else if(v.type==="Pass"){result.pass.push({chart:chart,victor:v})}
  });
 });
 return result;
}
function renderLeaderboard(){
 let active="all";
 const params=new URLSearchParams(location.search);
 if(ENGINES.some(function(engine){return engine.id===params.get("engine")}))active=params.get("engine");
 $("#app").innerHTML=showPageTitle("PLAYER RANKINGS","Leaderboard","Scores are kept separately for each engine. Combined totals are available only in this view.")+
  '<nav class="leaderboard-tabs" aria-label="Leaderboard engine">'+
  '<button class="leaderboard-tab active" data-leaderboard-engine="all" type="button">Combined / Multi-Engine</button>'+
  ENGINES.map(function(engine){return '<button class="leaderboard-tab" data-leaderboard-engine="'+engine.id+'" type="button">'+esc(engine.name)+'</button>'}).join("")+'</nav>'+
  '<div class="leaderboard-tools"><p id="leaderboard-description"></p><span class="num" id="leaderboard-total"></span></div>'+
  '<div class="leaderboard-table-wrap"><table class="leaderboard-table"><thead><tr><th>Rank</th><th>Player</th><th class="align-right">Total points</th><th>Hardest FC</th><th class="align-right">Total FCs</th><th class="align-right">First Victor count</th></tr></thead><tbody id="leaderboard-body"></tbody></table></div>'+
  '<p class="table-note">Only verified FC records in Main and Extended tiers score points. First Victor bonus: +10% of the chart base score. Passes are recorded but do not add points. Legacy and Open Bounty records are worth 0 points.</p>';
 const paint=function(){
  const source=active==="all"?charts:charts.filter(function(chart){return chart.engine===active});
  const players=playerCounts(source).map(function(player){
   const fcs=[];
   player.records.forEach(function(item){
    if(item.victor.type==="FC"&&item.chart.rank!=null)fcs.push(item.chart);
   });
   fcs.sort(function(a,b){return (a.rank||9999)-(b.rank||9999)});
   player.hardest=fcs[0]||null;
   return player;
  });
  $("#leaderboard-description").textContent=active==="all"?"Combined points across all five independent engine lists.":engineFor(active).name+" points only. No other engine is included.";
  $("#leaderboard-total").textContent=players.length+" players";
  $("#leaderboard-body").innerHTML=players.length?players.map(function(player,index){
   const hardest=player.hardest?engineFor(player.hardest.engine).short+" "+rankLabel(player.hardest.rank):"—";
   return '<tr><td class="leaderboard-rank '+(index===0?"top1":index===1?"top2":index===2?"top3":"")+'">'+String(index+1).padStart(2,"0")+'</td><td><div class="player-cell"><span class="avatar">'+esc(player.name.slice(0,1).toUpperCase())+'</span>'+playerButton(player.name)+'</div></td><td class="align-right num">'+formatPoints(player.points)+'</td><td class="hardest-cell">'+esc(hardest)+'</td><td class="align-right num">'+player.fc+'</td><td class="align-right num">'+player.firsts+'</td></tr>';
  }).join(""):'<tr><td colspan="6" class="empty-list">No verified player records for this board yet.</td></tr>';
  $$(".leaderboard-tab").forEach(function(button){const chosen=button.dataset.leaderboardEngine===active;button.classList.toggle("active",chosen);button.setAttribute("aria-pressed",String(chosen))});
 };
 $$(".leaderboard-tab").forEach(function(button){button.addEventListener("click",function(){
  active=button.dataset.leaderboardEngine;
  const query=new URLSearchParams();if(active!=="all")query.set("engine",active);
  history.replaceState({}, "",location.pathname+(query.toString()?"?"+query.toString():""));
  paint();
 })});
 paint();
}
function showProfile(name){
 const profile=getPlayerRecord(name,charts);
 const engineStats=ENGINES.map(function(engine){
  const points=profile.fc.filter(function(item){return item.chart.engine===engine.id}).reduce(function(total,item){return total+pointsFor(item.chart,name)},0);
  const fcs=profile.fc.filter(function(item){return item.chart.engine===engine.id}).length;
  return {engine:engine,points:points,fcs:fcs};
 }).filter(function(item){return item.fcs>0});
 const fcRows=profile.fc.slice().sort(function(a,b){
  const ea=ENGINES.findIndex(function(e){return e.id===a.chart.engine});
  const eb=ENGINES.findIndex(function(e){return e.id===b.chart.engine});
  return ea-eb||(Number(a.chart.rank)||9999)-(Number(b.chart.rank)||9999);
 });
 const body='<div class="profile-stats"><div class="profile-stat"><span>Total points</span><strong>'+formatPoints(profile.points)+'</strong></div><div class="profile-stat"><span>Verified FCs</span><strong>'+profile.fc.length+'</strong></div><div class="profile-stat"><span>First Victors</span><strong>'+profile.firsts.length+'</strong></div><div class="profile-stat"><span>Passes</span><strong>'+profile.pass.length+'</strong></div></div>'+
  '<h3 class="profile-section-title">Engine totals</h3>'+
  (engineStats.length?engineStats.map(function(item){return '<div class="profile-record"><strong>'+esc(item.engine.name)+'</strong><span>'+item.fcs+' FCs</span><span>'+formatPoints(item.points)+' pts</span></div>'}).join(""):'<div class="victor-empty">No ranked FCs yet.</div>')+
  '<h3 class="profile-section-title">Verified FCs</h3>'+
  (fcRows.length?fcRows.map(function(item){return '<div class="profile-record"><strong>'+esc(item.chart.title)+' <span>· '+esc(engineFor(item.chart.engine).short)+'</span></strong><span>'+rankLabel(item.chart.rank)+'</span><span>'+formatPoints(pointsFor(item.chart,name))+' pts</span></div>'}).join(""):'<div class="victor-empty">No verified FCs on record.</div>')+
  '<h3 class="profile-section-title">First Victors</h3>'+
  (profile.firsts.length?profile.firsts.map(function(chart){return '<div class="profile-record"><strong>'+esc(chart.title)+'</strong><span>'+esc(engineFor(chart.engine).short)+'</span><span>'+esc(normalDate(chart.first_victor.date))+'</span></div>'}).join(""):'<div class="victor-empty">No first-victor credits yet.</div>');
 $("#modal-root").innerHTML='<div class="profile-modal-backdrop" data-close-profile><section class="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-heading"><header class="profile-modal-header"><div><h2 id="profile-heading">'+esc(name)+'</h2><p>Overstrum player profile</p></div><button class="modal-close" type="button" aria-label="Close profile" data-close-profile>×</button></header><div class="profile-modal-body">'+body+'</div></section></div>';
 profileOpen=true;
 document.body.classList.add("modal-open");
}
function closeProfile(){
 $("#modal-root").innerHTML="";profileOpen=false;document.body.classList.remove("modal-open");
}
function renderOverview(){
 const players=playerCounts(charts);
 const fcTotal=charts.reduce(function(total,chart){return total+victorList(chart).filter(function(v){return v.type==="FC"}).length},0);
 const openTotal=charts.filter(function(chart){return chart.rank==null}).length;
 $("#app").innerHTML=
  '<div class="page-heading"><div><div class="page-kicker">FIVE-FRET DEMONLIST</div><h1>Overstrum</h1><p>Five-fret records, kept honest.</p></div><a class="button" href="'+ROOT+'submit/">Submit a record</a></div>'+
  '<div class="stats-strip"><div class="stat-card"><div class="stat-label">Charts tracked</div><div class="stat-value">'+charts.length+'</div></div><div class="stat-card"><div class="stat-label">Verified FC entries</div><div class="stat-value">'+fcTotal+'</div></div><div class="stat-card"><div class="stat-label">Open bounty charts</div><div class="stat-value">'+openTotal+'</div></div></div>'+
  '<h2 class="section-title">Engine leaders</h2>'+
  '<div class="engine-summary-grid">'+ENGINES.map(function(engine){
   const top=charts.filter(function(chart){return chart.engine===engine.id&&chart.rank===1})[0];
   const count=charts.filter(function(chart){return chart.engine===engine.id}).length;
   return '<a class="engine-summary-card" href="'+enginePath(engine.id)+'"><img src="'+asset("img/engines/"+engine.icon)+'" alt=""><div class="engine-summary-copy"><strong>'+esc(engine.name)+'</strong><span>'+(top?esc(top.title)+" · "+esc(top.artist):"No #1 chart yet")+' · '+count+' charts</span></div><div class="engine-summary-rank"><strong>'+(top?"#1":"—")+'</strong><small>'+ (top?formatPoints(basePoints(1))+" pts":"Unranked")+'</small></div></a>';
  }).join("")+'</div>'+
  '<h2 class="section-title">Recent verified FCs</h2>'+
  '<div class="recent-feed" id="recent-feed">'+recentFeed()+'</div>'+
  '<p class="data-caution">Seed data includes public chart and FC references where available. Some First Victor fields remain unconfirmed and are intentionally left blank. Bounty entries are sourced from charts currently marked undefeated by their public chart archive.</p>';
}
function recentFeed(){
 const items=[];
 charts.forEach(function(chart){
  victorList(chart).forEach(function(v){if(v.type==="FC"&&v.date)items.push({chart:chart,v:v})});
 });
 items.sort(function(a,b){return String(b.v.date).localeCompare(String(a.v.date))});
 return items.slice(0,8).map(function(item){
  return '<div class="recent-item"><span class="recent-date">'+esc(normalDate(item.v.date))+'</span><div class="recent-track"><strong>'+esc(item.chart.title)+'</strong><span>'+esc(item.chart.artist)+' · '+esc(engineFor(item.chart.engine).short)+'</span></div><span class="recent-player">'+playerButton(item.v.player)+'</span><span class="recent-board">FC VERIFIED</span></div>';
 }).join("")||'<div class="empty-list">No dated FC records yet.</div>';
}
function renderGames(){
 $("#app").innerHTML=showPageTitle("ENGINE LISTS","The List","Each engine has its own difficulty ladder and points table. No chart ranks are merged between engines.")+
  '<div class="engine-card-grid">'+ENGINES.map(function(engine){
   const top=charts.filter(function(chart){return chart.engine===engine.id&&chart.rank===1})[0];
   const count=charts.filter(function(chart){return chart.engine===engine.id}).length;
   return '<a class="engine-card" href="'+enginePath(engine.id)+'"><img src="'+asset("img/engines/"+engine.icon)+'" alt=""><div><strong>'+esc(engine.name)+'</strong><span>'+(top?"#1 · "+esc(top.title):"No #1 chart yet")+' · '+count+' charts</span></div></a>';
  }).join("")+'</div>'+
  '<h2 class="section-title">Board structure</h2><p class="data-caution">Main #1–75: 350.0 down to 100.0 points. Extended #76–150: 99.0 down to 10.0 points. Legacy #151+: archived, 0 points. Open Bounties: unranked, 0 points until verified.</p>';
}
function renderSubmit(){
 const params=new URLSearchParams(location.search);
 const requestedEngine=params.get("engine")||"clone-hero";
 const requestedGame=params.get("game")||"";
 const requestedBoard=params.get("board")||"FC";
 const requestedSpeed=params.get("speed")||"100";
 const options=ENGINES.map(function(engine){return '<option value="'+engine.id+'" '+(engine.id===requestedEngine?"selected":"")+'>'+esc(engine.name)+'</option>'}).join("");
 $("#app").innerHTML=showPageTitle("RECORD SUBMISSION","Submit a record","Send the chart, game, board and proof details. This creates a local preview for copying; it does not approve or publish a record.")+
  '<form class="form-card" id="submit-form"><div class="form-grid">'+
  '<div class="form-field"><label for="submit-engine">Engine</label><select id="submit-engine" name="engine" required>'+options+'</select></div>'+
  '<div class="form-field"><label for="submit-game">Game</label><select id="submit-game" name="game_id" required></select></div>'+
  '<div class="form-field"><label for="submit-song">Song / chart title</label><input id="submit-song" name="title" maxlength="120" required placeholder="Chart title" value="'+esc(params.get("song")||"")+'"></div>'+
  '<div class="form-field"><label for="submit-artist">Artist</label><input id="submit-artist" name="artist" maxlength="120" placeholder="Original artist / chart artist" value="'+esc(params.get("artist")||"")+'"></div>'+
  '<div class="form-field"><label for="submit-charter">Charter</label><input id="submit-charter" name="charter" maxlength="80" required placeholder="Chart creator" value="'+esc(params.get("charter")||"")+'"></div>'+
  '<div class="form-field"><label for="submit-speed">Speed (%)</label><input id="submit-speed" name="speed" type="number" min="100" max="300" step="5" value="'+esc(requestedSpeed)+'" required><small>Speed changes must be recorded in 5-point increments.</small></div>'+
  '<div class="form-field"><label for="submit-board">Board</label><select id="submit-board" name="board"><option value="FC" '+(requestedBoard==="FC"?"selected":"")+'>FC</option><option value="Pass" '+(requestedBoard==="Pass"?"selected":"")+'>Pass</option></select></div>'+
  '<div class="form-field"><label for="submit-player">Player name</label><input id="submit-player" name="player" maxlength="48" required placeholder="Your leaderboard name"></div>'+
  '<div class="form-field full"><label for="submit-video">Video proof URL</label><input id="submit-video" name="video_url" type="url" required placeholder="https://youtu.be/…"><small>Keep the full run available for review. The recording must include audible strum clicks or an input viewer.</small></div>'+
  '<div class="form-field full"><label for="submit-tags">Skillset tags</label><select id="submit-tags" name="tags" multiple size="5"><option>Tech / Tapping</option><option>Speed / Shred</option><option>Strumming / Stamina</option><option>Endurance</option><option>Strict Engine</option></select><small>Use Ctrl or Command to select more than one skillset.</small></div>'+
  '</div><div class="form-actions"><button class="button primary" type="submit">Save local preview</button><button class="button" type="button" id="copy-submission" disabled>Copy Submission JSON</button></div><p class="form-status" id="submit-status" aria-live="polite">Your preview stays in this browser until you copy and send it to the moderators.</p><section class="submission-preview" id="submission-preview" hidden><h2>Submission JSON</h2><pre id="submission-json"></pre></section><div class="pending-preview-list" id="pending-preview-list"></div></form>';
 const engineSelect=$("#submit-engine"),gameSelect=$("#submit-game"),form=$("#submit-form");
 let lastPayload=null;
 function syncGames(){
  const engine=engineFor(engineSelect.value);
  gameSelect.innerHTML=engine.games.map(function(pair){return '<option value="'+pair[0]+'">'+esc(pair[1])+'</option>'}).join("");
  if(engine.games.some(function(pair){return pair[0]===requestedGame}))gameSelect.value=requestedGame;
 }
 engineSelect.addEventListener("change",syncGames);
 syncGames();
 form.addEventListener("submit",function(event){
  event.preventDefault();
  const data=new FormData(form);
  const engine=String(data.get("engine"));
  const gameId=String(data.get("game_id"));
  const title=String(data.get("title")||"").trim();
  const artist=String(data.get("artist")||"").trim();
  const charter=String(data.get("charter")||"").trim();
  const player=String(data.get("player")||"").trim();
  const video=String(data.get("video_url")||"").trim();
  const speed=Number(data.get("speed"));
  const board=String(data.get("board"));
  const tags=Array.from(form.querySelector('[name="tags"]').selectedOptions).map(function(option){return option.value});
  const gameAllowed=engineFor(engine).games.some(function(pair){return pair[0]===gameId});
  if(!title||!charter||!player||!safeHttp(video)||!Number.isFinite(speed)||speed<100||speed>300||speed%5!==0||!gameAllowed){
   $("#submit-status").textContent="Check the required fields, proof URL and 5-point speed increment.";
   return;
  }
  lastPayload={
   id:"pending-"+Date.now(),
   engine:engine,
   game_id:gameId,
   rank:null,
   title:title,
   artist:artist,
   charter:charter,
   speed:speed,
   tags:tags,
   first_victor:null,
   victors:[{player:player,type:board,date:new Date().toISOString().slice(0,10),video_url:video}],
   bounty:false,
   status:"pending",
   source_url:video
  };
  pending.unshift(lastPayload);
  try{localStorage.setItem(STORE_KEY,JSON.stringify(pending))}
  catch(error){$("#submit-status").textContent="Local storage is unavailable. You can still copy the JSON below.";pending.shift()}
  $("#submission-json").textContent=JSON.stringify(lastPayload,null,2);
  $("#submission-preview").hidden=false;
  $("#copy-submission").disabled=false;
  $("#submit-status").textContent="Local preview saved. Copy the JSON and send it for moderator review. It has not been verified.";
  paintPending();
 });
 $("#copy-submission").addEventListener("click",function(){
  if(!lastPayload)return;
  copyText(JSON.stringify(lastPayload,null,2),$("#submit-status"),"Submission JSON copied.");
 });
 function paintPending(){
  $("#pending-preview-list").innerHTML=pending.slice(0,5).map(function(item){return '<div class="pending-preview-item"><strong>'+esc(item.title)+'</strong><span>'+esc(engineFor(item.engine).short)+' · '+esc(item.victors[0].type)+' · pending</span></div>'}).join("");
 }
 paintPending();
}
function renderRules(){
 const items=[
  ["01","Engine lists stay separate","Clone Hero, YARG, GH3, GH1–2 and GHWT–WoR each have their own ranking and points ladder. A chart only scores in the engine recorded on its entry."],
  ["02","A five-point minimum speed jump","Speed-based records must move in increments of at least 5 percentage points. For example, 100% → 105% is valid; 100% → 102% is not. The speed setting must be visible in the proof."],
  ["03","Full, continuous video proof","Submit one continuous recording that shows the run and its result screen. The video must include audible strum clicks or a visible input viewer so reviewers can inspect the inputs."],
  ["04","Unmodified timing and inputs","Bots, macros, autoplay, scripted inputs, altered hit windows and timing modifications are not accepted. The run must use the standard timing and input rules of the listed engine."],
  ["05","Exact chart and game details","The title, charter, game release, speed and chart version must match the run. Include a chart source or file hash when one is available."],
  ["06","First Victor and scoring","The earliest accepted FC receives First Victor credit. Passes are tracked but do not score points. Main and Extended FCs score from their rank; First Victors receive an additional 10% of the chart's base points."],
  ["07","Legacy and Open Bounties","Legacy entries remain visible at 0 points. Open Bounties have no verified first FC on the Overstrum list and remain unranked until a moderator accepts the evidence."]
 ];
 $("#app").innerHTML=showPageTitle("RULES","Rules and verification","Plain standards for every five-fret engine. Moderators can request more evidence when a submission is unclear.")+
  '<section class="rules-list">'+items.map(function(item){return '<article class="rule-card"><span class="rule-number">'+item[0]+'</span><div><h2>'+item[1]+'</h2><p>'+item[2]+'</p></div></article>'}).join("")+'</section>'+
  '<p class="data-caution">A submitted record remains pending until a moderator checks the proof and confirms the correct engine, chart and speed. Pending entries do not appear in verified player totals.</p>';
}
function renderCommunity(){
 const players=playerCounts(charts);
 const staff=[{name:"ajxiye",role:"Repository owner / maintainer"}];
 $("#app").innerHTML=showPageTitle("COMMUNITY","Community","Players, record contributors and the people maintaining the archive.")+
  '<div class="community-grid"><section class="community-panel"><h2>Moderators and maintainers</h2><p>'+staff.map(function(person){return '<strong>'+esc(person.name)+'</strong> · '+esc(person.role)}).join("<br>")+'<br><br>No additional moderator names or Overstrum Discord invite are published in the repository yet.</p></section><section class="community-panel"><h2>Contribute a record</h2><p>Share a complete video with input evidence and the exact chart details. New submissions are stored locally and copied as JSON for moderator review.</p><div class="accordion-actions"><a class="action-link primary" href="'+ROOT+'submit/">Submit a record</a><a class="action-link" href="https://github.com/ajxiye/overstrum" target="_blank" rel="noopener noreferrer">View the repository ↗</a></div></section></div>'+
  '<h2 class="section-title">Player directory</h2>'+
  '<div class="directory-list">'+
  '<div class="directory-row"><strong>Player</strong><span class="directory-role">Status</span><span class="directory-number">FCs</span><span class="directory-number">Points</span></div>'+
  players.map(function(player){return '<div class="directory-row"><strong>'+playerButton(player.name)+'</strong><span class="directory-role">Contributor</span><span class="directory-number">'+player.fc+'</span><span class="directory-number">'+formatPoints(player.points)+'</span></div>'}).join("")+
  '</div><p class="data-caution">Directory totals are calculated from verified victor records in the bundled chart data. Community roles are only shown when they have been published by the project maintainers.</p>';
}
function setNavigation(){
 const active=PAGE==="overview"?"overview":(PAGE==="engine"||PAGE==="games")?"list":PAGE;
 $$("[data-nav]").forEach(function(link){const isActive=link.dataset.nav===active;link.classList.toggle("active",isActive);if(isActive)link.setAttribute("aria-current","page")});
 const toggle=$(".menu-toggle");
 const nav=$(".primary-nav");
 if(toggle&&nav)toggle.addEventListener("click",function(){const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
}
function copyText(text,status,message){
 if(navigator.clipboard&&navigator.clipboard.writeText){
  navigator.clipboard.writeText(text).then(function(){if(status)status.textContent=message}).catch(function(){fallback()});
 }else fallback();
 function fallback(){
  const area=document.createElement("textarea");area.value=text;document.body.appendChild(area);area.select();
  try{document.execCommand("copy");if(status)status.textContent=message}catch(error){if(status)status.textContent="Copy failed. Select and copy the JSON manually."}
  area.remove();
 }
}
function bindGlobalActions(){
 document.addEventListener("click",function(event){
  const player=event.target.closest("[data-player]");
  if(player){event.preventDefault();event.stopPropagation();showProfile(player.dataset.player);return}
  const close=event.target.closest("[data-close-profile]");
  if(close&&event.target.closest(".profile-modal-backdrop")&&(!event.target.closest(".profile-modal")||event.target.closest(".modal-close"))){closeProfile();return}
 });
 document.addEventListener("keydown",function(event){if(event.key==="Escape"&&profileOpen)closeProfile()});
}
function render(){
 setNavigation();
 if(PAGE==="overview")renderOverview();
 else if(PAGE==="engine")renderEnginePage();
 else if(PAGE==="games")renderGames();
 else if(PAGE==="leaderboard")renderLeaderboard();
 else if(PAGE==="submit")renderSubmit();
 else if(PAGE==="rules")renderRules();
 else if(PAGE==="community")renderCommunity();
 else renderOverview();
}
function init(){
 bindGlobalActions();
 render();
 const prefix=ROOT+"data/charts.json";
 if(typeof fetch==="function"){
  fetch(prefix,{cache:"no-store"}).then(function(response){if(!response.ok)throw new Error("Chart data unavailable");return response.json()}).then(function(remote){
   if(!Array.isArray(remote))throw new Error("Chart data must be an array");
   charts=remote;
   render();
  }).catch(function(){charts=BUNDLED_CHARTS.slice()});
 }
}
init();
})();
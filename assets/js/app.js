(()=>{
"use strict";
const $=s=>document.querySelector(s);
const route=document.body.dataset.route||"home";
const ROOT_PREFIX=document.body.dataset.rootPrefix||"./";
const engines=[{"id":"clone-hero","name":"Clone Hero","short":"CH","type":"Community engine","year":"2017","youtube":"https://www.youtube.com/@CloneHeroGame","website":"https://clonehero.net/","description":"Community five-fret rhythm game and custom-chart platform.","icon":"assets/img/games/clone-hero/icon.png","logo":"assets/img/games/clone-hero/logo.png"},{"id":"gh1","name":"Guitar Hero","short":"GH1","type":"Guitar Hero","year":"2005","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"The original five-fret Guitar Hero.","icon":"assets/img/games/gh1/icon.png","logo":"assets/img/games/gh1/logo.png"},{"id":"gh2","name":"Guitar Hero II","short":"GH2","type":"Guitar Hero","year":"2006","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"The second mainline Guitar Hero release.","icon":"assets/img/games/gh2/icon.png","logo":"assets/img/games/gh2/logo.png"},{"id":"gh80s","name":"Guitar Hero Encore: Rocks the 80s","short":"80s","type":"Guitar Hero","year":"2007","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"The 80s-focused standalone Guitar Hero release.","icon":"assets/img/games/gh80s/icon.png","logo":"assets/img/games/gh80s/logo.png"},{"id":"gh3","name":"Guitar Hero III: Legends of Rock","short":"GH3","type":"Guitar Hero","year":"2007","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"Guitar Hero III, with its own separate chart and record list.","icon":"assets/img/games/gh3/icon.png","logo":"assets/img/games/gh3/logo.png"},{"id":"gh-aerosmith","name":"Guitar Hero: Aerosmith","short":"AERO","type":"Guitar Hero","year":"2008","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"The standalone Aerosmith-focused Guitar Hero game.","icon":"assets/img/games/gh-aerosmith/icon.png","logo":"assets/img/games/gh-aerosmith/logo.png"},{"id":"gh-world-tour","name":"Guitar Hero World Tour","short":"WT","type":"Guitar Hero","year":"2008","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"World Tour has its own leaderboard, separate from Warriors of Rock.","icon":"assets/img/games/gh-world-tour/icon.png","logo":"assets/img/games/gh-world-tour/logo.png"},{"id":"gh-metallica","name":"Guitar Hero: Metallica","short":"MET","type":"Guitar Hero","year":"2009","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"The standalone Metallica Guitar Hero game.","icon":"assets/img/games/gh-metallica/icon.png","logo":"assets/img/games/gh-metallica/logo.png"},{"id":"gh-smash-hits","name":"Guitar Hero: Smash Hits","short":"HITS","type":"Guitar Hero","year":"2009","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"The reworked classic-song collection, tracked separately.","icon":"assets/img/games/gh-smash-hits/icon.png","logo":"assets/img/games/gh-smash-hits/logo.png"},{"id":"gh5","name":"Guitar Hero 5","short":"GH5","type":"Guitar Hero","year":"2009","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"Guitar Hero 5 gets its own records and hardest-song list.","icon":"assets/img/games/gh5/icon.png","logo":"assets/img/games/gh5/logo.png"},{"id":"gh-van-halen","name":"Guitar Hero: Van Halen","short":"VH","type":"Guitar Hero","year":"2009","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"The standalone Van Halen Guitar Hero game.","icon":"assets/img/games/gh-van-halen/icon.png","logo":"assets/img/games/gh-van-halen/logo.png"},{"id":"band-hero","name":"Band Hero","short":"BH","type":"Guitar Hero family","year":"2009","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"Band Hero is tracked independently from Guitar Hero 5.","icon":"assets/img/games/band-hero/icon.png","logo":"assets/img/games/band-hero/logo.png"},{"id":"gh-warriors-of-rock","name":"Guitar Hero: Warriors of Rock","short":"WoR","type":"Guitar Hero","year":"2010","youtube":"https://www.youtube.com/guitarhero","website":"https://www.guitarhero.com/","description":"Warriors of Rock is separate from World Tour.","icon":"assets/img/games/gh-warriors-of-rock/icon.png","logo":"assets/img/games/gh-warriors-of-rock/logo.png"},{"id":"yarg","name":"YARG","short":"YARG","type":"Community engine","year":"","youtube":"https://www.youtube.com/@YARGGame","website":"https://yarg.in/","description":"Yet Another Rhythm Game, an open-source five-fret rhythm game.","icon":"assets/img/games/yarg/icon.png","logo":"assets/img/games/yarg/logo.png"}];
const STORE_KEY="overstrum-submissions-v1";
const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const fmt=value=>Number.isFinite(Number(value))?Number(value).toFixed(1):"—";
const engineFor=id=>engines.find(e=>e.id===id)||{id,name:"Unknown engine",short:"—"};
const FALLBACK_CHARTS=[
  {
    "id": "clone-hero-fc-1",
    "rank": 1,
    "engine": "clone-hero",
    "engineName": "Clone Hero",
    "kind": "fc",
    "title": "Signal Fires",
    "artist": "Static Season",
    "charter": "Ari Vale",
    "points": 15,
    "firstVerifier": "Duskline",
    "victors": [
      "Duskline",
      "Riven"
    ],
    "hash": "d4b2907e5c3a18f6d4b2907e5c3a18f6",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/1",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "clone-hero-fc-2",
    "rank": 2,
    "engine": "clone-hero",
    "engineName": "Clone Hero",
    "kind": "fc",
    "title": "Glass Circuit",
    "artist": "Northbound",
    "charter": "Mira Sol",
    "points": 12,
    "firstVerifier": "Fracture",
    "victors": [
      "Fracture",
      "bytebreak",
      "Signal"
    ],
    "hash": "a18f6d4b2907e5c3a18f6d4b2907e5c3",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/2",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "clone-hero-fc-3",
    "rank": 3,
    "engine": "clone-hero",
    "engineName": "Clone Hero",
    "kind": "fc",
    "title": "Violet Static",
    "artist": "The Relay",
    "charter": "Kellan",
    "points": 10,
    "firstVerifier": "Riven",
    "victors": [
      "Riven",
      "Echowave",
      "Aster"
    ],
    "hash": "7e5c3a18f6d4b2907e5c3a18f6d4b290",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/3",
    "verifiedAt": "2026-11-20",
    "demo": true
  },
  {
    "id": "clone-hero-pass-1",
    "rank": 1,
    "engine": "clone-hero",
    "engineName": "Clone Hero",
    "kind": "pass",
    "title": "Signal Fires",
    "artist": "Static Season",
    "charter": "Ari Vale",
    "points": 10,
    "firstVerifier": "Aster",
    "victors": [
      "Aster",
      "Riven",
      "bytebreak"
    ],
    "hash": "4b2907e5c3a18f6d4b2907e5c3a18f6d",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/4",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "clone-hero-pass-2",
    "rank": 2,
    "engine": "clone-hero",
    "engineName": "Clone Hero",
    "kind": "pass",
    "title": "Glass Circuit",
    "artist": "Northbound",
    "charter": "Mira Sol",
    "points": 8,
    "firstVerifier": "Cinder",
    "victors": [
      "Cinder",
      "bytebreak"
    ],
    "hash": "18f6d4b2907e5c3a18f6d4b2907e5c3a",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/5",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "clone-hero-pass-3",
    "rank": 3,
    "engine": "clone-hero",
    "engineName": "Clone Hero",
    "kind": "pass",
    "title": "Violet Static",
    "artist": "The Relay",
    "charter": "Kellan",
    "points": 6,
    "firstVerifier": "Echowave",
    "victors": [
      "Echowave",
      "Duskline"
    ],
    "hash": "e5c3a18f6d4b2907e5c3a18f6d4b2907",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/6",
    "verifiedAt": "2026-11-20",
    "demo": true
  },
  {
    "id": "gh3-fc-1",
    "rank": 1,
    "engine": "gh3",
    "engineName": "Guitar Hero III: Legends of Rock",
    "kind": "fc",
    "title": "Razor Skyline",
    "artist": "The Overpass",
    "charter": "Niko",
    "points": 15,
    "firstVerifier": "hexdrive",
    "victors": [
      "hexdrive",
      "Riven",
      "Echowave"
    ],
    "hash": "6d4b2907e5c3a18f6d4b2907e5c3a18f",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/7",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "gh3-fc-2",
    "rank": 2,
    "engine": "gh3",
    "engineName": "Guitar Hero III: Legends of Rock",
    "kind": "fc",
    "title": "Dead Air",
    "artist": "Paper Atlas",
    "charter": "Mira Sol",
    "points": 12,
    "firstVerifier": "Signal",
    "victors": [
      "Signal",
      "bytebreak",
      "Fracture"
    ],
    "hash": "3a18f6d4b2907e5c3a18f6d4b2907e5c",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/8",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "gh3-fc-3",
    "rank": 3,
    "engine": "gh3",
    "engineName": "Guitar Hero III: Legends of Rock",
    "kind": "fc",
    "title": "Afterimage",
    "artist": "Vanta",
    "charter": "Ari Vale",
    "points": 10,
    "firstVerifier": "bytebreak",
    "victors": [
      "bytebreak",
      "Echowave",
      "hexdrive"
    ],
    "hash": "07e5c3a18f6d4b2907e5c3a18f6d4b29",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/9",
    "verifiedAt": "2026-11-20",
    "demo": true
  },
  {
    "id": "gh3-pass-1",
    "rank": 1,
    "engine": "gh3",
    "engineName": "Guitar Hero III: Legends of Rock",
    "kind": "pass",
    "title": "Razor Skyline",
    "artist": "The Overpass",
    "charter": "Niko",
    "points": 10,
    "firstVerifier": "Duskline",
    "victors": [
      "Duskline",
      "Riven"
    ],
    "hash": "d4b2907e5c3a18f6d4b2907e5c3a18f6",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/10",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "gh3-pass-2",
    "rank": 2,
    "engine": "gh3",
    "engineName": "Guitar Hero III: Legends of Rock",
    "kind": "pass",
    "title": "Dead Air",
    "artist": "Paper Atlas",
    "charter": "Mira Sol",
    "points": 8,
    "firstVerifier": "Fracture",
    "victors": [
      "Fracture",
      "bytebreak",
      "Signal"
    ],
    "hash": "a18f6d4b2907e5c3a18f6d4b2907e5c3",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/11",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "gh3-pass-3",
    "rank": 3,
    "engine": "gh3",
    "engineName": "Guitar Hero III: Legends of Rock",
    "kind": "pass",
    "title": "Afterimage",
    "artist": "Vanta",
    "charter": "Ari Vale",
    "points": 6,
    "firstVerifier": "Riven",
    "victors": [
      "Riven",
      "Echowave",
      "Aster"
    ],
    "hash": "7e5c3a18f6d4b2907e5c3a18f6d4b290",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/12",
    "verifiedAt": "2026-11-20",
    "demo": true
  },
  {
    "id": "gh1-2-fc-1",
    "rank": 1,
    "engine": "gh1",
    "engineName": "Guitar Hero",
    "kind": "fc",
    "title": "Crimson Theory",
    "artist": "The Low Ends",
    "charter": "Kellan",
    "points": 15,
    "firstVerifier": "Aster",
    "victors": [
      "Aster",
      "Riven",
      "bytebreak"
    ],
    "hash": "f6d4b2907e5c3a18f6d4b2907e5c3a18",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/13",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "gh1-2-fc-2",
    "rank": 2,
    "engine": "gh2",
    "engineName": "Guitar Hero II",
    "kind": "fc",
    "title": "Blackout Avenue",
    "artist": "Static Season",
    "charter": "Niko",
    "points": 12,
    "firstVerifier": "Cinder",
    "victors": [
      "Cinder",
      "bytebreak"
    ],
    "hash": "c3a18f6d4b2907e5c3a18f6d4b2907e5",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/14",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "gh1-2-fc-3",
    "rank": 3,
    "engine": "gh1",
    "engineName": "Guitar Hero",
    "kind": "fc",
    "title": "Cold Mercury",
    "artist": "Northbound",
    "charter": "Ari Vale",
    "points": 10,
    "firstVerifier": "Echowave",
    "victors": [
      "Echowave",
      "Duskline"
    ],
    "hash": "907e5c3a18f6d4b2907e5c3a18f6d4b2",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/15",
    "verifiedAt": "2026-11-20",
    "demo": true
  },
  {
    "id": "gh1-2-pass-1",
    "rank": 1,
    "engine": "gh2",
    "engineName": "Guitar Hero II",
    "kind": "pass",
    "title": "Crimson Theory",
    "artist": "The Low Ends",
    "charter": "Kellan",
    "points": 10,
    "firstVerifier": "hexdrive",
    "victors": [
      "hexdrive",
      "Riven",
      "Echowave"
    ],
    "hash": "6d4b2907e5c3a18f6d4b2907e5c3a18f",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/16",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "gh1-2-pass-2",
    "rank": 2,
    "engine": "gh1",
    "engineName": "Guitar Hero",
    "kind": "pass",
    "title": "Blackout Avenue",
    "artist": "Static Season",
    "charter": "Niko",
    "points": 8,
    "firstVerifier": "Signal",
    "victors": [
      "Signal",
      "bytebreak",
      "Fracture"
    ],
    "hash": "3a18f6d4b2907e5c3a18f6d4b2907e5c",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/17",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "gh1-2-pass-3",
    "rank": 3,
    "engine": "gh2",
    "engineName": "Guitar Hero II",
    "kind": "pass",
    "title": "Cold Mercury",
    "artist": "Northbound",
    "charter": "Ari Vale",
    "points": 6,
    "firstVerifier": "bytebreak",
    "victors": [
      "bytebreak",
      "Echowave",
      "hexdrive"
    ],
    "hash": "07e5c3a18f6d4b2907e5c3a18f6d4b29",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/18",
    "verifiedAt": "2026-11-20",
    "demo": true
  },
  {
    "id": "ghwt-wor-fc-1",
    "rank": 1,
    "engine": "gh-world-tour",
    "engineName": "Guitar Hero World Tour",
    "kind": "fc",
    "title": "Midnight Engine",
    "artist": "The Overpass",
    "charter": "Mira Sol",
    "points": 15,
    "firstVerifier": "Duskline",
    "victors": [
      "Duskline",
      "Riven"
    ],
    "hash": "8f6d4b2907e5c3a18f6d4b2907e5c3a1",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/19",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "ghwt-wor-fc-2",
    "rank": 2,
    "engine": "gh-warriors-of-rock",
    "engineName": "Guitar Hero: Warriors of Rock",
    "kind": "fc",
    "title": "Hollow Signal",
    "artist": "Vanta",
    "charter": "Kellan",
    "points": 12,
    "firstVerifier": "Fracture",
    "victors": [
      "Fracture",
      "bytebreak",
      "Signal"
    ],
    "hash": "5c3a18f6d4b2907e5c3a18f6d4b2907e",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/20",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "ghwt-wor-fc-3",
    "rank": 3,
    "engine": "gh-world-tour",
    "engineName": "Guitar Hero World Tour",
    "kind": "fc",
    "title": "Run the Wire",
    "artist": "Paper Atlas",
    "charter": "Niko",
    "points": 10,
    "firstVerifier": "Riven",
    "victors": [
      "Riven",
      "Echowave",
      "Aster"
    ],
    "hash": "2907e5c3a18f6d4b2907e5c3a18f6d4b",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/21",
    "verifiedAt": "2026-11-20",
    "demo": true
  },
  {
    "id": "ghwt-wor-pass-1",
    "rank": 1,
    "engine": "gh-warriors-of-rock",
    "engineName": "Guitar Hero: Warriors of Rock",
    "kind": "pass",
    "title": "Midnight Engine",
    "artist": "The Overpass",
    "charter": "Mira Sol",
    "points": 10,
    "firstVerifier": "Aster",
    "victors": [
      "Aster",
      "Riven",
      "bytebreak"
    ],
    "hash": "f6d4b2907e5c3a18f6d4b2907e5c3a18",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/22",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "ghwt-wor-pass-2",
    "rank": 2,
    "engine": "gh-world-tour",
    "engineName": "Guitar Hero World Tour",
    "kind": "pass",
    "title": "Hollow Signal",
    "artist": "Vanta",
    "charter": "Kellan",
    "points": 8,
    "firstVerifier": "Cinder",
    "victors": [
      "Cinder",
      "bytebreak"
    ],
    "hash": "c3a18f6d4b2907e5c3a18f6d4b2907e5",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/23",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "ghwt-wor-pass-3",
    "rank": 3,
    "engine": "gh-warriors-of-rock",
    "engineName": "Guitar Hero: Warriors of Rock",
    "kind": "pass",
    "title": "Run the Wire",
    "artist": "Paper Atlas",
    "charter": "Niko",
    "points": 6,
    "firstVerifier": "Echowave",
    "victors": [
      "Echowave",
      "Duskline"
    ],
    "hash": "907e5c3a18f6d4b2907e5c3a18f6d4b2",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/24",
    "verifiedAt": "2026-11-20",
    "demo": true
  },
  {
    "id": "yarg-fc-1",
    "rank": 1,
    "engine": "yarg",
    "engineName": "YARG",
    "kind": "fc",
    "title": "Satellite Teeth",
    "artist": "Static Season",
    "charter": "Ari Vale",
    "points": 15,
    "firstVerifier": "hexdrive",
    "victors": [
      "hexdrive",
      "Riven",
      "Echowave"
    ],
    "hash": "18f6d4b2907e5c3a18f6d4b2907e5c3a",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/25",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "yarg-fc-2",
    "rank": 2,
    "engine": "yarg",
    "engineName": "YARG",
    "kind": "fc",
    "title": "Digital Graves",
    "artist": "The Relay",
    "charter": "Kellan",
    "points": 12,
    "firstVerifier": "Signal",
    "victors": [
      "Signal",
      "bytebreak",
      "Fracture"
    ],
    "hash": "e5c3a18f6d4b2907e5c3a18f6d4b2907",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/26",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "yarg-fc-3",
    "rank": 3,
    "engine": "yarg",
    "engineName": "YARG",
    "kind": "fc",
    "title": "Floodlights",
    "artist": "Northbound",
    "charter": "Mira Sol",
    "points": 10,
    "firstVerifier": "bytebreak",
    "victors": [
      "bytebreak",
      "Echowave",
      "hexdrive"
    ],
    "hash": "b2907e5c3a18f6d4b2907e5c3a18f6d4",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/27",
    "verifiedAt": "2026-11-20",
    "demo": true
  },
  {
    "id": "yarg-pass-1",
    "rank": 1,
    "engine": "yarg",
    "engineName": "YARG",
    "kind": "pass",
    "title": "Satellite Teeth",
    "artist": "Static Season",
    "charter": "Ari Vale",
    "points": 10,
    "firstVerifier": "Duskline",
    "victors": [
      "Duskline",
      "Riven"
    ],
    "hash": "8f6d4b2907e5c3a18f6d4b2907e5c3a1",
    "peakNps": 21.7,
    "averageNps": 12.8,
    "video": "https://example.com/overstrum-demo-proof/28",
    "verifiedAt": "2026-11-22",
    "demo": true
  },
  {
    "id": "yarg-pass-2",
    "rank": 2,
    "engine": "yarg",
    "engineName": "YARG",
    "kind": "pass",
    "title": "Digital Graves",
    "artist": "The Relay",
    "charter": "Kellan",
    "points": 8,
    "firstVerifier": "Fracture",
    "victors": [
      "Fracture",
      "bytebreak",
      "Signal"
    ],
    "hash": "5c3a18f6d4b2907e5c3a18f6d4b2907e",
    "peakNps": 18.4,
    "averageNps": 11.2,
    "video": "https://example.com/overstrum-demo-proof/29",
    "verifiedAt": "2026-11-21",
    "demo": true
  },
  {
    "id": "yarg-pass-3",
    "rank": 3,
    "engine": "yarg",
    "engineName": "YARG",
    "kind": "pass",
    "title": "Floodlights",
    "artist": "Northbound",
    "charter": "Mira Sol",
    "points": 6,
    "firstVerifier": "Riven",
    "victors": [
      "Riven",
      "Echowave",
      "Aster"
    ],
    "hash": "2907e5c3a18f6d4b2907e5c3a18f6d4b",
    "peakNps": 24.2,
    "averageNps": 9.6,
    "video": "https://example.com/overstrum-demo-proof/30",
    "verifiedAt": "2026-11-20",
    "demo": true
  }
];
let baseCharts=FALLBACK_CHARTS.slice();
let submissions=readSubmissions();
let allCharts=[];
function readSubmissions(){try{const value=JSON.parse(localStorage.getItem(STORE_KEY)||"[]");return Array.isArray(value)?value:[]}catch{return[]}}
function syncCharts(){allCharts=[...baseCharts,...submissions]}
function setNav(){
 const navKey=route==="home"?"home":route==="games"?"games":route==="submit"?"submit":route==="rules"?"rules":route==="community"?"community":"leaderboard";
 document.querySelectorAll("[data-nav]").forEach(a=>{a.classList.toggle("active",a.dataset.nav===navKey);if(a.dataset.nav==="games")a.textContent="The List"});
 const toggle=$(".menu-toggle"),nav=$(".main-nav");
 if(toggle&&!toggle.dataset.bound){toggle.dataset.bound="true";toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))})}
}
function statusFor(c){return c.status==="pending"?"pending":c.demo?"sample":"verified"}
function statusBadge(c){const s=statusFor(c),label=s==="pending"?"Pending review":s==="sample"?"Sample data":"Verified";return '<span class="badge '+s+'">'+label+'</span>'}
function queryUrl(engine,kind){const p=new URLSearchParams();if(engine&&engine!=="all")p.set("engine",engine);if(kind&&kind!=="all")p.set("kind",kind);return ROOT_PREFIX+"leaderboard/"+(p.toString()?"?"+p.toString():"")}
function renderHome(){
 const uniquePlayers=new Set(allCharts.flatMap(c=>c.victors||[]).concat(submissions.map(c=>c.player).filter(Boolean)));
 const fc=allCharts.filter(c=>c.kind==="fc").length,passes=allCharts.filter(c=>c.kind==="pass").length;
 const recent=[...allCharts].sort((a,b)=>String(b.verifiedAt||"").localeCompare(String(a.verifiedAt||""))).slice(0,3);
 $("#app").innerHTML='<section class="hero"><div><span class="eyebrow">A community archive for five-fret rhythm games</span><h1>Good runs deserve <span>a place.</span></h1><p class="hero-copy">Overstrum collects full combos and hardest passes across the games we play. Browse records, explore the players behind them, and submit a run for review.</p><div class="hero-actions"><a class="button primary" href="'+ROOT_PREFIX+'leaderboard/">Explore leaderboard <span aria-hidden="true">↗</span></a><a class="button ghost" href="'+ROOT_PREFIX+'submit/">Submit a record</a></div></div><aside class="hero-summary"><div class="summary-top"><span>List overview</span><span><i class="live-dot"></i>Community maintained</span></div><div class="summary-grid"><div class="summary-stat"><strong>'+allCharts.length+'</strong><span>Listed entries</span></div><div class="summary-stat"><strong>'+uniquePlayers.size+'</strong><span>Players</span></div><div class="summary-stat"><strong>'+fc+'</strong><span>Full combos</span></div><div class="summary-stat"><strong>'+passes+'</strong><span>Passes</span></div></div></aside></section>'+
 '<div class="section-heading"><div><h2>Choose a game</h2><p>Each release has its own leaderboard and hardest-song list.</p></div><a class="inline-link" href="'+ROOT_PREFIX+'leaderboard/">All records ↗</a></div>'+
 '<section class="engine-grid">'+engines.map(e=>'<a class="engine-card" href="'+ROOT_PREFIX+'games/?game='+encodeURIComponent(e.id)+'"><div class="engine-card-top"><span class="engine-icon"><img src="'+ROOT_PREFIX+e.icon+'" alt=""></span><span class="engine-arrow">↗</span></div><strong>'+esc(e.name)+'</strong><small>'+allCharts.filter(c=>c.engine===e.id).length+' listed entries</small><div class="engine-badges"><span>Full combo</span><span>Pass</span></div></a>').join("")+'</section>'+
 '<div class="section-heading"><div><h2>Recently added</h2><p>The latest entries in the archive.</p></div><a class="inline-link" href="'+ROOT_PREFIX+'leaderboard/">View leaderboard ↗</a></div>'+
 '<section class="recent-grid">'+recent.map(c=>'<article class="recent-card"><div class="recent-card-top">'+statusBadge(c)+'<span class="badge">'+(c.kind==="fc"?"Full combo":"Pass")+'</span></div><strong>'+esc(c.title)+'</strong><p>'+esc(c.artist||"Artist not supplied")+' · '+esc(engineFor(c.engine).name)+'</p></article>').join("")+'</section>'+
 '<div class="section-heading"><div><h2>How the list works</h2><p>Clear standards, careful review, and useful records.</p></div><a class="inline-link" href="'+ROOT_PREFIX+'rules/">Read verification rules ↗</a></div>'+
 '<section class="content-grid"><article class="content-card"><h3>Evidence first</h3><p>Runs should be supported by continuous gameplay footage, appropriate handcam or input visibility, and original gameplay audio.</p></article><article class="content-card"><h3>Exact chart identity</h3><p>Chart hashes help distinguish different versions of a chart. A record is not considered reviewed until its chart details are checked.</p></article></section>'+
 '<div class="notice">The records currently bundled with this site are sample data for layout testing, not verified achievements. New submissions are saved locally and remain pending review.</div>';
 setNav();
}
function albumCoverMarkup(c,extraClass){
 const raw=c&&(c.albumCover||c.cover||c.coverUrl);
 const source=typeof raw==="string"&&(/^(https?:\/\/|assets\/)/i.test(raw))?raw:"";
 const image=source?'<img src="'+esc(source.startsWith("assets/")?ROOT_PREFIX+source:source)+'" alt="Album artwork for '+esc(c.title||"selected chart")+'" loading="lazy" onerror="this.remove()">':"";
 return '<span class="album-cover '+(extraClass||"")+'"><span class="cover-fallback" aria-hidden="true"><i></i><b>♪</b></span>'+image+'</span>';
}
function trophyMarkup(position){
 const medals={1:"gold",2:"silver",3:"bronze"},tone=medals[position];
 if(!tone)return '<span class="rank-plain">'+position+'</span>';
 const suffix=position===1?"st":position===2?"nd":"rd";
 return '<span class="rank-medal medal-'+tone+'" title="'+position+suffix+' place trophy placeholder"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v3h3a1 1 0 0 1 1 1c0 3.2-1.9 5.6-5.1 6.3A6 6 0 0 1 13 16v2h4v2H7v-2h4v-2a6 6 0 0 1-2.9-2.7C4 12.6 2 10.2 2 7a1 1 0 0 1 1-1h4V3zm0 5H4.1c.2 1.5 1.1 2.6 2.8 3.2A9 9 0 0 1 7 8zm10 0a9 9 0 0 1 .1 3.2c1.7-.6 2.6-1.7 2.8-3.2H17z"/></svg><small>'+position+suffix+'</small></span>';
}
function renderChartInspector(c,kind){
 if(!c)return '<aside class="song-inspector-empty"><span>♪</span><strong>Select a song</strong><p>Choose a chart to see its artwork, details and community standing.</p></aside>';
 const votes=Number.isFinite(Number(c.communityVotes??c.votes))&&(c.communityVotes!==undefined||c.votes!==undefined)?Number(c.communityVotes??c.votes).toLocaleString():"—";
 const first=c.firstVerifier||(Array.isArray(c.victors)&&c.victors[0])||"Not recorded";
 const hash=typeof c.hash==="string"&&/^[a-f0-9]{32}$/i.test(c.hash)?c.hash:"";
 const proof=typeof c.video==="string"&&/^https?:\/\//i.test(c.video)?'<a class="chart-proof-link" href="'+esc(c.video)+'" target="_blank" rel="noopener noreferrer">Watch proof ↗</a>':"";
 return '<div class="inspector-topline"><span class="inspector-kicker">SELECTED CHART</span><span class="inspector-board">'+(kind==="fc"?"FULL COMBO":"PASS")+'</span></div>'+
 '<div class="inspector-track">'+albumCoverMarkup(c,"inspector-cover")+'<div class="inspector-track-copy"><h2>'+esc(c.title)+'</h2><p class="inspector-artist">'+esc(c.artist||"Artist not supplied")+'</p><div class="inspector-charter"><span>CHARTER</span><strong>'+esc(c.charter||"Not supplied")+'</strong></div></div></div>'+
 '<div class="inspector-stats"><div class="inspector-stat"><span>POINTS</span><strong>'+Number(c.points||0)+'</strong></div><div class="inspector-stat"><span>BOARD TYPE</span><strong>'+(kind==="fc"?"FC":"PASS")+'</strong></div><div class="inspector-stat"><span>COMMUNITY VOTES</span><strong>'+votes+'</strong></div></div>'+
 '<div class="inspector-actions"><a class="list-primary-cta" href="'+ROOT_PREFIX+'submit/">Submit a Run <span>↗</span></a><button class="list-secondary-cta" type="button" data-toggle-chart-details>View Chart Details <span aria-hidden="true">⌄</span></button></div>'+
 '<div class="inspector-extra" id="inspector-extra" hidden><div><span>FIRST '+(kind==="fc"?"FC":"PASS")+'</span><strong>'+esc(first)+'</strong></div><div><span>PEAK NPS</span><strong>'+fmt(c.peakNps)+'</strong></div><div><span>AVERAGE NPS</span><strong>'+fmt(c.averageNps)+'</strong></div>'+(hash?'<div class="inspector-hash"><span>CHART MD5</span><div class="hash-line"><code class="hash-text">'+esc(hash)+'</code><button class="copy-button" type="button" data-copy="'+esc(hash)+'">Copy</button></div></div>':"")+(proof?proof:'<span class="inspector-no-proof">No video proof supplied.</span>')+'</div>';
}
function recordRows(rows,selectedId){
 if(!rows.length)return '<div class="list-empty">No songs match this board. Try another search.</div>';
 return rows.map((c,i)=>{
  const position=i+1,active=c.id===selectedId;
  const votes=Number.isFinite(Number(c.communityVotes??c.votes))&&(c.communityVotes!==undefined||c.votes!==undefined)?Number(c.communityVotes??c.votes).toLocaleString():"—";
  return '<button class="song-row'+(active?" is-selected":"")+'" type="button" data-select-chart="'+esc(c.id)+'" aria-pressed="'+String(active)+'">'+
   '<span class="song-rank">'+trophyMarkup(position)+'</span>'+albumCoverMarkup(c,"song-cover")+
   '<span class="song-copy"><strong>'+esc(c.title)+'</strong><span class="song-artist">'+esc(c.artist||"Artist not supplied")+'</span><span class="song-charter">Charter · '+esc(c.charter||"Not supplied")+'</span></span>'+
   '<span class="song-metadata"><span class="song-tags"><i>'+esc(engineFor(c.engine).short)+'</i><i>'+(c.kind==="fc"?"FC":"PASS")+'</i></span><strong>'+Number(c.points||0)+' <small>pts</small></strong><span class="song-votes">'+votes+' votes</span></span></button>';
 }).join("");
}
function playerStats(charts){
 const map=new Map();
 charts.forEach(c=>(c.victors||[]).forEach(v=>{
  if(!v)return;
  const p=map.get(v)||{name:v,points:0,records:0,pioneers:0,pending:0};
  p.records++;
  if(c.status==="pending")p.pending++;
  else p.points+=Number(c.points||0)+(v===c.firstVerifier?3:0);
  if(v===c.firstVerifier)p.pioneers++;
  map.set(v,p);
 }));
 return [...map.values()].sort((a,b)=>b.points-a.points||b.records-a.records||a.name.localeCompare(b.name));
}
function renderPlayerTable(charts){
 const players=playerStats(charts);
 if(!players.length)return '<tr><td colspan="5"><div class="empty-state">No player records yet.</div></td></tr>';
 return players.map((p,i)=>'<tr><td class="player-rank">'+String(i+1).padStart(2,"0")+'</td><td><strong>'+esc(p.name)+'</strong></td><td>'+p.records+'</td><td>'+p.pioneers+'</td><td class="points-total">'+p.points.toLocaleString()+'</td></tr>').join("");
}
function renderLeaderboard(seedEngine,seedKind){
 const params=new URLSearchParams(location.search);
 const defaultEngine=seedEngine||params.get("engine")||"all";
 const defaultKind=(seedKind||params.get("kind"))==="fc"?"fc":"pass";
 $("#app").innerHTML='<div class="page-intro"><div><span class="eyebrow">Browse the archive</span><h1>Leaderboard</h1><p>Explore separate Full Combo and Pass boards for every game. Select a chart to inspect its artwork, charter and first clear.</p></div></div>'+
 '<div class="achievement-tabs view-tabs" role="tablist" aria-label="Achievement category"><button type="button" class="'+(defaultKind==="fc"?"active":"")+'" data-leaderboard-kind="fc" role="tab" aria-selected="'+(defaultKind==="fc"?"true":"false")+'">FC</button><button type="button" class="'+(defaultKind==="pass"?"active":"")+'" data-leaderboard-kind="pass" role="tab" aria-selected="'+(defaultKind==="pass"?"true":"false")+'">Pass</button></div>'+
 '<div class="game-tabs leaderboard-game-tabs" role="tablist" aria-label="Choose a game"><button class="game-tab'+(defaultEngine==="all"?" active":"")+'" type="button" data-leaderboard-game="all" role="tab" aria-selected="'+(defaultEngine==="all"?"true":"false")+'"><span>All</span></button>'+engines.map(g=>'<button class="game-tab'+(g.id===defaultEngine?' active':'')+'" type="button" data-leaderboard-game="'+esc(g.id)+'" role="tab" aria-selected="'+(g.id===defaultEngine?'true':'false')+'"><img src="'+ROOT_PREFIX+g.icon+'" alt=""><span>'+esc(g.short)+'</span></button>').join("")+'</div>'+
 '<div class="leaderboard-layout"><section class="leaderboard-primary"><div class="leaderboard-toolbar"><label class="search-field"><input id="record-search" type="search" placeholder="Search charts, artists, charters or players…" autocomplete="off" aria-label="Search records"></label><select class="select-field" id="status-filter" aria-label="Filter by status"><option value="all">All statuses</option><option value="verified">Verified</option><option value="sample">Sample data</option><option value="pending">Pending review</option></select></div>'+
 '<div class="list-heading"><div class="view-tabs" role="tablist" aria-label="Leaderboard view"><button class="active" type="button" data-view="records" role="tab" aria-selected="true">Chart list</button><button type="button" data-view="players" role="tab" aria-selected="false">Player rankings</button></div><span class="filter-count" id="filter-count"></span></div>'+
 '<section id="records-view"><div class="leaderboard-list" id="record-body"></div></section>'+
 '<section id="players-view" hidden><div class="table-wrap"><table class="players-table"><thead><tr><th>#</th><th>Player</th><th>Records</th><th>Pioneer verifications</th><th style="text-align:right">Points</th></tr></thead><tbody id="player-body"></tbody></table></div><p class="field-hint" style="margin-top:10px">Pioneer recognition adds 3 points to a reviewed record. Pending submissions do not earn points until approved.</p></section>'+
 '<div class="notice">Sample records are included to demonstrate the interface and are not verified achievements. Submissions from this browser appear as pending review and are visible only in this browser.</div></section>'+
 '<aside class="chart-inspector" id="chart-inspector" aria-live="polite"></aside></div>';
 const statusEl=$("#status-filter"),searchEl=$("#record-search"),recordBody=$("#record-body");
 let selectedKind=defaultKind;
 let selectedEngine=engines.some(e=>e.id===defaultEngine)?defaultEngine:"all";
 let selectedChartId=null;
 function updateUrl(){const p=new URLSearchParams();if(selectedEngine!=="all")p.set("engine",selectedEngine);p.set("kind",selectedKind);const q=p.toString();history.replaceState({}, "",location.pathname+(q?"?"+q:""))}
 function paint(){
  const q=searchEl.value.trim().toLowerCase();
  const filtered=allCharts.filter(c=>{
   const engineOk=selectedEngine==="all"||c.engine===selectedEngine;
   const kindOk=c.kind===selectedKind;
   const statusOk=statusEl.value==="all"||statusFor(c)===statusEl.value;
   const haystack=[c.title,c.artist,c.charter,c.firstVerifier,...(c.victors||[]),c.player].join(" ").toLowerCase();
   return engineOk&&kindOk&&statusOk&&haystack.includes(q);
  }).sort((a,b)=>Number(b.points||0)-Number(a.points||0)||String(a.title).localeCompare(String(b.title)));
  if(!filtered.some(c=>c.id===selectedChartId))selectedChartId=filtered.length?filtered[0].id:null;
  recordBody.innerHTML=recordRows(filtered,selectedChartId);
  $("#player-body").innerHTML=renderPlayerTable(filtered);
  $("#filter-count").textContent=filtered.length+" charts";
  $("#chart-inspector").innerHTML=renderChartInspector(filtered.find(c=>c.id===selectedChartId)||null,selectedKind);
 }
 recordBody.addEventListener("click",event=>{
  const item=event.target.closest("[data-select-chart]");if(!item)return;
  selectedChartId=item.dataset.selectChart;paint();
 });
 statusEl.addEventListener("change",()=>{updateUrl();paint()});
 document.querySelectorAll("[data-leaderboard-game]").forEach(button=>button.addEventListener("click",()=>{
  selectedEngine=button.dataset.leaderboardGame;
  document.querySelectorAll("[data-leaderboard-game]").forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active))});
  updateUrl();paint();
 }));
 document.querySelectorAll("[data-leaderboard-kind]").forEach(button=>button.addEventListener("click",()=>{
  selectedKind=button.dataset.leaderboardKind;
  document.querySelectorAll("[data-leaderboard-kind]").forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active))});
  updateUrl();paint();
 }));
 searchEl.addEventListener("input",paint);
 document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>{
  const view=button.dataset.view;
  document.querySelectorAll("[data-view]").forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active))});
  $("#records-view").hidden=view!=="records";$("#players-view").hidden=view!=="players";
 }));
 paint();setNav();
}
function renderGames(){
 const params=new URLSearchParams(location.search);
 let selectedId=params.get("game")||"clone-hero";
 if(!engines.some(e=>e.id===selectedId))selectedId="clone-hero";
 let selectedKind=params.get("kind")==="fc"?"fc":"pass";
 const selectedGame=()=>engineFor(selectedId);
 const updateAddress=()=>{const p=new URLSearchParams();p.set("game",selectedId);p.set("kind",selectedKind);history.replaceState({}, "",location.pathname+"?"+p.toString())};
 const tabs=engines.map(g=>'<button class="list-game-tab'+(g.id===selectedId?' active':'')+'" type="button" role="tab" aria-selected="'+(g.id===selectedId?'true':'false')+'" data-game-tab="'+esc(g.id)+'"><img src="'+ROOT_PREFIX+g.icon+'" alt=""><span>'+esc(g.short)+'</span></button>').join("");
 $("#app").innerHTML='<div class="list-page-heading"><div class="breadcrumbs"><span>Pages</span><span aria-hidden="true">/</span><strong>The List</strong></div><h1>The List</h1><p>Ranked charts, full combos and passes across every five-fret game.</p></div>'+
 '<div class="list-game-tabs" role="tablist" aria-label="Choose a game">'+tabs+'</div>'+
 '<section class="list-game-info" aria-label="Selected game"><img id="list-game-icon" src="'+ROOT_PREFIX+selectedGame().icon+'" alt=""><div class="list-game-copy"><div><h2 id="list-game-title">'+esc(selectedGame().name)+'</h2><span id="list-game-year">'+esc(selectedGame().year||"Community engine")+'</span></div><p id="list-game-description">'+esc(selectedGame().description)+'</p></div><div class="list-game-links"><a id="game-youtube" href="'+esc(selectedGame().youtube||"#")+'" target="_blank" rel="noopener noreferrer">Official YouTube ↗</a>'+(selectedGame().website?'<a id="game-website" href="'+esc(selectedGame().website)+'" target="_blank" rel="noopener noreferrer">Official Site ↗</a>':'')+'</div></section>'+
 '<div class="list-controls"><div class="achievement-tabs view-tabs" role="tablist" aria-label="Leaderboard type"><button type="button" class="'+(selectedKind==="fc"?'active':'')+'" data-game-kind="fc" role="tab" aria-selected="'+(selectedKind==="fc"?'true':'false')+'">FC</button><button type="button" class="'+(selectedKind==="pass"?'active':'')+'" data-game-kind="pass" role="tab" aria-selected="'+(selectedKind==="pass"?'true':'false')+'">Pass</button></div><label class="list-search"><span aria-hidden="true">⌕</span><input id="game-record-search" type="search" placeholder="Search songs, players, or charters..." autocomplete="off" aria-label="Search songs, players, or charters"></label><span class="list-count" id="game-record-count"></span></div>'+
 '<div class="list-main-layout"><section class="list-song-column" aria-label="Ranked songs"><div class="list-column-heading"><span>RANKED CHARTS</span><span id="game-record-summary"></span></div><div class="song-list" id="game-record-body"></div></section><aside class="song-inspector" id="game-chart-inspector" aria-live="polite"></aside></div>';
 const search=$("#game-record-search"),recordBody=$("#game-record-body");
 let selectedChartId=null;
 const paint=()=>{
  const q=search.value.trim().toLowerCase();
  const rows=allCharts.filter(c=>c.engine===selectedId&&c.kind===selectedKind&&[c.title,c.artist,c.charter,c.firstVerifier,...(c.victors||[])].join(" ").toLowerCase().includes(q))
   .sort((a,b)=>Number(a.rank||9999)-Number(b.rank||9999)||Number(b.points||0)-Number(a.points||0));
  if(!rows.some(c=>c.id===selectedChartId))selectedChartId=rows.length?rows[0].id:null;
  recordBody.innerHTML=recordRows(rows,selectedChartId);
  $("#game-record-count").textContent=rows.length+" charts";
  $("#game-record-summary").textContent=selectedKind==="fc"?"FULL COMBO BOARD":"PASS BOARD";
  $("#game-chart-inspector").innerHTML=renderChartInspector(rows.find(c=>c.id===selectedChartId)||null,selectedKind);
 };
 const setGame=id=>{
  if(!engines.some(g=>g.id===id))return;selectedId=id;
  document.querySelectorAll("[data-game-tab]").forEach(button=>{const active=button.dataset.gameTab===id;button.classList.toggle("active",active);button.setAttribute("aria-selected",String(active))});
  const game=selectedGame();$("#list-game-icon").src=ROOT_PREFIX+game.icon;$("#list-game-title").textContent=game.name;$("#list-game-year").textContent=game.year||"Community engine";$("#list-game-description").textContent=game.description;$("#game-youtube").href=game.youtube||"#";
  const site=$("#game-website");if(site){site.hidden=!game.website;if(game.website)site.href=game.website}
  selectedChartId=null;updateAddress();paint();
 };
 recordBody.addEventListener("click",event=>{const item=event.target.closest("[data-select-chart]");if(!item)return;selectedChartId=item.dataset.selectChart;paint()});
 $("#game-chart-inspector").addEventListener("click",event=>{
  const toggle=event.target.closest("[data-toggle-chart-details]");if(!toggle)return;
  const extra=$("#inspector-extra");if(!extra)return;extra.hidden=!extra.hidden;toggle.classList.toggle("expanded",!extra.hidden);toggle.querySelector("span").textContent=extra.hidden?"⌄":"⌃";
 });
 document.querySelectorAll("[data-game-tab]").forEach(button=>button.addEventListener("click",()=>setGame(button.dataset.gameTab)));
 document.querySelectorAll("[data-game-kind]").forEach(button=>button.addEventListener("click",()=>{
  selectedKind=button.dataset.gameKind;
  document.querySelectorAll("[data-game-kind]").forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active))});
  selectedChartId=null;updateAddress();paint();
 }));
 search.addEventListener("input",paint);paint();setNav();
}
function renderSubmit(){
 $("#app").innerHTML='<div class="page-intro"><div><span class="eyebrow">Add to the archive</span><h1>Submit a record</h1><p>Share the essentials of your run. New submissions are saved in this browser and marked pending until a moderator verifies them.</p></div></div>'+
 '<form class="form-card" id="submission-form"><div class="form-grid">'+
 '<div class="form-field"><label for="player-name">Player name</label><input id="player-name" name="player" required maxlength="40" placeholder="Your player name"></div>'+
 '<div class="form-field"><label for="song-title">Song title</label><input id="song-title" name="title" required maxlength="100" placeholder="Song title"></div>'+
 '<div class="form-field"><label for="engine-choice">Game engine</label><select id="engine-choice" name="engine" required>'+engines.map(e=>'<option value="'+e.id+'">'+esc(e.name)+'</option>').join("")+'</select></div>'+
 '<div class="form-field"><label for="achievement-kind">Achievement</label><select id="achievement-kind" name="kind" required><option value="fc">Full combo (FC)</option><option value="pass">Pass</option></select></div>'+
 '<div class="form-field"><label for="score">Score / FC result <span class="field-hint">(optional)</span></label><input id="score" name="score" maxlength="60" placeholder="e.g. 98%, 1,234,567"></div>'+
 '<div class="form-field"><label for="artist">Artist <span class="field-hint">(optional)</span></label><input id="artist" name="artist" maxlength="100" placeholder="Artist name"></div>'+
 '<div class="form-field full"><label for="proof-url">Video proof URL</label><input id="proof-url" name="video" type="url" required placeholder="https://youtu.be/…"><span class="field-hint">Use a public video link that reviewers can open.</span></div>'+
 '<div class="form-field full"><label for="submission-notes">Notes <span class="field-hint">(optional)</span></label><textarea id="submission-notes" name="notes" maxlength="500" placeholder="Anything reviewers should know about this run?"></textarea></div>'+
 '</div><div class="form-footer"><button class="button primary" type="submit">Add submission</button><span id="form-message" class="form-message" aria-live="polite">This does not publish a verified record or send data to a server.</span></div></form>'+
 '<div class="notice"><strong>How this works:</strong> GitHub Pages is a static host, so this form stores submissions in your browser&#39;s local storage. They will not appear on another visitor&#39;s device. For a shared public submission queue, Overstrum will need a backend or a connected form service.</div>';
 $("#submission-form").addEventListener("submit",event=>{
  event.preventDefault();
  const form=event.currentTarget,data=new FormData(form);
  const player=String(data.get("player")||"").trim(),title=String(data.get("title")||"").trim(),engine=data.get("engine"),kind=data.get("kind"),video=String(data.get("video")||"").trim();
  if(!player||!title||!engines.some(e=>e.id===engine)||!["fc","pass"].includes(kind)||!/^https?:\/\//i.test(video))return;
  const e=engineFor(engine);
  const record={id:"local-"+Date.now(),engine,engineName:e.name,kind,title,artist:String(data.get("artist")||"").trim(),charter:"Awaiting review",player,victors:[player],firstVerifier:null,points:0,hash:"",peakNps:null,averageNps:null,video,score:String(data.get("score")||"").trim(),notes:String(data.get("notes")||"").trim(),verifiedAt:new Date().toISOString().slice(0,10),status:"pending",demo:false};
  submissions.unshift(record);syncCharts();
  const message=$("#form-message");
  try{localStorage.setItem(STORE_KEY,JSON.stringify(submissions));message.className="form-message success";message.textContent="Submission saved in this browser. It is now listed as pending review."; }
  catch{message.className="form-message error";message.textContent="This browser could not save the submission. Check local storage settings and try again.";}
  const link=document.createElement("a");link.href=queryUrl(engine,kind);link.className="inline-link";link.textContent="View this engine in the leaderboard ↗";message.append(" ");message.append(link);
  form.reset();
 });
 setNav();
}
function renderCommunity(){
 const players=playerStats(allCharts);
 const pendingCount=submissions.length;
 $("#app").innerHTML='<div class="page-intro"><div><span class="eyebrow">The people behind the records</span><h1>Community</h1><p>Browse players who have contributed achievements to the Overstrum archive.</p></div></div>'+
 '<div class="section-heading"><div><h2>Players</h2><p>'+players.length+' names across the current archive'+(pendingCount?' · includes local pending submissions':'')+'</p></div></div>'+
 '<section class="player-grid">'+players.map((p,i)=>'<article class="player-card"><div class="player-card-top"><span class="badge">#'+(i+1)+' contributor</span>'+(p.pending?'<span class="badge pending">'+p.pending+' pending</span>':'')+'</div><h3>'+esc(p.name)+'</h3><p>Community player</p><div class="player-card-stats"><div><strong>'+p.records+'</strong><span>Records</span></div><div><strong>'+p.pioneers+'</strong><span>Pioneers</span></div><div><strong>'+p.points+'</strong><span>Points</span></div></div></article>').join("")+'</section>'+
 '<div class="notice">Player totals are calculated from listed victor credits. Sample entries are not verified results. Local submissions are visible only in the browser where they were created.</div>';
 setNav();
}
function renderRules(){
 $("#app").innerHTML='<div class="page-intro"><div><span class="eyebrow">A consistent standard for every game</span><h1>Verification rules</h1><p>Overstrum records should be clear, attributable, and tied to the exact chart that was played.</p></div></div>'+
 '<section class="rules-list">'+
 '<article class="rule-item"><span class="rule-number">01</span><div><h3>Continuous gameplay footage</h3><p>Provide a recording that shows the run from a clear start through the result screen. Avoid cuts, splices, speed changes, or edits that interrupt the attempt.</p></div></article>'+
 '<article class="rule-item"><span class="rule-number">02</span><div><h3>Handcam or input visibility</h3><p>Show the player&#39;s hands or input method clearly when the game or chart rules require it. The evidence should make the performance attributable to the submitting player.</p></div></article>'+
 '<article class="rule-item"><span class="rule-number">03</span><div><h3>Original gameplay audio</h3><p>Keep the gameplay audio unedited and synchronised with the video. Do not replace the game audio or use processing that could conceal timing or gameplay events.</p></div></article>'+
 '<article class="rule-item"><span class="rule-number">04</span><div><h3>Chart MD5 hash</h3><p>Provide the MD5 hash of the exact chart file used. The expected value is 32 hexadecimal characters. Reviewers can use it to distinguish chart revisions and duplicates.</p></div></article>'+
 '<article class="rule-item"><span class="rule-number">05</span><div><h3>Review and pioneer credit</h3><p>A submission remains pending until reviewed. First-verifier recognition is assigned after acceptance, and points are calculated from approved records rather than unreviewed submissions.</p></div></article>'+
 '</section><div class="notice">The current site is a static prototype. The included chart entries are examples for testing the layout, not claims of verified achievements. Do not treat a sample or locally submitted row as an approved record.</div><div class="hero-actions"><a class="button primary" href="'+ROOT_PREFIX+'submit/">Submit a record</a><a class="button ghost" href="'+ROOT_PREFIX+'community/">View community list</a></div>';
 setNav();
}
function renderCurrentRoute(){
 syncCharts();
 try{
  if(route==="home")renderHome();
  else if(route==="games")renderGames();
  else if(route==="submit")renderSubmit();
  else if(route==="rules")renderRules();
  else if(route==="community")renderCommunity();
  else if(route==="leaderboard")renderLeaderboard();
  else if(route.includes("/")){const [legacyEngine,kind]=route.split("/");const engine=legacyEngine==="gh1-2"?"gh1":legacyEngine==="ghwt-wor"?"gh-world-tour":legacyEngine;renderLeaderboard(engine,kind)}
  else renderHome();
 }catch(error){
  console.error("Overstrum page render failed:",error);
  $("#app").innerHTML='<div class="empty-state" role="alert">Overstrum could not render this page. Reload the page to try again.</div>';
 }
}
function init(){
 // Render bundled records first. The site never waits for a network request to leave its loading state.
 baseCharts=FALLBACK_CHARTS.slice();
 syncCharts();
 renderCurrentRoute();

 document.addEventListener("click",event=>{
  const trigger=event.target.closest("[data-open]");
  if(trigger){const panel=document.getElementById("details-"+trigger.dataset.open);if(!panel)return;const open=panel.hidden;panel.hidden=!open;trigger.setAttribute("aria-expanded",String(open));return;}
  const copy=event.target.closest("[data-copy]");
  if(copy){const value=copy.dataset.copy;const done=()=>{const old=copy.textContent;copy.textContent="Copied";setTimeout(()=>copy.textContent=old,1100)};if(navigator.clipboard?.writeText)navigator.clipboard.writeText(value).then(done).catch(()=>fallback());else fallback();function fallback(){const input=document.createElement("textarea");input.value=value;document.body.appendChild(input);input.select();try{document.execCommand("copy");done()}finally{input.remove()}}}
 });

 // This same-origin JSON request only refreshes the bundled data. Failure or timeout leaves
 // the fallback charts and community data already rendered above intact.
 if(typeof fetch==="function"&&typeof AbortController!=="undefined"){
  const controller=new AbortController();
  const timeoutId=setTimeout(()=>controller.abort(),3500);
  fetch(ROOT_PREFIX+"data/charts.json",{signal:controller.signal,cache:"no-store"})
   .then(response=>{if(!response.ok)throw new Error("Chart JSON unavailable");return response.json()})
   .then(data=>{if(!Array.isArray(data))throw new Error("Chart JSON must contain an array");baseCharts=data;renderCurrentRoute()})
   .catch(error=>{console.info("Using bundled Overstrum sample data:",error.message)})
   .finally(()=>clearTimeout(timeoutId));
 }
}
init();
})();
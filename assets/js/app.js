(()=>{
"use strict";
const $=s=>document.querySelector(s);
const route=document.body.dataset.route||"home";
const engines=[{"id":"clone-hero","name":"Clone Hero","short":"CH","games":"Clone Hero"},{"id":"gh3","name":"Guitar Hero III","short":"GH3","games":"Guitar Hero III"},{"id":"gh1-2","name":"Guitar Hero I & II","short":"GH1 + II","games":"Guitar Hero 1 and 2"},{"id":"ghwt-wor","name":"Guitar Hero: World Tour / WoR","short":"WT / WoR","games":"World Tour and Warriors of Rock"},{"id":"yarg","name":"YARG","short":"YARG","games":"YARG"}];
const STORE_KEY="overstrum-submissions-v1";
const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const fmt=value=>Number.isFinite(Number(value))?Number(value).toFixed(1):"—";
const engineFor=id=>engines.find(e=>e.id===id)||{id,name:"Unknown engine",short:"—"};
let baseCharts=[];
let submissions=readSubmissions();
let allCharts=[];
function readSubmissions(){try{const value=JSON.parse(localStorage.getItem(STORE_KEY)||"[]");return Array.isArray(value)?value:[]}catch{return[]}}
function syncCharts(){allCharts=[...baseCharts,...submissions]}
function setNav(){
 const navKey=route==="home"?"home":route==="submit"?"submit":route==="rules"?"rules":route==="community"?"community":"leaderboard";
 document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("active",a.dataset.nav===navKey));
 const toggle=$(".menu-toggle"),nav=$(".main-nav");
 toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
}
function statusFor(c){return c.status==="pending"?"pending":c.demo?"sample":"verified"}
function statusBadge(c){const s=statusFor(c),label=s==="pending"?"Pending review":s==="sample"?"Sample data":"Verified";return '<span class="badge '+s+'">'+label+'</span>'}
function queryUrl(engine,kind){const p=new URLSearchParams();if(engine&&engine!=="all")p.set("engine",engine);if(kind&&kind!=="all")p.set("kind",kind);return "leaderboard/"+(p.toString()?"?"+p.toString():"")}
function renderHome(){
 const uniquePlayers=new Set(allCharts.flatMap(c=>c.victors||[]).concat(submissions.map(c=>c.player).filter(Boolean)));
 const fc=allCharts.filter(c=>c.kind==="fc").length,passes=allCharts.filter(c=>c.kind==="pass").length;
 const recent=[...allCharts].sort((a,b)=>String(b.verifiedAt||"").localeCompare(String(a.verifiedAt||""))).slice(0,3);
 $("#app").innerHTML='<section class="hero"><div><span class="eyebrow">A community archive for five-fret rhythm games</span><h1>Good runs deserve <span>a place.</span></h1><p class="hero-copy">Overstrum collects full combos and hardest passes across the games we play. Browse records, explore the players behind them, and submit a run for review.</p><div class="hero-actions"><a class="button primary" href="leaderboard/">Explore leaderboard <span aria-hidden="true">↗</span></a><a class="button ghost" href="submit/">Submit a record</a></div></div><aside class="hero-summary"><div class="summary-top"><span>List overview</span><span><i class="live-dot"></i>Community maintained</span></div><div class="summary-grid"><div class="summary-stat"><strong>'+allCharts.length+'</strong><span>Listed entries</span></div><div class="summary-stat"><strong>'+uniquePlayers.size+'</strong><span>Players</span></div><div class="summary-stat"><strong>'+fc+'</strong><span>Full combos</span></div><div class="summary-stat"><strong>'+passes+'</strong><span>Passes</span></div></div></aside></section>'+
 '<div class="section-heading"><div><h2>Choose a game</h2><p>Jump into the leaderboard with the engine already selected.</p></div><a class="inline-link" href="leaderboard/">All records ↗</a></div>'+
 '<section class="engine-grid">'+engines.map(e=>'<a class="engine-card" href="'+queryUrl(e.id,"all")+'"><div class="engine-card-top"><span class="engine-icon">'+esc(e.short)+'</span><span class="engine-arrow">↗</span></div><strong>'+esc(e.name)+'</strong><small>'+allCharts.filter(c=>c.engine===e.id).length+' listed entries</small><div class="engine-badges"><span>Full combo</span><span>Pass</span></div></a>').join("")+'</section>'+
 '<div class="section-heading"><div><h2>Recently added</h2><p>The latest entries in the archive.</p></div><a class="inline-link" href="leaderboard/">View leaderboard ↗</a></div>'+
 '<section class="recent-grid">'+recent.map(c=>'<article class="recent-card"><div class="recent-card-top">'+statusBadge(c)+'<span class="badge">'+(c.kind==="fc"?"Full combo":"Pass")+'</span></div><strong>'+esc(c.title)+'</strong><p>'+esc(c.artist||"Artist not supplied")+' · '+esc(engineFor(c.engine).name)+'</p></article>').join("")+'</section>'+
 '<div class="section-heading"><div><h2>How the list works</h2><p>Clear standards, careful review, and useful records.</p></div><a class="inline-link" href="rules/">Read verification rules ↗</a></div>'+
 '<section class="content-grid"><article class="content-card"><h3>Evidence first</h3><p>Runs should be supported by continuous gameplay footage, appropriate handcam or input visibility, and original gameplay audio.</p></article><article class="content-card"><h3>Exact chart identity</h3><p>Chart hashes help distinguish different versions of a chart. A record is not considered reviewed until its chart details are checked.</p></article></section>'+
 '<div class="notice">The records currently bundled with this site are sample data for layout testing, not verified achievements. New submissions are saved locally and remain pending review.</div>';
 setNav();
}
function recordRows(rows){
 if(!rows.length)return '<tr><td colspan="7"><div class="empty-state">No records match these filters.</div></td></tr>';
 return rows.map((c,i)=>{
  const victors=Array.isArray(c.victors)?c.victors:[];
  const hash=typeof c.hash==="string"&&/^[a-f0-9]{32}$/i.test(c.hash)?c.hash:"";
  const artist=c.artist||"Artist not supplied";
  const charter=c.charter||"Charter not supplied";
  const proof=typeof c.video==="string"&&/^https?:\/\//i.test(c.video)?'<a class="proof-link" href="'+esc(c.video)+'" target="_blank" rel="noopener noreferrer">Open video proof ↗</a>':"";
  return '<tr><td class="rank-cell">'+String(i+1).padStart(2,"0")+'</td><td><button class="record-trigger" type="button" data-open="'+esc(c.id)+'" aria-expanded="false"><strong>'+esc(c.title)+'</strong><span>'+esc(artist)+' · '+esc(charter)+'</span></button></td><td class="engine-name">'+esc(engineFor(c.engine).name)+'</td><td><span class="badge">'+(c.kind==="fc"?"FC":"Pass")+'</span></td><td>'+victors.length+' '+(victors.length===1?"victor":"victors")+'</td><td class="nps-cell">'+fmt(c.peakNps)+'</td><td>'+statusBadge(c)+'</td></tr>'+
  '<tr class="detail-row" id="details-'+esc(c.id)+'" hidden><td colspan="7"><div class="detail-panel"><div><span class="detail-label">Victors · first verifier</span><div class="victor-tags">'+(victors.map(v=>'<span class="victor-tag">'+esc(v)+(v===c.firstVerifier?" · Pioneer":"")+'</span>').join("")||'<span class="victor-tag">Awaiting review</span>')+'</div><span class="detail-label" style="margin-top:13px">Score / result</span><span>'+esc(c.score||"Not supplied")+'</span><span class="detail-label" style="margin-top:13px">Points</span><span>'+Number(c.points||0)+'</span></div><div><span class="detail-label">Chart MD5</span><div class="hash-line"><span class="hash-text">'+(hash?esc(hash):"Awaiting chart hash")+'</span>'+(hash?'<button class="copy-button" type="button" data-copy="'+esc(hash)+'">Copy hash</button>':"")+'</div><span class="detail-label" style="margin-top:13px">Charter</span><span>'+esc(charter)+'</span></div><div><span class="detail-label">NPS profile</span><span>Peak '+fmt(c.peakNps)+' · Average '+fmt(c.averageNps)+'</span><span class="detail-label" style="margin-top:13px">Proof</span>'+(proof||'<span class="form-message">No proof link supplied.</span>')+'</div></div></td></tr>';
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
 const defaultKind=seedKind||params.get("kind")||"all";
 $("#app").innerHTML='<div class="page-intro"><div><span class="eyebrow">Browse the archive</span><h1>Leaderboard</h1><p>Explore chart records by game, achievement type, or player. Open any entry for its verification details.</p></div></div>'+
 '<div class="filters"><label class="search-field"><input id="record-search" type="search" placeholder="Search song, artist, charter or victor…" autocomplete="off" aria-label="Search records"></label>'+
 '<select class="select-field" id="engine-filter" aria-label="Filter by engine"><option value="all">All engines</option>'+engines.map(e=>'<option value="'+e.id+'">'+esc(e.name)+'</option>').join("")+'</select>'+
 '<select class="select-field" id="kind-filter" aria-label="Filter by achievement"><option value="all">All achievements</option><option value="fc">Full combos</option><option value="pass">Passes</option></select>'+
 '<select class="select-field" id="status-filter" aria-label="Filter by status"><option value="all">All statuses</option><option value="verified">Verified</option><option value="sample">Sample data</option><option value="pending">Pending review</option></select><span class="filter-count" id="filter-count"></span></div>'+
 '<div class="view-tabs" role="tablist" aria-label="Leaderboard view"><button class="active" type="button" data-view="records" role="tab" aria-selected="true">Chart records</button><button type="button" data-view="players" role="tab" aria-selected="false">Player rankings</button></div>'+
 '<section id="records-view"><div class="table-wrap"><table class="records-table"><thead><tr><th>#</th><th>Song / artist / charter</th><th>Engine</th><th>Type</th><th>Victors</th><th>Peak NPS</th><th>Status</th></tr></thead><tbody id="record-body"></tbody></table></div></section>'+
 '<section id="players-view" hidden><div class="table-wrap"><table class="players-table"><thead><tr><th>#</th><th>Player</th><th>Records</th><th>Pioneer verifications</th><th style="text-align:right">Points</th></tr></thead><tbody id="player-body"></tbody></table></div><p class="field-hint" style="margin-top:10px">Pioneer recognition adds 3 points to a reviewed record. Pending submissions do not earn points until approved.</p></section>'+
 '<div class="notice">Sample records are included to demonstrate the interface and are not verified achievements. Submissions from this browser appear as pending review and are visible only in this browser.</div>';
 const engineEl=$("#engine-filter"),kindEl=$("#kind-filter"),statusEl=$("#status-filter"),searchEl=$("#record-search");
 engineEl.value=engines.some(e=>e.id===defaultEngine)?defaultEngine:"all";
 kindEl.value=["fc","pass"].includes(defaultKind)?defaultKind:"all";
 function updateUrl(){const p=new URLSearchParams();if(engineEl.value!=="all")p.set("engine",engineEl.value);if(kindEl.value!=="all")p.set("kind",kindEl.value);const q=p.toString();history.replaceState({}, "",location.pathname+(q?"?"+q:""))}
 function paint(){
  const q=searchEl.value.trim().toLowerCase();
  const filtered=allCharts.filter(c=>{
   const engineOk=engineEl.value==="all"||c.engine===engineEl.value;
   const kindOk=kindEl.value==="all"||c.kind===kindEl.value;
   const statusOk=statusEl.value==="all"||statusFor(c)===statusEl.value;
   const haystack=[c.title,c.artist,c.charter,c.firstVerifier,...(c.victors||[]),c.player].join(" ").toLowerCase();
   return engineOk&&kindOk&&statusOk&&haystack.includes(q);
  }).sort((a,b)=>Number(b.points||0)-Number(a.points||0)||String(a.title).localeCompare(String(b.title)));
  $("#record-body").innerHTML=recordRows(filtered);
  $("#player-body").innerHTML=renderPlayerTable(filtered);
  $("#filter-count").textContent=filtered.length+" entries";
 }
 [engineEl,kindEl,statusEl].forEach(el=>el.addEventListener("change",()=>{updateUrl();paint()}));
 searchEl.addEventListener("input",paint);
 document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>{
  const view=button.dataset.view;
  document.querySelectorAll("[data-view]").forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active))});
  $("#records-view").hidden=view!=="records";$("#players-view").hidden=view!=="players";
 }));
 paint();setNav();
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
 '<div class="notice"><strong>How this works:</strong> GitHub Pages is a static host, so this form stores submissions in your browser's local storage. They will not appear on another visitor's device. For a shared public submission queue, Overstrum will need a backend or a connected form service.</div>';
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
 '<article class="rule-item"><span class="rule-number">02</span><div><h3>Handcam or input visibility</h3><p>Show the player's hands or input method clearly when the game or chart rules require it. The evidence should make the performance attributable to the submitting player.</p></div></article>'+
 '<article class="rule-item"><span class="rule-number">03</span><div><h3>Original gameplay audio</h3><p>Keep the gameplay audio unedited and synchronised with the video. Do not replace the game audio or use processing that could conceal timing or gameplay events.</p></div></article>'+
 '<article class="rule-item"><span class="rule-number">04</span><div><h3>Chart MD5 hash</h3><p>Provide the MD5 hash of the exact chart file used. The expected value is 32 hexadecimal characters. Reviewers can use it to distinguish chart revisions and duplicates.</p></div></article>'+
 '<article class="rule-item"><span class="rule-number">05</span><div><h3>Review and pioneer credit</h3><p>A submission remains pending until reviewed. First-verifier recognition is assigned after acceptance, and points are calculated from approved records rather than unreviewed submissions.</p></div></article>'+
 '</section><div class="notice">The current site is a static prototype. The included chart entries are examples for testing the layout, not claims of verified achievements. Do not treat a sample or locally submitted row as an approved record.</div><div class="hero-actions"><a class="button primary" href="submit/">Submit a record</a><a class="button ghost" href="community/">View community list</a></div>';
 setNav();
}
function init(){
 fetch("data/charts.json").then(response=>{if(!response.ok)throw new Error("Unable to load the chart database");return response.json()}).then(data=>{
  baseCharts=Array.isArray(data)?data:[];syncCharts();
  if(route==="home")renderHome();
  else if(route==="submit")renderSubmit();
  else if(route==="rules")renderRules();
  else if(route==="community")renderCommunity();
  else if(route==="leaderboard")renderLeaderboard();
  else if(route.includes("/")){const [engine,kind]=route.split("/");renderLeaderboard(engine,kind)}
  else renderHome();
 }).catch(error=>{$("#app").innerHTML='<div class="empty-state">Could not load the Overstrum data. '+esc(error.message)+'</div>';});
 document.addEventListener("click",event=>{
  const trigger=event.target.closest("[data-open]");
  if(trigger){const panel=document.getElementById("details-"+trigger.dataset.open);if(!panel)return;const open=panel.hidden;panel.hidden=!open;trigger.setAttribute("aria-expanded",String(open));return;}
  const copy=event.target.closest("[data-copy]");
  if(copy){const value=copy.dataset.copy;const done=()=>{const old=copy.textContent;copy.textContent="Copied";setTimeout(()=>copy.textContent=old,1100)};if(navigator.clipboard?.writeText)navigator.clipboard.writeText(value).then(done).catch(()=>fallback());else fallback();function fallback(){const input=document.createElement("textarea");input.value=value;document.body.appendChild(input);input.select();try{document.execCommand("copy");done()}finally{input.remove()}}}
 });
}
init();
})();
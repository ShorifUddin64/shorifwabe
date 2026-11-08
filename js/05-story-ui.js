/* story + UI: demo tour, menu, panels, quality, start */
/* ---------- UI + demo tour ---------- */
const menu=$("#menu"),panel=$("#panel");
R.forEach((r,i)=>{const b=document.createElement("button");b.innerHTML=`<i>${String(i+1).padStart(2,"0")}</i>${r.name}`;b.onclick=()=>free(i);menu.appendChild(b)});
const btn=()=>[...menu.children];
{const ob=document.createElement("button");ob.innerHTML="<i>↻</i>360° view";ob.onclick=()=>{run++;demo=false;$("#ex").textContent="Replay demo";closePanel();resetActors();startOrbit()};menu.appendChild(ob)}
let run=0,paused=false,demo=true;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function wait(ms,id){let t=0;while(t<ms){if(id!==run)throw 0;await sleep(100);if(!paused)t+=100}}
async function until(id,f){while(!f()){if(id!==run)throw 0;await sleep(60)}}
async function arrive(id,both){await until(id,()=>!vis.userData.path.length&&(!both||!recep.userData.path.length));await wait(500,id)}
function cap(t,sub){$("#ct").textContent=t;$("#cp").textContent=sub;btn().forEach(b=>b.classList.remove("on"))}
function resetActors(){if(!vis.visible||vis.position.x<-26){vis.visible=true;vis.position.set(HX,0,-6.6)}vis.userData.path=[];sit(vis,false);recep.userData.path=[];recep.position.set(HX,0,-11.4);sit(recep,true);recep.rotation.y=0;recep.userData.knock=recep.userData.wave=guard.userData.wave=false;gate.target=0;door.target=0;offs.forEach((o,k)=>{if(o){const c=cc(k);o.userData.path=[];o.position.set(c.cx+2.3,-.3,c.s*11.5);o.rotation.y=c.s<0?Math.PI:0;o.userData.seated=true;o.userData.atTable=false;o.userData.face=null}})}
function startOrbit(){tw=null;orbit.a=Math.atan2(cam.position.x,cam.position.z-4);orbit.on=true;cap("Your business. Your own world.","Explore the complete 360° view. Drag to rotate, scroll to zoom.")}
function caption(i){$("#ct").textContent=R[i].cap;$("#cp").textContent=R[i].sub;btn().forEach((b,j)=>b.classList.toggle("on",j==i))}
function closePanel(){panel.hidden=true;panel.innerHTML=""}
function openPanel(html){panel.hidden=false;panel.innerHTML=html+'<button class="x" aria-label="Close">×</button>';panel.querySelector(".x").onclick=closePanel;panel.style.animation="none";panel.offsetHeight;panel.style.animation=""}
async function typeInto(el,text,id){el.value="";for(const ch of text){if(id!==run)throw 0;el.value+=ch;await sleep(38);while(paused){if(id!==run)throw 0;await sleep(100)}}}
function showRoom(i,id){
  const r=R[i];
  if(i==0){openPanel(`<small>RECEPTIONIST</small><h2>${r.title}</h2><p>${r.text}</p><div class="opts">${[1,2,3,4].map(n=>`<button class="opt" data-i="${n}">${R[n].name} ↗</button>`).join("")}</div><button class="pri" data-i="6">Meet the boss · knock first ↗</button><button class="ghost" id="jx">Just exploring ↗</button>`);
    panel.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>free(+b.dataset.i));$("#jx").onclick=closePanel}
  else if(i==6){openPanel(`<small>BOSS CABIN</small><h2>${r.title}</h2><p>${CONFIG.bossQuestion}</p><textarea id="ta" aria-label="Your reply" placeholder="Type your reply…"></textarea><p class="note" id="nt"></p><button class="pri" id="sd"></button><div id="rp"></div>`);
    const ta=$("#ta"),sd=$("#sd"),nt=$("#nt");
    if(demo&&id){nt.textContent="This demo types a sample reply automatically.";sd.textContent="Automatic reply…";sd.disabled=true;sd.style.opacity=.7;
      typeInto(ta,CONFIG.sampleReply,id).then(()=>wait(800,id)).then(()=>bossReply()).catch(()=>{})}
    else{sd.textContent="Send reply";ta.focus();sd.onclick=bossReply}}
  else openPanel(`<small>OFFICER · ${r.name.toUpperCase()}</small><h2>${r.title}</h2><p>${r.text}</p><div class="tags">${r.tags.map(t=>`<span>${t}</span>`).join("")}</div>`)}
function bossReply(){const rp=$("#rp");if(!rp||!$("#ta").value.trim())return;const a=CONFIG.bossAnswers[Math.floor(Math.random()*CONFIG.bossAnswers.length)];rp.innerHTML=`<div class="reply"><b>Boss:</b> ${a}</div><a class="pri" style="display:inline-block;text-decoration:none" href="mailto:${CONFIG.email}">Email me</a>`}
async function go(i,id){caption(i);const c=roomCam(i);camTo(c.p,c.l);closePanel();for(let k=1;k<=4;k++)if(offs[k]&&offs[k].userData.atTable)officerBack(k);sit(vis,false);if(i==6)door.target=1;dest(vis,i);await arrive(id);if(i>0)sit(vis,true);if(i>=1&&i<=4)await officerJoin(i,id);showRoom(i,id)}
async function free(i){run++;demo=false;orbit.on=false;resetActors();$("#ex").textContent="Replay demo";try{await go(i,run)}catch(e){}}
const GC={p:V(-47,14,16),l:V(-27,0,-1)};
const say=(who,t,x)=>openPanel(`<small>${who}</small><h2>${t}</h2><p>${x}</p>`);
const hl=n=>{const b=panel.querySelector('[data-i="'+n+'"]');if(b)b.style.background="#cfe0d3"};
async function story(id){
  resetActors();vis.visible=false;vcar.position.set(-42,0,60);vcar.rotation.y=Math.PI/2;vcar.userData.path=[];vcar.userData.faceAng=undefined;
  cap("Welcome to the office","From the first impression to every room inside.");camTo(OV.p,OV.l,1);await wait(3200,id);
  cap("A world built around your business","An interactive space, alive with detail.");camTo(V(-40,38,70),V(-8,0,10),3);await wait(3500,id);
  cap("Small details. A living world.","Follow the guard as he cares for the garden.");camTo(V(-18,10,22),V(-25,1,9),2.5);
  guard.userData.can.visible=true;guard.userData.path=[[-26,2],[-24.3,8.4]];guard.userData.face=[-25.5,10];await until(id,()=>!guard.userData.path.length);
  guard.userData.water=true;await wait(5000,id);guard.userData.water=false;guard.userData.can.visible=false;guard.userData.path=[[-26,2],[-26,-2.7]];guard.userData.face=[-31,0];
  cap("Life beyond the office","A continuous jog around the building.");camTo(V(32,26,34),V(0,0,0),2.5);await wait(4500,id);
  cap("A personal welcome","Follow your receptionist, meet the boss and head home.");camTo(GC.p,GC.l,2);
  vcar.userData.path=[[-42,30],[-42,16],[-41.3,12]];vcar.userData.faceAng=Math.PI/2;await until(id,()=>!vcar.userData.path.length);await wait(900,id);
  vis.visible=true;vis.position.set(-39.4,0,12.4);vis.userData.path=[[-36,8],[-32,2],[-30,0]];vis.userData.face=[-24,0];await arrive(id);
  guard.userData.wave=true;gate.target=1;await wait(1600,id);guard.userData.wave=false;
  vis.userData.path=[[-26,0],[-20,0],[-20,11.2],[-19,12.5]];vis.userData.face=[-19,5];caption(5);camTo(CAM[5].p,CAM[5].l,2.5);
  await arrive(id);sit(vis,true);gate.target=0;
  say("THE LOUNGE","Please take a seat","The receptionist will call you in a moment.");await wait(3000,id);
  recep.userData.wave=true;say("RECEPTIONIST","Hello, you can come over now.","Tell me who you would like to see.");await wait(2400,id);recep.userData.wave=false;
  sit(vis,false);dest(vis,0);caption(0);camTo(CAM[0].p,CAM[0].l,2);await arrive(id);
  showRoom(0,id);await wait(2800,id);hl(1);await wait(1000,id);
  caption(1);camTo(CAM[1].p,CAM[1].l);closePanel();sit(recep,false);guide(recep,1);await wait(1200,id);dest(vis,1);await arrive(id,1);sit(vis,true);back();await officerJoin(1,id);
  showRoom(1,id);await wait(3400,id);officerBack(1);
  for(const i of [2,3,4]){caption(i);camTo(CAM[i].p,CAM[i].l);closePanel();sit(vis,false);dest(vis,i);await arrive(id);sit(vis,true);await officerJoin(i,id);showRoom(i,id);await wait(3400,id);officerBack(i)}
  closePanel();sit(vis,false);dest(vis,0);caption(0);camTo(CAM[0].p,CAM[0].l,2);await arrive(id);showRoom(0,id);await wait(2400,id);hl(6);await wait(1000,id);
  closePanel();caption(6);camTo(CAM[6].p,CAM[6].l,2);sit(recep,false);
  recep.userData.path=[...exitPts(recep.position.x,recep.position.z),[10.2,0],[10.2,-.9]];recep.userData.face=[18,-.9];
  await wait(1200,id);vis.userData.path=[...exitPts(vis.position.x,vis.position.z),[8.8,0],[8.8,.1]];vis.userData.face=[12,0];await arrive(id,1);
  recep.userData.knock=true;await wait(1800,id);recep.userData.knock=false;door.target=1;back();await wait(1000,id);
  vis.userData.path=[[14,0],[18.3,0],[18.3,1.4]];vis.userData.face=[21,1.4];await until(id,()=>!vis.userData.path.length);sit(vis,true);door.target=0;await wait(800,id);
  showRoom(6,id);await wait(7500,id);closePanel();
  cap("Heading home","Through security and directly to the car.");camTo(V(0,36,26),V(0,0,2),2.5);
  sit(vis,false);door.target=1;vis.userData.face=null;vis.userData.path=[...exitPts(vis.position.x,vis.position.z),[-20,0],[-24,0]];await until(id,()=>!vis.userData.path.length);
  door.target=0;guard.userData.wave=true;gate.target=1;camTo(GC.p,GC.l,2);await wait(1500,id);guard.userData.wave=false;
  vis.userData.path=[[-32,0],[-36,6],[-39.4,12.4]];await arrive(id);
  vis.visible=false;gate.target=0;cap("Until next time","Your visitor drives away.");
  vcar.userData.faceAng=undefined;vcar.userData.path=[[-41.3,0],[-42,-40],[-42,-130]];await wait(6500,id);
  startOrbit();demo=false;$("#ex").textContent="Replay demo"}
async function tour(){const id=++run;demo=true;paused=false;$("#pz").textContent="Pause";$("#ex").textContent="Exit demo";closePanel();orbit.on=false;try{await story(id)}catch(e){}}
$("#pz").onclick=()=>{paused=!paused;$("#pz").textContent=paused?"Resume":"Pause"};
$("#ex").onclick=()=>{if(demo){run++;demo=false;paused=false;resetActors();$("#pz").textContent="Pause";$("#ex").textContent="Replay demo";closePanel();camTo(OV.p,OV.l,1.4)}else tour()};
$("#q").onchange=e=>quality(+e.target.value);$("#tod").onchange=e=>{todT=+e.target.value;gradeEnv()};

let drag=null;cv.addEventListener("pointerdown",e=>{drag=e.clientX});addEventListener("pointerup",()=>drag=null);
addEventListener("pointermove",e=>{if(drag!==null&&orbit.on){orbit.a-=(e.clientX-drag)*.005;drag=e.clientX}});
cv.addEventListener("wheel",e=>{orbit.R=Math.max(35,Math.min(120,orbit.R+e.deltaY*.05))},{passive:true});
quality(2);loop();
setTimeout(()=>{$("#load").style.opacity=0;setTimeout(()=>$("#load").remove(),700);tour()},600);

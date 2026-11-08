/* motion: camera tween, walking, main animation loop */
/* ---------- camera tween ---------- */
const OV={p:new THREE.Vector3(-34,52,66),l:new THREE.Vector3(4,0,-2)};
const cp=OV.p.clone(),cl=OV.l.clone();cam.position.copy(cp);cam.lookAt(cl);
let tw=null;const orbit={on:false,a:0,R:80};
function camTo(p,l,d=1.8){orbit.on=false;tw={t:0,d,p0:cam.position.clone(),l0:cl.clone(),p1:p,l1:l}}
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
const CAM=[{p:V(HX+3.5,9.5,1.5),l:V(HX,.5,-9.5)},{p:V(CX[0],17,5),l:V(CX[0],0,-6)},{p:V(CX[1],17,5),l:V(CX[1],0,-6)},{p:V(CX[0],17,-5),l:V(CX[0],0,6)},{p:V(CX[1],17,-5),l:V(CX[1],0,6)},{p:V(-11,15,-2),l:V(-19,0,9)},{p:V(6,19,12),l:V(17,0,1)}];
const roomCam=i=>CAM[i];

/* ---------- walking ---------- */
const isRec=(x,z)=>z>10&&x<-18;
function sit(p,on){p.userData.seated=on;p.position.y=on?-.3:0}
const cl2=x=>x<-1.3?CX[0]:CX[1];
function exitPts(x,z){
  if(x<-26)return[];
  if(x<-12.5){if(z<-10.8)return[[-22,z],[-22,-5],[HX,0]];if(z>6)return[[-20,Math.min(z,11.2)],[-20,0]];return Math.abs(z)>1.8?[[x,0]]:[]}
  if(x>11)return[[Math.min(x,18.3),0],[13,0]];
  if(Math.abs(z)>2.4){const s=z<0?-1:1;return[[cl2(x),s*3.4],[cl2(x),0]]}
  return Math.abs(z)>1.5?[[x,0]]:[]}
const cc=i=>({cx:CX[(i-1)%2],s:i<3?-1:1});
function destPts(i){if(i==0)return{e:[[HX,0],[HX,-6.6]],f:[HX,-10]};if(i==5)return{e:[[-20,0],[-20,11.2],[-19,12.5]],f:[-19,5]};
  if(i==6)return{e:[[14,0],[18.3,0],[18.3,1.4]],f:[21,1.4]};const c=cc(i);return{e:[[c.cx,0],[c.cx,c.s*3.4],[c.cx+1.3,c.s*5.4]],f:[c.cx+1.3,c.s*8]}}
function dest(p,i){const d=destPts(i),q=p.position;p.userData.path=[...exitPts(q.x,q.z),...d.e];p.userData.face=d.f}
function guide(p,i){const c=cc(i),q=p.position;p.userData.path=[...exitPts(q.x,q.z),[c.cx-.6,0],[c.cx-.6,c.s*3.5]];p.userData.face=[c.cx+1.3,c.s*5.4]}
function offGo(i){const o=offs[i],c=cc(i),s=c.s;sit(o,false);o.userData.path=[[c.cx+3,s*10.2],[c.cx+3,s*9],[c.cx+1.3,s*9]];o.userData.face=[c.cx+1.3,s*5.4]}
async function officerJoin(i,id){const o=offs[i];offGo(i);await until(id,()=>!o.userData.path.length);sit(o,true);o.userData.atTable=true;await wait(500,id)}
function officerBack(i){const o=offs[i],c=cc(i),s=c.s,id=run;o.userData.atTable=false;sit(o,false);o.userData.path=[[c.cx+3,s*9],[c.cx+3,s*10.2],[c.cx+2.3,s*11.5]];o.userData.face=[c.cx+2.3,s*14];until(id,()=>!o.userData.path.length).then(()=>sit(o,true)).catch(()=>{})}
function back(){const p=recep,id=run,q=p.position;p.userData.path=[...exitPts(q.x,q.z),[HX,0],[-22,-4],[-22,-11.4],[HX,-11.4]];p.userData.face=[HX,10];until(id,()=>!p.userData.path.length).then(()=>sit(recep,true)).catch(()=>{})}
function turn(g,a,k){let d=a-g.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));g.rotation.y+=d*k}
function walk(p,dt,t,sp){const u=p.userData,w=u.path&&u.path.length;
  if(w){const q=u.path[0],dx=q[0]-p.position.x,dz=q[1]-p.position.z,d=Math.hypot(dx,dz),s=sp*dt;
    if(d<=s){p.position.x=q[0];p.position.z=q[1];u.path.shift()}else{p.position.x+=dx/d*s;p.position.z+=dz/d*s;turn(p,Math.atan2(dx,dz),.2)}
    const a=Math.sin(t*10)*.7;u.lL.rotation.x=a;u.lR.rotation.x=-a;u.aL.rotation.x=-a;u.aR.rotation.x=a}
  else{const z=u.seated;u.lL.rotation.x=u.lR.rotation.x=z?-1.45:0;u.aL.rotation.x=u.aR.rotation.x=z?-.9:0;
    if(u.knock)u.aR.rotation.x=-1.5+Math.sin(t*18)*.35;if(u.wave)u.aR.rotation.x=-2.4+Math.sin(t*6)*.2;if(u.water)u.aR.rotation.x=-1.1;
    if(u.face)turn(p,Math.atan2(u.face[0]-p.position.x,u.face[1]-p.position.z),.08)}}
function drive(c,dt,sp){const u=c.userData,q=u.path[0];if(q){const dx=q[0]-c.position.x,dz=q[1]-c.position.z,d=Math.hypot(dx,dz),s=sp*dt;if(d<=s){c.position.x=q[0];c.position.z=q[1];u.path.shift()}else{c.position.x+=dx/d*s;c.position.z+=dz/d*s;turn(c,Math.atan2(-dz,dx),.08)}}else if(u.faceAng!==undefined)turn(c,u.faceAng,.08)}

/* ---------- loop ---------- */
const clock=new THREE.Clock();let T=0;
function loop(){requestAnimationFrame(loop);const dt=Math.min(clock.getDelta(),.05);T+=dt;
  if(tw){tw.t+=dt/tw.d;const k=Math.min(tw.t,1),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;cam.position.lerpVectors(tw.p0,tw.p1,e);cl.lerpVectors(tw.l0,tw.l1,e);if(k>=1)tw=null}
  if(orbit.on&&!tw){orbit.a+=dt*.1;cam.position.lerp(new THREE.Vector3(Math.sin(orbit.a)*orbit.R,orbit.R*.62,Math.cos(orbit.a)*orbit.R+4),.04);cl.lerp(new THREE.Vector3(0,0,4),.05)}
  cam.lookAt(cl);updateTOD(dt);if(window.glbTickAll)glbTickAll(dt);
  walk(vis,dt,T,5.5);walk(recep,dt,T,5.5);walk(guard,dt,T,5.5);walk(boss,dt,T,5.5);offs.forEach(o=>o&&walk(o,dt,T,5.5));drive(vcar,dt,12);
  [gate,door].forEach(o=>{o.t+=(o.target-o.t)*Math.min(1,dt*2.5)});gate.L.rotation.y=gate.t*1.5;gate.R.rotation.y=-gate.t*1.5;door.L.rotation.y=door.t*1.5;
  sitters.forEach((s,i)=>{s.userData.head.position.y=1.68+Math.sin(T*1.6+i)*.012});
  cars.forEach((c,i)=>{c.position.x+=dt*(i%2?-1:1)*(10+i*2);if(c.position.x>90)c.position.x=-90;if(c.position.x<-90)c.position.x=90});
  if(!jog.userData.path.length)jog.userData.path=jog.userData.loop.map(a=>a.slice());walk(jog,dt,T,6);
  train.position.x+=dt*14;if(train.position.x>100)train.position.x=-150;
  guard.userData.can.rotation.x=guard.userData.water?1.5:0;
  if(guard.userData.water){const gp=guard.position,ry=guard.rotation.y,fx=Math.sin(ry),fz=Math.cos(ry);drops.forEach((d,i)=>{const t=(T*1.6+i/6)%1;d.visible=true;d.position.set(gp.x+fx*(.75+t*.35),1.05-t,gp.z+fz*(.75+t*.35))})}else drops.forEach(d=>d.visible=false);
  clouds.forEach(c=>{c.position.x+=dt*1.5;if(c.position.x>200)c.position.x=-200});
  if(window.seaWave){seaWave.offset.x+=dt*.004;seaWave.offset.y+=dt*.002}
  spinners.forEach(h=>h.rotation.x+=dt*h.userData.sp);
  steam.forEach(q=>{const u=(T*.25+q.ph)%1;q.sp.position.y=q.y+u*14;q.sp.material.opacity=.55*(1-u);q.sp.scale.set(q.sc*(1+u*.8),q.sc*.7*(1+u*.8),1)});
  movers.forEach(m=>{const p=m.g.position;if(m.ax=="x"){p.x+=m.sp*dt;if(m.sp>0&&p.x>m.max)p.x=m.min;if(m.sp<0&&p.x<m.min)p.x=m.max}else{p.z+=m.sp*dt;if(m.sp>0&&p.z>m.max)p.z=m.min;if(m.sp<0&&p.z<m.min)p.z=m.max}});
  boat.position.x+=dt*3;if(boat.position.x>120)boat.position.x=-120;boat.position.y=Math.sin(T)*.05;
  peds.forEach(p=>{if(!p.userData.path.length)p.userData.path=p.userData.loop.map(a=>a.slice());walk(p,dt,T+p.userData.ph,2.3)});
  kids.forEach((k,i)=>{const a=T*.7+i*1.6,r=4+i%2*2.5;k.position.set(52+Math.cos(a)*r*1.6,0,Math.sin(a)*r);k.rotation.y=-a;const w=Math.sin(T*9+i)*.7;k.userData.lL.rotation.x=w;k.userData.lR.rotation.x=-w;k.userData.aL.rotation.x=-w;k.userData.aR.rotation.x=w});
  ren.render(scene,cam)}

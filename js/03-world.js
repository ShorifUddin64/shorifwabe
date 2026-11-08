/* world: office rooms, city, trees, cars, districts */
/* ---------- environment ---------- */
mesh(new THREE.BoxGeometry(640,.2,420),SM(tex(128,128,(window.drawGrass=(g,w,h)=>{g.fillStyle="#6f9468";g.fillRect(0,0,w,h);noise(g,w,h,700,.08);for(let i=0;i<500;i++){g.fillStyle=`rgba(${50+Math.random()*50|0},${100+Math.random()*60|0},60,.2)`;g.fillRect(Math.random()*w,Math.random()*h,2,3)}}),108,72),1),0,-.2,60);
const road=(w,d,x,z,rx,ry)=>mesh(new THREE.BoxGeometry(w,.1,d),SM(tex(128,128,drawAsph,rx,ry),.95),x,-.04,z);
road(560,8,0,28,65,1);road(8,100,-44,-10,1,12);mesh(new THREE.BoxGeometry(12,.1,64),SM(tex(128,128,(g,w,h)=>{g.fillStyle="#c2bca9";g.fillRect(0,0,w,h);g.strokeStyle="rgba(90,85,70,.35)";g.lineWidth=2;g.strokeRect(0,0,w,h);noise(g,w,h,500,.08)},3,22),.9),-34,-.025,-2);road(8,100,70,-10,1,12);
mesh(new THREE.BoxGeometry(140,.1,6),SM(tex(128,128,(g,w,h)=>{g.fillStyle="#c2bca9";g.fillRect(0,0,w,h);g.strokeStyle="rgba(90,85,70,.35)";g.lineWidth=2;g.strokeRect(0,0,w,h);noise(g,w,h,500,.08)},46,2),.9),0,-.03,21);
for(let x=-280;x<280;x+=8){box(3,.02,.25,x,.03,28,0xf2f2ee)}
for(let z=-55;z<24;z+=8){box(.25,.02,3,-44,.03,z,0xf2f2ee);box(.25,.02,3,70,.03,z,0xf2f2ee)}
for(let z=24.6;z<31.6;z+=1){box(3,.02,.5,-36,.035,z,0xf4f4f0)}
mesh(new THREE.BoxGeometry(46,.3,30),SM(tex(256,256,drawWood,7.4,5),.55,0,0xeadfca),0,-.1,0);
mesh(new THREE.BoxGeometry(46,.31,4),SM(tex(256,64,drawWood,7.4,1),.55,0,0xf6f0e2),0,-.09,0); // corridor
// ---- signs on boards
function signMat(t,w,h,bg,fg,ff){const c=document.createElement("canvas");c.width=512;c.height=Math.max(64,Math.round(512*h/w));const g=c.getContext("2d");g.fillStyle=bg;g.fillRect(0,0,512,c.height);g.strokeStyle="#c99a6b";g.lineWidth=10;g.strokeRect(5,5,502,c.height-10);g.fillStyle=fg;g.font="bold "+Math.round(c.height*.46)+"px "+(ff||"Trebuchet MS,Arial,sans-serif");g.textAlign="center";g.textBaseline="middle";g.fillText(t,256,c.height/2+2,470);return new THREE.MeshStandardMaterial({map:ct(c),roughness:.7})}
function sign(t,w,h,x,y,z,ry=0,bg="#7fa593",fg="#ffffff",ff){const m=signMat(t,w,h,bg,fg,ff),wd=M(0xc99a6b);const b=mesh(new THREE.BoxGeometry(w,h,.12),[wd,wd,wd,wd,m,m],x,y,z);b.rotation.y=ry;return b}
function floorText(t,x,z,rz=0){const c=document.createElement("canvas");c.width=512;c.height=96;const g=c.getContext("2d");g.fillStyle="rgba(70,95,85,.38)";g.font="bold 54px Trebuchet MS,Arial,sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillText(t,256,48);const m=new THREE.Mesh(new THREE.PlaneGeometry(4.2,.8),new THREE.MeshBasicMaterial({map:ct(c),transparent:true,depthWrite:false}));m.rotation.set(-Math.PI/2,0,rz);m.position.set(x,.1,z);scene.add(m)}
// ---- office shell (46 x 30)
function wall(x,z,w,d,h=1.9){box(w,h,d,x,h/2,z,0xf3efe2);box(w+.1,.1,d+.1,x,h,z,0xc99a6b)}
wall(0,-15,46.4,.4);wall(0,15,46.4,.4);wall(23,0,.4,30);wall(-23,-8.5,.4,13);wall(-23,8.5,.4,13);wall(11,-8,.3,14);wall(11,8,.3,14);
box(56,.06,38,0,-.03,0,0xbab4a2);
const barT=len=>tex(32,64,(g,w,h)=>{g.fillStyle="#2f4a3f";g.fillRect(12,0,8,h)},len/.34,1);
function bw(x,z,len,ax){const gW=ax=="x"?len:.35,gD=ax=="x"?.35:len;
  box(gW,.8,gD,x,.4,z,0xefece2);box(gW+.04,.06,gD+.04,x,.82,z,0xd8d3c3);
  const m=new THREE.MeshStandardMaterial({map:barT(len),alphaTest:.5,side:THREE.DoubleSide,roughness:.6});
  const p=mesh(new THREE.PlaneGeometry(len,.8),m,x,1.25,z);p.castShadow=false;if(ax!="x")p.rotation.y=Math.PI/2;
  box(gW,.06,gD,x,1.65,z,0x2f4a3f);
  for(let t=-len/2;t<=len/2+.01;t+=7){const px=ax=="x"?x+t:x,pz=ax=="x"?z:z+t;box(.4,1.75,.4,px,.87,pz,0xcfc9b6)}}
bw(-28,-10.5,17,"z");bw(-28,10.5,17,"z");bw(0,19,56,"x");bw(0,-19,56,"x");bw(28,0,38,"z");
box(5,.06,4.4,-25.5,.04,0,0xd7d2c2);box(2.4,.03,2,-21.8,.09,0,0x9fc0a5);
const tileD=(a,b)=>(g,w,h)=>{const n=4,t=w/n;for(let i=0;i<n;i++)for(let j=0;j<n;j++){g.fillStyle=(i+j)%2?a:b;g.fillRect(i*t,j*t,t,t)}g.strokeStyle="rgba(60,50,40,.35)";g.lineWidth=2;for(let i=0;i<=n;i++){g.beginPath();g.moveTo(i*t,0);g.lineTo(i*t,h);g.moveTo(0,i*t);g.lineTo(w,i*t);g.stroke()}noise(g,w,h,300,.05)};
const drawPale=(g,w,h)=>{g.fillStyle="#ebe8de";g.fillRect(0,0,w,h);for(let i=0;i<16;i++){g.fillStyle=`rgba(${185+Math.random()*35|0},${180+Math.random()*30|0},${165+Math.random()*30|0},.3)`;g.fillRect(0,i*h/16,w,h/16);g.fillStyle=i%5==0?"rgba(201,154,107,.55)":"rgba(120,110,95,.18)";g.fillRect(0,i*h/16,w,i%5==0?2:1);for(let j=0;j<2;j++)g.fillRect((i*71+j*131)%w,i*h/16,1,h/16)}noise(g,w,h,500,.05)};
const fl=(w,d,x,z,c,rx=3,ry=3)=>mesh(new THREE.BoxGeometry(w,.12,d),SM(tex(256,256,drawWood,rx,ry),.5,0,c),x,.02,z);
mesh(new THREE.BoxGeometry(10.8,.12,30),SM(tex(256,256,drawPale,1.5,4),.5),-17.6,.02,0);box(9.6,.02,.22,HX,.095,-14.1,0xc99a6b);box(9.6,.02,.22,HX,.095,-3.9,0xc99a6b);box(.22,.02,10.4,HX-4.8,.095,-9,0xc99a6b);box(.22,.02,10.4,HX+4.8,.095,-9,0xc99a6b);mesh(new THREE.BoxGeometry(12,.12,29.6),SM(tex(256,256,drawPale,1.5,4),.5),17,.02,0);
box(7,.02,6,-19,.085,10.5,0xcbd5c0);if(STYLE.redCarpet){box(7,.02,6,-19,.095,10.5,0xd9825f);box(5.4,.02,4.4,-19,.105,10.5,0xf0d9a0);box(39,.02,1.8,-8.5,.095,0,0xa3262a);box(39,.021,.08,-8.5,.096,.95,0xd9b36a);box(39,.021,.08,-8.5,.096,-.95,0xd9b36a);box(8,.02,1.8,15,.095,0,0xa3262a)}box(6,.02,3.5,HX,.085,-6.5,0xd8d2c0);
// ---- glass partitions + chairs
const gP=(x,z)=>box(.12,1.6,.12,x,.8,z,0x24352f);
function gl(x,z,w,d,gm=glassM){const L=Math.max(w,d),n=Math.max(1,Math.round(L/2.4));
  mesh(new THREE.BoxGeometry(w,1,d),gm,x,.95,z);box(w+.02,.4,d+.02,x,.2,z,0xf1eee4);box(w,.07,d,x,1.45,z,0x24352f);box(w+.01,.04,d+.01,x,.43,z,0xc99a6b);
  for(let i=1;i<n;i++){const t=-L/2+i*L/n;if(w>d)box(.06,1,d+.02,x+t,.95,z,0x24352f);else box(w+.02,1,.06,x,.95,z+t,0x24352f)}}
function gdoor(x,z,dir,s,gm){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=dir*s*1.2;scene.add(g);mesh(new THREE.BoxGeometry(1.15,1.45,.05),gm,dir*.6,.8,0,g);box(1.2,.06,.08,dir*.6,1.55,0,0x24352f,g);box(1.2,.06,.08,dir*.6,.07,0,0x24352f,g);box(.06,1.5,.08,dir*1.2,.8,0,0x24352f,g)}
function chair(x,z,ry,c){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;scene.add(g);box(.8,.1,.8,0,.5,0,c,g);box(.8,.8,.1,0,.95,.4,c,g);cyl(.06,.06,.5,0,.25,0,0x333,g,6);box(.6,.06,.6,0,.05,0,0x333,g)}
// glass cluster: 2 desks with workers (black suits) + shared table with 2 empty chairs (s=-1 north, +1 south)
const offs=[];
function cluster(cx,s,i){const z0=s*2.4,z1=s*14.8,zm=(z0+z1)/2,ry=s<0?0:Math.PI;
  const gm=new THREE.MeshStandardMaterial({color:LC(STYLE.tiles?[0x7fd0cc,0x9bb8e6,0xe6cf8c,0x9ed8a0][i-1]:0xbfe0e0),transparent:true,opacity:.32,roughness:.08,metalness:.1});
  const TC=[["#2f8f8c","#e9f0ea"],["#c4694a","#f1e3cf"],["#d9a43a","#f4ecd6"],["#5f9a6a","#eaf1e6"]][i-1];
  mesh(new THREE.BoxGeometry(10.4,.12,12.4),SM(tex(256,256,STYLE.tiles?tileD(TC[0],TC[1]):drawPale,1.5,2),.5),cx,.02,s*8.6);
  box(10.4,.7,.07,cx,.35,s*14.77,STYLE.tiles?[0x2f8f8c,0xc4694a,0xd9a43a,0x5f9a6a][i-1]:0xe3dccb);box(10.4,.06,.08,cx,.72,s*14.76,0xc99a6b);
  gl(cx-5.2,zm,.1,12.4,gm);gl(cx+5.2,zm,.1,12.4,gm);gl(cx-3.2,z0,4,.1,gm);gl(cx+3.2,z0,4,.1,gm);gdoor(cx-1.2,z0,1,s,gm);gdoor(cx+1.2,z0,-1,s,gm);
  [[cx-5.2,z0],[cx+5.2,z0],[cx-1.2,z0],[cx+1.2,z0],[cx-5.2,z1],[cx+5.2,z1]].forEach(p=>gP(p[0],p[1]));
  desk(cx-2.3,s*12.6,ry,0x1a1a1f);desk(cx+2.3,s*12.6,ry,0);const off=person(0x14141a,true,1);off.position.set(cx+2.3,-.3,s*11.5);off.rotation.y=s<0?Math.PI:0;off.userData.seated=true;off.userData.path=[];offs[i]=off;
  box(3.8,.1,1.3,cx,.8,s*7.2,0xc99a6b);box(.1,.8,1.1,cx-1.7,.4,s*7.2,0x2f4a3f);box(.1,.8,1.1,cx+1.7,.4,s*7.2,0x2f4a3f);
  cyl(.07,.07,.12,cx-.8,.91,s*7.2,0xc4694a,scene,8);cyl(.07,.07,.12,cx+.9,.91,s*7.1,0xc4694a,scene,8);box(.5,.02,.35,cx,.86,s*7.3,0xefece2);
  [-1.3,1.3].forEach(o=>{chair(cx+o,s*5.4,ry,0xb5714d);chair(cx+o,s*9,s<0?Math.PI:0,0xb5714d)});
  box(2,1.1,.06,cx-2.4,1.15,s*14.78,0xc99a6b);box(1.8,.9,.07,cx-2.4,1.15,s*14.75,0xd9b36a);box(2.2,1.2,.06,cx+2.2,1.15,s*14.78,0xc9a67a);box(1.9,1,.07,cx+2.2,1.15,s*14.75,0xe8e3d3);box(.8,.55,.08,cx+1.8,1.2,s*14.7,0x2f5846);box(.6,.45,.08,cx+2.7,1,s*14.7,0xc4694a);
  plant(cx-4.6,s*3.9,1,0);plant(cx+4.6,s*13.8,1,1);floorText(R[i].name.toUpperCase(),cx-2.4,s*3.6,s>0?Math.PI:0)}
cluster(CX[0],-1,1);cluster(CX[1],-1,2);cluster(CX[0],1,3);cluster(CX[1],1,4);
[[-12.8,-3.3,0],[-12.8,3.3,0],[-1.3,-3.3,0],[-1.3,3.3,0],[10.3,-3.3,0],[10.3,3.3,0]].forEach(p=>plant(p[0],p[1],1,p[2]));
// ---- hall: reception desk (north) + waiting lounge (south)
box(5,1.2,1.4,HX,.6,-9.6,0xd9c7a6);box(5.2,.1,1.6,HX,1.25,-9.6,0xc99a6b);
for(let k=-2.1;k<=2.1;k+=.4)box(.14,1.1,.1,HX+k,.55,-8.88,0xefe7d2);
sign("RECEPTION",2.4,.6,HX,.7,-8.86,0);box(.9,.55,.06,HX+1.1,1.55,-9.7,0x1d2b2a);box(.5,.02,.4,HX-1.6,1.31,-9.4,0x2f5846);
box(.8,.1,.8,HX,.45,-11.4,0x2a4a6a);box(.8,1.3,.12,HX,1.05,-11.9,0x2a4a6a);box(.5,.3,.12,HX,1.8,-11.9,0x2a4a6a);
cyl(.1,.08,.35,HX+2.1,1.47,-9.3,0xe8e3d3);[[0,0],[.08,.05],[-.07,.06]].forEach(f=>{cyl(.01,.01,.35,HX+2.1+f[0],1.8,-9.3+f[1],0x4f8a4e);ball(.07,HX+2.1+f[0],1.98,-9.3+f[1],0xffffff)});
{const rh=recep.userData.head;box(.21,.3,.08,0,-.09,-.1,0x2a1a14,rh);ball(.075,0,.12,-.1,0x2a1a14,rh)}
plant(-21.8,-13.2,1.1,0);plant(-14,-13.2,1,1);plant(-21.8,3.4,1,2);plant(-14,13.2,1.1,0);plant(-21.8,14,1,2);
sofa(HX,12.6,Math.PI);sofa(-21.6,10.2,Math.PI/2);cyl(1.1,1.1,.1,HX,.55,9.6,0xc99a6b,scene,24);cyl(.1,.1,.55,HX,.27,9.6,0x2f4a3f);
floorText("THE LOUNGE",-19,6.4);
{const wp=person(0x7a3b5e,true);wp.position.set(HX+1.6,-.3,12.5);wp.rotation.y=Math.PI;sitters.push(wp)}
// ---- boss cabin (different layout: desk, boss chair, 2 guest chairs, lounge corner)
box(1.5,.12,3.6,21,.9,0,0x6b4a33);box(1.3,.9,.1,21,.45,1.6,0x2f4a3f);box(1.3,.9,.1,21,.45,-1.6,0x2f4a3f);
mesh(new THREE.BoxGeometry(.06,.55,.9),[screenM,M(0x1d2b2a),M(0x1d2b2a),M(0x1d2b2a),M(0x1d2b2a),M(0x1d2b2a)],21.2,1.3,0);
box(.9,.1,.9,22.1,.45,0,0x1d2b2a);box(.12,.9,.9,22.6,.95,0,0x1d2b2a);
[-1.4,1.4].forEach(z=>{box(.8,.1,.8,18.3,.45,z,0xb5714d);box(.12,.8,.8,17.85,.9,z,0xb5714d)});
cyl(1.4,1.4,.1,15,.55,-9,0xc99a6b,scene,24);cyl(.1,.1,.55,15,.27,-9,0x2f4a3f);sofa(19,12.6,Math.PI);box(.6,1.7,5,22.5,.85,-8,0x9b7b55);
sign("BOSS CABIN",2.8,.7,10.8,1.75,0,Math.PI/2);
plant(12,-13.8,1.1,0);plant(12,13.8,1.1,0);plant(22,13.5,1,1);plant(22,-13.5,1,1);plant(11.9,-2.7,1,2);plant(11.9,2.7,1,2);
box(.06,1,2,22.78,1.2,10,0xc9a67a);box(.06,.8,1.6,22.78,1.2,10,0xe8e3d3);
function curtain(x,z,len,c,c2){box(.06,.06,len+.4,x,1.85,z,0x3a2a1a);box(.14,.22,len+.3,x,1.74,z,c);[-1,1].forEach(sd=>{for(let k=0;k<5;k++)box(.09+(k%2)*.05,1.55,.12,x+(k%2)*.06,.93,z+sd*(len/2-.08-k*.1),k%2?c:c2);box(.16,.05,.16,x,.95,z+sd*(len/2-.62),0xd9b36a)})}
curtain(10.7,0,2,0x7a2330,0x5a1824);curtain(-22.65,0,4,0x2f5a47,0x1f4535);
// ---- boss cabin: rugs, lounge set, trophies, books, art, mini bar, lamps, desk details
function paint(x,y,z,w,h,ry,k){const c=document.createElement("canvas");c.width=256;c.height=Math.round(256*h/w);const g=c.getContext("2d"),H=c.height;g.fillStyle=k?"#f1e9d6":"#e8e1cf";g.fillRect(0,0,256,H);
  [["#2f8f8c",20,16,110,H-40],["#c4694a",110,30,100,H*.5],["#d9a43a",150,H*.45,80,H*.4],["#2f5846",60,H*.55,90,H*.3]].forEach(r=>{g.fillStyle=r[0];g.globalAlpha=.85;g.fillRect(r[1],r[2],r[3],r[4])});g.globalAlpha=1;g.strokeStyle="#3a2a1a";g.lineWidth=3;g.beginPath();g.arc(190,H*.3,22,0,6.3);g.stroke();
  const m=new THREE.MeshBasicMaterial({map:ct(c)}),wd=M(0x8a6a4a),b=mesh(new THREE.BoxGeometry(w,h,.08),[wd,wd,wd,wd,m,m],x,y,z);b.rotation.y=ry}
function flamp(x,z){cyl(.03,.03,1.6,x,.8,z,0x333333);cyl(.18,.18,.04,x,.02,z,0x333333);cyl(.22,.3,.35,x,1.75,z,0xfff2c8)}
box(8,.02,6.4,19,.095,0,0x44606b);box(7.2,.021,5.6,19,.096,0,0xe6dcc0);box(6.2,.022,4.6,19,.097,0,0x44606b);
box(6.4,.02,4.4,17,.095,10.4,0x8a3a42);box(5.6,.021,3.6,17,.096,10.4,0xe6dcc0);
cyl(.8,.8,.08,17,.5,9.8,0xc99a6b,undefined,24);cyl(.08,.08,.45,17,.25,9.8,0x2f4a3f);chair(14.8,9.8,-Math.PI/2,0x2f5846);chair(19.2,9.8,Math.PI/2,0x2f5846);
box(.5,1.7,3,22.55,.85,5.2,0x6b4a33);mesh(new THREE.BoxGeometry(.06,1.35,2.7),glassM,22.27,.95,5.2);[.55,1,1.45].forEach(y=>box(.4,.04,2.6,22.55,y,5.2,0x4a3a2a));
for(let k=-1;k<=1;k++){cyl(.1,.05,.32,22.5,.75,5.2+k*.8,0xd9b36a,undefined,10);ball(.1,22.5,1.12,5.2+k*.8,0xd9b36a);cyl(.04,.04,.2,22.5,1.62,5.2+k*.8,0xc0c0c0,undefined,8)}
for(let r=0;r<3;r++)for(let zz=-10.3;zz<-5.7;zz+=.22)box(.28,.3,.14,22.08,.5+r*.4,zz,[0xc4694a,0x2f8f8c,0xd9a43a,0x5f9a6a,0x7a7fa8][(Math.round(zz*5)+r)&3]);
paint(16.5,1.15,-14.74,2.6,1.2,0,0);paint(20.2,1.15,-14.74,1.6,1.2,0,1);
box(2,.9,.6,13.6,.45,-14.4,0x8a6a4a);box(.5,.5,.4,13.2,1.15,-14.4,0x24352f);[0,1,2].forEach(k=>cyl(.05,.045,.1,13.9+k*.2,.95,-14.4,0xe8e3d3,undefined,8));
flamp(12.8,11.5);flamp(22,-3);
box(.08,.14,.5,20.5,1,.6,0x2a2a2a);box(.02,.1,.4,20.45,1,.6,0xd9b36a);box(.4,.01,.3,20.9,.965,1,0xf4f1e6);box(.2,.05,.3,21.5,.97,-1.2,0x222222);
cyl(.07,.09,.04,20.6,.97,-1.2,0x222222);cyl(.02,.02,.4,20.6,1.17,-1.2,0x222222);cyl(.12,.2,.2,20.6,1.4,-1.2,0xfff2c8);cyl(.04,.04,.15,21.3,1.04,-1.1,0x222222);ball(.18,21.3,1.25,-1.1,0x4a86b8);
box(.7,.08,.1,22.1,.75,.45,0x1d2b2a);box(.7,.08,.1,22.1,.75,-.45,0x1d2b2a);box(.1,.3,.5,22.65,1.55,0,0x1d2b2a);
// ---- room lighting: pendants, LED strips, wall sconces, warm point lights
function pendant(x,z,y,sc=1){cyl(.01,.01,5-y,x,(5+y)/2,z,0x222222);const sh=cyl(.12*sc,.45*sc,.35*sc,x,y,z,0xfff2c8,undefined,16);sh.material=lampM;sh.castShadow=false;glow(x,y-.3,z,3.2*sc)}
[[CX[0],-7.2],[CX[1],-7.2],[CX[0],7.2],[CX[1],7.2]].forEach(p=>{pendant(p[0]-1,p[1],2.6);pendant(p[0]+1,p[1],2.6)});
pendant(HX,-9.6,2.8,1.2);pendant(HX,9.6,2.8,1.2);pendant(21,0,2.8,1.3);pendant(17,9.8,2.8);pendant(-1,0,3,1);
mesh(new THREE.BoxGeometry(5,.04,.06),lampM,HX,.15,-8.85);[-1.95,1.95].forEach(z=>mesh(new THREE.BoxGeometry(34,.03,.05),lampM,-6,.1,z));
[[14.6,-14.65],[18.4,-14.65],[22,-14.65]].forEach(p=>{mesh(new THREE.BoxGeometry(.2,.4,.12),lampM,p[0],1.5,p[1]);glow(p[0],1.5,p[1]+.3,1.6)});[-20,-15].forEach(x=>[-14.65,14.65].forEach(z=>{mesh(new THREE.BoxGeometry(.2,.4,.12),lampM,x,1.5,z);glow(x,1.5,z+(z<0?.3:-.3),1.6)}));
const roomLights=[];[[CX[0],3.4,-6],[CX[1],3.4,-6],[CX[0],3.4,6],[CX[1],3.4,6],[HX,3.2,-7],[HX,3.2,9],[17,3.4,0],[-1,3.4,0]].forEach(p=>{const l=new THREE.PointLight(0xffd9a0,.25,16,2);l.position.set(p[0],p[1],p[2]);l.userData.hi=2;scene.add(l);roomLights.push(l)});
// ---- day / night
let tod=0,todT=0;
const dayBG=LC(0xdfe6dc),nightBG=LC(0x070d1a),dayH=new THREE.Color(0xdcebff),nightH=new THREE.Color(0x4a6aa8),daySun=new THREE.Color(0xfff0d8),nightSun=new THREE.Color(0x8fa6d8);
function updateTOD(dt){tod+=(todT-tod)*Math.min(1,dt*2);const t=tod;
  scene.background.copy(dayBG).lerp(nightBG,t);scene.fog.color.copy(scene.background);
  hemi.color.copy(dayH).lerp(nightH,t);hemi.intensity=.22-.12*t;sun.color.copy(daySun).lerp(nightSun,t);sun.intensity=1.6-1.3*t;
  ren.toneMappingExposure=.8+.3*t;skyMat.color.setRGB(1-.93*t,1-.9*t,1-.78*t);
  nightMats.forEach(m=>m.emissiveIntensity=t*1.7);lampM.emissiveIntensity=.25+t*2.3;glowM.opacity=.12+t*.8;
  HLm.emissiveIntensity=1.2+t*1.6;TLm.emissiveIntensity=.9+t*1.2;
  roomLights.forEach(l=>l.intensity=.25+t*1.5);stars.material.opacity=t;moon.material.opacity=t;
  const we=t>.5?envNight:envDay;if(scene.environment!==we)scene.environment=we}
function gradeEnv(){scene.traverse(o=>{if(o.material)[].concat(o.material).forEach(m=>{if(!m.isMeshStandardMaterial)return;m.envMapIntensity=(m.userData.env||.55)*(todT?.7:1);if(m.map&&!m.alphaTest&&!m.bumpMap&&!m.userData.nb&&m.roughness>=.9){m.bumpMap=m.map;m.bumpScale=.4;m.needsUpdate=true}})})}
box(.06,.9,28,22.77,.45,0,0x8a6a4a);box(11.5,.9,.06,17,.45,-14.77,0x8a6a4a);box(11.5,.9,.06,17,.45,14.77,0x8a6a4a);
box(10.8,.7,.06,-17.6,.35,-14.77,0x2f5a47);box(10.8,.7,.06,-17.6,.35,14.77,0x2f5a47);
// surroundings
const skyMat=new THREE.MeshBasicMaterial({map:tex(2,256,(g,w,h)=>{const q=g.createLinearGradient(0,0,0,h);q.addColorStop(0,"#7fa9cf");q.addColorStop(.48,"#cddfe6");q.addColorStop(.52,"#e6e8dc");q.addColorStop(1,"#e9e4d2");g.fillStyle=q;g.fillRect(0,0,w,h)}),side:THREE.BackSide,fog:false,depthWrite:false});scene.add(new THREE.Mesh(new THREE.SphereGeometry(800,24,12),skyMat));
function envTex(stops,sn){const c=document.createElement("canvas");c.width=512;c.height=256;const g=c.getContext("2d"),q=g.createLinearGradient(0,0,0,256);stops.forEach(t=>q.addColorStop(t[0],t[1]));g.fillStyle=q;g.fillRect(0,0,512,256);if(sn){const r=g.createRadialGradient(sn[0],sn[1],0,sn[0],sn[1],sn[2]);r.addColorStop(0,sn[3]);r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(0,0,512,256)}const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t}
const pmrem=new THREE.PMREMGenerator(ren);
function mkEnv(t){const sc=new THREE.Scene();sc.add(new THREE.Mesh(new THREE.SphereGeometry(50,32,16),new THREE.MeshBasicMaterial({map:t,side:THREE.BackSide})));return pmrem.fromScene(sc,.02).texture}
const envDay=mkEnv(envTex([[0,"#7fa9cf"],[.48,"#e6e8dc"],[.52,"#9a9684"],[1,"#6a6858"]],[130,70,60,"rgba(255,244,220,1)"]));
const envNight=mkEnv(envTex([[0,"#05080f"],[.48,"#1c2a44"],[.52,"#0e1218"],[1,"#07090d"]],[380,60,28,"rgba(220,230,255,.9)"]));
scene.environment=envDay;
const stars=(()=>{const n=1800,pos=new Float32Array(n*3);for(let i=0;i<n;i++){const a=Math.random()*6.283,v=Math.random()*.9+.1,r=Math.sqrt(1-v*v);pos[i*3]=Math.cos(a)*r*650;pos[i*3+1]=v*650;pos[i*3+2]=Math.sin(a)*r*650}const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));const p=new THREE.Points(g,new THREE.PointsMaterial({size:2,sizeAttenuation:false,color:0xffffff,transparent:true,opacity:0,fog:false,depthWrite:false}));scene.add(p);return p})();
const moon=(()=>{const c=document.createElement("canvas");c.width=c.height=128;const g=c.getContext("2d"),r=g.createRadialGradient(64,64,10,64,64,64);r.addColorStop(0,"rgba(255,255,245,1)");r.addColorStop(.35,"rgba(235,240,255,.9)");r.addColorStop(.4,"rgba(200,215,255,.25)");r.addColorStop(1,"rgba(200,215,255,0)");g.fillStyle=r;g.fillRect(0,0,128,128);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:ct(c),transparent:true,opacity:0,fog:false,depthWrite:false}));sp.position.set(-300,330,-420);sp.scale.set(110,110,1);scene.add(sp);return sp})();
[[-150,-160,60,70],[-55,-180,50,55],[45,-175,70,80],[150,-150,55,60]].forEach((m,i)=>cyl(0,m[2],m[3],m[0],m[3]/2-2,m[1],[0x9bab97,0x8fa28f,0xa5b19a,0x8da08e][i],scene,7));
function facade(s,h,x,z,base,glass,acc){const t=tex(128,128,(g,w,h2)=>{g.fillStyle=base;g.fillRect(0,0,w,h2);if(acc){g.fillStyle=acc;for(let j=0;j<4;j++)g.fillRect(0,j*32+27,w,5)}for(let i=0;i<4;i++)for(let j=0;j<4;j++){const a=i*32+5,b=j*32+6,q=g.createLinearGradient(0,b,0,b+20);q.addColorStop(0,glass);q.addColorStop(1,"#3d6f7a");g.fillStyle="#f1ecdd";g.fillRect(a-2,b-2,26,24);g.fillStyle=q;g.fillRect(a,b,22,20)}noise(g,w,h2,500,.05)},s/8,h/10);
  const side=SM(t,1,1),roof=M(0x4a4e4c);side.userData.nb=1;
  const mr=tex(128,128,(g,w,h2)=>{g.fillStyle="rgb(0,215,0)";g.fillRect(0,0,w,h2);for(let i=0;i<4;i++)for(let j=0;j<4;j++){g.fillStyle="rgb(0,28,215)";g.fillRect(i*32+5,j*32+6,22,20)}},s/8,h/10);mr.encoding=THREE.LinearEncoding;side.metalnessMap=mr;side.roughnessMap=mr;
  if(base!="#1f5f73"){const bm=tex(128,128,(g,w,h2)=>{g.fillStyle="#9a9a9a";g.fillRect(0,0,w,h2);g.strokeStyle="#3a3a3a";g.lineWidth=1.5;for(let y=0;y<128;y+=8){g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();for(let x=(y/8%2)*8;x<128;x+=16){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+8);g.stroke()}}for(let i=0;i<4;i++)for(let j=0;j<4;j++){g.fillStyle="#8a8a8a";g.fillRect(i*32+3,j*32+4,26,24);g.fillStyle="#bdbdbd";g.fillRect(i*32+5,j*32+6,22,20)}noise(g,w,h2,600,.08)},s/8,h/10);bm.encoding=THREE.LinearEncoding;side.bumpMap=bm;side.bumpScale=.9}
  const lt=tex(128,128,(g,w,h2)=>{g.fillStyle="#000";g.fillRect(0,0,w,h2);for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(Math.random()<.72){g.fillStyle=Math.random()<.5?"#ffd89a":"#ffe9c0";g.fillRect(i*32+5,j*32+6,22,20)}},s/8,h/10);
  side.emissiveMap=lt;side.emissive=new THREE.Color(1,.82,.5);side.emissiveIntensity=0;nightMats.push(side);
  mesh(new THREE.BoxGeometry(s,h,s),[side,side,roof,roof,side,side],x,h/2,z);box(s+.2,.9,s+.2,x,.45,z,0x6b6458);
  box(s*.3,1.4,s*.3,x+s*.15,h+.7,z-s*.1,0x8d908c);[[-.28,.2],[.1,-.25]].forEach(o=>{box(1.8,1,1.4,x+o[0]*s,h+.9,z+o[1]*s,0x9a9fa4);cyl(.5,.5,.12,x+o[0]*s,h+1.45,z+o[1]*s,0x555a5f,undefined,12)});cyl(.8,.8,1.6,x-s*.3,h+1.3,z-s*.3,0xb06a4a,undefined,12);box(s+.6,.4,s+.6,x,h+.2,z,[0x3a3e3c,0x7a4a3a,0x3f5f6a,0x6a6a72][Math.abs(Math.round(x/7))%4]);box(s+.3,.5,s+.3,x,h-.4,z,0xf0ece0);if(base=="#1f5f73")box(s*.6,2,s*.6,x,h+1.4,z,0x2f7f8f);{const q0=z<0?1:-1,ac=[0xc4694a,0x2f8f8c,0xd9a43a,0x7a7fa8,0x5f9a6a][Math.abs(Math.round(x/9))%5];box(s*.8,.18,1.6,x,2.9,z+q0*(s/2+.8),ac);box(s*.8,.4,.06,x,2.6,z+q0*(s/2+1.58),ac)}if(base=="#f0d58c"){const q=z<0?1:-1;for(let f=1;f<=2;f++){const by=f*3.4;box(s*.9,.12,1.3,x,by,z+q*(s/2+.6),0xc99a6b);box(s*.9,.6,.05,x,by+.4,z+q*(s/2+1.2),0x2f4a3f)}}}
[[-74,-42,16,11,"#e07a5f","#9ec3d6"],[-58,-52,14,9,"#a9d3c0","#9ec3d6"],[-10,-48,18,15,"#1f5f73","#a9c8d6"],[22,-52,15,12,"#f0d58c","#9ec3d6"],[52,-46,16,12,"#e8b08a","#9ec3d6"],[84,-34,15,10,"#9fc4e0","#c4e0ee"],[-64,14,14,10,"#dccfb0","#9ec3d6"],[88,12,14,14,"#bdbdb8","#a9c8d6"],[-56,50,16,10,"#c9b6e4","#9ec3d6"],[-20,54,18,9,"#d28a5f","#9ec3d6"],[24,54,16,12,"#f0d58c","#9ec3d6"],[62,52,15,10,"#8fb1c6","#a9c8d6"]].forEach((b,i)=>facade(b[2],b[3],b[0],b[1],b[4],b[5],["#fff3d6","#2f8f8c","#f2cc8f","#c4694a","#f6e7c8","#8e7dbe","#f28482","#6bbf59","#00798c","#edae49","#d1495b","#e07a5f"][i]));
// football pitch
mesh(new THREE.BoxGeometry(26,.1,18),SM(tex(256,128,(g,w,h)=>{for(let i=0;i<8;i++){g.fillStyle=i%2?"#78b27e":"#6fa876";g.fillRect(i*w/8,0,w/8,h)}noise(g,w,h,600,.05)},1,1),1),52,.02,0);
[[26,.2,0,-9],[26,.2,0,9],[.2,18,-13,0],[.2,18,13,0]].forEach(l=>box(l[0],.06,l[1],52+l[2],.06,l[3],0xf4f4ee));box(.2,.06,18,52,.06,0,0xf4f4ee);
[-12.6,12.6].forEach(o=>{[-1.8,1.8].forEach(z=>box(.1,1.8,.1,52+o,.9,z,0xf4f4ee));box(.1,.1,3.7,52+o,1.8,0,0xf4f4ee)});
// parking lot
mesh(new THREE.BoxGeometry(26,.08,8),SM(tex(128,128,drawAsph,6,2),.95),52,-.02,-17);
const HLm=new THREE.MeshStandardMaterial({color:0xfff7d0,emissive:0xfff0b0,emissiveIntensity:1.2}),TLm=new THREE.MeshStandardMaterial({color:0xc4231b,emissive:0xff2a1a,emissiveIntensity:.9});
function car(c){const g=new THREE.Group(),sh=new THREE.Shape(),gs=new THREE.Shape();
  [[-1.7,.3],[-1.7,.8],[-1.2,.95],[-.7,1.35],[.6,1.35],[1.05,.95],[1.7,.8],[1.7,.3]].forEach((p,i)=>i?sh.lineTo(p[0],p[1]):sh.moveTo(p[0],p[1]));
  [[-.62,.98],[-.35,1.3],[.5,1.3],[.82,.98]].forEach((p,i)=>i?gs.lineTo(p[0],p[1]):gs.moveTo(p[0],p[1]));
  mesh(new THREE.ExtrudeGeometry(sh,{depth:1.6,bevelEnabled:false}),PH(c),0,0,-.8,g);mesh(new THREE.ExtrudeGeometry(gs,{depth:1.66,bevelEnabled:false}),GLS,0,0,-.83,g);
  [[-1.05,.8],[1.05,.8],[-1.05,-.8],[1.05,-.8]].forEach(w=>{const t=cyl(.33,.33,.25,w[0],.33,w[1],0x151515,g,16);t.rotation.x=Math.PI/2;const r=cyl(.2,.2,.27,w[0],.33,w[1],RIM,g,10);r.rotation.x=Math.PI/2});
  [.5,-.5].forEach(z=>{mesh(new THREE.BoxGeometry(.05,.12,.3),HLm,1.71,.62,z,g);mesh(new THREE.BoxGeometry(.05,.12,.3),TLm,-1.71,.62,z,g)});box(3.4,.1,1.62,0,.3,0,0x1a1a1a,g);scene.add(g);return g}
[0xb4423b,0x2f4e7a,0xdcd9cf,0xc99a38,0x3a3f45,0x7a3b2e].forEach((c,i)=>{const g=car(c);g.position.set(42+i*4,0,-17);g.rotation.y=Math.PI/2});

function lampPost(x,z){cyl(.08,.1,5,x,2.5,z,0x2a3030);const b=ball(.3,x,5.1,z,0xfff2c8);b.material=lampM;glow(x,5.1,z,6)}
for(let x=-48;x<=48;x+=16)lampPost(x,24.2);
const cars=[0xc4423b,0x2f4e7a,0xe3e0d6,0xc99a38].map((c,i)=>{const g=car(c);g.position.set(-80+i*45,0,26.4+(i%2)*3);if(i%2)g.rotation.y=Math.PI;return g});
const kids=[0,1,2,3].map(i=>{const p=person(i%2?0xc4423b:0x2f4e7a);p.userData.forceMove=1;return p});
const peds=[0x7a3b5e,0x3f6b8c,0xb08a3a,0x4e7a52,0x8c4a3a,0x5a5a8f].map((c,i)=>{const p=person(c),z=[22.4,23,22.7,22.6,22.4,23][i],x0=-48+i*16;p.position.set(x0,0,z);p.userData.loop=i%2?[[x0,z],[x0-22,z],[x0+4,z]]:[[x0,z],[x0+26,z],[x0-10,z]];p.userData.path=[];p.userData.ph=i;return p});
const vcar=car(0x2f4e7a);vcar.position.set(-42,0,60);vcar.rotation.y=Math.PI/2;vcar.userData.path=[];
const guard=person(0x14141a,false,1);guard.userData.role="guard";guard.position.set(-26,0,-2.7);guard.rotation.y=-Math.PI/2;guard.userData.path=[];guard.userData.face=[-31,0];{const gh=guard.userData.head;cyl(.13,.145,.08,0,.11,0,0x14141a,gh,14);box(.26,.02,.13,0,.07,.13,0x14141a,gh)}
box(3.6,.04,8,-41.4,.01,12,0x34383a);box(3.6,.03,.1,-41.4,.03,8,0xf2f2ee);box(3.6,.03,.1,-41.4,.03,16,0xf2f2ee);
box(2.6,2.4,2.6,-26,1.2,-5,0xeee8d8);box(3.3,.25,3.3,-26,2.55,-5,0x2f5846);sign("SECURITY",2.2,.55,-27.35,1.9,-5,Math.PI/2);
function leafZ(x,z,w,c,bars){const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
  if(bars){const a=Math.abs(w),sg=Math.sign(w);box(.08,.1,a,0,1.45,w/2,0x1e332b,g);box(.08,.1,a,0,.2,w/2,0x1e332b,g);box(.06,1.3,.08,0,.82,sg*.04,0x1e332b,g);box(.06,1.3,.08,0,.82,sg*(a-.04),0x1e332b,g);for(let k=.17;k<a-.1;k+=.17)box(.05,1.25,.06,0,.82,sg*k,c,g)}
  else{box(.1,1.5,Math.abs(w),0,.75,w/2,c,g);box(.14,.1,Math.abs(w),0,1.4,w/2,0x1e332b,g)}return g}
const gate={t:0,target:0,L:leafZ(-28,-2,2,0x2f4a3f,1),R:leafZ(-28,2,-2,0x2f4a3f,1)},door={t:0,target:0,L:leafZ(11,-1,2,0xb9895a)};
[-2.2,2.2].forEach(z=>{box(.5,1.9,.5,-28,.95,z,0xcfc9b6);box(.62,.12,.62,-28,1.96,z,0xb9b3a2)});
{const a=4.2,R2=5.2,hs=3.0,sh=new THREE.Shape();sh.moveTo(-R2,0);sh.lineTo(-R2,hs);sh.absarc(0,hs,R2,Math.PI,0,true);sh.lineTo(R2,0);sh.lineTo(a,0);sh.lineTo(a,hs);sh.absarc(0,hs,a,0,Math.PI,false);sh.lineTo(-a,0);sh.lineTo(-R2,0);
  const am=mesh(new THREE.ExtrudeGeometry(sh,{depth:.9,bevelEnabled:false,curveSegments:32}),0xe6d8bd,-31.45,0,0);am.rotation.y=Math.PI/2;
  box(1.3,2.2,7.6,-31,hs+R2+.6,0,0xe6d8bd);[-4.8,4.8].forEach(z=>{box(1.5,.35,1.5,-31,.17,z,0xd6c6a6);box(1.4,.25,1.4,-31,.48,z,0xe0d0b0)});
  sign(CONFIG.brand,7,1.6,-31.68,hs+R2+.6,0,Math.PI/2,"#efe3c8","#3a2a1a","Georgia,serif");sign(CONFIG.brand,7,1.6,-30.32,hs+R2+.6,0,Math.PI/2,"#efe3c8","#3a2a1a","Georgia,serif")}
{const c=document.createElement("canvas");c.width=1024;c.height=200;const g=c.getContext("2d");g.fillStyle="rgba(58,42,24,.6)";g.font="bold 120px Georgia,serif";g.textAlign="center";g.textBaseline="middle";g.fillText(CONFIG.brand,512,100,980);const m=new THREE.Mesh(new THREE.PlaneGeometry(11,2.1),new THREE.MeshBasicMaterial({map:ct(c),transparent:true,depthWrite:false}));m.rotation.set(-Math.PI/2,0,0);m.position.set(-34,.06,-14);scene.add(m)}
sign(CONFIG.brand,7,1.5,-28.25,1.65,-9,Math.PI/2);sign(CONFIG.brand,7,1.5,-28.25,1.65,9,Math.PI/2);
sign(CONFIG.brand,8,1.5,-23.4,2.9,0,Math.PI/2);[-4.1,4.1].forEach(z=>box(.2,1.6,.2,-23.4,2.1,z,0xc99a6b));
const jog=person(0xc4423b);jog.userData.fast=1;jog.position.set(-34,0,-21);jog.userData.path=[];jog.userData.loop=[[-34,-21],[31,-21],[31,21],[-34,21]];
// ---- plaza, lawns, cars parked inside the compound
mesh(new THREE.BoxGeometry(220,.06,130),SM(tex(128,128,(g,w,h)=>{g.fillStyle="#c2bca9";g.fillRect(0,0,w,h);g.strokeStyle="rgba(90,85,70,.3)";g.lineWidth=2;g.strokeRect(0,0,w,h);noise(g,w,h,500,.08)},74,44),.9),15,-.06,-2);
[[50,0,34,26],[-62,-4,24,26],[0,-33,44,9]].forEach(l=>box(l[2],.08,l[3],l[0],0,l[1],0x6f9a68));
[[-66,-10],[-58,2],[-66,6],[-10,-33],[10,-33],[36,10],[36,-10],[-6,38.7],[26,38.7],[54,38.7]].forEach(p=>flowerPatch(p[0],p[1],5,3,36));
box(22,.04,3.4,7,.02,17,0x3a3e40);[0xb4423b,0x2f4e7a,0xdcd9cf].forEach((c,i)=>{const g=car(c);g.position.set(2+i*5,.03,17)});
// ---- road edge lines, crossings, lamps, verges, benches, parking bays + second lot
[24.3,31.7].forEach(z=>box(560,.02,.12,0,.03,z,0xf2f2ee));[-47.7,-40.3,66.3,73.7].forEach(x=>box(.12,.02,100,x,.03,-10,0xf2f2ee));
for(let x=-47.6;x<-40.4;x+=1)box(.5,.02,3,x,.035,-6,0xf4f4f0);for(let x=66.4;x<73.6;x+=1)box(.5,.02,3,x,.035,10,0xf4f4f0);for(let z=24.6;z<31.6;z+=1)box(3,.02,.5,60,.035,z,0xf4f4f0);
function lamp(x,z){cyl(.08,.1,5,x,2.5,z,0x2a3030);const b=ball(.3,x,5.1,z,0xfff2c8);b.material=lampM;glow(x,5.1,z,6)}
HI(()=>{for(let z=-48;z<=44;z+=14){lamp(-39.5,z);lamp(65.2,z)}for(let x=-60;x<=100;x+=14)lamp(x,33.5)});
box(86,.06,1.6,17,0,19.6,0x6f9a68);box(200,.06,1.6,10,0,33.2,0x6f9a68);HI(()=>{hedge(-60,100,33.2);[-12,14,40].forEach(x=>bench(x,21,0))});
for(let i=0;i<=6;i++)box(.1,.03,3.4,40+i*4,.045,-17,0xf2f2ee);
HI(()=>{box(18,.04,8,-76,.02,37,0x3a3e40);for(let i=0;i<=5;i++)box(.1,.03,3.4,-82+i*3.2,.045,37,0xf2f2ee);[0xc99a38,0x7a3b2e,0xdcd9cf,0x2f4e7a,0xb4423b].forEach((c,i)=>{const g=car(c);g.position.set(-80.4+i*3.2,.03,37);g.rotation.y=Math.PI/2});
  [0xc4694a,0x2f8f8c,0xd9a43a,0x7a7fa8].forEach((c,i)=>{box(2.4,1.2,1.4,-34+i*4,.6,-69,0xe8dcc0);box(3,.2,2,-34+i*4,2.2,-69,c);box(.08,1,.08,-35+i*4,1.7,-68.2,0x8a6a4a);box(.08,1,.08,-33+i*4,1.7,-68.2,0x8a6a4a)})});
const cloudTex=(()=>{const c=document.createElement("canvas");c.width=256;c.height=96;const g=c.getContext("2d");for(let i=0;i<9;i++){const x=40+i*20,y=48+((i*17)%25)-12,r=g.createRadialGradient(x,y,0,x,y,40);r.addColorStop(0,"rgba(255,255,255,.9)");r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(0,0,256,96)}return ct(c)})();
const clouds=[];HI(()=>{for(let i=0;i<8;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:cloudTex,transparent:true,opacity:.55,depthWrite:false,fog:false}));sp.position.set(-200+i*55,75+(i%3)*10,-60+(i%4)*40);sp.scale.set(70,26,1);scene.add(sp);clouds.push(sp)}});
// ---- trees: 0 leafy cone (like the garden tree), 1 round canopy, 2 pine
function tree(x,z,s=1,k=1){
  const T=(a,b,h,y,c)=>cyl(a*s,b*s,h*s,x,y*s,z,BARK,undefined,8);
  if(k==0){T(.14,.22,4.8,2.4,0x7a5434);
    for(let i=0;i<24;i++){const a=i*2.4,h=.8+i*.19,sz=1.0-i*.018;for(let j=0;j<8;j++){const a2=a+(j-3.5)*.5;leafIM.add2(x+Math.cos(a)*.12*s,h*s,z+Math.sin(a)*.12*s,0,Math.PI-a2,.95+(j%2)*.28,sz*s*1.1,sz*s*1.2,GR[(i+j)%6])}}}
  else if(k==2){T(.18,.25,1,.5,0x6f5238);for(let i=0;i<6;i++)cyl(0,(1.7-i*.24)*s,2*s,x,(1.5+i*.95)*s,z,[0x3A5A40,0x52796F][i%2],undefined,10)}
  else{T(.2,.32,2.8,1.4,0x7a5434);const R=k==1?1.9:1.5,n=k==1?220:100;ball(R*.8*s,x,3.9*s,z,0x3a6b3c);
    for(let i=0;i<n;i++){const u=Math.acos(1-2*(i+.5)/n),a=i*2.4,rr=R*(.82+(i%3)*.1);leafIM.add2(x+Math.sin(u)*Math.cos(a)*rr*s,(3.9+Math.cos(u)*rr)*s,z+Math.sin(u)*Math.sin(a)*rr*s,0,Math.PI-a,u,(1.1+(i%2)*.2)*s,(1+(i%3)*.15)*s,GR[i%6])}}}
function palmTree(x,z,s=1){let px=0;for(let i=0;i<7;i++){const seg=cyl(.15*s,.19*s,1*s,x+px*s,(i+.5)*s,z,0x9a7a52,undefined,8);seg.rotation.z=-.05*i;const rg=cyl(.2*s,.2*s,.08*s,x+px*s,(i+.95)*s,z,0x6f5238,undefined,8);rg.rotation.z=-.05*i;px+=.05*i*.6}
  for(let k=0;k<3;k++)ball(.16*s,x+px*s+Math.cos(k*2.1)*.22*s,6.9*s,z+Math.sin(k*2.1)*.22*s,0x6f4a2a);
  for(let i=0;i<12;i++)frondIM.add2(x+px*s,7*s,z,0,Math.PI-i*.52,.35+(i%4)*.3,1.25*s,1.25*s,GR[i%3])}
function hedge(x0,x1,z){for(let x=x0;x<=x1;x+=2.2)ball(.75,x,.4,z,0x4b7a44).scale.set(1,.65,1)}
function bench(x,z,ry=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;scene.add(g);box(1.6,.08,.45,0,.45,0,0xc99a6b,g);box(1.6,.4,.06,0,.75,-.2,0xc99a6b,g);box(.08,.45,.4,-.7,.22,0,0x2f4a3f,g);box(.08,.45,.4,.7,.22,0,0x2f4a3f,g)}
[[-25.5,10],[-25.5,-12],[25.5,-17],[25.5,17],[-18,17.2],[-6,17.2],[20,17.2],[-18,-17.2],[-6,-17.2],[6,-17.2],[18,-17.2]].forEach(p=>tree(p[0],p[1],.85,0));
[[-30,35],[-12,35],[8,35],[30,35],[40,20],[42,-30],[78,18],[78,-20],[34,-30],[-8,-26],[62,-24]].forEach(p=>tree(p[0],p[1],1,1));
[[34,-24],[60,26],[78,-30],[-70,0],[-90,22],[100,-20],[-30,-30],[20,-30],[-45,48]].forEach(p=>tree(p[0],p[1],1.1,2));
[[-14,24.5],[6,24.5],[26,24.5],[38,12],[66,-12],[32,-22],[32,22],[-31,-22],[-31,22]].forEach(p=>palmTree(p[0],p[1],1));
hedge(-26,50,19.9);
[[-12,40],[20,40],[48,40]].forEach(p=>{box(18,.08,6,p[0],.03,p[1],0x8fb57f);hedge(p[0]-7,p[0]+7,p[1]-1.5);bench(p[0],p[1]+1.6,Math.PI)});
// railway with train, station and tunnel
mesh(new THREE.BoxGeometry(300,.06,3.4),SM(tex(64,16,(g,w,h)=>{g.fillStyle="#8a7f6a";g.fillRect(0,0,w,h);g.fillStyle="#4a3f2f";g.fillRect(0,0,6,h)},100,1),1),0,.02,-62);
box(300,.1,.12,0,.12,-62.8,0x555555);box(300,.1,.12,0,.12,-61.2,0x555555);
box(30,.5,3,-30,.25,-65.5,0xd8d2c0);box(30,.15,3.4,-30,3.4,-65.5,0x4a9aa8);[-42,-36,-30,-24,-18].forEach(x=>box(.15,3.1,.15,x,1.9,-65.5,0x2f4a3f));
box(10,8,10,118,4,-62,0xcfc6a8);box(.3,3.8,3.6,112.85,1.9,-62,0x101010);
const train=new THREE.Group();[0,1,2,3].forEach(i=>{box(5,2,2,i*5.4,1.5,0,[0xc4694a,0x4a86b8,0xe6dcc6][i%3],train);box(4.6,.5,2.05,i*5.4,1.8,0,0x1c2a33,train)});train.position.set(-140,0,-62);scene.add(train);
// solar field + farm beds
for(let r=0;r<4;r++)for(let c=0;c<7;c++){const p=box(2.6,.08,1.7,-98+c*3,1.1,-22+r*4,0x2a4a7a);p.rotation.x=-.5;box(.1,1,.1,-98+c*3,.5,-22+r*4,0x777777)}
[[104,12],[104,24],[117,12],[117,24]].forEach(f=>{box(11,.3,10,f[0],.15,f[1],0xb4694a);for(let k=-4;k<=4;k+=2)box(10,.35,.7,f[0],.42,f[1]+k*.9,0x5d9a55)});
// ---- garden watering can + water drops (guard cares for the garden)
{const cn=new THREE.Group();cn.position.set(0,-.72,.12);cyl(.1,.12,.2,0,0,0,0x3f8f6a,cn,10);const sp=cyl(.025,.025,.3,0,.04,.2,0x3f8f6a,cn,6);sp.rotation.x=Math.PI/2-.5;box(.03,.18,.03,0,.08,-.12,0x2f6a4f,cn);guard.userData.aR.add(cn);cn.visible=false;guard.userData.can=cn}
const drops=[0,1,2,3,4,5].map(()=>{const d=ball(.025,0,0,0,0x9fd8ee);d.visible=false;return d});
// ===== FAR DISTRICTS: factories, warehouses, silos, tanks, power plant, wind farm, container yards, office towers =====
const PAL=[0xe07a5f,0x3d8fb0,0xf2cc8f,0x81b29a,0xd1495b,0xedae49,0x00798c,0x8e7dbe,0x6bbf59,0xf28482];
const spinners=[],steam=[],movers=[];let dsd=5;
const drnd=()=>(dsd=dsd*16807%2147483647)/2147483647,pick=a=>a[Math.floor(drnd()*a.length)],hex=c=>"#"+c.toString(16).padStart(6,"0");
const corr=c=>SM(tex(64,64,(g,w,h)=>{g.fillStyle=hex(c);g.fillRect(0,0,w,h);g.fillStyle="rgba(0,0,0,.2)";for(let i=0;i<8;i++)g.fillRect(i*8,0,3,h)},6,1),.7);
function puff(x,y,z,sc){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:cloudTex,transparent:true,opacity:.5,depthWrite:false}));sp.position.set(x,y,z);sp.scale.set(sc,sc*.7,1);scene.add(sp);steam.push({sp,y,sc,ph:drnd()})}
function stack(x,z,h,r){for(let i=0;i<Math.floor(h/2.5);i++)cyl(r,r*1.1,2.5,x,1.25+i*2.5,z,i%2?0xe8e8e8:0xc4423b,undefined,12);puff(x,h+1,z,7)}
function truck(c){const g=new THREE.Group();box(4.2,1.9,1.9,-.9,1.35,0,0xf0f0ee,g);box(1.5,1.5,1.9,1.9,1.15,0,c,g);box(.05,.7,1.6,2.66,1.6,0,0x16232b,g);
  [[-2,.95],[-2,-.95],[-.4,.95],[-.4,-.95],[1.9,.95],[1.9,-.95]].forEach(w=>{const t=cyl(.4,.4,.3,w[0],.4,w[1],0x151515,g,14);t.rotation.x=Math.PI/2});
  [.55,-.55].forEach(z=>mesh(new THREE.BoxGeometry(.05,.14,.35),HLm,2.67,.75,z,g));scene.add(g);return g}
function factory(x,z,c,nm){const w=20,d=16,h=7,wm=corr(c),rm=M(0x7b7f84);mesh(new THREE.BoxGeometry(w,h,d),[wm,wm,rm,rm,wm,wm],x,h/2,z);
  for(let k=0;k<4;k++){const p=box(w/4,.3,d,x-w/2+w/8+k*w/4,h+.9,z,0x6e7378);p.rotation.z=-.4;box(.15,1.6,d,x-w/2+k*w/4+.1,h+.8,z,0x9ec3d6)}
  [-6,0,6].forEach(o=>box(3.4,3.8,.15,x+o,1.9,z+d/2+.08,pick(PAL)));sign(nm,8,1.4,x,h-1.2,z+d/2+.12,0,hex(c),"#ffffff");
  const p=cyl(.3,.3,w,x,h+.3,z-d/2-.5,0xb8bcc0);p.rotation.z=Math.PI/2;stack(x+w/2+3,z-d/2+2,18,.9);box(5,3,4,x-w/2-3,1.5,z+2,0xdcd8cf)}
function warehouse(x,z,c,nm){const w=24,d=12,h=6,wm=corr(c),rm=M(0x8a8f94);mesh(new THREE.BoxGeometry(w,h,d),[wm,wm,rm,rm,wm,wm],x,h/2,z);box(w+.4,.4,d+.4,x,h+.2,z,0x5f6368);
  for(let k=0;k<5;k++)box(3.6,3.6,.15,x-9.6+k*4.8,1.8,z+d/2+.08,PAL[(k+3)%10]);[-8,0,8].forEach(o=>cyl(.8,.8,1,x+o,h+.9,z,0xc0c4c8,undefined,10));
  sign(nm,9,1.5,x,h-1,z+d/2+.12,0,hex(c),"#ffffff");box(6,3.6,5,x+w/2+3,1.8,z,0xe8e3d3);const t=truck(pick(PAL));t.position.set(x-5,0,z+d/2+4);t.rotation.y=Math.PI/2}
function silos(x,z,c){[[-4,-4],[4,-4],[-4,4],[4,4]].forEach((o,i)=>{const r=2.4,h=13+i%2*3;cyl(r,r,h,x+o[0],h/2,z+o[1],i%2?0xf0f0ee:c,undefined,18);ball(r,x+o[0],h,z+o[1],0xdcd8cf).scale.set(1,.55,1);cyl(.15,.15,h,x+o[0]+r*.9,h/2,z+o[1],0x777777,undefined,6)});
  const cv=box(1,.8,12,x,15,z,0x777777);cv.rotation.y=.1;box(9,.5,.5,x,16.5,z,0xedae49);box(3,3,3,x+9,1.5,z,0xdcd8cf)}
function containers(x,z){for(let i=0;i<4;i++)for(let j=0;j<3;j++){const n=1+Math.floor(drnd()*3);for(let k=0;k<n;k++)box(6,2.4,2.4,x-9+i*6.2,1.2+k*2.45,z-5+j*5,pick(PAL))}
  [-12,12].forEach(px=>{[-9,9].forEach(pz=>box(.6,10,.6,x+px,5,z+pz,0xedae49));box(.8,.8,18.6,x+px,10.2,z,0xedae49)});[-9,9].forEach(pz=>box(24,.6,.6,x,10.4,z+pz,0xedae49));box(2,1,2,x+3,9.6,z-9,0x3a3e3c)}
function tanks(x,z){[[-7,-5],[0,-5],[7,-5]].forEach((o,i)=>{ball(3.2,x+o[0],6,z+o[1],i==1?0xe07a5f:0xdcd8cf);[[1,1],[-1,1],[1,-1],[-1,-1]].forEach(l=>cyl(.2,.25,3.6,x+o[0]+l[0]*2,1.8,z+o[1]+l[1]*2,0x777777,undefined,6))});
  [[-5,6],[5,6]].forEach((o,i)=>{cyl(3,3,8,x+o[0],4,z+o[1],i?0xf0f0ee:0x3d8fb0,undefined,20);cyl(3.05,3.05,.4,x+o[0],7,z+o[1],0xc4423b,undefined,20)});
  for(let i=0;i<3;i++){const p=cyl(.3,.3,16,x,1+i*.7,z+1+i*.6,0xb8bcc0,undefined,8);p.rotation.z=Math.PI/2}}
function power(x,z){const lp=[[4.6,0],[3.8,5],[3.3,10],[3.7,15],[4.2,18]].map(p=>new THREE.Vector2(p[0],p[1])),lm=new THREE.MeshStandardMaterial({color:LC(0xdcd8cf),roughness:.85,side:THREE.DoubleSide});
  [-6,6].forEach(o=>{const m=new THREE.Mesh(new THREE.LatheGeometry(lp,20),lm);m.position.set(x+o,0,z-4);m.castShadow=true;scene.add(m);puff(x+o,21,z-4,12)});
  box(18,8,8,x,4,z+7,0x9fb4c0);box(18.4,.4,8.4,x,8.2,z+7,0x5f6368);stack(x+10,z+8,28,1.1);[-8,-4,0].forEach(o=>{box(2,2.4,2,x+o,1.2,z-12,0x6e7378);box(.3,.3,.3,x+o,2.6,z-12,0xc4423b)})}
function turbines(x,z){[-9,0,9].forEach((o,i)=>{const px=x+o,pz=z+(i%2)*4-2;cyl(.45,.8,22,px,11,pz,0xf2f2f0,undefined,10);box(2.4,1.2,1.2,px,22.4,pz,0xf2f2f0);
  const hub=new THREE.Group();hub.position.set(px+1.4,22.4,pz);scene.add(hub);ball(.5,0,0,0,0xdddddd,hub);for(let k=0;k<3;k++){const b=new THREE.Group();b.rotation.x=k*2.094;hub.add(b);box(.2,9,.9,0,4.8,0,0xf8f8f6,b)}hub.userData.sp=1.4+i*.3;spinners.push(hub)})}
function officeB(x,z){const s=14+Math.floor(drnd()*8),h=9+Math.floor(drnd()*18);facade(s,h,x,z,hex(pick(PAL)),pick(["#9ec3d6","#a9c8d6","#c4e0ee"]),hex(pick(PAL)));box(s*.5,1.6,s*.4,x,h+1.2,z,pick(PAL))}
function lab(x,z,c){mesh(new THREE.BoxGeometry(18,6,14),new THREE.MeshStandardMaterial({color:LC(0x9ec3d6),transparent:true,opacity:.75,roughness:.1,metalness:.3}),x,3,z);box(18.4,.5,14.4,x,6.25,z,0xf0ece0);
  [[-5,-3],[5,3]].forEach(o=>{const d=cyl(0,2.4,1,x+o[0],8.4,z+o[1],0xf4f4f0,undefined,18);d.rotation.x=.9;cyl(.15,.15,3,x+o[0],7.4,z+o[1],0x777777,undefined,6)});box(.2,10,.2,x+7,11,z-5,0xc4423b);sign("LABS",5,1,x,5,z+7.1,0,hex(c),"#ffffff")}
function wtower(x,z,c){[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(l=>cyl(.25,.3,10,x+l[0]*2,5,z+l[1]*2,0x777777,undefined,6));cyl(3.2,3.2,4,x,12,z,c,undefined,20);cyl(0,3.4,2,x,15,z,0x777777,undefined,20);box(3,3,3,x+8,1.5,z,0xdcd8cf)}
const NAMES=["STEEL CO","AUTOWORKS","CARGO","FOUNDRY","LOGISTICS","POLYMERS","MOTORS","AEROSPACE","TEXTILES","PACKAGING"];
const KINDS=["office","factory","warehouse","office","silos","containers","tanks","office","lab","turbines","wtower","warehouse","factory","office","power"];
function slot(x,z){const c=pick(PAL),k=pick(KINDS),nm=pick(NAMES);box(26,.08,26,x,.02,z,pick([0x8f8f8a,0xa7a79f,0x7f8a8f]));
  ({office:()=>officeB(x,z),factory:()=>factory(x,z,c,nm),warehouse:()=>warehouse(x,z,c,nm),silos:()=>silos(x,z,c),containers:()=>containers(x,z),tanks:()=>tanks(x,z),lab:()=>lab(x,z,c),turbines:()=>turbines(x,z),wtower:()=>wtower(x,z,c),power:()=>power(x,z)})[k]()}
road(560,8,0,72,65,1);road(8,260,140,70,1,30);road(8,260,-146,70,1,30);road(8,160,-44,120,1,19);road(8,160,70,120,1,19);
const mv=(g,ax,min,max,sp)=>movers.push({g,ax,min,max,sp});
HI(()=>{
  for(let x=-280;x<280;x+=8)box(3,.02,.25,x,.03,72,0xf2f2ee);
  for(let z=-55;z<200;z+=8){box(.25,.02,3,140,.03,z,0xf2f2ee);box(.25,.02,3,-146,.03,z,0xf2f2ee)}
  for(let z=44;z<200;z+=8){box(.25,.02,3,-44,.03,z,0xf2f2ee);box(.25,.02,3,70,.03,z,0xf2f2ee)}
  [170,203,236,269].forEach(cx=>[-44,-10,50,98,132].forEach(cz=>{slot(cx,cz);slot(-cx,cz)}));
  [-104,-72,-18,16,48,94,122].forEach(cx=>[98,132].forEach(cz=>slot(cx,cz)));
  for(let i=0;i<5;i++)[[26.4,1,0],[29.6,-1,Math.PI]].forEach(l=>[[100,280],[-280,-100]].forEach(r=>{const g=i%3==0?truck(pick(PAL)):car(pick(PAL));g.position.set(r[0]+drnd()*(r[1]-r[0]),0,l[0]);g.rotation.y=l[2];mv(g,"x",r[0],r[1],l[1]*(8+drnd()*8))}));
  [140,-146].forEach(rx=>[[rx-1.4,1,-Math.PI/2],[rx+1.4,-1,Math.PI/2]].forEach(l=>{for(let i=0;i<4;i++){const g=i%2?truck(pick(PAL)):car(pick(PAL));g.position.set(l[0],0,-50+drnd()*240);g.rotation.y=l[2];mv(g,"z",-55,195,l[1]*(8+drnd()*8))}}));
  [[70.6,1,0],[73.4,-1,Math.PI]].forEach(l=>{for(let i=0;i<4;i++){const g=i%2?truck(pick(PAL)):car(pick(PAL));g.position.set(-240+drnd()*480,0,l[0]);g.rotation.y=l[2];mv(g,"x",-250,250,l[1]*(8+drnd()*8))}});
},1);
[[-360,-60,90,90],[-380,60,100,110],[-340,200,90,80],[360,-60,100,100],[380,80,90,90],[340,230,100,95],[-120,330,110,100],[100,350,100,90],[0,-250,120,120],[-220,-230,110,100],[240,-240,110,110]].forEach((m,i)=>cyl(0,m[2],m[3],m[0],m[3]/2-2,m[1],[0x9bab97,0x8fa28f,0xa5b19a,0x8da08e][i%4],undefined,7));
// sea, pier, lighthouse, boat, planetarium, sculpture
mesh(new THREE.BoxGeometry(340,.3,90),(()=>{const w=tex(256,256,(g,W,H)=>{g.fillStyle="#808080";g.fillRect(0,0,W,H);for(let i=0;i<300;i++){g.strokeStyle=`rgba(${100+Math.random()*120|0},${100+Math.random()*120|0},${100+Math.random()*120|0},.5)`;g.lineWidth=1+Math.random()*2;g.beginPath();const y=Math.random()*H,x=Math.random()*W;g.moveTo(x,y);g.quadraticCurveTo(x+20,y-5,x+40,y);g.stroke()}},40,6);window.seaWave=w;const m=new THREE.MeshStandardMaterial({color:LC(0x2b7f9c),roughness:.06,metalness:.55,bumpMap:w,bumpScale:1.2});m.userData.env=1.3;return m})(),0,-.15,-118);
mesh(new THREE.BoxGeometry(340,.2,8),SM(tex(64,64,(g,w,h)=>{g.fillStyle="#e4d6b4";g.fillRect(0,0,w,h);noise(g,w,h,300,.1)},40,1),1),0,-.05,-70);
box(3,.3,28,20,.05,-82,0xb88a5a);
cyl(6,7,.6,-60,.1,-80,0xe4d6b4,scene,20);cyl(1.6,2.2,12,-60,6,-80,0xf2efe6,scene,16);cyl(1.7,1.9,3,-60,4,-80,0xc4423b,scene,16);cyl(1.7,1.9,3,-60,9,-80,0xc4423b,scene,16);cyl(1.4,1.4,1.5,-60,12.7,-80,0xffe9a8,scene,12);cyl(0,1.9,1.4,-60,14.2,-80,0x2f4a3f,scene,12);
const boat=new THREE.Group();box(5,.8,1.8,0,.4,0,0xf2efe6,boat);box(2,1,1.5,-.5,1.3,0,0x3f6b8c,boat);boat.position.set(-90,0,-95);scene.add(boat);
cyl(8,9,.8,-92,.4,-8,0xd8d2c0,scene,28);mesh(new THREE.SphereGeometry(5,24,12,0,6.3,0,1.57),0x6f93a3,-92,.8,-8);
box(12,.1,12,92,.02,-12,0x4aa6bd);cyl(.8,1,3,92,1.5,-12,0xd8d2c0);mesh(new THREE.TorusKnotGeometry(2.2,.55,80,10),0xd9923a,92,5.5,-12);

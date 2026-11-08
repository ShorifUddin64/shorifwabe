/* core: renderer, camera, lights, helper functions */
const R=CONFIG.rooms,$=s=>document.querySelector(s);
const CX=[-7,4.4],HX=-18;
const STYLE={tiles:false,redCarpet:true}; // set true to bring back coloured tiles / red carpet
const RC=[[HX,-9.5],[CX[0],-8],[CX[1],-8],[CX[0],8],[CX[1],8],[HX,9.5],[17,0]];

/* ---------- renderer / scene ---------- */
const cv=$("#c"),ren=new THREE.WebGLRenderer({canvas:cv,antialias:true});
const LC=h=>new THREE.Color(h).convertSRGBToLinear();
ren.outputEncoding=THREE.sRGBEncoding;ren.toneMapping=THREE.ACESFilmicToneMapping;ren.toneMappingExposure=.8;ren.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();scene.background=LC(0xdfe6dc);scene.fog=new THREE.Fog(LC(0xdfe6dc),200,520);
const cam=new THREE.PerspectiveCamera(45,1,.5,900);
const hemi=new THREE.HemisphereLight(0xdcebff,0x8a8670,.22);scene.add(hemi);
const sun=new THREE.DirectionalLight(0xfff0d8,1.6);sun.shadow.bias=-.0004;sun.shadow.normalBias=.05;sun.position.set(-30,50,25);sun.castShadow=true;
Object.assign(sun.shadow.camera,{left:-50,right:50,top:50,bottom:-50,near:1,far:150});scene.add(sun);
function quality(l){const d=window.devicePixelRatio||1;ren.setPixelRatio(l==0?.75:l==1?Math.min(d,1.25):Math.min(Math.max(d,1.5),2.5));
  ren.shadowMap.enabled=l>0;ren.shadowMap.type=l==2?THREE.PCFSoftShadowMap:THREE.PCFShadowMap;sun.castShadow=l>0;
  const ms=l==2?4096:l==1?1536:1024;sun.shadow.mapSize.set(ms,ms);sun.shadow.map&&(sun.shadow.map.dispose(),sun.shadow.map=null);
  scene.traverse(o=>{if(o.userData&&o.userData.hi)o.visible=l>=o.userData.hi;if(o.material)[].concat(o.material).forEach(m=>m.needsUpdate=true)});const td=document.getElementById("tod");if(td){td.disabled=l!=2;if(l!=2){todT=0;td.value="0"}}gradeEnv();window.curQ=l;if(window.setRealPeople)setRealPeople(l);resize()}
function resize(){ren.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener("resize",resize);

/* ---------- helpers ---------- */
const mats={},M=c=>mats[c]||(mats[c]=new THREE.MeshStandardMaterial({color:LC(c),roughness:.8,metalness:0}));
function tex(w,h,draw,rx=1,ry=1){const c=document.createElement("canvas");c.width=w;c.height=h;draw(c.getContext("2d"),w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.anisotropy=8;t.encoding=THREE.sRGBEncoding;t.userData.draw=draw;return t}
const ct=c=>{const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t};
const SM=(map,r=.9,m=0,col=0xffffff)=>new THREE.MeshStandardMaterial({map,roughness:r,metalness:m,color:LC(col)});
const noise=(g,w,h,n,a)=>{for(let i=0;i<n;i++){const v=Math.random()*255|0;g.fillStyle=`rgba(${v},${v},${v},${a})`;g.fillRect(Math.random()*w,Math.random()*h,2,2)}};
const drawWood=(g,w,h)=>{g.fillStyle="#d9c6a4";g.fillRect(0,0,w,h);for(let i=0;i<8;i++){g.fillStyle=`rgba(${120+Math.random()*50|0},${85+Math.random()*30|0},50,.14)`;g.fillRect(0,i*h/8,w,h/8);g.fillStyle="rgba(70,50,30,.35)";g.fillRect(0,i*h/8,w,1.5);for(let j=0;j<3;j++)g.fillRect((i*37+j*91)%w,i*h/8,1.5,h/8)}noise(g,w,h,600,.06)};
const screenM=new THREE.MeshBasicMaterial({map:tex(64,64,(g,w,h)=>{g.fillStyle="#0f2a26";g.fillRect(0,0,w,h);for(let i=0;i<9;i++){g.fillStyle=`hsl(${130+Math.random()*60},60%,${55+Math.random()*20}%)`;g.fillRect(4+Math.random()*10,4+i*6,10+Math.random()*40,2)}})});
const drawAsph=(g,w,h)=>{g.fillStyle="#3a3e40";g.fillRect(0,0,w,h);noise(g,w,h,1400,.12)};
const glassM=new THREE.MeshStandardMaterial({color:LC(0xbfe0e0),transparent:true,opacity:.28,roughness:.08,metalness:.1});
const glowTex=(()=>{const c=document.createElement("canvas");c.width=c.height=64;const g=c.getContext("2d"),r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255,228,170,1)");r.addColorStop(1,"rgba(255,200,120,0)");g.fillStyle=r;g.fillRect(0,0,64,64);return ct(c)})();
const glowM=new THREE.SpriteMaterial({map:glowTex,transparent:true,opacity:.12,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
const lampM=new THREE.MeshStandardMaterial({color:LC(0xfff2c8),emissive:new THREE.Color(1,.88,.6),emissiveIntensity:.25,roughness:.5});
const nightMats=[],phCache={};
const PH=c=>phCache[c]||(phCache[c]=Object.assign(new THREE.MeshPhysicalMaterial({color:LC(c),metalness:.6,roughness:.28,clearcoat:1,clearcoatRoughness:.08}),{userData:{env:1.5}}));
const GLS=Object.assign(new THREE.MeshPhysicalMaterial({color:0x0c1a22,metalness:.9,roughness:.04}),{userData:{env:1.8}});
const RIM=new THREE.MeshStandardMaterial({color:0xcfd3d6,metalness:.9,roughness:.25});
const BARK=SM(tex(64,64,(g,w,h)=>{g.fillStyle="#6a4a30";g.fillRect(0,0,w,h);for(let i=0;i<60;i++){g.fillStyle=`rgba(${30+Math.random()*40|0},${20+Math.random()*25|0},10,.5)`;g.fillRect(Math.random()*w,0,2+Math.random()*3,h)}},1,3),.95);
function glow(x,y,z,s){const sp=new THREE.Sprite(glowM);sp.position.set(x,y,z);sp.scale.set(s,s,1);scene.add(sp);return sp}
const GR=[0x4a7a35,0x5f8f42,0x6A994E,0x3f6b2e,0x52796F,0x7fa655];
const _m=new THREE.Matrix4(),_q=new THREE.Quaternion(),_e=new THREE.Euler(),_s=new THREE.Vector3(),_p=new THREE.Vector3();
function instBatch(geo,map,max,cut){const subs={},cap=Math.ceil(max/4);let c=0;
  const get=(h,hi)=>{const key=h+(hi?"h":"");return subs[key]||(subs[key]=(()=>{const im=new THREE.InstancedMesh(geo,new THREE.MeshStandardMaterial({map,alphaTest:cut,side:THREE.DoubleSide,roughness:.7,color:LC(h),emissive:LC(h),emissiveIntensity:.05}),cap);im.count=0;im.frustumCulled=false;im.n=0;if(hi)im.userData.hi=2;scene.add(im);return im})())};
  [0x6A994E,0x52796F,0xA3B18A,0x8fb36a].forEach(h=>{get(h,0);get(h,1)});
  return{add2:(x,y,z,rx,ry,rz,sx,sy,h)=>{const im=get(h,(c++%5)>=3);if(im.n>=cap)return;_e.set(rx,ry,rz,"YXZ");_q.setFromEuler(_e);_p.set(x,y,z);_s.set(sx,sy,sx);_m.compose(_p,_q,_s);im.setMatrixAt(im.n,_m);im.n++;im.count=im.n;im.instanceMatrix.needsUpdate=true}}}
const leafGeo=new THREE.PlaneGeometry(.5,1,2,4).translate(0,.5,0);{const ps=leafGeo.attributes.position;for(let i=0;i<ps.count;i++){const x=ps.getX(i),y=ps.getY(i);ps.setZ(i,-(x*x)*1.6+y*y*.18)}leafGeo.computeVertexNormals()}
const leafIM=instBatch(leafGeo,tex(64,128,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,"#ffffff");gr.addColorStop(.5,"#e8e8e8");gr.addColorStop(1,"#b0b0b0");g.fillStyle=gr;g.beginPath();g.moveTo(32,126);g.bezierCurveTo(0,96,2,34,32,2);g.bezierCurveTo(62,34,64,96,32,126);g.fill();g.strokeStyle="rgba(0,0,0,.32)";g.lineWidth=2;g.beginPath();g.moveTo(32,126);g.lineTo(32,6);for(let i=0;i<7;i++){const y=112-i*14;g.moveTo(32,y);g.lineTo(10+i,y-16);g.moveTo(32,y);g.lineTo(54-i,y-16)}g.stroke()}),60000,.45);
const frGeo=new THREE.PlaneGeometry(1.6,3,1,8).translate(0,1.5,0);{const ps=frGeo.attributes.position;for(let i=0;i<ps.count;i++)ps.setX(i,ps.getX(i)-Math.pow(ps.getY(i)/3,2)*1.1)}
const frondIM=instBatch(frGeo,tex(256,512,(g,w,h)=>{g.fillStyle="#fff";g.strokeStyle="#fff";g.lineWidth=6;g.beginPath();g.moveTo(128,506);g.lineTo(128,8);g.stroke();for(let k=0;k<46;k++){const t=k/46,y=500-t*470,len=112*Math.sin(Math.PI*Math.min(1,t*1.1+.05))+10;[-1,1].forEach(sd=>{g.beginPath();g.moveTo(128,y);g.lineTo(128+sd*len,y-len*.5);g.lineTo(128+sd*len*.9,y-len*.36);g.lineTo(128,y+9);g.closePath();g.fill()})}}),4000,.35);
const flowerIMs=[0xd9342b,0xf0c030,0xf08ab0,0xffffff,0xb04ad0].map(h=>{const im=new THREE.InstancedMesh(new THREE.SphereGeometry(.14,6,4),new THREE.MeshStandardMaterial({color:LC(h),roughness:.7}),160);im.count=0;im.frustumCulled=false;im.n=0;im.userData.hi=1;scene.add(im);return im});let flN=0,flSd=11;
function HI(fn,lv=2){const n0=scene.children.length;fn();for(let i=n0;i<scene.children.length;i++)scene.children[i].userData.hi=lv}
function flowerPatch(cx,cz,w,d,n){for(let i=0;i<n;i++){flSd=flSd*16807%2147483647;const a=flSd/2147483647;flSd=flSd*16807%2147483647;const b=flSd/2147483647,im=flowerIMs[flN++%5];if(im.n>=160)continue;_p.set(cx+(a-.5)*w,.14,cz+(b-.5)*d);_q.identity();_s.set(1,1,1);_m.compose(_p,_q,_s);im.setMatrixAt(im.n++,_m);im.count=im.n;im.instanceMatrix.needsUpdate=true}}
function mesh(geo,c,x,y,z,p=scene){const m=new THREE.Mesh(geo,(c.isMaterial||Array.isArray(c))?c:M(c));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;p.add(m);return m}
const box=(w,h,d,x,y,z,c,p)=>mesh(new THREE.BoxGeometry(w,h,d),c,x,y,z,p);
const cyl=(rt,rb,h,x,y,z,c,p,s=12)=>mesh(new THREE.CylinderGeometry(rt,rb,h,s),c,x,y,z,p);
const ball=(r,x,y,z,c,p)=>mesh(new THREE.SphereGeometry(r,14,10),c,x,y,z,p);
function plant(x,z,s=1,k=0){if(k==0)k=1;
  cyl(.42*s,.34*s,.7*s,x,.35*s,z,0xcfc6b2,undefined,18);cyl(.4*s,.4*s,.04*s,x,.7*s,z,0x4a3a2a,undefined,18);
  if(k==0)for(let i=0;i<10;i++)frondIM.add2(x,.72*s,z,0,Math.PI-i*.63,.5+(i%3)*.17,.55*s,.55*s,GR[i%3+1]);
  else if(k==1){cyl(.03*s,.05*s,1.3*s,x,1.35*s,z,0x6a4a30,undefined,6);for(let i=0;i<16;i++){const a=i*2.4,h=.5+i*.08;leafIM.add2(x+Math.cos(a)*.05*s,(.7+h)*s,z+Math.sin(a)*.05*s,0,Math.PI-a,.9+(i%3)*.12,1.1*s,.75*s,GR[i%6])}}
  else for(let i=0;i<10;i++){const a=i*.63;leafIM.add2(x+Math.cos(a)*.1*s,.7*s,z+Math.sin(a)*.1*s,0,Math.PI-a,.08+(i%3)*.08,.55*s,(1.3+(i%3)*.25)*s,GR[(i%3)*2])}}
function label(t,x,y,z,w=7,bg="rgba(246,243,235,.95)",fg="#1f3a31"){const c=document.createElement("canvas");c.width=512;c.height=128;const g=c.getContext("2d");g.fillStyle=bg;g.beginPath();g.roundRect?g.roundRect(4,4,504,120,24):g.rect(4,4,504,120);g.fill();g.fillStyle=fg;g.font="bold 54px Georgia,serif";g.textAlign="center";g.textBaseline="middle";g.fillText(t,256,68);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:ct(c),transparent:true}));s.position.set(x,y,z);s.scale.set(w,w/4,1);scene.add(s)}
function desk(x,z,ry=0,npc=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;scene.add(g);
  box(2.6,.1,1.2,0,.8,0,0xc99a6b,g);box(.1,.8,1.1,-1.2,.4,0,0x2f4a3f,g);box(.1,.8,1.1,1.2,.4,0,0x2f4a3f,g);
  mesh(new THREE.BoxGeometry(.9,.55,.06),[M(0x1d2b2a),M(0x1d2b2a),M(0x1d2b2a),M(0x1d2b2a),screenM,M(0x1d2b2a)],0,1.2,-.25,g);cyl(.07,.07,.12,.8,.91,.1,0xc4694a,g,8);box(.12,.2,.12,0,.95,-.25,0x333,g);{const sh=cyl(.08,.1,.12,-.9,1.1,-.2,0xfff2c8,g,10);sh.material=lampM;cyl(.015,.015,.28,-.9,.95,-.2,0x222222,g,6)}box(.6,.02,.25,0,.87,.2,0xdedbd0,g);
  box(.8,.1,.8,0,.5,1.1,0x8f5a3c,g);box(.8,.8,.1,0,.95,1.5,0x8f5a3c,g);cyl(.06,.06,.5,0,.25,1.1,0x333,g,6);
  if(npc){const p=person(npc,true,1);p.position.set(0,-.3,1.1);p.rotation.y=Math.PI;g.add(p);sitters.push(p)}}
function sofa(x,z,ry){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;scene.add(g);box(3.4,.6,1.2,0,.3,0,0x3f6b57,g);box(3.4,.8,.3,0,.8,-.5,0x3f6b57,g);box(.3,.9,1.2,-1.6,.5,0,0x2f5846,g);box(.3,.9,1.2,1.6,.5,0,0x2f5846,g)}

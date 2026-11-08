/* people: procedural characters (replaced by .glb models if provided, see models.js) */
const ALLP=[];
/* ---------- people ---------- */
const sitters=[],skin=0xe3b896;
const SK=[0xf0c8a0,0xd9a47c,0xb27a52,0x8a5a3c],HR=[0x1b1512,0x3b2a1e,0x6b4a2b,0x161616,0x9c948a],PT=[0x23324a,0x3b3b40,0x4a4036,0x1f2a38,0x5a5448];let pc=0;
function person(shirt,seated,suit){const g=new THREE.Group(),u=g.userData,k=pc++,sk=SK[k%4],hr=HR[(k*3)%5],pt=suit?0x15151a:PT[(k*2)%5];
  cyl(.2,.17,.64,0,1.18,0,shirt,g,14);cyl(.18,.18,.2,0,.84,0,pt,g,14);if(suit){cyl(.205,.2,.32,0,.9,0,shirt,g,14);box(.09,.3,.02,0,1.3,.2,0xf4f4f4,g);box(.04,.26,.02,0,1.28,.21,0x7a1f1f,g)}cyl(.05,.06,.1,0,1.55,0,sk,g,8);
  const hd=new THREE.Group();hd.position.y=1.68;g.add(hd);u.head=hd;
  ball(.115,0,0,0,sk,hd).scale.set(1,1.18,1.05);
  mesh(new THREE.SphereGeometry(.123,14,10,0,6.3,0,1.9),hr,0,.015,-.01,hd);
  if(k%3==0)box(.21,.3,.08,0,-.09,-.1,hr,hd);
  const lim=(x,y,len,r,c)=>{const p=new THREE.Group();p.position.set(x,y,0);g.add(p);cyl(r,r*.78,len,0,-len/2,0,c,p,8);return p};
  u.lL=lim(-.09,.82,.82,.085,pt);u.lR=lim(.09,.82,.82,.085,pt);
  box(.12,.07,.26,0,-.79,.05,0x1c1c1c,u.lL);box(.12,.07,.26,0,-.79,.05,0x1c1c1c,u.lR);
  u.aL=lim(-.27,1.46,.34,.06,shirt);u.aR=lim(.27,1.46,.34,.06,shirt);
  [u.aL,u.aR].forEach(a=>{cyl(.048,.04,.32,0,-.5,0,suit?shirt:sk,a,8);ball(.05,0,-.68,0,sk,a)});
  if(seated){u.lL.rotation.x=u.lR.rotation.x=-1.45;u.aL.rotation.x=u.aR.rotation.x=-.9}
  u.seated0=!!seated;ALLP.push(g);scene.add(g);return g}
const vis=person(0x4a86b8),boss=person(0x14141a,false,1),recep=person(0x1b1b22,false,1);
vis.userData.role="visitor";boss.userData.role="boss";recep.userData.role="recep";
vis.position.set(-39.4,0,12.4);boss.position.set(22.1,-.3,0);boss.rotation.y=-Math.PI/2;recep.position.set(-18,-.3,-11.4);
vis.userData.path=[];
function seat(p,lx,lz){p.userData.lL.rotation.x=p.userData.lR.rotation.x=-1.45;p.userData.aL.rotation.x=p.userData.aR.rotation.x=-.9}
boss.userData.seated=recep.userData.seated=true;boss.userData.path=[];recep.userData.path=[];

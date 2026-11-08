/* Real people from .glb files (models/). Missing files => built-in people stay and the site works as before. */
(function(){
  const M=typeof MODELS!=="undefined"?MODELS:null;
  if(!M||!THREE.GLTFLoader||!THREE.SkeletonUtils||typeof ALLP==="undefined"){console.info("[models] loader not available, using built-in people");return}
  const L=new THREE.GLTFLoader(),GL=[],V=new THREE.Vector3(),done=new Set();let real=true;
  const emb=u=>typeof ASSETS!=="undefined"&&ASSETS[u];
  const load=u=>{if(!u)return Promise.resolve(null);const e=emb(u);
    if(e){const bin=atob(e),a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return new Promise(r=>L.parse(a.buffer,"",g=>r(g),()=>{console.info("[models] cannot read:",u);r(null)}))}
    return new Promise(r=>L.load(u,g=>r(g),undefined,()=>{console.info("[models] not found:",u);r(null)}))};
  const pick=(g,re)=>g&&g.animations&&g.animations.length?(g.animations.find(a=>re.test(a.name))||g.animations[0]):null;
  const rnd=i=>{const x=Math.sin(i*12.9898)*43758.5453;return x-Math.floor(x)};
  /* Mixamo walks are not "in place": lock the horizontal hips drift so the character does not slide away and snap back */
  function flatten(clip){if(!clip||done.has(clip))return;done.add(clip);
    clip.tracks.forEach(t=>{if(!/Hips\.position$/.test(t.name))return;const v=t.values,n=v.length/3,mean=[0,0,0],mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];
      for(let i=0;i<n;i++)for(let k=0;k<3;k++){const x=v[i*3+k];mean[k]+=x/n;mn[k]=Math.min(mn[k],x);mx[k]=Math.max(mx[k],x)}
      let up=0;for(let k=1;k<3;k++)if(Math.abs(mean[k])>Math.abs(mean[up]))up=k;
      for(let k=0;k<3;k++){if(k===up)continue;if(mx[k]-mn[k]>.25*Math.abs(mean[up]))for(let i=0;i<n;i++)v[i*3+k]=v[k]}})}
  /* body height from the skeleton (more reliable than mesh bounds for skinned meshes) */
  function span(root){root.updateMatrixWorld(true);let mn=1e9,mx=-1e9;root.traverse(o=>{if(o.isBone){o.getWorldPosition(V);mn=Math.min(mn,V.y);mx=Math.max(mx,V.y)}});return[mn,mx]}
  function fixMaterials(root){root.traverse(o=>{if(!o.isMesh)return;o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;
    [].concat(o.material).forEach(m=>{if(m.userData.fixed)return;m.userData.fixed=1;
      if(/hair|lash|brow/i.test(m.name)){m.transparent=false;m.alphaTest=.5;m.depthWrite=true;m.side=THREE.DoubleSide}
      else{m.metalnessMap=null;m.roughnessMap=null;m.metalness=0;m.roughness=.7}
      m.envMapIntensity=.6;m.needsUpdate=true})})}
  (async()=>{
    const bodies=(await Promise.all((M.people||[]).map(load))).filter(Boolean);
    const rb={};for(const k of ["visitor","boss","recep","guard"]){const g=await load(M[k]);if(g)rb[k]=g}
    const f={};for(const k of ["idle","walk","sit","run","wave","knock","water"])f[k]=await load(M[k]);
    const pool=[...bodies,...Object.values(rb)];
    const find=(k,re)=>pick(f[k],re)||pool.map(g=>g.animations.find(a=>re.test(a.name))).find(Boolean)||null;
    const clips={idle:find("idle",/idle|stand/i),walk:find("walk",/walk/i),sit:find("sit",/sit/i),run:find("run",/run|jog/i),wave:find("wave",/wave|hello/i),knock:find("knock",/knock/i),water:find("water",/water/i)};
    const any=bodies[0]||Object.values(rb)[0];
    if(!any||!clips.idle||!clips.walk){console.info("[models] need at least one body + idle + walk animation; keeping built-in people");return}
    for(const k in clips)flatten(clips[k]);
    const H=M.height||1.78;let bi=0,idx=0;
    ALLP.forEach(p=>{const u=p.userData,role=u.role;
      const sitter=u.seated0||role==="visitor"||role==="boss"||role==="recep";
      if(sitter&&!clips.sit)return;
      if(role==="guard"&&!rb.guard)return;
      const i=idx++,src=rb[role]||bodies[(bi++)%Math.max(1,bodies.length)]||any;
      const clone=THREE.SkeletonUtils.clone(src.scene);fixMaterials(clone);
      const s=span(clone),sc=H*(1+(rnd(i)-.5)*.08)/Math.max(.1,s[1]-s[0]);
      clone.scale.setScalar(sc);clone.position.y=-s[0]*sc;
      const holder=new THREE.Group();holder.add(clone);u.proc=p.children.slice();p.add(holder);
      const spd=u.fast?6:(role||u.seated0)?5.5:u.forceMove?3:2.3,ts=Math.min(M.maxTimeScale||3,Math.max(1,spd/1.7));
      const mix=new THREE.AnimationMixer(clone),acts={};
      for(const k in clips)if(clips[k]){const a=mix.clipAction(clips[k]);if(k==="walk"||k==="run")a.timeScale=k==="run"?1.5:ts;acts[k]=a}
      u.glb=holder;u.mix=mix;u.acts=acts;u.off=rnd(i+7);GL.push(p)});
    window.glbTickAll=dt=>{if(!real)return;for(const p of GL){const u=p.userData,A=u.acts,moving=u.forceMove||(u.path&&u.path.length>0),seated=u.seated===undefined?u.seated0:u.seated;
      const want=u.wave&&A.wave?"wave":u.knock&&A.knock?"knock":u.water&&A.water?"water":seated&&A.sit?"sit":moving?(u.fast&&A.run?"run":"walk"):"idle";
      if(u.cur!==want){const a=A[want]||A.idle,pr=A[u.cur];if(pr&&pr!==a)pr.fadeOut(.25);a.reset().fadeIn(.25).play();a.time=u.off*a.getClip().duration;u.cur=want}
      u.glb.position.y=seated?.3:0;u.mix.update(dt)}};
    window.setRealPeople=l=>{real=l>=1;GL.forEach(p=>{const u=p.userData;u.glb.visible=real;u.proc.forEach(c=>{c.visible=!real});u.glb.traverse(o=>{if(o.isMesh)o.castShadow=l>=2})})};
    window.setRealPeople(window.curQ===undefined?2:window.curQ);
    console.info("[models] real people active:",GL.length)
  })();
})();

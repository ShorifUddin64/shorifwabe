/* Real photo textures (textures/). Missing files are skipped. */
(function(){
  const R=typeof REALTEX!=="undefined"?REALTEX:null;if(!R)return;
  const ld=new THREE.TextureLoader(),load=u=>{if(!u)return Promise.resolve(null);const e=typeof ASSETS!=="undefined"&&ASSETS[u];return new Promise(r=>ld.load(e?"data:image/jpeg;base64,"+e:u,t=>r(t),undefined,()=>{console.info("[textures] not found:",u);r(null)}))};
  const prep=t=>{const c=t.clone();c.needsUpdate=true;c.wrapS=c.wrapT=THREE.RepeatWrapping;c.anisotropy=8;c.encoding=THREE.sRGBEncoding;return c};
  (async()=>{
    const T={asphalt:await load(R.asphalt),grass:await load(R.grass),wood:await load(R.wood),sky:await load(R.sky)};
    let n=0,k=0;
    scene.traverse(o=>{if(!o.isMesh||!o.geometry||o.geometry.type!=="BoxGeometry")return;const g=o.geometry.parameters,m=o.material;
      // roads: 8 units wide, 0.1 high -> photo with its own lane markings (rotated on east-west roads)
      if(T.asphalt&&Math.abs(g.height-.1)<1e-6&&Math.min(g.width,g.depth)===8){
        const c=prep(T.asphalt);c.center.set(.5,.5);c.rotation=g.width>g.depth?Math.PI/2:0;c.repeat.set(1,Math.max(g.width,g.depth)/20);
        m.map=c;m.bumpMap=null;m.roughness=.92;m.needsUpdate=true;o.position.y=-.04+(k++)*.0004;n++;return}
      // ground
      if(T.grass&&g.width===640&&Math.abs(g.height-.2)<1e-6&&m.map){const c=prep(T.grass),sc=(R.tileScale&&R.tileScale.grass)||1;c.repeat.set(m.map.repeat.x*sc,m.map.repeat.y*sc);m.map=c;m.bumpMap=null;m.needsUpdate=true;n++}
      // office floors
      if(T.wood&&m.map&&m.map.userData&&(m.map.userData.draw===drawWood||m.map.userData.draw===drawPale)){const c=prep(T.wood),sc=(R.tileScale&&R.tileScale.wood)||1;c.repeat.set(m.map.repeat.x*sc,m.map.repeat.y*sc);m.map=c;m.needsUpdate=true;n++}
    });
    // hand-made lane dashes / edge lines are no longer needed when the road photo already has them
    if(T.asphalt)scene.traverse(o=>{if(o.isMesh&&o.geometry&&o.geometry.type==="BoxGeometry"){const g=o.geometry.parameters;if(Math.abs(g.height-.02)<1e-6&&Math.min(g.width,g.depth)<=.25&&Math.max(g.width,g.depth)>=3)o.visible=false}});
    // sky photo: only the upper half of the 360 picture is used (the lower half is ground)
    if(T.sky&&typeof skyMat!=="undefined"){const im=T.sky.image,c=document.createElement("canvas");c.width=im.width;c.height=Math.floor(im.height/2);c.getContext("2d").drawImage(im,0,0,im.width,im.height/2,0,0,c.width,c.height);
      const tx=new THREE.CanvasTexture(c);tx.encoding=THREE.sRGBEncoding;
      scene.traverse(o=>{if(o.material===skyMat){o.geometry.dispose();o.geometry=new THREE.SphereGeometry(800,48,24,0,Math.PI*2,0,Math.PI/2)}});
      skyMat.map=tx;skyMat.needsUpdate=true;n++}
    if(n)console.info("[textures] real textures applied:",n)
  })();
})();

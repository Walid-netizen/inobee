/* =========================================================================
   INOBEE — Cinematic WebGL Stage v2.0 (Three.js r158)
   - Procedural honeycomb lattice backdrop with bioluminescent cursor trail
   - Physically-based glass jar with luminous honey core + Fresnel aura
   - Interactive 3D Exploded Anatomy mode (levitating gold lid, honeycomb
     security seal, sculpted 3D honey dipper & molten nectar stream, live
     3D-to-2D projected HUD callout pins)
   - Orbiting 3D liquid gold nectar droplets & floating honeycomb cells
   - Golden pollen particles with depth-of-field bokeh, cursor reactive
   - Continuous multi-act scroll choreography
   Exposes window.InobeeScene { intro, setVariant, pulse, setExploded, toggleExploded }
   ========================================================================= */
(function () {
  'use strict';

  const canvas = document.getElementById('gl');
  const api = {
    ready: false,
    variant: 'sidr',
    exploded: false,
    intro() {},
    setVariant() {},
    pulse() {},
    setExploded() {},
    toggleExploded() { return false; },
    tasteDrip() {},
  };
  window.InobeeScene = api;

  if (!window.THREE || !canvas) return;

  // ---------- Capability check ----------
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
  } catch (e) {
    canvas.style.display = 'none';
    document.documentElement.classList.add('no-webgl');
    return;
  }

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const small = window.matchMedia('(max-width: 767px)').matches;
  const LOW = coarse || small;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const maxDPR = LOW ? 1.5 : 1.75;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDPR));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.setClearColor(0x051329, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  // ---------- Shared GLSL ----------
  const NOISE = /* glsl */ `
    float hash13(vec3 p){ p = fract(p*0.1031); p += dot(p, p.yzx + 33.33); return fract((p.x + p.y) * p.z); }
    float vnoise(vec3 p){
      vec3 i = floor(p); vec3 f = fract(p); f = f*f*(3.0-2.0*f);
      float n000 = hash13(i), n100 = hash13(i+vec3(1,0,0)), n010 = hash13(i+vec3(0,1,0)), n110 = hash13(i+vec3(1,1,0));
      float n001 = hash13(i+vec3(0,0,1)), n101 = hash13(i+vec3(1,0,1)), n011 = hash13(i+vec3(0,1,1)), n111 = hash13(i+vec3(1,1,1));
      return mix(mix(mix(n000,n100,f.x), mix(n010,n110,f.x), f.y), mix(mix(n001,n101,f.x), mix(n011,n111,f.x), f.y), f.z);
    }
  `;

  // =========================================================================
  // 1. BACKDROP — full-screen procedural honeycomb lattice & cursor trail
  // =========================================================================
  const bgUniforms = {
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTrail1: { value: new THREE.Vector2(0.5, 0.5) },
    uTrail2: { value: new THREE.Vector2(0.5, 0.5) },
    uGlow: { value: new THREE.Vector2(0.7, 0.5) },
    uParallax: { value: new THREE.Vector2(0, 0) },
    uPulse: { value: 1 },
    uLattice: { value: 1 },
    uScroll: { value: 0 },
    uTint: { value: new THREE.Color(0.90, 0.48, 0.10) },
  };
  const bgMat = new THREE.ShaderMaterial({
    uniforms: bgUniforms,
    depthWrite: false,
    depthTest: false,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform float uTime, uPulse, uLattice, uScroll;
      uniform vec2 uRes, uMouse, uTrail1, uTrail2, uGlow, uParallax;
      uniform vec3 uTint;
      varying vec2 vUv;
      float hash21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
      float hexDist(vec2 p){ p = abs(p); return max(dot(p, normalize(vec2(1.0, 1.7320508))), p.x); }
      vec4 hexCoords(vec2 uv){
        vec2 r = vec2(1.0, 1.7320508); vec2 h = r*0.5;
        vec2 a = mod(uv, r) - h; vec2 b = mod(uv - h, r) - h;
        vec2 gv = dot(a,a) < dot(b,b) ? a : b;
        return vec4(gv, uv - gv);
      }
      void main(){
        float aspect = uRes.x / uRes.y;
        vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
        vec2 g = (uGlow - 0.5) * vec2(aspect, 1.0);
        vec2 m0 = (uMouse - 0.5) * vec2(aspect, 1.0);
        vec2 m1 = (uTrail1 - 0.5) * vec2(aspect, 1.0);
        vec2 m2 = (uTrail2 - 0.5) * vec2(aspect, 1.0);

        // Deep navy -> obsidian gradient
        vec3 navy = vec3(0.020, 0.075, 0.161);
        vec3 deep = vec3(0.007, 0.024, 0.058);
        vec3 col = mix(deep, navy, smoothstep(-0.2, 1.1, vUv.y + 0.15*sin(uTime*0.05)));

        // Warm amber glow behind the jar
        float dg = length(p - g);
        float glow = exp(-dg*dg*5.2);
        col += uTint * glow * 0.45;
        col += vec3(1.0, 0.78, 0.42) * exp(-dg*dg*26.0) * 0.20;

        // Bioluminescent cursor wake
        float dm0 = length(p - m0);
        float dm1 = length(p - m1);
        float dm2 = length(p - m2);
        float mouseGlow = exp(-dm0*dm0*10.0) + exp(-dm1*dm1*14.0)*0.55 + exp(-dm2*dm2*18.0)*0.3;

        // Organic fluid caustic ripple around cursor
        float ripple = sin(dm0 * 28.0 - uTime * 3.5) * exp(-dm0*dm0*16.0) * 0.012;

        // Honeycomb lattice
        vec2 hp = (p + uParallax + ripple) * 7.5 + vec2(0.0, uScroll*1.4);
        vec4 hc = hexCoords(hp);
        float ed = 0.5 - hexDist(hc.xy);
        float line = smoothstep(0.036, 0.0, ed);
        float cellRnd = hash21(hc.zw);

        float wave = smoothstep(0.14, 0.0, abs(dg - uPulse*2.6)) * (1.0 - uPulse);
        float sweep = smoothstep(0.28, 0.0, abs(fract(uTime*0.032) * 4.2 - 2.1 - (p.x + p.y*0.6)));

        float lit = 0.05 + glow*0.58 + mouseGlow*0.75 + wave*2.0 + sweep*0.14;
        col += mix(vec3(1.0, 0.62, 0.22), uTint * 1.25, 0.35) * line * lit * 0.58 * uLattice;

        // Occasional "filled" cells shimmering like honey
        float fill = step(0.935, cellRnd) * (0.5 + 0.5*sin(uTime*1.3 + cellRnd*60.0));
        col += uTint * fill * (glow*0.4 + mouseGlow*0.45 + wave) * 0.38 * uLattice * smoothstep(0.0, 0.3, ed);

        // Vignette
        float v = smoothstep(1.38, 0.25, length(p * vec2(0.85, 1.1)));
        col *= mix(0.42, 1.0, v);

        // Subtle dithering
        col += (hash21(gl_FragCoord.xy + uTime) - 0.5) / 255.0;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
  bgMesh.frustumCulled = false;
  bgMesh.renderOrder = -10;
  scene.add(bgMesh);

  // =========================================================================
  // 2. ENVIRONMENT — procedural studio for reflections (PMREM)
  // =========================================================================
  (function buildEnvironment() {
    const env = new THREE.Scene();
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: `varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `varying vec3 vP; void main(){
        vec3 top = vec3(0.02,0.05,0.12); vec3 bot = vec3(0.14,0.06,0.01);
        vec3 c = mix(bot, top, smoothstep(-0.6, 0.8, vP.y));
        c += vec3(0.85,0.42,0.08) * pow(max(0.0, -vP.z), 6.0) * 0.65;
        gl_FragColor = vec4(c, 1.0);
      }`,
    });
    env.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), skyMat));
    const panel = (w, h, color, pos) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
      m.position.copy(pos);
      m.lookAt(0, 0, 0);
      env.add(m);
    };
    panel(5, 7, new THREE.Color(5.5, 4.6, 3.6), new THREE.Vector3(7, 3, 6));
    panel(1.4, 10, new THREE.Color(6, 2.6, 0.5), new THREE.Vector3(-8, 0, -3));
    panel(1.2, 10, new THREE.Color(2.6, 1.3, 0.3), new THREE.Vector3(8, 0, -5));
    panel(6, 6, new THREE.Color(1.2, 1.4, 1.9), new THREE.Vector3(0, 10, 2));
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(env, 0.03).texture;
    pmrem.dispose();
  })();

  const key = new THREE.DirectionalLight(0xffe2b8, 1.6);
  key.position.set(4, 5, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0xe58e26, 18, 12, 2);
  rim.position.set(-2.5, 1.5, -2.5);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0x1a2a50, 0.4));

  // =========================================================================
  // 3. THE JAR + EXPLODED ANATOMY COMPONENTS
  // =========================================================================
  const jarRoot = new THREE.Group();
  const jarFloat = new THREE.Group();
  const jar = new THREE.Group();
  jarRoot.add(jarFloat);
  jarFloat.add(jar);
  scene.add(jarRoot);

  const SEG = LOW ? 64 : 96;

  // Glass profile
  const glassProfile = [
    [0.0, -1.12], [0.70, -1.12], [0.83, -1.09], [0.90, -1.02], [0.925, -0.90],
    [0.93, -0.6], [0.93, 0.50], [0.92, 0.62], [0.88, 0.72], [0.80, 0.80],
    [0.72, 0.85], [0.68, 0.88], [0.68, 1.02], [0.71, 1.04], [0.71, 1.10], [0.66, 1.12],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const glassGeo = new THREE.LatheGeometry(glassProfile, SEG);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.04,
    transmission: 1,
    thickness: 0.45,
    ior: 1.52,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    envMapIntensity: 1.6,
    specularIntensity: 1,
    attenuationColor: new THREE.Color(0xfff0d8),
    attenuationDistance: 3,
    transparent: false,
  });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  jar.add(glass);

  // Honey core
  const honeyUniforms = {
    uTime: { value: 0 },
    uDeep: { value: new THREE.Color(0.20, 0.05, 0.0) },
    uBright: { value: new THREE.Color(1.0, 0.56, 0.12) },
    uSpeck: { value: 0 },
    uExplode: { value: 0 },
  };
  const honeyTargets = {
    deep: honeyUniforms.uDeep.value.clone(),
    bright: honeyUniforms.uBright.value.clone(),
    speck: 0,
  };

  const honeyProfile = [
    [0.0, -1.06], [0.68, -1.06], [0.80, -1.03], [0.865, -0.96], [0.885, -0.85],
    [0.89, -0.5], [0.89, 0.44], [0.88, 0.48], [0.0, 0.50],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const honeyMat = new THREE.ShaderMaterial({
    uniforms: honeyUniforms,
    vertexShader: /* glsl */ `
      uniform float uTime, uExplode;
      varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main(){
        vec3 pos = position;
        // Subtle crown wave on top surface when exploded
        if (pos.y > 0.42 && length(pos.xz) < 0.85) {
          float r = length(pos.xz);
          pos.y += sin(r * 14.0 - uTime * 3.2) * 0.035 * (1.0 - r) * (0.25 + 0.75 * uExplode);
        }
        vP = pos;
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        vV = -mv.xyz; vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform float uTime, uSpeck, uExplode;
      uniform vec3 uDeep, uBright;
      varying vec3 vN; varying vec3 vV; varying vec3 vP;
      ${NOISE}
      void main(){
        vec3 N = normalize(vN); vec3 V = normalize(vV);
        float ndv = clamp(dot(N, V), 0.0, 1.0);
        vec3 c = mix(uDeep, uBright, pow(ndv, 1.32));
        float n = vnoise(vP * 2.6 + vec3(0.0, uTime*0.14, uTime*0.05));
        float n2 = vnoise(vP * 7.0 - vec3(uTime*0.06));
        c *= 0.82 + 0.40 * n + 0.09 * n2;
        c += uBright * (0.35 + 0.25 * uExplode) * smoothstep(0.2, -1.1, vP.y) * pow(ndv, 2.8);
        float s = step(0.855, vnoise(vP * 34.0)) * uSpeck;
        c = mix(c, vec3(1.0, 0.82, 0.28), s * 0.75);
        float b = smoothstep(0.93, 0.98, vnoise(vP * 22.0 + vec3(0.0, uTime*0.05, 0.0)));
        c += vec3(1.0, 0.86, 0.62) * b * 0.38;
        vec3 L = normalize(vec3(0.5, 0.7, 0.6));
        float spec = pow(max(dot(reflect(-L, N), V), 0.0), 50.0);
        c += vec3(1.0, 0.92, 0.75) * spec * 0.65;
        c += vec3(1.0, 0.55, 0.12) * pow(1.0 - ndv, 3.0) * 0.48;
        gl_FragColor = vec4(c, 1.0);
      }
    `,
  });
  const honey = new THREE.Mesh(new THREE.LatheGeometry(honeyProfile, SEG), honeyMat);
  jar.add(honey);

  // Gold lid
  const lidMat = new THREE.MeshPhysicalMaterial({
    color: 0xd9a24a,
    metalness: 1,
    roughness: 0.24,
    clearcoat: 0.65,
    clearcoatRoughness: 0.18,
    envMapIntensity: 1.45,
  });
  const lid = new THREE.Group();
  const lidBody = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.3, SEG, 1, false), lidMat);
  lid.add(lidBody);
  const ringGeo = new THREE.TorusGeometry(0.75, 0.025, 12, SEG);
  const ringTop = new THREE.Mesh(ringGeo, lidMat);
  ringTop.rotation.x = Math.PI / 2;
  ringTop.position.y = 0.15;
  lid.add(ringTop);
  const ringBot = ringTop.clone();
  ringBot.position.y = -0.15;
  lid.add(ringBot);

  const ridgeGeo = new THREE.BoxGeometry(0.018, 0.22, 0.03);
  const ridges = new THREE.InstancedMesh(ridgeGeo, lidMat, LOW ? 48 : 90);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < ridges.count; i++) {
    const a = (i / ridges.count) * Math.PI * 2;
    dummy.position.set(Math.sin(a) * 0.758, 0, Math.cos(a) * 0.758);
    dummy.rotation.set(0, a, 0);
    dummy.updateMatrix();
    ridges.setMatrixAt(i, dummy.matrix);
  }
  lid.add(ridges);

  const emblemGroup = new THREE.Group();
  const emblem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.03, 6),
    new THREE.MeshPhysicalMaterial({ color: 0x1a2440, metalness: 0.6, roughness: 0.35, envMapIntensity: 1.2 })
  );
  emblem.position.y = 0.16;
  emblemGroup.add(emblem);
  const emblemRing = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.018, 6, 6), lidMat);
  emblemRing.rotation.x = Math.PI / 2;
  emblemRing.rotation.z = Math.PI / 6;
  emblemRing.position.y = 0.175;
  emblemGroup.add(emblemRing);
  lid.add(emblemGroup);
  lid.position.y = 1.2;
  jar.add(lid);

  // NEW: Tamper-evident golden honeycomb security seal (revealed in Exploded View)
  const sealGroup = new THREE.Group();
  const sealMat = new THREE.MeshPhysicalMaterial({
    color: 0xf5c26b,
    metalness: 0.92,
    roughness: 0.22,
    clearcoat: 0.5,
    envMapIntensity: 1.5,
  });
  const sealDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.67, 0.67, 0.018, 48), sealMat);
  sealGroup.add(sealDisc);
  const sealRing = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.016, 8, 48), lidMat);
  sealRing.rotation.x = Math.PI / 2;
  sealGroup.add(sealRing);
  const sealHex = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.012, 6, 6), lidMat);
  sealHex.rotation.x = Math.PI / 2;
  sealGroup.add(sealHex);
  sealGroup.position.y = 1.08;
  sealGroup.scale.setScalar(0.01);
  jar.add(sealGroup);

  // NEW: 3D Sculpted Honey Dipper + Molten Golden Nectar Ribbon (descends in Exploded View)
  const dipperGroup = new THREE.Group();
  const woodMat = new THREE.MeshPhysicalMaterial({
    color: 0x8c5322,
    roughness: 0.42,
    metalness: 0.08,
    clearcoat: 0.45,
  });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.038, 1.25, 20), woodMat);
  stem.position.y = 0.65;
  dipperGroup.add(stem);
  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.068, 20, 16), woodMat);
  finial.position.y = 1.28;
  dipperGroup.add(finial);
  [-0.14, -0.06, 0.02, 0.10, 0.18].forEach((yy, idx) => {
    const r = 0.14 - Math.abs(idx - 2) * 0.024;
    const disk = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.042, 28), woodMat);
    disk.position.y = yy;
    dipperGroup.add(disk);
  });
  // Molten honey stream from dipper into jar
  const streamGeo = new THREE.CylinderGeometry(0.045, 0.018, 1.35, 24, 24, false);
  const streamMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: honeyUniforms.uTime,
      uBright: honeyUniforms.uBright,
      uDeep: honeyUniforms.uDeep,
    },
    transparent: true,
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main(){
        vUv = uv;
        vec3 p = position;
        float wave = sin(p.y * 9.0 - uTime * 5.0) * 0.018 * (1.0 - uv.y);
        p.x += wave;
        p.z += cos(p.y * 7.0 - uTime * 4.2) * 0.015;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vV = -mv.xyz; vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uBright, uDeep;
      varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main(){
        float ndv = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);
        float flow = 0.75 + 0.25 * sin(vUv.y * 22.0 - uTime * 6.5);
        vec3 c = mix(uDeep, uBright * 1.25, pow(ndv, 0.9)) * flow;
        c += vec3(1.0, 0.9, 0.65) * pow(1.0 - ndv, 2.5) * 0.55;
        gl_FragColor = vec4(c, 0.92);
      }
    `,
  });
  const streamMesh = new THREE.Mesh(streamGeo, streamMat);
  streamMesh.position.y = -0.68;
  dipperGroup.add(streamMesh);
  dipperGroup.position.set(0.32, 2.45, 0.12);
  dipperGroup.rotation.z = -0.32;
  dipperGroup.scale.setScalar(0.001);
  jar.add(dipperGroup);

  // NEW: Orbiting 3D Liquid Gold Droplets around the jar
  const DROP_COUNT = LOW ? 10 : 18;
  const dropGeo = new THREE.SphereGeometry(0.055, 16, 16);
  const dropsMesh = new THREE.InstancedMesh(dropGeo, honeyMat, DROP_COUNT);
  const dropMeta = Array.from({ length: DROP_COUNT }, (_, i) => ({
    angle: (i / DROP_COUNT) * Math.PI * 2,
    radius: 1.28 + (i % 3) * 0.22,
    y: -0.85 + (i / DROP_COUNT) * 1.9,
    speed: 0.35 + (i % 4) * 0.08,
    scale: 0.55 + (i % 5) * 0.16,
  }));
  jar.add(dropsMesh);

  // Wrap-around luxury label (CanvasTexture)
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 2048;
  labelCanvas.height = 512;
  const labelTex = new THREE.CanvasTexture(labelCanvas);
  labelTex.colorSpace = THREE.SRGBColorSpace;
  labelTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const VARIANTS = {
    sidr: {
      name: 'MIEL DE SIDR ROYAL', sub: 'Jujubier Sauvage · Tafilalet', lot: 'LOT-INOBEE-SIDR03',
      deep: [0.12, 0.022, 0.0], bright: [1.0, 0.40, 0.05], tint: [0.92, 0.44, 0.08], speck: 0,
    },
    daghmous: {
      name: "MIEL D'EUPHORBE SAUVAGE", sub: 'Daghmous · Anti-Atlas', lot: 'LOT-INOBEE-DAGH01',
      deep: [0.05, 0.01, 0.0], bright: [0.72, 0.22, 0.02], tint: [0.78, 0.30, 0.05], speck: 0,
    },
    thym: {
      name: 'MIEL DE THYM PUR', sub: 'Zâatar · Moyen Atlas', lot: 'LOT-INOBEE-THYM02',
      deep: [0.22, 0.07, 0.0], bright: [1.0, 0.66, 0.18], tint: [0.95, 0.58, 0.14], speck: 0,
    },
    elixir: {
      name: 'ROYAL ELIXIR', sub: 'Propolis · Gelée Royale · Pollen', lot: 'LOT-INOBEE-ROYL04',
      deep: [0.18, 0.06, 0.0], bright: [1.0, 0.58, 0.14], tint: [0.96, 0.52, 0.12], speck: 1,
    },
  };
  const tintTarget = new THREE.Color(0.92, 0.44, 0.08);

  function drawLabel(v) {
    const c = labelCanvas.getContext('2d');
    const W = labelCanvas.width, H = labelCanvas.height;
    const g = c.createLinearGradient(0, 0, W, 0);
    g.addColorStop(0, '#04070d');
    g.addColorStop(0.5, '#0a1a33');
    g.addColorStop(1, '#04070d');
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);
    const gold = c.createLinearGradient(0, 0, W, H);
    gold.addColorStop(0, '#8a5200');
    gold.addColorStop(0.3, '#f5c26b');
    gold.addColorStop(0.5, '#fff0c8');
    gold.addColorStop(0.7, '#e58e26');
    gold.addColorStop(1, '#8a5200');
    c.strokeStyle = gold;
    c.lineWidth = 6;
    c.strokeRect(14, 14, W - 28, H - 28);
    c.lineWidth = 2;
    c.strokeRect(30, 30, W - 60, H - 60);
    c.globalAlpha = 0.07;
    c.strokeStyle = '#f5c26b';
    c.lineWidth = 1.5;
    const s = 22;
    for (let y = 0; y < H + s; y += s * 1.5) {
      for (let x = 0; x < W + s; x += s * Math.sqrt(3)) {
        const ox = ((y / (s * 1.5)) % 2) * (s * Math.sqrt(3)) / 2;
        hexPath(c, x + ox, y, s * 0.95);
        c.stroke();
      }
    }
    c.globalAlpha = 1;
    const cx = W / 2;
    c.strokeStyle = gold;
    c.lineWidth = 4;
    hexPath(c, cx, 118, 44);
    c.stroke();
    c.fillStyle = gold;
    c.font = '600 46px Cinzel, Georgia, serif';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('I', cx, 121);
    c.font = '700 96px Cinzel, Georgia, serif';
    c.fillText('I N O B E E', cx, 236);
    c.font = '500 30px "Plus Jakarta Sans", Arial, sans-serif';
    c.fillStyle = '#f5c26b';
    c.fillText('— ' + v.name + ' —', cx, 312);
    c.font = 'italic 400 30px "Playfair Display", Georgia, serif';
    c.fillStyle = 'rgba(244,233,216,0.75)';
    c.fillText(v.sub, cx, 362);
    c.font = '500 22px monospace';
    c.fillStyle = 'rgba(245,194,107,0.8)';
    c.fillText(v.lot + '  ·  CERTIFIÉ ONSSA  ·  HMF < 10 mg/kg', cx, 430);
    [cx - 560, cx + 560].forEach((qx) => {
      c.fillStyle = '#f5c26b';
      let seed = 7;
      for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) {
        seed = (seed * 9301 + 49297) % 233280;
        if (seed / 233280 > 0.5 || (i < 2 && j < 2) || (i > 6 && j < 2) || (i < 2 && j > 6)) {
          c.fillRect(qx - 63 + i * 14, 190 + j * 14, 12, 12);
        }
      }
      c.font = '500 18px monospace';
      c.fillText('SCAN · TRACE', qx, 345);
    });
    labelTex.needsUpdate = true;
  }
  function hexPath(c, x, y, r) {
    c.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      const px = x + r * Math.cos(a), py = y + r * Math.sin(a);
      i ? c.lineTo(px, py) : c.moveTo(px, py);
    }
    c.closePath();
  }

  const labelArc = Math.PI * 1.15;
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    roughness: 0.42,
    metalness: 0.35,
    emissive: new THREE.Color(0xffffff),
    emissiveMap: labelTex,
    emissiveIntensity: 0.16,
    envMapIntensity: 1.1,
    side: THREE.DoubleSide,
  });
  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.936, 0.936, 0.78, SEG, 1, true, -labelArc / 2, labelArc),
    labelMat
  );
  label.position.y = -0.22;
  jar.add(label);

  // Fresnel aura
  const auraMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    uniforms: { uIntensity: { value: 1 }, uTime: { value: 0 } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vV = -mv.xyz; vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform float uIntensity, uTime; varying vec3 vN; varying vec3 vV;
      void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.2);
        vec3 c = mix(vec3(1.0,0.45,0.05), vec3(1.0,0.85,0.5), f);
        gl_FragColor = vec4(c, f * 0.55 * uIntensity * (0.85 + 0.15*sin(uTime*1.5))); }`,
  });
  const aura = new THREE.Mesh(glassGeo, auraMat);
  aura.scale.setScalar(1.09);
  aura.position.y = 0.02;
  jar.add(aura);

  // Light pool beneath the jar
  const poolCanvas = document.createElement('canvas');
  poolCanvas.width = poolCanvas.height = 256;
  (function () {
    const c = poolCanvas.getContext('2d');
    const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(255,190,100,0.9)');
    g.addColorStop(0.35, 'rgba(229,142,38,0.35)');
    g.addColorStop(1, 'rgba(229,142,38,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 256, 256);
  })();
  const pool = new THREE.Mesh(
    new THREE.PlaneGeometry(4.2, 4.2),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(poolCanvas), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.55 })
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = -1.55;
  jarFloat.add(pool);

  // 3D Anchor points for Exploded View HUD callouts
  const anchorLocal = [
    new THREE.Vector3(-0.72, 2.02, 0.15), // 0: Capsule Or & Scellé
    new THREE.Vector3(0.75, 1.48, 0.15),  // 1: Opercule Alvéolé & Extraction < 35°C
    new THREE.Vector3(-0.92, 0.22, 0.25), // 2: Cœur de Nectar Cru (HMF < 10)
    new THREE.Vector3(0.88, -0.52, 0.35), // 3: Étiquette QR Géo-Traçable ONSSA
  ];

  // =========================================================================
  // 4. FLOATING HONEYCOMB CELLS (instanced)
  // =========================================================================
  const hexShape = new THREE.Shape();
  const hexHole = new THREE.Path();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    const fn = i ? 'lineTo' : 'moveTo';
    hexShape[fn](Math.cos(a) * 0.24, Math.sin(a) * 0.24);
    hexHole[fn](Math.cos(a) * 0.19, Math.sin(a) * 0.19);
  }
  hexShape.holes.push(hexHole);
  const cellGeo = new THREE.ExtrudeGeometry(hexShape, { depth: 0.16, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 1 });
  cellGeo.center();
  const cellMat = new THREE.MeshPhysicalMaterial({ color: 0xe5a040, metalness: 0.95, roughness: 0.3, envMapIntensity: 1.3 });
  const CELLS = LOW ? 14 : 26;
  const cells = new THREE.InstancedMesh(cellGeo, cellMat, CELLS);
  const fillGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.12, 6);
  fillGeo.rotateX(Math.PI / 2);
  fillGeo.rotateZ(Math.PI / 6);
  const fills = new THREE.InstancedMesh(fillGeo, honeyMat, CELLS);
  const cellData = [];
  for (let i = 0; i < CELLS; i++) {
    const r = 2.0 + Math.random() * 2.6;
    const a = Math.random() * Math.PI * 2;
    cellData.push({
      base: new THREE.Vector3(Math.cos(a) * r, (Math.random() - 0.5) * 4.2, Math.sin(a) * r * 0.7 - 0.8),
      rot: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
      spin: new THREE.Vector3((Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.3),
      scale: 0.45 + Math.random() * 0.75,
      phase: Math.random() * Math.PI * 2,
      filled: Math.random() > 0.45 ? 1 : 0,
    });
  }
  const combGroup = new THREE.Group();
  combGroup.add(cells, fills);
  jarRoot.add(combGroup);

  // =========================================================================
  // 5. GOLDEN POLLEN PARTICLES with DOF bokeh
  // =========================================================================
  const PCOUNT = LOW ? 650 : 1650;
  const pPos = new Float32Array(PCOUNT * 3);
  const pScale = new Float32Array(PCOUNT);
  const pPhase = new Float32Array(PCOUNT);
  const pHue = new Float32Array(PCOUNT);
  for (let i = 0; i < PCOUNT; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 22;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    pPos[i * 3 + 2] = -12 + Math.random() * 18;
    pScale[i] = Math.pow(Math.random(), 2.2) * 0.9 + 0.1;
    pPhase[i] = Math.random() * Math.PI * 2;
    pHue[i] = Math.random();
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('aScale', new THREE.BufferAttribute(pScale, 1));
  pGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1));
  pGeo.setAttribute('aHue', new THREE.BufferAttribute(pHue, 1));
  const pUniforms = {
    uTime: { value: 0 },
    uPR: { value: renderer.getPixelRatio() },
    uMouse: { value: new THREE.Vector2(9, 9) },
    uAspect: { value: window.innerWidth / window.innerHeight },
    uFocus: { value: 8.6 },
    uAperture: { value: 0.22 },
    uScroll: { value: 0 },
    uSizeK: { value: window.innerHeight / 900 },
  };
  const pMat = new THREE.ShaderMaterial({
    uniforms: pUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float uTime, uPR, uAspect, uFocus, uAperture, uScroll, uSizeK;
      uniform vec2 uMouse;
      attribute float aScale, aPhase, aHue;
      varying float vBlur; varying float vAlpha; varying float vHue;
      void main(){
        vec3 p = position;
        float sp = 0.25 + aScale * 0.6;
        p.y = mod(p.y + 7.0 + uTime * 0.12 * sp + uScroll * (1.5 + aScale * 2.5), 14.0) - 7.0;
        p.x += sin(uTime * 0.35 * sp + aPhase) * 0.45;
        p.z += cos(uTime * 0.27 + aPhase * 1.7) * 0.35;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vec4 clip = projectionMatrix * mv;
        vec2 ndc = clip.xy / clip.w;
        vec2 d = ndc - uMouse; d.x *= uAspect;
        float dist = length(d);
        float force = smoothstep(0.45, 0.0, dist);
        mv.xy += normalize(d + 1e-4) * force * 0.09 * (-mv.z);
        gl_Position = projectionMatrix * mv;
        float depth = -mv.z;
        float coc = clamp(abs(depth - uFocus) * uAperture, 0.0, 1.0);
        vBlur = coc;
        float size = (6.0 + aScale * 34.0) * (1.0 + coc * 2.6) * uSizeK;
        gl_PointSize = min(size * uPR * (10.0 / depth), 140.0 * uPR);
        float tw = 0.65 + 0.35 * sin(uTime * (1.2 + aScale * 2.0) + aPhase * 5.0);
        vAlpha = tw * mix(1.0, 0.22, coc) * smoothstep(0.4, 2.0, depth) * (1.0 + force * 1.5);
        vHue = aHue;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vBlur; varying float vAlpha; varying float vHue;
      void main(){
        float r = length(gl_PointCoord - 0.5) * 2.0;
        if (r > 1.0) discard;
        float sharp = exp(-r * r * 9.0) * 0.9 + exp(-r * r * 60.0);
        float disk = smoothstep(1.0, 0.82, r);
        float ring = smoothstep(0.55, 0.95, r) * disk;
        float bokeh = disk * 0.38 + ring * 0.32;
        float a = mix(sharp, bokeh, smoothstep(0.08, 0.6, vBlur));
        vec3 warm = mix(vec3(1.0, 0.82, 0.52), vec3(0.95, 0.52, 0.12), vHue);
        vec3 col = mix(warm, vec3(1.0, 0.93, 0.8), (1.0 - vBlur) * exp(-r*r*30.0));
        gl_FragColor = vec4(col, a * vAlpha * 0.85);
      }
    `,
  });
  const particles = new THREE.Points(pGeo, pMat);
  particles.frustumCulled = false;
  scene.add(particles);

  // =========================================================================
  // 6. INTERACTION & CHOREOGRAPHY STATE
  // =========================================================================
  const mouse = {
    x: 0, y: 0, tx: 0, ty: 0,
    ndcX: 9, ndcY: 9,
    t1x: 0.5, t1y: 0.5,
    t2x: 0.5, t2y: 0.5,
    active: false,
  };
  const state = {
    intro: 0,
    scroll: 0,
    scrollTarget: 0,
    rotY: -0.35,
    velY: 0,
    dragging: false,
    pulse: 1,
    exploded: 0,
    explodedTarget: 0,
    dripProgress: 0,
    isDripping: false,
    jarBase: new THREE.Vector3(2, -0.1, 0),
    jarScale: 1,
  };

  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.active = true;
  }, { passive: true });
  document.addEventListener('pointerleave', () => { mouse.active = false; });

  // Drag to spin the jar
  const dragZone = document.querySelector('.hero-drag-zone');
  if (dragZone) {
    let lastX = 0;
    dragZone.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a')) return;
      state.dragging = true;
      lastX = e.clientX;
      dragZone.setPointerCapture && dragZone.setPointerCapture(e.pointerId);
    });
    dragZone.addEventListener('pointermove', (e) => {
      if (!state.dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      state.velY = dx * 0.006;
      state.rotY += dx * 0.008;
    });
    const end = () => { state.dragging = false; };
    dragZone.addEventListener('pointerup', end);
    dragZone.addEventListener('pointercancel', end);
  }

  window.addEventListener('scroll', () => {
    state.scrollTarget = window.scrollY / window.innerHeight;
  }, { passive: true });

  function layout() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    bgUniforms.uRes.value.set(w, h);
    pUniforms.uAspect.value = w / h;
    pUniforms.uPR.value = renderer.getPixelRatio();
    pUniforms.uSizeK.value = Math.max(0.6, h / 900);

    const visH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const visW = visH * camera.aspect;
    if (camera.aspect > 1.15) {
      state.jarBase.set(visW * 0.2, -0.15, 0);
      state.jarScale = Math.min(1.05, visH / 5.4);
    } else {
      state.jarBase.set(0, visH * 0.19, 0);
      state.jarScale = Math.min(0.76, visW / 4.6);
    }
  }
  layout();
  window.addEventListener('resize', layout);

  // ---------- Public API ----------
  api.setVariant = function (key) {
    const v = VARIANTS[key];
    if (!v) return;
    api.variant = key;
    honeyTargets.deep.setRGB(...v.deep);
    honeyTargets.bright.setRGB(...v.bright);
    honeyTargets.speck = v.speck;
    tintTarget.setRGB(...v.tint);
    drawLabel(v);
    state.velY += 0.11;
  };
  api.pulse = function () {
    state.pulse = 0;
    state.velY += 0.08;
  };
  api.setExploded = function (flag) {
    api.exploded = !!flag;
    state.explodedTarget = api.exploded ? 1 : 0;
    state.pulse = 0;
    document.body.classList.toggle('is-exploded-3d', api.exploded);
    return api.exploded;
  };
  api.toggleExploded = function () {
    return api.setExploded(!api.exploded);
  };
  api.tasteDrip = function () {
    if (state.isDripping) return;
    state.isDripping = true;
    state.pulse = 0;
    state.velY += 0.18;
    if (window.gsap) {
      const tl = window.gsap.timeline({
        onComplete: () => {
          state.isDripping = false;
          state.dripProgress = 0;
        },
      });
      tl.to(state, { dripProgress: 1, duration: 1.1, ease: 'power2.out' })
        .to(state, { dripProgress: 0.72, duration: 1.4, ease: 'sine.inOut' })
        .to(state, { dripProgress: 0, duration: 1.1, ease: 'power2.in' });
    } else {
      let f = 0;
      const step = () => {
        f += 0.035;
        state.dripProgress = Math.sin(f * Math.PI);
        if (f < 1) requestAnimationFrame(step);
        else { state.dripProgress = 0; state.isDripping = false; }
      };
      step();
    }
    return true;
  };
  api.intro = function () {
    if (window.gsap) {
      window.gsap.to(state, { intro: 1, duration: reduceMotion ? 0.01 : 2.4, ease: 'expo.out' });
    } else state.intro = 1;
  };

  drawLabel(VARIANTS.sidr);
  honeyTargets.deep.setRGB(...VARIANTS.sidr.deep);
  honeyTargets.bright.setRGB(...VARIANTS.sidr.bright);
  honeyUniforms.uDeep.value.copy(honeyTargets.deep);
  honeyUniforms.uBright.value.copy(honeyTargets.bright);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => drawLabel(VARIANTS[api.variant]));
  }

  // =========================================================================
  // 7. RENDER LOOP
  // =========================================================================
  const clock = new THREE.Clock();
  let frames = 0, fpsTime = 0, degraded = false;
  const tmpQ = new THREE.Quaternion();
  const tmpE = new THREE.Euler();
  const tmpV = new THREE.Vector3();
  const tmpS = new THREE.Vector3();

  function updateHudPins() {
    const pins = document.querySelectorAll('[data-hud-pin]');
    if (!pins.length) return;
    const show = state.exploded > 0.25 && state.scroll < 0.75;
    const w = window.innerWidth, h = window.innerHeight;
    pins.forEach((pin) => {
      const idx = +pin.dataset.hudPin;
      if (!show || !anchorLocal[idx]) {
        pin.style.opacity = '0';
        pin.style.pointerEvents = 'none';
        return;
      }
      tmpV.copy(anchorLocal[idx]);
      jarFloat.localToWorld(tmpV);
      tmpV.project(camera);
      const sx = (tmpV.x * 0.5 + 0.5) * w;
      const sy = (-tmpV.y * 0.5 + 0.5) * h;
      pin.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0)`;
      pin.style.opacity = String(Math.min(1, (state.exploded - 0.25) * 1.6));
      pin.style.pointerEvents = 'auto';
    });
  }

  function tick() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    if (!degraded) {
      frames++;
      fpsTime += dt;
      if (fpsTime > 2.5) {
        const fps = frames / fpsTime;
        if (fps < 42) {
          degraded = true;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
          pGeo.setDrawRange(0, Math.floor(PCOUNT * 0.55));
          layout();
        } else { frames = 0; fpsTime = 0; if (t > 10) degraded = true; }
      }
    }

    // Smooth inputs & trail
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    const mTargetX = mouse.active ? mouse.tx : 9;
    const mTargetY = mouse.active ? mouse.ty : 9;
    mouse.ndcX += (mTargetX - mouse.ndcX) * (Math.abs(mTargetX - mouse.ndcX) > 4 ? 1 : 0.14);
    mouse.ndcY += (mTargetY - mouse.ndcY) * (Math.abs(mTargetY - mouse.ndcY) > 4 ? 1 : 0.14);

    const curU = mouse.active ? mouse.tx * 0.5 + 0.5 : 0.5;
    const curV = mouse.active ? mouse.ty * 0.5 + 0.5 : 0.5;
    mouse.t1x += (curU - mouse.t1x) * 0.08;
    mouse.t1y += (curV - mouse.t1y) * 0.08;
    mouse.t2x += (mouse.t1x - mouse.t2x) * 0.06;
    mouse.t2y += (mouse.t1y - mouse.t2y) * 0.06;

    state.scroll += (state.scrollTarget - state.scroll) * 0.08;
    state.pulse = Math.min(1, state.pulse + dt * 0.45);
    state.exploded += (state.explodedTarget - state.exploded) * 0.075;

    // Camera parallax
    camera.position.x = mouse.x * 0.42;
    camera.position.y = mouse.y * 0.28 - Math.min(state.scroll, 1.5) * 0.18;
    camera.lookAt(0, -Math.min(state.scroll, 1.5) * 0.18, 0);

    // Multi-act Scroll Choreography for the 3D Jar
    const s = state.scroll;
    const intro = state.intro;
    const ex = state.exploded;
    const isWide = camera.aspect > 1.15;

    if (s <= 1.1) {
      // Act I: Hero stage (with subtle lift on initial scroll)
      const heroProgress = THREE.MathUtils.clamp(s, 0, 1.1);
      jarRoot.position.set(
        state.jarBase.x + heroProgress * (isWide ? 0.35 : 0) - ex * (isWide ? 0.18 : 0),
        state.jarBase.y + heroProgress * 0.85 - (1 - intro) * 3.5 - ex * 0.18,
        state.jarBase.z - heroProgress * 1.9
      );
      const sc = state.jarScale * (0.6 + 0.4 * intro) * (1 - heroProgress * 0.12) * (1 - ex * 0.06);
      jarRoot.scale.setScalar(sc);
    } else {
      // Act II+: Persistent ambient 3D companion drifting smoothly across chapters
      const deepProgress = s - 1.1;
      const driftX = isWide ? Math.cos(s * 1.15) * (state.jarBase.x * 1.05) : Math.sin(s * 0.9) * 0.55;
      const driftY = Math.sin(s * 1.4) * 0.35;
      jarRoot.position.set(
        driftX,
        driftY,
        -2.55 - Math.min(1.1, deepProgress * 0.25)
      );
      jarRoot.scale.setScalar(state.jarScale * (isWide ? 0.72 : 0.56));
    }

    // Exploded view & Drip Tasting part animations
    const drip = state.dripProgress;
    lid.position.y = 1.2 + ex * 0.86 + drip * 0.78;
    lid.rotation.z = ex * 0.10 + drip * 0.08;
    lid.rotation.x = ex * -0.08 - drip * 0.05;
    emblemGroup.position.y = ex * 0.22 + drip * 0.15;

    sealGroup.position.y = 1.08 + ex * 0.42 + drip * 0.38;
    sealGroup.scale.setScalar(0.001 + Math.max(ex, drip * 0.85) * 0.999);
    sealGroup.rotation.y = t * 0.45;
    sealGroup.rotation.x = ex * 0.14 + drip * 0.1;

    const dipperScale = Math.max(ex * 0.85, drip * 0.95);
    dipperGroup.scale.setScalar(0.001 + dipperScale);
    dipperGroup.position.y = 2.45 - ex * 0.42 - drip * 0.88 + Math.sin(t * 1.6) * 0.04;
    dipperGroup.rotation.y = Math.sin(t * 0.7) * 0.25 + drip * 0.75;
    dipperGroup.rotation.z = -0.32 + drip * 0.24;

    honey.position.y = ex * 0.10 + drip * 0.05;
    honeyUniforms.uExplode.value = Math.max(ex, drip * 0.75);
    label.scale.set(1 + (ex + drip * 0.3) * 0.045, 1, 1 + (ex + drip * 0.3) * 0.045);
    labelMat.emissiveIntensity = 0.16 + ex * 0.22 + drip * 0.18;

    // Orbiting liquid gold droplets
    for (let i = 0; i < DROP_COUNT; i++) {
      const dm = dropMeta[i];
      const a = dm.angle + t * dm.speed;
      const rad = dm.radius * (1 + ex * 0.28 + (1 - state.pulse) * 0.35);
      const yy = dm.y + Math.sin(t * 1.2 + i) * 0.16;
      tmpV.set(Math.cos(a) * rad, yy, Math.sin(a) * rad);
      tmpE.set(t * 0.5, a, 0);
      tmpQ.setFromEuler(tmpE);
      const k = dm.scale * intro * (0.75 + ex * 0.45);
      tmpS.set(k * 0.85, k * 1.25, k * 0.85);
      dummy.matrix.compose(tmpV, tmpQ, tmpS);
      dropsMesh.setMatrixAt(i, dummy.matrix);
    }
    dropsMesh.instanceMatrix.needsUpdate = true;

    if (!state.dragging) {
      state.velY *= 0.95;
      state.rotY += state.velY + dt * (reduceMotion ? 0 : 0.22);
    }
    jar.rotation.y = state.rotY + (1 - intro) * -2.5 + s * 0.65;
    jarFloat.rotation.x = -mouse.y * 0.12 + 0.06;
    jarFloat.rotation.z = -mouse.x * 0.06;
    jarFloat.position.y = Math.sin(t * 0.9) * 0.08;
    rim.position.x = -2.5 + mouse.x * 1.5;

    // Honey & backdrop tint easing
    honeyUniforms.uDeep.value.lerp(honeyTargets.deep, 0.06);
    honeyUniforms.uBright.value.lerp(honeyTargets.bright, 0.06);
    honeyUniforms.uSpeck.value += (honeyTargets.speck - honeyUniforms.uSpeck.value) * 0.06;
    honeyUniforms.uTime.value = t;
    bgUniforms.uTint.value.lerp(tintTarget, 0.05);
    auraMat.uniforms.uTime.value = t;
    auraMat.uniforms.uIntensity.value = 0.9 + (1 - state.pulse) * 1.5 + ex * 0.45;

    // Floating comb cells
    for (let i = 0; i < CELLS; i++) {
      const d = cellData[i];
      tmpV.copy(d.base);
      tmpV.y += Math.sin(t * 0.5 + d.phase) * 0.25;
      tmpV.x += Math.cos(t * 0.3 + d.phase) * 0.12;
      tmpE.set(d.rot.x + t * d.spin.x, d.rot.y + t * d.spin.y, d.rot.z + t * d.spin.z);
      tmpQ.setFromEuler(tmpE);
      const k = d.scale * (0.2 + 0.8 * intro);
      tmpS.set(k, k, k);
      dummy.matrix.compose(tmpV, tmpQ, tmpS);
      cells.setMatrixAt(i, dummy.matrix);
      tmpS.multiplyScalar(d.filled);
      dummy.matrix.compose(tmpV, tmpQ, tmpS);
      fills.setMatrixAt(i, dummy.matrix);
    }
    cells.instanceMatrix.needsUpdate = true;
    fills.instanceMatrix.needsUpdate = true;
    combGroup.rotation.y = t * 0.04;

    // Backdrop uniforms
    tmpV.copy(jarRoot.position).project(camera);
    bgUniforms.uGlow.value.set(tmpV.x * 0.5 + 0.5, tmpV.y * 0.5 + 0.5 + 0.03);
    bgUniforms.uMouse.value.set(mouse.ndcX * 0.5 + 0.5, mouse.ndcY * 0.5 + 0.5);
    bgUniforms.uTrail1.value.set(mouse.t1x, mouse.t1y);
    bgUniforms.uTrail2.value.set(mouse.t2x, mouse.t2y);
    bgUniforms.uParallax.value.set(mouse.x * 0.04, mouse.y * 0.04);
    bgUniforms.uTime.value = t;
    bgUniforms.uPulse.value = state.pulse;
    bgUniforms.uScroll.value = s;
    bgUniforms.uLattice.value = 1 - Math.min(0.42, s * 0.06);

    // Particles
    pUniforms.uTime.value = t;
    pUniforms.uMouse.value.set(mouse.ndcX, mouse.ndcY);
    pUniforms.uScroll.value = s;

    renderer.render(scene, camera);
    updateHudPins();
    requestAnimationFrame(tick);
  }

  api.ready = true;
  requestAnimationFrame(tick);
})();

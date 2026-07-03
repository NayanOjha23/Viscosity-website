/* ============================================================
   VISCOSITY GLOBAL — main.js
   One particle system, four states, driven by scroll:

     0  LAMINAR FLOW   — streamlines (viscosity itself)
     1  STRATA         — five refinement bands, Group I–V
     2  GLOBE          — trade routes between ports
     3  HEX LATTICE    — the molecular grid of the logo mark

   Three.js renders, GSAP ScrollTrigger conducts.
   ============================================================ */

import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------
   SMOOTH SCROLL (Lenis ↔ ScrollTrigger)
   ------------------------------------------------------------ */
const lenis = new Lenis({
  lerp: 0.065,          // heavier damping — fast flicks settle like fluid
  smoothWheel: true,
  wheelMultiplier: 0.9,
});
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

/* ------------------------------------------------------------
   RENDERER / SCENE / CAMERA
   ------------------------------------------------------------ */
const canvas = document.getElementById("gl");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  alpha: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  120
);
camera.position.set(0, 0, 16);
scene.add(camera);

/* ------------------------------------------------------------
   PARTICLE TARGET GEOMETRIES
   ------------------------------------------------------------ */
const COUNT = window.innerWidth < 768 ? 14000 : 34000;

const pos0 = new Float32Array(COUNT * 3); // streamlines
const pos1 = new Float32Array(COUNT * 3); // five strata
const pos2 = new Float32Array(COUNT * 3); // globe + arcs
const pos3 = new Float32Array(COUNT * 3); // hex lattice
const rand = new Float32Array(COUNT * 3); // per-particle seeds

/* --- STATE 0 · LAMINAR STREAMLINES ------------------------- */
{
  const LINES = 42;
  for (let i = 0; i < COUNT; i++) {
    const line = i % LINES;
    const ln = line / (LINES - 1); // 0..1
    const x = (Math.random() - 0.5) * 36;
    const y = (ln - 0.5) * 11 + (Math.random() - 0.5) * 0.12;
    // bundle the lines in depth like a sheet of flow seen edge-on
    const z = (Math.sin(ln * Math.PI * 2.0) * 2.0) + (Math.random() - 0.5) * 1.4 - 2.0;
    pos0[i * 3] = x;
    pos0[i * 3 + 1] = y;
    pos0[i * 3 + 2] = z;
  }
}

/* --- STATE 1 · FIVE STRATA (GROUP I–V) ---------------------- */
{
  // Group I at top (most turbulent) … Group V at bottom (stillest)
  const centers = [4.4, 2.2, 0, -2.2, -4.4];
  for (let i = 0; i < COUNT; i++) {
    const band = i % 5;
    pos1[i * 3] = (Math.random() - 0.5) * 30;
    pos1[i * 3 + 1] = centers[band] + (Math.random() - 0.5) * 0.85;
    pos1[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1.0;
  }
}

/* --- STATE 2 · GLOBE + TRADE ARCS --------------------------- */
{
  const R = 5.4;
  const latLon = (lat, lon) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -R * Math.sin(phi) * Math.cos(theta),
      R * Math.cos(phi),
      R * Math.sin(phi) * Math.sin(theta)
    );
  };
  // ports: Fujairah, Jebel Ali, Mumbai, Singapore, Ulsan, Rotterdam,
  // Antwerp, Houston, Santos, Durban, Mombasa, Yanbu
  const ports = [
    latLon(25.1, 56.3), latLon(25.0, 55.1), latLon(18.9, 72.8),
    latLon(1.3, 103.8), latLon(35.5, 129.4), latLon(51.9, 4.5),
    latLon(51.2, 4.4), latLon(29.7, -95.0), latLon(-23.9, -46.3),
    latLon(-29.9, 31.0), latLon(-4.0, 39.6), latLon(24.1, 38.0),
  ];
  // arcs all radiate from / through the hub (Fujairah, index 0)
  const arcs = [];
  for (let p = 1; p < ports.length; p++) arcs.push([ports[0], ports[p]]);

  const arcShare = Math.floor(COUNT * 0.18);
  const sphereShare = COUNT - arcShare;

  // Fibonacci sphere
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < sphereShare; i++) {
    const t = i / (sphereShare - 1);
    const y = 1 - t * 2;
    const rr = Math.sqrt(Math.max(0, 1 - y * y));
    const th = GA * i;
    pos2[i * 3] = Math.cos(th) * rr * R;
    pos2[i * 3 + 1] = y * R;
    pos2[i * 3 + 2] = Math.sin(th) * rr * R;
  }
  // arcs lifted off the surface
  const a = new THREE.Vector3(), b = new THREE.Vector3(), v = new THREE.Vector3();
  for (let i = 0; i < arcShare; i++) {
    const idx = sphereShare + i;
    const arc = arcs[i % arcs.length];
    const t = Math.random();
    a.copy(arc[0]).normalize();
    b.copy(arc[1]).normalize();
    const omega = Math.acos(THREE.MathUtils.clamp(a.dot(b), -1, 1));
    const so = Math.sin(omega) || 1e-5;
    v.copy(a).multiplyScalar(Math.sin((1 - t) * omega) / so)
      .addScaledVector(b, Math.sin(t * omega) / so);
    const lift = R + Math.sin(t * Math.PI) * 1.5;
    pos2[idx * 3] = v.x * lift;
    pos2[idx * 3 + 1] = v.y * lift;
    pos2[idx * 3 + 2] = v.z * lift;
  }
}

/* --- STATE 3 · HEX LATTICE (the logo's geometry) ------------ */
{
  const r = 1.0;                 // hex cell radius
  const cols = 13, rows = 9;
  const edges = [];              // [x1,y1,x2,y2] per edge
  const w = Math.sqrt(3) * r;
  for (let q = 0; q < cols; q++) {
    for (let s = 0; s < rows; s++) {
      const cx = (q - (cols - 1) / 2) * w + (s % 2 ? w / 2 : 0);
      const cy = (s - (rows - 1) / 2) * r * 1.5;
      for (let e = 0; e < 6; e++) {
        const a0 = (Math.PI / 3) * e + Math.PI / 6;
        const a1 = (Math.PI / 3) * (e + 1) + Math.PI / 6;
        edges.push([
          cx + Math.cos(a0) * r, cy + Math.sin(a0) * r,
          cx + Math.cos(a1) * r, cy + Math.sin(a1) * r,
        ]);
      }
    }
  }
  // gentle tilt so the lattice reads as a surface, not wallpaper
  const rotX = -0.42, rotY = 0.0, rotZ = 0.06;
  const cX = Math.cos(rotX), sX = Math.sin(rotX);
  const cZ = Math.cos(rotZ), sZ = Math.sin(rotZ);
  for (let i = 0; i < COUNT; i++) {
    const edge = edges[i % edges.length];
    const t = Math.random();
    let x = edge[0] + (edge[2] - edge[0]) * t + (Math.random() - 0.5) * 0.02;
    let y = edge[1] + (edge[3] - edge[1]) * t + (Math.random() - 0.5) * 0.02;
    let z = (Math.random() - 0.5) * 0.05;
    // rotate Z then X
    let x2 = x * cZ - y * sZ, y2 = x * sZ + y * cZ;
    let y3 = y2 * cX - z * sX, z3 = y2 * sX + z * cX;
    pos3[i * 3] = x2 * 1.05;
    pos3[i * 3 + 1] = y3 * 1.05 + 0.4;
    pos3[i * 3 + 2] = z3 - 1.0;
  }
}

/* --- SEEDS --------------------------------------------------- */
for (let i = 0; i < COUNT * 3; i++) rand[i] = Math.random();

/* ------------------------------------------------------------
   SHADER MATERIAL
   ------------------------------------------------------------ */
const uniforms = {
  uTime: { value: 0 },
  uState: { value: 0 },
  uSize: { value: 7.5 },
  uPR: { value: Math.min(window.devicePixelRatio, 2) },
  uOpacity: { value: 0 },
  uColA: { value: new THREE.Color("#F0C75E") },   // bright gold
  uColB: { value: new THREE.Color("#C4943A") },   // deep burnished gold
};

const material = new THREE.ShaderMaterial({
  uniforms,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexShader: /* glsl */ `
    attribute vec3 aPos1;
    attribute vec3 aPos2;
    attribute vec3 aPos3;
    attribute vec3 aRand;

    uniform float uTime;
    uniform float uState;
    uniform float uSize;
    uniform float uPR;

    varying float vMix;
    varying float vFade;
    varying float vTr;

    float ease(float t) { return t * t * (3.0 - 2.0 * t); }

    void main() {
      float t01 = ease(clamp(uState, 0.0, 1.0));
      float t12 = ease(clamp(uState - 1.0, 0.0, 1.0));
      float t23 = ease(clamp(uState - 2.0, 0.0, 1.0));

      /* state 0 — laminar flow: waves travel along the lines.
         deeper lines (lower aRand.y) lag — that IS viscosity. */
      vec3 p0 = position;
      float visc = 0.35 + 0.65 * aRand.y;
      p0.y += sin(p0.x * 0.42 - uTime * (0.9 + visc) + aRand.x * 6.2831) * 0.34 * visc;
      p0.z += sin(p0.x * 0.30 - uTime * 0.7 + aRand.z * 6.2831) * 0.22;

      /* state 1 — strata: turbulence decays from Group I (top)
         to Group V (bottom). refinement = stillness. */
      vec3 p1 = aPos1;
      float refine = smoothstep(-5.0, 5.0, p1.y);   // 1 at top, 0 at bottom
      float amp = 0.04 + 0.30 * refine;
      p1.y += sin(p1.x * (0.8 + refine * 1.6) - uTime * (0.8 + refine * 2.2) + aRand.x * 6.2831) * amp;
      p1.z += sin(p1.x * 0.5 + uTime * 0.6 + aRand.z * 6.2831) * amp * 0.6;

      /* state 2 — globe: slow rotation */
      vec3 p2 = aPos2;
      float ga = uTime * 0.10;
      p2 = vec3(
        cos(ga) * p2.x + sin(ga) * p2.z,
        p2.y,
        -sin(ga) * p2.x + cos(ga) * p2.z
      );

      /* state 3 — lattice: near-still, the faintest breath */
      vec3 p3 = aPos3;
      p3.z += sin(uTime * 0.7 + (aPos3.x + aPos3.y) * 0.8) * 0.07;

      vec3 p = mix(mix(mix(p0, p1, t01), p2, t12), p3, t23);

      /* mid-transition scatter — particles loosen, then resettle.
         kept tight + faded (vTr) so the morph never fogs the text */
      float tr = t01 * (1.0 - t01) + t12 * (1.0 - t12) + t23 * (1.0 - t23);
      p += (aRand - 0.5) * tr * 2.2;
      vTr = tr;

      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;

      float twinkle = 0.75 + 0.25 * sin(uTime * 2.0 + aRand.x * 40.0);
      gl_PointSize = uSize * uPR * (0.35 + 0.85 * aRand.y) * twinkle * (10.0 / -mv.z);

      vFade = smoothstep(46.0, 10.0, -mv.z);
      vMix = aRand.z;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColA;
    uniform vec3 uColB;
    uniform float uOpacity;

    varying float vMix;
    varying float vFade;
    varying float vTr;

    void main() {
      float d = length(gl_PointCoord - 0.5);
      float a = smoothstep(0.5, 0.06, d) * 0.9;
      a *= 1.0 - vTr * 1.4; // thin out mid-morph instead of fogging
      // most particles steel-cool, a vein of amber running through
      vec3 col = mix(uColB, uColA, step(0.62, vMix) * (0.4 + 0.6 * vMix));
      gl_FragColor = vec4(col, a * vFade * uOpacity);
    }
  `,
});

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(pos0, 3));
geometry.setAttribute("aPos1", new THREE.BufferAttribute(pos1, 3));
geometry.setAttribute("aPos2", new THREE.BufferAttribute(pos2, 3));
geometry.setAttribute("aPos3", new THREE.BufferAttribute(pos3, 3));
geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 3));

const points = new THREE.Points(geometry, material);
scene.add(points);

/* faint amber core glow behind everything */
const glowGeo = new THREE.PlaneGeometry(60, 60);
const glowMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: { uGlow: { value: 0.14 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `
    uniform float uGlow; varying vec2 vUv;
    void main(){
      float d = distance(vUv, vec2(0.5, 0.42));
      float g = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(vec3(0.85, 0.68, 0.22) * g, g * uGlow);
    }`,
});
const glow = new THREE.Mesh(glowGeo, glowMat);
glow.position.z = -14;
scene.add(glow);

/* ------------------------------------------------------------
   POINTER PARALLAX
   ------------------------------------------------------------ */
const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener("pointermove", (e) => {
  pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
  pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* ------------------------------------------------------------
   RENDER LOOP
   ------------------------------------------------------------ */
const clock = new THREE.Clock();
function tick() {
  uniforms.uTime.value = clock.getElapsedTime();
  pointer.x += (pointer.tx - pointer.x) * 0.04;
  pointer.y += (pointer.ty - pointer.y) * 0.04;
  camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.05;
  camera.position.y += (-pointer.y * 0.45 - camera.position.y + camY) * 0.05;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
let camY = 0; // adjusted by scroll choreography
tick();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.uPR.value = Math.min(window.devicePixelRatio, 2);
});

/* ------------------------------------------------------------
   SCROLL CHOREOGRAPHY — the four-state morph
   ------------------------------------------------------------ */

/* Each segment is an explicit fromTo with immediateRender:false —
   otherwise every tween captures uState at page load (0) and the
   morph replays from scratch on entry (the "globe twice" bug). */
function morphSegment(trigger, from, to) {
  gsap.fromTo(
    uniforms.uState,
    { value: from },
    {
      value: to,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger,
        start: "top 95%",
        end: "top 15%",
        scrub: 1.4, // heavier scrub — fast scrolling stays liquid
      },
    }
  );
}
morphSegment("#spectrum", 0, 1); // flow   → strata
morphSegment("#network", 1, 2);  // strata → globe
morphSegment("#services", 2, 3); // globe  → hex lattice

/* camera drifts with the narrative — explicit from/to per segment */
const camState = { z: 16, y: 0 };
function camSegment(trigger, fromZ, toZ, fromY, toY) {
  gsap.fromTo(
    camState,
    { z: fromZ, y: fromY },
    {
      z: toZ,
      y: toY,
      ease: "none",
      immediateRender: false,
      onUpdate: () => {
        camera.position.z = camState.z;
        camY = camState.y;
      },
      scrollTrigger: { trigger, start: "top 95%", end: "top 15%", scrub: 1.4 },
    }
  );
}
camSegment("#spectrum", 16, 17.5, 0, 0);
camSegment("#network", 17.5, 14.5, 0, 0.6);
camSegment("#services", 14.5, 12.5, 0.6, 0.2);

/* constant field brightness — the glass panels own legibility,
   so the particles never dim on scroll */

/* ------------------------------------------------------------
   DOM ANIMATIONS
   ------------------------------------------------------------ */

/* nav background on scroll */
ScrollTrigger.create({
  start: 60,
  onUpdate: (self) =>
    document.getElementById("nav").classList.toggle("is-scrolled", self.scroll() > 60),
});

/* generic reveals */
gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 36 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    }
  );
});

/* thesis paragraph — masked rise */
gsap.utils.toArray(".reveal-lines").forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%" },
    }
  );
});

/* stat counters */
gsap.utils.toArray("[data-count]").forEach((el) => {
  const target = +el.dataset.count;
  ScrollTrigger.create({
    trigger: el,
    start: "top 88%",
    once: true,
    onEnter: () =>
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 1.8,
          ease: "power2.out",
          snap: { innerText: 1 },
        }
      ),
  });
});

/* footer wordmark rise */
ScrollTrigger.create({
  trigger: ".footer",
  start: "top 85%",
  once: true,
  onEnter: () => document.querySelector(".footer").classList.add("is-visible"),
});

/* contact title lines */
gsap.utils.toArray(".contact__title .line > span").forEach((el, i) => {
  gsap.fromTo(
    el,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: 1.2,
      delay: i * 0.08,
      ease: "power4.out",
      scrollTrigger: { trigger: "#contact", start: "top 70%" },
    }
  );
});

/* ------------------------------------------------------------
   PRELOADER → HERO ENTRANCE
   ------------------------------------------------------------ */
const pre = document.getElementById("preloader");
const fill = document.getElementById("preloader-fill");
const pct = document.getElementById("preloader-pct");

const load = { v: 0 };
gsap.to(load, {
  v: 100,
  duration: 1.6,
  ease: "power2.inOut",
  onUpdate: () => {
    fill.style.width = load.v + "%";
    // playful: the loader counts in centistokes
    pct.textContent = "CST " + (load.v * 0.46).toFixed(2);
  },
  onComplete: introduce,
});

function introduce() {
  const tl = gsap.timeline();
  tl.to(pre, { opacity: 0, duration: 0.7, ease: "power2.inOut" })
    .set(pre, { display: "none" })
    .to(uniforms.uOpacity, { value: 1.2, duration: 2.2, ease: "power2.out" }, "-=0.5")
    .fromTo(
      ".hero__title .line > span",
      { yPercent: 110 },
      { yPercent: 0, duration: 1.3, stagger: 0.1, ease: "power4.out" },
      "-=2.0"
    )
    .fromTo(
      ".hero__eyebrow",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=1.1"
    )
    .fromTo(
      ".hero__sub, .hero__scroll",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      "#nav, #ticker",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.8"
    );
}
gsap.set("#nav, #ticker", { opacity: 0 });
gsap.set(".hero__title .line > span", { yPercent: 110 });

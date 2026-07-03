import * as THREE from "three";
import { buildGeometryData } from "./geometries";

export interface SceneConfig {
  initialState?: number;
  colors?: [string, string, string];
  particleSize?: number;
  glowColor?: [number, number, number];
  glowIntensity?: number;
  cameraZ?: number;
}

export interface SceneRefs {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  uniforms: {
    uTime: { value: number };
    uState: { value: number };
    uSize: { value: number };
    uPR: { value: number };
    uOpacity: { value: number };
    uColA: { value: THREE.Color };
    uColB: { value: THREE.Color };
    uColC: { value: THREE.Color };
  };
  glowUniforms: { uGlow: { value: number } };
  dispose: () => void;
}

const VERTEX_SHADER = /* glsl */ `
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

    vec3 p0 = position;
    float visc = 0.35 + 0.65 * aRand.y;
    p0.y += sin(p0.x * 0.42 - uTime * (0.9 + visc) + aRand.x * 6.2831) * 0.34 * visc;
    p0.z += sin(p0.x * 0.30 - uTime * 0.7 + aRand.z * 6.2831) * 0.22;

    vec3 p1 = aPos1;
    float refine = smoothstep(-5.0, 5.0, p1.y);
    float amp = 0.04 + 0.30 * refine;
    p1.y += sin(p1.x * (0.8 + refine * 1.6) - uTime * (0.8 + refine * 2.2) + aRand.x * 6.2831) * amp;
    p1.z += sin(p1.x * 0.5 + uTime * 0.6 + aRand.z * 6.2831) * amp * 0.6;

    vec3 p2 = aPos2;
    float ga = uTime * 0.10;
    p2 = vec3(
      cos(ga) * p2.x + sin(ga) * p2.z,
      p2.y,
      -sin(ga) * p2.x + cos(ga) * p2.z
    );

    vec3 p3 = aPos3;
    p3.z += sin(uTime * 0.7 + (aPos3.x + aPos3.y) * 0.8) * 0.07;

    vec3 p = mix(mix(mix(p0, p1, t01), p2, t12), p3, t23);

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
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uColC;
  uniform float uOpacity;

  varying float vMix;
  varying float vFade;
  varying float vTr;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.06, d) * 0.9;
    a *= 1.0 - vTr * 1.4;
    // 3-stop ramp across the field: uColB → uColC → uColA
    float t = clamp(vMix, 0.0, 1.0);
    vec3 col = t < 0.5
      ? mix(uColB, uColC, smoothstep(0.0, 0.5, t))
      : mix(uColC, uColA, smoothstep(0.5, 1.0, t));
    gl_FragColor = vec4(col, a * vFade * uOpacity);
  }
`;

export function createScene(canvas: HTMLCanvasElement, config?: SceneConfig): SceneRefs {
  const COUNT = canvas.clientWidth < 768 ? 14000 : 34000;
  const { pos0, pos1, pos2, pos3, rand } = buildGeometryData(COUNT);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 120);
  camera.position.set(0, 0, config?.cameraZ ?? 16);
  scene.add(camera);

  const colors = config?.colors;
  const uniforms = {
    uTime: { value: 0 },
    uState: { value: config?.initialState ?? 0 },
    uSize: { value: config?.particleSize ?? 7.5 },
    uPR: { value: Math.min(window.devicePixelRatio, 2) },
    uOpacity: { value: 0 },
    uColA: { value: new THREE.Color(colors?.[0] ?? "#2BD4D4") },
    uColB: { value: new THREE.Color(colors?.[1] ?? "#3A7BFF") },
    uColC: { value: new THREE.Color(colors?.[2] ?? "#8E5CFF") },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(pos0, 3));
  geometry.setAttribute("aPos1", new THREE.BufferAttribute(pos1, 3));
  geometry.setAttribute("aPos2", new THREE.BufferAttribute(pos2, 3));
  geometry.setAttribute("aPos3", new THREE.BufferAttribute(pos3, 3));
  geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 3));

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const glowGeo = new THREE.PlaneGeometry(60, 60);
  const glowUniforms = { uGlow: { value: config?.glowIntensity ?? 0.1 } };
  const glowMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: glowUniforms,
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uGlow; varying vec2 vUv;
      void main(){
        float d = distance(vUv, vec2(0.5, 0.42));
        float g = smoothstep(0.5, 0.0, d);
        vec3 gc = vec3(${config?.glowColor ? config.glowColor.join(", ") : "0.56, 0.36, 1.0"});
        gl_FragColor = vec4(gc * g, g * uGlow);
      }`,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.z = -14;
  scene.add(glow);

  const dispose = () => {
    geometry.dispose();
    material.dispose();
    glowGeo.dispose();
    glowMat.dispose();
    renderer.dispose();
  };

  return { renderer, scene, camera, uniforms, glowUniforms, dispose };
}

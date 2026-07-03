import * as THREE from "three";

export interface GeometryData {
  pos0: Float32Array;
  pos1: Float32Array;
  pos2: Float32Array;
  pos3: Float32Array;
  rand: Float32Array;
}

export function buildGeometryData(COUNT: number): GeometryData {
  const pos0 = new Float32Array(COUNT * 3);
  const pos1 = new Float32Array(COUNT * 3);
  const pos2 = new Float32Array(COUNT * 3);
  const pos3 = new Float32Array(COUNT * 3);
  const rand = new Float32Array(COUNT * 3);

  // STATE 0 — LAMINAR STREAMLINES
  {
    const LINES = 42;
    for (let i = 0; i < COUNT; i++) {
      const line = i % LINES;
      const ln = line / (LINES - 1);
      const x = (Math.random() - 0.5) * 36;
      const y = (ln - 0.5) * 11 + (Math.random() - 0.5) * 0.12;
      const z = Math.sin(ln * Math.PI * 2.0) * 2.0 + (Math.random() - 0.5) * 1.4 - 2.0;
      pos0[i * 3] = x;
      pos0[i * 3 + 1] = y;
      pos0[i * 3 + 2] = z;
    }
  }

  // STATE 1 — FIVE STRATA (GROUP I–V)
  {
    const centers = [4.4, 2.2, 0, -2.2, -4.4];
    for (let i = 0; i < COUNT; i++) {
      const band = i % 5;
      pos1[i * 3] = (Math.random() - 0.5) * 30;
      pos1[i * 3 + 1] = centers[band] + (Math.random() - 0.5) * 0.85;
      pos1[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1.0;
    }
  }

  // STATE 2 — GLOBE + TRADE ARCS
  {
    const R = 5.4;
    const latLon = (lat: number, lon: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -R * Math.sin(phi) * Math.cos(theta),
        R * Math.cos(phi),
        R * Math.sin(phi) * Math.sin(theta)
      );
    };
    const ports = [
      latLon(25.1, 56.3), latLon(25.0, 55.1), latLon(18.9, 72.8),
      latLon(1.3, 103.8), latLon(35.5, 129.4), latLon(51.9, 4.5),
      latLon(51.2, 4.4), latLon(29.7, -95.0), latLon(-23.9, -46.3),
      latLon(-29.9, 31.0), latLon(-4.0, 39.6), latLon(24.1, 38.0),
    ];
    const arcs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let p = 1; p < ports.length; p++) arcs.push([ports[0], ports[p]]);

    const arcShare = Math.floor(COUNT * 0.18);
    const sphereShare = COUNT - arcShare;

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

  // STATE 3 — HEX LATTICE
  {
    const r = 1.0;
    const cols = 13, rows = 9;
    const edges: number[][] = [];
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
    const rotX = -0.42, rotZ = 0.06;
    const cX = Math.cos(rotX), sX = Math.sin(rotX);
    const cZ = Math.cos(rotZ), sZ = Math.sin(rotZ);
    for (let i = 0; i < COUNT; i++) {
      const edge = edges[i % edges.length];
      const t = Math.random();
      const x = edge[0] + (edge[2] - edge[0]) * t + (Math.random() - 0.5) * 0.02;
      const y = edge[1] + (edge[3] - edge[1]) * t + (Math.random() - 0.5) * 0.02;
      const z = (Math.random() - 0.5) * 0.05;
      const x2 = x * cZ - y * sZ, y2 = x * sZ + y * cZ;
      const y3 = y2 * cX - z * sX, z3 = y2 * sX + z * cX;
      pos3[i * 3] = x2 * 1.05;
      pos3[i * 3 + 1] = y3 * 1.05 + 0.4;
      pos3[i * 3 + 2] = z3 - 1.0;
    }
  }

  for (let i = 0; i < COUNT * 3; i++) rand[i] = Math.random();

  return { pos0, pos1, pos2, pos3, rand };
}

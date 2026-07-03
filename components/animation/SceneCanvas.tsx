"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScene, type SceneConfig } from "@/lib/animations/scene";
import { setupScrollChoreography } from "@/lib/animations/scrollChoreography";

interface SceneCanvasProps {
  mode?: "full" | "ambient";
  config?: SceneConfig;
}

export default function SceneCanvas({ mode = "ambient", config }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const { renderer, scene, camera, uniforms, dispose } = createScene(canvasRef.current, config);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let camY = 0;
    let rafId: number;

    const clock = new THREE.Clock();
    const tick = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.05;
      camera.position.y += (-pointer.y * 0.45 - camera.position.y + camY) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uPR.value = Math.min(window.devicePixelRatio, 2);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);

    let choreoCleanup: (() => void) | undefined;
    if (mode === "full") {
      choreoCleanup = setupScrollChoreography(uniforms, camera, (y) => { camY = y; });
    } else {
      // ambient: gentle slow opacity fade in
      gsap.to(uniforms.uOpacity, { value: 1.0, duration: 2.5, ease: "power2.out" });
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      choreoCleanup?.();
      dispose();
    };
  }, [mode]);

  return <canvas ref={canvasRef} id="gl" />;
}

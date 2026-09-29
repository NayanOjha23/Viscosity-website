"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScene } from "@/lib/animations/scene";
import { setupScrollChoreography } from "@/lib/animations/scrollChoreography";

export default function HomeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const { renderer, scene, camera, uniforms, dispose } = createScene(canvasRef.current);

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

    const choreoCleanup = setupScrollChoreography(uniforms, camera, (y) => { camY = y; });

    // preloader → hero entrance
    gsap.set("#nav, #ticker", { opacity: 0 });
    gsap.set(".hero__title .line > span", { yPercent: 110 });

    const pre = document.getElementById("preloader");
    const fill = document.getElementById("preloader-fill");
    const pct = document.getElementById("preloader-pct");

    let intro: gsap.core.Timeline | undefined;
    const load = { v: 0 };
    if (pre && fill && pct) {
      gsap.to(load, {
        v: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          fill.style.width = load.v + "%";
          pct.textContent = "CST " + (load.v * 0.46).toFixed(2);
        },
        onComplete: () => {
          intro = gsap.timeline();
          intro.to(pre, { opacity: 0, duration: 0.7, ease: "power2.inOut" })
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
        },
      });
    } else {
      gsap.set("#nav, #ticker", { opacity: 1 });
    }

    return () => {
      gsap.killTweensOf(load);
      intro?.kill();
      gsap.set("#nav, #ticker", { opacity: 1 });
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      choreoCleanup();
      dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="gl" />
      <div className="preloader" id="preloader">
        <div className="preloader__inner">
          <img className="preloader__mark" src="/assets/viscosity-mark-only-light.svg" alt="" />
          <div className="preloader__bar">
            <span id="preloader-fill" />
          </div>
          <div className="preloader__label mono" id="preloader-pct">
            CST&nbsp;0.00
          </div>
        </div>
      </div>
    </>
  );
}

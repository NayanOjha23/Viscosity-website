"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  uniforms: { uOpacity: { value: number } };
}

export default function Preloader({ uniforms }: PreloaderProps) {
  useEffect(() => {
    const pre = document.getElementById("preloader");
    const fill = document.getElementById("preloader-fill");
    const pct = document.getElementById("preloader-pct");
    if (!pre || !fill || !pct) return;

    gsap.set("#nav, #ticker", { opacity: 0 });
    gsap.set(".hero__title .line > span", { yPercent: 110 });

    const load = { v: 0 };
    gsap.to(load, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        fill.style.width = load.v + "%";
        pct.textContent = "CST " + (load.v * 0.46).toFixed(2);
      },
      onComplete: () => introduce(pre, uniforms),
    });
  }, [uniforms]);

  return (
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
  );
}

function introduce(pre: HTMLElement, uniforms: { uOpacity: { value: number } }) {
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

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setupRevealAnimations } from "@/lib/animations/revealAnimations";

let registered = false;

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const lenis = new Lenis({ lerp: 0.065, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const revealCleanup = setupRevealAnimations();
    cleanupRef.current = revealCleanup;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      revealCleanup();
    };
  }, []);

  return <>{children}</>;
}

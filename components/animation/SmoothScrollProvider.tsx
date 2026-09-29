"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setupRevealAnimations } from "@/lib/animations/revealAnimations";

let registered = false;

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const lenis = new Lenis({ lerp: 0.065, smoothWheel: true, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // The layout persists across client-side navigation, so reveal animations
  // must be re-wired for each new page's DOM — otherwise `.reveal` elements
  // stay at their CSS opacity: 0.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    return setupRevealAnimations();
  }, [pathname]);

  return <>{children}</>;
}

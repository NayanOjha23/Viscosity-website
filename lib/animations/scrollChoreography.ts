import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type * as THREE from "three";

interface Uniforms {
  uState: { value: number };
}

export function setupScrollChoreography(
  uniforms: Uniforms,
  camera: THREE.PerspectiveCamera,
  setCamY: (y: number) => void
): () => void {
  const triggers: ScrollTrigger[] = [];

  function morphSegment(trigger: string, from: number, to: number) {
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
          scrub: 1.4,
          onToggle: (self) => triggers.push(self),
        },
      }
    );
  }

  morphSegment("#spectrum", 0, 1);
  morphSegment("#network", 1, 2);
  morphSegment("#services", 2, 3);

  const camState = { z: 16, y: 0 };

  function camSegment(
    trigger: string,
    fromZ: number, toZ: number,
    fromY: number, toY: number
  ) {
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
          setCamY(camState.y);
        },
        scrollTrigger: {
          trigger,
          start: "top 95%",
          end: "top 15%",
          scrub: 1.4,
          onToggle: (self) => triggers.push(self),
        },
      }
    );
  }

  camSegment("#spectrum", 16, 17.5, 0, 0);
  camSegment("#network", 17.5, 14.5, 0, 0.6);
  camSegment("#services", 14.5, 12.5, 0.6, 0.2);

  return () => {
    // kill only our triggers
    ScrollTrigger.getAll()
      .filter((t) => {
        const el = t.vars.trigger as string;
        return el === "#spectrum" || el === "#network" || el === "#services";
      })
      .forEach((t) => t.kill());
  };
}

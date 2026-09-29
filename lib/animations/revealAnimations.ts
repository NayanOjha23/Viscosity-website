import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wires scroll-reveal animations for whatever is currently in the DOM.
// Runs inside a gsap.context so the returned cleanup kills every tween and
// ScrollTrigger it created — call it before re-running on a new route.
export function setupRevealAnimations(): () => void {
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
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

    gsap.utils.toArray<HTMLElement>(".reveal-lines").forEach((el) => {
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

    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const target = +(el.dataset.count ?? 0);
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

    const footer = document.querySelector(".footer");
    if (footer) {
      ScrollTrigger.create({
        trigger: footer,
        start: "top 85%",
        once: true,
        onEnter: () => footer.classList.add("is-visible"),
      });
    }

    if (document.querySelector("#contact")) {
      gsap.utils.toArray<HTMLElement>(".contact__title .line > span").forEach((el, i) => {
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
    }
  });

  ScrollTrigger.refresh();

  return () => ctx.revert();
}

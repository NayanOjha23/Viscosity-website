"use client";

import { useState, useCallback } from "react";
import SectionHead from "@/components/ui/SectionHead";
import GradeHoverCard from "@/components/ui/GradeHoverCard";
import Link from "next/link";
import { PRODUCT_GROUPS } from "@/lib/data/products";

export default function SpectrumTeaser() {
  const [hover, setHover] = useState<{ idx: number; x: number; y: number } | null>(null);
  // Touch devices have no hover; tapping a row pins the detail card centered on screen.
  const [pinned, setPinned] = useState<number | null>(null);

  const onEnter = useCallback((idx: number) => (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    setHover({ idx, x: e.clientX, y: e.clientY });
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    setHover((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
  }, []);

  const onLeave = useCallback(() => setHover(null), []);

  const onTap = useCallback((idx: number) => (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    setHover(null);
    setPinned((prev) => (prev === idx ? null : idx));
  }, []);

  const closePinned = useCallback(() => setPinned(null), []);

  const activeIdx = pinned ?? hover?.idx ?? null;

  return (
    <section className="spectrum" id="spectrum">
      <div className="glass section-intro">
        <SectionHead index="02" label="THE REFINEMENT SPECTRUM" />
        <h2 className="section-title reveal">Five grades of <em>stillness.</em></h2>
        <p className="section-sub reveal">
          From solvent-refined Group I to fully synthetic Group V — every grade
          in the spectrum, sourced from certified refineries and delivered to specification.
        </p>
      </div>
      <div className="groups">
        {PRODUCT_GROUPS.map((g, i) => (
          <article
            key={g.id}
            className={`group-row reveal${pinned === i ? " is-active" : ""}`}
            data-group={g.group}
            onPointerEnter={onEnter(i)}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            onPointerUp={onTap(i)}
          >
            <div className="group-row__id mono">{g.id.replace(" ", " ")}</div>
            <div className="group-row__name">{g.name}</div>
            <div className="group-row__specs mono">
              {g.specs.map((s, j) => <span key={j}>{s}</span>)}
            </div>
            <div className="group-row__grades mono">{g.grades}</div>
          </article>
        ))}
      </div>

      {pinned !== null && (
        <div className="grade-hover-card__scrim" onPointerUp={closePinned} />
      )}

      {activeIdx !== null && (
        <GradeHoverCard
          name={PRODUCT_GROUPS[activeIdx].name}
          detail={PRODUCT_GROUPS[activeIdx].detail}
          applications={PRODUCT_GROUPS[activeIdx].applications}
          visible={true}
          x={hover?.x ?? 0}
          y={hover?.y ?? 0}
          pinned={pinned !== null}
          onClose={closePinned}
        />
      )}

      <div style={{ marginTop: "clamp(2rem,5vh,3.5rem)" }}>
        <Link href="/products" className="contact__cta">
          <span>VIEW FULL PRODUCT RANGE</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

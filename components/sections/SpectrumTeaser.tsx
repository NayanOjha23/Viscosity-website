"use client";

import { useState, useCallback } from "react";
import SectionHead from "@/components/ui/SectionHead";
import GradeHoverCard from "@/components/ui/GradeHoverCard";
import Link from "next/link";
import { PRODUCT_GROUPS } from "@/lib/data/products";

export default function SpectrumTeaser() {
  const [hover, setHover] = useState<{ idx: number; x: number; y: number } | null>(null);

  const onEnter = useCallback((idx: number) => (e: React.MouseEvent) => {
    setHover({ idx, x: e.clientX, y: e.clientY });
  }, []);

  const onMove = useCallback((e: React.MouseEvent) => {
    setHover((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
  }, []);

  const onLeave = useCallback(() => setHover(null), []);

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
            className="group-row reveal"
            data-group={g.group}
            onMouseEnter={onEnter(i)}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
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

      {hover && (
        <GradeHoverCard
          name={PRODUCT_GROUPS[hover.idx].name}
          detail={PRODUCT_GROUPS[hover.idx].detail}
          applications={PRODUCT_GROUPS[hover.idx].applications}
          visible={true}
          x={hover.x}
          y={hover.y}
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

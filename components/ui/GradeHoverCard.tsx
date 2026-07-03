"use client";

import { useRef, useCallback } from "react";

interface GradeHoverCardProps {
  name: string;
  detail: string;
  applications: string;
  visible: boolean;
  x: number;
  y: number;
}

export default function GradeHoverCard({ name, detail, applications, visible, x, y }: GradeHoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getTransform = useCallback(() => {
    const offset = 20;
    return `translate(${x + offset}px, ${y + offset}px)`;
  }, [x, y]);

  return (
    <div
      ref={ref}
      className="grade-hover-card"
      style={{
        transform: getTransform(),
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
      }}
    >
      <div className="grade-hover-card__name">{name}</div>
      <p className="grade-hover-card__detail">{detail}</p>
      <div className="grade-hover-card__apps mono">{applications}</div>
    </div>
  );
}

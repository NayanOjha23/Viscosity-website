"use client";

import { useRef, useCallback } from "react";

interface GradeHoverCardProps {
  name: string;
  detail: string;
  applications: string;
  visible: boolean;
  x: number;
  y: number;
  /** When true, render as a fixed centered panel (touch) instead of cursor-follow. */
  pinned?: boolean;
  onClose?: () => void;
}

export default function GradeHoverCard({
  name,
  detail,
  applications,
  visible,
  x,
  y,
  pinned = false,
  onClose,
}: GradeHoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getTransform = useCallback(() => {
    const offset = 20;
    return `translate(${x + offset}px, ${y + offset}px)`;
  }, [x, y]);

  return (
    <div
      ref={ref}
      className={`grade-hover-card${pinned ? " grade-hover-card--pinned" : ""}`}
      style={{
        transform: pinned ? undefined : getTransform(),
        opacity: visible ? 1 : 0,
        pointerEvents: pinned ? "auto" : "none",
      }}
      role={pinned ? "dialog" : undefined}
      aria-label={pinned ? `${name} grade detail` : undefined}
    >
      {pinned && (
        <button
          type="button"
          className="grade-hover-card__close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
      )}
      <div className="grade-hover-card__name">{name}</div>
      <p className="grade-hover-card__detail">{detail}</p>
      <div className="grade-hover-card__apps mono">{applications}</div>
    </div>
  );
}

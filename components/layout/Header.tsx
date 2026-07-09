"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nav = document.getElementById("nav");
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape and lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className="nav" id="nav">
      <Link className="nav__logo" href="/" aria-label="Viscosity Global" onClick={close}>
        <img src="/assets/darkLogo-v6-grad.svg" alt="Viscosity Global" />
      </Link>

      <nav className="nav__links mono">
        <Link href="/products">PRODUCTS</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/contact" className="nav__cta">REQUEST A QUOTE</Link>
      </nav>

      <button
        type="button"
        className={`nav__burger${menuOpen ? " is-open" : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <div
        id="mobile-menu"
        className={`nav__mobile${menuOpen ? " is-open" : ""}`}
        hidden={!menuOpen}
      >
        <nav className="nav__mobile-links mono">
          <Link href="/products" onClick={close}>PRODUCTS</Link>
          <Link href="/about" onClick={close}>ABOUT</Link>
          <Link href="/contact" className="nav__cta" onClick={close}>REQUEST A QUOTE</Link>
        </nav>
      </div>
    </header>
  );
}

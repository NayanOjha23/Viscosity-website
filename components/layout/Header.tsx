"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Header() {
  useEffect(() => {
    const onScroll = () => {
      const nav = document.getElementById("nav");
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav" id="nav">
      <Link className="nav__logo" href="/" aria-label="Viscosity Global">
        <img src="/assets/darkLogo-v6-grad.svg" alt="Viscosity Global" />
      </Link>
      <nav className="nav__links mono">
        <Link href="/products">PRODUCTS</Link>
        <Link href="/about">ABOUT</Link>
        <Link href="/contact" className="nav__cta">REQUEST A QUOTE</Link>
      </nav>
    </header>
  );
}

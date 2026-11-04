"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const segments = [
  ["Education & Admissions Consultancies", "/who-we-help/education-admissions-consultancies/"],
  ["Language Schools & English-Test Preparation", "/who-we-help/language-schools/"],
  ["Tutoring & Test Preparation", "/who-we-help/tutoring-test-prep/"],
  ["Vocational & Professional Training", "/who-we-help/vocational-professional-training/"],
  ["Online Academies & Certification", "/who-we-help/online-academies/"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key === "Tab") {
        const panel = document.getElementById("mobile-navigation");
        const focusable = panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\\\"-1\\\"])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const panel = document.getElementById("mobile-navigation");
    panel?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-link" aria-label="EduFaros home" onClick={closeMenu}>
          <Image src="/edufaros-logo-dark.svg" alt="EduFaros — Education Growth Systems" width={190} height={64} priority />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <div className="nav-dropdown">
            <Link href="/who-we-help/" className="nav-link nav-parent">Who We Help <span aria-hidden="true">⌄</span></Link>
            <div className="nav-dropdown-panel">
              <Link className="dropdown-overview" href="/who-we-help/">Explore all education businesses <span aria-hidden="true">→</span></Link>
              {segments.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          </div>
          <Link className="nav-link" href="/approach/">How We Work</Link>
          <Link className="nav-link" href="/growth-systems/">Growth Systems</Link>
          <Link className="nav-link" href="/about/">About</Link>
        </nav>

        <Link className="header-cta" href="/discuss-growth/">Discuss Your Challenge <span aria-hidden="true">↗</span></Link>

        <button
          ref={triggerRef}
          type="button"
          className="mobile-menu-trigger"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-nav-layer">
          <button className="mobile-nav-scrim" type="button" aria-label="Close navigation" onClick={closeMenu} />
          <nav id="mobile-navigation" className="mobile-nav-panel" aria-label="Mobile navigation">
            <div className="mobile-nav-top">
              <span>Explore EduFaros</span>
              <button type="button" onClick={closeMenu} aria-label="Close menu">×</button>
            </div>
            <Link href="/who-we-help/" onClick={closeMenu}>Who We Help <span>→</span></Link>
            {segments.map(([label, href]) => <Link className="mobile-sub-link" key={href} href={href} onClick={closeMenu}>{label}</Link>)}
            <Link href="/approach/" onClick={closeMenu}>How We Work <span>→</span></Link>
            <Link href="/growth-systems/" onClick={closeMenu}>Growth Systems <span>→</span></Link>
            <Link href="/about/" onClick={closeMenu}>About <span>→</span></Link>
            <Link className="button button-gold mobile-menu-cta" href="/discuss-growth/" onClick={closeMenu}>Discuss Your Student Growth Challenge <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      )}
    </header>
  );
}

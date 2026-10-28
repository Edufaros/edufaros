"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#solutions", label: "Solutions" },
  { href: "#who-we-help", label: "Who We Help" },
  { href: "#method", label: "Our Method" },
  { href: "#results", label: "Approach" },
  { href: "#insights", label: "Insights" },
  { href: "#about", label: "About" }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link
          href="#top"
          className="brand-lockup"
          aria-label="EduFaros home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/edufaros-logo.webp"
            alt="EduFaros — Education Growth Systems"
            width={760}
            height={253}
            unoptimized
            priority
            className="brand-logo"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="#contact" className="header-cta">
          <span>Book a Strategy Call</span>
          <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </Link>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
            >
              <span className="mobile-nav-index">0{index + 1}</span>
              <span>{link.label}</span>
              <ArrowDownRight size={16} aria-hidden="true" />
            </Link>
          ))}
          <Link
            href="#contact"
            className="mobile-nav-cta"
            onClick={() => setOpen(false)}
          >
            Book a Strategy Call <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}
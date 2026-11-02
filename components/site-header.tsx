"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#home" onClick={() => setOpen(false)}>
          <span className="brand-monogram" aria-hidden>
            M
          </span>
          <span className="brand-text">
            <span className="brand-name">Melika Bahman-Abadi</span>
            <span className="brand-role">AI Engineer</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          {navigation.map((item) => (
            <a key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-primary btn-sm header-cta" href="#contact">
            Let&rsquo;s Work Together
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`nav-mobile${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-mobile-link"
              style={{ transitionDelay: `${index * 35}ms` }}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span>{item.label}</span>
              <span className="nav-mobile-index" aria-hidden>
                0{index + 1}
              </span>
            </a>
          ))}
        </nav>
        <a
          className="btn btn-primary nav-mobile-cta"
          href="#contact"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          Let&rsquo;s Work Together
        </a>
      </div>
    </header>
  );
}

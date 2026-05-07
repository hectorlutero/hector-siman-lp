"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";

const navLinks = [
  { pt: "Método", en: "Method", href: "#metodo" },
  { pt: "Resultados", en: "Results", href: "#resultados" },
  { pt: "Tecnologias", en: "Technologies", href: "#tecnologias" },
  { pt: "Contato", en: "Contact", href: "#contato" },
];

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating pill wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        <nav
          className={`navbar-enter pointer-events-auto flex items-center gap-2 md:gap-4 px-4 md:px-6 h-14 rounded-full transition-all duration-500 w-full md:w-auto ${
            scrolled ? "navbar-pill-scrolled" : "navbar-pill"
          }`}
        >
          {/* Brand */}
          <a href="#" className="text-base font-bold tracking-tight shrink-0">
            <span className="text-accent">Hector</span>{" "}
            <span className="text-foreground">Siman</span>
          </a>

          {/* Vertical divider */}
          <div className="hidden md:block w-px h-5 bg-white/10 mx-1" />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar-link text-sm text-muted hover:text-foreground transition-colors whitespace-nowrap"
              >
                {lang === "pt" ? link.pt : link.en}
              </a>
            ))}
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px h-5 bg-white/10 mx-1" />

          {/* Right controls */}
          <div className="flex items-center gap-2 md:gap-3 ml-auto md:ml-0">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className="hidden md:block text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 hover:border-accent/50 text-muted hover:text-foreground transition-all"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>

            {/* CTA */}
            <a
              href="https://calendar.app.google/WQGLZTfmwWmbo5AP7"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-cta hidden md:inline-flex items-center text-sm font-semibold px-5 py-2 rounded-full text-white"
            >
              {t("Conversar com Especialista", "Talk to an Expert")}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="fixed top-[4.5rem] left-4 right-4 z-40 rounded-2xl glass-strong border border-white/10 px-6 py-6 space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base text-muted hover:text-foreground transition-colors"
            >
              {lang === "pt" ? link.pt : link.en}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-3 border-t border-white/10">
            <button
              onClick={toggle}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 text-muted"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
            <a
              href="https://calendar.app.google/WQGLZTfmwWmbo5AP7"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-cta text-sm font-semibold px-5 py-2 rounded-full text-white"
            >
              {t("Conversar com Especialista", "Talk to an Expert")}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

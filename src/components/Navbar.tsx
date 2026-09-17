"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#cast", label: "Cast" },
  { href: "#episodes", label: "Episodes" },
  { href: "#discord", label: "Discord" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-void/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8 py-5">
        <a
          href="#"
          className="font-display text-2xl tracking-[0.2em] text-ash hover:text-ash-dim transition-colors duration-300"
        >
          FALTER<span className="text-crimson">SMP</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[11px] font-light tracking-[0.2em] uppercase text-ash-dim hover:text-ash transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/apply"
            className="font-body text-[11px] tracking-[0.2em] uppercase bg-crimson text-ash px-5 py-2.5 hover:bg-blaze transition-colors duration-300"
          >
            Apply
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-ash transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[0.5px]" : ""}`} />
          <span className={`block w-5 h-px bg-ash transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[0.5px]" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-void/95 backdrop-blur-md border-t border-ash-muted/20"
          >
            <div className="flex flex-col items-start px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-[11px] font-light tracking-[0.2em] uppercase text-ash-dim hover:text-ash transition-colors py-3 w-full border-b border-ash-muted/10"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="font-body text-[11px] tracking-[0.2em] uppercase bg-crimson text-ash px-5 py-2.5 mt-4 w-full text-center hover:bg-blaze transition-colors"
              >
                Apply
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

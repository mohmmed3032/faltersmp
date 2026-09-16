"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-ash-muted/10 py-16 px-4 md:px-8 overflow-hidden">
      <div className="ambient-glow w-[400px] h-[400px] bg-crimson/3 bottom-[-50%] left-[30%]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8"
        >
          <div>
            <h2 className="font-display text-[clamp(48px,8vw,100px)] tracking-[0.1em] text-ash/80 leading-none mb-2">
              FALTER<span className="text-crimson/60">SMP</span>
            </h2>
            <p className="font-body text-[9px] font-light tracking-[0.3em] uppercase text-ash-muted/40">
              A Scripted Minecraft Series &middot; Est. 2026
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-body text-[9px] font-light tracking-[0.2em] uppercase text-ash-muted/40">
              Created by NotAdamz_
            </p>
            <a href="#cast" className="font-body text-[9px] font-light tracking-[0.2em] uppercase text-ash-muted/40 hover:text-ash-dim transition-colors">
              Meet the Cast &rarr;
            </a>
          </div>
        </motion.div>

        <div className="border-t border-ash-muted/10 my-8" />

        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center gap-4">
          <div className="space-y-2">
            <p className="font-body text-[10px] font-light tracking-[0.2em] uppercase text-molten/80">
              Website designed &amp; built by ItzRedFox
            </p>
            <p className="font-body text-[9px] font-light tracking-[0.2em] uppercase text-ash-muted/30">
              &copy; {new Date().getFullYear()} Falter SMP &middot; All rights
              reserved
            </p>
          </div>
          <div className="flex gap-6">
            <span className="font-body text-[9px] font-light tracking-[0.2em] uppercase text-ash-muted/30">
              Minecraft
            </span>
            <span className="font-body text-[9px] font-light tracking-[0.2em] uppercase text-ash-muted/30">
              Scripted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

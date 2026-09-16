"use client";

import { motion } from "framer-motion";

export default function Discord() {
  return (
    <section id="discord" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Ambient glows */}
      <div className="ambient-glow w-[500px] h-[500px] bg-crimson/6 top-[0%] left-[20%]" />
      <div className="ambient-glow w-[300px] h-[300px] bg-molten/4 bottom-[10%] right-[10%]" />

      <div className="section-vignette" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <span className="font-body text-[10px] font-light tracking-[0.3em] uppercase text-ash-muted block mb-4">
            04 — Community
          </span>
        </motion.div>

        <div className="max-w-2xl">
          {/* Closing tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(36px,6vw,72px)] tracking-[0.08em] leading-[0.9] text-ash mb-6"
          >
            THE STORY
            <br />
            <span className="text-ash-dim">CONTINUES IN</span>
            <br />
            <span className="text-crimson">THE DISCORD</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-sm font-light text-ash-dim leading-relaxed mb-10 max-w-md"
          >
            Events, updates, conversations — the community lives here. Be part
            of it from the start.
          </motion.p>

          <motion.a
            href="https://discord.gg/XQfaqdfPqj"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 font-body text-[11px] tracking-[0.2em] uppercase bg-crimson text-ash px-8 py-3.5 hover:bg-blaze transition-colors duration-300 mx-auto"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Join Server
          </motion.a>
        </div>
      </div>
    </section>
  );
}

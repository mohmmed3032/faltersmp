"use client";

import { motion } from "framer-motion";

export default function Overview() {
  return (
    <section id="overview" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Ambient glow — left side for depth */}
      <div className="ambient-glow w-[500px] h-[500px] bg-crimson/6 top-[-10%] left-[-15%]" />
      {/* Ambient glow — right side fills the gap */}
      <div className="ambient-glow w-[350px] h-[350px] bg-molten/5 top-[20%] right-[-5%]" />

      <div className="section-vignette" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <span className="font-body text-[10px] font-light tracking-[0.3em] uppercase text-ash-muted block mb-4">
            01 — Overview
          </span>
        </motion.div>

        {/* Single column — no dead space */}
        <div className="max-w-4xl">
          {/* Pull quote — film tagline style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="font-display text-[clamp(32px,5vw,64px)] tracking-[0.06em] leading-[1] text-ash">
              A SCRIPTED MINECRAFT
              <br />
              <span className="text-ash-dim">SERIES BY A SMALL</span>
              <br />
              <span className="text-ash-dim">GROUP OF FRIENDS</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-body italic text-base md:text-lg text-ash-dim leading-relaxed">
              &ldquo;Same general idea as shows like Unstable SMP. Brand new, one
              episode out so far, an active Discord, and a couple of YouTube
              channels. This is the one place to understand what Falter SMP is,
              meet the people behind it, and join the community.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

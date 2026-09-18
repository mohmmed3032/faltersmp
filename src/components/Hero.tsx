"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const tags = ["Scripted", "Minecraft", "Series"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen overflow-hidden flex flex-col justify-end">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/thunder-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/thunder.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-crimson/30 via-void/20 to-void/80 z-[1]" />

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,230,220,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(242,230,220,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ghost watermark */}
      <motion.div
        style={{ y: ghostY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[2]"
      >
        <span
          className="font-display tracking-[0.15em] text-ash/[0.02]"
          style={{ fontSize: "clamp(120px, 28vw, 400px)", lineHeight: 0.85 }}
        >
          FALTER
        </span>
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <div
          className="absolute"
          style={{
            width: "1px",
            height: "300px",
            background: "linear-gradient(to bottom, transparent, rgba(242,230,220,0.04), transparent)",
            top: "20%",
            left: "15%",
            transform: "rotate(12deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "1px",
            height: "200px",
            background: "linear-gradient(to bottom, transparent, rgba(242,230,220,0.03), transparent)",
            top: "40%",
            right: "20%",
            transform: "rotate(-8deg)",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 px-4 md:px-8 pb-16 md:pb-24 pt-40"
      >
        <div className="max-w-7xl mx-auto">
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-2 mb-6"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-[10px] font-light tracking-[0.2em] uppercase text-ash-dim border border-ash-muted/20 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-display text-[clamp(64px,14vw,180px)] leading-[0.82] tracking-[0.1em] text-ash mb-4"
          >
            FALTER<span className="text-crimson">SMP</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-body italic text-sm text-ash-dim mb-8 max-w-md"
          >
            &ldquo;A small group of friends. One story unfolding. Every episode
            raises the stakes.&rdquo;
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-full max-w-xl h-px bg-gradient-to-r from-ash-muted/30 via-ash-muted/10 to-transparent mb-8 origin-left"
          />

          {/* Metadata line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-10 font-body text-[10px] font-light tracking-[0.2em] uppercase text-ash-dim"
          >
            <span>Scripted Series</span>
            <span className="text-ash-muted">&middot;</span>
            <span>2026</span>
            <span className="text-ash-muted">&middot;</span>
            <span>YouTube</span>
            <span className="text-ash-muted">&middot;</span>
            <span>NotAdamz_</span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <a
              href="#episodes"
              className="font-body text-[11px] tracking-[0.2em] uppercase bg-crimson text-ash px-5 sm:px-8 py-3 sm:py-3.5 whitespace-nowrap hover:bg-blaze transition-colors duration-300"
            >
              Watch Now
            </a>
            <a
              href="#overview"
              className="font-body text-[11px] tracking-[0.2em] uppercase border border-ash-muted/30 text-ash px-5 sm:px-8 py-3 sm:py-3.5 whitespace-nowrap hover:border-ash-muted/60 transition-colors duration-300"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Section vignette */}
      <div className="section-vignette z-[3]" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-ash-muted/40" />
        <span className="font-body text-[8px] tracking-[0.3em] uppercase text-ash-muted/40 [writing-mode:vertical-lr]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface Episode {
  number: number;
  title: string;
  logline: string;
  videoId?: string;
  date: string;
}

const episodes: Episode[] = [
  {
    number: 1,
    title: "Episode 1",
    logline: "The beginning of everything. Where it all starts.",
    videoId: "IDtENjK2Lmw",
    date: "2026",
  },
];

function FeaturedPlayer({ episode }: { episode: Episode }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
      <a
        href={episode.videoId ? `https://www.youtube.com/watch?v=${episode.videoId}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block absolute inset-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-molten/50"
        aria-label={`Watch ${episode.title} on YouTube`}
      >
        {/* Thumbnail */}
        {episode.videoId && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://img.youtube.com/vi/${episode.videoId}/maxresdefault.jpg`}
            alt={episode.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
          />
        )}

        {/* Heavy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-transparent" />

        {/* Ambient glow on image */}
        <div className="ambient-glow w-[400px] h-[400px] bg-crimson/10 bottom-[10%] left-[5%]" />

        {/* Episode number — large, cinematic */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
          <span className="font-display text-[clamp(48px,8vw,96px)] leading-none text-ash/20">
            {String(episode.number).padStart(2, "0")}
          </span>
        </div>

        {/* Title + logline — bottom left */}
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 max-w-xl">
          <h3 className="font-display text-3xl sm:text-5xl tracking-[0.08em] text-ash mb-2">
            {episode.title.toUpperCase()}
          </h3>
          <p className="font-body text-sm font-light text-ash-dim leading-relaxed">
            {episode.logline}
          </p>
        </div>

        {/* Play button — centered, cinematic */}
        {episode.videoId && (
          <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-ash/30 bg-void/30 backdrop-blur-sm flex items-center justify-center group-hover:border-molten/60 group-hover:bg-void/50 transition-all duration-500 group-hover:scale-110">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-ash ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        )}

        {/* Date tag */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10">
          <span className="font-body text-[9px] font-light tracking-[0.2em] uppercase text-ash-dim bg-void/40 backdrop-blur-sm px-3 py-1">
            {episode.date}
          </span>
        </div>
      </a>
    </div>
  );
}

export default function Episodes() {
  return (
    <section id="episodes" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Ambient glows */}
      <div className="ambient-glow w-[500px] h-[500px] bg-crimson/4 top-[20%] left-[-10%]" />
      <div className="ambient-glow w-[350px] h-[350px] bg-molten/3 bottom-[10%] right-[-8%]" />

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
            03 — Episodes
          </span>
          <h2 className="font-display text-[clamp(36px,6vw,72px)] tracking-[0.08em] leading-[0.9] text-ash">
            NOW
            <br />
            <span className="text-ash-dim">PLAYING</span>
          </h2>
        </motion.div>

        {/* Featured episode — cinematic widescreen block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="group relative rounded-sm overflow-hidden mb-12"
        >
          <FeaturedPlayer episode={episodes[0]} />
        </motion.div>

        {/* Upcoming episodes — atmospheric list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-body text-[9px] font-light tracking-[0.3em] uppercase text-ash-muted mb-6">
            — Upcoming
          </p>

          {/* Episode 02 — placeholder */}
          <div className="relative group/ep border-b border-ash-muted/10">
            <div className="absolute inset-y-0 left-0 w-[1px] opacity-0 group-hover/ep:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--blaze), transparent)",
                boxShadow: "0 0 10px var(--blaze)40, 0 0 20px var(--blaze)20",
              }}
            />
            <div className="flex items-center gap-4 sm:gap-6 py-5 px-4">
              <span className="font-display text-2xl sm:text-3xl text-ash-muted/20 w-10 sm:w-12 tracking-wider">
                02
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm sm:text-base text-ash-muted/30 italic">
                  Coming soon
                </p>
              </div>
              <span className="font-body text-[9px] font-light tracking-[0.15em] uppercase text-ash-muted/20 flex-shrink-0">
                TBA
              </span>
            </div>
          </div>

          {/* Episode 03 — placeholder */}
          <div className="relative group/ep border-b border-ash-muted/10">
            <div className="absolute inset-y-0 left-0 w-[1px] opacity-0 group-hover/ep:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--blaze), transparent)",
                boxShadow: "0 0 10px var(--blaze)40, 0 0 20px var(--blaze)20",
              }}
            />
            <div className="flex items-center gap-4 sm:gap-6 py-5 px-4">
              <span className="font-display text-2xl sm:text-3xl text-ash-muted/20 w-10 sm:w-12 tracking-wider">
                03
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm sm:text-base text-ash-muted/30 italic">
                  Coming soon
                </p>
              </div>
              <span className="font-body text-[9px] font-light tracking-[0.15em] uppercase text-ash-muted/20 flex-shrink-0">
                TBA
              </span>
            </div>
          </div>

          {/* Episode 04 — placeholder */}
          <div className="relative group/ep">
            <div className="absolute inset-y-0 left-0 w-[1px] opacity-0 group-hover/ep:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--gold), transparent)",
                boxShadow: "0 0 10px var(--gold)40, 0 0 20px var(--gold)20",
              }}
            />
            <div className="flex items-center gap-4 sm:gap-6 py-5 px-4">
              <span className="font-display text-2xl sm:text-3xl text-ash-muted/20 w-10 sm:w-12 tracking-wider">
                04
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm sm:text-base text-ash-muted/30 italic">
                  Coming soon
                </p>
              </div>
              <span className="font-body text-[9px] font-light tracking-[0.15em] uppercase text-ash-muted/20 flex-shrink-0">
                TBA
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

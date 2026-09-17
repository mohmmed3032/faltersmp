"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface CastMember {
  name: string;
  role: string;
  description: string;
  image?: string;
  youtube?: string;
  imageFit: "cover" | "contain";
  imagePosition?: "top" | "center";
  accentColor: string;
}

const cast: CastMember[] = [
  {
    name: "NotAdamz_",
    role: "Creator & Main Poster",
    description:
      "The official CEO of Falter SMP. Also known as a strong fighter with no fears. The only one uploading so far.",
    image: "/cast/notadamz.jpg",
    youtube: "https://www.youtube.com/@NotAdamz",
    imageFit: "cover",
    imagePosition: "center",
    accentColor: "var(--molten)",
  },
  {
    name: "HUGOANDREICH",
    role: "co-owner & Protaginst",
    description:
      "Hasn't shown up yet. Still making his entrance.",
    image: "/cast/hugo.jpg",
    youtube: "https://www.youtube.com/@HUGOANDREICH",
    imageFit: "cover",
    imagePosition: "center",
    accentColor: "var(--gold)",
  },
  {
    name: "Rednax600",
    role: "Creator & Protaginst",
    description:
      "Part of the crew. A familiar face in the world of Falter SMP.",
    image: "/cast/rednax.png",
    youtube: "https://www.youtube.com/@Rednax600",
    imageFit: "cover",
    imagePosition: "center",
    accentColor: "var(--blaze)",
  },
  {
    name: "T0X1CITY_X",
    role: "Admin & Actor",
    description:
      "A legend among legends, a manipulator and a friend, dumb looking yet has a strong mind. Never judge a book by the cover or you may die.",
    image: "/cast/tox1city.png",
    imageFit: "contain",
    imagePosition: "center",
    accentColor: "var(--crimson)",
  },
  {
    name: "Re4lZen0",
    role: "Co-owner & Moderator",
    description:
      "Part of the team.",
    image: "/cast/zeno.webp",
    imageFit: "cover",
    imagePosition: "center",
    accentColor: "var(--gold)",
  },
];

function CastCard({ member, isLastOrphan }: { member: CastMember; isLastOrphan?: boolean }) {
  const isContain = member.imageFit === "contain";
  const imgPos = member.imagePosition || "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className={`group relative flex flex-col h-full ${
        isLastOrphan ? "col-span-2 justify-self-center w-full sm:w-[calc(50%-0.5rem)]" : ""
      }`}
    >
      {/* Image */}
      <a
        href={member.youtube || "#"}
        target={member.youtube ? "_blank" : undefined}
        rel={member.youtube ? "noopener noreferrer" : undefined}
        className="block relative overflow-hidden bg-ember-black"
        style={{ aspectRatio: "3/4" }}
      >
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 50vw, 260px"
            className={
              isContain
                ? "object-contain object-center transition-all duration-700 group-hover:scale-105"
                : "object-cover object-top transition-all duration-700 group-hover:scale-105"
            }
            style={{
              objectFit: isContain ? "contain" : "cover",
              objectPosition: isContain
                ? `center ${imgPos === "top" ? "top" : "center"}`
                : "center top",
              imageRendering: "auto",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-ember-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-24 h-36 rounded-[40%_40%_0_0] opacity-20"
                style={{
                  background: `linear-gradient(to top, ${member.accentColor}, transparent)`,
                }}
              />
            </div>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: member.accentColor,
                  boxShadow: `0 0 20px ${member.accentColor}, 0 0 40px ${member.accentColor}40`,
                }}
              />
            </div>
          </div>
        )}

        {/* Rim light */}
        <div
          className="absolute inset-y-0 left-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to bottom, transparent, ${member.accentColor}, transparent)`,
            boxShadow: `0 0 15px ${member.accentColor}60, 0 0 30px ${member.accentColor}30`,
          }}
        />

        {/* YouTube indicator */}
        {member.youtube && (
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-ash" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
          </div>
        )}
      </a>

      {/* Description panel — flex-1 to fill remaining height */}
      <div className="bg-ember-black border-t border-ash-muted/10 p-5 pt-4 flex-1 flex flex-col justify-start">
        <h3 className="font-display text-lg tracking-[0.1em] leading-none mb-1 text-ash">
          {member.name.toUpperCase()}
        </h3>
        <p className="font-body text-[9px] font-light tracking-[0.2em] uppercase text-ash-muted">
          {member.role}
        </p>
        <p className="font-body text-[11px] font-light leading-relaxed text-ash-dim mt-2">
          {member.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Cast() {
  const hasOrphan = cast.length % 2 !== 0;

  return (
    <section id="cast" className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Ambient glows */}
      <div className="ambient-glow w-[400px] h-[400px] bg-crimson/5 bottom-[0%] left-[-10%]" />
      <div className="ambient-glow w-[300px] h-[300px] bg-molten/4 top-[10%] right-[-5%]" />

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
            02 — Cast
          </span>
          <h2 className="font-display text-[clamp(36px,6vw,72px)] tracking-[0.08em] leading-[0.9] text-ash">
            MEET THE
            <br />
            <span className="text-ash-dim">CAST</span>
          </h2>
        </motion.div>

        {/* Cast cards — grid with stretch for equal heights */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-stretch">
          {cast.map((member, i) => (
            <CastCard
              key={member.name}
              member={member}
              isLastOrphan={hasOrphan && i === cast.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

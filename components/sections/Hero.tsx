"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  Download,
  Mail,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { site } from "@/lib/data";
import { useIntro } from "@/components/layout/IntroProvider";
import { HeroPortraitEcosystem } from "@/components/sections/HeroPortraitEcosystem";
import { Button } from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;
const LETTERS = ["O", "M", "N", "I", "A"] as const;

const socialLinks = [
  {
    label: "LinkedIn",
    href: site.linkedin,
    icon: <FaLinkedinIn aria-hidden size={15} />,
    ariaLabel: "Open Omnia's LinkedIn profile",
    external: true,
  },
  {
    label: "GitHub",
    href: site.github,
    icon: <SiGithub aria-hidden size={15} />,
    ariaLabel: "Open Omnia's GitHub profile",
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: <Mail aria-hidden size={15} strokeWidth={1.8} />,
    ariaLabel: "Send Omnia an email",
    external: false,
  },
] as const;

const corners = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { introDone } = useIntro();
  const play = introDone;
  const year = new Date().getFullYear();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-x-clip section-pad bg-[#f5f2ec] pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32"
    >
      <div className="section-atmosphere" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-[0.55]" />
        <div className="absolute left-[6%] top-[18%] h-48 w-48 rounded-full bg-accent-glow blur-3xl sm:h-64 sm:w-64" />
        <div className="absolute bottom-[12%] right-[4%] h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(13,110,106,0.13),transparent_70%)] blur-2xl sm:h-72 sm:w-72" />
      </div>

      {/* Editorial crop marks */}
      <div
        className="pointer-events-none absolute inset-3 z-[5] sm:inset-5 lg:inset-7"
        aria-hidden
      >
        {corners.map((pos, i) => (
          <motion.span
            key={pos}
            className={`absolute h-4 w-4 border-line-strong sm:h-6 sm:w-6 ${pos}`}
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.55, delay: play ? 0.08 + i * 0.05 : 0, ease: EASE }}
          />
        ))}
      </div>

      <div className="container-wide relative z-10">
        {/* Top meta rail */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.5, delay: play ? 0.06 : 0, ease: EASE }}
          className="mb-8 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-muted sm:mb-10 sm:text-[11px]"
        >
          <div className="flex items-center gap-3">
            <span className="text-accent">01</span>
            <span className="h-px w-5 bg-line-strong sm:w-7" aria-hidden />
            <span>Intro</span>
          </div>
          <span>{year}</span>
        </motion.div>

        <div className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,420px)] lg:gap-x-14 xl:gap-x-20">
          <div className="relative order-1 min-w-0 lg:col-start-1 lg:row-start-1">
            {/* Monumental brand */}
            <h1
              className="font-display text-[clamp(3.4rem,14vw,6.75rem)] font-extrabold leading-[0.86] tracking-[-0.045em] text-ink"
              aria-label="Omnia Osama"
            >
              <span className="flex flex-wrap gap-x-[0.02em]" aria-hidden>
                {LETTERS.map((letter, i) => (
                  <span key={letter} className="inline-block overflow-hidden pb-[0.05em]">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? false : { y: "115%" }}
                      animate={play ? { y: "0%" } : { y: "115%" }}
                      transition={{
                        duration: 0.8,
                        delay: play ? 0.14 + i * 0.055 : 0,
                        ease: EASE,
                      }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </span>
              <span className="mt-1 block overflow-hidden">
                <motion.span
                  className="block font-display text-[clamp(1.15rem,3.2vw,1.65rem)] font-semibold tracking-[0.18em] text-ink-soft"
                  initial={reduce ? false : { y: "110%", opacity: 0 }}
                  animate={play ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                  transition={{ duration: 0.65, delay: play ? 0.42 : 0, ease: EASE }}
                >
                  OSAMA
                </motion.span>
              </span>
            </h1>

            <motion.div
              aria-hidden
              initial={reduce ? false : { scaleX: 0 }}
              animate={play ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.85, delay: play ? 0.52 : 0, ease: EASE }}
              className="mt-6 h-[2px] origin-left bg-accent sm:mt-7"
              style={{ width: "min(100%, 11rem)" }}
            />

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, delay: play ? 0.62 : 0, ease: EASE }}
              className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-7"
            >
              <span className="font-display text-[clamp(1.15rem,3.2vw,1.85rem)] font-bold uppercase leading-none tracking-[0.08em] text-ink sm:tracking-[0.1em]">
                <span className="text-accent">Full-Stack</span>
                <span className="mx-[0.28em] text-line-strong" aria-hidden>
                  ·
                </span>
                <span>WEB Developer</span>
              </span>
              <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-accent" />
                {!reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-accent"
                    animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: play ? 0.9 : 0,
                    }}
                  />
                )}
              </span>
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, delay: play ? 0.72 : 0, ease: EASE }}
              className="mt-4 max-w-lg font-serif text-[clamp(1.4rem,3vw,1.95rem)] italic leading-[1.35] text-muted"
            >
              Building digital products that feel simple.
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: play ? 0.8 : 0, ease: EASE }}
              className="mt-4 hidden max-w-lg text-base leading-relaxed text-muted lg:block lg:text-lg"
            >
              {site.tagline}
            </motion.p>
          </div>

          <div className="relative order-2 flex min-w-0 max-w-full justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-end lg:self-center">
            <HeroPortraitEcosystem play={play} />
          </div>

          <div className="relative order-3 min-w-0 lg:col-start-1 lg:row-start-2 lg:mt-2">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: play ? 0.86 : 0, ease: EASE }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Button href="#projects" variant="primary" className="w-full sm:w-auto">
                View Projects
                <ArrowDownRight size={16} />
              </Button>
              <Button href="#contact" variant="secondary" className="w-full sm:w-auto">
                Hire Me
              </Button>
              <Button
                href={site.cvPath}
                variant="ghost"
                external
                className="w-full sm:w-auto"
              >
                Download CV
                <Download size={15} />
              </Button>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: play ? 0.94 : 0, ease: EASE }}
              className="mt-7 flex items-center gap-3"
            >
              {socialLinks.map(({ label, href, icon, ariaLabel, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={ariaLabel}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-elevated/80 text-ink-soft transition-colors duration-300 hover:border-accent/55 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f2ec]"
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom editorial rail */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={play ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.55, delay: play ? 1.05 : 0 }}
          className="mt-12 flex items-end justify-between gap-6 border-t border-line pt-5 sm:mt-16 sm:pt-6"
        >
          <div className="min-w-0 flex-1">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Available for work
            </p>
            <div className="relative h-[2px] w-full max-w-xs overflow-hidden bg-line sm:max-w-sm">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={reduce ? { width: "100%" } : { width: "0%" }}
                animate={play ? { width: "72%" } : { width: "0%" }}
                transition={{ duration: 1.1, delay: play ? 1.15 : 0, ease: EASE }}
              />
            </div>
          </div>
          <a
            href="#about"
            className="group flex shrink-0 flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
          >
            <span>Scroll</span>
            <motion.span
              aria-hidden
              animate={reduce || !play ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-6 w-px bg-accent/70"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

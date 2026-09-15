"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "motion/react";

type IntroLoaderProps = {
  onComplete: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const LETTERS = ["O", "M", "N", "I", "A"] as const;

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const reduce = useReducedMotion();
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, [0, 100], ["0%", "100%"]);
  const [display, setDisplay] = useState(0);

  const year = useMemo(() => new Date().getFullYear().toString(), []);

  useEffect(() => {
    const unsub = progress.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [progress]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    let controls: { stop: () => void } | undefined;

    const beginExit = () => {
      setPhase("exit");
      setExiting(true);
      doneTimer = setTimeout(
        () => {
          setMounted(false);
          document.body.style.overflow = previousOverflow;
          onComplete();
        },
        reduce ? 280 : 780,
      );
    };

    if (reduce) {
      progress.set(100);
      holdTimer = setTimeout(beginExit, 220);
    } else {
      // Cinematic beat: ~2.2s progress, brief hold, then exit
      controls = animate(progress, 100, {
        duration: 2.15,
        ease: [0.33, 0.1, 0.2, 1],
        onComplete: () => {
          setPhase("hold");
          holdTimer = setTimeout(beginExit, 320);
        },
      });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      controls?.stop();
      if (holdTimer) clearTimeout(holdTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, [onComplete, progress, reduce]);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          key="intro-loader"
          role="status"
          aria-live="polite"
          aria-busy={!exiting}
          aria-label="Opening portfolio"
          className="fixed inset-0 z-[200] overflow-hidden bg-[#f5f2ec]"
          initial={false}
          animate={
            exiting
              ? {
                  y: "-100%",
                  transition: { duration: reduce ? 0.28 : 0.72, ease: EASE_OUT },
                }
              : { y: "0%" }
          }
        >
          {/* Atmosphere */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <motion.div
              className="absolute inset-0 grid-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 0.55 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent-glow blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: exiting ? 0 : 1,
                scale: exiting ? 1.1 : 1,
                x: reduce ? 0 : [0, 18, 0],
                y: reduce ? 0 : [0, -12, 0],
              }}
              transition={{
                opacity: { duration: 0.9 },
                scale: { duration: 0.9 },
                x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(13,110,106,0.14),transparent_70%)] blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>

          {/* Frame corners */}
          <div
            className="pointer-events-none absolute inset-5 sm:inset-8 lg:inset-10"
            aria-hidden
          >
            {[
              "left-0 top-0 border-l border-t",
              "right-0 top-0 border-r border-t",
              "left-0 bottom-0 border-l border-b",
              "right-0 bottom-0 border-r border-b",
            ].map((pos, i) => (
              <motion.span
                key={pos}
                className={`absolute h-5 w-5 border-line-strong sm:h-7 sm:w-7 ${pos}`}
                initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: exiting ? 0 : 1,
                  scale: 1,
                }}
                transition={{ duration: 0.55, delay: reduce ? 0 : 0.15 + i * 0.06, ease: EASE }}
              />
            ))}
          </div>

          {/* Top meta */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between section-pad pt-8 sm:pt-10 lg:pt-12">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: exiting ? 0 : 1, y: exiting ? -12 : 0 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : 0.2, ease: EASE }}
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted sm:text-[11px]"
            >
              <span className="text-accent">01</span>
              <span className="h-px w-6 bg-line-strong" />
              <span>Intro</span>
            </motion.div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: exiting ? 0 : 1, y: exiting ? -12 : 0 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : 0.28, ease: EASE }}
              className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted sm:text-[11px]"
            >
              {year}
            </motion.p>
          </div>

          {/* Main stage */}
          <div className="relative z-10 flex h-full flex-col justify-center section-pad">
            <div className="mx-auto w-full max-w-4xl">
              {/* Brand wordmark — letter cascade, always one line */}
              <h1
                className="flex flex-nowrap justify-center gap-x-[0.02em] whitespace-nowrap font-display text-[clamp(2.75rem,14vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.045em] text-ink sm:justify-start sm:text-[clamp(3.75rem,18vw,9rem)]"
                aria-label="Omnia"
              >
                {LETTERS.map((letter, i) => (
                  <span key={letter} className="inline-block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? false : { y: "115%", rotate: 4 }}
                      animate={
                        exiting
                          ? { y: "-120%", opacity: 0, rotate: -2 }
                          : { y: "0%", opacity: 1, rotate: 0 }
                      }
                      transition={{
                        duration: reduce ? 0.2 : exiting ? 0.45 : 0.85,
                        delay: reduce ? 0 : exiting ? i * 0.03 : 0.35 + i * 0.07,
                        ease: EASE_OUT,
                      }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Accent draw line */}
              <motion.div
                className="mt-6 h-[2px] origin-left bg-accent sm:mt-8"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: exiting ? 0 : 1 }}
                transition={{
                  duration: reduce ? 0.2 : 0.9,
                  delay: reduce ? 0 : 0.85,
                  ease: EASE,
                }}
                style={{ width: "min(100%, 12rem)" }}
                aria-hidden
              />

              {/* Role + supporting line */}
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div>
                  <motion.p
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{
                      opacity: exiting ? 0 : 1,
                      y: exiting ? -10 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: reduce ? 0 : 1.0,
                      ease: EASE,
                    }}
                    className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft sm:text-xs"
                  >
                    Full-Stack WEB Developer
                  </motion.p>
                  <motion.p
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{
                      opacity: exiting ? 0 : 1,
                      y: exiting ? -8 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: reduce ? 0 : 1.12,
                      ease: EASE,
                    }}
                    className="mt-2 max-w-sm font-serif text-lg italic leading-snug text-muted sm:text-xl"
                  >
                    Building digital products that feel simple.
                  </motion.p>
                </div>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: exiting ? 0 : 1, y: exiting ? 8 : 0 }}
                  transition={{ duration: 0.55, delay: reduce ? 0 : 1.2, ease: EASE }}
                  className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:flex"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-accent ${
                      phase === "hold" ? "" : "animate-pulse"
                    }`}
                  />
                  <span>{phase === "hold" ? "Ready" : "Crafting experience"}</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom progress stage */}
          <div className="absolute inset-x-0 bottom-0 z-10 section-pad pb-8 sm:pb-10 lg:pb-12">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: exiting ? 0 : 1, y: exiting ? 24 : 0 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : 0.45, ease: EASE }}
              className="mx-auto flex w-full max-w-4xl flex-col gap-4 sm:flex-row sm:items-end sm:gap-8"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  <span>Loading experience</span>
                  <span className="sm:hidden tabular-nums text-ink">
                    {String(display).padStart(3, "0")}
                  </span>
                </div>
                <div
                  className="relative h-[2px] w-full overflow-hidden bg-line"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={display}
                  aria-label="Load progress"
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-accent"
                    style={{ width: progressWidth }}
                  />
                  {/* Soft leading glow on the progress tip */}
                  <motion.div
                    className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-accent/40 blur-[3px]"
                    style={{ left: progressWidth }}
                    aria-hidden
                  />
                </div>
              </div>

              <motion.p
                className="hidden font-display text-[clamp(2.5rem,6vw,3.75rem)] font-bold leading-none tracking-[-0.04em] text-ink tabular-nums sm:block"
                aria-hidden
              >
                {String(display).padStart(3, "0")}
                <span className="ml-0.5 text-lg font-medium text-accent">%</span>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

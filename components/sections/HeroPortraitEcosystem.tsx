"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;
const SETTLE = [0.16, 1, 0.3, 1] as const;

const nodes = [
  {
    id: "react",
    label: "React",
    delay: 0.52,
    depth: "near" as const,
    path: "M200 200 L200 42",
    duration: "4.2s",
    /** Enter from above */
    enter: { x: 0, y: -28 },
  },
  {
    id: "node",
    label: "Node.js",
    delay: 0.74,
    depth: "mid" as const,
    path: "M200 200 L52 300",
    duration: "4.8s",
    /** Enter from left */
    enter: { x: -26, y: 10 },
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    delay: 0.96,
    depth: "far" as const,
    path: "M200 200 L348 300",
    duration: "5.2s",
    /** Enter from right */
    enter: { x: 26, y: 10 },
  },
] as const;

type HeroPortraitEcosystemProps = {
  play: boolean;
};

function TechLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex max-w-full items-center rounded-full border border-line bg-bg-elevated/95 px-2.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-ink-soft shadow-[0_6px_18px_rgba(20,18,15,0.05)] sm:px-3 sm:text-[10px] sm:tracking-[0.12em] lg:px-3.5 lg:py-2 lg:text-xs lg:tracking-[0.14em]">
      <span className="mr-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent sm:mr-2" />
      <span className="min-w-0">{children}</span>
    </div>
  );
}

export function HeroPortraitEcosystem({ play }: HeroPortraitEcosystemProps) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 90, damping: 22, mass: 0.4 });

  const portraitX = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const portraitY = useTransform(springY, [-0.5, 0.5], [-4, 4]);
  const orbitX = useTransform(springX, [-0.5, 0.5], [-9, 9]);
  const orbitY = useTransform(springY, [-0.5, 0.5], [-7, 7]);
  const midX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const midY = useTransform(springY, [-0.5, 0.5], [-9, 9]);
  const farX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const farY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onMove = (e: MouseEvent) => {
    if (reduce || !finePointer || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const parallaxOn = !reduce && finePointer && play;

  const depthStyle = (depth: "near" | "mid" | "far") => {
    if (!parallaxOn) return undefined;
    if (depth === "far") return { x: farX, y: farY };
    if (depth === "mid") return { x: midX, y: midY };
    return { x: midX, y: midY };
  };

  const labelMotion = (
    delay: number,
    enter: { x: number; y: number },
  ) => {
    if (reduce) {
      return {
        initial: false as const,
        animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
        transition: { duration: 0 },
      };
    }

    return {
      initial: {
        opacity: 0,
        x: enter.x,
        y: enter.y,
        filter: "blur(5px)",
      },
      animate: play
        ? {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
          }
        : {
            opacity: 0,
            x: enter.x,
            y: enter.y,
            filter: "blur(5px)",
          },
      transition: {
        x: { duration: 0.78, delay: play ? delay : 0, ease: SETTLE },
        y: { duration: 0.78, delay: play ? delay : 0, ease: SETTLE },
        opacity: { duration: 0.55, delay: play ? delay : 0, ease: EASE },
        filter: { duration: 0.65, delay: play ? delay : 0, ease: EASE },
      },
    };
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto flex w-full min-w-0 max-w-full flex-col items-center gap-5 sm:gap-5 lg:mx-0 lg:block lg:h-[400px] lg:w-[400px] lg:max-w-full lg:gap-0 xl:h-[420px] xl:w-[420px]"
    >
      <motion.div
        className="relative z-20 lg:absolute lg:left-1/2 lg:top-[6%] lg:z-20 lg:-translate-x-1/2"
        {...labelMotion(nodes[0].delay, nodes[0].enter)}
      >
        <motion.div style={depthStyle("near")}>
          <TechLabel>React</TechLabel>
        </motion.div>
      </motion.div>

      <div className="relative aspect-square w-[min(100%,188px)] shrink-0 sm:w-[220px] lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[300px] lg:-translate-x-1/2 lg:-translate-y-1/2 xl:w-[320px]">
        <motion.svg
          viewBox="0 0 400 400"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          aria-hidden
          style={parallaxOn ? { x: orbitX, y: orbitY } : undefined}
        >
          <motion.circle
            cx="200"
            cy="200"
            r="176"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            className="text-line-strong"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={
              play ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 1.1, delay: play ? 0.32 : 0, ease: EASE }}
          />
          <motion.circle
            cx="200"
            cy="200"
            r="146"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeDasharray="2.5 8"
            className="text-accent/40"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={
              play ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 1.15, delay: play ? 0.42 : 0, ease: EASE }}
          />
          {!reduce && play && (
            <>
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "200px 200px" }}
              >
                <circle cx="200" cy="54" r="1.6" className="fill-accent/55" />
              </motion.g>
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "200px 200px" }}
              >
                <circle cx="346" cy="200" r="1.35" className="fill-ink/30" />
              </motion.g>
            </>
          )}
          {nodes.map((node) => (
            <g key={`line-${node.id}`}>
              <motion.path
                d={node.path}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-line-strong"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={
                  play
                    ? { pathLength: 1, opacity: 0.5 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.85,
                  delay: play ? node.delay + 0.08 : 0,
                  ease: EASE,
                }}
              />
              {!reduce && play && (
                <circle r="1.8" className="fill-accent" opacity="0.85">
                  <animateMotion
                    dur={node.duration}
                    repeatCount="indefinite"
                    path={node.path}
                    begin={`${node.delay + 0.35}s`}
                  />
                </circle>
              )}
            </g>
          ))}
        </motion.svg>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-8px] rounded-full border border-line lg:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-16px] rounded-full border border-accent/20 lg:hidden"
        />

        <motion.div
          className="relative z-10 size-full"
          style={parallaxOn ? { x: portraitX, y: portraitY } : undefined}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.94 }}
            animate={
              play
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 20, scale: 0.94 }
            }
            transition={{
              duration: reduce ? 0 : 0.75,
              delay: play && !reduce ? 0.15 : 0,
              ease: EASE,
            }}
            className="relative size-full"
            data-cursor="hover"
          >
            <div
              aria-hidden
              className="absolute inset-[-6px] hidden rounded-full border border-line lg:block"
            />
            <div
              aria-hidden
              className="absolute inset-[-14px] hidden rounded-full border border-accent/20 lg:block"
            />
            <div className="relative size-full overflow-hidden rounded-full bg-bg-warm shadow-[0_12px_40px_rgba(20,18,15,0.1)]">
              <Image
                src={site.photo}
                alt="Omnia Osama — Full-Stack WEB Developer"
                fill
                priority
                sizes="(max-width: 640px) 188px, (max-width: 1024px) 220px, 320px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="z-20 flex w-full min-w-0 max-w-[min(100%,18.5rem)] items-center justify-center gap-3 px-1 sm:max-w-sm sm:gap-4 lg:contents">
        <motion.div
          className="min-w-0 shrink lg:absolute lg:bottom-[8%] lg:left-0 lg:z-20"
          {...labelMotion(nodes[1].delay, nodes[1].enter)}
        >
          <motion.div style={depthStyle("mid")}>
            <TechLabel>Node.js</TechLabel>
          </motion.div>
        </motion.div>
        <motion.div
          className="min-w-0 shrink lg:absolute lg:bottom-[8%] lg:right-0 lg:z-20"
          {...labelMotion(nodes[2].delay, nodes[2].enter)}
        >
          <motion.div style={depthStyle("far")}>
            <TechLabel>PostgreSQL</TechLabel>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

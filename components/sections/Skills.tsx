"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { skillGroups } from "@/lib/data";

function skillIndex(i: number) {
  return String(i + 1).padStart(2, "0");
}

export function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  const reduce = useReducedMotion();
  const tablistId = useId();
  const panelId = `${tablistId}-panel`;

  return (
    <section id="skills" className="relative section-pad bg-bg-warm py-12 sm:py-14 lg:py-20">
      <div className="container-wide relative min-w-0">
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28">
            <SectionReveal>
              <SectionLabel number="04" label="Tech Stack" />
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <h2 className="mt-4 font-display text-[clamp(1.85rem,6vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] sm:mt-6 lg:mt-8">
                Tools chosen with{" "}
                <span className="font-serif italic font-normal text-accent">intent</span>,
                not fashion.
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.12}>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:mt-5 sm:text-base lg:mt-6">
                A focused stack for shipping serious products — from polished interfaces
                to reliable APIs and durable data models.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.1} className="min-w-0">
            <div className="relative min-w-0 border border-line bg-bg-elevated">
              <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-accent" />

              <div className="p-4 sm:p-6 lg:p-7">
                <div
                  role="tablist"
                  aria-label="Skill categories"
                  className="flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain border-b border-line pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:pb-4 lg:flex-wrap lg:overflow-visible"
                >
                  {skillGroups.map((g, i) => {
                    const selected = active === i;
                    return (
                      <button
                        key={g.label}
                        id={`${tablistId}-tab-${i}`}
                        role="tab"
                        type="button"
                        aria-selected={selected}
                        aria-controls={panelId}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActive(i)}
                        className={`relative shrink-0 rounded-full px-3.5 py-2.5 text-sm transition-colors focus-ring sm:min-h-11 sm:px-4 ${
                          selected
                            ? "bg-ink text-white"
                            : "text-muted hover:bg-bg-warm hover:text-ink"
                        }`}
                      >
                        {g.label}
                        {selected ? (
                          <motion.span
                            layoutId={reduce ? undefined : "skills-tab-accent"}
                            aria-hidden
                            className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent lg:inset-x-4"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={group.label}
                    id={panelId}
                    role="tabpanel"
                    aria-labelledby={`${tablistId}-tab-${active}`}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-5 sm:mt-6"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent sm:text-[12px]">
                      {group.label} · {skillIndex(active)}
                    </p>

                    <ul className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3 lg:hidden">
                      {group.items.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: reduce ? 0 : i * 0.04, duration: 0.28 }}
                          className="min-w-0 border border-line bg-bg px-3 py-3.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="min-w-0 font-display text-base font-semibold leading-snug tracking-tight sm:text-lg">
                              {item}
                            </span>
                            <span className="shrink-0 font-mono text-[10px] text-muted">
                              {skillIndex(i)}
                            </span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>

                    <ul className="mt-5 hidden lg:block">
                      {group.items.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: reduce ? 0 : i * 0.05, duration: 0.35 }}
                          className="group flex items-center justify-between gap-4 border-b border-line py-4 last:border-b-0 last:pb-0"
                          data-cursor="hover"
                        >
                          <span className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent xl:text-[1.75rem]">
                            {item}
                          </span>
                          <span className="font-mono text-xs text-muted">
                            {skillIndex(i)}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

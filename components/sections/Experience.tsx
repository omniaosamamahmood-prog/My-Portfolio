"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative section-pad bg-ink py-12 text-white sm:py-14 lg:py-20"
      data-cursor-surface="dark"
    >
      <div className="section-atmosphere opacity-[0.08]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #0d6e6a 0%, transparent 40%), radial-gradient(circle at 80% 80%, #0d6e6a 0%, transparent 35%)",
          }}
        />
      </div>

      <div className="container-wide relative min-w-0">
        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionReveal>
              <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-white/45 sm:text-[15px] sm:tracking-[0.22em]">
                <span className="text-accent-soft">05</span>
                <span aria-hidden className="h-px w-10 bg-white/25 sm:w-12" />
                <span>Journey</span>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <h2 className="mt-4 font-display text-[clamp(1.85rem,6vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] sm:mt-6 lg:mt-8">
                A path defined by{" "}
                <span className="font-serif italic font-normal text-accent-soft">
                  building
                </span>
                .
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.12}>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50 sm:mt-5 lg:mt-6">
                From learning systems end-to-end to shipping products people rely on —
                the work is the story.
              </p>
            </SectionReveal>
          </div>

          <StaggerGroup className="relative min-w-0">
            <div
              aria-hidden
              className="absolute bottom-2 left-[6px] top-2 w-px bg-white/15 sm:left-[10px]"
            />
            {experience.map((item, index) => (
              <StaggerItem key={item.title}>
                <article
                  className={`relative min-w-0 border-b border-white/10 pl-9 last:border-0 sm:grid sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-6 sm:pl-12 md:gap-8 ${
                    index === 0 ? "pb-5 pt-1 sm:pb-8 sm:pt-0" : "py-5 sm:py-8"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-accent-soft bg-ink sm:top-10 sm:h-3.5 sm:w-3.5"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-soft sm:text-[11px]">
                    {item.year}
                  </p>
                  <div className="mt-1.5 min-w-0 sm:mt-0">
                    <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/45">{item.place}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/60 sm:mt-4">
                      {item.detail}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

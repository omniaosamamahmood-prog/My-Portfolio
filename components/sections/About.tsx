"use client";

import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import { site } from "@/lib/data";

const traits = [
  { label: "Real applications", detail: "Not demos — products with users and constraints." },
  { label: "Full-stack fluency", detail: "UI, APIs, and data modeled as one system." },
  { label: "Continuous learning", detail: "Always sharpening craft and product judgment." },
  { label: "Problem solving", detail: "Turning ambiguity into clear, shippable software." },
];

export function About() {
  return (
    <section id="about" className="relative section-pad bg-bg-warm py-14 sm:py-16 lg:py-24">
      <div className="container-wide min-w-0">
        <SectionReveal>
          <SectionLabel number="02" label="About" />
        </SectionReveal>

        {/* Editorial split: headline + story fill the width — no image, no empty column */}
        <div className="mt-7 grid min-w-0 gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14 xl:gap-20">
          <SectionReveal>
            <h2 className="font-display text-[clamp(1.85rem,6.5vw,4.1rem)] font-bold leading-[1.08] tracking-[-0.03em]">
              More than writing code —{" "}
              <span className="font-serif italic font-normal text-accent">
                shaping how products feel.
              </span>
            </h2>
            <p className="mt-6 font-serif text-lg italic leading-snug text-ink-soft sm:mt-8 sm:text-xl lg:max-w-md">
              I learn by building. Every project is a chance to make complexity feel
              simple for the people who use it.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="space-y-5 text-[0.95rem] leading-relaxed text-ink-soft sm:space-y-6 sm:text-lg lg:pt-2">
              <p>
                I&apos;m {site.name}, a Full-Stack WEB Developer who cares about the whole
                journey from idea to shipped product. Interfaces should feel calm.
                Systems should feel solid. Data should tell a coherent story.
              </p>
              <p>
                I work across the stack — React and Next.js on the frontend, Node.js
                and Express on the backend, PostgreSQL and MongoDB underneath — because
                great products aren&apos;t assembled from isolated layers. They&apos;re
                designed as systems.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:pt-6 sm:text-[11px]">
                <span>Frontend</span>
                <span className="text-line-strong" aria-hidden>
                  /
                </span>
                <span>Backend</span>
                <span className="text-line-strong" aria-hidden>
                  /
                </span>
                <span>Databases</span>
                <span className="text-line-strong" aria-hidden>
                  /
                </span>
                <span>Product</span>
              </div>
            </div>
          </SectionReveal>
        </div>

       
      </div>
    </section>
  );
}

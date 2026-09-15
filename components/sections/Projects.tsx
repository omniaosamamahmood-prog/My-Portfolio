"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Code2, ExternalLink, Server } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ProjectMedia } from "@/components/sections/ProjectMedia";
import { projects } from "@/lib/data";

type Project = (typeof projects)[number];

function projectImage(project: Project): string | undefined {
  return "image" in project && typeof project.image === "string"
    ? project.image
    : undefined;
}

function projectVisual(project: Project) {
  return "visual" in project ? project.visual : undefined;
}

export function Projects() {
  const reduce = useReducedMotion();

  return (
    <section id="projects" className="relative section-pad bg-bg py-10 sm:py-12 lg:py-16">
      <div className="container-wide min-w-0">
        <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="min-w-0 max-w-xl">
            <SectionReveal>
              <SectionLabel number="03" label="Selected Work" />
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-[1.12] tracking-[-0.03em] sm:mt-4">
                Products and systems I&apos;ve built
              </h2>
            </SectionReveal>
          </div>
          <SectionReveal delay={0.12} className="max-w-sm min-w-0 lg:pb-1">
            <p className="text-sm leading-relaxed text-muted sm:text-[0.95rem]">
              A selection of work across{" "}
              <span className="font-serif italic text-ink-soft">frontend, backend, and full-stack</span>{" "}
              development.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:gap-5">
          {projects.map((project, index) => {
            const isApi = project.kind === "api";
            const demo = project.demo;
            const featured = "featured" in project && project.featured;

            return (
              <motion.article
                key={project.name}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -4,
                        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                      }
                }
                className={`group flex min-w-0 flex-col overflow-hidden border bg-bg-elevated transition-[border-color,box-shadow] duration-300 hover:border-accent/70 ${
                  featured ? "border-ink/20" : "border-line"
                }`}
              >
                <ProjectMedia
                  name={project.name}
                  number={project.number}
                  category={project.category}
                  type={project.type}
                  accent={project.accent}
                  image={projectImage(project)}
                  visual={projectVisual(project)}
                />

                <div className="flex min-h-0 flex-1 flex-col p-4 sm:px-5 sm:pb-5 sm:pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
                      {project.number}
                    </span>
                    <span className="text-right font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                      {isApi ? "REST API / Backend" : project.category}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                    {project.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 min-h-[2.6rem] text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-line bg-bg px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-ink-soft transition-colors duration-300 group-hover:border-line-strong sm:text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2.5 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-bg px-4 py-2 text-sm transition hover:border-ink focus-ring"
                    >
                      <Code2 size={14} aria-hidden />
                      GitHub
                    </a>
                    {isApi ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#14120f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a5552] focus-ring"
                        style={{ color: "#ffffff" }}
                      >
                        <Server size={14} aria-hidden />
                        API / Repository
                        <ArrowUpRight
                          size={14}
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    ) : demo ? (
                      <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#14120f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a5552] focus-ring"
                        style={{ color: "#ffffff" }}
                      >
                        Live Demo
                        <ExternalLink
                          size={14}
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { site } from "@/lib/data";

const footerLinks = [
  {
    label: "LinkedIn",
    href: site.linkedin,
    ariaLabel: "Open Omnia's LinkedIn profile",
    icon: <FaLinkedinIn aria-hidden size={16} />,
    external: true,
  },
  {
    label: "GitHub",
    href: site.github,
    ariaLabel: "Open Omnia's GitHub profile",
    icon: <SiGithub aria-hidden size={16} />,
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    ariaLabel: "Send Omnia an email",
    icon: <Mail aria-hidden size={16} strokeWidth={1.8} />,
    external: false,
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();

  return (
    <footer
      className="section-pad border-t border-line bg-ink text-white"
      data-cursor-surface="dark"
    >
      <div className="container-wide flex min-w-0 flex-col gap-8 py-10 sm:gap-10 sm:py-14 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            OMNIA<span className="text-accent-soft">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
            Full-Stack WEB Developer crafting products with clarity, systems thinking,
            and careful craft.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {footerLinks.map(({ label, href, ariaLabel, icon, external }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={ariaLabel}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              whileHover={reduce ? undefined : { y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-accent-soft/50 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                {icon}
              </span>
            </motion.a>
          ))}
          <a
            href="#top"
            className="link-underline ml-1 inline-flex min-h-11 items-center text-sm text-white/60 hover:text-white"
          >
            Back to top
          </a>
        </div>
      </div>

      <div className="container-wide flex min-w-0 flex-col gap-2 border-t border-white/10 py-5 text-xs text-white/40 sm:flex-row sm:justify-between sm:py-6">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="font-mono uppercase tracking-[0.18em]">Built with Next.js</p>
      </div>
    </footer>
  );
}

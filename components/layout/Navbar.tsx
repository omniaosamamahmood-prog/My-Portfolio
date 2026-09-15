"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { navLinks, site } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;
const OPEN_MS = 420;
const CLOSE_MS = 320;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const reduce = useReducedMotion();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    toggleRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeThenGo = (href: string) => {
    if (closingRef.current) return;
    closingRef.current = true;
    setOpen(false);

    const delay = reduce ? 0 : CLOSE_MS;
    window.setTimeout(() => {
      closingRef.current = false;
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
          window.history.replaceState(null, "", href);
          return;
        }
      }
      window.location.assign(href);
    }, delay);
  };

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[60] section-pad"
      >
        <div
          className={`mx-auto mt-3 flex w-full max-w-[1280px] min-w-0 items-center justify-between gap-3 overflow-hidden rounded-full border px-3 py-3 transition-all duration-500 sm:mt-4 sm:px-5 sm:py-3.5 ${
            scrolled || open
              ? "border-line bg-bg-elevated/90 shadow-[0_8px_40px_-20px_rgba(20,18,15,0.25)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="shrink-0 rounded-sm font-display text-[1.7rem] font-bold leading-none tracking-tight focus-ring sm:text-[2rem] lg:text-[2.15rem]"
            aria-label={`${site.name} — home`}
            onClick={(e) => {
              if (!open) return;
              e.preventDefault();
              closeThenGo("#top");
            }}
          >
            OMNIA
            <span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3 py-2 text-[17px] transition-colors focus-ring ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#contact"
              className="hidden min-h-12 items-center rounded-full bg-[#14120f] px-5 py-2.5 text-[17px] font-semibold text-white transition hover:bg-[#0a5552] focus-ring md:inline-flex"
              style={{ color: "#ffffff" }}
            >
              Hire Me
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-elevated/80 focus-ring lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-[18px]" aria-hidden>
                <motion.span
                  className="absolute left-0 top-1/2 block h-[1.5px] w-full origin-center rounded-full bg-ink"
                  animate={
                    open
                      ? { rotate: 45, y: "-50%" }
                      : { rotate: 0, y: "calc(-50% - 5px)" }
                  }
                  transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 block h-[1.5px] w-full origin-center rounded-full bg-ink"
                  animate={
                    open
                      ? { opacity: 0, scaleX: 0.4 }
                      : { opacity: 1, scaleX: 1, y: "-50%" }
                  }
                  transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 block h-[1.5px] w-full origin-center rounded-full bg-ink"
                  animate={
                    open
                      ? { rotate: -45, y: "-50%" }
                      : { rotate: 0, y: "calc(-50% + 5px)" }
                  }
                  transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[55] lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.28, ease: EASE }}
          >
            {/* Soft dim — tap outside the sheet to close */}
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-ink/15"
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto overscroll-contain bg-bg shadow-[0_24px_60px_-30px_rgba(20,18,15,0.35)]"
              initial={
                reduce
                  ? false
                  : {
                      clipPath: "inset(0 0 100% 0)",
                      opacity: 0.96,
                    }
              }
              animate={{
                clipPath: "inset(0 0 0% 0)",
                opacity: 1,
              }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : {
                      clipPath: "inset(0 0 100% 0)",
                      opacity: 0.98,
                    }
              }
              transition={{
                duration: reduce ? 0.15 : OPEN_MS / 1000,
                ease: EASE,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent draw line under navbar band */}
              <motion.div
                aria-hidden
                className="mx-auto mt-[4.75rem] h-px w-[min(100%-2rem,1280px)] origin-left bg-accent sm:mt-[5.25rem]"
                initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={reduce ? undefined : { scaleX: 0, opacity: 0 }}
                transition={{
                  duration: reduce ? 0 : 0.45,
                  delay: reduce ? 0 : 0.12,
                  ease: EASE,
                }}
              />

              <nav
                className="mx-auto flex w-full max-w-[1280px] min-w-0 flex-col px-5 pb-10 pt-8 sm:px-8 sm:pt-10"
                aria-label="Mobile"
              >
                <motion.p
                  className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{
                    duration: 0.3,
                    delay: reduce ? 0 : 0.14,
                    ease: EASE,
                  }}
                >
                  Menu
                </motion.p>

                {navLinks.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        closeThenGo(link.href);
                      }}
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        reduce
                          ? undefined
                          : {
                              opacity: 0,
                              y: -8,
                              transition: {
                                duration: 0.18,
                                delay: (navLinks.length - 1 - i) * 0.03,
                                ease: EASE,
                              },
                            }
                      }
                      transition={{
                        duration: 0.4,
                        delay: reduce ? 0 : 0.18 + i * 0.055,
                        ease: EASE,
                      }}
                      className="group relative flex min-h-14 min-w-0 items-baseline justify-between gap-4 border-b border-line py-4 focus-ring"
                    >
                      <span className="flex min-w-0 items-baseline gap-3 sm:gap-4">
                        <span className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-muted transition-colors group-hover:text-accent">
                          0{i + 1}
                        </span>
                        <span
                          className={`font-display text-[clamp(1.75rem,8vw,2.5rem)] font-semibold tracking-tight transition-colors ${
                            isActive ? "text-accent" : "text-ink group-hover:text-accent"
                          }`}
                        >
                          {link.label}
                        </span>
                      </span>
                      <motion.span
                        aria-hidden
                        className="hidden h-px w-8 origin-right bg-accent sm:block"
                        initial={reduce ? false : { scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        whileHover={reduce ? undefined : { scaleX: 1 }}
                        transition={{ duration: 0.28, ease: EASE }}
                      />
                    </motion.a>
                  );
                })}

                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    closeThenGo("#contact");
                  }}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{
                    duration: 0.35,
                    delay: reduce ? 0 : 0.18 + navLinks.length * 0.055,
                    ease: EASE,
                  }}
                  className="mt-8 inline-flex min-h-12 w-fit items-center rounded-full bg-[#14120f] px-7 py-3.5 text-[17px] font-semibold text-white focus-ring"
                  style={{ color: "#ffffff" }}
                >
                  Hire Me
                </motion.a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

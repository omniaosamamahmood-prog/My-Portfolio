"use client";

import { motion, useReducedMotion } from "motion/react";

type AnimatedTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
};

export function AnimatedWords({
  text,
  className = "",
  as = "h1",
  delay = 0,
}: AnimatedTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  const Tag = motion[as];

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function AnimatedLines({
  lines,
  className = "",
  delay = 0,
  active = true,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  /** When false, lines stay hidden until activated (e.g. after intro). */
  active?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <h1 className={className}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={{ y: "108%" }}
            animate={active ? { y: "0%" } : { y: "108%" }}
            transition={{
              duration: 0.85,
              delay: active ? delay + i * 0.1 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

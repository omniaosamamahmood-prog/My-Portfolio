"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  download?: boolean | string;
  type?: "button" | "submit";
  external?: boolean;
  disabled?: boolean;
};

const variantClass = {
  primary:
    "border border-transparent bg-[#14120f] hover:bg-[#0a5552] focus-visible:outline-[#0d6e6a]",
  secondary:
    "border border-[#14120f]/30 bg-[#fffcf8] text-[#14120f] hover:border-[#14120f] hover:bg-[#14120f] hover:text-white",
  ghost:
    "border border-[#c8bfb0] bg-transparent text-[#14120f] hover:border-[#14120f] hover:bg-[#fffcf8]",
};

const variantStyle: Record<"primary" | "secondary" | "ghost", CSSProperties> = {
  primary: { color: "#ffffff", backgroundColor: "#14120f" },
  secondary: { color: "#14120f", backgroundColor: "#fffcf8" },
  ghost: { color: "#14120f", backgroundColor: "transparent" },
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  download,
  type = "button",
  external,
  disabled = false,
}: Props) {
  const reduce = useReducedMotion();
  const classes = `group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[15px] font-semibold tracking-wide transition-colors duration-300 focus-ring disabled:pointer-events-none disabled:opacity-50 ${variantClass[variant]} ${className}`;

  const content = (
    <span
      className="relative z-10 inline-flex items-center gap-2"
      style={variant === "primary" ? { color: "#ffffff" } : undefined}
    >
      {children}
    </span>
  );

  const motionProps = reduce
    ? {}
    : {
        whileHover: { y: -2 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 400, damping: 25 },
      };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        style={variantStyle[variant]}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      style={variantStyle[variant]}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}

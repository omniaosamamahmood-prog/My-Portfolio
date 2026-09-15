"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

type CursorTone = "on-light" | "on-dark";

function subscribeFinePointer(onChange: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function parseCssColor(input: string): { r: number; g: number; b: number; a: number } | null {
  const value = input.trim().toLowerCase();
  if (!value || value === "transparent") return null;

  const rgba = value.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/,
  );
  if (rgba) {
    return {
      r: Number(rgba[1]),
      g: Number(rgba[2]),
      b: Number(rgba[3]),
      a: rgba[4] === undefined ? 1 : Number(rgba[4]),
    };
  }

  const modern = value.match(
    /^rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/,
  );
  if (modern) {
    const alphaRaw = modern[4];
    let a = 1;
    if (alphaRaw !== undefined) {
      a = alphaRaw.endsWith("%") ? Number(alphaRaw.slice(0, -1)) / 100 : Number(alphaRaw);
    }
    return {
      r: Number(modern[1]),
      g: Number(modern[2]),
      b: Number(modern[3]),
      a,
    };
  }

  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) {
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const int = Number.parseInt(h.slice(0, 6), 16);
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255,
      a: h.length === 8 ? Number.parseInt(h.slice(6, 8), 16) / 255 : 1,
    };
  }

  return null;
}

function relativeLuminance(r: number, g: number, b: number) {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Inspect the stack under the pointer and decide whether the cursor
 * should render as dark-on-light or light-on-dark.
 */
function sampleCursorTone(clientX: number, clientY: number): CursorTone {
  const stack = document.elementsFromPoint(clientX, clientY);

  for (const node of stack) {
    if (!(node instanceof HTMLElement)) continue;
    if (node.dataset.cursorIgnore === "true") continue;

    const surface = node.dataset.cursorSurface;
    if (surface === "dark") return "on-dark";
    if (surface === "light") return "on-light";

    const tag = node.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS") {
      // Photos / media: prefer a light cursor for reliable contrast.
      return "on-dark";
    }

    const style = window.getComputedStyle(node);
    const bg = parseCssColor(style.backgroundColor);
    if (!bg || bg.a < 0.45) continue;

    const lum = relativeLuminance(bg.r, bg.g, bg.b);

    // Teal / saturated accents: pick the higher-contrast ink.
    const max = Math.max(bg.r, bg.g, bg.b);
    const min = Math.min(bg.r, bg.g, bg.b);
    const sat = max === 0 ? 0 : (max - min) / max;
    if (sat > 0.35 && lum > 0.2 && lum < 0.65) {
      return lum < 0.45 ? "on-dark" : "on-light";
    }

    return lum < 0.42 ? "on-dark" : "on-light";
  }

  return "on-light";
}

const toneStyles = {
  "on-light": {
    border: "rgba(20, 18, 15, 0.45)",
    fill: "rgba(13, 110, 106, 0.22)",
    core: "rgba(20, 18, 15, 0.88)",
  },
  "on-dark": {
    border: "rgba(255, 252, 248, 0.7)",
    fill: "rgba(213, 235, 233, 0.28)",
    core: "rgba(255, 252, 248, 0.95)",
  },
} as const;

export function CustomCursor() {
  const reduceHook = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFinePointer, getFinePointer, () => false);
  const prefersReduce = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );
  const enabled = fine && !prefersReduce && !reduceHook;

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tone, setTone] = useState<CursorTone>("on-light");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });

  const rafSample = useRef<number | null>(null);
  const latestPoint = useRef({ x: 0, y: 0 });
  const toneRef = useRef<CursorTone>("on-light");

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("cursor-none-desktop");
      return;
    }

    const scheduleSample = () => {
      if (rafSample.current !== null) return;
      rafSample.current = window.requestAnimationFrame(() => {
        rafSample.current = null;
        const next = sampleCursorTone(latestPoint.current.x, latestPoint.current.y);
        if (next !== toneRef.current) {
          toneRef.current = next;
          setTone(next);
        }
      });
    };

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      latestPoint.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      scheduleSample();
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor='hover']");
      setHovering(Boolean(interactive));
      scheduleSample();
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    document.documentElement.classList.add("cursor-none-desktop");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("cursor-none-desktop");
      if (rafSample.current !== null) {
        window.cancelAnimationFrame(rafSample.current);
      }
    };
  }, [enabled, x, y]);

  if (!enabled || !visible) return null;

  const colors = toneStyles[tone];

  return (
    <motion.div
      aria-hidden
      data-cursor-ignore="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        data-cursor-ignore="true"
        className="rounded-full border backdrop-blur-[1px]"
        animate={{
          width: hovering ? 42 : 9,
          height: hovering ? 42 : 9,
          opacity: hovering ? 0.95 : 0.88,
          borderColor: colors.border,
          backgroundColor: colors.fill,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 24 },
          height: { type: "spring", stiffness: 300, damping: 24 },
          opacity: { duration: 0.2 },
          borderColor: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          backgroundColor: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
        }}
      />
      {/* Inner core for guaranteed contrast on both surfaces */}
      <motion.div
        data-cursor-ignore="true"
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
        animate={{
          width: hovering ? 6 : 3,
          height: hovering ? 6 : 3,
          marginLeft: hovering ? -3 : -1.5,
          marginTop: hovering ? -3 : -1.5,
          backgroundColor: colors.core,
          opacity: hovering ? 0.95 : 1,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 24 },
          height: { type: "spring", stiffness: 300, damping: 24 },
          backgroundColor: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.2 },
        }}
      />
    </motion.div>
  );
}

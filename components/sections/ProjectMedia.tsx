"use client";

import Image from "next/image";

type ProjectVisual = "yummy" | "taskflow" | "api";

type ProjectMediaProps = {
  name: string;
  number: string;
  category: string;
  type: string;
  accent: string;
  image?: string;
  visual?: ProjectVisual;
};

function CoverFallback({
  name,
  number,
  category,
  accent,
  visual,
}: {
  name: string;
  number: string;
  category: string;
  accent: string;
  visual?: ProjectVisual;
}) {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-4 sm:p-5"
      style={{
        background: `linear-gradient(145deg, ${accent} 0%, #1a1a18 58%, #0f0e0c 100%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {visual === "yummy" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #f0a070 0%, transparent 70%)" }}
        />
      )}

      {visual === "taskflow" && (
        <div aria-hidden className="pointer-events-none absolute right-4 top-10 hidden w-36 grid-cols-3 gap-1.5 opacity-50 sm:grid">
          {["To Do", "Doing", "Done"].map((col) => (
            <div key={col} className="space-y-1">
              <div className="h-px w-full bg-white/30" />
              <div className="h-7 border border-white/15 bg-white/10" />
              <div className="h-5 border border-white/10 bg-white/5" />
            </div>
          ))}
        </div>
      )}

      {visual === "api" && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-9 hidden space-y-1.5 font-mono text-[10px] text-white/45 sm:block"
        >
          <p>POST /api/auth/login</p>
          <p>GET /api/categories</p>
          <p>CRUD /api/games</p>
        </div>
      )}

      {!visual && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-4 flex h-10 items-end gap-1 opacity-50"
        >
          {[40, 64, 48, 80, 56, 72].map((h, i) => (
            <span
              key={i}
              className="w-1.5 bg-white/35"
              style={{ height: `${h * 0.35}px` }}
            />
          ))}
        </div>
      )}

      <div className="relative flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/70">{number}</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
          {category}
        </span>
      </div>

      <div className="relative">
        <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]">
          {name}
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/50">
          {visual === "api" ? "REST API / Backend" : visual === "yummy" ? "Recipe Discovery" : visual === "taskflow" ? "Project Management" : "Personal Finance"}
        </p>
      </div>
    </div>
  );
}

export function ProjectMedia({
  name,
  number,
  category,
  type,
  accent,
  image,
  visual,
}: ProjectMediaProps) {
  return (
    <div className="relative h-[168px] w-full overflow-hidden bg-bg-warm sm:h-[188px] lg:h-[200px]">
      {image ? (
        <Image
          src={image}
          alt={`${name} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <CoverFallback
          name={name}
          number={number}
          category={category}
          accent={accent}
          visual={visual}
        />
      )}
      <span className="sr-only">{type}</span>
    </div>
  );
}

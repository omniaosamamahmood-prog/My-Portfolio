import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared Open Graph / Twitter preview — editorial warm beige / ink / teal. */
export function createOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f2ec",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft teal glow */}
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "80px",
            width: "420px",
            height: "420px",
            borderRadius: "420px",
            background:
              "radial-gradient(circle, rgba(13,110,106,0.16) 0%, rgba(13,110,106,0) 70%)",
            display: "flex",
          }}
        />

        {/* Subtle grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(200,191,176,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,191,176,0.35) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            opacity: 0.45,
            display: "flex",
          }}
        />

        {/* Top meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6b655c",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            <span style={{ color: "#0d6e6a" }}>01</span>
            <span
              style={{
                width: 28,
                height: 1,
                background: "#c8bfb0",
                display: "flex",
              }}
            />
            <span>Portfolio</span>
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 48,
              background: "#14120f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 22,
                border: "2.5px solid #f5f2ec",
                display: "flex",
              }}
            />
          </div>
        </div>

        {/* Brand stage */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
              color: "#14120f",
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
            }}
          >
            <span>OMNIA</span>
            <span>OSAMA</span>
          </div>

          <div
            style={{
              width: 160,
              height: 3,
              background: "#0d6e6a",
              display: "flex",
            }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#14120f",
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
            }}
          >
            <span style={{ color: "#0d6e6a" }}>Full-Stack</span>
            <span style={{ margin: "0 14px", color: "#c8bfb0" }}>·</span>
            <span>Web Developer</span>
          </div>

          <div
            style={{
              maxWidth: 720,
              fontSize: 28,
              fontStyle: "italic",
              lineHeight: 1.35,
              color: "#3d3a34",
              fontFamily: 'ui-serif, Georgia, "Times New Roman", serif',
            }}
          >
            Building digital products that feel simple.
          </div>
        </div>

        {/* Bottom rail */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid #ddd6ca",
            paddingTop: 28,
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6b655c",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          <span>React · Next.js · Node.js · PostgreSQL</span>
          <span style={{ color: "#0d6e6a" }}>Available for work</span>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}

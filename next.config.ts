import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.CODEX_AUDIT_DIST_DIR ?? ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

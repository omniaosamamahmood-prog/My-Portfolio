import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-space",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Omnia Osama — Full-Stack WEB Developer",
    template: "%s · Omnia Osama",
  },
  description:
    "Portfolio of Omnia Osama — Full-Stack WEB Developer building digital products with React, Next.js, Node.js, TypeScript, and modern databases.",
  keywords: [
    "Omnia Osama",
    "Full-Stack WEB Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Omnia Osama" }],
  creator: "Omnia Osama",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Omnia Osama — Full-Stack WEB Developer",
    description:
      "I build digital products that make complex things feel simple. Full-stack craft across frontend, backend, and databases.",
    siteName: "Omnia Osama",
    images: [
      {
        url: "https://res.cloudinary.com/dg9o5j2ti/image/upload/v1789245680/2cd0a1f9-be09-4eaa-9ab3-b8c776fe7237_mzg5yt.jpg",
        width: 800,
        height: 800,
        alt: "Omnia Osama",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omnia Osama — Full-Stack WEB Developer",
    description:
      "I build digital products that make complex things feel simple.",
    images: [
      "https://res.cloudinary.com/dg9o5j2ti/image/upload/v1789245680/2cd0a1f9-be09-4eaa-9ab3-b8c776fe7237_mzg5yt.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrument.variable} ${dmSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg font-body text-ink">{children}</body>
    </html>
  );
}

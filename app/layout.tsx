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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const metadata: Metadata = {
  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        alternates: { canonical: "/" },
      }
    : {}),
  title: {
    default: "Omnia Osama | Full-Stack Web Developer",
    template: "%s | Omnia Osama",
  },
  description:
    "Omnia Osama is a Full-Stack Web Developer building modern, scalable web applications with React, Next.js, Node.js, and PostgreSQL.",
  applicationName: "Omnia Osama",
  authors: [{ name: "Omnia Osama" }],
  creator: "Omnia Osama",
  publisher: "Omnia Osama",
  keywords: [
    "Omnia Osama",
    "Full-Stack Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Omnia Osama | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer building modern, scalable web applications with React, Next.js, Node.js, and PostgreSQL.",
    siteName: "Omnia Osama",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omnia Osama | Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer building modern, scalable web applications with React, Next.js, Node.js, and PostgreSQL.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "portfolio",
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

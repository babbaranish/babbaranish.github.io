import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://anishbabbar.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anish Babbar — Full-Stack Developer & Team Lead",
    template: "%s | Anish Babbar",
  },
  description:
    "Full-stack developer and team lead with 5+ years of experience building scalable, high-performance applications using React, Node.js, Express, AWS, and TypeScript. Currently leading 10+ engineers at Masters' Union.",
  keywords: [
    "Anish Babbar", "Full-Stack Developer", "Team Lead", "React Developer",
    "Node.js Developer", "Software Engineer", "AWS", "TypeScript",
    "Portfolio", "Jalandhar", "India", "Masters Union",
  ],
  authors: [{ name: "Anish Babbar", url: siteUrl }],
  creator: "Anish Babbar",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Anish Babbar — Full-Stack Developer & Team Lead",
    description: "Full-stack developer with 5+ years building scalable apps with React, Node.js, and AWS. Leading 10+ engineers at Masters' Union.",
    siteName: "Anish Babbar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Babbar — Full-Stack Developer & Team Lead",
    description: "Full-stack developer with 5+ years building scalable apps with React, Node.js, and AWS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      className={`${displayFont.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        {/* Grain overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-50"
          style={{
            opacity: "var(--grain-opacity)",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        {children}
      </body>
    </html>
  );
}

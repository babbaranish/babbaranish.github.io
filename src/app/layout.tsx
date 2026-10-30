import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://anishbabbar.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anish Babbar · Full-stack developer and team lead",
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
    title: "Anish Babbar · Full-stack developer and team lead",
    description: "Full-stack developer with 5+ years building scalable apps with React, Node.js, and AWS. Leading 10+ engineers at Masters' Union.",
    siteName: "Anish Babbar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Babbar · Full-stack developer and team lead",
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
      className={`${dmSans.variable} ${monoFont.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

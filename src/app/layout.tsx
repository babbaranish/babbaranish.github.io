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
const DESCRIPTION =
  "Full-stack developer and team lead at Masters' Union, leading 10+ engineers. I build React, Node.js and AWS tools for leads, inventory, payments and travel.";
const OG_ALT = "Anish Babbar, full-stack developer and team lead at Masters' Union";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anish Babbar · Full-stack developer and team lead",
    template: "%s | Anish Babbar",
  },
  description: DESCRIPTION,
  keywords: [
    "Anish Babbar", "Full-Stack Developer", "Team Lead", "React Developer",
    "Node.js Developer", "Software Engineer", "AWS", "TypeScript",
    "Portfolio", "Abohar", "Punjab", "India", "Masters Union",
  ],
  authors: [{ name: "Anish Babbar", url: siteUrl }],
  creator: "Anish Babbar",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Anish Babbar · Full-stack developer and team lead",
    description: DESCRIPTION,
    siteName: "Anish Babbar Portfolio",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "/og.png", alt: OG_ALT }],
    title: "Anish Babbar · Full-stack developer and team lead",
    description: DESCRIPTION,
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
        {/* Without JavaScript, entrance animations never run: show everything as final */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}[style*="clip-path"]{clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

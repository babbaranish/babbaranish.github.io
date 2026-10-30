"use client";

import { MotionConfig } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import { JsonLd } from "@/components/JsonLd";

// Editor shell: explorer sidebar on the left (top bar on mobile), files in the main
// column, a fixed status bar at the bottom and a Cmd+K command palette on top.
export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <JsonLd />
      <ScrollProgress />
      <div className="lg:grid lg:grid-cols-[256px_minmax(0,1fr)]">
        <Nav />
        <div className="min-w-0 pb-8 lg:border-l lg:border-hairline">
          <main id="content" tabIndex={-1} className="outline-none">
            <Hero />
            <Skills />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
      <StatusBar />
      <CommandPalette />
    </MotionConfig>
  );
}

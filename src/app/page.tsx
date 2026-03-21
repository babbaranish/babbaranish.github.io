"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <main>
      <JsonLd />
      <Nav />
      <Hero />
      <Skills />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}

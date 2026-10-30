"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE } from "./motion";

export type FileId = "top" | "skills" | "about" | "experience" | "projects" | "contact";

// Every section is a file in the editor. The id is the anchor, file is the tab name,
// path is shown dimmed in front of it (like a breadcrumb).
export const FILES: { id: FileId; file: string; path: string; label: string }[] = [
  { id: "top", file: "anish.ts", path: "src/", label: "Home" },
  { id: "skills", file: "skills.json", path: "src/", label: "Skills" },
  { id: "about", file: "about.md", path: "", label: "About" },
  { id: "experience", file: "experience.ts", path: "src/", label: "Experience" },
  { id: "projects", file: "projects.json", path: "src/", label: "Projects" },
  { id: "contact", file: "contact.sh", path: "scripts/", label: "Contact" },
];

type SectionProps = {
  id: Exclude<FileId, "top">;
  title: string; // visible h2, e.g. "Skills"
  children: ReactNode;
};

const TYPE_MS = 40; // time per character when the file name types itself in

// A file pane: a breadcrumb header whose file name types in once it scrolls into view,
// a sr-friendly h2, then the content, which fades and rises in once.
export default function Section({ id, title, children }: SectionProps) {
  const f = FILES.find((x) => x.id === id)!;
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const inView = useInView(headerRef, { once: true });
  const [typed, setTyped] = useState(0);
  const shown = reduce ? f.file.length : typed;
  const typing = inView && shown < f.file.length;

  useEffect(() => {
    if (!inView || reduce) return;
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setTyped(count);
      if (count >= f.file.length) window.clearInterval(timer);
    }, TYPE_MS);
    return () => window.clearInterval(timer);
  }, [inView, reduce, f.file]);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="file-pane border-t border-hairline">
      <header ref={headerRef} className="flex h-10 items-center gap-3 border-b border-hairline bg-card px-4 sm:px-6">
        <span className="meta">
          {f.path}
          <span aria-hidden="true" className="text-fg">
            {f.file.slice(0, shown)}
          </span>
          {typing && <span aria-hidden="true" className="ml-0.5 inline-block h-3 w-1.5 bg-accent align-middle" />}
          <span className="sr-only">{f.file}</span>
        </span>
        <h2 id={`${id}-title`} className="ml-auto text-[12px] leading-4 text-fg-muted">
          {title}
        </h2>
      </header>
      <motion.div
        className="px-4 py-10 sm:px-6 lg:px-10 lg:py-16"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {children}
      </motion.div>
    </section>
  );
}

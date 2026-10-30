"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { EASE } from "./motion";

type Theme = "light" | "dark";

const readTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

// The page attribute is the single source of truth, so every toggle on the page
// (sidebar, mobile header, command palette) stays in sync.
export function toggleTheme() {
  const next: Theme = readTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (!theme) return <div className="h-8 w-8" />;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline-strong text-fg-muted transition-colors hover:bg-raised hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="inline-flex"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          {theme === "dark" ? (
            <Sun size={16} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Moon size={16} strokeWidth={1.5} aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

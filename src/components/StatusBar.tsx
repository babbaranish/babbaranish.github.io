"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, GitBranch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "./motion";
import { FILES } from "./Section";
import { STATUS_MESSAGE_EVENT, openPalette, useActiveSection } from "./useActiveSection";

const STATUS_MESSAGE_MS = 2500;

// Fake editor cursor: one line per 24px of scroll, one column per scrolled pixel (wraps at 80)
function cursorFromScroll(scrollY: number) {
  return {
    line: Math.max(1, Math.round(scrollY / 24) + 1),
    col: 1 + (Math.round(scrollY) % 80),
  };
}

// Editor status bar pinned to the bottom of the viewport.
export default function StatusBar() {
  const active = useActiveSection();
  const f = FILES.find((x) => x.id === active);

  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const [message, setMessage] = useState<string | null>(null);
  const messageTimer = useRef<number | undefined>(undefined);

  // Update the cursor on scroll, at most once per frame
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = cursorFromScroll(window.scrollY);
      setCursor((prev) => (prev.line === next.line && prev.col === next.col ? prev : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Show messages sent with showStatus() for a moment, then clear them
  useEffect(() => {
    const onStatus = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      window.clearTimeout(messageTimer.current);
      messageTimer.current = window.setTimeout(() => setMessage(null), STATUS_MESSAGE_MS);
    };
    window.addEventListener(STATUS_MESSAGE_EVENT, onStatus);
    return () => {
      window.removeEventListener(STATUS_MESSAGE_EVENT, onStatus);
      window.clearTimeout(messageTimer.current);
    };
  }, []);

  return (
    <motion.footer
      aria-label="Status bar"
      initial={{ y: 32 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
      className="fixed inset-x-0 bottom-0 z-40 flex h-8 items-center justify-between gap-4 border-t border-hairline bg-card px-3 text-[12px] leading-4 text-fg-muted"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex items-center gap-1.5 text-fg-secondary">
          <GitBranch size={14} strokeWidth={1.5} aria-hidden="true" />
          main
        </span>
        <AnimatePresence mode="wait">
          {message ? (
            <motion.span
              key="message"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15, ease: EASE }}
              className="flex items-center gap-1.5 text-accent"
            >
              <Check size={14} strokeWidth={1.5} aria-hidden="true" />
              {message}
            </motion.span>
          ) : (
            <motion.span
              key="problems"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15, ease: EASE }}
              className="flex items-center gap-2"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              0 problems
            </motion.span>
          )}
        </AnimatePresence>
        <span className="hidden truncate empty:hidden sm:inline">
          <AnimatePresence mode="wait">
            {f && (
              <motion.span
                key={f.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="inline-block"
              >
                {f.path}
                <span className="text-fg-secondary">{f.file}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="hidden tabular-nums sm:inline">
          Ln {cursor.line}, Col {cursor.col}
        </span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden md:inline">TypeScript React</span>
        <span className="hidden lg:inline">Abohar, Punjab</span>
        <button
          type="button"
          onClick={openPalette}
          className="flex items-center gap-2 rounded px-2 py-1 text-fg-secondary transition-colors hover:bg-raised hover:text-fg"
        >
          Jump to
          <kbd className="kbd">⌘K</kbd>
        </button>
      </div>
    </motion.footer>
  );
}

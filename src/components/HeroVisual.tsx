"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "./motion";

const items = [
  {
    name: "Lead Matrix",
    detail: "Lead capture, tracking and distribution",
    when: "2025",
  },
  {
    name: "Inventory management",
    detail: "Company-wide, with real-time asset tracking",
    when: "2025",
  },
  {
    name: "Orbit",
    detail: "Tasks, finance, inventory and travel in one platform",
    when: "2023–25",
  },
  {
    name: "Travel management",
    detail: "1,500+ requests handled",
    when: "2023–25",
  },
  {
    name: "GetPrepped",
    detail: "Mentoring app, published on Google Play",
    when: "2023–25",
  },
  {
    name: "Leadership reporting tool",
    detail: "Built with Redux, cut manual work by 40%",
    when: "2023",
  },
];

const COMMAND = "git log --oneline --author=anish";
const SPINNER = ["⠋", "⠙", "⠹", "⠸"];

// Timings in ms, each step counted from the start of its phase
const START_DELAY = 700;
const CHAR_DELAY = 35;
const SPIN_STEP = 90;
const WORKING_TIME = 360;
const ROW_STEP = 110;

// idle -> typing -> working -> rows -> done
type Phase = "idle" | "typing" | "working" | "rows" | "done";

export default function HeroVisual() {
  const reduce = useReducedMotion() === true;
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [spinFrame, setSpinFrame] = useState(0);
  const [rowsShown, setRowsShown] = useState(0);

  // One timer per step of the current phase; all are cleared on phase change and unmount
  useEffect(() => {
    if (reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, ms));
    };

    switch (phase) {
      case "idle":
        later(START_DELAY, () => setPhase("typing"));
        break;
      case "typing":
        for (let i = 1; i <= COMMAND.length; i++) {
          later(i * CHAR_DELAY, () => setTypedChars(i));
        }
        later(COMMAND.length * CHAR_DELAY, () => setPhase("working"));
        break;
      case "working":
        for (let i = 1; i < SPINNER.length; i++) {
          later(i * SPIN_STEP, () => setSpinFrame(i));
        }
        later(WORKING_TIME, () => setPhase("rows"));
        break;
      case "rows":
        for (let i = 0; i < items.length; i++) {
          later(i * ROW_STEP, () => setRowsShown(i + 1));
        }
        later(items.length * ROW_STEP, () => setPhase("done"));
        break;
      case "done":
        break;
    }

    return () => timers.forEach(clearTimeout);
  }, [phase, reduce]);

  // Reduced motion: skip straight to the final state
  const chars = reduce ? COMMAND.length : typedChars;
  const commandLive = !reduce && (phase === "idle" || phase === "typing");
  const showWorking = !reduce && phase === "working";
  const rowCount = reduce ? items.length : rowsShown;
  const showPrompt = reduce || phase === "done";

  return (
    <figure
      aria-label="Selected things Anish has shipped"
      className="min-w-0 overflow-hidden rounded-lg border border-hairline-strong bg-card"
    >
      <div className="flex h-9 items-center justify-between border-b border-hairline px-4">
        <span className="meta">terminal</span>
        <span className="meta">zsh</span>
      </div>
      <div className="p-4 text-[13px] leading-6">
        <div aria-hidden="true">
          <p>
            <span className="text-accent">$</span> <span className="text-fg">{COMMAND.slice(0, chars)}</span>
            {commandLive && <span className="caret" />}
          </p>
          {/* All rows stay mounted so the panel height is fixed from the first render */}
          <div className="relative mt-2">
            {/* Spinner overlays the first row's line; that row is still hidden while working */}
            {showWorking && (
              <p className="absolute inset-x-0 top-0">
                <span className="text-accent">{SPINNER[spinFrame]}</span>
                <span className="text-fg-muted"> reading history</span>
              </p>
            )}
            <ol>
              {items.map((item, i) => {
                const shown = i < rowCount;
                return (
                  <motion.li
                    key={item.name}
                    className="grid grid-cols-[64px_minmax(0,1fr)] gap-3"
                    initial={false}
                    animate={{ opacity: shown ? 1 : 0, x: shown ? 0 : -4 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    <span className="tok-n tabular-nums">{item.when}</span>
                    <span>
                      <span className="tok-f">{item.name}</span>{" "}
                      <span className="text-fg-secondary">{item.detail}</span>
                    </span>
                  </motion.li>
                );
              })}
            </ol>
          </div>
          {/* Reserved line for the final prompt; invisible until done */}
          <p className={`mt-2 h-6${showPrompt ? "" : " invisible"}`}>
            <span className="text-accent">$</span> {showPrompt && <span className="caret" />}
          </p>
        </div>
        <div className="sr-only">
          <p>$ {COMMAND}</p>
          <ul>
            {items.map((item) => (
              <li key={item.name}>
                {item.when}, {item.name}: {item.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

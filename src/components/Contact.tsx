"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Section from "./Section";
import { K, C } from "./code";
import { EASE, Reveal } from "./motion";
import { showStatus } from "./useActiveSection";

const EMAIL = "anishbabbar1@gmail.com";

const links = [
  { cmd: "call", display: "+91 95699 22968", href: "tel:+919569922968", external: false },
  { cmd: "open", display: "linkedin.com/in/babbaranish", href: "https://linkedin.com/in/babbaranish", external: true },
  { cmd: "open", display: "github.com/babbaranish", href: "https://github.com/babbaranish", external: true },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  // Each command line clips in left to right once, staggered by its position in the list
  const clipIn = (i: number) => ({
    initial: reduce ? false : { clipPath: "inset(0 100% 0 0)" },
    whileInView: reduce ? undefined : { clipPath: "inset(0 0% 0 0)" },
    viewport: { once: true },
    transition: { duration: 0.45, delay: 0.1 + i * 0.25, ease: "linear" as const },
  });

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard unavailable (e.g. insecure context): the mailto link still works.
      return;
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setCopied(true);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
    showStatus(`Copied ${EMAIL} to clipboard`);
  }

  return (
    <Section id="contact" title="Contact">
      <div className="max-w-[48rem]">
        <p className="text-[13px] text-fg-muted">#!/usr/bin/env bash</p>
        <p className="text-[13px]">
          <C># Reach me by email or phone, or find me on LinkedIn and GitHub.</C>
        </p>

        <Reveal>
          <p className="mt-8 text-[13px]">
            <span className="text-accent">$</span> <span className="text-fg">echo $EMAIL</span>
          </p>
          <motion.div
            className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
          >
            <a
              href={`mailto:${EMAIL}`}
              className="text-[24px] font-medium tracking-[-0.02em] text-fg bg-[linear-gradient(currentColor,currentColor),linear-gradient(var(--hairline-strong),var(--hairline-strong))] bg-[length:0%_2px,100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[length:100%_2px,100%_1px] hover:text-accent sm:text-[36px] lg:text-[44px] break-all sm:break-normal"
            >
              {EMAIL}
            </a>
            <button type="button" onClick={copyEmail} className="btn btn-secondary btn-sm">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "check" : "copy"}
                  className="inline-flex"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied ? (
                    <Check size={16} strokeWidth={1.5} className="text-fg-muted" />
                  ) : (
                    <Copy size={16} strokeWidth={1.5} className="text-fg-muted" />
                  )}
                </motion.span>
              </AnimatePresence>
              {copied ? "copied" : "copy"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </span>
          </motion.div>
        </Reveal>

        <div className="mt-8 flex flex-col gap-3 text-[13px]">
          {links.map(({ cmd, display, href, external }, i) => (
            <Reveal key={display} delay={0.12 + i * 0.05}>
              <span className="text-accent">$</span>{" "}
              <motion.span className="inline-block" {...clipIn(i)}>
                <K>{cmd}</K>{" "}
                <a
                  href={href}
                  className="inline-flex items-center gap-1 wrap-anywhere text-fg hover:text-accent transition-colors"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {display}
                  {external && <ArrowUpRight size={16} strokeWidth={1.5} className="text-fg-muted" />}
                </a>
              </motion.span>
            </Reveal>
          ))}
          <Reveal delay={0.12 + links.length * 0.05}>
            <span className="text-accent">$</span>{" "}
            <motion.span className="inline-block" {...clipIn(links.length)}>
              <K>locate</K>{" "}
              <span className="text-fg-secondary">Abohar, Punjab</span>
            </motion.span>
          </Reveal>
        </div>

        <p className="mt-8 text-[13px]">
          <span className="text-accent">$</span> <span aria-hidden="true" className="caret" />
        </p>
      </div>
    </Section>
  );
}

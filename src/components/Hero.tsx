"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { CodeBlock, F, K, P, S } from "./code";
import HeroVisual from "./HeroVisual";
import { EASE } from "./motion";
import { openPalette } from "./useActiveSection";

const PROMPT = "whoami";
const TYPE_DELAY_MS = 300;
const TYPE_INTERVAL_MS = 70;

const NAME = "Anish Babbar";
const DECODE_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&*<>/=+";
const DECODE_MS = 700;
const DECODE_INTERVAL_MS = 30;

// Letters lock in left to right; the rest show random glyphs. Spaces stay spaces.
function scramble(progress: number) {
  return NAME.split("")
    .map((char, i) => {
      if (char === " " || progress > i / NAME.length) return char;
      return DECODE_GLYPHS[Math.floor(Math.random() * DECODE_GLYPHS.length)];
    })
    .join("");
}

// Rise in on load (transform only, so the content is in the server HTML and visible at first paint).
// Reduced motion shows the content at once.
const enter = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { y: 12 },
  animate: { y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
});

// Typing and decode state live here so their 30ms updates don't re-render the rest of Hero.
function HeroTitle() {
  const [typed, setTyped] = useState(0);
  const [display, setDisplay] = useState(NAME);
  const reduceMotion = useReducedMotion();

  // Types the prompt once on load. Reduced motion shows the full prompt at once (see `shown`).
  useEffect(() => {
    if (reduceMotion) return;
    let count = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        count += 1;
        setTyped(count);
        if (count >= PROMPT.length && interval) clearInterval(interval);
      }, TYPE_INTERVAL_MS);
    }, TYPE_DELAY_MS);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [reduceMotion]);

  // Decodes the name once the prompt has typed out. Reduced motion keeps the real name (see `shownName`).
  useEffect(() => {
    if (reduceMotion || typed < PROMPT.length) return;
    const startedAt = Date.now();
    const interval = setInterval(() => {
      const progress = Math.min((Date.now() - startedAt) / DECODE_MS, 1);
      setDisplay(progress >= 1 ? NAME : scramble(progress));
      if (progress >= 1) clearInterval(interval);
    }, DECODE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [typed, reduceMotion]);

  const shown = reduceMotion ? PROMPT : PROMPT.slice(0, typed);
  const shownName = reduceMotion ? NAME : display;

  return (
    <>
      {/* Prompt */}
      <p className="text-[13px] text-fg-muted">
        <span className="text-accent">anish@portfolio</span>:<span className="tok-n">~</span>$ {shown}
      </p>

      {/* Name */}
      <h1
        id="hero-title"
        aria-label="Anish Babbar"
        className="mt-4 whitespace-nowrap text-[clamp(32px,9vw,72px)] font-medium leading-[1.05] tracking-[-0.02em] text-fg"
      >
        <span aria-hidden="true">{shownName}</span>
        <span aria-hidden="true" className="caret" />
      </h1>
    </>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" aria-labelledby="hero-title" className="file-pane">
      <header className="flex h-10 items-center border-b border-hairline bg-card px-4 sm:px-6">
        <span className="meta">
          src/<span className="text-fg">anish.ts</span>
        </span>
      </header>

      <div className="grid items-start gap-10 px-4 py-10 sm:px-6 lg:px-10 lg:py-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,460px)] xl:gap-12">
        <div className="flex min-w-0 flex-col">
          <HeroTitle />

          <motion.p
            className="prose-text mt-4 max-w-[36rem] text-[16px] leading-[26px]"
            {...enter(0.9, reduceMotion)}
          >
            Full-stack developer and team lead at Masters&apos; Union, building internal tools for lead tracking, inventory,
            payments and travel.
          </motion.p>

          <motion.div className="order-3 mt-8 lg:order-2" {...enter(1.05, reduceMotion)}>
            <CodeBlock
              lines={[
                <>
                  <K>export const</K> <F>anish</F> = {"{"}
                </>,
                <>
                  {"  "}
                  <P>name</P>: <S>{`"Anish Babbar"`}</S>,
                </>,
                <>
                  {"  "}
                  <P>role</P>: <S>{`"Full-stack developer and team lead"`}</S>,
                </>,
                <>
                  {"  "}
                  <P>company</P>: <S>{`"Masters' Union"`}</S>,
                </>,
                <>
                  {"  "}
                  <P>team</P>: <S>{`"10+ engineers"`}</S>,
                </>,
                <>
                  {"  "}
                  <P>builds</P>: [<S>{`"lead tracking"`}</S>, <S>{`"inventory"`}</S>, <S>{`"payments"`}</S>, <S>{`"travel"`}</S>],
                </>,
                <>
                  {"  "}
                  <P>stack</P>: [<S>{`"React"`}</S>, <S>{`"Node.js"`}</S>, <S>{`"AWS"`}</S>],
                </>,
                <>
                  {"  "}
                  <P>location</P>: <S>{`"Abohar, Punjab"`}</S>,
                </>,
                <>{"};"}</>,
              ]}
            />
          </motion.div>

          {/* Actions */}
          <motion.div
            className="order-2 mt-8 flex flex-wrap items-center gap-3 lg:order-3"
            {...enter(1.2, reduceMotion)}
          >
            <a className="btn btn-primary group" href="mailto:anishbabbar1@gmail.com">
              <Mail size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-y-px" />
              Email me
            </a>
            <a
              className="btn btn-secondary group"
              href="https://github.com/babbaranish"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} strokeWidth={1.5} />
              GitHub
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="text-fg-muted transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              />
            </a>
            <button
              type="button"
              onClick={openPalette}
              className="meta flex items-center gap-2 transition-colors hover:text-fg [@media(hover:none)]:hidden"
            >
              or press <kbd className="kbd">⌘</kbd>
              <kbd className="kbd">K</kbd>
            </button>
          </motion.div>
        </div>

        <div className="min-w-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

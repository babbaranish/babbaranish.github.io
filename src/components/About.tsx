"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Section from "./Section";
import { Reveal } from "./motion";
import { K } from "./code";

const INTRO =
  "I started in operations at Infosys, automating job schedules, and moved into building the software myself.";
const WORDS = INTRO.split(" ");

// One word that fades from 20% to 100% opacity across its slice of scroll progress
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  return (
    <Section id="about" title="About">
      <div className="max-w-[44rem]">
        <p className="text-[13px]">
          <K># </K>
          <span className="text-fg">About</span>
        </p>
        <p
          ref={ref}
          className="relative mt-6 text-[24px] font-medium leading-[34px] tracking-[-0.01em] text-fg sm:text-[30px] sm:leading-[40px]"
        >
          <span className="sr-only">{INTRO}</span>
          <span aria-hidden="true" className="tok-c">
            &gt;{" "}
          </span>
          <span aria-hidden="true">
            {WORDS.map((word, i) => (
              <Fragment key={i}>
                <Word
                  progress={scrollYProgress}
                  range={[i / WORDS.length, (i + 1) / WORDS.length]}
                >
                  {word}
                </Word>
                {i < WORDS.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        </p>
        <Reveal delay={0.1}>
          <p className="prose-text mt-6 text-[16px] leading-[26px]">
            Today I lead a team of 10+ engineers at Masters&apos; Union, working
            mostly in React, Node.js and AWS.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-[13px] text-fg-muted">
            <K>---</K>
          </p>
          <p className="mt-2 text-[13px]">
            <span className="text-accent">$</span>{" "}
            <span className="text-fg-secondary">cat about.md</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

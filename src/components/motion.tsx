"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

// One easing curve for the whole site
export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "p";
};

// Fade and rise once when the element scrolls into view
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

type CountUpProps = {
  value: string; // e.g. "10+", "95%", "1,500+"
  className?: string;
};

// Tweens the number inside a figure like "95%" once it scrolls into view
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(count, target, { duration: 1, ease: EASE });
    return () => controls.stop();
  }, [inView, target, count, match]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">
        {match[1]}
        <motion.span>{text}</motion.span>
        {match[3]}
      </span>
    </span>
  );
}

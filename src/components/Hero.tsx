"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import HeroVisual from "./HeroVisual";

const roles = ["Team Lead", "Full-Stack Dev", "React Expert", "Builder"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((p) => (p + 1) % roles.length), 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-16 lg:px-24">
      {/* Spotlights */}
      <div
        className="absolute top-[20%] right-[20%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--spotlight-1) 0%, transparent 65%)",
          animation: "spotlight 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[30%] left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--spotlight-2) 0%, transparent 65%)",
          animation: "spotlight 10s ease-in-out infinite 3s",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center w-full">
      <div className="flex flex-col">
      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-5 flex items-center gap-3 w-fit px-4 py-2 rounded-full"
        style={{
          background: "var(--accent-soft)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <div
            className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500"
            style={{ animation: "pulse-ring 2s ease-out infinite" }}
          />
        </div>
        <span className="text-[12px] tracking-wide font-medium" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          Available for opportunities
        </span>
      </motion.div>

      {/* Name */}
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(4rem,12vw,10rem)] font-extrabold leading-[0.92] tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
        >
          Anish
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(4rem,12vw,10rem)] font-extrabold leading-[0.92] tracking-[-0.04em]"
          style={{
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, #ff6b35, #ff8f65, #ff6b35)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Babbar
        </motion.h1>
      </div>

      {/* Rotating role */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-6 max-w-xl"
      >
        <div className="flex items-center gap-4 mb-5">
          <Sparkles size={14} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-[14px] font-semibold uppercase tracking-[3px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="text-[17px] leading-[1.8]" style={{ color: "var(--text-muted)" }}>
          Building scalable products with React, Node.js & AWS.
          <br />
          Currently leading a 10+ dev team at Masters&apos; Union.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 flex items-center gap-4"
      >
        <a
          href="mailto:anishbabbar1@gmail.com"
          className="group relative px-7 py-3.5 rounded-full text-[14px] font-bold tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.25)] hover:scale-[1.02]"
          style={{
            fontFamily: "var(--font-display)",
            background: "var(--accent)",
            color: "#fff",
          }}
        >
          Let&apos;s Talk
        </a>
        <a
          href="https://github.com/babbaranish"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3.5 rounded-full text-[14px] font-medium transition-all duration-300 hover:scale-[1.02]"
          style={{
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            background: "var(--glass)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          GitHub →
        </a>
      </motion.div>

      </div>

      {/* Right visual — desktop only */}
      <div className="hidden lg:block">
        <HeroVisual />
      </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-6 md:left-16 lg:left-24 flex items-center gap-3"
        style={{ color: "var(--text-faint)" }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.div>
        <span className="text-[11px] uppercase tracking-[3px]">Scroll</span>
      </motion.div>
    </section>
  );
}

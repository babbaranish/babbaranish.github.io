"use client";

import { motion } from "framer-motion";
import { Code2, Users, Rocket, Zap } from "lucide-react";

const stats = [
  { value: "5+", label: "Years Building Web & Mobile Apps", icon: Code2 },
  { value: "10+", label: "Developers Managed as Team Lead", icon: Users },
  { value: "5+", label: "Products Shipped to Production", icon: Rocket },
  { value: "1000+", label: "Users Across Internal Tools", icon: Zap },
];

export default function About() {
  return (
    <section id="about" className="px-6 md:px-16 lg:px-24 py-10">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-16"
      >
        <div className="h-[1px] w-8" style={{ background: "var(--accent)" }} />
        <span
          className="text-[11px] uppercase tracking-[4px] font-medium"
          style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
        >
          About
        </span>
      </motion.div>

      {/* Main text */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(1.6rem,3.5vw,2.8rem)] leading-[1.4] font-medium tracking-[-0.015em] max-w-4xl"
        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
      >
        I build products that{" "}
        <span style={{ color: "var(--accent)" }}>scale</span>.
        From architecting full-stack platforms to leading engineering teams,
        I turn complex problems into{" "}
        <span className="relative inline-block">
          clean, production-ready code
          <span className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: "var(--accent)", opacity: 0.3 }} />
        </span>.
      </motion.p>

      {/* Stats grid */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              <Icon
                size={18}
                strokeWidth={1.5}
                className="mb-4 transition-colors duration-300"
                style={{ color: "var(--text-faint)" }}
              />
              <p
                className="text-[36px] font-bold leading-none tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-[12px] mt-2 uppercase tracking-[1.5px]"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

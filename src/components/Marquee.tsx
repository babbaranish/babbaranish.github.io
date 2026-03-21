"use client";

import { motion } from "framer-motion";

const categories = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Redux", "React Native", "Tailwind CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "SQL", "MongoDB", "Sequelize"],
  },
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript"],
  },
  {
    label: "Cloud & Tools",
    skills: ["AWS", "Git", "Expo"],
  },
];

export default function Marquee() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="h-[1px] w-8" style={{ background: "var(--accent)" }} />
        <span
          className="text-[11px] uppercase tracking-[4px] font-medium"
          style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
        >
          Tech Stack
        </span>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.1, duration: 0.5 }}
          >
            <p
              className="text-[11px] uppercase tracking-[2px] mb-4 font-medium"
              style={{ color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}
            >
              {cat.label}
            </p>
            <div className="space-y-2">
              {cat.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 py-1.5 cursor-default group transition-colors duration-200"
                >
                  <span
                    className="w-1 h-1 rounded-full shrink-0 transition-colors duration-200 group-hover:scale-150"
                    style={{ background: "var(--text-faint)" }}
                  />
                  <span
                    className="text-[14px] transition-colors duration-200"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent)";
                      const dot = e.currentTarget.previousElementSibling as HTMLElement;
                      if (dot) dot.style.background = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-secondary)";
                      const dot = e.currentTarget.previousElementSibling as HTMLElement;
                      if (dot) dot.style.background = "var(--text-faint)";
                    }}
                  >
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

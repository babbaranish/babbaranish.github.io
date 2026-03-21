"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Smartphone, Cpu, Cloud } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiRedux, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiSequelize,
  SiExpo, SiGit,
  SiFramer, SiJavascript, SiStyledcomponents,
} from "react-icons/si";
import { TbBrandReactNative, TbSql } from "react-icons/tb";
import { RiOpenaiFill, RiRobot2Line } from "react-icons/ri";
import { VscCopilot } from "react-icons/vsc";

interface SkillTag {
  name: string;
  icon: React.ReactNode;
}

interface SkillCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  glowColor: string;
  hoverColor: string;
  badge?: { text: string; color: string; bg: string; border: string };
  tags: SkillTag[];
  tagStyle?: { bg: string; color: string; border: string };
  colSpan: string;
}

const cards: SkillCard[] = [
  {
    title: "Frontend Engineering",
    description: "Building high-performance web applications with React ecosystem, responsive layouts, and smooth animations.",
    icon: <Monitor size={22} strokeWidth={1.5} style={{ color: "var(--accent)" }} />,
    iconBg: "var(--accent-soft)",
    glowColor: "rgba(255,107,53,0.08)",
    hoverColor: "#ff6b35",
    tags: [
      { name: "React", icon: <SiReact size={12} /> },
      { name: "Next.js", icon: <SiNextdotjs size={12} /> },
      { name: "Redux", icon: <SiRedux size={12} /> },
      { name: "TypeScript", icon: <SiTypescript size={12} /> },
      { name: "Tailwind", icon: <SiTailwindcss size={12} /> },
      { name: "Framer Motion", icon: <SiFramer size={12} /> },
      { name: "JavaScript", icon: <SiJavascript size={12} /> },
      { name: "Styled Components", icon: <SiStyledcomponents size={12} /> },
    ],
    colSpan: "md:col-span-7",
  },
  {
    title: "Backend & APIs",
    description: "Designing scalable server architectures, REST APIs, and database systems for production workloads.",
    icon: <Server size={22} strokeWidth={1.5} style={{ color: "#818cf8" }} />,
    iconBg: "rgba(99,102,241,0.08)",
    glowColor: "rgba(99,102,241,0.08)",
    hoverColor: "#818cf8",
    tags: [
      { name: "Node.js", icon: <SiNodedotjs size={12} /> },
      { name: "Express", icon: <SiExpress size={12} /> },
      { name: "SQL", icon: <TbSql size={12} /> },
      { name: "MongoDB", icon: <SiMongodb size={12} /> },
      { name: "AWS", icon: <Cloud size={12} /> },
      { name: "Sequelize", icon: <SiSequelize size={12} /> },
      { name: "Git", icon: <SiGit size={12} /> },
    ],
    colSpan: "md:col-span-5",
  },
  {
    title: "Mobile Development",
    description: "Cross-platform iOS & Android apps with native performance using React Native and Expo.",
    icon: <Smartphone size={22} strokeWidth={1.5} style={{ color: "#34d399" }} />,
    iconBg: "rgba(16,185,129,0.08)",
    glowColor: "rgba(16,185,129,0.08)",
    hoverColor: "#34d399",
    tags: [
      { name: "React Native", icon: <TbBrandReactNative size={12} /> },
      { name: "Expo", icon: <SiExpo size={12} /> },
      { name: "Expo Router", icon: <SiExpo size={12} /> },
    ],
    colSpan: "md:col-span-5",
  },
  {
    title: "AI Tools & Workflow",
    description: "Leveraging AI-assisted development to accelerate delivery, improve code quality, and automate workflows.",
    icon: <Cpu size={22} strokeWidth={1.5} style={{ color: "#fbbf24" }} />,
    iconBg: "rgba(251,191,36,0.08)",
    glowColor: "rgba(251,191,36,0.06)",
    hoverColor: "#fbbf24",
    tags: [
      { name: "Cursor IDE", icon: <RiRobot2Line size={12} /> },
      { name: "Claude Code", icon: <RiRobot2Line size={12} /> },
      { name: "Copilot", icon: <VscCopilot size={12} /> },
      { name: "ChatGPT", icon: <RiOpenaiFill size={12} /> },
      { name: "Claude AI", icon: <RiRobot2Line size={12} /> },
    ],
    colSpan: "md:col-span-7",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-16 lg:px-24 py-10">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-[1px] w-8" style={{ background: "var(--accent)" }} />
        <span
          className="text-[11px] uppercase tracking-[4px] font-medium"
          style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
        >
          Skills & Expertise
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.35] tracking-[-0.03em] mb-8"
        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
      >
        My <span style={{ color: "var(--accent)" }}>expertise</span>
      </motion.h2>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {cards.map((card, ci) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.1, duration: 0.6 }}
            className={`${card.colSpan} group relative overflow-hidden p-7 rounded-2xl hover-glow`}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              "--glow-shadow": `0 0 30px -5px ${card.glowColor.replace("0.08", "0.15").replace("0.06", "0.12")}`,
            } as React.CSSProperties}
          >
            {/* Hover glow */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle, ${card.glowColor}, transparent 70%)` }}
            />

            <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 rounded-xl" style={{ background: card.iconBg }}>
                    {card.icon}
                  </div>
                  {card.badge && (
                    <span
                      className="text-[10px] uppercase tracking-[2px] px-3 py-1 rounded-full"
                      style={{
                        fontFamily: "var(--font-mono)",
                        background: card.badge.bg,
                        color: card.badge.color,
                        border: `1px solid ${card.badge.border}`,
                      }}
                    >
                      {card.badge.text}
                    </span>
                  )}
                </div>
                <h3
                  className="text-[20px] font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                >
                  {card.title}
                </h3>
                <p className="text-[14px] leading-[1.7] max-w-md" style={{ color: "var(--text-secondary)" }}>
                  {card.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {card.tags.map((t) => (
                  <span
                    key={t.name}
                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-[1.5px] py-1.5 px-3 rounded-md cursor-default hover-skill-tag"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: card.tagStyle?.bg || "var(--bg-subtle)",
                      color: card.tagStyle?.color || "var(--text-muted)",
                      border: `1px solid ${card.tagStyle?.border || "var(--border)"}`,
                      "--tag-hover-color": card.hoverColor,
                      "--tag-hover-bg": `${card.hoverColor}10`,
                    } as React.CSSProperties}
                  >
                    {t.icon}
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

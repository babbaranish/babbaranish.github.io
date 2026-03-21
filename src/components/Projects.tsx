"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  tags: string[];
  description: string;
  accent: string;
  url: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "Kieyverse",
    tags: ["Next.js", "React 19", "Tailwind CSS", "Framer Motion"],
    description:
      "B2B services website for manpower solutions and digital growth — featuring recruitment services, digital marketing, lead generation, and business consultation with modern animations.",
    accent: "#ff6b35",
    url: "https://github.com/babbaranish/kieyverse",
    liveUrl: "https://www.kieyverse.in/",
  },
  {
    title: "Reaux Labs Backend",
    tags: ["Express 5", "MongoDB", "Zod", "JWT", "Cloudinary"],
    description:
      "Multi-gym fitness platform API with social feeds, e-commerce, fitness tracking, memberships, admin analytics, and push notifications.",
    accent: "#6366f1",
    url: "https://github.com/babbaranish/reaux-labs-be",
  },
  {
    title: "Reaux Mobile",
    tags: ["React Native", "Expo SDK 54", "Zustand", "Expo Router"],
    description:
      "Full-featured iOS/Android fitness and e-commerce app with social feeds, video reels, diet planning, supplement marketplace, and role-based access.",
    accent: "#10b981",
    url: "https://github.com/babbaranish/reaux-mobile",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-16 lg:px-24 py-16">
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
          Projects
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] mb-16"
        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", lineHeight: 1.6 }}
      >
        Selected <span style={{ color: "var(--accent)" }}>work</span>
      </motion.h2>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
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
            {/* Top accent line */}
            <div
              className="h-[2px] w-full"
              style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
            />

            {/* Hover gradient */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${project.accent}10, transparent 60%)`,
              }}
            />

            <div className="relative flex flex-col flex-1 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3
                  className="text-[20px] font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        border: "1px solid var(--border)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--accent-medium)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--accent-soft)";
                      }}
                    >
                      <ExternalLink size={12} strokeWidth={1.5} />
                      Live
                    </a>
                  )}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300"
                    style={{ color: "var(--text-faint)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-faint)";
                    }}
                  >
                    <Github size={16} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-md font-medium"
                    style={{
                      background: "var(--bg-subtle)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p
                className="text-[13.5px] leading-[1.7] flex-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

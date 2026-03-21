"use client";

import { motion } from "framer-motion";
import { Building2, ArrowUpRight } from "lucide-react";

interface Role {
  title: string;
  date: string;
  highlights: string[];
  metric?: { value: string; label: string };
}

interface Company {
  name: string;
  location: string;
  roles: Role[];
}

const companies: Company[] = [
  {
    name: "Masters' Union",
    location: "Jalandhar",
    roles: [
      {
        title: "Team Lead",
        date: "Jul 2025 — Present",
        metric: { value: "10+", label: "Engineers" },
        highlights: [
          "Managing team of developers across multiple product verticals",
          "Architected Lead Matrix — lead capture, tracking & distribution system",
          "Company-wide inventory management with real-time asset tracking",
          "AI-powered development workflow with Cursor, Claude Code & Copilot",
        ],
      },
      {
        title: "Software Developer",
        date: "Aug 2023 — Jul 2025",
        metric: { value: "95%", label: "Digital Adoption" },
        highlights: [
          "Built Orbit — unified task, finance, inventory & travel platform",
          "95% digital payment adoption across the organization",
          "Published GetPrepped mentoring app on Google Play Store",
          "Travel management system handling 1,500+ requests",
        ],
      },
    ],
  },
  {
    name: "Infosys",
    location: "Bengaluru",
    roles: [
      {
        title: "Senior System Associate",
        date: "Jan 2023 — Aug 2023",
        metric: { value: "40%", label: "Less Manual Work" },
        highlights: [
          "React & Angular enterprise applications for clients",
          "Built Redux reporting tool for leadership — 40% less manual work",
          "Angular monitoring dashboard for mainframe job executions",
        ],
      },
      {
        title: "Operation Executive",
        date: "Aug 2021 — Jan 2023",
        highlights: [
          "Automated recurring workflows using AutoSys job scheduling",
          "Improved operational efficiency for enterprise operations",
        ],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 md:px-16 lg:px-24 py-10">
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
          Experience
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.03em] mb-16"
        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", lineHeight: 1.6 }}
      >
        Where I&apos;ve{" "}
        <span style={{ color: "var(--accent)" }}>built things</span>
      </motion.h2>

      {/* Companies */}
      <div className="space-y-8">
        {companies.map((company, ci) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* Company header */}
            <div
              className="flex items-center gap-4 px-6 md:px-8 py-5"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--accent-soft)", border: "1px solid var(--border)" }}
              >
                <Building2 size={18} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3
                  className="text-[18px] font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                >
                  {company.name}
                </h3>
                <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                  {company.location}
                </p>
              </div>
            </div>

            {/* Roles */}
            <div>
              {company.roles.map((role, ri) => (
                <div
                  key={role.title}
                  className="group px-6 md:px-8 py-6 hover-role"
                  style={{
                    borderBottom: ri < company.roles.length - 1 ? "1px dashed var(--border)" : "none",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4
                          className="text-[17px] font-bold"
                          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                        >
                          {role.title}
                        </h4>
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.5}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: "var(--accent)" }}
                        />
                      </div>
                      <span
                        className="text-[12px]"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                      >
                        {role.date}
                      </span>
                    </div>

                    {/* Metric badge */}
                    {role.metric && (
                      <div
                        className="flex items-center gap-2 px-4 py-2 rounded-full shrink-0"
                        style={{
                          background: "var(--accent-soft)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <span
                          className="text-[18px] font-bold"
                          style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
                        >
                          {role.metric.value}
                        </span>
                        <span className="text-[11px] uppercase tracking-[1px]" style={{ color: "var(--text-muted)" }}>
                          {role.metric.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 ml-0.5">
                    {role.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-3 text-[14px] leading-[1.7]" style={{ color: "var(--text-secondary)" }}>
                        <span className="mt-[9px] w-1 h-1 rounded-full shrink-0" style={{ background: "var(--accent)", opacity: 0.5 }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

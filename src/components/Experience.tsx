"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { C } from "./code";
import { Reveal, CountUp, EASE } from "./motion";

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
        date: "Jul 2025 – Present",
        metric: { value: "10+", label: "engineers on the team" },
        highlights: [
          "Managing a team of developers across multiple product verticals",
          "Architected Lead Matrix, a lead capture, tracking and distribution system",
          "Company-wide inventory management with real-time asset tracking",
          "Set up an AI-assisted development workflow with Cursor, Claude Code and Copilot",
        ],
      },
      {
        title: "Software Developer",
        date: "Aug 2023 – Jul 2025",
        metric: { value: "95%", label: "digital payment adoption" },
        highlights: [
          "Built Orbit, one platform for tasks, finance, inventory and travel",
          "Drove digital payment adoption to 95% across the organization",
          "Published the GetPrepped mentoring app on Google Play",
          "Built a travel management system that has handled 1,500+ requests",
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
        date: "Jan 2023 – Aug 2023",
        metric: { value: "40%", label: "less manual work" },
        highlights: [
          "Built React and Angular enterprise applications for clients",
          "Built a Redux reporting tool for leadership that cut manual work by 40%",
          "Built an Angular dashboard for monitoring mainframe job runs",
        ],
      },
      {
        title: "Operation Executive",
        date: "Aug 2021 – Jan 2023",
        highlights: ["Automated recurring workflows with AutoSys job scheduling"],
      },
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <p className="text-[13px]">
        <span className="text-accent">$</span> <span className="text-fg">git log --graph --since=2021</span>
      </p>
      <p className="prose-text mt-3 max-w-[36rem]">
        From automating operations at Infosys to leading a product team at Masters&apos; Union.
      </p>

      <div className="mt-10 flex flex-col gap-12">
        {companies.map((c) => (
          <div key={c.name}>
            <Reveal className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3">
              <h3 className="text-[16px] font-medium text-fg">
                <C>{"// "}</C>
                {c.name}
              </h3>
              <span className="meta">{c.location}</span>
            </Reveal>

            <ol className="mt-6">
              {c.roles.map((r, i) => (
                <motion.li
                  key={r.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="group relative grid grid-cols-[12px_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0 lg:grid-cols-[12px_minmax(0,1fr)_160px]"
                >
                  {i < c.roles.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute left-[5.5px] top-3 -bottom-3 w-px origin-top bg-hairline-strong"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                    />
                  )}
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-accent"
                    initial={{ scale: 1, opacity: 0.8 }}
                    whileInView={{ scale: 2.6, opacity: 0 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                  />
                  <motion.span
                    aria-hidden="true"
                    className="relative z-10 mt-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 0.3, delay: 0.15, ease: EASE }}
                  />

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 className="text-[15px] leading-6 font-medium text-accent transition-colors">{r.title}</h4>
                      <span className="meta transition-colors group-hover:text-fg-secondary">{r.date}</span>
                    </div>
                    <ul className="mt-3 flex flex-col gap-1">
                      {r.highlights.map((h, j) => (
                        <motion.li
                          key={h}
                          initial={{ opacity: 0, x: -6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.2 + j * 0.06, ease: EASE }}
                          className="prose-text flex gap-3"
                        >
                          <span aria-hidden="true" className="tok-c font-mono">
                            -
                          </span>
                          <span className="min-w-0">{h}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {r.metric && (
                    <div className="col-start-2 mt-4 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:text-right">
                      <p className="text-[40px] font-medium leading-none tracking-[-0.02em] tabular-nums tok-n">
                        <CountUp value={r.metric.value} />
                      </p>
                      <p className="meta mt-2">{r.metric.label}</p>
                    </div>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  );
}

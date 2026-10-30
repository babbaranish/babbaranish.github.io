"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Fragment } from "react";
import { K, N, S } from "./code";
import { EASE } from "./motion";
import Section from "./Section";

interface Project {
  name: string;
  type: string;
  stack: string[];
  description: string;
  githubUrl: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    name: "Kieyverse",
    type: "Website",
    stack: ["Next.js", "React 19", "Tailwind CSS", "Framer Motion"],
    description:
      "Marketing site for a B2B services firm covering recruitment, manpower, digital marketing, lead generation and consulting.",
    githubUrl: "https://github.com/babbaranish/kieyverse",
    liveUrl: "https://www.kieyverse.in/",
  },
  {
    name: "Reaux Labs Backend",
    type: "API",
    stack: ["Express 5", "MongoDB", "Zod", "JWT", "Cloudinary"],
    description:
      "API for a multi-gym fitness platform: social feeds, e-commerce, fitness tracking, memberships, admin analytics and push notifications.",
    githubUrl: "https://github.com/babbaranish/reaux-labs-be",
  },
  {
    name: "Reaux Mobile",
    type: "iOS and Android app",
    stack: ["React Native", "Expo SDK 54", "Zustand", "Expo Router"],
    description:
      "iOS and Android fitness and shopping app with social feeds, video reels, diet planning, a supplement marketplace and role-based access.",
    githubUrl: "https://github.com/babbaranish/reaux-mobile",
  },
];

// Folder name derived from the project name: "Reaux Labs Backend" -> "reaux-labs-backend"
const slugOf = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const arrowClass =
  "text-fg-muted transition-transform group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <p className="text-[13px]">
        <span className="text-accent">$</span> <span className="text-fg">ls projects/</span>
      </p>
      <p className="mt-2 text-[13px] text-fg-secondary">
        {projects.map((project, i) => (
          <Fragment key={project.name}>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.12, ease: EASE }}
            >
              <N>{slugOf(project.name)}/</N>
            </motion.span>
            {i < projects.length - 1 && "  "}
          </Fragment>
        ))}
      </p>

      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {projects.map((project, i) => {
          const slug = slugOf(project.name);
          return (
            <motion.li
              key={project.name}
              className={`group flex flex-col overflow-hidden rounded-lg border border-hairline-strong bg-card transition-[translate,border-color] duration-200 hover:-translate-y-1 hover:border-accent/60 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            >
              <div className="flex h-9 items-center justify-between border-b border-hairline px-4">
                <span className="meta">{slug}/README.md</span>
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                  <span className="meta">{project.type}</span>
                </div>
              </div>

              <motion.div
                className="flex flex-1 flex-col p-5"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: EASE }}
              >
                <h3 className="text-[22px] font-medium tracking-[-0.01em] text-fg transition-colors group-hover:text-accent">
                  {project.name}
                </h3>
                <p className="prose-text mt-2 max-w-[60ch]">{project.description}</p>
                <p className="mt-4 text-[12px] leading-5">
                  <K>stack</K> = [
                  {project.stack.map((s, j) => (
                    <Fragment key={s}>
                      <S>&quot;{s}&quot;</S>
                      {j < project.stack.length - 1 && ", "}
                    </Fragment>
                  ))}
                  ]
                </p>

                <div className="mt-auto flex gap-2 pt-5">
                  {project.liveUrl && (
                    <a
                      className="group/btn btn btn-secondary btn-sm"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      live
                      <span className="sr-only"> for {project.name}</span>
                      <ArrowUpRight size={16} strokeWidth={1.5} className={arrowClass} />
                    </a>
                  )}
                  <a
                    className="group/btn btn btn-secondary btn-sm"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    source
                    <span className="sr-only"> for {project.name}</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} className={arrowClass} />
                  </a>
                </div>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}

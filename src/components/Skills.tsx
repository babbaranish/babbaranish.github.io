"use client";

import { Fragment, type ReactNode } from "react";
import Section from "./Section";
import { C, CodeBlock, P, S } from "./code";

const skillGroups = [
  {
    id: "frontend",
    name: "Frontend engineering",
    description:
      "Web applications in React and Next.js, with responsive layouts and motion",
    tools: [
      "React",
      "Next.js",
      "Redux",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "JavaScript",
      "Styled Components",
    ],
  },
  {
    id: "backend",
    name: "Backend and APIs",
    description:
      "REST APIs, server architecture and databases for production workloads",
    tools: ["Node.js", "Express", "SQL", "MongoDB", "AWS", "Sequelize", "Git"],
  },
  {
    id: "mobile",
    name: "Mobile development",
    description: "iOS and Android apps with React Native and Expo",
    tools: ["React Native", "Expo", "Expo Router"],
  },
  {
    id: "ai",
    name: "AI tools and workflow",
    description: "AI-assisted development as part of daily work",
    tools: ["Cursor IDE", "Claude Code", "GitHub Copilot", "ChatGPT", "Claude AI"],
  },
];

const total = skillGroups.reduce((sum, g) => sum + g.tools.length, 0);

const quote = (s: string) => `"${s}"`;

// The data as a JSON-looking config file. Built from skillGroups so it can't drift from the data.
const lines: ReactNode[] = ["{"];
skillGroups.forEach((g, i) => {
  const comma = i < skillGroups.length - 1 ? "," : "";
  lines.push(
    <Fragment>
      {"  "}
      <C>{`// ${g.name}`}</C>
    </Fragment>,
    <Fragment>
      {"  "}
      <P>{quote(g.id)}</P>
      {": {"}
    </Fragment>,
    <Fragment>
      {"    "}
      <P>{quote("summary")}</P>
      {": "}
      <S>{quote(g.description)}</S>
      {","}
    </Fragment>,
    <Fragment>
      {"    "}
      <P>{quote("tools")}</P>
      {": ["}
      {g.tools.map((t, j) => (
        <Fragment key={t}>
          <S>{quote(t)}</S>
          {j < g.tools.length - 1 ? ", " : ""}
        </Fragment>
      ))}
      {"]"}
    </Fragment>,
    <Fragment>
      {"  }"}
      {comma}
    </Fragment>,
  );
});
lines.push("}");

// Config-file view of the skills: one object per area, tools as a JSON array
export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <p className="prose-text max-w-[36rem]">What I work with, as a config file.</p>
      <CodeBlock className="mt-6" lines={lines} />
      <div className="mt-6 meta">
        {total} tools across {skillGroups.length} groups
      </div>
    </Section>
  );
}

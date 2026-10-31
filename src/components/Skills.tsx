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

// The file is formatted twice, like a formatter with two print widths: short lines that
// fit a phone screen without wrapping, and long lines that use the space on desktop.
const NARROW = 30;
const WIDE = 100;

// Word-wrap prose into lines of at most `width` characters
function wrapWords(text: string, width: number): string[] {
  const out: string[] = [];
  let cur = "";
  for (const word of text.split(" ")) {
    if (cur && (cur + " " + word).length > width) {
      out.push(cur);
      cur = word;
    } else {
      cur = cur ? `${cur} ${word}` : word;
    }
  }
  if (cur) out.push(cur);
  return out;
}

// Pack array items onto lines of at most `width` characters, formatter style
function packItems(items: string[], width: number): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let len = 0;
  for (const item of items) {
    const add = quote(item).length + 2; // item plus ", "
    if (row.length && len + add > width) {
      rows.push(row);
      row = [];
      len = 0;
    }
    row.push(item);
    len += add;
  }
  if (row.length) rows.push(row);
  return rows;
}

// The data as a JSON-looking config file. Built from skillGroups so it can't drift from the data.
function buildLines(width: number): ReactNode[] {
  const lines: ReactNode[] = ["{"];
skillGroups.forEach((g, i) => {
  const comma = i < skillGroups.length - 1 ? "," : "";
  const rows = packItems(g.tools, width);
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
    ...wrapWords(g.description, width - 3).map((part) => (
      <Fragment key={part}>
        {"    "}
        <C>{`// ${part}`}</C>
      </Fragment>
    )),
    <Fragment>
      {"    "}
      <P>{quote("tools")}</P>
      {": ["}
    </Fragment>,
    ...rows.map((row, r) => (
      <Fragment key={row.join()}>
        {"      "}
        {row.map((t, j) => (
          <Fragment key={t}>
            <S>{quote(t)}</S>
            {j < row.length - 1 || r < rows.length - 1 ? "," : ""}
            {j < row.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </Fragment>
    )),
    <Fragment>{"    ]"}</Fragment>,
    <Fragment>
      {"  }"}
      {comma}
    </Fragment>,
  );
});
lines.push("}");
  return lines;
}

const narrowLines = buildLines(NARROW);
const wideLines = buildLines(WIDE);

// Config-file view of the skills: one object per area, tools as a JSON array
export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <p className="prose-text max-w-[36rem]">What I work with, as a config file.</p>
      <CodeBlock className="mt-6 sm:hidden" lines={narrowLines} />
      <CodeBlock className="mt-6 hidden sm:block" lines={wideLines} />
      <div className="mt-6 meta">
        {total} tools across {skillGroups.length} groups
      </div>
    </Section>
  );
}

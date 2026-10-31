"use client";

import { motion, useReducedMotion } from "framer-motion";
import { isValidElement, type ReactNode } from "react";
import { EASE } from "./motion";

// Syntax tokens. Colors come from the theme (--tok-*), so they work in both themes.
export const K = ({ children }: { children: ReactNode }) => <span className="tok-k">{children}</span>; // keyword
export const S = ({ children }: { children: ReactNode }) => <span className="tok-s">{children}</span>; // string
export const N = ({ children }: { children: ReactNode }) => <span className="tok-n">{children}</span>; // number
export const C = ({ children }: { children: ReactNode }) => <span className="tok-c">{children}</span>; // comment
export const F = ({ children }: { children: ReactNode }) => <span className="tok-f">{children}</span>; // function / accent
export const P = ({ children }: { children: ReactNode }) => <span className="tok-p">{children}</span>; // property / plain bright

// Number of leading spaces in a line, read from its first text node. Used for a
// hanging indent so wrapped lines stay under their own indentation, like an editor.
function leadingSpaces(node: ReactNode): number {
  if (typeof node === "string") return node.length - node.trimStart().length;
  if (Array.isArray(node)) return node.length ? leadingSpaces(node[0]) : 0;
  if (isValidElement<{ children?: ReactNode }>(node)) return leadingSpaces(node.props.children);
  return 0;
}

type CodeBlockProps = {
  lines: ReactNode[]; // one entry per line; use "" for an empty line
  start?: number; // first line number
  animate?: boolean; // lines type in left to right when scrolled into view
  className?: string;
};

// A block of code with a line-number gutter. Long lines wrap; the gutter stays aligned to the first row.
// Hovering a row highlights it, like the current line in an editor.
export function CodeBlock({ lines, start = 1, animate = true, className = "" }: CodeBlockProps) {
  const reduce = useReducedMotion();
  const typed = animate && !reduce;

  return (
    <ol className={`text-[12px] leading-6 sm:text-[14px] ${className}`}>
      {lines.map((line, i) => {
        const delay = Math.min(i * 0.06, 1.2);
        // Hanging indent: wrapped rows start two characters past this line's own indent
        const hang = leadingSpaces(line) + 2;
        return (
          <li
            key={i}
            className="group/line grid grid-cols-[20px_minmax(0,1fr)] gap-3 rounded-sm transition-colors hover:bg-raised sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-4"
          >
            <motion.span
              aria-hidden="true"
              className="select-none text-right text-fg-muted/60 tabular-nums transition-colors group-hover/line:text-fg-secondary"
              initial={typed ? { opacity: 0 } : false}
              whileInView={typed ? { opacity: 1 } : undefined}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: 0.2, delay, ease: EASE }}
            >
              {start + i}
            </motion.span>
            <motion.span
              className="min-w-0 whitespace-pre-wrap break-words text-fg-secondary"
              style={{ paddingLeft: `${hang}ch`, textIndent: `-${hang}ch` }}
              initial={typed ? { clipPath: "inset(0 100% 0 0)" } : false}
              whileInView={typed ? { clipPath: "inset(0 0% 0 0)" } : undefined}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: 0.35, delay, ease: "linear" }}
            >
              {line === "" ? " " : line}
            </motion.span>
          </li>
        );
      })}
    </ol>
  );
}

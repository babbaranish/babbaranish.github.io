"use client";

import { C } from "@/components/code";
import { openPalette } from "@/components/useActiveSection";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    label: "files",
    links: [
      { title: "Skills", href: "#skills" },
      { title: "About", href: "#about" },
      { title: "Experience", href: "#experience" },
      { title: "Projects", href: "#projects" },
      { title: "Contact", href: "#contact" },
    ],
  },
  {
    label: "projects",
    links: [
      { title: "Kieyverse", href: "https://www.kieyverse.in/" },
      { title: "Reaux Labs Backend", href: "https://github.com/babbaranish/reaux-labs-be" },
      { title: "Reaux Mobile", href: "#projects" },
    ],
  },
  {
    label: "elsewhere",
    links: [
      { title: "Email", href: "mailto:anishbabbar1@gmail.com" },
      { title: "LinkedIn", href: "https://linkedin.com/in/babbaranish" },
      { title: "GitHub", href: "https://github.com/babbaranish" },
      { title: "Phone", href: "tel:+919569922968" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline px-4 py-10 sm:px-6 lg:px-10">
      <p className="text-[13px]">
        <C>{"// end of file"}</C>
      </p>

      <div className="mt-6 grid gap-8 sm:grid-cols-3">
        {footerSections.map((section) => (
          <div key={section.label}>
            <p className="meta">{section.label}</p>
            <ul className="mt-3 flex flex-col gap-1 text-[13px]">
              {section.links.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.title}>
                    <a
                      className="link inline-block py-1"
                      href={link.href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 text-[13px]">
        <C>{"// You reached the end of the file. Press "}</C>
        <button
          type="button"
          onClick={openPalette}
          aria-label="Open command palette"
          className="kbd align-middle transition-colors hover:text-fg"
        >
          ⌘K
        </button>
        <C>{" to jump anywhere."}</C>
      </p>

      <div className="meta mt-6 flex flex-col gap-1 sm:flex-row sm:justify-between">
        <p suppressHydrationWarning>© {new Date().getFullYear()} Anish Babbar</p>
        <p>Designed and built by Anish</p>
      </div>
    </footer>
  );
}

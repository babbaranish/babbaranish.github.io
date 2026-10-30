"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type MotionProps } from "framer-motion";
import {
  Braces,
  ChevronDown,
  FileCode2,
  FileText,
  FolderOpen,
  Github,
  Linkedin,
  Mail,
  Menu,
  Search,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { EASE } from "./motion";
import { FILES, type FileId } from "./Section";
import { openPalette, useActiveSection } from "./useActiveSection";

const LINKS = [
  { label: "GitHub", href: "https://github.com/babbaranish", icon: Github, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/babbaranish", icon: Linkedin, external: true },
  { label: "Email", href: "mailto:anishbabbar1@gmail.com", icon: Mail, external: false },
];

const iconButton =
  "inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-muted hover:bg-raised hover:text-fg transition-colors";

// Icon by file extension, like an editor's file tree (.ts falls back to FileCode2)
const EXT_ICONS: [string, LucideIcon][] = [
  [".json", Braces],
  [".md", FileText],
  [".sh", Terminal],
];

function fileHref(id: FileId) {
  return id === "top" ? "#" : `#${id}`;
}

// Load stagger for desktop rows: each row slides in after the one above it.
// Without an index (mobile sheet, or rows shown again after a fold) the row renders as is.
function enterProps(index?: number): Pick<MotionProps, "initial" | "animate" | "transition"> {
  if (index === undefined) return { initial: false };
  return {
    initial: { opacity: 0, x: -8 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.3, delay: 0.1 + index * 0.05, ease: EASE },
  };
}

type FileRowProps = {
  id: FileId;
  file: string;
  active: boolean;
  variant: "tree" | "sheet"; // tree: desktop sidebar, sheet: mobile dropdown
  onNavigate?: () => void;
  index?: number; // position in the load stagger, omit for no stagger
};

function FileRow({ id, file, active, variant, onNavigate, index }: FileRowProps) {
  const Icon = EXT_ICONS.find(([ext]) => file.endsWith(ext))?.[1] ?? FileCode2;
  // Separate layoutIds per variant so the desktop and mobile highlights never morph into each other
  const suffix = variant === "tree" ? "" : "-mobile";
  const size = variant === "tree" ? "h-8 pl-8 pr-4" : "h-10 px-4";

  return (
    <motion.a
      href={fileHref(id)}
      onClick={onNavigate}
      aria-current={active ? "location" : undefined}
      {...enterProps(index)}
      className={`group relative isolate flex items-center gap-2 text-[13px] ${size} ${
        active ? "text-fg" : "text-fg-secondary transition-colors hover:bg-raised hover:text-fg"
      }`}
    >
      {active && (
        <>
          <motion.span
            layoutId={`explorer-active${suffix}`}
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-raised"
            transition={{ duration: 0.25, ease: EASE }}
          />
          <motion.span
            layoutId={`explorer-bar${suffix}`}
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-0.5 bg-accent"
            transition={{ duration: 0.25, ease: EASE }}
          />
        </>
      )}
      <Icon
        size={16}
        strokeWidth={1.5}
        aria-hidden="true"
        className="shrink-0 text-fg-muted transition-transform duration-150 group-hover:translate-x-0.5"
      />
      <span className="truncate">{file}</span>
    </motion.a>
  );
}

export default function Nav() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [folderOpen, setFolderOpen] = useState(true);
  // Once the folder has been toggled, file rows skip the load stagger so they don't replay on every expand
  const [folderToggled, setFolderToggled] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const toggleFolder = () => {
    setFolderToggled(true);
    setFolderOpen((open) => !open);
  };

  return (
    <>
      {/* Desktop: file explorer sidebar, a grid column on lg+ */}
      <aside className="sticky top-0 hidden h-[calc(100svh-32px)] flex-col bg-card lg:flex">
        <div className="flex h-10 shrink-0 items-center justify-between border-b border-hairline px-4">
          <a href="#" className="text-[13px] text-fg">
            ~/anish
          </a>
          <span className="meta">explorer</span>
        </div>

        <nav aria-label="Files" className="min-h-0 flex-1 overflow-y-auto py-2">
          <motion.button
            type="button"
            onClick={toggleFolder}
            aria-expanded={folderOpen}
            aria-controls={folderOpen ? "explorer-files" : undefined}
            {...enterProps(0)}
            className="flex h-8 w-full items-center gap-1 px-4 text-left text-[13px] text-fg-secondary transition-colors hover:bg-raised hover:text-fg"
          >
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              className={`shrink-0 transition-transform duration-200 ${folderOpen ? "" : "-rotate-90"}`}
            />
            <FolderOpen size={16} strokeWidth={1.5} aria-hidden="true" />
            <span className="ml-1">portfolio</span>
          </motion.button>
          <AnimatePresence>
            {folderOpen && (
              <motion.ul
                key="explorer-files"
                id="explorer-files"
                initial={folderToggled ? { height: 0, opacity: 0 } : false}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="overflow-hidden"
              >
                {FILES.map((f, i) => (
                  <li key={f.id}>
                    <FileRow
                      id={f.id}
                      file={f.file}
                      active={active === f.id}
                      variant="tree"
                      index={folderToggled ? undefined : i + 1}
                    />
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <p className="meta px-4 pt-6 pb-2">links</p>
          <ul>
            {LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...enterProps(FILES.length + 1 + i)}
                    className="group relative isolate flex h-8 items-center gap-2 pl-4 pr-4 text-[13px] text-fg-secondary transition-colors hover:bg-raised hover:text-fg"
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="shrink-0 text-fg-muted transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                    <span>{link.label}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto flex shrink-0 gap-2 border-t border-hairline p-3">
          <button
            type="button"
            onClick={() => openPalette()}
            className="btn btn-secondary btn-sm flex-1 justify-between"
          >
            <span>Search files</span>
            <span className="flex gap-1">
              <kbd className="kbd">⌘</kbd>
              <kbd className="kbd">K</kbd>
            </span>
          </button>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile: top bar with a dropdown file list */}
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-hairline bg-card px-4 lg:hidden">
        <a href="#" className="text-[13px] text-fg">
          ~/anish
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openPalette()}
            aria-label="Open command palette"
            className={iconButton}
          >
            <Search size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "mobile-files" : undefined}
            aria-label={menuOpen ? "Close files" : "Open files"}
            className={iconButton}
          >
            {menuOpen ? (
              <X size={16} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu size={16} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-files"
              id="mobile-files"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="absolute inset-x-0 top-12 max-h-[70svh] overflow-y-auto border-b border-hairline bg-card py-2"
            >
              <nav aria-label="Files">
                <ul>
                  {FILES.map((f) => (
                    <li key={f.id}>
                      <FileRow
                        id={f.id}
                        file={f.file}
                        active={active === f.id}
                        variant="sheet"
                        onNavigate={closeMenu}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Braces,
  Copy,
  FileCode2,
  FileText,
  Github,
  Linkedin,
  Mail,
  Search,
  SunMoon,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EASE } from "./motion";
import { toggleTheme } from "./ThemeToggle";
import { FILES } from "./Section";
import { OPEN_PALETTE_EVENT, showStatus } from "./useActiveSection";

const EMAIL = "anishbabbar1@gmail.com";

type PaletteItem = {
  key: string;
  label: string;
  path?: string; // dimmed breadcrumb shown before the label (files only)
  icon: LucideIcon;
  run: () => void;
};

function fileIcon(file: string): LucideIcon {
  if (file.endsWith(".json")) return Braces;
  if (file.endsWith(".md")) return FileText;
  if (file.endsWith(".sh")) return Terminal;
  return FileCode2;
}

const FILE_ITEMS: PaletteItem[] = FILES.map((f) => ({
  key: `file-${f.id}`,
  label: f.file,
  path: f.path,
  icon: fileIcon(f.file),
  run: () => {
    window.location.hash = f.id === "top" ? "" : f.id;
    if (f.id === "top") {
      window.scrollTo({ top: 0 });
    } else {
      document.getElementById(f.id)?.scrollIntoView();
    }
  },
}));

const ACTION_ITEMS: PaletteItem[] = [
  {
    key: "action-copy-email",
    label: "Copy email address",
    icon: Copy,
    run: async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
        showStatus("Copied email to clipboard");
      } catch {
        // Clipboard unavailable (e.g. insecure context): nothing to do.
      }
    },
  },
  {
    key: "action-send-email",
    label: "Send an email",
    icon: Mail,
    run: () => {
      window.location.href = `mailto:${EMAIL}`;
    },
  },
  {
    key: "action-open-github",
    label: "Open GitHub",
    icon: Github,
    run: () => {
      window.open("https://github.com/babbaranish", "_blank", "noopener,noreferrer");
    },
  },
  {
    key: "action-open-linkedin",
    label: "Open LinkedIn",
    icon: Linkedin,
    run: () => {
      window.open("https://www.linkedin.com/in/babbaranish", "_blank", "noopener,noreferrer");
    },
  },
  {
    key: "action-toggle-theme",
    label: "Toggle theme",
    icon: SunMoon,
    run: () => {
      toggleTheme();
      showStatus("Theme changed");
    },
  },
];

// VS Code style palette: Cmd/Ctrl+K or OPEN_PALETTE_EVENT opens it, arrows move, Enter runs.
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  // Bumped on every open so the list remounts and the items stagger in again.
  const [openCount, setOpenCount] = useState(0);
  // Mirrors `open` for window listeners so they never read a stale value.
  const openRef = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  const openPalette = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setSelected(0);
    setOpenCount((c) => c + 1);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    openRef.current = false;
    setOpen(false);
    // preventScroll: restoring focus must not undo the scroll a file command just made.
    returnFocus.current?.focus({ preventScroll: true });
    returnFocus.current = null;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (items: PaletteItem[]) =>
      q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items;
    return { files: match(FILE_ITEMS), actions: match(ACTION_ITEMS) };
  }, [query]);

  const flat = useMemo(() => [...filtered.files, ...filtered.actions], [filtered]);

  const runItem = useCallback(
    (item: PaletteItem) => {
      closePalette();
      item.run();
    },
    [closePalette]
  );

  // Lock page scroll while open; restore whatever was set before.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    window.addEventListener(OPEN_PALETTE_EVENT, openPalette);
    return () => window.removeEventListener(OPEN_PALETTE_EVENT, openPalette);
  }, [openPalette]);

  // Keys are handled on window so they work even if focus drifts to a non-focusable part of the panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) closePalette();
        else openPalette();
        return;
      }
      if (!openRef.current) return;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          closePalette();
          break;
        case "Tab":
          // Focus stays in the input while the dialog is modal.
          e.preventDefault();
          break;
        case "ArrowDown":
          e.preventDefault();
          if (flat.length) setSelected((s) => (s + 1) % flat.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (flat.length) setSelected((s) => (s - 1 + flat.length) % flat.length);
          break;
        case "Enter": {
          const item = flat[selected];
          if (!item) break;
          e.preventDefault();
          runItem(item);
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flat, selected, openPalette, closePalette, runItem]);

  // Keep the keyboard selection visible inside the scrolling list.
  useEffect(() => {
    if (!open) return;
    const item = flat[selected];
    if (item) document.getElementById(`palette-${item.key}`)?.scrollIntoView({ block: "nearest" });
  }, [open, selected, flat]);

  const activeKey = flat[selected]?.key;

  const renderGroup = (label: string, items: PaletteItem[], offset: number) => {
    if (items.length === 0) return null;
    return (
      <>
        <li role="presentation" className="meta px-3 pt-2 pb-1">
          {label}
        </li>
        {items.map((item, i) => {
          const index = offset + i;
          const active = index === selected;
          return (
            <motion.li
              key={item.key}
              id={`palette-${item.key}`}
              role="option"
              aria-selected={active}
              onMouseEnter={() => setSelected(index)}
              onClick={() => runItem(item)}
              className={`relative isolate flex h-10 cursor-pointer items-center gap-3 rounded-md px-3 text-[13px] ${
                active ? "text-fg" : "text-fg-secondary"
              }`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: Math.min(index * 0.02, 0.2), ease: EASE }}
            >
              {active && (
                <motion.span
                  layoutId="palette-selection"
                  className="absolute inset-0 -z-10 rounded-md bg-raised"
                  transition={{ duration: 0.15, ease: EASE }}
                />
              )}
              <item.icon size={16} strokeWidth={1.5} className="shrink-0 text-fg-muted" aria-hidden="true" />
              <span className="truncate">
                {item.path && <span className="meta">{item.path}</span>}
                {item.label}
              </span>
            </motion.li>
          );
        })}
      </>
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette-scrim"
          className="fixed inset-0 z-50 bg-black/50"
          onClick={closePalette}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: EASE }}
        />
      )}
      {open && (
        <motion.div
          key="palette-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-x-4 top-[15vh] z-50 mx-auto max-w-[560px] overflow-hidden rounded-xl border border-hairline-strong bg-card shadow-2xl"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          <div className="flex h-12 items-center gap-3 border-b border-hairline px-4">
            <Search size={16} className="shrink-0 text-fg-muted" aria-hidden="true" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
              placeholder="Type a command or file"
              aria-label="Search files and commands"
              className="h-full flex-1 bg-transparent text-[16px] text-fg outline-none placeholder:text-fg-muted md:text-[14px]"
              role="combobox"
              aria-expanded={flat.length > 0}
              aria-controls={flat.length > 0 ? "palette-list" : undefined}
              aria-activedescendant={activeKey ? `palette-${activeKey}` : undefined}
            />
            <button
              type="button"
              onClick={closePalette}
              aria-label="Close command palette"
              className="hidden h-8 w-8 items-center justify-center rounded-md text-fg-muted hover:bg-raised hover:text-fg [@media(hover:none)]:inline-flex"
            >
              <X size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <kbd className="kbd [@media(hover:none)]:hidden">esc</kbd>
          </div>

          {flat.length > 0 ? (
            <ul
              key={openCount}
              id="palette-list"
              role="listbox"
              aria-label="Results"
              className="max-h-[320px] overflow-y-auto p-2"
            >
              {renderGroup("files", filtered.files, 0)}
              {renderGroup("actions", filtered.actions, filtered.files.length)}
            </ul>
          ) : (
            <p className="px-3 py-6 text-center text-[13px] text-fg-muted">No matches</p>
          )}

          <div className="flex h-9 items-center gap-4 border-t border-hairline px-4 meta [@media(hover:none)]:hidden">
            <span>↑↓ to navigate</span>
            <span>↵ to run</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

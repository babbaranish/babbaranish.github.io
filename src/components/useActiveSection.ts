"use client";

import { useEffect, useState } from "react";
import { FILES, type FileId } from "./Section";

// Which file (section) is currently in the middle of the viewport. "top" when none is.
export function useActiveSection(): FileId {
  const [active, setActive] = useState<FileId>("top");

  useEffect(() => {
    const ids = FILES.map((f) => f.id).filter((id) => id !== "top");
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id as FileId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const first = els[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive("top");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

// Command palette is opened from several places; they dispatch this event.
export const OPEN_PALETTE_EVENT = "open-command-palette";
export function openPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}

// Short messages shown in the status bar, e.g. "Copied to clipboard".
export const STATUS_MESSAGE_EVENT = "status-message";
export function showStatus(text: string) {
  window.dispatchEvent(new CustomEvent<string>(STATUS_MESSAGE_EVENT, { detail: text }));
}

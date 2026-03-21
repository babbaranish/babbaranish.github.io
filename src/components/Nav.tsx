"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          background: "var(--glass)",
          border: "1px solid var(--border)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 hover:scale-[1.02]"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.background = "var(--accent-soft)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {link.label}
          </a>
        ))}
        <div className="mx-1 w-[1px] h-5" style={{ background: "var(--border)" }} />
        <ThemeToggle />
      </motion.nav>

      {/* Mobile nav bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed top-5 left-5 right-5 z-50 flex md:hidden items-center justify-between"
      >
        {/* Logo mark */}
        <a
          href="#"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold"
          style={{
            background: "var(--glass)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(12px)",
            fontFamily: "var(--font-display)",
            color: "var(--accent)",
          }}
        >
          AB
        </a>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: "var(--glass)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(12px)",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={18} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
            ) : (
              <Menu size={18} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "var(--glass)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="px-6 py-3 rounded-xl text-[18px] font-semibold transition-colors duration-200"
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-display)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

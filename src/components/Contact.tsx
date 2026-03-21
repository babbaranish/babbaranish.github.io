"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", value: "anishbabbar1@gmail.com", href: "mailto:anishbabbar1@gmail.com" },
  { icon: Phone, label: "Phone", value: "9569922968", href: "tel:+919569922968" },
  { icon: Linkedin, label: "LinkedIn", value: "babbaranish", href: "https://linkedin.com/in/babbaranish" },
  { icon: Github, label: "GitHub", value: "babbaranish", href: "https://github.com/babbaranish" },
  { icon: MapPin, label: "Location", value: "Abohar, Punjab", href: null },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-16 lg:px-24 py-28">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-[1px] w-8" style={{ background: "var(--accent)" }} />
        <span
          className="text-[11px] uppercase tracking-[4px] font-medium"
          style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
        >
          Contact
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.15] tracking-[-0.03em] mb-4"
        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
      >
        Let&apos;s build something{" "}
        <span style={{ color: "var(--accent)" }}>great</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-[16px] leading-[1.7] max-w-lg mb-12"
        style={{ color: "var(--text-muted)" }}
      >
        Got a project in mind or want to chat? I&apos;m always open to new opportunities and collaborations.
      </motion.p>

      {/* Contact grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {links.map(({ icon: Icon, label, value, href }, i) => {
          const inner = (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group flex items-center gap-4 p-5 rounded-xl transition-all duration-300"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
                style={{ background: "var(--accent-soft)" }}
              >
                <Icon size={18} strokeWidth={1.5} style={{ color: "var(--text-muted)" }} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[1.5px] mb-0.5" style={{ color: "var(--text-faint)" }}>
                  {label}
                </p>
                <p className="text-[14px] truncate" style={{ color: "var(--text-primary)" }}>
                  {value}
                </p>
              </div>
            </motion.div>
          );

          return href ? (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {inner}
            </a>
          ) : (
            <div key={label}>{inner}</div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-[12px]" style={{ color: "var(--text-faint)" }}>
          © 2025 Anish Babbar
        </p>
        <p className="text-[12px]" style={{ color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
          Built with Next.js + Framer Motion
        </p>
      </div>
    </section>
  );
}

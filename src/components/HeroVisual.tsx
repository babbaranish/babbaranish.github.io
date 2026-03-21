"use client";

import { motion } from "framer-motion";

const rings = [
  { size: 340, duration: 35, direction: 1 },
  { size: 240, duration: 25, direction: -1 },
  { size: 150, duration: 18, direction: 1 },
];

const orbitItems = [
  // Outer ring
  { label: "React", icon: "⚛", ring: 0, angle: 0, color: "#61dafb" },
  { label: "Node", icon: "⬢", ring: 0, angle: 120, color: "#68a063" },
  { label: "AWS", icon: "☁", ring: 0, angle: 240, color: "#ff9900" },
  // Middle ring
  { label: "TS", icon: "TS", ring: 1, angle: 45, color: "#3178c6" },
  { label: "Next", icon: "▲", ring: 1, angle: 165, color: "var(--text-primary)" },
  { label: "Git", icon: "⎇", ring: 1, angle: 285, color: "#f05032" },
  // Inner ring
  { label: "SQL", icon: "◈", ring: 2, angle: 90, color: "#e48900" },
  { label: "Redux", icon: "↻", ring: 2, angle: 270, color: "#764abc" },
];

function getXY(angle: number, radius: number) {
  const r = (angle * Math.PI) / 180;
  return { x: Math.cos(r) * radius, y: Math.sin(r) * radius };
}

export default function HeroVisual() {
  const cx = 190;

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: 400 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ width: 380, height: 380 }}
      >
        {/* Rings + their orbiting icons */}
        {rings.map((ring, ri) => {
          const items = orbitItems.filter((o) => o.ring === ri);
          return (
            <motion.div
              key={ri}
              className="absolute"
              style={{
                width: ring.size,
                height: ring.size,
                top: cx - ring.size / 2,
                left: cx - ring.size / 2,
              }}
              animate={{ rotate: 360 * ring.direction }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
            >
              {/* Ring border */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: ri === 2 ? "1px solid var(--border-hover)" : "1px dashed var(--border)",
                }}
              />

              {/* Icons on this ring — counter-rotate to stay upright */}
              {items.map((item, ii) => {
                const pos = getXY(item.angle, ring.size / 2);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: -360 * ring.direction,
                    }}
                    transition={{
                      opacity: { delay: 0.8 + ri * 0.2 + ii * 0.1, duration: 0.4 },
                      scale: { delay: 0.8 + ri * 0.2 + ii * 0.1, duration: 0.4, ease: "backOut" },
                      rotate: { duration: ring.duration, repeat: Infinity, ease: "linear" },
                    }}
                    className="absolute flex items-center justify-center"
                    style={{
                      width: 38,
                      height: 38,
                      top: ring.size / 2 + pos.y - 19,
                      left: ring.size / 2 + pos.x - 19,
                      zIndex: 10,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-xl flex items-center justify-center font-bold cursor-default transition-transform duration-300 hover:scale-125"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-md)",
                        color: item.color,
                        fontFamily: item.icon.length > 1 ? "var(--font-mono)" : undefined,
                        fontSize: item.icon.length > 1 ? 11 : 16,
                      }}
                      title={item.label}
                    >
                      {item.icon}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })}

        {/* Center glow */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 80,
            height: 80,
            top: cx - 40,
            left: cx - 40,
            background: "radial-gradient(circle, var(--accent-medium) 0%, transparent 70%)",
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 12,
            height: 12,
            top: cx - 6,
            left: cx - 6,
            background: "var(--accent)",
            boxShadow: "0 0 20px rgba(255,107,53,0.4)",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

"use client";

const techs = [
  "React", "Redux", "Node.js", "Express", "TypeScript", "JavaScript",
  "Next.js", "SQL", "AWS", "Sequelize", "Tailwind CSS",
  "Git", "React Native", "Expo", "MongoDB",
];

export default function Marquee() {
  const doubled = [...techs, ...techs];

  return (
    <div className="relative py-6 overflow-hidden" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />

      <div className="flex items-center gap-10 whitespace-nowrap" style={{ animation: "marquee 35s linear infinite" }}>
        {doubled.map((tech, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className="text-[13px] tracking-[2px] uppercase font-medium transition-colors duration-300 cursor-default"
              style={{ fontFamily: "var(--font-display)", color: "var(--marquee-text)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--marquee-text)")}
            >
              {tech}
            </span>
            <span style={{ color: "var(--text-faint)", fontSize: "8px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

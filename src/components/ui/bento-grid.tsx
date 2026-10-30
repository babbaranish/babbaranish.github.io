"use client";

import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  accentColor?: string;
}

interface BentoGridProps {
  items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-6 rounded-xl overflow-hidden transition-all duration-300",
            "border hover:-translate-y-0.5 will-change-transform",
            item.colSpan === 8 ? "md:col-span-8" :
            item.colSpan === 7 ? "md:col-span-7" :
            item.colSpan === 5 ? "md:col-span-5" :
            item.colSpan === 4 ? "md:col-span-4" :
            item.colSpan === 6 ? "md:col-span-6" :
            "md:col-span-4",
            item.hasPersistentHover && "-translate-y-0.5"
          )}
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: item.hasPersistentHover ? "var(--shadow-md)" : "var(--shadow-sm)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = item.hasPersistentHover ? "var(--shadow-md)" : "var(--shadow-sm)";
          }}
        >
          {/* Dot pattern on hover */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div
              className="absolute inset-0 bg-[length:4px_4px]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, var(--border) 1px, transparent 1px)",
              }}
            />
          </div>

          <div className="relative flex flex-col space-y-3">
            {/* Header: icon + status */}
            <div className="flex items-center justify-between">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{ background: "var(--accent-soft)" }}
              >
                {item.icon}
              </div>
              {item.status && (
                <span
                  className="text-[10px] font-medium px-2 py-1 rounded-lg uppercase tracking-wider transition-colors duration-300"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {item.status}
                </span>
              )}
            </div>

            {/* Title + meta + description */}
            <div className="space-y-1.5">
              <h3
                className="font-medium tracking-tight text-[15px]"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
                {item.meta && (
                  <span
                    className="ml-2 text-xs font-normal"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {item.meta}
                  </span>
                )}
              </h3>
              <p
                className="text-sm leading-snug"
                style={{ color: "var(--text-muted)" }}
              >
                {item.description}
              </p>
            </div>

            {/* Tags + CTA */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center flex-wrap gap-1.5 text-xs">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md transition-all duration-200 cursor-default hover-skill-tag"
                    style={{
                      background: "var(--bg-subtle)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase" as const,
                      "--tag-hover-color": item.accentColor || "var(--accent)",
                      "--tag-hover-bg": `color-mix(in srgb, ${item.accentColor || "var(--accent)"} 10%, transparent)`,
                    } as React.CSSProperties}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {item.cta && (
                <span
                  className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--text-faint)" }}
                >
                  {item.cta}
                </span>
              )}
            </div>
          </div>

          {/* Gradient border overlay */}
          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-xl p-px transition-opacity duration-300",
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            )}
            style={{
              background:
                "linear-gradient(135deg, transparent 30%, var(--border-hover) 50%, transparent 70%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };

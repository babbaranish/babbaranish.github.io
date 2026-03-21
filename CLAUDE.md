# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build with static export to `out/`
- `npm run lint` — ESLint
- No test framework configured

## Architecture

Single-page portfolio site built with **Next.js 16** (App Router, static export), **Tailwind CSS 4**, **Framer Motion**, and **Lucide React** icons.

### Theming

- CSS custom properties in `globals.css` — `:root` (light) and `[data-theme="dark"]` (dark)
- `ThemeScript.tsx` — inline script preventing flash of wrong theme on load
- `ThemeToggle.tsx` — client component toggling `data-theme` attribute + localStorage
- All components use `var(--*)` tokens (never hardcoded colors) for theme compatibility

### Fonts

Three Google Fonts loaded via `next/font` in `layout.tsx`:
- **Syne** (`--font-display`) — headings/display
- **DM Sans** (`--font-body`) — body text
- **JetBrains Mono** (`--font-mono`) — code/labels

### Components

All in `src/components/`. Each is a `"use client"` component using Framer Motion for scroll-triggered animations. Data (roles, projects, stats) is colocated as constants within each component file.

### Deployment

- GitHub Pages via `.github/workflows/deploy.yml`
- `basePath: "/new_portfolio"` in `next.config.ts` — required for GitHub Pages subdirectory serving
- Static export (`output: "export"`) — no server-side features available

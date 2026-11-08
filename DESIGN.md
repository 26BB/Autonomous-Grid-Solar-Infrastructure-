# Design System: AeroDock Solar Microgrid Telemetry

The locked design system for AeroDock autonomous drone-docking & solar microgrid infrastructure. Formulated for utility-scale energy managers, BVLOS flight operators, and grid infrastructure investors. Bound by Hallmark's strict anti-slop craft floor and rendered in a pristine, high-contrast industrial light theme.

## 1. System Identity & Philosophy
- **Genre**: modern-minimal / industrial-telemetry
- **World**: Architectural Sun-Telemetry Workbench
- **Theme**: Clean Alabaster Canvas (`#F8FAFC`), Pure White Cards (`#FFFFFF`), with Utility Sky Blue (`#0284C7`), Solar Amber (`#D97706`), and Grid Active Emerald (`#059669`)
- **Vibe**: "machined hairlines, tabular megawatt telemetry, architectural clarity, zero dark AI slop"
- **Posture**: Utility investor & BVLOS fleet cockpit

## 2. Token Architecture (`src/index.css`)
```css
:root {
  /* Surfaces & Bedrock */
  --bg-page: #F8FAFC;
  --card-bg: #FFFFFF;
  --card-bg-subtle: #F1F5F9;
  --card-border: #E2E8F0;
  --card-border-subtle: #CBD5E1;

  /* Typography Colors */
  --text-main: #0F172A;
  --text-muted: #475569;
  --text-subtle: #64748B;

  /* Energy Telemetry Pigments */
  --accent-cyan: #0284C7;
  --accent-cyan-hover: #0369A1;
  --accent-amber: #D97706;
  --accent-emerald: #059669;

  /* Header & Modals */
  --header-bg: rgba(255, 255, 255, 0.95);
  --slider-bg: #E2E8F0;

  /* Hallmark Tokens */
  --border-hairline: #E2E8F0;
  --border-focus: #0284C7;
  --font-sans: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

## 3. Typographic Discipline & Rules
- **Headlines**: `Space Grotesk`, bold, sentence case, untracked, zero small caps on labels (Hallmark Floor 9).
- **Megawatts, Battery kWh, Payback Months**: `JetBrains Mono` strictly formatted with `font-variant-numeric: tabular-nums` (`4.2 MW`, `820 kWh`, `$1.4M/yr`).
- **Prohibitions**: No `transition: all` (Floor 2), no purple-to-blue gradients (Floor 11), `overflow-x: clip` on `html` and `body` (Floor 4).

## 4. Layout & Interaction Standards
- **Header**: Light engineering header (`bg-white/95 border-b border-slate-200`) with quick navigation and fleet modeler trigger.
- **Cards**: Pure white modular cards with 1px architectural hairlines and subtle elevation.
- **Focus & Motion**: High-contrast `:focus-visible` rings with `@media (prefers-reduced-motion: reduce)` fallbacks for all HUD telemetry animations.

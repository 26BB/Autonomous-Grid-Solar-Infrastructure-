# AeroDock Systems — Autonomous Grid & Solar Infrastructure Website

A modern, high-performance React website and interactive financial modeler for autonomous drone-in-a-box (DiaB) aerial intelligence. Purpose-built for rural electric cooperatives and distributed solar portfolios, highlighting operational savings and federal grant eligibility (DOE BIL Section 40101(d) & USDA REAP/RUS).

---

## ⚡ Features & Capabilities

- **Executive Website Overview**:
  - High-altitude overview of autonomous low-altitude BVLOS operations.
  - Interactive Live Telemetry HUD card featuring automated waypoint scans, thermal fault detection, and live sensor monitors.
  - Macro Metrics Strip highlighting FAA Part 108 readiness, 75% non-dilutive grant offsets, and automated incident re-dispatch.
  - Total Cost of Ownership (TCO) breakdown comparing legacy helicopter patrols, manual drone pilots, and AeroDock DiaB systems.
  - Vertical-specific solution kits (Distribution Grid, Community Solar, Substation Thermography).
  - NDAA and Blue UAS supply chain architecture with interactive hardware specs.

- **Interactive Federal Grant & ROI Modeler**:
  - Dynamic financial modeling for Electric Cooperatives, Community Solar, and Investor-Owned Utilities (IOUs).
  - Real-time calculations for 3-year net operational yield, payback period, required dock base stations, and risk mitigation index.
  - One-click federal grant match offset toggle (BIL Section 40101(d) / DOE GRIP 75% formula match).
  - Downloadable executive board brief, USDA procurement deck checklist, and grant filing packages.

- **Responsive & Dynamic Design**:
  - Fully responsive layout optimized for mobile, tablet, and desktop viewports.
  - Smooth micro-interactions and layout transitions powered by `motion/react`.
  - Aerospace-inspired high-contrast HUD aesthetic with keyframe scanlines and targeting reticles.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS
- **Animations**: `motion/react` + Custom CSS Keyframes
- **Icons**: `lucide-react` & Google Material Symbols

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository or export from Google AI Studio:
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:3000` (or `http://localhost:5173` depending on environment configuration).

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
├── index.html                 # HTML entry point with metadata and fonts
├── metadata.json              # Application capabilities & metadata
├── package.json               # NPM dependencies and scripts
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript compiler configuration
├── src/
│   ├── main.tsx               # Main React entry point
│   ├── App.tsx                # Core application layout and view controller
│   ├── index.css              # Global styling and HUD scanline animations
│   ├── types.ts               # Shared TypeScript data models
│   └── components/
│       ├── Header.tsx                 # Navigation bar and quick links
│       ├── HeroTelemetryCard.tsx      # Interactive live aerial telemetry card
│       ├── MacroMetricsStrip.tsx      # Key operational performance metrics
│       ├── CompetitorTable.tsx        # TCO comparison breakdown
│       ├── SolutionsSection.tsx       # Vertical industry kits
│       ├── PlatformArchitecture.tsx   # Hardware & NDAA supply chain cards
│       ├── EmbeddedCalculator.tsx     # Quick ROI & grant estimator
│       ├── ModelerScreen.tsx          # Dedicated 3-Year Grant Modeler
│       ├── BoardBriefModal.tsx        # Executive summary modal
│       ├── GrantChecklistModal.tsx    # USDA/DOE filing checklist modal
│       ├── PlatformSpecsModal.tsx     # Hardware and system specification sheet
│       ├── Part108Modal.tsx           # FAA Part 108 BVLOS regulatory brief
│       ├── ProposalPackageModal.tsx   # Formal proposal package builder
│       ├── ContactPortalModal.tsx     # Enterprise dispatch & demo booking
│       └── Footer.tsx                 # Navigation footer and compliance notices
└── public/                    # Static assets
```

---

## 📄 License

Proprietary / All rights reserved.

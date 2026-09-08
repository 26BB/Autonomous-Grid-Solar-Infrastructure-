# AeroDock Systems — Autonomous Grid & Solar Infrastructure Platform
### Rapid 0-to-1 Product Architecture & Federal Grant Underwriting Modeler for Critical Energy Infrastructure

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://autonomous-grid-solar-infrastructur.vercel.app)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NDAA Compliant](https://img.shields.io/badge/NDAA_Sec._884-100%25_Blue_UAS-10B981?style=for-the-badge&logo=shield&logoColor=white)](./docs/PRD.md)
[![FAA Part 108](https://img.shields.io/badge/FAA_Part_108-BVLOS_Ready-00E5FF?style=for-the-badge)](./docs/PRD.md)
[![BIL 40101d](https://img.shields.io/badge/DOE_BIL_§40101(d)-75%25_Grant_Offset-F59E0B?style=for-the-badge)](./docs/CASE_STUDY.md)

> 🚀 **Live Interactive Application:** [https://autonomous-grid-solar-infrastructur.vercel.app](https://autonomous-grid-solar-infrastructur.vercel.app)

---

## ⚡ Executive Overview & The Problem Space

Electric utilities and commercial solar operators in North America are caught in an operational chokehold:
* **The Helicopter Trap:** Manned aerial rotor patrols cost **\$2,200 – \$3,500 per flight hour**, are scheduled only 1x annually with 4–6 week lead times, and present acute crew safety hazards around energized transmission lines.
* **Manual Drone Limitations:** Handheld consumer drone programs require expensive two-person truck rolls, 20-minute battery swaps, and unstandardized manual data ingestion.
* **Unclaimed Federal Billions:** The Bipartisan Infrastructure Law (BIL) established **Section 40101(d)**—allocating **\$5 Billion** in formula grants covering **up to 75% of capital outlays** for small utilities. Yet over 70% of eligible rural electric cooperatives never apply due to bureaucratic friction and difficulty modeling autonomous system amortization.

**AeroDock Systems** solves this by unifying **autonomous Drone-in-a-Box (DiaB) infrastructure** with an **interactive federal grant underwriting engine**. The platform enables utility operations leaders and CFOs to model their exact distribution line mileage, quantify 3-year net operational yields, apply pre-cleared 75% federal grant offsets, and export board-ready economic memoranda in under 60 seconds.

---

## 📚 Portfolio Documentation & Deep Dives

This repository is structured as an elite **Founder's Office & Principal Product Management portfolio asset**. Explore the full behind-the-scenes documentation:

| Document | Focus Area | Direct Link |
| :--- | :--- | :--- |
| **Behind-The-Build Case Study** | Executive problem teardown, TCO & payback mathematical algorithms, AI-accelerated prototyping workflow (Stitch + AI Studio), prompt architecture, and product trade-offs. | [📖 Read CASE_STUDY.md](./docs/CASE_STUDY.md) |
| **Product Requirements Document (PRD)** | Target personas (Co-op Ops Director, Solar Asset Manager, CFO), user journeys, acceptance criteria (AC), FAA Part 108 / NDAA §884 regulatory specs, and growth KPIs. | [📋 Read PRD.md](./docs/PRD.md) |

---

## 🏛️ System Architecture & Workflow

```
                                      AERODOCK SYSTEMS
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CORE PRODUCT SURFACE                                    │
│                                                                                         │
│   ┌───────────────────────────────┐               ┌─────────────────────────────────┐   │
│   │   LIVE TELEMETRY HUD CARD     │               │    PARAMETRIC FINANCIAL ENGINE  │   │
│   │ • 400ft AGL Waypoint Monitor  │               │ • Co-op / Solar / IOU Profiles  │   │
│   │ • Radiometric FLIR vs 4K U-HD │◄─────────────►│ • Line Miles & Spend Sliders    │   │
│   │ • Automated Anomaly Isolation │               │ • Threat Vector Risk Scoring    │   │
│   │ • FAA Part 108 Airspace DAA   │               │ • BIL §40101(d) 75% Offset Calc │   │
│   └──────────────┬────────────────┘               └────────────────┬────────────────┘   │
│                  │                                                 │                    │
└──────────────────┼─────────────────────────────────────────────────┼────────────────────┘
                   │                                                 │
                   ▼                                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              EXECUTIVE DELIVERABLE ENGINES                              │
│                                                                                         │
│   ┌───────────────────────────────┐               ┌─────────────────────────────────┐   │
│   │  COOPERATIVE BOARD BRIEF PDF  │               │    USDA / BIL FILING CHECKLIST  │   │
│   │ • 4-Page Board Memorandum     │               │ • SAM.gov & UEI Requirements    │   │
│   │ • 3-Yr TCO Cumulative Charts  │               │ • 75% Match Statutory Criteria  │   │
│   │ • Clamped 3.2-Mo Payback Data │               │ • Blue UAS Pre-Cleared Schedule │   │
│   └───────────────────────────────┘               └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Product Capabilities

### 1. Parametric 3-Year TCO & Federal Grant Modeler (`ModelerScreen.tsx`)
* **Infrastructure Profiles:** Pre-calibrated presets for Rural Electric Cooperatives (line miles), Community Solar (MW capacity), and Investor-Owned Utilities (transmission miles).
* **Hardware Density Logic:** Automatically calculates required dock units using empirical density factors (1 dock per 950 distribution line miles or per 25 MW solar).
* **Non-Dilutive Grant Underwriting:** Live toggle for **BIL Section 40101(d)** formula match instantly offsets 75% of hardware CapEx, reducing base dock cost from \$35,000 to **\$8,750 net**.
* **Payback Calculation:** Computes rapid capital recovery timelines (typically **2.4 to 3.8 months**) based on net operational savings over legacy contractor budgets.
* **Threat Vector Calibration:** Real-time risk mitigation scoring across Wildfire Hardening (96.4%), Vegetation Ingress (94.2%), Severe Storm Damage (91.8%), and Substation Thermography (98.1%).

### 2. High-Density Tactical Telemetry HUD (`HeroTelemetryCard.tsx`)
* Aerospace-grade dark command aesthetic (`#0B0F19` void, `#00E5FF` electric cyan, `#F59E0B` regulatory amber).
* Simulated real-time sensor streams: Ground speed, barometric AGL altitude, battery SoC, and active 18.4 km waypoint navigation.
* Interactive sensor mode switching between Radiometric FLIR Thermal and 4K Ultra-HD optical zoom.

### 3. Executive Deliverable Modal Engines
* **Board Economic Brief (`BoardBriefModal.tsx`):** Generates an official 4-page memorandum formatted for native `window.print()` rendering to US Letter PDF with unique tracking references.
* **USDA / DOE Grant Matrix (`GrantChecklistModal.tsx`):** Guides rural co-op managers through BIL §40101(d) and USDA RUS 0% interest loan schedules.
* **Turnkey Proposal Package (`ProposalPackageModal.tsx`):** Compiles scope of work, site survey milestones, and hardware bills of material.
* **FAA Part 108 Briefing (`Part108Modal.tsx`):** Outlines remote pilot in command (RPIC) NOC operations and airspace Detect-and-Avoid (DAA) compliance.

---

## 🛠️ Technical Stack

* **Core Framework:** React 19 + TypeScript (Strict Type Safety)
* **Build Tooling:** Vite 6 (Sub-second HMR & optimized production bundling)
* **Styling & Design System:** Tailwind CSS with custom aerospace HUD scanline keyframes
* **Animation & Micro-interactions:** `motion/react` (Framer Motion evolution)
* **Iconography:** Lucide React & Google Material Symbols
* **Deployment Readiness:** Single-page application (SPA) optimized for Vercel, Netlify, or AWS CloudFront

---

## 💻 Local Development & Build

### Prerequisites
* Node.js 18.x or higher
* npm or yarn

### Quickstart
```bash
# 1. Clone the repository
git clone https://github.com/your-org/Autonomous-Grid-Solar-Infrastructure-.git
cd Autonomous-Grid-Solar-Infrastructure-

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# Running at http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 📁 Repository Structure

```
├── docs/
│   ├── CASE_STUDY.md          # Behind-The-Build: 0-to-1 PM case study & AI workflow
│   └── PRD.md                 # Formal Product Requirements Document
├── src/
│   ├── components/
│   │   ├── ModelerScreen.tsx          # Dedicated 3-Year Grant & ROI Modeler
│   │   ├── HeroTelemetryCard.tsx      # Interactive live aerial telemetry HUD
│   │   ├── CompetitorTable.tsx        # Manned rotor vs manual drone vs DiaB table
│   │   ├── MacroMetricsStrip.tsx      # High-signal regulatory & operational stats
│   │   ├── SolutionsSection.tsx       # Vertical kits (Grid, Solar, Substation)
│   │   ├── PlatformArchitecture.tsx   # NDAA & Blue UAS hardware supply chain
│   │   ├── EmbeddedCalculator.tsx     # Homepage fast-calculator widget
│   │   ├── BoardBriefModal.tsx        # Printable 4-page Executive Board Brief
│   │   ├── GrantChecklistModal.tsx    # USDA RUS & BIL 40101(d) filing checklist
│   │   ├── ProposalPackageModal.tsx   # Formal proposal package builder
│   │   ├── Part108Modal.tsx           # FAA Part 108 BVLOS regulatory overview
│   │   ├── PlatformSpecsModal.tsx     # Military-grade hardware spec sheet
│   │   ├── ContactPortalModal.tsx     # Enterprise deployment & demo scheduler
│   │   ├── Header.tsx                 # Command bar navigation
│   │   └── Footer.tsx                 # Compliance disclaimers & site links
│   ├── types.ts               # Shared domain interfaces & parametric types
│   ├── App.tsx                # Master state controller & view router
│   ├── main.tsx               # Application mount entrypoint
│   └── index.css              # Aerospace HUD styling & scanlines
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🛡️ Regulatory & Compliance Summary

* **NDAA Section 884:** 100% compliant. Zero covered foreign electronics (no DJI or Autel avionics).
* **FAA Part 108 BVLOS:** Architecture ready for nationwide 1:N multi-dock remote operations.
* **Federal Cost Share:** Formulated directly for BIL Section 40101(d) 75% non-dilutive grant reimbursement and USDA RUS smart grid financing.

---

## 📄 License & Attribution

Developed as a flagship **Founder's Office / Principal Product Management portfolio prototype** for autonomous energy and defense-grade infrastructure. Proprietary architecture. All rights reserved.

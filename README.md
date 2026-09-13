# AeroDock Systems — Autonomous Grid & Solar Infrastructure Platform

### Rapid 0-to-1 Product Architecture & Federal Grant Underwriting Modeler
> **Built by Bhushan Bhosale** (Founder's Office & Principal Product Management | Pune, India)  
> 🌐 **Live Web Application:** [https://autonomous-grid-solar-infrastructur.vercel.app](https://autonomous-grid-solar-infrastructur.vercel.app)  
> 📚 **Complete Documentation Suite:** [`/docs` Directory](./docs)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://autonomous-grid-solar-infrastructur.vercel.app)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Neon Database](https://img.shields.io/badge/Database-Neon_Serverless_Postgres-00E5FF?style=for-the-badge&logo=postgresql&logoColor=black)](./docs/ARCHITECTURE.md)
[![Firebase Telemetry](https://img.shields.io/badge/Telemetry-Firebase_Realtime-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](./docs/ARCHITECTURE.md)
[![NDAA Compliant](https://img.shields.io/badge/NDAA_Sec._884-100%25_Blue_UAS-10B981?style=for-the-badge&logo=shield&logoColor=white)](./docs/PRD.md)
[![Recruiter Friendly](https://img.shields.io/badge/Documentation-100%25_Non--Tech_Friendly-10B981?style=for-the-badge)](./docs)

---

## ⚡ Executive Summary (Plain English — For HR & Non-Technical Readers)

### **What is AeroDock Systems?**
**AeroDock Systems** is an enterprise drone inspection and financial modeling platform built for electric utility companies (power grids) and commercial solar farms. It allows utility executives (CEOs, Ops Directors, CFOs) to replace expensive manned helicopter inspections with autonomous **Drone-in-a-Box (DiaB)** deployments.

### **What Real-World Business Problem Does It Solve?**
* **Eliminates Helicopter Costs & Hazards:** Traditional power line inspections require manned helicopters costing **$2,200 to $3,500 per flight hour**, scheduled only once a year with severe crew safety risks around high-voltage lines.
* **Unlocks Billions in Federal Grants:** The Bipartisan Infrastructure Law (BIL §40101(d)) established **$5 Billion in federal formula grants**, covering **up to 75% of hardware costs** for rural power companies. However, 70% of small utilities never apply because grant paperwork is too complex.
* **60-Second Board Approval:** AeroDock's underwriting engine calculates line mileage, applies pre-cleared 75% federal grant matches, and generates a printable 4-page executive Board Memorandum in **under 60 seconds**—reducing payback periods to just **2.8 months**.

---

## 📊 Business Impact & Key ROI Indicators

| Key Performance Metric | Manned Helicopter Patrols | AeroDock DiaB System | Business Advantage |
| :--- | :--- | :--- | :--- |
| **Inspection Cost / Flight Hr**| $2,200 – $3,500 / hr | **$0 / hr** (automated daily flights) | **85%+ OpEx Savings** |
| **Federal Grant Offset** | 0% (ineligible) | **75% Match (BIL §40101(d))** | $35k CapEx reduced to **$8,750 Net** |
| **Payback Horizon** | Never | **2.8 to 3.5 Months** | Instant CFO & Board Approval |
| **Inspection Frequency** | 1x annually | **Daily continuous BVLOS** | Prevents wildfire & blackout outages |

---

## 🏛️ Full-Stack System Architecture (Explained Simply)

AeroDock Systems is built on a modern 3-Tier full-stack cloud architecture:

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               AERODOCK FULL-STACK SYSTEM                                │
│                                                                                         │
│   ┌───────────────────────────┐  ┌───────────────────────────┐  ┌────────────────────┐   │
│   │   REALTIME TELEMETRY &    │  │    CLOUD POSTGRES DB      │  │  COMMAND INTERFACE │   │
│   │  AUTH (Firebase Realtime) │  │ (Neon Serverless Postgres)│  │ (React 19 + Vite)  │   │
│   │                           │  │                           │  │                    │   │
│   │ Streams live drone FLIR   │  │ Stores TCO financial      │  │ Aerospace HUD,     │   │
│   │ thermal & 4K optical feeds│  │ models & grid asset tables│  │ sliders & PDF engine│  │
│   └───────────────────────────┘  └───────────────────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Realtime Telemetry & Auth (Firebase):** Streams live aerial drone telemetry (barometric altitude, ground speed, battery status, FLIR thermal mode) and handles secure multi-tenant user access.
2. **Cloud Database (Neon Serverless Postgres):** Stores utility grid line mileage, solar infrastructure assets, saved TCO underwriting models, and inspection log history.
3. **Command Interface (React 19 + TypeScript + Vite):** Delivers a high-contrast aerospace command HUD (`#0B0F19` void aesthetic) and printable 4-page PDF Board Briefs.

👉 *For complete database schemas and technical specs, read [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md).*

---

## 📚 Complete Product & Portfolio Documentation Index

Explore the behind-the-scenes product strategy and engineering specs in the [`/docs`](./docs) folder:

| Document | Focus Area & Description | Direct Link |
| :--- | :--- | :--- |
| 📖 **Behind-The-Build Case Study** | Executive problem teardown, TCO algorithms, AI prototyping workflow, and trade-offs | [CASE_STUDY.md](./docs/CASE_STUDY.md) |
| 📋 **Product Requirements (PRD)** | Personas (Co-op Ops Director, CFO), user stories, FAA Part 108 / NDAA §884 specs | [PRD.md](./docs/PRD.md) |
| 🏛️ **System Architecture** | Full-stack Neon Postgres ERD schema, Firebase telemetry streams, and API specifications | [ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| 🚀 **Go-To-Market Strategy** | Federal grant sales playbook for Rural Electric Cooperatives & Commercial Solar operators | [GTM-STRATEGY.md](./docs/GTM-STRATEGY.md) |
| 🔬 **Customer Research Synthesis** | Synthesized findings from interviews with 12 Utility Ops Directors & CFOs | [USER-RESEARCH.md](./docs/USER-RESEARCH.md) |
| 🧪 **Quality & Test Report** | End-to-end verification report for underwriting calculations & HUD modes | [TEST-REPORT.md](./docs/TEST-REPORT.md) |

---

## 💻 Quickstart (Run Locally)

```bash
# 1. Clone repository
git clone https://github.com/26BB/Autonomous-Grid-Solar-Infrastructure-.git
cd Autonomous-Grid-Solar-Infrastructure-

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev
# Open http://localhost:5173
```

---

## 👤 Author & Portfolio Context

**Bhushan Bhosale**  
*Role Focus:* Founder's Office / Principal Product Management / Technical Growth  
*Location:* Pune, Maharashtra, India  
*LinkedIn:* [Bhushan Bhosale](https://www.linkedin.com/in/bhushan-bhosale-36aa48373/)  
*GitHub:* [@26BB](https://github.com/26BB)

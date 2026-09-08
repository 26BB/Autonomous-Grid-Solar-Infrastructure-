# Product Requirements Document (PRD): AeroDock Systems
## Autonomous Drone-in-a-Box Infrastructure & Federal Grant Underwriting Platform

> **Document Status:** APPROVED FOR PRODUCTION / STAGE 2 PROTOCOL  
> **Document Version:** v2.4.0  
> **Target Audience:** Engineering, Product Leadership, Founder's Office, Commercial Lead  
> **Target Release:** Q3 2026 Core Infrastructure  
> **Companion Document:** [Behind-The-Build Case Study](./CASE_STUDY.md)

---

## 1. Executive Summary & Vision

### 1.1 Vision Statement
AeroDock Systems provides autonomous, military-grade drone-in-a-box (DiaB) aerial inspection infrastructure engineered specifically for critical electric distribution grids, transmission lines, and utility-scale solar portfolios. 

The software platform combines continuous Beyond Visual Line of Sight (BVLOS) mission telemetry with an interactive parametric underwriting engine that automatically models capital reimbursement under the **Bipartisan Infrastructure Law (BIL) Section 40101(d)** and **USDA Rural Utilities Service (RUS)** loan facilities.

### 1.2 Strategic Objectives
1. **Compress Sales Velocity:** Reduce rural electric cooperative enterprise sales cycles from 18 months to under 90 days by shifting evaluation from speculative CapEx to a pre-underwritten 75% federal grant match.
2. **Eliminate Operational Hazmat & OpEx Waste:** Replace \$2,200/hr manned helicopter line patrols and manual drone bucket-truck dispatches with daily automated edge flights.
3. **Equip Buyer Champions:** Provide utility Operations Directors with an instant, defensible, board-ready 4-page PDF brief to secure internal CFO and Board approval.

---

## 2. Target Personas & Stakeholder Profiles

```
                      ENTERPRISE BUYING COMMITTEE MATRIX
┌───────────────────────────────────┬───────────────────────────────────┐
│     OPERATIONAL CHAMPION          │       FINANCIAL DECISION MAKER    │
│  Director of Electric Operations  │      VP of Asset Management / CFO │
│  • Primary Focus: SAIDI / SAIFI   │      • Primary Focus: IRR / TCO   │
│  • Pain: Pilot shortage, storm lag│      • Pain: Multi-hundred-k CapEx│
│  • Needs: Automated SCADA re-dispatch • Needs: Grant offset validation│
└─────────────────┬─────────────────┴─────────────────┬─────────────────┘
                  │                                   │
                  └─────────────────┬─────────────────┘
                                    ▼
                    ┌───────────────────────────────────┐
                    │       COMPLIANCE & GOVERNANCE     │
                    │   Co-op Board / Risk Committee    │
                    │   • Primary Focus: Wildfire Risk  │
                    │   • Regulatory: FAA Part 108      │
                    │   • Defense: NDAA §884 (Zero DJI) │
                    └───────────────────────────────────┘
```

### Persona A: The Rural Electric Co-op Director of Operations
* **Name / Title:** Jim Vance, VP of Electric Distribution & Grid Reliability
* **Organization:** Multi-county Generation & Transmission (G&T) / Distribution Cooperative (1,500 – 4,000 line miles).
* **Core Pressures:**
  * Severe vegetation encroachment causing line outages and wildfire ignition risk during dry red-flag conditions.
  * Manned helicopter contractors require 4-to-6-week booking lead times and cost \$250k+ per annual patrol sweep.
  * Inability to rapidly triage circuits following severe convective storms and winter icing.
* **Success Criteria:** Sub-minute storm re-dispatch, reduction in SAIFI (frequency) and SAIDI (duration) outage metrics, zero lineworker hazards.

### Persona B: Commercial & Utility-Scale Solar Asset Manager
* **Name / Title:** Elena Rostova, VP of Technical Asset Management & O&M
* **Organization:** Independent Power Producer (IPP) managing 150 MW – 1.2 GW of distributed and utility-scale solar PV.
* **Core Pressures:**
  * Diode failures, string-level clipping, and module micro-cracks result in 2.5% to 4.8% annual revenue loss if undetected.
  * IEC 62446-3 thermographic compliance requires high-resolution radiometric thermal data that manual drone contractors fail to deliver consistently.
  * Severe labor turnover and site mobilization expenses for ground technicians.
* **Success Criteria:** Daily automated aerial thermography, automatic hot-spot classification, sub-3-month payback on capital hardware.

### Persona C: Co-op Board Member & Chief Financial Officer
* **Name / Title:** Marcus Bennett, Chief Financial Officer & Board Trustee
* **Organization:** Rural Member-Owned Electric Cooperative.
* **Core Pressures:**
  * Capital expenditure constraints; high sensitivity to member rate increases.
  * Deep skepticism toward unproven high-tech hardware hype.
  * Overwhelmed by federal grant compliance requirements and audits.
* **Success Criteria:** Non-dilutive federal capital underwriting (75% match under BIL §40101d), zero-interest USDA RUS loan compatibility, clean audit trail.

---

## 3. User Journeys & End-to-End Task Flows

```
[Entry / Discovery]
        │
        ▼
[Interactive Telemetry HUD] ───► Evaluates real-time sensor streams, thermal feeds & waypoints
        │
        ▼
[Parametric Grant Modeler]  ───► Customizes Line Miles, Spend, Threat Vector, 75% Grant Toggle
        │
        ▼
[Executive Deliverable Gen] ───► Generates 4-Page Board Brief / USDA Grant Filing Matrix
        │
        ▼
[Enterprise Conversion]     ───► Submits contact / requests Turnkey Deployment Package
```

### Journey 1: Cooperative Operations Director Evaluating Grid Hardening
1. **Arrive at Platform:** Land on AeroDock Systems homepage; inspect the live aerial telemetry HUD demonstrating automated waypoint tracking, conductor clearance measurements, and radiometric thermography.
2. **Access Modeler:** Toggle into the **Autonomous ROI & Federal Grant Modeler**.
3. **Input Co-op Parameters:**
   * Select `Rural Electric Co-op` profile.
   * Adjust distribution footprint slider to `1,850 miles`.
   * Adjust current annual inspection spend to `$240,000 / yr`.
   * Select `Wildfire Hardening & Red-Flag Rapid Patrols` threat vector.
4. **Inspect Live Yield:**
   * Observe dynamically calculated 3-Year Net Savings of **\$526,500** (73% cost reduction).
   * Observe payback timeline collapsing to **3.2 Months**.
   * View required dock units (2 docks) and non-dilutive grant offset (\$52,500).
5. **Generate Board Deliverable:**
   * Enter email address in the Executive Brief generator.
   * Review preview modal of the **Cooperative Board Economic Brief**.
   * Execute browser print (`window.print()`) to generate an executive-ready PDF for the upcoming board meeting.

### Journey 2: Solar O&M Lead Ensuring Substation & Array Health
1. **Select Solar Profile:** Switch infrastructure profile to `Community Solar`.
2. **Set Capacity:** Adjust array slider to `45 MW dc`.
3. **Review Threat Vector:** Select `Substation & Transformer Radiometric Thermography`.
4. **Download Grant Checklist:** Click *Download Grant Checklist (PDF)* to verify USDA REAP and ITC Section 48 solar microgrid compatibility.

---

## 4. Functional Requirements & Acceptance Criteria (AC)

### 4.1 Live Telemetry & Mission Control HUD (`HeroTelemetryCard.tsx`)
* **Description:** Interactive, high-density aerospace HUD demonstrating real-time low-altitude flight autonomy.
* **Acceptance Criteria:**
  * **AC-4.1.1:** System shall display dynamic live telemetry metrics: Lat/Long coordinates, Altitude (AGL), True Airspeed, and Battery SoC with animated indicators.
  * **AC-4.1.2:** System shall provide an interactive waypoint map illustrating an active 18.4 km distribution feeder inspection sweep.
  * **AC-4.1.3:** System shall incorporate an interactive payload feed toggle (Radiometric Thermal FLIR vs. 4K Ultra-HD Optical zoom).
  * **AC-4.1.4:** System shall simulate autonomous anomaly detection flagging hot-spot delta temperatures ($\Delta T > +18.4^\circ\text{C}$).

### 4.2 Comparative TCO Breakdown (`CompetitorTable.tsx`)
* **Description:** High-signal comparative matrix contrasting Manned Helicopter Crews, Manual Drone Contractors, and AeroDock DiaB systems across 8 core dimensions.
* **Acceptance Criteria:**
  * **AC-4.2.1:** Must benchmark hourly run rate (\$2,200/hr rotor vs. \$150/hr pilot vs. \$11/hr automated dock amortized).
  * **AC-4.2.2:** Must contrast inspection frequency (Annual vs. Quarterly vs. Daily continuous).
  * **AC-4.2.3:** Must highlight safety and human hazard profiles (Catastrophic collision vs. Driving/bucket-truck fall risk vs. Zero human exposure).
  * **AC-4.2.4:** Must display compliance statuses (NDAA Section 884 and FAA Part 108 readiness).

### 4.3 Parametric Federal Grant & ROI Modeler (`ModelerScreen.tsx`)
* **Description:** Real-time client-side financial model computing 36-month infrastructure economics.
* **Acceptance Criteria:**
  * **AC-4.3.1:** System shall support three distinct profiles: Rural Electric Co-op (500–5,000 miles), Community Solar (10–300 MW), and IOU/G&T Net (1,000–10,000 miles).
  * **AC-4.3.2:** Docks required must calculate using integer ceiling logic: `Math.max(1, Math.round(miles / dockDivisor))` where divisor is 950 for line miles and 25 for solar MW.
  * **AC-4.3.3:** When the **BIL Section 40101(d) / DOE GRIP 75% Match** toggle is active, hardware CapEx (\$35,000/dock) must discount by exactly 75%, yielding \$8,750 net CapEx per unit.
  * **AC-4.3.4:** Payback timeline must dynamically recalculate in real-time and clamp between 2.4 and 24.0 months.
  * **AC-4.3.5:** 3-Year benchmark bars must render comparative cumulative spend across Helicopter, Manual UAV, and AeroDock with animated visual progress bars.

### 4.4 Board Economic Brief Generation Engine (`BoardBriefModal.tsx`)
* **Description:** Formal deliverable generator compiling active session data into an executive memorandum.
* **Acceptance Criteria:**
  * **AC-4.4.1:** Modal must render an official document tracking ID (`AERODOCK-BOD-[UUID]`), creation timestamp, and target stakeholder email.
  * **AC-4.4.2:** Must include an Executive Summary, Financial Summary Table, Risk & Reliability Index, Regulatory & Compliance Schedule, and Formal Sign-off blocks.
  * **AC-4.4.3:** Must trigger native browser print (`window.print()`) styled specifically for clean multi-page US Letter PDF output.

### 4.5 USDA / BIL Qualification Checklist (`GrantChecklistModal.tsx`)
* **Description:** Pre-formatted regulatory readiness checklist verifying eligibility for federal capital.
* **Acceptance Criteria:**
  * **AC-4.5.1:** Must detail BIL Section 40101(d) statutory criteria (utilities selling < 4,000,000 MWh/year eligible for 75% formula match).
  * **AC-4.5.2:** Must provide actionable guidance on SAM.gov registration, UEI allocation, and State Energy Office (SEO) submission pipelines.

---

## 5. Regulatory, Compliance & Security Architecture

```
                    ┌──────────────────────────────────────┐
                    │    REGULATORY & DEFENSE COMPLIANCE   │
                    └──────────────────┬───────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│   FAA PART 108   │          │  NDAA SEC. 884   │          │   NERC CIP-005   │
│   BVLOS READY    │          │  BLUE UAS CLEARED│          │  ELECTRONIC PERM │
│ • No visual obs. │          │ • Zero PRC chip  │          │ • Encrypted C2   │
│ • Airspace DAA   │          │ • US-origin MCU  │          │ • On-prem SCADA  │
│ • Remote PIC hub │          │ • Encrypted link │          │ • Zero cloud leak│
└──────────────────┘          └──────────────────┘          └──────────────────┘
```

### 5.1 FAA Beyond Visual Line of Sight (BVLOS) — Part 108 Readiness
* Current operations utilize FAA Part 107.31 waivers with integrated ground-based Detect-and-Avoid (DAA) radar telemetry.
* System architecture adheres directly to the FAA Aviation Rulemaking Committee (ARC) **Part 108 proposed rulemaking**:
  * 1 Remote Pilot in Command (RPIC) commanding up to 20 concurrent autonomous dock stations from a centralized Network Operations Center (NOC).
  * Automated ADS-B In receiver with acoustic acoustic/optical deconfliction geofencing within 400 ft AGL right-of-way boundaries.

### 5.2 NDAA Section 884 & Blue UAS Supply Chain
* **Covered Foreign Entity Prohibition:** Federal grant regulations (DOE and USDA) strictly disqualify any unmanned aircraft or docking systems manufactured by Da-Jiang Innovations (DJI), Autel Robotics, or containing covered Chinese avionics.
* **AeroDock Guarantee:**
  * 100% US-designed and assembled avionics.
  * NDAA-compliant flight computers running secure PX4 / ROS 2 micro-kernels.
  * Military-grade AES-256 encrypted C2 (Command & Control) data link over private cellular APN and Starlink low-latency satellite backhaul.

### 5.3 NERC CIP Cybersecurity Integrity
* **NERC CIP-005 (Electronic Security Perimeters) & CIP-007 (System Security Management):**
  * Ground base stations operate with zero inbound ports open to the public internet.
  * Telemetry streams terminate in isolated customer VPCs or direct on-premises utility SCADA servers via mutual TLS (mTLS).
  * Edge video processing performs automatic anonymization of private property outside the utility RoW corridor.

---

## 6. Success Metrics & Growth KPIs

| Metric Category | Target KPI | Tracking Mechanism | Strategic Impact |
| :--- | :--- | :--- | :--- |
| **User Engagement** | **Time-to-Model < 45s** | Session telemetry on slider interaction | Proves frictionless UX for busy utility leadership |
| **Growth & Lead Gen** | **Board Brief Conversion > 18%** | Email submissions on Brief Generator | Captures high-intent buying committee champions |
| **Product Education** | **Grant Match Discovery > 85%** | Toggle engagement on BIL §40101(d) | Directly overcomes the primary CapEx sales objection |
| **Sales Acceleration** | **Proposal Package Requests > 8%** | Modal completion on Turnkey Proposal | Directly generates sales-qualified leads (SQLs) |
| **Technical Performance**| **Core Web Vitals: LCP < 1.2s** | Lighthouse / Real User Monitoring | Ensures instant loading in rural boardroom settings |

---

## 7. Technical Non-Functional Requirements (NFR)

1. **Deterministic Financial Consistency:** All financial calculations must execute deterministically in client memory using TypeScript without external round-trip latency.
2. **Print & PDF Optimization:** All modal artifacts (`BoardBriefModal`, `GrantChecklistModal`) must include dedicated CSS `@media print` rules:
   * Stripping dark background fills to conserve ink.
   * Preserving high-contrast borders and data tables.
   * Enforcing clean page breaks across multi-page sections.
3. **Zero-Telemetry Security Guarantee:** User financial inputs (mileage, annual spend, email) must never be transmitted to third-party ad networks or unvetted analytics vendors.

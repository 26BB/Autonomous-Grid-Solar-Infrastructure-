# 🏛️ Full-Stack System Architecture: AeroDock Systems

> **Document Status:** APPROVED FOR PRODUCTION  
> **Target Segment:** Electric Utilities, Commercial Solar Operators, Systems Architects  
> **Companion Documents:** [PRD.md](./PRD.md) | [CASE_STUDY.md](./CASE_STUDY.md) | [GTM-STRATEGY.md](./GTM-STRATEGY.md)

---

## 1. System Overview & Technology Stack

AeroDock Systems is engineered as a **Full-Stack Autonomous Aerial Telemetry & Financial Modeler**. It combines real-time streaming drone telemetry with **Neon Serverless Postgres** for relational financial TCO records and **Firebase** for real-time aerial sensor feeds.

```
                                 AERODOCK SYSTEMS ARCHITECTURE
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                FRONTEND UI COMMAND DASHBOARD                              │
│                                                                                           │
│   ┌───────────────────────────────┐               ┌───────────────────────────────────┐   │
│   │   PARAMETRIC TCO MODELER UI   │               │    TACTICAL TELEMETRY HUD CARD    │   │
│   │ • Line Miles & Spend Sliders  │               │ • Radiometric FLIR Thermal Stream │   │
│   │ • BIL §40101(d) 75% Offset    │◄─────────────►│ • 4K Optical HD Sensor Stream     │   │
│   │ • Executive Board Brief Export│               │ • Automated Anomaly Isolation     │   │
│   └───────────────┬───────────────┘               └─────────────────┬─────────────────┘   │
└───────────────────┼─────────────────────────────────────────────────┼─────────────────────┘
                    │                                                 │
                    │ 1. Firebase Live Telemetry                      │ 2. API Queries & Mutations
                    ▼                                                 ▼
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                   SERVERLESS BACKEND LAYER                                │
│                                                                                           │
│   ┌───────────────────────────────┐               ┌───────────────────────────────────┐   │
│   │   FIREBASE REALTIME & AUTH    │               │      SERVERLESS API ROUTES        │   │
│   │ • Telemetry Streaming Feeds   │               │ • `/api/tco/calculate` (Modeler) │   │
│   │ • User Auth & RBAC Security   │               │ • `/api/assets/inspection-logs`   │   │
│   └───────────────────────────────┘               └─────────────────┬─────────────────┘   │
└─────────────────────────────────────────────────────────────────────┼─────────────────────┘
                                                                      │
                                                                      │ 3. SQL Relational Queries
                                                                      ▼
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                               DATABASE & PERSISTENCE LAYER                                │
│                                                                                           │
│   ┌───────────────────────────────────────────────────────────────────────────────────┐   │
│   │                            NEON SERVERLESS POSTGRES SQL                           │   │
│   │ • `infrastructure_assets` — Solar farms, distribution line miles & substations    │   │
│   │ • `tco_underwriting_models` — Saved grant payback calculations & BIL match logs    │   │
│   │ • `inspection_anomalies` — Radiometric thermal anomaly logs & GIS coordinates     │   │
│   └───────────────────────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Database ERD Schema (Neon Serverless Postgres)

```sql
-- 1. Infrastructure Assets Table
CREATE TABLE infrastructure_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  utility_name VARCHAR(255) NOT NULL,
  asset_type VARCHAR(50) NOT NULL CHECK (asset_type IN ('RECO', 'SOLAR', 'IOU')),
  distribution_line_miles INT NOT NULL DEFAULT 0,
  annual_inspection_spend DECIMAL(12, 2) NOT NULL,
  dock_units_required INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TCO Underwriting Models Table
CREATE TABLE tco_underwriting_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES infrastructure_assets(id) ON DELETE CASCADE,
  gross_capex DECIMAL(12, 2) NOT NULL DEFAULT 35000.00,
  bil_grant_offset_percent INT NOT NULL DEFAULT 75,
  net_capex DECIMAL(12, 2) NOT NULL DEFAULT 8750.00,
  annual_opex_savings DECIMAL(12, 2) NOT NULL,
  payback_period_months DECIMAL(4, 2) NOT NULL,
  risk_wildfire_mitigation DECIMAL(5, 2) DEFAULT 96.4,
  risk_vegetation_ingress DECIMAL(5, 2) DEFAULT 94.2,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Drone Inspection Logs Table
CREATE TABLE drone_inspection_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES infrastructure_assets(id) ON DELETE CASCADE,
  drone_serial VARCHAR(100) NOT NULL,
  telemetry_mode VARCHAR(50) CHECK (telemetry_mode IN ('FLIR_THERMAL', 'OPTICAL_4K')),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  altitude_agl_feet INT NOT NULL DEFAULT 400,
  anomaly_detected BOOLEAN DEFAULT FALSE,
  anomaly_severity VARCHAR(20) CHECK (anomaly_severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Technology Stack Highlights

* **Frontend:** React 19 + TypeScript 5 + Vite 6 + Tailwind CSS + Framer Motion.
* **Authentication & Realtime:** Firebase Auth & Firebase Realtime Telemetry Stream.
* **Cloud Relational Database:** Neon Serverless Postgres.
* **Deployment:** Vercel Global Edge Network (sub-second load times worldwide).

export interface PlatformSpecification {
  category: string;
  items: { label: string; value: string; detail: string }[];
}

export const PLATFORM_SPECS: PlatformSpecification[] = [
  {
    category: "Edge Docking Enclosure (AeroDock Station Gen-3)",
    items: [
      { label: "Enclosure Ingress Rating", value: "NEMA 4X / IP55 Sealed", detail: "Hermetically sealed composite chassis with hydrophobic optical port" },
      { label: "Thermal Climate Envelope", value: "-25°C to +50°C", detail: "Internal bidirectional HVAC pre-conditions battery packs prior to rapid takeoff" },
      { label: "Automated Turnaround", value: "25-Minute Rapid Charge", detail: "Inductive + high-current contact charging with cycle life telemetry" },
      { label: "Weather Station Telemetry", value: "Ultrasonic Anemometer & Rain Radar", detail: "Microclimate acoustic wind vector, barometric pressure & precipitation sensors" },
      { label: "Power & Backup", value: "120/240V AC + 4-Hour LiFePO4 UPS", detail: "Surge-suppressed dual feed with auxiliary solar/diesel generator input" }
    ]
  },
  {
    category: "Aerial Vehicle (AeroCraft 6X Pro)",
    items: [
      { label: "Propulsion Architecture", value: "Dysprosium-Free Permanent Magnet", detail: "100% US & allied supply chain magnets, zero Chinese rare-earth restrictions" },
      { label: "Max Endurance / Range", value: "48 Minutes / 32 km Radius", detail: "Aerodynamic carbon-composite airframe with redundant ESC motors" },
      { label: "Dual Radiometric Sensor Payload", value: "640x512 FLIR Boson + 48MP Optical", detail: "Calibrated 30Hz thermal with 10x optical zoom for insulator micro-cracks" },
      { label: "Airspace Safety & DAA", value: "ADS-B In/Out + FMCW Micro-Radar", detail: "Autonomous collision avoidance against non-cooperative general aviation" },
      { label: "Flight Controller & Silicon", value: "NDAA Sec. 884 Compliant FPGA", detail: "Encrypted memory architecture running FAA-audited DO-178C flight firmware" }
    ]
  },
  {
    category: "Remote Operations Center (ROC) & Cloud Platform",
    items: [
      { label: "Network Connectivity", value: "Redundant 5G + Low-Latency Starlink", detail: "Multi-carrier bonding with automated satellite failover in <250ms" },
      { label: "Fleet Scalability Ratio", value: "1 Operator : 20 Active Docks", detail: "FAA-waivered centralized supervisory control over geo-fenced corridors" },
      { label: "GIS Integration", value: "Milsoft, Futura, Esri ArcGIS & Maximo", detail: "Automatic sync of right-of-way shapefiles and work order generation" },
      { label: "Cybersecurity Standard", value: "SOC 2 Type II, FedRAMP High In-Process", detail: "End-to-end TLS 1.3 encryption with dedicated US sovereign data isolation" }
    ]
  }
];

export const PART_108_MILESTONES = [
  {
    title: "Airspace Risk Mitigation Baseline",
    status: "APPROVED / DEPLOYED",
    desc: "Demonstrated ground risk class GRC-1 along rural distribution rights-of-way with automatic population density geofencing."
  },
  {
    title: "Detect-and-Avoid (DAA) Radar Integration",
    status: "CERTIFIED",
    desc: "ASTM F3442/F3442M compliant multi-sensor airborne radar + ADS-B tracking providing 3nm cooperative & non-cooperative traffic avoidance."
  },
  {
    title: "Remote Operations Center (ROC) Protocol",
    status: "WAIVER READY",
    desc: "Single pilot overseeing up to 20 concurrent autonomous dock cycles without on-site visual observers (VOs)."
  },
  {
    title: "Part 108 Standardized Rulemaking Path",
    status: "ON SCHEDULE (2024-2025)",
    desc: "Turnkey compliance package ready for immediate filing with FAA Flight Standards District Offices (FSDO)."
  }
];

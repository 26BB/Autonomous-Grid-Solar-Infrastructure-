export type InfrastructureProfile = 'coop' | 'solar' | 'iou';

export type ThreatVector = 'wildfire' | 'vegetation' | 'storm' | 'thermography';

export interface CalculationResult {
  milesOrCapacity: number;
  spend: number;
  grantActive: boolean;
  threat: ThreatVector;
  profile: InfrastructureProfile;
  docks: number;
  baseCapex: number;
  grantOffset: number;
  effectiveCapex: number;
  recurringSaaS3Yr: number;
  aeroDock3YrTotal: number;
  threeYearBaseline: number;
  netSavings: number;
  savingsPct: number;
  paybackMonths: number;
  riskReduction: string;
  helicopter3Yr: number;
  manualUav3Yr: number;
}

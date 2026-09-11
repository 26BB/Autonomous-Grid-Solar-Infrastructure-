import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InfrastructureProfile, ThreatVector } from '../types';
import { isValidEmail } from '../utils/security';

interface ModelerScreenProps {
  onOpenBoardBriefModal: (data: {
    profile: string;
    milesOrCapacity: number;
    annualSpend: number;
    savings: number;
    paybackMonths: string;
    grantOffset: number;
    docks: number;
    email: string;
  }) => void;
  onOpenGrantChecklistModal: () => void;
  onOpenProposalPackageModal: (data: {
    profile: string;
    miles: number;
    savings: number;
    docks: number;
    grantOffset: number;
    effectiveCapex: number;
  }) => void;
}

export const ModelerScreen: React.FC<ModelerScreenProps> = ({
  onOpenBoardBriefModal,
  onOpenGrantChecklistModal,
  onOpenProposalPackageModal,
}) => {
  const [profile, setProfile] = useState<InfrastructureProfile>('coop');
  const [miles, setMiles] = useState<number>(1850);
  const [spend, setSpend] = useState<number>(240000);
  const [threat, setThreat] = useState<ThreatVector>('vegetation');
  const [grantActive, setGrantActive] = useState<boolean>(true);
  const [emailInput, setEmailInput] = useState<string>('');

  const handleProfileSelect = (p: InfrastructureProfile) => {
    setProfile(p);
    if (p === 'coop') {
      setMiles(1850);
      setSpend(240000);
    } else if (p === 'solar') {
      setMiles(45);
      setSpend(160000);
    } else if (p === 'iou') {
      setMiles(3600);
      setSpend(480000);
    }
  };

  // Dynamic calculations matching exact formulas
  const calculations = useMemo(() => {
    // Docks required: approx 1 dock per 900-950 miles, or per 25-30 MW solar
    const dockDivisor = profile === 'solar' ? 25 : 950;
    const docks = Math.max(1, Math.round(miles / dockDivisor));

    const threeYearBaseline = spend * 3;

    // AeroDock CapEx: $35,000 per base station
    const baseCapex = docks * 35000;
    const grantMatchRate = grantActive ? 0.75 : 0.0;
    const grantOffset = baseCapex * grantMatchRate;
    const effectiveCapex = baseCapex - grantOffset;

    // SaaS: $8,000 per dock / year = $24,000 per dock for 3 years
    const recurringSaaSAnnual = docks * 8000;
    const recurringSaaS3Yr = recurringSaaSAnnual * 3;
    const aeroDock3YrTotal = effectiveCapex + recurringSaaS3Yr;

    const netSavings = Math.max(0, threeYearBaseline - aeroDock3YrTotal);
    const savingsPct = Math.min(84, Math.round((netSavings / threeYearBaseline) * 100));

    // Payback in months
    const annualOpSaving = spend - recurringSaaSAnnual;
    let paybackMonths = '3.2';
    if (annualOpSaving > 0) {
      const calculatedMonths = (effectiveCapex / annualOpSaving) * 12;
      paybackMonths = Math.min(24, Math.max(2.4, calculatedMonths)).toFixed(1);
    }

    // Threat risk reduction
    let riskReduction = '94.2%';
    if (threat === 'wildfire') riskReduction = '96.4%';
    else if (threat === 'vegetation') riskReduction = '94.2%';
    else if (threat === 'storm') riskReduction = '91.8%';
    else if (threat === 'thermography') riskReduction = '98.1%';

    // Comparative benchmarks
    const helicopter3Yr = Math.round(spend * 2.25);
    const manualUav3Yr = Math.round(spend * 1.2);

    const aeroDockBarPct = Math.min(
      65,
      Math.max(14, Math.round((aeroDock3YrTotal / helicopter3Yr) * 100))
    );

    return {
      docks,
      baseCapex,
      grantOffset,
      effectiveCapex,
      recurringSaaSAnnual,
      recurringSaaS3Yr,
      aeroDock3YrTotal,
      threeYearBaseline,
      netSavings,
      savingsPct,
      paybackMonths,
      riskReduction,
      helicopter3Yr,
      manualUav3Yr,
      aeroDockBarPct,
    };
  }, [profile, miles, spend, threat, grantActive]);

  const milesLabel =
    profile === 'coop'
      ? 'Distribution Line Footprint'
      : profile === 'solar'
      ? 'Solar Array Capacity (MW dc)'
      : 'Transmission & Substation Miles';

  const milesBadge =
    profile === 'solar'
      ? `${miles.toLocaleString()} MW`
      : `${miles.toLocaleString()} mi`;

  const minMiles = profile === 'coop' ? 500 : profile === 'solar' ? 10 : 1000;
  const maxMiles = profile === 'coop' ? 5000 : profile === 'solar' ? 300 : 10000;
  const stepMiles = profile === 'solar' ? 5 : 50;

  const handleDownloadBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmail = isValidEmail(emailInput)
      ? emailInput.trim()
      : 'director@rural-electric.coop';
    onOpenBoardBriefModal({
      profile:
        profile === 'coop'
          ? 'Rural Electric Cooperative'
          : profile === 'solar'
          ? 'Community Solar Portfolio'
          : 'Investor-Owned / G&T Utility',
      milesOrCapacity: miles,
      annualSpend: spend,
      savings: calculations.netSavings,
      paybackMonths: calculations.paybackMonths,
      grantOffset: calculations.grantOffset,
      docks: calculations.docks,
      email: validEmail,
    });
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Top Headline & Context */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F30] border border-[#F59E0B]/60 text-[#F59E0B] font-mono text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
            BIL SEC. 40101(D) &amp; USDA RUS FUNDING ACCELERATOR
          </span>
          <span className="px-3 py-1 rounded-full bg-[#161F30] border border-[#2A374F] text-slate-400 font-mono text-xs">
            MODEL V4.8.2 // 2024-2025 ALLOCATIONS ACTIVE
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
          Autonomous Infrastructure ROI &amp; Federal Grant Modeler
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-3xl font-mono leading-relaxed">
          Parametrically project your 3-year net operational savings, wildfire &amp; outage mitigation yield, and capital reimbursement under Bipartisan Infrastructure Law Section 40101(d) and USDA Rural Utility Service programs.
        </p>
      </div>

      {/* Two-Column Interactive Modeler Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Parametric Sliders & Input Controls (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 bg-[#161F30] border border-[#2A374F] p-6 lg:p-8 rounded-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#2A374F] pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00E5FF] text-[22px]">
                tune
              </span>
              <h2 className="text-lg font-headline font-semibold text-white">
                System Parametric Inputs
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Live Dynamic Sync
            </span>
          </div>

          {/* Infrastructure Profile Tabs */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-slate-300">
              Infrastructure Profile
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#0B0F19] border border-[#2A374F] rounded-lg">
              <button
                type="button"
                onClick={() => handleProfileSelect('coop')}
                className={`py-2 px-3 text-xs font-mono rounded text-center transition-all cursor-pointer ${
                  profile === 'coop'
                    ? 'bg-[#161F30] text-[#00E5FF] font-bold border border-[#00E5FF]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                Rural Electric Co-op
              </button>
              <button
                type="button"
                onClick={() => handleProfileSelect('solar')}
                className={`py-2 px-3 text-xs font-mono rounded text-center transition-all cursor-pointer ${
                  profile === 'solar'
                    ? 'bg-[#161F30] text-[#00E5FF] font-bold border border-[#00E5FF]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                Community Solar
              </button>
              <button
                type="button"
                onClick={() => handleProfileSelect('iou')}
                className={`py-2 px-3 text-xs font-mono rounded text-center transition-all cursor-pointer ${
                  profile === 'iou'
                    ? 'bg-[#161F30] text-[#00E5FF] font-bold border border-[#00E5FF]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                IOU / G&amp;T Net
              </button>
            </div>
          </div>

          {/* Slider 1: Line Miles / Assets */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase text-slate-300">
                {milesLabel}
              </span>
              <span className="text-lg font-headline font-bold text-[#00E5FF]">
                {milesBadge}
              </span>
            </div>
            <input
              type="range"
              min={minMiles}
              max={maxMiles}
              step={stepMiles}
              value={miles}
              onChange={(e) => setMiles(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>{profile === 'solar' ? '10 MW' : '500 mi (Compact Substation)'}</span>
              <span>{profile === 'solar' ? '150 MW' : '2,500 mi'}</span>
              <span>{profile === 'solar' ? '300 MW' : '5,000 mi (Multi-County G&T)'}</span>
            </div>
          </div>

          {/* Slider 2: Current Annual Inspection Spend */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-mono uppercase text-slate-300">
                  Current Annual Inspection Spend
                </span>
                <span className="block text-[11px] text-slate-400 font-mono">
                  Helicopters, foot patrols, bucket trucks &amp; manual UAV
                </span>
              </div>
              <span className="text-lg font-headline font-bold text-[#00E5FF]">
                ${spend.toLocaleString()} / yr
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={600000}
              step={10000}
              value={spend}
              onChange={(e) => setSpend(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>$50,000 / yr</span>
              <span>$300,000 / yr</span>
              <span>$600,000 / yr</span>
            </div>
          </div>

          {/* Threat Vector Select */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-xs font-mono uppercase text-slate-300">
              Primary Operational Threat Vector
            </label>
            <div className="relative">
              <select
                value={threat}
                onChange={(e) => setThreat(e.target.value as ThreatVector)}
                className="w-full bg-[#0B0F19] border border-[#2A374F] rounded-lg p-3 text-sm text-slate-200 font-mono focus:border-[#00E5FF] focus:outline-none appearance-none cursor-pointer pr-10"
              >
                <option value="wildfire">
                  Wildfire Hardening &amp; Red-Flag Rapid Patrols (High Priority)
                </option>
                <option value="vegetation">
                  Vegetation Encroachment &amp; Right-of-Way Ingress
                </option>
                <option value="storm">
                  Severe Storm Rapid Post-Event Re-dispatch
                </option>
                <option value="thermography">
                  Substation &amp; Transformer Radiometric Thermography
                </option>
              </select>
              <span className="material-symbols-outlined text-slate-400 absolute right-3 top-3 pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Grant Matching Toggles */}
          <div className="flex flex-col gap-3 p-4 rounded-lg bg-[#0B0F19] border border-[#2A374F] mt-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-headline font-semibold text-white">
                  BIL Section 40101(d) / DOE GRIP 75% Match
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Apply non-dilutive formula grant offset for electric cooperatives
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={grantActive}
                  onChange={(e) => setGrantActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#161F30] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E5FF]"></div>
              </label>
            </div>

            <div className="border-t border-[#2A374F]/60 pt-3 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-mono text-slate-300">
                  USDA RUS Electric Infrastructure Loan Qualification
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Enables zero-interest 10-year repayment structure on remaining CapEx
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                PRE-APPROVED
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Calculated Financial Model & Yield Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#161F30] border border-[#00E5FF]/40 rounded-xl p-6 lg:p-7 shadow-[0_0_30px_rgba(0,229,255,0.08)] flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[#2A374F] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00E5FF]">
                  monitoring
                </span>
                <span className="text-xs font-mono tracking-wider text-slate-300 uppercase">
                  3-Year Projected Yield
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Verified ROI
              </span>
            </div>

            <div>
              <div className="text-xs font-mono uppercase text-slate-400">
                Net 3-Year Operational Savings
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={calculations.netSavings}
                  initial={{ opacity: 0.7, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="text-4xl lg:text-5xl font-headline font-bold text-[#00E5FF] mt-1 tracking-tight"
                >
                  ${calculations.netSavings.toLocaleString()}
                </motion.div>
              </AnimatePresence>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                <span className="text-emerald-400 font-bold">
                  {calculations.savingsPct}% cost reduction
                </span>{' '}
                vs. legacy manned patrols
              </div>
            </div>

            {/* Secondary Grid of 4 Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#0B0F19] border border-[#2A374F] rounded-lg">
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  Payback Timeline
                </div>
                <div className="text-xl font-headline font-bold text-white mt-1">
                  {calculations.paybackMonths} Months
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Rapid capital recovery
                </div>
              </div>

              <div className="p-3 bg-[#0B0F19] border border-[#2A374F] rounded-lg">
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  Grant Offset
                </div>
                <div className="text-xl font-headline font-bold text-[#F59E0B] mt-1">
                  ${Math.round(calculations.grantOffset).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  75% Non-dilutive match
                </div>
              </div>

              <div className="p-3 bg-[#0B0F19] border border-[#2A374F] rounded-lg">
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  Required Docks
                </div>
                <div className="text-xl font-headline font-bold text-white mt-1">
                  {calculations.docks} {calculations.docks === 1 ? 'Unit' : 'Units'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Automated coverage
                </div>
              </div>

              <div className="p-3 bg-[#0B0F19] border border-[#2A374F] rounded-lg">
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  Risk Reduction
                </div>
                <div className="text-xl font-headline font-bold text-emerald-400 mt-1">
                  {calculations.riskReduction}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Outage &amp; ignition safety
                </div>
              </div>
            </div>

            {/* Federal Grant Net CapEx Pill */}
            <div className="p-3.5 bg-[#161F30] border border-[#2A374F] rounded-lg flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-slate-300 uppercase">
                  Effective Hardware CapEx / Base
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Regular: $35,000
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-headline font-bold text-emerald-400">
                  ${Math.round(calculations.effectiveCapex / calculations.docks).toLocaleString()}
                </span>
                <span className="block text-[10px] font-mono text-slate-400">
                  {grantActive ? 'w/ 75% Sec. 40101(d) Grant' : 'Standard CapEx Rate'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenProposalPackageModal({
                  profile:
                    profile === 'coop'
                      ? 'Electric Cooperative'
                      : profile === 'solar'
                      ? 'Community Solar'
                      : 'IOU / G&T Net',
                  miles,
                  savings: calculations.netSavings,
                  docks: calculations.docks,
                  grantOffset: calculations.grantOffset,
                  effectiveCapex: calculations.effectiveCapex,
                })
              }
              className="w-full py-3 rounded-lg bg-[#00E5FF] text-[#0B0F19] font-headline font-bold text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                download_done
              </span>
              <span>Lock In Grant Proposal Package</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Year Cumulative Cost Benchmark Section */}
      <div id="benchmark-section" className="bg-[#161F30] border border-[#2A374F] rounded-xl p-6 lg:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A374F] pb-4">
          <div>
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
              Financial Modeling // 36-Month Horizon
            </span>
            <h2 className="text-2xl font-headline font-bold text-white mt-1">
              3-Year Cumulative Cost Benchmark
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1 font-mono">
              Directly comparing contracted helicopter crews, manual pilot dispatches, and AeroDock autonomous infrastructure.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 bg-red-400/80 rounded" />
              Contracted Rotor
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 bg-amber-400/80 rounded" />
              Manual UAV
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#00E5FF] rounded" />
              AeroDock DiaB
            </span>
          </div>
        </div>

        {/* Comparative Visual Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Card 1: Contracted Helicopter Crews */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#0B0F19] border border-[#2A374F] rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-red-400 uppercase font-bold">
                  Legacy Helicopter Crew
                </span>
                <span className="material-symbols-outlined text-red-400 text-[20px]">
                  flight
                </span>
              </div>
              <div className="text-2xl font-headline font-bold text-white">
                ${calculations.helicopter3Yr.toLocaleString()}
              </div>
              <div className="text-xs font-mono text-slate-400 mb-4">
                ${Math.round(calculations.helicopter3Yr / 3).toLocaleString()} / year contracted
              </div>

              <div className="w-full bg-[#161F30] h-3 rounded-full overflow-hidden mb-4 border border-[#2A374F]">
                <div className="bg-red-500/80 h-full w-full"></div>
              </div>

              <ul className="space-y-2 text-xs text-slate-400 border-t border-[#2A374F] pt-3 font-mono">
                <li className="flex items-center gap-1.5">
                  <span className="text-red-400">✕</span> 1x annual inspection cadence
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-red-400">✕</span> 4–6 week dispatch scheduling lag
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-red-400">✕</span> Significant crew aviation hazard
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-red-400">✕</span> Zero real-time post-storm data
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A374F] text-[11px] font-mono text-slate-500">
              Carbon index: 480 kg CO₂ / inspection
            </div>
          </motion.div>

          {/* Card 2: Manual Pilot Dispatches */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#0B0F19] border border-[#2A374F] rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold">
                  Manual Drone Contractors
                </span>
                <span className="material-symbols-outlined text-amber-400 text-[20px]">
                  person_pin_circle
                </span>
              </div>
              <div className="text-2xl font-headline font-bold text-white">
                ${calculations.manualUav3Yr.toLocaleString()}
              </div>
              <div className="text-xs font-mono text-slate-400 mb-4">
                ${Math.round(calculations.manualUav3Yr / 3).toLocaleString()} / year pilot triage
              </div>

              <div className="w-full bg-[#161F30] h-3 rounded-full overflow-hidden mb-4 border border-[#2A374F]">
                <div
                  className="bg-amber-500/80 h-full transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      (calculations.manualUav3Yr / calculations.helicopter3Yr) * 100
                    )}%`,
                  }}
                ></div>
              </div>

              <ul className="space-y-2 text-xs text-slate-400 border-t border-[#2A374F] pt-3 font-mono">
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-400">△</span> Quarterly line patrol cadence
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-red-400">✕</span> Truck roll &amp; travel per diem
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-red-400">✕</span> Pilot availability bottleneck
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> High-res optical imagery
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A374F] text-[11px] font-mono text-slate-500">
              Labor volatility: High turnover risk
            </div>
          </motion.div>

          {/* Card 3: AeroDock Autonomous DiaB */}
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 0 35px rgba(0,229,255,0.25)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-[#0B0F19] border-2 border-[#00E5FF] rounded-xl p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(0,229,255,0.15)] relative"
          >
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#00E5FF] text-[#0B0F19] font-mono text-[10px] font-bold uppercase tracking-wider">
              Best TCO // 64% Lower
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#00E5FF] uppercase font-bold">
                  AeroDock Autonomous DiaB
                </span>
                <span className="material-symbols-outlined text-[#00E5FF] text-[20px]">
                  smart_toy
                </span>
              </div>
              <div className="text-2xl font-headline font-bold text-[#00E5FF]">
                ${Math.round(calculations.aeroDock3YrTotal).toLocaleString()}
              </div>
              <div className="text-xs font-mono text-slate-400 mb-4">
                ${Math.round(calculations.effectiveCapex).toLocaleString()} CapEx + $
                {(calculations.docks * 8000).toLocaleString()}/yr SaaS ({calculations.docks}{' '}
                {calculations.docks === 1 ? 'Dock' : 'Docks'})
              </div>

              <div className="w-full bg-[#161F30] h-3 rounded-full overflow-hidden mb-4 border border-[#2A374F]">
                <div
                  className="bg-[#00E5FF] h-full transition-all duration-500"
                  style={{ width: `${calculations.aeroDockBarPct}%` }}
                ></div>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 border-t border-[#2A374F] pt-3 font-mono">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Daily autonomous patrols on schedule
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> 20-second automated storm re-dispatch
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Zero human field hazard
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> 100% NDAA &amp; Blue UAS Compliant
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A374F] flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Federal Cost Share:</span>
              <span className="text-[#00E5FF] font-bold">
                {grantActive ? '75% Grant Offset Applied' : 'Standard Financing'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Federal Funding & Grant Qualification Checklist */}
      <div id="grants-matrix" className="bg-[#161F30] border border-[#2A374F] rounded-xl p-6 lg:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A374F] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#F59E0B]">
                verified
              </span>
              <h2 className="text-2xl font-headline font-bold text-white">
                USDA RUS &amp; BIL Section 40101(d) Qualification Matrix
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-400 mt-1 font-mono">
              Pre-cleared regulatory documentation and non-dilutive federal capital qualification checklist for AeroDock deployments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenGrantChecklistModal}
              className="px-4 py-2 rounded bg-[#0B0F19] border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono font-semibold hover:bg-[#161F30] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                file_download
              </span>
              <span>Download Grant Checklist (PDF)</span>
            </button>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Check 1 */}
          <div className="p-4 bg-[#0B0F19] border border-[#2A374F] rounded-lg flex items-start gap-3">
            <span className="material-symbols-outlined text-emerald-400 text-[22px] shrink-0 mt-0.5">
              check_circle
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-headline font-bold text-white">
                  BIL Sec. 40101(d) Formula Match
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  75% COST-SHARE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                Covers 75% of capital outlays for small utility entities (&lt;4M MWh/yr) deploying advanced sensors, remote edge intelligence, and wildfire mitigation equipment.
              </p>
            </div>
          </div>

          {/* Check 2 */}
          <div className="p-4 bg-[#0B0F19] border border-[#2A374F] rounded-lg flex items-start gap-3">
            <span className="material-symbols-outlined text-emerald-400 text-[22px] shrink-0 mt-0.5">
              check_circle
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-headline font-bold text-white">
                  DOE GRIP (Grid Resilience &amp; Innovation)
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40">
                  TOOLKIT INCLUDED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                Topic Area 1 eligible: High-risk extreme weather hardening, automated conductor damage triage, and autonomous restoration telemetry.
              </p>
            </div>
          </div>

          {/* Check 3 */}
          <div className="p-4 bg-[#0B0F19] border border-[#2A374F] rounded-lg flex items-start gap-3">
            <span className="material-symbols-outlined text-emerald-400 text-[22px] shrink-0 mt-0.5">
              check_circle
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-headline font-bold text-white">
                  USDA RUS Electric Infrastructure Loans
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  0% INTEREST TIER
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                Approved smart grid asset class. Amortize the non-grant hardware CapEx over 10 years with zero-interest or municipal index rate options.
              </p>
            </div>
          </div>

          {/* Check 4 */}
          <div className="p-4 bg-[#0B0F19] border border-[#2A374F] rounded-lg flex items-start gap-3">
            <span className="material-symbols-outlined text-emerald-400 text-[22px] shrink-0 mt-0.5">
              check_circle
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-headline font-bold text-white">
                  NDAA Sec. 884 &amp; Blue UAS Framework
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
                  100% CERTIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                Zero covered foreign silicon, avionics, or transmission chips. Federal grant rules strictly prohibit DJI / Da-Jiang Innovations hardware from federal funds.
              </p>
            </div>
          </div>
        </div>

        {/* Action Footer for Grants */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <span className="text-xs font-mono text-slate-400">
            Need grant application assistance? AeroDock provides complete turnkey Section 40101(d) filing templates.
          </span>
          <button
            type="button"
            onClick={onOpenGrantChecklistModal}
            className="text-xs font-mono text-[#00E5FF] hover:underline flex items-center gap-1 font-bold shrink-0 cursor-pointer"
          >
            <span>Request Co-op Grant Template Kit &rarr;</span>
          </button>
        </div>
      </div>

      {/* Executive Summary & Board Deck Generator CTA */}
      <div
        id="exec-summary-box"
        className="bg-gradient-to-r from-[#161F30] to-[#0E1626] border-2 border-[#00E5FF]/40 rounded-xl p-6 sm:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6"
      >
        <div className="max-w-2xl">
          <span className="text-xs font-mono text-[#00E5FF] font-bold uppercase tracking-wider">
            Board-Ready Deliverable
          </span>
          <h3 className="text-2xl font-headline font-bold text-white mt-1">
            Generate Your Cooperative Board Economic Brief
          </h3>
          <p className="text-sm text-slate-300 mt-2 font-mono leading-relaxed">
            Receive a customized 4-page PDF complete with your specific line mileage ROI breakdown, regulatory Part 108 readiness timeline, and pre-filled Section 40101(d) grant application worksheets.
          </p>
        </div>

        <form
          onSubmit={handleDownloadBriefSubmit}
          className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch gap-3 shrink-0"
        >
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="enter utility / co-op email"
            required
            className="bg-[#0B0F19] border border-[#2A374F] rounded-lg px-4 py-3 text-sm text-white font-mono focus:border-[#00E5FF] focus:outline-none min-w-[280px]"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-[#00E5FF] text-[#0B0F19] font-headline font-bold text-sm hover:bg-white transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] whitespace-nowrap cursor-pointer"
          >
            Download PDF Brief
          </button>
        </form>
      </div>
    </div>
  );
};

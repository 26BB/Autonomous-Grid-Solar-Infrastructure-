import React, { useState, useMemo } from 'react';

interface BoardBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    profile: string;
    milesOrCapacity: number;
    annualSpend: number;
    savings: number;
    paybackMonths: string;
    grantOffset: number;
    docks: number;
    email: string;
  } | null;
}

// Memoized to prevent re-rendering modal when hidden or when external state changes
export const BoardBriefModal: React.FC<BoardBriefModalProps> = React.memo(({
  isOpen,
  onClose,
  data,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  // Security: Use Web Crypto API instead of Math.random() (CWE-338) for cryptographically secure ID generation
  const docRef = useMemo(() => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return 100000 + (array[0] % 900000);
  }, []);

  if (!isOpen || !data) return null;

  const handlePrintOrDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#161F30] border border-[#00E5FF]/40 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#2A374F] flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00E5FF] text-[26px]">
              description
            </span>
            <div>
              <h3 className="font-headline font-bold text-lg text-white">
                Cooperative Board Economic Brief (PDF Preview)
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Document Ref: AERODOCK-BOD-{docRef} // Prepared for {data.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintOrDownload}
              className="px-3 py-1.5 rounded bg-[#00E5FF] text-[#0B0F19] text-xs font-mono font-bold hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>{downloaded ? 'Print / Save PDF' : 'Download / Print PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#161F30] border border-[#2A374F] hover:border-red-400 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Printable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-200 font-mono text-xs leading-relaxed custom-scrollbar bg-[#0B0F19]/40">
          {/* Document Cover Header */}
          <div className="p-6 rounded-xl bg-[#0B0F19] border border-[#2A374F] space-y-4">
            <div className="flex justify-between items-start border-b border-[#2A374F] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#00E5FF] font-bold">
                  CONFIDENTIAL BOARD OF DIRECTORS MEMORANDUM
                </span>
                <h2 className="text-xl font-headline font-bold text-white mt-1">
                  Capital Allocation &amp; Grant Reimbursement Justification: Autonomous Drone-in-a-Box Deployment
                </h2>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <div>DATE: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div>CLASSIFICATION: FOR BOARD DELIBERATION</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
              <div>
                <span className="text-slate-500 uppercase text-[10px]">ORGANIZATION TYPE</span>
                <p className="font-bold text-white">{data.profile}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">NETWORK SIZE</span>
                <p className="font-bold text-[#00E5FF]">{data.milesOrCapacity.toLocaleString()} Units/Miles</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">BASELINE ANNUAL SPEND</span>
                <p className="font-bold text-white">${data.annualSpend.toLocaleString()}/yr</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">RECOMMENDED DOCKS</span>
                <p className="font-bold text-emerald-400">{data.docks} AeroDock Node(s)</p>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Findings */}
          <div className="space-y-2">
            <h4 className="text-sm font-headline font-bold text-[#00E5FF] uppercase tracking-wide">
              1. Executive Summary &amp; Capital Optimization
            </h4>
            <p>
              Transitioning from manual helicopter contracts and third-party UAV vendor call-outs to a permanent AeroDock edge-stationed DiaB model yields a projected <strong>${data.savings.toLocaleString()} net 3-year cash flow improvement</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
              <div className="p-3 bg-[#161F30] rounded border border-[#2A374F]">
                <div className="text-[10px] text-slate-400">CAPITAL PAYBACK</div>
                <div className="text-lg font-headline font-bold text-white mt-1">{data.paybackMonths} Months</div>
              </div>
              <div className="p-3 bg-[#161F30] rounded border border-[#2A374F]">
                <div className="text-[10px] text-slate-400">FEDERAL GRANT MATCH (75%)</div>
                <div className="text-lg font-headline font-bold text-[#F59E0B] mt-1">${Math.round(data.grantOffset).toLocaleString()}</div>
              </div>
              <div className="p-3 bg-[#161F30] rounded border border-[#2A374F]">
                <div className="text-[10px] text-slate-400">WILDFIRE &amp; OUTAGE RISK REDUCTION</div>
                <div className="text-lg font-headline font-bold text-emerald-400 mt-1">94.2% Audit Frequency</div>
              </div>
            </div>
          </div>

          {/* Section 2: Statutory Federal Grant Path */}
          <div className="space-y-2">
            <h4 className="text-sm font-headline font-bold text-[#00E5FF] uppercase tracking-wide">
              2. Bipartisan Infrastructure Law Sec. 40101(d) &amp; USDA RUS Strategy
            </h4>
            <p>
              The AeroDock architecture qualifies for non-dilutive 75% formula match grants administered by State Energy Offices under Section 40101(d). The remaining 25% co-op cost share ($8,750 per unit) qualifies under USDA Rural Utilities Service (RUS) zero-interest electric infrastructure loan facilities.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>National Defense Authorization Act (NDAA) Section 884:</strong> 100% compliant supply chain with zero covered foreign avionics.</li>
              <li><strong>FAA Part 108 Waiver Pathway:</strong> Multi-dock oversight from centralized ROC with no line-of-sight personnel needed.</li>
              <li><strong>Cybersecurity Isolation:</strong> Sovereign US cloud isolation with FedRAMP-aligned encryption keys.</li>
            </ul>
          </div>

          {/* Section 3: Recommended Board Resolution */}
          <div className="p-4 rounded-lg bg-[#0B0F19] border border-emerald-500/30 space-y-2">
            <span className="text-xs font-headline font-bold text-emerald-400 uppercase">
              3. Proposed Board Resolution Language
            </span>
            <p className="italic text-slate-300 text-[11px]">
              "RESOLVED, that the General Manager is authorized to submit a formal grant application under Bipartisan Infrastructure Law Section 40101(d) in an amount not to exceed ${Math.round(data.grantOffset).toLocaleString()} for the acquisition of {data.docks} AeroDock autonomous edge stations, and to execute standard procurement agreements conditional upon grant award."
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#2A374F] bg-[#0B0F19] flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            AeroDock Federal Solutions Team • support@aerodock.us
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#161F30] border border-[#2A374F] text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
});

BoardBriefModal.displayName = 'BoardBriefModal';

import React from 'react';

interface GrantChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHECKLIST_STEPS = [
  {
    phase: "Phase 1: Entity Eligibility & SAM.gov Registration",
    items: [
      { text: "Active Unique Entity Identifier (UEI) on SAM.gov", status: "Required" },
      { text: "Verification as Rural Electric Cooperative or Small Utility (<4M MWh/yr)", status: "Verified" },
      { text: "State Energy Office (SEO) sub-grantee portal enrollment", status: "Templates Available" }
    ]
  },
  {
    phase: "Phase 2: Technical Threat Justification & GIS Mapping",
    items: [
      { text: "Right-of-Way (ROW) wildfire hazard index overlay", status: "Exportable from GIS" },
      { text: "Historical outage duration & storm damage expenditure ledger (3-year)", status: "Standard Co-op Report" },
      { text: "Autonomous Flight Corridors geofencing delineation", status: "AeroDock Furnished" }
    ]
  },
  {
    phase: "Phase 3: Statutory Procurement & NDAA Verification",
    items: [
      { text: "NDAA Section 884 compliance certificate (Prohibiting covered foreign UAS)", status: "100% Certified" },
      { text: "Blue UAS clearance documentation for federal cost reimbursement", status: "Pre-Packaged" },
      { text: "Turnkey cost justification: $35,000 CapEx + $8,000/yr recurring SLA", status: "Fixed Rate" }
    ]
  },
  {
    phase: "Phase 4: Submission & State Energy Office (SEO) Routing",
    items: [
      { text: "Completed Form SF-424 (Application for Federal Assistance)", status: "Pre-Populated" },
      { text: "Board Resolution endorsing 25% cost-share commitment ($8,750/dock)", status: "Template Provided" },
      { text: "Community benefits plan (CBP) and workforce safety metric sheet", status: "Provided by AeroDock" }
    ]
  }
];

export const GrantChecklistModal: React.FC<GrantChecklistModalProps> = React.memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#161F30] border border-[#F59E0B]/40 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#2A374F] flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#F59E0B] text-[26px]">
              task_alt
            </span>
            <div>
              <h3 className="font-headline font-bold text-lg text-white">
                USDA RUS &amp; BIL Sec. 40101(d) Grant Qualification Checklist
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Turnkey compliance roadmap for 75% federal capital cost reimbursement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#161F30] border border-[#2A374F] hover:border-red-400 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 font-mono text-xs custom-scrollbar bg-[#0B0F19]/40">
          <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#2A374F] text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-[#00E5FF] font-bold">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Statutory Compliance Pre-Audit Status</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Under BIL Sec. 40101(d), small utilities and electric co-ops are eligible for a 75% federal cost-share (co-op required match is only 25%). All hardware must strictly comply with NDAA Section 884.
            </p>
          </div>

          <div className="space-y-5">
            {CHECKLIST_STEPS.map((group, idx) => (
              <div key={idx} className="space-y-2.5">
                <h4 className="text-white font-headline font-bold text-xs uppercase tracking-wider text-[#00E5FF]">
                  {group.phase}
                </h4>
                <div className="space-y-2">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-3 rounded-lg bg-[#161F30] border border-[#2A374F] flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                          check_circle
                        </span>
                        <span className="text-slate-200">{item.text}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0B0F19] text-[#00E5FF] border border-[#00E5FF]/30 whitespace-nowrap">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2A374F] bg-[#0B0F19] flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded bg-[#00E5FF] text-[#0B0F19] text-xs font-mono font-bold hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Checklist</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#161F30] border border-[#2A374F] text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
});
GrantChecklistModal.displayName = 'GrantChecklistModal';

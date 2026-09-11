import React, { useState } from 'react';
import { isValidEmail } from '../utils/security';

interface ProposalPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    profile: string;
    miles: number;
    savings: number;
    docks: number;
    grantOffset: number;
    effectiveCapex: number;
  } | null;
}

export const ProposalPackageModal: React.FC<ProposalPackageModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [locked, setLocked] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid official email address.');
      return;
    }
    setError('');
    setEmail(email.trim());
    setLocked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#161F30] border border-[#00E5FF]/50 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#2A374F] flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00E5FF] text-[24px]">
              verified
            </span>
            <div>
              <h3 className="font-headline font-bold text-base sm:text-lg text-white">
                Lock In Federal Grant Proposal Package
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Turnkey Section 40101(d) &amp; USDA RUS Application Vault
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
        <div className="p-6 font-mono text-xs space-y-4">
          {!locked ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#2A374F] space-y-2">
                <span className="text-[10px] uppercase text-[#00E5FF] font-bold">
                  PACKAGE SPECIFICATIONS RESERVED
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">PROFILE:</span>
                    <p className="font-bold text-white">{data.profile}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">COVERAGE:</span>
                    <p className="font-bold text-[#00E5FF]">{data.miles.toLocaleString()} Units</p>
                  </div>
                  <div>
                    <span className="text-slate-500">GRANT OFFSET:</span>
                    <p className="font-bold text-[#F59E0B]">${Math.round(data.grantOffset).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">3-YR SAVINGS:</span>
                    <p className="font-bold text-emerald-400">${data.savings.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 uppercase text-[11px]">
                  Utility / Cooperative Official Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jsmith@valleyelectric.coop"
                  className="w-full bg-[#0B0F19] border border-[#2A374F] rounded-lg px-4 py-3 text-white text-xs font-mono focus:border-[#00E5FF] focus:outline-none"
                />
                {error && (
                  <p className="text-red-400 text-[11px] font-mono mt-1">{error}</p>
                )}
              </div>

              <div className="p-3 rounded-lg bg-[#0B0F19] border border-[#2A374F] text-[11px] text-slate-400 space-y-1">
                <p className="text-slate-200 font-bold">Included in Your Package:</p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                  <li>Form SF-424 &amp; Section 40101(d) Narrative Template</li>
                  <li>Firm Fixed-Price Quote for {data.docks} AeroDock Node(s)</li>
                  <li>FAA Part 108 Site Airspace Feasibility Assessment</li>
                  <li>Board of Directors Resolution &amp; Cost-Share Justification</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#00E5FF] text-[#0B0F19] font-headline font-bold text-sm hover:bg-white transition-all cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.4)]"
              >
                Send Complete Application Vault &rarr;
              </button>
            </form>
          ) : (
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">check</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg text-white">
                  Proposal Package Locked &amp; Dispatched!
                </h4>
                <p className="text-slate-300 text-xs mt-1">
                  We've transmitted the customized grant templates, BOM quotes, and Board brief to <strong>{email}</strong>.
                </p>
              </div>
              <div className="p-3 bg-[#0B0F19] border border-[#2A374F] rounded-lg text-left text-[11px] text-slate-400 space-y-1">
                <div>Filing Window: 2024-2025 DOE / SEO Tranche B</div>
                <div>Assigned Advisor: AeroDock Federal Utility Desk</div>
              </div>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded bg-[#161F30] border border-[#2A374F] text-slate-300 hover:text-white font-mono text-xs cursor-pointer"
              >
                Return to Modeler
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

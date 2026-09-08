import React from 'react';
import { PART_108_MILESTONES } from '../data/specs';

interface Part108ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModeler: () => void;
}

export const Part108Modal: React.FC<Part108ModalProps> = ({
  isOpen,
  onClose,
  onOpenModeler,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#161F30] border border-emerald-500/40 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#2A374F] flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-400 text-[26px]">
              verified
            </span>
            <div>
              <h3 className="font-headline font-bold text-lg text-white">
                FAA Part 108 &amp; Remote Operations Center (ROC) Architecture
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Beyond Visual Line of Sight (BVLOS) Regulatory Blueprint for Rural Utilities
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
          <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#2A374F] space-y-2">
            <h4 className="text-sm font-headline font-bold text-white">
              The Part 108 Paradigm Shift: 1 Operator to 20 Docks
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              FAA Part 107 historically limited commercial UAS by requiring on-site visual observers (VOs) within eyesight of the aircraft. AeroDock's architecture bridges the interim 14 CFR § 107.31 waiver process directly into upcoming standardized Part 108 BVLOS rulemaking.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-emerald-400 font-headline font-bold text-xs uppercase tracking-wider">
              Regulatory Milestones &amp; Safety Cases
            </h4>
            {PART_108_MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#161F30] border border-[#2A374F] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-headline font-bold text-sm">
                    {m.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {m.status}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#0B0F19] border border-[#00E5FF]/30 space-y-2">
            <span className="text-[#00E5FF] font-headline font-bold text-xs uppercase">
              Turnkey FSDO Filing Package Included
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Every AeroDock deployment includes site-specific CONOPS (Concept of Operations), Airspace Analysis Reports, and pre-formatted waiver petitions submitted directly to your regional FAA Flight Standards District Office.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2A374F] bg-[#0B0F19] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenModeler();
            }}
            className="px-4 py-2 rounded bg-[#00E5FF] text-[#0B0F19] font-mono font-bold text-xs hover:bg-white transition-colors cursor-pointer"
          >
            Calculate BVLOS Cost Savings &rarr;
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#161F30] border border-[#2A374F] text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

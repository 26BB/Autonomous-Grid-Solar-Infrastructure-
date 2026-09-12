import React from 'react';
import { PLATFORM_SPECS } from '../data/specs';

interface PlatformSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Memoized to prevent re-renders when modal is closed or unrelated App state changes
export const PlatformSpecsModal: React.FC<PlatformSpecsModalProps> = React.memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#161F30] border border-[#00E5FF]/40 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#2A374F] flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00E5FF] text-[26px]">
              settings_input_component
            </span>
            <div>
              <h3 className="font-headline font-bold text-lg text-white">
                AeroDock Platform Engineering &amp; Sensor Specifications
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Military-Grade Autonomous Hardware &bull; NDAA Sec. 884 Compliant &bull; ASTM F3442 DAA
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

        {/* Specs List */}
        <div className="p-6 overflow-y-auto space-y-6 font-mono text-xs custom-scrollbar bg-[#0B0F19]/40">
          {PLATFORM_SPECS.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-[#00E5FF] font-headline font-bold text-sm uppercase tracking-wide border-b border-[#2A374F] pb-2">
                {group.category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-3.5 rounded-lg bg-[#161F30] border border-[#2A374F] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block mb-1">
                        {item.label}
                      </span>
                      <span className="text-white font-headline font-bold text-sm block mb-1">
                        {item.value}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-[#2A374F]/50 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2A374F] bg-[#0B0F19] flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Export Control: EAR99 / Non-ITAR Dual-Use Industrial Hardware
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#00E5FF] text-[#0B0F19] font-mono font-bold text-xs hover:bg-white transition-colors cursor-pointer"
          >
            Close Specifications
          </button>
        </div>
      </div>
    </div>
  );
});

PlatformSpecsModal.displayName = 'PlatformSpecsModal';

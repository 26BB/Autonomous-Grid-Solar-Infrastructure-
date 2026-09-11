import React from 'react';

interface FooterProps {
  onNavigateView: (view: 'home' | 'modeler') => void;
  onOpenSpecs: () => void;
  onOpenPart108: () => void;
  onOpenContact: () => void;
  onOpenGrantChecklist: () => void;
}

export const Footer: React.FC<FooterProps> = React.memo(({
  onNavigateView,
  onOpenSpecs,
  onOpenPart108,
  onOpenContact,
  onOpenGrantChecklist,
}) => {
  return (
    <footer className="border-t border-[#2A374F] bg-[#0B0F19] pt-16 pb-12 w-full text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00E5FF] text-[28px]">
                hexagon
              </span>
              <span className="font-headline font-bold text-xl tracking-wider text-white">
                AERODOCK
              </span>
            </div>
            <p className="text-slate-400 text-xs font-mono leading-relaxed max-w-sm">
              Autonomous aerial intelligence systems engineered exclusively for critical energy infrastructure, rural electric cooperatives, and distributed solar generation.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] text-slate-300">
                US Sovereign Supply Chain // Zero Covered Foreign Avionics
              </span>
            </div>
          </div>

          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-white text-xs uppercase tracking-wider">
              SOLUTIONS
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateView('home')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  Rural Electric Co-ops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView('home')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  Community Solar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView('modeler')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  G&amp;T Transmission Grids
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView('modeler')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  Wildfire Mitigation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-white text-xs uppercase tracking-wider">
              REGULATORY &amp; GRANTS
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenPart108}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  FAA Part 108 / ROC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateView('modeler')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  BIL Sec. 40101(d) Formula
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGrantChecklist}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  USDA RUS Financing
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSpecs}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  Blue UAS Clearance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-white text-xs uppercase tracking-wider">
              PLATFORM &amp; SPECS
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSpecs}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  AeroDock Station Gen-3
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSpecs}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  AeroCraft 6X Drone
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  Edge Operations Portal
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left"
                >
                  Request Flight Demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-[#2A374F] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2025 AeroDock Systems, Inc. All rights reserved. 100% Manufactured in the United States.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#00E5FF]">NDAA Section 884 Compliant</span>
            <span>&bull;</span>
            <span className="text-emerald-400">Blue UAS Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
});
Footer.displayName = 'Footer';

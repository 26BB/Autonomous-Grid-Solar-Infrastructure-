import React from 'react';

interface HeaderProps {
  currentView: 'home' | 'modeler';
  onNavigateView: (view: 'home' | 'modeler') => void;
  onOpenSpecs: () => void;
  onOpenPart108: () => void;
  onOpenContact: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = React.memo(({
  currentView,
  onNavigateView,
  onOpenSpecs,
  onOpenPart108,
  onOpenContact,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#2A374F]">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo & Compliance Pill */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button
            onClick={() => onNavigateView('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="AeroDock Home"
          >
            <span className="material-symbols-outlined text-[#00E5FF] text-[28px] group-hover:scale-110 transition-transform">
              hexagon
            </span>
            <span className="font-headline font-bold text-xl tracking-wider text-white">
              AERODOCK
            </span>
          </button>

          <div className="hidden xl:flex items-center px-3 py-1 rounded-full bg-[#161F30] border border-[#2A374F] text-[11px] text-[#00E5FF] font-mono select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            100% NDAA Compliant • Blue UAS Ready • Part 108 Architecture
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-headline font-medium">
          <button
            onClick={() => {
              if (currentView !== 'home') onNavigateView('home');
              setTimeout(() => onScrollToSection('solutions'), 50);
            }}
            className="text-slate-300 hover:text-[#00E5FF] transition-colors cursor-pointer"
          >
            Solutions
          </button>
          <button
            onClick={onOpenSpecs}
            className="text-slate-300 hover:text-[#00E5FF] transition-colors cursor-pointer"
          >
            Platform Specs
          </button>
          <button
            onClick={() => {
              if (currentView !== 'home') {
                onScrollToSection('benchmark-section');
              } else {
                onScrollToSection('tco-table');
              }
            }}
            className="text-slate-300 hover:text-[#00E5FF] transition-colors cursor-pointer"
          >
            TCO Comparison
          </button>
          <button
            onClick={onOpenPart108}
            className="text-slate-300 hover:text-[#00E5FF] transition-colors cursor-pointer"
          >
            Part 108 / ROC
          </button>
          <button
            onClick={() => {
              if (currentView !== 'modeler') {
                onNavigateView('modeler');
              }
              setTimeout(() => onScrollToSection('grants-matrix'), 100);
            }}
            className="text-slate-300 hover:text-[#00E5FF] transition-colors cursor-pointer"
          >
            Federal Grants
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {currentView === 'home' ? (
            <button
              onClick={() => onNavigateView('modeler')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#00E5FF] text-[#0B0F19] text-xs font-mono font-bold hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              <span>Calculate Cooperative ROI</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigateView('home')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#161F30] border border-[#00E5FF]/60 text-[#00E5FF] text-xs font-mono font-bold hover:bg-[#00E5FF] hover:text-[#0B0F19] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Overview Website</span>
            </button>
          )}

          <button
            onClick={onOpenContact}
            className="w-8 h-8 rounded-full bg-[#161F30] border border-[#2A374F] hover:border-[#00E5FF] flex items-center justify-center transition-colors cursor-pointer"
            title="Co-op Portal & Contact Integration Team"
            aria-label="Account and contact"
          >
            <span className="material-symbols-outlined text-[#00E5FF] text-[18px]">
              person
            </span>
          </button>
        </div>
      </div>
    </header>
  );
});
Header.displayName = 'Header';

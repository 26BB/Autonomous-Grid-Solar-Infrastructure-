import React from 'react';

interface HeaderProps {
  currentView: 'home' | 'modeler';
  onNavigateView: (view: 'home' | 'modeler') => void;
  onOpenSpecs: () => void;
  onOpenPart108: () => void;
  onOpenContact: () => void;
  onScrollToSection: (sectionId: string) => void;
}

// Memoized to prevent unnecessary re-renders when parent state updates
export const Header: React.FC<HeaderProps> = React.memo(({
  currentView,
  onNavigateView,
  onOpenSpecs,
  onOpenPart108,
  onOpenContact,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="h-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 flex items-center justify-between gap-2">
        {/* Logo & Compliance Pill */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
          <button
            onClick={() => onNavigateView('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none"
            aria-label="AeroDock Home"
          >
            <span className="material-symbols-outlined text-[#0284C7] text-[24px] sm:text-[28px] group-hover:scale-110 transition-transform" aria-hidden="true">
              hexagon
            </span>
            <span className="font-headline font-bold text-lg sm:text-xl tracking-wider text-slate-900">
              AERODOCK
            </span>
          </button>

          <div className="hidden xl:flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-sky-800 font-mono select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
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
            className="text-slate-600 hover:text-[#0284C7] transition-colors cursor-pointer"
          >
            Solutions
          </button>
          <button
            onClick={onOpenSpecs}
            className="text-slate-600 hover:text-[#0284C7] transition-colors cursor-pointer"
          >
            Platform Specs
          </button>
          <button
            onClick={onOpenPart108}
            className="text-slate-600 hover:text-[#0284C7] transition-colors cursor-pointer"
          >
            Part 108 & BVLOS
          </button>
          <button
            onClick={() => {
              if (currentView !== 'home') onNavigateView('home');
              setTimeout(() => onScrollToSection('calculator'), 50);
            }}
            className="text-slate-600 hover:text-[#0284C7] transition-colors cursor-pointer"
          >
            Economics & ROI
          </button>
        </nav>

        {/* Action Buttons with Mobile Responsiveness */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigateView(currentView === 'home' ? 'modeler' : 'home')}
            className="px-2.5 sm:px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {currentView === 'home' ? 'tune' : 'arrow_back'}
            </span>
            <span className="hidden sm:inline">
              {currentView === 'home' ? 'Launch Fleet Modeler' : 'Return to Overview'}
            </span>
            <span className="sm:hidden">
              {currentView === 'home' ? 'Modeler' : 'Overview'}
            </span>
          </button>

          <button
            onClick={onOpenContact}
            className="px-2.5 sm:px-4 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span className="hidden sm:inline">Request Briefing</span>
            <span className="sm:hidden">Briefing</span>
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </header>
  );
});

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HeroTelemetryCard } from './components/HeroTelemetryCard';
import { MacroMetricsStrip } from './components/MacroMetricsStrip';
import { CompetitorTable } from './components/CompetitorTable';
import { SolutionsSection } from './components/SolutionsSection';
import { PlatformArchitecture } from './components/PlatformArchitecture';
import { EmbeddedCalculator } from './components/EmbeddedCalculator';
import { ModelerScreen } from './components/ModelerScreen';
import { BoardBriefModal } from './components/BoardBriefModal';
import { GrantChecklistModal } from './components/GrantChecklistModal';
import { PlatformSpecsModal } from './components/PlatformSpecsModal';
import { Part108Modal } from './components/Part108Modal';
import { ProposalPackageModal } from './components/ProposalPackageModal';
import { ContactPortalModal } from './components/ContactPortalModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'modeler'>('home');

  // Modal states
  const [isBoardBriefOpen, setIsBoardBriefOpen] = useState(false);
  const [boardBriefData, setBoardBriefData] = useState<{
    profile: string;
    milesOrCapacity: number;
    annualSpend: number;
    savings: number;
    paybackMonths: string;
    grantOffset: number;
    docks: number;
    email: string;
  } | null>(null);

  const [isGrantChecklistOpen, setIsGrantChecklistOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isPart108Open, setIsPart108Open] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [isProposalPackageOpen, setIsProposalPackageOpen] = useState(false);
  const [proposalPackageData, setProposalPackageData] = useState<{
    profile: string;
    miles: number;
    savings: number;
    docks: number;
    grantOffset: number;
    effectiveCapex: number;
  } | null>(null);

  // Deployment form state
  const [deploymentEmail, setDeploymentEmail] = useState('');
  const [deploymentSubmitted, setDeploymentSubmitted] = useState(false);

  // Memoized handlers to prevent unnecessary component re-renders
  const handleScrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavigateView = useCallback((view: 'home' | 'modeler') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenSpecs = useCallback(() => setIsSpecsOpen(true), []);
  const handleCloseSpecs = useCallback(() => setIsSpecsOpen(false), []);

  const handleOpenPart108 = useCallback(() => setIsPart108Open(true), []);
  const handleClosePart108 = useCallback(() => setIsPart108Open(false), []);

  const handleOpenContact = useCallback(() => setIsContactOpen(true), []);
  const handleCloseContact = useCallback(() => setIsContactOpen(false), []);

  const handleOpenGrantChecklist = useCallback(() => setIsGrantChecklistOpen(true), []);
  const handleCloseGrantChecklist = useCallback(() => setIsGrantChecklistOpen(false), []);

  const handleCloseBoardBrief = useCallback(() => setIsBoardBriefOpen(false), []);
  const handleCloseProposalPackage = useCallback(() => setIsProposalPackageOpen(false), []);

  const handleOpenBoardBrief = useCallback(
    (data: {
      profile: string;
      milesOrCapacity: number;
      annualSpend: number;
      savings: number;
      paybackMonths: string;
      grantOffset: number;
      docks: number;
      email: string;
    }) => {
      setBoardBriefData(data);
      setIsBoardBriefOpen(true);
    },
    []
  );

  const handleOpenProposalPackage = useCallback(
    (data: {
      profile: string;
      miles: number;
      savings: number;
      docks: number;
      grantOffset: number;
      effectiveCapex: number;
    }) => {
      setProposalPackageData(data);
      setIsProposalPackageOpen(true);
    },
    []
  );

  const handleOpenQuickProposal = useCallback(
    (summary: { profile: string; size: string; savings: string }) => {
      const numericSavings = parseInt(summary.savings.replace(/[^0-9]/g, '')) * 3 || 420000;
      const numericSize = parseInt(summary.size.replace(/[^0-9]/g, '')) || 1500;
      setProposalPackageData({
        profile: summary.profile,
        miles: numericSize,
        savings: numericSavings,
        docks: Math.max(1, Math.round(numericSize / 950)),
        grantOffset: Math.max(1, Math.round(numericSize / 950)) * 35000 * 0.75,
        effectiveCapex: Math.max(1, Math.round(numericSize / 950)) * 35000 * 0.25,
      });
      setIsProposalPackageOpen(true);
    },
    []
  );

  const handleNavigateToModelerAndScroll = useCallback(() => {
    setCurrentView('modeler');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSolutionSelect = useCallback((solution: 'coop' | 'solar') => {
    setCurrentView('modeler');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeploymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deploymentEmail) return;
    setDeploymentSubmitted(true);
    setTimeout(() => {
      setDeploymentSubmitted(false);
      setDeploymentEmail('');
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F8FAFC] flex flex-col justify-between selection:bg-[#00E5FF] selection:text-[#0B0F19]">
      {/* Top Banner: Federal Funding Open Notice */}
      <div className="w-full py-1.5 px-4 text-center text-xs font-mono border-b border-[#2A374F] bg-[#111827] text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5 text-[#00E5FF] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            FY 2024–2026 BIL Section 40101(d) &amp; USDA RUS Grants Open
          </span>
          <span className="hidden md:inline text-slate-500">&bull;</span>
          <span className="hidden md:inline">
            Pre-cleared 75% Non-Dilutive Infrastructure Cost-Share for Electric Co-ops
          </span>
        </div>
      </div>

      {/* Persistent Navigation Header */}
      <Header
        currentView={currentView}
        onNavigateView={handleNavigateView}
        onOpenSpecs={handleOpenSpecs}
        onOpenPart108={handleOpenPart108}
        onOpenContact={handleOpenContact}
        onScrollToSection={handleScrollToSection}
      />

      {/* Screen Navigation Switcher Bar */}
      <div className="w-full py-2.5 px-4 sm:px-8 border-b border-[#2A374F] bg-[#101726]/90 backdrop-blur sticky top-20 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Active Screen:
            </span>
            <div className="inline-flex rounded-lg p-1 bg-[#0B0F19] border border-[#2A374F]">
              <button
                onClick={() => handleNavigateView('home')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  currentView === 'home'
                    ? 'bg-[#161F30] text-[#00E5FF] font-bold border border-[#00E5FF]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Website Overview
              </button>
              <button
                onClick={() => handleNavigateView('modeler')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  currentView === 'modeler'
                    ? 'bg-[#161F30] text-[#00E5FF] font-bold border border-[#00E5FF]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Federal Grant Modeler &amp; ROI
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Telemetry &amp; Grant Formulas Active
            </span>
            <span className="hidden sm:inline">|</span>
            <button
              onClick={handleOpenGrantChecklist}
              className="text-[#00E5FF] hover:underline cursor-pointer"
            >
              Filing Checklist (PDF) &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full flex-1 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col gap-12"
            >
              {/* HERO SECTION */}
              <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full pt-4 sm:pt-8 pb-8 flex flex-col lg:flex-row items-center gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex-1 flex flex-col items-start z-10"
                >
                  {/* Micro Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161F30] border border-[#F59E0B] text-xs font-mono text-[#F59E0B] mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping"></span>
                    NORMALIZING LOW-ALTITUDE BVLOS INSPECTION
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-headline font-bold text-white tracking-tight leading-tight mb-6">
                    Autonomous Grid &amp; Solar Infrastructure{' '}
                    <span className="text-[#00E5FF]">— at 46% Lower Total Cost.</span>
                  </h1>

                  <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed font-mono">
                    Replace variable pilot dispatches with edge-docked aerial intelligence. Purpose-built for rural electric lines and distributed solar portfolios, fully fundable through DOE &amp; USDA infrastructure grants.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(0,229,255,0.45)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setCurrentView('home');
                        setTimeout(() => handleScrollToSection('solutions'), 50);
                      }}
                      className="px-6 py-3.5 rounded-lg bg-[#00E5FF] text-[#0B0F19] font-headline font-bold text-sm hover:bg-white hover:text-black transition-all text-center shadow-lg shadow-[#00E5FF]/20 cursor-pointer"
                    >
                      Explore Tier-2 Solution Kits
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleOpenGrantChecklist}
                      className="px-6 py-3.5 rounded-lg bg-[#161F30] border border-[#2A374F] hover:border-[#00E5FF] text-white font-headline font-semibold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      <span>Download USDA/GRIP Procurement Deck</span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Live Telemetry Card */}
                <HeroTelemetryCard />
              </section>

              {/* MACRO METRICS STRIP */}
              <MacroMetricsStrip
                onOpenPart108={handleOpenPart108}
                onNavigateToModeler={handleNavigateToModelerAndScroll}
              />

              {/* TCO COMPARISON TABLE */}
              <CompetitorTable
                onNavigateToModeler={handleNavigateToModelerAndScroll}
              />

              {/* SECTOR-SPECIFIC VERTICAL SOLUTIONS */}
              <SolutionsSection
                onSelectSolution={handleSolutionSelect}
              />

              {/* PLATFORM ARCHITECTURE & SUPPLY CHAIN */}
              <PlatformArchitecture onOpenSpecs={handleOpenSpecs} />

              {/* EMBEDDED QUICK CALCULATOR */}
              <EmbeddedCalculator
                onNavigateToFullModeler={handleNavigateToModelerAndScroll}
                onOpenProposalModal={handleOpenQuickProposal}
              />

              {/* INITIATE DEPLOYMENT ENTERPRISE CTA */}
              <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-[#161F30] to-[#0B0F19] border border-[#2A374F] rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
                  <div className="relative z-10 max-w-2xl mx-auto">
                    <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest mb-3 block font-bold">
                      INITIATE DEPLOYMENT
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white mb-4">
                      Deploy Autonomous Asset Oversight on Your Infrastructure.
                    </h2>
                    <p className="text-slate-400 font-mono text-sm sm:text-base mb-8">
                      Speak with our aerospace integration team to review your cooperative's GIS map data and secure your USDA grant allocation slot.
                    </p>

                    <form
                      onSubmit={handleDeploymentSubmit}
                      className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
                    >
                      <input
                        type="email"
                        required
                        value={deploymentEmail}
                        onChange={(e) => setDeploymentEmail(e.target.value)}
                        placeholder="Enter corporate or co-op email..."
                        className="bg-[#0B0F19] border border-[#2A374F] rounded-lg px-4 py-3 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#00E5FF] flex-1"
                      />
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="px-6 py-3 rounded-lg bg-[#00E5FF] text-[#0B0F19] font-headline font-bold text-sm hover:bg-white hover:text-black transition-all whitespace-nowrap shadow-lg cursor-pointer"
                      >
                        Request Spec Sheet &amp; Grant Toolkit
                      </motion.button>
                    </form>

                    {deploymentSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-3 rounded-lg bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Toolkit dispatched! An AeroDock engineer has received your request.</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </section>
            </motion.div>
          ) : (
            /* DEDICATED MODELER SCREEN (Image 1) */
            <motion.div
              key="modeler-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full"
            >
              <ModelerScreen
                onOpenBoardBriefModal={handleOpenBoardBrief}
              onOpenGrantChecklistModal={handleOpenGrantChecklist}
                onOpenProposalPackageModal={handleOpenProposalPackage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>


      {/* Global Modals */}
      <BoardBriefModal
        isOpen={isBoardBriefOpen}
        onClose={handleCloseBoardBrief}
        data={boardBriefData}
      />

      <GrantChecklistModal
        isOpen={isGrantChecklistOpen}
        onClose={handleCloseGrantChecklist}
      />

      <PlatformSpecsModal
        isOpen={isSpecsOpen}
        onClose={handleCloseSpecs}
      />

      <Part108Modal
        isOpen={isPart108Open}
        onClose={handleClosePart108}
        onOpenModeler={handleNavigateToModelerAndScroll}
      />

      <ProposalPackageModal
        isOpen={isProposalPackageOpen}
        onClose={handleCloseProposalPackage}
        data={proposalPackageData}
      />

      <ContactPortalModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
      />

      {/* Persistent Footer */}
      <Footer
        onNavigateView={handleNavigateView}
        onOpenSpecs={handleOpenSpecs}
        onOpenPart108={handleOpenPart108}
        onOpenContact={handleOpenContact}
        onOpenGrantChecklist={handleOpenGrantChecklist}
      />
    </div>
  );
}

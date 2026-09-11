import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EmbeddedCalculatorProps {
  onNavigateToFullModeler: () => void;
  onOpenProposalModal: (summary: { profile: string; size: string; savings: string }) => void;
}

export const EmbeddedCalculator: React.FC<EmbeddedCalculatorProps> = React.memo(({
  onNavigateToFullModeler,
  onOpenProposalModal,
}) => {
  const [profile, setProfile] = useState<'coop' | 'solar'>('coop');
  const [sliderVal, setSliderVal] = useState<number>(1500);

  const handleProfileChange = (newProfile: 'coop' | 'solar') => {
    setProfile(newProfile);
    if (newProfile === 'coop') {
      setSliderVal(1500);
    } else {
      setSliderVal(25);
    }
  };

  const annualSavings =
    profile === 'coop'
      ? Math.round(sliderVal * 280)
      : Math.round(sliderVal * 3500);

  const riskReduction = profile === 'coop' ? '94.2%' : '96.8%';
  const sizeText =
    profile === 'coop'
      ? `${sliderVal.toLocaleString()} Miles`
      : `${sliderVal.toLocaleString()} MW`;

  return (
    <section className="px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto w-full mb-20 sm:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="bg-[#161F30] border border-[#2A374F] rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest mb-2 block">
            FINANCIAL MODELING
          </span>
          <h2 className="text-3xl font-headline font-bold text-white mb-3">
            Interactive Grant &amp; ROI Calculator
          </h2>
          <p className="text-slate-400 text-sm font-mono">
            Estimate your cooperative's annual inspection savings and eligible federal funding match instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                Infrastructure Profile
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleProfileChange('coop')}
                  className={`px-4 py-3 rounded-lg font-headline font-semibold text-sm transition-all text-center cursor-pointer ${
                    profile === 'coop'
                      ? 'bg-[#00E5FF] text-[#0B0F19] shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'bg-[#0B0F19] border border-[#2A374F] text-white hover:border-slate-500'
                  }`}
                >
                  Electric Co-op
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleProfileChange('solar')}
                  className={`px-4 py-3 rounded-lg font-headline font-semibold text-sm transition-all text-center cursor-pointer ${
                    profile === 'solar'
                      ? 'bg-[#00E5FF] text-[#0B0F19] shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'bg-[#0B0F19] border border-[#2A374F] text-white hover:border-slate-500'
                  }`}
                >
                  Community Solar
                </motion.button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300 uppercase">
                  {profile === 'coop' ? 'Total Line Miles' : 'Portfolio Capacity (MW)'}
                </label>
                <span className="text-sm font-headline font-bold text-[#00E5FF]">
                  {sizeText}
                </span>
              </div>
              <input
                type="range"
                min={profile === 'coop' ? 200 : 5}
                max={profile === 'coop' ? 8000 : 100}
                step={profile === 'coop' ? 100 : 5}
                value={sliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="w-full accent-[#00E5FF] bg-[#0B0F19] h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>{profile === 'coop' ? '200 mi' : '5 MW'}</span>
                <span>{profile === 'coop' ? '4,000 mi' : '50 MW'}</span>
                <span>{profile === 'coop' ? '8,000 mi' : '100 MW'}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#0B0F19] border border-[#2A374F] text-xs font-mono text-slate-400 space-y-1">
              <p className="text-white font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Federal Funding Eligibility Notes:
              </p>
              <p className="leading-relaxed">
                Qualifies for up to 75% non-dilutive formula match under USDA REAP and DOE Grid Resilience Innovation Partnerships (GRIP) programs.
              </p>
            </div>
          </div>

          {/* Dynamic Output Display */}
          <div className="bg-[#0B0F19] border border-[#2A374F] rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                PROJECTED ANNUAL SAVINGS
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={annualSavings}
                  initial={{ opacity: 0.6, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="text-4xl sm:text-5xl font-headline font-bold text-[#00E5FF] tracking-tight"
                >
                  ${annualSavings.toLocaleString()}
                </motion.div>
              </AnimatePresence>
              <span className="text-xs text-slate-400 font-mono mt-1 block">
                Calculated on automated daily aerial dispatch
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2A374F]">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  RISK REDUCTION
                </span>
                <div className="text-xl font-headline font-bold text-white">
                  {riskReduction}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block mb-1">
                  FEDERAL GRANT MATCH
                </span>
                <div className="text-xl font-headline font-bold text-[#F59E0B]">
                  Up to 75%
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() =>
                  onOpenProposalModal({
                    profile: profile === 'coop' ? 'Electric Cooperative' : 'Community Solar',
                    size: sizeText,
                    savings: `$${annualSavings.toLocaleString()}/yr`,
                  })
                }
                className="w-full py-3 rounded bg-[#00E5FF] text-[#0B0F19] font-headline font-bold text-sm hover:bg-white hover:text-black transition-all text-center cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              >
                Lock In Grant Proposal Package
              </motion.button>

              <button
                type="button"
                onClick={onNavigateToFullModeler}
                className="w-full py-2 text-xs font-mono text-[#00E5FF] hover:underline flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Open Comprehensive 3-Year Modeler with Sec. 40101(d) Breakdown</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
});
EmbeddedCalculator.displayName = 'EmbeddedCalculator';


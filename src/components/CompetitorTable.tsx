import React from 'react';
import { motion } from 'motion/react';

interface CompetitorTableProps {
  onNavigateToModeler: () => void;
}

// Memoized to avoid re-rendering heavy comparison table DOM on parent state changes
export const CompetitorTable: React.FC<CompetitorTableProps> = React.memo(({ onNavigateToModeler }) => {
  return (
    <section id="tco-table" className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full mb-20 sm:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
      >
        <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest mb-3 block">
          BENCHMARK ANALYSIS
        </span>
        <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white mb-4">
          Why Mid-Market Infrastructure Chooses AeroDock
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-mono">
          A direct look at hardware outlays, hidden software add-ons, and regulatory compliance.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="overflow-x-auto bg-[#161F30] border border-[#2A374F] rounded-xl shadow-2xl custom-scrollbar"
      >
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-[#2A374F] bg-[#0B0F19]/50">
              <th className="p-4 text-xs font-mono text-slate-300">Feature / Parameter</th>
              <th className="p-4 text-xs font-mono text-slate-400">DJI Dock 2</th>
              <th className="p-4 text-xs font-mono text-slate-400">Skydio Dock X10</th>
              <th className="p-4 text-xs font-mono text-slate-400">Percepto AIM</th>
              <th className="p-4 text-xs font-mono text-[#00E5FF] bg-[#00E5FF]/10 border-x border-[#00E5FF]/30">
                AeroDock System
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A374F]/50 text-sm font-mono">
            {/* Row 1 */}
            <tr className="hover:bg-[#0B0F19]/40 transition-colors group">
              <td className="p-4 font-headline font-semibold text-white group-hover:text-[#00E5FF] transition-colors">Hardware Upfront</td>
              <td className="p-4 text-slate-400">$18,500</td>
              <td className="p-4 text-slate-400">$65,000</td>
              <td className="p-4 text-slate-400">$120,000+</td>
              <td className="p-4 text-white font-semibold bg-[#00E5FF]/10 border-x border-[#00E5FF]/30">
                $35,000
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="hover:bg-[#0B0F19]/40 transition-colors group">
              <td className="p-4 font-headline font-semibold text-white group-hover:text-[#00E5FF] transition-colors">3-Year SaaS Software</td>
              <td className="p-4 text-slate-400">$12,000</td>
              <td className="p-4 text-slate-400">$24,000</td>
              <td className="p-4 text-slate-400">$45,000</td>
              <td className="p-4 text-white font-semibold bg-[#00E5FF]/10 border-x border-[#00E5FF]/30">
                $24,000 ($8k/yr)
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="hover:bg-[#0B0F19]/40 transition-colors group">
              <td className="p-4 font-headline font-semibold text-white group-hover:text-[#00E5FF] transition-colors">NDAA / US Grant Compliance</td>
              <td className="p-4 text-red-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">cancel</span>
                  Restricted
                </span>
              </td>
              <td className="p-4 text-emerald-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Yes
                </span>
              </td>
              <td className="p-4 text-emerald-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Yes
                </span>
              </td>
              <td className="p-4 text-emerald-400 font-semibold bg-[#00E5FF]/10 border-x border-[#00E5FF]/30">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] animate-pulse">verified</span>
                  100% Compliant / Blue UAS
                </span>
              </td>
            </tr>

            {/* Row 4 */}
            <tr className="hover:bg-[#0B0F19]/40 transition-colors group">
              <td className="p-4 font-headline font-semibold text-white group-hover:text-[#00E5FF] transition-colors">Piloting Model</td>
              <td className="p-4 text-slate-400">On-Site VO Required</td>
              <td className="p-4 text-slate-400">Semi-Autonomous</td>
              <td className="p-4 text-slate-400">Enterprise ROC</td>
              <td className="p-4 text-white font-semibold bg-[#00E5FF]/10 border-x border-[#00E5FF]/30">
                Full Part 108 Waiver Ready
              </td>
            </tr>

            {/* Row 5 */}
            <tr className="bg-[#0B0F19]/60">
              <td className="p-4 font-headline font-bold text-white">3-Year All-In TCO</td>
              <td className="p-4 text-slate-400 font-bold">$30,500 + Risk</td>
              <td className="p-4 text-slate-400 font-bold">$89,000</td>
              <td className="p-4 text-slate-400 font-bold">$165,000</td>
              <td className="p-4 text-[#00E5FF] font-bold bg-[#00E5FF]/20 border-x border-[#00E5FF]/30 text-base">
                <div className="flex items-center justify-between">
                  <span>$59,000</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#00E5FF] text-[#0B0F19] font-bold ml-2 shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                    46% Lower
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-2">
        <span>* TCO reflects baseline single-enclosure deployment with sensor package and standard cloud SLA over 36 months.</span>
        <button
          onClick={onNavigateToModeler}
          className="text-[#00E5FF] hover:underline font-bold flex items-center gap-1 cursor-pointer"
        >
          Model specific fleet savings in the ROI tool &rarr;
        </button>
      </div>
    </section>
  );
});

CompetitorTable.displayName = 'CompetitorTable';


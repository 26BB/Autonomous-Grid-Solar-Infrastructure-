import React from 'react';
import { motion } from 'motion/react';

interface MacroMetricsStripProps {
  onOpenPart108: () => void;
  onNavigateToModeler: () => void;
}

// Memoized to avoid re-rendering static macro cards when unrelated App state changes
export const MacroMetricsStrip: React.FC<MacroMetricsStripProps> = React.memo(({
  onOpenPart108,
  onNavigateToModeler,
}) => {
  return (
    <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full mb-20 sm:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350 } }}
          className="bg-[#161F30] border border-[#2A374F] p-6 rounded-xl relative overflow-hidden group hover:border-[#00E5FF] transition-colors shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-[#00E5FF] text-[28px] group-hover:scale-110 transition-transform">
              route
            </span>
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
              Geographic Footprint
            </span>
          </div>
          <h3 className="text-3xl font-headline font-bold text-white mb-2 tracking-tight">
            2.5M+ Line Miles
          </h3>
          <p className="text-sm text-slate-400 font-mono leading-relaxed">
            Servicing the 75% of US landmass managed by member-owned rural electric cooperatives.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350 } }}
          onClick={onNavigateToModeler}
          className="bg-[#161F30] border border-[#2A374F] p-6 rounded-xl relative overflow-hidden group hover:border-[#F59E0B] transition-colors cursor-pointer shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F59E0B]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-[#F59E0B] text-[28px] group-hover:scale-110 transition-transform">
              payments
            </span>
            <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-wider">
              Capital Efficiency
            </span>
          </div>
          <h3 className="text-3xl font-headline font-bold text-white mb-2 tracking-tight">
            $35,000 Upfront CapEx
          </h3>
          <p className="text-sm text-slate-400 font-mono leading-relaxed">
            Eliminating tier-1 cost barriers with transparent $8k/yr recurring SaaS. 
            <span className="text-[#00E5FF] block mt-1 hover:underline">
              Model grant offset &rarr;
            </span>
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.25 }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350 } }}
          onClick={onOpenPart108}
          className="bg-[#161F30] border border-[#2A374F] p-6 rounded-xl relative overflow-hidden group hover:border-emerald-400 transition-colors cursor-pointer shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-emerald-400 text-[28px] group-hover:scale-110 transition-transform">
              verified
            </span>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Regulatory Standard
            </span>
          </div>
          <h3 className="text-3xl font-headline font-bold text-white mb-2 tracking-tight">
            FAA Part 108 Ready
          </h3>
          <p className="text-sm text-slate-400 font-mono leading-relaxed">
            Centralized Remote Operations Center (ROC) workflow without on-site visual observers.
            <span className="text-emerald-400 block mt-1 hover:underline">
              Read whitepaper &rarr;
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
});

MacroMetricsStrip.displayName = 'MacroMetricsStrip';


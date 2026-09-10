import React from 'react';
import { motion } from 'motion/react';

interface PlatformArchitectureProps {
  onOpenSpecs: () => void;
}

// Memoized to avoid re-rendering platform architecture section on unrelated App state changes
export const PlatformArchitecture: React.FC<PlatformArchitectureProps> = React.memo(({ onOpenSpecs }) => {
  return (
    <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full mb-20 sm:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
      >
        <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest mb-3 block">
          HARDWARE INTEGRITY
        </span>
        <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white mb-4">
          Platform Architecture &amp; Supply Chain Resilience
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-mono">
          Engineered from the silicon up to guarantee zero foreign telemetry leaks and operational durability in extreme climates.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350 } }}
          className="bg-[#161F30] border border-[#2A374F] p-6 rounded-xl flex flex-col justify-between hover:border-[#00E5FF] transition-colors shadow-lg group"
        >
          <div>
            <div className="w-12 h-12 rounded bg-[#0B0F19] border border-[#2A374F] flex items-center justify-center mb-6 group-hover:border-[#00E5FF]/40 group-hover:scale-105 transition-all">
              <span className="material-symbols-outlined text-[#00E5FF] text-[24px]">
                security
              </span>
            </div>
            <h3 className="text-lg font-headline font-bold text-white mb-2">
              Dysprosium-Free Propulsion
            </h3>
            <p className="text-slate-400 text-sm font-mono leading-relaxed">
              Proprietary brushless motor architecture entirely free of Chinese rare-earth dependencies, fully certified for federal defense and critical utility deployment.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#2A374F] text-xs text-[#00E5FF] font-mono font-bold flex items-center justify-between">
            <span>100% SECURE SUPPLY CHAIN</span>
            <span className="text-slate-500">NDAA SEC 884</span>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.16 }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350 } }}
          className="bg-[#161F30] border border-[#2A374F] p-6 rounded-xl flex flex-col justify-between hover:border-[#F59E0B] transition-colors shadow-lg group"
        >
          <div>
            <div className="w-12 h-12 rounded bg-[#0B0F19] border border-[#2A374F] flex items-center justify-center mb-6 group-hover:border-[#F59E0B]/40 group-hover:scale-105 transition-all">
              <span className="material-symbols-outlined text-[#F59E0B] text-[24px]">
                ac_unit
              </span>
            </div>
            <h3 className="text-lg font-headline font-bold text-white mb-2">
              Automated Thermal Climate Chamber
            </h3>
            <p className="text-slate-400 text-sm font-mono leading-relaxed">
              Built-in HVAC climate control enables 25-minute fast-charging and active battery pre-conditioning across an extreme operating range from -25°C to 50°C.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#2A374F] text-xs text-[#F59E0B] font-mono font-bold flex items-center justify-between">
            <span>-25°C TO 50°C RATED</span>
            <span className="text-slate-500">ALL-WEATHER</span>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.24 }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350 } }}
          className="bg-[#161F30] border border-[#2A374F] p-6 rounded-xl flex flex-col justify-between hover:border-emerald-400 transition-colors shadow-lg group"
        >
          <div>
            <div className="w-12 h-12 rounded bg-[#0B0F19] border border-[#2A374F] flex items-center justify-center mb-6 group-hover:border-emerald-400/40 group-hover:scale-105 transition-all">
              <span className="material-symbols-outlined text-emerald-400 text-[24px]">
                satellite_alt
              </span>
            </div>
            <h3 className="text-lg font-headline font-bold text-white mb-2">
              Integrated DAA &amp; ADS-B
            </h3>
            <p className="text-slate-400 text-sm font-mono leading-relaxed">
              Dual redundant cellular 5G connectivity with automatic Starlink satellite fallback ensuring continuous command telemetry even in remote mountainous terrain.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#2A374F] text-xs text-emerald-400 font-mono font-bold flex items-center justify-between">
            <span>DUAL 5G + STARLINK FALLBACK</span>
            <span className="text-slate-500">ASTM F3442</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenSpecs}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#161F30] border border-[#2A374F] hover:border-[#00E5FF] text-white font-mono text-xs font-semibold transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#00E5FF] text-[18px]">
            description
          </span>
          <span>View Complete Engineering Specification Sheet</span>
        </motion.button>
      </div>
    </section>
  );
});

PlatformArchitecture.displayName = 'PlatformArchitecture';

import React from 'react';
import { motion } from 'motion/react';

interface SolutionsSectionProps {
  onSelectSolution: (solutionKey: 'coop' | 'solar') => void;
}

// Memoized to avoid re-rendering sector solution cards with scanline animations on unrelated state changes
export const SolutionsSection: React.FC<SolutionsSectionProps> = React.memo(({ onSelectSolution }) => {
  return (
    <section id="solutions" className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full mb-20 sm:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
      >
        <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest mb-3 block">
          SECTOR-SPECIFIC ARCHITECTURE
        </span>
        <h2 className="text-3xl lg:text-4xl font-headline font-bold text-white mb-4">
          Purpose-Built for Critical Infrastructure
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-mono">
          Engineered to address the extreme physical and regulatory challenges of rural distribution networks and utility-scale solar.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Rural Electric Cooperatives */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="bg-[#161F30] border border-[#2A374F] p-6 sm:p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#00E5FF] transition-all shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-mono font-bold border border-[#00E5FF]/30">
                RURAL ELECTRIC COOPERATIVES
              </span>
              <span className="material-symbols-outlined text-[#00E5FF] text-[32px] group-hover:rotate-12 transition-transform">
                bolt
              </span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-white mb-3">
              Wildfire Hardening & 2.7 Member/Mile Density
            </h3>
            <p className="text-slate-400 text-sm font-mono mb-6 leading-relaxed">
              Automated daily patrols across sprawling rural grids. Rapid storm-damage launch sequence in under 20 seconds. Fully compatible with USDA RUS loan programs and Section 40101(d) grid resilience toolkits.
            </p>
            <ul className="space-y-3 mb-8 text-xs font-mono text-slate-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00E5FF] text-[16px]">check</span>
                Vegetation encroachment predictive AI
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00E5FF] text-[16px]">check</span>
                Automated pole-top insulator thermography
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00E5FF] text-[16px]">check</span>
                Direct integration with Milsoft & Futura GIS
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-3">
            <div
              className="w-full h-48 sm:h-56 rounded-lg bg-cover bg-center border border-[#2A374F] relative overflow-hidden shadow-inner group/img"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf2nOblg99Vd5hULbhcDCCGozzCoOdyDst8GohBWVpZ3KJFGut1BaFE3HZKrCc6b6f1UPSlvQvKfhwo6xQpPniayn-CurWjVh5uyNudwCiioLaTtE1RT4GVOyOrKr5s3iOIeCDc9HB--KSXE1vVBYgZA6KUA7xsLDHOeETlIm6whZ1Q32G110Mq0_2ZYXBbOJql70PbaHJ0ldg15c8CiAz-CsVai9x5u2v8FXffR9KV6w-pzU3V7E')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent"></div>
              {/* Animated scanline on image */}
              <motion.div
                className="absolute inset-x-0 h-8 pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-[#00E5FF] to-transparent"
                animate={{ y: ['-100%', '550%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white bg-[#0B0F19]/85 px-2.5 py-1 rounded border border-[#2A374F] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping"></span>
                <span>Telemetry Feed: Feeder 14 Pole #82A Insulator Audit</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSolution('coop')}
              className="w-full py-2.5 px-4 rounded bg-[#0B0F19] hover:bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Model Co-op Rural Mileage ROI</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Column 2: Distributed Community Solar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="bg-[#161F30] border border-[#2A374F] p-6 sm:p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#F59E0B] transition-all shadow-xl"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-mono font-bold border border-[#F59E0B]/30">
                DISTRIBUTED COMMUNITY SOLAR
              </span>
              <span className="material-symbols-outlined text-[#F59E0B] text-[32px] group-hover:rotate-45 transition-transform">
                wb_sunny
              </span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-white mb-3">
              Unattended 2–10 MW Portfolio Thermography
            </h3>
            <p className="text-slate-400 text-sm font-mono mb-6 leading-relaxed">
              IEC 62446-3 compliant infrared hotspot detection across multi-acre panel arrays. Stops 3-6% annual generation losses instantly with automated ticketing directly into O&M management platforms.
            </p>
            <ul className="space-y-3 mb-8 text-xs font-mono text-slate-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#F59E0B] text-[16px]">check</span>
                Sub-string level fault isolation
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#F59E0B] text-[16px]">check</span>
                Automated radiometric orthomosaic generation
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#F59E0B] text-[16px]">check</span>
                Seamless ticketing sync with Maximo & Salesforce
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-3">
            <div
              className="w-full h-48 sm:h-56 rounded-lg bg-cover bg-center border border-[#2A374F] relative overflow-hidden shadow-inner group/img"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_H7tf8tl167bgun5yYNoDWoL_gMeF3gZdudbMc2EUEPizjTwKDM1GwBTWjtIdorknrvblKq03-ysiYvznh5EAejzsh7zHZWsl0Ami1a3oON0WQSc_gZk5p1jWpbQ82aqzltETGaRDxkZTczog2Y10uGMUROl3O04BWxDzO05r2a-Y4Eqj0-Kq6YnCzufa8taDO9mBr--BQrTXHmnS0g7-Jf4wTjes2aomw0XJRdJ_NqX9JxqI-us')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent"></div>
              {/* Animated scanline on image */}
              <motion.div
                className="absolute inset-x-0 h-8 pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-[#F59E0B] to-transparent"
                animate={{ y: ['-100%', '550%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white bg-[#0B0F19]/85 px-2.5 py-1 rounded border border-[#2A374F] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping"></span>
                <span>Thermal Ingress: Greenfield Array 4B Hotspot Detected</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSolution('solar')}
              className="w-full py-2.5 px-4 rounded bg-[#0B0F19] hover:bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#F59E0B] font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Model Solar MW Portfolio ROI</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

SolutionsSection.displayName = 'SolutionsSection';


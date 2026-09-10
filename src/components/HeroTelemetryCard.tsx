import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DOCK_NODES = [
  { id: 'DOCK_NODE_04', location: 'Elm Creek Substation #3', temp: 21.4, battery: 99.8, latency: 14, status: 'DOCKED / CHARGED' },
  { id: 'DOCK_NODE_01', location: 'Red River Valley Feeder 4', temp: 22.1, battery: 88.5, latency: 18, status: 'IN-FLIGHT PATROL' },
  { id: 'DOCK_NODE_02', location: 'Oakhaven Solar Farm Substation', temp: 19.8, battery: 95.0, latency: 12, status: 'DOCKED / STANDBY' },
  { id: 'DOCK_NODE_03', location: 'Mountain Pass G&T Tie-Line', temp: 18.2, battery: 100, latency: 22, status: 'READY FOR DISPATCH' },
];

// Memoized to isolate telemetry updates to this card and prevent external parent re-renders from invalidating its internal timer
export const HeroTelemetryCard: React.FC = React.memo(() => {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [tempJitter, setTempJitter] = useState(0);
  const [latencyJitter, setLatencyJitter] = useState(0);

  const activeNode = DOCK_NODES[activeNodeIndex];

  // Subtle telemetry jitter to bring the live feed to life
  useEffect(() => {
    const interval = setInterval(() => {
      setTempJitter((Math.random() - 0.5) * 0.4);
      setLatencyJitter(Math.floor((Math.random() - 0.5) * 4));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentTemp = (activeNode.temp + tempJitter).toFixed(1);
  const currentLatency = Math.max(8, activeNode.latency + latencyJitter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      className="flex-1 w-full relative"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5FF]/20 to-[#F59E0B]/20 rounded-xl blur-lg opacity-40 animate-pulse"></div>
      
      <div className="relative bg-[#161F30] border border-[#2A374F] rounded-xl p-5 sm:p-6 shadow-2xl">
        {/* Telemetry Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2A374F]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-wider flex items-center gap-1.5">
              <span>LIVE TELEMETRY :</span>
              <motion.span
                key={activeNode.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {activeNode.id}
              </motion.span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400">
              {activeNode.status}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-[#0B0F19] border border-[#2A374F] text-[10px] text-slate-300 font-mono font-medium">
              IP55 SEALED
            </span>
          </div>
        </div>

        {/* Hero Visual Live Viewport */}
        <div
          className="w-full h-60 sm:h-68 rounded-lg bg-cover bg-center mb-4 relative flex flex-col justify-between p-4 overflow-hidden border border-[#2A374F] group"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcyxLKk8Q0fi0aKvAxujGM032LenD4Gyfp1ZaEurEVdZFXAm4FQqowFFDW-7wDZHuc7iKWv8TXrfwl7uPmr0orId3WHDA4N6oUr_PEwhqlhk6qrtiE91XrzGdORfaDluhQjlLrAMPBsTfgvlnnU7LiPsXPyNW5-bhYKYtLerHlOiznjUrWY1ylUpTJfR_i1EacbAKF0EblX36GJlxyuCWW1GSrORuHQ89m67yGNpVEJwFt9X7kxyU')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-transparent to-black/30 pointer-events-none"></div>

          {/* Animated High-Tech Scanline Sweep */}
          <motion.div
            className="absolute inset-x-0 h-10 pointer-events-none z-10 opacity-30 bg-gradient-to-b from-transparent via-[#00E5FF]/40 to-transparent"
            animate={{ y: ['-100%', '650%'] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Animated Targeting Crosshair / Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 border border-[#00E5FF]/30 rounded-full flex items-center justify-center"
            >
              <div className="w-10 h-10 border border-dashed border-[#F59E0B]/40 rounded-full"></div>
            </motion.div>
            <div className="absolute w-2 h-2 bg-[#00E5FF]/80 rounded-full animate-ping"></div>
          </div>

          {/* Top HUD Indicators */}
          <div className="relative z-20 flex justify-between items-center text-[10px] font-mono text-slate-300">
            <motion.span
              key={activeNode.location}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#0B0F19]/80 px-2 py-0.5 rounded border border-[#2A374F]"
            >
              LOC: {activeNode.location}
            </motion.span>
            <span className="bg-[#0B0F19]/80 px-2 py-0.5 rounded border border-[#00E5FF]/40 text-[#00E5FF] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
              FAA PART 108 ENCLAVE
            </span>
          </div>

          {/* Bottom Telemetry Overlay Badges */}
          <div className="relative z-20 flex flex-wrap gap-2">
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              className="px-3 py-1.5 rounded bg-[#161F30]/90 backdrop-blur border border-[#2A374F] text-xs font-mono text-white flex items-center gap-2 shadow-md"
            >
              <span className="material-symbols-outlined text-[#00E5FF] text-[16px]">
                hub
              </span>
              <span>1 Operator : 20 Active Docks</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              className="px-3 py-1.5 rounded bg-[#161F30]/90 backdrop-blur border border-[#2A374F] text-xs font-mono text-white flex items-center gap-2 shadow-md"
            >
              <span className="material-symbols-outlined text-[#F59E0B] text-[16px]">
                thermostat
              </span>
              <span>Automated Thermal Defect Detection</span>
            </motion.div>
          </div>
        </div>

        {/* Telemetry Metrics Readout Grid with subtle transitions */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="p-2.5 sm:p-3 bg-[#0B0F19] rounded border border-[#2A374F] hover:border-[#00E5FF]/50 transition-colors"
          >
            <p className="text-[10px] text-slate-400 font-mono mb-1">INTERNAL TEMP</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTemp}
                initial={{ opacity: 0.6, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.6, y: 2 }}
                transition={{ duration: 0.2 }}
                className="text-sm sm:text-base font-headline font-bold text-white tracking-wide"
              >
                {currentTemp}°C
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="p-2.5 sm:p-3 bg-[#0B0F19] rounded border border-[#2A374F] hover:border-[#00E5FF]/50 transition-colors"
          >
            <p className="text-[10px] text-slate-400 font-mono mb-1">BATTERY HEALTH</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeNode.battery}
                initial={{ opacity: 0.6, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.6, y: 2 }}
                transition={{ duration: 0.2 }}
                className="text-sm sm:text-base font-headline font-bold text-[#00E5FF] tracking-wide"
              >
                {activeNode.battery}%
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="p-2.5 sm:p-3 bg-[#0B0F19] rounded border border-[#2A374F] hover:border-[#00E5FF]/50 transition-colors"
          >
            <p className="text-[10px] text-slate-400 font-mono mb-1">LINK LATENCY</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentLatency}
                initial={{ opacity: 0.6, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.6, y: 2 }}
                transition={{ duration: 0.2 }}
                className="text-sm sm:text-base font-headline font-bold text-emerald-400 tracking-wide"
              >
                {currentLatency}ms
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Quick Node Switcher footer with animated buttons */}
        <div className="mt-3 pt-2.5 border-t border-[#2A374F] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Active Edge Node:</span>
          <div className="flex gap-1.5">
            {DOCK_NODES.map((node, idx) => (
              <motion.button
                key={node.id}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveNodeIndex(idx)}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                  activeNodeIndex === idx
                    ? 'bg-[#00E5FF] text-[#0B0F19] font-bold shadow-[0_0_10px_rgba(0,229,255,0.5)]'
                    : 'bg-[#0B0F19] text-slate-400 hover:text-white border border-[#2A374F]'
                }`}
              >
                0{idx + 1}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

HeroTelemetryCard.displayName = 'HeroTelemetryCard';


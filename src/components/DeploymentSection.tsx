import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { isValidEmail, sanitizeInput } from '../utils/security';

// Performance optimization: Memoized component isolates deployment email form inputs and submission feedback from top-level App state to prevent unnecessary full-page re-renders on keystrokes.
export const DeploymentSection: React.FC = React.memo(() => {
  const [deploymentEmail, setDeploymentEmail] = useState('');
  const [deploymentSubmitted, setDeploymentSubmitted] = useState(false);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);

  const handleDeploymentSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setDeploymentError(null);
    const cleanEmail = sanitizeInput(deploymentEmail, 254);
    if (!isValidEmail(cleanEmail)) {
      setDeploymentError('Please enter a valid corporate or co-op email address.');
      return;
    }
    setDeploymentEmail(cleanEmail);
    setDeploymentSubmitted(true);
    setTimeout(() => {
      setDeploymentSubmitted(false);
      setDeploymentEmail('');
    }, 4500);
  }, [deploymentEmail]);

  return (
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
              onChange={(e) => {
                setDeploymentEmail(e.target.value);
                if (deploymentError) setDeploymentError(null);
              }}
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

          {deploymentError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 rounded-lg bg-red-950/90 border border-red-500/50 text-red-300 text-xs font-mono flex items-center justify-center gap-2 max-w-md mx-auto"
            >
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{deploymentError}</span>
            </motion.div>
          )}

          {deploymentSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 rounded-lg bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2 max-w-md mx-auto"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Toolkit dispatched! An AeroDock engineer has received your request.</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
});

DeploymentSection.displayName = 'DeploymentSection';

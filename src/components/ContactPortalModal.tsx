import React, { useState } from 'react';
import { isValidEmail, sanitizeInput } from '../utils/security';

interface ContactPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactPortalModal: React.FC<ContactPortalModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    utility: '',
    role: '',
    email: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setError('Please provide a valid official email address.');
      return;
    }
    setError('');
    setFormData({
      name: sanitizeInput(formData.name),
      utility: sanitizeInput(formData.utility),
      role: sanitizeInput(formData.role),
      email: formData.email.trim(),
      message: sanitizeInput(formData.message)
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#161F30] border border-[#2A374F] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#2A374F] flex items-center justify-between bg-[#0B0F19]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00E5FF] text-[24px]">
              support_agent
            </span>
            <div>
              <h3 className="font-headline font-bold text-base sm:text-lg text-white">
                Co-op &amp; Utility Portal Access
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Direct Line to AeroDock Mission Support &amp; Grant Engineers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#161F30] border border-[#2A374F] hover:border-red-400 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 font-mono text-xs">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 uppercase text-[10px]">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[#0B0F19] border border-[#2A374F] rounded px-3 py-2 text-white text-xs font-mono focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 uppercase text-[10px]">Utility / Co-op</label>
                  <input
                    type="text"
                    required
                    value={formData.utility}
                    onChange={(e) => setFormData({ ...formData, utility: e.target.value })}
                    placeholder="e.g. Ozark Electric"
                    className="w-full bg-[#0B0F19] border border-[#2A374F] rounded px-3 py-2 text-white text-xs font-mono focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 uppercase text-[10px]">Official Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sjenkins@ozarkelectric.coop"
                    className="w-full bg-[#0B0F19] border border-[#2A374F] rounded px-3 py-2 text-white text-xs font-mono focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 uppercase text-[10px]">Title / Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="VP Operations / GM"
                    className="w-full bg-[#0B0F19] border border-[#2A374F] rounded px-3 py-2 text-white text-xs font-mono focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 uppercase text-[10px]">Specific Infrastructure Needs</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Need flight feasibility study for 1,200 miles of 69kV transmission line and Section 40101(d) grant matching..."
                  className="w-full bg-[#0B0F19] border border-[#2A374F] rounded px-3 py-2 text-white text-xs font-mono focus:border-[#00E5FF] focus:outline-none"
                />
              </div>

              {error && (
                <div className="p-2.5 rounded bg-red-950/80 border border-red-500/60 text-red-300 text-xs font-mono">
                  {error}
                </div>
              )}

              <div className="p-3 rounded bg-[#0B0F19] border border-[#2A374F] text-[11px] text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Direct response within 2 hours from our Operations Desk.</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-[#00E5FF] text-[#0B0F19] font-headline font-bold text-xs hover:bg-white transition-all cursor-pointer shadow-md"
              >
                Connect with Utility Integration Team
              </button>
            </form>
          ) : (
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">check</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-base text-white">
                  Consultation Request Received
                </h4>
                <p className="text-slate-300 text-xs mt-1">
                  Thank you, {formData.name}. An AeroDock solutions architect will review {formData.utility}'s service footprint and contact you at <strong>{formData.email}</strong>.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-2 rounded bg-[#161F30] border border-[#2A374F] text-slate-300 hover:text-white font-mono text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

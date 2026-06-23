/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, ShieldCheck, Database, Server, Cpu, RefreshCcw } from 'lucide-react';

interface ContactAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  addNotification: (message: string) => void;
}

export default function ContactAuditModal({ isOpen, onClose, addNotification }: ContactAuditModalProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [auditScope, setAuditScope] = useState('Full Stack Hybrid Cloud');

  if (!isOpen) return null;

  const togglePlatform = (p: string) => {
    setPlatforms(prev => 
      prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill out name and corporate email.');
      return;
    }

    setFormState('submitting');
    
    setTimeout(() => {
      setFormState('success');
      addNotification(`Audit requested successfully for ${name} (${email})`);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Dim Scrim */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Audit Form Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-lg w-full bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 backdrop-blur-2xl p-6 sm:p-8"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-purple-500/10 text-purple-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {formState === 'idle' || formState === 'submitting' ? (
            <motion.div
              key="main-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center sm:text-left space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-purple-400 font-mono font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  INITIATE AUDIT
                </div>
                <h3 className="text-xl font-display font-black text-white">
                  ProofLink 30-Day Stabilization Request
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Submit scope details. Our elite engineering group will contact you within 4 hours to deploy sensor net baselines.
                </p>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase font-bold tracking-wider mb-1.5">
                      Contact Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#05000A] border border-white/10 text-white px-3.5 py-2.5 text-xs sm:text-sm rounded focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase font-bold tracking-wider mb-1.5">
                      Corporate Email
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. admin@company.com"
                      className="w-full bg-[#05000A] border border-white/10 text-white px-3.5 py-2.5 text-xs sm:text-sm rounded focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Platform select options */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-gray-500 uppercase font-bold tracking-wider">
                    Infrastructure Host Platforms
                  </label>
                  <p className="text-[10px] text-gray-500 pb-1">Tag all target host elements:</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['AWS EKS', 'Google GKE', 'Azure AKS', 'Bare Metal'].map((platform) => {
                      const isSelected = platforms.includes(platform);
                      return (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => togglePlatform(platform)}
                          className={`px-2 py-1.5 rounded font-mono text-[10px] border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-purple-500/25 border-purple-500 text-white font-bold glow-purple' 
                              : 'bg-black/45 border-purple-500/10 text-gray-400 hover:border-purple-500/30'
                          }`}
                        >
                          {platform}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Audit scope selection */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase font-bold tracking-wider mb-1.5 font-bold">
                    Primary Audit Scope Mode
                  </label>
                  <select
                    value={auditScope}
                    onChange={(e) => setAuditScope(e.target.value)}
                    className="w-full bg-[#030712] border border-purple-500/20 text-white px-3.5 py-2.5 text-xs rounded focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all font-mono"
                  >
                    <option value="Full Stack Hybrid Cloud">Full Stack Hybrid Cloud (Highly Recommended)</option>
                    <option value="Only K8s Cluster Observability">Only K8s Cluster Autonomous Observability</option>
                    <option value="Only IAM Zero-Trust Audit">Only IAM Zero-Trust Baseline Compliance</option>
                  </select>
                </div>

                {/* Trigger buttons */}
                <div className="pt-4 flex gap-3 justify-end">
                  <button
                    type="button" 
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-mono text-gray-500 hover:text-gray-300 border border-purple-500/10 rounded cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="px-5 py-2 text-xs font-mono bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded cursor-pointer flex items-center gap-1.5 transition-opacity disabled:opacity-50"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <RefreshCcw className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Initiate Audit
                      </>
                    )}
                  </button>
                </div>

              </form>

            </motion.div>
          ) : (
            <motion.div
              key="success-form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-display font-extrabold text-white">
                Stabilization Ticket Generated successfully!
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed font-mono">
                Your direct ticket number: <span className="text-purple-400 font-bold select-all">PLR-TICKET-{Math.floor(100000 + Math.random() * 900000)}</span> is anchored. Our engineering group has prioritized your deployment.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 border border-purple-500/20 hover:bg-purple-500/10 rounded text-xs font-mono text-white cursor-pointer transition-all"
              >
                Return to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Cloud, Check, Loader, ShieldAlert } from 'lucide-react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  addNotification: (message: string) => void;
}

type Step = 'connect' | 'payload' | 'propagate' | 'done';

export default function DeployModal({ isOpen, onClose, addNotification }: DeployModalProps) {
  const [activeStep, setActiveStep] = useState<Step>('connect');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setActiveStep('connect');
    setProgress(5);

    // Sequence progress
    const t1 = setTimeout(() => {
      setActiveStep('payload');
      setProgress(40);
    }, 1500);

    const t2 = setTimeout(() => {
      setActiveStep('propagate');
      setProgress(75);
    }, 3200);

    const t3 = setTimeout(() => {
      setActiveStep('done');
      setProgress(100);
      addNotification('UAIO Deployment Propagated Successfully across local Edge Nodes!');
    }, 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

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

      {/* Deploying wizard Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-md w-full bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 backdrop-blur-2xl p-6 sm:p-8"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-purple-500/10 text-purple-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <span className="text-[9px] font-mono tracking-widest text-[#22D3EE] uppercase font-bold">
              AUTONOMIC WORKFLOW DISPATCHER
            </span>
            <h3 className="text-lg font-display font-extrabold text-white mt-1">
              Deploying UAIO Core Edge Agent Cluster
            </h3>
            <p className="text-xs text-gray-400 font-mono mt-1 leading-relaxed">
              Propagating zero-trust host healing containers into target namespace...
            </p>
          </div>

          {/* Progress loader */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>STATUS: {activeStep.toUpperCase()}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-purple-500/10">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-600 to-[#22D3EE]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Step list ticks */}
          <div className="text-left space-y-3.5 pt-4 text-xs font-mono">
            
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                activeStep === 'connect' 
                  ? 'border border-purple-400 text-purple-400 animate-pulse bg-purple-500/5' 
                  : progress >= 40 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'border border-purple-500/10 text-gray-600'
              }`}>
                {progress >= 40 ? <Check className="w-3.5 h-3.5" /> : '1'}
              </div>
              <span className={progress >= 40 ? 'text-gray-400 line-through' : 'text-white'}>
                Establish TLS-SSH tunnel with target cluster nodes
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                activeStep === 'payload' 
                  ? 'border border-purple-400 text-purple-400 animate-pulse bg-purple-500/5' 
                  : progress >= 75 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'border border-purple-500/10 text-gray-600'
              }`}>
                {progress >= 75 ? <Check className="w-3.5 h-3.5" /> : '2'}
              </div>
              <span className={progress >= 75 ? 'text-gray-400 line-through' : progress >= 40 ? 'text-white' : 'text-gray-500'}>
                Download & verify iTechSmart secure container package signatures
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                activeStep === 'propagate' 
                  ? 'border border-purple-400 text-purple-400 animate-pulse bg-purple-500/5' 
                  : progress >= 100 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'border border-purple-500/10 text-gray-600'
              }`}>
                {progress >= 100 ? <Check className="w-3.5 h-3.5" /> : '3'}
              </div>
              <span className={progress >= 100 ? 'text-gray-400 line-through' : progress >= 75 ? 'text-white' : 'text-gray-500'}>
                Propagate autonomic sensing daemon. Seal root state key
              </span>
            </div>

          </div>

          {/* Close / OK button when done */}
          {activeStep === 'done' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4"
            >
              <button 
                onClick={onClose}
                className="w-full px-5 py-2.5 bg-emerald-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-all border-none"
              >
                Launch Platform Controller
              </button>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}

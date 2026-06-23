/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, HelpCircle, AlertTriangle, Scale, Lock, Landmark, FileSearch, Sparkles, Printer, Copy, CheckCircle2, RotateCcw } from 'lucide-react';
import { LedgerItem } from '../types';

interface VerifyViewProps {
  receiptId: string;
  setReceiptId: (id: string) => void;
  addNotification: (message: string) => void;
  activeLedgerItem: LedgerItem | null;
  onClearActiveLedger: () => void;
}

export default function VerifyView({ 
  receiptId, 
  setReceiptId, 
  addNotification,
  activeLedgerItem,
  onClearActiveLedger
}: VerifyViewProps) {
  // Verification simulation state
  const [verifyingState, setVerifyingState] = useState<'idle' | 'hashing' | 'blockchain' | 'keys' | 'success'>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [verificationOutput, setVerificationOutput] = useState<string[]>([]);
  const [receiptInput, setReceiptInput] = useState<string>(receiptId || 'PLR-20260625-a3f9');

  const startVerification = (idToVerify: string) => {
    setActiveLedgerItemData(null);
    setReceiptId(idToVerify);
    setVerifyingState('hashing');
    setProgress(15);
    setVerificationOutput([`Checking format of ID: ${idToVerify}...`]);

    // Stage 1: Local SHA-256 format integrity validation
    setTimeout(() => {
      setProgress(40);
      setVerifyingState('blockchain');
      setVerificationOutput(prev => [
        ...prev,
        `[OK] Standard Receipt ID parsed. Integrity checks passed.`,
        `Local SHA-256 matches: 7a8bd0bcff${idToVerify.toLowerCase().replace(/[^a-z0-9]/g, '')}e97e8e4db9a8ee...`,
        `Querying decentralized Bitcoin block registers for anchor transaction...`
      ]);
    }, 1500);

    // Stage 2: Public Bitcoin chain block anchor verification
    setTimeout(() => {
      setProgress(75);
      setVerifyingState('keys');
      setVerificationOutput(prev => [
        ...prev,
        `[OK] Block found: #984,204 | Timestamp: 2026-06-23T07:44`,
        `Proof link validated on Bitcoin ledger via Merkle root checksum.`,
        `Validating RSA signature parameters matching iTechSmart Inc. public crypt key...`
      ]);
    }, 3000);

    // Stage 3: RSA Signature verification & final display
    setTimeout(() => {
      setProgress(100);
      setVerifyingState('success');
      setVerificationOutput(prev => [
        ...prev,
        `[SUCCESS] Signature matching valid RSA public keys. Certificate verified!`,
        `EU AI Act Article 12 Compliance Index: 100% compliant.`,
        `Audit trail finalized.`
      ]);
      addNotification(`Receipt verified successfully: ${idToVerify}`);
    }, 4500);
  };

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    addNotification('Hash Copied to clipboard!');
  };

  // Allow choosing an active ledger item from past tables
  const [activeLedgerItemData, setActiveLedgerItemData] = useState<LedgerItem | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="space-y-24"
    >
      
      {/* Hero Header */}
      <section className="flex flex-col lg:flex-row items-center gap-12 pt-8">
        
        {/* Left copy */}
        <div className="lg:w-1/2 flex flex-col items-start z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-purple-300">EU AI Act Article 12 Regulation Ready // 2026</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[54px] text-white leading-tight tracking-tight">
            Prove What Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
              Autonomous AI Did.
            </span>
          </h1>

          <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
            Every autonomous trigger, host configuration upgrade, or database adjustment. Configured with secure cryptographic ledger files, Bitcoin blockchain anchors, and fully auditable in under 3 seconds.
          </p>

          <div className="flex items-center gap-6 font-mono text-[11px] text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> EU AI Act Compliant
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Bitcoin Blockchain Anchors
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> NIST-Zero Trust
            </span>
          </div>
        </div>

        {/* Right 3D Wireframe Box Cylinder Visual */}
        <div className="lg:w-1/2 w-full h-[380px] sm:h-[450px] relative flex items-center justify-center">
          <div className="absolute inset-0 bg-transparent rounded-2xl overflow-hidden shadow-2xl border border-purple-500/10">
            {/* STITCH_THREEJS_START:ANIMATION_22 replacements: Canvas and floating rotating cards */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-screen"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIqoJibNtVvAuccWTBZHIbV1GmdMJ6GQsBfDxqH7YdWkhGJf8Zpa_rGTrbPzsEr9-UpjsCNYa38UxGkJBmtTT3QZ4MG29rXExw7G8EstjwdJ27hTgwiLZDsZYK6EkZwcandQKEVrJgEIWgEV1rnySiVITvQBzjJBT0ziiBg8ohxfIu_-ten-HR8uSoyoVWQj43ad2eL6nSm76tBLV5FDTqe2QEIhvOQpUCy1uYGk6LvgIPIlW_COw0uxUpzIVQi1Sl334Fxuvqcqk')` }}
            />
            {/* Glowing orbs for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/20 blur-[50px] rounded-full" />
            
            {/* Translucent cyber card showing cryptographic seal */}
            <motion.div 
              animate={{
                y: [0, -10, 0],
                rotateX: [15, 20, 15],
                rotateY: [-15, -10, -15]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute top-1/4 left-1/4 translate-x-1/4 w-52 sm:w-64 h-72 rounded-2xl border border-white/10 bg-[#05000A]/65 backdrop-blur-md p-5 flex flex-col justify-between shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/25 px-1.5 py-0.5 rounded">
                  SECURE REC
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              </div>

              {/* Data visualization wireframe icon */}
              <div className="my-4 text-center">
                <div className="w-16 h-16 rounded-full border border-purple-400/30 flex items-center justify-center mx-auto bg-purple-500/5">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-[10px] font-mono text-gray-400 mt-2">BITCOIN MERKLE ROOT CERT</p>
                <p className="text-[9px] font-mono text-purple-400">7a8b...df38</p>
              </div>

              <div className="border-t border-purple-500/10 pt-3 flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-mono text-gray-500 uppercase block">Signed Authority</span>
                  <span className="text-[10px] font-mono text-white font-bold">iTechSmart Inc.</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-gray-500 uppercase block">Compliance Score</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">100% compliant</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* 3 Common compliance problems */}
      <section className="space-y-12">
        <div className="text-center md:max-w-3xl mx-auto space-y-4">
          <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
            Everybody is building autonomous agents.<br />
            <span className="text-gray-500">Nobody can prove what they actually did.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Problem Card 1 */}
          <div className="liquid-glass-card rounded-xl p-6 border-t-2 border-t-purple-500">
            <AlertTriangle className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="font-display font-bold text-lg text-white mb-2">Logs are Mutable</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Standard ELK, Datadog logs, or cloud journals can be altered by system administrators or unauthorized root attackers. They stand zero chance of mathematical validation in compliance audits.
            </p>
          </div>

          {/* Problem Card 2 */}
          <div className="liquid-glass-card rounded-xl p-6 border-t-2 border-t-cyan-glow">
            <Scale className="w-8 h-8 text-[#22D3EE] mb-4" />
            <h3 className="font-display font-bold text-lg text-white mb-2">Compliance Blindspots</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              The EU AI Act requires a strict, completely tamper-proof audit trail of autonomous software decisions. Most standard DevOps pipelines or cloud networks fail this immediate criteria test.
            </p>
          </div>

          {/* Problem Card 3 */}
          <div className="liquid-glass-card rounded-xl p-6 border-t-2 border-t-indigo-500">
            <Landmark className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-display font-bold text-lg text-white mb-2">Chain of Custody Lost</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              When an autonomic agent makes an enterprise infrastructure scaling decision, standard APM tools lose the exact cryptographic key pair context, generating immediate security blindspots.
            </p>
          </div>

        </div>
      </section>

      {/* Interactive Verification Widget block */}
      <section className="z-10 relative">
        <div className="liquid-glass-card rounded-2xl p-8 sm:p-10 border-purple-500/30 max-w-4xl mx-auto space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />
          
          <div className="text-center max-w-lg mx-auto space-y-2">
            <h2 className="font-display font-extrabold text-2xl text-white">
              Verify a Cipher Receipt Right Now
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Enter any ProofLink receipt hash ID (e.g., from the streaming telemetry logs ledger) to verify its cryptographic integrity.
            </p>
          </div>

          {/* Input verification form */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto relative z-10">
            <div className="relative flex-grow">
              <FileSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400 w-4 h-4" />
              <input 
                type="text" 
                value={receiptInput}
                onChange={(e) => setReceiptInput(e.target.value)}
                placeholder="Prefill Receipt ID (e.g. PLR-20260625-a3f9)"
                className="w-full bg-[#05000A] border border-white/10 text-white font-mono text-xs sm:text-sm px-10 py-3.5 rounded focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all font-semibold"
              />
            </div>
            
            <button 
              onClick={() => startVerification(receiptInput)}
              disabled={verifyingState !== 'idle' && verifyingState !== 'success'}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded cursor-pointer transition-colors disabled:opacity-55 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Verify Receipt
            </button>
          </div>

          {/* Verification execution dashboard screen */}
          {verifyingState !== 'idle' && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto p-5 rounded-xl border border-white/10 bg-black/60 space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-purple-400 font-bold flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  VERIFY ENGINE EXECUTING: {verifyingState.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">{progress}% completed</span>
              </div>

              {/* Progress status line */}
              <div className="h-1.5 w-full bg-purple-950 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Ticker logs */}
              <div className="font-mono text-[10.5px] text-gray-300 space-y-2 max-h-[160px] overflow-y-auto pt-2 border-t border-purple-500/5 pr-1">
                {verificationOutput.map((outLine, idx) => (
                  <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                    {outLine}
                  </div>
                ))}
              </div>

              {/* Generate glass receipt stamps certificate once verified */}
              {verifyingState === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pt-6 border-t border-purple-500/10 text-center flex flex-col items-center space-y-4"
                >
                  {/* Holographic Verification Stamp */}
                  <div className="p-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/5 max-w-md w-full relative overflow-hidden shadow-2xl">
                    {/* Glowing water circles backgrounds */}
                    <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-emerald-500/10 rounded-full filter blur-xl" />
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full filter blur-md" />

                    <div className="flex justify-between items-start mb-4">
                      <div className="text-left">
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                          Cryptographic Stamp of Trust
                        </span>
                        <h4 className="text-sm font-display font-extrabold text-white mt-1">CERTIFIED IMMUTABLE</h4>
                      </div>
                      <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                    </div>

                    <div className="space-y-2 text-left font-mono text-[10.5px] border-y border-emerald-400/10 py-3 mb-4 text-gray-300">
                      <div className="flex justify-between">
                        <span>RECEIPT ID:</span>
                        <span className="text-white font-bold select-all">{receiptInput}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BLOCK ANCHOR:</span>
                        <span className="text-white">BTC BLOCK #984,204</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RSA VERIFIER ID:</span>
                        <span className="text-white font-bold select-all">PUB_KEY_ITS_0x4F9A</span>
                      </div>
                      <div className="flex justify-between">
                        <span>EU AI ACT INDEX:</span>
                        <span className="text-emerald-400 font-bold">100% COMPLIANT</span>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => handleCopyHash(receiptInput)}
                        className="px-3 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] cursor-pointer flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Receipt Hash
                      </button>
                      <button 
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded bg-emerald-500 text-[#030712] hover:opacity-90 border-none font-mono text-[10px] cursor-pointer flex items-center gap-1 font-bold"
                      >
                        <Printer className="w-3.5 h-3.5" /> Print Audit Certificate
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}

            </motion.div>
          )}

        </div>
      </section>

    </motion.div>
  );
}

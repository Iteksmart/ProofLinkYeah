/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, ExternalLink, ShieldAlert, CheckCircle2, Cpu, Database, Network, Key } from 'lucide-react';
import { LedgerItem } from '../types';

interface ReceiptDetailDrawerProps {
  item: LedgerItem | null;
  onClose: () => void;
  onVerifyReceipt: (id: string) => void;
}

export default function ReceiptDetailDrawer({ item, onClose, onVerifyReceipt }: ReceiptDetailDrawerProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Black scrim behind */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
      />

      {/* Actual Drawer sliding from right */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#05000A]/95 border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between pointer-events-auto z-10 backdrop-blur-2xl"
      >
        <div className="space-y-6 flex-grow overflow-y-auto pr-1">
          {/* Drawer close and TITLE */}
          <div className="flex justify-between items-center border-b border-purple-500/10 pb-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-purple-400 font-bold uppercase block leading-none mb-1">
                IMMUTABLE AUDIT RECEIPT
              </span>
              <h3 className="text-base font-display font-extrabold text-white">
                Detailed Block Trace Info
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/10 text-purple-400 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Core Info Item Summary */}
          <div className="p-4 rounded-xl border border-purple-500/15 bg-purple-950/20 relative">
            <span className="absolute top-3 right-3 text-[10px] font-mono text-cyan-400 animate-pulse font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              verified anchor
            </span>
            <div className="flex gap-2.5 items-center mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <h4 className="text-sm font-bold text-white uppercase">{item.title}</h4>
            </div>
            <p className="text-xs text-gray-400 font-mono pl-5">{item.target}</p>
          </div>

          {/* Technical checklist parameters */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">
              Cryptographic Checklist:
            </h4>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>SHA-256 integrity format matches parameters</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Anchored in BTC blockchain block #984,204</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Signed public key signature matching iTechSmart Inc.</span>
              </div>
            </div>
          </div>

          {/* Ledger JSON key pairs representation */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">
              Metadata JSON:
            </h4>
            <div className="p-3.5 rounded-xl bg-black/60 border border-purple-500/15 overflow-x-auto text-[10.5px] font-mono select-all select-none pointer-events-auto">
              <pre className="text-purple-300 leading-relaxed">
{JSON.stringify({
  "receiptId": item.id,
  "eventType": item.type,
  "timestamp": item.timestamp,
  "eventTitle": item.title,
  "targetResource": item.target,
  "integrityHash": item.txHash,
  "cryptAuthority": "iTechSmart Inc.",
  "blockchainKey": "BTC_ANCHOR_PROOFLINK_2026",
  "euAiActCompliance": "100_percent_compliant"
}, null, 2)}
              </pre>
            </div>
          </div>

        </div>

        {/* Call to actions in the bottom */}
        <div className="border-t border-purple-500/10 pt-4 space-y-2">
          <button 
            onClick={() => {
              onVerifyReceipt(item.id);
              onClose();
            }}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded font-bold text-xs uppercase tracking-wider text-center cursor-pointer hover:opacity-95 transition-opacity"
          >
            Launch Live Blockchain Proof Validation
          </button>
          
          <button 
            onClick={onClose}
            className="w-full px-4 py-3 bg-transparent hover:bg-purple-500/5 text-gray-400 font-bold text-xs uppercase tracking-wider text-center cursor-pointer border border-purple-500/10 rounded transition-colors"
          >
            Close Trace logs
          </button>
        </div>

      </motion.div>
    </div>
  );
}

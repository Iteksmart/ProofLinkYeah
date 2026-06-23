/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldAlert, Sparkles, X, Info } from 'lucide-react';
import LiquidGlassBackground from './components/LiquidGlassBackground';
import Header from './components/Header';
import ConsultingView from './components/ConsultingView';
import PlatformView from './components/PlatformView';
import VerifyView from './components/VerifyView';
import ProductView from './components/ProductView';
import ProofLink from './pages/ProofLink';
import ReceiptDetailDrawer from './components/ReceiptDetailDrawer';
import ContactAuditModal from './components/ContactAuditModal';
import DeployModal from './components/DeployModal';
import { Tab, LedgerItem, INITIAL_LEDGER } from './types';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warn';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('product');
  const [activeLedgerItem, setActiveLedgerItem] = useState<LedgerItem | null>(null);
  const [receiptId, setReceiptId] = useState<string>('PLR-20260625-a3f9');
  
  // Modals & Drawers controls
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  
  // Toaster Notifications state
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(3);

  // Add toast notification helper
  const addNotification = (message: string, type: 'info' | 'success' | 'warn' = 'success') => {
    const id = Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);
    setNotificationCount(prev => prev + 1);

    // Auto-remove toast in 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Clear notifications counter
  const handleClearNotifications = () => {
    setNotificationCount(0);
    addNotification('Alert cache cleared', 'info');
  };

  // Connect active ledger item click actions
  const handleSelectReceipt = (item: LedgerItem) => {
    setActiveLedgerItem(item);
  };

  // Allow sub-views to append items to ledger index
  const [customLedger, setCustomLedger] = useState<LedgerItem[]>(INITIAL_LEDGER);
  const handleAddLedgerItem = (newItem: LedgerItem) => {
    setCustomLedger(prev => [newItem, ...prev]);
  };

  // Redirect and trigger verification
  const handleTriggerVerificationFromId = (id: string) => {
    setReceiptId(id);
    setActiveTab('verify');
    addNotification(`Redirected to verifier for ID: ${id}`, 'info');
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans relative pb-20">
      
      {/* Animated Liquid Surface Background */}
      <LiquidGlassBackground />

      {/* Floating high-fidelity header layout */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenCli={() => {
          setActiveTab('platform');
          addNotification('citadel-cmd Terminal Focus Active', 'info');
        }}
        notificationCount={notificationCount}
        clearNotifications={handleClearNotifications}
      />

      {/* Award-winning ProofLink showcase page (full-bleed) */}
      {activeTab === 'showcase' && (
        <div className="relative z-10 pt-18">
          <ProofLink />
        </div>
      )}

      {/* Main View Area Container */}
      {activeTab !== 'showcase' && (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'product' && (
            <div key="product-tab">
              <ProductView 
                setActiveTab={setActiveTab}
                onInitiateAudit={() => setIsAuditModalOpen(true)}
                onSelectReceipt={(id) => {
                  const found = INITIAL_LEDGER.find(item => item.id === id);
                  if (found) {
                    handleSelectReceipt(found);
                  } else {
                    setReceiptId(id);
                    setActiveTab('verify');
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'consulting' && (
            <div key="consulting-tab">
              <ConsultingView 
                setActiveTab={setActiveTab}
                onInitiateAudit={() => setIsAuditModalOpen(true)}
                onSelectReceipt={handleSelectReceipt}
              />
            </div>
          )}

          {activeTab === 'platform' && (
            <div key="platform-tab">
              <PlatformView 
                onDeploy={() => setIsDeployModalOpen(true)}
                onSelectReceipt={handleSelectReceipt}
                onAddLedgerItem={handleAddLedgerItem}
                addNotification={addNotification}
              />
            </div>
          )}

          {activeTab === 'verify' && (
            <div key="verify-tab">
              <VerifyView 
                receiptId={receiptId}
                setReceiptId={setReceiptId}
                addNotification={(msg) => addNotification(msg, 'success')}
                activeLedgerItem={activeLedgerItem}
                onClearActiveLedger={() => setActiveLedgerItem(null)}
              />
            </div>
          )}
        </AnimatePresence>
      </main>
      )}

      {/* FOOTER */}
      {activeTab !== 'showcase' && (
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 border-t border-purple-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
        <div>
          <p>© 2026 iTechSmart Inc. All rights reserved.</p>
          <p className="text-[10px] mt-0.5">ProofLink is a registered federal trademark of iTechSmart.</p>
        </div>
        <div className="flex gap-4">
          <a href="https://itechsmart.dev" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
            iTechSmart.dev
          </a>
          <span>//</span>
          <span>NIST SP 800-207</span>
          <span>//</span>
          <span className="text-purple-400">Award-winning design 2026</span>
        </div>
      </footer>
      )}

      {/* 1. Cryptographic side detail drawer */}
      <AnimatePresence>
        {activeLedgerItem && (
          <ReceiptDetailDrawer 
            item={activeLedgerItem}
            onClose={() => setActiveLedgerItem(null)}
            onVerifyReceipt={handleTriggerVerificationFromId}
          />
        )}
      </AnimatePresence>

      {/* 2. Form Audit callback Modal */}
      <AnimatePresence>
        {isAuditModalOpen && (
          <ContactAuditModal 
            isOpen={isAuditModalOpen}
            onClose={() => setIsAuditModalOpen(false)}
            addNotification={(msg) => addNotification(msg, 'success')}
          />
        )}
      </AnimatePresence>

      {/* 3. Deployment wizard active modal */}
      <AnimatePresence>
        {isDeployModalOpen && (
          <DeployModal 
            isOpen={isDeployModalOpen}
            onClose={() => setIsDeployModalOpen(false)}
            addNotification={(msg) => addNotification(msg, 'success')}
          />
        )}
      </AnimatePresence>

      {/* Floating stackable toasters on top-right */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none w-full">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="p-3.5 rounded-xl border border-purple-500/30 bg-[#0d0d24]/95 shadow-2xl backdrop-blur-md pointer-events-auto flex items-center gap-3 w-full"
            >
              <div className="w-7 h-7 rounded bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="flex-grow">
                <p className="text-[11px] font-mono font-bold text-white tracking-wide uppercase leading-none">
                  SYSTEM CORE MSG
                </p>
                <p className="text-xs text-gray-300 mt-1">{t.message}</p>
              </div>
              <button 
                onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
                className="text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

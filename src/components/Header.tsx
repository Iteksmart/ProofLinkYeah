/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Bell, Shield, Radio, KeyRound, ExternalLink, Menu, X, ChevronRight } from 'lucide-react';
import { Tab } from '../types';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onOpenCli: () => void;
  notificationCount: number;
  clearNotifications: () => void;
}

// Single source of truth for the product pages wired into the nav + hamburger.
const NAV_ITEMS: { tab: Tab; label: string }[] = [
  { tab: 'product', label: 'Product' },
  { tab: 'consulting', label: 'Consulting' },
  { tab: 'platform', label: 'UAIO Platform' },
  { tab: 'verify', label: 'Verify Math' },
];

export default function Header({
  activeTab,
  setActiveTab,
  onOpenCli,
  notificationCount,
  clearNotifications
}: HeaderProps) {
  // Hamburger menu open state (mobile / tablet navigation)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigate to a page and close the hamburger drawer
  const handleNavigate = (tab: Tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 h-18 z-50 bg-[#05000A]/75 backdrop-blur-xl border-b border-white/10 shadow-[0_2px_24px_-10px_rgba(147,51,234,0.3)]">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Left Brand Area */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -15, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-10 h-10 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-400 p-[1.5px] shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            <div className="w-full h-full bg-[#05000A] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                Proof<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Link</span>
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded bg-purple-500/5">
                v2.6-SECURE
              </span>
            </div>
            <p className="hidden md:block text-[10px] text-gray-400 font-medium">
              By iTechSmart Inc.
            </p>
          </div>
        </div>

        {/* Center Tabs (desktop) */}
        <nav className="hidden md:flex items-center bg-slate-900/40 p-1 rounded-lg border border-white/10">
          {NAV_ITEMS.map(({ tab, label }) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`relative px-3 sm:px-5 py-1.5 rounded-md text-xs sm:text-sm font-label font-semibold tracking-wide transition-colors duration-300 cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-purple-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSubTab"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-purple-600/30 border-b-2 border-purple-500 rounded-md"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Quick Terminal Launcher */}
          <button
            onClick={onOpenCli}
            className="p-2 rounded-lg bg-purple-500/5 border border-white/10 hover:border-purple-400 hover:bg-purple-500/10 text-purple-400 transition-all cursor-pointer relative group"
            title="Launch Terminal Simulator"
          >
            <Terminal className="w-4 h-4" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-white/5 border border-white/10 backdrop-blur-md text-[9px] text-purple-300 px-1.5 py-0.5 rounded transition-all whitespace-nowrap">
              Terminal Shell
            </span>
          </button>

          {/* Real-time Notifications Bell */}
          <button
            onClick={clearNotifications}
            className="p-2 rounded-lg bg-purple-500/5 border border-white/10 hover:border-purple-400 hover:bg-purple-500/10 text-purple-400 transition-all cursor-pointer relative group"
            title="Clear Alerts"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-[#05000A]" />
            )}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-white/5 border border-white/10 backdrop-blur-md text-[9px] text-purple-300 px-1.5 py-0.5 rounded transition-all whitespace-nowrap">
              {notificationCount > 0 ? `${notificationCount} Live Alerts` : 'System Secure'}
            </span>
          </button>

          {/* Federal Agency SDVOSB verified link */}
          <a
            href="https://itechsmart.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/5 border border-orange-500/10 hover:border-orange-400 text-[11px] font-mono text-orange-400 hover:bg-orange-500/10 transition-all"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>itechsmart.dev</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          {/* User Account / Profile Info Bubble */}
          <div className="relative group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1.5px] cursor-pointer shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#05000A] rounded-full flex items-center justify-center font-mono text-xs font-bold text-purple-300">
                iT
              </div>
            </div>
            {/* Popover Card */}
            <div className="absolute right-0 mt-3 w-64 p-4 rounded-xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-2xl scale-0 origin-top-right group-hover:scale-100 transition-all duration-300 invisible group-hover:visible z-50">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center">
                  <KeyRound className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">ROOT ACCESS</h4>
                  <p className="text-[10px] text-purple-300 font-mono mt-1">iTekSmart@gmail.com</p>
                </div>
              </div>
              <div className="border-t border-purple-500/10 pt-2.5 space-y-1.5 text-[10px] font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>ROLE:</span>
                  <span className="text-purple-400 font-bold">PROOFLINK ADMIN</span>
                </div>
                <div className="flex justify-between">
                  <span>CLEARANCE:</span>
                  <span className="text-emerald-400 font-bold">NIST ZONE 1</span>
                </div>
                <div className="flex justify-between">
                  <span>IP STATE:</span>
                  <span className="text-cyan-400 font-bold">SECURE SHELL</span>
                </div>
              </div>
              <p className="mt-3 text-[9px] text-gray-500 leading-normal text-center border-t border-purple-500/5 pt-2">
                Citadel Control Portal // 2026 iTechSmart.dev
              </p>
            </div>
          </div>

          {/* Hamburger Menu Toggle (mobile / tablet) */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="md:hidden p-2 rounded-lg bg-purple-500/5 border border-white/10 hover:border-purple-400 hover:bg-purple-500/10 text-purple-400 transition-all cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

        </div>
      </div>

      {/* Hamburger Drawer (mobile / tablet) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Click-away backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 top-18 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Slide-down panel with all product pages wired in */}
            <motion.nav
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="md:hidden absolute top-18 inset-x-0 z-40 mx-3 mt-2 p-2 rounded-2xl bg-[#0d0d24]/95 border border-purple-500/20 shadow-2xl backdrop-blur-xl"
            >
              <p className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-purple-400/70">
                Product Pages
              </p>
              {NAV_ITEMS.map(({ tab, label }) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleNavigate(tab)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-label font-semibold tracking-wide transition-colors cursor-pointer ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-purple-600/30 border border-purple-500/40'
                        : 'text-gray-300 hover:text-purple-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-purple-300' : 'text-gray-500'}`} />
                  </button>
                );
              })}

              {/* Secondary actions inside the hamburger */}
              <div className="mt-1.5 pt-1.5 border-t border-purple-500/10 space-y-1">
                <button
                  onClick={() => {
                    onOpenCli();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-purple-300 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>Terminal Shell</span>
                </button>
                <a
                  href="https://itechsmart.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium text-orange-400 hover:bg-orange-500/10 transition-colors"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>itechsmart.dev</span>
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

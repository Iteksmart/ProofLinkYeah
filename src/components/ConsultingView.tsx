/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Terminal, Radar, Cpu, FileCheck, Info, BarChart3, Clock, AlertTriangle } from 'lucide-react';
import StatsCounter from './StatsCounter';
import { TimelineStep, INITIAL_TIMELINE, LedgerItem, INITIAL_LEDGER, Tab } from '../types';

interface ConsultingViewProps {
  setActiveTab: (tab: Tab) => void;
  onInitiateAudit: () => void;
  onSelectReceipt: (item: LedgerItem) => void;
}

export default function ConsultingView({ 
  setActiveTab, 
  onInitiateAudit, 
  onSelectReceipt 
}: ConsultingViewProps) {
  const [timeline, setTimeline] = useState<TimelineStep[]>(INITIAL_TIMELINE);
  const [activeSegment, setActiveSegment] = useState<number>(14); // Default to Day 8-21 (Current)
  const [ledgerFeed, setLedgerFeed] = useState<LedgerItem[]>(INITIAL_LEDGER);
  const [latency, setLatency] = useState<number>(12);
  const [uptime, setUptime] = useState<number>(99.999);

  // Fluctuating metric simulation to bring the page to life
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const offset = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const next = prev + offset;
        return next > 6 && next < 19 ? next : prev;
      });
      setUptime(prev => {
        const diff = (Math.random() * 0.002) - 0.001;
        const next = Number((prev + diff).toFixed(5));
        return next <= 100 && next >= 99.995 ? next : prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Periodic new event mock feed stream
  useEffect(() => {
    const handleNewFeed = () => {
      const liveEvents: Omit<LedgerItem, 'id' | 'timestamp'>[] = [
        {
          type: 'audit',
          title: 'Docker Baseline Configuration Secured',
          target: 'Node: core-api-node',
          actionText: 'Scanned & Signed with SHA-256 integrity seal',
          txHash: '0x9d8a...5f4e',
          status: 'remediated'
        },
        {
          type: 'cve',
          title: 'SQL-Injection Query Pattern Blocked',
          target: 'Database: users-pg-cluster',
          actionText: 'Heuristic pattern blocked via network filter',
          txHash: '0x2b3c...1e4d',
          status: 'remediated'
        },
        {
          type: 'drift',
          title: 'DNS Zone Config Enforced',
          target: 'System: Cloudflare DNS Zone',
          actionText: 'Auto-aligned DNS records to Citadel parameters',
          txHash: '0xef1a...5a2b',
          status: 'remediated'
        }
      ];

      const chosen = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      const randomId = 'PLR-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.random().toString(36).substr(2, 4);
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
      
      const newItem: LedgerItem = {
        ...chosen,
        id: randomId,
        timestamp: timeStr
      };

      setLedgerFeed(prev => [newItem, ...prev.slice(0, 4)]);
    };

    const feedTimer = setInterval(handleNewFeed, 8000);
    return () => clearInterval(feedTimer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="space-y-24"
    >
      
      {/* 1. Hero / Cinematic Consulting Section */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        
        {/* Left Copy */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>NIST / ITIL / Zero Trust Federal Standards</span>
          </motion.div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white leading-tight tracking-tight">
            We fix your infrastructure.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
              Then we make it fix itself.
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Transition from legacy slow, static reports to an autonomic, self-healing operating system. Our elite engineering teams stabilize, monitor, and configure your critical environments in 30 days, guaranteed.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={onInitiateAudit}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-[0_0_24px_rgba(139,92,246,0.5)] flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              Initiate 30-Day Audit
            </button>
            <button 
              onClick={() => setActiveTab('platform')}
              className="px-6 py-3 liquid-glass-card rounded hover:border-cyan-400 hover:text-cyan-400 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-purple-400" />
              View Live Telemetry
            </button>
          </div>
        </div>

        {/* Right Fluid 3D Graphics Box (Aesthetic network flow) */}
        <div className="lg:col-span-5 relative">
          <div className="w-full aspect-square relative rounded-2xl p-[1px] bg-gradient-to-b from-purple-500/30 to-transparent">
            {/* Ambient Shadow glow */}
            <div className="absolute inset-0 bg-purple-600/10 blur-[40px] rounded-2xl -z-10" />

            {/* Core Card with Glass Reflection */}
            <div className="relative w-full h-full bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
              
              {/* Cinematic network pattern overlay */}
              <div 
                className="flex-grow bg-cover bg-center opacity-65 mix-blend-screen"
                style={{ 
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZFBAfIDfcyMImwl_IM31QprfkpL_4b5QC3ZVy-CPoJHfXna3qjc8yXxZ-n7BLJCuSXeKTDknLhVOsAZqbvSlM8gJuGmtGOVjl7Qeh2wji0S7_2dr1oaa7371kpC_gCGi4kZWyMmZUEHpoZU6NxUkvJoPlNUnFJ7SZy2WaEHydVBGLwyG37O_BKV3IE7VCYi9tqC_oJYcr6sDt_w_Y3EmHnRnlG6gI81_jeCFVXPzzC_yA00V39kTCrkdZ8RoUtlhVEIi2tWDKs8s')`
                }}
              />

              {/* Data Dashboard Panel on top */}
              <div className="absolute top-4 left-4 p-3 rounded-lg bg-black/60 border border-purple-500/20 backdrop-blur-md">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  CTDL DIRECT ANCHOR
                </span>
                <p className="text-xs font-bold text-white mt-1">Autonomous Control loop</p>
              </div>

              {/* Bottom Telemetry Metrics Strip */}
              <div className="p-4 bg-black/50 border-t border-purple-500/10 backdrop-blur-sm flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400 select-all tracking-wider text-center sm:text-left">
                  SYS.STATE: STABILIZED // LATENCY: {latency}ms // UPTIME: {uptime}%
                </span>
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Interactive Bento Block: The OctoAI Platform Engine */}
      <section className="space-y-12">
        <div className="text-center md:max-w-3xl mx-auto space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            The OctoAI Platform Engine
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            The Universal AI Orchestrator (UAIO) loop visualizes real-time machine remediation. Detect critical security anomalies, deploy automatic policy fixes, and cryptographically prove compliance.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Detect */}
          <div className="liquid-glass-card rounded-xl p-6 flex flex-col space-y-4 cursor-pointer hover:border-purple-400/50 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-600/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="w-12 h-12 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:bg-purple-600/20 group-hover:border-purple-400 transition-colors">
              <Radar className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">1. Detect</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow">
              Continuous, deep-state telemetry observability and drift analysis across multi-cloud and physical assets. Strict Zero-Trust validation at the absolute edge.
            </p>
            <div className="pt-4 border-t border-purple-500/10 font-mono text-[10px] text-purple-400 flex justify-between items-center bg-purple-500/5 px-2 py-1 rounded">
              <span>ACTIVE CLUSTER SENSORS</span>
              <span className="font-bold">14,204</span>
            </div>
          </div>

          {/* Card 2: Fix */}
          <div className="liquid-glass-card rounded-xl p-6 flex flex-col space-y-4 cursor-pointer border-indigo-500/40 glow-purple group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-indigo-500/15 to-transparent rounded-bl-full pointer-events-none" />
            <div className="w-12 h-12 rounded bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-[#05000A] rounded flex items-center justify-center">
                <Cpu className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" />
              </div>
            </div>
            <h3 className="font-display font-bold text-xl text-white">2. Fix</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow">
              Deterministic, autonomous policy remediation. OctoAI identifies infrastructure drift root causes and propagates pre-signed, cryptographically validated patches.
            </p>
            <div className="pt-4 border-t border-purple-500/10 font-mono text-[10px] text-cyan-400 flex justify-between items-center bg-cyan-500/5 px-2 py-1 rounded">
              <span>AUTONOMIC PATCH REGISTRY</span>
              <span className="animate-pulse font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> LIVE FIXES
              </span>
            </div>
          </div>

          {/* Card 3: Prove */}
          <div className="liquid-glass-card rounded-xl flex flex-col cursor-pointer border-purple-500/40 relative overflow-hidden group min-h-[300px]">
            {/* Anchor Image background with dark scrim */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-screen group-hover:opacity-55 transition-opacity duration-500"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIqoJibNtVvAuccWTBZHIbV1GmdMJ6GQsBfDxqH7YdWkhGJf8Zpa_rGTrbPzsEr9-UpjsCNYa38UxGkJBmtTT3QZ4MG29rXExw7G8EstjwdJ27hTgwiLZDsZYK6EkZwcandQKEVrJgEIWgEV1rnySiVITvQBzjJBT0ziiBg8ohxfIu_-ten-HR8uSoyoVWQj43ad2eL6nSm76tBLV5FDTqe2QEIhvOQpUCy1uYGk6LvgIPIlW_COw0uxUpzIVQi1Sl334Fxuvqcqk')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05000A] via-[#05000A]/70 to-transparent" />
            
            <div className="relative z-10 p-6 flex flex-col h-full space-y-4 justify-between flex-grow">
              <div className="w-12 h-12 rounded bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:bg-purple-600/25 group-hover:border-purple-400 transition-colors">
                <FileCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-2 mt-auto">
                <h3 className="font-display font-bold text-xl text-white">3. Prove</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-normal">
                  Every infrastructure adjustment anchors a secure receipt file transaction into public blockchains. Standard auditing becomes immediate and undeniably certified.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/10 font-mono text-[10px] text-emerald-400 flex justify-between items-center bg-emerald-500/5 px-2 py-1 rounded">
                <span>BITCOIN ANCHOR BLOCK</span>
                <span className="font-bold">#2026-CTDL</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Scale with Confidence Counters */}
      <section className="liquid-glass-card rounded-2xl p-8 sm:p-12 relative overflow-hidden border-purple-500/20">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full filter blur-[100px]" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 lg:divide-x divide-purple-500/10 text-center">
          
          <div className="pt-6 md:pt-0 pb-6 md:pb-0">
            <h4 className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase mb-2">
              Concurrent Agents
            </h4>
            <div className="text-4xl font-display font-extrabold text-white">
              <StatsCounter end={10000} suffix="+" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">Autonomous Hive Swarms</p>
          </div>

          <div className="pt-6 md:pt-0 pb-6 md:pb-0">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#22D3EE] uppercase mb-2">
              Assets Managed
            </h4>
            <div className="text-4xl font-display font-extrabold text-white">
              <StatsCounter end={2.5} decimals={1} suffix="M" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">Multi-cloud Infrastructure Node Elements</p>
          </div>

          <div className="pt-6 md:pt-0 pb-6 md:pb-0">
            <h4 className="text-xs font-mono font-bold tracking-widest text-purple-300 uppercase mb-2">
              Remediation Time
            </h4>
            <div className="text-4xl font-display font-extrabold text-white">
              &lt; <StatsCounter end={500} suffix="ms" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">Deterministic System-wide Hotfixes</p>
          </div>

          <div className="pt-6 md:pt-0 pb-6 md:pb-0">
            <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2">
              Compliance Uptime
            </h4>
            <div className="text-4xl font-display font-extrabold text-white">
              <StatsCounter end={100} suffix="%" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">NIST & EU AI Act Auditable Precision</p>
          </div>

        </div>
      </section>

      {/* 4. Interactive Timeline & Streaming Ledger Receipts */}
      <section className="space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-purple-500/10 pb-6">
          <div>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              30-Day Stabilization Timeline
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Follow our process, tracking raw server observability down to deterministic provable autonomic healing.
            </p>
          </div>
          <div className="text-[11px] font-mono text-purple-400 bg-purple-500/5 px-3 py-1 rounded border border-purple-500/15 flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5" />
            <span>VERIFYING CRYPTOGRAPHY STATE // STEADY REMEDIATION</span>
          </div>
        </div>

        {/* Timeline navigation & Ledger Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Stabilization Navigation Steps */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative">
            <div className="absolute left-10 top-6 bottom-6 w-px bg-purple-500/10 -z-10" />

            {timeline.map((step) => {
              const isSelected = activeSegment === step.dayNumber;
              const isCompleted = step.status === 'completed';
              const isPending = step.status === 'pending';

              return (
                <div
                  key={step.dayNumber}
                  onClick={() => step.status !== 'pending' && setActiveSegment(step.dayNumber)}
                  className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                    isSelected 
                      ? 'bg-purple-950/20 border-purple-500 glow-purple shadow-xl scale-[1.01]' 
                      : isPending
                        ? 'border-dashed border-purple-500/5 opacity-55 cursor-not-allowed'
                        : 'bg-white/5 border-white/10 hover:border-purple-400/40'
                  }`}
                >
                  {/* Step Bubble Indicator */}
                  <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-mono text-sm font-semibold transition-all ${
                    isSelected 
                      ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.6)]' 
                      : isCompleted
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-purple-950/15 text-gray-400 border border-purple-500/10'
                  }`}>
                    {step.dayNumber}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono tracking-wider font-bold ${isSelected ? 'text-purple-400' : 'text-gray-400'}`}>
                        {step.dayRange}
                      </span>
                      {isCompleted && (
                        <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded border border-emerald-500/20">
                          VERIFIED
                        </span>
                      )}
                      {isSelected && (
                        <span className="text-[9px] font-mono bg-purple-500/15 text-purple-300 px-1 py-0.2 rounded border border-purple-500/30 animate-pulse">
                          ACTIVE PHASE
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`font-display font-bold text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {step.title}
                    </h3>
                    
                    <ul className="text-xs text-gray-400 space-y-1 pt-1.5 list-disc list-inside">
                      {step.tasks.map((task, idx) => (
                        <li key={idx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Ledger View / Stream Details */}
          <div className="lg:col-span-7">
            <div className="liquid-glass-card rounded-2xl p-6 sm:p-8 flex flex-col space-y-6 h-full relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white">
                    Live Remediation Ledger
                  </h3>
                  <p className="text-xs text-gray-400">
                    Real-time immutable cryptographic security receipts.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[11px] font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
                  STREAMING TELEMETRY
                </span>
              </div>

              {/* Streaming Records list */}
              <div className="space-y-4 overflow-y-auto max-h-[360px] pr-1">
                <AnimatePresence initial={false}>
                  {ledgerFeed.map((item) => {
                    let statusBg = 'bg-purple-500/10 border-purple-500/30 text-purple-300';
                    let statusDot = 'bg-purple-400';
                    if (item.type === 'cve') {
                      statusBg = 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300';
                      statusDot = 'bg-cyan-400';
                    } else if (item.type === 'threat') {
                      statusBg = 'bg-red-500/10 border-red-500/30 text-red-300';
                      statusDot = 'bg-red-400';
                    }

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        onClick={() => onSelectReceipt(item)}
                        className="p-4 rounded-xl bg-slate-950/60 border border-purple-500/10 hover:border-purple-400 transition-colors cursor-pointer relative group overflow-hidden"
                      >
                        {/* Custom visual left edge border - Soft Military Chamfer */}
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500 to-indigo-600" />
                        
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pl-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-gradient-to-tr from-white/5 to-purple-950/20 border border-white/10 flex items-center justify-center text-xs text-purple-300 font-mono font-bold">
                              {item.timestamp.slice(0, 5)}
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-semibold text-white space-x-1 flex items-center flex-wrap">
                                <span>{item.title}</span>
                              </div>
                              <p className="text-[11px] text-gray-400 font-mono">{item.target}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end text-right w-full sm:w-auto">
                            <span className="text-[11px] font-semibold text-purple-300 font-mono flex items-center gap-1 mb-0.5">
                              {item.actionText}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono font-bold select-all">
                              {item.txHash}
                            </span>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Note helper info */}
              <div className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1.5 border-t border-purple-500/5 pt-4">
                <Info className="w-3.5 h-3.5 text-purple-400" />
                <span>Clicking any ledger item generates decentralized verifiable blockchain trace documents.</span>
              </div>

            </div>
          </div>

        </div>
      </section>

    </motion.div>
  );
}

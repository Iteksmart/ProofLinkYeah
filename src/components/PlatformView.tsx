/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, BookOpen, Fingerprint, Rocket, Receipt, AlertTriangle, Play, CheckCircle, RefreshCcw, Terminal as TermIcon, Compass, Hammer } from 'lucide-react';
import { IncidentItem, INITIAL_INCIDENTS, LedgerItem } from '../types';

interface PlatformViewProps {
  onDeploy: () => void;
  onSelectReceipt: (item: LedgerItem) => void;
  onAddLedgerItem: (item: LedgerItem) => void;
  addNotification: (message: string) => void;
}

export default function PlatformView({ 
  onDeploy, 
  onSelectReceipt, 
  onAddLedgerItem,
  addNotification 
}: PlatformViewProps) {
  // Simulator states
  const [incidents, setIncidents] = useState<IncidentItem[]>(INITIAL_INCIDENTS);
  const [aiopsAlerts, setAiopsAlerts] = useState<string[]>([
    '[10:42:01] CRITICAL: K8s cluster CPU spike detected.',
    '[10:42:05] WARN: High latency on API Gateway.',
    '[10:42:12] CRITICAL: Database connection pool exhausted.',
    '[10:42:18] WARN: Firewall anomalous traffic pattern.',
    '[10:42:25] CRITICAL: Node eviction triggered.',
    '[10:42:26] CRITICAL: Service \'payment-svc\' offline.'
  ]);

  // Terminal state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Welcome to Citadel Command Platform v2.6.49',
    'Initializing connection to UAIO Edge clusters...',
    'Secure Connection established over TLS v1.3',
    'Type "help" to view available tools.',
    '',
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Simulation log tracker
  const [isRunningSim, setIsRunningSim] = useState<boolean>(true);

  // Suggest command triggers
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setTerminalLogs(prev => [...prev, `root@citadel-cmd:~ $ ${trimmed}`]);

    const commandWord = trimmed.toLowerCase();

    let reply: string[] = [];

    switch (commandWord) {
      case 'help':
        reply = [
          'Available Command Directives:',
          '  uaio status   - Check physical cluster security baseline status',
          '  uaio list     - List active and resolved defense incident records',
          '  uaio heal     - Force run diagnostic remediation algorithms',
          '  clear         - Flush screen logs and history',
        ];
        break;
      case 'uaio status':
        reply = [
          '[OK] Core Engine Loop: Online & Deterministic',
          '[OK] Federal Sync Feed: Connected (SAM.gov)',
          '[OK] K8s Ingress Integrations: Verified Safe',
          '[OK] Cryptographic Certificate Chain: Signed',
          'Latency: 12ms // Uptime: 99.9992%',
        ];
        break;
      case 'uaio list':
        reply = [
          'Active Remediation Agent Registry Tasks:',
          ' - INC-4992 [SecOp-Alpha]: Mitigating Port 443 scan',
          ' - INC-4991 [K8s-Healer]: Pod OOM reboot [RESOLVED]',
          ' - INC-4990 [IAM-Sentry]: Drift correction executed [RESOLVED]',
        ];
        break;
      case 'uaio heal':
        reply = [
          '[RUN] Initiating force audit scan across all host nodes...',
          '[OK] Zero vulnerabilities discovered.',
          '[OK] All cluster parameters match ledger-anchored baselines.',
          'State: SECURED.',
        ];
        // Trigger simulation
        handleManualTrigger();
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      default:
        reply = [
          `Command not recognized: "${trimmed}".`,
          'Type "help" to view full manual commands list.',
        ];
    }

    setTerminalLogs(prev => [...prev, ...reply, '']);
    setTerminalInput('');
  };

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  // Alert noise ticker
  useEffect(() => {
    if (!isRunningSim) return;
    const interval = setInterval(() => {
      const noisyAlerts = [
        '[Noise alert] WARN: Memory limit boundary 85% reached on redis-cache-03',
        '[Noise alert] INFO: Docker cluster pool scale down scheduled',
        '[Noise alert] FLAPPING: Connection latency variable on east-ingress-router',
        '[Noise alert] ALERT: Repeated guest authentication attempt from IP 54.21.32.14',
        '[Noise alert] CRITICAL: Thread pool boundary saturation near limit in analytics-worker'
      ];
      const randomAlert = noisyAlerts[Math.floor(Math.random() * noisyAlerts.length)];
      setAiopsAlerts(prev => [...prev, `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${randomAlert}`].slice(-8));
    }, 5000);
    return () => clearInterval(interval);
  }, [isRunningSim]);

  // Triggering new manually triggered incident
  const handleManualTrigger = () => {
    const randomId = 'INC-' + Math.floor(1000 + Math.random() * 9000);
    const incidentTemplates = [
      {
        name: 'Postgres SQL Injection Heuristic Spike',
        details: 'Heuristic detection flagged repeated DROP TABLE patterns on staging SQL queries.',
        agent: 'Agent-SQL-Defender',
        cmd: 'psql -c "ALTER ROLE guest_reader WITH LOGIN NOINHERIT DENY SELECT"',
        output: 'SUCCESS: Staging DB guest credentials quarantined. Query validated against rules.'
      },
      {
        name: 'SSH SSHD Brute Force Injection',
        details: 'SSH access logs flagged 15 rapid authentication failures in 5 seconds.',
        agent: 'Agent-SSHD-Sentry',
        cmd: 'fail2ban-client set sshd banip 184.23.112.5',
        output: 'SUCCESS: Remote attacker IP banned for 180 hours. State authenticated.'
      },
      {
        name: 'Docker Daemon Config Tampering',
        details: 'Config file drift detected on host file /etc/docker/daemon.json.',
        agent: 'Agent-Daemon-Fixer',
        cmd: 'sha256sum --check /var/lib/citadel/docker-baseline.sha256',
        output: 'SUCCESS: Host docker file alignment corrected. Root privilege verified.'
      }
    ];

    const template = incidentTemplates[Math.floor(Math.random() * incidentTemplates.length)];
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    const newInc: IncidentItem = {
      id: randomId,
      name: template.name,
      details: template.details,
      severity: 'critical',
      timestamp: timeStr,
      active: true,
      assignedAgent: template.agent,
      execCommand: template.cmd,
      cmdOutput: template.output
    };

    // Add to incidents lists
    setIncidents(prev => [newInc, ...prev]);
    // Notify user
    addNotification(`Anomaly Blocked: ${template.name}`);

    // Simulate auto-resolution which takes 2.5 seconds
    setTimeout(() => {
      setIncidents(prev => prev.map(inc => {
        if (inc.id === randomId) {
          return { ...inc, active: false };
        }
        return inc;
      }));

      // Generate ledger item
      const ledgerRandomId = 'PLR-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.random().toString(36).substr(2, 4);
      const ledgerItem: LedgerItem = {
        id: ledgerRandomId,
        type: 'threat',
        title: `${template.name} Neutralized`,
        target: `Assigned: ${template.agent}`,
        actionText: 'Remediated & Bitcoin Sealed',
        txHash: '0x' + Math.random().toString(16).substr(2, 8) + '...' + Math.random().toString(16).substr(2, 8),
        status: 'remediated',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
      };
      
      onAddLedgerItem(ledgerItem);
      addNotification(`Cryptographic Receipt Generated: ${ledgerRandomId}`);

    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="space-y-24"
    >
      
      {/* Hero Header */}
      <section className="relative flex flex-col justify-center items-center text-center py-12 md:py-18 overflow-hidden">
        
        {/* Shifting decorative neural sphere image behind overlay */}
        <div 
          className="absolute inset-0 -z-20 opacity-20 bg-cover bg-center mix-blend-screen" 
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfXbKSfEEnt15HovPQow2hoW7Dbj8XLZyHlWBarym-TJ1Uc2sNcvwBkJpqdWHkRD7dSNEjFt5ii6UfFL_WWaJ5KjeTr0tbfMrZPT5vs_8oHwf-h4UsTPVBrlsJ3ZYfNZeOP-dVYvUgme39sj5HwGDlosWEfD1RVI9rbaVEr-Efq-EkDAo7Yvlzrm8XGRHtNTcz2JyjhYJNrpVMD17BJoHZmzkiq39Vlgq7bV63o_dSZDTXCOoFzHkPtg-9A6qIg_0yffPa0WYypEY')` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#05000A] via-transparent to-[#05000A]" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[10px] tracking-wide mb-6 uppercase">
          <TermIcon className="w-3.5 h-3.5" />
          <span>AUTONOMIC HEALING VS RAW ALERT FATIGUE ERROR</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-6 leading-tight">
          AIOps is Noise.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-cyan-400">
            UAIO is Action.
          </span>
        </h1>
        
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          Deterministic autonomous incident orchestration. We don't just alert; we resolve instantly. Configured specifically for mission-critical Citadel Command setups.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={onDeploy}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded cursor-pointer shadow-[0_0_24px_rgba(139,92,246,0.3)] flex items-center gap-2"
          >
            <Rocket className="w-4 h-4 text-purple-300 animate-bounce" />
            Deploy UAIO Instance
          </button>
          
          <button 
            onClick={handleManualTrigger}
            className="px-8 py-3 liquid-glass-card hover:border-purple-400 hover:text-purple-400 text-white font-bold text-xs uppercase tracking-wider rounded cursor-pointer flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-emerald-400 animate-pulse" />
            Trigger Simulated Anomaly
          </button>
        </div>

        {/* 3 Tactical Clearances */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
          
          <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-purple-500/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block block leading-none mb-1">
                Security clearance
              </span>
              <span className="text-xs font-mono font-bold text-purple-400">
                SDVOSB Federal Level
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-purple-500/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block block leading-none mb-1">
                Federal Registry
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                SAM.gov Verified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-purple-500/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase block block leading-none mb-1">
                Gov Entity ID
              </span>
              <span className="text-xs font-mono font-bold text-indigo-400 font-mono">
                CAGE: 172W2
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* Interactive Incident Simulator comparative display */}
      <section className="space-y-8 relative">
        <div className="border-l-4 border-purple-500 pl-4">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            UAIO vs AIOps: Live Simulation
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Compare passive legacy alert floods against real-time autonomic agent remediations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column A: Alert noise */}
          <div className="liquid-glass-card rounded-2xl p-6 flex flex-col h-[520px]">
            <div className="flex justify-between items-center mb-6 border-b border-purple-500/10 pb-4">
              <div className="text-left">
                <h3 className="text-sm font-bold text-white uppercase font-mono">
                  Legacy AIOps (Noise)
                </h3>
                <p className="text-[11px] text-gray-500">Unfiltered passive telemetry stream</p>
              </div>
              <span className="bg-red-500/10 text-red-400 px-2.5 py-1 rounded font-mono text-[10px] uppercase font-bold border border-red-500/20 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Alert Fatigue Active
              </span>
            </div>

            {/* Simulated log dump */}
            <div className="flex-grow overflow-y-auto space-y-3 pr-1 text-xs font-mono text-gray-400">
              {aiopsAlerts.map((alert, idx) => {
                const isCritical = alert.includes('CRITICAL');
                return (
                  <div 
                    key={idx}
                    className={`p-2.5 rounded border ${
                      isCritical 
                        ? 'border-red-500/15 bg-red-500/5 text-red-300' 
                        : 'border-yellow-500/10 bg-yellow-500/5 text-yellow-300'
                    }`}
                  >
                    <div>{alert}</div>
                    <div className="text-[10px] text-gray-600 mt-1">
                      {isCritical ? '{"remediation": "NONE", "status": "WAITING_ON_HUMAN"}' : '{"status": "PINGING_PAGER"}'}
                    </div>
                  </div>
                );
              })}
              <div className="text-center text-gray-500 italic mt-6 animate-pulse text-[11px]">
                Awaiting manual engineer pager intervention...
              </div>
            </div>
          </div>

          {/* Column B: UAIO Hive action */}
          <div className="liquid-glass-card rounded-2xl p-6 flex flex-col h-[520px] border-purple-500/40 glow-purple">
            <div className="flex justify-between items-center mb-6 border-b border-purple-500/10 pb-4">
              <div className="text-left">
                <h3 className="text-sm font-bold text-purple-300 uppercase font-mono">
                  UAIO Agent Hive (Action)
                </h3>
                <p className="text-[11px] text-purple-400">Autonomic healing orchestrator loops</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded font-mono text-[10px] uppercase font-bold border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 animate-pulse" />
                Active Remediators
              </span>
            </div>

            {/* Remediation visualizers list */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-1">
              <AnimatePresence initial={false}>
                {incidents.map((inc) => (
                  <motion.div
                    key={inc.id}
                    layoutId={`inc-${inc.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-slate-950/60 border border-purple-500/25 relative overflow-hidden receipt-clip"
                  >
                    <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-amber-500" />
                    
                    <div className="flex justify-between items-start mb-2pl-1">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-mono font-bold text-purple-300">{inc.id}</span>
                          <span className="text-xs font-bold text-white">{inc.name}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">{inc.details}</p>
                      </div>

                      <div className="text-right">
                        {inc.active ? (
                          <span className="text-[9px] font-mono text-amber-400 animate-pulse bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-bold">
                            REVOLVING...
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded uppercase font-bold">
                            RESOLVED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress slider bar if active */}
                    {inc.active && (
                      <div className="h-1 w-full bg-purple-950 mt-2.5 rounded overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                          animate={{ width: ['0%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                    )}

                    {/* CLI script actions code box */}
                    <div className="mt-3 bg-black/60 p-2.5 rounded-lg border border-purple-500/10 font-mono text-[10.5px]">
                      <div className="text-purple-400 leading-normal flex items-center gap-1.5 select-all">
                        <span className="text-cyan-400">&gt;&gt;&gt; EXEC CMD:</span>
                        <code>{inc.execCommand}</code>
                      </div>
                      <div className="text-emerald-400 mt-1 leading-normal">
                        <span className="text-gray-500">&gt;&gt;&gt; STDOUT:</span> {inc.cmdOutput}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mt-3 border-t border-purple-500/5 pt-2">
                      <span>ASSIGNED CLUSTER: {inc.assignedAgent}</span>
                      <span>HASH SEAL: sha256_chk_df38...</span>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* Terminal shell tool & Live peripheral scanner */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Terminal Command box */}
          <div className="lg:col-span-8 liquid-glass-card rounded-2xl overflow-hidden flex flex-col h-[400px]">
            {/* Header tab decoration */}
            <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                <span className="text-xs font-mono text-purple-400 ml-4 font-semibold">root@citadel-cmd:~</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-gray-500">SESSION: TLS-SSH</span>
              </div>
            </div>

            {/* Output log */}
            <div className="flex-grow p-4 overflow-y-auto space-y-1.5 font-mono text-xs text-purple-300 bg-black/60">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {log}
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* CLI suggested command prompts bar */}
            <div className="bg-[#05000A] py-2 px-3 flex flex-wrap gap-2 border-t border-white/10">
              <span className="text-[10px] font-mono text-gray-500 self-center uppercase pr-1">Suggested Directives:</span>
              <button 
                onClick={() => executeCommand('uaio status')}
                className="px-2.5 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-mono text-[10px] cursor-pointer border border-white/10 hover:border-purple-400 transition-colors"
              >
                uaio status
              </button>
              <button 
                onClick={() => executeCommand('uaio list')}
                className="px-2.5 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-mono text-[10px] cursor-pointer border border-white/10 hover:border-purple-400 transition-colors"
              >
                uaio list
              </button>
              <button 
                onClick={() => executeCommand('uaio heal')}
                className="px-2.5 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-mono text-[10px] cursor-pointer border border-white/10 hover:border-purple-400 transition-colors"
              >
                uaio heal
              </button>
              <button 
                onClick={() => executeCommand('clear')}
                className="px-2.5 py-1 rounded bg-[#05000A] hover:bg-purple-950/20 text-gray-400 font-mono text-[10px] cursor-pointer border border-white/10 transition-colors ml-auto"
              >
                clear
              </button>
            </div>

            {/* Input field */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                executeCommand(terminalInput);
              }}
              className="flex bg-slate-950 border-t border-purple-500/15"
            >
              <div className="px-4 py-3 text-purple-400 font-mono text-xs bg-black/60">&gt;</div>
              <input 
                type="text" 
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type command directive (e.g. 'uaio status') and press Enter..."
                className="flex-grow bg-transparent text-white font-mono text-xs px-2 py-3 border-none outline-none focus:ring-0 focus:ring-offset-0 focus:border-none"
              />
            </form>
          </div>

          {/* Compass Radar status screen */}
          <div className="lg:col-span-4 liquid-glass-card rounded-2xl p-6 flex flex-col justify-between h-[400px] relative overflow-hidden text-center">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-left border-b border-purple-500/10 pb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              Direct Live Perimeter Scan
            </h3>

            {/* Rotating Radar visual wrapper */}
            <div className="flex-grow flex items-center justify-center py-4">
              <div className="relative w-44 h-44 rounded-full border border-purple-500/20 flex items-center justify-center flex-shrink-0 bg-purple-500/5">
                
                {/* Radar beam scan loop */}
                <div 
                  className="absolute inset-0 rounded-full border border-purple-500/40 opacity-75 animate-ping"
                  style={{ animationDuration: '4s' }}
                />
                
                {/* Revolving hand vector layer */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none"
                >
                  <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-[#22D3EE] origin-left translate-x-11 self-center" />
                </motion.div>

                {/* Secure network blip markers */}
                <div className="absolute w-2 h-2 bg-emerald-400 rounded-full top-[25%] left-[25%] shadow-[0_0_10px_#34d399]" />
                <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full bottom-[30%] right-[25%] shadow-[0_0_10px_#34d399]" />
                <div className="absolute w-2.5 h-2.5 bg-[#22D3EE] rounded-full top-[45%] right-[15%] shadow-[0_0_10px_#22d3ee] animate-pulse" />

                {/* Center dot anchor */}
                <div className="w-8 h-8 rounded-full bg-[#05000A] border border-white/10 flex items-center justify-center text-[10px] text-purple-300 font-mono font-bold z-15">
                  CTDL
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-500/10">
              <p className="text-[11px] font-mono text-gray-400">
                ACTIVE STATUS SCANNER RANGE: 5,000 Nodes
              </p>
              <div className="text-xs font-semibold text-purple-400 mt-1 flex items-center justify-center gap-1">
                <Hammer className="w-3.5 h-3.5" />
                <span>ALL NODE PARITY SECURED</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </motion.div>
  );
}

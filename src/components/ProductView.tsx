/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Database, 
  Play, 
  Pause, 
  RefreshCw, 
  Layers, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Code, 
  Server, 
  HardDrive, 
  DollarSign, 
  Calculator, 
  AlertCircle,
  HelpCircle,
  Clock,
  Fingerprint
} from 'lucide-react';

interface ProductViewProps {
  setActiveTab: (tab: 'product' | 'consulting' | 'platform' | 'verify') => void;
  onInitiateAudit?: () => void;
  onSelectReceipt?: (id: string) => void;
}

interface SimulatedBlock {
  height: number;
  hash: string;
  payloadType: string;
  timestamp: string;
  status: 'sealed' | 'signing' | 'queued';
}

const INTEGRATION_SNIPPETS = {
  bash: `curl -X POST "https://api.prooflink.itechsmart.com/v2/proofs" \\
  -H "Authorization: Bearer \${PROOFLINK_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "node_id": "cluster-us-east-4",
    "payload_hash": "0x89fa3cde882...",
    "category": "SOC2_COMPLIANCE",
    "metadata": { "system": "billing-pods", "owner": "secops" }
  }'`,
  javascript: `import { ProofLinkClient } from '@prooflink/sdk';

const client = new ProofLinkClient({
  apiKey: process.env.PROOFLINK_KEY ?? '',
  complianceMode: 'autonomous'
});

// Issue cryptographic proof receipt
const receipt = await client.issueProof({
  target: "Role: Database_Admin",
  action: "Reverted unauthorized IAM drift",
  metadata: { cluster: "us-east-prod-01" }
});
console.log(\`Proof sealed at block \${receipt.blockHeight}: \${receipt.txHash}\`);`,
  python: `from prooflink import ProofLinkEngine

# Initialize standard autonomic anchor
engine = ProofLinkEngine(
    sec_key=environ.get("PROOFLINK_KEY"),
    environment="production-hybrid"
)

# Broadcast autonomic state verification proof
receipt = engine.seal_proof(
    source="Ingress: API-Gateway-Alpha",
    category="zero_day_vulnerability",
    action="IP BLOCKLISTED"
)
print(f"Mathematical envelope integrity: {receipt.is_valid()}")`
};

export default function ProductView({ setActiveTab, onInitiateAudit }: ProductViewProps) {
  // Autopilot simulation states
  const [autopilotSpeed, setAutopilotSpeed] = useState<'normal' | 'quantum' | 'supercharged' | 'paused'>('normal');
  const [activeIntegrationTab, setActiveIntegrationTab] = useState<'bash' | 'javascript' | 'python'>('bash');
  
  // Dynamic statistics
  const [liveTPS, setLiveTPS] = useState(1284);
  const [integrityScore, setIntegrityScore] = useState(99.9994);
  const [systemUptime, setSystemUptime] = useState(99.998);
  const [totalSecuredProofs, setTotalSecuredProofs] = useState(482938102);

  // ROI Calculator inputs
  const [monthlyIncidents, setMonthlyIncidents] = useState(12);
  const [downtimeCost, setDowntimeCost] = useState(4500);

  // Self-running proof simulation ledger list
  const [simulatedLedger, setSimulatedLedger] = useState<SimulatedBlock[]>([
    { height: 492094, hash: '0x8fa3...10b9', payloadType: 'IAM Policy Drift Rectified', timestamp: '10:52:12', status: 'sealed' },
    { height: 492093, hash: '0x39dc...e829', payloadType: 'CVE-2024-0412 Critical Vulnerability Patched', timestamp: '10:52:03', status: 'sealed' },
    { height: 492092, hash: '0x1c3a...4fbd', payloadType: 'Brute force network scan neutralized', timestamp: '10:51:48', status: 'sealed' },
    { height: 492091, hash: '0x7e29...bf01', payloadType: 'ISO 27001 Gateway Attestation', timestamp: '10:51:30', status: 'sealed' },
  ]);

  const [currentSigningPayload, setCurrentSigningPayload] = useState<any>({
    id: "PLX-4912",
    audit_target: "Role: Temp_Admin",
    compliance_metric: "SOC2-CC.6.3",
    timestamp: "10:52:21",
    signature_digest: "0xec729b4e39ffbca739...",
  });

  // Keep a reference for calculating autopilot interval time
  const intervalTime = useMemo(() => {
    switch (autopilotSpeed) {
      case 'quantum': return 1500;
      case 'supercharged': return 600;
      case 'paused': return 99999999;
      default: return 3200;
    }
  }, [autopilotSpeed]);

  // Autopilot live-updating engine loop
  useEffect(() => {
    if (autopilotSpeed === 'paused') return;

    const timer = setInterval(() => {
      // 1. Generate new simulated transaction
      const payloadTypes = [
        'Root privilege session audit',
        'ZKP Verification Standard Sec-V2',
        'Federal Gateway compliance sync',
        'Autonomic patch verification',
        'TLS cert renewal handshake',
        'Zero-day signature push',
        'Database shadow sync integrity',
        'API payload structure validation'
      ];
      const randomType = payloadTypes[Math.floor(Math.random() * payloadTypes.length)];
      const randomId = Math.floor(Math.random() * 9000) + 1000;
      const randomSec = ['SOC2-CC.4.1', 'ISO-A.12.6.1', 'HIPAA-164.308', 'GDPR-Art.32'][Math.floor(Math.random() * 4)];
      
      const nextId = "PLX-" + randomId;
      const nextTimestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      
      const newPayload = {
        id: nextId,
        audit_target: `ClusterNode: zone-us-east-${Math.floor(Math.random() * 4) + 1}`,
        compliance_metric: randomSec,
        timestamp: nextTimestamp,
        signature_digest: "0x" + Array.from({length: 24}, () => Math.floor(Math.random()*16).toString(16)).join("") + "...",
      };

      setCurrentSigningPayload(newPayload);

      // 2. Append sealed block
      setSimulatedLedger(prev => {
        const topBlock = prev[0];
        const newBlock: SimulatedBlock = {
          height: topBlock.height + 1,
          hash: "0x" + Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join("") + "...",
          payloadType: topBlock.payloadType, // The previous signing payload is now sealed
          timestamp: topBlock.timestamp,
          status: 'sealed'
        };
        return [newBlock, ...prev.slice(0, 4)];
      });

      // 3. Fluctuate metrics slightly
      setLiveTPS(prev => {
        const delta = Math.floor(Math.random() * 100) - 50;
        const target = prev + delta;
        return target < 900 ? 1120 : target > 1600 ? 1340 : target;
      });

      setTotalSecuredProofs(prev => prev + 1 + Math.floor(Math.random() * 5));
      setIntegrityScore(prev => {
        const drift = (Math.random() * 0.0002) - 0.0001;
        const sum = prev + drift;
        return sum > 99.9999 ? 99.9999 : sum < 99.997 ? 99.9985 : sum;
      });

      setSystemUptime(prev => {
        const drift = (Math.random() * 0.0001) - 0.00005;
        const sum = prev + drift;
        return sum > 99.9995 ? 99.9995 : sum < 99.992 ? 99.995 : sum;
      });

    }, intervalTime);

    return () => clearInterval(timer);
  }, [autopilotSpeed, intervalTime]);

  // Calculate dynamic ROI statistics
  const annualSavings = useMemo(() => {
    // Standard downtime resolution manually takes ~4 hours. ProofLink does it in 4.2ms.
    // Saving = incidents * hours * hourly_cost - prooflink subscription cost (~12000 annually)
    const hoursSavedPerIncident = 3.5; 
    const grossSavings = monthlyIncidents * 12 * hoursSavedPerIncident * downtimeCost;
    return Math.max(0, grossSavings - 12000);
  }, [monthlyIncidents, downtimeCost]);

  const activeBlockHeight = simulatedLedger[0]?.height || 492094;

  return (
    <div className="space-y-16 py-6 pb-24 md:pb-36">
      
      {/* 1. HERO INTRO BLOCK (Styled EXACTLY per Immersive UI metadata layout) */}
      <section className="relative z-15 pt-8 sm:pt-12 md:pt-16 pb-12 flex flex-col lg:flex-row items-center gap-12 overflow-hidden">
        
        {/* Left Hand: Gorgeous typography & atmospheric claims */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 sm:space-y-8 text-left">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-400">Award Winning Architecture 2026</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter mb-6">
              Proof<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Link</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-lg leading-relaxed font-sans">
              The definitive standard for autonomous verification. Seamless, encrypted, and designed for the hyper-connected era of 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setActiveTab('platform')}
              className="px-8 py-4 bg-purple-600 rounded-2xl font-bold text-lg text-white shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:scale-105 hover:bg-purple-500 hover:shadow-[0_0_45px_rgba(147,51,234,0.65)] transition-all cursor-pointer flex items-center gap-2.5"
            >
              <span>Explore Platform Console</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('verify')}
              className="px-5 py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold text-gray-200 backdrop-blur-md hover:bg-white/10 hover:border-white/25 transition-all text-sm cursor-pointer"
            >
              Verify Math Integrity
            </button>
          </div>

          {/* Quick Metrics from Immersive UI Spec */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 max-w-md">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
                {integrityScore.toFixed(3)}<span className="text-purple-400">%</span>
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans mt-1">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
                4.2<span className="text-purple-400">ms</span>
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans mt-1">Latency</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
                0<span className="text-purple-400">-Day</span>
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans mt-1">Protection</div>
            </div>
          </div>
        </div>

        {/* Right Hand: Hologram liquid crystal/glass orb visualizer */}
        <div className="w-full lg:w-1/2 flex justify-center items-center py-8">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96">
            
            {/* The Central Orb */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full backdrop-blur-3xl border border-white/20 shadow-[inset_0_0_60px_rgba(255,255,255,0.1)] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(168,85,247,0.5)]">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Rotating Rings */}
            <div className="absolute inset-[-10px] border border-purple-500/20 rounded-full animate-[spin_18s_linear_infinite]" />
            <div className="absolute inset-[-30px] border border-indigo-500/15 rounded-full animate-[spin_28s_linear_infinite_reverse]" />
            <div className="absolute inset-[-50px] border border-white/5 rounded-full" />
            
            {/* Floating Glass Widget 1: Real-time Stream Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute top-4 -left-12 p-3 sm:p-4 w-44 sm:w-52 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl rotate-[-8deg]"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Fingerprint className="w-4 h-4 text-purple-300" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-20 bg-white/20 rounded-full mb-1.5" />
                  <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="mt-3 text-[9px] font-mono text-purple-300 uppercase tracking-wider flex justify-between">
                <span>Core: Autonomic</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
            </motion.div>

            {/* Floating Glass Widget 2: Live Metrics */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-6 -right-12 p-4 sm:p-5 w-52 sm:w-60 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/25 shadow-2xl rotate-[6deg]"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-purple-300 font-mono tracking-tighter uppercase font-bold">Real-time Stream</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  </span>
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                    {liveTPS.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">TPS</span>
                </div>
                
                {/* Horizontal Wave Animation bar / visual */}
                <div className="h-8 w-full bg-purple-500/10 rounded-lg flex items-end px-1.5 pb-1 space-x-1 border border-white/5 overflow-hidden">
                  <div className="h-2 w-full bg-purple-400/40 rounded-sm animate-[pulse_1s_infinite]"></div>
                  <div className="h-4 w-full bg-indigo-400/60 rounded-sm animate-[pulse_1.5s_infinite]"></div>
                  <div className="h-3 w-full bg-purple-400/40 rounded-sm animate-[pulse_0.8s_infinite]"></div>
                  <div className="h-6 w-full bg-purple-400 rounded-sm animate-[pulse_1.2s_infinite]"></div>
                  <div className="h-1.5 w-full bg-gray-500/20 rounded-sm"></div>
                  <div className="h-5 w-full bg-indigo-500/80 rounded-sm animate-[pulse_1.1s_infinite]"></div>
                </div>
              </div>
            </motion.div>

            {/* Core Glow Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500 blur-[80px] opacity-35 -z-10" />
          </div>
        </div>
      </section>

      {/* 2. AUTOMATED CRYTOGRAPHIC COMPLIANCE LIVE-PIPELINE (The "Engine" Demonstration) */}
      <section className="relative z-10 p-[1px] bg-gradient-to-r from-purple-500/10 via-indigo-500/15 to-purple-500/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-[#05000A]/95 p-6 sm:p-8 rounded-3xl space-y-8">
          
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-purple-400 font-mono tracking-widest uppercase font-bold mb-2">
                <Layers className="w-4 h-4 animate-spin text-purple-400" />
                Autonomous Engine Demonstration
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Watch Auto-Verification Live
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
                Cryptographic proofs are being formulated, hashed via SHA-256, compiled into Zero-Knowledge envelopes, and anchored forever on our private Proof Ledger. Adjust speed settings to test maximum load limits.
              </p>
            </div>

            {/* Simulation Speed Control Selector */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono self-start sm:self-center">
              <span className="text-gray-500 px-2 uppercase tracking-wider text-[10px] font-bold">Simulator:</span>
              {(['normal', 'quantum', 'supercharged', 'paused'] as const).map((spd) => {
                const label = spd === 'paused' ? 'Pause' : spd === 'normal' ? '1x' : spd === 'quantum' ? 'Quantum' : 'Super';
                const active = autopilotSpeed === spd;
                return (
                  <button
                    key={spd}
                    onClick={() => setAutopilotSpeed(spd)}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer capitalize font-bold ${
                      active 
                        ? 'bg-purple-600/90 text-white shadow-md' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Step A: Live Event Payload Generation */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-yellow-400 rounded-full animate-bounce" />
                    [Stage 1] Log Event Sniffer
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">REALTIME DECODER</span>
                </div>
                <h3 className="text-lg font-bold text-gray-200">Continuous Audit Input</h3>
                <p className="text-xs text-gray-400">
                  ProofLink intercepts cloud events instantaneously and maps compliance envelopes.
                </p>
              </div>

              {/* JSON Live View Container */}
              <div className="bg-black/60 rounded-xl p-4 font-mono text-[11px] text-purple-300 border border-white/5 h-[150px] overflow-hidden flex flex-col justify-between">
                <div className="text-gray-500 select-none border-b border-white/5 pb-1 mb-2 text-[10px] uppercase flex justify-between">
                  <span>Stream Payload - Active ID: {currentSigningPayload.id}</span>
                  <span className="text-cyan-400 animate-pulse">MONITORING</span>
                </div>
                <div className="flex-1 space-y-1 overflow-hidden">
                  <div>{"{"}</div>
                  <div className="pl-4"><span className="text-gray-400">"event_id":</span> "{currentSigningPayload.id}",</div>
                  <div className="pl-4"><span className="text-gray-400">"target":</span> "{currentSigningPayload.id === 'PLX-4912' ? 'Role: Temp_Admin' : currentSigningPayload.audit_target}",</div>
                  <div className="pl-4"><span className="text-gray-400">"compliance":</span> "{currentSigningPayload.compliance_metric}",</div>
                  <div className="pl-4"><span className="text-gray-400">"timestamp":</span> "{currentSigningPayload.timestamp}",</div>
                  <div className="pl-4"><span className="text-gray-400">"signature_digest":</span> "{currentSigningPayload.signature_digest}"</div>
                  <div>{"}"}</div>
                </div>
              </div>

              {/* Live Flow Indicator link */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-500 bg-black/25 px-3 py-2 rounded-lg">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  ZKP-Witness Engine
                </span>
                <span className="text-[10px] text-purple-400 font-bold uppercase transition-all">Formulate Proof...</span>
              </div>
            </div>

            {/* Step B: Visual Central Transformation Pipeline (Arrows & Signatures) */}
            <div className="lg:col-span-2 flex flex-row lg:flex-col items-center justify-center gap-3 py-4 lg:py-0">
              <div className="hidden lg:block h-12 w-[1px] bg-gradient-to-b from-purple-500/40 to-transparent" />
              <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <Cpu className="w-4 h-4 animate-spin" />
              </div>
              <div className="h-1 lg:h-12 w-8 lg:w-[1px] bg-gradient-to-r lg:bg-gradient-to-b from-purple-500/60 to-indigo-500" />
              <div className="bg-indigo-500/15 text-indigo-300 font-mono text-[9px] px-2 py-1 rounded border border-indigo-500/30 uppercase tracking-widest font-bold">
                SEAL
              </div>
              <div className="h-1 lg:h-12 w-8 lg:w-[1px] bg-gradient-to-r lg:bg-gradient-to-b from-indigo-500 to-cyan-500" />
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Database className="w-4 h-4 animate-pulse" />
              </div>
              <div className="hidden lg:block h-12 w-[1px] bg-gradient-to-b from-cyan-500/40 to-transparent" />
            </div>

            {/* Step C: The Real-time Immutable Proof block stack */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-ping" />
                    [Stage 2] Immutable Proof Ledger
                  </span>
                  <span className="text-[10px] font-mono pr-1 text-gray-500">BLOCK: {activeBlockHeight}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-200">Hashed Ledger Stream</h3>
                <p className="text-xs text-gray-400">
                  Proofs are bundled and linked inside an automated chain structure.
                </p>
              </div>

              {/* Rolling Block Stack List */}
              <div className="space-y-2.5 h-[190px] overflow-hide pr-1">
                <AnimatePresence initial={false}>
                  {simulatedLedger.map((block) => (
                    <motion.div
                      key={block.height}
                      initial={{ opacity: 0, x: 20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="bg-black/45 border border-white/5 rounded-xl p-3 flex items-center justify-between font-mono text-xs hover:border-purple-500/35 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-[10px]">
                          #{block.height.toString().slice(-4)}
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-gray-200 text-[11px] font-semibold truncate max-w-[170px] sm:max-w-xs group-hover:text-purple-300">
                            {block.payloadType}
                          </div>
                          <div className="text-[9px] text-gray-500 flex gap-2">
                            <span>Hash: {block.hash}</span>
                            <span>•</span>
                            <span>{block.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-green-400 bg-green-500/10 border border-green-500/25 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                        SEALED
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE PRODUCT SPEC bENTO GRID */}
      <section className="space-y-8 relative z-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-[10px] font-mono tracking-[0.25em] text-purple-400 uppercase font-bold">
            Ultimate Compliance Shield
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ProofLink Platform Capabilities
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">
            Engineered specifically to solve human verification errors and automate full multi-cloud compliance standard handshakes.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Card 1: 99.999% mathematical proof */}
          <div className="md:col-span-3 liquid-glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Zero-Knowledge Attestation</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Formulate absolute proofs of software structure, policy variables, and server deployment baselines without ever exposing deep proprietary business credentials or client configurations to central networks.
              </p>
            </div>
            
            <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">VERIFICATION ENGINE</span>
              <span className="text-purple-300 font-bold flex items-center gap-1">
                ZKP Envelope 2.6
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Card 2: 0-Day patch success */}
          <div className="md:col-span-3 liquid-glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Autonomous Micro-Enforcement</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Integrated triggers watch logs in real-time, instantly patching CVE vulnerabilities or reverting unauthorised system drifts in less than 500 milliseconds. Completely hands-off, continuous protection.
              </p>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">ENFORCEMENT VELOCITY</span>
              <span className="text-indigo-300 font-bold flex items-center gap-1">
                &lt; 500ms Remediation
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Card 3: Live compliance checklist */}
          <div className="md:col-span-4 liquid-glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                Compliance Matrix
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Standardized Federal Security Alignments</h3>
              <p className="text-xs sm:text-xs text-gray-400">
                Continuously anchors immutable audit records aligned automatically with international strict governance compliance.
              </p>
              
              {/* Checkboxes simulated list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-black/30 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-mono text-gray-300">SOC2 CC.6 Audit Ready</span>
                  <span className="text-[8px] font-mono bg-green-500/20 text-green-400 px-1 py-0.5 rounded ml-auto">100% PASS</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-black/30 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-mono text-gray-300">ISO 27001 Annex A.12</span>
                  <span className="text-[8px] font-mono bg-green-500/20 text-green-400 px-1 py-0.5 rounded ml-auto">100% PASS</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-black/30 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-mono text-gray-300">HIPAA Security Standard</span>
                  <span className="text-[8px] font-mono bg-green-500/20 text-green-400 px-1 py-0.5 rounded ml-auto">COMPLIANT</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-black/30 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-gray-300">GDPR Data Portability</span>
                  <span className="text-[8px] font-mono bg-cyan-500/20 text-cyan-400 px-1 py-0.5 rounded ml-auto">GUARDED</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-gray-500">FEDERAL AUDITING BRIDGE</span>
              <span className="text-cyan-400 font-bold">Autocertified Daily</span>
            </div>
          </div>

          {/* Card 4: Hardware Security Module integrations */}
          <div className="md:col-span-2 liquid-glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full pointer-events-none" />
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <HardDrive className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-200">Hardware Roots</h3>
              <p className="text-[11px] sm:text-xs text-gray-400">
                Anchored to Physical Security Modules (HSMs) and Trusted Platform Modules (TPM) directly at the physical edge to prevent host-level memory injections.
              </p>
            </div>

            <div className="mt-6 border-t border-white/5 pt-3 text-[10px] font-mono text-gray-500 text-right">
              TPM v2.0 Secured Keys
            </div>
          </div>

        </div>
      </section>

      {/* 4. API & CODE SANDBOX (Interactive snippet selector) */}
      <section className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Developer integrations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-[10px] font-mono tracking-[0.25em] text-indigo-400 uppercase font-bold flex items-center gap-1.5">
            <Code className="w-4 h-4 text-indigo-400" />
            Developer First Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Deploy in minutes with clean API standard envelopes.
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
            Our multi-platform Software Development Kits translate complex cryptographic Zero-Knowledge witness constraints into clean readable REST commands. Perfect for modern DevOps automated pipelines.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-[10px]">1</div>
              <span className="text-xs sm:text-sm font-semibold text-gray-200">Robust auto-recovering SDKs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-[10px]">2</div>
              <span className="text-xs sm:text-sm font-semibold text-gray-200">Automated block confirmation callbacks</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-[10px]">3</div>
              <span className="text-xs sm:text-sm font-semibold text-gray-200">No cryptography expertise required</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Code Block window */}
        <div className="lg:col-span-7 liquid-glass-card rounded-2xl overflow-hidden flex flex-col">
          
          {/* Header tab selectors */}
          <div className="bg-[#05000A]/95 px-4 py-3.5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="text-xs text-gray-400 font-mono ml-3 uppercase text-[10px] tracking-wider">prooflink-sdk-bundle</span>
            </div>
            
            {/* Toggles */}
            <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10 text-[10px] font-mono">
              {(['bash', 'javascript', 'python'] as const).map((lang) => {
                const label = lang === 'bash' ? 'cURL' : lang === 'javascript' ? 'Node.js' : 'Python';
                const active = activeIntegrationTab === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => setActiveIntegrationTab(lang)}
                    className={`px-2.5 py-1 rounded cursor-pointer font-bold ${
                      active ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actual Code Output lines */}
          <div className="bg-black/60 p-4 font-mono text-[11px] sm:text-xs text-purple-300 leading-relaxed overflow-x-auto min-h-[220px]">
            <pre className="whitespace-pre">
              {INTEGRATION_SNIPPETS[activeIntegrationTab]}
            </pre>
          </div>

          {/* Footer bar indicator */}
          <div className="bg-[#05000A]/80 px-4 py-3 flex items-center justify-between border-t border-white/10 text-[10px] font-mono text-gray-500">
            <span>HTTPS Endpoint Secured</span>
            <span className="text-cyan-400 font-bold uppercase tracking-wider">production ready v2.6</span>
          </div>

        </div>

      </section>

      {/* 5. INTERACTIVE ROI CALCULATOR (Awesome auto-calculator savings metrics) */}
      <section className="relative z-10 p-[1px] bg-gradient-to-r from-purple-500/10 via-indigo-500/20 to-purple-500/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-[#05000A]/95 p-6 sm:p-8 rounded-3xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slider parameters controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] uppercase tracking-wider font-bold">
                <Calculator className="w-3.5 h-3.5" />
                Value Realization Blueprint
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Calculate Autonomic Savings
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
                  By resolving vulnerabilities in milliseconds instead of hours, ProofLink avoids human delays and protects critical services from severe outage penalties. Enter your current load variables to test our return on compliance value.
                </p>
              </div>

              {/* Dynamic Range Sliders */}
              <div className="space-y-5 pt-2 max-w-lg">
                
                {/* Variable 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-gray-300">Monthly Security Incidents:</span>
                    <span className="text-purple-400">{monthlyIncidents} incidents</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={monthlyIncidents}
                    onChange={(e) => setMonthlyIncidents(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                    <span>1 incident</span>
                    <span>50 incidents</span>
                  </div>
                </div>

                {/* Variable 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-gray-300">Avg Cost of Downtime per Hour:</span>
                    <span className="text-cyan-400">${downtimeCost.toLocaleString()} /hr</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="20000" 
                    step="500"
                    value={downtimeCost}
                    onChange={(e) => setDowntimeCost(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                    <span>$1,000 /hr</span>
                    <span>$20,000 /hr</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Display computed outputs (The big payoff!) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center space-y-6 flex flex-col justify-center items-center backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono tracking-widest text-green-400 uppercase font-bold">
                  Estimated Annual Savings
                </span>
                <div className="text-4xl sm:text-5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-300 tracking-tighter">
                  ${annualSavings.toLocaleString()}
                </div>
                <p className="text-[10px] text-gray-400 font-sans max-w-xs mt-1">
                  *Calculated at 3.5 hrs resolution time saved per incident, minus software maintenance subscription parameters.
                </p>
              </div>

              {/* Autonomic clearance status banner */}
              <div className="w-full bg-black/45 border border-white/5 rounded-xl p-3 flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded bg-green-500/10 text-green-440 flex items-center justify-center border border-green-500/20">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200">Return on Investment (ROI)</div>
                  <div className="text-[9px] text-gray-500 font-mono">Autocertified payback cycle: 4.5 days</div>
                </div>
              </div>

              {/* Call to action button */}
              <button 
                onClick={onInitiateAudit}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] cursor-pointer"
              >
                Schedule Hands-Free Audit Consultation
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 6. ECOSYSTEM TRUST FOOTER BANNER */}
      <section className="text-center space-y-6 pt-4 relative z-10">
        <div className="text-[9px] text-gray-500 tracking-[0.3em] font-bold uppercase">
          Autonomous Interoperable Gateway Integrations
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-50 grayscale hover:opacity-75 transition-opacity">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">AWS</div>
            <span className="text-sm font-mono tracking-tight text-white font-bold">AWS Lambda</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">K8S</div>
            <span className="text-sm font-mono tracking-tight text-white font-bold">Kubernetes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">GCP</div>
            <span className="text-sm font-mono tracking-tight text-white font-bold">Google Cloud</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">LNX</div>
            <span className="text-sm font-mono tracking-tight text-white font-bold">Linux Kernel</span>
          </div>
        </div>
      </section>

    </div>
  );
}

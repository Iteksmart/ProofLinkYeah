import { useState, useEffect } from 'react'
interface Props { animated?: boolean; expanded?: boolean }
const RECEIPT = {
  id: 'PLR-20260625-a3f9',
  WHAT: 'systemctl restart aios-kernel',
  WHEN: '2026-06-25T17:22:11.334Z',
  WHERE: 'itechsmart-prod / aios-kernel',
  WHY: 'OOM kill — heap limit 512MB (confidence: 0.94)',
  WHO: 'autonomous',
  VERIFIED: '10/10 ✓',
}
export default function ReceiptCard({ animated, expanded }: Props) {
  const [visible, setVisible] = useState(!animated)
  const [activeW, setActiveW] = useState<string|null>(null)
  useEffect(() => {
    if (animated) setTimeout(() => setVisible(true), 400)
  }, [animated])
  const fields = [
    { key: 'WHAT', val: RECEIPT.WHAT, color: 'text-blue-300' },
    { key: 'WHEN', val: RECEIPT.WHEN, color: 'text-purple-300' },
    { key: 'WHERE', val: RECEIPT.WHERE, color: 'text-cyan-300' },
    { key: 'WHY', val: RECEIPT.WHY, color: 'text-yellow-300' },
    { key: 'WHO', val: RECEIPT.WHO, color: 'text-green-300' },
  ]
  return (
    <div className={`relative backdrop-blur-sm bg-slate-900/80 border border-blue-500/30 rounded-2xl p-6 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} shadow-2xl shadow-blue-500/10`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-xs text-blue-400">{RECEIPT.id}</div>
        <div className="flex items-center gap-1.5 text-xs text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          SEALING
        </div>
      </div>
      <div className="space-y-3">
        {fields.map(f => (
          <div key={f.key}
            onClick={() => expanded && setActiveW(activeW === f.key ? null : f.key)}
            className={`flex gap-3 text-sm ${expanded ? 'cursor-pointer' : ''} ${activeW === f.key ? 'bg-white/5 rounded-lg p-2 -mx-2' : ''} transition-all`}>
            <span className="font-bold text-slate-500 w-12 flex-shrink-0 font-mono">{f.key}</span>
            <span className={`font-mono ${f.color} leading-relaxed`}>{f.val}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs">
        <span className="text-green-400 font-bold">{RECEIPT.VERIFIED}</span>
        <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors">Verify →</a>
      </div>
    </div>
  )
}

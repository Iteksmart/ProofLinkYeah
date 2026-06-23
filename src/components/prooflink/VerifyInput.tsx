import { useState } from 'react'
export default function VerifyInput() {
  const [id, setId] = useState('PLR-20260625-a3f9')
  return (
    <div className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
      <label className="text-sm text-slate-400 block mb-2">Enter any receipt ID</label>
      <div className="flex gap-3">
        <input value={id} onChange={e => setId(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          placeholder="PLR-..." />
        <a href={`https://verify.itechsmart.dev/receipt/${id}`} target="_blank" rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl transition-colors whitespace-nowrap">
          Verify →
        </a>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        Chain intact · 55,000+ receipts verified · 21ms warm
      </div>
    </div>
  )
}

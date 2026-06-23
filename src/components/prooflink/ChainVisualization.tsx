const receipts = [
  { id: 'PLR-...-a1b2', status: 'VERIFIED' },
  { id: 'PLR-...-c3d4', status: 'VERIFIED' },
  { id: 'PLR-...-e5f6', status: 'VERIFIED' },
]
export default function ChainVisualization() {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {receipts.map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="bg-slate-900/80 border border-green-500/30 rounded-xl px-4 py-3 text-center">
              <div className="font-mono text-xs text-green-400">{r.id}</div>
              <div className="text-xs text-green-400 mt-1">✓ {r.status}</div>
            </div>
            {i < receipts.length - 1 && (
              <div className="text-slate-600 text-lg">⛓</div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-3">
          <div className="text-slate-600 text-lg">⛓</div>
          <div className="bg-amber-900/30 border border-amber-500/40 rounded-xl px-4 py-3 text-center">
            <div className="font-mono text-xs text-amber-400">Bitcoin Block</div>
            <div className="text-xs text-amber-400 mt-1">#845,231</div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-6">
        Each receipt hashes to the next. The chain terminates in Bitcoin. Tamper one — the rest break.
      </p>
    </div>
  )
}

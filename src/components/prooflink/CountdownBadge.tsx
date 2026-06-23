interface Props { targetDate: string; label: string }
export default function CountdownBadge({ targetDate, label }: Props) {
  const days = Math.max(0, Math.ceil((new Date(targetDate).getTime() - Date.now()) / 86400000))
  return (
    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
      <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
      ⚡ {label} — {days} days
    </div>
  )
}

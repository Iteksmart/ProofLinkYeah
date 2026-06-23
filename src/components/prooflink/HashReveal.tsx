import { useState, useEffect } from 'react'
interface Props { text: string; label?: string }
export default function HashReveal({ text, label }: Props) {
  const [revealed, setRevealed] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i >= text.length) { clearInterval(id); return }
      setRevealed(text.slice(0, i + 1))
      i++
    }, 18)
    return () => clearInterval(id)
  }, [text])
  return (
    <div className="mt-2">
      {label && <div className="text-xs text-slate-500 mb-1">{label}</div>}
      <div className="font-mono text-xs text-green-400/70 break-all leading-relaxed">
        {revealed}
        <span className="text-green-400 animate-pulse">_</span>
      </div>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'
import HashReveal from '../components/prooflink/HashReveal'
import LiveCounter from '../components/prooflink/LiveCounter'
import ReceiptCard from '../components/prooflink/ReceiptCard'
import ChainVisualization from '../components/prooflink/ChainVisualization'
import VerifyInput from '../components/prooflink/VerifyInput'
import CountdownBadge from '../components/prooflink/CountdownBadge'
import ParticleBackground from '../components/prooflink/ParticleBackground'

export default function ProofLink() {
  const [heroVisible, setHeroVisible] = useState(false)
  const [sectionVisible, setSectionVisible] = useState<Record<string,boolean>>({})
  const sectionRefs = useRef<Record<string,HTMLElement|null>>({})
  const daysLeft = Math.max(0, Math.ceil((new Date("2026-08-02").getTime() - Date.now()) / 86400000))

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100)
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          setSectionVisible(prev => ({...prev, [e.target.id]: true}))
        }
      }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <ParticleBackground />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-screen flex items-center px-6 pt-20 pb-12">
        <div className={`max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Left */}
          <div>
            <CountdownBadge targetDate="2026-08-02" label="EU AI Act Article 12" />
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-400 bg-clip-text text-transparent">
                Prove What
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Your AI Did.
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-4 max-w-lg leading-relaxed">
              Every autonomous action. Cryptographically sealed. Bitcoin-anchored. Publicly verifiable in 3 seconds.
            </p>
            <p className="text-slate-400 mb-8">
              55,000+ receipts sealed. Zero chain breaks.{' '}
              <span className="text-green-400 font-semibold">Verify any one right now — no account required.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href="https://verify.itechsmart.dev" target="_blank" rel="noopener noreferrer"
                className="group relative bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 text-center overflow-hidden">
                <span className="relative z-10">Verify a Receipt →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://itechsmart.dev/pricing" target="_blank" rel="noopener noreferrer"
                className="border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white px-8 py-4 rounded-2xl transition-all duration-200 text-center">
                Start Free — 10,000 Receipts
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {['✓ EU AI Act Art. 12 Ready', '✓ Bitcoin-Anchored', '✓ 3 Analyst Validations', '✓ SDVOSB CAGE 172W2'].map(t => (
                <span key={t} className="text-slate-400">{t}</span>
              ))}
            </div>
          </div>

          {/* Right — Live Receipt Animation */}
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl blur-2xl" />
            <ReceiptCard animated />
            <div className="mt-4">
              <HashReveal text="sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" label="Chain hash" />
              <div className="mt-2 flex items-center gap-2 text-xs text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Anchored to Bitcoin block #845,231
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PROBLEM ── */}
      <section id="problem" data-animate className="py-24 px-6 bg-gradient-to-b from-transparent to-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-500 text-lg mb-3 uppercase tracking-widest">The Problem</p>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Everybody is building agents.
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-slate-400 mb-16">
            Nobody can prove what they did.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: '🔍',
                text: 'Your AI fixed it. But when the auditor asks "show me what happened" — you have a log file that could have been altered.'
              },
              {
                icon: '⚖️',
                text: 'EU AI Act Article 12 is live August 2, 2026. Mandatory cryptographic logging. €15M penalty. Your ELK stack doesn\'t qualify.'
              },
              {
                icon: '🔐',
                text: 'Datadog sees it. ServiceNow tickets it. Neither proves it.'
              }
            ].map((card, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
                <div className="text-3xl mb-4">{card.icon}</div>
                <p className="text-slate-300 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: 5W SOLUTION ── */}
      <section id="solution" data-animate className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-500 text-lg mb-3 uppercase tracking-widest text-center">The Solution</p>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">ProofLink seals the proof.</h2>
          <p className="text-xl text-slate-400 text-center mb-16">One receipt. Five questions. Mathematically undeniable.</p>
          <ReceiptCard expanded />
          <ChainVisualization />
        </div>
      </section>

      {/* ── SECTION 4: HOW IT WORKS ── */}
      <section id="how" data-animate className="py-24 px-6 bg-gradient-to-b from-transparent to-slate-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">One line of code. Proof for everything.</h2>
          <p className="text-slate-400 mb-16">Install the SDK. Seal a receipt. Verify anywhere.</p>
          <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
            {[
              {
                step: '01',
                title: 'Integrate',
                code: `pip install prooflink-sdk\n\nprooflink.seal(\n  action="restart nginx",\n  service="nginx",\n  reason="502 error spike",\n  verdict="VERIFIED"\n)`
              },
              {
                step: '02',
                title: 'Seal',
                desc: 'Receipt generates in real time — SHA-256 hash chain + Bitcoin OTS anchoring. Immutable in seconds.'
              },
              {
                step: '03',
                title: 'Verify',
                desc: 'Anyone can verify. No account. verify.itechsmart.dev loads in 21ms.',
                link: 'https://verify.itechsmart.dev'
              }
            ].map((s, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6">
                <div className="text-blue-400 font-mono text-sm mb-2">STEP {s.step}</div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                {s.code ? (
                  <pre className="bg-black/60 rounded-lg p-3 text-xs text-green-400 font-mono overflow-auto">{s.code}</pre>
                ) : (
                  <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                )}
                {s.link && (
                  <a href={s.link} target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                    Open Verifier →
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['Claude AI', 'GitHub Actions', 'ServiceNow', 'Datadog', 'Kubernetes', 'Python SDK', 'TypeScript SDK'].map(c => (
              <span key={c} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-300">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: SOCIAL PROOF / STATS ── */}
      <section id="proof" data-animate className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16">The numbers don't lie. The receipts prove it.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: 55000, suffix: '+', label: 'Receipts Sealed', color: 'text-blue-400' },
              { value: 0, suffix: '', label: 'Chain Breaks', color: 'text-green-400' },
              { value: 87, suffix: '%', label: 'Automated', color: 'text-purple-400' },
              { value: 86, suffix: '%', label: 'Faster MTTR', color: 'text-cyan-400' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 text-center">
                <div className={`text-4xl font-black ${stat.color} mb-1`}>
                  <LiveCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { quote: 'Not incremental — category-defining leap.', source: 'Independent Analyst, June 2026' },
              { quote: 'ProofLink positioned as default compliance standard for auditors.', source: 'External Analyst, May 2026' },
              { quote: 'The Stripe for AI accountability.', source: 'Strategic Assessment, 2026' }
            ].map((q, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-900/80 to-blue-900/20 border border-blue-500/20 rounded-2xl p-6">
                <div className="text-blue-400 text-3xl mb-3">"</div>
                <p className="text-slate-200 italic mb-4">{q.quote}</p>
                <p className="text-xs text-slate-500">— {q.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: EU AI ACT ── */}
      <section id="compliance" data-animate className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/20 rounded-3xl p-10 text-center mb-10">
            <div className="text-6xl font-black text-red-400 mb-2">{daysLeft}</div>
            <div className="text-xl text-red-300 mb-4">days until EU AI Act Article 12</div>
            <h2 className="text-3xl font-black mb-4">August 2, 2026.</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-6">
              Every high-risk AI system must have tamper-evident, cryptographic auto-logging.
              Traditional logs don't qualify. ELK stacks don't qualify. Datadog doesn't qualify.
            </p>
            <div className="overflow-auto">
              <table className="mx-auto text-sm border-collapse">
                <thead>
                  <tr className="text-slate-400">
                    <th className="text-left px-4 py-2">Article 12 Requirement</th>
                    <th className="px-4 py-2">ProofLink</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Art. 12.1 — Automatic logging', '✅'],
                    ['Art. 12.2 — Proportionate to purpose', '✅'],
                    ['Art. 12.3 — Enable risk monitoring', '✅'],
                    ['Art. 12.4 — Tamper-evident storage', '✅'],
                  ].map(([req, status]) => (
                    <tr key={req} className="border-t border-slate-800">
                      <td className="text-left px-4 py-2 text-slate-300">{req}</td>
                      <td className="px-4 py-2 text-center text-green-400 text-lg">{status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-slate-400 text-sm">
              <span className="text-red-400 font-bold">€15,000,000</span> or 3% global turnover penalty.
              ProofLink Compliance: <span className="text-green-400 font-bold">$999/month</span>.{' '}
              <span className="text-white">The math closes itself.</span>
            </div>
            <a href="https://itechsmart.dev/pricing" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-6 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3 rounded-xl transition-colors">
              Get EU AI Act Compliant Today →
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: COMPETITIVE ── */}
      <section id="why" data-animate className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Why Bitcoin anchoring wins.</h2>
          <p className="text-slate-400 mb-16">The difference between "trust us" and "verify yourself."</p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-slate-900/80 border border-slate-700/30 rounded-2xl p-6">
              <div className="text-red-400 font-bold mb-3 text-sm uppercase">Tributech · Galileo · Pangea</div>
              <div className="text-lg font-semibold text-slate-300 mb-4">"Trust us. Our HSM says so."</div>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>❌ Centralized PKI</li>
                <li>❌ Internal certificate authority</li>
                <li>❌ Can be altered with the right access</li>
                <li>❌ Requires trusting the vendor</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-6">
              <div className="text-green-400 font-bold mb-3 text-sm uppercase">ProofLink</div>
              <div className="text-lg font-semibold text-white mb-4">"Don't trust us. Check Bitcoin."</div>
              <ul className="space-y-2 text-slate-200 text-sm">
                <li>✅ OpenTimestamps Bitcoin anchoring</li>
                <li>✅ Block #845,231 proves existence before X date</li>
                <li>✅ Thermodynamically impossible to fake</li>
                <li>✅ Verify in seconds, no account needed</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-8 max-w-2xl mx-auto">
            Try to fake a receipt. Then explain to the judge why the Bitcoin blockchain disagrees.
          </p>
        </div>
      </section>

      {/* ── SECTION 8: PRICING ── */}
      <section id="pricing" data-animate className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Start free. Scale with confidence.</h2>
          <p className="text-slate-400 mb-12">Sam's Club model: members pay half-price + unlock flat rates.</p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'Free', price: '10K receipts', monthly: 'No credit card', cta: 'Start Free', ctaStyle: 'border border-slate-600 text-slate-300 hover:bg-slate-800', desc: 'SDK access · Public chain' },
              { name: 'Growth', price: '$499/mo', monthly: 'Basic membership req.', cta: 'Get Growth', ctaStyle: 'bg-blue-600 hover:bg-blue-500 text-white', desc: '100K receipts/month · Members only', highlight: true },
              { name: 'Compliance', price: '$999/mo', monthly: 'Pro membership req.', cta: 'Get Compliant', ctaStyle: 'bg-purple-600 hover:bg-purple-500 text-white', desc: 'Unlimited · EU AI Act package · SLA' }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 border text-center ${plan.highlight ? 'border-blue-500/40 bg-blue-900/10 ring-1 ring-blue-500/20' : 'border-slate-700/40 bg-slate-900/40'}`}>
                <div className="font-bold mb-1">{plan.name}</div>
                <div className="text-3xl font-black mb-1">{plan.price}</div>
                <div className="text-xs text-slate-500 mb-3">{plan.monthly}</div>
                <div className="text-xs text-slate-400 mb-5">{plan.desc}</div>
                <a href="https://itechsmart.dev/pricing" target="_blank" rel="noopener noreferrer"
                  className={`block rounded-xl py-2 text-sm font-medium transition-colors ${plan.ctaStyle}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm">
            Membership from $499/year. $0.01/receipt (members) vs $0.02 (non-members).{' '}
            <a href="https://itechsmart.dev/pricing" className="text-blue-400 hover:underline">View full pricing →</a>
          </p>
        </div>
      </section>

      {/* ── SECTION 9: VERIFY LIVE ── */}
      <section id="verify" data-animate className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Verify a receipt. Right now.</h2>
          <p className="text-slate-400 mb-10">Paste any receipt ID. Loads in 21ms. No account.</p>
          <VerifyInput />
        </div>
      </section>

      {/* ── SECTION 10: FINAL CTA ── */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-black mb-3">
            <LiveCounter end={55000} suffix="+" /> receipts sealed.
          </h2>
          <h3 className="text-4xl font-black text-green-400 mb-6">Zero chain breaks.</h3>
          <p className="text-xl text-slate-400 mb-10 font-semibold">Be provable.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a href="https://itechsmart.dev/pricing" target="_blank" rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-colors">
              Start Free — 10,000 Receipts
            </a>
            <a href="mailto:djuane@itechsmart.dev?subject=ProofLink Enterprise Inquiry"
              className="border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white px-8 py-4 rounded-2xl transition-colors">
              Talk to Compliance Team →
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-500">
            {['EU AI Act Ready', 'SOX', 'HIPAA', 'PCI DSS', 'SOC 2', 'SDVOSB CAGE 172W2', '#6 of 2M+ AI Startups'].map(t => (
              <span key={t} className="bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-1.5">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

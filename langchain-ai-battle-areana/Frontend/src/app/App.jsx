import { useState, useRef, useEffect } from 'react'

// ── mock data ─────────────────────────────────────────────────────────────────
const MOCK_BATTLE = (prompt) => ({
  prompt,
  modelA: {
    name: 'GPT-4',
    label: 'Model A',
    color: 'purple',
    latency: '1.2S',
    confidence: 8.8,
    code: `class Shape { draw() {} }
class Circle extends Shape { draw() { /*
  specific */ } }`,
    explanation: `Polymorphism allows objects of different classes to be treated as objects of a common superclass. It's primarily achieved through method overriding and interface implementation.`,
  },
  modelB: {
    name: 'Claude',
    label: 'Model B',
    color: 'cyan',
    latency: '0.8S',
    confidence: 9.2,
    code: `# Dynamic Dispatch Example
def execute_render(entity):
  entity.render() # Same call, different
  results`,
    explanation: `Polymorphism is the ability of a single interface to support multiple underlying forms. In dynamic languages, this often takes the form of 'Duck Typing', while static languages use subtyping.`,
  },
  judge: {
    winner: 'Model B - Claude',
    winnerColor: 'cyan',
    scoreA: 8.8,
    scoreB: 9.2,
    reasoning: `"Model B provided a more comprehensive conceptual overview, correctly distinguishing between static and dynamic polymorphism patterns. While Model A offered a solid implementation example, Model B's explanation of the 'interface' abstraction was superior for architectural context."`,
  },
})

const NAV_ITEMS = [
  { icon: '⚔️', label: 'CURRENT BATTLE', id: 'battle' },
  { icon: '🕐', label: 'BATTLE HISTORY', id: 'history' },
  { icon: '🔬', label: 'MODEL LAB', id: 'lab' },
  { icon: '📋', label: 'SYSTEM LOGS', id: 'logs' },
]

// ── main app ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTurn, setActiveTurn] = useState(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeNav, setActiveNav] = useState('battle')
  const inputRef = useRef(null)

  const handleSend = async () => {
    const prompt = input.trim()
    if (!prompt || loading) return
    setInput('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1600))
    setActiveTurn(MOCK_BATTLE(prompt))
    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div className="flex h-screen bg-[#0c0e1a] text-white overflow-hidden font-mono">

      {/* ── Sidebar ───────────────────────────────────────────── */}
      <aside className="w-52 shrink-0 flex flex-col bg-[#0a0c18] border-r border-white/[0.06]">
        {/* Brand */}
        <div className="px-5 pt-6 pb-5 border-b border-white/[0.06]">
          <p className="text-sm font-bold text-white tracking-wide">Neon Synthesis</p>
          <p className="text-[10px] text-white/30 tracking-widest mt-0.5">V.02.4-BETA</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-[11px] font-bold tracking-widest transition-all duration-150 cursor-pointer text-left
                ${activeNav === item.id
                  ? 'bg-violet-600/20 text-violet-300 border-r-2 border-violet-500'
                  : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Deploy btn */}
        <div className="px-4 pb-4">
          <button className="w-full py-2.5 text-[11px] font-bold tracking-widest text-white bg-violet-600 hover:bg-violet-500 transition-colors rounded cursor-pointer">
            DEPLOY NEW AGENT
          </button>
        </div>

        {/* Bottom links */}
        <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-2">
          <p className="text-[10px] text-white/25 tracking-widest hover:text-white/50 cursor-pointer flex items-center gap-2">
            <span>●</span> SUPPORT
          </p>
          <p className="text-[10px] text-white/25 tracking-widest hover:text-white/50 cursor-pointer flex items-center gap-2">
            <span>◈</span> API
          </p>
        </div>
      </aside>

      {/* ── Right panel ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top header */}
        <header className="shrink-0 h-14 flex items-center justify-between px-8 border-b border-white/[0.06] bg-[#0c0e1a]">
          <div className="flex items-center gap-3">
            <span className="text-violet-400 text-lg">⚡</span>
            <div>
              <p className="text-sm font-bold text-white tracking-wide">AI Battle Arena</p>
              <p className="text-[9px] text-white/30 tracking-widest">WATCH AI MODELS COMPETE IN REAL-TIME</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6 text-[11px] tracking-widest font-semibold">
              <span className="text-white border-b border-white pb-0.5 cursor-pointer">Arena</span>
              <span className="text-white/35 hover:text-white/70 cursor-pointer transition-colors">Archives</span>
              <span className="text-white/35 hover:text-white/70 cursor-pointer transition-colors">Leaderboard</span>
            </nav>
            <div className="flex items-center gap-3 text-white/40">
              <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">⚙</button>
              <button className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-xs">👤</button>
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto px-8 py-6">

          {/* No battle yet */}
          {!activeTurn && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-5">
              <div className="text-6xl opacity-20">⚔️</div>
              <p className="text-white/20 text-sm tracking-widest uppercase">No active battle</p>
              <p className="text-white/15 text-xs">Send a query below to start a battle</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {['Explain polymorphism in OOP', 'Write a binary search in Python', 'REST vs GraphQL'].map(ex => (
                  <button
                    key={ex}
                    onClick={() => setInput(ex)}
                    className="text-[11px] px-3 py-1.5 rounded border border-white/10 text-white/30 hover:text-white/60 hover:border-violet-500/40 transition-all cursor-pointer tracking-wide"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-6 px-8 py-5 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 text-violet-400 text-xs tracking-widest font-bold">
                  <span>MODEL A</span>
                  <span className="flex gap-1">
                    {[0,1,2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{animationDelay:`${i*0.15}s`}} />
                    ))}
                  </span>
                </div>
                <span className="text-white/15 font-black text-lg">VS</span>
                <div className="flex items-center gap-3 text-cyan-400 text-xs tracking-widest font-bold">
                  <span className="flex gap-1">
                    {[0,1,2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{animationDelay:`${i*0.15}s`}} />
                    ))}
                  </span>
                  <span>MODEL B</span>
                </div>
              </div>
            </div>
          )}

          {/* Battle turn */}
          {activeTurn && !loading && <BattleView battle={activeTurn} />}
        </main>

        {/* Input footer */}
        <footer className="shrink-0 border-t border-white/[0.06] bg-[#0c0e1a] px-8 py-4">
          <div className="flex items-center gap-4 bg-[#12142a] border border-white/10 rounded-lg px-5 py-3 focus-within:border-violet-500/40 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              placeholder="Ask anything — let the AIs battle it out..."
              className="flex-1 bg-transparent text-sm text-white/70 placeholder-white/20 outline-none disabled:opacity-50 tracking-wide"
            />
            <span className="text-[10px] text-white/20 tracking-widest shrink-0">Press Enter or click Send</span>
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white text-sm transition-colors shadow-lg shadow-violet-500/30 cursor-pointer shrink-0"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : '➤'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

// ── battle view ───────────────────────────────────────────────────────────────
function BattleView({ battle }) {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Operator query */}
      <div className="flex justify-end">
        <div className="bg-[#12142a] border border-white/10 rounded-lg px-6 py-4 max-w-sm">
          <p className="text-[9px] font-bold tracking-[0.2em] text-white/30 mb-2">OPERATOR QUERY</p>
          <p className="text-sm text-white font-semibold tracking-wide">{battle.prompt}</p>
        </div>
      </div>

      {/* Two model cards */}
      <div className="grid grid-cols-2 gap-4">
        <ModelCard model={battle.modelA} />
        <ModelCard model={battle.modelB} />
      </div>

      {/* Verdict */}
      <VerdictCard judge={battle.judge} />
    </div>
  )
}

// ── model card ────────────────────────────────────────────────────────────────
function ModelCard({ model }) {
  const isPurple = model.color === 'purple'
  const headerBg = isPurple
    ? 'bg-gradient-to-r from-[#2d1b69] to-[#3b1fa8]'
    : 'bg-gradient-to-r from-[#0e4a52] to-[#0d6e7a]'
  const codeBg = isPurple ? 'bg-[#1a1040] border-violet-500/20' : 'bg-[#0a2e35] border-cyan-500/20'
  const codeText = isPurple ? 'text-violet-200' : 'text-cyan-200'
  const dot = isPurple ? 'bg-violet-500' : 'bg-cyan-400'
  const scoreColor = isPurple ? 'text-violet-400' : 'text-cyan-400'

  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#0e1020] overflow-hidden animate-fade-in">
      {/* Header */}
      <div className={`${headerBg} px-5 py-3.5 flex items-center justify-between`}>
        <div className="flex items-center gap-2.5">
          <span className="text-base">{isPurple ? '🤖' : '✨'}</span>
          <span className="text-sm font-bold text-white tracking-wide">
            {model.label} — {model.name}
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-[0.15em] text-white/60 bg-black/20 px-2.5 py-1 rounded">
          LATENCY: {model.latency}
        </span>
      </div>

      {/* Code block */}
      <div className={`mx-5 mt-5 rounded border ${codeBg} p-4`}>
        <pre className={`text-[11px] font-mono leading-relaxed ${codeText} overflow-x-auto whitespace-pre-wrap`}>
          {model.code}
        </pre>
      </div>

      {/* Explanation */}
      <p className="px-5 pt-4 pb-2 text-[12px] text-white/55 leading-relaxed tracking-wide">
        {model.explanation}
      </p>

      {/* Confidence */}
      <div className="px-5 py-4 flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          <span className="text-[9px] font-bold tracking-[0.2em] text-white/30">CONFIDENCE SCORE</span>
        </div>
        <span className={`text-2xl font-black ${scoreColor}`}>{model.confidence}</span>
      </div>
    </div>
  )
}

// ── verdict card ──────────────────────────────────────────────────────────────
function VerdictCard({ judge }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#0e1020] px-7 py-6 animate-fade-in relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[80px] opacity-[0.04] select-none pointer-events-none font-black">
        ◈
      </div>

      <div className="flex items-start justify-between gap-6">
        {/* Left: verdict text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 border border-amber-500/50 bg-amber-500/10 px-3 py-1 rounded-sm">
              OFFICIAL VERDICT
            </span>
            <span className="text-lg font-bold text-white tracking-wide">
              Winner: {judge.winner}
            </span>
          </div>
          <p className="text-[12px] text-white/45 leading-relaxed italic tracking-wide">
            {judge.reasoning}
          </p>
        </div>

        {/* Right: scores */}
        <div className="shrink-0 flex items-end gap-4 pr-8">
          <div className="text-center">
            <p className="text-[9px] text-white/25 tracking-widest font-bold mb-1">MODEL B</p>
            <p className="text-4xl font-black text-cyan-400">{judge.scoreB}</p>
          </div>
          <div className="text-center opacity-40 mb-1">
            <p className="text-[9px] text-white/25 tracking-widest font-bold mb-1">MODEL A</p>
            <p className="text-2xl font-black text-white/50">{judge.scoreA}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

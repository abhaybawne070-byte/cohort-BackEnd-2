import { useState, useRef } from 'react'

// ── API ───────────────────────────────────────────────────────────────────────
const API_URL = 'http://localhost:3000/battle'

async function runBattle(problem) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problem }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? `Server error ${res.status}`)
  }
  return res.json()
  // Shape: { problem, solution_1, solution_2,
  //           judge: { solution_1_score, solution_2_score,
  //                    solution_1_reasoning, solution_2_reasoning } }
}

// ── sidebar nav ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: '⚔️', label: 'CURRENT BATTLE', id: 'battle' },
  { icon: '🕐', label: 'BATTLE HISTORY',  id: 'history' },
  { icon: '🔬', label: 'MODEL LAB',        id: 'lab' },
  { icon: '📋', label: 'SYSTEM LOGS',      id: 'logs' },
]

const EXAMPLES = [
  'Explain polymorphism in OOP',
  'Write a binary search in Python',
  'Difference between REST and GraphQL',
  'What is a closure in JavaScript?',
]

// ── main app ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTurn, setActiveTurn]   = useState(null)
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState(null)
  const [activeNav, setActiveNav]     = useState('battle')
  const inputRef                      = useRef(null)

  const handleSend = async () => {
    const problem = input.trim()
    if (!problem || loading) return
    setInput('')
    setError(null)
    setActiveTurn(null)
    setLoading(true)
    try {
      const data = await runBattle(problem)
      setActiveTurn({ ...data, prompt: problem })
    } catch (e) {
      setError(e.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div className="flex h-screen bg-[#0c0e1a] text-white overflow-hidden font-mono">

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="w-52 shrink-0 flex flex-col bg-[#0a0c18] border-r border-white/[0.06]">
        <div className="px-5 pt-6 pb-5 border-b border-white/[0.06]">
          <p className="text-sm font-bold text-white tracking-wide">Neon Synthesis</p>
          <p className="text-[10px] text-white/30 tracking-widest mt-0.5">V.02.4-BETA</p>
        </div>

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

        <div className="px-4 pb-4">
          <button className="w-full py-2.5 text-[11px] font-bold tracking-widest text-white bg-violet-600 hover:bg-violet-500 transition-colors rounded cursor-pointer">
            DEPLOY NEW AGENT
          </button>
        </div>

        <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-2">
          <p className="text-[10px] text-white/25 tracking-widest hover:text-white/50 cursor-pointer flex items-center gap-2">
            <span>●</span> SUPPORT
          </p>
          <p className="text-[10px] text-white/25 tracking-widest hover:text-white/50 cursor-pointer flex items-center gap-2">
            <span>◈</span> API
          </p>
        </div>
      </aside>

      {/* ── Right panel ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
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

        {/* Main */}
        <main className="flex-1 overflow-y-auto px-8 py-6">

          {/* Empty state */}
          {!activeTurn && !loading && !error && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-5">
              <div className="text-6xl opacity-20">⚔️</div>
              <p className="text-white/20 text-sm tracking-widest uppercase">No active battle</p>
              <p className="text-white/15 text-xs">
                Powered by <span className="text-violet-400/60">Mistral</span> vs <span className="text-cyan-400/60">Cohere</span> · judged by <span className="text-amber-400/60">Gemini</span>
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {EXAMPLES.map(ex => (
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
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-6 px-8 py-5 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-violet-400 text-xs tracking-widest font-bold">
                    <span>MISTRAL</span>
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
                    <span>COHERE</span>
                  </div>
                </div>
                <p className="text-[10px] text-amber-400/50 tracking-widest">GEMINI IS JUDGING...</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-4xl opacity-40">⚠️</div>
              <p className="text-red-400/80 text-xs tracking-widest font-bold uppercase">Battle Failed</p>
              <p className="text-white/30 text-xs max-w-sm text-center">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-[11px] px-4 py-2 rounded border border-white/10 text-white/40 hover:text-white/70 hover:border-red-500/30 transition-all cursor-pointer tracking-widest"
              >
                TRY AGAIN
              </button>
            </div>
          )}

          {/* Battle result */}
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
            <span className="text-[10px] text-white/20 tracking-widest shrink-0 hidden lg:block">
              Press Enter or click Send
            </span>
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

// ── BattleView ────────────────────────────────────────────────────────────────
// API response shape:
//   battle.prompt          — the user's question
//   battle.solution_1      — Mistral's response text
//   battle.solution_2      — Cohere's response text
//   battle.judge.solution_1_score
//   battle.judge.solution_2_score
//   battle.judge.solution_1_reasoning
//   battle.judge.solution_2_reasoning

function BattleView({ battle }) {
  const { prompt, solution_1, solution_2, judge } = battle
  const aWins = judge.solution_1_score >= judge.solution_2_score

  const modelA = {
    label: 'Model A',
    name: 'Mistral',
    color: 'purple',
    response: solution_1,
    score: judge.solution_1_score,
    reasoning: judge.solution_1_reasoning,
  }
  const modelB = {
    label: 'Model B',
    name: 'Cohere',
    color: 'cyan',
    response: solution_2,
    score: judge.solution_2_score,
    reasoning: judge.solution_2_reasoning,
  }
  const winner = aWins ? modelA : modelB

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Operator query */}
      <div className="flex justify-end">
        <div className="bg-[#12142a] border border-white/10 rounded-lg px-6 py-4 max-w-xl">
          <p className="text-[9px] font-bold tracking-[0.2em] text-white/30 mb-2">OPERATOR QUERY</p>
          <p className="text-sm text-white font-semibold tracking-wide">{prompt}</p>
        </div>
      </div>

      {/* Two model cards */}
      <div className="grid grid-cols-2 gap-4">
        <ModelCard model={modelA} />
        <ModelCard model={modelB} />
      </div>

      {/* Verdict */}
      <VerdictCard
        winner={winner}
        scoreA={judge.solution_1_score}
        scoreB={judge.solution_2_score}
        reasoning={aWins ? judge.solution_1_reasoning : judge.solution_2_reasoning}
      />
    </div>
  )
}

// ── ModelCard ─────────────────────────────────────────────────────────────────
function ModelCard({ model }) {
  const isPurple = model.color === 'purple'
  const headerBg   = isPurple ? 'bg-gradient-to-r from-[#2d1b69] to-[#3b1fa8]' : 'bg-gradient-to-r from-[#0e4a52] to-[#0d6e7a]'
  const codeBg     = isPurple ? 'bg-[#1a1040] border-violet-500/20' : 'bg-[#0a2e35] border-cyan-500/20'
  const codeColor  = isPurple ? 'text-violet-200' : 'text-cyan-200'
  const dot        = isPurple ? 'bg-violet-500' : 'bg-cyan-400'
  const scoreColor = isPurple ? 'text-violet-400' : 'text-cyan-400'
  const icon       = isPurple ? '🤖' : '✨'

  // Detect and split out code fences for display
  const parts = model.response.split(/(```[\s\S]*?```)/g)

  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#0e1020] overflow-hidden flex flex-col animate-fade-in">
      {/* Header */}
      <div className={`${headerBg} px-5 py-3.5 flex items-center justify-between shrink-0`}>
        <div className="flex items-center gap-2.5">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-bold text-white tracking-wide">{model.label} — {model.name}</span>
        </div>
      </div>

      {/* Response body */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2 space-y-3 max-h-72">
        {parts.map((part, i) => {
          if (part.startsWith('```')) {
            const code = part.replace(/^```\w*\n?/, '').replace(/\n?```$/, '').trim()
            return (
              <div key={i} className={`rounded border ${codeBg} p-3`}>
                <pre className={`text-[11px] font-mono leading-relaxed ${codeColor} overflow-x-auto whitespace-pre-wrap`}>{code}</pre>
              </div>
            )
          }
          return (
            <p key={i} className="text-[12px] text-white/55 leading-relaxed tracking-wide whitespace-pre-wrap">
              {part.trim()}
            </p>
          )
        })}
      </div>

      {/* Confidence */}
      <div className="px-5 py-4 flex items-center justify-between border-t border-white/[0.05] shrink-0">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          <span className="text-[9px] font-bold tracking-[0.2em] text-white/30">CONFIDENCE SCORE</span>
        </div>
        <span className={`text-2xl font-black ${scoreColor}`}>{model.score.toFixed(1)}</span>
      </div>
    </div>
  )
}

// ── VerdictCard ───────────────────────────────────────────────────────────────
function VerdictCard({ winner, scoreA, scoreB, reasoning }) {
  const isA = winner.color === 'purple'

  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#0e1020] px-7 py-6 animate-fade-in relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[80px] opacity-[0.04] select-none pointer-events-none font-black">◈</div>

      <div className="flex items-start justify-between gap-6">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <span className="text-[10px] font-black tracking-[0.2em] text-amber-400 border border-amber-500/50 bg-amber-500/10 px-3 py-1 rounded-sm whitespace-nowrap">
              OFFICIAL VERDICT
            </span>
            <span className="text-lg font-bold text-white tracking-wide">
              Winner: {winner.label} — {winner.name}
            </span>
          </div>
          <p className="text-[12px] text-white/45 leading-relaxed italic tracking-wide">
            "{reasoning}"
          </p>
        </div>

        {/* Scores */}
        <div className="shrink-0 flex items-end gap-4 pr-4">
          {isA ? (
            <>
              <div className="text-center">
                <p className="text-[9px] text-white/25 tracking-widest font-bold mb-1">MODEL A</p>
                <p className="text-4xl font-black text-violet-400">{scoreA.toFixed(1)}</p>
              </div>
              <div className="text-center opacity-40 mb-1">
                <p className="text-[9px] text-white/25 tracking-widest font-bold mb-1">MODEL B</p>
                <p className="text-2xl font-black text-white/50">{scoreB.toFixed(1)}</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-[9px] text-white/25 tracking-widest font-bold mb-1">MODEL B</p>
                <p className="text-4xl font-black text-cyan-400">{scoreB.toFixed(1)}</p>
              </div>
              <div className="text-center opacity-40 mb-1">
                <p className="text-[9px] text-white/25 tracking-widest font-bold mb-1">MODEL A</p>
                <p className="text-2xl font-black text-white/50">{scoreA.toFixed(1)}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

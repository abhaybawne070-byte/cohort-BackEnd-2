import express from 'express'
import rungraph from "../AI/graph.ai.js"

const app = express()

// ── middleware ────────────────────────────────────────────────────────────────
app.use(express.json())

// Allow requests from the Vite dev server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") { res.sendStatus(204); return }
  next()
})

// ── routes ────────────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

// POST /battle  { "problem": "..." }
// Returns: { problem, solution_1, solution_2, judge: { ... } }
app.post("/battle", async (req, res) => {
  const body = req.body as Record<string, unknown>
  const problem = typeof body?.problem === 'string' ? body.problem : undefined

  if (!problem || typeof problem !== "string" || !problem.trim()) {
    res.status(400).json({ error: "Missing or invalid 'problem' field" })
    return
  }

  try {
    const result = await rungraph(problem.trim())
    res.json(result)
  } catch (err: any) {
    console.error("[/battle] Error:", err)
    res.status(500).json({ error: err?.message ?? "Internal server error" })
  }
})

export default app
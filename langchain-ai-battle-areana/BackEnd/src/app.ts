import express from 'express'
import cors from 'cors'
import rungraph from "../AI/graph.ai.js"

const app = express()

app.use(cors())
app.use(express.json())

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body
    if (!message) {
      return res.status(400).json({ error: "message is required" })
    }
    const result = await rungraph(message)
    res.json(result)
  } catch (error) {
    console.error("Error running graph:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default app
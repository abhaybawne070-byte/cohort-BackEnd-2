import express from 'express'
import cors from 'cors'
import rungraph from "../AI/graph.ai.js"

const app = express()

app.use(cors())
app.use(express.json())



export default app
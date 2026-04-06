import express from 'express'
import rungraph from "../AI/graph.ai.js"

const app = express()

app.get("/",async (req,res) =>{
    
    const result = await rungraph("Write an code for factorial function in js") 

    res.json(result)
})

export default app
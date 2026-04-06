import {ChatGoogle} from "@langchain/google"
import { ChatCohere } from "@langchain/cohere"
import { ChatMistralAI } from "@langchain/mistralai"
import config from "../src/config/config.js"



export const geminiModel  = new ChatGoogle({
    model:"gemini-flash-latest",
    apiKey:config.GOOGLE_API_KEY,
})

export const mistralAIModel = new ChatMistralAI({
    model:"mistal-meduim-lates",
    apiKey:config.Mistral_API_KEY,
})

export const cohereModel = new ChatCohere({
    model:"cohere-command-a-2025",
    apiKey:config.COHERE_API_KEY
})
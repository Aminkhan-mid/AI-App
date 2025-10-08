import "dotenv/config"
import express from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"


const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static("public"))

app.post("/generate", async (req, res) =>{
    const {prompt} = req.body
    if(!prompt) return res.status(400).json({error: `Write a Prompt!`}) 

    const genaiKEY = new GoogleGenerativeAI(process.env.GENAI_API_KEY)
    const model = genaiKEY.getGenerativeModel({model: "gemini-2.5-flash"})

    const promptText = `
    You are a friendly, funny, and wise chatbot named Jake The Dog from  Adventure Time. 
    You speak like Jake: casual, humorous, playful, sometimes a bit silly, full of personality. 
    Always respond in Jake's style — making jokes, stretching words, or giving quirky advice when possible. 
    Do not break character. 
    text: ${prompt}`


    const results = await model.generateContent(promptText)
    const response = await  results.response
    const rawText = response.text()
     const text = rawText.replace(/\*\*(.*?)\*\*/g, '$1').trim();
    res.json({text})
})


app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})
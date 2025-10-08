import {jakeWords} from "./words.js"
const promptText = document.getElementById("prompt-box")
const generateBtn = document.getElementById("generate")
const greeting = document.getElementById("greeting")
const aiResponse = document.getElementById("ai-response")


setInterval(()=>{
    let random = jakeWords[Math.floor(Math.random() * jakeWords.length)]
    greeting.innerHTML  = random
},2000)


generateBtn.addEventListener("click", async function(){
    const prompt = promptText.value
    const response = await fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({prompt})
    })
    const data = await response.json()
    aiResponse.style.display = "block"
    aiResponse.textContent = data.text
})


// cd Documents/CODE\ PLAYGROUND/AI-APP



promptText.addEventListener("input", ()=>{
    promptText.style.height = "auto"
    promptText.style.height = promptText.scrollHeight + "px"
})


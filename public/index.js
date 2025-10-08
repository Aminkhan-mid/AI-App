import {jakeWords} from "./words.js"
const promptText = document.getElementById("prompt-box")
const generateBtn = document.getElementById("generate")
const greeting = document.getElementById("greeting")
const responseContainer = document.getElementById("ai-response")
let messages = []


setInterval(()=>{
    let random = jakeWords[Math.floor(Math.random() * jakeWords.length)]
    greeting.innerHTML  = random
},2000)


function renderMessages(){
    responseContainer.innerHTML = messages.map(m => {
        return `
        <div id="bubble" class="${m.role === 'AI' ? 'ai-bubble' : 'user-bubble'}">
            ${m.text}
        </div>`
    }).join("")
    
}

generateBtn.addEventListener("click", async function(){
    const prompt = promptText.value
    messages.push({role: "user", text: prompt})


    const loader = document.getElementById("loader")
    loader.style.display = "block"

    const response = await fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({messages})
    })
    const data = await response.json()

    responseContainer.style.display = "block"
    loader.style.display = "none"
  
    messages.push({role: "AI", text: data.text})
    renderMessages()
    
    console.log(messages)
})






promptText.addEventListener("input", ()=>{
    promptText.style.height = "auto"
    promptText.style.height = promptText.scrollHeight + "px"
})


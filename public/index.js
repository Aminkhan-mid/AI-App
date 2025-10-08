import {jakeWords} from "./words.js"
const promptText = document.getElementById("prompt-box")
const generateBtn = document.getElementById("generate")
const greeting = document.getElementById("greeting")
const aiResponse = document.getElementById("ai-response")


function getRandomWords(){
    let random = Math.floor(Math.random() * 50) + 1
    
    for(let i = 0; i < jakeWords.length; i++){
        return jakeWords[random]
    }
}
greeting.innerHTML  = getRandomWords()
console.log(greeting)




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


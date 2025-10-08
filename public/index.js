const promptText = document.getElementById("prompt-box")
const generateBtn = document.getElementById("generate")
const aiResponse = document.getElementById("ai-response")

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
    aiResponse.textContent = data.text
})


// cd Documents/CODE\ PLAYGROUND/AI-APP
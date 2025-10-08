const promptText = document.getElementById("prompt-box")
const generateBtn = document.getElementById("generate")
const aiResponse = document.getElementById("ai-response")

generateBtn.addEventListener("click", async function(){
    const prompt = promptText.value
    const request = await fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: prompt
    })
    const data = await request.json()
    aiResponse.textContent = data.text
})
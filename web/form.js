// https://www.youtube.com/shorts/TFGAMLL68CA

import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value
  // console.log("URL do video: " + videoURL)

  if(!videoURL.includes("shorts")){
    console.log("É um shorts")
    return content.textContent = "Não parece ser um shorts"
  }
  // else {
  //   return content.textContent = "É um shorts"
  // }

  const [_, params] = videoURL.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Realizando o resumo"

  const summary = await server.post("/summary", {
    text: transcription.data.result 
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
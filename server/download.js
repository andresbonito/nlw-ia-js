// TFGAMLL68CA
// LebENTHnSa0

import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => new Promise((resolve, reject) => {
  // const videoURL = "https://www.youtube.com/watch?v=" + videoId
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do video: " + videoId)

  ytdl(videoURL, {quality: "lowestaudio", filter: "audioonly"})
  .on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    // console.log(seconds)

    if(seconds > 60){
      throw new Error("A duração desse vídeo é maior que 60 segundos.")
    }
  }).on("end", () => {
    console.log("Download finalizado")
    resolve()
  })
  .on("error", (error) => {
    console.log("Não foi possivel fazer download do video", error)
    reject(error)
  }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
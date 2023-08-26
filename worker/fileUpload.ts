type FileInput = {
  data: File[]
  shareId: string
}

addEventListener("message", (event: MessageEvent<FileInput>) => {
  postMessage("5")
})

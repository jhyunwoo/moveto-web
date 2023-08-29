type UploadType = {
  files: File[]
  shareId: string
}

const ONEMB = 1024 * 1024
const ONEGB = ONEMB * 1024

addEventListener("message", async (event: MessageEvent<UploadType>) => {
  const files = event.data.files
  const shareId = event.data.shareId
  const singleUploads: File[] = []
  const smallUploads: File[] = []
  const middleUploads: File[] = []
  const largeUploads: File[] = []

  for (let i = 0; i < files.length; i += 1) {
    const fileSize = files[i].size
    if (fileSize < 10 * ONEMB) {
      singleUploads.push(files[i])
    } else if (fileSize < 50 * ONEMB) {
      smallUploads.push(files[i])
    } else if (fileSize < 400 * ONEGB) {
      middleUploads.push(files[i])
    } else if (fileSize < 1024 * ONEGB) {
      largeUploads.push(files[i])
    }
  }

  const smallChunks = []
  for (let i = 0; i < smallUploads.length; i += 1) {
    let chunks = []
    let start = 0
    let end = 10 * ONEMB
    while (start < smallUploads[i].size) {
      chunks.push(smallUploads[i].slice(start, end))
      start = end
      end = start + 10 * ONEMB
    }
    smallChunks.push(chunks)
  }

  const middleChunks = []
  for (let i = 0; i < middleUploads.length; i += 1) {
    let chunks = []
    let start = 0
    let end = 50 * ONEMB
    while (start < middleUploads[i].size) {
      chunks.push(middleUploads[i].slice(start, end))
      start = end
      end = start + 10 * ONEMB
    }
    middleChunks.push(chunks)
  }
})

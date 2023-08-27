import axios from "axios"

type FileInput = {
  files: File[]
  shareId: string
}

const onemb = 1024 * 1024

self.addEventListener("message", async (event: MessageEvent<FileInput>) => {
  const files = event.data.files
  const shareId = event.data.shareId
  let uploadPromises: Promise<any>[] = []
  let progressCount = 0

  for (let i = 0; i < files.length; i += 1) {
    if (files[i].size < 110 * onemb) {
      let currentCount = progressCount
      const requestSingleUploadUrl = await fetch("/api/share/file/upload", {
        method: "POST",
        body: JSON.stringify({
          fileInfo: { name: files[i].name, type: files[i].type },
          shareInfo: shareId,
        }),
      })
      const uploadUrl = await requestSingleUploadUrl.json()

      uploadPromises.push(
        axios.put(uploadUrl, files[i], {
          onUploadProgress(progressEvent) {
            postMessage({ id: currentCount, uploaded: progressEvent.loaded })
          },
        })
      )
      progressCount = progressCount + 1
    } else {
      let chunks = []
      let start = 0
      let end = 110 * onemb
      while (start < files[i].size) {
        chunks.push(files[i].slice(start, end))
        start = end
        end = start + 110 * onemb
      }
      const createMultipart = await fetch("/api/share/file/multipart/start", {
        method: "POST",
        body: JSON.stringify({
          fileKey: shareId + "/" + files[i].name,
        }),
      })
      const multipartInfo = await createMultipart.json()

      const uploadId = multipartInfo.UploadId
      let multipartPromises: Promise<any>[] = []

      for (let j = 0; j < chunks.length; j += 1) {
        let currentCount = progressCount
        const uploadUrl = await fetch("/api/share/file/multipart/upload", {
          method: "POST",
          body: JSON.stringify({
            fileKey: shareId + "/" + files[i].name,
            uploadId: uploadId,
            index: j + 1,
          }),
        })
        const urlInfo = await uploadUrl.json()

        multipartPromises.push(
          axios.put(urlInfo, chunks[j], {
            onUploadProgress(progressEvent) {
              postMessage({ id: currentCount, uploaded: progressEvent.loaded })
            },
          })
        )

        progressCount = progressCount + 1
      }
      const multipartRes = await Promise.all(multipartPromises)

      const etags = []
      for (let j = 0; j < multipartRes.length; j += 1) {
        etags.push(
          multipartRes[j].headers.etag.substring(
            1,
            multipartRes[j].headers.etag.length - 1
          )
        )
      }

      await fetch("/api/share/file/multipart/complete", {
        method: "POST",
        body: JSON.stringify({
          fileKey: shareId + "/" + files[i].name,
          uploadId: uploadId,
          uploadResults: etags,
        }),
      })
    }
  }

  try {
    const res = await Promise.all(uploadPromises)
  } catch {
    self.postMessage({ message: "upload error", shareId: event.data.shareId })
  }
  self.postMessage({ message: "upload complete", shareId: event.data.shareId })
})

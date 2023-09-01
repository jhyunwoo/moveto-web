import axios from "axios"

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
    } else if (fileSize < 90 * ONEGB) {
      smallUploads.push(files[i])
    } else if (fileSize < 400 * ONEGB) {
      middleUploads.push(files[i])
    } else if (fileSize < 1024 * ONEGB) {
      largeUploads.push(files[i])
    }
  }

  const smallChunks: Blob[][] = []
  for (let i = 0; i < smallUploads.length; i += 1) {
    let chunks: Blob[] = []
    let start = 0
    let end = 10 * ONEMB
    while (start < smallUploads[i].size) {
      chunks.push(smallUploads[i].slice(start, end))
      start = end
      end = start + 10 * ONEMB
    }
    smallChunks.push(chunks)
  }

  const middleChunks: Blob[][] = []
  for (let i = 0; i < middleUploads.length; i += 1) {
    let chunks: Blob[] = []
    let start = 0
    let end = 50 * ONEMB
    while (start < middleUploads[i].size) {
      chunks.push(middleUploads[i].slice(start, end))
      start = end
      end = start + 10 * ONEMB
    }
    middleChunks.push(chunks)
  }
  const largeChunks: Blob[][] = []
  for (let i = 0; i < largeUploads.length; i += 1) {
    let chunks: Blob[] = []
    let start = 0
    let end = 110 * ONEMB
    while (start < largeUploads[i].size) {
      chunks.push(largeUploads[i].slice(start, end))
      start = end
      end = start + 10 * ONEMB
    }
    largeChunks.push(chunks)
  }

  let wholeFileLength = singleUploads.length
  for (let i = 0; i < smallChunks.length; i += 1) {
    wholeFileLength += smallChunks[i].length
  }
  for (let i = 0; i < middleChunks.length; i += 1) {
    wholeFileLength += middleChunks[i].length
  }
  for (let i = 0; i < largeChunks.length; i += 1) {
    wholeFileLength += largeChunks[i].length
  }

  postMessage({
    length: wholeFileLength,
  })

  let count = 0
  for (let i = 0; i < Math.ceil(singleUploads.length / 10); i += 1) {
    let uploadPromises = []
    let errorList: { id: number; uploadUrl: string }[] = []

    for (let j = 0; j < 10; j += 1) {
      if (!singleUploads[10 * i + j]) break
      const requestSingleUploadUrl = await fetch("/api/share/file/upload", {
        method: "POST",
        body: JSON.stringify({
          fileInfo: {
            name: singleUploads[i].name,
            type: singleUploads[i].type,
          },
          shareInfo: shareId,
        }),
      })
      const uploadUrl = await requestSingleUploadUrl.json()
      const currentCount = count
      uploadPromises.push(
        axios
          .put(uploadUrl, singleUploads[10 * i + j], {
            onUploadProgress(progressEvent) {
              postMessage({ id: currentCount, uploaded: progressEvent.loaded })
            },
          })
          .catch(() => {
            errorList.push({ id: currentCount, uploadUrl: uploadUrl })
          })
      )
      count = count + 1
    }
    const res = await Promise.all(uploadPromises)

    while (errorList.length > 0) {
      uploadPromises[errorList[0].id] = axios
        .put(errorList[0].uploadUrl, singleUploads[errorList[0].id], {
          onUploadProgress(progressEvent) {
            postMessage({
              id: errorList[0].id,
              uploaded: progressEvent.loaded,
            })
          },
        })
        .catch((e) => console.error(e))

      try {
        const res = await Promise.all(uploadPromises)
        errorList.shift()
      } catch (e) {
        console.error(e)
      }
    }
  }

  // small chunks 업로드 시작
  for (let i = 0; i < smallChunks.length; i += 1) {
    /** multipart upload 시작 */
    const createMultipart = await fetch("/api/share/file/multipart/start", {
      method: "POST",
      body: JSON.stringify({
        fileKey: shareId + "/" + smallUploads[i].name,
      }),
    })
    const multipartInfo = await createMultipart.json()
    /** 업로드 ID */
    const uploadId: string = multipartInfo.UploadId

    let multipartPromises: any[] = []
    let multipartErrors: { id: number; uploadUrl: string }[] = []
    let etags: string[] = new Array(smallChunks[i].length).fill(0)

    for (let j = 0; j < Math.ceil(smallChunks[i].length / 10); j += 1) {
      for (let k = 0; k < 10; k += 1) {
        if (!smallChunks[i][10 * j + k]) break

        const currentCount = count
        const uploadUrl = await fetch("/api/share/file/multipart/upload", {
          method: "POST",
          body: JSON.stringify({
            fileKey: shareId + "/" + smallUploads[i].name,
            uploadId: uploadId,
            index: 10 * j + k + 1,
          }),
        })
        const urlInfo = await uploadUrl.json()

        multipartPromises.push(
          axios
            .put(urlInfo, smallChunks[i][10 * j + k], {
              onUploadProgress(progressEvent) {
                postMessage({
                  id: currentCount,
                  uploaded: progressEvent.loaded,
                })
              },
            })
            .then((e) => {
              etags[10 * j + k] = e?.headers?.etag?.substring(
                1,
                e?.headers?.etag?.length - 1
              )
            })
            .catch((e) => {
              multipartErrors.push({ uploadUrl: urlInfo, id: currentCount })
            })
        )
        count = count + 1
      }

      let res = await Promise.all(multipartPromises)

      while (multipartErrors.length > 0) {
        multipartPromises[multipartErrors[0].id] = axios
          .put(
            multipartErrors[0].uploadUrl,
            smallChunks[i][multipartErrors[0].id],
            {
              onUploadProgress(progressEvent) {
                postMessage({
                  id: singleUploads.length + multipartErrors[0].id,
                  uploaded: progressEvent.loaded,
                })
              },
            }
          )
          .then((e) => {
            etags[multipartErrors[0].id] = e?.headers?.etag?.substring(
              1,
              e?.headers?.etag?.length - 1
            )
          })
          .catch((e) => {
            console.error(e)
          })
        try {
          res = await Promise.all(multipartPromises)
          multipartErrors.shift()
        } catch (e) {
          console.error(e)
        }
      }
    }
    const complete = await fetch("/api/share/file/multipart/complete", {
      method: "POST",
      body: JSON.stringify({
        fileKey: shareId + "/" + smallUploads[i].name,
        uploadId: uploadId,
        uploadResults: etags,
      }),
    })
    const completeResult = await complete.json()
    if (completeResult.message === "Complete error") {
      postMessage({ message: "error", log: completeResult.log })
    }
  }

  // middle chunks 업로드 시작
  for (let i = 0; i < middleChunks.length; i += 1) {
    /** multipart upload 시작 */
    const createMultipart = await fetch("/api/share/file/multipart/start", {
      method: "POST",
      body: JSON.stringify({
        fileKey: shareId + "/" + middleUploads[i].name,
      }),
    })
    const multipartInfo = await createMultipart.json()
    /** 업로드 ID */
    const uploadId: string = multipartInfo.UploadId

    let multipartPromises: any[] = []
    let multipartErrors: { id: number; uploadUrl: string }[] = []
    let etags: string[] = new Array(middleChunks[i].length).fill(0)

    for (let j = 0; j < Math.ceil(middleChunks[i].length / 10); j += 1) {
      for (let k = 0; k < 10; k += 1) {
        if (!middleChunks[i][10 * j + k]) break

        const currentCount = count
        const uploadUrl = await fetch("/api/share/file/multipart/upload", {
          method: "POST",
          body: JSON.stringify({
            fileKey: shareId + "/" + middleUploads[i].name,
            uploadId: uploadId,
            index: 10 * j + k + 1,
          }),
        })
        const urlInfo = await uploadUrl.json()

        multipartPromises.push(
          axios
            .put(urlInfo, middleChunks[i][10 * j + k], {
              onUploadProgress(progressEvent) {
                postMessage({
                  id: currentCount,
                  uploaded: progressEvent.loaded,
                })
              },
            })
            .then((e) => {
              etags[10 * j + k] = e?.headers?.etag?.substring(
                1,
                e?.headers?.etag?.length - 1
              )
            })
            .catch((e) => {
              multipartErrors.push({ uploadUrl: urlInfo, id: currentCount })
            })
        )
        count = count + 1
      }

      let res = await Promise.all(multipartPromises)

      while (multipartErrors.length > 0) {
        multipartPromises[multipartErrors[0].id] = axios
          .put(
            multipartErrors[0].uploadUrl,
            middleChunks[i][multipartErrors[0].id],
            {
              onUploadProgress(progressEvent) {
                postMessage({
                  id: singleUploads.length + multipartErrors[0].id,
                  uploaded: progressEvent.loaded,
                })
              },
            }
          )
          .then((e) => {
            etags[multipartErrors[0].id] = e?.headers?.etag?.substring(
              1,
              e?.headers?.etag?.length - 1
            )
          })
          .catch((e) => {
            console.error(e)
          })
        try {
          res = await Promise.all(multipartPromises)
          multipartErrors.shift()
        } catch (e) {
          console.error(e)
        }
      }
    }
    const complete = await fetch("/api/share/file/multipart/complete", {
      method: "POST",
      body: JSON.stringify({
        fileKey: shareId + "/" + middleUploads[i].name,
        uploadId: uploadId,
        uploadResults: etags,
      }),
    })
    const completeResult = await complete.json()

    if (completeResult.message === "Complete error") {
      postMessage({ message: "error", log: completeResult.log })
    }
  }

  // small chunks 업로드 시작
  for (let i = 0; i < largeChunks.length; i += 1) {
    /** multipart upload 시작 */
    const createMultipart = await fetch("/api/share/file/multipart/start", {
      method: "POST",
      body: JSON.stringify({
        fileKey: shareId + "/" + largeUploads[i].name,
      }),
    })
    const multipartInfo = await createMultipart.json()
    /** 업로드 ID */
    const uploadId: string = multipartInfo.UploadId

    let multipartPromises: any[] = []
    let multipartErrors: { id: number; uploadUrl: string }[] = []
    let etags: string[] = new Array(largeChunks[i].length).fill(0)

    for (let j = 0; j < Math.ceil(largeChunks[i].length / 10); j += 1) {
      for (let k = 0; k < 10; k += 1) {
        if (!largeChunks[i][10 * j + k]) break

        const currentCount = count
        const uploadUrl = await fetch("/api/share/file/multipart/upload", {
          method: "POST",
          body: JSON.stringify({
            fileKey: shareId + "/" + largeUploads[i].name,
            uploadId: uploadId,
            index: 10 * j + k + 1,
          }),
        })
        const urlInfo = await uploadUrl.json()

        multipartPromises.push(
          axios
            .put(urlInfo, largeChunks[i][10 * j + k], {
              onUploadProgress(progressEvent) {
                postMessage({
                  id: currentCount,
                  uploaded: progressEvent.loaded,
                })
              },
            })
            .then((e) => {
              etags[10 * j + k] = e?.headers?.etag?.substring(
                1,
                e?.headers?.etag?.length - 1
              )
            })
            .catch((e) => {
              multipartErrors.push({ uploadUrl: urlInfo, id: currentCount })
            })
        )
        count = count + 1
      }

      let res = await Promise.all(multipartPromises)

      while (multipartErrors.length > 0) {
        multipartPromises[multipartErrors[0].id] = axios
          .put(
            multipartErrors[0].uploadUrl,
            largeChunks[i][multipartErrors[0].id],
            {
              onUploadProgress(progressEvent) {
                postMessage({
                  id: singleUploads.length + multipartErrors[0].id,
                  uploaded: progressEvent.loaded,
                })
              },
            }
          )
          .then((e) => {
            etags[multipartErrors[0].id] = e?.headers?.etag?.substring(
              1,
              e?.headers?.etag?.length - 1
            )
          })
          .catch((e) => {
            console.error(e)
          })
        try {
          res = await Promise.all(multipartPromises)
          multipartErrors.shift()
        } catch (e) {
          console.error(e)
        }
      }
    }
    const complete = await fetch("/api/share/file/multipart/complete", {
      method: "POST",
      body: JSON.stringify({
        fileKey: shareId + "/" + largeUploads[i].name,
        uploadId: uploadId,
        uploadResults: etags,
      }),
    })
    const completeResult = await complete.json()

    if (completeResult.message === "Complete error") {
      postMessage({ message: "error", log: completeResult.log })
    }
  }

  postMessage({ message: "upload complete", shareId: shareId })
})

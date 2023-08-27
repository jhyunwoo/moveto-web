import axios from "axios"

type FileInput = {
  files: File[]
  shareId: string
}

const onemb = 1024 * 1024

self.addEventListener("message", async (event: MessageEvent<FileInput>) => {
  /** 요청에서 받아온 파일 데이터 */
  const files = event.data.files
  /** 생성한 share id */
  const shareId = event.data.shareId
  /** 병렬 다운로드를 위한 Promise 배열 */
  let uploadPromises: Promise<any>[] = []
  /** Progress Value 계산을 위한 Progress 위치 특정용 변수 */
  let progressCount = 0
  let errorList: {
    id: number
    uploadUrl: string
    count: number
  }[] = []

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
        axios
          .put(uploadUrl, files[i], {
            onUploadProgress(progressEvent) {
              postMessage({ id: currentCount, uploaded: progressEvent.loaded })
            },
          })
          .catch((e) => {
            console.log(e)
            errorList.push({
              id: i,
              uploadUrl: uploadUrl,
              count: currentCount,
            })
          })
      )
      progressCount = progressCount + 1
    } else {
      let chunks = []
      let start = 0
      let end = 110 * onemb
      let multipartError: { id: number; address: number; count: number }[] = []

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
      let multipartPromises: any[] = []

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
          axios
            .put(urlInfo, chunks[j], {
              onUploadProgress(progressEvent) {
                postMessage({
                  id: currentCount,
                  uploaded: progressEvent.loaded,
                })
              },
            })
            .catch((e) => {
              multipartError.push({ id: i, address: j, count: currentCount })
            })
        )

        progressCount = progressCount + 1
      }

      let multipartRes = await Promise.all(multipartPromises)

      while (multipartError.length > 0) {
        const jIndex = multipartError[0].address
        const uploadUrl = await fetch("/api/share/file/multipart/upload", {
          method: "POST",
          body: JSON.stringify({
            fileKey: shareId + "/" + files[multipartError[0].id].name,
            uploadId: uploadId,
            index: multipartError[0].address + 1,
          }),
        })
        const urlInfo = await uploadUrl.json()
        multipartPromises[jIndex] = axios
          .put(urlInfo, chunks[multipartError[0].address], {
            onUploadProgress(progressEvent) {
              postMessage({
                id: multipartError[0].count,
                uploaded: progressEvent.loaded,
              })
            },
          })
          .catch((e) => {
            multipartError.push({
              id: multipartError[0].id,
              address: jIndex,
              count: multipartError[0].count,
            })
          })

        multipartRes = await Promise.all(multipartPromises)
        multipartError.shift()
      }
      const etags = []
      for (let j = 0; j < multipartRes.length; j += 1) {
        etags.push(
          multipartRes[j]?.headers?.etag?.substring(
            1,
            multipartRes[j]?.headers?.etag?.length - 1
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

  const res = await Promise.all(uploadPromises)

  while (errorList.length > 0) {
    console.log(errorList)
    const requestSingleUploadUrl = await fetch("/api/share/file/upload", {
      method: "POST",
      body: JSON.stringify({
        fileInfo: {
          name: files[errorList[0].id].name,
          type: files[errorList[0].id].type,
        },
        shareInfo: shareId,
      }),
    })
    const uploadUrl = await requestSingleUploadUrl.json()

    await axios
      .put(uploadUrl, files[errorList[0].id], {
        onUploadProgress(progressEvent) {
          postMessage({
            id: errorList[0].count,
            uploaded: progressEvent.loaded,
          })
        },
      })
      .then(() => {
        errorList.shift()
      })
      .catch((e) => console.log("error", e))
  }
  self.postMessage({ message: "upload complete", shareId: event.data.shareId })
})

import getTotalFileSize from "@/lib/getTotalFileSize"
import axios, { AxiosResponse } from "axios"

/** 파일 업로드 요청 받는 데이터 타입 */
type UploadType = {
  files: File[]
  shareId: string
}

/** Pre-Signed URL 요청할 때 필요한 데이터 타입 */
type SignedUrlReqInfo = {
  fileKey: string
  uploadId: string
  index: number
}

/** 1 MiB */
const ONEMB = 1024 * 1024
/** 1 GiB */
const ONEGB = 1024 * ONEMB

/** Pre-Signed URL 요청 후 문자로 된 배열을 반환하는 함수 */
async function getSignedUrls(reqInfo: SignedUrlReqInfo[]): Promise<string[]> {
  try {
    const requestSignedUrls = await fetch("/api/share/file/multipart/upload", {
      method: "POST",
      body: JSON.stringify({ chunkInfos: reqInfo }),
    })
    const signedUrls: string[] = await requestSignedUrls.json()
    return signedUrls
  } catch (error) {
    throw error
  }
}
function sumArray(arr: number[]) {
  return arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
}

function getProgressValue(total: number, progress: number[]) {
  const loaded = sumArray(progress)
  const progressValue = Number(((loaded / total) * 100).toFixed(2))
  if (progressValue !== 100) {
    postMessage({ progress: progressValue })
  }
}

// 시작
addEventListener("message", async (event: MessageEvent<UploadType>) => {
  const files = event.data.files
  const shareId = event.data.shareId

  // 파일 분할을 위한 배열
  const singleUploads: File[] = []
  const smallUploads: File[] = []
  const middleUploads: File[] = []
  const largeUploads: File[] = []

  // 크기에 따라 파일 분할
  for (let i = 0; i < files.length; i += 1) {
    let fileSize = files[i].size
    if (fileSize < 50 * ONEMB) {
      singleUploads.push(files[i])
    } else if (fileSize < 90 * ONEGB) {
      smallUploads.push(files[i])
    } else if (fileSize < 480 * ONEGB) {
      middleUploads.push(files[i])
    } else if (fileSize < 1024 * ONEGB) {
      largeUploads.push(files[i])
    }
  }

  // mulitpart upload를 하기 위해 chunk로 분할
  const smallChunks: Blob[][] = []
  const middleChunks: Blob[][] = []
  const largeChunks: Blob[][] = []

  for (let i = 0; i < smallUploads.length; i += 1) {
    let chunks: Blob[] = []
    const chunkSize = 10 * ONEMB
    let start = 0
    let end = chunkSize
    while (start < smallUploads[i].size) {
      chunks.push(smallUploads[i].slice(start, end))
      start = end
      end = start + chunkSize
    }
    smallChunks.push(chunks)
  }
  for (let i = 0; i < middleUploads.length; i += 1) {
    let chunks: Blob[] = []
    const chunkSize = 50 * ONEMB
    let start = 0
    let end = chunkSize
    while (start < middleUploads[i].size) {
      chunks.push(middleUploads[i].slice(start, end))
      start = end
      end = start + chunkSize
    }
    middleChunks.push(chunks)
  }
  for (let i = 0; i < largeUploads.length; i += 1) {
    let chunks: Blob[] = []
    const chunkSize = 110 * ONEMB
    let start = 0
    let end = chunkSize
    while (start < largeUploads[i].size) {
      chunks.push(largeUploads[i].slice(start, end))
      start = end
      end = start + chunkSize
    }
    largeChunks.push(chunks)
  }

  // 전체 파일 업로드 수
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

  const totlaFileSize = getTotalFileSize(files)
  let progress = new Array(wholeFileLength).fill(0)
  setInterval(() => getProgressValue(totlaFileSize, progress), 100)

  /** Porgress 업데이트 ID */
  let count = 0

  // 단일 업로드 파일 업로드
  while (singleUploads?.length > 0) {
    /** Pre-Signed URL 요청을 위해 필요한 데이터 저장 */
    const singleFileInfo: { name: string; type: string }[] = []
    /** 에러 정보 저장 */
    const errorList: { id: number; count: number }[] = []

    // 첫 100개의 singleUpload 파엘에 대한 이름과 타입 데이터 singleFileInfo에 저장
    for (let i = 0; i < 100; i += 1) {
      if (!singleUploads[i]) break
      singleFileInfo.push({
        name: singleUploads[i].name,
        type: singleUploads[i].type,
      })
    }
    /** 첫 10개의 singleUpload 파엘에 대한 Pre-Signed URL 요청 */
    const requestUrl = await fetch("/api/share/file/upload", {
      method: "POST",
      body: JSON.stringify({ files: singleFileInfo, shareId: shareId }),
    })
    /** Pre-Signed URL */
    const signedUrls = await requestUrl.json()

    /** 업로드 비동기 처리를 위한 배열 */
    const uploadPromise = []

    // 첫 10개의 파일 업로드 요청 uploadPromise 에 저장
    for (let i = 0; i < signedUrls.length; i += 1) {
      const currentCount = count
      console.log("single file upload : ", i)
      uploadPromise.push(
        axios
          .put(signedUrls[i], singleUploads[i], {
            onUploadProgress(progressEvent) {
              progress[currentCount] = progressEvent.loaded
            },
          })
          .catch(() => {
            errorList.push({ id: i, count: currentCount })
          })
      )
      count = count + 1
    }

    /** 모든 요청이 완료될 때 까지 대기 */
    let res = await Promise.all(uploadPromise)

    // 만약 에러가 발생했다면 다시 업로드 과정 수행
    while (errorList.length > 0) {
      for (let i = 0; i < errorList.length; i += 1) {
        console.log("single file reupload : ", i)
        uploadPromise[errorList[0].id] = axios
          .put(signedUrls[errorList[0].id], singleUploads[errorList[0].id], {
            onUploadProgress(progressEvent) {
              progress[errorList[i].count] = progressEvent.loaded
            },
          })
          .then((e) => {
            errorList.shift()
            return e
          })
      }

      res = await Promise.all(uploadPromise)
    }

    // 첫 100개의 파일 삭제
    singleUploads.splice(0, 100)
  }

  // small mulitpart upload
  while (smallUploads.length > 0) {
    /** R2에 저장할 파일 위치 */
    const fileKey = shareId + "/" + smallUploads[0].name
    /** Multipart Upload 생성 */
    const createMultipart = await fetch("/api/share/file/multipart/start", {
      method: "POST",
      body: JSON.stringify({
        fileKey: fileKey,
      }),
    })
    /** 생성한 Multipart Upload 정보 */
    const multipartInfo = await createMultipart.json()

    /** 업로드 ID */
    const uploadId: string = multipartInfo.UploadId

    /** 업로드 할 파일 chunks에 대한 정보를 저장할 배열 */
    const uploadUrlReqInfo: SignedUrlReqInfo[] = []
    // 모든 chunks에 대한 fileKey, uploadId, index 값 배열에 저장
    for (let i = 0; i < smallChunks[0].length; i += 1) {
      uploadUrlReqInfo.push({
        fileKey: fileKey,
        uploadId: uploadId,
        index: i + 1,
      })
    }

    /** 모든 chunks에 대한 업로드 URL */
    const signedUrls: string[] = await getSignedUrls(uploadUrlReqInfo)

    /** 비동기 처리를 위한 업로드 요청 저장 배열 */
    let mulitpartPromise = []
    /** 에러 저장 배열 */
    let errorList: number[] = []
    let res: (void | AxiosResponse<any, any>)[] = []
    // upload files
    for (let i = 0; i < Math.ceil(smallChunks[0].length / 50); i += 1) {
      // 한 번에 50개의 chunks 씩 업로드
      for (let j = 0; j < 50; j += 1) {
        const chunkAddress = 50 * i + j
        if (!smallChunks[0][chunkAddress]) break
        const currentCount = count
        console.log("small file multipart upload : ", chunkAddress)
        mulitpartPromise.push(
          axios
            .put(signedUrls[chunkAddress], smallChunks[0][chunkAddress], {
              onUploadProgress(progressEvent) {
                progress[currentCount] = progressEvent.loaded
              },
            })
            .catch(() => {
              errorList.push(chunkAddress)
            })
        )
        count = count + 1
      }
      /** 최대 50개읯 파일이 업로드 될 때 까지 기다림 */
      res = await Promise.all(mulitpartPromise)
    }

    // 에러 발생시 다시 업로드
    while (errorList.length > 0) {
      console.log("try to reupload files")
      /** Pre-Signed URL 요청을 위한 파일 데이터 저장 배열 */
      const reuploadInfo: SignedUrlReqInfo[] = []
      // 파일 데이터 저장
      for (let i = 0; i < errorList.length; i += 1) {
        const info = uploadUrlReqInfo[errorList[i]]
        reuploadInfo.push(info)
      }
      /** 다시 업로드 할 Pre-Signed URL */
      const reuploadUrls: string[] = await getSignedUrls(reuploadInfo)

      // 업로드 요청
      for (let i = 0; i < errorList.length; i += 1) {
        console.log("small file multipart reupload : ", i)
        mulitpartPromise[errorList[i]] = axios
          .put(reuploadUrls[i], smallChunks[0][errorList[i]], {
            onUploadProgress(progressEvent) {
              progress[errorList[i]] = progressEvent.loaded
            },
          })
          .then((e) => {
            errorList.splice(i, 1)
            return e
          })
      }
      res = await Promise.all(mulitpartPromise)
    }

    /** etag를 저장할 배열 */
    const etags: string[] = []
    // 업로드 결과에서 etag 값 저장
    for (let i = 0; i < res.length; i += 1) {
      etags.push(
        res[i]?.headers?.etag?.substring(1, res[i]?.headers?.etag?.length - 1)
      )
    }

    // finish multipart upload
    const complete = await fetch("/api/share/file/multipart/complete", {
      method: "POST",
      body: JSON.stringify({
        fileKey: fileKey,
        uploadId: uploadId,
        uploadResults: etags,
      }),
    })
    const completeResult = await complete.json()

    if (completeResult.message === "Complete error") {
      postMessage({ message: "error", log: completeResult.log })
    }
    smallUploads.shift()
    smallChunks.shift()
  }
  postMessage({ message: "upload complete", shareId: shareId })
})

"use client"

import formatBytes from "@/lib/formatBytes"
import React, { useRef, useState, ChangeEvent, useEffect } from "react"
import { nanoid } from "nanoid"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useSetRecoilState } from "recoil"
import { accessCode, alertState } from "@/lib/recoil"
import { useSession } from "next-auth/react"
import Progress from "./Progress"
import getShareTime from "@/lib/getShareTime"
import axios from "axios"

/** 파일 데이터 타입 */
interface FileData {
  name: string
  size: number
  type: string
  lastModified: number
}

export default function FileUpload() {
  /** 파일 input 태그 숨기고 버튼으로 파일 입력 받을 수 있도록 Ref 설정 */
  const fileInput = useRef<HTMLInputElement>(null)

  // 다운로드 후 메세지 표시
  const [downloadMessage, setDownloadMessage] = useState("")
  // 최대 업로드 크기 제한
  const [maxFileSize, setMaxFileSize] = useState(1024 * 1024 * 1024) // 1GB
  // 전체 파일 사이즈 저장
  const [totalFileSize, setTotalFileSize] = useState(0)
  // 입력 받은 파일 데이터 저장
  const [fileData, setFileData] = useState<FileData[]>([])

  const [multipartProgress, setMultipartProgress] = useState<{
    index: number
    part: number
    value: number
  }>()
  const [progress, setProgress] = useState<number[][]>()
  const [progressValue, setProgressValue] = useState<number>(-1)

  /** 알림 표시 Recoil 함수 */
  const setAlert = useSetRecoilState(alertState)
  /** 접근 코드 표시 Recoil 함수 */
  const setAccessCode = useSetRecoilState(accessCode)

  // 사용자 로그인 정보 확인
  const { data: session } = useSession()

  /** 버튼 눌렀을 때 input 태그에서 파일 받는 함수 */
  function inputButton() {
    fileInput.current?.click()
  }

  /** 받은 파일 값 변경 시 fileData에 값 저장 */
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDownloadMessage("")
    const files = Array.from(event.target.files ?? [])
    const newFileData: FileData[] = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }))
    setFileData((prevFiles) => [...prevFiles, ...newFileData])
  }

  /** 받은 파일 중 삭제 */
  const handleFileDelete = (index: number) => {
    setFileData((prevFiles) => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })
    if (
      fileInput.current &&
      fileInput.current.files &&
      fileInput.current.files.length > index
    ) {
      const filesWithoutDeletedFile = Array.from(
        fileInput.current.files
      ).filter((_, i) => i !== index)

      // Create a new DataTransfer object to store the files
      const dataTransfer = new DataTransfer()

      // Add each file to the DataTransfer object
      filesWithoutDeletedFile.forEach((file) => {
        dataTransfer.items.add(file)
      })

      // Set the DataTransfer object files to the file input
      fileInput.current.files = dataTransfer.files
    }
  }

  /** 받은 파일 전체 크기 계산후 반환 */
  function getTotalFileSize() {
    return fileData.reduce((acc, file) => acc + file.size, 0)
  }

  /** 파일 전체 크기가 업로드 크기 제한에 걸리는지 확인하는 함수 */
  const checkTotalFileSize = () => {
    const totalSize = getTotalFileSize()

    if (totalSize > maxFileSize) {
      if (session?.user) {
        setAlert({
          message: `${session.user.plan} 플랜에서는 최대 ${formatBytes(
            maxFileSize
          )}까지 업로드 가능합니다.`,
          warn: true,
          error: false,
        })
      } else {
        setAlert({
          message:
            "로그인 하지 않은 상태에서는 최대 1GB까지 업로드 가능합니다.",
          warn: true,
          error: false,
        })
      }
      return false
    }
    return true
  }

  /** 파일 업로드 함수 */
  async function handleUpload() {
    try {
      // 파일 데이터가 존재한지 확인
      if (fileData.length === 0) return
      if (!fileInput?.current) return
      if (!fileInput.current.files) return
      if (!checkTotalFileSize()) return

      setProgressValue(0)
      /** 업로드 완료 후 접근 코드 표시용 값 */
      let success = 0

      // start
      const fileInfo = {
        files: fileData,
      }

      /** 파일 업로드 하기 전 share 정보 저장 */
      const createShare = await fetch("/api/share", {
        method: "POST",
        body: JSON.stringify(fileInfo),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const shareInfo = await createShare.json()

      let uploadFileInfo = []
      let errorLog: any[] = []

      for (let i = 0; i < shareInfo.files.length; i += 1) {
        const file = fileInput.current.files[i]

        let chunkSize = 100 * 1024 * 1024 // 100 MB chunk size
        let chunks = []
        let fileSize = file?.size
        let start = 0
        let end = chunkSize

        while (start < fileSize) {
          chunks.push(file.slice(start, end))
          start = end
          end = start + chunkSize
        }
        uploadFileInfo.push(chunks)
      }

      let totalProgress: number[][] = []
      for (let i = 0; i < uploadFileInfo.length; i += 1) {
        let chunkProgress: number[] = []
        for (let j = 0; j < uploadFileInfo[i].length; j += 1) {
          chunkProgress.push(0)
        }
        totalProgress.push(chunkProgress)
      }
      setProgress(totalProgress)

      for (let i = 0; i < uploadFileInfo.length; i += 1) {
        const createMultipart = await fetch("/api/share/file/multipart/start", {
          method: "POST",
          body: JSON.stringify({
            fileKey: shareInfo.id + "/" + fileData[i].name,
          }),
        })
        const multipartInfo = await createMultipart.json()

        const uploadId = multipartInfo.UploadId

        let uploadPromises: any[] = []

        for (let j = 0; j < uploadFileInfo[i].length; j += 1) {
          const uploadUrl = await fetch("/api/share/file/multipart/upload", {
            method: "POST",
            body: JSON.stringify({
              fileKey: shareInfo.id + "/" + fileData[i].name,
              uploadId: uploadId,
              index: j + 1,
            }),
          })
          const urlInfo = await uploadUrl.json()

          uploadPromises.push(
            axios
              .put(urlInfo, uploadFileInfo[i][j], {
                onUploadProgress(progressEvent) {
                  if (!progressEvent.loaded) return
                  setMultipartProgress({
                    index: i,
                    part: j,
                    value: progressEvent.loaded,
                  })
                },
              })
              .catch((e) => {
                errorLog.push({ index: i, part: j, url: urlInfo })
                console.log(e)
              })
          )
        }

        while (errorLog.length > 0) {
          for (let i = 0; i < errorLog.length; i += 1) {
            let copiedPromises = [...uploadPromises]
            uploadPromises[errorLog[i].part] = axios.put(
              errorLog[i].url,
              uploadFileInfo[errorLog[i].index][errorLog[i].part],
              {
                onUploadProgress(progressEvent) {
                  if (!progressEvent.loaded) return
                  setMultipartProgress({
                    index: errorLog[i].index,
                    part: errorLog[i].part,
                    value: progressEvent.loaded,
                  })
                },
              }
            )
            uploadPromises = copiedPromises
            errorLog = errorLog.filter((value) => value !== errorLog[i])
          }
        }

        const res = await Promise.all(uploadPromises)

        const etags = []
        for (let j = 0; j < res.length; j += 1) {
          etags.push(
            res[j].headers.etag.substring(1, res[j].headers.etag.length - 1)
          )
        }

        await fetch("/api/share/file/multipart/complete", {
          method: "POST",
          body: JSON.stringify({
            fileKey: shareInfo.id + "/" + fileData[i].name,
            uploadId: uploadId,
            uploadResults: etags,
          }),
        })
      }

      if (errorLog.length === 0) {
        setDownloadMessage("업로드 완료")
        const requestCode = await fetch("/api/share/file/upload", {
          method: "PUT",
          body: JSON.stringify({ shareId: shareInfo.id }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const codeData = await requestCode.json()
        setProgressValue(-1)
        setFileData([])
        setDownloadMessage("")
        setAccessCode(codeData.result.accessCode)
        if (fileInput.current) fileInput.current.value = ""
      } else {
        setAlert({ message: "업로드 오류", warn: false, error: true })
      }
    } catch (e) {
      console.log(e)
      setAlert({ message: "파일 업로드 오류", warn: false, error: true })
    }
  }

  useEffect(() => {
    async function setFileSize() {
      if (session?.user?.plan) {
        const userInfo = session.user.plan
        if (userInfo === "Free") {
          setMaxFileSize(1024 * 1024 * 1024 * 10) // 10 GB
        } else if (userInfo === "Basic") {
          setMaxFileSize(1024 * 1024 * 1024 * 100) // 100GB
        } else if (userInfo === "Pro") {
          setMaxFileSize(1024 * 1024 * 1024 * 1024) // 1TB
        }
      }
    }
    setFileSize()
  }, [session?.user.plan])

  useEffect(() => {
    const totalSize = fileData.reduce((acc, file) => acc + file.size, 0)
    setTotalFileSize(totalSize)
  }, [fileData])

  useEffect(() => {
    if (!progress || !multipartProgress) return
    let copied: number[][] = [...progress]
    copied[multipartProgress?.index][multipartProgress?.part] =
      multipartProgress?.value
    setProgress(copied)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multipartProgress])

  useEffect(() => {
    if (!progress) return
    let total = 0
    for (let i = 0; i < progress?.length; i += 1) {
      for (let j = 0; j < progress[i].length; j += 1) {
        total = total + progress[i][j]
      }
    }
    setProgressValue(Number(((total / getTotalFileSize()) * 100).toFixed(2)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  return (
    <div className='flex flex-col w-full mt-2'>
      <div className='flex flex-col items-start justify-start w-full '>
        <form
          encType='multipart/form-data'
          className='flex justify-start w-full'
        >
          <input
            type='file'
            onChange={handleFileInputChange}
            multiple
            style={{ display: "none" }}
            ref={fileInput}
          />
          <button
            type='button'
            onClick={inputButton}
            className='w-full p-1 px-4 mt-1 font-semibold transition duration-150 bg-white rounded-lg ring-2 ring-green-600 hover:bg-green-600 hover:text-white'
          >
            파일 추가
          </button>
        </form>
      </div>

      <div className='flex flex-col p-2 mt-2 space-y-2'>
        {fileData.map((data, key) => (
          <section
            key={nanoid()}
            className='flex items-center justify-between border-t-2'
          >
            <div className='flex flex-col justify-center text-sm font-semibold'>
              <div className='break-words'>{data.name}</div>
              <div>({formatBytes(data.size)})</div>
            </div>
            <button
              type='button'
              onClick={() => handleFileDelete(key)}
              className='p-1 font-semibold text-white transition duration-150 bg-red-500 rounded-md hover:bg-red-600'
            >
              <TrashIcon className='w-6 h-6 text-white' />
            </button>
          </section>
        ))}
      </div>
      <div className='flex flex-col items-start justify-center w-full p-2 my-2 border-2 border-green-600 rounded-lg'>
        <div className='font-semibold'>
          {session?.user.plan ? session.user.plan : "Guest"} Plan
        </div>
        <div className='mt-2 ml-auto text-sm'>
          {getShareTime(session?.user.plan)} 동안 공유
        </div>
        <div
          className={`ml-auto text-sm ${
            totalFileSize > maxFileSize
              ? "font-semibold text-red-500"
              : "text-green-700"
          }`}
        >
          총 {formatBytes(totalFileSize)} / 최대 {formatBytes(maxFileSize)}
        </div>
      </div>
      {progressValue >= 0 ? (
        <Progress progress={progressValue} message={downloadMessage} />
      ) : (
        ""
      )}
      {fileData.length > 0 ? (
        <>
          <button
            type='button'
            onClick={handleUpload}
            className='p-1 px-4 font-semibold text-white transition duration-150 bg-green-600 rounded-lg ring-2 ring-green-600 hover:bg-green-700 hover:ring-green-700'
          >
            파일 업로드
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  )
}

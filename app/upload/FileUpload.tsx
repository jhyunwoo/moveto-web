"use client"

import formatBytes from "@/lib/formatBytes"
import React, { useRef, useState, ChangeEvent, useEffect } from "react"
import { nanoid } from "nanoid"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useSetRecoilState } from "recoil"
import { accessCode, alertState } from "@/lib/recoil"
import { useSession } from "next-auth/react"
import Progress from "./Progress"

interface FileData {
  name: string
  size: number
  type: string
  lastModified: number
}

export default function FileUpload() {
  const fileInput = useRef<HTMLInputElement>(null)

  const [progress, setProgress] = useState<number>(0)
  const [downloadMessage, setDownloadMessage] = useState("")
  const [maxFileSize, setMaxFileSize] = useState(1024 * 1024 * 1024) // 1GB
  const [totalFileSize, setTotalFileSize] = useState(0)

  const setAlert = useSetRecoilState(alertState)

  const setAccessCode = useSetRecoilState(accessCode)

  const { data: session, status } = useSession()

  function inputButton() {
    fileInput.current?.click()
  }

  const [fileData, setFileData] = useState<FileData[]>([])

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

  const checkTotalFileSize = () => {
    const totalSize = fileData.reduce((acc, file) => acc + file.size, 0)

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

  async function handleUpload() {
    if (fileData.length === 0) return
    if (!fileInput?.current) return
    if (!fileInput.current.files) return

    if (!checkTotalFileSize()) return

    function checkProgress(e: ProgressEvent) {
      if (e.loaded === e.total) {
        setProgress(99)
        return
      }
      setProgress(Math.floor((e.loaded / e.total) * 100))
    }

    async function checkSuccess() {}

    function checkError() {
      setProgress(0)
      setDownloadMessage("")
      setAlert({
        message: "업로드를 다시 시도해주세요.",
        error: true,
        warn: false,
      })
      if (!fileInput.current) return
      fileInput.current.value = ""
    }

    function checkAbort() {
      setProgress(0)
      setAlert({ message: "업로드 중단됨", error: false, warn: true })
    }

    // start
    const fileInfo = {
      files: fileData,
    }

    const requestUrl = await fetch("/api/share/upload/url", {
      method: "POST",
      body: JSON.stringify(fileInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const uploadUrl = await requestUrl.json()

    for (let i = 0; i < uploadUrl.urlList.length; i += 1) {
      try {
        const response = await fetch(uploadUrl.urlList[i].uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: fileInput.current.files[i],
        })

        if (!response.ok) {
          throw new Error("파일 업로드 실패")
        }

        // 여기서 성공적으로 업로드된 파일에 대한 추가 작업을 수행할 수 있습니다.
        // 예: 성공적으로 업로드된 파일의 정보를 서버에 저장하거나 다른 처리를 위해 사용

        setProgress(Math.floor(((i + 1) / uploadUrl.urlList.length) * 100))
      } catch (error) {
        console.error("파일 업로드 오류:", error)
        checkError()
        return
      }
    }

    setProgress(100)
    setDownloadMessage("업로드 완료")
    setFileData([])

    const requestCode = await fetch("/api/share/upload/access-code", {
      method: "PUT",
      body: JSON.stringify({ shareId: uploadUrl.share.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const codeData = await requestCode.json()
    setProgress(0)
    setDownloadMessage("")
    setAccessCode(codeData.result.accessCode)
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

  return (
    <div className='mt-2 flex w-full flex-col'>
      <div className='flex w-full flex-col items-start justify-start '>
        <form
          encType='multipart/form-data'
          className='flex w-full justify-start'
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
            className='mt-1 w-full rounded-lg bg-white p-1 px-4 font-semibold ring-2 ring-green-600 transition duration-150 hover:bg-green-600 hover:text-white'
          >
            파일 추가
          </button>
        </form>
      </div>

      <div className='mt-2 flex flex-col space-y-2 p-2'>
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
              className='rounded-md bg-red-500 p-1 font-semibold text-white transition duration-150 hover:bg-red-600'
            >
              <TrashIcon className='h-6 w-6 text-white' />
            </button>
          </section>
        ))}
        <div
          className={`ml-auto text-sm ${
            totalFileSize > maxFileSize
              ? "font-semibold text-red-500"
              : "text-green-600"
          }`}
        >
          총 {formatBytes(totalFileSize)} / 최대 {formatBytes(maxFileSize)}
        </div>
      </div>
      {progress ? (
        <Progress progress={progress} message={downloadMessage} />
      ) : (
        ""
      )}
      {fileData.length > 0 ? (
        <button
          type='button'
          onClick={handleUpload}
          className='rounded-lg bg-green-600 p-1 px-4 font-semibold text-white ring-2 ring-green-600 transition duration-150 hover:bg-green-700 hover:ring-green-700'
        >
          파일 업로드
        </button>
      ) : (
        ""
      )}
    </div>
  )
}

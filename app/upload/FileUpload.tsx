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

  // Progress Event 발생할 때 마다 로드율과 index 저장
  const [progressData, setProgressData] = useState<{
    value: number
    index: number
  }>()
  // Progress 태그에 사용되는 value 값 저장
  const [progress, setProgress] = useState<number[]>([])
  // 다운로드 후 메세지 표시
  const [downloadMessage, setDownloadMessage] = useState("")
  // 최대 업로드 크기 제한
  const [maxFileSize, setMaxFileSize] = useState(1024 * 1024 * 1024) // 1GB
  // 전체 파일 사이즈 저장
  const [totalFileSize, setTotalFileSize] = useState(0)
  // 입력 받은 파일 데이터 저장
  const [fileData, setFileData] = useState<FileData[]>([])

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
    for (let i = 0; i < files.length; i += 1) {
      if (files[i].size > 5 * 1024 * 1024 * 1024 - 1024 * 1024 * 5) {
        setAlert({
          message: "단일 파일 크기가 4.95GiB를 초과합니다.",
          warn: true,
          error: false,
        })
      }
    }
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

  function warnMaxFileSize(fileSize: number) {
    if (fileSize > 5 * 1024 * 1024 * 1024 - 1024 * 1024 * 5) {
      return true
    }
    return false
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
    // 파일 데이터가 존재한지 확인
    if (fileData.length === 0) return
    if (!fileInput?.current) return
    if (!fileInput.current.files) return
    if (!checkTotalFileSize()) return

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

    // 파일 개수 만큼 progress 값 안에 기본값 0 생성
    const copied = [...progress]
    for (let i = 0; i < shareInfo.files.length; i += 1) {
      copied.push(0)
    }
    setProgress(copied)

    /** Progress 이벤트가 발생할 때 마다 실행하는 함수 */
    function checkProgress(e: ProgressEvent, i: number) {
      setProgressData({
        value: Math.round((e.loaded / e.total) * 100),
        index: i,
      })
    }

    async function checkSuccess() {
      success += 1

      if (success === shareInfo.files.length) {
        setDownloadMessage("업로드 완료")

        const requestCode = await fetch("/api/share/file/upload", {
          method: "PUT",
          body: JSON.stringify({ shareId: shareInfo.id }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const codeData = await requestCode.json()
        setFileData([])
        setProgress([])
        setDownloadMessage("")
        setAccessCode(codeData.result.accessCode)
        if (fileInput.current) fileInput.current.value = ""
      }
    }

    function checkError() {
      setProgress([])
      setDownloadMessage("")
      setAlert({
        message: "업로드를 다시 시도해주세요.",
        error: true,
        warn: false,
      })
      if (fileInput.current) fileInput.current.value = ""
    }

    function checkAbort() {
      setProgress([])
      setAlert({ message: "업로드 중단됨", error: false, warn: true })
      if (fileInput.current) fileInput.current.value = ""
    }

    for (let i = 0; i < shareInfo.files.length; i += 1) {
      const uploadUrl = await fetch("/api/share/file/upload", {
        method: "POST",
        body: JSON.stringify({ fileInfo: fileData[i], shareInfo: shareInfo }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const urlInfo = await uploadUrl.json()

      const xhr = new XMLHttpRequest()
      xhr.upload.addEventListener("progress", (e) => checkProgress(e, i), false)
      xhr.addEventListener("load", checkSuccess, false)
      xhr.addEventListener("error", checkError, false)
      xhr.addEventListener("abort", checkAbort, false)
      xhr.open("PUT", urlInfo.signedUrl, true)
      xhr.send(fileInput.current.files[i])
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
    if (typeof progressData?.index === "number") {
      const copied = [...progress]
      copied[progressData?.index] = progressData?.value
      setProgress(copied)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressData])

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
              <div
                className={`${
                  warnMaxFileSize(data.size) ? "text-red-500" : ""
                }`}
              >
                ({formatBytes(data.size)})
              </div>
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
      </div>
      <div className='my-2 flex w-full flex-col items-start justify-center rounded-lg border-2 border-green-600 p-2'>
        <div className='font-semibold'>
          {session?.user.plan ? session.user.plan : "Guest"} Plan
        </div>
        <div className='ml-auto mt-2 text-sm'>
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
        <div
          className={`ml-auto text-xs ${
            totalFileSize > maxFileSize
              ? "font-semibold text-red-500"
              : "text-green-700"
          }`}
        >
          단일 파일 최대
          {formatBytes(5 * 1024 * 1024 * 1024 - 1024 * 1024 * 5)}
        </div>
      </div>
      {progress.length > 0 ? (
        <Progress progress={progress} message={downloadMessage} />
      ) : (
        ""
      )}
      {fileData.length > 0 ? (
        <>
          <button
            type='button'
            onClick={handleUpload}
            className='rounded-lg bg-green-600 p-1 px-4 font-semibold text-white ring-2 ring-green-600 transition duration-150 hover:bg-green-700 hover:ring-green-700'
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

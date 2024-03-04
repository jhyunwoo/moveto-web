"use client"

import formatBytes from "@/lib/formatBytes"
import React, {
  useRef,
  useState,
  ChangeEvent,
  useEffect,
  FormEvent,
} from "react"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import {
  accessCode,
  alertState,
  fileSizeState,
  loadingState,
  shareTimeState,
} from "@/lib/recoil"
import Progress from "./Progress"
import getTotalFileSize from "@/lib/getTotalFileSize"
import getFileNameList from "@/lib/getFileNameList"
import usePlanLimit from "@/lib/usePlanLimit"

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [progress, setProgress] = useState(0)
  const [progressMessage, setProgressMessage] = useState("")
  const [fileSize, setFileSize] = useRecoilState(fileSizeState)
  const { userStorage, userTime } = usePlanLimit()

  const setAccessCode = useSetRecoilState(accessCode)
  const setAlert = useSetRecoilState(alertState)
  const setLoading = useSetRecoilState(loadingState)
  const shareTime = useRecoilValue(shareTimeState)

  const workerRef = useRef<Worker>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (files.length === 0) {
      setAlert({
        message: "파일을 업로드 해주세요.",
        warn: true,
        error: false,
      })
      setLoading(false)
      return
    }
    if (shareTime > userTime) {
      setAlert({
        message: "최대 공유 시간을 초과하였습니다.",
        warn: true,
        error: false,
      })
      setLoading(false)
      return
    }
    setLoading(true)
    if (fileSize > userStorage) {
      setAlert({
        message: "업로드 가능한 크기를 초과하였습니다.",
        warn: true,
        error: false,
      })
      setLoading(false)
      return
    }

    /** share 생성 */
    const createShare = await fetch("/api/share", {
      method: "POST",
      body: JSON.stringify({
        files: getFileNameList(files),
        totalSize: getTotalFileSize(files),
      }),
    })
    const result = await createShare.json()

    // worker에 업로드 요청
    handleWorker({ shareId: result })
  }

  /** input 태그에 파일 값 변경시 filse state에 새로운 파일만 값 저장 */
  function handleInputChage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const inputList = Array.from(e.target.files)
      const fileNames = getFileNameList(files)
      const newFiles = inputList.filter(
        (data: File) => !fileNames.includes(data.name)
      )
      const targetFiles = [...files, ...newFiles]
      setFileSize(getTotalFileSize(targetFiles))
      setFiles(targetFiles)
    }
  }

  /** 파일 삭제 함수 */
  function handleFileDelete(index: number) {
    const newFiles = [...files.slice(0, index), ...files.slice(index + 1)]

    const store = new DataTransfer()
    newFiles.forEach((file) => store.items.add(file))
    if (fileInputRef.current) {
      fileInputRef.current.files = store.files
    }
    setFiles(newFiles)
  }

  /** 버튼 클릭 시 input 태그 클릭 */
  function clickInput() {
    fileInputRef.current?.click()
  }

  /** worker에 파일 업로드 명령 */
  function handleWorker({ shareId }: { shareId: string }) {
    workerRef.current?.postMessage({ files: files, shareId: shareId })
  }

  // worker 설정 useEffect
  useEffect(() => {
    /** 파일 업로드 완료 후 실행하는 함수, 모든 값을 초기화 하고 접근 코드 요청하여 보여줌 */
    async function finishUpload(shareId: string, expireTime: number) {
      setLoading(false)
      setProgress(100)
      setProgressMessage("업로드 완료")
      const requestCode = await fetch("/api/word", {
        method: "PUT",
        body: JSON.stringify({ shareId: shareId, expires: expireTime }),
      })
      const codeData = await requestCode.json()
      setAccessCode(codeData)
      setFiles([])
      if (fileInputRef.current) fileInputRef.current.value = ""
      setProgressMessage("")
      setProgress(0)
    }
    workerRef.current = new Worker(
      new URL("http://localhost:3000/file-upload.ts", import.meta.url)
    )
    workerRef.current.onmessage = (event: MessageEvent<any>) => {
      if (event.data.progress) {
        if (event.data.progress > 0) {
          setLoading(false)
        }
        setProgress(event.data.progress)
      }
      if (event.data.message === "error") {
        console.log(event.data.log)
      }
      if (event.data.message === "upload complete") {
        console.log(shareTime)
        finishUpload(event.data.shareId, shareTime)
      }
    }
    return () => {
      workerRef.current?.terminate()
    }
  }, [setAccessCode, setLoading, shareTime])

  // 입력 받은 파일 크기 합 구하는 useEffect
  useEffect(() => setFileSize(getTotalFileSize(files)), [files])

  return (
    <form
      onSubmit={onSubmit}
      className=" mt-2 flex w-full flex-col space-y-2 dark:text-white"
      encType="multipart/form-data"
    >
      {progress > 0 ? (
        <Progress progress={progress} message={progressMessage} />
      ) : (
        ""
      )}

      <div className=" flex w-full flex-col items-start justify-start">
        <div className="flex w-full justify-start">
          <input
            type="file"
            multiple
            onChange={handleInputChage}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={clickInput}
            className="mt-1 w-full rounded-lg bg-white p-1 px-4 font-semibold ring-2 ring-green-600 transition duration-150 hover:bg-green-600 hover:text-white dark:bg-slate-800 dark:text-white sm:p-2"
          >
            파일 추가
          </button>
        </div>
      </div>
      <div className="flex flex-col ">
        {files.map((data, key) => (
          <section
            key={key}
            className=" flex items-center justify-between border-b-2 p-2  last:border-b-0 dark:border-slate-500"
          >
            <div className="flex flex-col justify-center text-sm font-semibold">
              <div className="break-all">{data.name}</div>
              <div>({formatBytes(data.size)})</div>
            </div>
            <button
              type="button"
              onClick={() => handleFileDelete(key)}
              className="rounded-md bg-red-500 p-1 font-semibold text-white transition duration-150 hover:bg-red-600"
            >
              <TrashIcon className="h-6 w-6 text-white" />
            </button>
          </section>
        ))}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-green-600 p-1 px-4 font-semibold text-white ring-2 ring-green-600 transition duration-150 hover:bg-green-700 hover:ring-green-700 sm:p-2"
      >
        파일 공유
      </button>
    </form>
  )
}

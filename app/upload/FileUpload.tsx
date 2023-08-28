"use client"

import formatBytes from "@/lib/formatBytes"
import React, {
  useRef,
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react"
import { nanoid } from "nanoid"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useSetRecoilState } from "recoil"
import { accessCode, alertState, loadingState } from "@/lib/recoil"
import { useSession } from "next-auth/react"
import Progress from "./Progress"
import getShareTime from "@/lib/getShareTime"
import getTotalFileSize from "@/lib/getTotalFileSize"
import getFileNameList from "@/lib/getFileNameList"

const ONEGB = 1024 * 1024 * 1024
const ONEMB = 1024 * 1024

type ProgressUpdateType = {
  id: number
  uploaded: number
}

export default function FileUpload() {
  const { data: session, status } = useSession()
  const [files, setFiles] = useState<File[]>([])
  const [maxFileSize, setMaxFileSize] = useState<number>(1024 * 1024 * 1024) // 1GB
  const [totalFileSize, setTotalFileSize] = useState<number>(0)
  const [progress, setProgress] = useState<number[]>([])
  const [progressValue, setProgressValue] = useState(0)
  const [progressUpdate, setProgressUpdate] = useState<ProgressUpdateType[]>([])
  const [progressMessage, setProgressMessage] = useState("")

  const setAccessCode = useSetRecoilState(accessCode)
  const setAlert = useSetRecoilState(alertState)
  const setLoading = useSetRecoilState(loadingState)

  const workerRef = useRef<Worker>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  /** input 태그에 파일 값 변경시 filse state에 새로운 파일만 값 저장 */
  function handleInputChage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const inputList = Array.from(e.target.files)
      const fileNames = getFileNameList(files)
      const newFiles = inputList.filter(
        (data: File) => !fileNames.includes(data.name)
      )
      const targetFiles = [...files, ...newFiles]
      setTotalFileSize(getTotalFileSize(targetFiles))
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

  /** 파일 업로드 실생시 share 값 생성 후 worker에 파일 업로드 요청 */
  async function handleUpload() {
    setLoading(true)
    if (totalFileSize > maxFileSize) {
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
      body: JSON.stringify({ files: getFileNameList(files) }),
    })
    const result = await createShare.json()

    /** 파일 업로드 분할 개수 구하는 함수 */
    function getFileUploadChunkList() {
      let count = 0
      for (let i = 0; i < files.length; i += 1) {
        if (files[i].size < 110 * ONEMB) {
          count = count += 1
        } else {
          count = count + Math.ceil(files[i].size / (110 * ONEMB))
        }
      }
      return count
    }

    /** progress 추적을 위한 기본 값 세팅 */
    const progressList = new Array(getFileUploadChunkList()).fill(0)
    setProgress(progressList)

    // worker에 업로드 요청
    handleWorker({ shareId: result.id })
  }

  /** 파일 업로드 완료 후 실행하는 함수, 모든 값을 초기화 하고 접근 코드 요청하여 보여줌 */
  async function finishUpload(shareId: string) {
    setLoading(false)
    setProgressValue(100)
    setProgressMessage("업로드 완료")
    const requestCode = await fetch("/api/share/file/upload", {
      method: "PUT",
      body: JSON.stringify({ shareId: shareId }),
    })
    const codeData = await requestCode.json()
    setAccessCode(codeData.result.accessCode)
    setFiles([])
    setProgress([])
    setProgressUpdate([])
    if (fileInputRef.current) fileInputRef.current.value = ""
    setProgressMessage("")
    setProgressValue(0)
  }

  // worker 설정 useEffect
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("public/worker/fileUpload.ts", import.meta.url)
    )
    workerRef.current.onmessage = (event: MessageEvent<any>) => {
      if (event.data.message === "upload complete") {
        finishUpload(event.data.shareId)
      } else if (event.data.message === "upload error") {
        setAlert({ message: "업로드 오류", error: true, warn: false })
        setProgress([])
        setProgressUpdate([])
        setProgressValue(0)
      } else {
        setProgressUpdate([...progressUpdate, event.data])
      }
    }
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  // 플랜별 업로드 가능 크기 설정
  useEffect(() => {
    if (session?.user?.plan === "Free") {
      setMaxFileSize(ONEGB * 10)
    } else if (session?.user.plan === "Basic") {
      setMaxFileSize(ONEGB * 100)
    } else if (session?.user.plan === "Pro") {
      setMaxFileSize(ONEGB * 1024)
    }
  }, [session])

  // progress 변경시 progressValue 값 변경
  useEffect(() => {
    const totalSize = getTotalFileSize(files)
    let uploadedBytes = 0
    if (progress.length > 0) {
      uploadedBytes = progress.reduce(function add(sum, currValue) {
        return sum + currValue
      }, 0)
    }

    let value = 0
    if (totalSize !== 0) {
      value = Number(((uploadedBytes / totalSize) * 100).toFixed(2))
    }
    setProgressValue(value)
  }, [progress])

  // worker에서 받은 업로드 진행 값 기반 progressUpdate 업데이트 useEffect
  useEffect(() => {
    if (progressUpdate.length > 0) {
      const lastUpdate = progressUpdate.slice(-1)[0]
      let copy = [...progress]
      copy[lastUpdate.id] = lastUpdate.uploaded
      setProgress(copy)
    }
  }, [progressUpdate])

  // 입력 받은 파일 크기 합 구하는 useEffect
  useEffect(() => setTotalFileSize(getTotalFileSize(files)), [files])

  return (
    <div className="mt-2 flex w-full flex-col dark:text-white">
      <div className="flex w-full flex-col items-start justify-start">
        <form
          encType="multipart/form-data"
          className="flex w-full justify-start"
        >
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
        </form>
      </div>

      <div className="mt-2 flex flex-col space-y-2 p-2">
        {files.map((data, key) => (
          <section
            key={nanoid()}
            className="flex items-center justify-between border-t-2 dark:border-slate-500"
          >
            <div className="flex flex-col justify-center text-sm font-semibold">
              <div className="break-words">{data.name}</div>
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
      <div className="my-2 flex w-full flex-col items-start justify-center rounded-lg border-2 border-green-600 p-2">
        {status === "loading" ? (
          <div className="h-7 w-full animate-pulse rounded-md bg-slate-200 text-lg font-semibold dark:bg-slate-700" />
        ) : (
          <div className="text-lg font-semibold">
            {session?.user.plan ? session.user.plan : "Guest"} Plan
          </div>
        )}
        <div className="ml-auto mt-2 text-sm">
          {getShareTime(session?.user.plan)} 동안 공유
        </div>
        <div
          className={`ml-auto text-sm ${
            totalFileSize > maxFileSize
              ? "font-semibold text-red-500"
              : "text-green-700 dark:text-green-300"
          }`}
        >
          총 {formatBytes(totalFileSize)} / 최대 {formatBytes(maxFileSize)}
        </div>
      </div>
      {progressValue > 0 ? (
        <Progress progress={progressValue} message={progressMessage} />
      ) : (
        ""
      )}
      {files.length > 0 ? (
        <>
          <button
            type="button"
            onClick={handleUpload}
            className="rounded-lg bg-green-600 p-1 px-4 font-semibold text-white ring-2 ring-green-600 transition duration-150 hover:bg-green-700 hover:ring-green-700"
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

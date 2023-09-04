"use client"

import formatBytes from "@/lib/formatBytes"
import React, { useRef, useState, ChangeEvent, useEffect } from "react"
import { nanoid } from "nanoid"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useSetRecoilState } from "recoil"
import { accessCode, alertState, loadingState } from "@/lib/recoil"
import { useSession } from "next-auth/react"
import Progress from "./Progress"
import getShareTime from "@/lib/getShareTime"
import getTotalFileSize from "@/lib/getTotalFileSize"
import getFileNameList from "@/lib/getFileNameList"
import { SubmitHandler, useForm } from "react-hook-form"
import getMaxShareTime from "@/lib/getMaxShareTime"
import convertMinutesToFormat from "@/lib/convertMinutesToFormat"

const ONEMB = 1024 * 1024
const ONEGB = 1024 * ONEMB

type Inputs = {
  expires: number
}

export default function FileUpload() {
  const { data: session, status } = useSession()
  const [files, setFiles] = useState<File[]>([])
  const [maxFileSize, setMaxFileSize] = useState<number>(ONEGB) // 1GB
  const [totalFileSize, setTotalFileSize] = useState<number>(0)
  const [progress, setProgress] = useState(0)
  const [progressMessage, setProgressMessage] = useState("")

  const setAccessCode = useSetRecoilState(accessCode)
  const setAlert = useSetRecoilState(alertState)
  const setLoading = useSetRecoilState(loadingState)

  const workerRef = useRef<Worker>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      expires: 5,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (watch("expires") > getMaxShareTime(session)) {
      setAlert({
        message: "최대 공유 시간을 초과하였습니다.",
        warn: true,
        error: false,
      })
      setLoading(false)
      return
    }
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

    // worker에 업로드 요청
    handleWorker({ shareId: result.id })
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

  /** 파일 업로드 완료 후 실행하는 함수, 모든 값을 초기화 하고 접근 코드 요청하여 보여줌 */
  async function finishUpload(shareId: string) {
    setLoading(false)
    setProgress(100)
    setProgressMessage("업로드 완료")
    const requestCode = await fetch("/api/word", {
      method: "PUT",
      body: JSON.stringify({ shareId: shareId, expires: watch("expires") }),
    })
    const codeData = await requestCode.json()
    setAccessCode(codeData.result.accessCode)
    setFiles([])
    if (fileInputRef.current) fileInputRef.current.value = ""
    setProgressMessage("")
    setProgress(0)
  }

  function addTime(add: number, current: number) {
    if (current + add > getMaxShareTime(session)) {
      setValue("expires", getMaxShareTime(session))
    } else {
      setValue("expires", current + add)
    }
  }

  // worker 설정 useEffect
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("worker/fileUpload.ts", import.meta.url)
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
        finishUpload(event.data.shareId)
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

  // 입력 받은 파일 크기 합 구하는 useEffect
  useEffect(() => setTotalFileSize(getTotalFileSize(files)), [files])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" mt-2 flex w-full flex-col space-y-2 dark:text-white"
      encType="multipart/form-data"
    >
      {progress > 0 ? (
        <Progress progress={progress} message={progressMessage} />
      ) : (
        ""
      )}
      <div className=" flex w-full flex-col items-start justify-center rounded-lg border-2 border-green-600 p-2">
        {status === "loading" ? (
          <div className="h-7 w-full animate-pulse rounded-md bg-slate-200 text-lg font-semibold dark:bg-slate-700" />
        ) : (
          <div className="text-lg font-semibold">
            {session?.user.plan ? session.user.plan + " Plan" : "Guest"}
          </div>
        )}
        <div className="ml-auto mt-2 text-sm">
          최대 {getShareTime(session?.user.plan)} 동안 공유
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

      <div className="rounded-lg border-2 border-green-500 p-2">
        <div className="flex w-full flex-col">
          <input
            className="w-full bg-slate-100 accent-green-500 dark:bg-slate-800"
            min={1}
            max={getMaxShareTime(session)}
            defaultValue={5}
            step={1}
            type="range"
            {...register("expires", {
              min: 1,
              max: getMaxShareTime(session),
            })}
          />
          <div className="mt-1 flex flex-col items-start justify-center">
            <div className="flex w-full space-x-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  addTime(5, Number(watch("expires")))
                }}
                className="rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
              >
                +5분
              </button>
              <button
                type="button"
                onClick={() => {
                  addTime(10, Number(watch("expires")))
                }}
                className={`rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900 ${
                  !session && "invisible"
                }`}
              >
                +10분
              </button>
              <button
                type="button"
                onClick={() => {
                  addTime(30, Number(watch("expires")))
                }}
                className={`rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900 ${
                  !session && "invisible"
                }`}
              >
                +30분
              </button>
              <button
                type="button"
                onClick={() => {
                  addTime(60, Number(watch("expires")))
                }}
                className={`rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900 ${
                  !session && "invisible"
                }`}
              >
                +1시간
              </button>
            </div>
            <div className="ml-auto mt-1 text-sm">
              {convertMinutesToFormat(watch("expires"))} 동안 공유
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 flex w-full flex-col items-start justify-start">
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
            key={nanoid()}
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

      {files.length > 0 && (
        <button
          type="submit"
          className="rounded-lg bg-green-600 p-1 px-4 font-semibold text-white ring-2 ring-green-600 transition duration-150 hover:bg-green-700 hover:ring-green-700"
        >
          파일 업로드
        </button>
      )}
    </form>
  )
}

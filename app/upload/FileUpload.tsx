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
    console.log(data)
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

    // worker에 업로드 요청
    handleWorker({ shareId: result.id })
  }

  /** 파일 업로드 완료 후 실행하는 함수, 모든 값을 초기화 하고 접근 코드 요청하여 보여줌 */
  async function finishUpload(shareId: string) {
    setLoading(false)
    setProgress(100)
    setProgressMessage("업로드 완료")
    const requestCode = await fetch("/api/share/file/upload", {
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
      <div className="my-2 flex w-full flex-col items-start justify-center rounded-lg border-2 border-green-600 p-2">
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
      {progress > 0 ? (
        <Progress progress={progress} message={progressMessage} />
      ) : (
        ""
      )}
      {files.length > 0 && (
        <div className="rounded-md border-2 border-green-500 p-2">
          <div className="text-lg font-semibold">공유 시간</div>
          <div className="flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-around space-x-1">
                {!session && (
                  <>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 1
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 1)
                      }}
                    >
                      1분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 3
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 3)
                      }}
                    >
                      3분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 5
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 5)
                      }}
                    >
                      5분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 10
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 10)
                      }}
                    >
                      10분
                    </button>
                  </>
                )}
                {session?.user.plan === "Free" && (
                  <>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 5
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 5)
                      }}
                    >
                      5분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 10
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 10)
                      }}
                    >
                      10분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 30
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 30)
                      }}
                    >
                      30분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60)
                      }}
                    >
                      1시간
                    </button>
                  </>
                )}
                {session?.user.plan === "Baisc" && (
                  <>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 10
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 10)
                      }}
                    >
                      10분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60)
                      }}
                    >
                      1시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 6
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 6)
                      }}
                    >
                      6시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 12
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 12)
                      }}
                    >
                      12시간
                    </button>
                  </>
                )}
                {session?.user.plan === "Pro" && (
                  <>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60)
                      }}
                    >
                      1시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 3
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 3)
                      }}
                    >
                      3시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 12
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 12)
                      }}
                    >
                      12시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 24
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 24)
                      }}
                    >
                      24시간
                    </button>
                  </>
                )}
              </div>
              <div className="mt-2 text-sm">사용자 설정</div>
              <div className="flex items-center space-x-1">
                <input
                  className="rounded-md p-1 px-2 outline-none dark:bg-slate-800"
                  {...register("expires", {
                    min: {
                      value: 1,
                      message: "올바른 시간을 입력해주세요.",
                    },
                    max: {
                      value: getMaxShareTime(session),
                      message: "최대 공유 시간을 초과하였습니다.",
                    },
                  })}
                />
                <div>분</div>
              </div>
            </form>
          </div>
        </div>
      )}
      {files.length > 0 && (
        <button
          type="button"
          onClick={handleUpload}
          className="mt-4 rounded-lg bg-green-600 p-1 px-4 font-semibold text-white ring-2 ring-green-600 transition duration-150 hover:bg-green-700 hover:ring-green-700"
        >
          파일 업로드
        </button>
      )}
    </div>
  )
}

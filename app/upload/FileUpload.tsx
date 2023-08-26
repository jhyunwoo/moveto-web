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
import { accessCode, alertState } from "@/lib/recoil"
import { useSession } from "next-auth/react"
import Progress from "./Progress"
import getShareTime from "@/lib/getShareTime"
import getTotalFileSize from "@/lib/getTotalFileSize"
import getFileNameList from "@/lib/getFileNameList"

const ONEGB = 1024 * 1024 * 1024

export default function FileUpload() {
  const { data: session } = useSession()
  const [files, setFiles] = useState<File[]>([])
  const [maxFileSize, setMaxFileSize] = useState<number>(1024 * 1024 * 1024) // 1GB
  const [totalFileSize, setTotalFileSize] = useState<number>(0)

  const workerRef = useRef<Worker>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("worker/fileUpload.ts", import.meta.url)
    )
    workerRef.current.onmessage = (event: MessageEvent<number>) => {
      console.log("worker work" + event?.data)
    }
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage({ data: files })
  }, [files])

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

  function handleFileDelete(index: number) {
    const newFiles = [...files.slice(0, index), ...files.slice(index + 1)]

    const store = new DataTransfer()
    newFiles.forEach((file) => store.items.add(file))
    if (fileInputRef.current) {
      fileInputRef.current.files = store.files
    }
    setFiles(newFiles)
  }

  function clickInput() {
    fileInputRef.current?.click()
  }

  async function handleUpload() {
    const createShare = await fetch("/api/share", {
      method: "POST",
      body: JSON.stringify({ files: getFileNameList(files) }),
    })
    const result = await createShare.json()
    console.log(result)
  }

  useEffect(() => {
    if (session?.user?.plan === "Free") {
      setMaxFileSize(ONEGB * 10)
    } else if (session?.user.plan === "Basic") {
      setMaxFileSize(ONEGB * 100)
    } else if (session?.user.plan === "Pro") {
      setMaxFileSize(ONEGB * 1024)
    }
  }, [session])

  return (
    <div className="mt-2 flex w-full flex-col dark:text-white">
      <div
        className="flex w-full flex-col items-start justify-start "
        onClick={handleWork}
      >
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
        <div className="text-lg font-semibold">
          {session?.user.plan ? session.user.plan : "Guest"} Plan
        </div>
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
      {/* {progressValue >= 0 ? (
        <Progress progress={progressValue} message={downloadMessage} />
      ) : (
        ""
      )} */}
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

"use client"

import { useState } from "react"
import CenterLayout from "@/components/CenterLayout"
import { useRecoilState, useRecoilValue } from "recoil"
import { accessCode, shareTimeState, fileSizeState } from "@/lib/recoil"
import FileUpload from "./FileUpload"
import LinkUpload from "./LinkUpload"
import AccessCode from "./AccessCode"
import { useSession } from "next-auth/react"
import useStorage from "@/lib/useStorage"
import getMaxStorageSize from "@/lib/getMaxStorageSize"
import formatBytes from "@/lib/formatBytes"
import convertMinutesToFormat from "@/lib/convertMinutesToFormat"
import getMaxShareTime from "@/lib/getMaxShareTime"

const ONEGB = 1024 * 1024 * 1024

export default function Upload() {
  const [share, setShare] = useState("File")
  const { data: session, status } = useSession()
  const { storageData, storageError, storageLoading, storageMutate } =
    useStorage()
  const [shareTime, setShareTime] = useRecoilState(shareTimeState)
  const fileSize = useRecoilValue(fileSizeState)
  const code = useRecoilValue(accessCode)

  function getMaxUploadSize() {
    if (session?.user?.plan === "Free") {
      return ONEGB * 10
    } else if (session?.user.plan === "Basic") {
      return ONEGB * 100
    } else if (session?.user.plan === "Pro") {
      return ONEGB * 1024
    } else {
      return ONEGB
    }
  }

  function addTime(add: number) {
    if (shareTime + add > getMaxShareTime(session)) {
      setShareTime(getMaxShareTime(session))
    } else {
      setShareTime(shareTime + add)
    }
  }

  return (
    <CenterLayout>
      {code ? <AccessCode code={code} /> : ""}
      <div className="flex w-full max-w-xl flex-col items-center justify-center space-y-2 rounded-lg bg-white p-4 shadow-xl dark:bg-slate-900">
        <div className="flex w-full justify-around space-x-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setShare("File")}
            className={`${
              share === "File"
                ? "bg-green-600 text-white"
                : "bg-white text-black dark:bg-slate-700 dark:text-white"
            }  w-full rounded-full p-1 font-semibold transition duration-100`}
          >
            파일 공유
          </button>
          <button
            type="button"
            onClick={() => setShare("Link")}
            className={`${
              share === "Link"
                ? "bg-green-600 text-white"
                : "bg-white text-black dark:bg-slate-700 dark:text-white"
            }  w-full rounded-full p-1 font-semibold transition duration-100`}
          >
            텍스트 공유
          </button>
        </div>

        <div className=" flex w-full flex-col rounded-md border-2 border-green-400 p-2 dark:border-green-500">
          <div className="text-lg font-semibold">
            {session?.user.plan ? session?.user.plan + " Plan" : "Guest"}
          </div>
          <div className="ml-auto flex flex-col items-end text-sm">
            <div>최대 24시간 동안 공유</div>
            {share === "File" ? (
              <div
                className={`ml-auto text-sm ${
                  fileSize > getMaxUploadSize()
                    ? "font-semibold text-red-500"
                    : "text-green-700 dark:text-green-300"
                }`}
              >
                총 {formatBytes(fileSize)} / 최대{" "}
                {formatBytes(getMaxStorageSize(session) - storageData)}
              </div>
            ) : (
              <div>공유 가능한 텍스트 : 무제한</div>
            )}
          </div>
        </div>
        <div className="w-full rounded-lg border-2 border-green-500 p-2">
          <div className="flex w-full flex-col">
            <input
              onChange={(data) => setShareTime(Number(data.target.value))}
              className="w-full bg-slate-100 accent-green-500 dark:bg-slate-800"
              min={1}
              max={getMaxShareTime(session)}
              value={shareTime}
              step={1}
              type="range"
            />
            <div className="mt-1 flex flex-col items-start justify-center">
              <div className="flex w-full space-x-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    addTime(5)
                  }}
                  className="rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                >
                  +5분
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addTime(10)
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
                    addTime(30)
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
                    addTime(60)
                  }}
                  className={`rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900 ${
                    !session && "invisible"
                  }`}
                >
                  +1시간
                </button>
              </div>
              <div className="ml-auto mt-1 text-sm">
                {convertMinutesToFormat(shareTime)} 동안 공유
              </div>
            </div>
          </div>
        </div>
        {share === "File" ? <FileUpload /> : <LinkUpload />}
      </div>
    </CenterLayout>
  )
}

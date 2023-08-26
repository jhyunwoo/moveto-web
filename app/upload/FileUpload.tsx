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

export default function FileUpload() {
  const { data: session } = useSession()

  return (
    <div className="mt-2 flex w-full flex-col dark:text-white">
      <div className="flex w-full flex-col items-start justify-start ">
        <form
          encType="multipart/form-data"
          className="flex w-full justify-start"
        >
          <input type="file" multiple style={{ display: "none" }} />
          <button
            type="button"
            className="mt-1 w-full rounded-lg bg-white p-1 px-4 font-semibold ring-2 ring-green-600 transition duration-150 hover:bg-green-600 hover:text-white dark:bg-slate-800 dark:text-white sm:p-2"
          >
            파일 추가
          </button>
        </form>
      </div>

      <div className="mt-2 flex flex-col space-y-2 p-2">
        {/* {fileData.map((data, key) => (
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
        ))} */}
      </div>
      <div className="my-2 flex w-full flex-col items-start justify-center rounded-lg border-2 border-green-600 p-2">
        <div className="text-lg font-semibold">
          {session?.user.plan ? session.user.plan : "Guest"} Plan
        </div>
        <div className="ml-auto mt-2 text-sm">
          {getShareTime(session?.user.plan)} 동안 공유
        </div>
        {/* <div
          className={`ml-auto text-sm ${
            totalFileSize > maxFileSize
              ? "font-semibold text-red-500"
              : "text-green-700 dark:text-green-300"
          }`}
        >
          총 {formatBytes(totalFileSize)} / 최대 {formatBytes(maxFileSize)}
        </div> */}
      </div>
      {/* {progressValue >= 0 ? (
        <Progress progress={progressValue} message={downloadMessage} />
      ) : (
        ""
      )} */}
      {/* {fileData.length > 0 ? (
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
      )} */}
    </div>
  )
}

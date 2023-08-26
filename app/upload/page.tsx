"use client"

import { useState } from "react"
import CenterLayout from "@/components/CenterLayout"
import { useRecoilValue } from "recoil"
import { accessCode } from "@/lib/recoil"

import FileUpload from "./FileUpload"
import LinkUpload from "./LinkUpload"
import AccessCode from "./AccessCode"

export default function Upload() {
  const [share, setShare] = useState("File")

  const code = useRecoilValue(accessCode)

  return (
    <CenterLayout>
      {code ? <AccessCode code={code} /> : ""}
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl dark:bg-slate-900">
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
            링크 공유
          </button>
        </div>
        {share === "File" ? <FileUpload /> : <LinkUpload />}
      </div>
    </CenterLayout>
  )
}

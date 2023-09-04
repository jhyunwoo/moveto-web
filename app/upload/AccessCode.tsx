"use client"

import { accessCode } from "@/lib/recoil"
import { useState } from "react"
import { useResetRecoilState } from "recoil"

export default function AccessCode({ code }: { code: string }) {
  const resetAccessCode = useResetRecoilState(accessCode)
  const shareCode = code.replace(" ", "_")
  const [copy, setCopy] = useState("")

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://www.moveto.kr/?c=${shareCode}`
      )
      setCopy("클립보드에 링크가 복사되었습니다.")
    } catch (e) {
      setCopy("복사에 실패하였습니다")
    }
  }

  return (
    <section className="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-screen w-full touch-none items-center justify-center bg-slate-100/80 p-8 dark:bg-slate-950/80 dark:text-white">
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-slate-900 ">
        <div className="p-2 text-lg font-bold">접근 코드</div>
        <div className="rounded-lg bg-slate-100 p-4 text-2xl font-semibold dark:bg-slate-800">
          {code}
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <button
            type="button"
            onClick={handleCopyClipBoard}
            className="rounded-lg p-1 px-8 text-center font-semibold ring-2 ring-green-500"
          >
            링크 공유
          </button>
          <div
            className={`mt-1 rounded-lg bg-slate-100 p-1 px-2 text-sm transition dark:bg-slate-800 ${
              copy ? "" : "hidden"
            }`}
          >
            {copy}
          </div>
        </div>
        <button
          type="button"
          onClick={resetAccessCode}
          className="text-md mt-2 rounded-lg bg-green-500 p-2 px-8 text-center font-semibold text-white transition duration-200 hover:bg-green-600"
        >
          확인
        </button>
      </div>
    </section>
  )
}

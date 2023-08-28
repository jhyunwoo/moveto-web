"use client"

import { alertState } from "@/lib/recoil"
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useRecoilValue, useResetRecoilState } from "recoil"
import PopUpLayout from "./PopUpLayout"

export default function Alert() {
  const alertInfo = useRecoilValue(alertState)
  const resetAlert = useResetRecoilState(alertState)

  return (
    <>
      {alertInfo.message && (
        <PopUpLayout>
          <div className="relative flex w-full max-w-xl flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-slate-950 dark:text-white">
            <div
              className={`${
                alertInfo.error && "text-red-700 dark:text-red-400"
              } ${
                alertInfo.warn && "text-orange-500 dark:text-orange-400"
              } p-4 text-lg font-semibold`}
            >
              {alertInfo.message}
            </div>
            <button
              type="button"
              onClick={resetAlert}
              className="w-full max-w-xs rounded-md bg-green-600 p-1 px-2  text-white transition duration-200 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400"
            >
              확인
            </button>
          </div>
        </PopUpLayout>
      )}
    </>
  )
}

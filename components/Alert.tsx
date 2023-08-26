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
          <div className="relative flex w-full max-w-xl items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-slate-950">
            <button
              type="button"
              onClick={resetAlert}
              className="absolute -right-4 -top-4"
            >
              <XCircleIcon className="h-8 w-8 rounded-full text-slate-600 dark:text-slate-300" />
            </button>
            <div
              className={`${
                alertInfo.error && "text-red-700 dark:text-red-400"
              } ${
                alertInfo.warn && "text-orange-500 dark:text-orange-400"
              } font-semibold`}
            >
              {alertInfo.message}
            </div>
          </div>
        </PopUpLayout>
      )}
    </>
  )
}

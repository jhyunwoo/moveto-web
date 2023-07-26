"use client"

import { alertState } from "@/lib/recoil"
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useRecoilValue, useResetRecoilState } from "recoil"

export default function Alert() {
  const alertInfo = useRecoilValue(alertState)
  const resetAlert = useResetRecoilState(alertState)

  if (alertInfo.message) {
    return (
      <div className='fixed bottom-0 left-0 right-0 top-0 flex h-screen w-full items-center justify-center bg-slate-100/80 p-8'>
        <div className='relative flex w-full max-w-xl items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
          <button
            type='button'
            onClick={resetAlert}
            className='absolute right-0 top-0'
          >
            <XCircleIcon className='h-6 w-6 rounded-full text-slate-600' />
          </button>
          <div
            className={`${alertInfo.error ? "text-red-700" : ""} ${
              alertInfo.warn ? "text-orange-500" : ""
            } font-semibold`}
          >
            {alertInfo.message}
          </div>
        </div>
      </div>
    )
  }
  return <div />
}

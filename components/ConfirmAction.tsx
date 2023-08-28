"use client"

import { useRecoilState } from "recoil"
import PopUpLayout from "./PopUpLayout"
import { confirmActionState } from "@/lib/recoil"

export default function ConfirmAction() {
  const [confirmAction, setConfirmAction] = useRecoilState(confirmActionState)
  function runAction() {
    confirmAction.action()
    setConfirmAction({ message: "", action: () => {} })
  }
  if (confirmAction.message) {
    return (
      <PopUpLayout>
        <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-lg bg-white p-4 dark:bg-slate-950 dark:text-white">
          <div className="py-4 text-lg font-semibold">
            {confirmAction.message}
          </div>
          <div className="flex w-full justify-around space-x-2">
            <button
              className="w-full rounded-lg bg-green-600 p-1 px-2 transition duration-200 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400"
              onClick={() =>
                setConfirmAction({ message: "", action: () => {} })
              }
            >
              취소
            </button>
            <button
              className="w-full rounded-lg border-2 border-green-600 p-1 px-2 transition duration-200 hover:bg-green-100 dark:border-green-500 hover:dark:bg-green-900"
              onClick={runAction}
            >
              확인
            </button>
          </div>
        </div>
      </PopUpLayout>
    )
  } else {
    return <></>
  }
}

"use client"

import { alertWithLinkState } from "@/lib/recoil"
import Link from "next/link"
import { useRecoilState } from "recoil"
import PopUpLayout from "./PopUpLayout"

export default function AlertWithLink() {
  const [alert, setAlert] = useRecoilState(alertWithLinkState)

  return (
    <>
      {alert.message && (
        <PopUpLayout>
          <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
            <div className="p-2 font-semibold">{alert.message}</div>
            <Link
              onClick={() => setAlert({ message: "", link: "" })}
              href={alert.link}
              className="w-full rounded-lg bg-green-400 p-1 text-center font-semibold text-white"
            >
              확인
            </Link>
          </div>
        </PopUpLayout>
      )}
    </>
  )
}

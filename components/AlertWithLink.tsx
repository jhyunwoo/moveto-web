"use client"

import { alertWithLinkState } from "@/lib/recoil"
import Link from "next/link"
import { useRecoilState } from "recoil"

export default function AlertWithLink() {
  const [alert, setAlert] = useRecoilState(alertWithLinkState)

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 flex touch-none items-center justify-center bg-slate-100/80 p-8 backdrop-blur-sm transition ${
        alert.message === "" ? "hidden" : ""
      }`}
    >
      <div className='flex w-full max-w-lg flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
        <div className='p-2 font-semibold'>{alert.message}</div>
        <Link
          onClick={() => setAlert({ message: "", link: "" })}
          href={alert.link}
          className='w-full rounded-lg bg-green-400 p-1 text-center font-semibold text-white'
        >
          확인
        </Link>
      </div>
    </div>
  )
}

"use client"

import planColor from "@/lib/planColor"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import { nanoid } from "nanoid"
import Link from "next/link"
import DeleteShare from "./DeleteShare"
import { useSession } from "next-auth/react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ShareHistory() {
  const { data: session, status } = useSession()
  const {
    data: shareHistory,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/share/user/${session?.user.id}`, fetcher)

  function korDate(date: Date) {
    const sharedDate = new Date(date)
    sharedDate.setHours(sharedDate.getHours() + 9)
    const options: { dateStyle: "long"; timeStyle: "medium" } = {
      dateStyle: "long",
      timeStyle: "medium",
    }
    return Intl.DateTimeFormat("ko-KR", options).format(sharedDate)
  }

  return (
    <div className="flex min-h-screen w-full flex-col space-y-2  p-4 pb-24 dark:text-white">
      <Link
        href={"/profile"}
        className="flex items-center space-x-1 text-green-600 transition duration-200 hover:text-green-700"
      >
        <ChevronDoubleLeftIcon className="h-6 w-6" />
        <div className="font-semibold">프로필</div>
      </Link>

      <div className="flex flex-col p-3 ">
        <div className="flex w-full items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{session?.user.name}</div>
            <div className="text-sm">{session?.user.email}</div>
          </div>
          <div
            className={`font-semibold bg-${planColor(
              session?.user.plan
            )} rounded-md p-1 px-3 text-white`}
          >
            {session?.user.plan} Plan
          </div>
        </div>
      </div>
      <div className="mt-4 text-xl font-bold">공유 기록</div>
      <div className="flex flex-col rounded-lg bg-white p-3 shadow-lg dark:bg-slate-900">
        {shareHistory?.map((data: any) => (
          <section
            className="flex w-full flex-col items-start justify-center border-t-2 p-1 dark:border-slate-500"
            key={nanoid()}
          >
            {data.files.length > 0 ? (
              <div className=" font-semibold">
                {data.files[0]}
                {data.files.length === 1
                  ? ""
                  : `외 ${data.files.length - 1}개의 파일`}
              </div>
            ) : (
              <Link className="w-full" href={data?.link ? data.link : ""}>
                <div className="break-words font-semibold text-blue-600 decoration-blue-600 hover:underline">
                  {data.link}
                </div>
              </Link>
            )}
            <div className="break-words text-sm">{korDate(data.updated)}</div>
            {data.accessCode ? (
              <div className="ml-auto flex space-x-1">
                <Link
                  href={`/?code=${data.accessCode.replace(" ", "_")}`}
                  className=" break-words rounded-md bg-green-700 p-1 px-2 font-semibold text-white transition duration-200 hover:bg-green-600 hover:shadow-md"
                >
                  {data.accessCode}
                </Link>
                <DeleteShare id={data.id} mutate={mutate} />
              </div>
            ) : (
              <div className="ml-auto text-red-500 dark:text-red-400">
                만료됨
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

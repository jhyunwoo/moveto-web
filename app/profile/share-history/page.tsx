"use client"

import planColor from "@/lib/planColor"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import DeleteShare from "./DeleteShare"
import { useSession } from "next-auth/react"
import useShares from "@/lib/useShares"

function korDate(date: Date) {
  const sharedDate = new Date(date)
  const options: { dateStyle: "medium"; timeStyle: "short"; hour12: boolean } =
    {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: false,
    }
  return Intl.DateTimeFormat("ko-KR", options).format(sharedDate)
}
export default function SharesData() {
  const { data: session, status } = useSession()
  const {
    sharesData,
    page,
    setPage,
    sharesMutate,
    sharesLength,
    sharesLoading,
  } = useShares()

  return (
    <div className="flex min-h-screen w-full flex-col space-y-2 p-4 pb-24 dark:text-white">
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
        {sharesLoading && (
          <div className="flex flex-col space-y-2">
            <div className="h-28 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="h-28 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="h-28 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="h-28 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="h-28 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="h-28 w-full animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
          </div>
        )}
        {sharesData?.map((data: any) => (
          <section
            className="flex w-full flex-col items-start justify-center border-b-2 p-1 dark:border-slate-500"
            key={data.id}
          >
            {data.files.length > 0 ? (
              <div className=" font-semibold">
                {data.files[0]}
                {data.files.length === 1
                  ? ""
                  : `외 ${data.files.length - 1}개의 파일`}
              </div>
            ) : data.isLink ? (
              <a
                target="_blank"
                className="w-full"
                href={data?.text ? data.text : ""}
              >
                <div className="break-words font-semibold text-blue-600 decoration-blue-600 hover:underline">
                  {data.text}
                </div>
              </a>
            ) : (
              <div className="mb-1 break-words rounded-md bg-slate-100 p-1 px-2 font-semibold dark:bg-slate-800">
                {data.text}
              </div>
            )}
            <div className="mt-1 break-words text-sm">
              공유 시작: {korDate(data.updated)}
            </div>
            <div className="break-words text-sm">
              공유 종료: {korDate(data.expires)}
            </div>
            {data.accessCode ? (
              <div className="ml-auto flex items-center space-x-2">
                <Link
                  href={`/?c=${data.accessCode.replace(" ", "_")}`}
                  className=" break-words rounded-md bg-green-700 p-1 px-2 font-semibold text-white transition duration-200 hover:bg-green-600 hover:shadow-md"
                >
                  {data.accessCode}
                </Link>
                <DeleteShare id={data.id} mutate={sharesMutate} />
              </div>
            ) : data.created === data.updated ? (
              <div className="ml-auto flex items-center space-x-2">
                <div className="text-green-600 dark:text-green-400 ">
                  업로드 중...
                </div>
                <DeleteShare id={data.id} mutate={sharesMutate} />
              </div>
            ) : (
              <div className="ml-auto flex items-center space-x-2">
                <div className="text-red-500 dark:text-red-400">만료됨</div>
                <DeleteShare id={data.id} mutate={sharesMutate} />
              </div>
            )}
          </section>
        ))}
        <div className="mt-4 flex w-full items-center justify-end space-x-2 text-sm">
          {page > 1 && (
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-md   bg-green-100  p-1 px-3 transition  duration-200  hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800"
            >
              {page - 1}
            </button>
          )}
          <div className="rounded-md bg-green-500 p-1 px-4  font-semibold text-white transition duration-200 hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-500">
            {page}
          </div>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className={`rounded-md bg-green-100  p-1 px-3 transition  duration-200  hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 ${
              !(Math.ceil(sharesLength / 50) > page) && "invisible"
            }`}
          >
            {page + 1}
          </button>
        </div>
      </div>
    </div>
  )
}

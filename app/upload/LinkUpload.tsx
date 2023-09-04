"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { accessCode, alertState, loadingState } from "@/lib/recoil"
import { useSession } from "next-auth/react"
import getShareTime from "@/lib/getShareTime"
import getMaxShareTime from "@/lib/getMaxShareTime"
import convertMinutesToFormat from "@/lib/convertMinutesToFormat"

type Inputs = {
  text: string
  isLink: Boolean
  expires: number
}

export default function LinkUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Inputs>({ mode: "onBlur", defaultValues: { expires: 5 } })

  const { data: session } = useSession()

  const setAccessCode = useSetRecoilState(accessCode)
  const setLoading = useSetRecoilState(loadingState)
  const setAlert = useSetRecoilState(alertState)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const createShare = await fetch("/api/share/link", {
      method: "POST",
      body: JSON.stringify({
        text: data.text,
        isLink: data.isLink,
        expires: data.expires,
      }),
    })
    const shareInfo = await createShare.json()
    const requestCode = await fetch("/api/share/file/upload", {
      method: "PUT",
      body: JSON.stringify({ shareId: shareInfo.id, expires: data.expires }),
    })
    const createCode = await requestCode.json()
    if (createCode.result === "error") {
      setAlert({ message: "텍스트 공유 실패", warn: false, error: true })
    }
    setAccessCode(createCode.result.accessCode)
    setLoading(false)
  }
  function addTime(add: number, current: number) {
    if (current + add > getMaxShareTime(session)) {
      setValue("expires", getMaxShareTime(session))
    } else {
      setValue("expires", current + add)
    }
  }

  return (
    <div className="flex w-full flex-col items-start justify-center py-2 dark:text-white">
      <form
        className="mt-1 flex w-full flex-col items-center justify-center space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {watch("isLink") ? (
          <input
            placeholder={"Link"}
            className="mb-6 w-full break-words rounded-lg border-2 border-green-600 p-1 px-2 text-base font-semibold outline-none dark:bg-slate-800"
            {...register("text", {
              required: {
                value: true,
                message: "링크를 입력하세요.",
              },
            })}
          />
        ) : (
          <textarea
            placeholder={"Text"}
            className="h-18 w-full break-words rounded-lg border-2 border-green-600 p-1 px-2 text-base font-semibold outline-none dark:bg-slate-800"
            {...register("text", {
              required: {
                value: true,
                message: "텍스트를 입력하세요.",
              },
            })}
          />
        )}

        <div className="flex w-full flex-col rounded-lg border-2 border-green-500 p-2">
          <input
            className="w-full bg-slate-100 accent-green-500 dark:bg-slate-800"
            min={1}
            max={getMaxShareTime(session)}
            defaultValue={5}
            step={1}
            type="range"
            {...register("expires", {
              min: 1,
              max: getMaxShareTime(session),
            })}
          />

          <div className="mt-1 flex flex-col items-start justify-center">
            <div className="flex w-full space-x-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  addTime(5, Number(watch("expires")))
                }}
                className="rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
              >
                +5분
              </button>
              <button
                type="button"
                onClick={() => {
                  addTime(10, Number(watch("expires")))
                }}
                className={`rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900 ${
                  !session && "invisible"
                }`}
              >
                +10분
              </button>
              <button
                type="button"
                onClick={() => {
                  addTime(30, Number(watch("expires")))
                }}
                className={`rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900 ${
                  !session && "invisible"
                }`}
              >
                +30분
              </button>
              <button
                type="button"
                onClick={() => {
                  addTime(60, Number(watch("expires")))
                }}
                className={`rounded-md bg-slate-200 p-1 px-2 transition duration-200 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900 ${
                  !session && "invisible"
                }`}
              >
                +1시간
              </button>
            </div>
            <div className="ml-auto mt-1 text-sm">
              {convertMinutesToFormat(watch("expires"))} 동안 공유
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div
            className={`mr-auto mt-1 text-sm font-medium text-red-500 dark:text-red-400 ${
              !errors.text?.message && "invisible"
            }`}
          >
            {errors.text?.message}
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              {...register("isLink")}
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:border-slate-600 dark:bg-slate-700 dark:peer-checked:bg-green-400 dark:peer-focus:ring-green-800"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              링크로 공유
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 p-1 px-2 font-semibold text-white transition duration-150 hover:bg-green-700 sm:p-2"
        >
          공유
        </button>
        <div className="ml-auto mt-2">
          {session?.user.plan ? session?.user.plan + " Plan" : "Guest"} : 최대{" "}
          {getShareTime(session?.user.plan)} 동안 공유
        </div>
      </form>
    </div>
  )
}

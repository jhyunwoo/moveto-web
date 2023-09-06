"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  accessCode,
  alertState,
  loadingState,
  shareTimeState,
} from "@/lib/recoil"
import { useSession } from "next-auth/react"
import getMaxShareTime from "@/lib/getMaxShareTime"

type Inputs = {
  text: string
  isLink: Boolean
}

export default function LinkUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({ mode: "onBlur" })

  const { data: session } = useSession()

  const setAccessCode = useSetRecoilState(accessCode)
  const setLoading = useSetRecoilState(loadingState)
  const setAlert = useSetRecoilState(alertState)
  const shareTime = useRecoilValue(shareTimeState)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    if (shareTime > getMaxShareTime(session)) {
      setAlert({
        message: "최대 공유 시간을 초과하였습니다.",
        warn: true,
        error: false,
      })
      setLoading(false)
      return
    }
    const createShare = await fetch("/api/share/link", {
      method: "POST",
      body: JSON.stringify({
        text: data.text,
        isLink: data.isLink,
        expires: shareTime,
      }),
    })
    const shareInfo = await createShare.json()
    const requestCode = await fetch("/api/word", {
      method: "PUT",
      body: JSON.stringify({ shareId: shareInfo.id, expires: shareTime }),
    })
    const createCode = await requestCode.json()
    if (createCode.result === "error") {
      setAlert({ message: "텍스트 공유 실패", warn: false, error: true })
    }
    setAccessCode(createCode.result.accessCode)
    setLoading(false)
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
      </form>
    </div>
  )
}

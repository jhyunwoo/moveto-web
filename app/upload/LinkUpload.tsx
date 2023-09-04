"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { accessCode, alertState, loadingState } from "@/lib/recoil"
import { useSession } from "next-auth/react"
import getShareTime from "@/lib/getShareTime"
import getMaxShareTime from "@/lib/getMaxShareTime"

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
        {watch("text") && (
          <div className="w-full rounded-md border-2 border-green-500 p-2">
            <div className="text-lg font-semibold">공유 시간</div>
            <div className="flex flex-col">
              <div className="flex justify-around space-x-1">
                {!session && (
                  <>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 1
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 1)
                      }}
                    >
                      1분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 3
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 3)
                      }}
                    >
                      3분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 5
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 5)
                      }}
                    >
                      5분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 10
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 10)
                      }}
                    >
                      10분
                    </button>
                  </>
                )}
                {session?.user.plan === "Free" && (
                  <>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 5
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 5)
                      }}
                    >
                      5분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 10
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 10)
                      }}
                    >
                      10분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 30
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 30)
                      }}
                    >
                      30분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60)
                      }}
                    >
                      1시간
                    </button>
                  </>
                )}
                {session?.user.plan === "Baisc" && (
                  <>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 10
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 10)
                      }}
                    >
                      10분
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60)
                      }}
                    >
                      1시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 6
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 6)
                      }}
                    >
                      6시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 12
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 12)
                      }}
                    >
                      12시간
                    </button>
                  </>
                )}
                {session?.user.plan === "Pro" && (
                  <>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60)
                      }}
                    >
                      1시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 3
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 3)
                      }}
                    >
                      3시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 12
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 12)
                      }}
                    >
                      12시간
                    </button>
                    <button
                      className={` w-full rounded-md p-1 px-2 transition duration-200  ${
                        watch("expires") === 60 * 24
                          ? "bg-green-500  text-white dark:bg-green-600"
                          : "bg-slate-100 hover:bg-green-100 dark:bg-slate-800 dark:hover:bg-green-900"
                      } `}
                      type="button"
                      onClick={() => {
                        setValue("expires", 60 * 24)
                      }}
                    >
                      24시간
                    </button>
                  </>
                )}
              </div>
              <div className="mt-2 text-sm">사용자 설정</div>
              <div className="flex items-center space-x-1">
                <input
                  className="rounded-md p-1 px-2 outline-none dark:bg-slate-800"
                  {...register("expires", {
                    min: {
                      value: 1,
                      message: "올바른 시간을 입력해주세요.",
                    },
                    max: {
                      value: getMaxShareTime(session),
                      message: "최대 공유 시간을 초과하였습니다.",
                    },
                  })}
                />
                <div>분</div>
              </div>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 p-1 px-2 font-semibold text-white transition duration-150 hover:bg-green-700 sm:p-2"
        >
          공유
        </button>
        <div className="ml-auto mt-2">
          {session?.user.plan ? session?.user.plan : "Guest"} Plan: 최대{" "}
          {getShareTime(session?.user.plan)} 동안 공유
        </div>
      </form>
    </div>
  )
}

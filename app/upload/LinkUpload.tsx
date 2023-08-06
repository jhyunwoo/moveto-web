"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { accessCode, loadingState } from "@/lib/recoil"
import { useSession } from "next-auth/react"
import getShareTime from "@/lib/getShareTime"

type Inputs = {
  link: string
}

export default function LinkUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" })

  const { data: session } = useSession()

  const setAccessCode = useSetRecoilState(accessCode)
  const setLoading = useSetRecoilState(loadingState)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const createShare = await fetch("/api/share/link", {
      method: "POST",
      body: JSON.stringify({ link: data.link }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const shareInfo = await createShare.json()
    const requestCode = await fetch("/api/share/file/upload", {
      method: "PUT",
      body: JSON.stringify({ shareId: shareInfo.result.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const createCode = await requestCode.json()
    setAccessCode(createCode.result.accessCode)
    setLoading(false)
  }

  return (
    <div className='flex w-full flex-col items-start justify-center py-2'>
      <form
        className='mt-1 flex w-full flex-col items-center justify-center space-y-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder='https://moveto.kr'
          className='w-full break-words rounded-lg border-2 border-green-600 p-1 px-2 text-base font-semibold outline-none'
          {...register("link", {
            required: { value: true, message: "링크를 입력하세요." },
          })}
        />
        {errors.link && (
          <div className='mr-auto mt-1 text-sm font-medium text-red-500'>
            {errors.link.message}
          </div>
        )}
        <button
          type='submit'
          className='w-full rounded-lg bg-green-600 p-1 px-2 font-semibold text-white transition duration-150 hover:bg-green-700'
        >
          공유
        </button>
        <div className='ml-auto mt-2 text-sm'>
          {session?.user.plan} Plan: {getShareTime(session?.user.plan)} 동안
          공유
        </div>
      </form>
    </div>
  )
}

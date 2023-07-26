"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { accessCode } from "@/lib/recoil"

type Inputs = {
  link: string
}

export default function LinkUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onBlur" })

  const setAccessCode = useSetRecoilState(accessCode)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //링크 공유 생성
    // const requestAccessCode = await axios.post("/api/generateAccessCode", {
    //   fileId: createLink.id,
    // })
    // setAccessCode(requestAccessCode.data.random)
  }

  return (
    <div className='flex w-full flex-col items-start justify-center py-2'>
      <form
        className='mt-1 flex w-full flex-col items-center justify-center space-y-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder='https://moveto.kr'
          className='w-full rounded-lg border-2 border-green-600 p-1 px-2 text-base font-semibold outline-none'
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
      </form>
    </div>
  )
}

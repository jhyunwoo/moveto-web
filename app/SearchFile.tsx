"use client"

import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { useSetRecoilState } from "recoil"
import { alertState, loadingState } from "@/lib/recoil"
import { useRouter, useSearchParams } from "next/navigation"
import FileDownloadButton from "./FileDownloadButton"

type Inputs = {
  accessCode: string
}

export default function SearchFile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const router = useRouter()

  const [fileNames, setFileNames] = useState<string[]>([])
  const [fileUrl, setFileUrl] = useState<string[]>([])
  const [link, setLink] = useState("")

  const setAlert = useSetRecoilState(alertState)
  const setLoading = useSetRecoilState(loadingState)

  const params = useSearchParams()
  const paramsCode = params.get("code")?.replace("_", " ")

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (paramsCode === data.accessCode) {
      setLoading(true)
      const request = await fetch(`/api/share?code=${paramsCode}`, {
        method: "GET",
      })
      const shareInfo = await request.json()
      if (!shareInfo.share) {
        setLoading(false)
        setAlert({
          message: "접근 코드가 올바르지 않습니다.",
          warn: true,
          error: false,
        })
        return
      }

      if (shareInfo.share.files.length > 0) {
        const download = await fetch("api/share/file/download", {
          method: "POST",
          body: JSON.stringify({ files: shareInfo }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const signedUrl = await download.json()

        setFileUrl(signedUrl.urls)
        setFileNames(shareInfo.share.files)
        setLink("")
      } else if (shareInfo.share.link) {
        setFileNames([])
        setLink(shareInfo.share.link)
      }
      setLoading(false)
    } else {
      setLoading(true)
      const code = data.accessCode.replace(" ", "_")
      router.push(`/?code=${code}`)
      setLoading(false)
    }
  }

  useEffect(() => {
    async function getFileList() {
      setLoading(true)
      const request = await fetch(`/api/share?code=${paramsCode}`, {
        method: "GET",
      })
      const shareInfo = await request.json()
      if (!shareInfo.share) {
        setLoading(false)
        setAlert({
          message: "접근 코드가 올바르지 않습니다.",
          warn: true,
          error: false,
        })
        return
      }

      if (shareInfo.share.files.length > 0) {
        const download = await fetch("api/share/file/download", {
          method: "POST",
          body: JSON.stringify({ files: shareInfo }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const signedUrl = await download.json()

        setFileUrl(signedUrl.urls)
        setFileNames(shareInfo.share.files)
        setLink("")
      } else if (shareInfo.share.link) {
        setFileNames([])
        setLink(shareInfo.share.link)
      }
      setLoading(false)
    }

    if (paramsCode) {
      setValue("accessCode", paramsCode)
      getFileList()
    }
  }, [paramsCode, setAlert, setLoading, setValue])

  return (
    <div className='flex w-full flex-col rounded-lg bg-white p-2 shadow-lg '>
      <form className='flex w-full space-x-2' onSubmit={handleSubmit(onSubmit)}>
        <input
          className='w-full rounded-md p-1 text-center text-xl font-bold outline-none ring-2 ring-green-700'
          type='text'
          {...register("accessCode", {
            required: { value: true, message: "접근 코드를 입력해주세요." },
          })}
        />
        <button type='submit'>
          <MagnifyingGlassCircleIcon className='h-10 w-10 rounded-full text-green-700 transition duration-200 hover:bg-green-700 hover:text-white' />
        </button>
      </form>
      {errors.accessCode && <div>{errors.accessCode.message}</div>}
      {link ? (
        <div className='mt-4 w-full'>
          <div className='text-xl font-semibold'>공유된 링크</div>
          <a
            target='_blank'
            href={link}
            className='text-lg font-semibold text-blue-700 transition duration-100 hover:text-indigo-700 hover:underline'
          >
            {link}
          </a>
        </div>
      ) : (
        ""
      )}
      {fileNames.length > 0 && (
        <div className='mt-4 w-full'>
          <div className='text-xl font-semibold'>파일 다운로드</div>

          <div className='mt-2 flex w-full flex-col space-y-2'>
            {fileNames.map((data, key) => (
              <div
                key={nanoid()}
                className='flex w-full items-center justify-between border-t-2 p-2'
              >
                <div className='basis-5/6 break-words text-sm'>{data}</div>
                <FileDownloadButton
                  url={fileUrl[key]}
                  filename={fileNames[key]}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

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

export default function SearchFile({ ip }: { ip: string | null }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ shouldFocusError: false })

  const router = useRouter()

  const [fileNames, setFileNames] = useState<string[]>([])
  const [fileUrl, setFileUrl] = useState<string[]>([])
  const [text, setText] = useState("")
  const [isLink, setIsLink] = useState(false)

  const setAlert = useSetRecoilState(alertState)
  const setLoading = useSetRecoilState(loadingState)

  const params = useSearchParams()
  const paramsCode = params.get("c")?.replace("_", " ")

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
        setText("")
      } else if (shareInfo.share.text) {
        setFileNames([])
        setText(shareInfo.share.text)
        setIsLink(shareInfo.share.isLink)
      }
      setLoading(false)
    } else {
      setLoading(true)
      const code = data.accessCode.replace(" ", "_")
      router.push(`/?c=${code}`)
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

      if (ip) {
        await fetch("/api/share/user/access", {
          method: "PUT",
          body: JSON.stringify({ id: shareInfo.share.id, ip: ip }),
        })
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
        setText("")
      } else if (shareInfo.share.text) {
        setFileNames([])
        setText(shareInfo.share.text)
        setIsLink(shareInfo.share.isLink)
      }
      setLoading(false)
    }

    if (paramsCode) {
      try {
        setValue("accessCode", paramsCode)
        getFileList()
      } catch (e) {
        console.error(e)
      }
    }
  }, [paramsCode, setAlert, setLoading, setValue])

  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-3 shadow-lg dark:bg-slate-900 ">
      <form className="flex w-full space-x-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          className=" w-full rounded-md  p-1 text-center text-xl font-bold outline-none ring-2 ring-green-700 dark:bg-slate-800 dark:ring-green-400 dark:ring-offset-slate-800"
          type="text"
          autoFocus={false}
          {...register("accessCode", {
            required: { value: true, message: "접근 코드를 입력해주세요." },
          })}
        />
        <button type="submit">
          <MagnifyingGlassCircleIcon className="h-10 w-10 rounded-full text-green-700 transition duration-200 hover:bg-green-700 hover:text-white dark:text-green-400 hover:dark:bg-green-500" />
        </button>
      </form>
      {errors.accessCode && (
        <div className="mt-1 text-red-500">{errors.accessCode.message}</div>
      )}
      {text ? (
        isLink ? (
          <div className="mt-4 w-full">
            <div className="text-xl font-semibold">공유된 링크</div>
            <a
              target="_blank"
              href={text}
              className="break-words text-lg font-semibold text-blue-700 transition duration-100 hover:text-indigo-700 hover:underline"
            >
              {text}
            </a>
          </div>
        ) : (
          <div className="mt-4 w-full">
            <div className="text-xl font-semibold">공유된 텍스트</div>
            <div className="mt-1 break-words rounded-md bg-slate-100 p-2 text-lg font-semibold transition duration-100 dark:bg-slate-700  ">
              {text}
            </div>
          </div>
        )
      ) : (
        ""
      )}
      {fileNames.length > 0 && (
        <div className="mt-4 w-full">
          <div className="text-xl font-semibold">파일 다운로드</div>

          <div className="mt-2 flex w-full flex-col space-y-2">
            {fileNames.map((data, key) => (
              <div
                key={nanoid()}
                className="flex w-full items-center justify-between border-t-2 p-2 dark:border-slate-500"
              >
                <div className="basis-5/6 break-all pr-1 text-sm">{data}</div>
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

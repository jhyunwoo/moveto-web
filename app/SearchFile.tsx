"use client"

import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { alertState } from "@/lib/recoil"
import stringToArray from "@/lib/stringToArray"
import { useSearchParams } from "next/navigation"

type Inputs = {
  accessCode: string
}

type FileInfo = {
  id: string
  fileNames: string
  files: any[]
}

export default function SearchFile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const [file, setFile] = useState<FileInfo>()
  const [fileNames, setFileNames] = useState<string[]>([])
  const [link, setLink] = useState("")

  const setAlert = useSetRecoilState(alertState)
  const params = useSearchParams()
  const paramsCode = params.get("code")?.replace("_", " ")

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const fileInfo = await pb
        .collection("files")
        .getFirstListItem(`accessCode="${data.accessCode}"`)

      if (fileInfo.files.length > 0) {
        setFile({
          id: fileInfo.id,
          fileNames: fileInfo.fileNames,
          files: fileInfo.files,
        })
        setFileNames(stringToArray(fileInfo.fileNames))
      } else {
        setLink(fileInfo.link)
      }
    } catch {
      setAlert({ message: "접근 코드 오류", warn: false, error: true })
    }
  }

  async function downloadFileFromServer(i: number) {
    // eslint-disable-next-line no-restricted-syntax
    if (typeof file === undefined) return
    if (typeof file?.id !== "string") return

    const serverUrl = `https://api.moveto.kr/api/files/files/${file?.id}/${file?.files[i]}` // 서버의 파일 다운로드 API 엔드포인트

    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get(serverUrl, { responseType: "blob" }) // blob으로 응답을 받습니다.
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const a = document.createElement("a")
      a.href = url
      a.download = fileNames[i]
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url) // memory 해제
    } catch (error) {
      setAlert({ message: "파일 다운로드 실패", warn: false, error: true })
    }
  }

  useEffect(() => {
    async function getFileList() {
      try {
        const fileInfo = await pb
          .collection("files")
          .getFirstListItem(`accessCode="${paramsCode}"`)

        if (fileInfo.files.length > 0) {
          setFile({
            id: fileInfo.id,
            fileNames: fileInfo.fileNames,
            files: fileInfo.files,
          })
          setFileNames(stringToArray(fileInfo.fileNames))
        } else {
          setLink(fileInfo.link)
        }
      } catch {
        setAlert({ message: "접근 코드 오류", warn: false, error: true })
      }
    }
    if (paramsCode) {
      setValue("accessCode", paramsCode)

      getFileList()
    }
  }, [paramsCode, setAlert, setValue])

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
        <section className='mt-4 w-full'>
          <div className='text-xl font-semibold'>공유된 링크</div>
          <a
            href={link}
            className='text-lg font-semibold text-blue-700 transition duration-100 hover:text-indigo-700 hover:underline'
          >
            {link}
          </a>
        </section>
      ) : (
        ""
      )}
      {fileNames.length > 0 && (
        <section className='mt-4 w-full'>
          <div className='text-xl font-semibold'>파일 다운로드</div>
          <div className='mt-2 flex w-full flex-col space-y-2'>
            {fileNames.map((data, key) => (
              <section
                key={nanoid()}
                className='flex w-full items-center justify-between border-t-2 p-2'
              >
                <div className='text-sm'>{data}</div>

                <button
                  className='rounded-md bg-green-500 p-1 px-2 text-sm font-semibold text-white transition duration-150 hover:bg-green-600'
                  type='button'
                  onClick={() => downloadFileFromServer(key)}
                >
                  다운로드
                </button>
              </section>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

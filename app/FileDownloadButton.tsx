"use client"

import { alertState } from "@/lib/recoil"
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import React, { useState } from "react"
import { useSetRecoilState } from "recoil"

const FileDownloadButton = ({
  url,
  filename,
}: {
  url: string
  filename: string
}) => {
  const setAlert = useSetRecoilState(alertState)

  const [progress, setProgress] = useState(-1)

  const handleDownloadClick = async () => {
    setProgress(0)
    await axios({
      url: url,
      method: "GET",
      responseType: "blob", // important
      onDownloadProgress: (progressEvent) => {
        if (!progressEvent.total) return
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        ) // you can use this to show user percentage of file downloaded
        setProgress(percentCompleted)
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", filename) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
      .catch(() => {
        setAlert({ message: "파일 다운로드 실패", warn: false, error: true })
      })
  }

  return (
    <>
      {progress === -1 ? (
        <button
          onClick={handleDownloadClick}
          className='flex basis-1/6 items-center justify-center rounded-md bg-green-500 p-1 px-2 text-sm font-semibold text-white transition duration-150 hover:bg-green-600'
          type='button'
        >
          <ArchiveBoxArrowDownIcon className='h-6 w-6' />
        </button>
      ) : (
        <div className='flex basis-1/6 flex-col'>
          <progress
            max='100'
            value={progress}
            className='w-full [&::-moz-progress-bar]:bg-green-400 [&::-webkit-progress-bar]:rounded-full   [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-green-400'
          />
          <div className='ml-auto text-xs'>{progress}%</div>
        </div>
      )}
    </>
  )
}

export default FileDownloadButton

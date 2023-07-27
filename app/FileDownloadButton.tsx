import { alertState, fileDownloadingState } from "@/lib/recoil"
import React from "react"
import { useRecoilState, useSetRecoilState } from "recoil"

const FileDownloadButton = ({
  url,
  filename,
}: {
  url: string
  filename: string
}) => {
  const setAlert = useSetRecoilState(alertState)
  const setIsDownloading = useSetRecoilState(fileDownloadingState)
  const handleDownloadClick = () => {
    setIsDownloading(true)
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.blob()
      })
      .then((blob) => {
        // 파일 다운로드
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename // 파일 이름 설정
        a.style.display = "none" // 링크를 표시하지 않도록 설정
        document.body.appendChild(a)
        a.click()
        a.remove()
      })
      .catch(() => {
        setAlert({ message: "파일 다운로드 실패", warn: false, error: true })
      })
  }

  return (
    <button
      onClick={handleDownloadClick}
      className='rounded-md bg-green-500 p-1 px-2 text-sm font-semibold text-white transition duration-150 hover:bg-green-600'
      type='button'
    >
      다운로드
    </button>
  )
}

export default FileDownloadButton

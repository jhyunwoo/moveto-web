"use client"

import { alertState, loadingState } from "@/lib/recoil"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useSetRecoilState } from "recoil"

export default function DeleteShare({
  id,
  mutate,
}: {
  id: string
  mutate: () => {}
}) {
  const setAlert = useSetRecoilState(alertState)
  const setLoading = useSetRecoilState(loadingState)
  async function deleteShare(shareId: string) {
    setLoading(true)
    try {
      const requestDelete = await fetch("/api/share/user", {
        method: "DELETE",
        body: JSON.stringify({ id: shareId }),
      })
      const result = await requestDelete.json()
      console.log(result)
      setLoading(false)
      setAlert({ message: "삭제를 완료했습니다.", warn: true, error: false })
    } catch {
      setLoading(false)
      setAlert({ message: "삭제를 실패했습니다.", warn: false, error: true })
    }
    mutate()
  }

  return (
    <button
      onClick={() => deleteShare(id)}
      className="rounded-md bg-red-500 p-1 text-white transition duration-200 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
    >
      <TrashIcon className="h-6 w-6" />
    </button>
  )
}

"use client"

import { alertState, confirmActionState, loadingState } from "@/lib/recoil"
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
  const setConfirmAction = useSetRecoilState(confirmActionState)

  async function deleteShare(shareId: string) {
    setLoading(true)
    try {
      await fetch("/api/share/user", {
        method: "DELETE",
        body: JSON.stringify({ id: shareId }),
      })
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
      onClick={() =>
        setConfirmAction({
          message: "삭제 하시겠습니까?",
          action: () => deleteShare(id),
        })
      }
      className="rounded-md bg-red-500 p-1 text-white transition duration-200 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
    >
      <TrashIcon className="h-6 w-6" />
    </button>
  )
}

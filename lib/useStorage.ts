import useSWR from "swr"
import { useSession } from "next-auth/react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useStorage() {
  const { data: session } = useSession()
  const { data, error, isLoading, mutate } = useSWR(
    `/api/share/user/${session?.user.id}/usage`,
    fetcher
  )

  return {
    storageData: data?.totalUsage,
    storageError: error,
    storageLoading: isLoading,
    storageMutate: mutate,
  }
}

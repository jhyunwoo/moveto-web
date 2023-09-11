import useSWR from "swr"
import { useState } from "react"
import { useSession } from "next-auth/react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useShares() {
  const { data: session } = useSession()
  const [page, setPage] = useState(1)
  const { data, error, isLoading, mutate } = useSWR(
    `/api/share/user/${session?.user.id}/?page=${page}`,
    fetcher
  )
  return {
    sharesData: data?.data,
    sharesError: error,
    sharesLoading: isLoading,
    sharesMutate: mutate,
    sharesLength: data?.length,
    page,
    setPage,
  }
}

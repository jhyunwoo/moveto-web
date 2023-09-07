import { useSession } from "next-auth/react"

const ONEMB = 1024 * 1024
const ONEGB = 1024 * ONEMB

export default function usePlanLimit() {
  const { data: session, status } = useSession()

  let storage = 100 * ONEMB
  let time = 10

  if (session?.user.plan === "Free") {
    storage = 10 * ONEGB
    time = 60
  } else if (session?.user.plan === "Basic") {
    storage = 100 * ONEGB
    time = 60 * 12
  } else if (session?.user.plan === "Pro") {
    storage = 1024 * ONEGB
    time = 60 * 24
  }

  return { userStorage: storage, userTime: time, planLimitStatus: status }
}

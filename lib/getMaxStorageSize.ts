import type { Session } from "next-auth"

const ONEGB = 1024 * 1024 * 1024

export default function getMaxStorageSize(session: Session | null) {
  if (session?.user.plan === "Free") {
    return 10 * ONEGB
  } else if (session?.user.plan === "Basic") {
    return 100 * ONEGB
  } else if (session?.user.plan === "Pro") {
    return 1024 * ONEGB
  } else {
    return ONEGB
  }
}

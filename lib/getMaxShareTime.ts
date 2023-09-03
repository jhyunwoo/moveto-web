import type { Session } from "next-auth"

export default function getMaxShareTime(session: Session | null) {
  const userPlan = session?.user.plan
  if (userPlan === "Pro") {
    return 24 * 60
  } else if (userPlan === "Basic") {
    return 12 * 60
  } else if (userPlan === "Free") {
    return 60
  }
  return 10
}

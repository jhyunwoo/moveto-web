export default function getShareTime(plan?: string | null) {
  if (plan) {
    if (plan === "Free") {
      return "1시간"
    } else if (plan === "Basic") {
      return "12시간"
    } else if (plan === "Pro") {
      return "24시간"
    }
  } else {
    return "10분"
  }
}

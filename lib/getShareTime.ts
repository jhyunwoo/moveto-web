export default function getShareTime(plan?: string | null) {
  if (plan) {
    if (plan === "Free") {
      return "20분"
    } else if (plan === "Basic") {
      return "1시간"
    } else if (plan === "Pro") {
      return "2시간"
    }
  } else {
    return "5분"
  }
}

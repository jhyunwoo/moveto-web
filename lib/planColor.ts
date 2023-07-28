export default function planColor(plan: string | undefined | null) {
  if (plan === "Free" || plan === "FREE") {
    return "green-400"
  }
  if (plan === "Basic" || plan === "BASIC") {
    return "green-500"
  }
  if (plan === "Pro" || plan === "PRO") {
    return "green-600"
  }
  return "white"
}

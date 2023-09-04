export default function convertMinutesToFormat(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const min = minutes % 60
  if (hours > 0 && min === 0) {
    return `${hours}시간`
  } else if (hours > 0) {
    return `${hours}시간 ${min}분`
  } else {
    return `${min}분`
  }
}

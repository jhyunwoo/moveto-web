export default function replaceAll(
  strTemp: string,
  strValue1: string,
  strValue2: string
) {
  while (1) {
    if (strTemp.indexOf(strValue1) != -1) {
      strTemp = strTemp.replace(strValue1, strValue2)
    } else {
      break
    }
  }
  return strTemp
}

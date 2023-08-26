export default function getFileNameList(fileList: File[]) {
  let list = []
  for (let i = 0; i < fileList.length; i += 1) {
    list.push(fileList[i].name)
  }
  return list
}

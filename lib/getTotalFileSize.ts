/** 받은 파일 전체 크기 계산후 반환 */
export default function getTotalFileSize(files: File[]) {
  return files.reduce((acc, file) => acc + file.size, 0)
}

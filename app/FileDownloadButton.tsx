const FileDownloadButton = ({
  url,
  filename,
}: {
  url: string
  filename: string
}) => {
  return (
    <>
      <a
        href={url}
        download={filename}
        className='flex basis-1/6 items-center justify-center rounded-md bg-green-500 p-1 px-2 text-sm font-semibold text-white transition duration-150 hover:bg-green-600'
      >
        다운로드
      </a>
    </>
  )
}

export default FileDownloadButton

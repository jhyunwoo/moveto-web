import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline"

const FileDownloadButton = ({
  url,
  filename,
}: {
  url: string
  filename: string
}) => {
  return (
    <a
      href={url}
      download={filename}
      target="_blank"
      className="flex basis-1/6 items-center justify-center rounded-md bg-green-500 p-1 px-2 text-sm font-semibold text-white transition duration-150 hover:bg-green-600"
    >
      <ArchiveBoxArrowDownIcon className="h-6 w-6" />
    </a>
  )
}

export default FileDownloadButton

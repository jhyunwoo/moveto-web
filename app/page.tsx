import BottomBar from "@/app/BottomBar"
import { Metadata } from "next"
import SearchFile from "./SearchFile"
import replaceAll from "@/lib/replaceAll"
import Bottom from "@/components/Bottom"

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  let { code } = searchParams

  if (code) {
    code = code.replace("_", " ")
  }
  if (code === undefined) {
    code = ""
  }

  function ogImage() {
    if (code) {
      return [`/api/og/image?code=${escape(replaceAll(code, "\\", "%"))}`]
    }
    return ["/images/moveto-og.png"]
  }

  return {
    title: "모베토" + (code ? " | " + code : ""),
    description: "로그인 없이 쉽고 빠른 파일 공유",
    openGraph: {
      title: "모베토" + (code ? " | " + code : ""),
      description: "로그인 없이 쉽고 빠른 파일 공유",
      images: ogImage(),
    },
  }
}

export default function Home() {
  return (
    <>
      <div className='flex min-h-screen w-full flex-col items-center justify-center p-8  dark:text-white'>
        <BottomBar />
        <div className='flex w-full max-w-xl flex-col items-center justify-center'>
          <div className='mr-auto pb-1 pl-1 text-xl font-bold dark:text-white'>
            접근 코드
          </div>
          <SearchFile />
        </div>
      </div>
      <Bottom />
    </>
  )
}

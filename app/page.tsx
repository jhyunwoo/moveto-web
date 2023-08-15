import BottomBar from "@/components/BottomBar"
import { Metadata } from "next"
import SearchFile from "./SearchFile"
import replaceAll from "@/lib/replaceAll"
import Bottom from "@/components/Bottom"

export const runtime = "edge"

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
    openGraph: {
      images: ogImage(),
    },
  }
}

export default function Home() {
  return (
    <>
      <div className='flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-8'>
        <BottomBar />
        <div className='flex w-full max-w-xl flex-col items-center justify-center'>
          <div className='mr-auto pl-1 text-base font-bold'>접근 코드</div>
          <SearchFile />
        </div>
      </div>
      <Bottom />
    </>
  )
}

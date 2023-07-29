import BottomBar from "@/components/BottomBar"
import { Metadata, ResolvingMetadata } from "next"
import SearchFile from "./SearchFile"

export const runtime = "edge"

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  let { code } = searchParams

  if (code) {
    code = " | " + code.replace("_", " ")
  }
  if (code === undefined) {
    code = ""
  }

  function ogImage() {
    if (code) {
      return [`/api/og/image/${code}`]
    }
    return ["/images/moveto-og.png"]
  }

  return {
    title: "모베토" + code,
    openGraph: {
      images: ogImage(),
    },
  }
}

export default function Home() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-8 pb-24'>
      <BottomBar />
      <div className='flex w-full max-w-xl flex-col items-center justify-center'>
        <div className='mr-auto pl-1 text-base font-bold '>접근 코드</div>
        <SearchFile />
      </div>
    </div>
  )
}

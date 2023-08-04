import BottomBar from "@/components/BottomBar"
import { Metadata } from "next"
import SearchFile from "./SearchFile"
import replaceAll from "@/lib/replaceAll"
import Link from "next/link"

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
    <div>
      <div className='flex h-screen w-full flex-col items-center justify-center bg-slate-50 p-8'>
        <BottomBar />
        <div className='flex w-full max-w-xl flex-col items-center justify-center'>
          <div className='mr-auto pl-1 text-base font-bold'>접근 코드</div>
          <SearchFile />
        </div>
      </div>
      <div className='itmes-start flex flex-col justify-center space-y-2 bg-slate-100 p-4 pb-20 text-xs text-slate-700'>
        <div className=' text-slate-700'>
          Copyright 2023. Moveto Team. all rights reserved.
        </div>
        <div>Admin: jhyunwoo0228@gmail.com</div>
        <Link href={"https://github.com/jhyunwoo"} className='hover:underline'>
          Github
        </Link>
        <Link href={"/privacy"} className='hover:underline'>
          개인정보처리방침
        </Link>
      </div>
    </div>
  )
}

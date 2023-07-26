import BottomBar from "@/components/BottomBar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모베토",
  description: "쉽고 빠른 파일 전송",
}

export default function Home() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-8 pb-24'>
      <BottomBar />
      <div className='flex w-full max-w-xl flex-col items-center justify-center'>
        <div className='mr-auto pl-1 text-base font-bold '>접근 코드</div>
      </div>
    </div>
  )
}

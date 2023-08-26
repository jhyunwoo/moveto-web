import { EnvelopeIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import SignOut from "./SignOut"

export const metadata: Metadata = {
  title: "모베토 | 프로필",
  description: "쉽고 빠른 파일 전송",
}

export default async function User() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/auth/signin")

  return (
    <div className='min-h-screen w-full p-4 pb-24 dark:text-white'>
      <div className='columns-1 space-y-4 sm:columns-2 '>
        <div className='flex flex-col items-start justify-center space-y-1 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-900'>
          <div className='mb-1 w-full border-b-2 text-lg text-slate-600 dark:border-slate-500 dark:text-slate-300'>
            INFO
          </div>
          <div className='flex w-full justify-between '>
            <div className='py-1 text-lg font-semibold'>
              {session.user?.name}
            </div>
            <div className='flex items-center justify-center rounded-md bg-green-600 p-1 px-4 text-lg text-white'>
              {session.user?.plan}
            </div>
          </div>
          <div className='flex items-center space-x-1 pb-6 '>
            <EnvelopeIcon className='h-5 w-5 text-slate-800 ' />
            <div>{session.user?.email}</div>
          </div>
          <SignOut />
        </div>
        <Link
          href={"/profile/share-history"}
          className='flex flex-col items-start justify-center space-y-1 rounded-lg bg-white p-4 shadow-lg ring-2 ring-green-500 transition duration-200 hover:shadow-xl hover:ring-offset-1 dark:bg-slate-900 dark:ring-offset-slate-950 sm:items-center'
        >
          <div className='text-lg font-semibold'>공유 기록</div>
        </Link>
        <div className='flex flex-col items-start justify-center space-y-1 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-900'>
          <div className='grid w-full grid-cols-4 place-content-center content-center items-stretch gap-1'>
            {/* Plan */}
            <div className='col-span-4 pb-3 text-center text-xl font-bold'>
              Plan
            </div>
            <div className='p-1 text-center text-lg font-semibold'>Guest</div>
            <div className='rounded-md bg-green-400 p-1 text-center text-lg font-semibold text-white'>
              Free
            </div>
            <div className='rounded-md bg-green-500 p-1 text-center text-lg font-semibold text-white'>
              Basic
            </div>
            <div className='rounded-md bg-green-600 p-1 text-center text-lg font-semibold text-white'>
              Pro
            </div>
            {/* max upload size */}
            <div className='col-span-4 pt-3 text-center text-sm text-slate-700 dark:text-slate-300'>
              최대 업로드 크기
            </div>
            <div className='text-center text-lg'>1GiB</div>
            <div className='text-center text-lg font-semibold underline decoration-green-400 decoration-2 underline-offset-2'>
              10GiB
            </div>
            <div className='text-center text-lg font-semibold underline decoration-green-500 decoration-2 underline-offset-2'>
              100GiB
            </div>
            <div className='text-center text-lg font-semibold underline decoration-green-600 decoration-2 underline-offset-2'>
              1TiB
            </div>

            {/* 공유 지속 시간 */}
            <div className='col-span-4 pt-3 text-center text-sm text-slate-700 dark:text-slate-300'>
              공유 시간
            </div>
            <div className='text-center text-lg'>5분</div>
            <div className='text-center text-lg font-semibold underline decoration-green-400 decoration-2 underline-offset-2'>
              20분
            </div>
            <div className='text-center text-lg font-semibold underline decoration-green-500 decoration-2 underline-offset-2'>
              1시간
            </div>
            <div className='text-center text-lg font-semibold underline decoration-green-600 decoration-2 underline-offset-2'>
              2시간
            </div>
            <Link
              href='/user/change-plan'
              className='col-span-4 mt-4 hidden rounded-lg bg-gradient-to-r from-green-300 via-green-500 to-green-700 p-2 text-center font-semibold text-white transition duration-300 hover:shadow-lg'
            >
              플랜 변경
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

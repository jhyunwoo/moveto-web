import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import CenterLayout from "@/components/CenterLayout"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import SignInButton from "./SignInButton"
import Link from "next/link"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"

export const runtime = "edge"

export default async function SignIn() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/profile")

  return (
    <CenterLayout>
      <Link
        href={"/"}
        className='fixed left-8 top-8 flex items-center space-x-1 text-lg font-semibold text-green-600 transition duration-200  hover:text-green-700'
      >
        <ChevronDoubleLeftIcon className='h-6 w-6 ' />
        <div>홈</div>
      </Link>
      <div className='flex w-full max-w-lg flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
        <div className='p-4 text-2xl font-bold'>로그인</div>
        <div className='flex w-full flex-col space-y-2'>
          {/* <SignInButton
            provider='apple'
            providerName='Apple로 로그인'
            bgcolor='bg-black text-white hover:bg-slate-900'
          /> */}
          <SignInButton
            provider='google'
            providerName='Google로 로그인'
            bgcolor='border-2 border-black hover:bg-slate-100'
          />
          <SignInButton
            provider='github'
            providerName='Github로 로그인'
            bgcolor='bg-black text-white hover:bg-slate-900'
          />
        </div>
      </div>
    </CenterLayout>
  )
}

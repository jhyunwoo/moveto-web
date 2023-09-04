import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import CenterLayout from "@/components/CenterLayout"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import SignInButton from "./SignInButton"
import Link from "next/link"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"

export default async function SignIn() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/profile")

  return (
    <CenterLayout>
      <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg dark:bg-slate-900">
        <div className="p-4 text-2xl font-bold dark:text-white">로그인</div>
        <div className="flex w-full flex-col space-y-2">
          <SignInButton
            provider="google"
            providerName="Google로 로그인"
            bgcolor="border-2 border-black dark:border-slate-50 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
          />
          <SignInButton
            provider="github"
            providerName="Github로 로그인"
            bgcolor="bg-black text-white hover:bg-slate-800"
          />
        </div>
      </div>
    </CenterLayout>
  )
}

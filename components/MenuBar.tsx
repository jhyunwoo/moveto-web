import {
  ArchiveBoxArrowDownIcon,
  ArrowRightOnRectangleIcon,
  ArrowUpOnSquareStackIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import MenuBarButton from "./MenuBarButton"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"

export default async function MenuBar() {
  const session = await getServerSession(authOptions)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex w-full items-center justify-center p-2 sm:bottom-full sm:top-9 sm:justify-between sm:p-0">
      <div className="hidden flex-col bg-white/80 p-2 pl-4 font-semibold text-green-900 backdrop-blur-sm dark:bg-slate-950/80 dark:text-green-400 sm:flex sm:w-full sm:bg-slate-50/80 sm:dark:bg-slate-950/80">
        <Link href={"/"}>
          <h1 className="text-2xl">모베토</h1>
          <p className="text-sm font-medium">로그인 없이 쉽고 빠른 파일 공유</p>
        </Link>
      </div>
      <div className="flex w-full items-center justify-around space-x-2 rounded-3xl bg-white/80 p-2 shadow-lg backdrop-blur-sm dark:bg-slate-950/80 sm:justify-end sm:rounded-none sm:bg-slate-50/80 sm:p-2 sm:shadow-none sm:dark:bg-slate-950/80">
        <MenuBarButton href="/upload">
          <ArrowUpOnSquareStackIcon className="h-6 w-6 " />
          <p>업로드</p>
        </MenuBarButton>
        <MenuBarButton href="/">
          <ArchiveBoxArrowDownIcon className="h-6 w-6 " />
          <p>다운로드</p>
        </MenuBarButton>
        {session ? (
          <MenuBarButton href="/profile">
            <UserCircleIcon className="h-6 w-6 " />
            <p>프로필</p>
          </MenuBarButton>
        ) : (
          <MenuBarButton href="/auth/signin">
            <ArrowRightOnRectangleIcon className="h-6 w-6 " />
            <p>로그인</p>
          </MenuBarButton>
        )}
      </div>
    </div>
  )
}

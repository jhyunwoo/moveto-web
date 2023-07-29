import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import planColor from "@/lib/planColor"
import { prisma } from "@/lib/prisma"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import { nanoid } from "nanoid"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export const revalidate = 0

export default async function ShareHistory() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/auth/signin")

  const shareHistory = await prisma.shares.findMany({
    where: {
      user: {
        id: session.user.id!,
      },
    },
    orderBy: {
      updated: "desc",
    },
  })

  function korDate(date: Date) {
    const sharedDate = new Date(date)
    sharedDate.setHours(sharedDate.getHours() + 9)
    const options: { dateStyle: "long"; timeStyle: "medium" } = {
      dateStyle: "long",
      timeStyle: "medium",
    }
    return Intl.DateTimeFormat("ko-KR", options).format(sharedDate)
  }

  return (
    <div className='flex min-h-screen w-full flex-col space-y-2  p-4 pb-24'>
      <Link
        href={"/profile"}
        className='flex items-center space-x-1 text-green-600 transition duration-200 hover:text-green-700'
      >
        <ChevronDoubleLeftIcon className='h-6 w-6' />
        <div className='font-semibold'>프로필</div>
      </Link>

      <div className='flex flex-col p-3 '>
        <div className='flex w-full items-center justify-between'>
          <div>
            <div className='text-lg font-semibold'>{session.user.name}</div>
            <div className='text-sm'>{session.user.email}</div>
          </div>
          <div
            className={`font-semibold bg-${planColor(
              session.user.plan
            )} rounded-md p-1 px-3 text-white`}
          >
            {session.user.plan} Plan
          </div>
        </div>
      </div>
      <div className='mt-4 text-xl font-bold'>공유 기록</div>
      <div className='flex flex-col rounded-lg bg-white p-3 shadow-lg'>
        {shareHistory.map((data) => (
          <section
            className='flex w-full flex-col items-start justify-center border-t-2 p-1'
            key={nanoid()}
          >
            {data.files.length > 0 ? (
              <div className=' font-semibold'>
                {data.files[0]}
                {data.files.length === 1
                  ? ""
                  : `외 ${data.files.length - 1}개의 파일`}
              </div>
            ) : (
              <Link
                className=' font-semibold text-blue-600 decoration-blue-600 hover:underline'
                href={data.link!}
              >
                {data.link}
              </Link>
            )}
            <div className='text-sm'>{korDate(data.updated)}</div>
            {data.accessCode ? (
              <Link
                href={`/?code=${data.accessCode}`}
                className='ml-auto rounded-md bg-green-700 p-1 px-2 font-semibold text-white transition duration-200 hover:bg-green-600 hover:shadow-md'
              >
                {data.accessCode}
              </Link>
            ) : (
              <div className='ml-auto text-red-500'>만료됨</div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

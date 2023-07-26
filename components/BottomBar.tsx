import {
  ArchiveBoxArrowDownIcon,
  ArrowUpOnSquareStackIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"

export default function BottomBar() {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-10 flex w-full items-center justify-center p-2'>
      <div className='flex w-full items-center justify-around rounded-full bg-white/80 p-4 shadow-lg backdrop-blur-sm'>
        <Link
          href='/upload'
          className='flex w-full items-center justify-center '
        >
          <ArrowUpOnSquareStackIcon className='h-8 w-8 text-green-800' />
        </Link>
        <Link href='/' className='flex w-full items-center justify-center '>
          <ArchiveBoxArrowDownIcon className='h-8 w-8 text-green-800' />
        </Link>
        <Link href='/user' className='flex w-full items-center justify-center '>
          <UserCircleIcon className='h-8 w-8 text-green-800' />
        </Link>
      </div>
    </div>
  )
}

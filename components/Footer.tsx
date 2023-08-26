import Link from "next/link"

export default function Footer() {
  return (
    <div className='itmes-start flex flex-col justify-center space-y-2 bg-slate-100 p-4 pb-20 text-xs text-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:pb-4'>
      <div>Copyright 2023. Moveto Team. all rights reserved.</div>
      <div>Admin: jhyunwoo0228@gmail.com</div>
      <Link href={"https://github.com/jhyunwoo"} className='hover:underline'>
        Github
      </Link>
      <Link href={"/privacy"} className='hover:underline'>
        개인정보처리방침
      </Link>
    </div>
  )
}

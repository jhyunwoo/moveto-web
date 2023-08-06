import Link from "next/link";

export default function Bottom() {
  return (
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
  )
}

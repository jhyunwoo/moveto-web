"use client"
import { signOut } from "next-auth/react"

export default function SignOut() {
  return (
    <button
      type='button'
      onClick={() => signOut()}
      className=' w-full font-semibold text-green-700 transition duration-150  hover:text-green-800'
    >
      로그아웃
    </button>
  )
}

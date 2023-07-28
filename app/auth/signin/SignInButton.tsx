"use client"

import { signIn } from "next-auth/react"

export default function SignInButton({
  provider,
  providerName,
  bgcolor,
}: {
  provider: string
  providerName: string
  bgcolor: string
}) {
  return (
    <button
      onClick={() => signIn(provider)}
      className={`${bgcolor} w-full rounded-lg p-2 text-center font-semibold transition duration-200`}
    >
      {providerName}
    </button>
  )
}

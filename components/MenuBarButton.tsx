"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export default function ButtonLayout({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={`flex w-full flex-col items-center justify-center rounded-3xl p-1 px-2 text-xs transition duration-200  sm:w-auto sm:rounded-lg sm:px-6 sm:text-sm ${
        href === pathname
          ? "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400"
          : "text-green-800 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-950"
      }`}
    >
      {children}
    </Link>
  )
}

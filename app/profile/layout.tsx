import { getServerSession } from "next-auth"
import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth-options"

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/auth/signin")

  return <section className="sm:pt-20">{children}</section>
}

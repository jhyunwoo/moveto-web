import ConfirmAction from "@/components/ConfirmAction"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth-options"

export const metadata: Metadata = {
  title: "Moveto | 공유 기록",
  description: "쉽고 빠른 파일 전송",
  openGraph: {
    title: "Moveto | 공유 기록",
    description: "쉽고 빠른 파일 공유",
  },
}

export default async function ShareHistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth/signin")

  return (
    <section>
      <ConfirmAction />
      {children}
    </section>
  )
}

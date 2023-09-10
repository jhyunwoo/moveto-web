import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Moveto | 플랜 변경",
  description: "쉽고 빠른 파일 공유",
  openGraph: {
    title: "Moveto | 플랜 변경",
    description: "쉽고 빠른 파일 공유",
  },
}

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth/signin")

  return <section>{children}</section>
}

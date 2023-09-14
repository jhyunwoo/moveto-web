import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ConfirmAction from "@/components/ConfirmAction"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Moveto | 업로드",
  description: "쉽고 빠른 파일 전송",
  openGraph: {
    title: "Moveto | 업로드",
    description: "쉽고 빠른 파일 공유",
  },
}

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return <section>{children}</section>
}

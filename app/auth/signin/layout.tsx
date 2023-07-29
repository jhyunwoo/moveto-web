import BottomBar from "@/components/BottomBar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모베토 | 로그인",
  description: "쉽고 빠른 파일 전송",
}

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}

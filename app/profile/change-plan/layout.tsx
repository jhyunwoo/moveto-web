import BottomBar from "@/components/BottomBar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모베토 | 플랜 변경",
  description: "쉽고 빠른 파일 공유",
  openGraph: {
    title: "모베토 | 플랜 변경",
    description: "쉽고 빠른 파일 공유",
  },
}

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}

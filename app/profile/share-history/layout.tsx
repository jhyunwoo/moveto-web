import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모베토 | 공유 기록",
  description: "쉽고 빠른 파일 전송",
  openGraph: {
    title: "모베토 | 공유 기록",
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

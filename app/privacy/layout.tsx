import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모베토 | 개인정보처리방침",
  description: "모베토 개인정보 처리방침",
  openGraph: {
    title: "모베토 | 개인정보처리방침",
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

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모베토 | 개인정보처리방침",
  description: "모베토 개인정보 처리방침",
}

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}

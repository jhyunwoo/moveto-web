import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모베토 | 로그인",
  description: "쉽고 빠른 파일 공유",
  openGraph: {
    title: "모베토 | 로그인",
    description: "쉽고 빠른 파일 공유",
  },
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}

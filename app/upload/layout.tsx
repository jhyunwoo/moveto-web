import { Metadata } from "next"

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

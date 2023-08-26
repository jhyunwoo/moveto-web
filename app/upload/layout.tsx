import Footer from "@/components/Footer"
import MenuBar from "@/components/MenuBar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모베토 | 업로드",
  description: "쉽고 빠른 파일 공유",
  openGraph: {
    title: "모베토 | 업로드",
    description: "쉽고 빠른 파일 공유",
  },
}

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <MenuBar />
      {children}
      <Footer />
    </section>
  )
}

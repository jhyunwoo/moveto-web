import ConfirmAction from "@/components/ConfirmAction"
import Footer from "@/components/Footer"
import MenuBar from "@/components/MenuBar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "모베토 | 프로필",
  description: "쉽고 빠른 파일 전송",
  openGraph: {
    title: "모베토 | 프로필",
    description: "쉽고 빠른 파일 공유",
  },
}

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="sm:pt-16">
      <MenuBar />
      {children}
      <ConfirmAction />
      <Footer />
    </section>
  )
}

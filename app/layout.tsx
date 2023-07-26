import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import AuthProvider from "./AuthProvider"
import Recoil from "@/components/Recoil"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "모베토",
  description: "쉽고 빠른 파일 공유",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang='kr'>
        <body className={inter.className}>
          <Recoil>{children}</Recoil>
        </body>
      </html>
    </AuthProvider>
  )
}

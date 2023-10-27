import "./globals.css"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import AuthProvider from "../components/AuthProvider"
import Recoil from "@/components/Recoil"
import Alert from "@/components/Alert"
import AlertWithLink from "@/components/AlertWithLink"
import Loading from "@/components/Loading"
import MenuBar from "@/components/MenuBar"
import Footer from "@/components/Footer"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Moveto",
  description: "쉽고 빠른 파일 공유",
  metadataBase: new URL("https://www.moveto.kr"),
  openGraph: {
    title: "Moveto",
    description: "쉽고 빠른 파일 공유",
    images: "/images/moveto-og.png",
    type: "website",
    url: "https://www.moveto.kr",
    siteName: "Moveto",
    locale: "ko_KR",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/images/favicons/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/images/favicons/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: { url: "/images/favicons/apple-icon.png", type: "image/png" },
    other: [
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/images/splashscreens/iPhone_14_Pro_Max_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/images/splashscreens/iPhone_14_Pro_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/images/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/images/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/images/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/images/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/iPhone_11__iPhone_XR_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
        url: "/images/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/12.9__iPad_Pro_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/10.9__iPad_Air_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/10.5__iPad_Air_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/10.2__iPad_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
        url: "/images/splashscreens/8.3__iPad_Mini_landscape.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/images/splashscreens/iPhone_14_Pro_Max_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/images/splashscreens/iPhone_14_Pro_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/images/splashscreens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/images/splashscreens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/images/splashscreens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/images/splashscreens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/iPhone_11__iPhone_XR_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
        url: "/images/splashscreens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/12.9__iPad_Pro_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/10.9__iPad_Air_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/10.5__iPad_Air_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/10.2__iPad_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
      },
      {
        rel: "apple-touch-startup-image",
        media:
          "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
        url: "/images/splashscreens/8.3__iPad_Mini_portrait.png",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kr" className="bg-slate-50 dark:bg-slate-950">
      <body>
        <AuthProvider>
          <Recoil>
            <MenuBar />
            {children}
            <Footer />
            <Analytics />
            <Alert />
            <AlertWithLink />
            <Loading />
          </Recoil>
        </AuthProvider>
      </body>
    </html>
  )
}

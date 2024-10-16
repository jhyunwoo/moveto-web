import { Metadata } from "next"
import SearchFile from "@/components/SearchFile"
import replaceAll from "@/lib/replaceAll"
import { headers } from "next/headers"
import Link from "next/link"

type Props = {
  searchParams: { [key: string]: string | undefined }
}

function ogImage(c: string) {
  if (c) {
    return [`/api/og/image?code=${escape(replaceAll(c, "\\", "%"))}`]
  }
  return ["/images/moveto-og.png"]
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  try {
    let { c } = searchParams

    if (c) {
      c = c.replace("_", " ")
    }
    if (c === undefined) {
      c = ""
    }

    return {
      title: "Moveto" + (c ? " | " + c : ""),
      description: "로그인 없이 쉽고 빠른 파일 공유",
      openGraph: {
        title: "Moveto" + (c ? " | " + c : ""),
        description: "로그인 없이 쉽고 빠른 파일 공유",
        images: ogImage(c),
      },
    }
  } catch (e) {
    console.error(e)
    return {
      title: "Moveto",
      description: "로그인 없이 쉽고 빠른 파일 공유",
      openGraph: {
        title: "Moveto",
        description: "로그인 없이 쉽고 빠른 파일 공유",
        images: ["/images/moveto-og.png"],
      },
    }
  }
}

export default function Home() {
  const ip = headers().get("x-forwarded-for")

  return (
    <div className=" flex min-h-screen w-full flex-col items-center justify-center p-8 dark:text-white sm:pt-16">
      <div className="flex w-full max-w-xl flex-col items-center justify-center">
        <div className={'w-full flex items-center justify-start'}>
          <div className="mr-auto pb-1 pl-2 text-xl font-semibold dark:text-white">
            코드
          </div>
        </div>
        <SearchFile ip={ip} />
        <Link href={'https://www.moveto.kr'} className={'hover:underline'}>새로운 Moveto 버전 출시! (Beta)</Link>
      </div>
    </div>
  )
}

import { Metadata } from "next"
import SearchFile from "@/components/SearchFile"
import replaceAll from "@/lib/replaceAll"

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  let { c } = searchParams

  if (c) {
    c = c.replace("_", " ")
  }
  if (c === undefined) {
    c = ""
  }

  function ogImage() {
    if (c) {
      return [`/api/og/image?code=${escape(replaceAll(c, "\\", "%"))}`]
    }
    return ["/images/moveto-og.png"]
  }

  return {
    title: "모베토" + (c ? " | " + c : ""),
    description: "로그인 없이 쉽고 빠른 파일 공유",
    openGraph: {
      title: "모베토" + (c ? " | " + c : ""),
      description: "로그인 없이 쉽고 빠른 파일 공유",
      images: ogImage(),
    },
  }
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-8 dark:text-white sm:pt-16">
      <div className="flex w-full max-w-xl flex-col items-center justify-center">
        <div className="mr-auto pb-1 pl-2 text-xl font-semibold dark:text-white">
          코드
        </div>
        <SearchFile />
      </div>
    </div>
  )
}

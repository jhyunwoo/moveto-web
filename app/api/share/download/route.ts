import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  const accessCode = code?.replace("_", " ")

  const findCode = await prisma.shares.findFirst({
    where: { accessCode: accessCode },
  })

  return NextResponse.json({ share: findCode })
}

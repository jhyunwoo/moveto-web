import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth-options"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions)
  if (session?.user.id !== params.userId)
    return NextResponse.json({ message: "Access Denied" })

  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page"))

  try {
    const shareHistory = await prisma.shares.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        updated: "desc",
      },
      take: 50,
      skip: 50 * (page - 1),
      select: {
        id: true,
        files: true,
        text: true,
        isLink: true,
        expires: true,
        accessCode: true,
        updated: true,
        created: true,
      },
    })
    const shareLength = await prisma.shares.count({
      where: {
        userId: params.userId,
      },
    })
    return NextResponse.json({ data: shareHistory, length: shareLength })
  } catch {
    return NextResponse.json(
      { message: "Can not find share history" },
      { status: 500 }
    )
  }
}

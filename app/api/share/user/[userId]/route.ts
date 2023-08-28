import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const session = getServerSession(authOptions)
  if (!session) return NextResponse.json({ message: "Access Denied" })
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
    })
    const shareLength = await prisma.shares.count({
      where: {
        userId: params.userId,
      },
    })
    return NextResponse.json({ data: shareHistory, length: shareLength })
  } catch {
    return NextResponse.json({ message: "Can not find share history" })
  }
}

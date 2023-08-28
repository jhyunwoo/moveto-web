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

  try {
    const shareHistory = await prisma.shares.findMany({
      where: {
        userId: params.userId,
      },
      orderBy: {
        updated: "desc",
      },
    })
    return NextResponse.json(shareHistory)
  } catch {
    return NextResponse.json({ message: "Can not find share history" })
  }
}

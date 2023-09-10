import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions)
  if (session?.user.id !== params.userId)
    return NextResponse.json({ message: "Access Denied" })
  const storageUsage = await prisma.shares.findMany({
    where: {
      size: {
        gt: 0,
      },
    },
  })
  let totalUsage = 0
  for (let i = 0; i < storageUsage.length; i += 1) {
    totalUsage += Number(storageUsage[i].size)
  }
  return NextResponse.json({ totalUsage: totalUsage })
}

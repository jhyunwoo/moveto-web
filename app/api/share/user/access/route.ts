import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const requestData = await request.json()
  const { id, ip } = requestData

  const addAccessLog = await prisma.shares.update({
    where: {
      id: id,
    },
    data: {
      downloads: {
        push: ip,
      },
    },
  })
  return NextResponse.json(addAccessLog)
}

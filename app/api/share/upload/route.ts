import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestData = await request.json()
  const { fileList } = requestData

  return NextResponse.json({ result: true })
}

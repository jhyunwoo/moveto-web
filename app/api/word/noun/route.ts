import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  if (process.env.NODE_ENV === "development") {
    const nouns = await prisma.nouns.findMany()
    return NextResponse.json(nouns)
  } else {
    return NextResponse.json({ message: "Not Found" })
  }
}

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  if (process.env.NODE_ENV === "development") {
    const adjectives = await prisma.adjectives.findMany()
    return NextResponse.json(adjectives)
  } else {
    return NextResponse.json({ message: "Not Found" })
  }
}

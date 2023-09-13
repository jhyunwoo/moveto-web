import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (process.env.NODE_ENV === "development" && session) {
    const adjectives = await prisma.adjectives.findMany()
    return NextResponse.json(adjectives)
  } else {
    return NextResponse.json({ message: "Not Found" })
  }
}

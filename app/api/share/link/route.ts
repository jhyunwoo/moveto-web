import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const requestData = await request.json()
  const { text, isLink } = requestData

  const session = await getServerSession(authOptions)

  let createLink

  if (session?.user?.id) {
    createLink = await prisma.shares.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        text: text,
        isLink: isLink,
      },
    })
  } else {
    createLink = await prisma.shares.create({
      data: {
        text: text,
        isLink: isLink,
      },
    })
  }

  return NextResponse.json(createLink)
}

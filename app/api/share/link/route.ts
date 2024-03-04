import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth-options"

export async function POST(request: Request) {
  const requestData = await request.json()
  const { text, isLink, expires } = requestData

  const session = await getServerSession(authOptions)

  let createLink
  const expiresTime = new Date()
  expiresTime.setMinutes(expiresTime.getMinutes() + expires)

  if (session?.user?.id) {
    createLink = await prisma.shares.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        text: text,
        isLink: isLink,
        expires: expiresTime,
      },
    })
  } else {
    createLink = await prisma.shares.create({
      data: {
        text: text,
        isLink: isLink,
        expires: expiresTime,
      },
    })
  }

  return NextResponse.json(createLink.id)
}

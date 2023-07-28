import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

/** get file info from Database */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  const accessCode = code?.replace("_", " ")

  const findCode = await prisma.shares.findFirst({
    where: { accessCode: accessCode },
  })

  return NextResponse.json({ share: findCode })
}

export async function DELETE(request: Request) {
  const requestData = await request.json()
  const { id, password } = requestData
  if (id !== process.env.DELETE_ID || password !== process.env.DELETE_PASSWORD)
    return NextResponse.json({ fileKeys: "auth error" })
  const currentTime = new Date()
  const shareList = await prisma.shares.findMany({
    where: {
      accessCode: {
        not: null,
      },
    },
    include: {
      user: true,
    },
  })

  let targetList: any[] = []

  for (let i = 0; i < shareList.length; i += 1) {
    if (!shareList[i]) return

    let downloadTime = 5 * 60000
    if (shareList[i]?.user?.plan) {
      if (shareList[i].user?.plan === "Free") {
        downloadTime = 20 * 60000
      } else if (shareList[i].user?.plan === "Basic") {
        downloadTime = 60 * 60000
      } else if (shareList[i].user?.plan === "Pro") {
        downloadTime = 120 * 60000
      }
    }
    let createdDate = new Date(shareList[i].updated)
    const expireTime = new Date(createdDate.getTime() + downloadTime)
    if (expireTime < currentTime) {
      targetList.push(shareList[i])
    }
  }

  function makeQuery() {
    let prismaTransaction = []
    for (let i = 0; i < targetList.length; i += 1) {
      prismaTransaction.push(
        prisma.shares.update({
          where: { id: targetList[i].id }, // 업데이트할 레코드를 식별하는 필터
          data: {
            accessCode: null, // 업데이트할 필드 및 값
          },
        })
      )
    }
    return prismaTransaction
  }

  try {
    const result = await prisma.$transaction(makeQuery())
  } catch {}
  return NextResponse.json({ fileKeys: targetList })
}

export async function POST(request: Request) {
  const requestData = await request.json()
  const { files } = requestData

  const session = await getServerSession(authOptions)

  const fileList: string[] = []
  for (let i = 0; i < files.length; i += 1) {
    fileList.push(files[i].name)
  }

  let createShare
  if (session?.user?.id) {
    createShare = await prisma.shares.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        files: fileList,
      },
    })
  } else {
    createShare = await prisma.shares.create({
      data: {
        files: fileList,
      },
    })
  }
  return NextResponse.json(createShare)
}

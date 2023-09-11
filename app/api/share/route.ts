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
    select: {
      id: true,
      files: true,
      text: true,
      isLink: true,
    },
  })

  return NextResponse.json(findCode)
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
  })

  let targetList: any[] = []

  for (let i = 0; i < shareList.length; i += 1) {
    if (shareList[i].expires == null) return
    if (shareList[i].expires < currentTime) {
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
            size: 0,
          },
        })
      )
    }
    return prismaTransaction
  }

  try {
    const result = await prisma.$transaction(makeQuery())
    return NextResponse.json({ fileKeys: targetList })
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}

/** create share data on DB */
export async function POST(request: Request) {
  const requestData = await request.json()
  const { files, totalSize } = requestData

  const session = await getServerSession(authOptions)
  const expireTime = new Date()
  expireTime.setMinutes(expireTime.getMinutes() + 60 * 24)

  let createShare
  if (session?.user?.id) {
    createShare = await prisma.shares.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        files: files,
        expires: expireTime,
        size: BigInt(totalSize),
      },
    })
  } else {
    createShare = await prisma.shares.create({
      data: {
        files: files,
        expires: expireTime,
        size: BigInt(totalSize),
      },
    })
  }
  return NextResponse.json(createShare.id)
}

/** request abort upload files */
export async function PUT(request: Request) {
  // cancle current file upload
  // delet already uploaded files (single files and multipart files)
  // abort multipart upload
  return NextResponse.json({ message: "Abort Uploading files" })
}

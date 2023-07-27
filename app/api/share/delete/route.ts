import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
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
  let r2Keys: string[] = []

  for (let i = 0; i < shareList.length; i += 1) {
    r2Keys = [...r2Keys, ...shareList[i].files]
    let downloadTime = 5 * 60000
    if (shareList[i]?.user?.plan) {
      if (shareList[i].user.plan === "Free") {
        downloadTime = 10 * 60000
      } else if (shareList[i].user.plan === "Basic") {
        downloadTime = 30 * 60000
      } else if (shareList[i].user.plan === "Basic") {
        downloadTime = 60 * 60000
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
    const result = await prisma.$transaction(makeQuery)
    console.log(result)
  } catch {
    console.log("ERROR")
  }

  return NextResponse.json({ fileKeys: r2Keys })
}

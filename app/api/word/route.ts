import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

/** get access code after upload file */
export async function PUT(request: Request) {
  const requestData = await request.json()
  const { shareId, expires }: { shareId: string; expires: number } = requestData

  const nounLength = await prisma.nouns.count()
  const adjLength = await prisma.adjectives.count()

  try {
    let randomSentence = ""

    while (true) {
      const nounRandom = Math.floor(Math.random() * nounLength)
      const adjRandom = Math.floor(Math.random() * adjLength)
      const nounWord = await prisma.nouns
        .findFirst({
          skip: nounRandom,
        })
        .then((event) => event?.word)
      const adjWord = await prisma.adjectives
        .findFirst({ skip: adjRandom })
        .then((event) => event?.word)

      randomSentence = `${adjWord} ${nounWord}`

      const checkUnique = await prisma.shares.findUnique({
        where: {
          accessCode: randomSentence,
        },
      })
      if (checkUnique === null) break
    }

    const currentTime = new Date()
    const expireTime = new Date()
    expireTime.setMinutes(expireTime.getMinutes() + Number(expires))

    const updateShare = await prisma.shares.update({
      where: {
        id: shareId,
      },
      data: {
        accessCode: randomSentence,
        updated: currentTime,
        expires: expireTime,
      },
    })

    return NextResponse.json(updateShare.accessCode)
  } catch {
    return NextResponse.json({ result: "error" }, { status: 500 })
  }
}

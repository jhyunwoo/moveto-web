import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const requestData = await request.json()
  const { shareId } = requestData

  const nounList = await prisma.nouns.findMany()
  const adjList = await prisma.adjectives.findMany()

  try {
    let randomSentence = ""

    while (true) {
      const adjNumber = Math.floor(Math.random() * adjList.length)
      const nounNumber = Math.floor(Math.random() * nounList.length)

      const randomAdj = adjList[adjNumber].word
      const randomNoun = nounList[nounNumber].word

      randomSentence = `${randomAdj} ${randomNoun}`

      const checkUnique = await prisma.shares.findUnique({
        where: {
          accessCode: randomSentence,
        },
      })
      if (checkUnique === null) break
    }

    const currentTime = new Date()

    const updateShare = await prisma.shares.update({
      where: {
        id: shareId,
      },
      data: {
        accessCode: randomSentence,
        updated: currentTime,
      },
    })

    return NextResponse.json({ result: updateShare })
  } catch {
    return NextResponse.json({ result: "error" })
  }
}

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

function korDate(date: Date) {
  const sharedDate = new Date(date)
  const options: { dateStyle: "long"; timeStyle: "medium" } = {
    dateStyle: "long",
    timeStyle: "medium",
  }
  return Intl.DateTimeFormat("ko-KR", options).format(sharedDate)
}

/** get Pre-Signed URL from R2 Bucket */
export async function POST(request: Request) {
  const requestData = await request.json()
  const {
    files,
    shareId,
  }: { files: { name: string; type: string }[]; shareId: string } = requestData

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESSKEY!,
      secretAccessKey: process.env.R2_PRIVITEKEY!,
    },
  })

  const signedUrls = []

  for (let i = 0; i < files.length; i += 1) {
    const fileKey = shareId + "/" + files[i].name

    const command = new PutObjectCommand({
      Bucket: "moveto-bucket",
      Key: fileKey,
      ContentType: files[i].type,
    })

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 })
    signedUrls.push(signedUrl)
  }

  return NextResponse.json(signedUrls)
}

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

    return NextResponse.json({ result: updateShare })
  } catch {
    return NextResponse.json({ result: "error" })
  }
}

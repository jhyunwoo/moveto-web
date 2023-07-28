import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

/** get Pre-Signed URL from R2 Bucket */
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

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESSKEY!,
      secretAccessKey: process.env.R2_PRIVITEKEY!,
    },
  })

  type UploadUrlType = {
    fileName: string
    key: string
    uploadUrl: string
  }

  const uploadUrl: UploadUrlType[] = []

  for (let i = 0; i < files.length; i += 1) {
    const fileKey = createShare.id + "/" + files[i].name
    console.log(fileKey)

    const command = new PutObjectCommand({
      Bucket: "moveto-bucket",
      Key: fileKey,
      ContentType: files[i].type,
    })

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 })

    uploadUrl.push({
      fileName: files[i].name,
      key: fileKey,
      uploadUrl: signedUrl,
    })
  }

  return NextResponse.json({ urlList: uploadUrl, share: createShare })
}

/** get access code after upload file */
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

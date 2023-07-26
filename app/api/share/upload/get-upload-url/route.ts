import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { nanoid } from "nanoid"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(request: Request) {
  const requestData = await request.json()
  const { files } = requestData

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESSKEY!,
      secretAccessKey: process.env.R2_PRIVITEKEY!,
    },
  })

  function getExtension(fileName: string) {
    const fileLength = fileName.length
    const lastDot = fileName.lastIndexOf(".")
    const fileExtension = fileName.substring(lastDot, fileLength)
    return fileExtension
  }

  const uploadUrl = []
  const fileNamesList: string[] = []
  const filesList: string[] = []

  for (let i = 0; i < files.length; i += 1) {
    const fileKey = nanoid() + getExtension(files[i].name)
    filesList.push(fileKey)
    fileNamesList.push(files[i].name)
    const signedUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: "moveto-bucket",
        Key: fileKey,
      }),
      { expiresIn: 3600 }
    )
    uploadUrl.push({
      fileName: files[i].name,
      key: fileKey,
      uploadUrl: signedUrl,
    })
  }
  console.log(uploadUrl)
  const session = await getServerSession(authOptions)
  let createShare
  if (session?.user?.id) {
    createShare = await prisma.shares.create({
      data: {
        user: {
          connect: { id: session.user.id },
        },
        fileNames: fileNamesList,
        files: filesList,
      },
    })
  } else {
    createShare = await prisma.shares.create({
      data: {
        fileNames: fileNamesList,
        files: filesList,
      },
    })
  }

  return NextResponse.json({ urlList: uploadUrl, share: createShare })
}

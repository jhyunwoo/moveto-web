import { prisma } from "@/lib/prisma"
import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"
import { nextTick } from "process"

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ message: "Access Denied" })
  const requestData = await request.json()
  const { id } = requestData

  const findShare = await prisma.shares.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },
  })

  if (!findShare) return NextResponse.json({ message: "Can not find share" })

  if (findShare.files.length > 0) {
    const S3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESSKEY!,
        secretAccessKey: process.env.R2_PRIVITEKEY!,
      },
    })

    const deleteObjects: { Key: string }[] = []
    for (let i = 0; i < findShare?.files.length; i += 1) {
      deleteObjects.push({ Key: id + "/" + findShare.files[i] })
    }

    const command = new DeleteObjectsCommand({
      Bucket: "moveto-bucket",
      Delete: {
        Objects: deleteObjects,
      },
    })
    try {
      const { Deleted } = await S3.send(command)
    } catch (err) {
      return NextResponse.json({ message: "Delete Objects Error" })
    }
  }

  try {
    const deleteRecord = await prisma.shares.delete({
      where: {
        id: id,
      },
    })
    return NextResponse.json(deleteRecord)
  } catch {
    return NextResponse.json({ message: "Delete Share Error" })
  }
}

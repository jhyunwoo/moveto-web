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

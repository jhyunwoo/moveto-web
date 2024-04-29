import { S3Client, CreateMultipartUploadCommand } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const requestData = await request.json()
  const { fileKey } = requestData

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESSKEY!,
      secretAccessKey: process.env.R2_PRIVITEKEY!,
    },
  })

  const multipartUpload = await S3.send(
    new CreateMultipartUploadCommand({
      Bucket: "moveto-v1",
      Key: fileKey,
    })
  )
  return NextResponse.json(multipartUpload)
}

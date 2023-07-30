import { S3Client, UploadPartCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const requestData = await request.json()
  const { fileKey, uploadId, index } = requestData

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESSKEY!,
      secretAccessKey: process.env.R2_PRIVITEKEY!,
    },
  })

  const command = new UploadPartCommand({
    Bucket: "moveto-bucket",
    Key: fileKey,
    UploadId: uploadId,
    PartNumber: index,
  })

  const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 })

  const newHeaders = new Headers(request.headers)
  // Add a new header
  newHeaders.set("Access-Control-Allow-Credentials", "true")
  return new NextResponse(JSON.stringify(signedUrl), {
    status: 200,
    headers: { "Access-Control-Allow-Credentials": "true" },
  })
}

import { S3Client, UploadPartCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const requestData = await request.json()
  const {
    chunkInfos,
  }: { chunkInfos: { fileKey: string; uploadId: string; index: number }[] } =
    requestData

  const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESSKEY!,
      secretAccessKey: process.env.R2_PRIVITEKEY!,
    },
  })
  const signedUrls: string[] = []
  for (let i = 0; i < chunkInfos.length; i += 1) {
    const command = new UploadPartCommand({
      Bucket: "moveto-v1",
      Key: chunkInfos[i].fileKey,
      UploadId: chunkInfos[i].uploadId,
      PartNumber: chunkInfos[i].index,
    })

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 })
    signedUrls.push(signedUrl)
  }

  const newHeaders = new Headers(request.headers)
  // Add a new header
  newHeaders.set("Access-Control-Allow-Credentials", "true")
  return new NextResponse(JSON.stringify(signedUrls), {
    status: 200,
    headers: { "Access-Control-Allow-Credentials": "true" },
  })
}

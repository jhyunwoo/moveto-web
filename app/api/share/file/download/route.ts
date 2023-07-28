import { NextResponse } from "next/server"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

/** Get file download link from R2 */
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
  const signedUrls: string[] = []
  for (let i = 0; i < files.share.files.length; i += 1) {
    const presignedUrl = await getSignedUrl(
      S3,
      new GetObjectCommand({
        Bucket: "moveto-bucket",
        Key: files.share.id + "/" + files.share.files[i],
      }),
      { expiresIn: 3600 }
    )
    signedUrls.push(presignedUrl)
  }

  return NextResponse.json({ urls: signedUrls })
}

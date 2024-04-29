import { S3Client, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const requestData = await request.json()
    const {
      fileKey,
      uploadId,
      uploadResults,
    }: { fileKey: string; uploadId: string; uploadResults: string[] } =
      requestData

    const S3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESSKEY!,
        secretAccessKey: process.env.R2_PRIVITEKEY!,
      },
    })

    const part = uploadResults.map((ETag, i) => ({
      ETag,
      PartNumber: i + 1,
    }))

    const result = await S3.send(
      new CompleteMultipartUploadCommand({
        Bucket: "moveto-v1",
        Key: fileKey,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: part,
        },
      })
    )
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ message: "Complete error", log: e })
  }
}

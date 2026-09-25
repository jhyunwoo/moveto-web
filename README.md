# Moveto Project

로그인 과정 없이 쉽고 빠르게 파일을 공유할 수 있는 서비스

## 개발 과정

https://hyunwoo0228.notion.site/hyunwoo0228/Moveto-ca98b2d6253a44e59bebe837105d5998

## 사용 기술

- Next.js 13 App Router
- Next Auth
- Cloudflare R2 Storage
- Prisma
- PostgreSQL
- Recoil
- Axios
- SWR
- AWS JavaScript SDK v3

## Project context and engineering approach

Moveto is a file-sharing service designed to remove account creation from the first sharing interaction. The product challenge is to make upload, link generation, and download feel immediate while still keeping file metadata, expiry behavior, and storage access under control.

The Next.js App Router implementation combines NextAuth for optional identity, Prisma and PostgreSQL for metadata, and Cloudflare R2/AWS SDK-compatible storage for file objects. Recoil, SWR, and Axios separate interactive upload state from revalidated server data. This repository captures the first web implementation and the product decisions behind later Moveto iterations.

## Status

Historical web client for the Moveto product; the active service is tracked separately in `moveto-v2-web`.

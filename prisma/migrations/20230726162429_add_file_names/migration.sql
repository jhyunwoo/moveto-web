/*
  Warnings:

  - The `fileNames` column on the `shares` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shares" DROP COLUMN "fileNames",
ADD COLUMN     "fileNames" TEXT[];

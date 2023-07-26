/*
  Warnings:

  - A unique constraint covering the columns `[accessCode]` on the table `shares` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shares_accessCode_key" ON "shares"("accessCode");

/*
  Warnings:

  - You are about to drop the column `cover` on the `Administration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Administration" DROP COLUMN "cover";

-- CreateTable
CREATE TABLE "Cover" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "administrationId" TEXT NOT NULL,

    CONSTRAINT "Cover_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cover_administrationId_key" ON "Cover"("administrationId");

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_administrationId_fkey" FOREIGN KEY ("administrationId") REFERENCES "Administration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

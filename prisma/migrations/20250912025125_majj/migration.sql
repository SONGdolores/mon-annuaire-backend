/*
  Warnings:

  - You are about to drop the `_AdministrationServices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `administrationId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AdministrationServices" DROP CONSTRAINT "_AdministrationServices_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdministrationServices" DROP CONSTRAINT "_AdministrationServices_B_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "administrationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AdministrationServices";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_administrationId_fkey" FOREIGN KEY ("administrationId") REFERENCES "Administration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

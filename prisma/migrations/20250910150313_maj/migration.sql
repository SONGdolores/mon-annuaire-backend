/*
  Warnings:

  - You are about to drop the `_AdministrationContacts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `administrationId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AdministrationContacts" DROP CONSTRAINT "_AdministrationContacts_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdministrationContacts" DROP CONSTRAINT "_AdministrationContacts_B_fkey";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "administrationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AdministrationContacts";

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_administrationId_fkey" FOREIGN KEY ("administrationId") REFERENCES "Administration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

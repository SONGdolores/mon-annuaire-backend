/*
  Warnings:

  - You are about to drop the `Dcsi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DcsiMembre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dcsi" DROP CONSTRAINT "Dcsi_administrationId_fkey";

-- DropForeignKey
ALTER TABLE "DcsiMembre" DROP CONSTRAINT "DcsiMembre_dcsiId_fkey";

-- DropTable
DROP TABLE "Dcsi";

-- DropTable
DROP TABLE "DcsiMembre";

/*
  Warnings:

  - You are about to drop the column `adresseId` on the `Administration` table. All the data in the column will be lost.
  - You are about to drop the column `codePostal` on the `Ville` table. All the data in the column will be lost.
  - You are about to drop the `Adresse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `Administration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Administration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quartier` to the `Administration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Administration" DROP CONSTRAINT "Administration_adresseId_fkey";

-- AlterTable
ALTER TABLE "Administration" DROP COLUMN "adresseId",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quartier" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ville" DROP COLUMN "codePostal";

-- DropTable
DROP TABLE "Adresse";

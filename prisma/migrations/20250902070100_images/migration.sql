/*
  Warnings:

  - You are about to drop the column `horaire` on the `Administration` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "JourSemaine" AS ENUM ('LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI', 'DIMANCHE');

-- AlterTable
ALTER TABLE "Administration" DROP COLUMN "horaire",
ADD COLUMN     "cover" TEXT;

-- CreateTable
CREATE TABLE "Horaire" (
    "id" TEXT NOT NULL,
    "jour" "JourSemaine" NOT NULL,
    "heureOuverture" TIMESTAMP(3) NOT NULL,
    "heureFermeture" TIMESTAMP(3) NOT NULL,
    "administrationId" TEXT NOT NULL,

    CONSTRAINT "Horaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdministrationImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "administrationId" TEXT NOT NULL,

    CONSTRAINT "AdministrationImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Horaire" ADD CONSTRAINT "Horaire_administrationId_fkey" FOREIGN KEY ("administrationId") REFERENCES "Administration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdministrationImage" ADD CONSTRAINT "AdministrationImage_administrationId_fkey" FOREIGN KEY ("administrationId") REFERENCES "Administration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

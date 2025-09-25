/*
  Warnings:

  - The values [DIMANCHE] on the enum `JourSemaine` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `TypeAdministrationId` on the `Administration` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JourSemaine_new" AS ENUM ('LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI');
ALTER TABLE "Horaire" ALTER COLUMN "jour" TYPE "JourSemaine_new" USING ("jour"::text::"JourSemaine_new");
ALTER TYPE "JourSemaine" RENAME TO "JourSemaine_old";
ALTER TYPE "JourSemaine_new" RENAME TO "JourSemaine";
DROP TYPE "JourSemaine_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Administration" DROP CONSTRAINT "Administration_TypeAdministrationId_fkey";

-- AlterTable
ALTER TABLE "Administration" DROP COLUMN "TypeAdministrationId",
ADD COLUMN     "typeAdministrationId" TEXT;

-- AddForeignKey
ALTER TABLE "Administration" ADD CONSTRAINT "Administration_typeAdministrationId_fkey" FOREIGN KEY ("typeAdministrationId") REFERENCES "TypeAdministration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

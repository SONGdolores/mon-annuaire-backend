/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Administration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Administration_nom_key" ON "Administration"("nom");

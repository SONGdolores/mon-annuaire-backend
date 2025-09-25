-- CreateTable
CREATE TABLE "TypeAdministration" (
    "id" TEXT NOT NULL,
    "libelle" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TypeAdministration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeAdministration_libelle_key" ON "TypeAdministration"("libelle");

-- CreateTable
CREATE TABLE "Dcsi" (
    "id" TEXT NOT NULL,
    "responsableNom" TEXT NOT NULL,
    "responsableEmail" TEXT NOT NULL,
    "responsablePhone" TEXT,
    "chefServiceNom" TEXT NOT NULL,
    "chefServiceEmail" TEXT NOT NULL,
    "chefServicePhone" TEXT,
    "administrationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dcsi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DcsiMembre" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "fonction" TEXT,
    "dcsiId" TEXT NOT NULL,

    CONSTRAINT "DcsiMembre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dcsi" ADD CONSTRAINT "Dcsi_administrationId_fkey" FOREIGN KEY ("administrationId") REFERENCES "Administration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DcsiMembre" ADD CONSTRAINT "DcsiMembre_dcsiId_fkey" FOREIGN KEY ("dcsiId") REFERENCES "Dcsi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

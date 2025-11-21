-- CreateEnum
CREATE TYPE "CableModemStatus" AS ENUM ('Active', 'Suspended', 'Provision');

-- CreateTable
CREATE TABLE "cable_modems" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "CableModemStatus" NOT NULL DEFAULT 'Active',
    "validSince" TIMESTAMP(3),
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cable_modems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cable_modems_name_key" ON "cable_modems"("name");

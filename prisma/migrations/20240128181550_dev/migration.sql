/*
  Warnings:

  - You are about to drop the `barangay` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizationID` to the `resident` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "barangay" DROP CONSTRAINT "barangay_id_fkey";

-- DropForeignKey
ALTER TABLE "resident" DROP CONSTRAINT "resident_id_fkey";

-- AlterTable
ALTER TABLE "resident" ADD COLUMN     "organizationID" TEXT NOT NULL;

-- DropTable
DROP TABLE "barangay";

-- AddForeignKey
ALTER TABLE "resident" ADD CONSTRAINT "resident_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

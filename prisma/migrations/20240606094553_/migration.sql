/*
  Warnings:

  - The values [LOCKED] on the enum `EnumFundStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updatedAt` to the `Fund` table without a default value. This is not possible if the table is not empty.
  - Made the column `targetAmount` on table `Fund` required. This step will fail if there are existing NULL values in that column.
  - Made the column `targetPeople` on table `Fund` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currency` on table `Fund` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumFundStatus_new" AS ENUM ('PROPOSED', 'IN_PROGRESS', 'APPROVED', 'COLLECTED', 'PUCHASED', 'CANCELLED', 'REJECTED', 'FAILED');
ALTER TABLE "Fund" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Fund" ALTER COLUMN "status" TYPE "EnumFundStatus_new" USING ("status"::text::"EnumFundStatus_new");
ALTER TYPE "EnumFundStatus" RENAME TO "EnumFundStatus_old";
ALTER TYPE "EnumFundStatus_new" RENAME TO "EnumFundStatus";
DROP TYPE "EnumFundStatus_old";
ALTER TABLE "Fund" ALTER COLUMN "status" SET DEFAULT 'PROPOSED';
COMMIT;

-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "targetAmount" SET NOT NULL,
ALTER COLUMN "targetPeople" SET NOT NULL,
ALTER COLUMN "currency" SET NOT NULL;

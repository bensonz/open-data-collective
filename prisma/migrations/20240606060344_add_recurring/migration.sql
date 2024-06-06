-- CreateEnum
CREATE TYPE "EnumIntervalUnit" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- AlterTable
ALTER TABLE "Dataset" ADD COLUMN     "interval" INTEGER,
ADD COLUMN     "intervalUnit" "EnumIntervalUnit",
ADD COLUMN     "recurring" BOOLEAN NOT NULL DEFAULT false;

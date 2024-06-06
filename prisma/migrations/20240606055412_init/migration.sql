-- CreateEnum
CREATE TYPE "EnumFundStatus" AS ENUM ('PROPOSED', 'IN_PROGRESS', 'APPROVED', 'LOCKED', 'COLLECTED', 'PUCHASED', 'CANCELLED', 'REJECTED', 'FAILED');

-- CreateEnum
CREATE TYPE "EnumPaymentStatus" AS ENUM ('CREATED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUND_INPROGRESS', 'FULLY_REFUNDED', 'REFUND_FAILED', 'AUTH_UPDATING', 'AUTH_SUCCESS', 'AUTH_FAILED', 'WAIT_FOR_NOTIFICATION');

-- CreateTable
CREATE TABLE "Dataset" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dataset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fund" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "targetAmount" DOUBLE PRECISION,
    "targetPeople" INTEGER,
    "currency" TEXT,
    "status" "EnumFundStatus" NOT NULL DEFAULT 'PROPOSED',
    "statusUpdatedAt" TIMESTAMP(3),
    "subscribers" TEXT[],
    "expiresAt" TIMESTAMP(3),
    "datasetId" TEXT NOT NULL,

    CONSTRAINT "Fund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentOrder" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "currency" TEXT,
    "paidBy" TEXT,
    "notes" TEXT,
    "transactionId" TEXT,
    "currentStatus" "EnumPaymentStatus" NOT NULL DEFAULT 'CREATED',
    "currentStatusUpdatedAt" TIMESTAMP(3),
    "targetStatus" "EnumPaymentStatus" NOT NULL DEFAULT 'COMPLETED',
    "targetStatusUpdatedAt" TIMESTAMP(3),
    "fundId" TEXT NOT NULL,

    CONSTRAINT "PaymentOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fund" ADD CONSTRAINT "Fund_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentOrder" ADD CONSTRAINT "PaymentOrder_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

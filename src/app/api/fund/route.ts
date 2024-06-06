import { NextResponse } from "next/server";
import { prismaClient } from "@/backend/client";
import logger from "@/backend/logger";
import { uuidv4 } from "@/util/uuid";
import { auth } from "@clerk/nextjs/server";
import { EnumFundStatus } from "@prisma/client";

// ROUTE -- /api/feedback

// Get -- get all feedbacks
export async function GET(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({
      status: 401,
      error: "Unauthorized",
    });
  }
  const data = await prismaClient.fund.findMany();
  return NextResponse.json(data);
}

// Post -- new feedback
export async function POST(request: Request) {
  const { userId: uid } = auth();
  if (!uid) {
    return NextResponse.json({
      status: 401,
      error: "Unauthorized",
    });
  }
  const {
    name,
    description,
    datasetId,
    targetAmount,
    targetPeople,
    currency,
    expiresAt,
  } = await request.json();
  const tp = Number(targetPeople);
  const data = await prismaClient.fund.create({
    data: {
      id: `fund-${uuidv4()}`,
      creatorId: uid,
      name,
      description,
      datasetId,
      targetAmount: Number(targetAmount),
      targetPeople: tp,
      status: tp > 1 ? EnumFundStatus.PROPOSED : EnumFundStatus.APPROVED,
      statusUpdatedAt: new Date(),
      currency,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      subscribers: [uid],
    },
  });
  return NextResponse.json(data);
}

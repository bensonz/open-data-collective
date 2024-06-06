import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/backend/client";
import { FundController } from "@/backend/controllers/fund-controller";
import { auth } from "@clerk/nextjs/server";
import { EnumFundStatus } from "@prisma/client";

interface IParams {
  params: {
    fid: string;
  };
}

export async function POST(req: NextRequest, { params }: IParams) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { fid } = params;
  const fund = await prismaClient.fund.findUnique({
    where: { id: fid },
  });
  if (!fund) {
    return NextResponse.json({ error: "Fund not found" }, { status: 404 });
  }
  const result = await FundController.join(fund, userId);
  return NextResponse.json(result);
}

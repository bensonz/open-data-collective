import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/backend/client";
import { auth } from "@clerk/nextjs/server";

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
  if (fund.subscribers.includes(userId)) {
    return NextResponse.json({ success: true, message: "User already joined" });
  }
  await prismaClient.fund.update({
    where: { id: fid },
    data: { subscribers: { push: userId } },
  });
  return NextResponse.json({
    success: true,
    message: "User joined successfully",
  });
}

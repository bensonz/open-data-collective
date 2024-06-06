import { EnumFundStatus, Fund } from "@prisma/client";

import { CommonResp } from "../types";

async function join(fund: Fund, userId: string): Promise<CommonResp> {
  if (fund.subscribers.includes(userId)) {
    return { success: true, message: "User already joined" };
  }
  if (!fund.targetPeople) {
    return { success: false, message: "Fund is not joinable" };
  }
  if (fund.subscribers.length >= fund.targetPeople) {
    return { success: false, message: "Fund is full" };
  }
  const full = fund.subscribers.length + 1 === fund.targetPeople;
  const update = full
    ? { status: EnumFundStatus.APPROVED, statusUpdatedAt: new Date() }
    : {};
  await prismaClient.fund.update({
    where: { id: fund.id },
    data: {
      ...update,
      subscribers: { push: userId },
    },
  });
  return { success: true, message: "User joined successfully" };
}

export const FundController = {
  join,
};

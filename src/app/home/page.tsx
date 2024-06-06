import { prismaClient } from "@/backend/client";
import { currentUser } from "@clerk/nextjs/server";

import Empty from "@/components/common/empty";
import { SpacingVertical } from "@/components/common/spacer";
import NewFundButton from "@/components/home/new-fund-button";

export default async function HomePage() {
  const user = await currentUser();
  const funds = await prismaClient.fund.findMany();
  const datasets = await prismaClient.dataset.findMany();
  return (
    <div className="container">
      <SpacingVertical space={16} />
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl">Funds</h1>
        <NewFundButton datasets={datasets} />
      </div>
      {funds.length === 0 && <Empty text="No funds available" />}
    </div>
  );
}

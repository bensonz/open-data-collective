import { prismaClient } from "@/backend/client";
import { currentUser } from "@clerk/nextjs/server";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Empty from "@/components/common/empty";
import { SpacingVertical } from "@/components/common/spacer";
import DetailButton from "@/components/home/detail-button";
import JoinButton from "@/components/home/join-button";
import NewFundButton from "@/components/home/new-fund-button";

export default async function HomePage() {
  const user = await currentUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }
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
      <SpacingVertical space={32} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {funds.map((fund) => (
          <Card key={fund.id} className="rounded-lg bg-white p-4 shadow-md">
            <CardHeader>
              <CardTitle>{fund.name}</CardTitle>
              <CardDescription>{fund.description}</CardDescription>
              <Badge
                className={cn("w-32", {
                  "bg-green-500": fund.status === "APPROVED",
                })}
              >
                {fund.status}
              </Badge>
              <Progress
                className="h-2"
                value={(fund.subscribers.length / fund.targetPeople) * 100}
              ></Progress>
              <div className="flex w-full justify-between">
                <p className="text-xs text-muted-foreground md:text-sm">
                  Goal: {fund.targetPeople} people
                </p>
                <div>
                  <p className="text-xs text-muted-foreground md:text-sm">
                    Progress:{fund.subscribers.length}/{fund.targetPeople}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Target: {fund.targetAmount} | {fund.currency}
              </p>
              <p>People: {fund.targetPeople}</p>
              <p>Expires: {fund.expiresAt?.toLocaleDateString()}</p>
            </CardContent>
            <CardFooter className="space-x-2">
              <DetailButton datasets={datasets} fund={fund} />
              <JoinButton user={user.id} fund={fund} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

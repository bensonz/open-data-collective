import { prismaClient } from "@/backend/client";
import { toMoney } from "@/util";
import { currentUser } from "@clerk/nextjs/server";
import { EnumFundStatus } from "@prisma/client";
import { Link, TrashIcon } from "lucide-react";

import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Empty from "@/components/common/empty";
import { SpacingVertical } from "@/components/common/spacer";
import JoinButton from "@/components/home/join-button";

interface IFundDetailPageProps {
  params: {
    fid: string;
  };
  // searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function FundDetailPage({
  params: { fid },
}: IFundDetailPageProps) {
  const user = await currentUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }
  const fund = await prismaClient.fund.findUnique({
    where: { id: fid },
    include: { dataset: true },
  });
  if (!fund) {
    return <Empty text="Fund 404" />;
  }

  return (
    <div className="container">
      <SpacingVertical space={16} />
      <div className="my-2">
        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        <span className="mx-2">/</span>
        <BreadcrumbLink href={`/home/fund/${fid}`}>Funds/{fid}</BreadcrumbLink>
      </div>
      <div className="grid gap-6 md:grid-cols-6">
        <div className="flex flex-col gap-6 md:col-span-4 lg:col-span-3 xl:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Fund Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <div className="font-medium">{fund.name}</div>
                </div>
                <div>
                  <Label>Description</Label>
                  <div>{fund.description}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Target Amount</Label>
                  <div className="font-medium">{fund.targetAmount}</div>
                </div>
                <div>
                  <Label>Target People</Label>
                  <div className="font-medium">{fund.targetPeople}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Currency</Label>
                  <div className="font-medium">{fund.currency}</div>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="font-medium text-green-500">
                    {fund.status}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expiration Date</Label>
                  <div className="font-medium">
                    {fund.expiresAt?.toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <Label>Related Dataset</Label>
                  <div className="font-medium">
                    {fund.dataset.url ? (
                      <Link href="#" className="text-blue-600 underline">
                        Startup Funding Data
                      </Link>
                    ) : (
                      "No dataset URL"
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>$10,000</TableCell>
                    <TableCell>June 1, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon">
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>$5,000</TableCell>
                    <TableCell>May 15, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon">
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Johnson</TableCell>
                    <TableCell>$15,000</TableCell>
                    <TableCell>April 20, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon">
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Subscriber</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">ORD001</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>$10,000</TableCell>
                    <TableCell>June 1, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon">
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ORD002</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>$5,000</TableCell>
                    <TableCell>May 15, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon">
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ORD003</TableCell>
                    <TableCell>Bob Johnson</TableCell>
                    <TableCell>$15,000</TableCell>
                    <TableCell>April 20, 2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon">
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-3 xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Fund Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>Target Amount</div>
                  <div className="font-medium">
                    {toMoney(fund.targetAmount, fund.currency)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Pay per person</div>
                  <div className="font-medium">
                    {toMoney(
                      fund.targetAmount / fund.targetPeople,
                      fund.currency
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Target People</div>
                  <div className="font-medium">{fund.targetPeople}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Subscribers</div>
                  <div className="font-medium">{fund.subscribers.length}</div>
                </div>
              </div>
              <SpacingVertical space={16} />
              <div className="grid gap-2">
                <Label>Progress</Label>
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
                  <Progress
                    className="h-2"
                    value={(fund.subscribers.length / fund.targetPeople) * 100}
                  ></Progress>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardFooter className="space-x-2">
              <JoinButton user={user.id} fund={fund} />
              <Button disabled={fund.status !== EnumFundStatus.APPROVED}>
                Pay
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

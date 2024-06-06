"use client";

import { Dataset, Fund } from "@prisma/client";

import { Button } from "../ui/button";
import FundDialog from "./fund-dialog";

export default function DetailButton({
  fund,
  datasets,
}: {
  fund: Fund;
  datasets: Dataset[];
}) {
  return (
    <FundDialog datasets={datasets} data={fund} viewMode>
      <Button variant={"outline"}>View Fund</Button>
    </FundDialog>
  );
}

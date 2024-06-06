"use client";

import { useRouter } from "next/navigation";
import { Dataset, Fund } from "@prisma/client";
import { toast } from "sonner";

import { Button } from "../ui/button";
import FundDialog from "./fund-dialog";

export default function NewFundButton({ datasets }: { datasets: Dataset[] }) {
  const router = useRouter();

  const onSubmit = async (fund: Partial<Fund>) => {
    const resp = await fetch("api/fund", {
      method: "POST",
      body: JSON.stringify(fund),
    });
    if (resp.ok) {
      toast.success("Fund created successfully");
      router.refresh();
      return true;
    } else {
      toast.error("Failed to create fund");
      return false;
    }
  };
  return (
    <FundDialog onSubmit={onSubmit} datasets={datasets}>
      <Button>New Fund</Button>
    </FundDialog>
  );
}

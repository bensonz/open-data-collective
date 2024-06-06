"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Fund } from "@prisma/client";
import { toast } from "sonner";

import { Button } from "../ui/button";

interface IJoinButtonProps {
  user: string;
  fund: Fund;
}

export default function JoinButton({ user, fund }: IJoinButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onJoin = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`/api/fund/${fund.id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        toast.success("Joined fund successfully");
        router.refresh();
      } else {
        toast.error("Failed to join fund: " + data.message || "Unknown error");
      }
    } catch (e) {
      toast.error("Failed to join fund");
    } finally {
      setLoading(false);
    }
  };

  const alreadyJoined = fund.subscribers.includes(user);
  return (
    <Button
      variant={"outline"}
      onClick={onJoin}
      loading={loading}
      disabled={alreadyJoined}
    >
      {alreadyJoined ? "Joined" : "Join"}
    </Button>
  );
}

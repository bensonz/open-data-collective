"use client";

import { useState } from "react";
import { Fund } from "@prisma/client";

import { Button } from "../ui/button";

interface IJoinButtonProps {
  user: string;
  fund: Fund;
}

export default function JoinButton({ user, fund }: IJoinButtonProps) {
  const [loading, setLoading] = useState(false);
  const onJoin = async () => {
    setLoading(true);
    await fetch(`/api/fund/${fund.id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    setLoading(false);
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

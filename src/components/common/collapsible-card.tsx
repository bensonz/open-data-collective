"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ICollapsibleCardProps extends React.ComponentProps<typeof Card> {
  title?: string;
  cardTitle?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleCard({
  title,
  cardTitle,
  description,
  defaultOpen,
  children,
  footer,
  ...props
}: ICollapsibleCardProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen ?? true);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Card {...props}>
      <CardHeader className="block">
        <div className="float-right">
          <IconButton className="duration-200" onClick={toggleOpen}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
        </div>
        {cardTitle ? cardTitle : <CardTitle>{title}</CardTitle>}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent
        className={cn("overflow-hidden p-0 duration-300", {
          "max-h-[100vh]": open,
          "max-h-0": !open,
        })}
      >
        {children}
      </CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
}

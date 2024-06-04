"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Next13ProgressBar } from "next13-progressbar";

import { TooltipProvider } from "@/components/ui/tooltip";

import { AppDialogProvider } from "./app-dialog-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Next13ProgressBar
        height="4px"
        color="#5EBBC2"
        options={{ showSpinner: true }}
      />
      <AppDialogProvider>
        <TooltipProvider>
          <ClerkProvider>{children}</ClerkProvider>
        </TooltipProvider>
      </AppDialogProvider>
    </>
  );
};

export default Providers;

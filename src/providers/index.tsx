"use client";

import React from "react";
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
        <TooltipProvider>{children}</TooltipProvider>
      </AppDialogProvider>
    </>
  );
};

export default Providers;

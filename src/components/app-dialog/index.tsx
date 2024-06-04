"use client";

import { useAppDialog } from "@/providers/app-dialog-provider";

import { Backdrop } from "../common/backdrop";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export const AppDialog = () => {
  const { open, title, description, body, loading, actions, setOpen } =
    useAppDialog();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:w-72 md:w-128">
        {loading && <Backdrop />}
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription asChild={typeof description !== "string"}>
          {description}
        </AlertDialogDescription>
        <div className="text-sm">{body}</div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {actions?.map((action, i) => (
            <AlertDialogAction
              key={i}
              className={action.className}
              onClick={action.onClick}
            >
              {action.text}
            </AlertDialogAction>
          ))}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

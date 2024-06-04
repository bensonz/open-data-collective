import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const Backdrop = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center bg-gray-500/50",
        className
      )}
    >
      <div className="translate-x-1">
        <LoaderIcon className="mr-2 size-4 animate-spin" />
      </div>
    </div>
  );
};

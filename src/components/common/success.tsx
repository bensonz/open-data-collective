import { CheckCircleIcon, LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const Success = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center bg-gray-500/50",
        className
      )}
    >
      <div className="animate-bounce">
        <CheckCircleIcon size={50} className="text-green-500" />
      </div>
    </div>
  );
};

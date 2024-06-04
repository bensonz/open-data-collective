import { GhostIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import Logo from "./logo";

interface IEmptyProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function Empty({ className, size = "md", text }: IEmptyProps) {
  const iconSize = size === "sm" ? 32 : size === "lg" ? 128 : 64;
  const fontSize =
    size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-2xl";
  return (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center p-4",
        className
      )}
    >
      <GhostIcon className="text-gray-500" size={iconSize} strokeWidth={1} />
      <p className={`text-gray-400 ${fontSize}`}>No data available</p>
      <p className="text-gray-400">{text}</p>
    </div>
  );
}

export function EmptyChat() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Logo className="bg-transparent" />
      <p className="mb-5 text-2xl font-medium">How can we help you today?</p>
    </div>
  );
}

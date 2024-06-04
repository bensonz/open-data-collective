import { XCircleIcon } from "lucide-react";

export default function ErrorBlock({ error }: { error: any }) {
  return (
    <div className="flex size-full flex-col items-center justify-center text-center text-red-500">
      <XCircleIcon />
      <strong>Something went wrong</strong>
      <span>{error?.message || "An error occurred"}</span>
    </div>
  );
}

import Link from "next/link";
import { BUILD_DATE } from "@/config";

import { cn } from "@/lib/utils";

import { SpacingHorizontal } from "./spacer";

export function LogoIcon() {
  return (
    <div className="rounded-md border">
      <div className={`BUILD_DATE:${BUILD_DATE}`} />
      <div className="bg-gradient-to-r from-yellow-500 to-rose-500 bg-clip-text p-1 text-lg font-bold text-transparent shadow-none">
        ODC
      </div>
    </div>
  );
}
interface ILogoProps extends React.HTMLAttributes<HTMLDivElement> {
  withName?: boolean;
  autoName?: boolean;
  href?: string;
}
export default function Logo({
  withName,
  autoName,
  className,
  href = "/home",
  ...props
}: ILogoProps) {
  return (
    <Link href={href} passHref>
      <div
        {...props}
        className={cn(
          "flex items-center rounded-lg bg-white px-2 py-1",
          className
        )}
      >
        <LogoIcon />
        <SpacingHorizontal space={8} />
        {withName && <p className="ml-0 font-semibold text-teal-900">ODC</p>}
        {autoName && (
          <p className="ml-0 hidden font-semibold text-teal-900 md:block">
            ODC
          </p>
        )}
      </div>
    </Link>
  );
}

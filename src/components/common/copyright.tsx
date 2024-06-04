import Link from "next/link";
import { PROJECT_NAME } from "@/config";

export default function Copyright(props: any) {
  return (
    <div className="mb-0 px-2 text-center text-2xs text-muted-foreground md:text-sm">
      {props.children}
      <Link
        href="/terms-and-conditions"
        className="underline underline-offset-4 hover:text-primary"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy-terms"
        className="underline underline-offset-4 hover:text-primary"
      >
        Privacy Policy
      </Link>
      .
      <br />
      Copyright ©<Link href="/">{PROJECT_NAME}</Link> 2024.
    </div>
  );
}

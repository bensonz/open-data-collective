"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import Logo from "../common/logo";
import { SpacingHorizontal, SpacingVertical } from "../common/spacer";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export function MainNav() {
  const pathname = usePathname();
  const linkMe = (path: string, text: string) => (
    <Link
      href={path}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname.startsWith(path)
          ? "text-foreground underline"
          : "text-foreground/60"
      )}
    >
      {text}
    </Link>
  );

  const renderLinks = () => {
    return (
      <>
        {linkMe("/home", "Home")}
        {linkMe("/profile", "Profile")}
      </>
    );
  };
  return (
    <>
      <div className="mr-4 hidden md:flex">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {renderLinks()}
        </nav>
      </div>
      <Sheet>
        <SheetTrigger className="flex flex-row items-center md:hidden">
          <SidebarIcon size={20} />
          <SpacingHorizontal space={4} />
          <p className="ml-0 font-semibold text-teal-800">ODC</p>
        </SheetTrigger>
        <SheetContent side={"left"} className="max-w-40 duration-100">
          <Logo />
          <SpacingVertical space={12} />
          <nav className="flex flex-col items-start justify-start space-y-2 text-sm font-medium">
            {renderLinks()}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import Logo from "@/components/common/logo";

import { SpacingHorizontal } from "../common/spacer";
import { MainNav } from "./main-nav";

interface IAppBarProps {
  sticky?: boolean;
}

/**
 * AppBar - The top bar of the app
 *
 * For a single page layout, use `sticky` prop to make it sticky.
 *
 * If you change the height, make sure to update the height of the main body
 *
 * ````
 * appbar = h-16
 * mainbody = h-[calc(100vh-3.5rem)] w-full shrink-0
 * ````
 *
 * @returns
 */
export function AppBar({ sticky }: IAppBarProps) {
  return (
    <header
      className={cn(
        "relative top-0 z-50 flex h-14 w-full flex-row items-center justify-between border-b bg-background/90",
        {
          sticky: sticky,
        }
      )}
    >
      <div className="container flex h-14 items-center">
        <div className="flex flex-row">
          <Logo className="bg-transparent" />
          <SpacingHorizontal space={8} />
          <MainNav />
        </div>

        <div className="flex h-14 flex-1 items-center">
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import Logo from "@/components/common/logo";

export default function Page() {
  return (
    <div>
      <h1>Page</h1>
      <Logo />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

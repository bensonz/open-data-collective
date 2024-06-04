import Image from "next/image";

import Copyright from "@/components/common/copyright";
import Logo from "@/components/common/logo";
import { SpacingVertical } from "@/components/common/spacer";

export async function generateMetadata() {
  return {
    title: "Auth",
  };
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative h-svh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative h-full flex-col p-10 text-white dark:border-r lg:flex">
        <Image
          priority
          fill
          sizes="
          (max-width: 640px) 100vw,
          (max-width: 768px) 768px,
          (max-width: 1024px) 1024px,
          1280px
        "
          src="/images/bg.jpeg"
          alt="background img"
        />

        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo withName />
        </div>
      </div>
      <div className="absolute top-[33%] bg-white p-8 md:relative md:top-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>

        <SpacingVertical space={8} />

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Copyright />
        </div>
      </div>
    </div>
  );
}

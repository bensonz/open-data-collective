import "@/styles/globals.css";

// These styles apply to every route in the application
import { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import Providers from "@/providers";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { AppDialog } from "@/components/app-dialog";
import { TailwindIndicator } from "@/components/common/tailwind-indicator";

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
const title = "ODC";
const description =
  "A platform where you can fund your data requests with others.";
export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  metadataBase: new URL("https://app.odc.com"),
  description: description,
  openGraph: {
    title: title,
    description: description,
    type: "website",
    url: "https://app.odc.com",
    locale: "en_US",
  },
  keywords: ["open data collective"],
  icons: ["/icons/favicon.ico"],
};

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={cn(
          "min-h-svh bg-background font-sans antialiased",
          archivo.variable
        )}
      >
        <Providers>
          <Toaster position="top-right" duration={2000} richColors />
          <AppDialog />

          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}

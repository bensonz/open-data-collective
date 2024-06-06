import { AppBar } from "@/components/app-bar";

export default function LayoutWithAppBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <AppBar sticky />
      <main className="flex-1">{children}</main>
    </div>
  );
}

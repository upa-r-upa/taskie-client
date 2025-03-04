import { Outlet } from "react-router-dom";

import TokenRefresher from "@/components/TokenRefresher";
import PageHeader from "@/components/PageHeader";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-visible relative">
      <PageHeader />

      <div className="px-6 pt-20 pb-4 flex-1 container mx-auto w-full">
        <Outlet />
      </div>

      <Toaster />
      <TokenRefresher />
    </div>
  );
}

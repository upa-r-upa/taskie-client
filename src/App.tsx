import { Outlet } from "react-router-dom";

import TokenRefresher from "@/components/TokenRefresher";
import PageHeader from "@/components/PageHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <ScrollArea>
      <div className="min-h-screen flex flex-col">
        <PageHeader />

        <div className="px-6 pt-20 pb-4 flex-1 relative container mx-auto">
          <Outlet />
        </div>

        <Toaster />
        <TokenRefresher />
      </div>
    </ScrollArea>
  );
}

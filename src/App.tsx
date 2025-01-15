import { Outlet } from "react-router-dom";

import TokenRefresher from "@/components/TokenRefresher";
import Messages from "@/components/Messages";
import PageHeader from "@/components/PageHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function App() {
  return (
    <ScrollArea>
      <div className="min-h-screen flex flex-col">
        <PageHeader />

        <div className="px-8 pt-20 pb-4 flex-1 relative">
          <Outlet />
        </div>

        <Messages />
        <TokenRefresher />
      </div>
    </ScrollArea>
  );
}

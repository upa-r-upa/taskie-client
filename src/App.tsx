import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import TokenRefresher from "@/components/TokenRefresher";
import PageHeader from "@/components/PageHeader";
import { Toaster } from "@/components/ui/sonner";

function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export default function App() {
  useEffect(() => {
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  return (
    <div className="min-h-device flex flex-col overflow-visible relative">
      <PageHeader />

      <div className="px-6 pt-20 pb-4 flex-1 container mx-auto w-full">
        <Outlet />
      </div>

      <Toaster />
      <TokenRefresher />
    </div>
  );
}

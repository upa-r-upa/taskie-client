import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/state/useAuthStore";
import Routes from "@/constants/routes";

import { Skeleton } from "./ui/skeleton";

export default function RequireAuth() {
  const { getIsLoggedIn, isAccessTokenRefreshing } = useAuthStore(
    (state) => state
  );
  const location = useLocation();

  if (isAccessTokenRefreshing && !getIsLoggedIn()) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-12 w-48 mb-4" />

        <div className="flex flex-col md:flex-row gap-8">
          <main className="flex-grow">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!isAccessTokenRefreshing && !getIsLoggedIn()) {
    return (
      <Navigate to={`/${Routes.Login}`} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}

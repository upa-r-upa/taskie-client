import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../state/useAuthStore";
import Routes from "../constants/routes";

export default function RequireAuth() {
  const { getIsLoggedIn, isAccessTokenRefreshing } = useAuthStore(
    (state) => state
  );
  const location = useLocation();

  if (isAccessTokenRefreshing) {
    return (
      <div className="fixed top-0 left-0 w-full flex items-center h-full z-30">
        <div className="w-full h-full bg-black bg-opacity-20 absolute"></div>
        <div className="text-center w-full ">
          <span className="loading loading-dots loading-lg"></span>

          <p>인증 정보를 가져오는 중입니다. </p>
          <p>잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  if (!getIsLoggedIn()) {
    return <Navigate to={Routes.LOGIN} state={{ from: location }} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

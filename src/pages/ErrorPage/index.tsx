import { AxiosError } from "axios";
import { NavLink, useRouteError } from "react-router-dom";

import Routes from "@/constants/routes";

const ErrorPage = () => {
  const error = useRouteError();

  if (error instanceof AxiosError) {
    return (
      <div className="h-screen flex items-center">
        <div className="card card-compact m-auto">
          <div className="card-body items-center text-center">
            <h2 className="card-title">문제가 발생했어요.</h2>

            <div className="card-actions justify-end">
              {error.response?.data}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center">
      <div className="card card-compact w-full">
        <div className="card-body items-center text-center">
          <h2 className="card-title">문제가 발생했어요!</h2>

          <div>
            <p>예상치 못한 문제가 발생했어요.</p>
            <p>페이지를 새고로침 하거나, 나중에 다시 시도해주세요.</p>
          </div>

          <div className="card-actions justify-end">
            <NavLink to={`/${Routes.Main}`}>
              <button className="btn btn-primary">홈으로 돌아가기</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

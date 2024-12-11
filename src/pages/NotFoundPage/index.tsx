import { NavLink } from "react-router-dom";

import Routes from "@/constants/routes";

export default function NotFoundPage() {
  return (
    <div>
      <div className="card card-bordered card-compact">
        <div className="card-body items-center text-center">
          <h2 className="card-title">404!</h2>
          <p>현재 페이지는 존재하지 않는 페이지에요.</p>

          <div className="card-actions justify-end">
            <NavLink to={`/${Routes.MAIN}`}>
              <button className="btn btn-primary">홈으로 돌아가기</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

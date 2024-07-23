import { Link, useNavigate } from "react-router-dom";
import Routes from "../constants/routes";
import { useAuthStore } from "../state/useAuthStore";
import useMutation from "../hooks/useMutation";
import { authApi } from "../api/client";
import { useMessageStore } from "../state/useMessageStore";

const NavBar = () => {
  const navigate = useNavigate();

  const { getIsLoggedIn, clearAuthState } = useAuthStore((state) => state);
  const addMessage = useMessageStore((state) => state.addMessage);

  const { mutation, isLoading } = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuthState();
      navigate(`/${Routes.LOGIN}`);
      addMessage({
        message: "로그아웃이 완료되었습니다.",
      });
    },
    onError: () => {
      addMessage({
        message:
          "로그아웃이 정상적으로 완료되지 못했습니다. 다시 시도해주세요.",
        type: "error",
      });
    },
  });

  const handleLogout = () => {
    if (isLoading) {
      return;
    }

    mutation();
  };

  const renderNavItems = (isAuthenticated: boolean) => {
    if (!isAuthenticated) {
      return (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to={`/${Routes.LOGIN}`}>로그인</Link>
          </li>
          <li>
            <Link to={`/${Routes.SIGN_UP}`}>회원가입</Link>
          </li>
        </ul>
      );
    }

    return (
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li onClick={handleLogout}>
          <Link to={""}>로그아웃</Link>
        </li>
        <li>
          <Link to={`/${Routes.DASHBOARD}`}>대시보드</Link>
        </li>
        <li>
          <Link to={`/${Routes.USER}`}>마이 페이지</Link>
        </li>
      </ul>
    );
  };

  return (
    <div className="navbar bg-base-100 z-20 bordered">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          {renderNavItems(getIsLoggedIn())}
        </div>
      </div>
      <div className="navbar-center">
        <Link to={Routes.MAIN} className="btn btn-ghost text-3xl">
          Taskie
        </Link>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default NavBar;

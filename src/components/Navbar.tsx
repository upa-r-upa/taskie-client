import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { BsJustify } from "react-icons/bs";

import Routes from "@/constants/routes";
import { useAuthStore } from "@/state/useAuthStore";
import { authApi } from "@/api/client";
import { useMessageStore } from "@/state/useMessageStore";

const NavBar = () => {
  const navigate = useNavigate();

  const { getIsLoggedIn, clearAuthState } = useAuthStore((state) => state);
  const addMessage = useMessageStore((state) => state.addMessage);

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAuthState();
      navigate(`/${Routes.Login}`);
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
    if (isPending) return;

    mutate({});
  };

  const renderNavItems = (isAuthenticated: boolean) => {
    if (!isAuthenticated) {
      return (
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-badge w-52"
        >
          <li>
            <Link to={`/${Routes.Login}`}>로그인</Link>
          </li>
          <li>
            <Link to={`/${Routes.SignUp}`}>회원가입</Link>
          </li>
        </ul>
      );
    }

    return (
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-badge w-52"
      >
        <li onClick={handleLogout}>
          <Link to={""}>로그아웃</Link>
        </li>
      </ul>
    );
  };

  return (
    <div className="navbar z-20 bg-white shadow-sm fixed bordered root-content">
      <div className="navbar-start">
        <Link to={`/${Routes.Main}`} className="btn btn-ghost text-xl">
          Taskie
        </Link>
      </div>

      <div className="navbar-center"></div>
      <div className="navbar-end">
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <BsJustify className="text-xl" />
          </div>

          {renderNavItems(getIsLoggedIn())}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import Routes from "@/constants/routes";
import { useAuthStore } from "@/state/useAuthStore";
import { authApi } from "@/api/client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function UserNavigation() {
  const navigate = useNavigate();

  const { clearAuthState, user } = useAuthStore((state) => state);

  const handleLogoutSuccess = () => {
    clearAuthState();
    navigate(`/${Routes.Login}`);

    toast.success("로그아웃이 완료되었습니다.");
  };

  const handleLogoutError = () => {
    toast.error(
      "로그아웃이 정상적으로 완료되지 못했습니다. 다시 시도해주세요."
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: handleLogoutSuccess,
    onError: handleLogoutError,
  });

  const handleLogout = () => {
    if (isPending) return;
    mutate({});
  };

  if (!user) {
    return (
      <Link
        className="text-sm transition-colors hover:text-foreground/80"
        to={Routes.Login}
      >
        로그인
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>:D</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.nickname}</p>

            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* <DropdownMenuItem>마이페이지</DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

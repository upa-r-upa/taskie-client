import { AxiosError } from "axios";
import { NavLink, useRouteError } from "react-router-dom";

import Routes from "@/constants/routes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const error = useRouteError();

  if (error instanceof AxiosError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>문제가 발생했어요.</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div>{error.response?.data}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>문제가 발생했어요!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>예상치 못한 문제가 발생했어요.</p>
          <p>페이지를 새로고침 하거나, 나중에 다시 시도해주세요.</p>
        </CardContent>
        <div className="flex justify-end p-4">
          <NavLink to={`/${Routes.Main}`}>
            <Button variant="default">홈으로 돌아가기</Button>
          </NavLink>
        </div>
      </Card>
    </div>
  );
};

export default ErrorPage;

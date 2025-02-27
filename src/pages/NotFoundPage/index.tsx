import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">404</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p>현재 페이지는 존재하지 않는 페이지에요.</p>

        <Button onClick={handleGoHome} className="w-full">
          홈으로 돌아가기
        </Button>
      </CardContent>
    </Card>
  );
}

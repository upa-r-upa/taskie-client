import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Routes from "@/constants/routes";

import { Button } from "../ui/button";

export default function NotFoundRoutine() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">404</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-sm">
        <p>존재하지 않는 루틴이에요.</p>
        <p>혹은 잘못된 경로인 것 같아요.</p>

        <Link to={`/${Routes.Routine}`} className="mt-4 block">
          <Button variant="secondary">
            <ChevronLeft />
            루틴 목록으로
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

import { ChevronLeft, FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Routes from "@/constants/routes";

interface Props {
  title: string;
  id: number;
}

export default function EmptyTodoList({ title, id }: Props) {
  return (
    <div className="mx-auto w-full">
      <h2 className="text-2xl mb-4 tracking-tight">{title}</h2>

      <div className="flex flex-col gap-3">
        <Card className="w-full text-center">
          <CardHeader className="py-4">
            <CardTitle className="text-xl">할 일 목록이 없어요.</CardTitle>
          </CardHeader>

          <CardContent className="text-sm">
            <p>현재 실행할 할 일이 없어요.</p>
            <p>루틴을 수정해서 할 일을 추가해보세요.</p>
          </CardContent>

          <CardFooter className="justify-center">
            <Link to={`/${Routes.RoutineEdit}${id}`}>
              <Button>
                <FilePenLine />
                루틴 수정하러 가기
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Link className="w-max" to={`/${Routes.Routine}`}>
          <Button variant="secondary">
            <ChevronLeft />
            목록으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}

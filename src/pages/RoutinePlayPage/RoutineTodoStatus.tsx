import { useMemo } from "react";

import { RoutineItem } from "@/api/generated";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  currentIndex: number;
  todoList: Array<RoutineItem>;
}

export default function RoutineTodoStatus({ todoList, currentIndex }: Props) {
  const routineTodoElements = useMemo(() => {
    return todoList.map(
      ({ id, title, completed_duration_seconds, is_skipped }, index) => {
        const isDone = completed_duration_seconds || 0 > 0;
        const inProgress = currentIndex === index;

        return (
          <li
            key={id}
            className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-primary"
          >
            {inProgress ? (
              <Badge variant="default">진행중</Badge>
            ) : is_skipped ? (
              <Badge variant="secondary">스킵</Badge>
            ) : isDone ? (
              <Badge variant="default">완료</Badge>
            ) : (
              <Badge variant="outline">미완료</Badge>
            )}
            <p
              className={cn(
                "font-medium text-sm leading-none text-ellipsis overflow-hidden transition-all",
                inProgress && "font-bold"
              )}
            >
              {title}
            </p>
          </li>
        );
      }
    );
  }, [todoList, currentIndex]);

  return (
    <Card className="w-full overflow-hidden h-max">
      <CardHeader className="py-4">
        <CardTitle className="text-xl">할 일 목록</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">{routineTodoElements}</ul>
      </CardContent>
    </Card>
  );
}

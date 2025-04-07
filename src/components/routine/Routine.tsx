import { Link } from "react-router-dom";
import { CheckIcon, PlayIcon } from "lucide-react";

import { RoutineItem, RoutinePublic } from "@/api/generated";
import Routes from "@/constants/routes";
import { cn } from "@/lib/utils";
import { formatSecondsAsDuration, formatMinutesWithAMPM } from "@/utils/time";

import WeekList from "../WeekList";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface Props {
  routine: RoutinePublic;

  disabled?: boolean;

  children?: React.ReactNode;
}

const RoutineTodoItem = ({ todo }: { todo: RoutineItem }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs font-medium leading-none text-muted-foreground line-through overflow-hidden text-ellipsis whitespace-nowrap">
        {todo.title}
      </p>

      <p className="text-xs text-muted-foreground basis-20">
        {formatSecondsAsDuration(todo.completed_duration_seconds || 1)} 진행
      </p>
    </div>
  );
};

export default function Routine({ routine, disabled }: Props) {
  const { id, title, start_time_minutes, routine_elements, repeat_days } =
    routine;

  const getTotalRoutineMinutes = (list: Array<RoutineItem>) => {
    return list.reduce((acc, cur) => acc + cur.duration_minutes, 0);
  };

  const getRoutineCompletedDurationSeconds = (list: Array<RoutineItem>) => {
    return list.reduce(
      (acc, cur) => acc + (cur.completed_duration_seconds || 0),
      0
    );
  };

  const completedSeconds = getRoutineCompletedDurationSeconds(routine_elements);
  const isDone = routine_elements.some(
    ({ is_skipped, completed_at }) => is_skipped || completed_at
  );

  return (
    <Link
      to={`/${Routes.RoutineEdit}${routine.id}`}
      className={cn(
        "rounded-lg border p-3 text-left transition-all hover:bg-accent cursor-pointer"
      )}
    >
      <div className="flex flex-col gap-1">
        {!disabled && !isDone && <Badge className="w-max">오늘</Badge>}

        {isDone && (
          <Badge className="w-max" variant="outline">
            <CheckIcon size={15} className="mr-1" />총{" "}
            {formatSecondsAsDuration(Math.max(60, completedSeconds))}{" "}
            진행했어요!
          </Badge>
        )}

        <div
          className={cn(
            "font-medium overflow-hidden text-ellipsis line-clamp-2",
            isDone && "text-muted-foreground line-through"
          )}
        >
          {title || "이름이 없습니다."}
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <WeekList weekList={repeat_days} className="w-max" />
            <div
              className={
                "h-3 text-xs text-muted-foreground flex items-center gap-1"
              }
            >
              <p>{formatMinutesWithAMPM(start_time_minutes)}</p>
              <Separator orientation="vertical" />
              <div>총 {getTotalRoutineMinutes(routine_elements)}분</div>
            </div>
          </div>

          {!isDone && (
            <Link to={`/${Routes.RoutinePlay}${id}`}>
              <Button size="sm" variant={disabled ? "outline" : "default"}>
                <PlayIcon />
                시작하기
              </Button>
            </Link>
          )}
        </div>
      </div>

      {isDone && (
        <div className="mt-3">
          <div className="flex flex-col gap-1">
            {routine_elements.map(
              (todo) =>
                !todo.is_skipped && (
                  <RoutineTodoItem key={todo.id} todo={todo} />
                )
            )}
          </div>

          <Link to={`/${Routes.RoutinePlay}${id}`}>
            <Button size="sm" variant="outline" className="mt-3 ml-auto flex">
              <PlayIcon />
              다시 시작하기
            </Button>
          </Link>
        </div>
      )}
    </Link>
  );
}

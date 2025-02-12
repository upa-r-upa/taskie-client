import { Flag } from "lucide-react";

import { HabitWithLog } from "@/api/generated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import WeekList from "@/components/WeekList";
import { cn } from "@/lib/utils";
import { formatDuration, formatMinutesWithAMPM } from "@/utils/time";

interface Props {
  habit: HabitWithLog;

  onHabitClick?: () => void;
  onHabitAchieve?: () => void;
}

export default function Habit({
  habit: {
    title,
    end_time_minutes,
    start_time_minutes,
    repeat_days,
    repeat_time_minutes,

    log_list,
  },
  onHabitClick,
  onHabitAchieve,
}: Props) {
  const count = Math.max(
    Math.floor((end_time_minutes - start_time_minutes) / repeat_time_minutes),
    0
  );
  const isDone = count <= log_list.length;

  const handleHabitAchieve = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onHabitAchieve?.();
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-3 text-left transition-all hover:bg-accent cursor-pointer",
        isDone && "order-2"
      )}
      onClick={onHabitClick}
    >
      <div className="flex flex-col gap-1">
        {isDone ? (
          <Badge variant="default" className="text-left w-max">
            <Flag size={15} className="mr-1" />
            {count}번 전부 달성했어요!
          </Badge>
        ) : (
          <Badge variant="outline" className="text-left w-max">
            {count}번 중 {log_list.length}번 달성했어요!
          </Badge>
        )}
        <p
          className={cn(
            "font-medium overflow-hidden text-ellipsis line-clamp-2",
            isDone && "line-through text-muted-foreground/70"
          )}
        >
          {title || "이름이 없습니다."}
        </p>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <WeekList weekList={repeat_days} className="w-max" />
            <div
              className={
                "h-3 text-xs text-muted-foreground flex items-center gap-1"
              }
            >
              <p>{formatMinutesWithAMPM(start_time_minutes)} 시작</p>
              <Separator orientation="vertical" />
              <p>{formatDuration(repeat_time_minutes)}마다</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleHabitAchieve}
              size="sm"
              variant={isDone ? "outline" : "default"}
            >
              {isDone ? "추가 달성하기" : "습관 달성하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

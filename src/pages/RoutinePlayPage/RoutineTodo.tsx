import { CirclePause, CirclePlay, SkipForward, TimerReset } from "lucide-react";
import useSound from "use-sound";
import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { RoutineItem } from "@/api/generated";
import { Button } from "@/components/ui/button";
import usePrevious from "@/hooks/usePrevious";
import chimeSound from "@/assets/chime_sound.mp3";

interface Props {
  seconds: number;
  isRunning: boolean;
  routineTodo: RoutineItem;

  hasPrevTodo: boolean;
  hasNextTodo: boolean;

  onTimerPause: () => void;
  onTimerResume: () => void;
  onTimerReset: () => void;
  onActiveChange: (active: boolean) => void;
  onMoveToPrevTodo: () => void;
  onDone: () => void;
}

export default function RoutineTodo({
  seconds,
  isRunning,
  hasPrevTodo,
  hasNextTodo,
  routineTodo,
  onTimerPause,
  onTimerReset,
  onTimerResume,
  onActiveChange,
  onMoveToPrevTodo,
  onDone,
}: Props) {
  const [play] = useSound(chimeSound);

  const goalTimeSeconds = routineTodo.duration_minutes * 60;
  const progress = Math.min(Math.floor((seconds / goalTimeSeconds) * 100), 100);
  const done = progress === 100;

  const isSkip = routineTodo.is_skipped;

  const prevProgress = usePrevious(progress);

  useEffect(() => {
    if (progress !== prevProgress && progress === 100) {
      play();
    }
  }, [progress, prevProgress, play]);

  const leftFillNum = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <Card className={cn("w-full h-max md:max-w-96 transition-all")}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-center">
          {routineTodo.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isSkip ? (
          <div className="text-center">
            <Button variant="default" onClick={() => onActiveChange(true)}>
              <CirclePlay />
              스킵 해제하기
            </Button>

            <p className="text-sm text-muted-foreground mt-3">
              이번 할 일은 스킵되어 진행되지 않아요.
            </p>
          </div>
        ) : (
          <>
            <div className="w-56 mx-auto">
              <div className="w-max mx-auto mb-2">
                {!isRunning ? (
                  <Badge variant="outline">일시정지</Badge>
                ) : done ? (
                  <Badge>
                    {routineTodo.duration_minutes}분{" "}
                    <Separator orientation="vertical" className="mx-2 h-3" />
                    시간 달성!
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    {routineTodo.duration_minutes}분{" "}
                    <Separator orientation="vertical" className="mx-2 h-3" />{" "}
                    {progress}% 진행중..
                  </Badge>
                )}

                <Progress value={progress} className="mt-1 h-1" />
              </div>

              <div
                className={cn(
                  "flex text-4xl gap-1 items-center justify-center text-center"
                )}
              >
                <p className="min-w-12">
                  {leftFillNum(Math.floor(seconds / 60))}
                </p>
                <p>:</p>
                <p className="min-w-12">{leftFillNum(seconds % 60)}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-5 justify-center">
              {isRunning ? (
                <Button onClick={onTimerPause} size={"sm"} variant="outline">
                  <CirclePause />
                  일시정지
                </Button>
              ) : (
                <Button onClick={onTimerResume} size={"sm"}>
                  <CirclePlay />
                  {seconds === 0 ? "시작하기" : "재개하기"}
                </Button>
              )}

              <Button variant="secondary" size={"sm"} onClick={onTimerReset}>
                <TimerReset />
                초기화
              </Button>

              <Button
                variant="secondary"
                size={"sm"}
                onClick={() => onActiveChange(false)}
              >
                <SkipForward />
                스킵
              </Button>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="space-x-2">
        {hasPrevTodo && (
          <Button size="lg" variant="outline" onClick={onMoveToPrevTodo}>
            이전으로
          </Button>
        )}
        <Button size="lg" onClick={onDone} className="flex-1">
          {!hasNextTodo ? "완료 및 루틴 종료" : "완료 및 다음으로"}
        </Button>
      </CardFooter>
    </Card>
  );
}

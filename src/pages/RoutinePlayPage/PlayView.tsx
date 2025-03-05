import { CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { RoutineItem, RoutinePublic } from "@/api/generated";
import { Button } from "@/components/ui/button";
import useStopwatch from "@/hooks/useStopwatch";
import { useMounted } from "@/hooks/useMounted";
import usePrevious from "@/hooks/usePrevious";

import { RoutinePlayViewSubmitProps } from "../MainPage/types";

import RoutineTodo from "./RoutineTodo";
import BackButton from "./ConfirmBackButton";
import RoutineTodoStatus from "./RoutineTodoStatus";
import EmptyTodoList from "./EmptyTodoList";

interface Props {
  routine: RoutinePublic;

  onSubmit: (data: RoutinePlayViewSubmitProps) => void;
}

export default function PlayView({ routine, onSubmit }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [routineTodoList, setRoutineTodoList] = useState<Array<RoutineItem>>(
    routine.routine_elements.map((data) => ({
      ...data,
      completed_duration_seconds: 0,
    }))
  );

  const { seconds, isRunning, start, pause, reset, setTime } = useStopwatch(0);

  const isMounted = useMounted();
  const prevIsMounted = usePrevious(isMounted);

  useEffect(() => {
    if (isMounted !== prevIsMounted) {
      start();
    }
  }, [isMounted, prevIsMounted, start]);

  const updateCurrentIndex = (nextIndex: number) => {
    const nextRoutineTodo = routineTodoList[nextIndex];

    setCurrentIndex(nextIndex);

    if (nextRoutineTodo.is_skipped) {
      setTime(0);
    } else {
      setTime(nextRoutineTodo.completed_duration_seconds || 0);
    }
  };

  const updateRoutineTodoCompletedDuration = (
    index: number,
    durationSeconds: number
  ) => {
    const nextRoutineTodoList = routineTodoList.map((item, idx) =>
      idx === index
        ? { ...item, completed_duration_seconds: durationSeconds }
        : item
    );
    setRoutineTodoList(nextRoutineTodoList);

    return nextRoutineTodoList;
  };

  const handleRoutineDone = () => {
    const nextRoutineTodoList = updateRoutineTodoCompletedDuration(
      currentIndex,
      seconds
    );
    onSubmit({
      id: routine.id,
      routineTodoList: nextRoutineTodoList,
    });
  };

  const handleNextButtonClick = () => {
    if (currentIndex >= routine.routine_elements.length - 1) {
      handleRoutineDone();
      return;
    }

    updateRoutineTodoCompletedDuration(currentIndex, seconds);
    updateCurrentIndex(currentIndex + 1);
  };

  const handlePrevButtonClick = () => {
    if (currentIndex === 0) return;

    updateRoutineTodoCompletedDuration(currentIndex, seconds);
    updateCurrentIndex(currentIndex - 1);
  };

  const handleRoutineTodoActiveChange = (active: boolean) => {
    setRoutineTodoList((prev) => {
      return prev.map((item, idx) =>
        idx === currentIndex
          ? {
              ...item,
              is_skipped: !active,
              completed_duration_seconds: !active
                ? 0
                : item.completed_duration_seconds,
            }
          : item
      );
    });

    if (active) {
      start();
    } else {
      reset();
    }
  };

  if (routineTodoList.length === 0) {
    return <EmptyTodoList title={routine.title} id={routine.id} />;
  }

  const routineTodo = routineTodoList[currentIndex];

  return (
    <div className="mx-auto w-full">
      <h2 className="text-2xl mb-4 tracking-tight">{routine.title}</h2>

      <div className="flex flex-col gap-3 md:flex-row">
        <RoutineTodo
          seconds={seconds}
          isRunning={isRunning}
          routineTodo={routineTodo}
          hasNextTodo={currentIndex < routine.routine_elements.length - 1}
          hasPrevTodo={currentIndex !== 0}
          onTimerPause={pause}
          onTimerReset={reset}
          onTimerResume={start}
          onMoveToPrevTodo={handlePrevButtonClick}
          onActiveChange={handleRoutineTodoActiveChange}
          onDone={handleNextButtonClick}
        />

        <RoutineTodoStatus
          todoList={routineTodoList}
          currentIndex={currentIndex}
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <BackButton />
        <Button onClick={handleRoutineDone}>
          <CheckCheck />
          루틴 종료하기
        </Button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RoutineItem, RoutinePublic } from "../../api/generated";
import useStopwatch from "../../hooks/useStopwatch";
import { getFormatMinutes } from "../../utils/time";
import { RoutinePlayViewSubmitProps } from "../MainPage/types";

interface Props {
  routine: RoutinePublic;

  onSubmit: (data: RoutinePlayViewSubmitProps) => void;
}

export default function PlayView({ routine, onSubmit }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [routineTodoList, setRoutineTodoList] = useState<Array<RoutineItem>>(
    routine.routine_elements
  );
  const routineTodo = routineTodoList[currentIndex];
  const { seconds, isRunning, start, pause, reset, setSeconds } = useStopwatch(
    routineTodo.completed_duration_seconds || 0
  );
  const handleRoutineTodoPause = () => {
    pause();
  };

  const handleRoutineTodoResume = () => {
    start();
  };

  const handleRoutineTodoReset = () => {
    reset();
    start();
  };

  const handleRoutineTodoSkip = () => {
    setRoutineTodoList((prev) => {
      return prev.map((item, idx) =>
        idx === currentIndex
          ? { ...item, is_skipped: true, completed_duration_seconds: 0 }
          : item
      );
    });
    reset();
  };

  const handleRoutineTodoUnSkip = () => {
    setRoutineTodoList((prev) => {
      return prev.map((item, idx) =>
        idx === currentIndex ? { ...item, is_skipped: false } : item
      );
    });
    start();
  };

  const updateCurrentIndex = (nextIndex: number) => {
    const nextRoutineTodo = routineTodoList[nextIndex];

    setCurrentIndex(nextIndex);
    setSeconds(nextRoutineTodo.completed_duration_seconds || 0);

    if (!nextRoutineTodo.is_skipped) {
      start();
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
    setSeconds(0);

    return nextRoutineTodoList;
  };

  const handlePrevButtonClick = () => {
    updateRoutineTodoCompletedDuration(currentIndex, seconds);

    if (currentIndex <= 0) return;

    updateCurrentIndex(currentIndex - 1);
  };

  const handleNextButtonClick = () => {
    updateRoutineTodoCompletedDuration(currentIndex, seconds);

    if (currentIndex >= routine.routine_elements.length - 1) return;

    updateCurrentIndex(currentIndex + 1);
  };

  const handleDoneButtonClick = () => {
    const nextRoutineTodoList = updateRoutineTodoCompletedDuration(
      currentIndex,
      seconds
    );
    onSubmit({
      id: routine.id,
      routineTodoList: nextRoutineTodoList,
    });
  };

  const renderCurrentRoutineTodo = () => {
    const isPrevButtonVisible = currentIndex > 0;
    const isNextButtonVisible =
      currentIndex < routine.routine_elements.length - 1;

    const goalTimeSeconds = routineTodo.duration_minutes * 60;
    const progress = Math.min(
      Math.floor((seconds / goalTimeSeconds) * 100),
      100
    );

    if (routineTodo.is_skipped) {
      return (
        <div className="relative w-full card card-compact text-center card-bordered shadow-md">
          <div className="card-body">
            <h2 className="card-title block text-gray-400">
              {routineTodo.title}
            </h2>
            <p className="text-gray-400">
              목표 시간{" "}
              <span className="font-semibold">
                {getFormatMinutes(routineTodo.duration_minutes)}
              </span>
            </p>

            <div className="card-actions mt-2">
              <button
                className="btn mx-auto btn-primary btn-outline"
                onClick={handleRoutineTodoUnSkip}
              >
                스킵 해제하기
              </button>
            </div>
          </div>

          {isPrevButtonVisible && (
            <button
              onClick={handlePrevButtonClick}
              className="btn btn-circle btn-primary btn-outline absolute left-2 top-1/3"
            >
              <BsArrowLeft />
            </button>
          )}
          {isNextButtonVisible && (
            <button
              onClick={handleNextButtonClick}
              className="btn btn-circle  btn-primary btn-outline absolute right-2 top-1/3"
            >
              <BsArrowRight />
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="relative w-full card card-compact text-center card-bordered shadow-md">
        <div className="card-body">
          <h2 className="card-title block">{routineTodo.title}</h2>
          <p>
            목표 시간{" "}
            <span className="font-semibold">
              {getFormatMinutes(routineTodo.duration_minutes)}
            </span>
            {progress === 100 ? (
              <span className="font-semibold"> 완료!</span>
            ) : (
              <></>
            )}
          </p>

          <p
            key={routineTodo.id}
            className="countdown font-mono text-lg mx-auto text-primary"
          >
            <span
              style={
                {
                  "--value": Math.floor(seconds / 60),
                } as React.CSSProperties
              }
            ></span>
            :
            <span
              style={
                {
                  "--value": seconds % 60,
                } as React.CSSProperties
              }
            ></span>
          </p>

          <progress
            className="progress mx-auto w-1/2 progress-primary"
            max={100}
            value={progress}
          ></progress>

          {isRunning ? (
            <button
              className="btn my-3 mx-auto btn-outline"
              onClick={handleRoutineTodoPause}
            >
              타이머 일시 정지
            </button>
          ) : (
            <button
              className="btn my-3 mx-auto btn-outline btn-primary"
              onClick={handleRoutineTodoResume}
            >
              타이머 정지 해제
            </button>
          )}

          <div className="card-actions mt-2">
            <button
              className="flex-1 btn btn-sm btn-primary btn-outline"
              onClick={handleRoutineTodoSkip}
            >
              이번엔 스킵하기
            </button>
            <button
              className="flex-1 btn btn-sm btn-outline"
              onClick={handleRoutineTodoReset}
            >
              시간 초기화
            </button>
          </div>
        </div>

        {isPrevButtonVisible && (
          <button
            onClick={handlePrevButtonClick}
            className="btn btn-circle btn-primary btn-outline absolute left-2 top-1/3"
          >
            <BsArrowLeft />
          </button>
        )}
        {isNextButtonVisible && (
          <button
            onClick={handleNextButtonClick}
            className="btn btn-circle  btn-primary btn-outline absolute right-2 top-1/3"
          >
            <BsArrowRight />
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">
        <span>{routine.title}</span>
      </h1>

      <div className="relative mt-5">{renderCurrentRoutineTodo()}</div>

      <div className="flex w-full mt-5">
        <button
          onClick={handleDoneButtonClick}
          className="btn w-full btn-primary"
        >
          루틴 완료하기
        </button>
      </div>
    </div>
  );
}

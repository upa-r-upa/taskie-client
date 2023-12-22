import { useState } from "react";
import { Routine } from "../../types/routine";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface Props {
  routine: Routine;

  goToNextStep: () => void;
}

export default function PlayView({ routine, goToNextStep }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const routineTodo = routine.routine_elements[currentIndex];

  const renderRoutinePauseView = () => {
    if (!isPaused) return;

    return (
      <div className="absolute z-10 w-full h-full left-0 top-0 bg-black bg-opacity-70 rounded-md flex items-center justify-center">
        <div className="text-center shadow-2xl text-neutral-50 text-xl">
          <p className="mb-4">루틴을 멈췄습니다.</p>
          <button
            className="btn btn-primary"
            onClick={() => setIsPaused(false)}
          >
            루틴 재개하기
          </button>
        </div>
      </div>
    );
  };

  const handlePrevButtonClick = () => {
    if (currentIndex <= 0) return;

    setCurrentIndex(currentIndex - 1);
  };

  const handleNextButtonClick = () => {
    if (currentIndex >= routine.routine_elements.length - 1) return;

    setCurrentIndex(currentIndex + 1);
  };

  const handleDoneButtonClick = () => {
    if (currentIndex >= routine.routine_elements.length - 1) {
      return goToNextStep();
    }

    setCurrentIndex(currentIndex + 1);
  };

  const renderCurrentRoutineTodo = () => {
    const isPrevButtonVisible = currentIndex > 0;
    const isNextButtonVisible =
      currentIndex < routine.routine_elements.length - 1;

    return (
      <div
        key={routineTodo.id}
        className="relative w-full text-center card card-compact bordered min-h-80 shadow-md"
      >
        <div className="card-body">
          <h2 className="card-title block text-xlg">{routineTodo.title}</h2>
          <p>
            목표 시간{" "}
            <span className="font-bold">{routineTodo.duration_minutes}분</span>
          </p>

          <button
            className="btn mb-2 mx-auto btn-sm btn-outline btn-primary"
            onClick={() => setIsPaused(true)}
          >
            일시 정지
          </button>

          <div
            className="radial-progress mx-auto"
            style={
              {
                "--value": "75",
                "--size": "10rem",
                "--thickness": "1rem",
              } as React.CSSProperties
            }
            role="progressbar"
          >
            <span className="countdown font-mono text-2xl">
              <span style={{ "--value": 10 } as React.CSSProperties}></span>:
              <span style={{ "--value": 24 } as React.CSSProperties}></span>
            </span>
          </div>

          <div className="card-actions mt-2">
            <button className="flex-1 btn btn-sm btn-primary btn-outline">
              넘기기
            </button>
            <button className="flex-1 btn btn-sm btn-outline">
              시간 초기화
            </button>

            <div className="flex w-full">
              <button
                onClick={handleDoneButtonClick}
                className="btn w-full btn-primary"
              >
                완료
              </button>
            </div>
          </div>
        </div>

        {isPrevButtonVisible && (
          <button
            onClick={handlePrevButtonClick}
            className="btn btn-circle btn-primary btn-outline absolute left-2 top-2/4"
          >
            <BsArrowLeft />
          </button>
        )}
        {isNextButtonVisible && (
          <button
            onClick={handleNextButtonClick}
            className="btn btn-circle  btn-primary btn-outline absolute right-2 top-2/4"
          >
            <BsArrowRight />
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">
        <span>{routine.title}</span>
      </h1>
      <div className="mt-4">
        <p className="text-lg">
          루틴 진행률 <br />
          <span className="font-bold text-xl">30%</span>
        </p>
        <progress className="progress w-4/6 shadow-sm" value={30} max="100" />
        <p className="text-lg mt-2">
          진행 시간 <br />
          <span className="font-bold text-xl">35분 05초</span>
        </p>
      </div>

      <div className="relative mt-5">
        {renderCurrentRoutineTodo()}

        {renderRoutinePauseView()}
      </div>
    </div>
  );
}

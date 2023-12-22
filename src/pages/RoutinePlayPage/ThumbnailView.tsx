import { Link } from "react-router-dom";
import { BsArrowRight, BsFillPlayFill } from "react-icons/bs";

import { Routine, RoutineElement } from "../../types/routine";
import Routes from "../../constants/routes";

interface Props {
  routine: Routine;

  goToNextStep: () => void;
}

export default function ThumbnailView({ routine, goToNextStep }: Props) {
  const firstRoutine: RoutineElement | undefined = routine.routine_elements[0];

  if (!firstRoutine) {
    return (
      <div className="hero">
        <div className=" w-full hero-content flex-col">
          <div className="text-left">
            <h1 className="text-2xl font-bold">
              <span>{routine.title}</span>
            </h1>
            <p className="py-6 text-lg">
              앗!{" "}
              <span className=" font-bold text-primary">
                {routine.title} 루틴
              </span>
              엔 실행할 수 있는 작업이 없어요.
              <br />
              루틴에 작업을 추가해서 루틴을 실행해보세요.
            </p>
          </div>

          <div className="card bordered shadow-lg mt-2">
            <div className="card-body">
              <h2 className="card-title text-lg">{routine.title}</h2>

              <div className="card-actions">
                <Link to={`/${Routes.ROUTINE_EDIT}${routine.id}`}>
                  <button className="btn btn-sm btn-outline btn-primary">
                    <BsArrowRight /> 루틴 수정하기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderRoutineTodo = (routine: Routine) => {
    return routine.routine_elements.map((routineElement) => {
      return (
        <li key={routineElement.id} className="step">
          <div className="flex">
            <div className="ml-1">{routineElement.title}</div>
            <div className="ml-3 badge badge-primary badge-outline">
              {routineElement.duration_minutes}분 소요
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <div className="min-h-full">
        <h1 className="text-2xl font-semibold mb-5">{routine.title} 루틴</h1>

        <div className="mb-5">
          <p className="text-gray-500 text-lg">루틴 예상 시간</p>
          <p>총 35분</p>
        </div>

        <div>
          <p className="text-gray-500 text-lg">할 일</p>
          <ul className="steps steps-vertical">{renderRoutineTodo(routine)}</ul>
        </div>

        <button
          onClick={goToNextStep}
          className="mt-5 btn w-full text-lg btn-primary"
        >
          <BsFillPlayFill /> 첫 할 일 시작하기
        </button>
      </div>
    </>
  );
}

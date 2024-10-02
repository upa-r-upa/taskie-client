import { Link } from "react-router-dom";
import { BsArrowRight, BsFillPlayFill } from "react-icons/bs";

import Routes from "../../constants/routes";
import { RoutineItem, RoutinePublic } from "../../api/generated";
import EmptyCard from "../../components/EmptyCard";

interface Props {
  routine: RoutinePublic;

  goToNextStep: () => void;
}

export default function ThumbnailView({ routine, goToNextStep }: Props) {
  const calculateTotalRoutineMinutes = (list: Array<RoutineItem>) => {
    return list.reduce((acc, cur) => acc + cur.duration_minutes, 0);
  };

  const firstRoutine: RoutineItem | undefined = routine?.routine_elements?.[0];

  if (!firstRoutine) {
    return (
      <EmptyCard label="루틴 요소">
        <div>
          <p className="py-6">
            앗!{" "}
            <span className=" font-bold text-primary">
              {routine.title} 루틴
            </span>
            에는 <br /> 실행할 수 있는 작업이 없어요.
            <br />
            루틴에 작업을 추가해서 루틴을 실행해보세요.
          </p>

          <Link to={`/${Routes.ROUTINE_EDIT}${routine.id}`}>
            <button className="btn btn-sm btn-outline btn-primary">
              <BsArrowRight /> 루틴 수정하기
            </button>
          </Link>
        </div>
      </EmptyCard>
    );
  }

  const renderRoutineTodo = (routine: RoutinePublic) => {
    return routine.routine_elements.map((routineElement) => {
      return (
        <li key={routineElement.id} className="step">
          <div className="flex">
            <div className="ml-1">{routineElement.title}</div>
            <div className="ml-3 badge badge-primary badge-outline whitespace-nowrap">
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
          <p className="font-semibold text-lg">루틴 예상 시간</p>
          <p className="text-lg">
            총 {calculateTotalRoutineMinutes(routine.routine_elements)}분
          </p>
        </div>

        <div>
          <p className="font-semibold text-lg">할 일</p>
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

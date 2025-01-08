import { Link } from "react-router-dom";

import Routes from "@/constants/routes";
import EmptyCard from "@/components/EmptyCard";
import IncompleteRoutine from "@/components/routine/IncompleteRoutine";
import CompletedRoutine from "@/components/routine/CompletedRoutine";
import { RoutinePublic } from "@/api/generated";

interface Props {
  routineList: Array<RoutinePublic>;
}

export default function RoutineSection({ routineList }: Props) {
  const renderRoutineList = (list: Array<RoutinePublic>) => {
    if (list.length === 0) {
      return (
        <EmptyCard label="루틴">
          <Link to={`/${Routes.RoutineCreate}`}>
            <button className="btn btn-primary btn-outline">
              루틴 추가하러 가기
            </button>
          </Link>
        </EmptyCard>
      );
    }

    return list.map((routine) => {
      const isDone = routine.routine_elements.some((data) => data.completed_at);

      return isDone ? (
        <CompletedRoutine key={routine.id} routine={routine} />
      ) : (
        <IncompleteRoutine key={routine.id} routine={routine} />
      );
    });
  };

  return (
    <>
      <ul className="flex flex-col">{renderRoutineList(routineList)}</ul>

      {routineList.length && (
        <Link to={`/${Routes.RoutineCreate}`}>
          <button className="btn btn-primary btn-outline btn-sm mt-2">
            루틴 추가하러 가기
          </button>
        </Link>
      )}
    </>
  );
}

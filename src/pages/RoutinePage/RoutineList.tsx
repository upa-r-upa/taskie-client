import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

import { getWeek } from "@/utils/time";
import Routes from "@/constants/routes";
import EmptyCard from "@/components/EmptyCard";
import { RoutinePublic } from "@/api/generated";
import IncompleteRoutine from "@/components/routine/IncompleteRoutine";
import CompletedRoutine from "@/components/routine/CompletedRoutine";

interface Props {
  isLoading: boolean;
  routineList: Array<RoutinePublic>;
}

function RoutineLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-20 w-48"></div>
      <div className="skeleton h-20"></div>
      <div className="skeleton h-20"></div>
    </div>
  );
}

export default function RoutineList({ isLoading, routineList }: Props) {
  const renderRoutineList = (list: Array<RoutinePublic>) => {
    if (list.length === 0) {
      return <EmptyCard label="루틴" />;
    }

    return list.map((routine) => {
      const isActivated = routine.repeat_days.includes(getWeek(new Date()));

      if (!isActivated)
        return (
          <IncompleteRoutine
            key={routine.id}
            disabled
            showWeekList
            routine={routine}
          >
            <p className="mt-2">오늘은 루틴을 진행하지 않아요.</p>
          </IncompleteRoutine>
        );

      const isDone = routine.routine_elements.some((data) => data.completed_at);

      if (isDone) {
        return (
          <CompletedRoutine
            key={routine.id}
            showWeekList
            badgeLabel={"오늘의 루틴"}
            routine={routine}
          />
        );
      } else {
        return (
          <IncompleteRoutine
            key={routine.id}
            badgeLabel={"오늘의 루틴"}
            routine={routine}
            showWeekList
          />
        );
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <RoutineLoadingSkeleton />
      ) : (
        <ul className="flex flex-col">{renderRoutineList(routineList)}</ul>
      )}

      <Link to={`/${Routes.RoutineCreate}`}>
        <button className="btn btn-circle btn-md btn-primary absolute right-0 top-0 shadow-lg">
          <BsPlusLg />
        </button>
      </Link>
    </>
  );
}

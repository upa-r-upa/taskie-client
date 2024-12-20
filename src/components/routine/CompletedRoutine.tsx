import { Link } from "react-router-dom";

import { RoutinePublic } from "@/api/generated";
import Routes from "@/constants/routes";

import WeekList from "../WeekList";

import RoutinePlayButton from "./RoutinePlayButton";
import RoutineTileDescription from "./RoutineTimeDescription";

interface Props {
  routine: RoutinePublic;

  badgeLabel?: React.ReactNode;
}

export default function CompletedRoutine({ routine, badgeLabel }: Props) {
  const renderRoutineTodoList = () => {
    return (
      <ul className="flex flex-col gap-2">
        {routine.routine_elements.map((data) => {
          if (data.is_skipped || !data.completed_at) return;

          return (
            <li
              key={`${routine.id}-${data.id}`}
              className="card-bordered shadow-sm rounded-md p-2 line-through text-gray-400 flex overflow-hidden gap-2"
            >
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                {data.title}
              </p>

              <input
                className="checkbox flex-shrink-0 checkbox-sm rounded-full checkbox-primary"
                type="checkbox"
                disabled
                checked
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <li className="card card-bordered card-compact shadow-md mb-2 order-2">
      <div className="card-body">
        <div className="flex">
          <div className="flex-1 text-gray-400">
            <Link to={`/${Routes.ROUTINE_EDIT}${routine.id}`}>
              <p>
                {badgeLabel && (
                  <span className="badge badge-primary badge-outline badge-sm">
                    {badgeLabel}
                  </span>
                )}

                <span className="badge badge-primary badge-sm ml-2">완료!</span>
              </p>

              <h2 className="card-title text-lg line-through">
                {routine.title}
              </h2>

              <RoutineTileDescription
                startTimeMinutes={routine.start_time_minutes}
                routineTodoList={routine.routine_elements}
              />
            </Link>

            <WeekList weekList={routine.repeat_days} />
          </div>

          <div className="card-actions">
            <RoutinePlayButton routineId={routine.id} />
          </div>
        </div>

        {renderRoutineTodoList()}
      </div>
    </li>
  );
}

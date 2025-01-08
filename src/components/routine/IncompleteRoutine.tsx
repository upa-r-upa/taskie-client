import { Link } from "react-router-dom";

import { RoutinePublic } from "@/api/generated";
import Routes from "@/constants/routes";

import WeekList from "../WeekList";

import RoutinePlayButton from "./RoutinePlayButton";
import RoutineTileDescription from "./RoutineTimeDescription";

interface Props {
  routine: RoutinePublic;

  badgeLabel?: React.ReactNode;
  showWeekList?: boolean;
  disabled?: boolean;

  headerChildren?: React.ReactNode;
  children?: React.ReactNode;
}

export default function IncompleteRoutine({
  routine,
  badgeLabel,
  showWeekList,
  disabled,
  headerChildren,
  children,
}: Props) {
  const getOrder = () => {
    return !disabled ? "order-1" : "order-2";
  };

  return (
    <li
      key={routine.id}
      className={`card card-bordered card-compact mb-2 shadow-md ${getOrder()}`}
    >
      <div className="card-body">
        <div className="flex">
          <div className="flex-1">
            <Link to={`/${Routes.RoutineEdit}${routine.id}`}>
              {badgeLabel && (
                <span className="badge badge-primary badge-outline badge-sm">
                  {badgeLabel}
                </span>
              )}

              <h2
                className={`card-title text-lg ${
                  disabled ? " text-gray-400" : ""
                }`}
              >
                {routine.title}
              </h2>

              <RoutineTileDescription
                startTimeMinutes={routine.start_time_minutes}
                routineTodoList={routine.routine_elements}
              />
            </Link>

            {showWeekList && <WeekList weekList={routine.repeat_days} />}

            {headerChildren}
          </div>

          {!disabled && (
            <div className="card-actions">
              <RoutinePlayButton routineId={routine.id} />
            </div>
          )}
        </div>

        {children}
      </div>
    </li>
  );
}

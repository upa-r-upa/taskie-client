import { BsFillPlayFill, BsSkipEndFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { getFormatMinutesWithMeridiem } from "../../utils/time";
import Routes from "../../constants/routes";
import EmptyCard from "../../components/EmptyCard";
import { RoutineItem, RoutinePublic } from "../../api/generated";

interface Props {
  routineList: Array<RoutinePublic>;
}

export default function RoutineSection({ routineList }: Props) {
  const calculateTotalRoutineMinutes = (list: Array<RoutineItem>) => {
    return list.reduce((acc, cur) => acc + cur.duration_minutes, 0);
  };

  const renderRoutineList = (list: Array<RoutinePublic>) => {
    if (list.length === 0) {
      return (
        <EmptyCard label="루틴">
          <Link to={`/${Routes.ROUTINE_CREATE}`}>
            <button className="btn btn-primary btn-outline">
              루틴 추가하러 가기
            </button>
          </Link>
        </EmptyCard>
      );
    }

    return list.map((routine) => {
      const isDone = routine.routine_elements.some((data) => data.completed_at);

      if (isDone) {
        return (
          <li
            key={routine.id}
            className="card card-bordered card-compact shadow-md mb-2 order-2"
          >
            <div className="card-body">
              <div className="flex">
                <div className="flex-1 text-gray-400">
                  <Link to={`/${Routes.ROUTINE_EDIT}${routine.id}`}>
                    <h2 className="card-title text-lg line-through">
                      {routine.title}
                    </h2>
                    <p>
                      {getFormatMinutesWithMeridiem(routine.start_time_minutes)}{" "}
                      | 총{" "}
                      {calculateTotalRoutineMinutes(routine.routine_elements)}분
                    </p>
                  </Link>
                </div>

                <div className="card-actions">
                  <Link to={`/${Routes.ROUTINE_PLAY}${routine.id}`}>
                    <button className="btn btn-sm btn-circle btn-outline btn-primary">
                      <BsFillPlayFill />
                    </button>
                  </Link>
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                {routine.routine_elements.map((data) => {
                  if (data.is_skipped || !data.completed_at) {
                    return;
                  }

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
            </div>
          </li>
        );
      }
      return (
        <li
          key={routine.id}
          className="card card-bordered card-compact shadow-md mb-2 order-1"
        >
          <div className="card-body">
            <div className="flex">
              <div className="flex-1">
                <Link to={`/${Routes.ROUTINE_EDIT}${routine.id}`}>
                  <h2 className="card-title text-lg">{routine.title}</h2>
                  <p>
                    {getFormatMinutesWithMeridiem(routine.start_time_minutes)} |{" "}
                    총 {calculateTotalRoutineMinutes(routine.routine_elements)}
                    분
                  </p>
                </Link>
              </div>

              <div className="card-actions">
                <button className="btn btn-sm btn-circle btn-primary">
                  <BsSkipEndFill />
                </button>

                <Link to={`/${Routes.ROUTINE_PLAY}${routine.id}`}>
                  <button className="btn btn-sm btn-circle btn-outline btn-primary">
                    <BsFillPlayFill />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <ul className="flex flex-col">{renderRoutineList(routineList)}</ul>
      {routineList.length ? (
        <Link to={`/${Routes.ROUTINE_CREATE}`}>
          <button className="btn btn-primary btn-outline btn-sm mt-2">
            루틴 추가하러 가기
          </button>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}

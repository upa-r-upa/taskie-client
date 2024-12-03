import { BsFillPlayFill, BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

import {
  getDayFromNumber,
  getFormatMinutesWithMeridiem,
  getWeek,
} from "@/utils/time";
import Routes from "@/constants/routes";
import EmptyCard from "@/components/EmptyCard";
import { RoutineItem, RoutinePublic } from "@/api/generated";

interface Props {
  routineList: Array<RoutinePublic>;
}

export default function RoutineList({ routineList }: Props) {
  const calculateTotalRoutineMinutes = (list: Array<RoutineItem>) => {
    return list.reduce((acc, cur) => acc + cur.duration_minutes, 0);
  };

  const renderRepeatDays = (repeatDays: Array<number>) => {
    return (
      <p className="mt-1 flex gap-1">
        {repeatDays.map((data, i) => {
          return (
            <span
              key={i}
              className=" card-bordered rounded-full px-1 border-gray-300"
            >
              {getDayFromNumber(data)}
            </span>
          );
        })}
      </p>
    );
  };

  const renderRoutineList = (list: Array<RoutinePublic>) => {
    if (list.length === 0) {
      return <EmptyCard label="루틴"></EmptyCard>;
    }

    return list.map((routine) => {
      const isActivated = routine.repeat_days.includes(getWeek(new Date()));

      if (!isActivated) {
        return (
          <li
            key={routine.id}
            className="card card-bordered card-compact mb-2 order-3 shadow-md"
          >
            <div className="card-body">
              <div className="flex">
                <div className="flex-1">
                  <Link to={`/${Routes.ROUTINE_EDIT}${routine.id}`}>
                    <h2 className="card-title text-lg text-gray-400">
                      {routine.title}
                    </h2>
                    <p>
                      {getFormatMinutesWithMeridiem(routine.start_time_minutes)}{" "}
                      | 총{" "}
                      {calculateTotalRoutineMinutes(routine.routine_elements)}분
                    </p>
                  </Link>

                  {renderRepeatDays(routine.repeat_days)}

                  <p className="mt-2">오늘은 루틴을 진행하지 않아요.</p>
                </div>
              </div>
            </div>
          </li>
        );
      }

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
                    <p>
                      <span className="badge badge-primary badge-outline badge-sm">
                        오늘의 루틴
                      </span>
                      <span className="badge badge-primary badge-sm ml-2">
                        완료!
                      </span>
                    </p>

                    <h2 className="card-title text-lg line-through">
                      {routine.title}
                    </h2>
                    <p>
                      {getFormatMinutesWithMeridiem(routine.start_time_minutes)}{" "}
                      | 총{" "}
                      {calculateTotalRoutineMinutes(routine.routine_elements)}분
                    </p>
                  </Link>
                  {renderRepeatDays(routine.repeat_days)}
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
                  <span className="badge badge-primary badge-outline badge-sm">
                    오늘의 루틴
                  </span>
                  <h2 className="card-title text-lg">{routine.title}</h2>
                  <p>
                    {getFormatMinutesWithMeridiem(routine.start_time_minutes)} |{" "}
                    총 {calculateTotalRoutineMinutes(routine.routine_elements)}
                    분
                  </p>
                </Link>

                {renderRepeatDays(routine.repeat_days)}
              </div>

              <div className="card-actions">
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

      <Link to={`/${Routes.ROUTINE_CREATE}`}>
        <button className="btn btn-circle btn-md btn-primary absolute right-0 top-0 shadow-lg">
          <BsPlusLg />
        </button>
      </Link>
    </>
  );
}
